import { test, expect } from '@playwright/test';

test.describe('Bài 2 - Gom nhóm test có setup riêng biệt', () => {

  // ------------------- NHÓM A -------------------
  test.describe('Nhóm A - Kiểm tra sản phẩm', () => {

    // beforeEach: login và chuyển đến trang inventory
    test.beforeEach(async ({ page }) => {
      await page.goto('https://www.saucedemo.com/');
      await page.fill('#user-name', 'standard_user');
      await page.fill('#password', 'secret_sauce');
      await page.click('#login-button');
      await expect(page).toHaveURL(/.*inventory/);
    });

    // Test 1: Kiểm tra số lượng sản phẩm hiển thị trên trang
    test('Kiểm tra số lượng sản phẩm là 6', async ({ page }) => {
      const products = await page.locator('.inventory_item').count();
      expect(products).toBe(6);
    });

    // Test 2: Kiểm tra sản phẩm đầu tiên hiển thị đúng tên
    test('Kiểm tra tên sản phẩm đầu tiên là "Sauce Labs Backpack"', async ({ page }) => {
      const firstProduct = page.locator('.inventory_item_name').first();
      await expect(firstProduct).toHaveText('Sauce Labs Backpack');
    });
  });


  // ------------------- NHÓM B -------------------
  test.describe('Nhóm B - Kiểm tra giỏ hàng', () => {

    // beforeEach: login và thêm 1 sản phẩm vào giỏ hàng
    test.beforeEach(async ({ page }) => {
      await page.goto('https://www.saucedemo.com/');
      await page.fill('#user-name', 'standard_user');
      await page.fill('#password', 'secret_sauce');
      await page.click('#login-button');
      await page.click('text=Add to cart'); // thêm sản phẩm đầu tiên
    });

    // Test 1: Kiểm tra icon giỏ hàng hiển thị số lượng sản phẩm
    test('Kiểm tra biểu tượng giỏ hàng có số 1', async ({ page }) => {
      const cartBadge = page.locator('.shopping_cart_badge');
      await expect(cartBadge).toHaveText('1');
    });

    // Test 2: Kiểm tra giỏ hàng chứa đúng sản phẩm vừa thêm
    test('Kiểm tra giỏ hàng chứa "Sauce Labs Backpack"', async ({ page }) => {
      await page.click('.shopping_cart_link');
      const cartItem = page.locator('.inventory_item_name');
      await expect(cartItem).toHaveText('Sauce Labs Backpack');
    });
  });
});
