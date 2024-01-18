import { test, expect } from '@playwright/test';
import liveServer from 'live-server';

test.beforeAll(async () => {
  const params = {
    root: 'src/navigation',
    file: 'index.html'
  }
  liveServer.start(params);
});

test.fixme('Should render navigation list with links', async ({ page }) => {
  expect(true).toBe(false);
});