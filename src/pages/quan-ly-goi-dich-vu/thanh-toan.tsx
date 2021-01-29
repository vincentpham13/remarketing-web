import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
  CardImg,
  CardText,
  CardTitle,
  Form,
  FormGroup,
  Input,
} from 'reactstrap';
import User from '@/layouts/User';

import UserHeader from '@/components/Headers/UserHeader';
import { userSelector } from '@/redux/features/user';
import { packageSelector } from '@/redux/features/package/package.slice';
import { getPackagesAsyncThunk } from '@/redux/features/package/package.thunk';
import { denormalizeEntitiesArray, formatMoney } from '@/helpers/data';

const cardStyle = {
  width: '12.5rem',
  marginBottom: '1rem',
  marginRight: '1rem',
};

const MakePayment = () => {
  const dispatch = useDispatch();
  const packageSl = useSelector(packageSelector);
  const userSl = useSelector(userSelector);

  const [packagePlans, setPackagePlans] = useState([]);
  const [selectedType1Id, setSelectedType1Id] = useState();
  const [selectedType2Id, setSelectedType2Id] = useState();

  const [] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [job, setJob] = useState('');

  const onPackageType1Select = (packageId) => {
    setSelectedType1Id(undefined);
    setSelectedType1Id(packageId);
  };

  const onPackageType2Select = (packageId) => {
    setSelectedType1Id(undefined);
    setSelectedType2Id(packageId);
  };

  useEffect(() => {
    setName(userSl.name);
    setEmail(userSl.email);
    setJob(userSl.job);
    setPhone(userSl.phone);
  }, [userSl]);

  useEffect(() => {
    dispatch(getPackagesAsyncThunk());
  }, []);

  useEffect(() => {
    if (packageSl.status === 'succeeded') {
      const data = denormalizeEntitiesArray(packageSl.ids, packageSl.entities);
      setPackagePlans(data);
    }
  }, [packageSl.status]);

  return (
    <>
      <UserHeader />
      {/* Page content */}
      <Container className="mt--5" fluid>
        <Row>
          <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
            <Card className="card-profile shadow">
              <CardBody className="pt-0 pt-md-4">
                <Form>
                  <h6 className="heading-small text-muted mb-4">
                    Thông tin đơn hàng
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="12">
                        <label className="form-control-label">Sản phẩm</label>
                      </Col>
                      <Col lg="12">
                        <label className="form-control-label">
                          Tổng tiền: 5,400,000 VND
                        </label>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />
                  {/* Address */}
                  <h6 className="heading-small text-muted mb-4">
                    Thông tin xuất hoá đơn
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <div className="custom-control custom-radio mb-3">
                        <input
                          className="custom-control-input"
                          id="customRadio1"
                          name="customRadio"
                          type="radio"></input>
                        <label
                          className="custom-control-label"
                          htmlFor="customRadio1">
                          Chuyển khoản qua ngân hàng
                        </label>
                      </div>
                      <div className="custom-control custom-radio">
                        <input
                          className="custom-control-input"
                          id="customRadio2"
                          name="customRadio"
                          type="radio"></input>
                        <label
                          className="custom-control-label"
                          htmlFor="customRadio2">
                          Thanh toán online qua VTC Pay
                        </label>
                      </div>
                      <Button className="mt-3" color="primary">Hoàn tất đơn hàng</Button>
                    </Row>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
          <Col className="order-xl-1" xl="8">
            <Card className="bg-secondary shadow">
              <CardBody>
                <Form>
                  <h6 className="heading-small text-muted mb-4">
                    Thông tin thanh toán
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-fullname">
                            Họ tên *
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-fullname"
                            placeholder="Họ tên"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-email">
                            Email *
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-email"
                            placeholder="Email"
                            type="email"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-phone">
                            Số điện thoại
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-phone"
                            placeholder="Số điện thoại"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col md="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-address">
                            Địa chỉ
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue="2A/4"
                            id="input-address"
                            placeholder=""
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />
                  {/* Address */}
                  <h6 className="heading-small text-muted mb-4">
                    Thông tin xuất hoá đơn
                  </h6>
                  <div className="pl-lg-4">
                    <Row></Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-business-name">
                            Tên doanh nghiệp
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-business-name"
                            placeholder="Tên doanh nghiệp"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-tax-id">
                            Mã số thuế
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-tax-id"
                            placeholder="Mã số thuế"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-email">
                            Email đăng ký nhận hoá đơn
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-email"
                            placeholder="Email"
                            type="email"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-business-address">
                            Địa chỉ đăng ký kinh doanh
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-business-address"
                            placeholder="Địa chỉ đăng ký kinh doanh"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                </Form>
                <div className="pl-lg-4 my-3">
                  <Row className="float-right">
                    <Col lg="6" className="d-inline-flex">
                      <Button
                        // disabled={!selectedType1Id && !selectedType2Id}
                        color="primary">
                        Thanh toán
                      </Button>
                    </Col>
                  </Row>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

MakePayment.getLayout = (page) => <User>{page}</User>;

export default MakePayment;
