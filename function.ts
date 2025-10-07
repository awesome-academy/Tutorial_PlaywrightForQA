// Function thường tính tổng
function sum(a: number, b: number): number {
  return a + b;
}

// Arrow function tính tích
const multiply = (a: number, b: number): number => a * b;

// Function với tham số mặc định
function greet(name: string, role: string = "Guest"): void {
  console.log(`Hello ${name}, your role is ${role}`);
}

// Async function in message sau một khoảng thời gian
async function delayPrint(msg: string, time: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log(msg);
      resolve();
    }, time);
  });
}

// --- Gọi các hàm để kiểm tra ---
console.log("Sum of 5 and 3:", sum(5, 3));
console.log("Product of 5 and 3:", multiply(5, 3));

greet("Admin"); // Dùng giá trị mặc định "Guest" cho role
greet("Hoa Ly", "Automation tester");

// Chạy hàm async
console.log("\nStarting async function...");
delayPrint("Hello after 2 seconds!", 2000);