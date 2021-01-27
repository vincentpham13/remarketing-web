import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

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
} from 'reactstrap';
// layout for this page
import Admin from '@/layouts/Admin';
// core components
import Header from '@/components/Headers/Header';
import CustomModal from '@/components/Modal/Modal';
import {
  adminSelector,
  createPackagesAsyncThunk,
  getPackagesAsyncThunk,
  updatePackagesAsyncThunk,
} from '@/redux/features/admin';
import { denormalizeEntitiesArray, formatMoney, formatNumber } from '@/helpers/data';

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

  const onModalSubmit = () => {
    if (!packageLabel || packagePrice < 100000 || packagePrice > 3000000) {
      return;
    }

    const packageData = {
      label: packageLabel,
      monthDuration: packageMonthDuration,
      messageAmount: packageMessageAmount,
      price: packagePrice,
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
  };

  const toggleEditPackageModal = (packageId: number) => {
    const editPackage = adminSl.packages.entities[packageId];
    if (editPackage && editPackage.id !== 1) {
      setEditingPackage(editPackage);

      setPackageLabel(editPackage.label);
      setPackageMonthDuration(editPackage.monthDuration);
      setPackageMessageAmount(editPackage.messageAmount);
      setPackagePrice(editPackage.price);

      setIsOpenModal((isOpen) => !isOpen);
    } else {
      console.warn('package does not exist in state');
    }
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
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="bg-default shadow">
              <CardHeader className="bg-transparent border-0 py-2">
                <Row className="justify-content-between">
                  {/* <Col lg="12" className="d-inline-flex"> */}
                  <h3 className="text-white mt-1">Gói duy trì dịch vụ</h3>
                  <Button onClick={toggleAddNewPackageModal} color="primary">
                    Thêm gói mới
                  </Button>
                  {/* </Col> */}
                </Row>
              </CardHeader>
              <Table
                className="align-items-center table-light table-flush"
                responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Tên gói</th>
                    <th scope="col">Số lượng tin nhắn</th>
                    <th scope="col">Thời hạn sử dụng</th>
                    <th scope="col">Giá</th>
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
                              src={require('assets/img/theme/bootstrap.jpg')}
                            />
                          </a>
                          <Media>
                            <span className="mb-0 text-sm">
                              {packagePlan.label}
                            </span>
                          </Media>
                        </Media>
                      </th>
                      <td>{formatNumber(packagePlan.messageAmount * 1000)}</td>
                      <td>
                        <Badge color="" className="badge-dot mr-4">
                          <i className="bg-success" />
                          {packagePlan.id === 1
                            ? `${packagePlan.dayDuration} ngày`
                            : `${packagePlan.monthDuration} tháng`}
                        </Badge>
                      </td>
                      <td>{formatMoney(packagePlan.price)}đ</td>
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
                            <DropdownItem
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}>
                              Tạm ngưng gói
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card>
          </div>
        </Row>
      </Container>
      <CustomModal
        titleHeader={`${editingPackage ? 'Chỉnh sửa gói dịch vụ' : 'Tạo gói dịch vụ mới'}`}
        isOpen={isOpenModal}
        fnToggle={toggleAddNewPackageModal}
        onSubmit={onModalSubmit}>
        <Row>
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
                min={1000}
                max={30000}
                onChange={onPackageMessageAmountChange}
                placeholder=""
                type="select">
                <option id={1} value={1}>
                  1000
                </option>
                <option id={2} value={2}>
                  2000
                </option>
                <option id={3} value={3}>
                  3000
                </option>
                <option id={4} value={4}>
                  4000
                </option>
                <option id={5} value={5}>
                  5000
                </option>
              </Input>
            </FormGroup>
          </Col>
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
        </Row>
      </CustomModal>
    </>
  );
};

ManagePackage.getLayout = (page) => <Admin>{page}</Admin>;

export default ManagePackage;
