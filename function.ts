//Function sum
function sum (a:number, b:number):number {
    return a + b;
}
console.log(sum(5, 10));

// Function multiply
function multiply (a: number, b: number): number {
    return a * b;
}
console.log(multiply(5, 10));

// Function greet
function greet(name: string, role: string="Guest"): string {
    return `Hello ${name}, your role is ${role}.`;
}
console.log(greet("Viet", "Admin"));

//Function delay
function delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function delayPrint(msg: string, time: number): Promise<void> {
    await delay(time);
    console.log(msg);
}
delayPrint("Hello after 2 seconds", 2000);
