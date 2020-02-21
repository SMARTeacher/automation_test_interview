const GraphQLHelper = require('./GraphQLHelper');

class ParentGraphQLHelper extends GraphQLHelper {
  createHeader(userId, authToken) {
    return {
      'userid': userId,
      'token': authToken,
    };
  }

  async addExistingChildToParentMutation(variables, userId, authToken) {
    const query = `
    mutation AddExistingChildMutation($studentUserName: String!, $studentPassword: String!) {
      addExistingChildToParent(studentUserName: $studentUserName, studentPassword: $studentPassword) {
        student {
          id
          username
          password
          name
          parentEmail
          parentGoal {
            id
            goalTarget
            __typename
          }
          curriculum {
            id
            country {
              id
              name
              __typename
            }
            __typename
          }
          curriculumGrade {
            id
            grade
            __typename
          }
          __typename
        }
        __typename
      }
    }
    `;

    return await this.makeCall(query, variables, this.createHeader(userId, authToken));
  }

  async createGoalForStudent(variables, userId, authToken) {
    const query = `
    mutation CreateParentGoalForStudent($studentId: Int!, $goalTarget: Int!) {
      createParentGoalForStudent(studentId: $studentId, goalTarget: $goalTarget) {
        createdAt
        goalTarget
        id
        loggedInParentCanEdit
        questionsAnswered
        studentCompletedAt
        __typename
      }
    }
    `;

    return await this.makeCall(query, variables, this.createHeader(userId, authToken));
  }
}

module.exports = ParentGraphQLHelper;
