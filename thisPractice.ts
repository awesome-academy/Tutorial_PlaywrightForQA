class Counter {
// Thuộc tính count (number, mặc định = 0).
  count: number = 0;

  //Method increment() → tăng count lên 1 và in ""Count is now: <count>"".
  increment(): void {
    this.count++;
    console.log(`Count is now: ${this.count}`);
  }

 //Method reset() → đưa count về 0 và in ""Counter reset"".
  reset(): void {
    this.count = 0;
    console.log("Counter reset.");
    console.log(`Count is now: ${this.count}`);
  }
}

// --- Tạo instance và gọi các method ---
console.log("Creating a new counter...");
const myCounter = new Counter();

// Gọi liên tiếp các method
myCounter.increment();
myCounter.increment();
myCounter.reset();
myCounter.increment();