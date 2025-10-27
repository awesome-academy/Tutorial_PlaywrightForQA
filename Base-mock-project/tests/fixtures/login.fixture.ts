import { test as base, Page } from "@playwright/test";

// Tạo fixture "loggedInPage"
const test = base.extend<{
  loggedInPage: any;
}>({
  loggedInPage: async ({ page }: { page: Page }, use: (arg0: Page) => any) => {
    // Setup: login trước khi test
    await page.goto("https://opensource-demo.orangehrmlive.com");
    await page.getByPlaceholder("Username").fill("Admin");
    await page.getByPlaceholder("Password").fill("admin123");
    await page.getByRole("button", { name: "Login" }).click();

    // Trả về page đã login
    await use(page);

    // Teardown (nếu cần): logout
    // await page.getByRole('link', { name: 'Logout' }).click();
  },
});

export { test };
