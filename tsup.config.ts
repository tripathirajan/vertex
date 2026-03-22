import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts', 'src/index.tsx'],
  format: ['esm', 'cjs'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  external: ['react', 'react-dom', '@vertex/utilities', '@vertex/hooks', '@vertex/primitives', '@vertex/headless', '@vertex/ui', '@vertex/theme'],
});
