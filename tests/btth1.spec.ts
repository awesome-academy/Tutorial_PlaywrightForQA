import { test, expect } from "@playwright/test";

test("Test: User Registration Form", async ({ page }) => {
  await page.goto(
    "https://material.playwrightvn.com/01-xpath-register-page.html"
  );

  await page.locator("#username").fill("toanne");

  await page.locator("#email").fill("phamtoan222555@gmail.com");

  await page.locator("#male").check();

  await page.locator("#reading").check();
  await page.locator("#traveling").setChecked(true); // same with check
  await page.locator("#traveling").uncheck();

  await page.locator("#interests").selectOption("science");

  await page.locator("#country").selectOption("canada");

  await page.fill("#dob", "2022-11-01");

  // Expectation

  await expect(page.locator("#male")).toBeChecked();
  await expect(page.locator("#reading")).toBeChecked();
  await expect(page.locator("#traveling")).not.toBeChecked();

  await page.getByRole("button", { name: "Register" }).click();

  await expect(page.locator("#userTable tbody tr")).toHaveCount(1);
});
