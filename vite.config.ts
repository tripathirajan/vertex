import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react(), tailwindcss()],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@vertex-lab/utilities': path.resolve(__dirname, './packages/utilities/src'),
        '@vertex-lab/hooks': path.resolve(__dirname, './packages/hooks/src'),
        '@vertex-lab/primitives': path.resolve(__dirname, './packages/primitives/src'),
        '@vertex-lab/headless': path.resolve(__dirname, './packages/headless/src'),
        '@vertex-lab/ui': path.resolve(__dirname, './packages/ui/src'),
        '@vertex-lab/theme': path.resolve(__dirname, './packages/theme/src'),
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
