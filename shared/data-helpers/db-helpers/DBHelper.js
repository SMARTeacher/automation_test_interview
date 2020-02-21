const pg = require('pg');

class DBHelper {
  constructor(dbConfig) {
    this.pool = new pg.Pool({
      host: dbConfig.host,
      port: dbConfig.port,
      database: dbConfig.database,
      user: dbConfig.user,
      password: dbConfig.password,
      max: 2, // set pool max size
      min: 1, // set min pool size
    });

    pg.types.setTypeParser(1114, function (stringValue) {
      return new Date(stringValue + '+0000');
    });
  }

  async query(stmt, values) {
    const resp = await this.pool.query(stmt, values);

    return resp.rows;
  }

  async executeInTransactionAsync(func) {
    const client = await this.pool.connect();
    let result;

    try {
      await client.query('BEGIN');
      result = await func(client);
      await client.query('COMMIT');
    } catch (e) {
      await client.query('ROLLBACK');
      throw e;
    } finally {
      client.release();
    }

    return result;
  }
}

module.exports = DBHelper;
