// @ts-check
import { test, expect } from '@playwright/test';

test('GSB Frais', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/GSB Frais/);
});

test('Connexion', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Connexion' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Connexion' })).toBeVisible();

});
test('Login with valid credentials', async ({ page }) => {
  await page.goto('http://localhost:3000/login/');
  await page.fill('input[name="login"]', 'Andre');
  await page.fill('input[name="password"]', 'secret');
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL('http://localhost:3000/dashboard');
})
test('Login with unvalid credentials', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
    await page.fill('input[name="login"]', 'Are');
  await page.fill('input[name="password"]', 'seet');
  await page.click('button[type="submit"]');
  page.on("dialog", async (dialog) => { 
    expect(dialog.type()).toContain("alert"); 
    expect(dialog.message()).toContain("Échec de la connexion"); 
    await dialog.accept();});
  await expect(page).toHaveURL('http://localhost:3000/login')



});
test('L’utilisateur rafraichit la page du tableau de bord', async ({ page }) => {
  await page.goto('http://localhost:3000/login/');
  await page.fill('input[name="login"]', 'Andre');
  await page.fill('input[name="password"]', 'secret');
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL('http://localhost:3000/dashboard');
  await page.reload();
  await expect(page).toHaveURL('http://localhost:3000/dashboard');

}); 
test('L’utilisateur se déconnecte en cliquant sur le bouton de Déconnexion.', async ({ page }) => {
  await page.goto('http://localhost:3000/login/');
  await page.fill('input[name="login"]', 'Andre');
  await page.fill('input[name="password"]', 'secret');
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL('http://localhost:3000/dashboard');
  await page.click('button[type="logout"]');
  await expect(page).toHaveURL('http://localhost:3000/login');

}); 
