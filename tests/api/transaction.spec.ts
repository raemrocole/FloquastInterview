import { test, expect } from '@playwright/test';
import { TransactionService } from '../../services/transaction-service';
import { DataFactory } from '../../utils/data-factory';

test.describe('Transaction API Test Suite', () => {
  let transactionService: TransactionService;

  test.beforeEach(async ({ request }) => {
    transactionService = new TransactionService(request);
  });

  test('should successfully create a transaction and retrieve it via user history', async () => {
    const senderId = `sender_${Date.now()}`;
    const recipientId = `recipient_${Date.now()}`;

    const newTxn = DataFactory.createTransaction(senderId, recipientId, 150.75);

    // Create the transaction
    const createRes = await transactionService.createTransaction(newTxn);
    expect(createRes).toBeApiSuccess
    
    // Validate the response payload matches the contract constraints
    expect(createRes.data.userId).toBe(senderId);
    expect(createRes.data.amount).toBe(150.75);
    expect(createRes.data.type).toBe('transfer');
    expect(createRes.data.recipientId).toBe(recipientId);

    // Verify the transaction appears in the user's transaction history
    const getRes = await transactionService.getUserTransactions(senderId);
    expect(getRes).toBeApiSuccess
    
    // Assuming the GET endpoint returns an array of transactions
    expect(Array.isArray(getRes.data)).toBeTruthy();
    
    // Verify our specific transaction is present in the returned list
    const foundTransaction = getRes.data.find((txn: any) => txn.id === createRes.data.id);
    expect(foundTransaction).toBeDefined();
  });

  test('should return 400 Bad Request when amount is negative', async () => {
    const invalidTxn = DataFactory.createTransaction('user_123', 'recipient_456', -50.00);
    
    const res = await transactionService.createTransaction(invalidTxn);
    
    expect(res).toBeApiError(400)
    expect(res.data.message?.toLowerCase()).toContain('invalid amount'); 
  });
});