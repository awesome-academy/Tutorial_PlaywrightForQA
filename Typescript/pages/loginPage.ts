export class LoginPage {
    
    async gotoLoginPage(): Promise<void> {
        console.log("Đang truy cập trang đăng nhập...");
    }

    async login(username: string, password: string): Promise<void> {
        console.log(`Đang đăng nhập với username: ${username} và password: ${password}`);
    }
}
