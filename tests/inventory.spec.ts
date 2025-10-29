// import { expect, test as baseTest } from './fixtures/login.fixture'; // ✅ Import từ login.fixture
import { test, expect } from './fixtures/inventory.fixture';

import type { Page } from '@playwright/test';

// Define fixture tại file spec.ts thì cần:
// B1. Import filr login.fixtureimport { expect, test as baseTest } from './fixtures/login.fixture';
// B2. Định nghĩa fixture object inventory
// type CustomFixtures = {
//   inventoryPage: Page;
// };
// Với inventory fixture này mục đich đẻ mở page inventory by url sau khi đã login sẵn
// export const test = baseTest.extend<CustomFixtures>({
//   inventoryPage: async ({ page }, use) => {
//     await page.goto('https://www.saucedemo.com/inventory.html');

//     // Trả về page object đã navigate
//     await use(page);
//   },
// });
// B4: ở các TCs ko cần page goto inventory page nữa mà dùng trực tiếp inventoryPage từ fixture


test('Truy cập dashboard sau khi login sẵn', async ({ inventoryPage }) => {
    // await page.goto('https://www.saucedemo.com/inventory.html');

    // Kiểm tra có mặt phần tử trên dashboard
    await expect(inventoryPage.getByText('Swag Labs')).toBeVisible();
    await expect(inventoryPage.getByText('Products')).toBeVisible();
});

test('Truy cập dashboard sau khi login sẵn 12', async ({ inventoryPage }) => {
    // await page.goto('https://www.saucedemo.com/inventory.html');

    // Kiểm tra có mặt phần tử trên dashboard
    await expect(inventoryPage.getByText('Swag Labs')).toBeVisible();
    await expect(inventoryPage.getByText('Products')).toBeVisible();
});

// test('Truy cập dashboard sau khi login sẵn', async ({ page }) => {
//     await page.goto('https://www.saucedemo.com/inventory.html');

//     // Kiểm tra có mặt phần tử trên dashboard
//     await expect(page.getByText('Swag Labs')).toBeVisible();
//     await expect(page.getByText('Products')).toBeVisible();
// });

// test('Truy cập dashboard sau khi login sẵn', async ({ page }) => {
//     await page.goto('https://www.saucedemo.com/inventory.html');

//     // Kiểm tra có mặt phần tử trên dashboard
//     await expect(page.getByText('Swag Labs')).toBeVisible();
//     await expect(page.getByText('Products')).toBeVisible();
// });
