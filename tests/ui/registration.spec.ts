import { test, expect } from '../../utils/test-setup';
import { DataFactory } from '../../utils/data-factory';

test.describe('UI Test Suite - Registration Flow', () => {

  test('validates successful user registration flow', async ({ page, registrationPage }) => {
    await page.route('**/api/users', async (route) => {
      await route.fulfill({
        status: 201,
        contentType: 'application/json',
        json: { id: '12345', message: 'User created' }
      });
    });

    const validUser = DataFactory.createRandomUser();
    await registrationPage.goto();
    await registrationPage.registerUser(validUser);
    
    await expect(registrationPage.successMessage).toBeVisible();
    await expect(registrationPage.successMessage).toContainText('Registration successful');
  });

  test('validates error message handling', async ({ page, registrationPage }) => {
    await page.route('**/api/users', async (route) => {
      await route.fulfill({
        status: 400,
        contentType: 'application/json',
        json: { message: 'Email already exists' }
      });
    });

    const duplicateUser = DataFactory.createRandomUser();
    await registrationPage.goto();
    await registrationPage.registerUser(duplicateUser);
    
    await registrationPage.verifyErrorDisplayed('Email already exists');
  });

  test('should fail intentionally to demonstrate screenshot capture', async ({ page, registrationPage }) => {
    await page.goto('/register');
    const user = DataFactory.createRandomUser();
    await registrationPage.registerUser(user);

    // INTENTIONAL FAILURE: Asserting on an element that does not exist in the mock DOM
    await expect(page.locator('.this-does-not-exist')).toBeVisible({ timeout: 2000 });
  });
});