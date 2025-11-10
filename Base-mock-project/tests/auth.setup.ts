import { test as setup, chromium } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const authFile = path.resolve('tests/auth.json');

setup('authenticate', async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Tạo thư mục chứa file auth nếu chưa có
  const authDir = path.dirname(authFile);
  if (!fs.existsSync(authDir)) {
    fs.mkdirSync(authDir, { recursive: true });
    console.log('📁 Created auth directory');
  }

  // Truy cập trang login
  await page.goto("https://www.saucedemo.com/");

  // Đăng nhập
  await page.getByPlaceholder("Username").fill("standard_user");
  await page.getByPlaceholder("Password").fill("secret_sauce");
  await page.getByRole("button", { name: "Login" }).click();

  // Chờ load dashboard
  await page.waitForURL("**/inventory.html");

  // Lưu trạng thái đăng nhập
  await page.context().storageState({ path: "tests/auth.json" });

  await browser.close();

  console.log("✅ Đã lưu trạng thái đăng nhập vào tests/auth.json");
});