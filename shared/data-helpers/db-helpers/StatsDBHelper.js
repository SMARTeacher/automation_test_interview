const DBHelper = require('./DBHelper');

class StatsDBHelper extends DBHelper {
  constructor(dbConfig) {
    super(dbConfig);
  }

  async getUserStatsSkill(student) {
    return await this.query(
      `SELECT * FROM user_stats_skill WHERE user_id = '${student.id}';`
    );
  }

  async getParentGoals(student) {
    return await this.query(
      `SELECT * FROM parent_goals WHERE student_id = '${student.id}';`
    );
  }

  async getClassStatsSkill(student, classId, date) {
    return await this.query(
      `
      SELECT * FROM class_stats_skill
      WHERE user_id = '${student.id}' 
        AND class_id = '${classId}' 
        AND date = '${date}'
      `
    );
  }

  async getUserAbility(student) {
    return await this.query(
      `SELECT * FROM user_ability WHERE user_id = '${student.id}';`
    );
  }

  async insertUserStats(studentId, userStats) {
    return await this.query(`
    INSERT INTO user_stats_skill VALUES ${userStats.map(
    ua => `(${studentId},
           '${ua.date.toISOString()}',
            ${ua.skillId},
            ${ua.questionsAnswered},
            ${ua.questionsAtSchool},
            ${ua.questionsCorrect},
            ${ua.secondsSpent} )`
  )}
    `);
  }

  async insertUserAbility(studentId, userStats) {
    return await this.query(`
    INSERT INTO user_ability VALUES ${userStats.map(
    ua => `(${studentId},
            ${ua.skillId},
            ${ua.theta},
            ${ua.decay},
            ${ua.lock},
            ${ua.correct},
            ${ua.incorrect},
            ${ua.timeSpent} ,
           '${ua.dateMastered.toISOString()}',
           '${ua.lastUpdated.toISOString()}'
            )`
  )}
    `);
  }

  async deleteUserStats(student) {
    return await this.query(
      `DELETE FROM user_stats_skill WHERE user_id = '${student.id}';`
    );
  }

  async deleteUserAbility(student) {
    return await this.query(
      `DELETE FROM user_ability WHERE user_id = '${student.id}';`
    );
  }

  async upsertUserAbility(studentId, userAbilities) {
    return await this.query(`
      INSERT INTO user_ability
      VALUES ${userAbilities
    .map(
      ua => `(
          ${studentId}, 
          ${ua.skillId}, 
          ${ua.theta}, 
          ${ua.decay}, 
          ${ua.lock}, 
          ${ua.correct}, 
          ${ua.incorrect}, 
          ${ua.timeSpent}, 
          ${ua.dateMastered ? `'${ua.dateMastered.toISOString()}'` : 'NULL'},
          '${ua.lastUpdated.toISOString()}')`
    )
    .join(',\n')}
      ON CONFLICT ON CONSTRAINT user_ability_pkey
      DO
        UPDATE
        SET 
          theta = EXCLUDED.theta,
          decay = EXCLUDED.decay,
          lock = EXCLUDED.lock,
          correct = EXCLUDED.correct,
          incorrect = EXCLUDED.incorrect,
          time_spent = EXCLUDED.time_spent,
          date_mastered = EXCLUDED.date_mastered,
          last_updated = EXCLUDED.last_updated
      `);
  }
}

module.exports = StatsDBHelper;
