import tinyColor from 'tinycolor2';

export type ColorData = [hexCode: string, percentage: number];

export const getDominantColor = (colors: ColorData[]): string => {
  for (const [colorHex] of colors) {
    const brightness = tinyColor(colorHex).getBrightness();

    // exclude too dark (0) or too bright 255
    if (brightness > 60 && brightness < 200) {
      return colorHex;
    }
  }

  return colors[0][0];
};
