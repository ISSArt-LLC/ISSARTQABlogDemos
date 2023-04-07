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
} = process.env

test.describe.configure({mode: 'serial'})

let page: Page;
const projectName = 'UI Automation Testing Project ' + Date.now();
const projectDesc = projectName + ' Desc';

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

test('Test Add Project', async () => {  
  userLogin(ADMIN_LOGIN, ADMIN_PASS);
  await page.getByRole('link', { name: ' Manage' }).click();
  await page.getByRole('link', { name: 'Manage Projects' }).click();
  await page.getByRole('button', { name: 'Create New Project' }).click();  
  await page.locator('#project-name').fill(projectName);  
  await page.locator('#project-description').fill(projectDesc);
  await page.getByRole('button', { name: 'Add Project' }).click();
  await page.getByRole('link', { name: projectName }).click();
  // Select EXISTING_DEVELOPER position in the listbox by label
  await page.getByRole('listbox', { name: '* Username' }).selectOption({label: EXISTING_DEVELOPER});
  await page.getByRole('combobox', { name: 'Access Level' }).selectOption('55');
  await page.getByRole('button', { name: 'Add User' }).click();
  await page.getByRole('link', { name: EXISTING_DEVELOPER }).click();
  await page.getByRole('cell', { name: projectName + ' [developer] (public)' }).click();
  userLogout(ADMIN_LOGIN);  
});  

test('Test Check Project by Developer', async () => {
  userLogin(EXISTING_DEVELOPER, DEVELOPER_PASS);
  await page.getByRole('link', { name: EXISTING_DEVELOPER + ' ( ' + EXISTING_DEVELOPER_REAL_NAME + ' )' }).click();
  await page.getByRole('heading', { name: ' Assigned Projects' }).click();
  await page.getByRole('cell', { name: projectName, exact: true }).click();
  await page.getByRole('cell', { name: projectDesc }).click();
  userLogout(EXISTING_DEVELOPER);  
});

test('Delete Project by Admin', async () => {
  userLogin(ADMIN_LOGIN, ADMIN_PASS);  
  await page.getByRole('link', { name: ' Manage' }).click();
  await page.getByRole('link', { name: 'Manage Projects' }).click();
  await page.getByRole('link', { name: projectName }).click();
  await page.getByRole('button', { name: 'Delete Project' }).click();
  await page.getByRole('button', { name: 'Delete Project' }).click();
  userLogout(ADMIN_LOGIN);  
});

test.afterAll(async () => {
  await page.close();
  console.log('Copy and paste to show test report: npx playwright show-report')
});