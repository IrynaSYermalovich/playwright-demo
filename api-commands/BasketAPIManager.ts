import { APIRequestContext, expect } from '@playwright/test';
import { getHeaders } from '@api-commands/getHeaders';
import urls from '@utils/envUrls';

export class BasketAPIManager {
  readonly request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async emptyBasket() {
    const response = await this.request.post(urls.api.basket.clear, {
      headers: await getHeaders(),
    });
    expect.soft(response.status()).toBe(200);
  }
}

export default BasketAPIManager;
