const DBHelper = require('./DBHelper');

class UserAbilityDBHelper extends DBHelper {
  constructor(dbConfig) {
    super(dbConfig);
  }

  async getUserAbility(student) {
    return await this.query(
      `SELECT * FROM user_ability WHERE user_id = '${student.id}';`
    );
  }

  async upsertUserAbility(studentId, userAbilities) {
    return await this.query(`
      INSERT INTO user_ability
      VALUES ${userAbilities.map(
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
  ).join(',\n')}
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
      `
    );
  }
}

module.exports = UserAbilityDBHelper;
