const ApiHelper = require('./ApiHelper');

class AssignmentApiHelper extends ApiHelper {
  constructor(environmentSettings) {
    super();
    this.url = `${environmentSettings.BaseUrl}/assignment-api`;
    this.routes = {
      assignmentDetails: (studentId, authToken) =>
        `/v1/user/${studentId}/assignments/active?token=${authToken}&userID=${studentId}`
    };
  }

  async assignmentDetails(assignmentID, teacherId, authToken, methodType = 'GET', verbose = false) {
    const options = {
      uri: this.getUri(this.routes.assignmentDetails(assignmentID, teacherId, authToken)),
      method: methodType,
      json: true,
    };

    return await this.makeCall(options, verbose);
  }
}

module.exports = AssignmentApiHelper;
