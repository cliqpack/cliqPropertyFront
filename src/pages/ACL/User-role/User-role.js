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
import {
  getUserRole,
  roleAssignUser,
  userRoleAddFresh,
  getUserRolelist,
  userRoleDelete
} from "../../../store/ACL/User-role/actions";
import Select from "react-select";

import { Link, withRouter } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import toastr from "toastr";

//Import Breadcrumb
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import { propTypes } from "react-bootstrap-editable";
import Roles from "./roles";
const UserRole = props => {
  const [state, setState] = useState();
  const [selectedGroup, setSelectedGroup] = useState();
  const [selectedGroup1, setSelectedGroup1] = useState();
  const [togState, setTogState] = useState(false);
  const [view, setView] = useState(0);

  useEffect(() => {


    if (props.user_role_list_loading === false) {
      console.log("list");
      props.getUserRole();
    } else if (props.menu_list_loading === false) {
      console.log("list2");
      props.menuList();
    } else if (props.user_role_list_data_loading === false) {
      props.getUserRolelist();
    }




    if (view == 0) {
      props.getUserRole();
      props.getUserRolelist();
      setView(1);

    }
  }, [props]);

  const handleSelectGroup = selectedGroup => {
    setSelectedGroup(selectedGroup);
  };

  const handleSelectGroup1 = selectedGroup1 => {
    setSelectedGroup1(selectedGroup1);
  };

  const tog_standard = role => {
    setTogState(prevTogState => !prevTogState);
    removeBodyCss();
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
    props.roleAssignUser(selectedGroup, selectedGroup1);

  };


  const deleteRole = (id) => {
    props.userRoleDelete(id)
  }
  var moduleData = undefined;
  var menuData = "";
  var optionGroup = undefined;
  var optionGroup1 = undefined;
  var roleData = undefined;



  if (props.user_role_list_data_loading === "Success") {
    console.log(props.user_role_list_data_data.data);
    roleData = props.user_role_list_data_data.data.map((item, key) => (
      <tr key={key}>
        <td>{key + 1}</td>
        <td>{item.first_name} {item.last_name}</td>
        <td><Roles data={item.roles} func={deleteRole} /></td>
        <td>{item.email}</td>
      </tr>
    ));
  }

  if (props.user_role_list_loading === "Success") {
    let option = [];
    let option1 = [];
    props.user_role_list_data.users.map((item, key) => {

      let menuObj = {
        label: item.first_name,
        value: item.id,
      };

      option.push(menuObj);
    });
    props.user_role_list_data.roles.map((item, key) => {
      let menuObj = {
        label: item.name,
        value: item.id,
      };

      option1.push(menuObj);
    });
    optionGroup = [
      {
        options: option,
      },
    ];
    optionGroup1 = [
      {
        options: option1,
      },
    ];
  }
  if (props.user_role_assign_loading == "Success") {
    if (props.user_role_assign_data !== "Success") {
      console.log(props.user_role_assign_data.warning);
      toastr.warning(props.user_role_assign_data.warning);
      props.userRoleAddFresh();
    } else {
      console.log(props.user_role_assign_data);
      toastr.success("User Assign Successfull");
      props.userRoleAddFresh();
    }
  } else if (props.user_role_assign_loading === "Failed") {
    toastr.error("User Assign Failed");
  }

  //meta title
  document.title = "CliqProperty";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="Forms" breadcrumbItem="User Roles" />
          <Row>
            <Col lg={6}>
              <Card>
                <CardBody>
                  <CardTitle className="mb-4">Add User Role</CardTitle>
                  <Row>
                    <Col lg={12} className="mb-4">
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
                    <Col lg={12} className="mb-4">
                      {optionGroup1 != [] ? (
                        <Select
                          value={selectedGroup1}
                          onChange={handleSelectGroup1}
                          options={optionGroup1}
                          classNamePrefix="select2-selection"
                        />
                      ) : null}
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={12}>
                      <button
                        className="btn btn-info w-md"
                        type="button"
                        onClick={mSubmit}
                      >
                        Submit
                      </button>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>

            <Col lg={6}>
              <Card>
                <CardBody>
                  <CardTitle className="mb-4">User Role List</CardTitle>

                  <div className="table-responsive">
                    <Table className="table mb-0">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>User Name</th>
                          <th>Role</th>
                          <th>Email</th>
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

        </Container>
        {/* container-fluid */}
      </div>
    </React.Fragment>
  );
};

UserRole.propTypes = {
  getUserRole: PropTypes.func,
  getUserRolelist: PropTypes.func,
  history: PropTypes.object,
  user_role_list_data: PropTypes.any,
  user_role_list_error: PropTypes.any,
  user_role_list_loading: PropTypes.any,
  user_role_assign_data: PropTypes.any,
  user_role_assign_error: PropTypes.any,
  user_role_assign_loading: PropTypes.any,
  user_role_list_data_data: PropTypes.any,
  user_role_list_data_error: PropTypes.any,
  user_role_list_data_loading: PropTypes.any,
};
const mapStateToProps = state => {
  const {
    user_role_list_data,
    user_role_list_error,
    user_role_list_loading,
    user_role_assign_data,
    user_role_assign_error,
    user_role_assign_loading,
    user_role_list_data_data,
    user_role_list_data_error,
    user_role_list_data_loading,
  } = state.UserRole;
  const { menu_list_data, menu_list_error, menu_list_loading } = state.Menu;

  return {
    user_role_list_data,
    user_role_list_error,
    user_role_list_loading,
    user_role_assign_data,
    user_role_assign_error,
    user_role_assign_loading,
    user_role_list_data_data,
    user_role_list_data_error,
    user_role_list_data_loading,
  };
};

export default withRouter(
  connect(mapStateToProps, {
    getUserRole,
    roleAssignUser,
    getUserRolelist,
    userRoleAddFresh,
    userRoleDelete
  })(UserRole)
);
