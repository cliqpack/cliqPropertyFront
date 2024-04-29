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
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap";
import Select from "react-select";
import { getAllDocumentsForSettings } from "store/actions";
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
import classnames from "classnames";
import EditFileNameModal from "./EditFileNameModal";
import RemoveDocModal from "./RemoveDocModal";


document.title = "CliqProperty";

const Documents = props => {
  const history = useHistory();
  const [state, setState] = useState({ activeTab: "1", reasonModal: false, editModal: false, removeDoc: false, init: true });
  const [init, setInit] = useState(true)

  const [actionArray, setActionArray] = useState([]);
  // console.log(actionArray);
  const [table, setTable] = useState([])
  console.log(table);
  const editModalToggle = () => setState({ ...state, editModal: !state.editModal })
  const removeModalToggle = () => setState({ ...state, removeDoc: !state.removeDoc })


  const { SearchBar } = Search;

  const pageOptions = {
    sizePerPage: 10,
    totalSize: state.tableData?.length, // replace later with size(customers),
    custom: true,
  };

  let node;
  const defaultSorted = [
    {
      dataField: "id",
      order: "asc",
    },
  ];
  const fileRef = (cell, row) => {
    // console.log(row);
    // return
    return <a href={process.env.REACT_APP_IMAGE + row.doc_path} target="_blank"
      rel="noreferrer noopener" className="text-info">
      {row.name}
    </a>
  }

  const ownerRef = (cell, row) => <Link to={`/contactsInfo/${row.property?.owner_contact_id}`} className="text-info">{row.property?.owner}</Link>
  const tenantRef = (cell, row) => <Link to={`/contactsInfo/${row.property?.tenant_contact_id}`} className="text-info">{row.property?.tenant}</Link>
  const clientRef = (cell, row) => <div className="d-flex justify-content-center"><span className="">{row.client_access == 1 ? <i className="fas fa-check" /> : ''}</span></div>
  const timeRef = (cell, row) => <div>{moment(cell).format('DD/MM/yyyy hh:mm a')}</div>
  const propertyRef = (cell, row) => <Link to={`/propertyInfo/${row?.property_id}`} className="text-info">{row.property?.reference}</Link >
  const sizeRef = (cell, row) => <div>{cell ? `${cell}kb` : ''}</div>

  const activeData = [

    {
      dataField: "created_at",
      text: "Time",
      formatter: timeRef,
      sort: true,
    },

    {
      dataField: "name",
      text: "File Name",
      formatter: fileRef,

    },
    {
      dataField: "property",
      text: "Property",
      formatter: propertyRef,
    },
    {
      dataField: "",
      text: "Owner",
      formatter: ownerRef,
    },
    {
      dataField: "",
      text: "Tenant",
      formatter: tenantRef,
    },
    // {
    //   dataField: "client_access",
    //   text: "Client Access",
    //   formatter: clientRef,
    //   sort: true,
    // },
    {
      dataField: "file_size",
      text: "Size",
      formatter: sizeRef,
      sort: true,
    },
  ];


  const data = [
    { id: 1, date: '31/07/23', file_name: 'Logo realtyme.png', property: 'Property', owner: 'owner', tenant: 'tenant', client_access: 1, size: '92 kb' },
    { id: 2, date: '31/07/23', file_name: 'Floorplan.jpg', property: 'Property', owner: 'owner', tenant: 'tenant', client_access: 0, size: '8.2 kb' },
    { id: 3, date: '31/07/23', file_name: 'Logo realtyme.png', property: 'Property', owner: 'owner', tenant: 'tenant', client_access: 1, size: '92 kb' },
  ]

  const handleSelect = (isSelect, rows, e) => {
    // console.log(isSelect, rows, e);
    if (rows) {
      console.log("select");

      setActionArray(prevArray => [...prevArray, isSelect]);
      setTable([...table, isSelect.id]);
    } else {
      // console.log("unselect");
      setActionArray(cur => cur.filter(data => data.id !== isSelect.id));
      setTable(cur => cur.filter(data => data !== isSelect.id));
    }
  };

  const handleSelectAll = (isSelect, rows, e) => {
    console.log(isSelect, rows, e);
    if (isSelect) {
      setActionArray(rows);
      const data = rows.map(item => item.id);
      setTable(data);
    } else {
      setActionArray([]);
      setTable([]);
    }
  };

  // Select  Button operation
  const selectRow = {
    mode: "checkbox",
    // clickToSelect: true,
    selected: table,
    onSelect: handleSelect,

    onSelectAll: handleSelectAll,
  };
  useEffect(() => {
    if (init == true) {
      props.getAllDocumentsForSettings('Uploaded');
      setInit(false)
    }
    if (props.all_settings_doc?.data) {
      setState({ ...state, tableData: props.all_settings_doc?.data })

    }
    if (state.activeTab) {
      if (state.activeTab == 1) {
        setState({ ...state, tableData: props.all_settings_doc?.data })

      } else if (state.activeTab == 2) {
        setState({ ...state, tableData: props.all_settings_doc?.data })

      }
    }
  }, [state.activeTab, props.all_settings_doc?.data]);

  const selectRowHandler = () => { setTable([]); setActionArray([]) }


  const toggle = (tab) => {
    if (state.activeTab !== tab) {
      setState({
        ...state,

        activeTab: tab,
      });
    }
    console.log(tab);
    // return
    if (tab == 1) {
      props.getAllDocumentsForSettings('Uploaded');
    } else if (tab == 2) {
      props.getAllDocumentsForSettings('Generated');

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
                  <h4 className="ms-2 text-primary mb-4">Documents</h4>
                  <div
                    className="w-100 mt-2 mb-4"
                    style={{
                      borderBottom: "1.2px dotted #c9c7c7",
                    }}
                  ></div>
                  <div className="button-groups">
                    {state.activeTab == '1' &&
                      <button
                        type="button"
                        className="btn btn-info"
                        disabled={actionArray.length == 1 ? false : true}
                        onClick={editModalToggle}
                      >
                        <i className="fas fa-pen me-1" />Edit File name
                      </button>}

                    <button
                      type="button"
                      className="btn btn-secondary ms-1"
                      disabled={actionArray.length ? false : true}
                      onClick={removeModalToggle}
                    >
                      Delete
                    </button>
                  </div>
                </CardBody>
              </Card>

              <Card>
                <CardBody>
                  <CardText className="mb-0">
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
                          Uploaded
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
                          Generated
                        </NavLink>
                      </NavItem>


                    </Nav>
                    <TabContent
                      activeTab={state.activeTab}
                      className="p-3 text-muted"
                    >
                      <TabPane tabId="1">
                        <Row>
                          <Col sm="12">
                            <CardText className="mb-0">
                              {state.tableData &&
                                <PaginationProvider
                                  pagination={paginationFactory(pageOptions)}
                                  keyField="id"
                                  columns={activeData}
                                  data={state.tableData}
                                >
                                  {({ paginationProps, paginationTableProps }) => (
                                    <ToolkitProvider
                                      keyField="id"
                                      columns={activeData}
                                      data={state.tableData}
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
                              }
                            </CardText>

                          </Col>
                        </Row>
                      </TabPane>
                      <TabPane tabId="2">
                        <Row>
                          <Col sm="12">
                            <CardText className="mb-0">
                              {state.tableData &&
                                <PaginationProvider
                                  pagination={paginationFactory(pageOptions)}
                                  keyField="id"
                                  columns={activeData}
                                  data={state.tableData}
                                >
                                  {({ paginationProps, paginationTableProps }) => (
                                    <ToolkitProvider
                                      keyField="id"
                                      columns={activeData}
                                      data={state.tableData}
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
                              }
                            </CardText>

                          </Col>
                        </Row>
                      </TabPane>



                    </TabContent>
                  </CardText>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
        {state.editModal && <EditFileNameModal status={state.editModal} toggle={editModalToggle} data={actionArray[0]} tabCall={() => toggle(state.activeTab)} state={state} selectRowHandler={selectRowHandler} />}
        {state.removeDoc && <RemoveDocModal status={state.removeDoc} toggle={removeModalToggle} data={actionArray} tab={state.activeTab} tabCall={() => toggle(state.activeTab)} state={state} selectRowHandler={selectRowHandler} />}
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = gstate => {
  const { } = gstate.Portfolio;
  const { all_settings_doc } = gstate.Document;

  return { all_settings_doc };
};

export default withRouter(connect(mapStateToProps, { getAllDocumentsForSettings })(Documents));
