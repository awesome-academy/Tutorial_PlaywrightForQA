import { chromium, FullConfig } from '@playwright/test';
import fs from 'fs';

async function globalSetup(config: FullConfig) {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  // Login thật
  await page.goto('https://www.saucedemo.com/');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');

  // Chờ dashboard load = server đã cấp session
  await page.waitForURL('**/inventory.html', { timeout: 10000 });

  // Lưu storageState từ context này
  const outDir = 'playwright/.auth';
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
  await context.storageState({ path: `${outDir}/user.json` });

  console.log('✅ Global setup: auth saved to playwright/.auth/user.json');
  await browser.close();
}

export default globalSetup;
