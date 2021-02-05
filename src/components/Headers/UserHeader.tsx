import { userSelector } from '@/redux/features/user';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
// reactstrap components
import { Card, CardBody, CardTitle, Col, Container, Row } from 'reactstrap';
import { formatNumber } from '@/helpers/data';
import { campaignsSelector } from '@/redux/features/campaign';
import { fanpagesSelector } from '@/redux/features/fanpage/fanpage.slice';

const UserHeader = () => {
  const router = useRouter();

  const [greeting, setGreeting] = useState('');
  const userSl = useSelector(userSelector);
  const campaignSl = useSelector(campaignsSelector);
  const fanpageSl = useSelector(fanpagesSelector);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour >= 12 && hour <= 17) setGreeting('Good Afternoon');
    else if (hour >= 17 && hour <= 24) setGreeting('Good Evening');
  }, [new Date()]);

  const renderStats = () => {
    return (
      <Row className="pb--3">
        <Col lg="6" xl="4">
          <Card className="card-stats mb-4 mb-xl-0">
            <CardBody>
              <Row>
                <div className="col d-inline-flex align-items-center">
                  <CardTitle
                    tag="h5"
                    className="text-uppercase text-muted mb-0">
                    Gói đang dùng
                  </CardTitle>
                  <span className="h2 font-weight-bold mb-0 ml-2">
                    {userSl.packageName}
                  </span>
                </div>
              </Row>
              <p className="mt-2 mb-0 text-muted text-sm">
                <span className="text-nowrap">Số tin nhắn còn lại: </span>
                <span className="text-dark mr-2 text-bold">
                  <strong>
                    {formatNumber(
                      userSl.totalMessages - userSl.successMessages,
                    )}
                  </strong>
                </span>{' '}
              </p>
              <p className="mt-2 mb-0 text-muted text-sm">
                <span className="text-nowrap">Có giá trị đến ngày: </span>
                <span className="text-dark mr-2 text-weight-bold">
                  {new Date(userSl.validTo).toLocaleString('vi-VN')}
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
        <Col lg="6" xl="4">
          <Card className="card-stats mb-4 mb-xl-0">
            <CardBody>
              <Row>
                <div className="col d-inline-flex align-items-center">
                  <CardTitle
                    tag="h5"
                    className="text-uppercase text-muted mb-0">
                    Số fanpage
                  </CardTitle>
                  <span className="h2 font-weight-bold mb-0 ml-2">
                    {fanpageSl.ids.length}
                  </span>
                </div>
              </Row>
              <p className="mt-2 mb-0 text-muted text-sm">
                <span className="text-nowrap"></span>
                <span className="text-dark mr-2 text-bold ml-2">
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
        <Col lg="6" xl="4">
          <Card className="card-stats mb-4 mb-xl-0">
            <CardBody>
              <Row>
                <div className="col d-inline-flex align-items-center">
                  <CardTitle
                    tag="h5"
                    className="text-uppercase text-muted mb-0">
                    Chiến dịch đã chạy
                  </CardTitle>
                  <span className="h2 font-weight-bold mb-0 ml-2">
                    {campaignSl.ids.length}
                  </span>
                </div>
              </Row>
              <p className="mt-2 mb-0 text-muted text-sm">
                <span className="text-nowrap">Tổng số tin nhắn đã gửi: </span>
                <span className="text-dark mr-2 text-bold">
                  <strong>{userSl.successMessages}</strong>
                </span>
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
      <div
        className={`header bg-gradient-dark ${
          router.pathname === '/' ? 'pb-6' : ''
        } pt-2 pt-md-6`}>
        <Container fluid>
          <div className="header-body">
            {router.pathname === '/' ? (
              renderStats()
            ) : (
              <h1 className="display-2 text-white">
                {greeting}! {userSl.name.split(' ').pop()}
              </h1>
            )}
          </div>
        </Container>
      </div>
    </>
  );
};

export default UserHeader;
