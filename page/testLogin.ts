/*
testLogin.ts:
    Import 2 class trên.

Viết async function testLogin():
    gotoLoginPage()
    login("admin", "123456")
    verifyLoginSuccess()
    Gọi hàm testLogin().
*/

import {loginPage } from "./loginPage.ts";
import { DashboardPage } from "./dashboardPage.ts";

async function testLogin(): Promise<void> {
    const A= new loginPage();
    const B = new DashboardPage();

    await A.gotoLoginPage();
    await A.login ("admin","Aa@123456");
    await B.verifyLoginSuccess();
    console.log("sucessfully");  
}
testLogin();