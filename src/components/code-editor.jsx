import Highlight, { defaultProps } from 'prism-react-renderer';
import duotoneLight from 'prism-react-renderer/themes/duotoneLight';
import nightOwl from 'prism-react-renderer/themes/nightOwl';
import React from 'react';
import { LiveEditor, LiveError, LivePreview, LiveProvider } from 'react-live';
import { copyToClipboard } from '../helper';
import { useTheme } from '../theme';
import { Button } from './Button';
import './code-editor.scss';
import { Popover, PopoverContent } from './popover';

function sanitize(data) {
  return Array.isArray(data)
    ? `[${data.map(sanitize).join(',')}]`
    : data instanceof Error
    ? data.toString()
    : typeof data === 'object'
    ? JSON.stringify(data, null, 2)
    : typeof data === 'string'
    ? `"${data}"`
    : data;
}

function shallowConcat(targetArr, item) {
  if (!Array.isArray(targetArr)) return targetArr;

  const newArr = targetArr.slice();
  newArr.push(item);
  return newArr;
}

/*
 Global function used for demo
*/

function noop() {
  // noop
}

function ajax(url, options) {
  var opts = options || {};
  var onSuccess = opts.onSuccess || noop;
  var onError = opts.onError || noop;
  var dataType = opts.dataType || 'json';
  var method = opts.method || 'GET';

  var request = new XMLHttpRequest();
  request.open(method, url);
  if (dataType === 'json') {
    request.overrideMimeType('application/json');
    request.responseType = 'json';
    request.setRequestHeader('Accept', 'application/json');
  }

  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      onSuccess(request.response);
    } else {
      onError(request.response);
    }
  };

  request.onerror = onError;

  request.send(opts.body);
}

const isHighlightNextLine = tokens =>
  Array.isArray(tokens) &&
  tokens.some(
    token =>
      token.types[0] === 'comment' && token.content === '// highlight-next-line'
  );

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

export const CodeEditor = ({ children, className, live, noInline }) => {
  const language = className && className.split('-').pop();

  const { value } = useTheme();

  const theme = value === 'dark' ? nightOwl : duotoneLight;

  return language === 'js' || (live && language === 'jsx') ? (
    <CodeLiveEditor
      code={children}
      theme={theme}
      language={language}
      noInline={noInline}
    />
  ) : language ? (
    <CodeSnippet code={children} language={language} theme={theme} />
  ) : (
    <code className="language-text">{children}</code>
  );
};

const injectedGlobals = { sanitize, shallowConcat, ajax };

const CodeLiveEditor = ({ code, theme, language, noInline }) => {
  return (
    <div className="code-editor">
      <LiveProvider
        code={code}
        scope={injectedGlobals}
        transformCode={language === 'js' ? wrapJsCode : undefined}
        theme={theme}
        language="jsx"
        noInline={noInline}
      >
        <header>
          <span>Code Editor</span>
          <CopyCodeButton code={code} />
        </header>
        <LiveEditor />
        <LiveError className="code-error" />
        <LivePreview className="code-preview" />
      </LiveProvider>
    </div>
  );
};

const CodeSnippet = React.memo(({ code, language, theme }) => {
  return (
    <div className="code-snippet">
      <header>
        <CopyCodeButton code={code} />
      </header>
      <Highlight
        {...defaultProps}
        theme={theme}
        code={code}
        language={language}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className} style={style}>
            {tokens
              .map((currentLine, index, allLines) => ({
                line: currentLine,
                isHighlighted: isHighlightNextLine(allLines[index - 1]),
              }))
              .filter(({ line }) => !isHighlightNextLine(line))
              .map(({ line, isHighlighted }, i) => (
                <div
                  {...getLineProps({
                    line,
                    key: i,
                    className: isHighlighted
                      ? 'highlighted-code-line'
                      : undefined,
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
    </div>
  );
});

function CopyCodeButton({ code }) {
  const [showPopup, setShowPopup] = React.useState(false);

  function copyCode() {
    copyToClipboard(code);
    setShowPopup(true);
  }

  return (
    <Popover
      isOpen={showPopup}
      position="top"
      align="end"
      content={<PopoverContent>Copied to clipboard!</PopoverContent>}
      onClickOutside={() => setShowPopup(false)}
    >
      <Button onClick={copyCode} size="small" raised>
        Copy Code
      </Button>
    </Popover>
  );
}
