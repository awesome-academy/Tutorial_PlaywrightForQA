import { defineConfig, devices } from '@playwright/test';

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  timeout: 200000, // 200 giây cho mỗi test
  expect: {
    timeout: 10000, // timeout riêng cho expect()
  },
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',

  use: {
    trace: 'on-first-retry',

    // 👇 Hiển thị trình duyệt và làm chậm thao tác
    headless: false,
    launchOptions: {
      slowMo: 1000, // làm chậm mỗi thao tác 1 giây
    },
  },

  // ✅ Đã thêm setup project như yêu cầu
  projects: [
    // Setup project để chạy .setup.ts files
    {
      name: 'setup',
      testMatch: /.*\.setup\.ts$/,  // ✅ Nhận diện .setup.ts files
      use: { ...devices['Desktop Chrome'] },
    },

    // Main test projects
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'playwright/.auth/user.json',  // ✅ Sử dụng auth state
      },
      dependencies: ['setup'],  // ✅ Chạy setup trước
    },
  ],

  // Nếu sau này bạn có web local:
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
