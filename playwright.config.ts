import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';
import path from 'path';

// Load environment variables based on TEST_ENV flag (defaults to local)
const environment = process.env.TEST_ENV || 'local';
dotenv.config({ path: path.resolve(__dirname, `config/.env.${environment}`) });

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  
  // Basic reporting capabilities
  reporter: [
    ['list'],
    ['html', { open: 'never', outputFolder: 'playwright-report' }],
    ['json', { outputFile: 'test-results/test-results.json' }],
    ['junit', { outputFile: 'test-results/results.xml' }],
    ['./utils/console-reporter.ts'] 
  ],
  
  use: {
    // Environment configuration
    baseURL: process.env.BASE_UI_URL,
    trace: 'on-first-retry',
    
    // Screenshots
    screenshot: 'only-on-failure', 
    video: 'retain-on-failure'
  },
  
  projects: [
    {
      name: 'API',
      testMatch: /.*api.*\.spec\.ts/,
      use: { 
        baseURL: process.env.BASE_API_URL,
        // Custom header injection for API
        extraHTTPHeaders: {
          'Authorization': `Bearer ${process.env.AUTH_TOKEN}`
        }
      },
    },
    {
      name: 'UI',
      testMatch: /.*ui.*\.spec\.ts/,
      use: { 
        ...devices['Desktop Chrome'] 
      },
    }
  ],
});