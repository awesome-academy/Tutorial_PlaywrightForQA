class Counter {
  count: number = 0;

  increment() {
    this.count++;   // this chính là đối tượng Counter đang gọi
    console.log(`Count is now: ${this.count}`);
  }
  reset() {
    this.count = 0
    console.log('Counter reset')
  }
}
const counter = new Counter();
    counter.increment();
    counter.increment();
    counter.reset();
