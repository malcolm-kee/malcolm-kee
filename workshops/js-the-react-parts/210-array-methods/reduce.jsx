import React from 'react';
import './reduce.scss';

export function ReduceAnimation() {
  const [runState, setRunState] = React.useState('not_run');

  return (
    <div>
      <div
        className={runState !== 'not_run' ? 'activated' : undefined}
        id="reduce-demo"
      >
        <div className="box-container">
          <div className="box item-0" />
          <div className="box item-1" />
          <div className="box item-2" />
          <div
            className="box item-3"
            onAnimationEnd={() => setRunState('complete')}
          />
        </div>
      </div>
      <div className="Toolbar center">
        {runState !== 'running' && (
          <button
            className="btn btn-primary btn-raised"
            onClick={() =>
              setRunState(runState === 'not_run' ? 'running' : 'not_run')
            }
          >
            {runState === 'complete' ? 'Restart' : 'Run'}
          </button>
        )}
      </div>
    </div>
  );
}
