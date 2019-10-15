import * as React from 'react';
import styles from './typescript-editor.module.scss';

let monaco: typeof import('monaco-editor');

interface TypescriptEditorProps {
  code: string;
  theme: 'light' | 'dark';
  onEscape?: () => void;
  onBlur?: () => void;
  autoFocus?: boolean;
}

export class TypescriptEditor extends React.Component<TypescriptEditorProps> {
  containerRef = React.createRef<HTMLDivElement>();
  editor: undefined | ReturnType<typeof monaco.editor.create>;

  componentDidMount() {
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

    if (this.props.autoFocus) {
      this.editor.focus();
    }
  };

  handleKey = () => {
    if (this.props.onEscape) {
      this.props.onEscape();
    }
  };

  handleBlur = () => {
    if (this.props.onBlur) {
      this.props.onBlur();
    }
  };

  handleResize = () => {
    if (this.editor) {
      this.editor.layout();
    }
  };

  render() {
    return <div className={styles.root} ref={this.containerRef} />;
  }
}
