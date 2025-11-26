import { test, expect } from '@playwright/test';
import { CR_acount } from '../page/CR_acount';

test("Create  user", async ({ page }) => {
  const registration = new CR_acount(page);

  await registration.goto();
  await registration.fillForm();
  
  
  // Kiểm tra xem có thêm vào bảng hay chưa
  const tableRow = page.locator("#userTable").last();
  await expect(tableRow).toContainText("testuser123");
  await expect(tableRow).toContainText("test@example.com");
  await expect(page.hover(""))
});

// check hover tooltip
test("Check hover tooltip", async ({ page }) => {
  const registration = new CR_acount(page);
  await registration.goto();
  const trigger = page.locator('.tooltip');  // khi di chuột đến
  const tooltipText = page.locator('.tooltiptext'); // hiển thi text khi di chuột
  await trigger.hover();
  await expect(tooltipText).toBeVisible();
  await expect(tooltipText).toHaveText(
    "Subscribe to our newsletter for updates"
  );
});


// check chọn giới tính
test("Chon gioi tinh Male", async ({ page }) => {
  const registration = new CR_acount(page);
  await registration.goto();
  const male = page.locator("#male");
  const female = page.locator("#female");
  await male.waitFor();
  await male.check();
  await expect(male).toBeChecked();
  await expect(female).not.toBeChecked();
});
test("Chon gioi tinh Female", async ({ page }) => {
  const registration = new CR_acount(page);
  await registration.goto();
  const male = page.locator("#male");
  const female = page.locator("#female");
  await female.check();
  await expect(female).toBeChecked();
  await expect(male).not.toBeChecked();
});
test("Chon Hobbies", async ({ page }) => {
  const registration = new CR_acount(page);
  await registration.goto();
  const reading = page.locator("#reading");
  const traveling = page.locator("#traveling");
  const cooking = page.locator("#cooking");
  await reading.check();
  await expect(reading).toBeChecked();
  await reading.uncheck();
  await expect(reading).not.toBeChecked();
  await traveling.check();
  await expect(traveling).toBeChecked();
  await traveling.uncheck();
  await expect(traveling).not.toBeChecked();
  await cooking.check();
  await expect(cooking).toBeChecked();
  await cooking.uncheck();
  await expect(cooking).not.toBeChecked();
});