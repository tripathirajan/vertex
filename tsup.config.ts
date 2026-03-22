import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts', 'src/index.tsx'],
  format: ['esm', 'cjs'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  external: ['react', 'react-dom', '@vertex-lab/utilities', '@vertex-lab/hooks', '@vertex-lab/primitives', '@vertex-lab/headless', '@vertex-lab/ui', '@vertex-lab/theme'],
});
