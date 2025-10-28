import { LoginPage } from "../pages/loginPage";
import { DashboardPage } from "../pages/dashboardPage";
import { test, expect } from "../src/fixtures/baseFixtures";

test.describe("DemoQA Basic Smoke Tests", () => {
    
  test("Test User class getInfo()", async () => {
    const loginPage = new LoginPage();
    const dashboardPage = new DashboardPage();
    await loginPage.gotoLoginPage();
    await loginPage.login("Abc1", "123456");
    await dashboardPage.verifyLoginSuccess();
  });
});
