import { test as base, expect } from '@playwright/test';
import { MockTemplates } from './mock-templates';
import { RegistrationPage } from '../pages/registration-page';
import { TransactionPage } from '../pages/transactions-page';

// Custom Assertion Implementation
expect.extend({
  toBeApiError(received, expectedStatus: number) {
    const pass = received.error === true && received.status === expectedStatus;
    if (pass) {
      return {
        // Message when the assertion passes, but the user used .not
        message: () => `expected response NOT to be a ${expectedStatus} API error`,
        pass: true,
      };
    } else {
      return {
        // Message when the assertion fails normally
        message: () => `expected response to be a ${expectedStatus} API error, but got status ${received.status}`,
        pass: false,
      };
    }
  },
});

expect.extend({
  toBeApiSuccess(received) {
    // Check for false error flag AND a status code in the 2xx range
    const pass = received.error === false && received.status >= 200 && received.status < 300;
    
    if (pass) {
      return {
        // Message when the assertion passes, but the user used .not (e.g., expect(res).not.toBeApiSuccess())
        message: () => `expected response NOT to be a success (2xx), but got status ${received.status}`,
        pass: true,
      };
    } else {
      return {
        // Message when the assertion fails normally
        message: () => `expected response to be a success (2xx), but got status ${received.status}`,
        pass: false,
      };
    }
  },
});

type AppFixtures = {
  mockFrontend: void;
  registrationPage: RegistrationPage;
  transactionPage: TransactionPage;
};

export const test = base.extend<AppFixtures>({
  mockFrontend: [async ({ page }, use) => {
    await page.route('**/register', async (route) => {
      await route.fulfill({ status: 200, contentType: 'text/html', body: MockTemplates.registration });
    });
    await page.route('**/transfer', async (route) => {
      await route.fulfill({ status: 200, contentType: 'text/html', body: MockTemplates.transaction });
    });
    await use();
  }, { auto: true }],
  
  registrationPage: async ({ page }, use) => {
    await use(new RegistrationPage(page));
  },
  transactionPage: async ({ page }, use) => {
    await use(new TransactionPage(page));
  }
});

export { expect };