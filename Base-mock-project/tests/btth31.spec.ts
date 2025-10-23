import { test, expect, Page, Locator } from "@playwright/test";

/*

beforeEach: Chạy trước mỗi test case, thường dùng để login, mở trang, setup dữ liệu.
afterEach: Chạy sau mỗi test case, thường dùng để cleanup, chụp ảnh, ghi log nếu lỗi.
describe: Nhóm nhiều test lại với nhau thành một khối logic có liên quan.

Page Object Model (POM) là cách tổ chức mã test chia theo từng trang web, giúp:
Dễ bảo trì – Khi giao diện thay đổi, bạn chỉ sửa ở 1 chỗ.
Dễ tái sử dụng – Code login, điền form... dùng lại được.
Test gọn, dễ đọc – Test chỉ tập trung vào logic, không lặp lại thao tác kỹ thuật.

*/

/*
Bài tập 1 – beforeEach() + afterEach() ở file-level
Mục tiêu: Hiểu cách setup/dọn dẹp môi trường trước và sau mỗi test trong một file.
Kịch bản:
Trước mỗi test:
Mở trang https://www.saucedemo.com/
Login bằng standard_user / secret_sauce
Sau mỗi test:
Chụp screenshot nếu test fail
Logout
Yêu cầu:
Viết test.beforeEach() để thực hiện bước login cho tất cả test.
Viết test.afterEach() để thực hiện logout và chụp screenshot khi fail.
Viết ít nhất 2 test:
Test 1: Kiểm tra URL sau khi login chứa /inventory
Test 2: Kiểm tra sản phẩm đầu tiên hiển thị đúng tên.
*/

test.describe(" Bài tập 1", () => {
  test.beforeEach(async ({ page }) => {
    // Mở trang SauceDemo
    await page.goto("https://www.saucedemo.com/");

    // Login bằng standard_user / secret_sauce
    await page.fill('[data-test="username"]', "standard_user");
    await page.fill('[data-test="password"]', "secret_sauce");
    await page.click('[data-test="login-button"]');
  });

  test.afterEach(async ({ page }, testInfo) => {
    // Chụp screenshot nếu test fail
    if (testInfo.status === "failed") {
      const screenshot = await page.screenshot();
      await testInfo.attach("screenshot", {
        body: screenshot,
        contentType: "image/png",
      });
    }

    // Logout
    try {
      await page.click('[id="react-burger-menu-btn"]');
      await page.click('[id="logout_sidebar_link"]');
    } catch (error) {
      console.log("Logout failed or already logged out");
    }
  });

  test("Test 1: Kiểm tra URL sau khi login chứa /inventory", async ({
    page,
  }) => {
    // Kiểm tra URL sau khi login
    await expect(page).toHaveURL(/.*inventory.*/);
  });

  test("Test 2: Kiểm tra sản phẩm đầu tiên hiển thị đúng tên", async ({
    page,
  }) => {
    // Kiểm tra sản phẩm đầu tiên
    const firstProduct = page
      .locator('[data-test="inventory-item-name"]')
      .first();
    await expect(firstProduct).toBeVisible();

    // Kiểm tra tên sản phẩm đầu tiên là "Sauce Labs Backpack"
    await expect(firstProduct).toHaveText("Sauce Labs Backpack");
  });
});

/*
Bài tập 2 – describe-level hooks
Mục tiêu: Biết cách gom nhóm test có chung setup riêng biệt (Phạm vi hooks).
Kịch bản:
Tạo 2 nhóm test:
Nhóm A – Kiểm tra sản phẩm:
beforeEach: Login → chuyển đến /inventory
Test: Kiểm tra số lượng sản phẩm phẩm trên trang.
Nhóm B – Kiểm tra giỏ hàng:
beforeEach: Login → thêm 1 sản phẩm vào giỏ hàng.
Test: Kiểm tra giỏ hàng hiển thị sản phẩm vừa thêm.
Yêu cầu:
Dùng test.describe() để nhóm 2 bộ test riêng.
Mỗi nhóm dùng beforeEach riêng, không ảnh hưởng đến nhóm kia.
Có ít nhất 2 test trong mỗi nhóm.
*/

test.describe(" Bài tập 2", () => {
  // Nhóm A – Kiểm tra sản phẩm
  test.describe("Nhóm A - Kiểm tra sản phẩm", () => {
    test.beforeEach(async ({ page }) => {
      // Login → chuyển đến /inventory
      await page.goto("https://www.saucedemo.com/");
      await page.fill('[data-test="username"]', "standard_user");
      await page.fill('[data-test="password"]', "secret_sauce");
      await page.click('[data-test="login-button"]');

      // Đảm bảo đã chuyển đến trang inventory
      await expect(page).toHaveURL(/.*inventory.*/);
    });

    test("Test 1: Kiểm tra số lượng sản phẩm trên trang", async ({ page }) => {
      // Kiểm tra số lượng sản phẩm (SauceDemo có 6 sản phẩm)
      const products = page.locator('[data-test="inventory-item"]');
      await expect(products).toHaveCount(6);
    });

    test("Test 2: Kiểm tra tất cả sản phẩm đều có tên", async ({ page }) => {
      // Kiểm tra tất cả sản phẩm đều có tên hiển thị
      const productNames = page.locator('[data-test="inventory-item-name"]');
      await expect(productNames).toHaveCount(6);

      // Kiểm tra sản phẩm đầu tiên có tên
      await expect(productNames.first()).toBeVisible();
      await expect(productNames.first()).not.toBeEmpty();
    });
  });

  // Nhóm B – Kiểm tra giỏ hàng
  test.describe("Nhóm B - Kiểm tra giỏ hàng", () => {
    test.beforeEach(async ({ page }) => {
      // Login → thêm 1 sản phẩm vào giỏ hàng
      await page.goto("https://www.saucedemo.com/");
      await page.fill('[data-test="username"]', "standard_user");
      await page.fill('[data-test="password"]', "secret_sauce");
      await page.click('[data-test="login-button"]');

      // Thêm sản phẩm đầu tiên vào giỏ hàng
      await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    });

    test("Test 1: Kiểm tra giỏ hàng hiển thị sản phẩm vừa thêm", async ({
      page,
    }) => {
      // Kiểm tra badge giỏ hàng hiển thị số 1
      const cartBadge = page.locator('[data-test="shopping-cart-badge"]');
      await expect(cartBadge).toHaveText("1");

      // Vào giỏ hàng và kiểm tra sản phẩm
      await page.click('[data-test="shopping-cart-link"]');
      const cartItem = page.locator('[data-test="inventory-item-name"]');
      await expect(cartItem).toHaveText("Sauce Labs Backpack");
    });

    test("Test 2: Kiểm tra nút Remove hiển thị sau khi thêm sản phẩm", async ({
      page,
    }) => {
      // Kiểm tra nút đã chuyển từ "Add to cart" thành "Remove"
      const removeButton = page.locator(
        '[data-test="remove-sauce-labs-backpack"]'
      );
      await expect(removeButton).toBeVisible();
      await expect(removeButton).toHaveText("Remove");
    });
  });
});

/*
Bài tập 3 – Kết hợp beforeAll, beforeEach, afterEach, afterAll
Mục tiêu: Thực hành thứ tự chạy hook và quản lý tài nguyên.
Kịch bản:Co
beforeAll: In ra log "Bắt đầu chạy nhóm test".
beforeEach: Login.
Test: Kiểm tra chức năng nào đó (tùy chọn).
afterEach: Chụp screenshot (nếu fail).
afterAll: In ra log "Kết thúc nhóm test".
Yêu cầu:
Quan sát log để thấy thứ tự chạy hook.
Có cố tình fail 1 test để xem afterEach hoạt động.
*/

test.describe(" Bài tập 3", () => {
  test.beforeAll(async () => {
    // In ra log "Bắt đầu chạy nhóm test"
    console.log("🚀 Bắt đầu chạy nhóm test - beforeAll được thực thi");
  });

  test.beforeEach(async ({ page }) => {
    // Login
    await page.goto("https://www.saucedemo.com/");
    await page.fill('[data-test="username"]', "standard_user");
    await page.fill('[data-test="password"]', "secret_sauce");
    await page.click('[data-test="login-button"]');
  });

  test.afterEach(async ({ page }, testInfo) => {
    console.log(
      `🔍 afterEach: Test "${testInfo.title}" đã hoàn thành với status: ${testInfo.status}`
    );

    // Chụp screenshot (nếu fail)
    if (testInfo.status === "failed") {
      console.log("📸 afterEach: Test failed - đang chụp screenshot...");
      const screenshot = await page.screenshot();
      await testInfo.attach("screenshot", {
        body: screenshot,
        contentType: "image/png",
      });
      console.log("✅ afterEach: Screenshot đã được chụp và đính kèm");
    } else {
      console.log("✅ afterEach: Test passed - không cần chụp screenshot");
    }
  });

  test.afterAll(async () => {
    // In ra log "Kết thúc nhóm test"
    console.log("🏁 Kết thúc nhóm test - afterAll được thực thi");
  });

  test("Test 1: Kiểm tra URL sau khi login (Test sẽ pass)", async ({
    page,
  }) => {
    console.log("🧪 Đang chạy Test 1...");

    // Kiểm tra URL sau khi login
    await expect(page).toHaveURL(/.*inventory.*/);

    console.log("✅ Test 1: URL được kiểm tra thành công");
  });

  test("Test 2: Kiểm tra số lượng sản phẩm (Test sẽ pass)", async ({
    page,
  }) => {
    console.log("🧪 Đang chạy Test 2...");

    // Kiểm tra số lượng sản phẩm
    const products = page.locator('[data-test="inventory-item"]');
    await expect(products).toHaveCount(6);

    console.log("✅ Test 2: Số lượng sản phẩm được kiểm tra thành công");
  });

  test("Test 3: Test cố tình fail để xem afterEach hoạt động", async ({
    page,
  }) => {
    console.log("🧪 Đang chạy Test 3 (cố tình fail)...");

    // Cố tình làm test fail để quan sát afterEach
    await expect(
      page.locator('[data-test="non-existent-element"]')
    ).toBeVisible();

    console.log("❌ Test 3: Dòng này sẽ không được in vì test đã fail");
  });
});
