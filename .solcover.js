module.exports = {
  skipFiles: ['contracts/for-test', 'libraries', 'interfaces', 'contracts/external', 'mocks'],
  mocha: {
    forbidOnly: true,
    grep: '@skip-on-coverage',
    invert: true,
  },
};
