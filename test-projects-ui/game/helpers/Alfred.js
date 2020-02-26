class Charles {
  static async collectAutomationObjects() {
    const automationObjects = (await browser.execute(() => {
      // eslint-disable-next-line no-undef
      return getAutomationObjects().map(ao => {
        return {
          'name': ao.name,
          'x': ao.x,
          'y': ao.y,
          'centerX': ao.centerX,
          'centerY': ao.centerY,
          'width': ao.width,
          'height': ao.height
        };
      });
    }, []));

    return automationObjects;
  }
}

module.exports = Charles;
