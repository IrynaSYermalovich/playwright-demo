import { expect, type Locator, type Page } from '@playwright/test';
import * as urls from '@utils/envUrls';
import * as util from 'util';

export class ProductsPage {
  readonly page: Page;
  readonly products: Locator;
  readonly productCartWithName: string;
  readonly productBuyButton: string;
  readonly productCountField: string;
  readonly pageItem: Locator;

  constructor(page: Page) {
    this.page = page;
    this.products = page.locator('.note-item.card');
    this.productCartWithName = '//*[contains(@class,"product_name") and text()="%s"]/..';
    this.productBuyButton = `${this.productCartWithName}/*[contains(@class,"actionBuyProduct")]`;
    this.productCountField = `${this.productCartWithName}//*[@name="product-enter-count"]`;
    this.pageItem = this.page.locator('.page-item');
  }

  async open() {
    await Promise.all([this.page.goto('/'), this.page.waitForResponse(urls.default.api.product.get)]);
    await expect(await this.products.count()).toBeGreaterThanOrEqual(1);
  }

  async clickBuyProduct(products: Product[]) {
    for (const product of products) {
      await this.page.locator(util.format(this.productBuyButton, product.name)).click();
    }
  }

  async enterProductCount(product: Product, count: string) {
    await this.page.locator(util.format(this.productCountField, product.name)).fill(count);
  }

  async selectPage(page: number) {
    await this.pageItem
      .filter({
        hasText: page.toString(),
      })
      .click();
  }
}

export default ProductsPage;
