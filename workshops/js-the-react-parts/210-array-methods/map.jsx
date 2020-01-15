import React from 'react';
import { Button } from '../../../src/components/Button';
import { Box, Circle } from '../../../src/components/shapes';
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
          <Box className="box" />
          <Circle className="box shrinked" />
          <Box className="box" />
          <Box className="box" />
          <Circle
            className="box shrinked"
            onTransitionEnd={() =>
              runState === 'running' && setRunState('complete')
            }
          />
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
