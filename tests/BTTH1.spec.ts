import { test, expect } from '@playwright/test';

const userData = {
  username: 'huongnt-2746',
  email: 'nguyen.thi.huong-c@sun-asterisk.com',
  genderValue: 'female',
  hobbyValue: 'traveling',
  interestedLabel: 'Technology',
  countryValue: 'usa',
  dob: '1991-12-01'
};
test('Đăng ký người dùng và kiểm tra thông tin - FINAL FIXED V5 ✅', async ({ page }) => {
  // 1️⃣ Mở trang
  await page.goto('https://material.playwrightvn.com/01-xpath-register-page.html');
  await expect(page).toHaveTitle(/User Registration/);
  console.log('✅ Trang đã sẵn sàng.');

  // 2️⃣ Điền thông tin
  await page.fill('input[name="username"]', userData.username);
  console.log('+ Username -> Đã điền');

  await page.fill('input[name="email"]', userData.email);
  console.log('+ Email -> Đã điền');

  await page.check(`input[name="gender"][value="${userData.genderValue}"]`);
  console.log('+ Gender -> Đã chọn');

  await page.check(`input[name="hobbies"][value="${userData.hobbyValue}"]`);
  console.log('+ Hobbies -> Đã chọn');

  const interests = page.locator('#interests');
  await interests.selectOption({ label: userData.interestedLabel });
  console.log('+ Interested -> Đã chọn');

  const country = page.locator('#country');
  await country.selectOption({ value: userData.countryValue });
  console.log('+ Country -> Đã chọn');

  await page.fill('input[name="dob"]', userData.dob);
  console.log('+ Date of Birth -> Đã điền');

  // 3️⃣ Kiểm tra trạng thái checked
  await expect(page.locator(`input[name="gender"][value="${userData.genderValue}"]`)).toBeChecked();
  await expect(page.locator(`input[name="hobbies"][value="${userData.hobbyValue}"]`)).toBeChecked();
  console.log('✅ Checked radio & checkbox ok.');

  // 4️⃣ Click nút Register
  const registerBtn = page.getByRole('button', { name: 'Register' });
  await expect(registerBtn).toBeVisible();
  await registerBtn.click();
  console.log('🚀 Đã click Register.');

  // 5️⃣ Kiểm tra user hiển thị trong bảng
  const userRow = page.locator(`//table//td[normalize-space(text())="${userData.username}"]`);
  await expect(userRow).toBeVisible({ timeout: 10000 });
  console.log(`🎉 Đăng ký thành công! User "${userData.username}" đã có trong bảng.`);
  // 🟡 Tạm dừng để xem kết quả trực tiếp
  console.log('⏸ Tạm dừng để bạn xem kết quả trong trình duyệt...');
  await page.pause();
});
