const ApiHelper = require('./ApiHelper');

class UserPhpApiHelper extends ApiHelper {
  constructor(environmentSettings) {
    super();
    this.url = `${environmentSettings.BaseUrl}/Includes/Server/Routers/user.php`;
  }

  async login(body, methodType = 'POST', verbose = false) {
    const options = {
      uri: this.url,
      method: methodType,
      form: body,
      json: true,
    };

    return await this.makeCall(options, verbose);
  }
}

module.exports = UserPhpApiHelper;
