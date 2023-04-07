import { test, Page, expect } from '@playwright/test';

// Read environment variables from .env file
const {
  MANTISBT_URL: URL = '',
  MANTISBT_LOGIN_PAGE: LOGIN_PAGE = '',  
  MANTISBT_ADMIN_LOGIN: ADMIN_LOGIN = '',
  MANTISBT_ADMIN_PASS: ADMIN_PASS = '',
  MANTISBT_DEVELOPER_PASS: DEVELOPER_PASS = '',
} = process.env

test.describe.configure({mode: 'serial'})

let page: Page;
const developerName = 'developer-' + Date.now();
const developerFullName = developerName + '-Name'

test.beforeAll(async ({ browser }) => {  
  page = await browser.newPage();
  await page.goto(URL + LOGIN_PAGE);  
});

test('Test Add a new Developer Refactored', async () => {  
  await page.getByPlaceholder('Username').fill(ADMIN_LOGIN);
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByText('Only allow your session to be used from this IP address.').click();  
  await page.getByPlaceholder('Password').fill(ADMIN_PASS);
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('link', { name: 'Manage Users' }).click();
  await page.getByRole('link', { name: 'Create New Account' }).click();
  console.log('Developer name:' + developerName);
  await page.locator('#user-username').fill(developerName);  
  await page.locator('#user-realname').fill(developerFullName);
  await page.locator('#user-access-level').selectOption('55');
  await page.getByRole('button', { name: 'Create User' }).click();
  await page.getByRole('button', { name: 'Use Empty Password' }).click();
  await page.getByRole('link', { name: ' administrator ' }).click();
  await page.getByRole('link', { name: ' Logout' }).click();
  // Login with developerName
  await page.getByPlaceholder('Username').fill(developerName);
  await page.getByRole('button', { name: 'Login' }).click();
  // Empty password here
  await page.getByRole('button', { name: 'Login' }).click();
  const developerTopLink = developerName + ' ( ' + developerFullName + ' )'  
  await page.getByRole('link', { name: developerTopLink }).click();  
  await page.locator('#password').fill(DEVELOPER_PASS);  
  await page.locator('#password-confirm').fill(DEVELOPER_PASS);
  await page.getByRole('button', { name: 'Update User' }).click();
  // Login with developerName and Password  
  await page.getByPlaceholder('Username').fill(developerName);
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill(DEVELOPER_PASS);
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('link', { name: developerTopLink }).click();
  await page.getByRole('link', { name: ' ' + developerName + ' ' }).click();
  await page.getByRole('link', { name: ' Logout' }).click();
    // Display message with show-report command in console
  console.log('Copy and paste to show test report: npx playwright show-report')
  // Finally, expect for Login button is visible
  expect(page.getByRole('button', { name: 'Login' })).toBeVisible;
})

test.afterAll(async () => {
  await page.close();
});
