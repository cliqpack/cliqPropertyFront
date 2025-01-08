import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { Link, withRouter, useHistory, useParams } from "react-router-dom";
import {
  UnreconciledDepositsData,
  ReconcileBankDeposit,
  ReconcileBankDepositFresh,
  UnreconciledAllDepositsData,
  UnreconciledAllDepositsDataFresh,
  UnreconcileBankDeposit,
  UnreconcileBankDepositFresh,
  ReconciliationDataFresh,
} from "store/actions";
import classnames from "classnames";
import DatatableTables2 from "../../Tables/DatatableTables2";
import toastr from "toastr";

import {
  Card,
  Alert,
  CardBody,
  CardTitle,
  Col,
  Container,
  Row,
  CardText,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Label,
  Input,
  Button,
  CardHeader,
} from "reactstrap";

import { setDefaultLocale } from "react-datepicker";
import moment from "moment";
import { logDOM } from "@testing-library/react";
import ToolkitProvider, {
  Search,
} from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
  PaginationListStandalone,
  SizePerPageDropdownStandalone,
} from "react-bootstrap-table2-paginator";
import Breadcrumbs from "components/Common/Breadcrumb";

document.title = "Reconciliations";

function UnreconciledDeposits(props) {
  const [state, setState] = useState({
    btnDisabled: true,
    showAll: false,
    selected: [],
  });

  const [actionArray, setActionArray] = useState([]);

  const { date } = useParams();
  const month = date.slice(5, 7);
  const year = date.slice(0, 4);

  const inputRef = useRef(null);

  const [data, setData] = useState({});

  const history = useHistory();

  // const date = moment().format("yyyy-MM-DD");

  let node;
  const defaultSorted = [
    {
      dataField: "id",
      order: "asc",
    },
  ];

  const { SearchBar } = Search;

  const deleteDetails = (e, column, columnIndex, row, rowIndex) => {
    setData(row);
  };

  const deleteHandler = () => {
    e.preventDefault();
  };

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

  const amountRef = (cell, row) => {
    <span className="badge rounded-pill bg-secondary">{cell}</span>;
  };

  const uploadBillDetails = row => { };

  const editRef = (cell, row) => (
    <span onClick={() => uploadBillDetails(row)} className="text-primary">
      Edit
    </span>
  );

  const delRef = (cell, row) => (
    <span className="text-danger" onClick={() => setDeleteState(prev => !prev)}>
      Delete
    </span>
  );

  const fileRef = (cell, row) => {
    return (
      <a
        href={process.env.REACT_APP_IMAGE + row.file}
        target="_blank"
        rel="noreferrer noopener"
      >
        {row.file?.slice(0, 150)}
      </a>
    );
  };

  const dataNow = [
    {
      id: 1,
      deposited: "11/25/2022",
      type: "Banked",
      reference: "",
      comments: "Banking for November on 25/11/2022",
      reconciled: "",
      amount: "100",
    },
    {
      id: 2,
      deposited: "11/25/2022",
      type: "Banked",
      reference: "",
      comments: "Banking for November on 25/11/2022",
      reconciled: "",
      amount: "100",
    },
  ];

  const pageOptions = {
    sizePerPage: 10,
    totalSize: props.un_list_data?.data.length, // replace later with size(customers),
    custom: true,
  };

  const columnData = { data: dataNow };

  const handleSelect = (isSelect, rows, e) => {
    if (rows) {
      setActionArray(prevArray => [...prevArray, isSelect]);
      setState({ ...state, selected: [...state.selected, isSelect.id] })
    } else {
      setActionArray(cur => cur.filter(data => data.id !== isSelect.id));
      setState({ ...state, selected: state.selected.filter(data => data !== isSelect.id) })
    }
  };

  const handleSelectAll = (isSelect, rows, e) => {
    if (isSelect) {
      setActionArray(rows);
      setState({ ...state, selected: rows.map(item => item.id) })
    } else {
      setActionArray([]);
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

  const dateRef = (cell, row) => (
    <span className="text-primary">{moment(cell).format("YYYY-MM-DD")}</span>
  );

  const activeData = [
    {
      dataField: "updated_at",
      text: "Deposited",
      formatter: dateRef,
      sort: true,
    },
    {
      dataField: "status",
      text: "Type",
      sort: true,
    },
    {
      dataField: "reference",
      text: "Reference",
      sort: true,
    },
    {
      dataField: "comments",
      text: "Comments",
      sort: true,
    },
    {
      dataField: "reconcile_date",
      text: "Reconciled",
      sort: true,
    },
    {
      dataField: "amount",
      text: "Amount",
      sort: true,
    },
  ];

  const handleSubmitUploadBill = e => { };

  useEffect(() => {
    if (props.un_list_loading === false) {
      props.UnreconciledDepositsData(month, year);
      props.ReconciliationDataFresh();
    }
    if (props.reconcile_bank_deposit_loading === "Success") {
      toastr.success("Reconcilled");
      setState({...state, selected: []});
      if (props.un_all_list_data) {
        props.UnreconciledAllDepositsData(month, year);
      } else {
        props.UnreconciledDepositsData(month, year);
      }
      props.ReconcileBankDepositFresh();
    }
    if (props.unreconcile_bank_deposit_loading === "Success") {
      toastr.success("Unreconcilled");
      setState({...state, selected: []});
      props.UnreconciledAllDepositsData(month, year);
      props.UnreconcileBankDepositFresh();
    }
  }, [
    props.un_list_loading,
    props.reconcile_bank_deposit_loading,
    props.unreconcile_bank_deposit_loading,
  ]);

  const handleReconcile = () => {
    if (node.selectionContext.selected.length === 0) {
      toastr.error("Select data first");
    } else {
      props.ReconcileBankDeposit(node.selectionContext.selected);
    }
  };
  const handleUnreconcile = () => {
    if (node.selectionContext.selected.length === 0) {
      toastr.error("Select data first");
    } else {
      props.UnreconcileBankDeposit(node.selectionContext.selected);
    }
  };
  const handleShowAll = () => {
    setState(prev => ({ ...prev, showAll: !prev.showAll }));
    if (!state.showAll) {
      props.UnreconciledAllDepositsData(month, year);
    } else {
      props.UnreconciledDepositsData(month, year);
      props.UnreconciledAllDepositsDataFresh();
    }
  };
  return (
    <div className="page-content">
      <Container fluid={true}>
        <Breadcrumbs title="Unreconciled Deposits" breadcrumbItem="Accounts" />

        <Row>
          <Col lg={12}>
            <div>
              <Row>
                <Col md={12}>
                  <Card>
                    <CardBody>
                      <h4 className="ms-2 text-primary border-bottom border-2">
                        {moment(date).format("MMMM").toString()}{" "}
                        {moment(date).format("YYYY").toString()} Unreconciled
                        Deposits
                      </h4>

                      <Row className="py-2">
                        <Col md={9} className="d-flex align-items-center">
                          <div className="button-items">
                            <button
                              type="button"
                              // disabled={state.reconcileData.length > 0 ? true : false}
                              className="btn btn-info me-1"
                              onClick={handleReconcile}
                              disabled={actionArray.length > 0 ? false : true}
                            >
                              <i className="fas fa-check-square me-2" />{" "}
                              Reconcile
                            </button>

                            <button
                              type="button"
                              className="btn btn-secondary"
                              onClick={handleUnreconcile}
                              disabled={
                                state.showAll === true && actionArray.length > 0
                                  ? false
                                  : true
                              }
                            >
                              <i className="far fa-square me-2" /> Unreconcile
                            </button>
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
                  {/* <CardText className="mb-0">
                                        {columnData ? (
                                            <DatatableTables2
                                                products={columnData}
                                                columnData={activeData}
                                                selectRow={selectRow}
                                            // url={url}
                                            />
                                        ) : null}
                                    </CardText> */}
                  <Row>
                    <Col sm="12">
                      <CardText className="mb-0">
                        <PaginationProvider
                          pagination={paginationFactory(pageOptions)}
                          keyField="id"
                          columns={activeData}
                          data={props.un_list_data?.data || []}
                        >
                          {({ paginationProps, paginationTableProps }) => (
                            <ToolkitProvider
                              keyField="id"
                              columns={activeData}
                              data={
                                props.un_all_list_data?.data ||
                                props.un_list_data?.data ||
                                []
                              }
                              search
                            >
                              {toolkitProps => (
                                <React.Fragment>
                                  <Row className="mb-2"></Row>

                                  <Row>
                                    <Col xl="12">
                                      <div className="table-responsive">
                                        <div className="d-flex justify-content-between search-box">
                                          <div className="text-primary d-flex align-items-center">
                                            <input
                                              className="ms-3 me-2"
                                              type="checkbox"
                                              id="defaultCheck1"
                                              onClick={handleShowAll}
                                            />
                                            <label
                                              className="form-check-label"
                                              htmlFor="defaultCheck1"
                                            >
                                              Show all
                                            </label>
                                          </div>
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
                                          headerWrapperClasses={"thead-light"}
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
                </CardBody>
              </Card>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

const mapStateToProps = gstate => {
  const { } = gstate.property;

  const {
    un_list_data,
    un_list_loading,
    reconcile_bank_deposit_loading,
    unreconcile_bank_deposit_loading,

    un_all_list_data,
    un_all_list_error,
    un_all_list_loading,
  } = gstate.Reconciliations;

  return {
    un_list_data,
    un_list_loading,
    reconcile_bank_deposit_loading,
    unreconcile_bank_deposit_loading,

    un_all_list_data,
    un_all_list_error,
    un_all_list_loading,
  };
};

export default connect(mapStateToProps, {
  UnreconciledDepositsData,
  ReconcileBankDeposit,
  ReconcileBankDepositFresh,
  UnreconciledAllDepositsData,
  UnreconciledAllDepositsDataFresh,
  UnreconcileBankDeposit,
  UnreconcileBankDepositFresh,
  ReconciliationDataFresh,
})(UnreconciledDeposits);
