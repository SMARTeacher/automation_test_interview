const request = require('request-promise');

async function makeCall(options) {
  try {
    return await request(options);
  } catch (error) {
    /* eslint-disable no-console */
    console.log(`Uri: ${options.uri}`);
    console.log(`Method: ${options.method}`);
    console.log(`Form: ${JSON.stringify(options.form)}`);
    console.log(`Body: ${JSON.stringify(options.body)}`);
    /* eslint-enable no-console */
    throw error;
  }
}

module.exports = { makeCall };
