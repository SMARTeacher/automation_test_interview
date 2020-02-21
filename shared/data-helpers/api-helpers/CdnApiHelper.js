const ApiHelper = require('./ApiHelper');

class CdnApiHelper extends ApiHelper {
  constructor(environmentSettings) {
    super();

    this.url = `${environmentSettings.CdnUrl}`;
    this.routes = {
      flags: `/flags/${environmentSettings.StatsDb.database}/prodigy-web.json?`,
    };
  }

  async getSkillAndQuestionData(cdnValue, methodType = 'GET', verbose = false) {
    const options = {
      uri: `${this.getUri(this.routes.flags)}cacheBust=${cdnValue}`,
      method: methodType,
      json: true,
    };

    return await this.makeCall(options, verbose);
  }
}

module.exports = CdnApiHelper;
