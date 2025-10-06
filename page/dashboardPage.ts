//class DashboardPage có method:
 //   async verifyLoginSuccess()

 export class DashboardPage{
    async verifyLoginSuccess(): Promise<void>{
        await new Promise(resolve => setTimeout(resolve,1000));
        console.log("   *** Login succesfully! ***");
    }
 }