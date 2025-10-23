import { test, expect } from "@playwright/test";
import { SaucedemoPage } from "../pages/SaucedemoPage";
import { SaucedemoData } from "../data/SaucedemoData";

test.describe("Saucedemo BT3", () => {
  let saucedemoPage: SaucedemoPage;

  test.beforeAll(async () => {
    console.log("Bắt đầu chạy nhóm test");
  });

  test.afterAll(async () => {
    console.log("Kết thúc nhóm test");
  });

  test.beforeEach(async ({ page }) => {
    saucedemoPage = new SaucedemoPage(page);
    await saucedemoPage.goto();

    // Sử dụng test data từ beforeAll
    await saucedemoPage.loginAs("standardUser");
  });

  test.afterEach(async ({ page }) => {
    // Take screenshot if failed
    if (test.info().status === "failed") {
      const now = new Date().toISOString().replace(/[:.]/g, "-");
      const screenshotPath = `screenshots/${test.info().title}_${now}.png`;
      await page.screenshot({ path: screenshotPath });
    }

    // Logout if possible
    if (await saucedemoPage.menuButton.isVisible())
      await saucedemoPage.logout();
  });

  test("Check display Products page after login", async () => {
    await expect(saucedemoPage.page).toHaveURL(saucedemoPage.inventoryURL);
    await expect(saucedemoPage.productsTitle).toHaveText("Products", {
      timeout: 500,
    });
  });

  test("Check display first product name", async () => {
    await expect(saucedemoPage.productItemName.nth(0)).toHaveText(
      SaucedemoData.products.product1.name,
      { timeout: 500 }
    );
  });

  test("Check screenshot on failure", async () => {
    await expect(saucedemoPage.productItemName.nth(1)).toHaveText(
      "Non-Existent Product",
      { timeout: 500 }
    );
  });
});
