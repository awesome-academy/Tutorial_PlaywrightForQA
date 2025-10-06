/**loginPage.ts: class LoginPage có method:
    async gotoLoginPage()
    async login(username: string, password: string)
     */
export class loginPage{
    async gotoLoginPage(): Promise<void>{
        console.log("Login....");
    }
    // login method 

    async login(username: string, password: string): Promise<void>{
        console.log(`username: ${username}`);
        console.log(`Password: ${password}`);
    }
}