const AnswersDBHelper = require('./AnswersDBHelper');
const EducationDBHelper = require('./EducationDBHelper');
const StatsDBHelper = require('./StatsDBHelper');
const WebDBHelper = require('./WebDBHelper');
const LiveDataDBHelper = require('./LiveDataDBHelper');
const UserAbilityDBHelper = require('./UserAbilityDBHelper');
const LiveReportingDBHelper = require('./LiveReportingDBHelper');

class DBHelpers {
  constructor(settings) {
    if (settings.AnswersDb) {
      this.AnswersDBHelper = new AnswersDBHelper(settings.AnswersDb);
    }
    if (settings.WebDb) {
      this.WebDBHelper = new WebDBHelper(settings.WebDb);
    }
    if (settings.EducationDb) {
      this.EducationDBHelper = new EducationDBHelper(settings.EducationDb);
    }
    if (settings.StatsDb) {
      this.StatsDBHelper = new StatsDBHelper(settings.StatsDb);
    }
    if (settings.LiveDataDb) {
      this.LiveDataDBHelper = new LiveDataDBHelper(settings.LiveDataDb);
    }
    if (settings.UserAbilityDb) {
      this.UserAbilityDBHelper = new UserAbilityDBHelper(settings.UserAbilityDb);
    }
    if (settings.LiveReportingDb) {
      this.LiveReportingDBHelper = new LiveReportingDBHelper(settings.LiveReportingDb);
    }
  }
}

module.exports = DBHelpers;
