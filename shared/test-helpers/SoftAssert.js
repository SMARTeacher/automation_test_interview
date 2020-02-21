const assert = require('assert');

class SoftAssert {
  constructor() {
    this.didFail = false;
    this.errorLog = [];
  }

  areEqual(actual, expected) {
    this._softAssert(() => {
      assert.equal(actual, expected);
    });
  }

  areDeeplyEqual(actual, expected) {
    this._softAssert(() => {
      assert.deepEqual(actual, expected);
    });
  }

  isUndefined(value) {
    this._softAssert(() => {
      assert.ok(value === undefined);
    });
  }

  isNull(value, strict = true) {
    this._softAssert(() => {
      if (strict) { assert.ok(value === null); } else { assert.ok(value == null); }
    });
  }

  isNotNull(value) {
    this._softAssert(() => {
      assert.ok(value != null);
    });
  }

  isTrue(condition) {
    this._softAssert(() => {
      assert.ok(condition);
    });
  }

  _softAssert(func) {
    try {
      func();
    } catch (e) {
      this.didFail = true;
      const stack = e.stack.split('\n');
      let errorLine;
      let firstSoftAssertHit;
      for (let inc = 0; inc < stack.length; inc += 1) {
        const line = stack[inc].trim();
        if (!line.toUpperCase().includes('SOFTASSERT')) {
          if (firstSoftAssertHit) {
            errorLine = line.trim();
            break;
          }
        } else {
          firstSoftAssertHit = true;
        }
      }
      this.errorLog.push(`$Actual:${e.actual} Operator:${e.operator}` + `Expected:${e.expected} @ ${errorLine}`);
      if (!errorLine) this.errorLog.push(e.stack);
    }
  }

  checkStatus() {
    if (this.didFail) {
      throw Error(`Failed \n ${this.errorLog.join('\n')}`);
    }
  }
}

module.exports = { SoftAssert };
