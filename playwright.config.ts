import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
module.exports = defineConfig({
  testDir: './tests', // thư mục chứa test
  timeout: 30 * 1000, // timeout mỗi test = 30s
  retries: 0, // số lần chạy lại test fail (có thể đổi thành 1)
  reporter: [
    ['list'], // reporter đơn giản trên terminal
    ['html', {
      outputFolder: 'playwright-report', // nơi xuất báo cáo HTML
      open: 'never', // không tự mở trình duyệt.
    }],
    ['json', { outputFile: 'report.json' }], // lưu kết quả test dạng JSON
  ],
  use: {
    baseURL: 'https://material.playwrightvn.com',
    headless: false, // chạy không hiển thị UI
    screenshot: 'only-on-failure', // chỉ chụp ảnh khi lỗi
    video: 'retain-on-failure', // giữ lại video khi lỗi
    trace: 'on-first-retry', // bật trace nếu test fail lần đầu
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
  },
  projects: [
    {
      name: 'Chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'Firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    // {
    //   name: 'WebKit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],
});
