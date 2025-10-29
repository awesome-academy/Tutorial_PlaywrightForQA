import { test as base, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';

const authFile = '.auth/user.json';

const test = base.extend({
  context: async ({ browser }, use) => {
    // Kiểm tra xem file auth có tồn tại không
    const authFilePath = path.resolve(authFile);
    let context = await browser.newContext();
    const page = await context.newPage();

    // Tạo thư mục auth nếu chưa có
    const authDir = path.dirname(authFile);
    if (!fs.existsSync(authDir)) {
      fs.mkdirSync(authDir, { recursive: true });
      console.log('📁 Created auth directory');
    }

    // Truy cập trang login
    await page.goto('https://www.saucedemo.com/');
    console.log('✅ Navigated to login page');

    // Thực hiện đăng nhập
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    // Đợi trang inventory load (không phải dashboard)
    await page.waitForURL('**/inventory.html');
    console.log('✅ Inventory page loaded');

    // Verify đăng nhập thành công
    await expect(page.getByText('Swag Labs')).toBeVisible();
    await expect(page.getByText('Products')).toBeVisible();
    console.log('✅ Login verified');

    // Lưu trạng thái vào file auth.json
    await page.context().storageState({ path: authFile });
    console.log('💾 Auth state saved to:', authFile);

    // Verify file được tạo
    if (fs.existsSync(authFile)) {
      console.log('✅ Auth file created successfully!');
    }

      await use(context);
      await context.close();
    },
});

export { test, expect };  
