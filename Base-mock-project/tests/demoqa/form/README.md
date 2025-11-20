# 📚 DemoQA Form Testing Suite - Complete Guide

## 🎯 Tổng quan

Đây là bộ test suite hoàn chỉnh cho trang **Student Registration Form** của DemoQA, được tạo bằng **MCP Playwright** để phân tích web trực tiếp và demo các best practices về **Accessibility-First Testing**.

---

## 📁 Cấu trúc thư mục

```
tests/demoqa/form/
├── 📄 Test Files (50 test cases)
│   ├── student-registration-form.spec.ts    (15 TCs - Functional)
│   ├── form-validation.spec.ts              (15 TCs - Validation)
│   ├── form-ui-ux.spec.ts                   (20 TCs - UI/UX)
│   ├── locator.spec.ts                      (2 TCs - So sánh)
│   ├── accessibility-demo.spec.ts           (7 Demos)
│   └── getbyrole-limitations.spec.ts        (8 Cases)
│
├── 📖 Documentation
│   ├── README.md                            (File này)
│   ├── ACCESSIBILITY_GUIDE.md               (Hướng dẫn chi tiết)
│   ├── GETBYROLE_LIMITATIONS.md             (Khi nào không dùng)
│   └── LOCATOR_CHEATSHEET.md                (Quick reference)
│
└── 🖼️ Screenshots (tự động)
    └── form-page-full.png
```

---

## 🚀 Quick Start

### 1. Chạy tất cả test cases (50 TCs)
```bash
npx playwright test tests/demoqa/form/
```

### 2. Chạy từng file test
```bash
# Functional tests
npx playwright test tests/demoqa/form/student-registration-form.spec.ts

# Validation tests
npx playwright test tests/demoqa/form/form-validation.spec.ts

# UI/UX tests
npx playwright test tests/demoqa/form/form-ui-ux.spec.ts
```

### 3. Chạy với UI Mode (KHUYẾN KHÍCH để học)
```bash
npx playwright test tests/demoqa/form/ --ui
```

### 4. Chạy demo về Accessibility
```bash
# Xem tất cả 7 demos
npx playwright test tests/demoqa/form/accessibility-demo.spec.ts

# Demo 5: So sánh Locator vs GetByRole
npx playwright test -g "Demo 5"

# Demo về getByRole limitations
npx playwright test tests/demoqa/form/getbyrole-limitations.spec.ts -g "Case 1"
```

---

## 📚 Learning Path

### 🟢 Level 1: Người mới bắt đầu

**1. Đọc tài liệu:**
- Bắt đầu với [LOCATOR_CHEATSHEET.md](./LOCATOR_CHEATSHEET.md) - Quick reference

**2. Chạy test cơ bản:**
```bash
npx playwright test tests/demoqa/form/student-registration-form.spec.ts
```

**3. Xem test report:**
```bash
npx playwright show-report
```

---

### 🟡 Level 2: Hiểu về Accessibility-First

**1. Đọc hướng dẫn:**
- [ACCESSIBILITY_GUIDE.md](./ACCESSIBILITY_GUIDE.md) - Giải thích chi tiết

**2. Chạy demo:**
```bash
# Demo 1: Cách người dùng nhìn thấy
npx playwright test -g "Demo 1"

# Demo 2: Screen reader
npx playwright test -g "Demo 2"

# Demo 5: So sánh trực tiếp
npx playwright test -g "Demo 5"
```

**3. So sánh 2 cách:**
```bash
npx playwright test tests/demoqa/form/locator.spec.ts
```

---

### 🔴 Level 3: Master Locator Strategies

**1. Hiểu limitations:**
- [GETBYROLE_LIMITATIONS.md](./GETBYROLE_LIMITATIONS.md) - 8 trường hợp không hoạt động

**2. Chạy limitation demos:**
```bash
# Xem tất cả 8 cases
npx playwright test tests/demoqa/form/getbyrole-limitations.spec.ts

# Case cụ thể
npx playwright test -g "Case 1"  # Radio buttons
npx playwright test -g "Case 2"  # Custom components
npx playwright test -g "Best Practice"  # Kết hợp strategies
```

**3. Áp dụng vào dự án của bạn!**

---

## 💡 Key Concepts

### 🎯 Accessibility-First Testing

**Concept:** Test theo cách người dùng THẬT SỰ tương tác (bao gồm người khuyết tật)

```typescript
// ❌ BAD: Test theo implementation
await page.locator('#userEmail').fill('test@test.com');

// ✅ GOOD: Test theo user experience
await page.getByRole('textbox', { name: 'name@example.com' }).fill('test@test.com');
```

**Lợi ích:**
- ✅ Tự động test accessibility
- ✅ Không phụ thuộc vào ID/class
- ✅ Dễ maintain
- ✅ Phản ánh trải nghiệm người dùng thật

**Xem thêm:** [ACCESSIBILITY_GUIDE.md](./ACCESSIBILITY_GUIDE.md)

---

### ⚠️ Khi nào getByRole KHÔNG hoạt động?

**8 trường hợp phổ biến:**

1. ❌ Radio/checkbox không có accessible name
2. ❌ Custom components (React Select, Material-UI)
3. ❌ Multiple elements cùng role
4. ❌ Elements bị disabled/hidden
5. ❌ Dynamic content loading
6. ❌ File upload buttons
7. ❌ Modal timing issues
8. ❌ Nested iframes

**Xem chi tiết:** [GETBYROLE_LIMITATIONS.md](./GETBYROLE_LIMITATIONS.md)

---

## 📊 Test Coverage

### Test Cases Overview

| Category | File | Test Cases | Mục đích |
|----------|------|------------|----------|
| **Functional** | student-registration-form.spec.ts | 15 | Test chức năng cơ bản |
| **Validation** | form-validation.spec.ts | 15 | Test validation rules |
| **UI/UX** | form-ui-ux.spec.ts | 20 | Test giao diện và UX |
| **Comparison** | locator.spec.ts | 2 | So sánh locator strategies |
| **Demo** | accessibility-demo.spec.ts | 7 | Demo accessibility concepts |
| **Limitations** | getbyrole-limitations.spec.ts | 8 | Demo khi nào không dùng getByRole |
| **TOTAL** | - | **67** | - |

### Coverage by Feature

| Feature | Covered | Notes |
|---------|---------|-------|
| Text inputs | ✅ | First Name, Last Name, Email, Mobile |
| Radio buttons | ✅ | Gender selection |
| Checkboxes | ✅ | Hobbies |
| Date picker | ✅ | Date of Birth |
| Autocomplete | ✅ | Subjects |
| Custom dropdown | ✅ | State & City (cascading) |
| Textarea | ✅ | Current Address |
| File upload | ✅ | Picture upload |
| Form submission | ✅ | Submit button & modal |
| Validation | ✅ | Email, mobile, required fields |
| Accessibility | ✅ | Screen reader compatibility |

---

## 🎓 Locator Strategy Guide

### Decision Tree

```
Cần select element?
  │
  ├─ Standard HTML (button, input)?
  │   └─ getByRole('role', { name: 'text' }) ⭐⭐⭐⭐⭐
  │
  ├─ Form input với label?
  │   └─ getByLabel('label text') ⭐⭐⭐⭐
  │
  ├─ Input với placeholder?
  │   └─ getByPlaceholder('placeholder') ⭐⭐⭐⭐
  │
  ├─ Clickable text?
  │   └─ getByText('text') ⭐⭐⭐⭐
  │
  ├─ Custom component?
  │   └─ getByTestId('test-id') hoặc locator('#id') ⭐⭐⭐
  │
  └─ Last resort?
      └─ locator('.class') ⭐⭐
```

### Quick Examples

```typescript
// ✅ Text inputs
await page.getByRole('textbox', { name: 'First Name' }).fill('John');

// ✅ Buttons
await page.getByRole('button', { name: 'Submit' }).click();

// ✅ Radio (click label)
await page.getByText('Male', { exact: true }).click();

// ✅ Checkbox
await page.locator('label[for="hobby-1"]').click();

// ✅ Custom dropdown
await page.locator('#state').click();
await page.getByText('NCR', { exact: true }).click();

// ✅ Modal
await expect(page.locator('.modal')).toBeVisible();
```

**Xem đầy đủ:** [LOCATOR_CHEATSHEET.md](./LOCATOR_CHEATSHEET.md)

---

## 🔧 Troubleshooting

### Issue 1: Test fail vì timing
```typescript
// ❌ BAD
await page.getByText('Option').click();

// ✅ GOOD
await page.waitForSelector('.dropdown-menu');
await page.getByText('Option').click();

// ✅ BETTER
await expect(page.getByText('Option')).toBeVisible();
await page.getByText('Option').click();
```

### Issue 2: Radio button không click được
```typescript
// ❌ BAD
await page.getByRole('radio', { name: 'Male' }).check();

// ✅ GOOD
await page.getByText('Male', { exact: true }).click();
```

### Issue 3: Custom dropdown không tìm thấy
```typescript
// ❌ BAD
await page.getByRole('combobox', { name: 'State' }).click();

// ✅ GOOD
await page.locator('#state').click();
await page.getByText('NCR', { exact: true }).click();
```

---

## 📖 Documentation Index

### Core Guides
1. **[ACCESSIBILITY_GUIDE.md](./ACCESSIBILITY_GUIDE.md)**
   - Giải thích chi tiết về Accessibility-First Testing
   - So sánh Locator vs GetByRole
   - Screen Reader simulation
   - 7 demos với examples

2. **[GETBYROLE_LIMITATIONS.md](./GETBYROLE_LIMITATIONS.md)**
   - 8 trường hợp getByRole không hoạt động
   - Giải pháp cho từng trường hợp
   - Best practices kết hợp strategies

3. **[LOCATOR_CHEATSHEET.md](./LOCATOR_CHEATSHEET.md)**
   - Quick reference cho mọi trường hợp
   - Decision flow charts
   - Code examples
   - Pro tips

### Test Files
- `student-registration-form.spec.ts` - Functional tests
- `form-validation.spec.ts` - Validation tests
- `form-ui-ux.spec.ts` - UI/UX tests
- `locator.spec.ts` - Comparison tests
- `accessibility-demo.spec.ts` - Learning demos
- `getbyrole-limitations.spec.ts` - Limitation demos

---

## 🎯 Best Practices Summary

### ✅ DO's
1. **Ưu tiên getByRole** cho standard HTML elements
2. **Click vào label** thay vì radio/checkbox input
3. **Wait for dynamic content** trước khi interact
4. **Dùng expect().toBeVisible()** cho auto-waiting
5. **Kết hợp nhiều strategies** để robust hơn

### ❌ DON'Ts
1. **Không dùng chỉ locator** với ID/class
2. **Không click radio input** trực tiếp
3. **Không assume timing** - luôn wait
4. **Không dùng .nth()** trừ khi cần thiết
5. **Không ignore accessibility**

---

## 🤝 Contributing

Nếu bạn tìm thấy issues hoặc có suggestions:

1. Test case mới: Thêm vào file phù hợp
2. Bug fixes: Update test và document
3. New examples: Thêm vào demo files

---

## 📞 Support

**Questions?**
- Đọc documentation trước
- Chạy demo tests để hiểu
- Xem examples trong cheatsheet

**Still stuck?**
- Check [Playwright Docs](https://playwright.dev/docs/locators)
- Review limitation guides
- Run tests with `--debug` flag

---

## 📝 Changelog

### v1.0.0 (Current)
- ✅ 50 production test cases
- ✅ 7 accessibility demos
- ✅ 8 limitation cases
- ✅ Complete documentation
- ✅ Cheat sheet & quick reference

---

## 🎓 Learning Resources

### Internal
- [ACCESSIBILITY_GUIDE.md](./ACCESSIBILITY_GUIDE.md)
- [GETBYROLE_LIMITATIONS.md](./GETBYROLE_LIMITATIONS.md)
- [LOCATOR_CHEATSHEET.md](./LOCATOR_CHEATSHEET.md)

### External
- [Playwright Locators](https://playwright.dev/docs/locators)
- [Accessibility Testing](https://playwright.dev/docs/accessibility-testing)
- [ARIA Roles](https://www.w3.org/TR/wai-aria-1.1/)
- [Testing Library Philosophy](https://testing-library.com/docs/guiding-principles/)

---

## 🏆 Summary

**Bộ test suite này cung cấp:**
- ✅ 67 test cases covering toàn bộ form
- ✅ Complete accessibility-first approach
- ✅ Best practices với examples
- ✅ Troubleshooting guides
- ✅ Learning path từ beginner → master

**Key Takeaway:**
> "Test theo cách người dùng THẬT SỰ sử dụng app, không phải theo cách developer implement code!"

---

**Happy Testing! 🎉**

*Created with ❤️ using MCP Playwright and GitHub Copilot*
