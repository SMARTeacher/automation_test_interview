var AWS = require('aws-sdk');

class DynamoDBHelper {
  constructor(tableName) {
    this.tableName = tableName;

    AWS.config.update({ region: 'us-east-1' });

    this.docClient = new AWS.DynamoDB.DocumentClient();
  }

  async query(params, verbose = false) {
    const response = await this.docClient.query(params).promise();

    return verbose ? response : response.Items;
  }

  async batchWrite(tableName, requests) {
    const maxRequestSize = 20;
    const promises = [];
    for (let inc = 0; inc < requests.length; inc += maxRequestSize) {
      promises.push(this.docClient.batchWrite(
        { RequestItems: { [tableName]: requests.slice(inc, inc + maxRequestSize) } }
      ).promise());
    }

    return await Promise.all(promises);
  }
}

module.exports = DynamoDBHelper;
