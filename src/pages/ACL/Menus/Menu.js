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
import {
  addMenu,
  editMenu,
  menuList,
  menuDelete,
  menuAddFresh,
  menuEditFresh,
  menuDeleteFresh,
  menuListFresh,
} from "../../../store/actions";

import { Link, withRouter } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import toastr from "toastr";

//Import Breadcrumb
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import { propTypes } from "react-bootstrap-editable";
document.title = "CliqProperty";

const Menu = props => {
  const [state, setState] = useState();
  useEffect(() => {

    if (props.menu_add_loading === "Success") {
      toastr.success(props.menu_add_data.message);
      props.menuAddFresh();
      props.menuListFresh();


    } else if (props.menu_add_loading === "Failed") {
      toastr.error("Menu Added Failed");
      props.menuAddFresh();
    }

    else if (props.menu_delete_loading == "Success") {
      props.menuDeleteFresh()

      toastr.success("Success");
      props.menuList();


    }

    else if (props.menu_delete_loading == "Failed") {
      props.menuDeleteFresh()

      toastr.error("please remove its child parent depency")

    }

    if (props.menu_list_loading == false) {

      props.menuList()
    }







  }, [props]);

  var menuData = undefined;
  if (props.menu_list_data != null) {
    menuData = props.menu_list_data.data.menus.map((item, key) => (
      <tr key={key}>
        <th scope="row">{key + 1}</th>
        <td>{item.menu_title}</td>
        <td>{item.slug}</td>
        <td>{item.sort_order}</td>
        <td>
          <button type="submit" className="btn btn-danger w-md" onClick={() => deleteMenu(item.id)}>
            Delete Menu
          </button>
        </td>
      </tr>
    ));
  }
  const deleteMenu = (id) => {
    props.menuDelete(id);
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="Forms" breadcrumbItem="Menu" />
          <Row>
            <Col lg={6}>
              <Card>
                <CardBody>
                  <CardTitle className="mb-4">Add Menu</CardTitle>

                  <div className="p-2">
                    {props.error ? (
                      <Alert color="danger">
                        {JSON.stringify(props.error.response.data.message)}
                      </Alert>
                    ) : null}
                    <Formik
                      enableReinitialize={true}
                      initialValues={{
                        menu: (state && state.menu) || "",
                        slug: (state && state.slug) || "",
                        sort_order: (state && state.sort_order) || "",
                      }}
                      validationSchema={Yup.object().shape({
                        menu: Yup.string().required("Please Enter Menu"),
                        slug: Yup.string().required("Please Enter Slug"),
                        sort_order: Yup.number().required(
                          "Please Enter Sort Order"
                        ),
                      })}
                      onSubmit={(values, onSubmitProps) => {
                        props.addMenu(values);
                        onSubmitProps.resetForm();
                      }}
                    >
                      {({ errors, status, touched }) => (
                        <Form className="form-horizontal">
                          <div className="mb-3">
                            <Label for="menu" className="form-label">
                              Menu
                            </Label>
                            <Field
                              name="menu"
                              type="text"
                              className={
                                "form-control" +
                                (errors.menu && touched.menu
                                  ? " is-invalid"
                                  : "")
                              }
                            />
                            <ErrorMessage
                              name="menu"
                              component="div"
                              className="invalid-feedback"
                            />
                          </div>
                          <div className="mb-3">
                            <Label for="slug" className="form-label">
                              Slug
                            </Label>
                            <Field
                              name="slug"
                              type="text"
                              className={
                                "form-control" +
                                (errors.slug && touched.slug
                                  ? " is-invalid"
                                  : "")
                              }
                            />
                            <ErrorMessage
                              name="slug"
                              component="div"
                              className="invalid-feedback"
                            />
                          </div>

                          <div className="mb-3">
                            <Label for="sort_order" className="form-label">
                              Sort Order
                            </Label>
                            <Field
                              name="sort_order"
                              type="text"
                              className={
                                "form-control" +
                                (errors.sort_order && touched.sort_order
                                  ? " is-invalid"
                                  : "")
                              }
                            />
                            <ErrorMessage
                              name="sort_order"
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
                  <CardTitle className="mb-4">Menu List</CardTitle>

                  <div className="table-responsive">
                    <Table className="table mb-0">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Menu</th>
                          <th>Slug</th>
                          <th>Sort Order</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          menuData
                        }
                      </tbody>
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

Menu.propTypes = {
  addMenu: PropTypes.func,
  editMenu: PropTypes.func,
  menuList: PropTypes.func,
  menuDelete: PropTypes.func,
  menuAddFresh: PropTypes.func,
  menuEditFresh: PropTypes.func,
  menuDeleteFresh: PropTypes.func,
  menuListFresh: PropTypes.func,
  history: PropTypes.object,
  menu_list_data: PropTypes.any,
  menu_list_error: PropTypes.any,
  menu_list_loading: PropTypes.any,
  menu_add_data: PropTypes.any,
  menu_add_error: PropTypes.any,
  menu_add_loading: PropTypes.any,
  menu_edit_data: PropTypes.any,
  menu_edit_error: PropTypes.any,
  menu_edit_loading: PropTypes.any,
  menu_delete_data: PropTypes.any,
  menu_delete_error: PropTypes.any,
  menu_delete_loading: PropTypes.any,
};

const mapStateToProps = state => {
  const {
    menu_list_data,
    menu_list_error,
    menu_list_loading,
    menu_add_data,
    menu_add_error,
    menu_add_loading,
    menu_edit_data,
    menu_edit_error,
    menu_edit_loading,
    menu_delete_data,
    menu_delete_error,
    menu_delete_loading,
  } = state.Menu;
  return {
    menu_list_data,
    menu_list_error,
    menu_list_loading,
    menu_add_data,
    menu_add_error,
    menu_add_loading,
    menu_edit_data,
    menu_edit_error,
    menu_edit_loading,
    menu_delete_data,
    menu_delete_error,
    menu_delete_loading,
  };
};

export default withRouter(
  connect(mapStateToProps, {
    addMenu,
    editMenu,
    menuList,
    menuDelete,
    menuAddFresh,
    menuEditFresh,
    menuDeleteFresh,
    menuListFresh,
  })(Menu)
);
