const DBHelper = require('./DBHelper');

class AnswersDBHelper extends DBHelper {
  constructor(dbConfig) {
    super(dbConfig);
  }

  async getAnswers(student) {
    return await this.query(
      `SELECT * FROM public.answers WHERE user_id = '${student.id}' ORDER BY timestamp ASC`
    );
  }
}

module.exports = AnswersDBHelper;
