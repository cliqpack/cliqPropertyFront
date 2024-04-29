import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withRouter, useHistory } from "react-router-dom";
import Parser from "html-react-parser";

import TaskAdd from "./TaskAdd";

import {
  getTaskInfoFresh,
  deleteTaskFresh,
  getAllTask,
  getAllDueTask,
  getAllActiveTask,
  getAllDueLaterTask,
  allDueTaskFresh,
  allActiveTaskFresh,
  getAllTaskFresh,
  getAllDueLaterTaskFresh,
  getClosedTask,
  getClosedTaskFresh,
} from "store/actions";

import classnames from "classnames";

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
} from "reactstrap";
import KanbanBoard from "./KanbanBoard";
import RemotePagination from "./RemotePagination";

function TaskList(props) {
  const history = useHistory();
  const [state, setState] = useState({
    activeTab: "2",
    page: 1,
    data: [],
    sizePerPage: 10,
    dataLength: 0,
    loading: false,
    due:0,
  });
  const [init,setInit]=useState(true);
  const [search, setSearch] = useState("");
  if(init){
    props.getAllTask();
    setInit(false);
  }
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
  const ref = (cell, row) => {
    return <span className="text-primary">{cell}</span>;
  };
  const dateRef = (cell, row) => {
    var date = new Date(cell);
    var year = date.toLocaleString("default", { year: "numeric" });
    var month = date.toLocaleString("default", { month: "2-digit" });
    var day = date.toLocaleString("default", { day: "2-digit" });
    var formattedDate = day + "-" + month + "-" + year;
    return <span>{formattedDate}</span>;
  };
  const labelRef = (cell, row) => {
    let label = "";
    cell.forEach((element, idx) => {
      label += `<span className="badge rounded-pill bg-primary">${element.label}</span>&nbsp;`;
    });
    return Parser(label);
  };

  const taskDetails = (e, column, columnIndex, row, rowIndex) => {
    history.push("/task/show/" + row.id);
  };

  const columnClosedData = [
    {
      dataField: "id",
      text: "ID",
      // formatter: dateRef,
      sort: true,
    },
    {
      dataField: "summary",
      text: "Summary",
      formatter: ref,
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          taskDetails(e, column, columnIndex, row, rowIndex);
        },
      },
      sort: true,
    },
    {
      dataField: "reference",
      text: "Property",
      // sort: true,
    },
    {
      dataField: "contact",
      text: "Contact",
      // sort: true,
    },
    {
      dataField: "manager_first_name",
      text: "Manager",
      // sort: true,
    },
    {
      dataField: "created_at",
      text: "Created",
      formatter: dateRef,
      // sort: true,
    },
    {
      dataField: "due_by",
      text: "Due",
      sort: true,
      formatter: dateRef,
    },
    {
      dataField: "complete_date",
      text: "Closed",
      sort: true,
    },
    {
      dataField: "label",
      text: "Labels",
      formatter: labelRef,
      // sort: true,
    },
  ];

  useEffect(() => {
    if (props.get_task_info_loading === "Success") {
      props.getTaskInfoFresh();
    }
    if (props.task_delete_loading === "Success") {
      props.deleteTaskFresh();
    }
    if (props.all_due_task_loading === "Success") {
      setState(prev => ({
        ...prev,
        page: Number(props.all_due_task.data?.page),
        data: props.all_due_task.data.data,
        sizePerPage: props.all_due_task.data?.sizePerPage,
        dataLength: props.all_due_task.data?.length,
        loading: false,
        due: props.all_due_task.data?.due,
      }));
      props.allDueTaskFresh();
    }
    if (props.all_active_task_loading == "Success") {
      setState(prev => ({
        ...prev,
        page: Number(props.all_active_task.data?.page),
        data: props.all_active_task.data.data,
        sizePerPage: props.all_active_task.data?.sizePerPage,
        dataLength: props.all_active_task.data?.length,
        loading: false,
        due: props.all_active_task.data?.due,
      }));
      props.allActiveTaskFresh();
    }
    if (props.all_due_later_task_loading == "Success") {
      setState(prev => ({
        ...prev,
        page: Number(props.all_due_later_task.data?.page),
        data: props.all_due_later_task.data.data,
        sizePerPage: props.all_due_later_task.data?.sizePerPage,
        dataLength: props.all_due_later_task.data?.length,
        loading: false,
        due: props.all_due_later_task.data?.due,
      }));
      props.getAllDueLaterTaskFresh();
    }
    if (props.all_closed_task_loading == "Success") {
      setState(prev => ({
        ...prev,
        page: Number(props.all_closed_task.data?.page),
        data: props.all_closed_task.data.data,
        sizePerPage: props.all_closed_task.data?.sizePerPage,
        dataLength: props.all_closed_task.data?.length,
        loading: false,
        due: props.all_closed_task.data?.due,
      }));
      props.getClosedTaskFresh();
    }
  }, [
    props.get_task_info_loading,
    props.task_delete_loading,
    props.all_active_task_loading,
    props.all_due_task_loading,
    props.all_due_later_task_loading,
    props.all_closed_task_loading,
  ]);


  const toggle = (tab, type) => {
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
    if (type === "due") {
      props.getAllDueTask(
        state.page,
        state.sizePerPage,
        null,
        "summary",
        "desc"
      );
    } else if (type === "active") {
      props.getAllActiveTask(
        state.page,
        state.sizePerPage,
        null,
        "summary",
        "desc"
      );
    } else if (type === "later") {
      props.getAllDueLaterTask(
        state.page,
        state.sizePerPage,
        null,
        "summary",
        "desc"
      );
    } else if (type === "closed") {
      props.getClosedTask(
        state.page,
        state.sizePerPage,
        null,
        "summary",
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
        if (state.activeTab == 1) {
          props.getAllDueTask(page, sizePerPage, null, sortField, sortOrder);
        } else if (state.activeTab == 2) {
          props.getAllActiveTask(page, sizePerPage, null, sortField, sortOrder);
        } else if (state.activeTab == 3) {
          props.getAllDueLaterTask(
            page,
            sizePerPage,
            null,
            sortField,
            sortOrder
          );
        } else if (state.activeTab == 4) {
          props.getClosedTask(page, sizePerPage, null, sortField, sortOrder);
        }
      } else {
        if (state.activeTab == 1) {
          props.getAllDueTask(page, sizePerPage, null, "summary", "desc");
        } else if (state.activeTab == 2) {
          props.getAllActiveTask(page, sizePerPage, null, "summary", "desc");
        } else if (state.activeTab == 3) {
          props.getAllDueLaterTask(page, sizePerPage, null, "summary", "desc");
        } else if (state.activeTab == 4) {
          props.getClosedTask(page, sizePerPage, null, "summary", "desc");
        }
      }
    } else {
      if (sortField) {
        if (state.activeTab == 1) {
          props.getAllDueTask(page, sizePerPage, search, sortField, sortOrder);
        } else if (state.activeTab == 2) {
          props.getAllActiveTask(
            page,
            sizePerPage,
            search,
            sortField,
            sortOrder
          );
        } else if (state.activeTab == 3) {
          props.getAllDueLaterTask(
            page,
            sizePerPage,
            search,
            sortField,
            sortOrder
          );
        } else if (state.activeTab == 4) {
          props.getClosedTask(page, sizePerPage, search, sortField, sortOrder);
        }
      } else {
        if (state.activeTab == 1) {
          props.getAllDueTask(page, sizePerPage, search, "summary", "desc");
        } else if (state.activeTab == 2) {
          props.getAllActiveTask(page, sizePerPage, search, "summary", "desc");
        } else if (state.activeTab == 3) {
          props.getAllDueLaterTask(
            page,
            sizePerPage,
            search,
            "summary",
            "desc"
          );
        } else if (state.activeTab == 4) {
          props.getClosedTask(page, sizePerPage, search, "summary", "desc");
        }
      }
    }
  };

  return (
    <div className="page-content">
      {/* <Breadcrumbs title="Tasks" breadcrumbItem="Tasks" /> */}
      <h4 className="ms-2 text-primary">Tasks</h4>
      <Container fluid={true}>
        <Row>
          <Col md={2}>

            <Card style={{ borderRadius: "15px" }}>
              <CardBody>
                <Row>
                  <div className="button-items mt-0 p-0">
                    <TaskAdd />

                  </div>
                </Row>
                <Row>
                  <div className="mt-0 p-0">
                    <div
                      className="bg-light p-3 d-flex flex-column mb-3"
                      style={{ textAlign: "center", borderRadius: "15px" }}
                    >
                      <div className="mb-1">
                        <p className="mb-0 text-muted font-size-14">Due</p>
                      </div>
                      <div className="flex-grow-1">
                        <h3 className="font-size-18 mb-2 custom-button-side-row-font-size-inspection">
                          <span className="badge bg-danger">
                            <b>
                              {state.due}
                            </b>
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
            <Card style={{ borderRadius: "15px" }}>
              <CardBody>
                <div>
                  <Row>
                    <Col
                      sm={12} md={12} lg={9}
                    // className="d-flex"
                    >
                      <Nav className="icon-tab nav-justified">
                        {/* =========== test ================= */}
                        <NavItem>
                          <NavLink
                            style={{ cursor: "pointer" }}
                            className={classnames({
                              active: state.activeTab === "2",
                            })}
                            onClick={() => {
                              toggle("2", "active");
                            }}
                          >
                            Active
                          </NavLink>
                        </NavItem>

                        <NavItem>
                          <NavLink
                            style={{ cursor: "pointer" }}
                            className={classnames({
                              active: state.activeTab === "1",
                            })}
                            onClick={() => {
                              toggle("1", "due");
                            }}
                          >
                            Due
                          </NavLink>
                        </NavItem>

                        <NavItem>
                          <NavLink
                            style={{ cursor: "pointer" }}
                            className={classnames({
                              active: state.activeTab === "3",
                            })}
                            onClick={() => {
                              toggle("3", "later");
                            }}
                          >
                            Due later
                          </NavLink>
                        </NavItem>
                        {/* =========== test end================= */}
                        <NavItem>
                          <NavLink
                            style={{ cursor: "pointer" }}
                            className={classnames({
                              active: state.activeTab === "4",
                            })}
                            onClick={() => {
                              toggle("4", "closed");
                            }}
                          >
                            Closed
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            style={{ cursor: "pointer" }}
                            className={classnames({
                              active: state.activeTab === "5",
                            })}
                            onClick={() => {
                              toggle("5", "kanban");
                            }}
                          >
                            Kanban Style
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
                                data={
                                  state?.data.length > 0 ? state.data : []
                                }
                                page={state.page}
                                sizePerPage={state.sizePerPage}
                                totalSize={state.dataLength}
                                onTableChange={handleTableChange}
                                columns={columnClosedData}
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
                                columns={columnClosedData}
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
                                columns={columnClosedData}
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
                                columns={columnClosedData}
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
                      {/* working from here */}

                      <KanbanBoard />
                      {/* work ends here */}
                    </TabPane>
                  </TabContent>
                </div>
              </CardBody>
            </Card>

          </Col>
        </Row>
      </Container>
    </div>
  );
}

const mapStateToProps = gstate => {
  const {
    get_task_info_loading,

    task_delete_loading,

    all_task,
    all_task_error,
    all_task_loading,

    all_due_task,
    all_due_task_error,
    all_due_task_loading,

    all_active_task,
    all_active_task_error,
    all_active_task_loading,

    all_due_later_task,
    all_due_later_task_error,
    all_due_later_task_loading,

    all_closed_task,
    all_closed_task_error,
    all_closed_task_loading,
  } = gstate.tasks;
  return {
    get_task_info_loading,

    task_delete_loading,

    all_task,
    all_task_error,
    all_task_loading,

    all_due_task,
    all_due_task_error,
    all_due_task_loading,

    all_active_task,
    all_active_task_error,
    all_active_task_loading,

    all_due_later_task,
    all_due_later_task_error,
    all_due_later_task_loading,

    all_closed_task,
    all_closed_task_error,
    all_closed_task_loading,
  };
};

export default withRouter(
  connect(mapStateToProps, {
    getTaskInfoFresh,
    deleteTaskFresh,
    getAllTask,
    getAllDueTask,
    getAllActiveTask,
    getAllDueLaterTask,
    allDueTaskFresh,
    allActiveTaskFresh,
    getAllTaskFresh,
    getAllDueLaterTaskFresh,
    getClosedTask,
    getClosedTaskFresh,
  })(TaskList)
);
