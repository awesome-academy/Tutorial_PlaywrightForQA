# 🚨 KHI NÀO GETBYROLE KHÔNG HOẠT ĐỘNG?

## 📚 Tổng quan

Mặc dù `getByRole` là best practice cho accessibility testing, nhưng có **8 trường hợp** nó không hoạt động hoặc gặp khó khăn.

---

## ❌ Case 1: Element không có Accessible Name

### Vấn đề:
Radio buttons và checkboxes thường **không có accessible name trực tiếp** trên input element.

```html
<!-- HTML thực tế -->
<input type="radio" id="gender-radio-1" name="gender" value="Male" />
<label for="gender-radio-1">Male</label>
```

Screen reader đọc: "Male, radio button" (từ label qua `for` attribute)  
Nhưng **Playwright's getByRole** cần accessible name TRỰC TIẾP!

### ❌ Code KHÔNG hoạt động:
```typescript
await page.getByRole('radio', { name: 'Male' }).check();
// Error: strict mode violation - resolved to 2 elements
```

### ✅ Giải pháp:

**Option 1: Click vào label text** (KHUYẾN KHÍCH - cách user thật làm)
```typescript
await page.getByText('Male', { exact: true }).click();
```

**Option 2: Click vào label element**
```typescript
await page.locator('label[for="gender-radio-1"]').click();
```

**Option 3: Dùng getByLabel** (nếu có label hợp lệ)
```typescript
await page.getByLabel('Male').check();
```

---

## ❌ Case 2: Custom Components không có proper ARIA roles

### Vấn đề:
Custom dropdowns (React Select, Material-UI, etc.) thường **không có proper ARIA roles**.

```html
<!-- React Select không phải <select> thật -->
<div id="state" class="css-...">Select State</div>
```

### ❌ Code KHÔNG hoạt động:
```typescript
await page.getByRole('combobox', { name: 'State' }).click();
// Error: không tìm thấy combobox role
```

### ✅ Giải pháp:

**Option 1: Dùng ID selector**
```typescript
await page.locator('#state').click();
```

**Option 2: Dùng visible text**
```typescript
await page.getByText('Select State').click();
```

**Option 3: Thêm data-testid** (nếu có quyền sửa HTML)
```html
<div id="state" data-testid="state-dropdown">...</div>
```
```typescript
await page.getByTestId('state-dropdown').click();
```

---

## ❌ Case 3: Multiple elements với cùng role và name

### Vấn đề:
Nhiều textboxes, buttons có thể có **cùng role**, khó phân biệt.

```typescript
// Có 9 textboxes trong form!
const allTextboxes = await page.getByRole('textbox').all();
console.log(allTextboxes.length); // 9
```

### ❌ Code KHÔNG rõ ràng:
```typescript
await page.getByRole('textbox').fill('John');
// Điền vào textbox nào?
```

### ✅ Giải pháp:

**Option 1: Specify name cụ thể** (BEST)
```typescript
await page.getByRole('textbox', { name: 'First Name' }).fill('John');
```

**Option 2: Dùng .nth()** (không khuyến khích - dễ break)
```typescript
await page.getByRole('textbox').nth(0).fill('John');
```

**Option 3: Filter by context**
```typescript
const nameSection = page.locator('.row').filter({ hasText: 'Name' });
await nameSection.getByRole('textbox').first().fill('John');
```

---

## ❌ Case 4: Elements bị disabled hoặc hidden

### Vấn đề:
City dropdown **bị disabled** khi chưa chọn State.

```html
<input disabled />  <!-- Không thể click -->
```

### ❌ Code KHÔNG hoạt động:
```typescript
await page.locator('#city').click();
// Element không interactable vì disabled
```

### ✅ Giải pháp:

**Check state trước khi interact:**
```typescript
const cityInput = page.locator('#city input');
const isDisabled = await cityInput.isDisabled();

if (isDisabled) {
    // Enable dependency trước
    await page.locator('#state').click();
    await page.getByText('NCR', { exact: true }).click();
}

// Bây giờ mới click city
await page.locator('#city').click();
```

---

## ❌ Case 5: Dynamic content loading

### Vấn đề:
Subjects autocomplete cần **time để load suggestions**.

```typescript
await page.locator('#subjectsInput').fill('Mat');
// Suggestions chưa load xong!
await page.getByText('Maths').click(); // ❌ Fail - quá nhanh!
```

### ✅ Giải pháp:

**Option 1: waitForTimeout** (quick fix)
```typescript
await subjectsInput.fill('Eng');
await page.waitForTimeout(500);
await page.keyboard.press('Enter');
```

**Option 2: Wait for selector** (better)
```typescript
await subjectsInput.fill('Phy');
await page.waitForSelector('.subjects-auto-complete__menu');
await page.keyboard.press('Enter');
```

**Option 3: Wait for specific option** (BEST)
```typescript
await subjectsInput.fill('Che');
await page.waitForSelector('text=Chemistry');
await page.keyboard.press('Enter');
```

---

## ❌ Case 6: File upload buttons

### Vấn đề:
File input thường **bị ẩn**, chỉ hiển thị custom button.

```html
<input type="file" style="display: none" />
<button>Select picture</button>
```

### ❌ Code có thể fail:
```typescript
await page.getByRole('button', { name: 'Choose File' }).click();
// Custom button có cấu trúc khác nhau
```

### ✅ Giải pháp:

**Option 1: Tìm input[type="file"] trực tiếp**
```typescript
const fileInput = page.locator('input[type="file"]');
```

**Option 2: Dùng setInputFiles** (BEST - không cần click)
```typescript
await page.locator('input[type="file"]').setInputFiles('path/to/file.pdf');
```

**Option 3: Click visible text**
```typescript
await page.getByText('Select picture').click();
```

---

## ❌ Case 7: Modal và overlay elements

### Vấn đề:
Modal xuất hiện **có delay**, cần wait.

```typescript
await page.getByRole('button', { name: 'Submit' }).click();
const modalTitle = await page.locator('#modal-title').textContent();
// ❌ Error: Element không tồn tại (modal chưa hiện)
```

### ✅ Giải pháp:

**Option 1: Dùng expect** (BEST - auto waiting)
```typescript
await expect(page.locator('#example-modal-sizes-title-lg')).toBeVisible();
```

**Option 2: waitForSelector**
```typescript
await page.waitForSelector('.modal-content', { state: 'visible' });
```

**Option 3: Wait for specific text**
```typescript
await page.waitForSelector('h1:has-text("Thanks for submitting")');
```

---

## ❌ Case 8: Nested frames/iframes

### Vấn đề:
Elements trong iframe cần **switch context**.

```html
<iframe name="myframe">
    <button>Click me</button>
</iframe>
```

### ❌ Code KHÔNG hoạt động:
```typescript
await page.getByRole('button', { name: 'Click' }).click();
// Không tìm thấy - element trong iframe
```

### ✅ Giải pháp:

**Option 1: frameLocator()**
```typescript
const frame = page.frameLocator("iframe[name='myframe']");
await frame.getByRole('button', { name: 'Click' }).click();
```

**Option 2: page.frame()**
```typescript
const frame = page.frame({ name: 'myframe' });
await frame?.getByRole('button').click();
```

---

## 🎯 BEST PRACTICE: Kết hợp nhiều strategies

**KHÔNG nên chỉ dùng getByRole!** Kết hợp nhiều locator strategies:

```typescript
// 1. Text inputs: getByRole + name
await page.getByRole('textbox', { name: 'First Name' }).fill('Alice');

// 2. Email: getByRole với placeholder
await page.getByRole('textbox', { name: 'name@example.com' }).fill('alice@test.com');

// 3. Radio: getByText - click label
await page.getByText('Female', { exact: true }).click();

// 4. Checkbox: locator + label
await page.locator('label[for="hobbies-checkbox-2"]').click();

// 5. Custom dropdown: locator + ID
await page.locator('#state').click();
await page.getByText('NCR', { exact: true }).click();

// 6. Autocomplete: locator + keyboard
await page.locator('#subjectsInput').fill('English');
await page.waitForTimeout(500);
await page.keyboard.press('Enter');

// 7. Textarea: getByRole
await page.getByRole('textbox', { name: 'Current Address' }).fill('123 Main St');

// 8. Button: getByRole
await page.getByRole('button', { name: 'Submit' }).click();

// 9. Modal: expect + locator
await expect(page.locator('#example-modal-sizes-title-lg')).toBeVisible();
```

---

## 📊 Decision Tree: Chọn locator strategy

```
START
  │
  ├─ Standard HTML element (input, button, select)?
  │   ├─ YES → Có accessible name rõ ràng?
  │   │   ├─ YES → ✅ getByRole('role', { name })
  │   │   └─ NO  → ✅ getByLabel() hoặc getByPlaceholder()
  │   │
  │   └─ NO → Custom component?
  │       ├─ YES → Có data-testid?
  │       │   ├─ YES → ✅ getByTestId()
  │       │   └─ NO  → ✅ locator() với ID/class
  │       │
  │       └─ Dynamic content?
  │           └─ ✅ waitForSelector() + locator()
```

---

## 📚 Tóm tắt

### Thứ tự ưu tiên:

1. 🥇 **getByRole** - Standard HTML với accessible name
2. 🥈 **getByLabel** - Elements có label
3. 🥈 **getByPlaceholder** - Inputs có placeholder
4. 🥈 **getByText** - Clickable text (buttons, links, labels)
5. 🥉 **getByTestId** - Custom components (cần thêm data-testid)
6. 🚫 **locator** - Last resort (ID/class selector)

### Rule of Thumb:

```
💡 "Dùng getByRole cho standard HTML elements,
    dùng locator/getByTestId cho custom components"
```

### Khi getByRole KHÔNG phù hợp:

- ❌ Radio/checkbox không có accessible name
- ❌ Custom dropdowns (React Select, Material-UI)
- ❌ Multiple elements cùng role
- ❌ Disabled/hidden elements
- ❌ Dynamic loading content
- ❌ File upload buttons
- ❌ Modal/overlay timing issues
- ❌ Elements trong iframe

---

## 🚀 Chạy demo

```bash
# Xem tất cả các cases
npx playwright test tests/demoqa/form/getbyrole-limitations.spec.ts

# Xem case cụ thể
npx playwright test -g "Case 1"
npx playwright test -g "Case 2"
npx playwright test -g "Best Practice"

# Chạy với UI mode
npx playwright test tests/demoqa/form/getbyrole-limitations.spec.ts --ui
```

---

## 📖 Tài liệu tham khảo

- [Playwright Locators](https://playwright.dev/docs/locators)
- [Accessibility Testing](https://playwright.dev/docs/accessibility-testing)
- [When NOT to use getByRole](https://playwright.dev/docs/locators#when-to-use-this)
- [ARIA Roles](https://www.w3.org/TR/wai-aria-1.1/#role_definitions)

---

**💡 Key Takeaway:** GetByRole là tuyệt vời nhưng không phải silver bullet. Biết khi nào KHÔNG dùng nó cũng quan trọng như biết khi nào dùng!
