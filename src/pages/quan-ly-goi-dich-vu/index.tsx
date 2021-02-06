import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
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
} from 'reactstrap';
import User from '@/layouts/User';

import UserHeader from '@/components/Headers/UserHeader';
import { userSelector } from '@/redux/features/user';
import { packageSelector } from '@/redux/features/package/package.slice';
import { getPackagesAsyncThunk } from '@/redux/features/package/package.thunk';
import { denormalizeEntitiesArray, formatMoney } from '@/helpers/data';
import { PackageType } from '@/enums/Package';

const cardStyle = {
  width: '12.5rem',
  marginBottom: '1rem',
  marginRight: '1rem',
};

const PackagePlan = () => {
  const router = useRouter();
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
    setSelectedType2Id(undefined);
    setSelectedType2Id(packageId);
  };

  const goToPayment = () => {
    router.push(`/quan-ly-goi-dich-vu/don-hang?goi=[${[selectedType1Id, selectedType2Id].filter(f=>!!f).join(',')}]`);
  }

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
                  <div className="col">
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
                  {/* <div className="h5 font-weight-300">
                    <i className="ni location_pin mr-2" />
                    {userSl.email}
                  </div> */}
                  {/* <div className="h5 mt-4">
                    <i className="ni business_briefcase-24 mr-2" />
                    {userSl.phone}
                  </div>
                  <div>
                    <i className="ni education_hat mr-2" />
                    {userSl.job}
                  </div> */}
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col className="order-xl-1" xl="8">
            <Card className="bg-secondary shadow mb-3">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">
                      Gói duy trì thời gian sử dụng dịch vụ
                    </h3>
                  </Col>
                  <Col className="text-right" xs="4"></Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Col
                  className="d-inline-flex flex-wrap justify-content-start"
                  xl={12}>
                  {packagePlans
                    .filter((p) => p.packageTypeId == 1)
                    .map((packagePlan) => (
                      <Card key={packagePlan.id} style={cardStyle}>
                        {/* <CardImg
                          className="px-5"
                          alt="..."
                          src={require('assets/img/icons/app-icon.png')}
                          top></CardImg> */}
                        <CardBody>
                          <CardTitle className="mb--1">
                            <strong>{packagePlan.label}</strong>
                          </CardTitle>
                          <CardText>
                            {packagePlan.monthDuration} tháng sử dụng,
                            <br></br>
                            {
                              packagePlan.messageAmount == PackageType.UnlimitedMessageAmount 
                              ? ` Không giới hạn số tin nhắn`
                              : `Cộng thêm ${packagePlan.messageAmount * 1000} tin nhắn`
                            }<br></br>
                            Giá {` ${formatMoney(packagePlan.price)}`}đ.
                          </CardText>
                          <Button
                            color={`${
                              selectedType1Id === packagePlan.id
                                ? 'primary'
                                : 'secondary'
                            }`}
                            onClick={() =>
                              onPackageType1Select(packagePlan.id)
                            }>
                            {selectedType1Id === packagePlan.id
                              ? 'Đã chọn'
                              : 'chọn'}
                          </Button>
                        </CardBody>
                      </Card>
                    ))}
                </Col>
              </CardBody>
            </Card>
            <Card className="bg-default shadow">
              <CardHeader className="bg-transparent border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="text-white mb-0">Gói số lượng tin nhắn</h3>
                  </Col>
                  <Col className="text-right" xs="4"></Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Col
                  className="d-inline-flex flex-wrap justify-content-start"
                  xl={12}>
                  {packagePlans
                    .filter((p) => p.packageTypeId == 2)
                    .map((packagePlan) => (
                      <Card key={packagePlan.id} style={cardStyle}>
                        {/* <CardImg
                          className="px-5"
                          alt="..."
                          src={require('assets/img/icons/app-icon.png')}
                          top></CardImg> */}
                        <CardBody>
                          <CardTitle className="mb--1">
                            {packagePlan.label}
                          </CardTitle>
                          <CardText>
                            Cộng thêm {packagePlan.messageAmount * 1000} tin
                            nhắn, giá
                            {` ${formatMoney(packagePlan.price)}`}đ.
                          </CardText>
                          <Button
                            color={`${
                              selectedType2Id === packagePlan.id
                                ? 'primary'
                                : 'secondary'
                            }`}
                            onClick={() =>
                              onPackageType2Select(packagePlan.id)
                            }>
                            {selectedType2Id === packagePlan.id
                              ? 'Đã chọn'
                              : 'chọn'}
                          </Button>
                        </CardBody>
                      </Card>
                    ))}
                </Col>
              </CardBody>
            </Card>
            <div className="pl-lg-4 my-3">
              <Row className="float-right">
                <Col lg="6" className="d-inline-flex">
                  <Button
                    onClick={goToPayment}
                    disabled={!selectedType1Id && !selectedType2Id}
                    color="primary">
                    Thanh toán
                  </Button>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

PackagePlan.getLayout = (page) => <User>{page}</User>;

export default PackagePlan;
