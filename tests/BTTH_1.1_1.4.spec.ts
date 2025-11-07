import { test, expect } from '@playwright/test';



test('user can register acc', async ({ page }) => {
  await page.goto('https://globalsqa.com/angularJs-protractor/registration-login-example/#/register');

  // Kiểm tra tiêu đề page hiển thị đúng là "Register"
  await expect(page.locator('h2')).toHaveText('Register');

  //Kiểm tra các ô input có hiển thị
  await expect(page.locator('#firstName')).toBeVisible();
  await expect(page.locator('#Text1')).toBeVisible();
  await expect(page.locator('#username')).toBeVisible();
  await expect(page.locator('#password')).toBeVisible();

  //Điền thông tin vào các ô và nhấn nút "Register"
  const username = 'NhiTTT' + Date.now();
  const password = 'Aa@123456';
  await page.locator('#firstName').fill('Nhi');
  await page.locator('#Text1').fill('Tran');
  await page.locator('#username').fill(username);
  await page.locator('#password').fill(password);
  await page.locator('button:has-text("Register")').click();

  //Login với tài khoản đã đăng ký
  await page.goto('https://www.globalsqa.com/angularJs-protractor/registration-login-example/#/login');
  await page.locator('#username').fill(username);
  await page.locator('#password').fill(password);
  await expect(page.locator('button:has-text("Login")')).toBeEnabled();
  await page.locator('button:has-text("Login")').click();
});