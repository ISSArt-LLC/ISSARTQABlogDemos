import { test, expect } from '@playwright/test';

test('Test Compare Admin and Developer Access Recorded', async ({ page }) => {
  await page.goto('http://localhost/mantisbt/login_page.php');
  await page.getByPlaceholder('Username').click();
  await page.getByPlaceholder('Username').fill('administrator');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill('PswA123456_');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.locator('#breadcrumbs').getByRole('link', { name: 'administrator' }).click();
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
  await page.getByRole('link', { name: ' administrator ' }).click();
  await page.getByRole('link', { name: ' Logout' }).click();
  await page.getByPlaceholder('Username').click();
  await page.getByPlaceholder('Username').fill('developer2');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill('123456');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('link', { name: ' My View' }).click();
  await page.getByRole('link', { name: 'developer2 ( developer2 Name )' }).click();
  await page.getByRole('link', { name: ' My View' }).click();
  await page.getByRole('link', { name: ' View Issues' }).click();
  await page.getByRole('heading', { name: ' Filters' }).click();
  await page.locator('#sidebar').getByRole('link', { name: ' Report Issue' }).click();
  await page.getByRole('heading', { name: ' Enter Issue Details' }).click();
  await page.getByRole('link', { name: ' Change Log' }).click();
  await page.getByRole('link', { name: ' Roadmap' }).click();
  await page.goto('http://localhost/mantisbt/summary_page.php');
  await page.getByRole('link', { name: 'Proceed' }).click();
  await page.goto('http://localhost/mantisbt/manage_overview_page.php');
  await page.getByRole('link', { name: 'Proceed' }).click();
  await page.getByRole('link', { name: ' developer2 ' }).click();
  await page.getByRole('link', { name: ' Logout' }).click();
});