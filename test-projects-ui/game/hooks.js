try {
  const testCache = require('./../../shared/test-helpers/Cache');
  const sharedHooks = require('./../../shared/test-helpers/hooks');

  before(async () => {
    await sharedHooks.before();
  });

  beforeEach(async function () {
    try {
      await browser.url(`${testCache.EnvironmentSettings.BaseUrl}/Play/?automation=true`);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(`beforeEach failed due to ${err}`);
      this.skip();
    }
  });

  afterEach(async function () {
    try {
      const currentTest = this.currentTest;
      if (currentTest.state === 'failed') {
        const testCaseMatches = currentTest.fullTitle().match(/( C(.+) - )/g);
        let testCaseNumber = '';
        if (testCaseMatches) {
          testCaseNumber = testCaseMatches[0].split(' ')[1];
        }
        const now = Date.now(); // TODO: Fix how capturing is done.
        // Issue: saveScreenshot brings forward the browser,
        // so the screenshot doesn't represent actual failure point. Most of the time
        await browser.saveScreenshot(`./game/screenshots/${testCaseNumber}-${now}WI.png`);
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(`afterEach failed due to ${err}`);
    }
  });
} catch (error) {
  // eslint-disable-next-line no-console
  console.log(error);
  throw new Error('Hook Failed');
}
