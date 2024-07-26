import { test as setup, expect } from '@fixtures/fixture-config';
import { STORAGE_STATE, API_HEADERS } from 'playwright.config';
import * as urls from '@utils/envUrls';
import * as fs from 'fs';

const authFile = STORAGE_STATE;
const headersJson = API_HEADERS;

setup('authenticate', async ({ page, loginPage, navBar }) => {
  // Intercept basket get request to get CSRF token and all other headers
  await page.route(`**${urls.default.api.basket.get}`, async (route) => {
    const request = route.request();
    fs.writeFile(headersJson, JSON.stringify(request.headers(), null, 2), (err) => {
      if (err) {
        console.error('Error writing to file:', err);
      } else {
        console.log('Headers successfully written to headers.json');
      }
    });
    route.continue();
  });

  await loginPage.open();
  await loginPage.login();
  /* eslint-disable-next-line playwright/no-standalone-expect */
  await expect(navBar.userBox).toBeVisible();
  await page.context().storageState({ path: authFile });
});
