const DynamoDBHelper = require('./DynamoDBHelper');

class AssignmentDBHelper extends DynamoDBHelper {
  constructor(dynamoDBSettings) {
    super(dynamoDBSettings.assignmentTableName);
  }

  async getAssignmentData(homeworkId, verbose = false) {
    const params = {
      TableName: this.tableName,
      KeyConditionExpression: 'id = :id',
      ConsistentRead: true,
      ExpressionAttributeValues: { ':id': parseInt(homeworkId) }
    };

    return await this.query(params, verbose);
  }
}

module.exports = AssignmentDBHelper;
