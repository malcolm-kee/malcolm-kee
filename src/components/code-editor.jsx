import Highlight, { defaultProps } from 'prism-react-renderer';
import nightOwl from 'prism-react-renderer/themes/nightOwl';
import React from 'react';
import { LiveEditor, LiveError, LivePreview, LiveProvider } from 'react-live';
import './code-editor.scss';

function sanitize(data) {
  return Array.isArray(data)
    ? data.map(sanitize).join(',')
    : data instanceof Error
      ? data.toString()
      : typeof data === 'object'
        ? JSON.stringify(data, null, 2)
        : data;
}

function shallowConcat(targetArr, item) {
  if (!Array.isArray(targetArr)) return targetArr;

  const newArr = targetArr.slice();
  newArr.push(item);
  return newArr;
}

const isHighlightNextLine = tokens =>
  Array.isArray(tokens) &&
  tokens.some(
    token =>
      token.types[0] === 'comment' && token.content === '// highlight-next-line'
  );

const CodeSnippet = React.memo(({ code, language }) => (
  <Highlight {...defaultProps} theme={nightOwl} code={code} language={language}>
    {({ className, style, tokens, getLineProps, getTokenProps }) => (
      <pre className={`${className} code-snippet`} style={style}>
        {tokens
          .map((currentLine, index, allLines) => ({
            line: currentLine,
            isHighlighted: isHighlightNextLine(allLines[index - 1])
          }))
          .filter(({ line }) => !isHighlightNextLine(line))
          .map(({ line, isHighlighted }, i) => (
            <div
              {...getLineProps({
                line,
                key: i,
                className: isHighlighted ? 'highlighted-code-line' : undefined
              })}
            >
              {line.map((token, key) => (
                <span {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
      </pre>
    )}
  </Highlight>
));

/**
 * wrap js code with a React component that will render
 * list of logs
 */
const wrapJsCode = code => `
  class CodeWrapper extends React.Component {
      constructor(props) {
          super(props);
          this.state = {
            logs: []
          };
      }

      componentDidMount() {
        const log = content => 
          this.setState(prevState => ({
              logs: shallowConcat(prevState.logs, content)
            }));

        const console = {
          log: log,
          info: log,
          error: log
        }
        
        ${code}
      }

      render() {
          return (
              <React.Fragment>
              {this.state.logs.map((log, index) => 
                <div
                  className="log-output" 
                  key={index} 
                  dangerouslySetInnerHTML={{ __html: sanitize(log) }} 
                />)
              }
              </React.Fragment>
          );
      }
  }
`;

export const CodeEditor = ({ children, className }) => {
  const language = className && className.split('-').pop();

  return language === 'js' ? (
    <div className="code-editor">
      <LiveProvider
        code={children}
        scope={{ sanitize, shallowConcat }}
        transformCode={wrapJsCode}
        theme={nightOwl}
      >
        <header>Code Editor</header>
        <LiveEditor />
        <LiveError className="code-error" />
        <LivePreview className="code-preview" />
      </LiveProvider>
    </div>
  ) : language ? (
    <CodeSnippet code={children} language={language} />
  ) : (
    <code className="language-text">{children}</code>
  );
};
