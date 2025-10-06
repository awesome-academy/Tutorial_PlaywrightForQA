class Counter{
    private count: number = 0;

    public increment(): void{
        this.count ++;
        console.log(`Count is : ${this.count}`);
    }

    public reset(): void{
        this.count=0;
        console.log(`Count reset : ${this.count}`);
    }

    public getCurrentCount():number{
        return this.count;
    }
}

const myCounter = new Counter();
console.log(`Giá trị khởi tạo: ${myCounter.getCurrentCount()}`);
