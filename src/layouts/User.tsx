import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
// reactstrap components
import { Col, Container, FormGroup, Input, Row } from 'reactstrap';
// core components
import UserNavbar from '@/components/Navbars/UserNavbar';
import UserFooter from '@/components/Footers/UserFooter';
import SideBar from '@/components/Sidebar/Sidebar';
import { authSelector, refreshTokenAsyncThunk } from '@/redux/features/auth';
import { useDispatch, useSelector } from 'react-redux';
import CustomModal from '@/components/Modal/Modal';
import { updateUserInfoAsyncThunk } from '@/redux/features/user/user.thunk';
import { userSelector } from '@/redux/features/user/user.slice';

const routes = [
  {
    path: '/',
    name: 'Tổng quan',
    icon: 'ni ni-tv-2 text-blue',
    layout: '',
  },
  {
    path: '/quan-ly-fan-page',
    name: 'Fanpage',
    icon: 'ni ni-planet text-blue',
    layout: '',
  },
  {
    path: '/quan-ly-chien-dich',
    name: 'Chiến dịch',
    icon: 'ni ni-pin-3 text-orange',
    layout: '',
  },
  {
    path: '/quan-ly-goi-dich-vu',
    name: 'Gói dịch vụ',
    icon: 'ni ni-single-02 text-yellow',
    layout: '',
  },
];

function User(props) {
  // used for checking current route
  const router = useRouter();
  const dispatch = useDispatch();
  const auth = useSelector(authSelector);
  const userSl = useSelector(userSelector);

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [job, setJob] = useState('');

  const getBrandText = () => {
    for (let i = 0; i < routes.length; i++) {
      if (router.route === routes[i].path) {
        return routes[i].name;
      }
    }
    return 'Brand';
  };

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

  const onModalSubmit = () => {
    if (!phone || !job || !email) {
      alert('Vui lòng nhập đầy đủ thông tin');
      return;
    }

    dispatch(
      updateUserInfoAsyncThunk({
        id: userSl.id,
        name: userSl.name,
        email,
        phone,
        job,
      }),
    );
  };

  useEffect(() => {
    if (userSl.status === 'succeeded') {
      if (!userSl.email || !userSl.phone || !userSl.job) {
        setIsOpenModal(true);
      } else {
        setIsOpenModal(false);
      }
      
      setName(userSl.name);
      setEmail(userSl.email);
      setJob(userSl.job);
      setPhone(userSl.phone);
    }
  }, [userSl]);

  useEffect(() => {
    if (!auth.isAuthenticated && !auth.token) {
      dispatch(refreshTokenAsyncThunk());
    }
  }, []);

  // check authentication
  useEffect(() => {
    if (
      (auth.status === 'failed' && !auth.token) ||
      (auth.status === 'reset' && !auth.token)
    ) {
      router.push('/auth/login');
    }
  }, [auth]);

  // check authorization
  useEffect(() => {
    if (auth.status === 'succeeded' && auth.isAuthenticated && auth.token) {
      // admin
      if (auth.user?.roleId === 2) {
        router.push('/admin');
      }
    }
  }, [auth]);

  if (
    auth.status === 'failed' ||
    auth.status === 'loading' ||
    auth.user?.roleId !== 1
  ) {
    return <div>Đang tải trang</div>;
  }

  return (
    <>
      <SideBar
        {...props}
        routes={routes}
        logo={{
          innerLink: '/admin/index',
          imgSrc: require('assets/img/brand/nextjs_argon_black.png'),
          imgAlt: '...',
        }}
      />
      <div className="main-content">
        <UserNavbar {...props} brandText={getBrandText()} />
        {props.children}
        <Container fluid>
          <UserFooter />
        </Container>
      </div>
      <CustomModal
        titleHeader="Vui hoàn tất các thông tin sau"
        isOpen={isOpenModal}
        onSubmit={onModalSubmit}>
        <Row>
          <Col lg="6">
            <FormGroup>
              <label className="form-control-label" htmlFor="input-email">
                Email
              </label>
              <Input
                className="form-control-alternative"
                value={email}
                id="input-email"
                onChange={onEmailChange}
                placeholder="Email"
                type="text"
              />
            </FormGroup>
          </Col>
          <Col lg="6">
            <FormGroup>
              <label className="form-control-label" htmlFor="input-phone">
                Số điện thoại
              </label>
              <Input
                className="form-control-alternative"
                value={phone}
                id="input-phone"
                onChange={onPhoneChange}
                placeholder="Số điện thoại"
                type="text"
              />
            </FormGroup>
          </Col>
          <Col lg="6">
            <FormGroup>
              <label className="form-control-label" htmlFor="input-job">
                Công việc
              </label>
              <Input
                className="form-control-alternative"
                value={job}
                id="input-job"
                onChange={onJobChange}
                placeholder="Công việc"
                type="text"
              />
            </FormGroup>
          </Col>
        </Row>
      </CustomModal>
    </>
  );
}

export default User;
