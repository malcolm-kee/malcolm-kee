import * as React from 'react';
import { Scenario } from '../elements/scenario';
import { FixedAccelerationSquare } from '../elements/fixed-acceleration-square';

export type SingleObjectMotionProps = {
  acceleration: number;
  initialSpeed: number;
  initialPosition: number;
  isPlaying: boolean;
  onEnd: () => void;
  canvasWidth?: number;
  canvasHeight?: number;
};

export const SingleObjectMotion = (props: SingleObjectMotionProps) => {
  const width = props.canvasWidth ?? 250;
  const height = props.canvasHeight ?? 100;
  const acceleration = props.acceleration ?? 0;

  const canvasDimension = React.useMemo(
    () => ({
      width,
      height,
    }),
    [height, width]
  );

  const onEndRef = React.useRef(props.onEnd);
  onEndRef.current = props.onEnd;

  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [scenario, setScenario] = React.useState<Scenario | null>(null);

  React.useEffect(() => {
    const canvasCtx = canvasRef.current && canvasRef.current.getContext('2d');
    if (canvasCtx) {
      const scenario = new Scenario(canvasCtx, canvasDimension, {
        onObjectHitBoundary: () => onEndRef.current(),
      });
      const item = new FixedAccelerationSquare({
        acceleration: [acceleration, 0],
        initial: {
          position: [props.initialPosition, height / 2],
          speed: [props.initialSpeed, 0],
        },
        size: [5, 5],
        color: '#38b2ac',
        withSpeedLabel: false,
      });
      scenario.addObject(item);
      setScenario(scenario);
    }
  }, [
    canvasDimension,
    acceleration,
    height,
    props.initialPosition,
    props.initialSpeed,
  ]);

  React.useEffect(() => {
    if (scenario) {
      if (props.isPlaying) {
        scenario.run();
      } else {
        scenario.pause();
      }
    }
  }, [props.isPlaying, scenario]);

  return (
    <canvas
      style={canvasDimension}
      ref={canvasRef}
      width={width}
      height={height}
      className="mx-auto shadow-inner bg-white rounded"
    />
  );
};
