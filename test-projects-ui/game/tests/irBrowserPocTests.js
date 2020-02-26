const testCache = require('../../../shared/test-helpers/Cache');
const Alfred = require('../helpers/Alfred');
const util = require('./../../../shared/test-helpers/Util').Util;

describe('PoC', function () {
  describe('When I login with a user, select playing at home and then a world', function () {
    it('Then should be able to do battle with something', async function () {
      const student = await testCache.StudentHelper.createStudent({
        curriculumId: 1,
        grade: 6,
        classCode: null,
        state: {
          tutorial: {
            0: 2,
          },
          breadcrumbs: {
            FEATURE_BATTLE_TUTORIAL: 235,
          },
        },
        level: 12,
        stars: 250,
      });
      const loginResponse = await testCache.StudentHelper.login(student);
      await testCache.StudentHelper.updateCharacter(
        student,
        loginResponse.token
      );

      console.log(`${student.username}: ${student.id}`);

      console.log(await util.retryUntilSuccessOrTimeout(
        async () => {
          return await Alfred.collectAutomationObjects();
        },
        30000,
        1000
      ));
    });
  });
});
