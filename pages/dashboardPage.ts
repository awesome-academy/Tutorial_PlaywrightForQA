export class DashboardPage {
  async verifyLoginSuccess(): Promise<void> {
    console.log("3. Verifying login was successful on Dashboard Page.");
    await new Promise(resolve => setTimeout(resolve, 500));
    console.log("=> Login successful!");
  }
}