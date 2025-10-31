import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  timeout: 200000,
  expect: { timeout: 10000 },
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',

  use: {
    trace: 'on-first-retry',
    headless: false,
    launchOptions: { slowMo: 500 },
  },

  // Global setup: dùng để login một lần và lưu storageState
  globalSetup: require.resolve('./tests/global-setup'),

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        // ✅ BẬT LẠI DÒNG NÀY: Cấu hình an toàn nhất để đảm bảo session được tải.
        storageState: 'playwright/.auth/user.json', 
      },
    },
  ],
});
