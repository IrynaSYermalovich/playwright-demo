import { Locator, Page, expect } from '@playwright/test';

export class BasketPopup {
  readonly page: Page;
  readonly basketPopup: Locator;
  readonly openBasketBtn: Locator;
  readonly basketItemName: Locator;
  readonly basketItemPrice: Locator;
  readonly basketTotalPrice: Locator;

  constructor(page: Page) {
    this.page = page;
    this.basketPopup = page.locator('//*[@aria-labelledby="dropdownBasket"]');
    this.openBasketBtn = page.locator('//*[@href="/basket"]');
    this.basketItemName = page.locator('//*[@class="basket-item-title"]');
    this.basketItemPrice = page.locator('//*[@class="basket-item-price"]');
    this.basketTotalPrice = page.locator('//*[@class="basket_price"]');
  }

  async verifyBasketPopupVisibility() {
    await expect(this.basketPopup).toBeVisible();
  }

  async navigateToBasketPage() {
    await this.openBasketBtn.click();
  }

  async checkBasketData(products: Product[]) {
    let totalPrice = 0;
    for (const product of products) {
      const newPrice = product.price - product.discount;
      totalPrice += newPrice;
      await expect(await this.basketItemName.filter({ hasText: product.name })).toBeVisible();
      await expect(await this.basketItemPrice.filter({ hasText: newPrice.toString() })).toBeVisible();
    }
    await expect(this.basketTotalPrice).toHaveText(totalPrice.toString());
  }
}

export default BasketPopup;
