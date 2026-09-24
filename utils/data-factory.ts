import { User, Transaction } from '../types/models';

export class DataFactory {
  static createRandomUser(isPremium: boolean = true): User {
    const timestamp = Date.now();
    const accountType = isPremium ? 'premium' : 'standard';
    return {
      name: `TestUser_${timestamp}`,
      email: `user${timestamp}@example.com`,
      accountType
    };
  }

  static createTransaction(userId: string, recipientId: string, amount: number = 100.50): Transaction {
    return {
      userId,
      amount,
      type: 'transfer',
      recipientId
    };
  }
}