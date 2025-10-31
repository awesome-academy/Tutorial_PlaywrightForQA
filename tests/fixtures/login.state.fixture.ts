import { test as base, Page } from '@playwright/test';

interface Fixtures {
  loggedInPage: Page;
}

// Fixture sử dụng 'page' đã được tải session từ cấu hình Project (playwright.config.ts)
export const test = base.extend<Fixtures>({
  
  // SỬ DỤNG FIXTURE PAGE MẶC ĐỊNH
  loggedInPage: async ({ page }, use) => { 
    
    // Playwright đã tải session vào 'page' này nhờ cấu hình trong playwright.config.ts.
    
    // BƯỚC BẮT BUỘC: Điều hướng đến trang sản phẩm để sử dụng cookie session
    // Nếu cookie hợp lệ, trang sẽ load thành công mà không bị chuyển hướng về login.
    await page.goto('https://www.saucedemo.com/inventory.html'); 

    // Cung cấp page đã đăng nhập và đã điều hướng cho test
    await use(page);
    
    // Không cần context.close() vì không tạo context/browser mới.
  },
});
