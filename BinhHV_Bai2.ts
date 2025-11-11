// functions.ts

// 1️⃣ Function SUM
function sum(a: number, b: number): number {
  return a + b;
}

// 2️⃣ Arrow function 
const multiply = (a: number, b: number): number => a * b;

// 3️⃣ Function Hello user
function greet(name: string, role: string = "Guest"): void {
  console.log(`Hello ${name}, your role is ${role}`);
}

// 4️⃣ 
async function delayPrint(msg: string, time: number): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, time));
  console.log(msg);
}

// 🔹 Demo thử
console.log("Sum:", sum(5, 3)); // 8
console.log("Multiply:", multiply(4, 6)); // 24
greet("BinhHV", "Admin"); 
greet("HuynhVan");
// In message sau 3 giây
delayPrint("This message appears after 3 seconds", 3000);
