import { test, expect } from '@playwright/test';
test('check function', async ({  }) => {
  function sum(a: number, b: number): number {
    return a + b;
}
console.log(sum(8, 12));

//function check tích
const multiple = (a: number, b: number): number => {
    return a * b;
}
console.log(multiple(9, 6));

// function trả về hello
function greet(name: string, role: string = "Guest"): void {
    console.log(`hello.${name} , your role is ${role}`);
    }

  greet("lụa");
 greet("vũ thị" , "admin");
});

// function in ra s
test('check function in ra s', async ({  }) => {
async function delayPrint(msg: string, time: number): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, time));
  console.log(msg);
}
await delayPrint("Hello sau 5 giây!", 5000);
} );

