import { test, expect } from "../src/fixtures/baseFixtures";
import { LoginPage } from "./login/Login-Logout";

test.describe("DemoQA Basic Smoke Tests", () => {
  //BAI TAP CƯ BẢN
  //Bài 1
  test("Case 1: Đăng nhập vào page, hiên thị trang Product", async ({
    page,
  }) => {
    await page.goto("https://www.saucedemo.com/");
    const userName = page.locator("#user-name");
    const passWord = page.locator("#password");
    const button = page.locator("#login-button");
    await userName.fill("standard_user");
    await passWord.fill("secret_sauce");
    await button.click();
    console.log("Login thành công");
    await expect(page).toHaveURL(/inventory/);
    page.pause();
    page.close();
  });

  test("Case 2: Đăng nhập với Password sai", async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");
    const userName = page.locator("#user-name");
    const passWord = page.locator("#password");
    const button = page.locator("#login-button");
    await userName.fill("standard_user");
    await passWord.fill("secret_sauce1");
    await button.click();
    const errorMessage = page.locator('[data-test="error"]');
    await expect(errorMessage).toHaveText(
      "Epic sadface: Username and password do not match any user in this service"
    );
    console.log("Login thất bại");
    page.pause();
    page.close();
  });

  test("Case 3: Đăng nhập với UserName trống, hiển thị lỗi", async ({
    page,
  }) => {
    await page.goto("https://www.saucedemo.com/");
    const userName = page.locator("#user-name");
    const passWord = page.locator("#password");
    const button = page.locator("#login-button");
    //await userName.fill("standard_user");
    await passWord.fill("secret_sauce");
    await button.click();
    const errorMessage = page.locator('[data-test="error"]');
    await expect(errorMessage).toHaveText("Epic sadface: Username is required");
    console.log("Login thất bại");
    page.pause();
    page.close();
  });

  test("Case 4: Đăng nhập với locked_out_user, hiển thị lỗi", async ({
    page,
  }) => {
    await page.goto("https://www.saucedemo.com/");
    const userName = page.locator("#user-name");
    const passWord = page.locator("#password");
    const button = page.locator("#login-button");
    await userName.fill("locked_out_user");
    await passWord.fill("secret_sauce");
    await button.click();
    const errorMessage = page.locator('[data-test="error"]');
    await expect(errorMessage).toHaveText(
      "Epic sadface: Sorry, this user has been locked out."
    );
    console.log("Login thất bại");
    page.pause();
    page.close();
  });

  // BÀI TẬP NÂNG CAO
  //Bài 3
  test(" Kiểm tra trạng thái giỏ hàng", async ({ page }) => {
    //Login
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login("standard_user", "secret_sauce");
    console.log("Login thành công");
    await expect(page).toHaveURL(/inventory/);

    //Add to cart 1 item
    const addToCart1 = page.locator("#add-to-cart-sauce-labs-backpack");
    await addToCart1.click();
    const cartBadge1 = page.locator(".shopping_cart_badge");
    await expect(cartBadge1).toHaveText("1"); //Kiểm tra số lượng sp trong giỏ hàng (1)
    console.log("Thêm 1 sản phẩm vào giỏ hàng thành công");
    await page.waitForTimeout(2000);

        //Add to cart 2 item
    const addToCart2 = page.locator("#add-to-cart-sauce-labs-bike-light");
    await addToCart2.click();
    const cartBadge2 = page.locator(".shopping_cart_badge");
    await expect(cartBadge2).toHaveText("2"); //Kiểm tra số lượng sp trong giỏ hàng (1)
    console.log("Thêm 2 sản phẩm vào giỏ hàng thành công");
    await page.waitForTimeout(2000);
    page.close();
  });

  //Bài 4
  test("Logout quay ve man Login", async ({ page }) => {
    //Login
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login("standard_user", "secret_sauce");
    console.log("Login thành công");
    await expect(page).toHaveURL(/inventory/);

    //Logout
    loginPage.logout();
    loginPage.expectURL();
    console.log("Logout thành công");
    await page.waitForTimeout(2000);
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

// 🔥Bài tập thực hành nâng cao
// 👍Bài 3 - Kiểm tra trạng thái giỏ hàng
// Yêu cầu:
// Sau khi thêm sản phẩm vào giỏ, kiểm tra số lượng hiển thị ở biểu tượng giỏ hàng là 1
// Thêm sản phẩm thứ hai -> kiểm tra số lượng giỏ là 2
// Gợi ý:
// const cartBadge = page.locator('.shopping_cart_badge');
// await expect(cartBadge).toHaveText('2');
// 👍 Bài 4 - Login và logout
// Yêu cầu:
// Đăng nhập hệ thống
// Mở menu bên trái - click Logout
// Kiểm tra quay về màn hình login
