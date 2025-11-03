import { test, expect } from "../../src/fixtures/baseFixtures";
import { LoginPage } from "./Login-Logout";
//Bài 2
test.describe("DemoQA Basic Smoke Tests", () => {
  test("Case 1: Đăng nhập vào page, hiên thị trang Product", async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login("standard_user", "secret_sauce");
    console.log("Login thành công");
    await expect(page).toHaveURL(/inventory/);
    page.pause();
    page.close();
  });
});

// 🧑‍💻 Bài tập thực hành cơ bản
// Viết script đăng nhập vào trang https://www.saucedemo.com/
// Bài 1 - Viết 4 test case:
// 1.1 Login thành công: standard_user + secret_sauce -> hiển thị page product
// 1.2 Login thất bại: sai pw -> hiển thị tb lỗi
// 1.3 Login thất bại: bỏ trống username -> hiển thị tb lỗi
// 1.4 Login với locked_out_user -> hiển thị tb lỗi
// Bài 2 - Sắp xếp lại test:
// Tạo thư mục tests/login
// Mỗi test lưu trong file riêng: login-valid.spec.js, login-invalid.spec.js
