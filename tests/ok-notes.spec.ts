import { test } from '@fixtures/fixture-config';
import { productList } from '@data/products';

test.describe('check ok-notes app', () => {
  let discountProducts: Product[];
  let noDiscountProducts: Product[];

  test.beforeAll(async ({}) => {
    discountProducts = productList.filter((product: Product) => product.discount);
    noDiscountProducts = productList.filter((product: Product) => !product.discount);
  });

  test.beforeEach(async ({ productsPage, navBar, basketAPIManager }) => {
    await Promise.all([basketAPIManager.emptyBasket(), productsPage.open()]);
    await navBar.verifyBasketCount('0');
  });

  test('check empty cart', async ({ navBar, basketPopup, basketPage }) => {
    await navBar.clickBasketIcon();
    await basketPopup.verifyBasketPopupVisibility(); // Error: Uncaught ReferenceError: showToast is not defined
    await basketPopup.navigateToBasketPage();
    await basketPage.assertUrl();
  });

  test('check cart with one item without discount', async ({ navBar, productsPage, basketPopup, basketPage }) => {
    const testData: Product[] = [noDiscountProducts[0]];
    await productsPage.clickBuyProduct(testData);
    await navBar.verifyBasketCount('1');
    await navBar.clickBasketIcon();
    await basketPopup.verifyBasketPopupVisibility();
    await basketPopup.checkBasketData(testData);
    await basketPopup.navigateToBasketPage(); // Server Error (#500)
    await basketPage.assertUrl();
  });

  test('check cart with one discount item', async ({ navBar, productsPage, basketPopup, basketPage }) => {
    const testData: Product[] = [discountProducts[0]];
    await productsPage.clickBuyProduct(testData);
    await navBar.verifyBasketCount('1');
    await navBar.clickBasketIcon();
    await basketPopup.verifyBasketPopupVisibility();
    await basketPopup.checkBasketData(testData);
    await basketPopup.navigateToBasketPage(); // Server Error (#500)
    await basketPage.assertUrl();
  });

  test('check cart with nine different items', async ({ navBar, productsPage, basketPopup, basketPage }) => {
    const products1: Product[] = [discountProducts[0], noDiscountProducts[0]];
    const products2 = productList.filter((item) => item.page === 2);
    const testData = products1.slice().concat(products2);
    await productsPage.clickBuyProduct(products1);
    await navBar.verifyBasketCount('2');
    await productsPage.selectPage(2);
    await productsPage.waitForProductsVisible();
    await productsPage.clickBuyProduct(products2);
    await navBar.verifyBasketCount('9');
    await navBar.clickBasketIcon(); // Server Error (#500)
    await basketPopup.verifyBasketPopupVisibility();
    await basketPopup.checkBasketData(testData);
    await basketPopup.navigateToBasketPage();
    await basketPage.assertUrl();
  });

  test('check cart with nine discount items', async ({ navBar, productsPage, basketPopup, basketPage }) => {
    const newDiscountProducts = discountProducts.filter((item) => item.count > 9);
    const testData: Product[] = [newDiscountProducts[0]];
    await productsPage.enterProductCount(testData[0], '9');
    await productsPage.clickBuyProduct(testData);
    await navBar.verifyBasketCount('9');
    await navBar.clickBasketIcon(); // Server Error (#500)
    await basketPopup.verifyBasketPopupVisibility();
    await basketPopup.checkBasketData(Array(9).fill(testData));
    await basketPopup.navigateToBasketPage();
    await basketPage.assertUrl();
  });
});
