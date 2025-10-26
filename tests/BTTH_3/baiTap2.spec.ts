import { test, expect } from '@playwright/test';
test.describe('Nhóm A – Kiểm tra sản phẩm', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();
    await expect(page).toHaveURL(/.*inventory/);
  });
  test('Kiểm tra số lượng sản phẩm hiển thị trên trang', async ({ page }) => {
    const items = await page.locator('.inventory_item').count();
    await expect(items).toBeGreaterThan(0);
  });
  test('Kiểm tra tên sản phẩm đầu tiên', async ({ page }) => {
    const firstItem = page.locator('.inventory_item_name').first();
    await expect(firstItem).toHaveText('Sauce Labs Backpack');
  });
});
test.describe('Nhóm B – Kiểm tra giỏ hàng', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();
    await page.locator('.btn_inventory').first().click();
  });
  test('Kiểm tra biểu tượng giỏ hàng hiển thị số lượng sản phẩm', async ({ page }) => {
    const cartBadge = page.locator('.shopping_cart_badge');
    await expect(cartBadge).toHaveText('1');
  });
  test('Kiểm tra sản phẩm trong giỏ hàng hiển thị đúng', async ({ page }) => {
    await page.locator('.shopping_cart_link').click();
    const cartItem = page.locator('.inventory_item_name');
    await expect(cartItem.first()).toHaveText('Sauce Labs Backpack');
  });
});
