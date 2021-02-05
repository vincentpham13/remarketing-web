import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
// reactstrap components
import { Container, Row, Col } from 'reactstrap';
import { authSelector, refreshTokenAsyncThunk } from '@/redux/features/auth';
import AuthNavbar from '@/components/Navbars/AuthNavbar';

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
        router.push('/admin/quan-ly-nguoi-dung');
      } else if (auth.user?.roleId === 1) {
        router.push('/');
      }
    }
  }, [auth]);

  return (
    <>
      <div className="main-content login-bg">
        <AuthNavbar {...props} brandText="TEST" />
        <div className="header py-3 py-lg-3">
          {/* <Container>
            <div className="header-body text-center mb-7">
              <Row className="justify-content-center">
                <Col lg="5" md="6">
                  <h1 className="text-white">Welcome!</h1>
                  <p className="text-lead text-light">
                    Use these awesome forms to login or create new account in
                    your project for free.
                  </p>
                </Col>
              </Row>
            </div>
          </Container>
          <div className="separator separator-bottom separator-skew zindex-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0">
              <polygon
                className="fill-default"
                points="2560 0 2560 100 0 100"
              />
            </svg>
          </div> */}
        </div>
        {/* Page content */}
        <Container className="mt-8 pb-5">
          <Row className="justify-content-center">{props.children}</Row>
        </Container>
      </div>
    </>
  );
}

export default Auth;
