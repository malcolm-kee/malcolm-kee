import React from 'react';

export function drawCircle(
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

export function usePoints({
  count,
  random,
  amplitude,
  frequency,
  palette,
  withNoise,
}) {
  return React.useMemo(() => {
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

    return createGrid(count, amplitude, frequency, palette, withNoise);
  }, [random, count, amplitude, frequency, palette, withNoise]);
}
