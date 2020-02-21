class UserHelper {
  constructor(environmentSettings, apiHelpers, graphQLHelpers, userType) {
    this.baseurl = environmentSettings.BaseUrl;
    this.apiHelpers = apiHelpers;
    this.graphQLHelpers = graphQLHelpers;
    this.userType = userType;
  }

  async login(user) {
    return await this.apiHelpers.SsoApiHelper.login(this.userType, user.email, user.password);
  }

  async createUser(user, marketingConsent = false) {
    return await this.apiHelpers.SsoApiHelper.signup(
      this.userType, user.name, user.email, user.password, 1, marketingConsent ? 1 : 0
    );
  }
}

module.exports = UserHelper;
