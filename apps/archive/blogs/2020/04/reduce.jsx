import cx from 'classnames';
import * as React from 'react';
import { Button } from '../../../src/components/Button';
import { Box } from '../../../src/components/shapes';
import { activated, container, innerContainer } from './reduce.module.scss';

export function ReduceAnimation() {
  const [runState, setRunState] = React.useState('not_run');

  return (
    <div>
      <div className={container}>
        <div
          className={cx(innerContainer, runState !== 'not_run' && activated)}
        >
          <Box />
          <Box />
          <Box />
          <Box onAnimationEnd={() => setRunState('complete')} />
        </div>
      </div>
      <div className="my-2 h-12 flex justify-center items-center">
        {runState !== 'running' && (
          <Button
            color="primary"
            raised
            onClick={() =>
              setRunState(runState === 'not_run' ? 'running' : 'not_run')
            }
          >
            {runState === 'complete' ? 'Restart' : 'Run'}
          </Button>
        )}
      </div>
    </div>
  );
}
