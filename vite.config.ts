
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
  server: {
    port: 3000,
  },
  // This is critical for Vercel deployment when using process.env
  define: {
    'process.env': process.env
  }
});
