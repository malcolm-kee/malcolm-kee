import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/lox.ts', 'src/lox-bin.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
  target: 'node16',
});
