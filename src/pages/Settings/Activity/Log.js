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
import { getUser, getSettingsLog } from "store/actions";
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


document.title = "CliqProperty";

const Log = props => {
  const history = useHistory();
  const [state, setState] = useState({ reasonModal: false, checked: false, init: true });

  const checkToggle = () => setState({ ...state, checked: !state.checked })


  const toggleModalReason = () => {
    setState(prev => ({ ...prev, reasonModal: !prev.reasonModal }));
  };
  const { SearchBar } = Search;

  const pageOptions = {
    sizePerPage: 10,
    totalSize: props.all_settings_log?.length, // replace later with size(customers),
    custom: true,
  };

  let node;
  const defaultSorted = [
    {
      dataField: "id",
      order: "asc",
    },
  ];

  const data = [
    {
      id: 1, date: '2/08/2023', detail: 'Emailed Sent - RE: Notice Of Rent Increase at 407/601 St Kilda Rd, Melbourne VIC 3004', property: 'LONS39.802',
      contact: 'Haibing Zhang', for: 'Tenancy', regarding: 'withdrawal', member: 'Yuki yuan'
    },
    {
      id: 2, date: '2/08/2023', detail: 'Emailed Sent - RE: Notice Of Rent Increase at 407/601 St Kilda Rd, Melbourne VIC 3004', property: 'LONS39.802',
      contact: 'Haibing Zhang', for: 'Tenancy', regarding: 'withdrawal', member: 'Yuki yuan'
    }
  ]

  const propertyRef = (cell, row) => <Link to='' className="text-info">{row.property.reference}</Link >

  const contactRef = (cell, row) => <Link to='' className="text-info">{row.property.contact}</Link >

  const forRef = (cell, row) => showRefData(row)
  const showRefData = data => {
    if (data.maintenance) {
      return <Link className="text-info">{data.maintenance.summary}</Link >
    } else if (data.task) {
      return <Link className="text-info">{data.task.summary}</Link >
    } else if (data.listing) {
      return <Link className="text-info">{data.listing.summary}</Link >
    } else if (data.inspection) {
      return <Link className="text-info">{data.inspection.summery}</Link >
    } else if (data.comment) {
      return <span>{data.comment}</span>
    }
  }
  const regardingRef = (cell, row) => <Link to='' className="text-info">{row.regarding}</Link >
  const memberRef = (cell, row) => <Link to='' className="text-info">{row.property.manager}</Link >

  const timeRef = (cell, row) => <div>{moment(cell).format('DD/MM/yyyy hh:mm a')}</div>
  const detailRef = (cell, row) => <div>{cell ? cell : ''}</div>
  const activeData = [
    {
      dataField: "created_at",
      text: "Time",
      formatter: timeRef,
      sort: true,
    },

    {
      dataField: "status",
      text: "Detail",
      formatter: detailRef,
      // sort: true,
    },
    {
      dataField: "property",
      text: "Property",
      formatter: propertyRef,
    },
    {
      dataField: "contact",
      text: "Contact",
      formatter: contactRef,

    },
    {
      dataField: "for",
      text: "For",
      formatter: forRef,

    },
    // {
    //   dataField: "regarding",
    //   text: "Regarding",
    //   formatter: regardingRef,

    // },
    {
      dataField: "member",
      text: "Member",
      formatter: memberRef,

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
  useEffect(() => {
    if (state.init) {
      props.getUser();
      props.getSettingsLog()
      setState({ ...state, init: false })
    }
    let optionManager;
    if (props.user_list_data) {
      optionManager = props.user_list_data?.data.map(item => ({
        // label: item.first_name + " " + item.last_name,
        label: item.full_name,
        value: item.id,
      }));
      setState(prev => ({ ...prev, optionManager: optionManager }));
    }
  }, [props.user_list_data]);

  console.log(props.all_settings_log?.data);

  const handleSelectGroupManager = e => {
    setState({ ...state, selectedManager: e });
  };


  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <h4 className="ms-2 text-primary mb-4">Log</h4>
                  <div
                    className="w-100 mt-2 mb-4"
                    style={{
                      borderBottom: "1.2px dotted #c9c7c7",
                    }}
                  ></div>
                  {/* <div className="button-groups">
                    <button
                      type="button"
                      className="btn btn-info"
                      onClick={toggleModalReason}
                    >
                      <i className="fas fa-plus-square me-1" />
                      New Reason
                    </button>
                  </div> */}
                </CardBody>
              </Card>

              <Card>
                <CardBody>
                  <CardText className="mb-0">
                    {/* <div className="px-1 py-2 rounded-1" style={{ backgroundColor: '#DCDCDC' }}>
                      <Row>
                        <Col md={5} className="d-flex justify-content-end">
                          <div className="w-50">
                            <Select
                              value={state.selectedManager}
                              onChange={e => { handleSelectGroupManager(e) }}
                              options={state.optionManager}
                              classNamePrefix="select2-selection"
                            />
                          </div>
                        </Col>

                        <Col md={7} className="d-flex justify-content-around align-items-center">
                          <div className="w-50">
                            <input
                              className="form-control"
                              type="search"
                              defaultValue="Search Text"
                            />
                          </div>
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value=""
                              id="defaultCheck1"
                              checked={state.checked}
                              onChange={checkToggle}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="defaultCheck1"
                            >
                              Important

                            </label>
                          </div>
                          <Button color="secondary">
                            Search
                          </Button>

                        </Col>
                      </Row>
                    </div> */}
                    {props.all_settings_log?.data?.length > 1 &&
                      <PaginationProvider
                        pagination={paginationFactory(pageOptions)}
                        keyField="id"
                        columns={activeData}
                        data={props.all_settings_log?.data || []}
                      >
                        {({ paginationProps, paginationTableProps }) => (
                          <ToolkitProvider
                            keyField="id"
                            columns={activeData}
                            data={props.all_settings_log?.data || []}
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
                                        {/* <SearchBar
                                        {...toolkitProps.searchProps}
                                      /> */}
                                      </div>
                                      <BootstrapTable
                                        ref={n => (node = n)}
                                        keyField={"id"}
                                        responsive
                                        bordered={false}
                                        striped={false}
                                        defaultSorted={defaultSorted}
                                        // selectRow={selectRow}
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
    </React.Fragment>
  );
};

const mapStateToProps = gstate => {
  const { user_list_data, all_settings_log } = gstate.Document;
  // const { } = gstate.Portfolio;

  return { user_list_data, all_settings_log };
};

export default withRouter(connect(mapStateToProps, { getUser, getSettingsLog })(Log));
