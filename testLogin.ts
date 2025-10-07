// Import các class từ các file khác
import { LoginPage } from "./pages/loginPage";
import { DashboardPage } from "./pages/dashboardPage";

// Viết hàm test bất đồng bộ
async function testLogin(): Promise<void> {
  console.log("--- Starting Login Test ---");
  
  // Tạo instance từ các class đã import
  const loginPage = new LoginPage();
  const dashboardPage = new DashboardPage();

  // Dùng await để đảm bảo các hành động diễn ra tuần tự
  await loginPage.gotoLoginPage();
  await loginPage.login("admin", "123456");
  await dashboardPage.verifyLoginSuccess();

  console.log("--- Test Finished ---");
}

// Gọi hàm test để chạy
testLogin();