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
  addRoute,
  editModule,
  moduleDelete,
  moduleRouteList,
  moduleRouteDelete,
  moduleAddFresh,
  moduleEditFresh,
  moduleRouteDeleteFresh,
  moduleRouteListFresh,
  getModule,
  moduleListFresh,
} from "../../../store/actions";
import { menuList } from "../../../store/ACL/menu/actions";
import Select from "react-select";

import { Link, withRouter } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import toastr from "toastr";

//Import Breadcrumb
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import { propTypes } from "react-bootstrap-editable";

const Modules = props => {
  const [state, setState] = useState();
  const [selectedGroup, setSelectedGroup] = useState();
  const [togState, setTogState] = useState(false);
  const [route, setRoute] = useState();

  useEffect(() => {
    console.log(props);

    if (props.module_route_add_loading === "Success") {
      toastr.success("Module Route Added Successfully");
      props.moduleAddFresh();
    } else if (props.module_route_add_loading === "Faild") {
      toastr.error("Module Route Added Failed");
      props.moduleAddFresh();
    } else if (props.menu_list_loading === false) {
      console.log("list");
      props.moduleAddFresh();
      props.menuList();
    } else if (props.module_route_delete_loading === "Success") {
      toastr.success("Module Route Delete Successfully");
      props.moduleRouteDeleteFresh();
    } else if (props.module_route_delete_loading === "Faild") {
      toastr.error("Module Route Delete Failed");
      props.moduleRouteDeleteFresh();
    }
  }, [props]);

  const handleSelectGroup = selectedGroup => {
    console.log(selectedGroup);
    setSelectedGroup(selectedGroup);
    props.getModule(selectedGroup);
  };

  const tog_standard = route => {
    setTogState(prevTogState => !prevTogState);
    props.moduleRouteListFresh();
    removeBodyCss();
    setRoute(route);
    props.moduleRouteList(route.id);
  };
  const removeBodyCss = () => {
    document.body.classList.add("no_padding");
  };
  const moduleRouteDelete = id => {
    props.moduleRouteDelete(id);
    props.moduleRouteList(route.id);
  };
  const moduleDelete = id => {
    props.moduleDelete(id);
    props.getModule(selectedGroup);
  };

  var moduleData = undefined;
  var menuData = "";
  var optionGroup = undefined;
  var moduleRouteData = undefined;

  if (props.module_get_loading === "Success") {
    moduleData = props.module_get_data.map((item, key) => (
      <tr key={key}>
        <td>{key + 1}</td>
        <td>{item.name}</td>
        <td>
          <button
            type="button"
            onClick={() => tog_standard(item)}
            className="btn btn-info"
            data-toggle="modal"
            data-target="#myModal"
          >
            Add Route
          </button>
          <button
            type="button"
            onClick={() => moduleDelete(item.id)}
            className="btn btn-danger"
          >
            Delete
          </button>
        </td>
      </tr>
    ));
  }

  if (props.module_route_list_loading === "Success") {
    moduleRouteData = props.module_route_list_data.data.map((item, key) => (
      <tr key={key}>
        <td>{key + 1}</td>
        <td>{item.route}</td>
        <td>
          <button
            type="button"
            onClick={() => moduleRouteDelete(item.id)}
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
  if (props.module_delete_loading === "Success") {
    toastr.success("Module Delete Successfull");
  } else if (props.module_delete_loading === "Failed") {
    toastr.error("Module Delete Successfull");
  }

  //meta title
  document.title = "Module | My Day";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="Forms" breadcrumbItem="Modules" />
          <Row>
            <Col lg={6}>
              <Card>
                <CardBody>
                  <CardTitle className="mb-4">Modules</CardTitle>
                  {optionGroup != [] ? (
                    <Select
                      value={selectedGroup}
                      onChange={handleSelectGroup}
                      options={optionGroup}
                      classNamePrefix="select2-selection"
                    />
                  ) : null}
                </CardBody>
              </Card>
            </Col>

            <Col lg={6}>
              <Card>
                <CardBody>
                  <CardTitle className="mb-4">Module List</CardTitle>

                  <div className="table-responsive">
                    <Table className="table mb-0">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Module</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>{moduleData}</tbody>
                    </Table>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Modal isOpen={togState} toggle={tog_standard}>
            <div className="modal-header">
              <h5 className="modal-title mt-0" id="myModalLabel">
                {selectedGroup ? selectedGroup.label : null} ({" "}
                {route ? route.name : null}) Module Routes
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
                  <div className="p-2">
                    {props.error ? (
                      <Alert color="danger">
                        {JSON.stringify(props.error.response.data.message)}
                      </Alert>
                    ) : null}
                    <Formik
                      enableReinitialize={true}
                      initialValues={{
                        route: (state && state.route) || "",
                      }}
                      validationSchema={Yup.object().shape({
                        route: Yup.string().required("Please Enter Route"),
                      })}
                      onSubmit={values => {
                        props.addRoute(values, route.id);
                        props.moduleRouteList(route.id);
                      }}
                    >
                      {({ errors, status, touched }) => (
                        <Form className="form-horizontal">
                          <div className="mb-3">
                            <Label for="route" className="form-label">
                              Route
                            </Label>
                            <Field
                              name="route"
                              type="text"
                              className={
                                "form-control" +
                                (errors.route && touched.route
                                  ? " is-invalid"
                                  : "")
                              }
                            />
                            <ErrorMessage
                              name="route"
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
                </Col>
              </Row>
              <Row>
                <Col lg={12}>
                  <Card>
                    <CardBody>
                      <CardTitle className="mb-4">Route List</CardTitle>

                      <div className="table-responsive">
                        <Table className="table mb-0">
                          <thead>
                            <tr>
                              <th>#</th>
                              <th>Route</th>
                              <th>Actions</th>
                            </tr>
                          </thead>
                          <tbody>{moduleRouteData}</tbody>
                        </Table>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                onClick={tog_standard}
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
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

Modules.propTypes = {
  addRoute: PropTypes.func,
  editModule: PropTypes.func,
  moduleRouteList: PropTypes.func,
  moduleRouteDelete: PropTypes.func,
  moduleAddFresh: PropTypes.func,
  moduleEditFresh: PropTypes.func,
  moduleRouteDeleteFresh: PropTypes.func,
  moduleRouteListFresh: PropTypes.func,
  history: PropTypes.object,
  module_route_list_data: PropTypes.any,
  module_route_list_error: PropTypes.any,
  module_route_list_loading: PropTypes.any,
  module_route_add_data: PropTypes.any,
  module_route_add_error: PropTypes.any,
  module_route_add_loading: PropTypes.any,
  module_get_data: PropTypes.any,
  module_get_error: PropTypes.any,
  module_get_loading: PropTypes.any,
  module_delete_data: PropTypes.any,
  module_delete_error: PropTypes.any,
  module_delete_loading: PropTypes.any,
  module_edit_data: PropTypes.any,
  module_edit_error: PropTypes.any,
  module_edit_loading: PropTypes.any,
  module_route_delete_data: PropTypes.any,
  module_route_delete_error: PropTypes.any,
  module_route_delete_loading: PropTypes.any,

  menuList: PropTypes.func,
  history: PropTypes.object,
  menu_list_data: PropTypes.any,
  menu_list_error: PropTypes.any,
  menu_list_loading: PropTypes.any,
};
const mapStateToProps = state => {
  const {
    module_route_list_data,
    module_route_list_error,
    module_route_list_loading,
    module_route_add_data,
    module_route_add_error,
    module_route_add_loading,
    module_get_data,
    module_get_error,
    module_get_loading,
    module_delete_data,
    module_delete_error,
    module_delete_loading,
    module_edit_data,
    module_edit_error,
    module_edit_loading,
    module_route_delete_data,
    module_route_delete_error,
    module_route_delete_loading,
  } = state.Modules;
  const { menu_list_data, menu_list_error, menu_list_loading } = state.Menu;
  return {
    module_route_list_data,
    module_route_list_error,
    module_route_list_loading,
    module_route_add_data,
    module_route_add_error,
    module_route_add_loading,
    module_get_data,
    module_get_error,
    module_get_loading,
    module_delete_data,
    module_delete_error,
    module_delete_loading,
    module_edit_data,
    module_edit_error,
    module_edit_loading,
    module_route_delete_data,
    module_route_delete_error,
    module_route_delete_loading,
    menu_list_data,
    menu_list_error,
    menu_list_loading,
  };
};

export default withRouter(
  connect(mapStateToProps, {
    addRoute,
    editModule,
    moduleDelete,
    moduleRouteList,
    moduleRouteDelete,
    moduleAddFresh,
    moduleEditFresh,
    moduleRouteDeleteFresh,
    moduleRouteListFresh,
    menuList,
    getModule,
    moduleListFresh,
  })(Modules)
);
