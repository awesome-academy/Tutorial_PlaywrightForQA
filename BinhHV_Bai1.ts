// basics.ts

let username: string = "huynh.van.binh";
let age: number = 25;
let isActive: boolean = true;
let roles: string[] = ["TesterPlaywright"];

let user = {
  name: username,
  email: "huynh.van.binh@sun-asterisk.com",
  isAdmin: false,
};

console.log(
  `User: ${user.name} (email: ${user.email}), Roles: ${roles.join(", ")}, Active: ${isActive}`
);

function checkAge(age: number): string {
  return age >= 18 ? "Adult" : "Under 18";
}

console.log(`Age status: ${checkAge(age)}`);


