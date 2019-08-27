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

const reducer = (state, action) => {
  switch (action.type) {
    case 'next':
      return state.amplitude > 0
        ? {
            amplitude: state.amplitude - 1,
            frequency: state.frequency + 1,
          }
        : state;

    default:
      throw new Error(`action.type not implemented : ${action.type}`);
  }
};

const palette = ['#f77825', '#d3ce3d', '#f1efa5', '#60b99a'];

const CircleLetterCanvas = React.memo(
  ({
    text,
    onAnimationEnd,
    width = 600,
    height = 400,
    radius = 0.01 * width,
  }) => {
    const canvasRef = React.useRef(null);
    const hiddenCanvasRef = React.useRef(null);
    const [seed] = React.useState(() => randomUtil.getRandomSeed());
    const random = randomUtil.createRandom(seed);
    const [points, setPoints] = React.useState([]);
    const [{ amplitude, frequency }, dispatch] = React.useReducer(reducer, {
      amplitude: 100,
      frequency: -20,
    });
    React.useEffect(() => {
      if (amplitude <= 0) {
        onAnimationEnd();
      }
    }, [amplitude, onAnimationEnd]);

    React.useEffect(() => {
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
        context.getImageData(0, 0, canvas.width, canvas.height).data.buffer
      );

      for (let index = 0; index < data32.length; index++) {
        if (data32[index] & 0xff000000) {
          /* 
          check alpha mask, if it is not transparent, i.e. it is a pixel of the text,
          then we will push a point
          */
          const u = (index % canvas.width) * radius * 2 + radius;
          const v = ((index / canvas.width) | 0) * radius * 2 + radius; // the | here is Math.floor
          const diff = amplitude * random.noise2D(u * frequency, v * frequency);
          pts.push({
            u,
            v,
            x: u + diff,
            y: v + diff,
            radius: radius * 0.8,
            color: random.pick(palette),
          });
        }
      }

      console.log(Math.max(...pts.map(pt => pt.u)));
      console.log(Math.min(...pts.map(pt => pt.u)));
      console.log(Math.max(...pts.map(pt => pt.v)));
      console.log(Math.min(...pts.map(pt => pt.v)));

      setPoints(pts);
    }, [text, amplitude, frequency]);

    React.useEffect(() => {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      context.clearRect(0, 0, width, height);
      context.fillStyle = 'black';
      context.fillRect(0, 0, width, height);
      points.forEach(pt => {
        drawCircle(context, {
          x: pt.x,
          y: pt.y,
          radius: (Math.abs(random.gaussian(0.1, 0.4)) + 0.3) * pt.radius,
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
