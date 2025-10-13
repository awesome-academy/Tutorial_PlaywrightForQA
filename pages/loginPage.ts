export class LoginPage {
  async gotoLoginPage() {
    console.log("Go to login page");
  }
  async login(username: string, password: string) {
    console.log(`Logging in with username: ${username}, password: ${password}`);
  }
}
