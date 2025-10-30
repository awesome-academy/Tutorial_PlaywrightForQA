import { chromium } from "@playwright/test";
import fs from "fs";
import path from "path";

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto("https://www.saucedemo.com/");
  await page.getByPlaceholder("Username").fill("standard_user");
  await page.getByPlaceholder("Password").fill("secret_sauce");
  await page.getByRole("button", { name: "Login" }).click();

  console.log("✅ Login successful");

  const outDir = path.resolve("./tests/auth");
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const storageStatePath = path.join(outDir, "auth.json");
  await page.context().storageState({ path: storageStatePath });

  console.log("💾 Save state login :", storageStatePath);
  await browser.close();
})();
