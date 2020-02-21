const testUtils = require('./../test-helpers/Util').Util;
const UserHelper = require('./UserHelper');

class ParentHelper extends UserHelper {
  constructor(environmentSettings, apiHelpers, graphQLHelpers) {
    super(environmentSettings, apiHelpers, graphQLHelpers, 'parent');
  }

  generateParent(parentContext) {
    const parent = {
      name: `AutParent ${testUtils.getRandomGuid()}`,
      password: parentContext.password || 'password',
    };
    parent.email = `${parent.name.replace(' ', '.')}@prodigygame.com`;

    return parent;
  }

  async createParent(parentContext) {
    const parent = this.generateParent(parentContext);
    const createParentResponse = await this.createUser(parent);
    parent.id = createParentResponse.userID;

    return parent;
  }

  async addExistingChild(student, parent, authToken) {
    const variables = {
      studentUserName: student.username,
      studentPassword: student.password,
    };

    return await this.graphQLHelpers
      .ParentGraphQLHelper
      .addExistingChildToParentMutation(variables, parent.id, authToken);
  }

  async createStudentGoal(student, goal, parent, authToken) {
    const variables = {
      studentId: student.id,
      goalTarget: goal,
    };

    return await this.graphQLHelpers
      .ParentGraphQLHelper
      .createGoalForStudent(variables, parent.id, authToken);
  }
}

module.exports = ParentHelper;
