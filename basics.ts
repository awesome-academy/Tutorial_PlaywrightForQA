let username: string = "Tran Nhi";
let age: number = 28;
let isActive: Boolean = true;
const roles: string[] = ["QA"];
const user: { name: string; email: string; isAdmin: boolean } = {
  name: "Tran Nhi",
  email: "tran.thi.thao.nhi@sun-asterisk.com",
  isAdmin: true,
};
let UserInfo: string = `User: ${user.name}, (email: ${user.email}), Roles: ${roles}, Active: ${isActive}`;
console.log(UserInfo);

console.log("------------------");

function checkAge(age: number) {
  if (age >= 18) {
    console.log("Adult");
  } else {
    console.log("Under 18");
  }
}
checkAge(age);
