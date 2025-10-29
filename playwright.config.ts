import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  use: {
    baseURL: 'https://www.saucedemo.com',
    headless: true,
  },
  projects: [
    // Setup project để chạy .setup.ts files
    {
      name: 'setup',
      testMatch: /.*\.setup\.ts$/,  // ✅ Nhận diện .setup.ts files
      use: { ...devices['Desktop Chrome'] }
    },

    // Main test projects
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'playwright/.auth/user.json'  // Sử dụng auth state
      },
      dependencies: ['setup'],  // Chạy setup trước
    },
  ],
});
