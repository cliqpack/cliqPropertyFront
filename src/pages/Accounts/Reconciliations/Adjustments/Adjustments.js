import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { Link, withRouter, useHistory, useParams } from "react-router-dom";
import {
  adjustmentsData,
  allAdjustmentsData,
  allAdjustmentsDataFresh,
  ReconciliationDataFresh,
  addAdjustmentFresh,
  adjustmentsDataFresh,
  removeAdjustmentFresh,
} from "store/actions";
import classnames from "classnames";
import DatatableTables2 from "../../../Tables/DatatableTables2";
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
import AdjustmentModal from "./AdjustmentModal";
import RemoveAdjustmentsModal from "./RemoveAdjustmentsModal";
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

document.title = "CliqProperty";

function Adjustments(props) {
  const [state, setState] = useState({
    removeBtnStatus: true,
    showModalAdd: false,
    showModalRemove: false,
    showModalRemoveData: [],
    showAll: false,
    selected: [],
  });

  const [actionArray, setActionArray] = useState([]);

  const [seen, setSeen] = useState(false);

  const { id, year, month } = useParams();

  const toggleModalAdd = () =>
    setState(prev => ({ ...prev, showModalAdd: !prev.showModalAdd }));

  const toggleModalRemove = () => {
    setState(prev => ({ ...prev, showModalRemove: !prev.showModalRemove }));
  };

  const inputRef = useRef(null);

  const [data, setData] = useState({});

  const history = useHistory();

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

  const amountFormatter = (cell, row) => {
    return <span>{cell}৳</span>
  }

  const activeData = [
    {
      dataField: "adjustment_date",
      text: "Date",
      sort: true,
    },
    {
      dataField: "reason",
      text: "Reason",
      sort: true,
    },
    {
        dataField: "remove_date",
        text: "Removed",
        sort: true
    },
    {
        dataField: "removed_reason",
        text: "Reason Removed",
        sort: true,
    },
    {
      dataField: "amount",
      text: "Amount",
      formatter: amountFormatter,
      sort: true,
    },
  ];

  const { SearchBar } = Search;

  const pageOptions = {
    sizePerPage: 10,
    totalSize:
      props.all_ad_list_data?.data.length || props.ad_list_data?.data?.length, // replace later with size(customers),
    custom: true,
  };

  let node;
  const defaultSorted = [
    {
      dataField: "id",
      order: "asc",
    },
  ];

  const handleSelect = (isSelect, rows, e) => {
    if (rows) {
      setActionArray(prevArray => [...prevArray, isSelect]);
      setState({ ...state, selected: [...state.selected, isSelect.id] });
    } else {
      setActionArray(cur => cur.filter(data => data.id !== isSelect.id));
      setState({ ...state, selected: state.selected.filter(data => data !== isSelect.id) });
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

  const selectRow = {
    mode: "checkbox",
    onSelect: handleSelect,
    onSelectAll: handleSelectAll,
    selected: [...state.selected]
  };

  const handleChange = state => {
    setSelectedData(state.selectedRows);
  };

  const handleShowAll = () => {
    setState(prev => ({ ...prev, showAll: !prev.showAll }));
    if (!state.showAll) {
      props.allAdjustmentsData(id);
    } else {
      props.allAdjustmentsDataFresh();
    }
  };

  useEffect(() => {
    if (props.ad_list_loading === false) {
      props.adjustmentsData(id);
      props.ReconciliationDataFresh();
    }
    if (props.add_adjustment_loading === "Success") {
      toastr.success("Success");
      setActionArray([])
      props.addAdjustmentFresh();
      if(state.showAll) {
        props.allAdjustmentsData(id);
      } else props.adjustmentsData(id);
    }
    if (props.rmv_adjustment_loading === "Success") {
      toastr.success("Removed");
      setActionArray([])
      props.removeAdjustmentFresh();
      if(state.showAll) {
        props.allAdjustmentsData(id);
      } else props.adjustmentsData(id);
    }
  }, [props.ad_list_loading, props.add_adjustment_loading, props.rmv_adjustment_loading]);

  return (
    <div className="page-content">
      <Container fluid={true}>
        <Breadcrumbs title="Adjustments" breadcrumbItem="Accounts" />

        <Row>
          <Col lg={12}>
            <div>
              <Row>
                <Col md={12}>
                  <Card>
                    <CardBody>
                      <h4 className="ms-2 text-primary border-bottom border-2">
                        {moment()
                          .month(month - 1)
                          .format("MMMM")}{" "}
                        {year} Adjustments
                      </h4>

                      <p className="ms-2 text-info">
                        {moment()
                          .month(month - 1)
                          .format("MMMM")}{" "}
                        {year} Reconciliation (current)
                      </p>
                      <Row className="py-2">
                        <Col md={9} className="d-flex align-items-center">
                          <div className="button-items">
                            <AdjustmentModal
                              state={state}
                              toggle={toggleModalAdd}
                              setState={setState}
                              setSeen={setSeen}
                            />

                            <button
                              type="button"
                              className="btn btn-secondary"
                              onClick={toggleModalRemove}
                              disabled={actionArray.length > 0 ? false : true}
                            >
                              Remove
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
                        props.all_ad_list_data?.data ||
                        props.ad_list_data?.data ||
                        []
                      }
                    >
                      {({ paginationProps, paginationTableProps }) => (
                        <ToolkitProvider
                          keyField="id"
                          columns={activeData}
                          data={
                            props.all_ad_list_data?.data ||
                            props.ad_list_data?.data ||
                            []
                          }
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

      <RemoveAdjustmentsModal
        state={state}
        actionArray={actionArray}
        toggle={toggleModalRemove}
        setState={setState}
      />
    </div>
  );
}

const mapStateToProps = gstate => {
  const { } = gstate.property;

  const { ad_list_loading, ad_list_data, all_ad_list_data, add_adjustment_loading, rmv_adjustment_loading } =
    gstate.Reconciliations;

  return {
    ad_list_loading,
    ad_list_data,
    all_ad_list_data,
    add_adjustment_loading,
    rmv_adjustment_loading,
  };
};

export default connect(mapStateToProps, {
  adjustmentsData,
  allAdjustmentsData,
  allAdjustmentsDataFresh,
  ReconciliationDataFresh,
  addAdjustmentFresh,
  adjustmentsDataFresh,
  removeAdjustmentFresh,
})(Adjustments);
