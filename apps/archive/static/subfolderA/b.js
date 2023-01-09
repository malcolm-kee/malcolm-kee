import { doA } from '../a.js';
import c from './c.js';
import { d } from './subfolderI/d.js';
import { e } from '../subfolderB/e.js';
import { f } from '../subfolderB/subfolderII/f.js';

export const b = () => {
  console.log('b in subfolderA');
  doA();
  c();
  d();
  e();
  f();
};

b();
