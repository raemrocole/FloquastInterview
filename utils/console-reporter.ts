import { Reporter, TestCase, TestResult } from '@playwright/test/reporter';

class CustomConsoleReporter implements Reporter {
  onTestEnd(test: TestCase, result: TestResult) {
    if (result.status === 'failed' || result.status === 'timedOut') {
      console.log(`\n❌ TEST FAILED: ${test.title}`);
      console.log(`⏱️  Duration: ${result.duration}ms`);
      
      if (result.error?.message) {
        console.log(`\n📄 Error Details:\n${result.error.message}`);
      }
      
      // Highlight if screenshots/traces were saved
      const attachments = result.attachments;
      const screenshots = attachments.filter(a => a.name === 'screenshot');
      if (screenshots.length > 0) {
        console.log(`\n📸 Screenshot captured: ${screenshots[0].path}`);
      }
      console.log('----------------------------------------');
    } else if (result.status === 'passed') {
      console.log(`✅ ${test.title}`);
    }
  }
}

export default CustomConsoleReporter;