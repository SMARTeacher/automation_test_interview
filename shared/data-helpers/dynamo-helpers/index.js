const AssignmentDBHelper = require('./AssignmentDBHelper');

class DynamoDBHelpers {
  constructor(settings) {
    this.AssignmentDBHelper = new AssignmentDBHelper(settings.DynamoDb);
  }
}

module.exports = DynamoDBHelpers;
