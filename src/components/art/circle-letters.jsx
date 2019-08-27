import randomUtil from 'canvas-sketch-util/random';
import React from 'react';
import { useAnimationFrame } from '../../hooks/use-animation-frame';
import { Button } from '../Button';
import { Field } from '../Field';
import { RepeatIcon } from '../svg-icons';
import { drawCircle } from './art-lib';
import { board, h2, container } from './circle-letters.module.scss';

export const CircleLetter = () => {
  const [text, setText] = React.useState('MK');
  const [animationEnd, setAnimationEnd] = React.useState(false);
  const [key, setKey] = React.useState(0);

  const onAnimationEnd = React.useCallback(() => setAnimationEnd(true), []);

  return (
    <div className={container}>
      <div>
        <h2 className={h2}>Circle Letters</h2>
        <CircleLetterCanvas
          key={key}
          text={text}
          onAnimationEnd={onAnimationEnd}
        />
      </div>
      <div>
        <Field
          label="Characters"
          name="text"
          value={text}
          onChangeValue={setText}
          maxLength={2}
        />
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
    </div>
  );
};

const radius = 0.035;

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

const palette = ['#f77825', '#d3ce3d', '#f1efa5', '#60b99a'];

const CircleLetterCanvas = React.memo(
  ({ text, onAnimationEnd, width = 600, height = 400 }) => {
    const canvasRef = React.useRef(null);
    const hiddenCanvasRef = React.useRef(null);
    const [seed] = React.useState(() => randomUtil.getRandomSeed());
    const [points, setPoints] = React.useState([]);
    const [{ amplitude, frequency }, dispatch] = React.useReducer(reducer, {
      amplitude: 2,
      frequency: -3,
    });
    React.useEffect(() => {
      if (amplitude <= 0) {
        onAnimationEnd();
      }
    }, [amplitude, onAnimationEnd]);

    React.useEffect(() => {
      const random = randomUtil.createRandom(seed);
      const pts = [];

      /**
       * @type {HTMLCanvasElement}
       */
      const canvas = hiddenCanvasRef.current;
      const context = canvas.getContext('2d');
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.textAlign = 'left';
      context.font = '25px sans-serif';
      context.fillText(text, 8, 27);

      // data32 will be a one-dimensional array consists of the full 2D convas image data
      const data32 = new Uint32Array(
        context.getImageData(0, 0, width, height).data.buffer
      );

      for (let index = 0; index < data32.length; index++) {
        if (data32[index] & 0xff000000) {
          /* 
          check alpha mask, if it is not transparent, i.e. it is a pixel of the text,
          then we will push a point
          */
          const u = (index % width) * radius * 2 + radius;
          const v = ((index / width) | 0) * radius * 2 + radius; // the | here is Math.floor
          const diff = amplitude * random.noise2D(u * frequency, v * frequency);
          pts.push({
            u,
            v,
            x: u + diff,
            y: v + diff,
            radius: (Math.abs(random.gaussian(0.1, 0.4)) + 0.3) * radius * 0.8,
            color: random.pick(palette),
          });
        }
      }

      setPoints(pts);
    }, [text, height, width, amplitude, frequency, seed]);

    React.useEffect(() => {
      /**
       * @type {HTMLCanvasElement}
       */
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.fillStyle = 'black';
      context.fillRect(0, 0, canvas.width, canvas.height);
      points.forEach(pt => {
        drawCircle(context, {
          x: (pt.x * width) / 4,
          y: (pt.y * width) / 4,
          radius: (pt.radius * width) / 4,
          fill: pt.color,
          stroke: 'black',
        });
      });
    }, [points, width, height]);

    useAnimationFrame(() => dispatch({ type: 'next' }));

    return (
      <>
        <canvas
          className={board}
          ref={canvasRef}
          width={width}
          height={height}
        />
        <canvas hidden ref={hiddenCanvasRef} />
      </>
    );
  }
);
