// Tệp: saucedemo.spec.js (hoặc .ts)

// Dữ liệu đăng nhập
const USERNAME = "standard_user";
const PASSWORD = "secret_sauce";
const URL_LOGIN = "https://www.saucedemo.com/";
const URL_INVENTORY = "https://www.saucedemo.com/inventory.html";

// Khởi tạo một nhóm kiểm thử (nếu framework yêu cầu)
describe("Kiểm thử chức năng Login và Inventory trên SauceDemo", () => {

    // 1. **test.beforeEach()**: Thực hiện trước MỖI test
    beforeEach("Đăng nhập vào hệ thống", async () => {
        // Mở trang https://www.saucedemo.com/
        await page.goto(URL_LOGIN);

        // Login bằng standard_user / secret_sauce
        await page.fill("#user-name", USERNAME);
        await page.fill("#password", PASSWORD);
        await page.click("#login-button");
        
        // Thêm một bước kiểm tra nhanh sau login để đảm bảo môi trường sẵn sàng
        // Ví dụ: Đợi cho trang Inventory load
        await page.waitForSelector("#inventory_container"); 
    });

    // 2. **test.afterEach()**: Thực hiện sau MỖI test
    // Hàm này thường nhận kết quả của test (pass/fail)
    afterEach("Thực hiện Logout và chụp màn hình nếu thất bại", async (testResult) => {
        
        // **A. Chụp screenshot nếu test fail**
        if (testResult.status === 'failed') {
            const screenshotName = `screenshot_failed_${testResult.title.replace(/\s/g, '_')}.png`;
            await page.screenshot({ path: screenshotName });
            console.log(`Đã chụp ảnh màn hình: ${screenshotName}`);
        }

        // **B. Logout**
        await page.click("#react-burger-menu-btn"); // Mở menu
        await page.click("#logout_sidebar_link"); // Click Logout
        
        // Kiểm tra đã về trang login
        await page.waitForURL(URL_LOGIN); 
    });

    // --- CÁC BÀI KIỂM THỬ ---

    // **Test 1**: Kiểm tra URL sau khi login
    test("Kiểm tra URL sau khi login phải chứa /inventory", async () => {
        // *Ghi chú*: Bước login đã được thực hiện trong beforeEach()
        
        // Kiểm tra URL hiện tại
        const currentURL = await page.url();
        expect(currentURL).toContain("/inventory");
    });

    // **Test 2**: Kiểm tra sản phẩm đầu tiên hiển thị đúng tên
    test("Kiểm tra tên sản phẩm đầu tiên trong danh sách", async () => {
        // *Ghi chú*: Bước login đã được thực hiện trong beforeEach()

        const firstProductNameSelector = ".inventory_item_name";
        const expectedName = "Sauce Labs Backpack"; // Tên sản phẩm đầu tiên

        // Lấy tên sản phẩm đầu tiên
        const actualName = await page.textContent(firstProductNameSelector);

        // So sánh
        expect(actualName).toBe(expectedName);
    });

    // ... Có thể thêm nhiều test khác ...
});