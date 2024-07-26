import * as fs from 'fs';
import { API_HEADERS } from 'playwright.config';

export async function getHeaders() {
  const data = fs.readFileSync(API_HEADERS, 'utf8');
  return JSON.parse(data);
}
