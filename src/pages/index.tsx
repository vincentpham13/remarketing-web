import React from "react";
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
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
// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2,
} from "@/variables/charts";

import Header from "@/components/Headers/Header";

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeNav: 1,
      chartExample1Data: "data1",
    };
    if (window.Chart) {
      parseOptions(Chart, chartOptions());
    }
  }
  toggleNavs = (e, index) => {
    e.preventDefault();
    this.setState({
      activeNav: index,
      chartExample1Data:
        this.state.chartExample1Data === "data1" ? "data2" : "data1",
    });
  };
  render() {
    return (
      <>
        {/* Page content */}
        <Header />
        <div>
          {/* Card stats */}
          <Row className="mt-3">
            <Col lg="6" xl="4">
              <Card className="card-stats mb-4 mb-xl-0">
                <CardBody>
                  <Row>
                    <div className="col">
                      <CardTitle
                        tag="h5"
                        className="text-uppercase text-muted mb-0"
                      >
                        Số  lượng fanpage
                      </CardTitle>
                      <span className="h2 font-weight-bold mb-0">
                        10
                      </span>
                    </div>
                  </Row>
                  <p className="mt-3 mb-0 text-muted text-sm">
                  <span className="text-nowrap"></span>
                    <span className="text-warning mr-2 text-bold">
                      <strong></strong>
                    </span>{" "}
                  </p>
                  <p className="mt-3 mb-0 text-muted text-sm">
                  <span className="text-nowrap"></span>
                    <span className="text-warning mr-2 text-bold">
                      
                    </span>{" "}
                  </p>
                  <p className="mt-3 mb-0 text-muted text-sm">
                    <span className="text-nowrap"><a href="/fanpage">Tới quản lý fanpage</a></span>
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
                        className="text-uppercase text-muted mb-0"
                      >
                        Bạn đang sử dụng gói
                      </CardTitle>
                      <span className="h2 font-weight-bold mb-0">3 tháng</span>
                    </div>
                  </Row>
                  <p className="mt-3 mb-0 text-muted text-sm">
                  <span className="text-nowrap">Số tin nhắn còn lai: </span>
                    <span className="text-warning mr-2 text-bold">
                      <strong>2000</strong>
                    </span>{" "}
                  </p>
                  <p className="mt-3 mb-0 text-muted text-sm">
                  <span className="text-nowrap">Sử dụng đến hết ngày: </span>
                    <span className="text-warning mr-2 text-bold">
                      20/10/2021
                    </span>{" "}
                  </p>

                  <p className="mt-3 mb-0 text-muted text-sm">
                    <span className="text-nowrap"><a href="/user-plan">Tới quản lý gói</a></span>
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
                        className="text-uppercase text-muted mb-0"
                      >
                      Số chiến dịch đang chạy
                      </CardTitle>
                      <span className="h2 font-weight-bold mb-0">
                        2
                      </span>
                    </div>
                  </Row>
                  <p className="mt-3 mb-0 text-muted text-sm">
                  <span className="text-nowrap">Tổng số chiến dịch đã chạy: </span>
                    <span className="text-warning mr-2 text-bold">
                      <strong>2000</strong>
                    </span>{" "}
                  </p>
                  <p className="mt-3 mb-0 text-muted text-sm">
                  <span className="text-nowrap"></span>
                    <span className="text-warning mr-2 text-bold">
                      
                    </span>{" "}
                  </p>
                  <p className="mt-3 mb-0 text-muted text-sm">
                    <span className="text-nowrap"><a href="/campaign">Tới quản lý chiến dịch</a></span>
                  </p>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

Index.getLayout = (page) => <User>{page}</User>;

export default Index;
