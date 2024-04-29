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
} from "reactstrap";

import { Link, withRouter } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import toastr from "toastr";

//Import Breadcrumb
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import DeleteModal from "components/Common/DeleteModal";
import { propTypes } from "react-bootstrap-editable";

//actions
import { getUserOwner } from "store/actions";
import { planList } from "../../../store/ACL/Plan/actions";
import {
  userPlanList,
  storeUserPlan,
  storeUserPlanFresh,
  deleteUserPlan,
} from "store/ACL/UserPlan/action";

document.title = "CliqProperty";

const UserPlan = props => {
  const [state, setState] = useState();
  const [seen, setSeen] = useState(false);
  const [deleteState, setDeleteState] = useState(false);
  useEffect(() => {
    if (!seen) {
      props.getUserOwner();
      props.planList();
      props.userPlanList();
    }
    // if (props.user_list_loading === false) {
    //   props.getUser();
    // }
    // if (props.acl_plan_loading === false) {
    //   props.planList();
    // }
    // if (props.acl_user_plan_loading === false) {
    //   props.userPlanList();
    // }
    if (props.acl_user_plan_add_loading == "Success") {
      toastr.success("User Plan Added Successfully");
      props.userPlanList();
      props.storeUserPlanFresh();
    }
    if (props.acl_user_plan_add_loading == "Failed") {
      toastr.warning("User Plan Failed");
      props.storeUserPlanFresh();
    }
    setSeen(true);
  }, [
    // props.user_list_loading,
    // props.acl_plan_loading,
    // props.acl_user_plan_loading,
    props.acl_user_plan_add_loading,
  ]);

  const deleteMenu = id => {
    props.deleteUserPlan(id);
    toastr.success("Plan deleted Successfully");
    setDeleteState(false);
  };

  var menuPrice = undefined;
  if (props.acl_user_plan_data != null) {
    menuPrice = props.acl_user_plan_data?.user_plan?.map((item, key) => (
      <tr key={key}>
        <th scope="row">{key + 1}</th>
        <td>{item.user.first_name + " " + item.user.last_name}</td>
        <td>{item.plan.name}</td>
        <td>
          <button
            type="submit"
            className="btn btn-sm btn-danger"
            onClick={() => setDeleteState(prev => !prev)}
          >
            {/* Delete */}
            <i className="fas fa-trash-alt"></i>
          </button>
          <DeleteModal
            show={deleteState}
            onDeleteClick={() => deleteMenu(item.id)}
            onCloseClick={() => setDeleteState(false)}
          />
        </td>
      </tr>
    ));
  }

  var menuData = undefined;
  if (props.acl_plan_data != null) {
    menuData = props.acl_plan_data.menu_plan.map((item, key) => (
      <option key={key} value={item.id}>
        {item.name}
      </option>
    ));
  }

  let userData = undefined;
  if (props.user_owner_list_data) {
    userData = props.user_owner_list_data?.data?.map((item, key) => (
      <option key={key} value={item.id}>
        {item.first_name + " " + item.last_name}
      </option>
    ));
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          {/* <Breadcrumbs title="Forms" breadcrumbItem="User Plan" /> */}
          <h4 className="ms-2 text-primary">User Plan</h4>
          <Row>
            <Col lg={6}>
              <Card className="custom_card_border_design me-2">
                <CardBody>
                  <CardTitle className="mb-4">Create User Plan</CardTitle>

                  <div className="p-2">
                    {props.error ? (
                      <Alert color="danger">
                        {JSON.stringify(props.error.response.data.message)}
                      </Alert>
                    ) : null}
                    <Formik
                      enableReinitialize={true}
                      initialValues={{
                        user: (state && state.user) || "",
                        plan: (state && state.plan) || "",
                      }}
                      validationSchema={Yup.object().shape({
                        user: Yup.string().required("Please Enter user"),
                        plan: Yup.string().required("Please Enter plan"),
                      })}
                      onSubmit={(values, onSubmitProps) => {
                        props.storeUserPlan(values);
                        onSubmitProps.resetForm();
                        console.log(values);
                      }}
                    >
                      {({ errors, status, touched }) => (
                        <Form className="form-horizontal">
                          <div className="form-group-new">

                            <Field
                              as="select"
                              name="user"
                              className="form-select"
                            >
                              <option>Select a User...</option>
                              {userData}
                            </Field>
                            <ErrorMessage
                              name="plan"
                              component="div"
                              className="invalid-feedback"
                            />
                            <label htmlFor="usr">Users</label>
                          </div>


                          <div className="form-group-new">
                            {/* <Label for="plan" className="form-label">
                              Plans
                            </Label> */}
                            <Field
                              as="select"
                              name="plan"
                              className="form-select"
                            >
                              <option>Select a Plan...</option>
                              {menuData}
                            </Field>
                            <ErrorMessage
                              name="name"
                              component="div"
                              className="invalid-feedback"
                            />
                            <label htmlFor="usr">Plans</label>
                          </div>

                          <div className="mt-3">
                            <button className="btn btn-buttonColor w-md" type="submit">
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
              <Card className="custom_card_border_design me-2">
                <CardBody>
                  <CardTitle className="mb-4">User Addon Plan List</CardTitle>

                  <div className="table-responsive">
                    <Table className="table mb-0">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>User</th>
                          <th>Plan</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>{menuPrice}</tbody>
                    </Table>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
        {/* container-fluid */}
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  const { user_owner_list_data, user_owner_list_error, user_owner_list_loading } = state.property;
  const { acl_plan_data, acl_plan_loading, acl_plan_error } = state.Plan;
  const {
    acl_user_plan_data,
    acl_user_plan_loading,
    acl_user_plan_error,

    acl_user_plan_add_data,
    acl_user_plan_add_loading,
    acl_user_plan_add_error,
  } = state.UserPlan;

  return {
    acl_plan_data,
    acl_plan_loading,
    acl_plan_error,

    user_owner_list_data,
    user_owner_list_error,
    user_owner_list_loading,

    acl_user_plan_data,
    acl_user_plan_loading,
    acl_user_plan_error,

    acl_user_plan_add_data,
    acl_user_plan_add_loading,
    acl_user_plan_add_error,
  };
};

export default withRouter(
  connect(mapStateToProps, {
    getUserOwner,
    planList,
    userPlanList,
    storeUserPlan,
    storeUserPlanFresh,
    deleteUserPlan,
  })(UserPlan)
);
