import _defineProperty from '@babel/runtime/helpers/esm/defineProperty';
import { Component } from 'react';
import { Button } from '@keystone-ui/button';
import { jsx, Stack, useTheme, Center, Box } from '@keystone-ui/core';
import { AlertTriangleIcon } from '@keystone-ui/icons/icons/AlertTriangleIcon';

class ErrorBoundary extends Component {
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
      return jsx(ErrorContainer, null, jsx(Stack, {
        align: "center",
        gap: "medium"
      }, jsx(AlertTriangleIcon, {
        size: "large"
      }), jsx("div", null, "Something went wrong."), jsx(Button, {
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
  } = useTheme();
  return jsx(Center, {
    css: {
      minWidth: '100vw',
      minHeight: '100vh',
      backgroundColor: colors.backgroundMuted
    },
    rounding: "medium"
  }, jsx(Box, {
    css: {
      background: colors.background,
      boxShadow: shadow.s100
    },
    margin: "medium",
    padding: "xlarge",
    rounding: "medium"
  }, children));
};

export { ErrorBoundary as E, ErrorContainer as a };
