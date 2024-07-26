import { test as base } from '@playwright/test';
import LoginPage from '@pages/LoginPage';
import BasketAPIManager from '@api-commands/BasketAPIManager';
import NavBar from '@pages/components/NavBar';
import BasketPopup from '@pages/components/BasketPopup';
import BasketPage from '@pages/BasketPage';
import ProductsPage from '@pages/ProductsPage';

type MyFixture = {
  loginPage: LoginPage;
  productsPage: ProductsPage;
  basketAPIManager: BasketAPIManager;
  navBar: NavBar;
  basketPopup: BasketPopup;
  basketPage: BasketPage;
};

export const test = base.extend<MyFixture>({
  // POs
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  navBar: async ({ page }, use) => {
    const navBar = new NavBar(page);
    await use(navBar);
  },

  basketPopup: async ({ page }, use) => {
    const basketPopup = new BasketPopup(page);
    await use(basketPopup);
  },

  basketPage: async ({ page }, use) => {
    const basketPage = new BasketPage(page);
    await use(basketPage);
  },

  productsPage: async ({ page }, use) => {
    const productsPage = new ProductsPage(page);
    await use(productsPage);
  },

  // API
  basketAPIManager: async ({ request }, use) => {
    const basketAPIManager = new BasketAPIManager(request);
    await use(basketAPIManager);
  },
});

export { expect } from '@playwright/test';
