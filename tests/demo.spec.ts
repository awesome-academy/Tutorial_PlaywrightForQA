import { test, expect } from '@playwright/test';

// Dữ liệu mẫu để điền
const userData = {
  username: 'Huỳnh Văn Bình',
  email: 'huynh.van.binh@example.com',
  gender: 'Male', // Giá trị để kiểm tra
  hobbies: ['Traveling'], // Giá trị để kiểm tra
  interested: 'technology',
  country: 'Vietnam',
  dob: '1999-02-09',
  rateUs: '6',
  favColor: '#ffdd00',
  starRating: '5', // Giả định điền 5 sao
  biography: 'Example text'
};

test('Register user and verify data', async ({ page }) => {
  // 1. Điều hướng đến trang đăng ký
  await page.goto('https://material.playwrightvn.com/01-xpath-register-page.html');
  
  // 2. Nhập dữ liệu cơ bản
  await page.getByRole('textbox', { name: 'Username:' }).fill(userData.username);
  await page.getByRole('textbox', { name: 'Email:' }).fill(userData.email);
  
  // 3. Chọn Gender (Radio button)
  // Sử dụng label hoặc xpath/css chính xác hơn để tránh nhầm lẫn
  await page.locator('input[name="gender"][value="male"]').check();
  
  // 4. Chọn Hobbies (Checkbox) - Giả định chọn Traveling
  await page.locator('input[name="hobbies"][value="Traveling"]').check(); 
  
  // 5. Chọn Interested (Dropdown)
  await page.getByLabel('Interests:').selectOption(userData.interested);
  
  // 6. Chọn Country (Dropdown) - Yêu cầu thêm từ ảnh, không có trong code gốc
  await page.getByLabel('Country:').selectOption(userData.country);
  
  // 7. Nhập Date of Birth
  await page.getByRole('textbox', { name: 'Date of Birth:' }).fill(userData.dob);
  
  // 8. Các trường còn lại (Giữ lại từ code gốc)
  // Profile Picture: Giả định file này tồn tại trong thư mục test
  // Lưu ý: Nếu không có file này, bước này có thể gây lỗi.
  await page.getByRole('button', { name: 'Profile Picture:' }).setInputFiles('f9d868f6673b80b2af8c44c391689564.jpg');
  
  // Rate Us (Range Slider)
  await page.getByRole('slider', { name: 'Rate Us:' }).fill(userData.rateUs);
  
  // Favorite Color
  await page.locator('#favcolor').fill(userData.favColor);
  
  // Star Rating (Giả định click 5 sao, tùy thuộc vào cách element này được render)
  // Đây là phần dễ bị sai selector nhất, dựa vào code gốc đang click vào #starRating
  // Thường là các input radio/checkbox ẩn. Ta sẽ giả định chọn sao cuối cùng (5 sao)
  await page.locator('#starRating input[value="5"]').check(); 
  
  // Biography
  await page.getByRole('textbox', { name: 'Biography:' }).fill(userData.biography);
  
  // Subscribe (Checkbox)
  await page.getByRole('checkbox', { name: 'Subscribe' }).check();
  
  // Lưu ý: Các dòng .locator('span').nth(3).click(); có vẻ dư thừa hoặc sai mục đích 
  // so với các bước điền form. Ta loại bỏ chúng để code rõ ràng hơn.
  
  // --- Yêu cầu: Click nút đăng ký ---
  await page.getByRole('button', { name: 'Register' }).click();
  
  // --- Yêu cầu: Kiểm tra giá trị checked của radio và checkbox ---
  
  // Kiểm tra Radio button (Gender)
  await expect(page.locator('input[name="gender"][value="male"]')).toBeChecked();
  
  // Kiểm tra Checkbox (Hobbies)
  await expect(page.locator('input[name="hobbies"][value="Traveling"]')).toBeChecked();
  
  // Kiểm tra Checkbox (Subscribe)
  await expect(page.getByRole('checkbox', { name: 'Subscribe' })).toBeChecked();
  
  // --- Yêu cầu: Đăng ký user thành công (user hiển thị dưới table list) ---
  
  // 1. Chờ bảng danh sách user xuất hiện và user mới được thêm vào
  // Tìm hàng (row) trong bảng chứa username đã đăng ký
  const userRow = page.locator('table.user-table').locator('tbody tr', { hasText: userData.username });
  
  // 2. Kiểm tra userRow có tồn tại và hiển thị không
  await expect(userRow).toBeVisible();
  
  // 3. (Tùy chọn) Kiểm tra thêm các thông tin trong hàng đó có đúng không
  await expect(userRow).toContainText(userData.email);
  await expect(userRow).toContainText(userData.gender); // Kiểm tra Gender hiển thị
  
  console.log(`Đăng ký thành công và đã xác minh user "${userData.username}" trong bảng.`);
});