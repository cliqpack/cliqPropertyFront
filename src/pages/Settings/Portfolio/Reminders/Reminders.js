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
import { getReminder } from "store/actions";
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
import AddReminderModal from "./AddReminderModal";
import RemoveReminderSettings from "./RemoveReminderSettings";

document.title = "CliqProperty";

const Reminders = props => {
  const history = useHistory();
  const [state, setState] = useState({ reminderModal: false, init: true });
  const [actionArray, setActionArray] = useState([]);
  console.log(actionArray);
  const { SearchBar } = Search;

  const pageOptions = {
    sizePerPage: 10,
    totalSize: props.reminders_data?.data?.length, // replace later with size(customers),
    custom: true,
  };

  let node;
  const defaultSorted = [
    {
      dataField: "id",
      order: "asc",
    },
  ];

  const contact = (cell, row) => {

    if (row.default_contact == 'supplier') {
      return <span>{row.supplier.reference}</span>
    } else {
      return <span>{row.default_contact}</span>
    }
  }

  const status = (cell, row) => {
    if (row.status == 1) {
      return <span>Active</span>
    } else {
      return <span>Inctive</span>

    }
  }

  const refDetail = (e, column, columnIndex, row, rowIndex) => {
    setActionArray(row);
    toggleModalRemiinder();
  }

  const frequency = (cell, row) => {
    return <span>{row.default_frequency && `${row.default_frequency} ${row.frequency_type}`}</span>
  }

  const systemRef = (cell, row) => <div className="w-100 d-flex justify-content-center align-items-center">{cell}</div>

  const activeData = [
    {
      dataField: "name",
      text: "Name",
      sort: true,
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => { refDetail(e, column, columnIndex, row, rowIndex); }
      },
    },
    {
      dataField: "",
      text: "Default Contact",
      formatter: contact,
      sort: true,
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => { refDetail(e, column, columnIndex, row, rowIndex); }
      },
    },
    // {
    //   dataField: "default_frequency",
    //   text: "Default Frequency",
    //   formatter: frequency,
    //   sort: true,
    //   events: {
    //     onClick: (e, column, columnIndex, row, rowIndex) => { refDetail(e, column, columnIndex, row, rowIndex); }
    //   },
    // },
    {
      dataField: "status",
      text: "Status",
      formatter: status,
      sort: true,
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => { refDetail(e, column, columnIndex, row, rowIndex); }
      },
    },
    {
      dataField: "system_template",
      text: "System Template",
      formatter: systemRef,
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => { refDetail(e, column, columnIndex, row, rowIndex); }
      },
    },
  ];

  const handleSelect = (isSelect, rows, e) => {
    // console.log(isSelect, rows);
    if (rows) {
      setActionArray(prevArray => [...prevArray, isSelect]);
    } else {
      setActionArray(cur => cur.filter(data => data?.id !== isSelect?.id));
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

  const toggleModalRemiinder = () => {
    // if (state.reminderModal) {
    //   setActionArray('')
    //   setState(prev => ({ ...prev, reminderModal: !prev.reminderModal }));

    // } else {

    // }
    setState(prev => ({ ...prev, reminderModal: !prev.reminderModal }));

  };
  useEffect(() => {
    if (state.init) {
      props.getReminder();
      setState({ ...state, init: false })
    }
  }, []);

  const [rmv, setRmv] = useState(false)

  const toggleRemoveRemiinder = () => {
    if (rmv) {
      setActionArray('')
      setRmv(prev => !prev)

    } else {

      setRmv(prev => !prev)
    }

  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <h4 className="ms-2 text-primary mb-4">Reminders</h4>
                  <div
                    className="w-100 mt-2 mb-4"
                    style={{
                      borderBottom: "1.2px dotted #c9c7c7",
                    }}
                  ></div>
                  <div className="button-groups">
                    <button
                      type="button"
                      className="btn btn-info me-1"
                      onClick={toggleModalRemiinder}
                    >
                      <i className="fas fa-tag me-1" />
                      Add Reminder
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={toggleRemoveRemiinder}
                      disabled={actionArray?.length == 1 ? false : true}
                    >
                      Remove
                    </button>
                  </div>
                </CardBody>
              </Card>

              <Card>
                <CardBody>
                  <CardText className="mb-0">
                    {props.reminders_data?.data &&
                      <PaginationProvider
                        pagination={paginationFactory(pageOptions)}
                        keyField="id"
                        columns={activeData}
                        data={props.reminders_data?.data || []}
                      >
                        {({ paginationProps, paginationTableProps }) => (
                          <ToolkitProvider
                            keyField="id"
                            columns={activeData}
                            data={props.reminders_data?.data || []}
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
                      </PaginationProvider>}
                  </CardText>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
      {state.reminderModal && <AddReminderModal
        reminderModal={state.reminderModal}
        toggle={toggleModalRemiinder}
        data={actionArray}
        setActionArray={setActionArray}
      />}
      <RemoveReminderSettings status={rmv} toggle={toggleRemoveRemiinder} data={actionArray} setActionArray={setActionArray}
      />
    </React.Fragment>
  );
};

const mapStateToProps = gstate => {
  const { reminders_data, reminders_data_loading } = gstate.Portfolio;

  return { reminders_data, reminders_data_loading };
};

export default withRouter(connect(mapStateToProps, { getReminder })(Reminders));
