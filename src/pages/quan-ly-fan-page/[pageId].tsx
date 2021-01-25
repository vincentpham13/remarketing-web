import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
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
import User from '@/layouts/User';

import API from '@/helpers/axios';
import Header from '@/components/Headers/Header';
import { fanpagesSelector } from '@/redux/features/fanpage/fanpage.slice';
import { getFanpagesAsyncThunk } from '@/redux/features/fanpage/fanpage.thunk';
import { denormalizeEntitiesArray } from '@/helpers/data';

const SingleFanpage: FC = (props) => {
  const router = useRouter();
  const { pageId } = router.query;

  const dispatch = useDispatch();
  const fanpage = useSelector(fanpagesSelector);

  const [members, setMembers] = useState([
    {
      id: '186701998171599',
      name: 'Vincent Pham',
    },
  ]);

  useEffect(() => {
    // if has not loaded yet, run now
    if (fanpage.status === 'idle') {
      dispatch(getFanpagesAsyncThunk());
    }

    if (fanpage.status === 'succeeded') {
      // check if pageID on url is valid to current selected fb page
      if (fanpage.ids.includes(pageId as string | number)) {
        console.log(
          '🚀 ~ file: [pageId].tsx ~ line 42 ~ useEffect ~ pageId',
          pageId,
        );
      }
    }
  }, [fanpage.status]);

  return (
    <>
      <Header />
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="mb-0">Danh sách user đã liên hệ</h3>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Tên</th>
                    <th scope="col">User ID</th>
                    <th scope="col">Trạng thái</th>
                    <th scope="col">Completion</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {members.map((page) => (
                    <tr key={page.id}>
                      <th scope="row">
                        <Media className="align-items-center">
                          <a
                            className="avatar rounded-circle mr-3"
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}>
                            <img
                              alt="..."
                              src={require('assets/img/theme/vincent.jpg')}
                            />
                          </a>
                          <Media>
                            <span className="mb-0 text-sm">{page.name}</span>
                          </Media>
                        </Media>
                      </th>
                      <td>{page.id}</td>
                      <td>
                        <Badge color="" className="badge-dot mr-4">
                          <i className="bg-success" />
                          active
                        </Badge>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="mr-2">60%</span>
                          <div>
                            <Progress
                              max="100"
                              value="60"
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
                        2 <span className="sr-only">(current)</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}>
                        3
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
              </CardFooter>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

SingleFanpage.getLayout = (page) => <User>{page}</User>;

export default SingleFanpage;
