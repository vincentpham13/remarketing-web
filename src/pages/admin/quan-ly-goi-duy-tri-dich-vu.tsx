import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PackageType, PackageTypeLabel } from '@/enums/Package';

// reactstrap components
import {
  Badge,
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Container,
  Row,
  UncontrolledTooltip,
  Button,
  Col,
  FormGroup,
  Input,
  Label,
} from 'reactstrap';
// layout for this page
import Admin from '@/layouts/Admin';
// core components
import UserHeader from '@/components/Headers/UserHeader';
import CustomModal from '@/components/Modal/Modal';
import {
  adminSelector,
  createPackagesAsyncThunk,
  getPackagesAsyncThunk,
  removePackageAsyncthunk,
  updatePackagesAsyncThunk,
} from '@/redux/features/admin';
import {
  denormalizeEntitiesArray,
  formatMoney,
  formatNumber,
} from '@/helpers/data';

const ManagePackage = () => {
  const dispatch = useDispatch();
  const adminSl = useSelector(adminSelector);

  const [packages, setPackages] = useState([]);
  const [editingPackage, setEditingPackage] = useState(null);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [packageLabel, setPackageLabel] = useState('');
  const [packageMonthDuration, setPackageMonthDuration] = useState(1);
  const [packageMessageAmount, setPackageMessageAmount] = useState(1);
  const [packagePrice, setPackagePrice] = useState(100000);
  const [packageTypeId, setPackageTypeId] = useState(
    PackageType.TimeAndMessage,
  );

  const onPackageLabelChange = (e) => {
    const { value } = e.target;
    setPackageLabel(value);
  };

  const onPackageMonthDurationChange = (e) => {
    const { value } = e.target;
    setPackageMonthDuration(parseInt(value, 10));
  };

  const onPackageMessageAmountChange = (e) => {
    const { value } = e.target;
    setPackageMessageAmount(parseInt(value, 10));
  };

  const onPackagePriceChange = (e) => {
    const { value } = e.target;
    if (!/^[\d]{0,7}$/.test(value)) {
      return;
    }
    setPackagePrice(value);
  };

  const onpackageTypeIdChange = (e) => {
    const { value } = e.target;
    if (value == 2) {
      setPackageMonthDuration(1);
    }
    setPackageTypeId(parseInt(value, 10));
  };

  const onModalSubmit = () => {
    if (!packageLabel || packagePrice < 100000 || packagePrice > 3000000) {
      return;
    }

    const packageData = {
      label: packageLabel,
      monthDuration: packageMonthDuration,
      messageAmount: packageMessageAmount,
      price: packagePrice,
      packageTypeId,
    };
    if (editingPackage) {
      packageData.id = editingPackage.id;
      dispatch(updatePackagesAsyncThunk(packageData));
    } else {
      dispatch(createPackagesAsyncThunk(packageData));
    }
    toggleAddNewPackageModal();
  };

  const toggleAddNewPackageModal = () => {
    setIsOpenModal((isOpen) => !isOpen);
  };

  const resetPackageModal = () => {
    setPackageLabel('');
    setPackageMonthDuration(1);
    setPackageMessageAmount(1);
    setPackagePrice(100000);
    setPackageTypeId(PackageType.TimeAndMessage);
  };

  const toggleEditPackageModal = (packageId: number) => {
    const editPackage = adminSl.packages.entities[packageId];
    if (editPackage && editPackage.id !== 1) {
      setEditingPackage(editPackage);

      setPackageLabel(editPackage.label);
      setPackageMonthDuration(editPackage.monthDuration);
      setPackageMessageAmount(editPackage.messageAmount);
      setPackagePrice(editPackage.price);
      setPackageTypeId(editPackage.packageTypeId);

      setIsOpenModal((isOpen) => !isOpen);
    } else {
      console.warn('package does not exist in state');
    }
  };

  const removePackage = (packageId) => {
    dispatch(removePackageAsyncthunk(packageId));
  };

  useEffect(() => {
    if (!isOpenModal) {
      setEditingPackage(null);
      resetPackageModal();
    }
  }, [isOpenModal]);

  useEffect(() => {
    dispatch(getPackagesAsyncThunk());
  }, []);

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
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="bg-default shadow">
              <CardHeader className="bg-transparent border-0 py-2">
                {/* <Row className="justify-content-between">
                  <h3 className="text-white mt-1">Gói duy trì dịch vụ</h3>
                  <Button onClick={toggleAddNewPackageModal} color="primary">
                    Thêm gói mới
                  </Button>
                </Row> */}
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="text-white">Gói duy trì dịch vụ</h3>
                  </div>
                  <div className="col text-right">
                    <Button
                      color="primary"
                      onClick={toggleAddNewPackageModal}
                      size="md">
                      Thêm gói mới
                    </Button>
                  </div>
                </Row>
              </CardHeader>
              <Table
                className="align-items-center table-dark table-flush"
                responsive>
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">Tên gói</th>
                    <th scope="col">Số lượng tin nhắn</th>
                    <th scope="col">Thời hạn sử dụng</th>
                    <th scope="col">Giá</th>
                    <th scope="col">Loại gói</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {packages.map((packagePlan) => (
                    <tr key={packagePlan.id}>
                      <th scope="row">
                        <Media className="align-items-center">
                          <a
                            className="avatar rounded-circle mr-3"
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}>
                            <img
                              alt="..."
                              src={require('assets/img/icons/app-icon.png')}
                            />
                          </a>
                          <Media>
                            <span className="mb-0 text-sm">
                              {packagePlan.label}
                            </span>
                          </Media>
                        </Media>
                      </th>
                      <td>
                        { packagePlan.messageAmount == PackageType.UnlimitedMessageAmount 
                          ? 'Không giới hạn' 
                          : formatNumber(packagePlan.messageAmount * 1000)
                        }
                      </td>
                      <td>
                        <Badge color="" className="badge-dot mr-4">
                          <i className="bg-success" />
                          {packagePlan.id === 1
                            ? `${packagePlan.dayDuration} ngày`
                            : `${packagePlan.monthDuration} tháng`}
                        </Badge>
                      </td>
                      <td>{formatMoney(packagePlan.price)}đ</td>
                      <td style={{ width: '160px' }}>
                        <h3>
                          {packagePlan.packageTypeId ==
                          PackageType.TimeAndMessage ? (
                            <span
                              className="text-light badge badge-pill badge-primary"
                              style={{ width: '160px' }}>
                              {PackageTypeLabel.TimeAndMessage}
                            </span>
                          ) : (
                            <span
                              className="text-light badge badge-pill badge-info"
                              style={{ width: '160px' }}>
                              {PackageTypeLabel.MessageOnly}
                            </span>
                          )}
                        </h3>
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
                              onClick={() =>
                                toggleEditPackageModal(packagePlan.id)
                              }>
                              Chỉnh sửa
                            </DropdownItem>
                            {/* <DropdownItem
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}>
                              Tạm ngưng gói
                            </DropdownItem> */}
                            <DropdownItem
                              href="#pablo"
                              onClick={() => removePackage(packagePlan.id)}>
                              Xoá gói
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <CardFooter className="bg-transparent py-4 w-100">
                {packages.length ? (
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
                  <p className="font-weight-bold text-white text-center text-wrap">
                    Chưa có dữ liệu.
                  </p>
                )}
              </CardFooter>
            </Card>
          </div>
        </Row>
      </Container>
      <CustomModal
        titleHeader={`${
          editingPackage ? 'Chỉnh sửa gói dịch vụ' : 'Tạo gói dịch vụ mới'
        }`}
        isOpen={isOpenModal}
        fnToggle={toggleAddNewPackageModal}
        onSubmit={onModalSubmit}>
        <Row>
          <Col lg="12">
            <FormGroup className="row">
              <label className="form-control-label col-3" htmlFor="input-price">
                Loại gói
              </label>
              <FormGroup check className="col-4 px-0">
                <Label check>
                  <Input
                    type="radio"
                    name="radio-package-type"
                    onChange={onpackageTypeIdChange}
                    value={PackageType.TimeAndMessage}
                    checked={packageTypeId === PackageType.TimeAndMessage}
                  />{' '}
                  {PackageTypeLabel.TimeAndMessage}
                </Label>
              </FormGroup>
              <FormGroup check className="col-4 px-0">
                <Label check>
                  <Input
                    type="radio"
                    name="radio-package-type"
                    onChange={onpackageTypeIdChange}
                    value={PackageType.MessageOnly}
                    checked={packageTypeId === PackageType.MessageOnly}
                  />{' '}
                  {PackageTypeLabel.MessageOnly}
                </Label>
              </FormGroup>
            </FormGroup>
          </Col>
          <Col lg="6">
            <FormGroup>
              <label className="form-control-label" htmlFor="input-package">
                Tên gói
              </label>
              <Input
                className="form-control-alternative"
                value={packageLabel}
                id="input-package"
                onChange={onPackageLabelChange}
                placeholder=""
                type="text"
              />
            </FormGroup>
          </Col>
          <Col lg="6">
            <FormGroup>
              <label className="form-control-label" htmlFor="input-message">
                Số lượng tin nhắn
              </label>
              <Input
                className="form-control-alternative"
                value={packageMessageAmount}
                id="input-message"
                max={30000}
                onChange={onPackageMessageAmountChange}
                placeholder=""
                type="select">
                <option id={1} value={1}>
                  1.000
                </option>
                <option id={2} value={2}>
                  2.000
                </option>
                <option id={3} value={3}>
                  3.000
                </option>
                <option id={4} value={4}>
                  4.000
                </option>
                <option id={5} value={5}>
                  5.000
                </option>
                <option id={6} value={6}>
                  6.000
                </option>
                <option id={7} value={7}>
                  7.000
                </option>
                <option id={8} value={8}>
                  8.000
                </option>
                <option id={9} value={9}>
                  9.000
                </option>
                <option id={10} value={10}>
                  10.000
                </option>
                <option id={11} value={11}>
                  11.000
                </option>
                <option id={12} value={12}>
                  12.000
                </option>
                {
                 packageTypeId != PackageType.MessageOnly
                  ? 
                    <option id={13} value={-1}>
                    Không giới hạn
                    </option>
                  : ''
                }
                
              </Input>
            </FormGroup>
          </Col>
          <Col lg="6">
            <FormGroup>
              <label className="form-control-label" htmlFor="input-price">
                Giá
              </label>
              <Input
                className="form-control-alternative"
                value={packagePrice}
                id="input-price"
                onChange={onPackagePriceChange}
                placeholder=""
                type="text"
              />
            </FormGroup>
          </Col>
          {packageTypeId == 2 ? (
            <Col lg="6">
              <FormGroup></FormGroup>
            </Col>
          ) : (
            <Col lg="6">
              <FormGroup>
                <label className="form-control-label" htmlFor="input-month">
                  Thời hạn sử dụng
                </label>
                <Input
                  min={1}
                  max={12}
                  className="form-control-alternative"
                  value={packageMonthDuration}
                  id="input-month"
                  onChange={onPackageMonthDurationChange}
                  placeholder=""
                  type="select">
                  <option id={1} value={1}>
                    1 tháng
                  </option>
                  <option id={2} value={2}>
                    2 tháng
                  </option>
                  <option id={3} value={3}>
                    3 tháng
                  </option>
                  <option id={4} value={4}>
                    4 tháng
                  </option>
                  <option id={5} value={5}>
                    5 tháng
                  </option>
                  <option id={6} value={6}>
                    6 tháng
                  </option>
                  <option id={7} value={7}>
                    7 tháng
                  </option>
                  <option id={8} value={8}>
                    8 tháng
                  </option>
                  <option id={9} value={9}>
                    9 tháng
                  </option>
                  <option id={10} value={10}>
                    10 tháng
                  </option>
                  <option id={11} value={11}>
                    11 tháng
                  </option>
                  <option id={12} value={12}>
                    1 năm
                  </option>
                </Input>
              </FormGroup>
            </Col>
          )}
        </Row>
      </CustomModal>
    </>
  );
};

ManagePackage.getLayout = (page) => <Admin>{page}</Admin>;

export default ManagePackage;
