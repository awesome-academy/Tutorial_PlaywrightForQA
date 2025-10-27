import { test as base, Page } from '@playwright/test';

// Tên file trạng thái
const authFile = 'auth.json';

// Định nghĩa kiểu cho fixture
type MyFixtures = {
  loggedInPage: Page; // Cung cấp một trang đã đăng nhập
};

export const test = base.extend<MyFixtures>({

  // Định nghĩa fixture 'loggedInPage'
  // Fixture này sẽ phụ thuộc vào 'browser' fixture có sẵn
  loggedInPage: async ({ browser }, use) => {

    // --- SETUP: TẠO CONTEXT TỪ STORAGE STATE ---
    console.log(`Chạy fixture setup: Tạo context mới từ ${authFile}...`);

    // 1. Tạo một "phiên làm việc" (context) mới từ trình duyệt
    // và nạp trạng thái đăng nhập từ file auth.json vào
    const context = await browser.newContext({
      storageState: authFile,
    });

    // 2. Tạo một trang (tab) mới từ context đó
    const page = await context.newPage();

    // 3. (Optional) Đi đến trang inventory để sẵn sàng cho test
    // Vì storageState chỉ lưu session, nó không lưu URL cuối cùng
    await page.goto('https://www.saucedemo.com/inventory.html');

    // --- Trả về page đã login cho test sử dụng ---
    await use(page);

    // --- TEARDOWN: Dọn dẹp sau khi test chạy xong ---
    // Chúng ta đóng context, việc này cũng sẽ đóng 'page'
    console.log(`Chạy fixture teardown: Đóng context...`);
    await context.close();
  },
});

export { expect } from '@playwright/test';
