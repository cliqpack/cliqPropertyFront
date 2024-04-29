import React, { useState, useEffect, useRef } from "react";
import moment from "moment";
import { connect } from "react-redux";
import PropTypes, { number } from "prop-types";
import { useDispatch } from "react-redux";
import {
  Card,
  Alert,
  CardBody,
  CardTitle,
  CardText,
  Col,
  Container,
  Row,
  Label,
  Input,
  Button,
  CardHeader,
} from "reactstrap";
import Select from "react-select";
import { getChartOfAccounts } from "store/actions";
import { Link, useHistory, withRouter } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";
import toastr from "toastr";
import ToolkitProvider, {
  Search,
} from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
  PaginationListStandalone,
  SizePerPageDropdownStandalone,
} from "react-bootstrap-table2-paginator";
import AccountsAddModal from "./AccountsAddModal";
import RemoveAccountModal from "./RemoveAccountModal";
import AccountsInfoModal from "./AccountsInfoModal";

document.title = "CliqProperty";

const ChartOfAccounts = props => {
  const history = useHistory();
  const [state, setState] = useState({
    accountsModal: false,
    accountModalRemove: false,
    accountsInfoModal: false,
  });
  const [actionArray, setActionArray] = useState([]);

  const toggleModalAcc = () => {
    setState(prev => ({ ...prev, accountsModal: !prev.accountsModal }));
  };
  const toggleModalAccInfo = () => {
    setState(prev => ({ ...prev, accountsInfoModal: !prev.accountsInfoModal }));
  };

  const toggleModalRmv = () => {
    setState(prev => ({
      ...prev,
      accountModalRemove: !prev.accountModalRemove,
    }));
  };

  const { SearchBar } = Search;

  const pageOptions = {
    sizePerPage: 10,
    totalSize: props.chartAccount_list_data?.account.length || 0, // replace later with size(customers),
    custom: true,
  };

  let node;
  const defaultSorted = [
    {
      dataField: "id",
      order: "asc",
    },
  ];

  const textRef = (cell, row) => <span className="fw-bold">{cell}</span>;
  const taxRef = (cell, row) => {
    return (
      <span className="fw-bold">
        {cell == 1 ? <i className="fas fa-check" /> : ""}
      </span>
    );
  };

  const hiddenRef = (cell, row) => (
    <span className="fw-bold">
      {cell == 1 ? <i className="fas fa-check" /> : ""}
    </span>
  );

  const accountDetails = (e, column, columnIndex, row, rowIndex) => {
    setState({ ...state, infoAccounts: row });
    toggleModalAccInfo();
  };

  const activeData = [
    {
      dataField: "account_name",
      text: "Name",
      formatter: textRef,
      sort: true,
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          accountDetails(e, column, columnIndex, row, rowIndex);
        },
      },
    },

    {
      dataField: "account_number",
      text: "Number",
      sort: true,
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          accountDetails(e, column, columnIndex, row, rowIndex);
        },
      },
    },
    {
      dataField: "type",
      text: "Type",

      sort: true,
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          accountDetails(e, column, columnIndex, row, rowIndex);
        },
      },
    },
    {
      dataField: "description",
      text: "Description",
      sort: true,
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          accountDetails(e, column, columnIndex, row, rowIndex);
        },
      },
    },
    {
      dataField: "tax",
      text: "Tax",
      formatter: taxRef,

      sort: true,
    },
    {
      dataField: "",
      text: "System Account",
      sort: true,
    },
    {
      dataField: "hidden",
      text: "Hidden",
      formatter: hiddenRef,

      sort: true,
    },
  ];

  const handleSelect = (isSelect, rows, e) => {
    // console.log(isSelect, rows);
    if (rows) {
      setActionArray(prevArray => [...prevArray, isSelect]);
    } else {
      setActionArray(cur => cur.filter(data => data.id !== isSelect.id));
    }
  };

  const handleSelectAll = (isSelect, rows, e) => {
    // console.log(isSelect, rows);
    if (isSelect) {
      setActionArray(rows);
    } else {
      setActionArray([]);
    }
  };

  // Select  Button operation
  const selectRow = {
    mode: "checkbox",

    onSelect: handleSelect,

    onSelectAll: handleSelectAll,
  };

  const handleRemove = () => {
    console.log(node.selectionContext.selected);
    setState({ ...state, deleteId: node.selectionContext.selected });
    toggleModalRmv();
  };
  useEffect(() => {
    if (props.chartAccount_list_loading === false) {
      props.getChartOfAccounts();
    }
  }, [props.chartAccount_list_loading]);
  // console.log(props.chartAccount_list_data?.account);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <h4 className="ms-2 text-primary mb-4">Chart of Accounts</h4>
                  <div
                    className="w-100 mt-2 mb-4"
                    style={{
                      borderBottom: "1.2px dotted #c9c7c7",
                    }}
                  ></div>
                  <div className="d-flex">
                    <div className="button-groups me-2">
                      <button
                        type="button"
                        className="btn btn-info"
                        onClick={toggleModalAcc}
                      >
                        <i className="fas fa-tag me-1" />
                        Add account
                      </button>
                    </div>
                    <div className="button-groups">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={handleRemove}
                        disabled={actionArray.length > 0 ? false : true}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </CardBody>
              </Card>

              <Card>
                <CardBody>
                  <CardText className="mb-0">
                    <PaginationProvider
                      pagination={paginationFactory(pageOptions)}
                      keyField="id"
                      columns={activeData}
                      data={props.chartAccount_list_data?.account || []}
                    >
                      {({ paginationProps, paginationTableProps }) => (
                        <ToolkitProvider
                          keyField="id"
                          columns={activeData}
                          data={props.chartAccount_list_data?.account || []}
                          search
                        >
                          {toolkitProps => (
                            <React.Fragment>
                              <Row className="mb-2">
                                <Col md={2}></Col>
                                <Col md={10}></Col>
                              </Row>

                              <Row>
                                <Col xl="12">
                                  <div className="table-responsive">
                                    <div className="d-flex justify-content-end align-items-center search-box">
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
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
      <AccountsAddModal
        accountsModal={state.accountsModal}
        toggle={toggleModalAcc}
      />
      <RemoveAccountModal
        accountModalRemove={state.accountModalRemove}
        toggle={toggleModalRmv}
        length={actionArray.length}
        Id={state.deleteId}
      />
      <AccountsInfoModal
        accountsInfoModal={state.accountsInfoModal}
        toggle={toggleModalAccInfo}
        data={state.infoAccounts}
      />
    </React.Fragment>
  );
};

const mapStateToProps = gstate => {
  const { chartAccount_list_data, chartAccount_list_loading } =
    gstate.Portfolio;

  return { chartAccount_list_data, chartAccount_list_loading };
};

export default withRouter(
  connect(mapStateToProps, { getChartOfAccounts })(ChartOfAccounts)
);
