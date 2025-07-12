// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/barzah.tasks/', // اسم الريبو تمامًا مع الـ "/"
  build: {
    outDir: 'docs',
  },
  plugins: [react()],
});
