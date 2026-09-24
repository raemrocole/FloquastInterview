import { test, expect } from '../../utils/test-setup';
import { DataFactory } from '../../utils/data-factory';

test.describe('UI Test Suite - Transaction Flow', () => {

  test('validates successful transaction creation flow', async ({ page, transactionPage }) => {
    await page.route('**/api/transactions', async (route) => {
      await route.fulfill({
        status: 201,
        contentType: 'application/json',
        json: { id: 'txn-999', status: 'completed' }
      });
    });

    const mockTxn = DataFactory.createTransaction('user-123', 'recipient-456', 250.00);
    
    await transactionPage.goto();
    await transactionPage.submitTransaction(mockTxn);
    
    await expect(transactionPage.successMessage).toBeVisible();
    await expect(transactionPage.successMessage).toContainText('Transaction successful');
  });

  test('validates insufficient funds error handling', async ({ page, transactionPage }) => {
    await page.route('**/api/transactions', async (route) => {
      await route.fulfill({
        status: 400,
        contentType: 'application/json',
        json: { message: 'Insufficient funds' }
      });
    });

    const oversizedTxn = DataFactory.createTransaction('user-123', 'recipient-456', 99999.00);
    
    await transactionPage.goto();
    await transactionPage.submitTransaction(oversizedTxn);
    
    await expect(transactionPage.errorMessage).toBeVisible();
    await expect(transactionPage.errorMessage).toContainText('Insufficient funds');
  });
});