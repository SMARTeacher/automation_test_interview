const DBHelper = require('./DBHelper');

class EducationDBHelper extends DBHelper {
  constructor(dbConfig) {
    super(dbConfig);
  }

  async getUser(userId) {
    return (await this.query(
      `SELECT * FROM users WHERE "objectID" = '${userId}'`
    ))[0];
  }
}

module.exports = EducationDBHelper;
