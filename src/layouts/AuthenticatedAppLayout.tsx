import React, { FC, useEffect } from 'react';
import PropTypes from 'prop-types';

import {
  authSelector,
  refreshTokenAsyncThunk,
  resetAuth,
} from '@/redux/features/auth';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { Spin, Button } from 'antd';

const AuthenticatedAppLayout: FC = (props) => {
  const { children } = props;
  const router = useRouter();
  const dispatch = useDispatch();
  const auth = useSelector(authSelector);

  const logout = () => {
    dispatch(resetAuth());
    router.push('/login');
  };

  useEffect(() => {
    if (!auth.isAuthenticated) {
      dispatch(refreshTokenAsyncThunk());
    }
  }, []);

  useEffect(() => {
    if (auth.status === 'failed' && !auth.token) {
      router.push('/login');
    }
  }, [auth]);

  if (auth.status !== 'succeeded') {
    return <Spin spinning={true}></Spin>;
  }

  return (
    <div>
      <h1>Authenticated app layout</h1>
      {children}
      <Button onClick={logout} type="ghost">
        Logout
      </Button>
    </div>
  );
};

AuthenticatedAppLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default AuthenticatedAppLayout;
