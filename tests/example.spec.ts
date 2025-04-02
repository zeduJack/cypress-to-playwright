import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

for (let i = 0; i < 100; i++){
  test('zkb test ' + i, async ({ page }) => {
    await page.goto('https://www.cypress.io/');

    // Click the get started link.
    //await expect(page.getByText('Konten und Karten')).toBeVisible();
    await expect(page).toHaveTitle(/Testing Frameworks for Javascript | Write, Run, Debug | Cypress/);

  });
}

  test('get started link ', async ({ page }) => {
    await page.goto('https://playwright.dev/');

    // Click the get started link.
    await page.getByRole('link', { name: 'Get started' }).click();

    // Expects page to have a heading with the name of Installation.
    await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
  })
