import { test, expect } from "../src/fixtures/baseFixtures";
import { count } from "console";

test.describe("Btth bai 3-Bài tập 2: Nhóm A – Kiểm tra sản phẩm", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");
    const username = page.locator("#user-name");
    const password = page.locator("#password");
    const loginButton = page.locator("#login-button");
    await username.fill("standard_user");
    await password.fill("secret_sauce");
    await loginButton.click();
    await expect(page).toHaveURL(/inventory/);
    console.log("Đăng nhập thành công");
  });

  test.afterEach(async ({ page }, testInfo) => {
    //Chụp ảnh case lỗi
    if (testInfo.status !== testInfo.expectedStatus) {
      await page.screenshot({ path: `screenshots/${testInfo.title}.png` });
    }
  });

  test.beforeAll(async () => {
    console.log("Bắt đầu chạy nhóm test");
  });

  test.afterAll( async() => {
    console.log("Kết thúc nhóm test");
  });

  test("Kiểm tra số lượng sản phẩm trên trang", async ({ page }) => {
    const product = page.locator(".inventory_item");
    let countProduct = await product.count();
    console.log("Số lượng sp trên trang đếm được là: " + countProduct);
    page.pause();
    expect(countProduct).toBe(6);
  });
});


// Bài tập 3 – kết hợp beforeAll, beforeEach, afterEach, afterAll
// Thực hành thứ tự chạy hook và quản lý tài nguyên.
// Kịch bản:
// 1. beforeAll: In ra log "Bắt đầu chạy nhóm test".
// 2. beforeEach: Login.
// 3. Test: Kiểm tra chức năng nào đó (tuỳ chọn).
// 4. afterEach: Chụp screenshot (nếu fail).
// 5. afterAll: In ra log "Kết thúc nhóm test".
// Yêu cầu:
// • Quan sát log để thấy thứ tự chạy hook.
// Cố tình làm fail 1 Testcase để xem afterEach hoạt động thế nào
