import { test, expect } from '../src/fixtures/baseFixtures';
test.describe('DemoQA Basic Smoke Tests', () => {

    type users = {
    userName: string,
    age: number,
    isActive: boolean,
    role: string[] 
};


function sum(a: number, b: number) : number {
  return (a+b);
}

const multiply = (a: number, b: number): number => {
  return a * b;
};

function greet(name: string, role: string = "Guest"): void {
  console.log(`Hello ${name}, your role is ${role}`);
};

//async function delayPrint(msg: string, time: number) {
 // const result = await time;
  //console.log(msg);
//}


const delayPrint = async (msg: string, time: number): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, time));
  console.log(msg);
};

test('Print sum', async ({ page }) => {
  const a= 5;
  const b= 7;
  console.log(`Tong la: ${sum(a, b)}`);
})

test('Print Tich', async ({ page }) => {
  const a= 5;
  const b= 7;
  console.log(`Tich la: ${multiply(a, b)}`);
})

test('Print Hello user', async ({ page }) => {
  const name= 'Thanh Tra';
  const role= 'Admin';
  greet(name,role);
})

test('Print msg below time', async ({ page }) => {
  const msg= 'Sau 60 second: Thông bao hoan thanh bai tap';
  const time= 60;
   await delayPrint(msg, time);
})


});