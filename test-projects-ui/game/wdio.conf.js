const configHelpers = require('./../configHelpers');

exports.config = configHelpers.applyAppSettings({
  specs: ['./game/tests/**Tests.js'],
  mochaOpts: {
    require: './game/hooks.js',
  }
});
