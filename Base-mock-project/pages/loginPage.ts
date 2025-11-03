
import { test, expect } from "../src/fixtures/baseFixtures"; 
import { TestData } from "../src/data/testData";
import { Page } from '@playwright/test';

// export class LoginPage {
//   constructor(private page: Page) {}

//   async gotoLoginPage(): Promise<void> {
//     console.log(`Đang login vào page: http://.....`);
//     await this.page.goto("https://yourapp.com/login");
//   }

//   async login(username: string, password: string): Promise<void> {
//     console.log(`Login with user name ${username}, password ${password}`);
//     await this.page.fill("#username", username);
//     await this.page.fill("#password", password);
//     await this.page.click('button[type="submit"]');
//   }
// }


  export class LoginPage {
    async gotoLoginPage(): Promise<void> {
      console.log(`Đang login vào page: http://.....`)
    }

    async login(username: string, password: string) : Promise<void>{
      console.log(`Login with user name${username}, password ${password}`)
    }
  }


