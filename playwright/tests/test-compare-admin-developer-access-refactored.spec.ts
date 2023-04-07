import { test, Page, expect } from '@playwright/test';

// Read environment variables from .env file
const {
  MANTISBT_URL: URL = '',
  MANTISBT_LOGIN_PAGE: LOGIN_PAGE = '',  
  MANTISBT_ADMIN_LOGIN: ADMIN_LOGIN = '',
  MANTISBT_ADMIN_PASS: ADMIN_PASS = '',
  MANTISBT_DEVELOPER_PASS: DEVELOPER_PASS = '',
  MANTISBT_EXISTING_DEVELOPER: EXISTING_DEVELOPER = '',
  MANTISBT_EXISTING_DEVELOPER_REAL_NAME: EXISTING_DEVELOPER_REAL_NAME = '',
  MANTISBT_SUMMARY_PAGE: SUMMARY_PAGE = '',
  MANTISBT_MANAGE_PAGE: MANAGE_PAGE = '',
} = process.env

test.describe.configure({mode: 'serial'})

let page: Page;

// User login function for all tests
async function userLogin(userName: string, userPass: string) {
  await page.getByPlaceholder('Username').fill(userName);
  await page.getByRole('button', { name: 'Login' }).click();  
  await page.getByPlaceholder('Password').fill(userPass);  
  await page.getByRole('button', { name: 'Login' }).click();  
}

// User logout function for all tests
async function userLogout(userName: string) {
  await page.getByRole('link', { name: ' ' + userName + ' ' }).click();
  await page.getByRole('link', { name: ' Logout' }).click();  
}

test.beforeAll(async ({ browser }) => {  
  page = await browser.newPage();    
});

test.beforeEach(async ()=> {
  await page.goto(URL + LOGIN_PAGE);
})

test.afterEach(async ()=> {
  // Finally, expect for Login button is visible
  expect(page.getByRole('button', { name: 'Login' })).toBeVisible;
})

test('Test Check Admin Access', async () => {
  userLogin(ADMIN_LOGIN, ADMIN_PASS);
  await page.locator('#breadcrumbs').getByRole('link', { name: ADMIN_LOGIN }).click();
  await page.getByRole('link', { name: ' My View' }).click();
  await page.getByRole('link', { name: ' View Issues' }).click();
  await page.getByRole('heading', { name: ' Filters' }).click();
  await page.locator('#sidebar').getByRole('link', { name: ' Report Issue' }).click();
  await page.getByRole('heading', { name: ' Enter Issue Details' }).click();
  await page.getByRole('link', { name: ' Change Log' }).click();
  await page.getByRole('link', { name: ' Roadmap' }).click();
  await page.getByRole('link', { name: ' Summary' }).click();
  await page.getByRole('heading', { name: ' Summary' }).click();
  await page.getByRole('link', { name: ' Manage' }).click();
  await page.getByRole('link', { name: 'Manage Users' }).click();
  userLogout(ADMIN_LOGIN);  
});

test('Test Check Developer Access', async () => {
  userLogin(EXISTING_DEVELOPER, DEVELOPER_PASS);
  await page.getByRole('link', { name: ' My View' }).click();
  await page.getByRole('link', { name: EXISTING_DEVELOPER + ' ( ' + EXISTING_DEVELOPER_REAL_NAME + ' )' }).click();
  await page.getByRole('link', { name: ' My View' }).click();
  await page.getByRole('link', { name: ' View Issues' }).click();
  await page.getByRole('heading', { name: ' Filters' }).click();
  await page.locator('#sidebar').getByRole('link', { name: ' Report Issue' }).click();
  await page.getByRole('heading', { name: ' Enter Issue Details' }).click();
  await page.getByRole('link', { name: ' Change Log' }).click();
  await page.getByRole('link', { name: ' Roadmap' }).click();
  await page.goto(URL + SUMMARY_PAGE);
  await page.getByRole('link', { name: 'Proceed' }).click();
  await page.goto(URL + MANAGE_PAGE);
  await page.getByRole('link', { name: 'Proceed' }).click();
  userLogout(EXISTING_DEVELOPER);
});

test.afterAll(async () => {
  await page.close();
  console.log('Copy and paste to show test report: npx playwright show-report')
});