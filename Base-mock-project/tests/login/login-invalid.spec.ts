import { test, expect } from "../../src/fixtures/baseFixtures";
import { LoginPage } from "./Login-Logout";
//Bài 2
test.describe("DemoQA Basic Smoke Tests", () => {

  test("Case 2: Đăng nhập với Password sai", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login("standard_user", "secret_sauce1");
    await loginPage.expectError(
      "Epic sadface: Username and password do not match any user in this service"
    );
    console.log("Login thất bại");
    page.pause();
    page.close();
  });

  test("Case 3: Đăng nhập với UserName trống, hiển thị lỗi", async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login("", "secret_sauce1");
    await loginPage.expectError("Epic sadface: Username is required");
    console.log("Login thất bại");
    page.pause();
    page.close();
  });

  test("Case 4: Đăng nhập với locked_out_user, hiển thị lỗi", async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login("locked_out_user", "secret_sauce");
    await loginPage.expectError(
      "Epic sadface: Sorry, this user has been locked out."
    );
    console.log("Login thất bại");
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
