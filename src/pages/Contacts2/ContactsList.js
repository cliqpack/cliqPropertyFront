import React, { useEffect, useState } from "react";
// import Breadcrumbs from "../../components/Common/Breadcrumb";
import Breadcrumbs from "../../components/Common/Breadcrumb";
// import DatatableTables from "../Tables/DatatableTables";
import DatatableTables from "../Tables/DatatableTables";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { Link, withRouter, useHistory } from "react-router-dom";

import classnames from "classnames";
import {
  contactList,
  contactListType,
  showContactFresh,
  addContactFresh,
  ContactListFresh,
  addSupplierFresh,
  ContactListOwnerFresh,
  ContactListTenantFresh,
  ContactListSupplierFresh,
  ContactListSellerFresh,
} from "../../store/Contacts2/actions";
import { ContactsAllActivity } from "store/actions";
import { tenantUpdateFresh } from "../../store/Properties/actions";
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
import Parser from "html-react-parser";
import RemotePagination from "pages/Task/RemotePagination";

function ContactsList(props) {
  const [ownerStateData, setOwnerStateData] = useState([]);
  const [ownerState, setOwnerState] = useState(true);
  let history = useHistory();
  const [state, setState] = useState({
    activeTab: "1",
    page: 1,
    data: [],
    sizePerPage: 10,
    dataLength: 0,
    loading: false,
  });

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

  const handleTableChange = (
    type,
    { page, sizePerPage, sortField, sortOrder }
  ) => {
    setState(prev => ({ ...prev, loading: true }));
    if (!search) {
      if (sortField) {
        if (state.activeTab == 1) {
          props.contactList(
            page,
            sizePerPage,
            null,
            sortField,
            sortOrder,
            "ssr"
          );
        } else if (state.activeTab == 2) {
          props.contactListType(page, sizePerPage, null, sortField, sortOrder, "Owner");
        } else if (state.activeTab == 3) {
          props.contactListType(page, sizePerPage, null, sortField, sortOrder, "Tenant");
        } else if (state.activeTab == 4) {
          props.contactListType(page, sizePerPage, null, sortField, sortOrder, "Supplier");
        } else if (state.activeTab == 5) {
          props.contactListType(page, sizePerPage, null, sortField, sortOrder, "Seller");
        }
      } else {
        if (state.activeTab == 1) {
          props.contactList(page, sizePerPage, null, "id", "desc", "ssr");
        } else if (state.activeTab == 2) {
          props.contactListType(page, sizePerPage, null, "id", "desc", "Owner");
        } else if (state.activeTab == 3) {
          props.contactListType(page, sizePerPage, null, "id", "desc", "Tenant");
        } else if (state.activeTab == 4) {
          props.contactListType(page, sizePerPage, null, "id", "desc", "Supplier");
        } else if (state.activeTab == 5) {
          props.contactListType(page, sizePerPage, null, "id", "desc", "Seller");
        }
      }
    } else {
      if (sortField) {
        if (state.activeTab == 1) {
          props.contactList(
            page,
            sizePerPage,
            search,
            sortField,
            sortOrder,
            "ssr"
          );
        } else if (state.activeTab == 2) {
          props.contactListType(
            page,
            sizePerPage,
            search,
            sortField,
            sortOrder,
            "Owner"
          );
        } else if (state.activeTab == 3) {
          props.contactListType(
            page,
            sizePerPage,
            search,
            sortField,
            sortOrder,
            "Tenant"
          );
        } else if (state.activeTab == 4) {
          props.contactListType(
            page,
            sizePerPage,
            search,
            sortField,
            sortOrder,
            "Supplier"
          );
        } else if (state.activeTab == 5) {
          props.contactListType(
            page,
            sizePerPage,
            search,
            sortField,
            sortOrder,
            "Seller"
          );
        }
      } else {
        if (state.activeTab == 1) {
          props.contactList(page, sizePerPage, search, "id", "desc", "ssr");
        } else if (state.activeTab == 2) {
          props.contactListType(page, sizePerPage, search, "id", "desc", "Owner");
        } else if (state.activeTab == 3) {
          props.contactListType(page, sizePerPage, search, "id", "desc", "Tenant");
        } else if (state.activeTab == 4) {
          props.contactListType(page, sizePerPage, search, "id", "desc", "Supplier");
        } else if (state.activeTab == 5) {
          props.contactListType(page, sizePerPage, search, "id", "desc", "Seller");
        }
      }
    }
  };

  const ref = (cell, row) => {
    return <span className="text-primary">{cell}</span>;
  };
  const refDetail = (e, column, columnIndex, row, rowIndex) => {
    props.ContactsAllActivity(row.id);
    history.push(url + row.id);
  };
  const ownerDetail = (e, column, columnIndex, row, rowIndex) => {
    history.push(url + row.id);
  };
  const tanentDetail = (e, column, columnIndex, row, rowIndex) => {
    history.push(url + row.id);
  };
  const supplierDetail = (e, column, columnIndex, row, rowIndex) => {
    history.push(url + row.id);
  };

  var owner = (cell, row) => {
    console.log(cell);
    var data = cell.split(",");
    data.pop();
    var output = arrange(data);
    return Parser(output);
  };

  var arrange = data => {
    var output = ``;
    data.map((item, key) => {
      // console.log(item);
      if (item == "Owner" || item == " Owner") {
        output +=
          '<span className="badge square-pill bg-danger float-start me-1  p-2">' +
          item +
          "</span>";
      } else if (item == "Tenant" || item == " Tenant") {
        output +=
          '<span className="badge square-pill bg-primary float-start me-1 p-2">' +
          item +
          "</span>";
      } else if (item == "Supplier" || item == " Supplier") {
        output +=
          '<span className="badge square-pill bg-info float-start me-1 p-2">' +
          item +
          "</span>";
      } else if (item == "Seller" || item == " Seller") {
        output +=
          '<span className="badge square-pill bg-danger float-start me-1 p-2">' +
          item +
          "</span>";
      }
    });
    return output;
  };

  const allPersonRef = (cell, row) => {
    if (!row.first_name && !row.last_name) {
      return <span className="">{row.reference}</span>;
    } else {
      return <span className="">{`${row.first_name} ${row.last_name}`}</span>;
    }
  };
  const ownerNameRef = (cell, row) => (
    <span className="">{`${row.first_name} ${row.last_name}`}</span>
  );
  const tenantNameRef = (cell, row) => (
    <span className="">{`${row.first_name} ${row.last_name}`}</span>
  );
  const supplierNameRef = (cell, row) => (
    <span className="">{`${row.first_name} ${row.last_name}`}</span>
  );

  const columnData = [
    {
      dataField: "id",
      text: "Id",
      sort: true,
    },
    {
      dataField: "reference",
      text: "Reference",
      formatter: ref,
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          refDetail(e, column, columnIndex, row, rowIndex);
        },
      },
      sort: true,
    },
    {
      dataField: "first_name",
      text: "Primary Person",
      formatter: allPersonRef,
      sort: true,
    },
    {
      dataField: "mobile_phone",
      text: "Phone",
      sort: true,
    },
    {
      dataField: "roles",
      text: "Roles",
      formatter: owner,
      sort: true,
    },
  ];
  const columnDataOwner = [
    {
      dataField: "id",
      text: "Id",
      sort: true,
    },
    {
      dataField: "reference",
      text: "Reference",
      formatter: ref,
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          ownerDetail(e, column, columnIndex, row, rowIndex);
        },
      },
      sort: true,
    },
    {
      dataField: "first_name",
      text: "Primary Person",
      formatter: ownerNameRef,
      sort: true,
    },
    {
      dataField: "mobile_phone",
      text: "Phone",
      sort: true,
    },
  ];
  const columnDataTanent = [
    {
      dataField: "id",
      text: "Id",
      sort: true,
    },
    {
      dataField: "reference",
      text: "Reference",
      formatter: ref,
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          tanentDetail(e, column, columnIndex, row, rowIndex);
        },
      },
      sort: true,
    },
    {
      dataField: "first_name",
      text: "Primary Person",
      formatter: tenantNameRef,

      sort: true,
    },
    {
      dataField: "mobile_phone",
      text: "Phone",
      sort: true,
    },
  ];
  const columnDataSeller = [
    {
      dataField: "id",
      text: "Id",
      sort: true,
    },
    {
      dataField: "reference",
      text: "Reference",
      formatter: ref,
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          tanentDetail(e, column, columnIndex, row, rowIndex);
        },
      },
      sort: true,
    },
    {
      dataField: "first_name",
      text: "Primary Person",
      formatter: tenantNameRef,

      sort: true,
    },
    {
      dataField: "mobile_phone",
      text: "Phone",
      sort: true,
    },
    {
      dataField: "",
      text: "Bills due",
      sort: true,
    },
    {
      dataField: "",
      text: "Balance",
      sort: true,
    },
    {
      dataField: "",
      text: "Labels",
      sort: true,
    },
  ];
  const columnDataSupplier = [
    {
      dataField: "id",
      text: "Id",
      sort: true,
    },
    {
      dataField: "reference",
      text: "Reference",
      formatter: ref,
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          supplierDetail(e, column, columnIndex, row, rowIndex);
        },
      },
      sort: true,
    },
    {
      dataField: "first_name",
      text: "Primary Person",
      formatter: supplierNameRef,

      sort: true,
    },
    {
      dataField: "mobile_phone",
      text: "Phone",
      sort: true,
    },
  ];

  useEffect(() => {
    if (init) {
      toggle("1", "All");
      setInit(false);
    }

    if (props.contacts_list_loading == "Success") {
      setState(prev => ({
        ...prev,
        page: Number(props.contacts_list_data?.page),
        data: props.contacts_list_data.data,
        sizePerPage: props.contacts_list_data?.sizePerPage,
        dataLength: props.contacts_list_data?.length,
        loading: false,
      }));
      props.ContactListFresh();
    }

    if (props.contacts_list_owner_loading == "Success") {
      setState(prev => ({
        ...prev,
        page: Number(props.contacts_list_owner?.page),
        data: props.contacts_list_owner.data,
        sizePerPage: props.contacts_list_owner?.sizePerPage,
        dataLength: props.contacts_list_owner?.length,
        loading: false,
      }));
      props.ContactListOwnerFresh();
    }

    if (props.contacts_list_tenant_loading == "Success") {
      setState(prev => ({
        ...prev,
        page: Number(props.contacts_list_tenant?.page),
        data: props.contacts_list_tenant?.data,
        sizePerPage: props.contacts_list_tenant?.sizePerPage,
        dataLength: props.contacts_list_tenant?.length,
        loading: false,
      }));
      props.ContactListTenantFresh();
    }

    if (props.contacts_list_supplier_loading == "Success") {
      setState(prev => ({
        ...prev,
        page: Number(props.contacts_list_supplier?.page),
        data: props.contacts_list_supplier.data,
        sizePerPage: props.contacts_list_supplier?.sizePerPage,
        dataLength: props.contacts_list_supplier?.length,
        loading: false,
      }));
      props.ContactListSupplierFresh();
    }

    if (props.contacts_list_seller_loading == "Success") {

      setState(prev => ({
        ...prev,
        page: Number(props.contacts_list_seller?.page),
        data: props.contacts_list_seller?.data,
        sizePerPage: props.contacts_list_seller?.sizePerPage,
        dataLength: props.contacts_list_seller?.length,
        loading: false,
      }));
      props.ContactListSellerFresh();
    }

    if (props.contacts_add_loading !== false) {
      props.addContactFresh();
    }

    if (props.contacts_show_loading !== false) {
      props.showContactFresh();
    }
    if (props.tenant_update_loading === "Success") {
      props.tenantUpdateFresh();
    }
    if (props.supplier_add_loading === "Success") {
      props.addSupplierFresh();
    }
  }, [
    props.contacts_list_loading,
    props.contacts_list_owner_loading,
    props.contacts_list_tenant_loading,
    props.contacts_list_supplier_loading,
    props.contacts_list_seller_loading,
    props.contacts_show_loading,
  ]);

  const toggle = (tab, type) => {

    if (state.activeTab !== tab) {
      setState(prev => ({
        ...prev,
        loading: true,
        page: 1,
        data: [],
        sizePerPage: 10,
        dataLength: 0,
        loading: true,
        activeTab: tab,
      }));
    } else {
      setState(prev => ({ ...prev, loading: true }));
    }
    setSearch("");

    if (tab == "1") {
      props.contactList(
        1,
        state.sizePerPage,
        null,
        "id",
        "desc",
        "ssr"
      );
    } else if (tab == "2") {
      props.contactListType(
        1,
        state.sizePerPage,
        null,
        "id",
        "desc",
        type
      );
    } else if (tab == "3") {
      props.contactListType(
        1,
        state.sizePerPage,
        null,
        "id",
        "desc",
        type
      );
    } else if (tab == "4") {
      props.contactListType(
        1,
        state.sizePerPage,
        null,
        "id",
        "desc",
        type
      );
    } else if (tab == "5") {
      console.log(state);
      props.contactListType(
        1,
        state.sizePerPage,
        null,
        "id",
        "desc",
        type
      );
    }
    console.log(state);
  };

  let url = "/contactsInfo/";
  let ownerUrl = "/contactsInfo/owner/";
  let tenantUrl = "/contactsInfo/tenant/";
  let supplierUrl = "/contactsInfo/supplier/";

  return (
    <div className="page-content">
      <Container fluid={true}>
        {/* <Breadcrumbs title="Contacts List" breadcrumbItem="Contacts" /> */}
        <h4 className="ms-2 text-primary">Contact List</h4>


        <Row>
          <Col md={2} >
            <div>
              <Card style={{ borderRadius: "15px", paddingTop: "15px" }}>
                <CardBody style={{ padding: "10px" }}>
                  {/* <h4 className="ms-2 mb-4 text-primary">Contacts</h4> */}
                  <div className="button-items">
                    <Link to="/contact">
                      <button type="button" className="btn btn-info custom-button-side-row-font-size">

                        Add Contact
                        <i className="bx bx-plus-circle font-size-18 align-middle ms-2" />
                      </button>
                    </Link>

                    <Link to="/addSupplier">
                      <button type="button" className="btn btn-info custom-button-side-row-font-size">
                        Add Supplier
                        <i className="bx bx-plus-circle font-size-18 align-middle ms-2" />
                      </button>
                    </Link>

                    {/* <button type="button" className="btn btn-secondary">
                      <i className="fas fas fa-paper-plane font-size-12 align-middle me-2"></i>
                      Message
                      <i className="fas fas fa-chevron-down font-size-12 align-middle ms-2"></i>
                    </button>

                    <button disable type="button" className="btn btn-secondary">
                      Actions
                      <i className="fas fas fa-chevron-down font-size-12 align-middle ms-2"></i>
                    </button> */}
                  </div>
                </CardBody>
              </Card>
            </div>
          </Col>
          <Col md={10} style={{ padding: "0px" }}>
            <div>
              <Card style={{ borderRadius: "15px" }}>
                <CardBody>
                  <div>
                    <Row>
                      <Col sm={12} md={12} lg={9}>

                        <Nav className="icon-tab nav-justified">
                          <NavItem>
                            <NavLink
                              style={{ cursor: "pointer" }}
                              className={classnames({
                                active: state.activeTab === "1",
                              })}
                              onClick={() => {
                                toggle("1", "All");
                              }}
                            >
                              All
                            </NavLink>
                          </NavItem>
                          <NavItem>
                            <NavLink
                              style={{ cursor: "pointer" }}
                              className={classnames({
                                active: state.activeTab === "2",
                              })}
                              onClick={() => {
                                toggle("2", "Owner");
                              }}
                            >
                              Owners
                            </NavLink>
                          </NavItem >
                          <NavItem>
                            <NavLink
                              style={{ cursor: "pointer" }}
                              className={classnames({
                                active: state.activeTab === "3",
                              })}
                              onClick={() => {
                                toggle("3", "Tenant");
                              }}
                            >
                              Tenants
                            </NavLink>
                          </NavItem>
                          <NavItem>
                            <NavLink
                              style={{ cursor: "pointer" }}
                              className={classnames({
                                active: state.activeTab === "4",
                              })}
                              onClick={() => {
                                toggle("4", "Supplier");
                              }}
                            >
                              Suppliers
                            </NavLink>
                          </NavItem>
                          <NavItem>
                            <NavLink
                              style={{ cursor: "pointer" }}
                              className={classnames({
                                active: state.activeTab === "5",
                              })}
                              onClick={() => {
                                toggle("5", "Seller");
                              }}
                            >
                              Sellers
                            </NavLink>
                          </NavItem>
                          <NavItem>
                            <NavLink
                              style={{ cursor: "pointer" }}
                              className={classnames({
                                active: state.activeTab === "6",
                              })}
                              onClick={() => {
                                toggle("6", "");
                              }}
                            >
                              Archived
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
                                  columns={columnDataOwner}
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
                                  columns={columnDataTanent}
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
                                  columns={columnDataSupplier}
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
                                  columns={columnDataSeller}
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
                      <TabPane tabId="6">
                        <Row>
                          <Col sm="12">
                            <CardText className="mb-0">
                              <DatatableTables2
                                products={{ data: [] }}
                                columnData={columnDataTanent}
                              // url={url}
                              />
                            </CardText>
                          </Col>
                        </Row>
                      </TabPane>
                      <TabPane tabId="7">
                        <Row>
                          <Col sm="12">
                            <CardText className="mb-0">
                              <DatatableTables />
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
    </div >
  );
}

const mapStateToProps = gstate => {
  const {
    contacts_list_data,
    contacts_list_error,
    contacts_list_loading,

    contacts_list_owner,
    contacts_list_owner_error,
    contacts_list_owner_loading,

    contacts_list_tenant,
    contacts_list_tenant_error,
    contacts_list_tenant_loading,

    contacts_list_supplier,
    contacts_list_supplier_error,
    contacts_list_supplier_loading,

    contacts_list_seller,
    contacts_list_seller_error,
    contacts_list_seller_loading,

    contacts_show_loading,

    contacts_add_loading,
    supplier_add_loading,
  } = gstate.Contacts2;
  const { tenant_update_loading } = gstate.property;
  return {
    contacts_list_data,
    contacts_list_error,
    contacts_list_loading,

    contacts_list_owner,
    contacts_list_owner_error,
    contacts_list_owner_loading,

    contacts_list_tenant,
    contacts_list_tenant_error,
    contacts_list_tenant_loading,

    contacts_list_supplier,
    contacts_list_supplier_error,
    contacts_list_supplier_loading,

    contacts_list_seller,
    contacts_list_seller_error,
    contacts_list_seller_loading,

    contacts_show_loading,

    contacts_add_loading,

    tenant_update_loading,
    supplier_add_loading,
  };
};

export default withRouter(
  connect(mapStateToProps, {
    contactList,
    contactListType,
    showContactFresh,
    addContactFresh,
    ContactListFresh,
    tenantUpdateFresh,
    addSupplierFresh,
    ContactsAllActivity,
    ContactListOwnerFresh,
    ContactListTenantFresh,
    ContactListSupplierFresh,
    ContactListSellerFresh,
  })(ContactsList)
);
