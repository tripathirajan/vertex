import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    include: ['**/*.{test,spec}.{ts,tsx}'],
  },
  resolve: {
    alias: {
      '@vertex/utilities': path.resolve(__dirname, './packages/utilities/src/index.ts'),
      '@vertex/hooks': path.resolve(__dirname, './packages/hooks/src/index.ts'),
      '@vertex/primitives': path.resolve(__dirname, './packages/primitives/src/index.tsx'),
      '@vertex/headless': path.resolve(__dirname, './packages/headless/src/index.ts'),
      '@vertex/ui': path.resolve(__dirname, './packages/ui/src/index.ts'),
      '@vertex/theme': path.resolve(__dirname, './packages/theme/src/index.tsx'),
      '@': path.resolve(__dirname, '.'),
    },
  },
});
