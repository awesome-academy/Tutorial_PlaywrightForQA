import { test, expect } from '@playwright/test';
class Counter {
  // Thuộc tính count, mặc định = 0
  count: number = 0;

  // Tăng count lên 1 và in ra màn hình
  increment() {
    this.count++; // "this" dùng để tham chiếu tới thuộc tính count của class
    console.log(`Count is now: ${this.count}`);
  }

  // Đưa count về 0 và in thông báo
  reset() {
    this.count = 0;
    console.log("Counter reset");
  }
}

test('thisParactice', async ({  }) => {
  const counter = new Counter();

// Gọi các method liên tiếp
counter.increment(); 
counter.increment(); 
counter.reset(); 


}
);