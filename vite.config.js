import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: { allowedHosts: true },
  // Relative base so the build works when served from any subpath
  // (GitHub Pages project sites, S3 sub-folders, opening dist/index.html directly, etc).
  base: './',
});
