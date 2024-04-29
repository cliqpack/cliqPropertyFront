import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  Alert,
  Card,
  CardBody,
  Col,
  Container,
  CardTitle,
  Row,
  Label,
  Table,
  Modal,
} from "reactstrap";
import { getModule, moduleListFresh } from "../../../store/ACL/Module/actions";
import {
  addRole,
  roleList,
  roleDelete,
  roleAssignModule,
  roleAddFresh,
  roleDeleteFresh,
  roleAssignFresh,
} from "../../../store/ACL/Role/actions";
import { menuList } from "../../../store/ACL/menu/actions";
import Select from "react-select";

import { Link, withRouter } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import toastr from "toastr";

//Import Breadcrumb
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import { propTypes } from "react-bootstrap-editable";

const Role = props => {
  const [state, setState] = useState();
  const [selectedGroup, setSelectedGroup] = useState();
  const [togState, setTogState] = useState(false);
  const [data, setData] = useState();

  useEffect(() => {
    console.log(props);
    if (props.role_list_loading === false) {
      console.log("list");
      props.roleList();
    } else if (props.menu_list_loading === false) {
      console.log("list2");
      props.menuList();
    }
  }, [props.role_list_loading]);

  const handleSelectGroup = selectedGroup => {
    console.log(selectedGroup);
    setSelectedGroup(selectedGroup);
    props.getModule(selectedGroup);
  };

  const tog_standard = role => {
    setTogState(prevTogState => !prevTogState);
    removeBodyCss();
    props.moduleListFresh();
    setData(role.id);
  };
  const removeBodyCss = () => {
    document.body.classList.add("no_padding");
  };
  const roleDelete = id => {
    props.roleDelete(id);
    props.roleList();
  };
  var modules = [];

  const inputChange = e => {
    var lol = modules.push(e.target.defaultValue);
  };
  const mSubmit = () => {
    props.roleAssignModule(modules, data);
  };
  var moduleData = undefined;
  var menuData = "";
  var optionGroup = undefined;
  var roleData = undefined;

  if (props.module_get_loading === "Success") {
    moduleData = props.module_get_data.map((item, key) => (
      <tr key={key}>
        <td>{key + 1}</td>
        <td>
          <input
            type="checkbox"
            name="module[]"
            onChange={e => inputChange(e)}
            value={item.id}
          />
        </td>
        <td>{item.name}</td>
      </tr>
    ));
  }

  if (props.role_list_loading === "Success") {
    console.log(props.role_list_data.data);
    roleData = props.role_list_data.data.roles.map((item, key) => (
      <tr key={key}>
        <td>{key + 1}</td>
        <td>{item.name}</td>
        <td>{item.created_by}</td>
        <td>
          <button
            type="button"
            onClick={() => tog_standard(item)}
            className="btn btn-info"
            data-toggle="modal"
            data-target="#myModal"
          >
            Module Assign
          </button>
          <button
            type="button"
            onClick={() => roleDelete(item.id)}
            className="btn btn-danger"
          >
            Delete
          </button>
        </td>
      </tr>
    ));
  }

  if (props.menu_list_loading === "Success") {
    let option = [];
    props.menu_list_data.data.menus.map((item, key) => {
      let menuObj = {
        label: item.menu_title,
        value: item.id,
      };

      option.push(menuObj);
    });

    optionGroup = [
      {
        options: option,
      },
    ];
  }

  if (props.role_assign_data !== null) {
    toastr.success("Module Assign Successful");
    props.roleAssignFresh();
  } else if (props.role_assign_data !== null) {
    toastr.error("Module Assign Failed");
    props.roleAssignFresh();
  }

  if (props.role_add_loading == "Success") {
    toastr.success("Role Add Successfull");
    props.roleAddFresh();
  } else if (props.role_add_loading == "Failed") {
    toastr.error("Role Add Failed");
    props.roleAddFresh();
  }

  if (props.role_delete_loading == "Success") {
    toastr.success("Role Delete Successfull");
    props.roleDeleteFresh();
  } else if (props.role_delete_loading == "Failed") {
    toastr.error("Role Delete Failed");
    props.roleDeleteFresh();
  }


  //meta title
  document.title = "CliqProperty";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="Forms" breadcrumbItem="Roles" />
          <Row>
            <Col lg={6}>
              <Card>
                <CardBody>
                  <CardTitle className="mb-4">Add Role</CardTitle>
                  <div className="p-2">
                    {props.error ? (
                      <Alert color="danger">
                        {JSON.stringify(props.error.response.data.message)}
                      </Alert>
                    ) : null}
                    <Formik
                      enableReinitialize={true}
                      initialValues={{
                        role: (state && state.role) || "",
                      }}
                      validationSchema={Yup.object().shape({
                        role: Yup.string().required("Please Enter Role"),
                      })}
                      onSubmit={values => {
                        props.addRole(values);
                        props.roleList();
                      }}
                    >
                      {({ errors, status, touched }) => (
                        <Form className="form-horizontal">
                          <div className="mb-3">
                            <Label for="role" className="form-label">
                              Role
                            </Label>
                            <Field
                              name="role"
                              type="text"
                              className={
                                "form-control" +
                                (errors.role && touched.role
                                  ? " is-invalid"
                                  : "")
                              }
                            />
                            <ErrorMessage
                              name="role"
                              component="div"
                              className="invalid-feedback"
                            />
                          </div>
                          <div className="mt-3">
                            <button
                              className="btn btn-info w-md"
                              type="submit"
                            >
                              Submit
                            </button>
                          </div>
                        </Form>
                      )}
                    </Formik>
                  </div>
                </CardBody>
              </Card>
            </Col>

            <Col lg={6}>
              <Card>
                <CardBody>
                  <CardTitle className="mb-4">Role List</CardTitle>

                  <div className="table-responsive">
                    <Table className="table mb-0">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Module</th>
                          <th>Created by</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>{roleData}</tbody>
                    </Table>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Modal isOpen={togState} toggle={tog_standard}>
            <form>
              <div className="modal-header">
                <h5 className="modal-title mt-0" id="myModalLabel">
                  Module Routes
                </h5>
                <button
                  type="button"
                  onClick={() => setTogState(false)}
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <Row>
                  <Col lg={12}>
                    {optionGroup != [] ? (
                      <Select
                        value={selectedGroup}
                        onChange={handleSelectGroup}
                        options={optionGroup}
                        classNamePrefix="select2-selection"
                      />
                    ) : null}
                  </Col>
                </Row>
                <Row>
                  <Col lg={12}>
                    <Card>
                      <CardBody>
                        <CardTitle className="mb-4">Select Module</CardTitle>

                        <div className="table-responsive">
                          <Table className="table mb-0">
                            <thead>
                              <tr>
                                <th>#</th>
                                <th>Select</th>
                                <th>Name</th>
                              </tr>
                            </thead>
                            <tbody>{moduleData}</tbody>
                          </Table>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-info w-md"
                  type="button"
                  onClick={mSubmit}
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={tog_standard}
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </form>
          </Modal>
          {/* <Row>
              <Col lg={12}>
                <Card>
                  <CardBody>
                    <CardTitle className="h5 mb-4">Auto Sizing</CardTitle>

                    <Form className="row gy-2 gx-3 align-items-center">
                      <div className="col-sm-auto">
                        <Label className="visually-hidden" htmlFor="autoSizingInput">Name</Label>
                        <Input type="text" className="form-control" id="autoSizingInput" placeholder="Jane Doe" />
                      </div>
                      <div className="col-sm-auto">
                        <Label className="visually-hidden" htmlFor="autoSizingInputGroup">Username</Label>
                        <InputGroup>
                          <div className="input-group-text">@</div>
                          <input type="text" className="form-control" id="autoSizingInputGroup" placeholder="Username" />
                        </InputGroup>
                      </div>
                      <div className="col-sm-auto">
                        <label className="visually-hidden" htmlFor="autoSizingSelect">Preference</label>
                        <select defaultValue="0" className="form-select">
                          <option value="0">Choose...</option>
                          <option value="1">One</option>
                          <option value="2">Two</option>
                          <option value="3">Three</option>
                        </select>
                      </div>
                      <div className="col-sm-auto">
                        <div className="form-check">
                          <input className="form-check-input" type="checkbox" id="autoSizingCheck" />
                          <label className="form-check-label" htmlFor="autoSizingCheck">
                            Remember me
                          </label>
                        </div>
                      </div>
                      <div className="col-sm-auto">
                        <button type="submit" className="btn btn-info w-md">Submit</button>
                      </div>
                    </Form>
                  </CardBody>
                </Card>
              </Col>
            </Row>*/}
          {/* end row  */}
          {/*<Row>
              <Col lg={12}>
                <Card>
                  <CardBody>
                    <CardTitle className="h5 mb-4">Inline forms</CardTitle>

                    <Form className="row row-cols-lg-auto g-3 align-items-center">
                      <Col xs={12}>
                        <label className="visually-hidden" htmlFor="inlineFormInputGroupUsername">Username</label>
                        <InputGroup>
                          <div className="input-group-text">@</div>
                          <input type="text" className="form-control" id="inlineFormInputGroupUsername" placeholder="Username" />
                        </InputGroup>
                      </Col>

                      <Col xs={12}>
                        <label className="visually-hidden" htmlFor="inlineFormSelectPref">Preference</label>
                        <select defaultValue="0" className="form-select">
                          <option value="0">Choose...</option>
                          <option value="1">One</option>
                          <option value="2">Two</option>
                          <option value="3">Three</option>
                        </select>
                      </Col>

                      <Col xs={12}>
                        <div className="form-check">
                          <input className="form-check-input" type="checkbox" id="inlineFormCheck" />
                          <label className="form-check-label" htmlFor="inlineFormCheck">
                            Remember me
                          </label>
                        </div>
                      </Col>

                      <Col xs={12}>
                        <button type="submit" className="btn btn-info w-md">Submit</button>
                      </Col>
                    </Form>
                  </CardBody>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col xl={6}>
                <Card>
                  <CardBody>
                    <CardTitle className="h5">Floating labels</CardTitle>
                    <p className="card-title-desc">Create beautifully simple form labels that float over your input fields.</p>

                    <Form>
                      <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="floatingnameInput" placeholder="Enter Name" defaultValue="Maria Laird" />
                        <label htmlFor="floatingnameInput">Name</label>
                      </div>
                      <Row>
                        <Col md={6}>
                          <div className="form-floating mb-3">
                            <input type="email" className="form-control" id="floatingemailInput" placeholder="Enter Email address" defaultValue="name@example.com" />
                            <label htmlFor="floatingemailInput">Email address</label>
                          </div>
                        </Col>
                        <Col md={6}>
                          <div className="form-floating mb-3">
                            <select defaultValue="0" className="form-select">
                              <option value="0">Open this select menu</option>
                              <option value="1">One</option>
                              <option value="2">Two</option>
                              <option value="3">Three</option>
                            </select>
                            <label htmlFor="floatingSelectGrid">Works with selects</label>
                          </div>
                        </Col>
                      </Row>

                      <div className="mb-3">

                        <div className="form-check">
                          <input className="form-check-input" type="checkbox" id="floatingCheck" />
                          <label className="form-check-label" htmlFor="floatingCheck">
                            Check me out
                          </label>
                        </div>
                      </div>
                      <div>
                        <button type="submit" className="btn btn-info w-md">Submit</button>
                      </div>
                    </Form>
                  </CardBody>
                </Card>
              </Col>
            </Row> */}
        </Container>
        {/* container-fluid */}
      </div>
    </React.Fragment>
  );
};

Role.propTypes = {
  addRole: PropTypes.func,
  roleList: PropTypes.func,
  roleDelete: PropTypes.func,
  roleAssignModule: PropTypes.func,
  roleAddFresh: PropTypes.func,
  roleDeleteFresh: PropTypes.func,
  roleAssignFresh: PropTypes.func,
  history: PropTypes.object,
  role_list_data: PropTypes.any,
  role_list_error: PropTypes.any,
  role_list_loading: PropTypes.any,
  role_add_data: PropTypes.any,
  role_add_error: PropTypes.any,
  role_add_loading: PropTypes.any,
  role_delete_data: PropTypes.any,
  role_delete_error: PropTypes.any,
  role_delete_loading: PropTypes.any,
  role_assign_data: PropTypes.any,
  role_assign_error: PropTypes.any,
  role_assign_loading: PropTypes.any,

  menuList: PropTypes.func,
  history: PropTypes.object,
  menu_list_data: PropTypes.any,
  menu_list_error: PropTypes.any,
  menu_list_loading: PropTypes.any,

  module_get_data: PropTypes.any,
  module_get_error: PropTypes.any,
  module_get_loading: PropTypes.any,
  getModule: PropTypes.func,
};
const mapStateToProps = state => {
  const {
    role_list_data,
    role_list_error,
    role_list_loading,
    role_add_data,
    role_add_error,
    role_add_loading,
    role_delete_data,
    role_delete_error,
    role_delete_loading,
    role_assign_data,
    role_assign_error,
    role_assign_loading,
  } = state.Role;
  const { menu_list_data, menu_list_error, menu_list_loading } = state.Menu;
  const { module_get_data, module_get_error, module_get_loading } =
    state.Modules;
  return {
    role_list_data,
    role_list_error,
    role_list_loading,
    role_add_data,
    role_add_error,
    role_add_loading,
    role_delete_data,
    role_delete_error,
    role_delete_loading,
    role_assign_data,
    role_assign_error,
    role_assign_loading,
    menu_list_data,
    menu_list_error,
    menu_list_loading,
    module_get_data,
    module_get_error,
    module_get_loading,
  };
};

export default withRouter(
  connect(mapStateToProps, {
    addRole,
    roleList,
    roleDelete,
    menuList,
    getModule,
    roleAssignModule,
    moduleListFresh,
    roleAddFresh,
    roleDeleteFresh,
    roleAssignFresh,
  })(Role)
);
