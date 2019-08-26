import { lerp } from 'canvas-sketch-util/math';
import randomUtil from 'canvas-sketch-util/random';
import palettes from 'nice-color-palettes';
import inside from 'point-in-polygon';
import React from 'react';
import { Button } from '../Button';
import { board, container } from './mk.module.scss';

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
  [330, 229],
  [330, 315],
  [275, 315],
];

const useAnimationFrame = callback => {
  // Use useRef for mutable variables that we want to persist
  // without triggering a re-render on their change
  const requestRef = React.useRef();
  const previousTimeRef = React.useRef();

  const animate = time => {
    if (previousTimeRef.current != undefined) {
      const deltaTime = time - previousTimeRef.current;
      callback(deltaTime);
    }
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  };

  React.useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, []); // Make sure the effect runs only once
};

function drawCircle(
  context,
  {
    x,
    y,
    radius,
    from = 0,
    to = Math.PI * 2,
    clockwise = false,
    stroke,
    fill,
    width,
  }
) {
  context.beginPath();
  context.arc(x, y, radius, from, to, clockwise);

  if (stroke) {
    context.strokeStyle = stroke;
    if (width) {
      context.lineWidth = width;
    }

    context.stroke();
  }

  if (fill) {
    context.fillStyle = fill;
    context.fill();
  }
}

const radius = 0.005;
const palette = ['#f77825', '#d3ce3d', '#f1efa5', '#60b99a'];

const MKAnimation = ({ width = 500, height = 500, onAnimationEnd }) => {
  const [seed] = React.useState(() => randomUtil.getRandomSeed());
  const [amplitude, setAmplitude] = React.useState(5);
  const [frequency] = React.useState(10);
  const random = randomUtil.createRandom(seed);
  const canvasRef = React.useRef();

  React.useEffect(() => {
    if (amplitude <= 0) {
      onAnimationEnd();
    }
  }, [amplitude]);

  const points = React.useMemo(() => {
    function createGrid(
      count,
      amplitude,
      frequency,
      palette,
      withNoise = false
    ) {
      const points = [];
      for (let i = 0; i < count; i++) {
        for (let j = 0; j < count; j++) {
          const u = count <= 1 ? 0.5 : i / (count - 1);
          const v = count <= 1 ? 0.5 : j / (count - 1);
          const dif = withNoise
            ? amplitude * random.noise2D(u * frequency, v * frequency)
            : 0;
          const x = u + dif;
          const y = v + dif;
          points.push({
            oriPosition: [u, v],
            position: [x, y],
            color: random.pick(palette),
          });
        }
      }
      return points;
    }

    return createGrid(40, amplitude, frequency, palette, true);
  }, [random, amplitude, frequency, palette]);

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

  useAnimationFrame(() => setAmplitude(amp => (amp > 0 ? amp - 0.01 : amp)));

  return (
    <div>
      <canvas className={board} width={width} height={height} ref={canvasRef} />
    </div>
  );
};

export const MK = () => {
  const [animationEnd, setAnimationEnd] = React.useState(false);
  const [key, setKey] = React.useState(0);

  return (
    <div className={container}>
      <MKAnimation key={key} onAnimationEnd={() => setAnimationEnd(true)} />
      {animationEnd && (
        <div>
          <Button
            raised
            onClick={() => {
              setKey(k => k + 1);
              setAnimationEnd(false);
            }}
          >
            Rerun
          </Button>
        </div>
      )}
    </div>
  );
};
