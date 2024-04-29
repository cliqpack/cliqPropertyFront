import React, { useEffect, useState } from "react";
import moment from "moment";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import DatatableTables from "../Tables/DatatableTables";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { Link, withRouter, useHistory } from "react-router-dom";

import classnames from "classnames";

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
import DatatableTables2 from "../Tables/DatatableTables2";
import {
  getInspectionList,
  InspectionInfoFresh,
  getScheduleList,
  scheduleListFresh,
  getUnscheduled,
  InspectionListFresh,
  getInspectionListOther,
  InspectionListOtherFresh,
  getInspectedList,
  inspectedListFresh,
  getUnscheduledFresh,
  getCompleteList,
  completeListFresh,
} from "../../store/Inspections/actions";
import InspectionDetails from "./InspectionDetails";
import RemotePagination from "pages/Task/RemotePagination";

function InspectionList(props) {
  let history = useHistory();
  const [state, setState] = useState({
    activeTab: "2",
    page: 1,
    data: [],
    sizePerPage: 10,
    dataLength: 0,
    loading: false,
    overdue: 0,
    to_finalise: 0,
  });


  const [keyModal, setKeyModal] = useState(false);
  const [text, setText] = useState();
  const [textAdd, setTextAdd] = useState();
  const [selectedState, setSelectedState] = useState([]);
  const [property, setProperty] = useState([]);
  const [active, setActive] = useState();
  const [inspectedD, setInspectedD] = useState();
  const [uninspectedD, setUninspectedD] = useState();
  const [scheduledD, setScheduledD] = useState();
  const [completed, setCompleted] = useState();
  const [init, setInit] = useState(true);

  const [search, setSearch] = useState("");
  const handleSearchState = e => {
    setSearch(e.target.value);
  };

  const dueTaskDefaultSorted = [
    {
      dataField: "summary",
      order: "desc",
    },
  ];

  const dueTaskSelectRow = {
    mode: "checkbox",
    hideSelectColumn: true,
  };

  useEffect(() => {
    if (props.inspection_list_loading === "Success") {
      setState(prev => ({
        ...prev,
        page: Number(props.inspection_list_data?.data?.page),
        data: props.inspection_list_data.data?.data,
        sizePerPage: props.inspection_list_data?.data?.sizePerPage,
        dataLength: props.inspection_list_data?.data?.length,
        overdue: props.inspection_list_data?.data?.overdue,
        to_finalise: props.inspection_list_data?.data?.to_finalise,
        loading: false,
      }));
      props.InspectionListFresh();
    }
    if (props.inspection_list_other_loading === "Success") {
      dataFilter();
    }
    if (props.inspection_schedule_list_loading === "Success") {
      setState(prev => ({
        ...prev,
        page: Number(props.inspection_schedule_list_data?.data?.page),
        data: props.inspection_schedule_list_data.data?.data,
        sizePerPage: props.inspection_schedule_list_data?.data?.sizePerPage,
        dataLength: props.inspection_schedule_list_data?.data?.length,
        overdue: props.inspection_schedule_list_data?.data?.overdue,
        to_finalise: props.inspection_schedule_list_data?.data?.to_finalise,
        loading: false,
      }));
      props.scheduleListFresh();
    }
    if (props.inspection_inspected_list_loading === "Success") {
      setState(prev => ({
        ...prev,
        page: Number(props.inspection_inspected_list_data?.data?.page),
        data: props.inspection_inspected_list_data.data?.data,
        sizePerPage: props.inspection_inspected_list_data?.data?.sizePerPage,
        dataLength: props.inspection_inspected_list_data?.data?.length,
        overdue: props.inspection_inspected_list_data?.data?.overdue,
        to_finalise: props.inspection_inspected_list_data?.data?.to_finalise,
        loading: false,
      }));
      props.inspectedListFresh();
    }
    if (props.inspection_info_loading === "Success") {
      props.InspectionInfoFresh();
    }
    if (props.unschedule_list_loading === "Success") {
      setState(prev => ({
        ...prev,
        page: Number(props.unschedule_list_data?.page),
        data: props.unschedule_list_data?.data,
        sizePerPage: props.unschedule_list_data?.sizePerPage,
        dataLength: props.unschedule_list_data?.length,
        overdue: props.unschedule_list_data?.overdue,
        to_finalise: props.unschedule_list_data?.to_finalise,
        loading: false,
      }));
      props.getUnscheduledFresh();
    }
    if (props.inspection_complete_list_loading === "Success") {
      setState(prev => ({
        ...prev,
        page: Number(props.inspection_complete_list_data?.data?.page),
        data: props.inspection_complete_list_data.data?.data,
        sizePerPage: props.inspection_complete_list_data?.data?.sizePerPage,
        dataLength: props.inspection_complete_list_data?.data?.length,
        overdue: props.inspection_complete_list_data?.data?.overdue,
        to_finalise: props.inspection_complete_list_data?.data?.to_finalise,
        loading: false,
      }));
      props.completeListFresh();
    }
  }, [
    props.inspection_info_loading,
    props.inspection_list_loading,
    props.unschedule_list_loading,
    props.inspection_schedule_list_loading,
    props.inspection_inspected_list_loading,
    props.inspection_complete_list_loading,
  ]);

  const handleTableChange = (
    type,
    { page, sizePerPage, sortField, sortOrder }
  ) => {
    setState(prev => ({ ...prev, loading: true }));

    if (!search) {
      if (sortField) {
        if (state.activeTab == 2) {
          props.getInspectionList(
            page,
            sizePerPage,
            null,
            sortField,
            sortOrder
          );
        } else if (state.activeTab == 3) {
          props.getScheduleList(page, sizePerPage, null, sortField, sortOrder);
        } else if (state.activeTab == 4) {
          props.getInspectedList(page, sizePerPage, null, sortField, sortOrder);
        } else if (state.activeTab == 5) {
          props.getUnscheduled(page, sizePerPage, null, sortField, sortOrder);
        } else if (state.activeTab == 6) {
          props.getCompleteList(page, sizePerPage, null, sortField, sortOrder);
        }
      } else {
        if (state.activeTab == 2) {
          props.getInspectionList(page, sizePerPage, null, "id", "desc");
        } else if (state.activeTab == 3) {
          props.getScheduleList(page, sizePerPage, null, "id", "desc");
        } else if (state.activeTab == 4) {
          props.getInspectedList(page, sizePerPage, null, "id", "desc");
        } else if (state.activeTab == 5) {
          props.getUnscheduled(page, sizePerPage, null, "id", "desc");
        } else if (state.activeTab == 6) {
          props.getCompleteList(page, sizePerPage, null, "id", "desc");
        }
      }
    } else {
      if (sortField) {
        if (state.activeTab == 2) {
          props.getInspectionList(
            page,
            sizePerPage,
            search,
            sortField,
            sortOrder
          );
        } else if (state.activeTab == 3) {
          props.getScheduleList(
            page,
            sizePerPage,
            search,
            sortField,
            sortOrder
          );
        } else if (state.activeTab == 4) {
          props.getInspectedList(
            page,
            sizePerPage,
            search,
            sortField,
            sortOrder
          );
        } else if (state.activeTab == 5) {
          props.getUnscheduled(page, sizePerPage, search, sortField, sortOrder);
        } else if (state.activeTab == 6) {
          props.getCompleteList(
            page,
            sizePerPage,
            search,
            sortField,
            sortOrder
          );
        }
      } else {
        if (state.activeTab == 2) {
          props.getInspectionList(page, sizePerPage, search, "id", "desc");
        } else if (state.activeTab == 3) {
          props.getScheduleList(page, sizePerPage, search, "id", "desc");
        } else if (state.activeTab == 4) {
          props.getInspectedList(page, sizePerPage, search, "id", "desc");
        } else if (state.activeTab == 5) {
          props.getUnscheduled(page, sizePerPage, search, "id", "desc");
        } else if (state.activeTab == 6) {
          props.getCompleteList(page, sizePerPage, search, "id", "desc");
        }
      }
    }
  };

  if (init) {
    props.getInspectionList(state.page, state.sizePerPage, null, "id", "desc");

    if (props.inspection_info_loading === "Success") {
      props.InspectionInfoFresh();
    }
    setInit(false);
  }

  const toggle = tab => {
    setState(prev => ({ ...prev, loading: true }));
    if (state.activeTab !== tab) {
      setState({
        ...state,
        page: 1,
        data: [],
        sizePerPage: 10,
        dataLength: 0,
        loading: true,
        activeTab: tab,
      });
    }
    setSearch("");
    if (tab == "2") {
      props.getInspectionList(
        "1",
        "10",
        null,
        "id",
        "desc"
      );
    }
    if (tab == "3") {
      props.getScheduleList("1", "10", null, "id", "desc");
    }
    if (tab == "4") {
      props.getInspectedList("1", "10", null, "id", "desc");
    }
    if (tab == "5") {
      props.getUnscheduled("1", "10", null, "id", "desc");
    }
    if (tab == "6") {
      props.getCompleteList("1", "10", null, "id", "desc");
    }
  };

  const tog_key_modal = () => {
    setKeyModal(prevState => !prevState);
  };
  var activeI = [];
  var inspected = [];
  var complete = [];
  const dataFilter = async () => {
    console.log(props.inspection_list_other_data);
    await props.inspection_list_other_data.data?.data?.map((item, key) => {
      if (item.status == "inspected") {
        inspected.push(item);
      }
      if (item.status == "complete") {
        complete.push(item);
      }

      activeI.push(item);
    });
    if (inspected != []) {
      setInspectedD({ ...inspectedD, data: inspected });
    }
    if (complete != []) {
      setCompleted({ ...completed, data: complete });
    }
    if (activeI != []) {
      setActive({ ...active, data: activeI });
    }
  };

  let url = "/inspectionInfo/";

  const ref = (cell, row) => {
    return <span className="text-primary">{cell}</span>;
  };
  const refDetail = (e, column, columnIndex, row, rowIndex) => {
    if (row.id) {
      history.push(url + row.id);
    }
  };

  const start = (cell, row) => {
    let topDate = moment(cell, "hh:mm A").format("hh:mm A");
    return <span>{topDate}</span>;
  };

  const statusRef = (cell, row) => {
    if (cell === "Draft") {
      return <span className="badge square-pill bg-secondary p-2">{cell}</span>;
    } else {
      return <span className="badge square-pill bg-warning p-2">{cell}</span>;
    }
  };

  const statusRef2 = (cell, row) => {
    if (cell === "Draft") {
      return <span className="badge square-pill bg-secondary p-2">{cell}</span>;
    } else {
      return <span className="badge square-pill bg-success p-2">{cell}</span>;
    }
  };

  const dateRef = (cell, row) => {
    var date = new Date(cell);
    var year = date.toLocaleString("default", { year: "numeric" });
    var month = date.toLocaleString("default", { month: "2-digit" });
    var day = date.toLocaleString("default", { day: "2-digit" });
    var formattedDate = day + "-" + month + "-" + year;
    return <span>{formattedDate}</span>;
  };

  const statusRef3 = (cell, row) => {
    if (cell == "Scheduled") {
      return <span className="badge square-pill bg-info p-2">{cell}</span>;
    } else if (cell == "inspected") {
      return <span className="badge square-pill bg-warning p-2">{cell}</span>;
    } else if (cell == "complete") {
      return <span className="badge square-pill bg-success p-2">{cell}</span>;
    } else {
      return <span className="badge square-pill bg-danger p-2">{cell}</span>;
    }
  };

  const columnData = [
    {
      dataField: "id",
      text: "Id",
      sort: true,
    },
    {
      dataField: "inspection_date",
      text: "Date",
      sort: true,
      formatter: dateRef,
    },
    {
      dataField: "start_time",
      text: "Time",
      formatter: statusRef2,
      sort: true,
    },
    {
      dataField: "inspection_type",
      text: "Type",
      formatter: statusRef,
      sort: true,
    },
    {
      dataField: "summery",
      text: "Summary",
      formatter: ref,
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          refDetail(e, column, columnIndex, row, rowIndex);
        },
      },
      sort: true,
    },
    {
      dataField: "reference",
      text: "Property",
      sort: true,
    },
    {
      dataField: "tanent_data",
      text: "Tenant",
      sort: true,
    },
    {
      dataField: "manager",
      text: "Manager",
      sort: true,
    },
    {
      dataField: "status",
      text: "Status",
      formatter: statusRef3,
      sort: true,
    },
  ];

  const dateC = (cell, row) => {
    let topDate = moment(cell).format("dddd");
    return (
      <span className="text-primary">
        {cell} {topDate}
      </span>
    );
  };

  const dateCDetail = async (e, column, columnIndex, row, rowIndex) => {
    // history.push(url + row.id);
    console.log(row);
    // return
    var date = "";
    var selState = [];
    var prop = [];
    await row.inspections.map(async (item, key) => {
      selState.push({ label: item.property, value: item.property_id });
      prop.push({ item });
    });
    let address = {
      building_name: row.building_name,
      unit: row.unit,
      number: row.number,
      street: row.street,
      suburb: row.suburb,
      postcode: row.postcode,
      state: row.state,
      country: row.country,
    };
    // console.log(address);
    // setTextAdd(address);
    scheduleEdit(
      selState,
      prop,
      row.date,
      row.start_time,
      row.id,
      address,
      row.duration
    );
  };

  const scheduleEdit = (selState, prop, date, time, id, address, duration) => {
    history.push({
      pathname: "/inspectionDayEdit/" + date,
      state: {
        property: selState,
        selectedProp: prop,
        locations: "",
        start_time: time,
        insId: id,
        address: address,
        duration: duration,
      },
    });
  };

  const startt = (cell, row) => {
    let topDate = moment(cell, "hh:mm A").format("hh:mm A");
    return <span>{topDate}</span>;
  };

  const scheduleD = (cell, row) => {
    return <span>+</span>;
  };

  const scheduleDetail = (e, column, columnIndex, row, rowIndex) => {
    // history.push(url + row.id);
    setText(row);

    tog_key_modal();
  };

  const columnDataSchedule = [
    {
      dataField: "inspections",
      text: "Id",
      formatter: scheduleD,
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          scheduleDetail(e, column, columnIndex, row, rowIndex);
        },
      },
      sort: true,
    },
    {
      dataField: "date",
      text: "Date",
      formatter: dateC,
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          dateCDetail(e, column, columnIndex, row, rowIndex);
        },
      },
      sort: true,
    },
    {
      dataField: "manager",
      text: "Manager",
      sort: true,
    },
    {
      dataField: "date",
      text: "OverDue",
      sort: true,
    },
    {
      dataField: "start_time",
      text: "Start Time",
      formatter: startt,
      sort: true,
    },
    {
      dataField: "properties",
      text: "Properties",
      sort: true,
    },
  ];

  const refDetailProperty = (e, column, columnIndex, row, rowIndex) => {
    history.push("/propertyInfo/" + row.id);
  };
  const prof = (cell, row) => {
    return <span className="text-info">{cell}</span>;
  };
  const tenf = (cell, row) => {
    return (
      <span>
        {row.tenant_one?.first_name} {row.tenant_one?.last_name}
      </span>
    );
  };

  const lastF = (cell, row) => {
    return <span>{cell[0]?.inspection_date}</span>;
  };

  const columnDataUnschedule = [
    {
      dataField: "reference",
      text: "Property",
      formatter: prof,
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          refDetailProperty(e, column, columnIndex, row, rowIndex);
        },
      },
      sort: true,
    },
    {
      dataField: "",
      text: "Tenant",
      formatter: tenf,
      sort: true,
    },
    {
      dataField: "routine_inspection_due_date",
      text: "Due",
      sort: true,
    },
    {
      dataField: "last_inspection",
      text: "Last",
      formatter: lastF,
      sort: true,
    },
    {
      dataField: "manager_name",
      text: "Manager",
      sort: true,
    },
    {
      dataField: " ",
      text: "Teams",
      sort: true,
    },
  ];
  let authUser = JSON.parse(localStorage.getItem("authUser"));

  return (
    <div className="page-content">
      <Container fluid={true}>
        {/* <Breadcrumbs title="Inspections" breadcrumbItem="Inspections" /> */}
        <h4 className="ms-2 text-primary">Inspection list</h4>
        <Row>
          <Col md={2}>
            <Card style={{ borderRadius: "15px" }}>
              <CardBody>
                <Row>
                  <div className="button-items mt-0 p-0">
                    {authUser.user.user_type == "Property Manager" && (
                      <button
                        type="button"
                        className="btn btn-info custom-button-side-row-font-size"
                        // style={{ width: "100%", display: "flex", justifyContent: "space-between", borderRadius: "5px", textAlign: "left", alignItems: "center" }}
                        onClick={() => {
                          history.push("/planinspections");
                        }}
                      >
                        Plan Inspections
                        <i className="bx bx-plus-circle font-size-18 " />
                      </button>
                    )}

                    <button
                      type="button"
                      className="btn btn-info custom-button-side-row-font-size"
                      disabled
                    >
                      Message
                      <i className="fas fas fa-chevron-down font-size-12"></i>
                    </button>

                    <button
                      type="button"
                      className="btn btn-info custom-button-side-row-font-size"
                      disabled
                    >
                      Action
                      <i className="fas fas fa-chevron-down font-size-12"></i>
                    </button>
                  </div>
                </Row>
              </CardBody>
            </Card>

            <Card style={{ borderRadius: "15px" }}>
              <CardBody>
                <Row>
                  <div className="mt-0 p-0">
                    <div
                      className="bg-light p-3 d-flex flex-column mb-3"
                      style={{ textAlign: "center", borderRadius: "15px" }}
                    >
                      <div className="mb-1">
                        <p className="mb-0 text-muted font-size-14">Overdue</p>
                      </div>
                      <div className="flex-grow-1">
                        <h3 className="font-size-18 mb-2 custom-button-side-row-font-size-inspection">
                          <span className="badge bg-danger">
                            <b>
                              {state.overdue}
                              {/* 10 */}
                            </b>
                          </span>
                        </h3>
                      </div>
                    </div>

                    <div
                      className="bg-light p-3 d-flex flex-column mb-3"
                      style={{ textAlign: "center", borderRadius: "15px" }}
                    >
                      <div className="mb-1">
                        <p className="mb-0 text-muted font-size-14 custom-button-side-row-font-size-inspection">
                          To finalise
                        </p>
                      </div>
                      <div className="flex-grow-1">
                        <h3 className="font-size-18 mb-2">
                          <span className="badge bg-primary">
                            <b>{state.to_finalise}</b>
                          </span>
                        </h3>
                      </div>
                    </div>
                  </div>
                </Row>
              </CardBody>
            </Card>
          </Col>

          <Col md={10} style={{ padding: "0px" }}>
            <div>
              <Card style={{ borderRadius: "15px" }}>
                <CardBody>
                  <div>
                    <Row>
                      <Col
                        sm={12}
                        md={12}
                        lg={9}
                      // className="d-flex"
                      >
                        <Nav className="icon-tab nav-justified">
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
                              Active
                            </NavLink>
                          </NavItem>
                          {authUser.user.user_type == "Property Manager" && (
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
                                Scheduled
                              </NavLink>
                            </NavItem>
                          )}

                          <NavItem>
                            <NavLink
                              style={{ cursor: "pointer" }}
                              className={classnames({
                                active: state.activeTab === "4",
                              })}
                              onClick={() => {
                                toggle("4");
                              }}
                            >
                              Inspected
                            </NavLink>
                          </NavItem>
                          <NavItem>
                            <NavLink
                              style={{ cursor: "pointer" }}
                              className={classnames({
                                active: state.activeTab === "5",
                              })}
                              onClick={() => {
                                toggle("5");
                              }}
                            >
                              Unscheduled
                            </NavLink>
                          </NavItem>
                          <NavItem>
                            <NavLink
                              style={{ cursor: "pointer" }}
                              className={classnames({
                                active: state.activeTab === "6",
                              })}
                              onClick={() => {
                                toggle("6");
                              }}
                            >
                              Closed
                            </NavLink>
                          </NavItem>
                        </Nav>
                      </Col>
                    </Row>

                    <TabContent
                      activeTab={state.activeTab}
                      className="p-3 text-muted"
                    >
                      <TabPane tabId="2">
                        <Row>
                          <Col sm="12">
                            <CardText className="mb-0">
                              {state.activeTab == 2 && (
                                <RemotePagination
                                  data={
                                    state.data?.length > 0 ? state.data : []
                                  }
                                  page={state.page}
                                  sizePerPage={state.sizePerPage}
                                  totalSize={state.dataLength}
                                  onTableChange={handleTableChange}
                                  columns={columnData}
                                  search={search}
                                  onSearchState={handleSearchState}
                                  loading={state.loading}
                                  selectRow={dueTaskSelectRow}
                                  defaultSorted={dueTaskDefaultSorted}
                                />
                              )}
                            </CardText>
                          </Col>
                        </Row>
                      </TabPane>
                      <TabPane tabId="3">
                        <Row>
                          <Col sm="12">
                            <CardText className="mb-0">
                              {state.activeTab == 3 && (
                                <RemotePagination
                                  data={
                                    state.data?.length > 0 ? state.data : []
                                  }
                                  page={state.page}
                                  sizePerPage={state.sizePerPage}
                                  totalSize={state.dataLength}
                                  onTableChange={handleTableChange}
                                  columns={columnDataSchedule}
                                  search={search}
                                  onSearchState={handleSearchState}
                                  loading={state.loading}
                                  selectRow={dueTaskSelectRow}
                                  defaultSorted={dueTaskDefaultSorted}
                                />
                              )}
                            </CardText>
                          </Col>
                        </Row>
                      </TabPane>
                      <TabPane tabId="4">
                        <Row>
                          <Col sm="12">
                            <CardText className="mb-0">
                              {state.activeTab == 4 && (
                                <RemotePagination
                                  data={
                                    state.data?.length > 0 ? state.data : []
                                  }
                                  page={state.page}
                                  sizePerPage={state.sizePerPage}
                                  totalSize={state.dataLength}
                                  onTableChange={handleTableChange}
                                  columns={columnData}
                                  search={search}
                                  onSearchState={handleSearchState}
                                  loading={state.loading}
                                  selectRow={dueTaskSelectRow}
                                  defaultSorted={dueTaskDefaultSorted}
                                />
                              )}
                            </CardText>
                          </Col>
                        </Row>
                      </TabPane>
                      <TabPane tabId="5">
                        <Row>
                          <Col sm="12">
                            <CardText className="mb-0">
                              {state.activeTab == 5 && (
                                <RemotePagination
                                  data={
                                    state.data?.length > 0 ? state.data : []
                                  }
                                  page={state.page}
                                  sizePerPage={state.sizePerPage}
                                  totalSize={state.dataLength}
                                  onTableChange={handleTableChange}
                                  columns={columnDataUnschedule}
                                  search={search}
                                  onSearchState={handleSearchState}
                                  loading={state.loading}
                                  selectRow={dueTaskSelectRow}
                                  defaultSorted={dueTaskDefaultSorted}
                                />
                              )}
                              {uninspectedD ? (
                                <DatatableTables2
                                  products={uninspectedD}
                                  columnData={columnDataUnschedule}
                                />
                              ) : null}
                            </CardText>
                          </Col>
                        </Row>
                      </TabPane>
                      <TabPane tabId="6">
                        <Row>
                          <Col sm="12">
                            <CardText className="mb-0">
                              {state.activeTab == 6 && (
                                <RemotePagination
                                  data={
                                    state.data?.length > 0 ? state.data : []
                                  }
                                  page={state.page}
                                  sizePerPage={state.sizePerPage}
                                  totalSize={state.dataLength}
                                  onTableChange={handleTableChange}
                                  columns={columnData}
                                  search={search}
                                  onSearchState={handleSearchState}
                                  loading={state.loading}
                                  selectRow={dueTaskSelectRow}
                                  defaultSorted={dueTaskDefaultSorted}
                                />
                              )}
                            </CardText>
                          </Col>
                        </Row>
                      </TabPane>
                    </TabContent>
                  </div>
                </CardBody>
              </Card>
            </div>
          </Col>
        </Row>
      </Container>
      <InspectionDetails
        keyModal={keyModal}
        toggle={tog_key_modal}
        text={text}
        textAdd={textAdd}
      ></InspectionDetails>
    </div>
  );
}

const mapStateToProps = gstate => {
  const {
    inspection_list_data,
    inspection_list_error,
    inspection_list_loading,

    inspection_info_loading,

    inspection_schedule_list_data,
    inspection_schedule_list_error,
    inspection_schedule_list_loading,

    unschedule_list_data,
    unschedule_list_error,
    unschedule_list_loading,

    inspection_list_other_data,
    inspection_list_other_error,
    inspection_list_other_loading,

    inspection_inspected_list_data,
    inspection_inspected_list_error,
    inspection_inspected_list_loading,

    inspection_complete_list_data,
    inspection_complete_list_error,
    inspection_complete_list_loading,
  } = gstate.Inspections;
  return {
    inspection_list_data,
    inspection_list_error,
    inspection_list_loading,

    inspection_info_loading,

    inspection_schedule_list_data,
    inspection_schedule_list_error,
    inspection_schedule_list_loading,

    unschedule_list_data,
    unschedule_list_error,
    unschedule_list_loading,

    inspection_list_other_data,
    inspection_list_other_error,
    inspection_list_other_loading,

    inspection_inspected_list_data,
    inspection_inspected_list_error,
    inspection_inspected_list_loading,

    inspection_complete_list_data,
    inspection_complete_list_error,
    inspection_complete_list_loading,
  };
};

export default withRouter(
  connect(mapStateToProps, {
    getInspectionList,
    InspectionInfoFresh,
    getScheduleList,
    scheduleListFresh,
    getUnscheduled,
    InspectionListFresh,
    getInspectionListOther,
    InspectionListOtherFresh,
    getInspectedList,
    inspectedListFresh,
    getUnscheduledFresh,
    getCompleteList,
    completeListFresh,
  })(InspectionList)
);
