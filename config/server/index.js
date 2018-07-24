const { is, mergeWith, merge } = require('ramda');

const defaultConfig = require('./default');
const deepMerge = (a, b) => (is(Object, a) && is(Object, b)) ? mergeWith(deepMerge, a, b) : b;

const supportedModes = {
  development: require('./development'),
  production: require('./production')
};

const config = supportedModes[process.env.NODE_ENV] || {};
const { secret: { path } = {} } = config;
const sConfig = path ? require(path) : {};
module.exports = deepMerge(merge(defaultConfig, config), sConfig);