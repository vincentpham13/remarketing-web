import React, { FC } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Navbar,
  Nav,
  Container,
  Media,
} from 'reactstrap';
import { authSelector, logoutAsyncThunk } from '@/redux/features/auth';

const UserNavbar: FC = (props) => {
  const dispatch = useDispatch();
  const authSl = useSelector(authSelector);
  const [, , removeCookie] = useCookies(['rt']);

  const logout = () => {
    removeCookie('rt', { secure: false , sameSite: 'none'});
    dispatch(logoutAsyncThunk());
  };

  return (
    <>
      <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
        <Container fluid>
          <Link href="/admin">
            <a className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block">
              {props?.brandText}
            </a>
          </Link>
          {/* <Form className="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto">
              <FormGroup className="mb-0">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="fas fa-search" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input placeholder="Search" type="text" />
                </InputGroup>
              </FormGroup>
            </Form> */}
          <Nav className="align-items-center d-none d-md-flex" navbar>
            <UncontrolledDropdown nav>
              <DropdownToggle className="pr-0" nav>
                <Media className="align-items-center">
                  <span className="avatar avatar-sm rounded-circle">
                    <img
                      alt="..."
                      src={require('assets/img/theme/vincent.jpg')}
                    />
                  </span>
                  <Media className="ml-2 d-none d-lg-block">
                    <span className="mb-0 text-sm font-weight-bold">
                      {authSl.user?.name}
                    </span>
                  </Media>
                </Media>
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-arrow" right>
                <DropdownItem className="noti-title" header tag="div">
                  <h6 className="text-overflow m-0">Xin chào!</h6>
                </DropdownItem>
                <Link href="/admin/profile">
                  <DropdownItem>
                    <i className="ni ni-single-02" />
                    <span>Thông tin</span>
                  </DropdownItem>
                </Link>
                <Link href="/admin/profile">
                  <DropdownItem>
                    <i className="ni ni-settings-gear-65" />
                    <span>Thiết lập</span>
                  </DropdownItem>
                </Link>
                <Link href="/admin/profile">
                  <DropdownItem>
                    <i className="ni ni-calendar-grid-58" />
                    <span>Hoạt động</span>
                  </DropdownItem>
                </Link>
                <Link href="/admin/profile">
                  <DropdownItem>
                    <i className="ni ni-support-16" />
                    <span>Hỗ trợ</span>
                  </DropdownItem>
                </Link>
                <DropdownItem divider />
                <DropdownItem href="#pablo" onClick={logout}>
                  <i className="ni ni-user-run" />
                  <span>Đăng xuất</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default UserNavbar;
