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
  Col,
  CardBody,
  CardTitle,
  FormGroup,
  Button,
  Form,
  Input,
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
  formatPackages,
  formatPrice,
} from '@/helpers/data';

const ManagePromotion = () => {
  const dispatch = useDispatch();
  const adminSl = useSelector(adminSelector);

  const [orders, setOrders] = useState([]);

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
          <Col xl={6}>
            <Card className="card-stats mb-4 mb-xl-0">
              <CardBody>
                <Row>
                  <div className="col d-inline-flex align-items-center">
                    <CardTitle
                      tag="h3"
                      className="text-uppercase text-primary mb-0">
                      Thông tin khuyến mãi
                    </CardTitle>
                  </div>
                </Row>
                <Form>
                  <div className="mt-3">
                    <Row>
                      <Col lg="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username">
                            Mã khuyến mãi <span className="text-red">*</span>
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-username"
                            placeholder=""
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <div>
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-phone">
                            Mô tả thông tin của khuyến mãi
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-phone"
                            placeholder="Mô tả"
                            aria-rowcount={5}
                            type="textarea"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <div>
                    <Row>
                      <Col md="6">
                        <div className="custom-control custom-checkbox">
                          <input
                            checked={true}
                            className="custom-control-input"
                            id="customRadio1"
                            name="customRadio"
                            type="checkbox"></input>
                          <label
                            className="custom-control-label"
                            htmlFor="customRadio1">
                            Tăng thời hạn sử dụng
                          </label>
                        </div>
                      </Col>
                      <Col md="6">
                        <div className="custom-control custom-checkbox mb-3">
                          <Input
                            className="form-control-alternative"
                            id="input-username"
                            placeholder="số tháng"
                            type="number"
                          />
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="6">
                        <div className="custom-control custom-checkbox">
                          <input
                            checked={true}
                            className="custom-control-input"
                            id="customRadio1"
                            name="customRadio"
                            type="checkbox"></input>
                          <label
                            className="custom-control-label"
                            htmlFor="customRadio1">
                            Tăng số lượng tin nhắn
                          </label>
                        </div>
                      </Col>
                      <Col md="6">
                        <div className="custom-control custom-checkbox mb-3">
                          <Input
                            className="form-control-alternative"
                            id="input-username"
                            placeholder="số tin nhắn"
                            type="number"
                          />
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
          <Col xl={6}>
            <Card className="card-stats mb-4 mb-xl-0">
              <CardBody>
                <Row>
                  <div className="col d-inline-flex align-items-center">
                    <CardTitle
                      tag="h3"
                      className="text-uppercase text-primary mb-0">
                      Nội dung khuyến mãi
                    </CardTitle>
                  </div>
                </Row>
                <Form>
                  <div className="mt-3">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username">
                            Số lượng ưu đãi <span className="text-red">*</span>
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-username"
                            placeholder=""
                            type="number"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username">
                            Ngày hết hạn <span className="text-red">*</span>
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-username"
                            placeholder=""
                            type="date"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <div className="mt-3">
                    <Row>
                      <Col lg="12">
                        <FormGroup>
                          <label
                            className="form-control-label mr-3"
                            htmlFor="input-username">
                            Áp dụng khi mua gói{'   '}
                          </label>
                          <UncontrolledDropdown>
                            <DropdownToggle
                              caret
                              color="secondary"
                              id="dropdownMenuButton"
                              size="lg"
                              type="button">
                              
                            </DropdownToggle>
                            <DropdownMenu aria-labelledby="dropdownMenuButton">
                              <DropdownItem
                                onClick={(e) => e.preventDefault()}>
                                Goi MT100234324324
                              </DropdownItem>
                              <DropdownItem
                                onClick={(e) => e.preventDefault()}>
                                Goi MT100234324324
                              </DropdownItem>
                              <DropdownItem
                                onClick={(e) => e.preventDefault()}>
                                Goi MT100234324324
                              </DropdownItem>
                            </DropdownMenu>
                          </UncontrolledDropdown>
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <div>
                    <Row>
                      <Col md="12">
                        <Button 
                        type="button" 
                        color="primary"
                        >Lưu mã khuyến mãi</Button>
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

ManagePromotion.getLayout = (page) => <Admin>{page}</Admin>;

export default ManagePromotion;
