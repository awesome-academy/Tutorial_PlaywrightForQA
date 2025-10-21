import { expect, test } from '@playwright/test';

test('test hiển thị', async ({ page }) => {
  await page.goto('https://www.globalsqa.com/angularJs-protractor/registration-login-example/#/register');
  await expect (page.getByRole('heading', { name: 'Register' })).toBeVisible();
  await expect (page.locator('#firstName')).toBeVisible();
  await expect (page.locator('#Text1')).toBeVisible();
  await expect (page.getByRole('textbox', { name: 'First name Last name Username' })).toBeVisible();
  await expect (page.getByRole('textbox', { name: 'Password' })).toBeVisible();
});

test('test', async ({ page }) => {
  await page.goto('https://www.globalsqa.com/angularJs-protractor/registration-login-example/#/register');
  await page.locator('#firstName').click();
  await page.locator('#firstName').fill('ly');
  await page.locator('#Text1').click();
  await page.locator('#Text1').fill('nguyen');
  await page.getByRole('textbox', { name: 'First name Last name Username' }).click();
  await page.getByRole('textbox', { name: 'First name Last name Username' }).fill('ly nguyen nu hoa');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('12345678');
  await page.getByRole('button', { name: 'Register' }).click();
  await expect(page.getByText('Registration successful')).toBeVisible();
  await page.getByRole('textbox', { name: 'Username' }).click();
  await page.getByRole('textbox', { name: 'Username' }).fill('ly nguyen nu hoa');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('12345678');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect (page.getByRole('heading', { name: 'Hi ly!' })).toBeVisible();
  await expect(page).toHaveURL('https://www.globalsqa.com/angularJs-protractor/registration-login-example/#/');
});
