import { test, expect } from '@playwright/test';

test.describe('Modal Dialog Component', () => {
  test('Should have visible modal text on activation', async ({ page }) => {
    await page.goto('http://localhost:8080/modal.html');
    await expect(await page.getByText(/modal test/i)).toBeVisible();

    await expect(await page.getByText(/test modal heading text/i)).not.toBeVisible();
    await expect(await page.getByText(/test modal body text/i)).not.toBeVisible();

    await page.getByRole('button', { name: /open modal/i }).click();

    await expect(await page.getByText(/test modal heading text/i)).toBeVisible();
    await expect(await page.getByText(/test modal body text/i)).toBeVisible();
  });

  test('Should have clickable call to action buttons', async ({ page }) => {
    await page.goto('http://localhost:8080/modal.html');
    await expect(await page.getByText(/modal test/i)).toBeVisible();

    await expect(await page.getByText(/cancel/i)).not.toBeVisible();
    await expect(await page.getByText(/ok/i)).not.toBeVisible();

    await page.getByRole('button', { name: /open modal/i }).click();

    await expect(await page.getByText(/cancel/i)).toBeVisible();
    await expect(await page.getByText(/ok/i)).toBeVisible();
  });
  test('Should be able to close modal on button click', async ({ page }) => {
    await page.goto('http://localhost:8080/modal.html');
    await expect(await page.getByText(/modal test/i)).toBeVisible();

    await page.getByRole('button', { name: /open modal/i }).click();

    await expect(await page.getByText(/test modal heading text/i)).toBeVisible();
    await expect(await page.getByText(/test modal body text/i)).toBeVisible();

    await page.getByTestId('modal-close').click();

    await expect(await page.getByText(/test modal heading text/i)).not.toBeVisible();
    await expect(await page.getByText(/test modal body text/i)).not.toBeVisible();
  });

  test('Should be able to pass callback functions to the modal', async ({ page }) => {
    await page.goto('http://localhost:8080/modal.html');
    await expect(await page.getByText(/modal test/i)).toBeVisible();

    await expect(await page.getByText(/cancel/i)).not.toBeVisible();
    await page.getByRole('button', { name: /open modal/i }).click();

    await expect(await page.getByText(/cancel/i)).toBeVisible();
    await page.getByRole('button', { name: /cancel/i }).click();

    await expect(await page.getByText(/test modal heading text/i)).not.toBeVisible();
  });
});