import { expect, test } from '@playwright/test';
// NHÓM A: KIỂM TRA SẢN PHẨM (INVENTORY)
test.describe('Nhóm A – Kiểm tra sản phẩm (Inventory)', () => {
  test.beforeEach(async ({ page }) => {
    console.log('Đang chạy beforeEach [Nhóm A]: Chỉ Login...');
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await expect(page).toHaveURL(/.*inventory.html/);
  });
  test('Test A1: Kiểm tra tiêu đề trang là "Products"', async ({ page }) => {
    console.log('Đang chạy Test A1...');
    await expect(page.locator('.title')).toHaveText('Products');
  });
  test('Test A2: Kiểm tra hiển thị đủ 6 sản phẩm trên trang', async ({ page }) => {
    console.log('Đang chạy Test A2...');
    const products = page.locator('.inventory_item');
    await expect(products).toHaveCount(6);
  });
});

// /NHÓM B: KIỂM TRA GIỎ HÀNG (CART)
test.describe('Nhóm B – Kiểm tra giỏ hàng (Cart)', () => {
  test.beforeEach(async ({ page }) => {
    console.log('Đang chạy beforeEach [Nhóm B]: Login VÀ Thêm 1 sản phẩm...');
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    console.log('Đã thêm sản phẩm vào giỏ (trong beforeEach Nhóm B)');
  });
  test('Test B1: Kiểm tra icon giỏ hàng hiển thị số "1"', async ({ page }) => {
    console.log('Đang chạy Test B1...');
    const cartBadge = page.locator('.shopping_cart_badge');
    await expect(cartBadge).toBeVisible();
    await expect(cartBadge).toHaveText('1');
  });
  test('Test B2: Kiểm tra giỏ hàng hiển thị đúng sản phẩm vừa thêm', async ({ page }) => {
    console.log('Đang chạy Test B2...');
    await page.locator('.shopping_cart_link').click();
    await expect(page).toHaveURL(/.*cart.html/);
    const cartItem = page.locator('.cart_item');
    await expect(cartItem).toHaveCount(1);
    await expect(cartItem.locator('.inventory_item_name')).toHaveText('Sauce Labs Backpack');
  });
});
