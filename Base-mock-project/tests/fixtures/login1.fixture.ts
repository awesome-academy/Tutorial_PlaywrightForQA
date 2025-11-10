import { test as base, chromium, Page } from "@playwright/test";

// Define interface cho fixture
interface OrangeFixtures {
  loggedInPage: Page;
}

// ✅ Refactor fixture "loggedInPage": Dùng storageState để tái sử dụng session
export const test = base.extend<OrangeFixtures>({
  loggedInPage: async ({ browser }, use) => {
    // Tạo context mới với storageState (đã login)
    const context = await browser.newContext({
      storageState: "tests/auth.json",
    });

  // Tạo page mới từ context đã login
    const page = await context.newPage();

    // Mở trang inventory (đã login sẵn)
    await page.goto("https://www.saucedemo.com/inventory.html");

    // Truyền page đã login cho test
    await use(page);

    // Đóng context sau khi test xong
    await context.close();
  },
});

export const expect = test.expect;
