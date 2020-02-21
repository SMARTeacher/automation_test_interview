const ApiHelper = require('./ApiHelper');

class EducationCdnHelper extends ApiHelper {
  constructor(environmentSettings) {
    super();
    this.url = environmentSettings.CdnUrl;
    this.skillsHash = 'a4b776b53c';
    this.routes = {
      curricula: `/education/skills/prod/${this.skillsHash}/curricula.json`,
      skillInfo: (skillId) => `/education/skills/prod/${this.skillsHash}/skills/${skillId}.json`
    };
  }

  async curricula(methodType = 'GET', verbose = false) {
    const options = {
      uri: this.getUri(this.routes.curricula),
      method: methodType,
      json: true,
    };

    return await this.makeCall(options, verbose);
  }

  async skillInfo(skillId, methodType = 'GET', verbose = false) {
    const options = {
      uri: this.getUri(this.routes.skillInfo(skillId)),
      method: methodType,
      json: true,
    };

    return await this.makeCall(options, verbose);
  }

  async getQuestionInfo(skillId, questionId) {
    const skillInfo = await this.skillInfo(skillId);
    const questionInfo = skillInfo.skill.questions.filter(
      question => question.ID === questionId
    )[0];
    if (questionInfo != null) {
      questionInfo.type = skillInfo.skill.template.type;
    }

    return questionInfo;
  }

  async getSkills(curriculumId, grade) {
    const curriculumDocTree = (await this.curricula()).curriculumDocTree[
      curriculumId
    ];

    if (!curriculumDocTree) {
      throw new Error(`Curriculum Id ${curriculumId} Not Found`);
    }

    let gradeSkillIds = null;
    Object.keys(curriculumDocTree).forEach(key => {
      const gradeCurriculum = curriculumDocTree[key];
      if (gradeCurriculum.grade === grade) {
        gradeSkillIds = gradeCurriculum.skills.map(skill => skill.ID);
      }
    });

    return gradeSkillIds;
  }
}

module.exports = EducationCdnHelper;
