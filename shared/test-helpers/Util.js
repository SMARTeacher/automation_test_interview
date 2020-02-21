class Util {
  static sleep(ms) {
    return new Promise(resolve => {
      setTimeout(resolve, ms);
    });
  }

  static async retryUntilSuccessOrTimeout(
    func,
    timeoutms = 10000,
    sleepms = 1000,
    message = 'Timed out',
  ) {
    let callingMethodTraceLine = new Error().stack.split('\n')[2];
    let callingMethodTrace = callingMethodTraceLine.substring(
      callingMethodTraceLine.indexOf('(')
    ).replace(/\(/g, '').replace(/\)/g, '');

    const startTime = Date.now();
    let result = null;
    do {
      result = await func();
      await Util.sleep(sleepms);
      if (Date.now() - startTime > timeoutms) {
        throw Error(`${message} @ ${callingMethodTrace}`);
      }
    } while (result === false || result == null);

    return result;
  }

  static getRandomInt(min, max) {
    return Math.floor(Math.random() * max - min) + min;
  }

  static getRandomGuid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }

    return `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
  }
}

module.exports = { Util };
