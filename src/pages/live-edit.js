import React from 'react';
import { MainContent } from '../components/main-content';

let monaco;

const code = `
var test = true;
function helloWorld() {
    console.log('Hello');
}
`;

class LiveEdit extends React.Component {
  containerRef = React.createRef();

  componentDidMount() {
    if (monaco) {
      this.initEditor(monaco);
    } else {
      import('monaco-editor').then(loadedMonaco => {
        monaco = loadedMonaco;
        this.initEditor(loadedMonaco);
      });
    }
  }

  initEditor = monaco => {
    monaco.editor.create(this.containerRef.current, {
      value: code,
      language: 'typescript',
      theme: 'vs-dark',
      scrollBeyondLastLine: false,
    });
  };

  render() {
    return (
      <MainContent>
        <div style={{ height: 500 }} ref={this.containerRef}></div>
      </MainContent>
    );
  }
}

export default LiveEdit;
