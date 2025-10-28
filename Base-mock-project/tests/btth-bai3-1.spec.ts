import { test, expect } from "../src/fixtures/baseFixtures";

test.describe("Btth bai 3-Bài tập 1 – beforeEach() + afterEach() ở file-level", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");
    const username = page.locator("#user-name");
    const password = page.locator("#password");
    const loginButton = page.locator("#login-button");
    await username.fill("standard_user");
    await password.fill("secret_sauce");
    await loginButton.click();
  });

  test("Test 1: Kiểm tra URL sau khi login", async ({ page }) => {
    await expect(page).toHaveURL(/inventory/);
    page.pause();
  });

  test("Test 2:  Kiểm tra sản phẩm đầu tiên hiển thị đúng tên.", async ({
    page,
  }) => {
    const firstProduct = page.locator("#item_4_title_link");
    await expect(firstProduct).toContainText("Sauce Labs Backpack");
    page.pause();
  });

  test.afterEach(async ({ page }, testInfo) => {
    //Chụp ảnh case lỗi
    if (testInfo.status !== testInfo.expectedStatus) {
      await page.screenshot({ path: `screenshots/${testInfo.title}.png` });
    }
    //Logout
    const menuButton = page.locator ("#react-burger-menu-btn");
    const buttonLogout = page.locator ("#logout_sidebar_link");
    await menuButton.click();
    await buttonLogout.click();
    await expect(page.locator(".login_logo")).toHaveText("Swag Labs");
  });
});

// Bài tập 1 – beforeEach() + afterEach() ở file-level
// Trước mỗi test:
// Mở trang https://www.saucedemo.com/
// Login bằng standard_user / secret_sauce

// Sau mỗi test:
// Chụp screenshot nếu test fail
// Logout

// Yêu cầu:
// Viết test.beforeEach() để thực hiện login cho tất cả test.
// Viết test.afterEach() để thực hiện logout và chụp screenshot khi fail.

// Viết ít nhất 2 test:
// Test 1: Kiểm tra URL sau khi login chứa /inventory.
// Test 2: Kiểm tra sản phẩm đầu tiên hiển thị đúng tên.