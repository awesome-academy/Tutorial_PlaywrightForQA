export class LoginPage
{
    async gotoLoginPage() {
    console.log("Đi tới trang đăng nhập");
    //  Mở trang login
    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  async login(username: string, password: string) {
    console.log(`Đang đăng nhập với username: ${username}, password: ${password}`);
    //Đăng nhập
    await new Promise((resolve) => setTimeout(resolve, 500));
  }


}