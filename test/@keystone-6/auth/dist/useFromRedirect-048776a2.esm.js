import { useTheme, jsx, Center, Box } from '@keystone-ui/core';
import { useMemo } from 'react';
import { useRouter } from '@keystone-6/core/admin-ui/router';

/** @jsxRuntime classic */
const SigninContainer = _ref => {
  let {
    children,
    title
  } = _ref;
  const {
    colors,
    shadow
  } = useTheme();
  return jsx("div", null, jsx("head", null, jsx("title", null, title || 'Keystone')), jsx(Center, {
    css: {
      minWidth: '100vw',
      minHeight: '100vh',
      backgroundColor: colors.backgroundMuted
    },
    rounding: "medium"
  }, jsx(Box, {
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
  const router = useRouter();
  const redirect = useMemo(() => {
    var _router$query$from;
    return !Array.isArray(router.query.from) && (_router$query$from = router.query.from) !== null && _router$query$from !== void 0 && _router$query$from.startsWith('/') ? router.query.from : '/';
  }, [router]);
  return redirect;
};

export { SigninContainer as S, useRedirect as u };
