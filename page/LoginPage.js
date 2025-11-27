// pages/LoginPage.js

class LoginPage {
    constructor(page) {
        this.page = page;
        this.url = 'https://www.saucedemo.com/';
        this.usernameInput = page.locator('#user-name');
        this.passwordInput = page.locator('#password');
        this.loginButton = page.locator('#login-button');
    }

    // Mở trang
    async goto() {
        await this.page.goto(this.url);
    }

    // Đăng nhập
    async login(username, password) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
}

module.exports = { LoginPage };