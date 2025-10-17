function sum(a: number, b: number): number {
  return a + b;
}
const multiply = (a: number, b: number): number => a * b;
function greet(name: string, role: string = "Guest"): void {
  console.log(`Hello ${name}, your role is ${role}`);
}
console.log("Tong:", sum(1, 2));
console.log("Tich:", multiply(3, 4))
greet("Hoang");
