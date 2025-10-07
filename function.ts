function sum(a: number, b: number){
return a + b;
}
console.log(sum(2, 3));

const multiply = (a: number, b: number): number => {
  return a * b;
}
console.log(multiply(2, 3));

function greet(name: string, role: string = "Guest"){
return `Hello ${name}, your role ${role}`;
}
console.log(greet("Nhi"));

function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
async function delayPrint(msg: string, time: number): Promise<void> {
  await delay(time);
  console.log(msg);
}
delayPrint("Xin chào sau 2 giây!", 2000);