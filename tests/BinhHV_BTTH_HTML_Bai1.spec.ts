import { test, expect } from '@playwright/test';
//Khai bao biến và gán data
const datauser= {
  username: 'Huỳnh Văn Bình',
  email: 'huynh.van.binh@example.com',
  hobbie: ['Traveling'], // Giá trị để kiểm tra
  country: 'Vietnam',
  birthday: '1999-02-09',
  color: '#ffdd00',
  bio: 'Example text'
};
test('test', async ({ page }) => {
  //Step thực hiện 
  await page.goto('https://material.playwrightvn.com/01-xpath-register-page.html');
  await page.getByRole('textbox', { name: 'Username:' }).click();
  await page.getByRole('textbox', { name: 'Username:' }).fill(datauser.username);
  await page.getByRole('textbox', { name: 'Email:' }).click();
  await page.getByRole('textbox', { name: 'Email:' }).fill(datauser.email);
  await page.getByRole('radio', { name: 'Male', exact: true }).check();
  await page.getByRole('checkbox', { name: 'Traveling' }).check();
  await page.getByLabel('Interests:').selectOption('technology');
  await page.getByRole('textbox', { name: 'Date of Birth:' }).fill(datauser.birthday);
  await page.getByRole('button', { name: 'Profile Picture:' }).click();
  await page.getByRole('textbox', { name: 'Biography:' }).click();
  await page.getByRole('textbox', { name: 'Biography:' }).fill(datauser.bio);
  await page.locator('#favcolor').click();
  await page.locator('#favcolor').fill(datauser.color);
  await page.locator('#starRating').click();
  await page.getByRole('button', { name: 'Register' }).click();
  // Check expect
  //Kiểm tra user có hiển thị ở table list
    await expect(page.locator('#userTable tbody tr td:nth-child(2)')).toBeVisible();
  // Kiểm tra user name 
   await expect(page.locator('#userTable tbody tr td:nth-child(2)')).toContainText(datauser.username);
  // Kiểm tra email
     await expect(page.locator('#userTable tbody tr td:nth-child(3)')).toContainText(datauser.email);
  //Kiểm tra birthday
     await expect(page.locator('#userTable tbody tr td:nth-child(4)')).toContainText(datauser.birthday);
  // Kiểm trả color
      await expect(page.locator('#userTable tbody tr td:nth-child(4)')).toContainText(datauser.color);
  // Kiểm tra bio
      await expect(page.locator('#userTable tbody tr td:nth-child(4)')).toContainText(datauser.bio);
  // Kiểm tra hobbie
  // Kiểm tra country
});