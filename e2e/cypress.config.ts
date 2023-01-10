import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:8000/',
    excludeSpecPattern: '**/examples/*.js',
    blockHosts: 'www.google-analytics.com',
  },
});
