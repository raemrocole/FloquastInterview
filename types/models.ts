export interface User {
  id?: string;
  name: string;
  email: string;
  accountType: 'premium' | 'standard';
}

export interface Transaction {
  id?: string;
  userId: string;
  amount: number;
  type: 'transfer' | 'deposit' | 'withdrawal';
  recipientId?: string;
}

declare global {
  namespace PlaywrightTest {
    interface Matchers<R> {
      toBeApiError(expectedStatus: number): R;
      toBeApiSuccess(): R;
    }
  }
}