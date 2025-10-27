import { expect, test } from './fixtures/login.fixture';

test.describe('Bài tập cơ bản: KIểm tra hiển thị', () => {

  // Test 1: Kiểm tra tiêu đề trang "Products"
  test('Kiểm tra tiêu đề trang Products', async ({ loggedInPage }) => {
  // Fixture đã nạp auth.json VÀ đưa ta đến trang inventory
    await expect(loggedInPage.locator('.title')).toHaveText('Products');
  });

  // Test 2: Kiểm tra số lượng sản phẩm
  test('Kiểm tra hiển thị đủ 6 sản phẩm', async ({ loggedInPage }) => {
    await expect(loggedInPage.locator('.inventory_item')).toHaveCount(6);
  });

  // Test 3: Kiểm tra icon giỏ hàng
  test('Kiểm tra icon giỏ hàng hiển thị', async ({ loggedInPage }) => {
    await expect(loggedInPage.locator('.shopping_cart_link')).toBeVisible();
  });
})

test.describe('Bài tập mở rộng: Quản lý giỏ hàng', () => {

  const productName = 'Sauce Labs Backpack';

  test('Thêm sản phẩm vào giỏ và kiểm tra icon', async ({ loggedInPage }) => {
    console.log(`Đang chạy test: Thêm ${productName} vào giỏ...`);

    // 1. Tìm sản phẩm và click "Add to cart"
    await loggedInPage.locator(`[data-test="add-to-cart-${productName.toLowerCase().replace(/ /g, '-')}"]`).click();

    // 2. Kiểm tra icon giỏ hàng hiển thị số "1"
    await expect(loggedInPage.locator('.shopping_cart_badge')).toHaveText('1');

    // 3. Kiểm tra nút "Add to cart" đổi thành "Remove"
    await expect(
      loggedInPage.locator(`[data-test="remove-${productName.toLowerCase().replace(/ /g, '-')}"]`)
    ).toBeVisible();
  });

  test('Thêm sản phẩm và kiểm tra trong trang giỏ hàng', async ({ loggedInPage }) => {
    console.log(`Đang chạy test: Kiểm tra ${productName} trong trang Cart...`);

    // 1. Thêm sản phẩm
    await loggedInPage.locator(`[data-test="add-to-cart-${productName.toLowerCase().replace(/ /g, '-')}"]`).click();

    // 2. Đi đến trang giỏ hàng
    await loggedInPage.locator('.shopping_cart_link').click();
    await expect(loggedInPage).toHaveURL(/.*cart.html/);

    // 3. Kiểm tra sản phẩm có trong giỏ
    await expect(loggedInPage.locator('.inventory_item_name')).toHaveText(productName);
    await expect(loggedInPage.locator('.cart_quantity')).toHaveText('1');
  });
});
