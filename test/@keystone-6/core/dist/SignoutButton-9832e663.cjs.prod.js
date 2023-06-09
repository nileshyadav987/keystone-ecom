'use strict';

var core = require('@keystone-ui/core');
var button = require('@keystone-ui/button');
var React = require('react');
var client = require('@apollo/client');

/** @jsxRuntime classic */
const END_SESSION = client.gql`
  mutation EndSession {
    endSession
  }
`;
const SignoutButton = _ref => {
  let {
    children
  } = _ref;
  const [endSession, {
    loading,
    data
  }] = client.useMutation(END_SESSION);
  React.useEffect(() => {
    if (data !== null && data !== void 0 && data.endSession) {
      window.location.reload();
    }
  }, [data]);
  return core.jsx(button.Button, {
    size: "small",
    isLoading: loading,
    onClick: () => endSession()
  }, children || 'Sign out');
};

exports.SignoutButton = SignoutButton;
