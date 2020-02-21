const headerSelector = '[data-qa="hero-banner-heading"]';

const membershipiFrameSelector = '//iframe[contains(@src, "Membership?game=1")]';
const closeSelector = '[data-qa="close-app-button"]';

class MembershipLandingPage {
  static async jumpToFrame() {
    await browser.switchToParentFrame();
    await (await browser.$(membershipiFrameSelector)).waitForDisplayed();
    await browser.switchToFrame((await browser.$$(membershipiFrameSelector))[0]);
  }

  static async close() {
    await (await browser.$(closeSelector)).click();
  }

  static async waitTillLoaded() {
    await (await browser.$(headerSelector)).waitForDisplayed();
  }
}

module.exports = MembershipLandingPage;
