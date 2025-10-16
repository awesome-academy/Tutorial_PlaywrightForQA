import { test, expect } from "@playwright/test";

test("Register & login on GlobalSQA (final PASS ✅)", async ({ page }) => {
  await page.goto("https://www.globalsqa.com/angularJs-protractor/registration-login-example/#/register", {
    waitUntil: "domcontentloaded",
  });

  await page.waitForSelector('input[ng-model="vm.user.firstName"]', { timeout: 20000 });
  console.log("✅ Form loaded");

  const username = "huong" + Date.now();
  const password = "123456";

  // Điền form đăng ký
  await page.fill('input[ng-model="vm.user.firstName"]', "Huong");
  await page.fill('input[ng-model="vm.user.lastName"]', "Tester");
  await page.fill('input[ng-model="vm.user.username"]', username);
  await page.fill('input[ng-model="vm.user.password"]', password);
  await page.click('button:has-text("Register")');

  await page.waitForURL(/\/login/, { timeout: 10000 });
  console.log("✅ Register done, now login");

  // Đăng nhập
  await page.fill('input[ng-model="vm.username"]', username);
  await page.fill('input[ng-model="vm.password"]', password);
  await page.click('button:has-text("Login")');

  await page.waitForURL(/#\/$/, { timeout: 10000 });

  // ✅ Kiểm tra hiển thị đúng "Hi Huong!"
  const greeting = await page.locator("h1").textContent();
  console.log("👉 Greeting:", greeting);
  await expect(page.locator("h1")).toContainText("Hi Huong!");

  console.log("🎉 Registered & logged in successfully!");
});
