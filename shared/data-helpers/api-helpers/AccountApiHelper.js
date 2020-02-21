const ApiHelper = require('./ApiHelper');

class AccountApiHelper extends ApiHelper {
  constructor(environmentSettings) {
    super();
    this.url = `${environmentSettings.BaseUrl}/account-api`;
    this.routes = {
      user: (userId, route = '') => `/v2/user/${userId}${route}`,
      users: (studentId, authToken) => `/v1/users/${studentId}?token=${authToken}`,
      placementTest: (studentId, grade) => `/v2/users/${studentId}/education/${grade}/placement-test`,
      parents: '/v2/parents',
      teachers: '/v2/teachers',
      login: '/v2/login/dashboard',
    };
    this.routes.locationData = (userId, route = '') => `${this.routes.user(userId, `/location-data${route}`)}`;
    this.routes.locationDataManual = (userId) => `${this.routes.locationData(userId, '/manual')}`;
  }

  async placementTest(studentId, grade, formBody, methodType = 'POST', verbose = false) {
    const options = {
      uri: this.getUri(this.routes.placementTest(studentId, grade)),
      method: methodType,
      form: formBody,
      json: true,
    };

    return await this.makeCall(options, verbose);
  }

  async parents(queryString, methodType = 'POST', verbose = false) {
    const options = {
      uri: this.getUri(this.routes.parents),
      method: methodType,
      qs: queryString,
      json: true,
    };

    return await this.makeCall(options, verbose);
  }

  async teachers(queryString, methodType = 'POST', verbose = false) {
    const options = {
      uri: this.getUri(this.routes.teachers),
      method: methodType,
      qs: queryString,
      json: true,
    };

    return await this.makeCall(options, verbose);
  }

  async login(body, methodType = 'POST', verbose = false) {
    const options = {
      uri: this.getUri(this.routes.login),
      method: methodType,
      form: body,
      json: true,
    };

    return await this.makeCall(options, verbose);
  }

  async user(userId, formBody, methodType = 'POST', verbose = false) {
    const options = {
      uri: this.getUri(this.routes.user(userId)),
      method: methodType,
      form: formBody,
      json: true,
    };

    return await this.makeCall(options, verbose);
  }

  async locationDataManual(userId, formBody, methodType = 'POST', verbose = false) {
    const options = {
      uri: this.getUri(this.routes.locationDataManual(userId)),
      method: methodType,
      form: formBody,
      json: true,
    };

    return await this.makeCall(options, verbose);
  }
}

module.exports = AccountApiHelper;
