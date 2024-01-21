import { defineConfig } from '@playwright/test';

export default defineConfig({

  // Glob patterns or regular expressions that match test files.
  testDir: './src/components',
  testMatch: '*.spec.js',
});