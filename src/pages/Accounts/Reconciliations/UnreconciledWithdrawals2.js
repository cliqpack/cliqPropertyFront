import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import {
  unreconciledWithdrawals,
  unreconciledWithdrawalsFresh,
  unreconciledWithdrawalsAll,
  unreconciledWithdrawalsAllFresh,
  unreconciledWithdrawalsReconcile,
  unreconciledWithdrawalsReconcileFresh,
  unreconciledWithdrawalsUnReconcile,
  unreconciledWithdrawalsUnReconcileFresh,
} from "store/actions";
import toastr from "toastr";

import {
  Card,
  CardBody,
  Col,
  Container,
  Row,
  CardText,
} from "reactstrap";

import moment from "moment";
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

function UnreconciledWithdrawals2(props) {
  const { year, month } = useParams();
  const [state, setState] = useState({
    activeTab: "1",
    showAll: false,
    selected: [],
  });

  const [seen, setSeen] = useState(false);

  const date = moment().format("yyyy-MM-DD");

  const [actionArray, setActionArray] = useState([]);

  // const dateRef = (cell, row) => <span className="text-primary">{moment(cell).format('YYYY MM DD')}</span>
  // const dateRef = (cell, row) => (
  //   <span className="text-primary">{cell.slice(0, 10)}</span>
  // );

  const amtRef = (cell, row) => {
    return <span>{row.amount}</span>
  }
  const activeData = [
    {
      dataField: "create_date",
      text: "Created",
      // ref: dateRef,
      sort: true,
    },
    {
      dataField: "payment_type",
      text: "Type",
      sort: true,
    },
    {
      dataField: "",
      text: "Reference",
      sort: true,
    },
    {
      dataField: "statement",
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
      formatter: amtRef,
      sort: true,
    },
  ];

  const { SearchBar } = Search;

  const pageOptions = {
    sizePerPage: 10,
    totalSize: props.uwl_all_data?.data.length || props.uwl_data?.data.length,
    custom: true,
  };

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

  let node;
  const defaultSorted = [
    {
      dataField: "id",
      order: "asc",
    },
  ];

  const handleShowAll = e => {
    setState(prev => ({ ...prev, showAll: !prev.showAll }));
    if (!state.showAll) {
      props.unreconciledWithdrawalsAll(year, month);
    } else {
      props.unreconciledWithdrawalsAllFresh();
    }
  };

  const handlerReconcile = () => {
    props.unreconciledWithdrawalsReconcile(node.selectionContext.selected);
  };

  const handlerUnReconcile = () => {
    props.unreconciledWithdrawalsUnReconcile(node.selectionContext.selected);
  };

  useEffect(() => {
    if (!seen || props.uwl_loading === false) {
      props.unreconciledWithdrawals(year, month);
    }
    if (props.uwl_add_loading === "Success") {
      toastr.success("Success");
      setActionArray([]);
      setState({...state, selected: []});
      props.unreconciledWithdrawalsReconcileFresh();
      if (state.showAll) {
        props.unreconciledWithdrawalsAll(year, month);
      } else props.unreconciledWithdrawals(year, month);
    }
    if (props.uwl_rmv_loading === "Success") {
      toastr.success("Success");
      setActionArray([]);
      setState({...state, selected: []});
      props.unreconciledWithdrawalsUnReconcileFresh();
      props.unreconciledWithdrawalsAll(year, month);
    }
  }, [props.uwl_loading, props.uwl_add_loading, props.uwl_rmv_loading]);

  return (
    <div className="page-content">
      <Container fluid={true}>
        <Breadcrumbs title="Unreconciled Withdrawals" breadcrumbItem="Accounts" />

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
                        Withdrawals
                      </h4>

                      <Row className="py-2">
                        <Col md={9} className="d-flex align-items-center">
                          <div className="button-items">
                            <button
                              type="button"
                              className="btn btn-info me-1"
                              onClick={handlerReconcile}
                              disabled={actionArray.length > 0 ? false : true}
                            >
                              <i className="fas fa-check-square me-2" />{" "}
                              Reconcile
                            </button>

                            <button
                              type="button"
                              className="btn btn-secondary"
                              onClick={handlerUnReconcile}
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
                  <CardText className="mb-0">
                    <PaginationProvider
                      pagination={paginationFactory(pageOptions)}
                      keyField="id"
                      columns={activeData}
                      data={
                        props.uwl_all_data?.data || props.uwl_data?.data || []
                      }
                    >
                      {({ paginationProps, paginationTableProps }) => (
                        <ToolkitProvider
                          keyField="id"
                          columns={activeData}
                          data={
                            props.uwl_all_data?.data ||
                            props.uwl_data?.data ||
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
                                    <div className="d-flex justify-content-between align-items-center search-box">
                                      <div className="form-check mb-3 ms-3">
                                        <input
                                          className="form-check-input"
                                          type="checkbox"
                                          value=""
                                          id="defaultCheck1"
                                          onClick={handleShowAll}
                                        />
                                        <label
                                          className="form-check-label"
                                          htmlFor="defaultCheck1"
                                        >
                                          Show All
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
    uwl_data,
    uwl_loading,
    uwl_all_data,
    uwl_all_loading,
    uwl_add_loading,
    uwl_rmv_loading,
  } = gstate.Reconciliations;

  return {
    uwl_data,
    uwl_loading,
    uwl_all_data,
    uwl_all_loading,
    uwl_add_loading,
    uwl_rmv_loading,
  };
};

export default connect(mapStateToProps, {
  unreconciledWithdrawals,
  unreconciledWithdrawalsFresh,
  unreconciledWithdrawalsAll,
  unreconciledWithdrawalsAllFresh,
  unreconciledWithdrawalsReconcile,
  unreconciledWithdrawalsReconcile,
  unreconciledWithdrawalsReconcileFresh,
  unreconciledWithdrawalsUnReconcile,
  unreconciledWithdrawalsUnReconcileFresh,
})(UnreconciledWithdrawals2);
