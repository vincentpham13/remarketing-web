import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Badge,
  Card,
  CardHeader,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Table,
  Container,
  Row,
} from 'reactstrap';
// layout for this page
import Admin from '@/layouts/Admin';
// core components
import UserHeader from '@/components/Headers/UserHeader';
import { adminSelector, getUserOrdersAsyncThunk } from '@/redux/features/admin';

const ManageOrder = () => {
  const dispatch = useDispatch();
  const adminSl = useSelector(adminSelector);

  useEffect(() => {
    dispatch(getUserOrdersAsyncThunk())
  }, []);

  return (
    <>
      <UserHeader />
      {/* Page content */}
      <Container className="mt--5" fluid>
        {/* Dark table */}
        <Row>
          <div className="col">
            <Card className="bg-default shadow">
              <CardHeader className="bg-transparent border-0">
                <h3 className="text-white mb-0">Đơn hàng</h3>
              </CardHeader>
              <Table
                className="align-items-center table-dark table-flush"
                responsive>
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">Mã đơn hàng</th>
                    <th scope="col">Ngày tạo</th>
                    <th scope="col">Gói duy trì</th>
                    <th scope="col">Số tiền</th>
                    <th scope="col">Trạng thái</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">
                      <Media className="align-items-center">
                        <a
                          className="avatar rounded-circle mr-3"
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}>
                          <img
                            alt="..."
                            src={require('assets/img/theme/bootstrap.jpg')}
                          />
                        </a>
                        <Media>
                          <span className="mb-0 text-sm">100372</span>
                        </Media>
                      </Media>
                    </th>
                    <td>1/1/2020</td>
                    <td>T3000</td>
                    <td>$2,500 USD</td>
                    <td>
                      <Badge color="" className="badge-dot mr-4">
                        <i className="bg-warning" />
                        pending
                      </Badge>
                    </td>
                    <td className="text-right">
                      <UncontrolledDropdown>
                        <DropdownToggle
                          className="btn-icon-only text-light"
                          href="#pablo"
                          role="button"
                          size="sm"
                          color=""
                          onClick={(e) => e.preventDefault()}>
                          <i className="fas fa-ellipsis-v" />
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-arrow" right>
                          <DropdownItem
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}>
                            Đã chuyển khoản
                          </DropdownItem>
                          <DropdownItem
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}>
                            Huỷ đơn
                          </DropdownItem>
                          <DropdownItem
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}>
                            Báo cáo sai phạm
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

ManageOrder.getLayout = (page) => <Admin>{page}</Admin>;

export default ManageOrder;
