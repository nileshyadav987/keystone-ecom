'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _objectSpread = require('@babel/runtime/helpers/objectSpread2');
var execa = require('execa');
var withPreconstruct = require('@preconstruct/next');

function _interopDefault (e) { return e && e.__esModule ? e : { 'default': e }; }

var execa__default = /*#__PURE__*/_interopDefault(execa);
var withPreconstruct__default = /*#__PURE__*/_interopDefault(withPreconstruct);

let hasAlreadyStarted = false;
const withKeystone = function () {
  let internalConfig = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return (phase, thing) => {
    if (phase === 'phase-production-build') {
      execa__default["default"].sync('node', [require.resolve('@keystone-6/core/bin/cli.js'), 'postinstall'], {
        stdio: 'inherit'
      });
    }
    if (phase === 'phase-development-server' && !hasAlreadyStarted) {
      hasAlreadyStarted = true;
      const cliPath = require.resolve('@keystone-6/core/bin/cli.js');
      execa__default["default"].sync('node', [cliPath, 'postinstall', '--fix'], {
        stdio: 'inherit'
      });
      // for some reason things blow up with EADDRINUSE if the dev call happens synchronously here
      // so we wait a sec and then do it
      setTimeout(() => {
        execa__default["default"]('node', [cliPath], {
          stdio: 'inherit',
          env: _objectSpread(_objectSpread({}, process.env), {}, {
            PORT: process.env.PORT || '8000'
          })
        });
      }, 100);
    }
    let internalConfigObj = typeof internalConfig === 'function' ? internalConfig(phase, thing) : internalConfig;
    let originalWebpack = internalConfigObj.webpack;
    internalConfigObj.webpack = (webpackConfig, options) => {
      if (options.isServer) {
        webpackConfig.externals = [...webpackConfig.externals, '@keystone-6/core/___internal-do-not-use-will-break-in-patch/api', '@keystone-6/core/___internal-do-not-use-will-break-in-patch/next-graphql', '@keystone-6/core/next', '@keystone-6/core/system', '.prisma/client'];
      }
      return originalWebpack ? originalWebpack(webpackConfig, options) : webpackConfig;
    };
    return withPreconstruct__default["default"](internalConfigObj);
  };
};

exports.withKeystone = withKeystone;
