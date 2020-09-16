import { useMDXScope } from 'gatsby-plugin-mdx/context';
import MenuIcon from 'heroicons/react/outline/Menu';
import github from 'prism-react-renderer/themes/github';
import nightOwl from 'prism-react-renderer/themes/nightOwl';
import * as React from 'react';
import { LiveEditor, LiveError, LivePreview, LiveProvider } from 'react-live';
import { useDiffEffect } from '../hooks/use-diff-effect';
import { useId } from '../hooks/use-id';
import { scrollIntoView } from '../lib/dom';
import { useTheme } from '../theme';
import './code-renderer.scss';
import {
  CodeSnippet,
  HighlightedCode,
  LanguageIndicator,
} from './code-snippet';
import { removeHighlightComment, wrapJsCode } from './code-transformers';
import { Dropdown, DropdownOption } from './dropdown';
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
  const language = (className && className.split('-').pop()) || '';

  const [theme] = useTheme();

  const codeTheme = theme === 'dark' ? accessibleNightOwl : accessibleGithub;

  const code = typeof children === 'string' ? children.trim() : children;

  return live && /^(jsx?|ts|javascript|typescript)$/.test(language) ? (
    /^(ts|typescript)$/.test(language) ? (
      <TypescriptLiveEditor
        code={code}
        fileName={fileName}
        language={language}
        theme={codeTheme}
        themeMode={theme}
      />
    ) : (
      <CodeLiveEditor
        code={code}
        theme={codeTheme}
        themeMode={theme}
        language={language}
        noInline={noInline}
        fileName={fileName}
        previewOnly={previewOnly}
      />
    )
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

  const [isEdit, setIsEdit, editBtnRef] = useToggleContent();
  const id = 'code-editor' + useId();

  return (
    <CodeEditorContainer>
      <LiveProvider
        code={removeHighlightComment(code)}
        scope={injectedComponents}
        transformCode={language === 'js' ? wrapJsCode : undefined}
        theme={theme}
        language="jsx"
        noInline={language === 'js' ? false : noInline}
      >
        {!previewOnly && (
          <>
            <div className="relative px-1 py-1.5 flex justify-between items-center">
              <span>{fileName}</span>
              <Dropdown
                alignRight
                icon
                label={<MenuIcon />}
                className="text-gray-600 dark:text-gray-200"
                ref={editBtnRef}
              >
                {isEdit ? (
                  <DropdownOption onSelect={() => setIsEdit(false)}>
                    Done Edit
                  </DropdownOption>
                ) : (
                  <DropdownOption onSelect={() => setIsEdit(true)}>
                    Edit
                  </DropdownOption>
                )}
              </Dropdown>
              <LanguageIndicator language={language} />
            </div>
            {isEdit ? (
              <>
                <LiveEditor
                  // eslint-disable-next-line jsx-a11y/no-autofocus
                  autoFocus
                  onKeyDown={(ev) => {
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
    </CodeEditorContainer>
  );
};

const TypescriptLiveEditor = ({
  fileName,
  code,
  language,
  themeMode,
  theme,
}) => {
  const [latestTsCode, setTsCode] = React.useState(code);
  const [jsCode, setJsCode] = React.useState('');
  const [executedCode, setExecutedCode] = React.useState('');

  const [isEdit, setIsEdit, editBtnRef] = useToggleContent();
  const previewRef = React.useRef(null);
  React.useEffect(() => {
    if (previewRef.current) {
      scrollIntoView(previewRef.current, 'center');
    }
  }, [executedCode]);

  const [estimatedHeight, setEstimatedHeight] = React.useState(undefined);
  const codeRef = React.useRef();
  React.useEffect(() => {
    if (codeRef.current) {
      const { height } = codeRef.current.getBoundingClientRect();
      setEstimatedHeight(height);
    }
  }, [isEdit]);

  return (
    <CodeEditorContainer>
      <div className="relative px-1 py-1.5 flex justify-between items-center">
        <span>{fileName}</span>
        <Dropdown
          alignRight
          icon
          label={<MenuIcon />}
          className="text-gray-600 dark:text-gray-200"
          ref={editBtnRef}
        >
          {isEdit && jsCode && (
            <DropdownOption onSelect={() => setExecutedCode(jsCode)}>
              Run Code
            </DropdownOption>
          )}
          {isEdit ? (
            <DropdownOption onSelect={() => setIsEdit(false)}>
              Done Edit
            </DropdownOption>
          ) : (
            <DropdownOption onSelect={() => setIsEdit(true)}>
              Edit
            </DropdownOption>
          )}
        </Dropdown>
        <LanguageIndicator language={language} />
      </div>
      {isEdit ? (
        <>
          <TypescriptEditor
            code={latestTsCode}
            theme={themeMode}
            onChange={setTsCode}
            onEmitCode={setJsCode}
            onEscape={() => setIsEdit(false)}
            height={estimatedHeight}
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus
          />
          {executedCode && (
            <LiveProvider
              code={executedCode}
              scope={injectedGlobals}
              transformCode={wrapJsCode}
              theme={theme}
              language="jsx"
              key={executedCode}
            >
              <LiveError className="code-error" />
              <div ref={previewRef}>
                <LivePreview className="code-preview" />
              </div>
            </LiveProvider>
          )}
        </>
      ) : (
        <HighlightedCode
          code={latestTsCode}
          theme={theme}
          language="typescript"
          ref={codeRef}
        />
      )}
    </CodeEditorContainer>
  );
};

const CodeEditorContainer = ({ children }) => (
  <div className="code-editor px-1 pb-1 rounded">{children}</div>
);

const useToggleContent = () => {
  const [show, setShow] = React.useState(false);
  const showBtnRef = React.useRef(null);

  useDiffEffect(
    (prev) => {
      if (prev && prev[0] && !show) {
        showBtnRef.current && showBtnRef.current.focus();
      }
    },
    [show]
  );

  return [show, setShow, showBtnRef];
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
  styles: github.styles.map((style) =>
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
      : style.types.indexOf('function') !== -1
      ? {
          ...style,
          style: {
            ...style.style,
            color: '#d43746',
          },
        }
      : style
  ),
};

const accessibleNightOwl = {
  ...nightOwl,
  styles: nightOwl.styles.map((style) =>
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
