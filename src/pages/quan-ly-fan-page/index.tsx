import React, { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
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
import User from '@/layouts/User';

import UserHeader from '@/components/Headers/UserHeader';
import { fanpagesSelector } from '@/redux/features/fanpage/fanpage.slice';
import { getFanpagesAsyncThunk } from '@/redux/features/fanpage/fanpage.thunk';
import { denormalizeEntitiesArray } from '@/helpers/data';
import { authSelector } from '@/redux/features/auth';

const RootFanpage: FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const fanpage = useSelector(fanpagesSelector);
  const authSl = useSelector(authSelector);

  const [pages, setPages] = useState([]);

  useEffect(() => {
    if (authSl.status === 'succeeded') {
      dispatch(getFanpagesAsyncThunk());
    }
  }, [authSl.status]);

  useEffect(() => {
    if (fanpage.status == 'succeeded') {
      setPages(denormalizeEntitiesArray(fanpage.ids, fanpage.entities));
    }
  }, [fanpage.status]);

  return (
    <>
      <UserHeader />
      <Container className="mt-3" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="mb-0">Danh sách Fanpage</h3>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Tên</th>
                    <th scope="col">Page ID</th>
                    <th scope="col">Trạng thái</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {pages.map((page) => (
                    <tr key={page.id}>
                      <th scope="row">
                        <Media className="align-items-center">
                          {/* <a
                            className="avatar rounded-circle mr-3"
                            onClick={(e) => e.preventDefault()}>
                            <img
                              alt="..."
                              src={require('assets/img/theme/react.jpg')}
                            />
                          </a> */}
                          <Media>
                            <span className="mb-0 text-sm">{page.name}</span>
                          </Media>
                        </Media>
                      </th>
                      <td>{page.id}</td>
                      <td>
                        <Badge color="" className="badge-dot mr-4">
                          <i className="bg-success" />
                          Đang hoạt động
                        </Badge>
                      </td>
                      <td className="text-right">
                        <UncontrolledDropdown>
                          <DropdownToggle
                            className="btn-icon-only text-light"
                            role="button"
                            size="sm"
                            color=""
                            onClick={(e) => e.preventDefault()}>
                            <i className="fas fa-ellipsis-v" />
                          </DropdownToggle>
                          <DropdownMenu className="dropdown-menu-arrow" right>
                            <DropdownItem
                              onClick={(e) =>
                                router.push(`/quan-ly-khach-hang?pageID=${page.id}`)
                              }>
                              Xem người dùng chat
                            </DropdownItem>
                            {/* <DropdownItem
                              onClick={(e) => e.preventDefault()}>
                              Another action
                            </DropdownItem>
                            <DropdownItem
                              onClick={(e) => e.preventDefault()}>
                              Something else here
                            </DropdownItem> */}
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <CardFooter className="py-4">
              {pages.length ? (
                  <nav aria-label="...">
                    <Pagination
                      className="pagination justify-content-end mb-0"
                      listClassName="justify-content-end mb-0">
                      <PaginationItem className="disabled">
                        <PaginationLink
                          onClick={(e) => e.preventDefault()}
                          tabIndex="-1">
                          <i className="fas fa-angle-left" />
                          <span className="sr-only">Previous</span>
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem className="active">
                        <PaginationLink
                          onClick={(e) => e.preventDefault()}>
                          1
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink
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

RootFanpage.getLayout = (page) => <User>{page}</User>;

export default RootFanpage;
