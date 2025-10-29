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
    // Setup project để chạy .setup.ts files
    // {
    //   name: 'setup',
    //   testMatch: /.*\.setup\.ts$/,  // ✅ Nhận diện .setup.ts files
    //   use: { ...devices['Desktop Chrome'] }
    // },

    // Main test projects
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome']
      },
      // dependencies: ['setup'],  // Chạy setup trước
    },
//     {
//       name: 'firefox',
//       use: {
//         ...devices['Desktop Firefox'],
//         storageState: 'playwright/.auth/user.json'
//       },
//       dependencies: ['setup'],
//     },
//     {
//       name: 'webkit',
//       use: {
//         ...devices['Desktop Safari'],
//         storageState: 'playwright/.auth/user.json'
//       },
//       dependencies: ['setup'],
//     },
  ],
});

