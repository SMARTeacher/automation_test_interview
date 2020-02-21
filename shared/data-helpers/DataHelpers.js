const StudentHelper = require('./StudentHelper');
const ParentHelper = require('./ParentHelper');
const TeacherHelper = require('./TeacherHelper');

const ApiHelpers = require('./api-helpers');
const GraphQLHelpers = require('./graphql-helpers');
const DBHelpers = require('./db-helpers');
const DynamoDBHelpers = require('./dynamo-helpers');

class DataHelpers {
  /* istanbul ignore next*/
  constructor(settings) {
    this.ApiHelpers = new ApiHelpers(settings);
    this.GraphQLHelpers = new GraphQLHelpers(settings);
    this.StudentHelper = new StudentHelper(
      settings,
      this.ApiHelpers,
      this.GraphQLHelpers
    );
    this.ParentHelper = new ParentHelper(
      settings,
      this.ApiHelpers,
      this.GraphQLHelpers
    );
    this.TeacherHelper = new TeacherHelper(
      settings,
      this.ApiHelpers,
      this.GraphQLHelpers
    );
    this.DBHelpers = new DBHelpers(settings);

    this.DynamoDBHelpers = new DynamoDBHelpers(settings);
  }
}

module.exports = Object.assign(
  {
    DBHelpers,
    DataHelpers
  },
  StudentHelper,
  ParentHelper,
  TeacherHelper
);
