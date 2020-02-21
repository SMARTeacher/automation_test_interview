const ParentGraphQLHelper = require('./ParentGraphQLHelper');
const TeacherGraphQLHelper = require('./TeacherGraphQLHelper');

class GraphQLHelpers {
  constructor(settings) {
    this.ParentGraphQLHelper = new ParentGraphQLHelper(settings);
    this.TeacherGraphQLHelper = new TeacherGraphQLHelper(settings);
  }
}

module.exports = GraphQLHelpers;
