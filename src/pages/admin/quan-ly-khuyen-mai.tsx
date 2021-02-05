import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Badge,
  Card,
  CardHeader,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Table,
  Container,
  Row,
  CardFooter,
  Pagination,
  PaginationItem,
  PaginationLink,
  Col,
  CardBody,
  CardTitle,
  FormGroup,
  Button,
  Form,
  Input,
} from 'reactstrap';
// layout for this page
import Admin from '@/layouts/Admin';
// core components
import UserHeader from '@/components/Headers/UserHeader';
import {
  adminSelector,
  confirmUserOrderAsyncThunk,
  getPackagesAsyncThunk,
  getUserOrdersAsyncThunk,
} from '@/redux/features/admin';
import {
  denormalizeEntitiesArray,
  formatMoney,
  formatPackages,
  formatPrice,
} from '@/helpers/data';
import { IOrder, IPackage } from '@/redux/features/admin/admin.model';

const ManagePromotion = () => {
  const dispatch = useDispatch();
  const adminSl = useSelector(adminSelector);

  const [orders, setOrders] = useState<IOrder[]>([]);
  const [packages, setPackages] = useState<IPackage[]>([]);
  const [enableMonthDuration, setEnableMonthDuration] = useState(false);
  const [monthDuration, setMonthDuration] = useState<number>();
  const [enableMessageAmount, setEnableMessageAmount] = useState(false);
  const [messageAmount, setMessageAmount] = useState<number>();

  const [code, setCode] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [applyingPackageId, setApplyingPackageId] = useState<number>();
  const [quantity, setQuantity] = useState<number>();
  const [validTo, setValidTo] = useState<Date>();

  const confirmOrder = (orderId) => {
    dispatch(confirmUserOrderAsyncThunk(orderId));
  };

  const triggerCheckboxMonthDuration = (e) => {
    setEnableMonthDuration((enabled) => !enabled);
  };

  const triggerCheckboxMessageAmount = (e) => {
    setEnableMessageAmount((enabled) => !enabled);
  };

  const isDataValid = (): boolean => {
    if (!code) {
      return false;
    }

    if ((quantity || 0) < 1) {
      return false;
    }

    if (enableMonthDuration && (monthDuration || 0) < 1) {
      return false;
    }

    if (enableMessageAmount && (messageAmount || 0) < 1) {
      return false;
    }

    if ((new Date(validTo || '')) <= new Date()) {
      console.log(validTo)
      return false;
    }

    return true;
  };
  const onPromotionSubmit = () => {
    const data = {
      code,
      description,
      quantity,
      messageAmount,
      validPackages: [applyingPackageId],
      monthDuration,
      validTo,
    };

    console.log(
      '🚀 ~ file: quan-ly-khuyen-mai.tsx ~ line 76 ~ onPromotionSubmit ~ data',
      data,
    );
  };

  useEffect(() => {
    dispatch(getUserOrdersAsyncThunk());
  }, []);

  useEffect(() => {
    if (adminSl.orders.status === 'succeeded') {
      setOrders(
        denormalizeEntitiesArray(adminSl.orders.ids, adminSl.orders.entities),
      );
    }
  }, [adminSl.orders.status]);

  useEffect(() => {
    if (adminSl.packages.status === 'idle') {
      dispatch(getPackagesAsyncThunk());
    }
  }, [adminSl.packages.status]);

  useEffect(() => {
    if (adminSl.packages.status === 'succeeded') {
      setPackages(
        denormalizeEntitiesArray(
          adminSl.packages.ids,
          adminSl.packages.entities,
        ),
      );
    }
  }, [adminSl.packages.status]);

  return (
    <>
      <UserHeader />
      {/* Page content */}
      <Container className="mt-3" fluid>
        {/* Dark table */}
        <Row>
          <Col xl={6}>
            <Card className="card-stats mb-4 mb-xl-0">
              <CardBody>
                <Row>
                  <div className="col d-inline-flex align-items-center">
                    <CardTitle
                      tag="h3"
                      className="text-uppercase text-primary mb-0">
                      Thông tin khuyến mãi
                    </CardTitle>
                  </div>
                </Row>
                <Form>
                  <div className="mt-3">
                    <Row>
                      <Col lg="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-promotion-code">
                            Mã khuyến mãi <span className="text-red">*</span>
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-promotion-code"
                            placeholder=""
                            type="text"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <div>
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-promotion-description">
                            Mô tả thông tin của khuyến mãi
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-promotion-description"
                            placeholder="Mô tả"
                            aria-rowcount={5}
                            type="textarea"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <div>
                    <Row>
                      <Col md="6">
                        <div className="custom-control custom-checkbox">
                          <input
                            checked={enableMonthDuration}
                            onChange={triggerCheckboxMonthDuration}
                            className="custom-control-input"
                            id="checkboxMonthDuration"
                            name="customRadio"
                            type="checkbox"></input>
                          <label
                            className="custom-control-label"
                            htmlFor="checkboxMonthDuration">
                            Tăng thời hạn sử dụng
                          </label>
                        </div>
                      </Col>
                      <Col md="6">
                        <div className="custom-control custom-checkbox mb-3">
                          <Input
                            disabled={!enableMonthDuration}
                            className="form-control-alternative"
                            placeholder="số tháng"
                            type="number"
                            value={monthDuration}
                            onChange={(e) =>
                              setMonthDuration(parseInt(e.target.value))
                            }
                          />
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="6">
                        <div className="custom-control custom-checkbox">
                          <input
                            checked={enableMessageAmount}
                            onChange={triggerCheckboxMessageAmount}
                            className="custom-control-input"
                            name="checkboxMessageAmount"
                            id="checkboxMessageAmount"
                            type="checkbox"></input>
                          <label
                            className="custom-control-label"
                            htmlFor="checkboxMessageAmount">
                            Tăng số lượng tin nhắn
                          </label>
                        </div>
                      </Col>
                      <Col md="6">
                        <div className="custom-control custom-checkbox mb-3">
                          <Input
                            disabled={!enableMessageAmount}
                            className="form-control-alternative"
                            placeholder="số tin nhắn"
                            type="number"
                            value={messageAmount}
                            onChange={(e) =>
                              setMessageAmount(parseInt(e.target.value))
                            }
                          />
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
          <Col xl={6}>
            <Card className="card-stats mb-4 mb-xl-0">
              <CardBody>
                <Row>
                  <div className="col d-inline-flex align-items-center">
                    <CardTitle
                      tag="h3"
                      className="text-uppercase text-primary mb-0">
                      Nội dung khuyến mãi
                    </CardTitle>
                  </div>
                </Row>
                <Form>
                  <div className="mt-3">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-quantity">
                            Số lượng ưu đãi <span className="text-red">*</span>
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-quantity"
                            placeholder=""
                            type="number"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-valid-to">
                            Ngày hết hạn <span className="text-red">*</span>
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-valid-to"
                            placeholder=""
                            type="date"
                            value={validTo}
                            onChange={(e) => setValidTo(e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <div className="mt-3">
                    <Row>
                      <Col lg="12">
                        <FormGroup>
                          <label
                            className="form-control-label mr-3"
                            htmlFor="input-username">
                            Áp dụng khi mua gói{'   '}
                          </label>
                          <UncontrolledDropdown>
                            <DropdownToggle
                              caret
                              color="secondary"
                              id="dropdownMenuButton"
                              size="lg"
                              type="button">
                              {
                                packages.find((p) => p.id === applyingPackageId)
                                  ?.label
                              }
                            </DropdownToggle>
                            <DropdownMenu aria-labelledby="dropdownMenuButton">
                              {packages.map((p) => (
                                <DropdownItem
                                  active={p.id === applyingPackageId}
                                  key={p.id}
                                  onClick={(e) => setApplyingPackageId(p.id)}>
                                  {p.label}
                                </DropdownItem>
                              ))}
                            </DropdownMenu>
                          </UncontrolledDropdown>
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <div>
                    <Row>
                      <Col md="12">
                        <Button
                          type="button"
                          color="primary"
                          disabled={!isDataValid()}
                          onClick={onPromotionSubmit}>
                          Lưu mã khuyến mãi
                        </Button>
                      </Col>
                    </Row>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

ManagePromotion.getLayout = (page) => <Admin>{page}</Admin>;

export default ManagePromotion;
