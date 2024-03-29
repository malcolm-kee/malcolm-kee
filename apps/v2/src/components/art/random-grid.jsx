import { lerp } from 'canvas-sketch-util/math';
import randomUtil from 'canvas-sketch-util/random';
import palettes from 'nice-color-palettes';
import * as React from 'react';
import { LightBulbIcon } from '~/components/icons';
import { drawCircle, getContrastTextColor, usePoints } from './art-lib';
import { Button } from './button';
import { Checkbox } from './checkbox';
import { Field } from './field';
import { board, box, container } from './random-grid.module.scss';

const radius = 0.005;

const ColorBox = ({ color }) => (
  <span className={box} style={{ background: color, color: getContrastTextColor(color) }}>
    {color}
  </span>
);

export const RandomGrid = ({ width = 500, height = 500 }) => {
  const [seed, setSeed] = React.useState(() => randomUtil.getRandomSeed());
  const random = randomUtil.createRandom(seed);
  const [amplitude, setAmplitude] = React.useState(0.07);
  const [frequency, setFrequency] = React.useState(3);
  const [withNoise, setWithNoise] = React.useState(true);

  const palette = React.useMemo(() => random.pick(palettes), [random]);

  const points = usePoints({
    count: 40,
    random,
    amplitude,
    frequency,
    palette,
    withNoise,
  });

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
  }, [width, height, points, random]);

  return (
    <div>
      <div className={container}>
        <div className="pb-6">
          <h2 className="py-4 text-gray-700 dark:text-gray-300 text-2xl">Random Grid</h2>
          <canvas className={board} ref={canvasRef} width={width} height={height} />
        </div>
        <div className="flex flex-col gap-5">
          <div>
            <Button onClick={() => setSeed(random.getRandomSeed())} className="text-gray-200">
              <LightBulbIcon
                aria-hidden="true"
                focusable="false"
                className="fill-current"
                width={24}
              />
              <span className="sr-only">Randomize</span>
            </Button>
          </div>
          <Field
            label="Seed"
            name="seed"
            value={seed}
            onChangeValue={setSeed}
            labelClassName="dark:text-gray-500"
          />
          <div>
            {palette.map((p, i) => (
              <ColorBox color={p} key={i} />
            ))}
          </div>
          <Checkbox
            name="with-noise"
            label="Noise"
            onChangeValue={setWithNoise}
            checked={withNoise}
          />
          {withNoise && (
            <>
              <Field
                label="Nose Amplitude"
                name="amplitude"
                type="number"
                step="0.01"
                value={amplitude}
                onChangeValue={setAmplitude}
                labelClassName="dark:text-gray-500"
              />
              <Field
                label="Noise Frequency"
                name="frequency"
                type="number"
                step="1"
                value={frequency}
                onChangeValue={setFrequency}
                labelClassName="dark:text-gray-500"
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};
