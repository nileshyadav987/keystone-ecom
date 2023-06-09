'use strict';

var core = require('@keystone-ui/core');
var react = require('react');
var router = require('@keystone-6/core/admin-ui/router');

/** @jsxRuntime classic */
const SigninContainer = _ref => {
  let {
    children,
    title
  } = _ref;
  const {
    colors,
    shadow
  } = core.useTheme();
  return core.jsx("div", null, core.jsx("head", null, core.jsx("title", null, title || 'Keystone')), core.jsx(core.Center, {
    css: {
      minWidth: '100vw',
      minHeight: '100vh',
      backgroundColor: colors.backgroundMuted
    },
    rounding: "medium"
  }, core.jsx(core.Box, {
    css: {
      background: colors.background,
      width: 600,
      boxShadow: shadow.s100
    },
    margin: "medium",
    padding: "xlarge",
    rounding: "medium"
  }, children)));
};

const useRedirect = () => {
  const router$1 = router.useRouter();
  const redirect = react.useMemo(() => {
    var _router$query$from;
    return !Array.isArray(router$1.query.from) && (_router$query$from = router$1.query.from) !== null && _router$query$from !== void 0 && _router$query$from.startsWith('/') ? router$1.query.from : '/';
  }, [router$1]);
  return redirect;
};

exports.SigninContainer = SigninContainer;
exports.useRedirect = useRedirect;
