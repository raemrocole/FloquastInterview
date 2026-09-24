import { APIRequestContext } from '@playwright/test';
import { BaseApiService } from './base-api-service';
import { Transaction } from '../types/models';

export class TransactionService extends BaseApiService {
  constructor(request: APIRequestContext) {
    super(request);
  }

  async createTransaction(payload: Transaction, token: string = process.env.AUTH_TOKEN as string) {
    const response = await this.request.post('/transactions', {
      data: payload,
      headers: { Authorization: `Bearer ${token}` }
    });
    return this.logAndParse(response, 'POST /transactions');
  }

  async getUserTransactions(userId: string, token: string = process.env.AUTH_TOKEN as string) {
    const response = await this.request.get(`/transactions/${userId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return this.logAndParse(response, `GET /transactions/${userId}`);
  }
}