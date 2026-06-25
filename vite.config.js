import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base: './' membuat hasil build aman untuk GitHub Pages,
// baik repository bernama konten-organizer maupun nama lain.
export default defineConfig({
  plugins: [react()],
  base: './'
});
