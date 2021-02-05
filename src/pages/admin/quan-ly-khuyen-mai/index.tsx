import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
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
  Button,
} from 'reactstrap';
// layout for this page
import Admin from '@/layouts/Admin';
// core components
import UserHeader from '@/components/Headers/UserHeader';
import {
  adminSelector,
  confirmUserOrderAsyncThunk,
  getPromotionsAsyncThunk,
  getUserOrdersAsyncThunk,
} from '@/redux/features/admin';
import {
  denormalizeEntitiesArray,
  formatMoney,
  formatPackages,
  formatPrice,
} from '@/helpers/data';
import { IOrder, IPromotion } from '@/redux/features/admin/admin.model';

const ManagePromotion = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const adminSl = useSelector(adminSelector);

  const [promotions, setPromotions] = useState<IPromotion[]>([]);

  useEffect(() => {
    dispatch(getPromotionsAsyncThunk());
  }, []);

  useEffect(() => {
    if (adminSl.promotions.status === 'succeeded') {
      setPromotions(
        denormalizeEntitiesArray(
          adminSl.promotions.ids,
          adminSl.promotions.entities,
        ),
      );
    }
  }, [adminSl.promotions.status]);

  return (
    <>
      <UserHeader />
      {/* Page content */}
      <Container className="mt-3" fluid>
        {/* Dark table */}
        <Row>
          <div className="col">
            <Card className="bg-default shadow">
              <CardHeader className="bg-transparent border-0 py-2">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="text-white">Mã khuyến mãi</h3>
                  </div>
                  <div className="col text-right">
                    <Button
                      color="primary"
                      onClick={() =>  router.push(`${router.pathname}/them-ma`)}
                      size="md">
                      Thêm mã mới
                    </Button>
                  </div>
                </Row>
              </CardHeader>
              <Table
                className="align-items-center table-dark table-flush"
                responsive>
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">Mã khuyến mãi</th>
                    <th scope="col">Loại khuyến mãi</th>
                    <th scope="col">Mức ưu đãi</th>
                    <th scope="col">Mô tả</th>
                    <th scope="col">Sử dụng/hết hạn</th>
                    <th scope="col">Ngày hết hạn</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {promotions.map((promotion) => (
                    <tr key={new Date(promotion.createdAt).getTime()}>
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
                            <span className="mb-0 text-sm">
                              #{promotion.code}
                            </span>
                          </Media>
                        </Media>
                      </th>
                      <td>
                        {promotion.monthDuration ? 'Tăng thời hạn sử dụng' : ''}{' '}
                        {promotion.messageAmount ? 'Tăng số tin nhắn' : ''}
                      </td>
                      <td>{promotion.monthDuration} tháng</td>
                      <td>{promotion.description}</td>
                      <td>0/{promotion.quantity}</td>
                      <td>
                        {new Date(promotion.validTo).toLocaleDateString(
                          'vi-VN',
                        )}
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
                              // onClick={() => confirmOrder(order.id)}
                            >
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
                {promotions.length ? (
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

ManagePromotion.getLayout = (page) => <Admin>{page}</Admin>;

export default ManagePromotion;
