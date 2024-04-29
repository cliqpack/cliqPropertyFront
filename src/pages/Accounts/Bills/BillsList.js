import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import {
  allBillsListDue,
  allBillsListFuture,
  allBillsListPaid,
  payBillFromList,
  payBillFromListFresh,
  deleteBillAction,
  deleteBillActionFresh,
} from "store/actions";
import classnames from "classnames";
import DatatableTables2 from "../../Tables/DatatableTables2";

import {
  Card,
  CardBody,
  Col,
  Container,
  Row,
  CardText,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import AddBills from "./AddBills";
import BillsInfoModal from "./BillsInfoModal";
import { setDefaultLocale } from "react-datepicker";
import BillsEditModal from "./BillsEditModal";
import ToolkitProvider, {
  Search,
} from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
  PaginationListStandalone,
  SizePerPageDropdownStandalone,
} from "react-bootstrap-table2-paginator";
import toastr from "toastr";
import Loder from "components/Loder/Loder";
import Breadcrumbs from "components/Common/Breadcrumb";

document.title = "cliqproperty";

function BillsList(props) {
  const [state, setState] = useState({
    activeTab: "1",
    disabled: true,
    drp_link: false,
    loader: false,
    selected: [],
  });

  const [actionArray, setActionArray] = useState([]);
  const [seen, setSeen] = useState(false);
  const toggledeopsitModal = () => {
    setState(prev => ({ ...prev, drp_link: !prev.drp_link }));
  };

  const history = useHistory();
  const [Id, setId] = useState(null);
  const [data, setData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => setShowModal(prev => !prev);
  //Add bill modal
  const [showModalAdd, setShowModalAdd] = useState(false);
  const toggleAdd = () => setShowModalAdd(prev => !prev);

  const [billEditModal, setBillEditModal] = useState(false);

  const billEditModalToggle = () => {
    setShowModal(false);
    setBillEditModal(true);
  };

  const toggle = tab => {
    if (state.activeTab !== tab) {
      setState({
        ...state,
        activeTab: tab,
        selected: tab === '1' ? [...state.selected] : [],
      });
    }

    if (tab === "1") {
      props.allBillsListDue();
    } else if (tab === "2") {
      props.allBillsListFuture();
      setActionArray([]);
    } else {
      props.allBillsListPaid();
      setActionArray([]);
    }
  };

  //Loader
  const startLoader = () => setState({ ...state, loader: true });
  const endLoader = () => setState({ ...state, loader: false });

  let node;
  const defaultSorted = [
    {
      dataField: "id",
      order: "asc",
    },
  ];

  const { SearchBar } = Search;

  const statusRef = (cell, row) => {
    if (cell === 1) {
      return (
        <span className="">
          <i className="fas fa-check" />
        </span>
      );
    } else {
      return <span className=""></span>;
    }
  };

  const fileRef = (cell, row) => (
    <a
      href={process.env.REACT_APP_IMAGE + row.file}
      target="_blank"
      rel="noreferrer noopener"
    >
      {row.file?.slice(0, 150)}
    </a>
  );

  const amountRef = (cell, row) => {
    let balance = (+row?.owner?.owner_folio?.money_in + (row?.owner?.owner_folio?.opening_balance ? +row?.owner?.owner_folio?.opening_balance : 0)) - (+row?.owner?.owner_folio?.money_out + +row?.owner?.owner_folio?.uncleared)
    let amount;
    if (row.status === 'Paid') {
      amount = <span>{cell}৳</span>;
    } else {
      amount = <span className={`badge rounded-pill p-1 ${balance >= cell ? 'bg-success' : 'bg-danger'}`}>৳{cell}</span>;
    }
    return amount;
  };

  const supplierRef = (cell, row) => (
    <span className="fw-bold">{cell?.slice(0, 12).concat("...")}</span>
  );
  const detailRef = (cell, row) => <span className="">{cell}</span>;
  // const detailRef = (cell, row) => <span className="fw-bold">{cell.split('-')[1]}</span>;

  const billDetails = (e, column, columnIndex, row, rowIndex) => {
    setId(row.id);
    setData(row);
    setDefaultLocale(row);
    toggleModal();
  };

  const activeData = [
    {
      dataField: "id",
      text: "Bill #",
      sort: true,
      // sortFunc: (a, b, order, dataField, rowA, rowB) => {
      //   return b - a;
      // },
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          billDetails(e, column, columnIndex, row, rowIndex);
        },
      },
    },
    {
      dataField: "supplier.reference",
      text: "Supplier",
      sort: true,
      formatter: supplierRef,
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          billDetails(e, column, columnIndex, row, rowIndex);
        },
      },
    },
    {
      dataField: "property.reference",
      text: "Property",
      sort: true,
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          billDetails(e, column, columnIndex, row, rowIndex);
        },
      },
    },
    {
      dataField: "invoice_ref",
      text: "Ref",
      sort: true,
    },
    {
      dataField: "",
      text: "P",
      sort: true,
    },
    {
      dataField: "maintenance.due_by",
      text: "Due",
      sort: true,
    },
    {
      dataField: "bill.account_name",
      text: "Detail",
      formatter: detailRef,
      sort: true,
    },
    {
      dataField: "file",
      text: "",
      formatter: fileRef,
      sort: true,
    },
    {
      dataField: "include_tax",
      text: "Tax",
      sort: true,
      formatter: statusRef,
    },
    {
      dataField: "amount",
      text: "Amount",
      formatter: amountRef,
      sort: true,
    },
  ];

  const pageOptions = {
    sizePerPage: 10,
    totalSize: props.bills_list_data?.data.length, // replace later with size(customers),
    custom: true,
  };

  const handlePayBills = () => {
    props.payBillFromList(node.selectionContext.selected);
    setActionArray([]);
    setState({ ...state, loader: true, selected: [] });
  };

  const handleSelect = (isSelect, rows, e) => {
    if (rows) {
      setData(isSelect)
      setActionArray(prevArray => [...prevArray, isSelect]);
      setState({ ...state, selected: [...state.selected, isSelect.id] })
    } else {
      setData({});
      setActionArray(cur => cur.filter(data => data.id !== isSelect.id));
      setState({ ...state, selected: state.selected.filter(data => data !== isSelect.id) })
    }
  }
  const handleSelectAll = (isSelect, rows, e) => {
    if (isSelect) {
      setActionArray(rows)
      setState({ ...state, selected: rows.map(item => item.id) })
    } else {
      setActionArray([])
      setState({ ...state, selected: [] })
    }
  };

  // Select  Button operation
  const selectRow = {
    mode: "checkbox",
    onSelect: handleSelect,
    onSelectAll: handleSelectAll,
    selected: [...state.selected]
  };
  const handleDelete = () => {
    props.deleteBillAction(node.selectionContext.selected);
    setActionArray([]);
    setState({ ...state, loader: true, selected: [] });
  };
  const pushToUploadBill = () => {
    history.push("/upload-bills");
  };
  const pushToAprovalBill = () => {
    history.push("/approval-bill-list");
  };

  useEffect(() => {
    if (!seen) {
      props.allBillsListDue()
    }
    setSeen(true)
  }, [seen])
  useEffect(() => {
    if (props.pay_bill_list_loading === "Success") {
      toastr.success("Success")
      props.payBillFromListFresh()
      props.allBillsListDue()
      props.allBillsListFuture()
      props.allBillsListPaid()
      setState({ ...state, loader: false, selected: [] })
      setActionArray([])
    }
  }, [props.pay_bill_list_loading, props.bills_list_loading])
  useEffect(() => {
    if (props.delete_bill_action_loading === "Success") {
      toastr.error("Deleted")
      props.deleteBillActionFresh()
      props.allBillsListDue()
      setState({ ...state, loader: false, selected: [] })
      setActionArray([])
    }
  }, [props.delete_bill_action_loading])
  useEffect(() => {
    if (props.delete_bill_loading === 'Success') {
      endLoader()
    }
  }, [props.delete_bill_loading])

  return (
    <div className="page-content">
      <Container fluid={true}>
        <Breadcrumbs title="Bills" breadcrumbItem="Accounts" />
        <Row>
          <Col lg={12}>
            <div>
              <Row>
                <Col md={2}>
                  <Card>
                    <CardBody>
                      <Row>
                        <Col className="d-flex p-1">
                          <div
                            className="d-flex align-items-center p-2"
                            style={{
                              borderBottom: "1px solid #B2BEB5",
                              borderRight: "1px solid #B2BEB5",
                              cursor: "pointer",
                            }}
                            onClick={pushToUploadBill}
                          >
                            <i className="fas fa-align-justify font-size-20" />
                            <div className="d-flex flex-column justify-content-center mx-2 py-1 px-3">
                              <span style={{ fontSize: "22px" }}>
                                {props.bills_list_data?.uploaded || 0}
                              </span>
                              <span>Bills</span>
                            </div>
                            <i className="fas fa-arrow-right font-size-18" />
                          </div>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
                <Col md={3}>
                  <Card>
                    <CardBody>
                      <Row>
                        <Col className="d-flex p-1">
                          <div
                            className="d-flex align-items-center p-2"
                            style={{
                              borderBottom: "1px solid #B2BEB5",
                              borderRight: "1px solid #B2BEB5",
                              cursor: "pointer",
                            }}
                            onClick={pushToAprovalBill}
                          >
                            <i className="fas fa-align-justify font-size-20" />
                            <div className="d-flex flex-column justify-content-center mx-2 py-1 px-3">
                              <span style={{ fontSize: "22px" }}>
                                {props.bills_list_data?.approval_bills || 0}
                              </span>
                              <span>Approvals</span>
                            </div>
                            <i className="fas fa-arrow-right font-size-18" />
                          </div>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
                <Col md={7}>
                  <Card>
                    <CardBody>
                      <Row style={{ height: "88px" }}>
                        <Col md={9} className="d-flex align-items-end">
                          <div className="button-items">
                            <AddBills
                              toggle={toggleAdd}
                              showModal={showModalAdd}
                              setShowModal={setShowModalAdd}
                              toogleTab={toggle}
                              startLoader={startLoader}
                              endLoader={endLoader}
                            />

                            <button
                              type="button"
                              className="btn btn-secondary mx-1 "
                              onClick={handlePayBills}
                              disabled={actionArray.length > 0 ? false : true}
                            >
                              Pay Bills
                            </button>

                            <button type="button" className="btn btn-info me-1">
                              <Link
                                style={{ color: "white" }}
                                to={`/upload-bills`}
                              >
                                {" "}
                                Upload Bills
                              </Link>
                            </button>

                            <ButtonDropdown
                              isOpen={state.drp_link}
                              toggle={toggledeopsitModal}
                            >
                              <DropdownToggle
                                caret
                                color="secondary"
                                disabled={
                                  actionArray.length == 1 ? false : true
                                }
                              >
                                Actions <i className="mdi mdi-chevron-down"></i>
                              </DropdownToggle>
                              <DropdownMenu>
                                <DropdownItem onClick={handleDelete}>
                                  Delete
                                </DropdownItem>
                                <DropdownItem onClick={billEditModalToggle}>
                                  Edit & Replace
                                </DropdownItem>
                              </DropdownMenu>
                            </ButtonDropdown>
                          </div>
                        </Col>
                        <Col md={3}>
                          <div></div>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
              </Row>

              <Card>
                <CardBody>
                  <Nav className="icon-tab nav-justified">
                    <NavItem>
                      <NavLink
                        style={{ cursor: "pointer" }}
                        className={classnames({
                          active: state.activeTab === "1",
                        })}
                        onClick={() => {
                          toggle("1");
                        }}
                      >
                        Due
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        style={{ cursor: "pointer" }}
                        className={classnames({
                          active: state.activeTab === "2",
                        })}
                        onClick={() => {
                          toggle("2");
                        }}
                      >
                        Upcoming
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        style={{ cursor: "pointer" }}
                        className={classnames({
                          active: state.activeTab === "3",
                        })}
                        onClick={() => {
                          toggle("3");
                        }}
                      >
                        Paid
                      </NavLink>
                    </NavItem>
                  </Nav>

                  <TabContent
                    activeTab={state.activeTab}
                    className="p-3 text-muted"
                  >
                    <TabPane tabId="1">
                      <Row>
                        <Col sm="12">
                          <CardText className="mb-0">
                            <PaginationProvider
                              pagination={paginationFactory(pageOptions)}
                              keyField="id"
                              columns={activeData}
                              data={state.productData}
                            >
                              {({ paginationProps, paginationTableProps }) => (
                                <ToolkitProvider
                                  keyField="id"
                                  columns={activeData}
                                  data={
                                    props.bills_list_data
                                      ? props.bills_list_data?.data
                                      : []
                                  }
                                  search
                                >
                                  {toolkitProps => (
                                    <React.Fragment>
                                      <Row className="mb-2"></Row>

                                      <Row>
                                        <Col xl="12">
                                          <div className="table-responsive">
                                            <div className="d-flex justify-content-end search-box" style={{ marginTop: "50px" }}>
                                              <SearchBar
                                                {...toolkitProps.searchProps}
                                              />
                                            </div>
                                            <BootstrapTable
                                              ref={n => (node = n)}
                                              keyField={"id"}
                                              responsive
                                              bordered={false}
                                              striped={false}
                                              defaultSorted={defaultSorted}
                                              selectRow={selectRow}
                                              tabIndexCell
                                              classes={
                                                "table align-middle table-nowrap"
                                              }
                                              headerWrapperClasses={
                                                "thead-light"
                                              }
                                              {...toolkitProps.baseProps}
                                              {...paginationTableProps}
                                            />
                                          </div>
                                        </Col>
                                      </Row>

                                      <Row className="align-items-md-center mt-30">
                                        <Col className="inner-custom-pagination d-flex">
                                          <div className="d-inline">
                                            <SizePerPageDropdownStandalone
                                              {...paginationProps}
                                            />
                                          </div>
                                          <div className="text-md-right ms-auto">
                                            <PaginationListStandalone
                                              {...paginationProps}
                                            />
                                          </div>
                                        </Col>
                                      </Row>
                                    </React.Fragment>
                                  )}
                                </ToolkitProvider>
                              )}
                            </PaginationProvider>
                          </CardText>
                        </Col>
                      </Row>
                    </TabPane>
                    <TabPane tabId="2">
                      <Row>
                        <Col sm="12">
                          <CardText className="mb-0">
                            {props.bills_list_future_data ? (
                              <DatatableTables2
                                products={props.bills_list_future_data}
                                columnData={activeData}
                              // url={url}
                              />
                            ) : null}
                          </CardText>
                        </Col>
                      </Row>
                    </TabPane>
                    <TabPane tabId="3">
                      <Row>
                        <Col sm="12">
                          <CardText className="mb-0">
                            {props.bills_list_paid_data ? (
                              <DatatableTables2
                                products={props.bills_list_paid_data}
                                columnData={activeData}
                              // url={url}
                              />
                            ) : null}
                          </CardText>
                        </Col>
                      </Row>
                    </TabPane>
                  </TabContent>
                </CardBody>
              </Card>
            </div>
          </Col>
        </Row>
      </Container>
      {
        showModal &&
        <BillsInfoModal
          showModal={showModal}
          setEditModal={setShowModal}
          toggleModal={toggleModal}
          Id={Id}
          data={data}
          billEditModalToggle={billEditModalToggle}
          length={actionArray.length}
          propertyId={null}
          ownerId={null}
          startLoader={startLoader}
        />
      }
      {
        billEditModal &&
        <BillsEditModal
          data={data}
          showModal={billEditModal}
          setShowModal={setBillEditModal}
          toggle={billEditModalToggle}
          setActionArray={setActionArray}
          toogleTab={toggle}
          startLoader={startLoader}
          endLoader={endLoader}
        />
      }
      <Loder status={state.loader} />
    </div>
  );
}

const mapStateToProps = gstate => {
  const { property_list_data, property_list_loading } = gstate.property;

  const {
    bills_list_data,
    bills_list_loading,
    bills_list_future_data,
    bills_list_future_loading,
    bills_list_paid_data,
    bills_list_paid_loading,
    pay_bill_list_loading,
    delete_bill_action_loading,
    delete_bill_loading,
  } = gstate.Bills;

  return {
    bills_list_data,
    bills_list_loading,
    bills_list_future_data,
    bills_list_future_loading,
    bills_list_paid_data,
    bills_list_paid_loading,
    pay_bill_list_loading,
    delete_bill_action_loading,
    delete_bill_loading,
  };
};

export default connect(mapStateToProps, {
  allBillsListDue,
  allBillsListFuture,
  allBillsListPaid,
  payBillFromList,
  payBillFromListFresh,
  deleteBillAction,
  deleteBillActionFresh,
})(BillsList);
