import { test, expect } from '@playwright/test';

test('go to web', async ({ page }) => {
  await page.goto('https://globalsqa.com/angularJs-protractor/registration-login-example/#/login');
  await page.getByRole('link', { name: 'Register' }).click();
  await expect(page).toHaveURL("https://globalsqa.com/angularJs-protractor/registration-login-example/#/register");

  // kiểm tra tiêu để hiển thị register
  const heading = page.locator('h2');
  await expect(heading).toHaveText('Register');
});

test('Verify all input fields are visible on Register page', async ({ page }) => {
  await page.goto('https://www.globalsqa.com/angularJs-protractor/registration-login-example/#/register');

  // Kiểm tra hiển thị các field
  await expect(page.locator('input[name="firstName"]')).toBeVisible();
  await expect(page.locator('input[name="lastName"]')).toBeVisible();
  await expect(page.locator('input[name="username"]')).toBeVisible();
  await expect(page.locator('input[name="password"]')).toBeVisible();
});

// register acount 
test('test', async ({ page }) => {
  await page.goto('https://globalsqa.com/angularJs-protractor/registration-login-example/#/login');
  await page.getByRole('link', { name: 'Register' }).click();
  await page.locator('#firstName').click();
  await page.locator('#firstName').fill('lua');
  await page.locator('#Text1').click();
  await page.locator('#Text1').fill('vu');
  await page.getByRole('textbox', { name: 'First name Last name Username' }).click();
  await page.getByRole('textbox', { name: 'First name Last name Username' }).fill('luavu2110');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('111111');
  await page.getByRole('button', { name: 'Register' }).click();
});

//login success
test('login success', async ({ page }) => {
  await page.goto('https://globalsqa.com/angularJs-protractor/registration-login-example/#/login');
  await page.getByRole('textbox', { name: 'Username' }).click();
  await page.getByRole('textbox', { name: 'Username' }).fill('luavu2110');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('111111');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page).toHaveURL("https://globalsqa.com/angularJs-protractor/registration-login-example/#/");
});
