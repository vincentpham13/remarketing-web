import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import { authSelector } from '@/redux/features/auth';

// import {
//   counterSelector,
//   incrementAsync,
//   incrementByAmount,
//   increment,
//   decrement,
// } from '@/redux/features/counter/slice';
// import AuthenticatedAppLayout from '@/layouts/AuthenticatedAppLayout';

const Index = () => {
  const router = useRouter();
  const auth = useSelector(authSelector);

  useEffect(() => {
    // user
    if (auth.user?.roleId === 1 && auth.status === 'succeeded' && auth.isAuthenticated && auth.token) {
      router.push('/user');
    } 
    // admin
    else if (auth.user?.roleId === 2 && auth.status === 'succeeded' && auth.isAuthenticated && auth.token) {
      router.push('/admin/dashboard');
    } else {
      router.push('/auth/login');
    }
  }, [auth]);

  return <div />;
};

export default Index;
