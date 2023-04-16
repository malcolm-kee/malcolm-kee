import { SandpackCodeEditor, SandpackProvider, SandpackTests } from '@codesandbox/sandpack-react';
import { githubLight, nightOwl } from '@codesandbox/sandpack-themes';
import { clsx } from 'clsx';
import * as React from 'react';
import { ChevronLeftIcon, LightBulbIcon } from './icons';
import { useThemeValue } from '~/hooks/use-theme';

export interface ExerciseBoxProps {
  exercise: {
    question: string;
    test: string;
    solution: string;
    extension: string;
    docs: string;
  };
  heading: string;
  headingTag?: 'h2' | 'h3' | 'h4';
}

export const ExerciseBox = ({
  exercise,
  heading,
  headingTag: Heading = 'h2',
}: ExerciseBoxProps) => {
  const { extension } = exercise;

  const [showAnswer, toggleShowAnswer] = React.useReducer((x) => !x, false);

  const siteTheme = useThemeValue();

  const codeThemes = React.useMemo(() => {
    if (siteTheme === 'dark') {
      return {
        primary: nightOwl,
        secondary: githubLight,
      };
    }

    return {
      primary: githubLight,
      secondary: nightOwl,
    };
  }, [siteTheme]);

  const headingNode = (
    <div className="flex justify-end items-center py-1">
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
        <Heading>{heading}</Heading>
        {exercise.docs && <div dangerouslySetInnerHTML={{ __html: exercise.docs }} />}
        {headingNode}
        <div className="overflow-hidden rounded-xl border border-gray-100 dark:border-zinc-600">
          <SandpackProvider
            template={templateByLanguage[extension]}
            files={{
              [files.entry]: showAnswer
                ? { code: exercise.solution, readOnly: true }
                : exercise.question,
              [files.test]: { code: exercise.test, readOnly: true },
            }}
            theme={showAnswer ? codeThemes.secondary : codeThemes.primary}
            key={showAnswer ? 'solution' : 'problem'}
          >
            <SandpackCodeEditor showLineNumbers showTabs={!showAnswer} initMode="user-visible" />
            <div
              className={clsx(
                'border-t border-gray-100 dark:border-zinc-600',
                showAnswer && 'hidden'
              )}
            >
              <SandpackTests
                hideTestsAndSupressLogs
                showVerboseButton={false}
                showWatchButton={false}
              />
            </div>
          </SandpackProvider>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Heading>{heading}</Heading>
      {exercise.docs && <div dangerouslySetInnerHTML={{ __html: exercise.docs }} />}
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
