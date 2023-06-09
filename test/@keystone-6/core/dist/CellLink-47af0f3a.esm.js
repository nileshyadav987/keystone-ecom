import _extends from '@babel/runtime/helpers/esm/extends';
import { useTheme, jsx } from '@keystone-ui/core';
import { Link } from '../admin-ui/router/dist/keystone-6-core-admin-ui-router.esm.js';

/**
 * This is the component you should use when linking a Cell to an item (i.e when the Cell supports
 * the linkTo prop)
 */

const CellLink = props => {
  const {
    colors,
    spacing
  } = useTheme();
  return jsx(Link, _extends({
    css: {
      color: colors.foreground,
      display: 'block',
      padding: spacing.small,
      textDecoration: 'none',
      ':hover': {
        textDecoration: 'underline'
      }
    }
  }, props));
};

export { CellLink as C };
