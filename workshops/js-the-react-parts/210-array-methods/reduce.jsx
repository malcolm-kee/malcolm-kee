import cx from 'classnames';
import React from 'react';
import { Button } from '../../../src/components/Button';
import {
  box,
  item0,
  item1,
  item2,
  item3,
  activated,
  container,
  innerContainer,
} from './reduce.module.scss';

export function ReduceAnimation() {
  const [runState, setRunState] = React.useState('not_run');

  return (
    <div>
      <div className={cx(container, runState !== 'not_run' && activated)}>
        <div className={innerContainer}>
          <div className={`${box} ${item0}`} />
          <div className={`${box} ${item1}`} />
          <div className={`${box} ${item2}`} />
          <div
            className={`${box} ${item3}`}
            onAnimationEnd={() => setRunState('complete')}
          />
        </div>
      </div>
      <div className="Toolbar center">
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
