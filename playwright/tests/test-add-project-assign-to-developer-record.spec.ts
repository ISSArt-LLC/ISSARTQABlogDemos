import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost/mantisbt/login_page.php');
  await page.getByPlaceholder('Username').click();
  await page.getByPlaceholder('Username').fill('administrator');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill('PswA123456_');
  await page.getByText('Keep me logged in').click();
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('link', { name: ' Manage' }).click();
  await page.getByRole('link', { name: 'Manage Projects' }).click();
  await page.getByRole('button', { name: 'Create New Project' }).click();
  await page.locator('#project-name').click();
  await page.locator('#project-name').fill('UI Automation Testing Project');
  await page.locator('#project-name').click();
  await page.locator('#project-description').click();
  await page.locator('#project-description').fill('UI Automation Testing Project Desc');
  await page.getByRole('button', { name: 'Add Project' }).click();
  await page.getByRole('link', { name: 'UI Automation Testing Project' }).click();
  await page.getByRole('listbox', { name: '* Username' }).selectOption('9');
  await page.getByRole('combobox', { name: 'Access Level' }).selectOption('55');
  await page.getByRole('button', { name: 'Add User' }).click();
  await page.getByRole('link', { name: 'developer2' }).click();
  await page.getByRole('cell', { name: 'UI Automation Testing Project [developer] (public)' }).click();
  await page.getByRole('link', { name: ' administrator ' }).click();
  await page.getByRole('link', { name: ' Logout' }).click();
  await page.getByPlaceholder('Username').click();
  await page.getByPlaceholder('Username').fill('developer2');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill('123456');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('link', { name: 'developer2 ( developer2 Name )' }).click();
  await page.getByRole('heading', { name: ' Assigned Projects' }).click();
  await page.getByRole('cell', { name: 'UI Automation Testing Project', exact: true }).click();
  await page.getByRole('cell', { name: 'UI Automation Testing Project Desc' }).click();
  await page.getByRole('link', { name: ' developer2 ' }).click();
  await page.getByRole('link', { name: ' Logout' }).click();
  await page.getByPlaceholder('Username').click();
  await page.getByPlaceholder('Username').fill('administrator');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill('PswA123456_');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('link', { name: ' Manage' }).click();
  await page.getByRole('link', { name: 'Manage Projects' }).click();
  await page.getByRole('link', { name: 'UI Automation Testing Project' }).click();
  await page.getByRole('button', { name: 'Delete Project' }).click();
  await page.getByRole('button', { name: 'Delete Project' }).click();
  await page.getByRole('link', { name: ' administrator ' }).click();
  await page.getByRole('link', { name: ' Logout' }).click();
});