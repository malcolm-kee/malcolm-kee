import { XandY } from '../elements/type';

export const getAbs = (values: XandY) =>
  Math.sqrt(Math.pow(values[0], 2) + Math.pow(values[1], 2));
