import { Page, Locator, expect } from '@playwright/test';
import { Transaction } from '../types/models';

export class TransactionPage {
  readonly page: Page;
  readonly recipientInput: Locator;
  readonly amountInput: Locator;
  readonly submitButton: Locator;
  readonly successMessage: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.recipientInput = page.getByRole('textbox', { name: /recipient id/i });
    this.amountInput = page.getByRole('spinbutton', { name: /amount/i });
    this.submitButton = page.getByRole('button', { name: /send funds/i });
    this.successMessage = page.locator('.success-message');
    this.errorMessage = page.locator('.error-message');
  }

  async goto() {
    await this.page.goto('/transfer');
  }

  async submitTransaction(transaction: Transaction) {
    if (transaction.recipientId) {
      await this.recipientInput.fill(transaction.recipientId);
    }
    await this.amountInput.fill(transaction.amount.toString());
    await this.submitButton.click();
  }
}