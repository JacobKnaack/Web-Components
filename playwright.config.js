import { defineConfig } from '@playwright/test';

export default defineConfig({

  // Glob patterns or regular expressions that match test files.
  testDir: './src',
  testMatch: '*.spec.js',
  globalSetup: require.resolve('./tests/global.setup.js'),
  globalTeardown: require.resolve('./tests/global.teardown.js'),
});