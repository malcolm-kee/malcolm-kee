import * as React from 'react';

export function drawCircle(
  context: CanvasRenderingContext2D,
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
  }: {
    x: number;
    y: number;
    radius: number;
    from?: number;
    to?: number;
    clockwise?: boolean;
    stroke: string;
    fill: string;
    width?: number;
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

export interface UsePointsOptions {
  count: number;
  random: {
    pick: <Value>(array: Value[]) => Value;
    noise2D: (x: number, y: number) => number;
  };
  amplitude: number;
  frequency: number;
  palette: Array<string>;
  withNoise?: boolean;
}

export function usePoints({
  count,
  random,
  amplitude,
  frequency,
  palette,
  withNoise,
}: UsePointsOptions) {
  return React.useMemo(() => {
    function createGrid(
      count: number,
      amplitude: number,
      frequency: number,
      palette: string[],
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

    return createGrid(count, amplitude, frequency, palette, withNoise);
  }, [random, count, amplitude, frequency, palette, withNoise]);
}

export function getContrastTextColor(hex: string) {
  const threshold = 130; /* about half of 256. Lower threshold equals more dark text on dark background  */

  const hRed = hexToR(hex);
  const hGreen = hexToG(hex);
  const hBlue = hexToB(hex);

  const cBrightness = (hRed * 299 + hGreen * 587 + hBlue * 114) / 1000;
  return cBrightness > threshold
    ? 'rgba(0, 0, 0, 0.87)'
    : 'rgba(255, 255, 255, 0.88)';
}

function cutHex(h: string) {
  return h.charAt(0) === '#' ? h.substring(1, 7) : h;
}
function hexToR(h: string) {
  return parseInt(cutHex(h).substring(0, 2), 16);
}
function hexToG(h: string) {
  return parseInt(cutHex(h).substring(2, 4), 16);
}
function hexToB(h: string) {
  return parseInt(cutHex(h).substring(4, 6), 16);
}
