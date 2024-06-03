import React from 'react';
import { Redirect, Stack } from 'expo-router';
import { useAuthContext } from '@/src/hooks/useAuthContext';

const AuthLayout = () => {
  const { session } = useAuthContext();

  if (session) {
    return <Redirect href={'/'} />;
  }

  return <Stack />;
};

export default AuthLayout;
