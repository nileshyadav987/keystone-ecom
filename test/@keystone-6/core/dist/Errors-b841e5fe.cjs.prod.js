'use strict';

var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var React = require('react');
var button = require('@keystone-ui/button');
var core = require('@keystone-ui/core');
var AlertTriangleIcon = require('@keystone-ui/icons/icons/AlertTriangleIcon');

class ErrorBoundary extends React.Component {
  constructor() {
    super(...arguments);
    _defineProperty(this, "state", {
      hasError: false,
      isReloading: false
    });
    _defineProperty(this, "reloadPage", () => {
      this.setState({
        isReloading: true
      });
      window.location.reload();
    });
  }
  static getDerivedStateFromError(error) {
    return {
      error,
      hasError: true
    };
  }
  render() {
    if (this.state.hasError) {
      return core.jsx(ErrorContainer, null, core.jsx(core.Stack, {
        align: "center",
        gap: "medium"
      }, core.jsx(AlertTriangleIcon.AlertTriangleIcon, {
        size: "large"
      }), core.jsx("div", null, "Something went wrong."), core.jsx(button.Button, {
        size: "small",
        isLoading: this.state.isReloading,
        onClick: this.reloadPage
      }, "reload page")));
    }
    return this.props.children;
  }
}
const ErrorContainer = _ref => {
  let {
    children
  } = _ref;
  const {
    colors,
    shadow
  } = core.useTheme();
  return core.jsx(core.Center, {
    css: {
      minWidth: '100vw',
      minHeight: '100vh',
      backgroundColor: colors.backgroundMuted
    },
    rounding: "medium"
  }, core.jsx(core.Box, {
    css: {
      background: colors.background,
      boxShadow: shadow.s100
    },
    margin: "medium",
    padding: "xlarge",
    rounding: "medium"
  }, children));
};

exports.ErrorBoundary = ErrorBoundary;
exports.ErrorContainer = ErrorContainer;
