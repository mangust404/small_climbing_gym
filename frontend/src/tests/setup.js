import callApiFetch from '../helpers/callApiFetch';

module.exports = async function (globalConfig, projectConfig) {
  await callApiFetch('test/cleanup')
};