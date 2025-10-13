class Counter {
    count: number = 0;
    
    increment() {
        this.count ++;
        console.log(`Counter is now: ${this.count}`);
    }
    
    reset() {
        this.count = 0;
        console.log(`Counter reset to ${this.count}`);
    }
}
const counter = new Counter();
counter.increment();
counter.increment();
counter.reset();
