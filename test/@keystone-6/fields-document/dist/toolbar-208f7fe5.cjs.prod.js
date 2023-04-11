'use strict';

var _extends = require('@babel/runtime/helpers/extends');
var _objectSpread = require('@babel/runtime/helpers/objectSpread2');
var _objectWithoutProperties = require('@babel/runtime/helpers/objectWithoutProperties');
var core = require('@keystone-ui/core');
var React = require('react');

const _excluded$1 = ["isRelative"];
const InlineDialog = /*#__PURE__*/React.forwardRef((_ref, ref) => {
  let {
      isRelative
    } = _ref,
    props = _objectWithoutProperties(_ref, _excluded$1);
  const {
    radii,
    spacing
  } = core.useTheme();
  const relativeStyles = isRelative ? {
    left: '50%',
    margin: spacing.small,
    transform: 'translateX(-50%)'
  } : {};
  let dialog = core.jsx("div", _extends({
    ref: ref,
    contentEditable: false,
    css: _objectSpread({
      background: 'white',
      borderRadius: radii.small,
      boxShadow: `rgba(9, 30, 66, 0.31) 0px 0px 1px, rgba(9, 30, 66, 0.25) 0px 4px 8px -2px`,
      padding: spacing.small,
      position: 'absolute',
      userSelect: 'none'
    }, relativeStyles)
  }, props));
  if (isRelative) {
    return dialog;
  }
  return core.jsx(core.Portal, null, dialog);
});

const _excluded = ["children", "direction"],
  _excluded2 = ["as", "isDisabled", "isPressed", "isSelected", "variant"];

// Spacers and Separators
// ------------------------------

const ToolbarSpacer = () => {
  const {
    spacing
  } = core.useTheme();
  return core.jsx("span", {
    css: {
      display: 'inline-block',
      width: spacing.large
    }
  });
};
const ToolbarSeparator = () => {
  const {
    colors,
    spacing
  } = core.useTheme();
  return core.jsx("span", {
    css: {
      alignSelf: 'stretch',
      background: colors.border,
      display: 'inline-block',
      marginLeft: spacing.xsmall,
      marginRight: spacing.xsmall,
      width: 1
    }
  });
};

// Groups
// ------------------------------

const directionToAlignment = {
  row: 'center',
  column: 'start'
};
const ToolbarGroupContext = /*#__PURE__*/React.createContext({
  direction: 'row'
});
const useToolbarGroupContext = () => React.useContext(ToolbarGroupContext);
const ToolbarGroup = core.forwardRefWithAs((_ref, ref) => {
  let {
      children,
      direction = 'row'
    } = _ref,
    props = _objectWithoutProperties(_ref, _excluded);
  const {
    spacing
  } = core.useTheme();
  return core.jsx(ToolbarGroupContext.Provider, {
    value: {
      direction
    }
  }, core.jsx(core.Box, _extends({
    ref: ref,
    css: {
      display: 'flex',
      gap: spacing.xxsmall,
      flexDirection: direction,
      justifyContent: 'start',
      alignItems: directionToAlignment[direction],
      height: '100%'
    }
  }, props), children));
});

// Buttons
// ------------------------------

const ToolbarButton = core.forwardRefWithAs(function ToolbarButton(_ref2, ref) {
  let {
      as: Tag = 'button',
      isDisabled,
      isPressed,
      isSelected,
      variant = 'default'
    } = _ref2,
    props = _objectWithoutProperties(_ref2, _excluded2);
  const extraProps = {};
  const {
    direction: groupDirection
  } = useToolbarGroupContext();
  const {
    colors,
    palette,
    radii,
    sizing,
    spacing,
    typography
  } = core.useTheme();
  if (Tag === 'button') {
    extraProps.type = 'button';
  }
  const variants = {
    default: {
      bgHover: palette.neutral200,
      bgActive: palette.neutral300,
      fg: palette.neutral800
    },
    action: {
      bgHover: palette.blue50,
      bgActive: palette.blue100,
      fg: palette.blue600
    },
    destructive: {
      bgHover: palette.red50,
      bgActive: palette.red100,
      fg: palette.red600
    }
  };
  const style = variants[variant];
  return core.jsx(Tag, _extends({}, extraProps, {
    ref: ref,
    disabled: isDisabled,
    "data-pressed": isPressed,
    "data-selected": isSelected,
    "data-display-mode": groupDirection,
    css: {
      alignItems: 'center',
      background: 0,
      border: 0,
      borderRadius: radii.xsmall,
      color: style.fg,
      cursor: 'pointer',
      display: 'flex',
      fontSize: typography.fontSize.small,
      fontWeight: typography.fontWeight.medium,
      height: sizing.medium,
      whiteSpace: 'nowrap',
      ':hover': {
        background: style.bgHover
      },
      ':active': {
        background: style.bgActive
      },
      '&:disabled': {
        color: colors.foregroundDisabled,
        pointerEvents: 'none'
      },
      '&[data-pressed=true]': {
        background: style.bgActive
      },
      '&[data-selected=true]': {
        background: colors.foregroundMuted,
        color: colors.background
      },
      // alternate styles within button group
      '&[data-display-mode=row]': {
        paddingLeft: spacing.small,
        paddingRight: spacing.small
      },
      '&[data-display-mode=column]': {
        paddingLeft: spacing.medium,
        paddingRight: spacing.medium,
        width: '100%'
      }
    }
  }, props));
});
function KeyboardInTooltip(_ref3) {
  let {
    children
  } = _ref3;
  const theme = core.useTheme();
  return core.jsx("kbd", {
    css: {
      margin: 2,
      padding: theme.spacing.xxsmall,
      fontFamily: 'inherit',
      backgroundColor: theme.colors.foreground,
      borderRadius: theme.radii.xsmall,
      color: theme.colors.background,
      whiteSpace: 'pre'
    }
  }, children);
}

exports.InlineDialog = InlineDialog;
exports.KeyboardInTooltip = KeyboardInTooltip;
exports.ToolbarButton = ToolbarButton;
exports.ToolbarGroup = ToolbarGroup;
exports.ToolbarSeparator = ToolbarSeparator;
exports.ToolbarSpacer = ToolbarSpacer;
