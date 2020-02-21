const ApiHelper = require('./ApiHelper');

class GameApiHelper extends ApiHelper {
  constructor(environmentSettings) {
    super();
    this.url = `${environmentSettings.BaseUrl}/game-api`;
    this.routes = {
      character: (studentId) => `/v1/character/${studentId}`,
      characters: (studentId) => `/v3/characters/${studentId}`,
      answers: (studentId) => `/v1/users/${studentId}/answers`
    };
  }

  attachHeaders(options, jwtToken) {
    options.headers = options.headers || {};
    options.headers.Authorization = `Bearer ${jwtToken}`;
  }

  async character(studentId, jwtToken, queryString = null, methodType = 'GET', verbose = false) {
    const options = {
      uri: this.getUri(this.routes.character(studentId)),
      method: methodType,
      json: true,
      qs: queryString
    };
    this.attachHeaders(options, jwtToken);

    return await this.makeCall(options, verbose);
  }

  async updateCharacters(studentId, jwtToken, requestBody, methodType = 'POST', verbose = false) {
    const options = {
      uri: this.getUri(this.routes.characters(studentId)),
      method: methodType,
      body: requestBody,
      json: true,
    };
    this.attachHeaders(options, jwtToken);

    return await this.makeCall(options, verbose);
  }

  async answerQuestion(studentId, formBody, methodType = 'POST', verbose = false) {
    const options = {
      uri: this.getUri(this.routes.answers(studentId)),
      method: methodType,
      form: formBody,
    };

    return await this.makeCall(options, verbose);
  }
}

module.exports = GameApiHelper;
