const ApiHelper = require('./ApiHelper');

class ReportApiHelper extends ApiHelper {
  constructor(environmentSettings) {
    super();
    this.url = `${environmentSettings.BaseUrl}/report-api`;
    this.routes = {
      topicReport: (classRoomId, curriculumGradeId, authToken, userId) =>
        `/v1/classroom/${classRoomId}/topic-report/${curriculumGradeId}?
        auth-key=${authToken}&token=${authToken}&userID=${userId}`
    };
  }

  async topicReport(classRoomId, curriculumGradeId, authToken, userId, methodType = 'GET', verbose = false) {
    const options = {
      uri: this.getUri(this.routes.topicReport(classRoomId, curriculumGradeId, authToken, userId)),
      method: methodType,
      json: true,
    };

    return await this.makeCall(options, verbose);
  }
}

module.exports = ReportApiHelper;
