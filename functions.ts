function sum(a: number, b: number): number {
  return a + b;
}

const multiply = (a: number, b: number): number => a * b;

function greet(name: string, role: string = "Guest"): void {
  console.log(`Hello ${name}, your role is ${role}`);
}

async function delayPrint(msg: string, time: number): Promise<void> {
  await new Promise<void>((resolve) => {
    setTimeout(() => {
      console.log(msg);
      resolve();
    }, time);
  });
}
