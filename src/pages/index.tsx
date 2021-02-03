import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  Card,
  Container,
  Row,
  Col,
  Button,
  CardHeader,
  Table,
  Badge
} from 'reactstrap';
// layout for this page
import User from '@/layouts/User';

import UserHeader from '@/components/Headers/UserHeader';
import { useDispatch, useSelector } from 'react-redux';
import { getMeDashboardAsyncThunk, userSelector } from '@/redux/features/user';
import { OrderStatus } from '@/enums/orderStatus';

const Index = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const userSl = useSelector(userSelector);
  useEffect(() => {

    //get user info 
    dispatch(getMeDashboardAsyncThunk());
  }, [])

  return (
    <>
      {/* Page content */}
      <UserHeader userSl={userSl}/>
      <Container className="mt--7" fluid>
        <Row className="mt-5">
          <Col className="mb-5 mb-xl-0 px-1" xl="6">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Chiến dịch gần đây nhất</h3>
                  </div>
                  <div className="col text-right">
                    <Button
                      color="primary"
                      href="#pablo"
                      onClick={() => router.push('/quan-ly-chien-dich')}
                      size="sm">
                      Xem tất cả
                    </Button>
                  </div>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                  <th scope="col">Tên</th>
                    <th scope="col">Trạng thái</th>
                    <th scope="col">Tổng tin nhắn</th>
                  </tr>
                </thead>
                <tbody>
                {userSl.dashboardInfo.recentCampaign?.map((campaign) => (
                    <tr key={campaign.id}>
                      <th scope="row">
                            <span className="mb-0 text-sm">
                              {campaign.name}
                            </span>
                      </th>
                      <td>
                        <Badge color="" className="badge-dot mr-4">
                          <i
                            className={`${
                              campaign.status === 'completed'
                                ? 'bg-info'
                                : 'bg-success'
                            }`}
                          />
                          {campaign.status === 'completed'
                            ? 'Kết thúc'
                            : 'Đang chạy'}
                        </Badge>
                      </td>
                      <td>{campaign.totalMessages}</td>
                  
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card>
          </Col>
          <Col xl="6" className="px-1">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col px-0">
                    <h3 className="mb-0">Lịch sử nâng cấp gói</h3>
                  </div>
                  <div className="col text-right">
                    <Button
                      color="primary"
                      href="#pablo"
                      onClick={() => router.push('/quan-ly-tai-khoan')}
                      size="sm">
                      Xem tất cả
                    </Button>
                  </div>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Thời gian</th>
                    <th scope="col">Tổng tiền</th>
                    <th scope="col">Trạng thái</th>
                  </tr>
                </thead>
                <tbody>
                {userSl.dashboardInfo.recentOrder?.map((order) => (
                    <tr key={order.id}>
                      <th scope="row">
                            <span className="mb-0 text-sm">
                              {new Date(order.createdAt).toLocaleString('en-GB')}
                            </span>
                      </th>
                      <td>
                          {order.totalPrice ?? 0} VND
                      </td>
                      <td><Badge color="" className="badge-dot">
                          <i
                            className={`${
                              order.status === OrderStatus.COMPLETED
                                ? 'bg-info'
                                : order.status === OrderStatus.PENDING ? 'bg-success' : ''
                                
                            }`}
                          />
                          {order.status === OrderStatus.COMPLETED
                            ? 'Kết thúc'
                            : order.status === OrderStatus.PENDING ? 'Chờ thanh toán' : ''}
                        </Badge>
                        </td>
                  
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

Index.getLayout = (page) => <User>{page}</User>;

export default Index;
