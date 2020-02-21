const ApiHelper = require('./ApiHelper');

class MembershipApiHelper extends ApiHelper {
  constructor(environmentSettings) {
    super();
    this.url = `${environmentSettings.BaseUrl}/membership-api`;
    this.routes = {
      purchase: '/v1/purchase',
      userMemberships: (userID) => `/v1/users/${userID}/memberships`,
      cancel: (userID, membershipID) => `/v1/users/${userID}/memberships/${membershipID}/cancel`,
      assign: (userID, membershipID) => `/v1/users/${userID}/memberships/${membershipID}/assign`,
    };
  }

  async purchaseMembership(formBody, verbose = true) {
    const options = {
      uri: this.getUri(this.routes.purchase),
      method: 'POST',
      form: formBody,
      json: true,
    };

    return await this.makeCall(options, verbose);
  }

  async cancelMembership(userID, membershipID, formBody, verbose = true) {
    const options = {
      uri: this.getUri(this.routes.cancel(userID, membershipID)),
      method: 'PUT',
      form: formBody,
      json: true,
    };

    return await this.makeCall(options, verbose);
  }

  async getUserMemberships(userID, queryString, verbose = false) {
    const options = {
      uri: this.getUri(this.routes.userMemberships(userID)),
      method: 'GET',
      qs: queryString,
      json: true,
    };

    return await this.makeCall(options, verbose);
  }

  async assignMembership(userID, membershipID, queryString, verbose = true) {
    const options = {
      uri: this.getUri(this.routes.assign(userID, membershipID)),
      method: 'PUT',
      qs: queryString,
      json: true,
    };

    return await this.makeCall(options, verbose);
  }

  async generatePurchaseForm(
    stripeToken,
    teacher,
    students,
    postalCode,
    plan,
    country,
    hasActiveMembership = false,
    selected = true
  ) {
    const stringifiedPlanData = JSON.stringify(
      students.map(student => ({
        id: student.id,
        name: `${student.firstName} ${student.lastName}` || '',
        username: student.username,
        hasActiveMembership,
        userID: student.id,
        selected,
      }))
    );

    return {
      token: stripeToken,
      name: teacher.name,
      email: teacher.email,
      planId: plan.id,
      country,
      postalCode,
      [plan.planType]: stringifiedPlanData,
    };
  }

  async generateGetUserMembershipsQuery(token, userID) {
    return {
      'auth-key': token,
      token,
      userID
    };
  }

  async generateCancelMembershipForm(token, userID) {
    return {
      'auth-key': token,
      token,
      userID
    };
  }

  async generateAssignMembershipQuery(token, userID, studentID) {
    return {
      'auth-key': token,
      token,
      userID,
      studentID
    };
  }
}

module.exports = MembershipApiHelper;
