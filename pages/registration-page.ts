import { Page, Locator, expect } from '@playwright/test';
import { User } from '../types/models';

export class RegistrationPage {
  readonly page: Page;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly accountTypeSelect: Locator;
  readonly submitButton: Locator;
  readonly errorMessage: Locator;
  readonly successMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.nameInput = page.getByRole('textbox', { name: /name/i });
    this.emailInput = page.getByRole('textbox', { name: /email/i });
    this.accountTypeSelect = page.getByRole('combobox', { name: /account type/i });
    this.submitButton = page.getByRole('button', { name: /register/i });
    this.errorMessage = page.locator('.error-message');
    this.successMessage = page.locator('.success-message');
  }

  async goto() {
    await this.page.goto('/register');
  }

  async registerUser(user: User) {
    await this.nameInput.fill(user.name);
    await this.emailInput.fill(user.email);
    await this.accountTypeSelect.selectOption(user.accountType);
    await this.submitButton.click();
  }

  async verifyErrorDisplayed(expectedText: string) {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toContainText(expectedText);
  }
}