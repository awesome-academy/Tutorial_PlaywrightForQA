import { test as base, expect, Page } from '@playwright/test';

// 1️⃣ Định nghĩa kiểu cho fixture
type MyFixtures = {
  homePage: Page;
};

// 2️⃣ Tạo fixture custom tên là "homePage"
const test = base.extend<MyFixtures>({
  homePage: async ({ page }, use) => {
    await page.goto('https://playwright.dev/');
    await use(page); // Cho test sử dụng page đã mở sẵn
  },
});

// 3️⃣ Viết test sử dụng fixture "homePage"
test('has title', async ({ homePage }) => {
  await expect(homePage).toHaveTitle(/Playwright/);
});

test('get started link', async ({ homePage }) => {
  await homePage.getByRole('link', { name: 'Get started' }).click();
  await expect(homePage.getByRole('heading', { name: 'Installation' })).toBeVisible();
});