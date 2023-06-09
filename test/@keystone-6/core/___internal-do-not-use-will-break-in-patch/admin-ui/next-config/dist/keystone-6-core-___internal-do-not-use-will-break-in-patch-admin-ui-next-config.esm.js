import _objectSpread from '@babel/runtime/helpers/esm/objectSpread2';
import path__default from 'path';
import withPreconstruct from '@preconstruct/next';

const config = withPreconstruct({
  typescript: {
    ignoreBuildErrors: true
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  webpack(config, _ref) {
    let {
      isServer
    } = _ref;
    config.resolve.alias = _objectSpread(_objectSpread({}, config.resolve.alias), {}, {
      react: path__default.dirname(require.resolve('react/package.json')),
      'react-dom': path__default.dirname(require.resolve('react-dom/package.json')),
      '@keystone-6/core': path__default.dirname(require.resolve('@keystone-6/core/package.json'))
    });
    if (isServer) {
      var _config$node;
      config.externals = [...config.externals, /@keystone-6\/core(?!\/___internal-do-not-use-will-break-in-patch\/admin-ui\/id-field-view|\/fields\/types\/[^\/]+\/views)/, '.prisma/client'];
      // we need to set these to true so that when __dirname/__filename is used
      // to resolve the location of field views, we will get a path that we can use
      // rather than just the __dirname/__filename of the generated file.
      // https://webpack.js.org/configuration/node/#node__filename
      (_config$node = config.node) !== null && _config$node !== void 0 ? _config$node : config.node = {};
      config.node.__dirname = true;
      config.node.__filename = true;
    }
    return config;
  }
});

export { config };
