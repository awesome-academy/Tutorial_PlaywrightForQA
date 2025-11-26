// class LoginPage {
//   constructor(page) {
//     this.page = page;
//     this.usernameInput = page.locator('#user-name');
//     this.passwordInput = page.locator('#password');
//     this.loginButton = page.locator('#login-button');
//     // Selector lỗi dùng thuộc tính data-test để đảm bảo ổn định
//     this.errorMessage = page.locator('[data-test="error"]'); 
//   }

//   async goto() {
//     await this.page.goto('https://www.saucedemo.com');
//   }

//   async login(username, password) {
//     await this.usernameInput.fill(username);
//     await this.passwordInput.fill(password);
//     await this.loginButton.click();
//   }

//   async getErrorMessage() {
//     return await this.errorMessage.textContent();
//   }
// }

// module.exports = { LoginPage };

class loginpage{
    constructor(page) {
        this.page= page;
        this.usernameinput= page.locator('#username');
        this.passwordinput= page.locator('#password');
        this.buttonlogin= page.locator('#login-button');

        this.errormessage= page.locator('[data-test="error"]');
        
    }
    async goto(){
        await this.page.goto('https://www.saucedemo.com');
    }

    async login(username,password){
        await this.usernameinput.fill(username);
        await this.passwordinput.fill(password);
        await this.buttonlogin.click();
    }

    async geterrormessage(){
        return await this.errormessage.texContent();
    }

}
module.exports = {loginpage};
