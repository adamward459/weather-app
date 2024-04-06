/// <reference types="vitest" />

import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

const openWeatherMapUrl = 'https://api.openweathermap.org';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: openWeatherMapUrl,
        changeOrigin: true,
        rewrite: (path) => {
          const urlObj = new URL(
            path,
            openWeatherMapUrl + path.replace(/^\/api/, ''),
          );

          urlObj.searchParams.set(
            'appId',
            process.env.OPEN_WEATHER_MAP_API_KEY as string,
          );
          urlObj.searchParams.set('lang', 'en');
          urlObj.searchParams.set('units', 'metric');

          return urlObj
            .toString()
            .replace(openWeatherMapUrl, '')
            .replace('/api', '');
        },
      },
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    coverage: {
      include: ['src/**/*'],
    },
    setupFiles: ['src/test/setup.ts'],
  },
});
