// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

const authFile = 'auth.json';

export default defineConfig({
  testDir: './tests', // Thư mục chứa các file test (vd: admin-add-user.spec.ts)

  // 1. Định nghĩa một "project" CHỈ để chạy setup
  projects: [
    {
      name: 'setup',
      testMatch: /auth\.setup\.ts/, // Chỉ chạy file auth.setup.ts
    },

    // 2. Định nghĩa project test chính
    {
      name: 'chromium-tests',
      testDir: './tests', // Thư mục test
      use: {
        ...devices['Desktop Chrome'],
        // Sử dụng trạng thái đã được 'setup' tạo ra
        storageState: authFile,
      },
      // Báo cho Playwright biết: project này "phụ thuộc" vào 'setup'
      // Playwright sẽ tự động chạy 'setup' TRƯỚC khi chạy project này
      dependencies: ['setup'],
    },
  ],
});
