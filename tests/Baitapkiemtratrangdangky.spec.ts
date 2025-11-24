import { test, expect } from '@playwright/test';
import { LoginPage } from '../page/loginPage';
//Khai báo biến
const datauser =
{
firstname : 'Huynh',
lastname: 'Binh',
username: 'huynhbinh',
password: 'Aa@123456',
};

test('Testcase_1_URL_is_Register', async ({ page }) => {
  await page.goto('https://globalsqa.com/angularJs-protractor/registration-login-example/#/register');
 // Khai báo link URL
 const currentURL = page.url();
 //Kiểm tra URL có thuộc tính register không 
 await expect(currentURL).toContain('/register');
 //kiểm tra tiêu đề trang có phải register không
 await expect(page.locator('.ng-scope:first-child div h2')).toHaveText('Register');
 // Kiểm tra các field input có hiển thị 
    //Kiểm tra trường firstname có hiển thị
 await expect(page.locator('#firstName')).toBeVisible();
    //Kiểm tra trường lastname có hiển thị 
  await expect(page.locator('#Text1')).toBeVisible();
    //Kiểm tra trường username có hiển thị 
  await expect(page.locator('#username')).toBeVisible();
    //Kiểm tra trường Password có hiển thị 
  await expect(page.locator('#password')).toBeVisible();
  // Nhập thông tin user
  await page.fill('#firstName',datauser.firstname);
  await page.fill('#Text1', datauser.lastname);
  await page.fill('#username', datauser.username);
  await page.fill('#password', datauser.password);
 await page.locator('.form-actions button').click();

// khai báo biển URL trang login
const loginpageurl ='https://globalsqa.com/angularJs-protractor/registration-login-example/#/login';
//Kiểm tra redirect screen
await expect(page).toHaveURL(loginpageurl);
//Kiểm tra có tooltip Đăng ký thành công
//Khai báo thẻ alert
const thealert = page.locator('.alert-success');
await expect(thealert).toHaveText('Registration successful');
});