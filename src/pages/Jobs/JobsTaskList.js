import React, { useEffect, useState } from "react";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import DatatableTables from "../Tables/DatatableTables";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link, withRouter, useHistory } from "react-router-dom";
import {
  JobsList,
  JobsListFresh,
  addJobModalFresh,
  getMessageJobFresh,
  JobsListByIdFresh,
} from "store/actions";
import classnames from "classnames";
import moment from "moment";

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
import AddJobModal from "./AddJobModal";
import RemotePagination from "pages/Task/RemotePagination";
import { withTranslation, useTranslation } from "react-i18next";

document.title = "CliqProperty";

function JobsTaskList(props) {
  const { t } = useTranslation();

  const [state, setState] = useState({
    activeTab: "1",
    page: 1,
    data: [],
    sizePerPage: 10,
    dataLength: 0,
    loading: false,
  });
  const [seen, setSeen] = useState(false);
  const [search, setSearch] = useState("");
  const [tabState, setTabState] = useState("Active");
  const handleSearchState = e => {
    setSearch(e.target.value);
  };

  let history = useHistory();

  const localizeItem = text => `${t(text)}`


  const idRef = (cell, row) => {
    return <span className="text-primary">{cell}</span>;
  };
  const ref = (cell, row) => {
    return <span className="text-primary">{cell}</span>;
  };
  const refDetail = (e, column, columnIndex, row, rowIndex) => {
    history.push("/maintenanceInfo/" + row.id);
  };
  const owner = (cell, row) => {
    if (cell !== null) {
      return <span className="text-primary">{cell}</span>;
    }
  };
  const ownerDetail = (e, column, columnIndex, row, rowIndex) => {
    history.push("/contactsInfo/" + row.owner_id);
  };
  const tenant = (cell, row) => {
    if (cell !== null) {
      return (
        <a
          onClick={() => {
            history.push("/contactsInfo/" + row.tenant_id);
          }}
        >
          <span className="text-primary">{cell}</span>
        </a>
      );
    }
  };

  const tenantDetail = (e, column, columnIndex, row, rowIndex) => {
    history.push("/contactsInfo/" + row.tenant_id);
  };

  const dateRef = (cell, row) => {
    var date = new Date(cell);
    var year = date.toLocaleString("default", { year: "numeric" });
    var month = date.toLocaleString("default", { month: "2-digit" });
    var day = date.toLocaleString("default", { day: "2-digit" });
    var formattedDate = year + "-" + month + "-" + day;
    return <span>{formattedDate}</span>;
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
      var date = new Date(cell);
      var year = date.toLocaleString("default", { year: "numeric" });
      var month = date.toLocaleString("default", { month: "2-digit" });
      var day = date.toLocaleString("default", { day: "2-digit" });
      var formattedDate = day + "-" + month + "-" + year;
      return (
        <span className="badge square-pill bg-secondary p-2">{formattedDate}</span>
      );
    } else {
      var date = new Date(cell);
      var year = date.toLocaleString("default", { year: "numeric" });
      var month = date.toLocaleString("default", { month: "2-digit" });
      var day = date.toLocaleString("default", { day: "2-digit" });
      var formattedDate = day + "-" + month + "-" + year;
      return (
        <span className="badge square-pill bg-success p-2">{formattedDate}</span>
      );
    }
  };


  const createdRef = (cell, row) => (
    <span>{moment(cell).format("DD/MM/yyyy")}</span>
  );

  const supplierRef = (cell, row) => <span>{row.supplier_name}</span>;

  const activeData = [
    {
      dataField: "id",
      text: `${localizeItem("Id")}`,
      formatter: idRef,
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          refDetail(e, column, columnIndex, row, rowIndex);
        },
      },
      sort: true,
    },
    {
      dataField: "status",
      text: `${localizeItem("Status")}`,
      formatter: statusRef,
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => { refDetail(e, column, columnIndex, row, rowIndex); }
      },
      sort: true,
    },
    {
      dataField: "property_reference",
      text: "Property",
      text: `${localizeItem("Property")}`,
      // formatter: ref,
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => { refDetail(e, column, columnIndex, row, rowIndex); }
      },
      sort: true,
    },
    {
      dataField: "summary",
      text: `${localizeItem("Summary")}`,
      formatter: ref,
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          refDetail(e, column, columnIndex, row, rowIndex);
        },
      },
      sort: true,
    },
    {
      dataField: "supplier",
      text: "Supplier",
      text: `${localizeItem("Supplier")}`,
      formatter: supplierRef,
      // events: {
      //     onClick: (e, column, columnIndex, row, rowIndex) => { tenantDetail(e, column, columnIndex, row, rowIndex); }
      // },
      sort: true,
    },
    {
      dataField: "owner_id",
      text: "owner_id",
      hidden: true,
    },
    {
      dataField: "tenant_id",
      text: "tenant_id",
      hidden: true,
    },
    {
      dataField: "manager_first_name",
      text: `${localizeItem("Manager")}`,
      sort: true,
    },
    {
      dataField: "due_by",
      text: `${localizeItem("Due")}`,
      formatter: statusRef2,
      sort: true,
    },
    {
      dataField: "created_at",
      text: "Created",
      text: `${localizeItem("Created")}`,
      formatter: createdRef,
      sort: true,
      // formatter: statusRef2,
    },
    // {
    //     dataField: "days",
    //     text: "Days",
    //     sort: true,
    // },
  ];

  const reportedData = [
    {
      dataField: "id",
      text: "Id",
      sort: true,
    },
    {
      dataField: "property_reference",
      text: "Property",
      formatter: ref,
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          refDetail(e, column, columnIndex, row, rowIndex);
        },
      },
      sort: true,
    },
    {
      dataField: "summary",
      text: "Summary",
      formatter: owner,
      // events: {
      //     onClick: (e, column, columnIndex, row, rowIndex) => { ownerDetail(e, column, columnIndex, row, rowIndex); }
      // },
      sort: true,
    },
    {
      dataField: "manager_first_name",
      text: "Manager",
      sort: true,
    },
    {
      dataField: "created_at",
      text: "Created",
      sort: true,
      formatter: dateRef,
    },
    {
      dataField: "due_by",
      text: "Due",
      sort: true,
    },
    {
      dataField: "labels",
      text: "Labels",
      sort: true,
    },
  ];

  const quotedData = [
    {
      dataField: "id",
      text: "Id",
      sort: true,
    },
    {
      dataField: "property_reference",
      text: "Property",
      formatter: ref,
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          refDetail(e, column, columnIndex, row, rowIndex);
        },
      },
      sort: true,
    },
    {
      dataField: "summary",
      text: "Summary",
      formatter: owner,
      // events: {
      //     onClick: (e, column, columnIndex, row, rowIndex) => { ownerDetail(e, column, columnIndex, row, rowIndex); }
      // },
      sort: true,
    },
    {
      dataField: "manager_first_name",
      text: "Manager",
      sort: true,
    },
    {
      dataField: "created_at",
      text: "Created",
      sort: true,
      formatter: dateRef,
    },
    {
      dataField: "due_by",
      text: "Due",
      sort: true,
    },
    {
      dataField: "labels",
      text: "Labels",
      sort: true,
    },
  ];

  const approvedData = [
    {
      dataField: "id",
      text: "Id",
      sort: true,
    },
    {
      dataField: "property_reference",
      text: "Property",
      formatter: ref,
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          refDetail(e, column, columnIndex, row, rowIndex);
        },
      },
      sort: true,
    },
    {
      dataField: "summary",
      text: "Summary",
      formatter: owner,
      // events: {
      //     onClick: (e, column, columnIndex, row, rowIndex) => { ownerDetail(e, column, columnIndex, row, rowIndex); }
      // },
      sort: true,
    },
    {
      dataField: "supplier",
      text: "Supplier",
      formatter: tenant,
      // events: {
      //     onClick: (e, column, columnIndex, row, rowIndex) => { tenantDetail(e, column, columnIndex, row, rowIndex); }
      // },
      sort: true,
    },
    {
      dataField: "manager_first_name",
      text: "Manager",
      sort: true,
    },
    {
      dataField: "created_at",
      text: "Created",
      sort: true,
      formatter: dateRef,
    },
    {
      dataField: "due_by",
      text: "Due",
      sort: true,
    },
    {
      dataField: "labels",
      text: "Labels",
      sort: true,
    },
  ];

  const assignedData = [
    {
      dataField: "id",
      text: "Id",
      sort: true,
    },
    {
      dataField: "property_reference",
      text: "Property",
      formatter: ref,
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          refDetail(e, column, columnIndex, row, rowIndex);
        },
      },
      sort: true,
    },
    {
      dataField: "summary",
      text: "Summary",
      formatter: owner,
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => { ownerDetail(e, column, columnIndex, row, rowIndex); }
      },
      sort: true,
    },
    {
      dataField: "supplier",
      text: "Supplier",
      formatter: tenant,
      // events: {
      //     onClick: (e, column, columnIndex, row, rowIndex) => { tenantDetail(e, column, columnIndex, row, rowIndex); }
      // },
      sort: true,
    },
    {
      dataField: "manager_first_name",
      text: "Manager",
      sort: true,
    },
    {
      dataField: "created_at",
      text: "Created",
      sort: true,
      formatter: dateRef,
    },
    {
      dataField: "due_by",
      text: "Due",
      sort: true,
    },
    {
      dataField: "labels",
      text: "Labels",
      sort: true,
    },
  ];

  const finishedData = [
    {
      dataField: "id",
      text: "Id",
      sort: true,
    },
    {
      dataField: "property_reference",
      text: "Property",
      formatter: ref,
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          refDetail(e, column, columnIndex, row, rowIndex);
        },
      },
      sort: true,
    },
    {
      dataField: "summary",
      text: "Summary",
      formatter: owner,
      // events: {
      //     onClick: (e, column, columnIndex, row, rowIndex) => { ownerDetail(e, column, columnIndex, row, rowIndex); }
      // },
      sort: true,
    },
    {
      dataField: "supplier",
      text: "Supplier",
      formatter: tenant,
      // events: {
      //     onClick: (e, column, columnIndex, row, rowIndex) => { tenantDetail(e, column, columnIndex, row, rowIndex); }
      // },
      sort: true,
    },
    {
      dataField: "manager_first_name",
      text: "Manager",
      sort: true,
    },
    {
      dataField: "created_at",
      text: "Created",
      sort: true,
      formatter: dateRef,
    },
    {
      dataField: "due_by",
      text: "Due",
      sort: true,
    },
    {
      dataField: "labels",
      text: "Labels",
      sort: true,
    },
  ];

  const closedData = [
    {
      dataField: "id",
      text: "Id",
      sort: true,
    },
    {
      dataField: "property_reference",
      text: "Property",
      formatter: ref,
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          refDetail(e, column, columnIndex, row, rowIndex);
        },
      },
      sort: true,
    },
    {
      dataField: "summary",
      text: "Summary",
      formatter: owner,
      // events: {
      //     onClick: (e, column, columnIndex, row, rowIndex) => { ownerDetail(e, column, columnIndex, row, rowIndex); }
      // },
      sort: true,
    },
    {
      dataField: "manager_first_name",
      text: "Manager",
      sort: true,
    },
    {
      dataField: "created_at",
      text: "Created",
      sort: true,
      formatter: dateRef,
    },
    {
      dataField: "due_by",
      text: "Due",
      sort: true,
    },
    {
      dataField: "labels",
      text: "Labels",
      sort: true,
    },
    {
      dataField: "closed",
      text: "Closed",
      sort: true,
    },
  ];

  if (!seen) {
    props.JobsList("Active", state.page, state.sizePerPage, null, "id", "desc");
    setSeen(true);
  }

  useEffect(() => {
    if (props.jobs_list_loading === "Success") {
      setState(prev => ({
        ...prev,
        page: Number(props.jobs_list_data?.page),
        data: props.jobs_list_data?.data,
        sizePerPage: props.jobs_list_data?.sizePerPage,
        dataLength: props.jobs_list_data?.length,
        loading: false,
      }));
      props.JobsListFresh();
    }
    if (props.job_message_data_loading === "Success") {
      props.getMessageJobFresh();
    }
    if (props.property_list_loading === false) {
      props.propertyList();
      props.addJobModalFresh();
    } else if (props.property_add_loading == "Success") {
      props.propertyAddFresh();
      props.propertyList();
    }

    if (props.jobListById_show_loading === "Success") {
      console.log("im in fresh state");
      props.JobsListByIdFresh();
    }
  }, [props.jobs_list_loading, props.jobListById_show_loading]);

  let activeTable, data;
  data = props.jobs_list_data?.data?.filter(item => item?.status !== "Closed");
  activeTable = { data };

  let reprtedDataTable;
  data = props.jobs_list_data?.data?.filter(
    item => item?.status === "Reported"
  );
  reprtedDataTable = { data };

  let quotedDataTable;
  data = props.jobs_list_data?.data?.filter(item => item?.status === "Quoted");
  quotedDataTable = { data };

  let approvedDataTable;
  data = props.jobs_list_data?.data?.filter(
    item => item?.status === "Approved"
  );
  approvedDataTable = { data };

  let assignedDataTable;
  data = props.jobs_list_data?.data?.filter(
    item => item?.status === "Assigned"
  );
  assignedDataTable = { data };

  let finishedDataTable;
  data = props.jobs_list_data?.data?.filter(
    item => item?.status === "Finished"
  );
  finishedDataTable = { data };

  let closedDataTable;
  data = props.jobs_list_data?.data?.filter(item => item?.status === "Closed");
  closedDataTable = { data };

  const toggle = tab => {
    if (state.activeTab !== tab) {
      setState({
        ...state,
        activeTab: tab,
      });
    }

    if (tab == 1) {
      setTabState("Active");
      props.JobsList(
        "Active",
        "1",
        "10",
        null,
        "id",
        "desc"
      );
    } else if (tab == 2) {
      setTabState("Reported");
      props.JobsList(
        "Reported",
        "1",
        "10",
        null,
        "id",
        "desc"
      );
    } else if (tab == 3) {
      setTabState("Quoted");
      props.JobsList(
        "Quoted",
        "1",
        "10",
        null,
        "id",
        "desc"
      );
    } else if (tab == 4) {
      setTabState("Approved");
      props.JobsList(
        "Approved",
        "1",
        "10",
        null,
        "id",
        "desc"
      );
    } else if (tab == 5) {
      setTabState("Assigned");
      props.JobsList(
        "Assigned",
        "1",
        "10",
        null,
        "id",
        "desc"
      );
    } else if (tab == 6) {
      setTabState("Finished");
      props.JobsList(
        "Finished",
        "1",
        "10",
        null,
        "id",
        "desc"
      );
    } else if (tab == 7) {
      setTabState("Closed");
      props.JobsList(
        "Closed",
        "1",
        "10",
        null,
        "id",
        "desc"
      );
    }
  };

  const handleTableChange = (
    type,
    { page, sizePerPage, sortField, sortOrder }
  ) => {
    setState(prev => ({ ...prev, loading: true }));

    if (!search) {
      if (sortField) {
        props.JobsList(tabState, page, sizePerPage, null, sortField, sortOrder);
      } else {
        props.JobsList(tabState, page, sizePerPage, null, "id", "desc");
      }
    } else {
      if (sortField) {
        props.JobsList(
          tabState,
          page,
          sizePerPage,
          search,
          sortField,
          sortOrder
        );
      } else {
        props.JobsList(tabState, page, sizePerPage, search, "id", "desc");
      }
    }
  };

  const jobDefaultSorted = [
    {
      dataField: "id",
      order: "desc",
    },
  ];

  const jobSelectRow = {
    mode: "checkbox",
    hideSelectColumn: true,
  };



  return (
    <div className="page-content">
      {/* <Breadcrumbs title="Maintenance" breadcrumbItem="Maintenance" /> */}
      <h4 className="ms-2 text-primary">{localizeItem('Maintenance')}</h4>

      <Container fluid={true}>
        <Row>
          <Col md={2}>

            <Card style={{ borderRadius: "15px" }}>
              <CardBody>
                <Row>
                  <div className="button-items mt-0 p-0" >
                    <AddJobModal tab={tabState}/>

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
                        sm={12} md={12} lg={9}
                      // className="d-flex"
                      >
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
                              {localizeItem('Active')}
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
                              {localizeItem('Reported')}
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
                              {localizeItem('Quoted')}
                            </NavLink>
                          </NavItem>
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
                              {localizeItem('Approved')}
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
                              {localizeItem('Assigned')}
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
                              {localizeItem('Finished')}
                            </NavLink>
                          </NavItem>
                          <NavItem>
                            <NavLink
                              style={{ cursor: "pointer" }}
                              className={classnames({
                                active: state.activeTab === "7",
                              })}
                              onClick={() => {
                                toggle("7");
                              }}
                            >
                              {localizeItem('Closed')}
                            </NavLink>
                          </NavItem>
                        </Nav>
                      </Col>
                    </Row>
                    <TabContent
                      activeTab={state.activeTab}
                      className="p-3 text-muted"
                    >
                      <TabPane tabId="1">
                        <Row>
                          <Col sm="12">
                            <CardText className="mb-0">
                              {state.activeTab == 1 && (
                                <RemotePagination
                                  data={state.data?.length > 0 ? state.data : []}
                                  page={state.page}
                                  sizePerPage={state.sizePerPage}
                                  totalSize={state.dataLength}
                                  onTableChange={handleTableChange}
                                  columns={activeData}
                                  search={search}
                                  onSearchState={handleSearchState}
                                  loading={state.loading}
                                  selectRow={jobSelectRow}
                                  defaultSorted={jobDefaultSorted}
                                />)}
                            </CardText>
                          </Col>
                        </Row>
                      </TabPane>
                      <TabPane tabId="2">
                        <Row>
                          <Col sm="12">
                            <CardText className="mb-0">
                              {state.activeTab == 2 && (
                                <RemotePagination
                                  data={state.data?.length > 0 ? state.data : []}
                                  page={state.page}
                                  sizePerPage={state.sizePerPage}
                                  totalSize={state.dataLength}
                                  onTableChange={handleTableChange}
                                  columns={activeData}
                                  search={search}
                                  onSearchState={handleSearchState}
                                  loading={state.loading}
                                  selectRow={jobSelectRow}
                                  defaultSorted={jobDefaultSorted}
                                />
                              )}
                              {/* {props.jobs_list_data ? (
                              <DatatableTables2
                                products={reprtedDataTable}
                                columnData={activeData}
                              />
                            ) : null} */}
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
                                  data={state.data?.length > 0 ? state.data : []}
                                  page={state.page}
                                  sizePerPage={state.sizePerPage}
                                  totalSize={state.dataLength}
                                  onTableChange={handleTableChange}
                                  columns={quotedData}
                                  search={search}
                                  onSearchState={handleSearchState}
                                  loading={state.loading}
                                  selectRow={jobSelectRow}
                                  defaultSorted={jobDefaultSorted}
                                />
                              )}
                              {/* {props.jobs_list_data ? (
                              <DatatableTables2
                                products={quotedDataTable}
                                columnData={quotedData}
                              />
                            ) : null} */}
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
                                  data={state.data?.length > 0 ? state.data : []}
                                  page={state.page}
                                  sizePerPage={state.sizePerPage}
                                  totalSize={state.dataLength}
                                  onTableChange={handleTableChange}
                                  columns={approvedData}
                                  search={search}
                                  onSearchState={handleSearchState}
                                  loading={state.loading}
                                  selectRow={jobSelectRow}
                                  defaultSorted={jobDefaultSorted}
                                />
                              )}
                              {/* {props.jobs_list_data ? (
                              <DatatableTables2
                                products={approvedDataTable}
                                columnData={approvedData}
                              />
                            ) : null} */}
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
                                  data={state.data?.length > 0 ? state.data : []}
                                  page={state.page}
                                  sizePerPage={state.sizePerPage}
                                  totalSize={state.dataLength}
                                  onTableChange={handleTableChange}
                                  columns={assignedData}
                                  search={search}
                                  onSearchState={handleSearchState}
                                  loading={state.loading}
                                  selectRow={jobSelectRow}
                                  defaultSorted={jobDefaultSorted}
                                />
                              )}
                              {/* {props.jobs_list_data ? (
                              <DatatableTables2
                                products={assignedDataTable}
                                columnData={assignedData}
                              />
                            ) : null} */}
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
                                  data={state.data?.length > 0 ? state.data : []}
                                  page={state.page}
                                  sizePerPage={state.sizePerPage}
                                  totalSize={state.dataLength}
                                  onTableChange={handleTableChange}
                                  columns={finishedData}
                                  search={search}
                                  onSearchState={handleSearchState}
                                  loading={state.loading}
                                  selectRow={jobSelectRow}
                                  defaultSorted={jobDefaultSorted}
                                />
                              )}
                              {/* {props.jobs_list_data ? (
                              <DatatableTables2
                                products={finishedDataTable}
                                columnData={finishedData}
                              />
                            ) : null} */}
                            </CardText>
                          </Col>
                        </Row>
                      </TabPane>
                      <TabPane tabId="7">
                        <Row>
                          <Col sm="12">
                            <CardText className="mb-0">
                              {state.activeTab == 7 && (
                                <RemotePagination
                                  data={state.data?.length > 0 ? state.data : []}
                                  page={state.page}
                                  sizePerPage={state.sizePerPage}
                                  totalSize={state.dataLength}
                                  onTableChange={handleTableChange}
                                  columns={closedData}
                                  search={search}
                                  onSearchState={handleSearchState}
                                  loading={state.loading}
                                  selectRow={jobSelectRow}
                                  defaultSorted={jobDefaultSorted}
                                />
                              )}
                              {/* {props.jobs_list_data ? (
                              <DatatableTables2
                                products={closedDataTable}
                                columnData={closedData}
                              />
                            ) : null} */}
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
    </div>
  );
}

const mapStateToProps = gstate => {
  const { jobs_list_loading, jobs_list_data, jobListById_show_loading } =
    gstate.Jobs;
  const { job_message_data_loading } = gstate.Activity;
  return {
    jobs_list_loading,
    jobs_list_data,
    job_message_data_loading,
    jobListById_show_loading,
  };
};

export default withRouter(
  connect(mapStateToProps, {
    JobsList,
    JobsListFresh,
    addJobModalFresh,
    getMessageJobFresh,
    JobsListByIdFresh,
  })(JobsTaskList)
);
