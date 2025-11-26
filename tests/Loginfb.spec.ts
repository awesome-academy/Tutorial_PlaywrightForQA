import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.facebook.com/');
  await page.getByTestId('royal-email').click();
  await page.getByTestId('royal-email').fill('');
  await page.getByTestId('royal-pass').click();
  await page.getByTestId('royal-pass').fill('')
  await page.getByTestId('royal-login-button').click();
  await expect(page.getByText("The email address or mobile number you entered isn't connected to an account. ")).toBeVisible();
});