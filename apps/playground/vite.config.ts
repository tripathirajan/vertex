import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '../../', '');
  return {
    plugins: [react(), tailwindcss(), tsconfigPaths()],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@vertex-lab/utilities': path.resolve(__dirname, '../../packages/utilities/src/index.ts'),
        '@vertex-lab/hooks': path.resolve(__dirname, '../../packages/hooks/src/index.ts'),
        '@vertex-lab/primitives': path.resolve(__dirname, '../../packages/primitives/src/index.ts'),
        '@vertex-lab/headless': path.resolve(__dirname, '../../packages/headless/src/index.ts'),
        '@vertex-lab/ui': path.resolve(__dirname, '../../packages/ui/src/index.ts'),
        '@vertex-lab/theme': path.resolve(__dirname, '../../packages/theme/src/index.tsx'),
        '@': path.resolve(__dirname, '../../'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
