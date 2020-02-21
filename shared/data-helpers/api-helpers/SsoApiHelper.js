const ApiHelper = require('./ApiHelper');

// SsoApiHelper breaks the typical convention of ApiHelpers
// This is because it needs to know quite a bit of business logic to make this a practical helper.
// If we need it to be more transparent we can set up a discussion to work through how it can be changed to fit your needs.
class SsoApiHelper extends ApiHelper {
  constructor(environmentSettings) {
    super();
    this.url = environmentSettings.BaseUrl.replace(/https:\/\/.*?\.(.*)/, 'https://sso.$1');
    this.domain = environmentSettings.BaseUrl.replace(/https:\/\/.*?\.(.*)/, '$1');

    this.baseUrl = environmentSettings.BaseUrl;
    this.routes = {
      signup: '/signup',
      login: '/login',
    };

    this.authUrl = (userType) => {
      const authMapping = {
        'parent': 'parent',
        'teacher': 'dashboard'
      };

      if (!(userType in authMapping)) {
        throw Error(`User Type ${userType} Not Supported`);
      }

      return `${this.baseUrl}/${authMapping[userType]}/auth`;
    };
  }

  async getAuthenticityToken(url) {
    const cookieJar = this.jar();
    cookieJar.setCookie(`sw.track_id=1337; path=/; domain=${this.domain};`, this.baseUrl);
    const body = (await this.makeCall({
      uri: url,
      jar: cookieJar
    }, true)).body;

    return {
      authenticityToken: body.match(/.*authenticity_token.+?value="(.*)".*/)[1],
      cookieJar
    };
  }

  async signup(userType, name, email, password, tosConsent, marketingConsent) {
    const signupUrl = this.getUri(this.routes.signup);
    const {
      authenticityToken, cookieJar
    } = await this.getAuthenticityToken(signupUrl);

    const options = {
      uri: signupUrl,
      method: 'POST',
      followRedirect: false,
      jar: cookieJar,
      form: {
        'authenticity_token': authenticityToken,
        'livedata_user': {
          usertype: userType,
          name: name,
          email: email,
          'plain_password': password,
          'terms_of_service': tosConsent,
          'marketing_consent': marketingConsent
        }
      }
    };
    const signupResponse = await this.makeCall(options, true);

    if (signupResponse.statusCode != 302) {
      this.printOptions(options);
      throw new Error(signupResponse.body); // TODO: 1:print only the contents of the error messages
    }

    return await this.getSessionInfo(userType, cookieJar);
  }

  async login(userType, username, password) {
    const loginUrl = this.getUri(this.routes.login);
    const {
      authenticityToken, cookieJar
    } = await this.getAuthenticityToken(loginUrl);
    const options = {
      uri: loginUrl,
      method: 'POST',
      followRedirect: false,
      jar: cookieJar,
      form: {
        'authenticity_token': authenticityToken,
        username: username,
        password: password
      }
    };
    const loginResponse = await this.makeCall(options, true);

    if (loginResponse.statusCode != 302) {
      this.printOptions(options);
      throw new Error(loginResponse.body); // TODO: 1:print only the contents of the error messages
    }

    return await this.getSessionInfo(userType, cookieJar);
  }

  async getSessionInfo(userType, cookieJar) {
    const authUri = (await this.makeCall({
      uri: this.authUrl(userType),
      followRedirect: false,
      jar: cookieJar
    }, true)).headers.location;
    const callbackUri = (await this.makeCall({
      uri: authUri,
      followRedirect: false,
      jar: cookieJar
    }, true)).headers.location;
    await this.makeCall({
      uri: callbackUri,
      jar: cookieJar
    }, true);

    return JSON.parse(
      decodeURIComponent(
        cookieJar.getCookieString(this.baseUrl)
      ).match(/sw.session=(.*?})/)[1]
    );
  }
}

module.exports = SsoApiHelper;
