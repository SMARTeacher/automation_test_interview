const DBHelper = require('./DBHelper');

class WebDBHelper extends DBHelper {
  constructor(dbConfig) {
    super(dbConfig);
  }
}

module.exports = WebDBHelper;
