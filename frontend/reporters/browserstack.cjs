class BrowserStackPlaywrightReporter {
  constructor() {
    this.projectName = process.env.BROWSERSTACK_PROJECT_NAME || 'BrightSwagShop - JIRA';
    this.buildName = process.env.BROWSERSTACK_BUILD_NAME || `Build #${process.env.GITHUB_RUN_NUMBER || 'local'}`;
    this.startTime = Date.now();
    this.testResults = [];
  }

  onBegin() {
    console.log(`[BrowserStack] Starting frontend run: ${this.buildName}`);
  }

  onTestEnd(test, result) {
    this.testResults.push({
      title: test.title,
      status: result.status,
      duration: result.duration,
      error: result.error?.message || null,
    });
  }

  onEnd() {
    const duration = Math.round((Date.now() - this.startTime) / 1000);
    const passed = this.testResults.filter(test => test.status === 'passed').length;
    const failed = this.testResults.filter(test => test.status === 'failed').length;
    const skipped = this.testResults.filter(test => test.status === 'skipped').length;

    console.log('[BrowserStack] Frontend test run completed:');
    console.log(`  - Total: ${this.testResults.length}`);
    console.log(`  - Passed: ${passed}`);
    console.log(`  - Failed: ${failed}`);
    console.log(`  - Skipped: ${skipped}`);
    console.log(`  - Duration: ${duration}s`);
    console.log(`  - Build: ${this.buildName}`);
    console.log(`  - Project: ${this.projectName}`);
  }
}

module.exports = BrowserStackPlaywrightReporter;