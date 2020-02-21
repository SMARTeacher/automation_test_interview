const DBHelper = require('./DBHelper');

class EducationDBHelper extends DBHelper {
  constructor(dbConfig) {
    super(dbConfig);
  }

  async getPlacementTest(curriculumId) {
    return await this.query(
      `SELECT * FROM placement_test WHERE curriculum_doc_id = ${curriculumId}`
    );
  }

  async getPlacementTestInstance(curriculumId, onlyActive = false) {
    return await this.query(
      `
      SELECT pti.* FROM placement_test AS pt
      INNER JOIN placement_test_instance AS pti 
        ON pti.placement_test_id = pt.id
      WHERE pt.curriculum_doc_id = ${curriculumId}
        ${onlyActive ? 'AND pti.started_at <= NOW() AND NOW() <= pti.ended_at' : ''};
      `
    );
  }

  async getPlacementTestComposition(curriculumId) {
    return await this.query(
      `
    SELECT ptsc.* FROM placement_test AS pt
    INNER JOIN placement_test_skill_composition AS ptsc 
      ON ptsc.placement_test_id = pt.id
    WHERE pt.curriculum_doc_id = ${curriculumId};
    `);
  }
}

module.exports = EducationDBHelper;
