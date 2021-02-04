import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Card,
  CardHeader,
  Progress,
  Table,
  Container,
  Row,
  Badge,
  CardFooter,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  UncontrolledDropdown,
  UncontrolledTooltip,
} from 'reactstrap';
// layout for this page
import User from '@/layouts/User';

// core components
import UserHeader from '@/components/Headers/UserHeader';
import {
  campaignsSelector,
  getCampaignsAsyncThunk,
} from '@/redux/features/campaign';
import { denormalizeEntitiesArray } from '@/helpers/data';
import { authSelector } from '@/redux/features/auth';

const Compaign = () => {
  const dispatch = useDispatch();
  const campaignSl = useSelector(campaignsSelector);
  const authSl = useSelector(authSelector);

  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    dispatch(getCampaignsAsyncThunk());
  }, []);

  useEffect(() => {
    if (campaignSl.status == 'succeeded') {
      setCampaigns(
        denormalizeEntitiesArray(campaignSl.ids, campaignSl.entities),
      );
    }
  }, [campaignSl.status]);

  return (
    <>
      <UserHeader />
      <Container className="mt-3" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="mb-0">Danh sách Chiến dịch đã tạo</h3>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Tên</th>
                    <th scope="col">Thời gian bắt đầu</th>
                    <th scope="col">Trạng thái</th>
                    <th scope="col">Tổng tin nhắn</th>
                    <th scope="col">Tỉ lệ hoàn thành</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {campaigns.map((campaign) => (
                    <tr key={campaign.id}>
                      <th scope="row">
                        <Media className="align-items-center">
                          {/* <a
                            className="avatar rounded-circle mr-3"
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}>
                            <img
                              alt="..."
                              src={require('assets/img/theme/react.jpg')}
                            />
                          </a> */}
                          <Media>
                            <span className="mb-0 text-sm">
                              {campaign.name}
                            </span>
                          </Media>
                        </Media>
                      </th>
                      <td>{new Date(campaign.createdAt).toLocaleString()}</td>
                      <td>
                        <Badge color="" className="badge-dot mr-4">
                          <i
                            className={`${
                              campaign.status === 'completed'
                                ? 'bg-success'
                                : 'bg-success'
                            }`}
                          />
                          {campaign.status === 'completed'
                            ? 'Hoàn thành'
                            : 'Đang chạy'}
                        </Badge>
                      </td>
                      <td>{campaign.totalMessages}</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="mr-2">
                            {Math.floor(
                              (campaign.successMessages /
                                (campaign.totalMessages || 1)) *
                                100,
                            )}
                            %
                          </span>
                          <div>
                            <Progress
                              max={campaign.totalMessages}
                              value={campaign.successMessages}
                              barClassName="bg-success"
                            />
                          </div>
                        </div>
                      </td>
                      <td className="text-right">
                        <UncontrolledDropdown>
                          <DropdownToggle
                            className="btn-icon-only text-light"
                            href="#pablo"
                            role="button"
                            size="sm"
                            color=""
                            onClick={(e) => e.preventDefault()}>
                            <i className="fas fa-ellipsis-v" />
                          </DropdownToggle>
                          <DropdownMenu className="dropdown-menu-arrow" right>
                            <DropdownItem
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}>
                              Action
                            </DropdownItem>
                            <DropdownItem
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}>
                              Another action
                            </DropdownItem>
                            <DropdownItem
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}>
                              Something else here
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <CardFooter className="py-4">
                {campaigns.length ? (
                  <nav aria-label="...">
                    <Pagination
                      className="pagination justify-content-end mb-0"
                      listClassName="justify-content-end mb-0">
                      <PaginationItem className="disabled">
                        <PaginationLink
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                          tabIndex="-1">
                          <i className="fas fa-angle-left" />
                          <span className="sr-only">Previous</span>
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem className="active">
                        <PaginationLink
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}>
                          1
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}>
                          <i className="fas fa-angle-right" />
                          <span className="sr-only">Next</span>
                        </PaginationLink>
                      </PaginationItem>
                    </Pagination>
                  </nav>
                ) : (
                  <p className="font-weight-bold text-black-50 text-center text-wrap">
                    Chưa có dữ liệu.
                  </p>
                )}
              </CardFooter>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

Compaign.getLayout = (page) => <User>{page}</User>;

export default Compaign;
