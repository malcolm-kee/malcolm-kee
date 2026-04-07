import { formatCode } from '@mkee/react-compiler-playground';
import {
  ReactCompilerPlayground,
  type ReactCompilerPlaygroundProps,
} from './react-compiler-playground';
import * as React from 'react';

export const ReactCompilerPlaygroundBySelector = ({
  defaultSourceSelector,
  ...props
}: Omit<ReactCompilerPlaygroundProps, 'defaultSource'> & {
  defaultSourceSelector: string;
}) => {
  const [defaultSource, setDefaultSource] = React.useState('');

  React.useEffect(() => {
    const codeText = document.querySelector(defaultSourceSelector)?.textContent;

    if (codeText) {
      let isCurrent = true;

      formatCode(codeText).then((result) => {
        if (isCurrent) {
          setDefaultSource(result);
        }
      });

      return () => {
        isCurrent = false;
      };
    }
  }, [defaultSourceSelector]);

  return (
    <ReactCompilerPlayground {...props} defaultSource={defaultSource} key={defaultSource ? 1 : 0} />
  );
};
