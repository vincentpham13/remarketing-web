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
  Table,
  CardFooter,
} from 'reactstrap';
// layout for this page
import User from '@/layouts/User';
// core components
import UserHeader from '@/components/Headers/UserHeader';
import { userSelector } from '@/redux/features/user/user.slice';
import { updateUserInfoAsyncThunk } from '@/redux/features/user/user.thunk';
import { getOrdersAsyncThunk } from '@/redux/features/order/order.thunk';
import { orderSelector } from '@/redux/features/order/order.slice';
import {
  denormalizeEntitiesArray,
  formatPackages,
  formatPrice,
  formatStatus,
} from '@/helpers/data';
import { IOrder } from '@/redux/features/order/order.model';
import { PackageType } from '@/enums/Package';

const Profile = () => {
  const dispatch = useDispatch();
  const userSl = useSelector(userSelector);
  const orderSl = useSelector(orderSelector);

  const [isModified, setIsModified] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [job, setJob] = useState('');

  // Order history
  const [historyOrders, setHistoryOrders] = useState<IOrder[]>([]);

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
    dispatch(getOrdersAsyncThunk());
  }, []);

  useEffect(() => {
    if (orderSl.status === 'succeeded') {
      setHistoryOrders(denormalizeEntitiesArray(orderSl.ids, orderSl.entities));
    }
  }, [orderSl]);

  useEffect(() => {
    setName(userSl.name);
    setEmail(userSl.email);
    setJob(userSl.job);
    setPhone(userSl.phone);
  }, [userSl]);

  return (
    <>
      <UserHeader />
      {/* Page content */}
      <Container className="mt-3" fluid>
        <Row>
          <Col className="order-xl-2 mb-5 mb-xl-0 p-0" xl="4">
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
              <CardBody className="pt-0 pt-md-4 p-1">
                <Row>
                  <div className="col px-0">
                  <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                      <div>
                        <span className="description">Số tin đăng ký: </span><br></br>
                        <span className="description h5">{userSl.totalMessages == PackageType.UnlimitedMessageAmount ? 'Không giới hạn' : userSl.totalMessages}</span>
                      </div>
                      <div>
                        <span className="description">Số tin còn lại:</span><br></br>
                        <span className="description h5">
                          {
                            userSl.totalMessages == PackageType.UnlimitedMessageAmount 
                            ? `Không giới hạn` 
                            :userSl.totalMessages - userSl.successMessages
                          }
                        </span>
                      </div>
                      <div>
                        <span className="description">Số tin đã gửi:</span><br></br>
                        <span className="description h5">
                          {userSl.successMessages}
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
            <Row>
              <Col xl={12}>
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
                                Ngành nghề/lĩnh vực kinh doanh
                              </label>
                              <Input
                                className="form-control-alternative"
                                disabled={!isModified}
                                id="input-job"
                                value={userSl.job ? job : ''}
                                onChange={onJobChange}
                                placeholder="Ngành nghề/lĩnh vực kinh doanh"
                                type="text"
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                      </div>

                      <div className="pl-lg-12">
                        <Row>
                          <Col
                            lg="12"
                            className="d-inline-flex justify-content-end">
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
            <Row className="mt-3">
              <Col xl={12}>
                <Card className="bg-secondary shadow">
                  <CardHeader className="bg-white border-0">
                    <Row className="align-items-center">
                      <Col xs="8">
                        <h3 className="mb-0">Lịch sử giao dịch</h3>
                      </Col>
                      <Col className="text-right" xs="4"></Col>
                    </Row>
                  </CardHeader>
                  <CardBody className="p-0">
                    <Table
                      className="align-items-center table-flush"
                      responsive>
                      <thead className="thead-light">
                        <tr>
                          <th scope="col">Thời gian</th>
                          <th scope="col">Mã đơn hàng</th>
                          <th scope="col">Sản phẩm</th>
                          <th scope="col">Tổng tiền</th>
                          <th scope="col">Phương thức thanh toán</th>
                          <th scope="col">Trạng thái</th>
                        </tr>
                      </thead>
                      <tbody>
                        {historyOrders.map((order) => (
                          <tr key={order.id}>
                            <td>
                              {new Date(order.createdAt).toLocaleString(
                                'vi-VN',
                              )}
                            </td>
                            <th scope="row">{order.id}</th>
                            <td>{formatPackages(order.packages)}</td>
                            <td>{formatPrice(order.packages)}đ</td>
                            <td>Chuyển khoản</td>
                            <td>
                              {/* <i className="fas fa-check-circle text-success mr-3" />{' '} */}
                              {formatStatus(order.status)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </CardBody>
                  <CardFooter className="py-4">
                    {!historyOrders.length ? (
                      <p className="font-weight-bold text-black-50 text-center text-wrap">
                        Chưa có dữ liệu.
                      </p>
                    ) : null}
                  </CardFooter>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

Profile.getLayout = (page) => <User>{page}</User>;

export default Profile;
