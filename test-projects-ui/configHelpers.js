const process = require('process');
const wdioBaseConfig = require('./base-wdio.conf.js').config;

const {
  E2E_MAXINSTANCES, E2E_SPECS, E2E_CI
} = process.env;

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

function applyEnvironmentVariables(baseConfig) {
  const config = baseConfig;

  config.maxInstances = parseInt(E2E_MAXINSTANCES || config.maxInstances, 10);
  config.specs = (E2E_SPECS ? E2E_SPECS.split(' ') : null) || config.specs;
}

function applyCISettings(baseConfig) {
  const config = baseConfig;

  if (process.platform != 'darwin') {
    config.seleniumArgs.drivers.chrome.version = '76.0.3809.126';
    config.seleniumInstallArgs.drivers.chrome.version = '76.0.3809.126';
  }

  const chromeCapability = config.capabilities.filter(capability => capability.browserName === 'chrome')[0];
  if (chromeCapability !== undefined) {
    chromeCapability['goog:chromeOptions'].args = ['--no-sandbox', '--headless', '--disable-gpu', '--window-size=1280,720'];
  }
  config.maxInstances = 2;
}

function applyAppSettings(overlayConfig, baseConfig = null) {
  const config = baseConfig || wdioBaseConfig;
  overlaySettings(config, overlayConfig);

  applyEnvironmentVariables(config);

  if (E2E_CI === 'true') {
    applyCISettings(config);
  }

  return config;
}

module.exports = {
  applyAppSettings,
  applyEnvironmentVariables,
  applyCISettings
};
