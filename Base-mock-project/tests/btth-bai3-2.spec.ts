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
  });

  test("Kiểm tra số lượng sản phẩm trên trang", async ({ page }) => {
    const product = page.locator(".inventory_item");
    let countProduct = await product.count();
    console.log("Số lượng sp trên trang đếm được là: " + countProduct);
    page.pause();
    expect(countProduct).toBe(6);
  });
});

test.describe("Btth bai 3-Bài tập 2: Nhóm B – Kiểm tra giỏ hàng", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");
    const username = page.locator("#user-name");
    const password = page.locator("#password");
    const loginButton = page.locator("#login-button");
    await username.fill("standard_user");
    await password.fill("secret_sauce");
    await loginButton.click();
    const firstProduct = page.locator("#add-to-cart-sauce-labs-backpack");
    await firstProduct.click();
  });

  test("Kiểm tra giỏ hàng hiển thị sản phẩm vừa thêm", async ({ page }) => {
    const cartIcon = page.locator(".shopping_cart_badge");
    expect(cartIcon).toHaveText("1");
    const text = await cartIcon.innerText();
    console.log("Số lượng sp trong giỏ hàng là: " + text);
    page.pause();
  });
});

// Bài tập 2 – describe-level hooks
// Tạo 2 nhóm test:
// Nhóm A – Kiểm tra sản phẩm:
// beforeEach: Login → chuyển đến /inventory.
// Test: Kiểm tra số lượng sản phẩm trên trang.

// Nhóm B – Kiểm tra giỏ hàng:
// beforeEach: Login → thêm 1 sản phẩm vào giỏ hàng.
// Test: Kiểm tra giỏ hàng hiển thị sản phẩm vừa thêm.

// Yêu cầu:
// Dùng test.describe() để nhóm 2 bộ test riêng.
// Mỗi nhóm dùng beforeEach riêng, không ảnh hưởng nhóm kia.
// Có ít nhất 2 test trong mỗi nhóm.
