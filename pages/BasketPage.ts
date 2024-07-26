import { Page, expect } from '@playwright/test';
import urls from '@utils/envUrls';

export class BasketPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async assertUrl() {
    await expect(this.page).toHaveURL(urls.ui.basket);
  }
}
export default BasketPage;
