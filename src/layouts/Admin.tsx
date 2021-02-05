import React, { FC, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import {
  authSelector,
  refreshTokenAsyncThunk,
  resetAuth,
} from '@/redux/features/auth';
import { useSelector, useDispatch } from 'react-redux';
// reactstrap components
import { Container } from 'reactstrap';
// core components
import AdminNavbar from '@/components/Navbars/AdminNavbar';
import Footer from '@/components/Footers/Footer';
import SideBar from '@/components/Sidebar/Sidebar';

const routes = [
  // {
  //   path: '',
  //   name: 'Tổng quan',
  //   icon: 'ni ni-tv-2 text-green',
  //   layout: '/admin',
  //   hidden: true,
  // },
  {
    path: '/quan-ly-nguoi-dung',
    name: 'Người dùng',
    icon: 'ni ni-planet text-green',
    layout: '/admin',
  },
  // {
  //   path: '/quan-ly-tin-nhan',
  //   name: 'Tin nhắn người dùng',
  //   icon: 'ni ni-pin-3 text-green',
  //   layout: '/admin',
  // },
  {
    path: '/quan-ly-goi-duy-tri-dich-vu',
    name: 'Gói duy trì dịch vụ',
    icon: 'ni ni-single-02 text-green',
    layout: '/admin',
  },
  {
    path: '/quan-ly-don-hang',
    name: 'Đơn hàng',
    icon: 'ni ni-bullet-list-67 text-green',
    layout: '/admin',
  },
];

const Admin: FC = (props) => {
  // used for checking current route
  const { children } = props;
  const router = useRouter();
  const dispatch = useDispatch();
  const auth = useSelector(authSelector);

  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, []);

  const getBrandText = () => {
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].layout + routes[i].path === router.route) {
        return routes[i].name;
      }
    }
    return 'Brand';
  };

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
      if (auth.user?.roleId === 1) {
        router.push('/');
      }
    }
  }, [auth]);

  if (
    auth.status === 'failed' ||
    auth.status === 'loading' ||
    auth.user?.roleId !== 2
  ) {
    return <div>Đang tải trang</div>;
  }

  return (
    <>
      <SideBar
        {...props}
        routes={routes}
        logo={{
          innerLink: '/admin/quan-ly-nguoi-dung',
          imgSrc: require('assets/img/logo/logo-green.png'),
          imgAlt: '...',
        }}
      />
      <div className="main-content">
        <AdminNavbar {...props} brandText={getBrandText()} />
        {children}
        <Container fluid>
          <Footer />
        </Container>
      </div>
    </>
  );
};

export default Admin;
