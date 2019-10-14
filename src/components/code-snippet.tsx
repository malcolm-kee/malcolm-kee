import Highlight, {
  defaultProps,
  Language,
  PrismTheme,
} from 'prism-react-renderer';
import * as React from 'react';
import { transformTokens } from './code-transformers';
import { CopyButton } from './copy-button';

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
    <div className="code-snippet">
      <div className="code-snippet-header-container">
        <div className="code-snippet-header">
          <span />
          {fileName && <span>{fileName}</span>}
          <CopyButton contentToCopy={code} />
        </div>
        <span className="code-snippet-language">
          {shortenLanguage(language)}
        </span>
      </div>
      {highlightedCode}
    </div>
  );
};

interface HighlightedCodeProps {
  theme: PrismTheme;
  code: string;
  language: Language;
  highlightedLines?: string;
}

export const HighlightedCode = React.memo(function HighlightedCodeComponent({
  theme,
  code,
  language,
  highlightedLines,
}: HighlightedCodeProps) {
  const lineIndexesToHighlight =
    typeof highlightedLines === 'string'
      ? highlightedLines.split(',').map(num => Number(num) - 1)
      : [];

  return (
    <Highlight {...defaultProps} theme={theme} code={code} language={language}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        // tabIndex because this is scrollable
        <pre className={className} style={style} tabIndex={0}>
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
});

const shortenLanguage = (language: string) =>
  language && /javascript/i.test(language) ? 'js' : language;
