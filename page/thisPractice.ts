class Counter {
    count: number = 0;

    increment() {
        this.count += 1;
        console.log(`Count is now: ${this.count}`);
    }

    reset() {
        this.count = 0;
        console.log("Counter reset");
    }
}

// Tạo instance
const counter = new Counter();

// Gọi các method liên tiếp
counter.increment(); // Count is now: 1
counter.increment(); // Count is now: 2
counter.reset();     // Counter reset
