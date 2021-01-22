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

class Fanpage extends React.Component {
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
        <Header />
        <div>
        <Table responsive className=" align-items-center table-light">
          <thead className="thead-light">
            <tr>
              <th className=" sort" data-sort="name" scope="col">
                Tên fanpage
              </th>
              <th className=" sort" data-sort="budget" scope="col">
                Số lượng user
              </th>
              <th className=" sort" data-sort="status" scope="col">
                Số chiến dịch đã chạy
              </th>
            </tr>
          </thead>
          <tbody className="list">
            <tr>
              <td scope="col" className="name"><a href="/fanpage/1">Mỹ phẩm Nana</a></td>
              <td className="budget">10</td>
              <td className="budget">1</td>
            </tr>
          </tbody>
        </Table>
        </div>
      </>
    );
  }
}

Fanpage.getLayout = (page) => <User>{page}</User>;

export default Fanpage;
