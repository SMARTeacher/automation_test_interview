const ApiHelper = require('./ApiHelper');

class EventsApiHelper extends ApiHelper {
  constructor(environmentSettings) {
    super();
    this.url = `${environmentSettings.BaseUrl}/events-api`;
    this.routes = {
      webEvent: '/v1/web-event',
    };
  }

  async postEvent(body, methodType = 'POST', verbose = false) {
    const options = {
      uri: this.getUri(this.routes.webEvent),
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

module.exports = EventsApiHelper;
