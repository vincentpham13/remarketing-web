import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
// reactstrap components
import { Col, Container, FormGroup, Input, Row } from 'reactstrap';
// core components
import UserNavbar from '@/components/Navbars/UserNavbar';
import Footer from '@/components/Footers/Footer';
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
    icon: 'ni ni-tv-2 text-primary',
    layout: '',
  },
  {
    path: '/quan-ly-fan-page',
    name: 'Quản lý Fanpage',
    icon: 'ni ni-send text-primary',
    layout: '',
  },
  {
    path: '/quan-ly-khach-hang',
    name: 'Quản lý khách hàng',
    icon: 'fa fa-users text-primary',
    layout: '',
  },
  {
    path: '/quan-ly-chien-dich',
    name: 'Quản lý Chiến dịch',
    icon: 'ni ni-notification-70 text-primary',
    layout: '',
  },
  {
    path: '/quan-ly-goi-dich-vu',
    name: 'Quản lý gói lý và thanh toán dịch vụ',
    icon: 'fa fa-cogs text-primary',
    layout: '',
  },
  {
    path: '/quan-ly-goi-dich-vu/don-hang',
    name: 'Thanh toán dịch vụ',
    icon: 'ni ni-single-02 text-primary',
    layout: '',
    hidden: true,
  },
  {
    path: '/quan-ly-goi-dich-vu/don-hang/thanh-toan',
    name: 'Thanh toán dịch vụ',
    icon: 'ni ni-single-02 text-primary',
    layout: '',
    hidden: true,
  },
  {
    url: 'https://hotro.bombot.vn/',
    path: null,
    name: 'Hướng dẫn sử dụng',
    icon: 'ni ni-single-02 text-primary',
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
  const [city, setCity] = useState('');
  const [companyName, setCompanyName] = useState('');


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

  const onCompanyNameChange = (e) => {
    setCompanyName(e.target.value);
  };

  const onCityChange = (e) => {
    setCity(e.target.value);
  };

  const onModalSubmit = () => {
    if (!phone || !job || !email) {
      return;
    }

    dispatch(
      updateUserInfoAsyncThunk({
        id: userSl.id,
        name: userSl.name,
        email,
        phone,
        job,
        companyName,
        city
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
      setCity(userSl.city ?? '');
      setCompanyName(userSl.companyName ?? '')
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
        router.push('/admin/quan-ly-nguoi-dung');
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
          innerLink: '/',
          imgSrc: require('assets/img/logo/logo-green.png'),
          imgAlt: '...',
        }}
      />
      <div className="main-content">
        <UserNavbar {...props} brandText={getBrandText()} />
        {props.children}
        <Container fluid>
          <Footer />
        </Container>
      </div>
      <CustomModal
        titleHeader="Vui lòng hoàn tất các thông tin sau"
        isOpen={isOpenModal}
        onSubmit={onModalSubmit}>
        <Row>
          <Col lg="6">
            <FormGroup>
              <label className="form-control-label" htmlFor="input-email">
                Email <span className="text-red">*</span>
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
                Số điện thoại <span className="text-red">*</span>
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
          <Col lg="12">
            <FormGroup>
              <label className="form-control-label" htmlFor="input-job">
                Ngành nghề / Lĩnh vực kinh doanh <span className="text-red">*</span>
              </label>
              <Input
                className="form-control-alternative"
                value={job}
                id="input-job"
                onChange={onJobChange}
                placeholder="Ngành nghề / Lĩnh vực kinh doanh"
                type="text"
              />
            </FormGroup>
          </Col>
          <Col lg="6">
            <FormGroup>
              <label className="form-control-label" htmlFor="input-company-name">
                Tên công ty / Hộ kinh doanh
              </label>
              <Input
                className="form-control-alternative"
                value={companyName}
                id="input-company-name"
                onChange={onCompanyNameChange}
                placeholder="Tên công ty / Hộ kinh doanh"
                type="text"
              />
            </FormGroup>
          </Col>
          <Col lg="6">
            <FormGroup>
              <label className="form-control-label" htmlFor="input-city">
                Tỉnh / Thành phố
              </label>
              <Input
                className="form-control-alternative"
                value={city}
                id="input-city"
                onChange={onCityChange}
                placeholder="Tỉnh / Thành phố"
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
