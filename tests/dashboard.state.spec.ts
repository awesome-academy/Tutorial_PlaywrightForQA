// File: tests/dashboard.state.spec.ts

import { expect } from '@playwright/test'; // <-- ĐÃ THÊM: Cần thiết cho expect()
import { test } from './fixtures/login.state.fixture'; // <-- Đảm bảo đường dẫn này chính xác

test('Dashboard hiển thị đúng', async ({ loggedInPage }) => {
  // Trạng thái đã đăng nhập và đã điều hướng được xử lý trong fixture
  await expect(loggedInPage.getByText('Swag Labs')).toBeVisible(); 
});

test('Verify inventory products', async ({ loggedInPage }) => {
  // Trạng thái đã đăng nhập và đã điều hướng được xử lý trong fixture
  const items = loggedInPage.locator('[data-test="inventory-item"]');
  await expect(items).toHaveCount(6);

  // Kiểm tra các sản phẩm
  await expect(loggedInPage.getByText('Sauce Labs Backpack')).toBeVisible();
  await expect(loggedInPage.getByText('Sauce Labs Bike Light')).toBeVisible();
  await expect(loggedInPage.getByText('Sauce Labs Fleece Jacket')).toBeVisible();
  await expect(loggedInPage.getByText('Sauce Labs Onesie')).toBeVisible();
  await expect(loggedInPage.getByText('Test.allTheThings() T-Shirt (Red)')).toBeVisible();
});

test('Add product to cart and check cart', async ({ loggedInPage }) => {
  // Trạng thái đã đăng nhập và đã điều hướng được xử lý trong fixture

  // Thêm sản phẩm đầu tiên vào giỏ hàng
  await loggedInPage.getByRole('button', { name: 'Add to cart', exact: true }).first().click();
  
  // Chuyển đến giỏ hàng (link có số 1)
  await loggedInPage.getByRole('link', { name: '1' }).click(); 
  
  // Kiểm tra sản phẩm trong giỏ hàng
  await expect(loggedInPage.getByText('Sauce Labs Backpack')).toBeVisible();
});
