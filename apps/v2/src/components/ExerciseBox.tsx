import {
  SandpackCodeEditor,
  SandpackLayout,
  SandpackProvider,
  SandpackTests,
} from '@codesandbox/sandpack-react';
import * as React from 'react';
import { clsx } from 'clsx';
import { ChevronLeftIcon, LightBulbIcon } from './icons';

export interface ExerciseBoxProps {
  exercise: {
    question: string;
    test: string;
    solution: string;
    extension: string;
  };
  heading: string;
}

export const ExerciseBox = ({ exercise, heading }: ExerciseBoxProps) => {
  const { extension } = exercise;

  const [showAnswer, toggleShowAnswer] = React.useReducer((x) => !x, false);

  const headingNode = (
    <div className="flex justify-between items-center py-1">
      <div>{heading}</div>
      <button
        className="inline-flex items-center gap-1 px-3 py-1 text-sm rounded shadow active:shadow-inner"
        type="button"
        onClick={toggleShowAnswer}
      >
        {showAnswer ? (
          <>
            <ChevronLeftIcon aria-label="Go back to" width={16} height={16} />
            Exercise
          </>
        ) : (
          <>
            <LightBulbIcon aria-hidden width={16} height={16} />
            Answer
          </>
        )}
      </button>
    </div>
  );

  if (isSupportedLanguage(extension)) {
    const files = filesMap[extension];

    return (
      <div>
        {headingNode}
        <SandpackProvider
          template={templateByLanguage[extension]}
          files={{
            [files.entry]: showAnswer
              ? { code: exercise.solution, readOnly: true }
              : exercise.question,
            [files.test]: { code: exercise.test, readOnly: true },
          }}
        >
          <SandpackLayout>
            <SandpackCodeEditor showLineNumbers showTabs={!showAnswer} />
            <div className={clsx('flex-1 h-[--sp-layout-height]', showAnswer && 'hidden')}>
              <SandpackTests
                hideTestsAndSupressLogs
                showVerboseButton={false}
                showWatchButton={false}
                className="h-full"
              />
            </div>
          </SandpackLayout>
        </SandpackProvider>
      </div>
    );
  }

  return (
    <div>
      {headingNode}
      <pre>{exercise.question}</pre>
      <pre>{exercise.test}</pre>
      <pre>{exercise.solution}</pre>
    </div>
  );
};

const isSupportedLanguage = (extension: string): extension is 'js' | 'ts' | 'jsx' | 'tsx' =>
  /^[j|t]sx?$/.test(extension);

const templateByLanguage = {
  js: 'vanilla',
  ts: 'vanilla-ts',
  jsx: 'react',
  tsx: 'react-ts',
} as const;

const filesMap = {
  js: { entry: '/index.js', test: '/index.spec.js' },
  jsx: { entry: '/src/index.jsx', test: '/index.spec.jsx' },
  ts: { entry: '/index.ts', test: '/index.spec.ts' },
  tsx: { entry: '/src/index.tsx', test: '/index.spec.tsx' },
} satisfies Record<
  string,
  {
    entry: string;
    test: string;
  }
>;
