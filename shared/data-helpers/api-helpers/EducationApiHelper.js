const ApiHelper = require('./ApiHelper');

class EducationApiHelper extends ApiHelper {
  constructor(environmentSettings) {
    super();
    this.url = `${environmentSettings.BaseUrl}/education-api`;
    this.routes = {
      status: () => '/status',
      users: (studentId, authToken) => `/v1/users/${studentId}?token=${authToken}`,
      placementTestInstance: (placementTestInstanceId, studentId) =>
        `/v2/placement-tests/instance/${placementTestInstanceId}/${studentId}`
    };
  }

  async status(methodType = 'GET', verbose = false) {
    return await this.makeCall({
      uri: this.getUri(this.routes.status()),
      method: methodType,
      json: true,
    }, verbose);
  }

  async users(studentId, authToken, methodType = 'GET', verbose = false) {
    const options = {
      uri: this.getUri(this.routes.users(studentId, authToken)),
      method: methodType,
      json: true,
    };

    return await this.makeCall(options, verbose);
  }

  async placementTestInstance(placementTestInstanceId, studentId, formBody, methodType = 'POST', verbose = false) {
    const options = {
      uri: this.getUri(this.routes.placementTestInstance(placementTestInstanceId, studentId)),
      method: methodType,
      form: formBody,
      json: true,
    };

    return await this.makeCall(options, verbose);
  }
}

module.exports = EducationApiHelper;
