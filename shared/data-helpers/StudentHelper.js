/* eslint-disable camelcase */
const testUtils = require('./../test-helpers/Util').Util;

class StudentHelper {
  constructor(environmentSettings, apiHelpers, graphQLHelpers = null) {
    this.baseurl = environmentSettings.BaseUrl;
    this.apiHelpers = apiHelpers;
    this.graphQLHelpers = graphQLHelpers;
  }

  defaultPets() {
    return [
      {
        ID: 112,
        stars: 0,
        level: 1,
        levelCaught: 1,
        team: 1,
        isPVPTeam: true
      },
      {
        ID: 41,
        stars: 0,
        level: 1,
        levelCaught: 1,
        team: 2,
        isPVPTeam: true
      }
    ];
  }

  defaultInventory() {
    return {
      weapon: [
        {
          ID: 25
        }
      ],
      item: [
        {
          ID: 5
        }
      ],
      outfit: [],
      relic: [],
      boots: [],
      hat: [],
      currency: [
        {
          ID: 2
        }
      ],
      fossil: [],
      follow: [],
      mount: [],
      key: [
        {
          ID: 13
        }
      ],
      spellRelic: []
    };
  }

  _try(func, fallbackValue) {
    try {
      var value = func();

      return value === null || value === undefined ? fallbackValue : value;
    } catch (e) {
      return fallbackValue;
    }
  }

  state(studentContext) {
    return {
      tutorial: {
        0: this._try(() => studentContext.state.tutorial[0], 1)
      },
      world: {
        dailyQuests: {
          0: {
            questId: 0,
            dateId: 17805,
            questState: 0
          }
        },
        bounties: [139286215.35283777, 116534265.78271605, 100216580.4872428]
      },
      zone: {
        house: {
          0: {
            date: '10012018',
            flags: [1, 1, 1, 1, 1],
            rewards: 0
          },
          quest: {
            ID: 2
          }
        },
        lamplight: {
          2: '10012018'
        },
        academy: {
          0: {
            date: '10012018',
            flags: [1, 1, 1, 1, 1],
            rewards: 0
          },
          quest: {
            ID: 2
          }
        }
      },
      breadcrumbs: {
        FEATURE_BATTLE_TUTORIAL: this._try(() => studentContext.state.breadcrumbs.FEATURE_BATTLE_TUTORIAL, 11)
      }
    };
  }

  generateStudent(studentContext) {
    const student = {
      data: {
        new: true,
        stars: studentContext.stars || 10, // TODO: change to only accept level and calculate stars
        hp: 600,
        storedMemberStars: 5,
        versionID: 21,
        settings: {
          bgmVolume: 0.3,
          sfxVolume: 0.9,
          voiceVolume: 1
        },
        school: 'none',
        startDate: 1538411968202,
        level: studentContext.level || 2, // TODO: change to only accept level and calculate stars
        zone: 'forest-C8',
        allowsHouseVisitors: false,
        team: 0,
        energy: 3,
        spellbook: [31],
        gold: 100000
      },
      tutorial: {
        zones: {},
        menus: {
          14: [1],
          23: [1]
        }
      },
      equipment: {},
      pets: this.defaultPets(),
      inventory: this.defaultInventory(),
      appearance: {
        name: {
          first: 4,
          middle: 748,
          last: 872
        },
        gender: 'male',
        hair: {
          style: 18,
          color: 20
        },
        skinColor: 4,
        eyeColor: 2,
        face: 2
      },
      state: this.state(studentContext),
      chosenGrade: studentContext.grade || 1,
      grade: studentContext.grade || 1,
      password: studentContext.password || 'password',
      curriculumId: studentContext.curriculumId || 1,
      classCode: studentContext.classCode || null,
      parentEmail: studentContext.parentEmail || 'autstudparent1@prodigygame.com',
      firstName: studentContext.firstName || 'autstud',
      lastName: studentContext.lastName || 1
    };

    return student;
  }

  async createStudentUser(student) {
    const requestBody = {
      data: '{ "new": true }',
      equipment: '{}',
      pets: '[]',
      inventory: JSON.stringify(student.inventory),
      appearance: JSON.stringify(student.appearance),
      chosenGrade: student.grade,
      grade: student.grade,
      password: student.password,
      curriculumTreeID: student.curriculumId,
      classCode: student.classCode,
      parentEmail: student.parentEmail,
      first_name: student.firstName,
      last_name: student.lastName
    };

    return await this.apiHelpers.GameAuthApiHelper.createUser(requestBody);
  }

  async getCharacter(student, jwtToken) {
    const queryString = {
      isMember: student.isMember ? 1 : 0
    };

    return await this.apiHelpers.GameApiHelper.character(student.id, jwtToken, queryString);
  }

  async createStudent(studentContext) {
    const student = this.generateStudent(studentContext);

    const createStudentResponse = await this.createStudentUser(student);
    student.id = createStudentResponse.userID;
    student.username = createStudentResponse.username;
    let loginResponse = await this.login(student);
    await this.getCharacter(student, loginResponse.token);
    await this.updateCharacter(student, loginResponse.token);

    return student;
  }

  async login(student) {
    const requestBody = {
      username: student.username,
      password: student.password
    };

    return await this.apiHelpers.GameAuthApiHelper.login(requestBody);
  }

  async updateCharacter(student, jwtToken) {
    const body = {
      data: JSON.stringify({
        tutorial: student.tutorial,
        appearance: student.appearance,
        pets: student.pets,
        data: student.data,
        inventory: student.inventory,
        state: student.state,
        equipment: student.equipment
      })
    };

    return await this.apiHelpers.GameApiHelper.updateCharacters(student.id, jwtToken, body);
  }

  async getUserEducationInfo(student, authToken) {
    return await this.apiHelpers.EducationApiHelper.users(student.id, authToken);
  }

  async attachToClass(student, classCode, jwtToken) {
    const formBody = {
      classCode: classCode
    };

    await this.apiHelpers.GameAuthApiHelper.teacher(student.id, formBody, {
      Authorization: `Bearer ${jwtToken}`
    });
  }

  async completeAllPlacementTestStrands(student, gradeToMaster, userEducationResponse, authToken) {
    const placementTestComposition = userEducationResponse.placementTestData.placementTestComposition;
    const strands = placementTestComposition[gradeToMaster];
    let requestBody = {};
    for (let inc = 0; inc < strands.length; inc += 1) {
      const strand = strands[inc];
      for (let skillInc = 0; skillInc < strand.skillIds.length; skillInc += 1) {
        const skillId = strand.skillIds[skillInc];
        requestBody = {
          currentStrandId: strand.strandId,
          currentMomentum: null,
          currentGrade: gradeToMaster,
          currentSkillId: skillId,
          totalCorrect: 2,
          totalIncorrect: 0,
          potentialPlacementGradeNum: gradeToMaster,
          placedStrandCompletePercentage: 100,
          placedStrandGradeNum: gradeToMaster,
          finalGradeNumCompletePercentage: 100,
          finalGradeNumPlaced: gradeToMaster,
          token: authToken,
          userID: student.id
        };

        await this.apiHelpers.EducationApiHelper.placementTestInstance(
          userEducationResponse.placementTestInstanceID,
          student.id,
          requestBody
        );
      }
    }

    return requestBody;
  }

  async finalizePlacementTest(student, gradeToMaster, userEducationResponse, authToken, bearerToken) {
    const placementTestRequestBody = await this.completeAllPlacementTestStrands(
      student,
      gradeToMaster,
      userEducationResponse,
      authToken
    );

    placementTestRequestBody.placedStrandCompletePercentage = 'null';
    placementTestRequestBody.placedStrandGradeNum = 'null';
    placementTestRequestBody.finalGradeNumCompletePercentage = 'null';
    placementTestRequestBody.finalGradeNumPlaced = 'null';
    await this.apiHelpers.EducationApiHelper.placementTestInstance(
      userEducationResponse.placementTestInstanceID,
      student.id,
      placementTestRequestBody
    );

    const userRequestBody = {
      currentSkill: 'null',
      placementTestID: 'null',
      momentum: 0,
      clientVersion: '',
      grade: gradeToMaster,
      'auth-key': authToken,
      token: authToken
    };
    await this.apiHelpers.GameAuthApiHelper.user(student.id, userRequestBody, {
      Authorization: `Bearer ${bearerToken}`
    });

    const setPlacementTestRequestBody = {
      token: authToken
    };
    await this.apiHelpers.AccountApiHelper.placementTest(student.id, gradeToMaster, setPlacementTestRequestBody);
  }

  parseOutGen2Skillinfo(gen2SkillInfo) {
    const skill = {
      id: gen2SkillInfo.ID,
      version: 2,
      nFactor: gen2SkillInfo.data.nFactor,
      questions: gen2SkillInfo.data.questions.map(question => {
        const qEvaluationData = question.answerRule.all[0].evaluationData;
        const qinfo = {
          id: question.id,
          type: question.answerRule.all[0].type === 'NumericStringEquivalenceStrategy' ? 'tb' : 'mc',
          gen2Answer: `{"${qEvaluationData.componentId}":{"value":"${qEvaluationData.value}"}}`,
        };

        qinfo.answers = [
          qinfo.type === 'tb' ?
            qEvaluationData.value :
            String.fromCharCode( // Attempt to get the option letter
              97 +
              JSON.stringify(gen2SkillInfo.data.template)
                .match(/(\{"type":"MultipleChoiceTextOption".*?\[\]\})/g)
                .map(s => {
                  const opt = JSON.parse(s);

                  return opt.props.key;
                })
                .indexOf(qEvaluationData.value)
            )
        ];

        return qinfo;
      }),
      revisionId: gen2SkillInfo.revisionID
    };

    return skill;
  }

  async getSkillInfo(skillId) {
    if (this.educationstatus == null) {
      this.educationstatus = await this.apiHelpers.EducationApiHelper.status('GET');
    }
    if (this.gen2Manifest == null) {
      const gen2ReleaseManifestUri = this.educationstatus.data.educationDataManifest.url;

      this.gen2Manifest = await this.apiHelpers.EducationCdnHelper.makeCall({
        uri: gen2ReleaseManifestUri,
        method: 'GET',
        json: true
      }, false);
    }

    if (skillId in this.gen2Manifest.skills) {
      return this.parseOutGen2Skillinfo(await this.apiHelpers.EducationCdnHelper.makeCall({
        uri: this.gen2Manifest.skills[skillId].url,
        method: 'GET',
        json: true
      }, false));
    }

    const skillInfo = (await this.apiHelpers.EducationCdnHelper.skillInfo(skillId)).skill;

    return {
      id: skillId,
      version: 1,
      nFactor: skillInfo.nFactor,
      questions: skillInfo.questions.map(q => {
        return {
          id: q.ID,
          answers: q.answers,
          type: skillInfo.template.type
        };
      }),
      revisionId: null
    };
  }

  async generateAnswerModel(student, authToken, skillId, algorithmInfo, chance) {
    const skillInfo = await this.getSkillInfo(skillId);
    const question = algorithmInfo.questionId ?
      skillInfo.questions.filter(q => q.id === algorithmInfo.questionId)[0] :
      skillInfo.questions[Math.floor(Math.random() * skillInfo.questions.length)];
    const respTime = testUtils.getRandomInt(10, 250);

    const body = {
      'skillID': skillId,
      'questionID': question.id,
      'hintID': -1,
      'nFactor': skillInfo.nFactor,
      'questionType': `atq-${question.type}`,

      'curriculumGradeNum': student.grade,
      'chosenCurriculumGradeNum': student.grade,

      'currentLocationId': student.locationId != null ? student.locationId : 1,
      'currentCurriculumId': student.curriculumId,

      'type': algorithmInfo.type,
      'typeVersion': algorithmInfo.version || 1.0,
      'typeReferringId': null,

      'hwID': algorithmInfo.hwId != null ? algorithmInfo.hwId : 0,
      'goalId': algorithmInfo.goalId != null ? algorithmInfo.goalId : null,
      'expectationId': algorithmInfo.expectationId != null ? algorithmInfo.expectationId : null,

      'ownerIDs[]': algorithmInfo.classIds != null ? algorithmInfo.classIds : [],

      'timezoneOffset': new Date().getTimezoneOffset(),

      'userAnswer[]': question.answers,
      'wasCorrect': true,
      'respTime': respTime,
      'strandId': 1337,
      'currentTheta': -1,

      'chances[0][chance]': 1,
      'chances[0][userAnswer]': `${question.answers}`,
      'chances[0][wasCorrect]': true,
      'chances[0][respTime]': respTime,
      'chances[0][hintBubbleToggleDelay]': undefined,
      'chances[0][hintBubbleToggledManually]': undefined,
      'chances[0][gen2AnswerInput]': question.gen2Answer,

      'updatedUserAbility[0][skill_id]': skillId,
      'updatedUserAbility[0][theta]': -1,
      'updatedUserAbility[0][decay]': 0,
      'updatedUserAbility[0][lock]': 0,
      'updatedUserAbility[0][correct]': 1,
      'updatedUserAbility[0][incorrect]': 0,
      'updatedUserAbility[0][time_spent]': respTime,
      'updatedUserAbility[0][date_mastered]': '',

      'eventOccurrenceID': testUtils.getRandomGuid(),

      'wasAnsweredOnMobile': false,
      'isMember': false,
      'playLocation': 'home',
      'sessionID': authToken,

      'numQuestions': 0,
      'awardPrize': false,
      'awardInstantWin': false,

      'skillRevisionID': question.revisionId,
      'gen2AnswerInput': question.gen2Answer,
    };

    if (chance === 2) {
      const firstChanceRespTime = testUtils.getRandomInt(10, respTime);
      body['chances[1][chance]'] =  2;
      body['chances[1][userAnswer]'] =  body['chances[0][userAnswer]'];
      body['chances[1][wasCorrect]'] = true;
      body['chances[1][respTime]'] = respTime - firstChanceRespTime;
      body['chances[1][hintBubbleToggleDelay]'] = 3;
      body['chances[1][hintBubbleToggledManually]'] = false;

      body['chances[0][userAnswer]'] = `${question.answers}`;
      body['chances[0][wasCorrect]'] = false;
      body['chances[0][respTime]'] = firstChanceRespTime;
      body['chances[0][gen2AnswerInput]'] = question.gen2Answer;
    }

    return body;
  }
}

module.exports = StudentHelper;
