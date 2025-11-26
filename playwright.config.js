const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 30000,
  baseURL: 'https://www.saucedemo.com',

  use: {
    // Cấu hình artifacts chỉ ghi lại khi test thất bại
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  // Cấu hình chạy trên nhiều trình duyệt/môi trường
  projects: [
    {
      name: 'Chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'Firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'WebKit', // Đại diện cho Safari
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
