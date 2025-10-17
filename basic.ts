const username: string = 'vietnh';
let age: number = 28;
let isActive: boolean = true;
const roles: string[] = ['developer', 'tester'];

const user: {
    name: string;
    email: string;
    isAdmin: boolean;
} = {
    name: "Nguyen Hoang Viet",
    email: "nguyen.hoang.viet@sun-asterisk.com",
    isAdmin: true
};

// Print user information
console.log(`User: ${user.name} (email: ${user.email}), Roles: ${roles[1]}, Active: ${isActive}`);

// Function check age
function check_age(age: number): string {
    if (age < 18) {
        return "Under 18";
    } else {
        return "Adult";
    }
}
// Print age check
console.log(`Test age ${age}: ${check_age(age)}`);
