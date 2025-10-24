import { chromium, test as setup } from '@playwright/test';
import fs from 'fs';
import path from 'path';
const authFile = 'tests/stage_login/.auth/user.json';
setup('authenticate', async ({ page }) => {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    // Truy cap trang https://www.saucedemo.com/
    await page.goto('https://www.saucedemo.com/');
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();   
    await page.waitForURL(/inventory/);
    await page.context().storageState({ path: authFile });
      // Verify file được tạo
  if (fs.existsSync(authFile)) {
    console.log('✅ Auth file created successfully!');
  }
}
)
