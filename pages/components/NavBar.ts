import { Locator, Page, expect } from '@playwright/test';

export class NavBar {
  readonly page: Page;
  readonly navbar: Locator;
  readonly userBox: Locator;
  readonly basketIcon: Locator;
  readonly basketCount: Locator;

  constructor(page: Page) {
    this.page = page;
    this.navbar = page.locator('nav.navbar');
    this.userBox = page.getByTestId('dropdownUser');
    this.basketIcon = page.getByTestId('dropdownBasket');
    this.basketCount = page.locator('.basket-count-items');
  }

  async clickBasketIcon() {
    await this.basketIcon.click();
  }

  async verifyBasketCount(count: string) {
    await expect(this.basketCount).toHaveText(count);
  }
}

export default NavBar;
