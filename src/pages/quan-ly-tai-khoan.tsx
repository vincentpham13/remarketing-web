import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
} from 'reactstrap';
// layout for this page
import User from '@/layouts/User';
// core components
import Header from '@/components/Headers/Header';
import { userSelector } from '@/redux/features/user/user.slice';
import {
  updateUserInfoAsyncThunk,
} from '@/redux/features/user/user.thunk';

const Profile = () => {
  const dispatch = useDispatch();
  const userSl = useSelector(userSelector);

  const [isModified, setIsModified] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [job, setJob] = useState('');

  const onNameChange = (e) => {
    setName(e.target.value);
  };

  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const onPhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const onJobChange = (e) => {
    setJob(e.target.value);
  };

  const onFormSubmit = () => {
    if (!isModified) {
      setIsModified(true);
    } else {
      dispatch(
        updateUserInfoAsyncThunk({
          id: userSl.id,
          name,
          email,
          phone,
          job,
        }),
      );
      setIsModified(false);
    }
  };

  const onCancel = () => {
    setIsModified(false);
  };

  useEffect(() => {
    setName(userSl.name);
    setEmail(userSl.email);
    setJob(userSl.job);
    setPhone(userSl.phone);
  }, [userSl]);

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
            <Card className="card-profile shadow">
              <Row className="justify-content-center">
                <Col className="order-lg-2" lg="3">
                  <div className="card-profile-image">
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      <img
                        alt="..."
                        className="rounded-circle"
                        src={
                          userSl.picture ||
                          require('assets/img/theme/team-4-800x800.jpg')
                        }
                      />
                    </a>
                  </div>
                </Col>
              </Row>
              <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4"></CardHeader>
              <CardBody className="pt-0 pt-md-4">
                <Row>
                  <div className="col">
                    <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                      <div>
                        <span className="description">Số tin đăng ký</span>
                        <span className="heading">{userSl.totalMessages}</span>
                      </div>
                      <div>
                        <span className="description">Số tin còn lại</span>
                        <span className="heading">
                          {userSl.remainingMessages}
                        </span>
                      </div>
                      <div>
                        <span className="description">Số tin đã gửi </span>
                        <span className="heading">
                          {userSl.totalMessages && userSl.remainingMessages
                            ? userSl.totalMessages - userSl.remainingMessages
                            : 0}
                        </span>
                      </div>
                    </div>
                  </div>
                </Row>
                <div className="text-center">
                  <h3>{userSl.name}</h3>
                  <div className="h5 font-weight-300">
                    <i className="ni location_pin mr-2" />
                    {userSl.email}
                  </div>
                  <div className="h5 mt-4">
                    <i className="ni business_briefcase-24 mr-2" />
                    {userSl.phone}
                  </div>
                  <div>
                    <i className="ni education_hat mr-2" />
                    {userSl.job}
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col className="order-xl-1" xl="8">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">Tài khoản của tôi</h3>
                  </Col>
                  <Col className="text-right" xs="4"></Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  <h6 className="heading-small text-muted mb-4">
                    Thông tin tài khoản
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username">
                            Tên
                          </label>
                          <Input
                            className="form-control-alternative"
                            disabled={!isModified}
                            id="input-username"
                            value={name}
                            onChange={onNameChange}
                            placeholder="Tên người dùng"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-email">
                            Email
                          </label>
                          <Input
                            className="form-control-alternative"
                            disabled={!isModified}
                            id="input-email"
                            value={userSl.email ? email : ''}
                            onChange={onEmailChange}
                            placeholder="Địa chỉ email"
                            type="email"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />
                  {/* Address */}
                  <h6 className="heading-small text-muted mb-4">Về tôi</h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col md="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-phone">
                            Số điện thoại
                          </label>
                          <Input
                            className="form-control-alternative"
                            disabled={!isModified}
                            id="input-phone"
                            value={userSl.phone ? phone : ''}
                            onChange={onPhoneChange}
                            placeholder="Số điện thoại"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-job">
                            Công việc
                          </label>
                          <Input
                            className="form-control-alternative"
                            disabled={!isModified}
                            id="input-job"
                            value={userSl.job ? job : ''}
                            onChange={onJobChange}
                            placeholder="Công việc"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>

                  <div className="pl-lg-4">
                    <Row className="float-right">
                      <Col lg="6" className="d-inline-flex">
                        {isModified ? (
                          <Button color="secondary" onClick={onCancel}>
                            Huỷ
                          </Button>
                        ) : null}
                        <Button color="primary" onClick={onFormSubmit}>
                          {isModified ? 'Lưu' : 'Sửa'}
                        </Button>
                      </Col>
                    </Row>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

Profile.getLayout = (page) => <User>{page}</User>;

export default Profile;
