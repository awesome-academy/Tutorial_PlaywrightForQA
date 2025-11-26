import { Page } from "@playwright/test";

export class CR_acount{ // khai báo, xuất class này ra
  page: Page;
  constructor(page: Page) {
    this.page = page;
  }
  async goto() {   //sau này có thể gọi lại nhiều lần
    await this.page.goto(
      "https://material.playwrightvn.com/01-xpath-register-page.html"
    );
  }

  async fillForm() {
    await this.page.fill("#username", "testuser123");
    await this.page.fill("#email", "test@example.com");

    await this.page.check("#female"); // type=radio button

    await this.page.check("#reading"); // type= checkbox, truyền thẳng id or dùng getbyrole
    await this.page.check("#traveling");

    await this.page.selectOption("#interests", ["Technology", "Art"]);

    await this.page.selectOption("#country", "United States");

    await this.page.fill("#dob", "1995-11-21");

    await this.page.setInputFiles("#profile", "tests/data/sample.png"); // tạo data test và cho ảnh vào

    await this.page.fill("#bio", "This is a sample bio.");

    await this.page.fill("#rating", "5");

    await this.page.fill("#favcolor", "#ff0000");

    await this.page.hover(".tooltip"); // check hiển thị tooltip khi hover chuột 


    await this.page.check("#newsletter");

    await this.page.click(".switch");  // truyền thẳng = class

    //    await this.page.getByRole('radio', { name: '4' }).click();

    //  await this.page.fill("#customDate", "2025-11-21");

     await this.page.getByRole('button', { name: 'Register' }).click();
  }
}