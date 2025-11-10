import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30000,

  use: {
    baseURL: 'https://www.saucedemo.com/',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
  },

  reporter: [['html'], ['list']],

  projects: [
    // Setup project - chạy 1 lần để tạo default user auth
    {
      name: 'setup',
      testMatch: /.*\.setup\.ts$/,
      use: { ...devices['Desktop Chrome'] }
    },

    // Main tests với default user (nhanh) - dùng inventory.fixture
    {
      name: 'chromium-default',
      testMatch: /.*\.spec\.ts$/,
      testIgnore: /.*\.multiuser\.spec\.ts$/, // Bỏ qua multiuser tests
      use: { 
        ...devices['Desktop Chrome'],
        storageState: '.auth/standard_user.json' // Load global cho speed
      },
      dependencies: ['setup'],
    },

    // Multi-user tests (khi cần test với users khác)
    {
      name: 'chromium-multiuser',
      testMatch: /.*\.multiuser\.spec\.ts$/,
      use: { ...devices['Desktop Chrome'] },
      dependencies: ['setup'], // Vẫn cần setup cho standard_user
    },
  ],
});
