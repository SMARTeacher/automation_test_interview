const MSSQLHelper = require('./MSSQLHelper');

class LiveReportingDBHelper extends MSSQLHelper {
  constructor(dbConfig) {
    super(dbConfig);
  }

  async getPlans(userID) {
    return this.query(
      `SELECT * FROM plans WHERE user_id = '${userID}';`
    );
  }
}

module.exports = LiveReportingDBHelper;
