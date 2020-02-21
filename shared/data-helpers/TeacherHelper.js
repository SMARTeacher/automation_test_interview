/* eslint-disable camelcase */
const testUtils = require('./../test-helpers/Util').Util;
const UserHelper = require('./UserHelper');

class TeacherHelper extends UserHelper {
  constructor(environmentSettings, apiHelpers, graphQLHelpers) {
    super(environmentSettings, apiHelpers, graphQLHelpers, 'teacher');
  }

  generateTeacher(teacherContext) {
    const teacher = {
      name: `AutTeach ${testUtils.getRandomGuid()}`,
      password: teacherContext.password || 'password',
    };
    teacher.email = `${teacher.name.replace(' ', '.')}@prodigygame.com`;

    return teacher;
  }

  async createTeacher(teacherContext) {
    const teacher = this.generateTeacher(teacherContext);
    const createTeacherResponse = await this.createUser(teacher);
    teacher.id = createTeacherResponse.userID;

    return teacher;
  }

  async updateCurriculumTree(teacher, authToken, curriculumTreeId) {
    const formBody = {
      'auth-key': authToken,
      'token': authToken,
      userID: teacher.id,
      'change_fields': JSON.stringify({ curriculumTreeID: curriculumTreeId })
    };

    return await this.apiHelpers.AccountApiHelper.user(teacher.id, formBody);
  }

  async setHomeSchool(teacher, authToken, country = null, province = null, reason_code = null) {
    const formBody = {
      'auth-key': authToken,
      'token': authToken,
      userID: teacher.id,
      school: 'No School',
      board: 'No Board',
      country: country || 'Canada',
      province: province || 'Ontario',
      reason_code: reason_code || 'DO_NOT_WANT_TO_SHARE',
    };

    return await this.apiHelpers.AccountApiHelper.locationDataManual(teacher.id, formBody);
  }

  async createClassroom(teacher, authToken, grade, className) {
    const variables = {
      grade: grade,
      name: className
    };

    return await this.graphQLHelpers
      .TeacherGraphQLHelper
      .createClassroom(variables, teacher.id, authToken);
  }

  async createAssignment(name, startDate, endDate, studentIds, classroomId, skillDetails, teacher, authToken) {
    const variables = {
      createInput: {
        classroomId: parseInt(classroomId),
        endDate: endDate,
        name: name,
        skills: skillDetails,
        startDate: startDate,
        studentIds: studentIds,
      }
    };

    return await this.graphQLHelpers
      .TeacherGraphQLHelper
      .createAssignment(variables, teacher.id, authToken);
  }

  async skipOnboardingTutorial(teacher, authToken) {
    const variables = {
      tutorialId: 0,
    };

    return await this.graphQLHelpers.TeacherGraphQLHelper.completeTutorial(variables, teacher.id, authToken);
  }
}

module.exports = TeacherHelper;
