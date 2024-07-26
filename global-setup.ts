import * as fs from 'fs';
import * as path from 'path';

async function globalSetup() {
  // Path to the allure-results folder
  const allureResultsPath = path.join(__dirname, 'allure-results');

  console.log(allureResultsPath);
  // Remove the allure-results folder if it exists
  if (fs.existsSync(allureResultsPath)) {
    fs.rmSync(allureResultsPath, { recursive: true, force: true });
    console.log('Removed allure-results folder.');
  }
}
export default globalSetup;
