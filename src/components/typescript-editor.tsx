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

  componentDidMount() {
    if (monaco) {
      this.initEditor();
    } else {
      import('monaco-editor').then(loadedMonaco => {
        monaco = loadedMonaco;
        this.initEditor();
      });
    }
  }

  componentDidUpdate(prevProps: TypescriptEditorProps) {
    if (monaco && prevProps.theme !== this.props.theme) {
      monaco.editor.setTheme(this.props.theme === 'light' ? 'vs' : 'vs-dark');
    }
  }

  initEditor = () => {
    const editor = monaco.editor.create(
      this.containerRef.current as HTMLDivElement,
      {
        value: this.props.code,
        language: 'typescript',
        theme: this.props.theme === 'light' ? 'vs' : 'vs-dark',
        scrollBeyondLastLine: false,
        lineNumbers: 'off',
        minimap: {
          enabled: false,
        },
      }
    );

    editor.onKeyDown(ev => {
      if (ev.keyCode === 9) {
        // 'Escape Key'
        this.handleKey();
      }
    });

    editor.onDidBlurEditorText(this.handleBlur);

    if (this.props.autoFocus) {
      editor.focus();
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

  render() {
    return <div className={styles.root} ref={this.containerRef} />;
  }
}
