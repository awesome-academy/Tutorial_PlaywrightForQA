import { test, expect } from './fixtures/inventory.fixture';

// Lưu ý: nhớ xóa file .auth/standard_user.json nếu muốn test lại từ đầu
test.describe('Use Once Account Tests', () => {
  
  test('Truy cập dashboard sau khi login sẵn', async ({ inventoryPage }) => {
    // await page.goto('https://www.saucedemo.com/inventory.html');

    // Kiểm tra có mặt phần tử trên dashboard
    await expect(inventoryPage.getByText('Swag Labs')).toBeVisible();
    await expect(inventoryPage.getByText('Products')).toBeVisible();
  });

  test('Truy cập dashboard sau khi login sẵn Ex2', async ({ inventoryPage }) => {
    // await page.goto('https://www.saucedemo.com/inventory.html');

    // Kiểm tra có mặt phần tử trên dashboard
    await expect(inventoryPage.getByText('Swag Labs')).toBeVisible();
    await expect(inventoryPage.getByText('Products')).toBeVisible();
  });
});
