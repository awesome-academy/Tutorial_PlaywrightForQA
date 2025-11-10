import { test as setup, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';

const authFile = '.auth/standard_user.json';

setup('authenticate standard user', async ({ browser }) => {
  const authFilePath = path.resolve(authFile);
  
  if (fs.existsSync(authFilePath)) {
    console.log('📁 Standard user auth already exists - skipping setup');
    return;
  }

  console.log('🔐 Setting up standard user authentication');
  
  const context = await browser.newContext();
  const page = await context.newPage();

  // Tạo thư mục auth
  const authDir = path.dirname(authFile);
  if (!fs.existsSync(authDir)) {
    fs.mkdirSync(authDir, { recursive: true });
  }

  // Login standard user
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  await page.waitForURL('**/inventory.html');

  await expect(page.getByText('Swag Labs')).toBeVisible();
  await context.storageState({ path: authFile });
  console.log('💾 Standard user auth setup completed');

  await context.close();
});