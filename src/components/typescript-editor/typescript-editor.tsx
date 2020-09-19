import type { IDisposable, languages } from 'monaco-editor';
import * as React from 'react';
import { debounce } from '../../lib/fp';
import styles from './typescript-editor.module.scss';
import { getWorker } from './typings-worker';

let monaco: typeof import('monaco-editor/esm/vs/editor/editor.api');

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
  tsx?: boolean;
}

// Store details about typings we have loaded
const extraLibs = new Map<string, IDisposable>();

/**
 * Wrapper over 'monaco-editor'. 'monaco-editor' will be lazy-loaded.
 *
 */
export class TypescriptEditor extends React.Component<TypescriptEditorProps> {
  private containerRef = React.createRef<HTMLDivElement>();
  private editor: undefined | ReturnType<typeof monaco.editor.create>;
  private tsProxy: languages.typescript.TypeScriptWorker | undefined;
  private typingWorker: ReturnType<typeof getWorker> = false;
  private _isMounted: boolean = false;

  componentDidMount() {
    this._isMounted = true;
    this.typingWorker = getWorker();

    if (monaco) {
      this.initEditor();
    } else {
      Promise.all([
        import('monaco-editor/esm/vs/editor/editor.api'),
        import('monaco-themes/themes/Night Owl.json'),
        import('monaco-themes/themes/GitHub.json'),
      ]).then(([loadedMonaco, loadedDarkTheme, loadedLightTheme]) => {
        monaco = loadedMonaco;
        setupTypescript(loadedMonaco);
        this.addReactTypes().then(() => {
          if (this._isMounted) {
            monaco.editor.defineTheme('nightOwl', loadedDarkTheme as any);
            monaco.editor.defineTheme('github', loadedLightTheme as any);
            this.initEditor();
          }
        });
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
    if (this.typingWorker) {
      this.typingWorker.terminate();
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

  private addReactTypes() {
    if (monaco) {
      monaco.languages.typescript.typescriptDefaults.addExtraLib(
        // type definition for `react-live` render
        `declare function render(node: any): void;`,
        `file:///global.d.ts`
      );
    }
    return this.addTypings({
      name: 'react',
      version: '16.13.1',
    });
  }

  private addTypings(pkg: {
    name: string;
    version: string;
  }): Promise<{
    name: string;
    version: string;
    typings: Record<string, string>;
  } | void> {
    if (this.typingWorker && monaco) {
      return this.typingWorker.getTypeDefinition(pkg).then((data) => {
        if (data) {
          Object.keys(data.typings).forEach((path) => {
            const extraLib = extraLibs.get(path);

            if (extraLib) {
              extraLib.dispose();
            }

            const newLib = monaco.languages.typescript.typescriptDefaults.addExtraLib(
              data.typings[path],
              `file:///${path}`
            );

            extraLibs.set(path, newLib);
          });
          return data;
        }
      });
    }
    return Promise.resolve();
  }

  initEditor = () => {
    this.editor = monaco.editor.create(
      this.containerRef.current as HTMLDivElement,
      {
        model: monaco.editor.createModel(
          this.props.code,
          'typescript',
          monaco.Uri.parse(`file:///main.${this.props.tsx ? 'tsx' : 'ts'}`)
        ),
        language: 'typescript',
        theme: this.props.theme === 'light' ? 'github' : 'nightOwl',
        scrollBeyondLastLine: false,
        lineNumbers: 'off',
        minimap: {
          enabled: false,
        },
      }
    );

    this.editor.onKeyDown((ev) => {
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
        .then((worker) => worker(model.uri))
        .then((proxy) => {
          this.tsProxy = proxy;
        })
        .then(() => {
          if (this.props.onEmitCode) {
            this.getEmittedCode().then((emittedCode) => {
              if (emittedCode && this._isMounted && this.props.onEmitCode) {
                this.props.onEmitCode(emittedCode);
              }
            });
          }
        });
    }
  };

  private handleKey = () => {
    if (this.props.onEscape) {
      this.props.onEscape();
    }
  };

  private handleChange = () => {
    if (this.props.onChange && this.editor) {
      this.props.onChange(this.editor.getValue());
    }
    if (this.props.onEmitCode) {
      this.getEmittedCode().then((emittedCode) => {
        if (this.props.onEmitCode && this._isMounted) {
          this.props.onEmitCode(emittedCode);
        }
      });
    }
  };

  private getEmittedCode(): Promise<string> {
    if (!this.tsProxy || !this.editor) {
      return Promise.resolve('');
    }

    const model = this.editor.getModel();

    if (!model) {
      return Promise.resolve('');
    }

    return this.tsProxy.getEmitOutput(model.uri.toString()).then((result) => {
      if (
        result &&
        Array.isArray(result.outputFiles) &&
        result.outputFiles.length > 0
      ) {
        return result.outputFiles[0].text;
      }
      return '';
    });
  }

  private handleBlur = () => {
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

const setupTypescript = (monacoService: typeof monaco) => {
  const COMPILER_OPTIONS: languages.typescript.CompilerOptions = {
    allowJs: true,
    allowSyntheticDefaultImports: true,
    strict: true,
    esModuleInterop: true,
    noImplicitUseStrict: true,
    typeRoots: ['node_modules/@types'],
    target: monacoService.languages.typescript.ScriptTarget.ES2016,
    jsx: monacoService.languages.typescript.JsxEmit.React,
    jsxFactory: 'React.createElement',
    reactNamespace: 'React',
    module: monacoService.languages.typescript.ModuleKind.CommonJS,
    moduleResolution:
      monacoService.languages.typescript.ModuleResolutionKind.NodeJs,
  };
  monacoService.languages.typescript.typescriptDefaults.setEagerModelSync(true);
  monacoService.languages.typescript.typescriptDefaults.setCompilerOptions(
    COMPILER_OPTIONS
  );
  monacoService.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
    noSemanticValidation: false,
    noSyntaxValidation: false,
  });
};
