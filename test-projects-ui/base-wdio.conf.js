const process = require('process');

function getPort(port) {
  const portsInUse = [
    ...new Set(
      require('child_process')
        .execSync('lsof -i -P -n')
        .toString()
        .split('\n')
        .map(outputLine => {
          const address = outputLine.replace(/ {1,}/g, ' ').split(' ')[8];

          return address ? parseInt(address.substring(address.lastIndexOf(':') + 1)) | 0 : 0;
        })
    )
  ];

  for (let inc = 0; inc < 1000; inc += 1) {
    if (!portsInUse.includes(port)) {
      return port;
    }
    port += 1;
  }

  return port;
}

const port = getPort(4444);
// eslint-disable-next-line no-console
console.log(port);

const seleniumArgs = {
  drivers: {
    chrome: {
      version: '79.0.3945.36',
      arch: process.arch,
      baseURL: 'https://chromedriver.storage.googleapis.com'
    }
  },
  seleniumArgs: ['-port', `${port}`]
};

const config = {
  runner: 'local',
  path: '/wd/hub',

  specs: [],
  exclude: [],

  maxInstances: 10,
  capabilities: [
    {
      maxInstances: 5,
      browserName: 'chrome',
      'goog:chromeOptions': {
        w3c: true,
      }
    }
  ],
  port: port,

  logLevel: 'silent',
  coloredLogs: true,
  deprecationWarnings: true,

  bail: 0,

  baseUrl: 'http://localhost',

  waitforTimeout: 10000,

  connectionRetryTimeout: 90000,
  connectionRetryCount: 3,

  services: ['selenium-standalone'],
  seleniumLogs: './',
  seleniumArgs: seleniumArgs,
  seleniumInstallArgs: seleniumArgs,

  reporters: ['spec'],

  framework: 'mocha',
  mochaOpts: {
    timeout: 600000
  }
};

exports.config = config;
