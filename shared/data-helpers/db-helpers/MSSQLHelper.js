const mssql = require('mssql');

class MSSQLHelper {
  constructor(dbConfig) {
    this.pool = new mssql.ConnectionPool({
      user: dbConfig.user,
      password: dbConfig.password,
      server: dbConfig.host,
      database: dbConfig.database,
      pool: {
        max: 3, // set pool max size
        min: 0, // set min pool size}
        idleTimeoutMillis: 30000
      }

    });
  }

  async query(query) {
    await this.pool.connect();
    const resp = await this.pool.query(query);

    return resp.recordset;
  }
}

module.exports = MSSQLHelper;
