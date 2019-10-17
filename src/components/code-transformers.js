import { includes } from '../lib/array';

/**
 * wrap js code with a React component that expose `console.log` and
 * renders the logs
 * @param {string} code
 */
export const wrapJsCode = code => `
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
              <div className="log-output-container" tabIndex={0}> ${
                '' /* add tabIndex as this is scrollable */
              }
              {this.state.logs.map((log, index) => 
                <div
                  className="log-output" 
                  key={index} 
                  dangerouslySetInnerHTML={{ __html: sanitize(log) }} 
                />)
              }
              </div>
          );
      }
  }
`;

/**
 * transformCodeToken to identify highlight comments:
 * - highlight-next-line
 * - highlight-start
 * - highlight-end
 * - hightlight-line
 * @param {Array} tokens
 * @param {Array<number>} highlightedLineIndexes
 */
export function transformTokens(tokens, highlightedLineIndexes) {
  const results = [];
  let keepHighlighting = false;

  tokens
    .map(currentLine => ({
      line: currentLine,
      isNextLineHighlighted: isHighlightNextLine(currentLine),
    }))
    .forEach((currentLine, index, allTokens) => {
      if (isHighlightStart(currentLine.line)) {
        keepHighlighting = true;
        return;
      }

      if (isHighlightEnd(currentLine.line)) {
        keepHighlighting = false;
        return;
      }

      if (!currentLine.isNextLineHighlighted) {
        const prevLine = allTokens[index - 1];

        const highlightLineCommentIndex = findHighlightLineCommentIndex(
          currentLine.line
        );

        const sanitizedToken =
          highlightLineCommentIndex === -1
            ? currentLine.line
            : currentLine.line.filter(
                (_, index) => index !== highlightLineCommentIndex
              );

        const highlightCurrentLine =
          keepHighlighting ||
          !!(prevLine && prevLine.isNextLineHighlighted) ||
          includes(highlightedLineIndexes, index) ||
          highlightLineCommentIndex !== -1;

        results.push({
          line: sanitizedToken,
          isHighlighted: highlightCurrentLine,
        });
      }
    });

  return results;
}

const isHighlightNextLine = tokens =>
  Array.isArray(tokens) &&
  tokens.some(
    token =>
      includes(token.types, 'comment') &&
      includes(token.content, 'highlight-next-line')
  );

const isHighlightStart = tokens =>
  Array.isArray(tokens) &&
  tokens.some(
    token =>
      includes(token.types, 'comment') &&
      includes(token.content, 'highlight-start')
  );

const isHighlightEnd = tokens =>
  Array.isArray(tokens) &&
  tokens.some(
    token =>
      includes(token.types, 'comment') &&
      includes(token.content, 'highlight-end')
  );

/**
 *
 * @param {Array} tokens
 */
const findHighlightLineCommentIndex = tokens =>
  tokens.findIndex(
    token =>
      includes(token.types, 'comment') &&
      includes(token.content, 'highlight-line')
  );
