export class LoginPage {
  async gotoLoginPage() {
    console.log("Loading page");
  }

  async login(username: string, password: string) {
    console.log(`Login: ${username}, password: ${password}`);
  }
}