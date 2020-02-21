const request = require('request-promise');

class ApiHelper {
  constructor() {
    this.url = '';
  }

  async makeCall(options, verbose = false) {
    try {
      if (verbose) {
        options.simple = false;
        options.resolveWithFullResponse = true;
      }

      return await request(options);
    } catch (error) {
      this.printOptions(options);
      throw error;
    }
  }

  printOptions(options) {
    /* eslint-disable no-console */
    console.log(`Uri: ${options.uri}`);
    console.log(`Method: ${options.method}`);
    console.log(`Form: ${JSON.stringify(options.form)}`);
    console.log(`Body: ${JSON.stringify(options.body)}`);
    console.log(`QueryString: ${JSON.stringify(options.qs)}`);
    console.log(`Headers: ${JSON.stringify(options.headers)}`);
    /* eslint-enable no-console */
  }

  getUri(route) {
    return `${this.url}${route}`;
  }

  jar() {
    return request.jar();
  }
}

module.exports = ApiHelper;
