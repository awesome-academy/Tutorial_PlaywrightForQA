/**
 * Tính tổng hai số.
 */
function sum ( a: number, b: number): number {
    return a+b;

}

/**
 *Viết arrow function multiply = (a: number, b: number) → trả về tích.
 */
const multiply = (a: number, b: number): number => {
    return a*b;
}

/**
 *Viết function greet(name: string, role: string = "Guest") → in "Hello <name>, your role is <role>"..
 */

function greet( name: string, role: string="Guest"): void {
    console.log(`hello ${name}, your role is ${role}`);                    
}

/**
 *Viết async function delayPrint(msg: string, time: number) → in message sau time ms
 */
async function delayPrint(msg:string, time: number): Promise<void> {
    // Tạo 1 Promise để chờ 
    await new Promise( resolve => setTimeout(resolve,time));

    // Sau khi chờ xong thì in 
    console.log(`Print after ${time}ms: ${msg}`);
}
    
console.log(sum(10,5));
console.log(multiply(10,5));
greet("Linh","QA");
delayPrint("done",2000);