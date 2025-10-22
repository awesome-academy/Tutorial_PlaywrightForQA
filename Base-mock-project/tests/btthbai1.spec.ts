import { test, expect } from '../src/fixtures/baseFixtures';
//import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto(
    "https://material.playwrightvn.com/01-xpath-register-page.html"
  );
  await expect(page).toHaveTitle(/User Registration/);

  //User name
  const username = page.getByRole("textbox", { name: "Username:" });
  await username.fill("traPT-0809");

  //Email
  const email = page.getByRole("textbox", { name: "Email:" });
  await email.fill("pham.thanh.tra@sun-asterisk.com");

  //Gender
  const gender = page.getByRole("radio", { name: "Female" });
  await gender.check();
  await expect(gender).toBeChecked(); //Kiểm tra radio đã được chọn

  //Hobbies
  const hobbiesReading = page.getByRole("checkbox", { name: "Reading" });
  const hobbiesTraveling = page.getByRole("checkbox", { name: "Traveling" });
  const hobbiesCooking = page.getByRole("checkbox", { name: "Cooking" });
  await hobbiesReading.check();
  await hobbiesTraveling.check();
  await hobbiesCooking.check();
  await expect(hobbiesReading).toBeChecked(); //Kiểm tra sở thích được chọn
  await expect(hobbiesTraveling).toBeChecked(); //Kiểm tra sở thích được chọn
  await expect(hobbiesCooking).toBeChecked(); //Kiểm tra sở thích được chọn

  //Interested
  const interested = page.getByLabel("Interests:");
  //   await interested.selectOption("technology");
  //   await interested.selectOption(["technology", "science"]);
  await interested.selectOption(["technology", "science", "art"]);

  //Country
  const country = page.getByLabel("Country:");
  await country.selectOption("canada");

  //Date of Birth
  const dateOfBirth = page.getByRole("textbox", { name: "Date of Birth:" });
  await dateOfBirth.fill("1987-12-09");

  //Click button Register
  const buttonRegister = page.getByRole("button", { name: "Register" });
  await buttonRegister.click();

  //Chờ bảng kết quả hiển thị
  page.waitForTimeout;
  const emailTable = await page.textContent(
    "#userTable tbody tr:nth-child(1) td:nth-child(3)"
  );
  console.log("Email người dùng thứ 2:", emailTable);
  await expect(emailTable).toBe("pham.thanh.tra@sun-asterisk.com");
  console.log("Đăng ký user thành công");

  page.pause();
});

// "Viết script đăng ký tại page: https://material.playwrightvn.com/01-xpath-register-page.html
// Yêu cầu:
// Viết bước nhập dữ liệu tại các input dưới đây và click nút đăng ký
// + username
// + Email
// + Gender
// + Hobbies
// + Interested
// + Country
// + Date of Birth
// Kiểm tra:
// + giá trị checked của radio và checkbox
// + đăng ký user thành công (user hiển thị dưới table list)"
