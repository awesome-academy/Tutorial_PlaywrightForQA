// pages/InventoryPage.js

class checkpage {
    // Khai báo các bộ chọn (selectors)
    constructor(page) {
        this.page = page;
        // Bộ chọn cho tên sản phẩm đầu tiên
        this.firstItemName = page.locator('.inventory_item_name').first();
        // Nút Menu (hamburger icon)
        this.menuButton = page.locator('#react-burger-menu-btn');
        // Nút Đăng xuất
        this.logoutLink = page.locator('#logout_sidebar_link');
    }

    // Hành động: Lấy tên sản phẩm đầu tiên
    async getFirstProductName() {
        return this.firstItemName.innerText();
    }

    // Hành động: Đăng xuất
    async logout() {
        await this.menuButton.click();
        // Đợi một chút để menu mở ra
        await this.logoutLink.waitFor({ state: 'visible' });
        await this.logoutLink.click();
    }
}

module.exports = { checkpage };