import { clsx } from 'clsx';
import * as React from 'react';
import { Box } from '~/components/shapes';
import styles from './reduce.module.scss';

const Button = (props) => <button type="button" {...props} />;

export function ReduceAnimation() {
  const [runState, setRunState] = React.useState('not_run');

  return (
    <div>
      <div className={styles.container}>
        <div className={clsx(styles.innerContainer, runState !== 'not_run' && styles.activated)}>
          <Box />
          <Box />
          <Box />
          <Box onAnimationEnd={() => setRunState('complete')} />
        </div>
      </div>
      <div className="my-2 h-12 flex justify-center items-center">
        {runState !== 'running' && (
          <Button onClick={() => setRunState(runState === 'not_run' ? 'running' : 'not_run')}>
            {runState === 'complete' ? 'Restart' : 'Run'}
          </Button>
        )}
      </div>
    </div>
  );
}
