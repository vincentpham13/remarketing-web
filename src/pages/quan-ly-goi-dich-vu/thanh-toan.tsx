import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
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
import { createOrderThunk, userSelector } from '@/redux/features/user';
import { packageSelector } from '@/redux/features/package/package.slice';
import { getPackagesAsyncThunk } from '@/redux/features/package/package.thunk';
import { denormalizeEntitiesArray, formatMoney } from '@/helpers/data';
// import { setTextRange } from 'typescript';

const cardStyle = {
  width: '12.5rem',
  marginBottom: '1rem',
  marginRight: '1rem',
};

const MakePayment = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const packageSl = useSelector(packageSelector);
  const userSl = useSelector(userSelector);

  const { goi } = router.query;
  const [packageIds, setPackageIds] = useState([0]);
  const [buyingProductInfo, setBuyingProductInfo] = useState('');
  const [totalPriceInfo, setTotalPriceInfo] = useState('');

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  // Not mandantory fields
  const [businessName, setBusinessName] = useState('');
  const [businessAddress, setBusinessAddress] = useState('');
  const [taxId, setTaxId] = useState('');
  const [emailReceipt, setEmailReceipt] = useState('');

  const onFullNameChange = (e) => {
    const { value } = e.target;
    setFullName(value);
  };

  const onEmailChange = (e) => {
    const { value } = e.target;
    setEmail(value);
  };

  const onPhoneChange = (e) => {
    const { value } = e.target;
    setPhone(value);
  };

  const onAddressChange = (e) => {
    const { value } = e.target;
    setAddress(value);
  };

  const onBusinessNameChange = (e) => {
    const { value } = e.target;
    setBusinessName(value);
  };

  const onBusinessAddressChange = (e) => {
    const { value } = e.target;
    setBusinessAddress(value);
  };

  const onTaxIdChange = (e) => {
    const { value } = e.target;
    setTaxId(value);
  };

  const onEmailReceiptChange = (e) => {
    const { value } = e.target;
    setEmailReceipt(value);
  };

  const isOrderValid = () => {
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegex.test(email)) {
      return false;
    }

    const phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
    if (!phoneRegex.test(phone)) {
      return false;
    }

    const fullNameRegex = /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]+$/;
    if (!fullNameRegex.test(fullName)) {
      return false;
    }

    return true;
  };

  const formatPackages = (packages) => {
    console.log(
      '🚀 ~ file: thanh-toan.tsx ~ line 115 ~ formatPackages ~ packages',
      packages,
    );
    const maintainPackageNames: string[] = [];
    const messagePackageNames: string[] = [];

    for (const packagePlan of packages) {
      if (packagePlan?.packageTypeId === 1) {
        maintainPackageNames.push(
          `${packagePlan.label} - ${packagePlan.messageAmount * 1000} tin nhắn`,
        );
      }
      if (packagePlan?.packageTypeId === 2) {
        messagePackageNames.push(
          `${packagePlan.label} - ${packagePlan.messageAmount * 1000} tin nhắn`,
        );
      }
    }
    return (
      <div>
        {maintainPackageNames.length ? (
          <div className="text-small">{`Gói duy trì: ${maintainPackageNames.join(
            ', ',
          )}`}</div>
        ) : (
          ''
        )}

        {messagePackageNames.length ? (
          <div>{`Gói tin nhắn: ${messagePackageNames.join(', ')}`}</div>
        ) : (
          ''
        )}
      </div>
    );
  };

  const submitOrder = () => {
    const order = {
      fullName,
      email,
      phone,
      address,
      businessName,
      businessAddress,
      emailReceipt,
      taxId,
    };

    dispatch(
      createOrderThunk({
        order,
        packageIds,
      }),
    );
  };

  useEffect(() => {
    dispatch(getPackagesAsyncThunk());
  }, []);

  useEffect(() => {
    if (packageSl.status === 'succeeded') {
      const goiRegex = /^\[\d+(,\d+)?\]$/;
      if (!goiRegex.test(goi as string)) {
        router.push('/quan-ly-goi-dich-vu');
      }

      const packageIds = (goi as string)
        .replace('[', '')
        .replace(']', '')
        .split(',')
        .map((m) => parseInt(m, 10));

      if (!packageIds.every((packageId) => packageSl.ids.includes(packageId))) {
        router.push('/quan-ly-goi-dich-vu');
      }
      setPackageIds(packageIds);
      setBuyingProductInfo(
        formatPackages([
          packageSl.entities[packageIds[0]],
          packageSl.entities[packageIds[1]],
        ]),
      );
      setTotalPriceInfo(
        formatMoney(
          packageIds
            .map((id) => packageSl.entities[id])
            .reduce((a, b) => a + b?.price, 0),
        ),
      );
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
                        <div>{buyingProductInfo}</div>
                      </Col>
                      <Col lg="12">
                        <label className="form-control-label">
                          Tổng tiền: {totalPriceInfo} VND
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
                          checked={true}
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
                      <Button
                        disabled={!isOrderValid()}
                        onClick={submitOrder}
                        className="mt-3"
                        color="primary">
                        Hoàn tất đơn hàng
                      </Button>
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
                            Họ tên <span className="text-red">*</span>
                          </label>
                          <Input
                            className="form-control-alternative"
                            onChange={onFullNameChange}
                            value={fullName}
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
                            Email <span className="text-red">*</span>
                          </label>
                          <Input
                            className="form-control-alternative"
                            onChange={onEmailChange}
                            value={email}
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
                            Số điện thoại <span className="text-red">*</span>
                          </label>
                          <Input
                            className="form-control-alternative"
                            onChange={onPhoneChange}
                            value={phone}
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
                            onChange={onAddressChange}
                            value={address}
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
                            onChange={onBusinessNameChange}
                            value={businessName}
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
                            onChange={onTaxIdChange}
                            value={taxId}
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
                            onChange={onEmailReceiptChange}
                            value={emailReceipt}
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
                            onChange={onBusinessAddressChange}
                            value={businessAddress}
                            id="input-business-address"
                            placeholder="Địa chỉ đăng ký kinh doanh"
                            type="text"
                          />
                        </FormGroup>
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

MakePayment.getLayout = (page) => <User>{page}</User>;

export default MakePayment;
