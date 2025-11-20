# 🎯 Accessibility-First Testing - Giải thích chi tiết

## 📖 Tổng quan

**Accessibility-First** có nghĩa là: **Test theo cách người dùng THẬT SỰ tương tác với ứng dụng**, đặc biệt là người dùng khuyết tật (sử dụng screen reader).

---

## 🧑 Cách người dùng tương tác với form

### Người dùng BÌNH THƯỜNG nhìn thấy:
- ✅ "Ô Email với placeholder 'name@example.com'"
- ✅ "Ô First Name"
- ✅ "Nút radio Male, Female, Other"
- ✅ "Nút Submit"

### Người dùng KHÔNG biết và KHÔNG quan tâm:
- ❌ ID là `#userEmail` hay `#firstName`
- ❌ Class CSS là `.form-control`
- ❌ Cấu trúc HTML bên trong

---

## 🔊 Screen Reader hoạt động như thế nào?

**Screen Reader** (công cụ đọc màn hình cho người khiếm thị) sẽ đọc:

```
🔊 "Email, edit text, placeholder: name@example.com"
🔊 "First Name, edit text"
🔊 "Male, radio button, not checked"
🔊 "Submit, button"
```

**Playwright's getByRole** mô phỏng CHÍNH XÁC cách screen reader hoạt động!

---

## 💡 So sánh LOCATOR vs GETBYROLE

### ❌ LOCATOR (Implementation-based)

```typescript
// Test theo IMPLEMENTATION (code)
await page.locator('#userEmail').fill('test@example.com');
await page.locator('#firstName').fill('John');
await page.locator('label[for="gender-radio-1"]').click();
await page.locator('#submit').click();
```

**Vấn đề:**
- ❌ Không test accessibility
- ❌ Phụ thuộc vào ID/class (dễ thay đổi)
- ❌ Không phản ánh trải nghiệm người dùng
- ❌ Code khó đọc (phải biết ID là gì)

**Kết quả từ test thực tế:**
```
❌ Locator approach:
   - Selector: #userEmail
   - Time: 38ms
   - Accessibility tested: NO
   - Readable: NO (phải biết ID)
   - Maintainable: NO (ID có thể đổi)
```

---

### ✅ GETBYROLE (User-centric)

```typescript
// Test theo USER EXPERIENCE
await page.getByRole('textbox', { name: 'name@example.com' }).fill('test@example.com');
await page.getByRole('textbox', { name: 'First Name' }).fill('John');
await page.getByText('Male', { exact: true }).click();
await page.getByRole('button', { name: 'Submit' }).click();
```

**Lợi ích:**
- ✅ Tự động test accessibility
- ✅ Không phụ thuộc vào implementation
- ✅ Phản ánh trải nghiệm người dùng thật
- ✅ Code dễ đọc (ai cũng hiểu)

**Kết quả từ test thực tế:**
```
✅ GetByRole approach:
   - Selector: getByRole('textbox', { name: 'name@example.com' })
   - Time: 12ms (nhanh hơn!)
   - Accessibility tested: YES ✓
   - Readable: YES ✓ (ai cũng hiểu)
   - Maintainable: YES ✓ (chỉ fail khi UX đổi)
```

---

## 🐛 Ví dụ thực tế: Tại sao quan trọng?

### Scenario: Developer xóa placeholder của email field

**❌ Test với LOCATOR:**
```typescript
await page.locator('#userEmail').fill('test@example.com');
// ✓ Test PASS (nhưng user không biết field này là gì!)
```

**✅ Test với GETBYROLE:**
```typescript
await page.getByRole('textbox', { name: 'name@example.com' }).fill('test@example.com');
// ✗ Test FAIL vì không tìm thấy textbox với name đó
// → Buộc developer phải fix accessibility issue!
```

### Key Insight:
```
💡 Locator test = Test CODE hoạt động
💡 GetByRole test = Test USER EXPERIENCE
💡 Nếu screen reader không đọc được → GetByRole fail → Bắt bug sớm!
```

---

## 🎯 Best Practices

### 1. Thứ tự ưu tiên khi chọn selector:

```typescript
// 🥇 Ưu tiên cao nhất
page.getByRole('button', { name: 'Submit' })
page.getByRole('textbox', { name: 'Email' })
page.getByLabel('First Name')

// 🥈 Ưu tiên trung bình
page.getByPlaceholder('Enter your email')
page.getByText('Male')

// 🥉 Ưu tiên thấp (nhưng vẫn OK)
page.getByTestId('submit-button')  // Thêm data-testid vào HTML

// 🚫 Tránh (trừ khi không có cách nào khác)
page.locator('#userEmail')
page.locator('.form-control')
```

### 2. Các role phổ biến:

| Role | Element | Ví dụ |
|------|---------|-------|
| `button` | `<button>`, `<input type="button">` | Submit button |
| `textbox` | `<input type="text">`, `<textarea>` | Email, Name fields |
| `checkbox` | `<input type="checkbox">` | Hobbies |
| `radio` | `<input type="radio">` | Gender |
| `heading` | `<h1>`, `<h2>`, etc. | Page title |
| `link` | `<a href="...">` | Navigation links |

### 3. Cách xử lý các trường hợp đặc biệt:

#### Radio buttons (không có accessible name):
```typescript
// ❌ KHÔNG hoạt động
await page.getByRole('radio', { name: 'Male' }).check();

// ✅ GIẢI PHÁP: Click vào label (cách người dùng thật làm)
await page.getByText('Male', { exact: true }).click();

// Hoặc
await page.locator('label[for="gender-radio-1"]').click();
```

#### Dropdowns phức tạp (React Select):
```typescript
// Click để mở dropdown
await page.locator('#state').click();

// Select option bằng text (cách người dùng nhìn thấy)
await page.getByText('NCR', { exact: true }).click();
```

---

## 📊 Kết quả test thực tế

File `locator.spec.ts` so sánh 2 cách:

```bash
npx playwright test tests/demoqa/form/locator.spec.ts
```

**Kết quả:**
- ✅ Test với getByRole: PASS (sau khi fix radio button)
- ✅ Test với locator: PASS

**Nhưng:**
- GetByRole **nhanh hơn** (12ms vs 38ms)
- GetByRole **test accessibility**
- GetByRole **dễ maintain hơn**

---

## ⚠️ Khi nào getByRole KHÔNG hoạt động?

Mặc dù getByRole là best practice, nhưng có **8 trường hợp** nó gặp khó khăn:

1. ❌ **Element không có accessible name** (radio buttons, checkboxes)
2. ❌ **Custom components** không có proper ARIA (React Select, dropdowns)
3. ❌ **Multiple elements** với cùng role và name
4. ❌ **Elements bị disabled** hoặc hidden
5. ❌ **Dynamic content** loading (autocomplete, suggestions)
6. ❌ **File upload buttons** (input bị ẩn)
7. ❌ **Modal/overlay** timing issues
8. ❌ **Nested iframes** cần switch context

**📖 Xem chi tiết:** [GETBYROLE_LIMITATIONS.md](./GETBYROLE_LIMITATIONS.md)

**🧪 Chạy demo:**
```bash
npx playwright test tests/demoqa/form/getbyrole-limitations.spec.ts
```

---

## 🎓 Chạy demo để học

### 1. Chạy tất cả demo:
```bash
npx playwright test tests/demoqa/form/accessibility-demo.spec.ts
```

### 2. Chạy từng demo cụ thể:
```bash
# Demo 1: Cách người dùng nhìn thấy
npx playwright test -g "Demo 1"

# Demo 2: Screen reader
npx playwright test -g "Demo 2"

# Demo 5: So sánh trực tiếp
npx playwright test -g "Demo 5"

# Demo 7: Real accessibility bug
npx playwright test -g "Demo 7"
```

### 3. Chạy với UI mode để xem chi tiết:
```bash
npx playwright test tests/demoqa/form/accessibility-demo.spec.ts --ui
```

---

## 📚 Tài liệu tham khảo

### Playwright Official Docs:
- [Locators Best Practices](https://playwright.dev/docs/locators)
- [Accessibility Testing](https://playwright.dev/docs/accessibility-testing)
- [User-Centric Selectors](https://playwright.dev/docs/locators#locate-by-role)

### W3C ARIA Roles:
- [ARIA Roles Reference](https://www.w3.org/TR/wai-aria-1.1/#role_definitions)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)

### Testing Library Philosophy:
- [Guiding Principles](https://testing-library.com/docs/guiding-principles/)
- "The more your tests resemble the way your software is used, the more confidence they can give you."

---

## 🎯 Tóm tắt

### ❌ LOCATOR:
- Test theo **IMPLEMENTATION** (code)
- **Không** đảm bảo accessibility
- **Khó** maintain khi HTML đổi
- **Không** phản ánh user experience

### ✅ GETBYROLE:
- Test theo **USER EXPERIENCE**
- **Đảm bảo** accessibility (screen reader friendly)
- **Dễ** maintain (chỉ fail khi UX thực sự đổi)
- **Tự động** test accessibility compliance

### 💡 Key Takeaway:
```
Accessibility-First = Test theo cách người dùng THẬT SỰ sử dụng app,
không phải theo cách developer implement code.
```

---

## 🚀 Bắt đầu ngay

1. Mở file `accessibility-demo.spec.ts`
2. Chạy từng demo để hiểu rõ
3. Áp dụng vào test cases của bạn
4. Tham khảo `locator.spec.ts` để so sánh

**Happy Testing! 🎉**
