// Dùng export để cho phép file khác import class này
export class LoginPage {
  async gotoLoginPage(): Promise<void> {
    console.log("1. Navigating to Login Page...");
    // Giả lập thời gian chờ
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  async login(username: string, password: string): Promise<void> {
    console.log(`2. Logging in with username: ${username}`);
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
}