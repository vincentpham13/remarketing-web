import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
// reactstrap components
import { Container, Row, Col } from 'reactstrap';
import { authSelector, refreshTokenAsyncThunk } from '@/redux/features/auth';

// core components

function Auth(props) {
  useEffect(() => {
    document.body.classList.add('bg-default');
    // Specify how to clean up after this effect:
    return function cleanup() {
      document.body.classList.remove('bg-default');
    };
  }, []);

  const dispatch = useDispatch();
  const router = useRouter();
  const auth = useSelector(authSelector);

  useEffect(() => {
    // dispatch(refreshTokenAsyncThunk());
  }, []);

  useEffect(() => {
    // check authorization
    if (auth.status === 'succeeded' && auth.isAuthenticated && auth.token) {
      // admin
      if (auth.user?.roleId === 2) {
        router.push('/admin');
      } else if (auth.user?.roleId === 1) {
        router.push('/');
      }
    }
  }, [auth]);

  return (
    <>
      <div className="main-content">
        <div className="py-6 py-lg-7"></div>
        {/* Page content */}
        <Container className="mt--8 pb-5">
          <Row className="justify-content-center">{props.children}</Row>
        </Container>
      </div>
    </>
  );
}

export default Auth;
