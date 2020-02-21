const ApiHelper = require('./ApiHelper');

class GameAuthApiHelper extends ApiHelper {
  constructor(environmentSettings) {
    super();
    this.url = `${environmentSettings.BaseUrl}/game-auth-api`;
    this.routes = {
      users: '/v1/users',
      login: '/v1/login',
    };
    this.routes.teacher = (studentId) =>  `${this.routes.users}/${studentId}/teacher`;
  }

  async user(studentId, requestBody, headers, methodType = 'PATCH', verbose = false) {
    const options = {
      uri: this.getUri(this.routes.users + `/${studentId}`),
      method: methodType,
      form: requestBody,
      json: true,
      headers: headers,
    };

    return await this.makeCall(options, verbose);
  }

  async createUser(requestBody, methodType = 'POST', verbose = false) {
    const options = {
      uri: this.getUri(this.routes.users),
      method: methodType,
      form: requestBody,
      json: true,
    };

    return await this.makeCall(options, verbose);
  }

  async login(requestBody, methodType = 'POST', verbose = false) {
    const options = {
      uri: this.getUri(this.routes.login),
      method: methodType,
      form: requestBody,
      json: true,
    };

    return await this.makeCall(options, verbose);
  }

  async teacher(studentId, formBody, headers, methodType = 'POST', verbose = false) {
    const options = {
      uri: this.getUri(this.routes.teacher(studentId)),
      method: methodType,
      form: formBody,
      json: true,
      headers: headers,
    };

    return await this.makeCall(options, verbose);
  }
}

module.exports = GameAuthApiHelper;
