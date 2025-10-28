import { chromium } from 'playwright';  // <- sửa chỗ này
import fs from 'fs';
import path from 'path';

(async () => {
  try {
    const outDir = path.resolve('./tests/auth');
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://www.saucedemo.com/');
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();

    await page.waitForURL(/inventory/);
    await context.storageState({ path: path.join(outDir, 'auth.json') });

    await browser.close();
  } catch (err) {
    console.error("❌ Error:", err);
  }
})
