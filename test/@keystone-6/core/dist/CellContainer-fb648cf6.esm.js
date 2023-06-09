import _extends from '@babel/runtime/helpers/esm/extends';
import _objectWithoutProperties from '@babel/runtime/helpers/esm/objectWithoutProperties';
import { useTheme, jsx } from '@keystone-ui/core';

const _excluded = ["children"];

/**
 * This is the component you should use when you want the standard padding around a cell value
 */

const CellContainer = _ref => {
  let {
      children
    } = _ref,
    props = _objectWithoutProperties(_ref, _excluded);
  const {
    spacing
  } = useTheme();
  return jsx("div", _extends({
    css: {
      padding: spacing.small
    }
  }, props), children);
};

export { CellContainer as C };
