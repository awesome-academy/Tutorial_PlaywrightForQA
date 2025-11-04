import { test, expect } from "@playwright/test";

test("Test: User Registration Form", async ({ page }) => {
  await page.goto(
    "https://globalsqa.com/angularJs-protractor/registration-login-example/#/login"
  );

  await page.getByRole("link", { name: "Register" }).click();

  // Expectation
  await expect(page).toHaveURL(
    "https://globalsqa.com/angularJs-protractor/registration-login-example/#/register"
  );

  await page.fill("#firstName", "toan");
  await page.fill("#Text1", "pham");
  await page.fill("#username", "toanpham");
  await page.fill("#password", "abcd");

  // Expectation
  await expect(page.getByRole("button", { name: "Register" })).toBeEnabled();

  await page.getByRole("button", { name: "Register" }).click();

  await page.waitForURL(
    "https://globalsqa.com/angularJs-protractor/registration-login-example/#/login"
  );

  await page.fill("#username", "toanpham");
  await page.fill("#password", "abcd");

  // Expectation
  await expect(page.getByRole("button", { name: "Login" })).toBeEnabled();
  await page.getByRole("button", { name: "Login" }).click();

  await page.waitForURL(
    "https://globalsqa.com/angularJs-protractor/registration-login-example/#/"
  );

  // Expectation
  await expect(page.locator("h1.ng-scope")).toHaveText("Hi toan!");
});
