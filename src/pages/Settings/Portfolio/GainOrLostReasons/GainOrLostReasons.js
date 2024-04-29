import React, { useState, useEffect, useRef } from "react";
import moment from "moment";
import { connect } from "react-redux";
import PropTypes, { number } from "prop-types";
import { useDispatch } from "react-redux";
import {
  Card,
  Alert,
  CardBody,
  CardText,
  CardTitle,
  Col,
  Container,
  Row,
  Label,
  Input,
  Button,
  CardHeader,
} from "reactstrap";
import Select from "react-select";
import { getReasons } from "store/actions";
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
import ReasonModalAdd from "./ReasonModalAdd";
import RemoveReasonModal from "./RemoveReasonModal";

document.title = "CliqProperty";

const GainOrLostReasons = props => {
  const history = useHistory();
  const [state, setState] = useState({ reasonModal: false, init: true, removeModal: false });
  const removeModalToggle = () => setState({ ...state, removeModal: !state.removeModal })
  const [actionArray, setActionArray] = useState([]);
  console.log(actionArray);
  useEffect(() => {
    if (state.init) {
      props.getReasons();
      setState({ ...state, init: false })
    }
  }, []);

  console.log(props.reasons_data?.data);

  const toggleModalReason = () => {
    if (state.reasonModal) {
      setActionArray([])
    }
    setState(prev => ({ ...prev, reasonModal: !prev.reasonModal }));
  };
  const { SearchBar } = Search;

  const pageOptions = {
    sizePerPage: 10,
    totalSize: props.reasons_data?.data?.length, // replace later with size(customers),
    custom: true,
  };

  let node;
  const defaultSorted = [
    {
      dataField: "id",
      order: "asc",
    },
  ];


  const labelDetails = (e, column, columnIndex, row, rowIndex) => {
    console.log(row);
    // return
    setActionArray(row);
    toggleModalReason()
  };

  const systemRef = (cell, row) => <div>{cell && <i className="fas fa-check" />}</div>
  const activeData = [
    {
      dataField: "type",
      text: "Type",
      sort: true,
    },

    {
      dataField: "reason",
      text: "Reason",
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          labelDetails(e, column, columnIndex, row, rowIndex);
        },
      },
    },
    {
      dataField: "system_supplied",
      text: "System Supplied",
      formatter: systemRef,
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

  const selectData = []

  const handleDisableRow = data => {

    return
  }
  // Select  Button operation
  const selectRow = {
    mode: "checkbox",
    // clickToSelect: true,
    // nonSelectable: [1, 2, 3],
    onSelect: handleSelect,


    onSelectAll: handleSelectAll,


  };


  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <h4 className="ms-2 text-primary mb-4">Gain/Lost Reasons</h4>
                  <div
                    className="w-100 mt-2 mb-4"
                    style={{
                      borderBottom: "1.2px dotted #c9c7c7",
                    }}
                  ></div>
                  <div className="button-groups">
                    <button
                      type="button"
                      className="btn btn-info"
                      onClick={toggleModalReason}
                    >
                      <i className="fas fa-plus-square me-1" />
                      New Reason
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary ms-1"
                      disabled={actionArray.length ? false : true}
                      onClick={removeModalToggle}
                    >
                      Remove
                    </button>
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
                      data={props.reasons_data?.data || []}
                    >
                      {({ paginationProps, paginationTableProps }) => (
                        <ToolkitProvider
                          keyField="id"
                          columns={activeData}
                          data={props.reasons_data?.data || []}
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
      {state.reasonModal && <ReasonModalAdd
        reasonModal={state.reasonModal}
        toggle={toggleModalReason}
        data={actionArray}
      />}
      {state.removeModal &&
        <RemoveReasonModal toggle={removeModalToggle} status={state.removeModal} data={actionArray} />
      }
    </React.Fragment>
  );
};

const mapStateToProps = gstate => {
  const { reasons_data, reasons_data_error, reasons_data_loading } = gstate.Portfolio;

  return { reasons_data, reasons_data_error, reasons_data_loading };
};

export default withRouter(connect(mapStateToProps, { getReasons })(GainOrLostReasons));
