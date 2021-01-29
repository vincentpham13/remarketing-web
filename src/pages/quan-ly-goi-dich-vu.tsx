import React from 'react';
// node.js library that concatenates classes (strings)
import classnames from 'classnames';
// javascipt plugin for creating charts
import Chart from 'chart.js';
// react plugin used to create charts
import { Line, Bar } from 'react-chartjs-2';
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
  CardImg,
  CardText,
  CardTitle,
} from 'reactstrap';
// layout for this page
import User from '@/layouts/User';
// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2,
} from '@/variables/charts';

import UserHeader from '@/components/Headers/UserHeader';

const cardStyle = { width: '18rem', marginBottom: '1rem' };
class PackagePlan extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeNav: 1,
      chartExample1Data: 'data1',
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
        this.state.chartExample1Data === 'data1' ? 'data2' : 'data1',
    });
  };

  render() {
    return (
      <>
        <UserHeader />
        {/* Page content */}
        <Container className="mt--5" fluid>
          <Row>
            <Col className="mb-xl-0 mx-1" lg="4" xl="3">
              <Card style={cardStyle}>
                <CardImg
                  alt="..."
                  src={require('assets/img/theme/img-1-1000x600.jpg')}
                  top></CardImg>
                <CardBody>
                  <CardTitle>T-3000</CardTitle>
                  <CardText>
                    Có ngay 3 tháng sử dụng và được cộng thêm 3000 tin nhắn chỉ với giá 299,000đ.
                  </CardText>
                  <Button color="primary" href="javascript:;">
                    Mua ngay
                  </Button>
                </CardBody>
              </Card>
            </Col>
            <Col className="mb-xl-0 mx-1" lg="4" xl="3">
              <Card style={cardStyle}>
                <CardImg
                  alt="..."
                  src={require('assets/img/theme/img-1-1000x600.jpg')}
                  top></CardImg>
                <CardBody>
                  <CardTitle>T-3000</CardTitle>
                  <CardText>
                    Có ngay 3 tháng sử dụng và được cộng thêm 3000 tin nhắn chỉ với giá 299,000đ.
                  </CardText>
                  <Button color="primary" href="javascript:;">
                    Mua ngay
                  </Button>
                </CardBody>
              </Card>
            </Col>
            <Col className="mb-xl-0 mx-1" lg="4" xl="3">
              <Card style={cardStyle}>
                <CardImg
                  alt="..."
                  src={require('assets/img/theme/img-1-1000x600.jpg')}
                  top></CardImg>
                <CardBody>
                  <CardTitle>T-3000</CardTitle>
                  <CardText>
                    Có ngay 3 tháng sử dụng và được cộng thêm 3000 tin nhắn chỉ với giá 299,000đ.
                  </CardText>
                  <Button color="primary" href="javascript:;">
                    Mua ngay
                  </Button>
                </CardBody>
              </Card>
            </Col>
            <Col className="mb-xl-0 mx-1" lg="4" xl="3">
              <Card style={cardStyle}>
                <CardImg
                  alt="..."
                  src={require('assets/img/theme/img-1-1000x600.jpg')}
                  top></CardImg>
                <CardBody>
                  <CardTitle>T-3000</CardTitle>
                  <CardText>
                    Có ngay 3 tháng sử dụng và được cộng thêm 3000 tin nhắn chỉ với giá 299,000đ.
                  </CardText>
                  <Button color="primary" href="javascript:;">
                    Mua ngay
                  </Button>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

PackagePlan.getLayout = (page) => <User>{page}</User>;

export default PackagePlan;
