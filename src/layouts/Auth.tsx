import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
// reactstrap components
import { Container, Row, Col } from 'reactstrap';
import { authSelector } from '@/redux/features/auth';

// core components

function Auth(props) {
  useEffect(() => {
    document.body.classList.add('bg-default');
    // Specify how to clean up after this effect:
    return function cleanup() {
      document.body.classList.remove('bg-default');
    };
  }, []);

  const router = useRouter();
  const auth = useSelector(authSelector);

  useEffect(() => {
    // admin
    if (
      auth.user?.roleId === 1 &&
      auth.status === 'succeeded' &&
      auth.isAuthenticated &&
      auth.token
    ) {
      router.push('/');
    }
    // admin
    if (
      auth.user?.roleId === 2 &&
      auth.status === 'succeeded' &&
      auth.isAuthenticated &&
      auth.token
    ) {
      router.push('/admin');
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
