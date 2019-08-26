import { lerp } from 'canvas-sketch-util/math';
import randomUtil from 'canvas-sketch-util/random';
import inside from 'point-in-polygon';
import React from 'react';
import { useAnimationFrame } from '../../hooks/use-animation-frame';
import { Button } from '../Button';
import { drawCircle, usePoints } from './art-lib';
import { board, container } from './mk.module.scss';
import { RepeatIcon } from '../svg-icons';

const M = [
  [50, 150],
  [120, 150],
  [140, 250],
  [175, 150],
  [240, 150],
  [240, 315],
  [195, 315],
  [195, 200],
  [158, 315],
  [115, 315],
  [86, 200],
  [86, 315],
  [50, 315],
];

const K = [
  [275, 150],
  [330, 150],
  [330, 150],
  [330, 228],
  [387, 150],
  [444, 150],
  [386, 228],
  [444, 315],
  [387, 315],
  [330, 228],
  [330, 315],
  [275, 315],
];

const radius = 0.004;
const palette = ['#f77825', '#d3ce3d', '#f1efa5', '#60b99a'];

const reducer = (state, action) => {
  switch (action.type) {
    case 'next':
      return state.amplitude > 0
        ? {
            amplitude: state.amplitude - 0.01,
            frequency: state.frequency + 0.01,
          }
        : state;

    default:
      throw new Error(`action.type not implemented : ${action.type}`);
  }
};

const MKAnimation = ({ width = 500, height = 500, onAnimationEnd }) => {
  const [seed] = React.useState(() => randomUtil.getRandomSeed());
  const random = randomUtil.createRandom(seed);
  const [{ amplitude, frequency }, dispatch] = React.useReducer(reducer, {
    amplitude: 2,
    frequency: -3,
  });
  const canvasRef = React.useRef();

  React.useEffect(() => {
    if (amplitude <= 0) {
      onAnimationEnd();
    }
  }, [amplitude, onAnimationEnd]);

  const points = usePoints({
    random,
    amplitude,
    palette,
    frequency,
    withNoise: true,
    count: 50,
  });

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    const margin = width * 0.05;
    context.fillStyle = 'black';
    context.fillRect(0, 0, canvas.width, canvas.height);

    points
      .filter(({ oriPosition: [u, v] }) => {
        const x = lerp(0, width, u);
        const y = lerp(0, height, v);
        return inside([x, y], M) || inside([x, y], K);
      })
      .forEach(({ position: [u, v], color }) => {
        const x = lerp(margin, width - margin, u);
        const y = lerp(margin, height - margin, v);
        drawCircle(context, {
          x,
          y,
          radius: radius * width * (Math.abs(random.gaussian()) + 0.2),
          stroke: 'black',
          fill: color,
          width: width * 0.005,
        });
      });
  }, [random, points, height, width]);

  useAnimationFrame(() => dispatch({ type: 'next' }));

  return (
    <div>
      <canvas className={board} width={width} height={height} ref={canvasRef} />
    </div>
  );
};

export const MK = () => {
  const [animationEnd, setAnimationEnd] = React.useState(false);
  const [key, setKey] = React.useState(0);

  const onAnimationEnd = React.useCallback(() => setAnimationEnd(true), []);

  return (
    <div className={container}>
      <MKAnimation key={key} onAnimationEnd={onAnimationEnd} />
      {animationEnd && (
        <div>
          <Button
            raised
            color="primary"
            onClick={() => {
              setKey(k => k + 1);
              setAnimationEnd(false);
            }}
          >
            <RepeatIcon aria-hidden="true" focusable="false" />
            <span className="sr-only">Repeat</span>
          </Button>
        </div>
      )}
    </div>
  );
};
