import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import {
  Card,
  Container,
  Row,
  Col,
  Button,
  CardHeader,
  Progress,
  Table,
  CardFooter,
} from 'reactstrap';
// layout for this page
import User from '@/layouts/User';

import UserHeader from '@/components/Headers/UserHeader';
import {
  campaignsSelector,
  getCampaignsAsyncThunk,
} from '@/redux/features/campaign';
import { getFanpagesAsyncThunk } from '@/redux/features/fanpage/fanpage.thunk';
import { denormalizeEntitiesArray, formatStatus } from '@/helpers/data';

const Index = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const campaignSl = useSelector(campaignsSelector);

  const [recentCampaigns, setRecentCampaigns] = useState([]);

  useEffect(() => {
    dispatch(getCampaignsAsyncThunk());
    dispatch(getFanpagesAsyncThunk());
  }, []);

  useEffect(() => {
    if (campaignSl.status === 'succeeded') {
      setRecentCampaigns(
        denormalizeEntitiesArray(campaignSl.ids, campaignSl.entities).slice(
          0,
          6,
        ),
      );
    }
  }, [campaignSl.status]);

  return (
    <>
      {/* Page content */}
      <UserHeader />
      <Container className="mt--7" fluid>
        <Row className="mt-5">
          <Col className="mb-5 mb-xl-0" xl="8">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Chiến dịch gần đây nhất</h3>
                  </div>
                  <div className="col text-right">
                    <Button
                      color="primary"
                      onClick={(e) => router.push('/quan-ly-chien-dich')}
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
                    <th scope="col">Ngày khởi tạo</th>
                    <th scope="col">Ngày bắt đầu</th>
                    <th scope="col">Số lượng tin</th>
                    <th scope="col">Trạng thái</th>
                  </tr>
                </thead>
                <tbody>
                  {recentCampaigns.map((campaign) => (
                    <tr key={campaign.id}>
                      <th scope="row">{campaign.name}</th>
                      <td>
                        {new Date(campaign.createdAt).toLocaleString('vi-VN')}
                      </td>
                      <td>
                        {new Date(campaign.startedAt).toLocaleString('vi-VN')}
                      </td>
                      <td>{campaign.totalMessages}</td>
                      <td>
                        <i className="fas fa-check-circle text-success mr-3" />{' '}
                        {formatStatus(campaign.status)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <CardFooter className="py-4">
                {!recentCampaigns.length ? (
                  <p className="font-weight-bold text-black-50 text-center text-wrap">
                    Chưa có dữ liệu.
                  </p>
                ) : null}
              </CardFooter>
            </Card>
          </Col>
          <Col xl="4">
            {/* <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Lịch sử nâng cấp gói</h3>
                  </div>
                  <div className="col text-right">
                    <Button
                      color="primary"
                      onClick={(e) => router.push('/quan-ly-don-hang')}
                      size="sm">
                      Xem tất cả
                    </Button>
                  </div>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Referral</th>
                    <th scope="col">Visitors</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">Facebook</th>
                    <td>1,480</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">60%</span>
                        <div>
                          <Progress
                            max="100"
                            value="60"
                            barClassName="bg-gradient-danger"
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Facebook</th>
                    <td>5,480</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">70%</span>
                        <div>
                          <Progress
                            max="100"
                            value="70"
                            barClassName="bg-gradient-success"
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Google</th>
                    <td>4,807</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">80%</span>
                        <div>
                          <Progress max="100" value="80" />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Instagram</th>
                    <td>3,678</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">75%</span>
                        <div>
                          <Progress
                            max="100"
                            value="75"
                            barClassName="bg-gradient-info"
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">twitter</th>
                    <td>2,645</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">30%</span>
                        <div>
                          <Progress
                            max="100"
                            value="30"
                            barClassName="bg-gradient-warning"
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Card> */}
          </Col>
        </Row>
      </Container>
    </>
  );
};

Index.getLayout = (page) => <User>{page}</User>;

export default Index;
