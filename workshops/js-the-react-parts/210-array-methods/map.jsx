import React from 'react';
import { Button } from '../../../src/components/Button';
import './map.scss';

export function MapAnimation() {
  const [runState, setRunState] = React.useState('not_run');

  return (
    <div>
      <div
        className={runState !== 'not_run' ? 'activated' : undefined}
        id="map-demo"
      >
        <div className="box-container">
          <div className="box item-0" />
          <div className="box circle item-1" />
          <div className="box item-2" />
          <div className="box item-3" />
          <div
            className="box circle item-4"
            onTransitionEnd={() =>
              runState === 'running' && setRunState('complete')
            }
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
