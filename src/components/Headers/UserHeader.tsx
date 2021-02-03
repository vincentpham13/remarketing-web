import { getMeDashboardAsyncThunk, userSelector } from '@/redux/features/user';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
// reactstrap components
import { Card, CardBody, CardTitle, Col, Container, Row } from 'reactstrap';
import moment from 'moment';

const UserHeader = (props) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour >= 12 && hour <= 17) setGreeting('Good Afternoon');
    else if (hour >= 17 && hour <= 24) setGreeting('Good Evening');

  }, [new Date()]);

  const renderStats = () => {
    return (
      <Row>
        <Col lg="6" xl="4" className="px-1">
          <Card className="card-stats mb-4 mb-xl-0">
            <CardBody className="px-3">
              <Row>
                <div className="col">
                  <CardTitle
                    tag="h5"
                    className="text-uppercase text-muted mb-0">
                    Số fanpage
                  </CardTitle>
                  <span className="h2 font-weight-bold mb-0">{props.userSl.dashboardInfo?.pageCount}</span>
                </div>
              </Row>
              <p className="mt-2 mb-0 text-muted text-sm">
                <span className="text-nowrap"></span>
                <span className="text-warning mr-2 text-bold">
                  <strong></strong>
                </span>{' '}
              </p>
              <p className="mt-2 mb-0 text-muted text-sm">
                <span className="text-nowrap"></span>
                <span className="text-warning mr-2 text-bold">
                  <strong></strong>
                </span>{' '}
              </p>
              <p className="mt-2 mb-0 text-muted text-sm">
                <span className="text-nowrap">
                  <Link href="/quan-ly-fan-page">Tới quản lý Fanpages</Link>
                </span>
              </p>
            </CardBody>
          </Card>
        </Col>
        <Col lg="6" xl="4" className="px-1">
          <Card className="card-stats mb-4 mb-xl-0">
            <CardBody className="px-3">
              <Row>
                <div className="col">
                  <CardTitle
                    tag="h5"
                    className="text-uppercase text-muted mb-0">
                    Gói đang dùng
                  </CardTitle>
                  <span className="h2 font-weight-bold mb-0">{props.userSl.dashboardInfo?.userPlan?.label}</span>
                </div>
              </Row>
              <p className="mt-2 mb-0 text-muted text-sm">
                <span className="text-nowrap">Số tin nhắn còn lại </span>
                <span className="text-success mr-2 text-bold">
                  <strong>{props.userSl.dashboardInfo.userPlan.totalMessages - props.userSl.dashboardInfo.userPlan.successMessages}</strong>
                </span>{' '}
              </p>
              <p className="mt-2 mb-0 text-muted text-sm">
                <span className="text-nowrap">Sử dụng đến ngày: </span>
                <span className="text-info mr-2 text-bold">
                {new Date(props.userSl.dashboardInfo.userPlan.validTo).toLocaleString('en-GB')}
                </span>{' '}
              </p>

              <p className="mt-2 mb-0 text-muted text-sm">
                <span className="text-nowrap">
                  <Link href="/quan-ly-goi-dich-vu">Tới quản lý gói</Link>
                </span>
              </p>
            </CardBody>
          </Card>
        </Col>
        <Col lg="6" xl="4" className="px-1">
          <Card className="card-stats mb-4 mb-xl-0">
            <CardBody className="px-3">
              <Row>
                <div className="col">
                  <CardTitle
                    tag="h5"
                    className="text-uppercase text-muted mb-0">
                    Chiến dịch đang chạy
                  </CardTitle>
                  <span className="h2 font-weight-bold mb-0">{props.userSl.dashboardInfo.runningCampaign}</span>
                </div>
              </Row>
              <p className="mt-2 mb-0 text-muted text-sm">
                <span className="text-nowrap">
                  Tổng số chiến dịch đã chạy:{' '}
                </span>
                <span className="text-warning mr-2 text-bold">
                  <strong>{props.userSl.dashboardInfo.completedCampaign}</strong>
                </span>{' '}
              </p>
              <p className="mt-2 mb-0 text-muted text-sm">
                <span className="text-nowrap"></span>
                <span className="text-warning mr-2 text-bold"></span>{' '}
              </p>
              <p className="mt-2 mb-0 text-muted text-sm">
                <span className="text-nowrap">
                  <Link href="/quan-ly-chien-dich">Tới quản lý chiến dịch</Link>
                </span>
              </p>
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  };

  return (
    <>
      <div className="header bg-gradient-dark pb-6 pt-2 pt-md-8">
        <Container fluid>
          <div className="header-body">
            {router.pathname === '/' ? (
              renderStats()
            ) : (
              <h1 className="display-2 text-white">
                {greeting}! {props.userSl?.name.split(' ').pop()}
              </h1>
            )}
          </div>
        </Container>
      </div>
    </>
  );
};

export default UserHeader;
