# 🎯 Playwright Locator Strategy - Cheat Sheet

## 📋 Quick Reference

### Standard HTML Elements

| Element | ✅ BEST | ⚠️ OK | ❌ AVOID |
|---------|---------|-------|----------|
| **Button** | `getByRole('button', { name: 'Submit' })` | `getByText('Submit')` | `locator('#submit')` |
| **Text Input** | `getByRole('textbox', { name: 'Email' })` | `getByPlaceholder('email')` | `locator('#email')` |
| **Checkbox** | `getByLabel('Accept terms')` | `locator('label[for="terms"]')` | `locator('#terms')` |
| **Radio** | `getByText('Male')` | `getByLabel('Male')` | `getByRole('radio')` ❌ |
| **Link** | `getByRole('link', { name: 'Home' })` | `getByText('Home')` | `locator('a[href="/"]')` |
| **Select** | `getByRole('combobox', { name: 'Country' })` | `getByLabel('Country')` | `locator('#country')` |

### Custom Components

| Component | ✅ BEST | ⚠️ OK | 
|-----------|---------|-------|
| **React Select** | `locator('#state')` | `getByTestId('state-dropdown')` |
| **Material-UI** | `getByTestId('mui-select')` | `locator('.MuiSelect-root')` |
| **Custom Dropdown** | `locator('#dropdown')` + `getByText()` | `getByTestId()` |
| **Autocomplete** | `locator('#input')` + `waitForSelector()` | `getByRole()` với wait |
| **File Upload** | `locator('input[type="file"]')` | `getByTestId('file-input')` |

---

## 🎯 Decision Flow

```
Cần select một element?
  │
  ├─ Standard HTML (button, input, select)?
  │   │
  │   ├─ Có visible label/text?
  │   │   ├─ YES → getByRole('role', { name: 'text' })
  │   │   └─ NO  → getByPlaceholder() hoặc getByLabel()
  │   │
  │   └─ Radio/Checkbox?
  │       └─ getByText() hoặc getByLabel()
  │
  ├─ Custom component?
  │   │
  │   ├─ Có data-testid?
  │   │   └─ YES → getByTestId('id')
  │   │
  │   └─ NO → locator('#id') hoặc locator('.class')
  │
  └─ Dynamic content?
      └─ waitForSelector() + locator()
```

---

## 💡 Quick Examples

### ✅ Form Inputs
```typescript
// Text input với label
await page.getByRole('textbox', { name: 'First Name' }).fill('John');

// Email với placeholder
await page.getByRole('textbox', { name: 'name@example.com' }).fill('john@test.com');

// Textarea
await page.getByRole('textbox', { name: 'Address' }).fill('123 Main St');
```

### ✅ Radio & Checkbox
```typescript
// Radio - click label
await page.getByText('Male', { exact: true }).click();

// Checkbox - dùng label
await page.locator('label[for="terms"]').click();
// Hoặc
await page.getByLabel('I accept terms').check();
```

### ✅ Buttons
```typescript
// Primary button
await page.getByRole('button', { name: 'Submit' }).click();

// Button với icon (dùng text)
await page.getByRole('button', { name: /submit/i }).click();
```

### ✅ Custom Dropdowns
```typescript
// Open dropdown
await page.locator('#state').click();

// Select option bằng text
await page.getByText('California', { exact: true }).click();
```

### ✅ Autocomplete
```typescript
const input = page.locator('#search');
await input.fill('Java');
await page.waitForSelector('.autocomplete-menu');
await page.getByText('JavaScript', { exact: true }).click();
```

### ✅ Modals
```typescript
// Submit form
await page.getByRole('button', { name: 'Submit' }).click();

// Wait for modal
await expect(page.locator('.modal')).toBeVisible();

// Close modal
await page.getByRole('button', { name: 'Close' }).click();
```

### ✅ File Upload
```typescript
// Không cần click, dùng setInputFiles
await page.locator('input[type="file"]').setInputFiles('file.pdf');
```

---

## ⚠️ Common Mistakes

### ❌ WRONG
```typescript
// Quá generic
await page.getByRole('textbox').fill('John');  // Textbox nào?

// Dùng CSS khi có cách tốt hơn
await page.locator('#firstName').fill('John');  // Không accessibility

// Không wait cho dynamic content
await page.getByText('Option').click();  // Có thể fail!

// Click radio input trực tiếp
await page.getByRole('radio', { name: 'Male' }).check();  // Fail!
```

### ✅ CORRECT
```typescript
// Specific role + name
await page.getByRole('textbox', { name: 'First Name' }).fill('John');

// Accessibility-first
await page.getByRole('textbox', { name: 'First Name' }).fill('John');

// Wait cho content
await page.waitForSelector('.dropdown-menu');
await page.getByText('Option').click();

// Click label thay vì input
await page.getByText('Male', { exact: true }).click();
```

---

## 🎨 Cheatsheet by Scenario

### Scenario 1: Fill Login Form
```typescript
await page.getByRole('textbox', { name: 'Email' }).fill('user@test.com');
await page.getByRole('textbox', { name: 'Password' }).fill('pass123');
await page.getByRole('button', { name: 'Login' }).click();
```

### Scenario 2: Select from Custom Dropdown
```typescript
await page.locator('#country').click();
await page.getByText('United States', { exact: true }).click();
```

### Scenario 3: Fill Multi-step Form
```typescript
// Step 1
await page.getByRole('textbox', { name: 'Name' }).fill('John');
await page.getByRole('button', { name: 'Next' }).click();

// Step 2
await page.getByText('Male', { exact: true }).click();
await page.getByRole('button', { name: 'Next' }).click();

// Step 3
await page.locator('label[for="terms"]').click();
await page.getByRole('button', { name: 'Submit' }).click();
```

### Scenario 4: Search with Autocomplete
```typescript
const searchInput = page.locator('#search');
await searchInput.fill('play');
await page.waitForSelector('.suggestions');
await page.getByText('Playwright', { exact: true }).click();
```

### Scenario 5: Upload and Submit
```typescript
await page.locator('input[type="file"]').setInputFiles('resume.pdf');
await page.getByRole('textbox', { name: 'Comment' }).fill('My resume');
await page.getByRole('button', { name: 'Upload' }).click();
await expect(page.getByText('Upload successful')).toBeVisible();
```

---

## 📊 Locator Priority Order

```
1. getByRole()         → Accessibility-first ⭐⭐⭐⭐⭐
2. getByLabel()        → Good for forms ⭐⭐⭐⭐
3. getByPlaceholder()  → OK for inputs ⭐⭐⭐⭐
4. getByText()         → Good for links/buttons ⭐⭐⭐⭐
5. getByTestId()       → Good for custom components ⭐⭐⭐
6. locator()           → Last resort ⭐⭐
```

---

## 🚀 Pro Tips

1. **Combine strategies:**
   ```typescript
   // Filter by section, then find by role
   const form = page.locator('form').filter({ hasText: 'Personal Info' });
   await form.getByRole('textbox', { name: 'Name' }).fill('John');
   ```

2. **Use regex for flexible matching:**
   ```typescript
   await page.getByRole('button', { name: /submit|send/i }).click();
   ```

3. **Chain locators:**
   ```typescript
   await page.locator('.card')
       .filter({ hasText: 'Premium' })
       .getByRole('button', { name: 'Buy' })
       .click();
   ```

4. **Always wait for dynamic content:**
   ```typescript
   await page.waitForSelector('.loaded');
   await page.getByText('Content').click();
   ```

---

## 📖 Quick Links

- [Full Guide](./ACCESSIBILITY_GUIDE.md)
- [Limitations](./GETBYROLE_LIMITATIONS.md)
- [Demo Tests](./accessibility-demo.spec.ts)
- [Playwright Docs](https://playwright.dev/docs/locators)

---

**💡 Remember:** "Test how users use your app, not how it's implemented!"
