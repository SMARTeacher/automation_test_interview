const GraphQLClient = require('graphql-request').GraphQLClient;

class GraphQLHelper {
  constructor(environmentSettings) {
    this.url = `${environmentSettings.BaseUrl}/graphql/`;
  }

  async makeCall(query, variables, headers = null) {
    try {
      const client = new GraphQLClient(this.url, { headers: headers });

      return await client.request(query, variables);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(`HEADERS: ${JSON.stringify(headers)}`);
      throw error;
    }
  }
}

module.exports = GraphQLHelper;
