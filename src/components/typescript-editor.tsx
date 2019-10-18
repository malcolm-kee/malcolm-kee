import * as React from 'react';
import { debounce } from '../lib/fp';
import styles from './typescript-editor.module.scss';

let monaco: typeof import('monaco-editor');

interface TypescriptEditorProps {
  code: string;
  theme: 'light' | 'dark';
  onChange?: (updatedCode: string) => void;
  onEmitCode?: (emitedJsCode: string) => void;
  onEscape?: () => void;
  onBlur?: () => void;
  autoFocus?: boolean;
  width?: number;
  height?: number;
}

/**
 * Wrapper over 'monaco-editor'. 'monaco-editor' will be lazy-loaded.
 *
 * Currently does not support tsx.
 */
export class TypescriptEditor extends React.Component<TypescriptEditorProps> {
  containerRef = React.createRef<HTMLDivElement>();
  editor: undefined | ReturnType<typeof monaco.editor.create>;
  tsProxy: any;
  _isMounted: boolean = false;

  componentDidMount() {
    this._isMounted = true;
    if (monaco) {
      this.initEditor();
    } else {
      Promise.all([
        import('monaco-editor/esm/vs/editor/editor.api'),
        import('monaco-themes/themes/Night Owl.json'),
        import('monaco-themes/themes/GitHub.json'),
      ]).then(([loadedMonaco, loadedDarkTheme, loadedLightTheme]) => {
        monaco = loadedMonaco;
        monaco.editor.defineTheme('nightOwl', loadedDarkTheme as any);
        monaco.editor.defineTheme('github', loadedLightTheme as any);
        this.initEditor();
      });
    }
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    this._isMounted = false;
    if (this.editor) {
      const model = this.editor.getModel();
      if (model) {
        model.dispose();
      }
      this.editor.dispose();
    }
    window.removeEventListener('resize', this.handleResize);
  }

  componentDidUpdate(prevProps: TypescriptEditorProps) {
    if (this.editor) {
      const model = this.editor.getModel();
      if (model && model.getValue() !== this.props.code) {
        model.pushEditOperations(
          [],
          [
            {
              range: model.getFullModelRange(),
              text: this.props.code,
            },
          ],
          () => null
        );
      }

      if (
        this.props.width !== prevProps.width ||
        this.props.height !== prevProps.height
      ) {
        this.editor.layout();
      }
    }

    if (monaco && prevProps.theme !== this.props.theme) {
      monaco.editor.setTheme(
        this.props.theme === 'light' ? 'github' : 'nightOwl'
      );
    }
  }

  initEditor = () => {
    this.editor = monaco.editor.create(
      this.containerRef.current as HTMLDivElement,
      {
        value: this.props.code,
        language: 'typescript',
        theme: this.props.theme === 'light' ? 'github' : 'nightOwl',
        scrollBeyondLastLine: false,
        lineNumbers: 'off',
        minimap: {
          enabled: false,
        },
      }
    );

    this.editor.onKeyDown(ev => {
      if (ev.keyCode === 9) {
        // 'Escape Key'
        this.handleKey();
      }
    });

    this.editor.onDidBlurEditorText(this.handleBlur);
    this.editor.onDidChangeModelContent(this.handleChange);

    if (this.props.autoFocus) {
      this.editor.focus();
    }

    const model = this.editor.getModel();
    if (model) {
      monaco.languages.typescript
        .getTypeScriptWorker()
        .then(worker => worker(model.uri))
        .then(proxy => {
          this.tsProxy = proxy;
        });
    }
  };

  handleKey = () => {
    if (this.props.onEscape) {
      this.props.onEscape();
    }
  };

  handleChange = () => {
    if (this.props.onChange && this.editor) {
      this.props.onChange(this.editor.getValue());
    }
    if (this.props.onEmitCode && this.tsProxy && this.editor) {
      const model = this.editor.getModel();
      if (model) {
        this.tsProxy
          .getEmitOutput(model.uri.toString())
          .then((result: any) => {
            const emittedCode = result.outputFiles[0].text;
            if (this.props.onEmitCode && this._isMounted) {
              this.props.onEmitCode(emittedCode);
            }
          })
          .catch((err: any) => {
            console.group(`Error while transpiling typescript code`);
            console.error(err);
            console.groupEnd();
          });
      }
    }
  };

  handleBlur = () => {
    if (this.props.onBlur) {
      this.props.onBlur();
    }
  };

  handleResize = debounce(() => {
    if (this.editor) {
      this.editor.layout();
    }
  });

  render() {
    const props = this.props;

    const style =
      props.width || props.height
        ? {
            width: props.width,
            height:
              props.height && window
                ? Math.min(window.innerHeight - 200, props.height)
                : props.height,
          }
        : undefined;

    return (
      <div className={styles.root} style={style} ref={this.containerRef} />
    );
  }
}
