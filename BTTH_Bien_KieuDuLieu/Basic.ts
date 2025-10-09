let username: string = "NaHTH";
let age: number = 18;
let isActive: boolean = true;
let roles: string[] = ["Admin",'Role PM'];
let user =  {
    name: "Huynh Thi Hong Na", 
    email: "huynh.thi.hong.na@sun-asterisk.com", 
    isAdmin: true};
console.log(`User: ${user.name} (email: ${user.email}), Roles: ${roles.join(", ")}, Active: ${isActive}`);