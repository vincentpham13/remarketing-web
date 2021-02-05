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
  Table,
} from 'reactstrap';
import User from '@/layouts/User';

import UserHeader from '@/components/Headers/UserHeader';
import { userSelector } from '@/redux/features/user';
import { packageSelector } from '@/redux/features/package/package.slice';
import { getPackagesAsyncThunk } from '@/redux/features/package/package.thunk';
import {
  denormalizeEntitiesArray,
  formatMoney,
  formatPrice,
} from '@/helpers/data';
import {
  createOrderThunk,
  getOrdersAsyncThunk,
} from '@/redux/features/order/order.thunk';
import { orderSelector } from '@/redux/features/order/order.slice';
import { IOrder } from '@/redux/features/order/order.model';
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
  const orderSl = useSelector(orderSelector);

  const { ID } = router.query;
  if (!ID) {
    router.push('/');
  }

  const [currentOrder, setCurrentOrder] = useState<IOrder>();

  const formatPackages = (packages) => {
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
          <p className="font-weight-light text-small">{`Gói duy trì: ${maintainPackageNames.join(
            ', ',
          )}`}</p>
        ) : (
          ''
        )}

        {messagePackageNames.length ? (
          <p className="font-weight-light">{`Gói tin nhắn: ${messagePackageNames.join(
            ', ',
          )}`}</p>
        ) : (
          ''
        )}
      </div>
    );
  };

  useEffect(() => {
    if (ID) {
      if (orderSl.status === 'idle') {
        dispatch(getOrdersAsyncThunk());
      }
      if (orderSl.status === 'succeeded') {
        const order = orderSl.entities[ID as string];
        if (!order) {
          router.push('/');
        } else {
          setCurrentOrder(order);
        }
      }
    }
  }, [ID, orderSl.status]);

  return (
    <>
      <UserHeader />
      {/* Page content */}
      <Container className="mt-3" fluid>
        <Row>
          <Col className="mb-5 mb-xl-0" xl="6">
            <Card className="card-stats mb-4 mb-xl-0">
              <CardBody>
                <Row>
                  <div className="col d-inline-flex align-items-center">
                    <CardTitle
                      tag="h3"
                      className="text-uppercase text-success mb-0">
                      Thông tin chuyển khoản
                    </CardTitle>
                  </div>
                </Row>
                <p className="mt-4 mb-0 text-muted text-sm">
                  <span className="text-dark font-weight-bolder">
                    <strong>Số tài khoản: </strong>
                  </span>
                  <span className="text-body mr-2">
                    <strong>31910000079978</strong>
                  </span>
                </p>
                <p className="mt-2 mb-0 text-muted text-sm">
                  <span className="text-dark font-weight-bolder">
                    <strong>Chủ tài khoản: </strong>
                  </span>
                  <span className="text-body mr-2">
                    <strong>CÔNG TY CỔ PHẦN CÔNG NGHỆ MIDEAS</strong>
                  </span>
                </p>
                <p className="mt-2 mb-0 text-muted text-sm">
                  <span className="text-dark font-weight-bolder">
                    <strong>Chi nhánh: </strong>
                  </span>
                  <span className="text-body mr-2">
                    <strong>Ngân hàng BIDV - chi nhánh Phú Mỹ Hưng</strong>
                  </span>
                </p>
                <p className="my-4"></p>
                <p className="mt-2 mb-0 text-muted text-sm">
                  <span className="text-dark font-weight-bolder">
                    <strong>Nội dung chuyển khoản: </strong>
                  </span>
                  <span className="text-body mr-2">
                    <strong className="text-red">
                      BOMBOT_{currentOrder?.id}
                    </strong>
                  </span>
                </p>
              </CardBody>
            </Card>
          </Col>
          <Col className="mb-5 mb-xl-0" xl="6">
            <Card className="card-stats mb-4 mb-xl-0">
              <CardBody>
                <Row>
                  <div className="col d-inline-flex align-items-center">
                    <CardTitle
                      tag="p"
                      className="text-success font-weight-bold mb-0">
                      {currentOrder?.status === 'success' ? 'Đơn hàng này đã thanh toán thành công' : `Đơn hàng của bạn đã được tiếp nhận, Chúng tôi sẽ tiến hành
                      xử lý đơn hàng của bạn.`}
                    </CardTitle>
                  </div>
                </Row>
                <p className="mt-2 mb-0 text-muted text-sm">
                  <span className="text-dark font-weight-bolder">
                    <strong>Mã đơn hàng: </strong>
                  </span>
                  <span className="text-body mr-2">
                    <strong>{currentOrder?.id}</strong>
                  </span>
                </p>
                <p className="mt-2 mb-0 text-muted text-sm">
                  <span className="text-dark font-weight-bolder">
                    <strong>Ngày: </strong>
                  </span>
                  <span className="text-body mr-2">
                    <strong>
                      {new Date(currentOrder?.createdAt).toLocaleDateString(
                        'vi-VN',
                      )}
                    </strong>
                  </span>
                </p>
                <p className="mt-2 mb-0 text-muted text-sm">
                  <span className="text-dark font-weight-bolder">
                    <strong>Tổng tiền: </strong>
                  </span>
                  <span className="text-body mr-2">
                    <strong>{formatPrice(currentOrder?.packages)} VND</strong>
                  </span>
                </p>
                <p className="mt-2 mb-0 text-muted text-sm">
                  <span className="text-dark font-weight-bolder">
                    <strong>Phương thức thanh toán: </strong>
                  </span>
                  <span className="text-body mr-2">
                    <strong>Chuyển khoản qua ngân hàng</strong>
                  </span>
                </p>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row className="my-3">
          <Col xl={12}>
            <Card>
              <CardBody>
                <Row>
                  <div className="col d-inline-flex align-items-center">
                    <CardTitle
                      tag="h3"
                      className="text-success text-uppercase mb-0">
                      Thông tin đơn hàng
                    </CardTitle>
                  </div>
                </Row>
                <Table
                  inverse={true}
                  className="my-2 align-items-center table-flush"
                  responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Sản phẩm</th>
                      <th scope="col">
                        <div className="text-right">Tổng tiền</div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {(currentOrder && currentOrder.packages)?.map(
                      (packagePlan) => (
                        <tr key={packagePlan.id}>
                          <td>{packagePlan.label}</td>
                          <td>
                            <div className="text-right">{formatMoney(packagePlan.price)}</div>
                          </td>
                        </tr>
                      ),
                    )}
                  </tbody>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Tổng</th>
                      <th scope="col">
                        <div className="text-right">{formatPrice(currentOrder?.packages)} VND</div>
                      </th>
                    </tr>
                  </thead>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Phương thức thanh toán</th>
                      <th scope="col">
                        <div className="text-right text-capitalize">
                          Chuyển khoản qua ngân hàng
                        </div>
                      </th>
                    </tr>
                  </thead>
                </Table>
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
