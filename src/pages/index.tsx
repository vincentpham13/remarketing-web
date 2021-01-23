import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import { authSelector } from '@/redux/features/auth';
import classnames from "classnames";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,
  CardTitle,
} from "reactstrap";
// layout for this page
import User from "@/layouts/User";
import {
  chartOptions,
  parseOptions,
} from "@/variables/charts";
import { Line, Bar } from "react-chartjs-2";

import Header from "@/components/Headers/Header";

const Index = () => {
  const router = useRouter();
  const auth = useSelector(authSelector);

  useEffect(() => {
    // user
    if (
      auth.user?.roleId === 1 &&
      auth.status === 'succeeded' &&
      auth.isAuthenticated &&
      auth.token
    ) {
      // router.push('/user');
    }
    // admin
    else if (
      auth.user?.roleId === 2 &&
      auth.status === 'succeeded' &&
      auth.isAuthenticated &&
      auth.token
    ) {
      router.push('/admin/dashboard');
    } else {
      router.push('/auth/login');
    }
  }, [auth]);

  return (
    <>
      {/* Page content */}
      <Header />
      <div className="header bg-gradient-dark pb-8 pt-2 pt-md-6">
        <Container fluid>
          <div className="header-body">
            {/* Card stats */}
            <Row className="mt-3">
              <Col lg="6" xl="4">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0">
                          Số lượng fanpage
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">10</span>
                      </div>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-nowrap"></span>
                      <span className="text-warning mr-2 text-bold">
                        <strong></strong>
                      </span>{' '}
                    </p>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-nowrap"></span>
                      <span className="text-warning mr-2 text-bold"></span>{' '}
                    </p>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-nowrap">
                        <a href="/user/fanpage">Tới quản lý fanpage</a>
                      </span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="4">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0">
                          Bạn đang sử dụng gói
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          3 tháng
                        </span>
                      </div>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-nowrap">Số tin nhắn còn lai: </span>
                      <span className="text-warning mr-2 text-bold">
                        <strong>2000</strong>
                      </span>{' '}
                    </p>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-nowrap">
                        Sử dụng đến hết ngày:{' '}
                      </span>
                      <span className="text-warning mr-2 text-bold">
                        20/10/2021
                      </span>{' '}
                    </p>

                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-nowrap">
                        <a href="/user/user-plan">Tới quản lý gói</a>
                      </span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="4">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0">
                          Số chiến dịch đang chạy
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">2</span>
                      </div>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-nowrap">
                        Tổng số chiến dịch đã chạy:{' '}
                      </span>
                      <span className="text-warning mr-2 text-bold">
                        <strong>2000</strong>
                      </span>{' '}
                    </p>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-nowrap"></span>
                      <span className="text-warning mr-2 text-bold"></span>{' '}
                    </p>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-nowrap">
                        <a href="/user/campaign">Tới quản lý chiến dịch</a>
                      </span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
};

Index.getLayout = (page) => <User>{page}</User>;

export default Index;
