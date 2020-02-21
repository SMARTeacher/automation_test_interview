const EducationCdnHelper = require('./EducationCdnHelper');
const GameApiHelper = require('./GameApiHelper');
const GameAuthApiHelper = require('./GameAuthApiHelper');
const EducationApiHelper = require('./EducationApiHelper');
const AssignmentApiHelper = require('./AssignmentApiHelper');
const AccountApiHelper = require('./AccountApiHelper');
const WebApiHelper = require('./WebApiHelper');
const MembershipApiHelper = require('./MembershipApiHelper');
const UserPhpApiHelper = require('./UserPhpApiHelper');
const CdnApiHelper = require('./CdnApiHelper');
const EventsApiHelper = require('./EventsApiHelper');
const SsoApiHelper = require('./SsoApiHelper');
const ReportApiHelper = require('./ReportApiHelper');

class ApiHelpers {
  constructor(settings) {
    this.EducationCdnHelper = new EducationCdnHelper(settings);
    this.GameApiHelper = new GameApiHelper(settings);
    this.GameAuthApiHelper = new GameAuthApiHelper(settings);
    this.EducationApiHelper = new EducationApiHelper(settings);
    this.AssignmentApiHelper = new AssignmentApiHelper(settings);
    this.AccountApiHelper = new AccountApiHelper(settings);
    this.WebApiHelper = new WebApiHelper(settings);
    this.CdnApiHelper = new CdnApiHelper(settings);
    this.MembershipApiHelper = new MembershipApiHelper(settings);
    this.UserPhpApiHelper = new UserPhpApiHelper(settings);
    this.EventsApiHelper = new EventsApiHelper(settings);
    this.SsoApiHelper = new SsoApiHelper(settings);
    this.ReportApiHelper = new ReportApiHelper(settings);
  }
}

module.exports = ApiHelpers;
