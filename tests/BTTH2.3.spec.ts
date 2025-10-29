import { test, expect } from '@playwright/test';

test('BT3 - Kiểm tra trạng thái giỏ hàng trên Sauce Demo', async ({ page }) => {
  // Truy cập trang
  await page.goto('https://www.saucedemo.com/');

  // Đăng nhập với tài khoản demo
  await page.fill('[data-test="username"]', 'standard_user');
  await page.fill('[data-test="password"]', 'secret_sauce');
  await page.click('[data-test="login-button"]');

  // Thêm sản phẩm đầu tiên vào giỏ hàng
  await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');

  // Kiểm tra số lượng badge giỏ hàng là “1”
  const cartBadge = page.locator('[data-test="shopping-cart-badge"]');
  await expect(cartBadge).toHaveText('1');

  // Thêm sản phẩm thứ hai
  await page.click('[data-test="add-to-cart-sauce-labs-bike-light"]');

  // Kiểm tra số lượng badge giỏ hàng là “2”
  await expect(cartBadge).toHaveText('2');

  // (Tùy chọn) In ra console số badge để debug
  const badgeText = await cartBadge.textContent();
  console.log('🛒 Số lượng sản phẩm trong giỏ: ', badgeText);
});
