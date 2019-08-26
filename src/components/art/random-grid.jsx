import { lerp } from 'canvas-sketch-util/math';
import random from 'canvas-sketch-util/random';
import palettes from 'nice-color-palettes';
import React from 'react';
import { getContrastTextColor } from '../../helper';
import { Button } from '../Button';
import { Field } from '../Field';
import { RandomIcon } from '../svg-icons';
import { ThemeToggle } from '../theme-toggle';
import { board, box, container, controls } from './random-grid.module.scss';

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

function createGrid(count, amplitude, frequency, palette, withNoise = false) {
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
        position: [x, y],
        color: random.pick(palette),
      });
    }
  }
  return points;
}

const ColorBox = ({ color }) => (
  <span
    className={box}
    style={{ background: color, color: getContrastTextColor(color) }}
  >
    {color}
  </span>
);

export const RandomGrid = ({ width = 500, height = 500 }) => {
  const [seed, setSeed] = React.useState(() => random.getRandomSeed());
  const [amplitude, setAmplitude] = React.useState(0.07);
  const [frequency, setFrequency] = React.useState(3);
  React.useEffect(() => {
    random.setSeed(seed);
  }, [seed]);

  const palette = React.useMemo(() => random.pick(palettes), [seed]);

  const points = React.useMemo(
    () => createGrid(40, amplitude, frequency, palette, true),
    [seed, amplitude, frequency, palette]
  );

  const canvasRef = React.useRef();

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);

    const margin = width * 0.05;
    context.fillStyle = 'white';
    context.fillRect(0, 0, canvas.width, canvas.height);

    points
      .filter(() => Math.abs(random.gaussian()) > 0.4)
      .forEach(({ position: [u, v], color }) => {
        const x = lerp(margin, width - margin, u);
        const y = lerp(margin, height - margin, v);
        drawCircle(context, {
          x,
          y,
          radius: radius * width * (Math.abs(random.gaussian()) + 0.1),
          stroke: 'black',
          fill: color,
          width: width * 0.005,
        });
      });
  }, [width, height, points]);

  return (
    <div>
      <div className={container}>
        <div>
          <h1>Random Grid</h1>
          <canvas
            className={board}
            ref={canvasRef}
            width={width}
            height={height}
          />
        </div>
        <div className={controls}>
          <div>
            <Button
              color="primary"
              raised
              onClick={() => setSeed(random.getRandomSeed())}
            >
              <RandomIcon aria-hidden="true" focusable="false" />
              <span className="sr-only">Randomize</span>
            </Button>
          </div>
          <Field
            label="Seed"
            name="seed"
            value={seed}
            onChangeValue={setSeed}
          />
          <div>
            {palette.map((p, i) => (
              <ColorBox color={p} key={i} />
            ))}
          </div>
          <Field
            label="Amplitude"
            name="amplitude"
            type="number"
            step="0.01"
            value={amplitude}
            onChangeValue={setAmplitude}
          />
          <Field
            label="Frequency"
            name="frequency"
            type="number"
            step="1"
            value={frequency}
            onChangeValue={setFrequency}
          />
          <div>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </div>
  );
};
