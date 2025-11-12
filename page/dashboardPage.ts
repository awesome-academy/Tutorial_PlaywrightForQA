export class DashboardPage {
  async verifyLoginSuccess() {
    console.log("Đang nhập thành công");
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
}
