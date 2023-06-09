import { jsx } from '@keystone-ui/core';
import { Button } from '@keystone-ui/button';
import { useEffect } from 'react';
import { gql, useMutation } from '@apollo/client';

/** @jsxRuntime classic */
const END_SESSION = gql`
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
  }] = useMutation(END_SESSION);
  useEffect(() => {
    if (data !== null && data !== void 0 && data.endSession) {
      window.location.reload();
    }
  }, [data]);
  return jsx(Button, {
    size: "small",
    isLoading: loading,
    onClick: () => endSession()
  }, children || 'Sign out');
};

export { SignoutButton as S };
