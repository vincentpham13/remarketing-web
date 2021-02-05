import React, { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import {
  Card,
  CardHeader,
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
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from 'reactstrap';
import User from '@/layouts/User';

import UserHeader from '@/components/Headers/UserHeader';
import { fanpagesSelector } from '@/redux/features/fanpage/fanpage.slice';
import {
  getFanpageMembersAsyncThunk,
  getFanpagesAsyncThunk,
} from '@/redux/features/fanpage/fanpage.thunk';
import { denormalizeEntitiesArray } from '@/helpers/data';
import { authSelector } from '@/redux/features/auth';
import { IFanPage } from '@/redux/features/fanpage/fanpage.model';

const RootManageCustomer: FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const fanpageSl = useSelector(fanpagesSelector);
  const authSl = useSelector(authSelector);

  const [pages, setPages] = useState([]);
  const [members, setMembers] = useState([]);
  const [searchMembers, setSearchMembers] = useState(null);
  const [selectedPage, setSelectedPage] = useState<IFanPage>();
  const [pageID] = useState(router.query.pageID)

  const onSearchInputChange = (e) => {
    const { value: keyword } = e.target;
    if (keyword) {
      setSearchMembers(
        // @ts-ignore
        members.filter(
          (member) =>
            member.name.toLowerCase().indexOf(keyword.toLowerCase()) >= 0,
        ),
      );
    } else {
      setSearchMembers(null);
    }
  };

  useEffect(() => {
    if (authSl.status === 'succeeded' && fanpageSl.status === 'idle') {
      dispatch(getFanpagesAsyncThunk());
    }
  }, [authSl.status, fanpageSl]);

  // Fetch fanpages
  useEffect(() => {
    if (fanpageSl.ids.length) {
      setPages(denormalizeEntitiesArray(fanpageSl.ids, fanpageSl.entities));
      setSelectedPage(fanpageSl.entities[fanpageSl.ids[0]]);

      if (pageID) {
        const queryPage = fanpageSl.entities[pageID as string];
        if (queryPage) {
          setSelectedPage(queryPage);
        } else {
          router.push(router.pathname);
        }
      }
    }
  }, [fanpageSl.status, pageID]);

  useEffect(() => {
    if (
      selectedPage &&
      fanpageSl.entities[selectedPage.id as string]?.members?.length
    ) {
      setMembers(fanpageSl.entities[selectedPage.id as string]?.members);
    } else {
      setMembers([]);
    }
  }, [fanpageSl.status, fanpageSl.entities]);

  useEffect(() => {
    if (selectedPage) {
      dispatch(getFanpageMembersAsyncThunk(selectedPage.id as string));
    }
  }, [selectedPage]);

  return (
    <>
      <UserHeader />
      <Container className="mt-3" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <div className="d-flex align-items-center">
              {/* <p class="text-capitalize font-weight-bold mr-3">Chọn fanpage</p> */}
              <UncontrolledDropdown>
                <DropdownToggle
                  caret
                  color="secondary"
                  id="dropdownMenuButton"
                  size="lg"
                  type="button">
                  {selectedPage?.name || 'Chọn Fanpage'}
                </DropdownToggle>

                <DropdownMenu aria-labelledby="dropdownMenuButton">
                  {pages.map((page) => (
                    <DropdownItem
                      active={page.id === selectedPage?.id}
                      key={page.id}
                      onClick={() => setSelectedPage(page)}>
                      {page.name}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </UncontrolledDropdown>
            </div>
            <hr className="my-4" />
            <FormGroup className="w-25 mr-3 mr-lg-auto mb-3">
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText id="basic-addon1">
                    <i className="fa fa-search"></i>
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  onChange={onSearchInputChange}
                  aria-describedby="basic-addon1"
                  aria-label="name"
                  placeholder="Tìm kiếm theo tên"
                  type="text"></Input>
              </InputGroup>
            </FormGroup>
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="mb-0">
                  Danh sách khách hàng{' '}
                  {selectedPage?.name
                    ? `thuộc trang ${selectedPage?.name}`
                    : ''}
                </h3>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Tên</th>
                    <th scope="col">User ID</th>
                    <th scope="col">Trạng thái</th>
                    <th scope="col">Đồng bộ lần cuối</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {(searchMembers || members).map((member) => (
                    <tr key={member.id}>
                      <th scope="row">
                        <Media className="align-items-center">
                          <a
                            className="avatar rounded-circle mr-3"
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}>
                            <img
                              alt="..."
                              src={require('assets/img/theme/programmer.png')}
                            />
                          </a>
                          <Media>
                            <span className="mb-0 text-sm">{member.name}</span>
                          </Media>
                        </Media>
                      </th>
                      <td>{member.uid}</td>
                      <td>
                        <Badge color="" className="badge-dot mr-4">
                          <i className="bg-success" />
                          active
                        </Badge>
                      </td>
                      <td>{new Date(member.createdAt).toLocaleString()}</td>
                      <td className="text-right">
                        {/* <UncontrolledDropdown>
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
                        </UncontrolledDropdown> */}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <CardFooter className="py-4">
                {members.length ? (
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
                  <p className="h4 font-weight-bold text-warning text-center text-wrap">
                    Website tạm thời không hiển thị được danh sách khách hàng,
                    do fanpage chưa thực hiện quét khách hàng trên extension
                    Bombot.
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

RootManageCustomer.getLayout = (page) => <User>{page}</User>;

export default RootManageCustomer;
