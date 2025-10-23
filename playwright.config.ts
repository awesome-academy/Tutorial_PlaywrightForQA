import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  /* Cấu hình timeout */
  timeout: 30000,

  /* Cấu hình test */
  use: {
    /* Base URL */
    baseURL: 'https://www.saucedemo.com/',

    /* Tự động chụp màn hình khi fail */
    screenshot: 'only-on-failure',

    /* Ghi video khi fail */
    video: 'retain-on-failure',

    /* Trace để debug */
    trace: 'retain-on-failure',

    /* headless: true = tự đóng, false = không đóng */
    // headless: true,  // Bỏ comment nếu muốn luôn hiển thị browser
  },

  /* Reporter */
  reporter: [
    ['html'],
    ['list']
  ],

  /* Cấu hình browser - Có thể chạy nhiều browser cùng lúc */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});

