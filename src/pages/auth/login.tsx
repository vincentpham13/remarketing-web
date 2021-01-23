import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { authFbUserAsyncThunk, authUserAsyncThunk } from '@/redux/features/auth/auth.thunk';

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from 'reactstrap';
// layout for this page
import Auth from '@/layouts/Auth';
import { authSelector } from '@/redux/features/auth';

const Login = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const auth = useSelector(authSelector);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onUsernameChange = (e) => {
    setEmail(e.target.value);
  };
  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const openFBAuthentication = async () => {
    // @ts-ignore
    const { authResponse } = await new Promise((resolve, reject) => {
      window.FB.login(
        (response: any) => {
          resolve(response);
        },
        {
          auth_type: 'rerequest',
          scope: 'public_profile,pages_show_list',
          enable_profile_selector: true,
          return_scopes: true,
        },
      );
    });

    dispatch(authFbUserAsyncThunk({
      fbUserId: authResponse.userID,
      accessToken: authResponse.accessToken,
    }));

    /* Fake FB test */
    // dispatch(authFbUserAsyncThunk({
    //   fbUserId: '3586689354782928',
    //   accessToken: "EAAR8ZBlPbQrEBAKFvCZAx1XXTQ4MJvXpEQV2Bi04FuAgcWZA81NAkhq1sAybSGf8OeRxaTpvHuZC1NJAGAG70XRBGKPMfG2zFjnUctQmSafGGOZCQbcC5XnarVlHXvH1NtSzZBzkSkGY2JeuY3eZAmYQWl4S365brGqVU2hcap4DnLqH6gK6QMmesl6Ss65mq2uzFFkQg6lSwZDZD",
    // }));
  };

  const responseFacebook = (response: any) => {
    console.log(response);
  };

  const onAccountSubmit = () => {
    if (!email || !password) {
      return;
    }
    dispatch(
      authUserAsyncThunk({
        email,
        password,
      }),
    );
  };

  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardHeader className="bg-transparent pb-5">
            <div className="text-muted text-center mt-2 mb-3">
              <small>Đăng nhập bằng</small>
            </div>
            <div className="btn-wrapper text-center">
              <Button
                className="btn-neutral btn-icon"
                color="default"
                onClick={openFBAuthentication}>
                <span className="btn-inner--icon">
                  <img
                    alt="..."
                    src={require('assets/img/icons/common/facebook.svg')}
                  />
                </span>
                <span className="btn-inner--text">Facebook</span>
              </Button>
            </div>
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <small>Hoặc đăng nhập bằng tài khoản</small>
            </div>
            <Form role="form">
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    onChange={onUsernameChange}
                    placeholder="Email"
                    type="email"
                    autoComplete="new-email"
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    onChange={onPasswordChange}
                    placeholder="Mật khẩu"
                    type="password"
                    autoComplete="new-password"
                  />
                </InputGroup>
              </FormGroup>
              <div className="text-center">
                <Button
                  onClick={onAccountSubmit}
                  className="my-4"
                  color="primary"
                  type="button">
                  Đăng nhập
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
        {/* <Row className="mt-3">
          <Col xs="6">
            <a
              className="text-light"
              href="#pablo"
              onClick={(e) => e.preventDefault()}>
              <small>Forgot password?</small>
            </a>
          </Col>
          <Col className="text-right" xs="6">
            <a
              className="text-light"
              href="#pablo"
              onClick={(e) => e.preventDefault()}>
              <small>Create new account</small>
            </a>
          </Col>
        </Row> */}
      </Col>
    </>
  );
};

Login.getLayout = (page) => <Auth>{page}</Auth>;

export default Login;
