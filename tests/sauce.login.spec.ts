import { test, expect } from '@playwright/test';

test('Login succcess page sauce', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();

  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
});

test('Login fai  page sauce', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="login-button"]').click();
  
  await expect(
   page.getByText("Epic sadface: Username is required")
    ).toBeVisible();
});

test('test password is required', async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");

  const user = 'standard_user';

  // phải có await
  await page.fill('[data-test="username"]', '${user}');

  // không cần dòng này nữa vì đã fill ở trên
  // await page.locator('[data-test="username"]').fill("standard_user");

  await page.locator('[data-test="login-button"]').click();

  await expect(
    page.getByText("Epic sadface: Password is required")
  ).toBeVisible();
});

test('test with user password fail', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill('a');
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill('aaaaa');
  await page.locator('[data-test="login-button"]').click();
await expect(
   page.getByText("Epic sadface: Username and password do not match any user in this service")
    ).toBeVisible();

});

test('test with user this user has been locked out', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill('locked_out_user');
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
await expect(
   page.getByText("Epic sadface: Sorry, this user has been locked out.")
    ).toBeVisible();

});



