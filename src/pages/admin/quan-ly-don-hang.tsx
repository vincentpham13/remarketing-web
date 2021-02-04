import React, { useEffect, useState } from 'react';
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
  CardFooter,
  Pagination,
  PaginationItem,
  PaginationLink,
} from 'reactstrap';
// layout for this page
import Admin from '@/layouts/Admin';
// core components
import UserHeader from '@/components/Headers/UserHeader';
import {
  adminSelector,
  confirmUserOrderAsyncThunk,
  getUserOrdersAsyncThunk,
} from '@/redux/features/admin';
import {
  denormalizeEntitiesArray,
  formatMoney,
  formatNumber,
} from '@/helpers/data';

const ManageOrder = () => {
  const dispatch = useDispatch();
  const adminSl = useSelector(adminSelector);

  const [orders, setOrders] = useState([]);

  const formatPackages = (packages) => {
    const maintainPackageNames: string[] = [];
    const messagePackageNames: string[] = [];

    for (const packagePlan of packages) {
      if (packagePlan.packageTypeId === 1) {
        maintainPackageNames.push(packagePlan.label);
      }
      if (packagePlan.packageTypeId === 2) {
        messagePackageNames.push(packagePlan.label);
      }
    }
    return `${
      maintainPackageNames.length
        ? ` Gói duy trì: ${maintainPackageNames.join(', ')}`
        : ''
    } ${
      messagePackageNames.length
        ? ` Gói tin nhắn: ${messagePackageNames.join(', ')}`
        : ''
    } `;
  };

  const formatPrice = (packages) => {
    return formatMoney(
      packages.reduce((a, b) => {
        return a + b.price;
      }, 0),
    );
  };

  const confirmOrder = (orderId) => {
    dispatch(confirmUserOrderAsyncThunk(orderId));
  };

  useEffect(() => {
    dispatch(getUserOrdersAsyncThunk());
  }, []);

  useEffect(() => {
    if (adminSl.orders.status === 'succeeded') {
      setOrders(
        denormalizeEntitiesArray(adminSl.orders.ids, adminSl.orders.entities),
      );
    }
  }, [adminSl.orders.status]);

  return (
    <>
      <UserHeader />
      {/* Page content */}
      <Container className="mt-3" fluid>
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
                    <th scope="col">Gói</th>
                    <th scope="col">Số tiền</th>
                    <th scope="col">Trạng thái</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={new Date(order.createdAt).toLocaleString()}>
                      <th scope="row">
                        <Media className="align-items-center">
                          <a
                            className="notification rounded-circle mr-3"
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}>
                            {/* <img
                              alt="..."
                              src={require('assets/img/theme/bootstrap.jpg')}
                            /> */}
                          </a>
                          <Media>
                            <span className="mb-0 text-sm">{order.id}</span>
                          </Media>
                        </Media>
                      </th>
                      <td>{new Date(order.createdAt).toLocaleString()}</td>
                      <td>{formatPackages(order.packages)}</td>
                      <td>{formatPrice(order.packages)}đ</td>
                      <td>
                        <Badge color="" className="badge-dot mr-4">
                          <i
                            className={
                              order.status === 'success'
                                ? 'bg-success'
                                : 'bg-warning'
                            }
                          />
                          {order.status === 'success'
                            ? 'Đã thanh toán'
                            : 'Chờ thanh toán'}
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
                              onClick={() => confirmOrder(order.id)}>
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
                  ))}
                </tbody>
              </Table>
              <CardFooter className="bg-transparent py-4 w-100">
                {orders.length ? (
                  <nav aria-label="...">
                    <Pagination
                      className="pagination justify-content-end mb-0"
                      listClassName="justify-content-end mb-0">
                      <PaginationItem className="disabled">
                        <PaginationLink
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                          tabIndex="-1">
                          <i className="fas fa-angle-left" />
                          <span className="sr-only">Previous</span>
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem className="active">
                        <PaginationLink
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}>
                          1
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}>
                          <i className="fas fa-angle-right" />
                          <span className="sr-only">Next</span>
                        </PaginationLink>
                      </PaginationItem>
                    </Pagination>
                  </nav>
                ) : (
                  <p className="font-weight-bold text-white text-center text-wrap">
                    Chưa có dữ liệu.
                  </p>
                )}
              </CardFooter>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

ManageOrder.getLayout = (page) => <Admin>{page}</Admin>;

export default ManageOrder;
