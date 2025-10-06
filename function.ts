
function sum(a: number, b: number): number {
  return a + b;
}

const multiply = (a: number, b: number): number => a * b;

function greet(name: string, role: string = "Guest"): void {
  console.log(`Hello ${name}, your role is ${role}`);
}

async function delayPrint(msg: string, time: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(msg);
      resolve();
    }, time);
  });
}

console.log("Sum:", sum(5, 7)); 
console.log("Multiply:", multiply(3, 4));

greet("Trang", "QA");
greet("Loki"); 
delayPrint("This message appears after 2 seconds", 2000);
