import { test, expect } from "../src/fixtures/baseFixtures";
import { TestData } from "../src/data/testData";

test.describe("DemoQA Basic Smoke Tests", () => {
  class Counter {
    count: number = 0;
    increment() {
      this.count++;
      console.log(`Count is now:${this.count}`);
    }
    reset() {
      this.count = 0;
      console.log(`Count is reset:${this.count}`);
    }
  }

  //    Method increment() → tăng count lên 1 và in "Count is now: <count>".
  //     Method reset() → đưa count về 0 và in "Counter reset".

  // Tạo 1 instance counter và gọi liên tiếp:
  //     counter.increment();
  //     counter.increment();
  //     counter.reset();

  // Quan sát giá trị thay đổi qua this.count.

  test("Print Counter", async () => {
    const counter: Counter = new Counter();
    counter.increment();
    counter.increment();
    counter.increment();
    counter.reset();
    counter.increment();
  });
});
