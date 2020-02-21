const fs = require('fs');
const path = require('path');
const process = require('process');
const testCache = require('./../test-helpers/Cache');
const dataHelpers = require('./../data-helpers/DataHelpers');
const testHelpers = require('./../test-helpers/TestHelpers');
const psConfig = require('@prodigy/config');

function overlaySettings(base, coating) {
  const surface = base;
  const keys = Object.keys(coating);
  for (let ind = 0; ind < keys.length; ind += 1) {
    const key = keys[ind];
    if (typeof coating[key] === 'object') {
      overlaySettings(surface[key], coating[key]);
    } else {
      surface[key] = coating[key];
    }
  }
}

function populateSettings(surface) {
  const keys = Object.keys(surface);
  const rex = /<.*?>/g;

  for (let ind = 0; ind < keys.length; ind += 1) {
    const key = keys[ind];
    if (typeof surface[key] === 'object') {
      populateSettings(surface[key]);
    } else {
      const matches = surface[key].match(rex);
      if (matches && matches.length >= 1) {
        surface[key] = surface[key].replace(matches[0], psConfig.getString(matches[0].replace('<', '').replace('>', '')));
      }
    }
  }
}

function getCDNCacheValue() {
  let cacheBustValue;
  switch (testCache.EnvironmentSettings) {
    case 'staging':
      cacheBustValue = '1547823324490';
      break;
    case 'production':
      cacheBustValue = '1569526387728';
      break;
    case 'development':
      cacheBustValue = '1547823324490';
      break;
    default:
      cacheBustValue = '1547823324490';
      break;
  }

  return cacheBustValue;
}

function prepEnvironmentSettings() {
  const baseSettingsPath = path.join(__dirname, '..', 'environment-settings'); // eslint-disable-line no-undef

  const templateSettings = JSON.parse(fs.readFileSync(path.join(baseSettingsPath, 'template.json')));
  populateSettings(templateSettings);
  testCache.EnvironmentSettings = templateSettings;

  if (process.env.OVERRIDE_SETTINGS) {
    overlaySettings(
      testCache.EnvironmentSettings,
      JSON.parse(fs.readFileSync(path.join(baseSettingsPath, `${process.env.OVERRIDE_SETTINGS}.json`), 'utf8'))
    );
  }
  testCache.EnvironmentSettings.CDNCacheValue = getCDNCacheValue();
  // eslint-disable-next-line no-console
  console.log(`Base Url: ${testCache.EnvironmentSettings.BaseUrl}`);
}

function before() {
  process.env.TZ = 'America/Toronto';
  prepEnvironmentSettings();
  testCache.DataHelpers = new dataHelpers.DataHelpers(testCache.EnvironmentSettings);
  testCache.StudentHelper = testCache.DataHelpers.StudentHelper;

  testCache.TestHelpers = testHelpers;
}

module.exports = { before };
