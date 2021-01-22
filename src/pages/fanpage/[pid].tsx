import React from "react";
import { useRouter } from 'next/router';
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

const FanpageDetail = () => {
    const router = useRouter()
    const { pid } = router.query
    return (
      <>
        <Header />
        <div>
          {pid}
        </div>
      </>
    );
}

FanpageDetail.getLayout = (page) => <User>{page}</User>;

export default FanpageDetail;
