import * as React from 'react';
import styles from './typescript-editor.module.scss';

let monaco: any;

interface TypescriptEditorProps {
  code: string;
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

  initEditor = () => {
    monaco.editor.create(this.containerRef.current, {
      value: this.props.code,
      language: 'typescript',
      theme: 'vs-dark',
      scrollBeyondLastLine: false,
      lineNumbers: 'off',
      minimap: {
        enabled: false,
      },
    });
  };

  render() {
    return <div className={styles.root} ref={this.containerRef} />;
  }
}
