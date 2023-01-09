import * as React from 'react';
import { Button } from '../../../../src/components/Button';
import { Scenario } from '../elements/scenario';
import { DrawingObject } from '../elements/type';
import { AnimationContext } from './animation-context';

export type SceneProps = {
  width?: number;
  height?: number;
  pauseWhenAnyStop?: boolean;
  gridLines?: number;
  children: React.ReactNode;
} & JSX.IntrinsicElements['div'];

export const Scene = ({
  width = 250,
  height = 100,
  children,
  pauseWhenAnyStop = true,
  gridLines,
  ...divProps
}: SceneProps) => {
  const [isPlaying, setIsPlaying] = React.useState(false);

  const canvasDimension = React.useMemo(
    () => ({
      width,
      height,
    }),
    [width, height]
  );

  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const scenarioRef = React.useRef<Scenario | null>(null);

  React.useLayoutEffect(() => {
    const ctx = canvasRef.current && canvasRef.current.getContext('2d');
    if (ctx) {
      const prevScenario = scenarioRef.current;
      const newScenario = new Scenario(ctx, canvasDimension, {
        gridLines,
      });
      if (prevScenario) {
        prevScenario.getObjects().forEach(object => {
          newScenario.addObject(object);
        });
      }
      scenarioRef.current = newScenario;
      if (pauseWhenAnyStop) {
        return newScenario.addEventListener('objectPause', () => {
          newScenario.restart();
          setIsPlaying(false);
        });
      }
    }
  }, [canvasDimension, pauseWhenAnyStop, gridLines]);

  const registerObject = React.useCallback(function registerObject(
    dwgObject: DrawingObject
  ) {
    if (scenarioRef.current) {
      const scenario = scenarioRef.current;
      return scenario.addObject(dwgObject);
    }
    return () => {};
  },
  []);

  React.useEffect(() => {
    if (scenarioRef.current) {
      if (isPlaying) {
        scenarioRef.current.run();
      } else {
        scenarioRef.current.pause();
      }
    }
  }, [isPlaying]);

  const contextValue = React.useMemo(
    () => ({
      register: registerObject,
      toggleRunningState: () => setIsPlaying(p => !p),
    }),
    [registerObject]
  );

  return (
    <AnimationContext.Provider value={contextValue}>
      <div {...divProps}>
        <Canvas dimension={canvasDimension} ref={canvasRef} />
        {children}
        <div className="py-2 text-center">
          <Button onClick={() => setIsPlaying(p => !p)} color="primary">
            {isPlaying ? 'Pause' : 'Play'}
          </Button>
        </div>
      </div>
    </AnimationContext.Provider>
  );
};

const Canvas = React.forwardRef<
  HTMLCanvasElement,
  { dimension: { width: number; height: number } }
>(function Canvas({ dimension }, forwardedRef) {
  return (
    <canvas
      width={dimension.width}
      height={dimension.height}
      style={dimension}
      ref={forwardedRef}
      className="mx-auto bg-white"
    />
  );
});
