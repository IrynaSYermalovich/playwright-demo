import { Locator, Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly loginField: Locator;
  readonly passwordField: Locator;
  readonly loginBtn: Locator;
  readonly header: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginField = page.getByTestId('loginform-username');
    this.passwordField = page.getByTestId('loginform-password');
    this.loginBtn = page.locator('[name="login-button"]');
    this.header = page.locator('.navbar-brand');
  }

  async open() {
    await this.page.goto('/login');
  }

  async login() {
    await this.loginField.pressSequentially(process.env.USER_NAME);
    await this.passwordField.pressSequentially(process.env.PASSWORD);
    await this.loginBtn.click();
  }
}
export default LoginPage;
