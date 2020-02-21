const GraphQLHelper = require('./GraphQLHelper');

class TeacherGraphQLHelper extends GraphQLHelper {
  createHeader(userId, authToken) {
    return {
      'userid': userId,
      'token': authToken,
    };
  }

  async createClassroom(variables, userId, authToken) {
    const query = `
    mutation createClassroom($grade: Int!, $name: String!) {
      createClassroom(curriculumGradeId: $grade, name: $name) {
        id
        name
        code
        isArchived
        createdAt
        curriculumGrade {
          id
        }
        placementTests {
          id
          startDate
          endDate
        }
      }
    }
    `;

    return await this.makeCall(query, variables, this.createHeader(userId, authToken));
  }

  async createPlan(variables, userId, authToken) {
    const query = `
    mutation createPlanMutation($input: CreatePlanInput!) {
      createPlan(input: $input) {
        id
      }
    }
    `;

    return await this.makeCall(query, variables, this.createHeader(userId, authToken));
  }

  async createAssignment(variables, userId, authToken) {
    const query = `
    mutation createAssignmentMutation($createInput: CreateAssignmentInput!) {
      createAssignment(input: $createInput) {
        assignment {
          id
        }
      }
    }
    `;

    return await this.makeCall(query, variables, this.createHeader(userId, authToken));
  }

  async completeTutorial(variables, userId, authToken) {
    const query = `
    mutation completeTutorial($tutorialId: Int!) {
      completeTutorial(tutorialId: $tutorialId) {
        tutorialId
        completedAt
      }
    }
    `;

    return await this.makeCall(query, variables, this.createHeader(userId, authToken));
  }

  async studentUsageQuery(variables, userId, authToken) {
    const query = `
    query studentUsageQuery(
      $classroomId: Int!
      $startDate: Date!
      $endDate: Date!
    ) {
      classroom(input: { id: $classroomId }) {
        id
        students {
          id
          name
          activity(input: { startDate: $startDate, endDate: $endDate }) {
            date
            questionsAtHome
            questionsAtSchool
            questionsCorrect
          }
        }
      }
    }
    `;

    return await this.makeCall(query, variables, this.createHeader(userId, authToken));
  }
}

module.exports = TeacherGraphQLHelper;
