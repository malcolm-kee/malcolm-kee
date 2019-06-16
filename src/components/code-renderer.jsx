import Highlight, { defaultProps } from 'prism-react-renderer';
import duotoneLight from 'prism-react-renderer/themes/duotoneLight';
import nightOwl from 'prism-react-renderer/themes/nightOwl';
import React from 'react';
import { LiveEditor, LiveError, LivePreview, LiveProvider } from 'react-live';
import { copyToClipboard } from '../helper';
import { useTheme } from '../theme';
import { Button } from './Button';
import './code-renderer.scss';
import { transformTokens, wrapJsCode } from './code-transformers';
import { Popover, PopoverContent } from './popover';
import { EditIcon, EyeIcon } from './svg-icons';

export const CodeRenderer = ({
  children,
  className,
  live,
  noInline,
  fileName,
}) => {
  const language = className && className.split('-').pop();

  const { value } = useTheme();

  const theme = value === 'dark' ? nightOwl : duotoneLight;

  return language === 'js' || (live && language === 'jsx') ? (
    <CodeLiveEditor
      code={children}
      theme={theme}
      language={language}
      noInline={noInline}
      fileName={fileName}
    />
  ) : language ? (
    <CodeSnippet
      code={children}
      language={language}
      theme={theme}
      fileName={fileName}
    />
  ) : (
    <code className="language-text">{children}</code>
  );
};

const injectedGlobals = { sanitize, shallowConcat, ajax };

const CodeLiveEditor = ({ code, theme, language, noInline, fileName }) => {
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
          <div className="code-editor-icon">
            <EditIcon />
          </div>
          {fileName && <span>{fileName}</span>}
          <CopyCodeButton code={code} />
          <span className="code-editor-language">{language}</span>
        </header>
        <LiveEditor />
        <LiveError className="code-error" />
        <LivePreview className="code-preview" />
      </LiveProvider>
    </div>
  );
};

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

const CodeSnippet = React.memo(function CodeSnippetComponent({
  code,
  language,
  theme,
  fileName,
}) {
  return (
    <div className="code-snippet">
      <header>
        <div className="code-snippet-icon">
          <EyeIcon />
        </div>
        {fileName && <span>{fileName}</span>}
        <CopyCodeButton code={code} />
        <span className="code-snippet-language">
          {shortenLanguage(language)}
        </span>
      </header>
      <Highlight
        {...defaultProps}
        theme={theme}
        code={code}
        language={language}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className} style={style}>
            {transformTokens(tokens).map(({ line, isHighlighted }, i) => {
              return (
                <div
                  {...getLineProps({
                    line,
                    key: i,
                    className: isHighlighted
                      ? 'highlighted-code-line'
                      : undefined,
                  })}
                >
                  {line.map((token, key) => {
                    return <span {...getTokenProps({ token, key })} />;
                  })}
                </div>
              );
            })}
          </pre>
        )}
      </Highlight>
    </div>
  );
});

/**
 *
 * @param {string} language
 */
const shortenLanguage = language =>
  language && /javascript/i.test(language) ? 'js' : language;

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