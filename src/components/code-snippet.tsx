import Highlight, {
  defaultProps,
  Language,
  PrismTheme,
} from 'prism-react-renderer';
import * as React from 'react';
import { transformTokens } from './code-transformers';

interface CodeSnippetProps {
  code: string;
  language: Language;
  theme: PrismTheme;
  fileName?: string;
  noWrapper?: boolean;
  highlightedLines?: string;
}

export const CodeSnippet = ({
  code,
  language,
  theme,
  fileName,
  noWrapper,
  highlightedLines,
}: CodeSnippetProps) => {
  const highlightedCode = (
    <HighlightedCode
      code={code}
      theme={theme}
      language={language}
      highlightedLines={highlightedLines}
    />
  );

  return noWrapper ? (
    <div className="code-snippet-plain">{highlightedCode}</div>
  ) : (
    <div className="code-snippet p-1 rounded">
      <div className="relative">
        {fileName && <div className="px-1 pt-0.5 pb-1.5">{fileName}</div>}
        <LanguageIndicator language={language} />
      </div>
      {highlightedCode}
    </div>
  );
};

export const LanguageIndicator = (props: { language: string }) => (
  <span className="absolute top-full right-4 z-10 px-2 leading-5 text-sm uppercase rounded-b bg-blue-600 text-gray-100 dark:bg-blue-400 dark:text-gray-900">
    {shortenLanguage(props.language)}
  </span>
);

interface HighlightedCodeProps {
  theme: PrismTheme;
  code: string;
  language: Language;
  highlightedLines?: string;
}

export const HighlightedCode = React.memo(
  React.forwardRef<HTMLPreElement, HighlightedCodeProps>(
    function HighlightedCodeComponent(
      { theme, code, language, highlightedLines },
      ref
    ) {
      const lineIndexesToHighlight =
        typeof highlightedLines === 'string'
          ? highlightedLines.split(',').map((num) => Number(num) - 1)
          : [];

      return (
        <Highlight
          {...defaultProps}
          theme={theme}
          code={code}
          language={language}
        >
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            // tabIndex because this is scrollable
            // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
            <pre className={className} style={style} tabIndex={0} ref={ref}>
              {transformTokens(tokens, lineIndexesToHighlight).map(
                ({ line, isHighlighted }, i) => {
                  return (
                    <React.Fragment key={i}>
                      <div
                        {...getLineProps({
                          line,
                          className: isHighlighted
                            ? 'highlighted-code-line'
                            : undefined,
                        })}
                      >
                        {line.map((token: any, key: any) => {
                          return <span {...getTokenProps({ token, key })} />;
                        })}
                      </div>
                      {isHighlighted && <br />}
                    </React.Fragment>
                  );
                }
              )}
            </pre>
          )}
        </Highlight>
      );
    }
  )
);

const shortenLanguage = (language: string) =>
  language && /javascript/i.test(language) ? 'js' : language;
