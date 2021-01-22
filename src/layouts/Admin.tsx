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
import AdminFooter from '@/components/Footers/AdminFooter';
import SideBar from '@/components/Sidebar/Sidebar';

const routes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    icon: 'ni ni-tv-2 text-primary',
    layout: '/admin',
  },
  {
    path: '/icons',
    name: 'Icons',
    icon: 'ni ni-planet text-blue',
    layout: '/admin',
  },
  {
    path: '/maps',
    name: 'Maps',
    icon: 'ni ni-pin-3 text-orange',
    layout: '/admin',
  },
  {
    path: '/profile',
    name: 'User Profile',
    icon: 'ni ni-single-02 text-yellow',
    layout: '/admin',
  },
  {
    path: '/tables',
    name: 'Tables',
    icon: 'ni ni-bullet-list-67 text-red',
    layout: '/admin',
  },
  {
    path: '/login',
    name: 'Login',
    icon: 'ni ni-key-25 text-info',
    layout: '/auth',
  },
  {
    path: '/register',
    name: 'Register',
    icon: 'ni ni-circle-08 text-pink',
    layout: '/auth',
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
    // mainContentRef.current.scrollTop = 0;
  }, []);

  const getBrandText = () => {
    for (let i = 0; i < routes.length; i++) {
      if (router.route.indexOf(routes[i].layout + routes[i].path) !== -1) {
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

  useEffect(() => {
    if ((auth.status === 'failed' || !auth.isAuthenticated) && !auth.token) {
      router.push('/auth/login');
    }
  }, [auth]);

  if (auth.status !== 'succeeded') {
    return <div>Loading</div>;
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
        <AdminNavbar {...props} brandText={getBrandText()} />
        {children}
        <Container fluid>
          <AdminFooter />
        </Container>
      </div>
    </>
  );
};

export default Admin;
