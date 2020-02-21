const ApiHelper = require('./ApiHelper');

class WebApiHelper extends ApiHelper {
  constructor(environmentSettings) {
    super();
    this.url = `${environmentSettings.BaseUrl}/web-api`;
    this.routes = {
    };
  }
}

module.exports = WebApiHelper;
