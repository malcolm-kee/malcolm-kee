import { useMDXScope } from 'gatsby-plugin-mdx/context';
import github from 'prism-react-renderer/themes/github';
import nightOwl from 'prism-react-renderer/themes/nightOwl';
import React from 'react';
import { LiveEditor, LiveError, LivePreview, LiveProvider } from 'react-live';
import { useDiffEffect } from '../hooks/use-diff-effect';
import { useId } from '../hooks/use-id';
import { includes } from '../lib/array';
import { useTheme } from '../theme';
import { Button } from './Button';
import './code-renderer.scss';
import { CodeSnippet, HighlightedCode } from './code-snippet';
import { wrapJsCode } from './code-transformers';
import { CopyButton } from './copy-button';
import { EditIcon } from './svg-icons';
import { TypescriptEditor } from './typescript-editor';

export const CodeRenderer = ({
  children,
  className,
  live,
  noInline,
  previewOnly,
  noWrapper,
  fileName,
  highlightedLines,
}) => {
  const language = className && className.split('-').pop();

  const [theme] = useTheme();

  const codeTheme = theme === 'dark' ? accessibleNightOwl : accessibleGithub;

  const code = typeof children === 'string' ? children.trim() : children;

  // if (live && includes(['ts', 'tsx'], language)) {
  //   return <TypescriptEditor code={code} theme={theme} />;
  // }

  return live &&
    includes(
      ['js', 'jsx', 'javascript', 'ts', 'tsx', 'typescript'],
      language
    ) ? (
    <CodeLiveEditor
      code={code}
      theme={codeTheme}
      themeMode={theme}
      language={language}
      noInline={noInline}
      fileName={fileName}
      previewOnly={previewOnly}
    />
  ) : language ? (
    <CodeSnippet
      code={code}
      language={language}
      theme={codeTheme}
      fileName={fileName}
      noWrapper={noWrapper}
      highlightedLines={highlightedLines}
    />
  ) : (
    <code className="language-text">{code}</code>
  );
};

const injectedGlobals = { sanitize, shallowConcat };

/**
 * @todo the static code is currently not reflected the updated code. Waiting for https://github.com/FormidableLabs/react-live/pull/122.
 * Once that is fixed, we can make the copy works as well
 */
const CodeLiveEditor = ({
  code,
  theme,
  themeMode,
  language,
  noInline,
  fileName,
  previewOnly,
}) => {
  const components = useMDXScope();

  const injectedComponents = React.useMemo(
    () => ({
      ...injectedGlobals,
      ...components,
    }),
    [components]
  );

  const [isEdit, setIsEdit] = React.useState(false);
  const id = 'code-editor' + useId();
  const editBtnRef = React.useRef(null);

  useDiffEffect(
    prev => {
      if (prev && prev[0] && !isEdit) {
        editBtnRef.current && editBtnRef.current.focus();
      }
    },
    [isEdit]
  );
  const [latestCode, setCode] = React.useState(code);

  if (includes(['ts', 'tsx', 'typescript'], language)) {
    return (
      <div className="code-editor">
        <div className="code-editor-header-container">
          <div className="code-editor-header">
            {isEdit ? (
              <div className="code-editor-icon">
                <EditIcon />
              </div>
            ) : (
              <Button
                onClick={() => setIsEdit(true)}
                size="small"
                raised
                ref={editBtnRef}
              >
                Edit
              </Button>
            )}
            {fileName && <span>{fileName}</span>}
            <CopyButton contentToCopy={latestCode} />
          </div>
          <span className="code-editor-language">{language}</span>
        </div>
        {isEdit ? (
          <TypescriptEditor
            code={latestCode}
            theme={themeMode}
            onChange={setCode}
            onEscape={() => setIsEdit(false)}
            onBlur={() => setIsEdit(false)}
            autoFocus
          />
        ) : (
          <HighlightedCode
            code={latestCode}
            theme={theme}
            language="typescript"
          />
        )}
      </div>
    );
  }

  return (
    <div className="code-editor">
      <LiveProvider
        code={code}
        scope={injectedComponents}
        transformCode={language === 'js' ? wrapJsCode : undefined}
        theme={theme}
        language="jsx"
        noInline={noInline}
      >
        {!previewOnly && (
          <>
            <div className="code-editor-header-container">
              <div className="code-editor-header">
                {isEdit ? (
                  <div className="code-editor-icon">
                    <EditIcon />
                  </div>
                ) : (
                  <Button
                    onClick={() => setIsEdit(true)}
                    size="small"
                    raised
                    ref={editBtnRef}
                  >
                    Edit
                  </Button>
                )}
                {fileName && <span>{fileName}</span>}
                <CopyButton contentToCopy={code} />
              </div>
              <span className="code-editor-language">{language}</span>
            </div>
            {isEdit ? (
              <>
                <LiveEditor
                  autoFocus
                  onKeyDown={ev => {
                    if (ev.key === 'Escape') {
                      setIsEdit(false);
                    }
                  }}
                  onBlur={() => setIsEdit(false)}
                  textareaId={id}
                />
                <label className="sr-only" htmlFor={id}>
                  Live Code Editor
                </label>
              </>
            ) : (
              <HighlightedCode code={code} theme={theme} language="jsx" />
            )}
          </>
        )}
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

const accessibleGithub = {
  ...github,
  plain: {
    ...github.plain,
    backgroundColor: '#ffffff',
  },
  styles: github.styles.map(style =>
    style.types.indexOf('entity') !== -1
      ? {
          ...style,
          style: {
            color: '#347d7c',
          },
        }
      : style.types.indexOf('attr-name') !== -1
      ? {
          ...style,
          style: {
            color: '#0078a0',
          },
        }
      : style.types.indexOf('comment') !== -1
      ? {
          ...style,
          style: {
            ...style.style,
            color: '#77774d',
          },
        }
      : style
  ),
};

const accessibleNightOwl = {
  ...nightOwl,
  styles: nightOwl.styles.map(style =>
    style.types.indexOf('comment') !== -1
      ? {
          ...style,
          style: {
            ...style.style,
            color: 'rgb(110, 131, 131)',
          },
        }
      : style
  ),
};
