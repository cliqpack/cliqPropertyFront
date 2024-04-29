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
  Badge,
  UncontrolledAlert,
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
import { prmList, prmListFresh } from "store/ACL/PrerequisiteMenu/action";
import {
  planList,
  storePlan,
  storePlanFresh,
  deletePlan,
  deletePlanFresh,
} from "../../../store/ACL/Plan/actions";
import { getMenuPrice, getMenuPriceFresh } from "store/ACL/MenuPrice/action";

const CreatePlan = props => {
  const [state, setState] = useState({ name: "", details: "" });
  const [selected, setSelected] = useState([]);
  const [price, setPrice] = useState(0);
  const [deduct, setDeduct] = useState(false);
  const [prmFrm, setPrmFrm] = useState([]);
  const [selectedName, setSelectedName] = useState();
  const [deleteState, setDeleteState] = useState(false);
  const [deleteId, setDeleteId] = useState("");

  document.title = "Create Plan | My Day";
  useEffect(() => {
    if (props.prm_loading === false) {
      props.prmList();
    }
    if (props.acl_plan_loading === false) {
      props.planList();
    }
    if (props.acl_plan_add_loading == "Success") {
      toastr.success("Plan Added Successfully");
      setState({ name: "", details: "" });
      setPrice(0);
      setSelected([]);
      setSelectedName('');
      // setStateFresh(true);
      props.prmListFresh();
      props.prmList();
      props.planList();
      props.storePlanFresh();
    }
    if (props.get_menu_price_loading == "Success") {
      // console.log(props.get_menu_price_data.menuPrice.price);
      // setState(prev=>({...prev, name: prev.name, details:prev.details}));
      if (deduct && Number(price) > 0) {
        var prices = 0;
        prices =
          Number(price) - Number(props.get_menu_price_data?.menuPrice?.price);
        props.getMenuPriceFresh();
        setPrice(prices);
        setDeduct(false);
      } else {
        var prices = 0;
        prices =
          Number(price) + Number(props.get_menu_price_data?.menuPrice?.price);
        props.getMenuPriceFresh();
        setPrice(prices);
      }
    }
    if (props.acl_plan_delete_loading == "Success") {
      toastr.success("Plan deleted Successfully");
      props.deletePlanFresh();
      props.planList();
    }
    if (props.acl_plan_delete_loading == "Failed") {
      toastr.error("Some User Already Use This Plan");
      props.deletePlanFresh();
    }
  }, [
    props.prm_loading,
    props.acl_plan_loading,
    props.acl_plan_add_loading,
    props.get_menu_price_loading,
    props.acl_plan_delete_loading,
  ]);
  console.log(state);
  const deleteMenu = id => {
    props.deletePlan(id);
    toastr.success("User Plan deleted Successfully");
    setDeleteState(false);
  };

  const getOrdinal = n => {
    let ord = "th";

    if (n % 10 == 1 && n % 100 != 11) {
      ord = "st";
    } else if (n % 10 == 2 && n % 100 != 12) {
      ord = "nd";
    } else if (n % 10 == 3 && n % 100 != 13) {
      ord = "rd";
    }

    return ord;
  };

  var menuData = undefined;
  if (props.acl_plan_data != null) {
    menuData = props.acl_plan_data.menu_plan.map((item, key) => (
      <tr key={key}>
        <th scope="row">{key + 1}</th>
        <td>{item.name}</td>
        <td>
          {item.details?.map((items, keys) => items.menu.menu_title + ", ")}
        </td>
        <td>{item.price}৳</td>
        <td>
          <button
            type="submit"
            className="btn btn-danger w-md"
            onClick={() => {
              setDeleteId(item.id);
              setDeleteState(prev => !prev);
            }}
          >
            Delete
          </button>
        </td>
      </tr>
    ));
  }

  const checkMenu = (id, pre_details) => {
    var selected_id = selected;

    if (pre_details.length > 0) {
      var statet = false;
      var pre_state = true;
      var idx = -2;
      var status = false;
      pre_details.map((item, key) => {
        status = selected_id.includes(item.menu_id);
        idx = selected_id.indexOf(id);
        console.log(idx);
        console.log(status);
        if (status != true) {
          var prm_t = prmFrm;
          console.log(prm_t);
          var state_prm = prm_t?.prm_t?.includes(item.pre_menu.menu_title);
          console.log(state_prm);
          if (state_prm != true) {
            prm_t.push(item.pre_menu.menu_title);
            prm_set(prm_t);
          }

          statet = false;
          pre_state = false;
        } else if (idx == -1) {
          statet = true;
          pre_state = true;
        }
      });
      if (statet && pre_state) {
        props.getMenuPrice(id);
        selected_id.push(id);
        setSelected(selected_id);
        document.getElementById(id).style.border = "2px solid #159B9C";
        document.getElementById("btn" + id).style.display = "none";
        document.getElementById("loader" + id).style.display = "block";
        setTimeout(() => {
          document.getElementById("btn" + id).innerHTML = "Uninstall";
          document.getElementById("btn" + id).style.display = "block";
          document.getElementById("loader" + id).style.display = "none";
        }, 2000);
      } else if (statet == false && pre_state != false) {
        console.log(idx);
        selected_id.splice(idx, 1);
        setSelected(selected_id);
        props.getMenuPrice(id);
        document.getElementById(id).style.border = "1px solid #ced4da";
        document.getElementById("btn" + id).style.display = "none";
        document.getElementById("loader" + id).style.display = "block";
        setTimeout(() => {
          document.getElementById("btn" + id).innerHTML = "Install";
          document.getElementById("btn" + id).style.display = "block";
          document.getElementById("loader" + id).style.display = "none";
        }, 2000);
        setDeduct(true);
      }
    } else {
      var idx = selected_id.indexOf(id);
      console.log("====================================");
      console.log(idx);
      console.log("====================================");
      if (idx == -1) {
        props.getMenuPrice(id);
        selected_id.push(id);
        setSelected(selected_id);
        document.getElementById(id).style.border = "2px solid #159B9C";
        document.getElementById("btn" + id).style.display = "none";
        document.getElementById("loader" + id).style.display = "block";
        setTimeout(() => {
          document.getElementById("btn" + id).innerHTML = "Uninstall";
          document.getElementById("btn" + id).style.display = "block";
          document.getElementById("loader" + id).style.display = "none";
        }, 2000);
      } else {
        console.log(idx);
        selected_id.splice(idx, 1);
        setSelected(selected_id);
        props.getMenuPrice(id);
        document.getElementById(id).style.border = "1px solid #ced4da";
        document.getElementById("btn" + id).style.display = "none";
        document.getElementById("loader" + id).style.display = "block";
        setTimeout(() => {
          document.getElementById("btn" + id).innerHTML = "Install";
          document.getElementById("btn" + id).style.display = "block";
          document.getElementById("loader" + id).style.display = "none";
        }, 2000);
        setDeduct(true);
      }
    }

    console.log(id);
    console.log(selected);
  };

  const prm_set = prm_t => {
    setPrmFrm({ ...prmFrm, prm_t });
    setTimeout(() => {
      clr_prm_set();
    }, 4000);
  };

  const clr_prm_set = () => {
    setPrmFrm([]);
  };

  var style = {
    borderRadius: "10px",
    minHeight: "100px",
    border: "1px solid #ced4da",
  };

  var style_selected = {
    borderRadius: "10px",
    minHeight: "100px",
    border: "2px solid #159B9C",
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="Forms" breadcrumbItem="Create Plan" />
          <Row>
            <Col lg={6}>
              <Card>
                <CardBody>
                  <CardTitle className="mb-4">Create Plan</CardTitle>

                  <div className="p-2">
                    {props.error ? (
                      <Alert color="danger">
                        {JSON.stringify(props.error.response.data.message)}
                      </Alert>
                    ) : null}
                    <Formik
                      enableReinitialize={true}
                      initialValues={{
                        name: (state && state.name) || "",
                        details: (state && state.details) || "",
                        price: price || "",
                      }}
                      validationSchema={Yup.object().shape({
                        name: Yup.string().required("Please Enter Name"),
                        details: Yup.string().required("Please Enter details"),
                        price: Yup.number()
                          .typeError("Amount must be a number")
                          .required("Please Enter details")
                          .min(0, "Too little"),
                      })}
                      onSubmit={(values, onSubmitProps) => {
                        props.storePlan(values, selected, price);
                        onSubmitProps.resetForm();
                        console.log(values);
                      }}
                    >
                      {({ errors, status, touched }) => (
                        <Form className="form-horizontal">
                          <div className="mb-3">
                            <Label for="name" className="form-label">
                              Name
                            </Label>
                            <Field
                              name="name"
                              type="text"
                              className={
                                "form-control" +
                                (errors.name && touched.name
                                  ? " is-invalid"
                                  : "")
                              }
                              onChange={e =>
                                setState(prev => ({
                                  ...prev,
                                  name: e.target.value,
                                }))
                              }
                            />
                            <ErrorMessage
                              name="name"
                              component="div"
                              className="invalid-feedback"
                            />
                          </div>
                          <div className="mb-3">
                            <Label for="details" className="form-label">
                              Details
                            </Label>
                            <Field
                              name="details"
                              type="text"
                              className={
                                "form-control" +
                                (errors.details && touched.details
                                  ? " is-invalid"
                                  : "")
                              }
                              onChange={e =>
                                setState(prev => ({
                                  ...prev,
                                  details: e.target.value,
                                }))
                              }
                            />
                            <ErrorMessage
                              name="details"
                              component="div"
                              className="invalid-feedback"
                            />
                          </div>
                          <div className="mb-3">
                            <Label for="details" className="form-label">
                              Price
                            </Label>
                            <Field
                              name="price"
                              type="number"
                              className={
                                "form-control" +
                                (errors.price && touched.price
                                  ? " is-invalid"
                                  : "")
                              }
                              value={price}
                              onChange={e => {
                                setPrice(e.target.value);
                              }}
                            />
                            <ErrorMessage
                              name="price"
                              component="div"
                              className="invalid-feedback"
                            />
                          </div>
                          <div className="mt-5">
                            <Row>
                              <Col xl="12" sm="12">
                                {/* {console.log(prmFrm)} */}
                                {prmFrm?.prm_t?.map((item, key) => (
                                  <UncontrolledAlert
                                    color="danger"
                                    className="alert-dismissible fade show"
                                    role="alert"
                                    key={key}
                                    toggle={() => {
                                      setPrmFrm([]);
                                    }}
                                  >
                                    <i className="mdi mdi-block-helper me-2"></i>
                                    Please add <b>{item}</b> at{" "}
                                    <b>
                                      {key + 1}
                                      {getOrdinal(key + 1)}
                                    </b>{" "}
                                    position before select <b>{selectedName}</b>
                                  </UncontrolledAlert>
                                ))}
                              </Col>
                              {props.prm_data?.preRequisiteMenu.map(
                                (item, key) => (
                                  <Col
                                    xl="6"
                                    sm="12"
                                    md={4}
                                    key={"_col_" + key}
                                  >
                                    <Card
                                      className="mini-stats-wid"
                                      id={item.menu.id}
                                      style={style}
                                    >
                                      <CardBody>
                                        <div className="d-flex">
                                          <div className="flex-grow-1">
                                            <p className="text-muted fw-medium">
                                              {item.menu.menu_title}
                                            </p>
                                            {/* <h4 className="mb-0">
                                                {"install"}
                                              </h4> */}
                                            <button
                                              id={"btn" + item.menu.id}
                                              className="btn btn-primary"
                                              type="button"
                                              onClick={() => {
                                                checkMenu(
                                                  item.menu.id,
                                                  item.pre_requisite_menu_detail
                                                );
                                                setSelectedName(
                                                  item.menu.menu_title
                                                );
                                              }}
                                            >
                                              Install
                                            </button>
                                            <div
                                              className="spinner-border text-primary m-1"
                                              role="status"
                                              id={"loader" + item.menu.id}
                                              style={{ display: "none" }}
                                            >
                                              <span className="sr-only">
                                                Loading...
                                              </span>
                                            </div>
                                          </div>
                                          <div className="mini-stat-icon avatar-sm rounded-circle bg-primary align-self-center">
                                            <span className="avatar-title">
                                              {item.menu.slug ==
                                                "propertylist" && (
                                                <i className="bx bx-building-house font-size-24" />
                                              )}
                                              {item.menu.slug ==
                                                "contactList" && (
                                                <i className="bx bxs-contact font-size-24" />
                                              )}
                                              {item.menu.slug ==
                                                "inspections" && (
                                                <i className="bx bx-search-alt-2 font-size-24" />
                                              )}
                                              {item.menu.slug == "listing" && (
                                                <i className="bx bxs-spreadsheet font-size-24" />
                                              )}
                                              {item.menu.slug ==
                                                "maintenance" && (
                                                <i className="bx bx-briefcase-alt font-size-24" />
                                              )}
                                              {item.menu.slug == "tasks" && (
                                                <i className="bx bx-task font-size-24" />
                                              )}
                                              {item.menu.slug == "messages" && (
                                                <i className="bx bx-message font-size-24" />
                                              )}
                                            </span>
                                          </div>
                                        </div>
                                      </CardBody>
                                    </Card>
                                  </Col>
                                )
                              )}
                            </Row>
                          </div>

                          <div className="mt-3">
                            <button className="btn btn-info w-md" type="submit">
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
                  <CardTitle className="mb-4">Plan List</CardTitle>

                  <div className="table-responsive">
                    <Table className="table mb-0">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>plan</th>
                          <th>addons</th>
                          <th>Price</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>{menuData}</tbody>
                    </Table>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <DeleteModal
            show={deleteState}
            onDeleteClick={() => deleteMenu(deleteId)}
            onCloseClick={() => setDeleteState(false)}
          />
        </Container>
        {/* container-fluid */}
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  const {
    acl_plan_data,
    acl_plan_loading,
    acl_plan_error,

    acl_plan_add_data,
    acl_plan_add_loading,
    acl_plan_add_error,

    acl_plan_delete_data,
    acl_plan_delete_loading,
    acl_plan_delete_error,
  } = state.Plan;
  const { get_menu_price_data, get_menu_price_loading, get_menu_price_error } =
    state.MenuPrice;
  const { prm_data, prm_loading, prm_error } = state.Prm;
  return {
    prm_data,
    prm_loading,
    prm_error,

    get_menu_price_data,
    get_menu_price_loading,
    get_menu_price_error,

    acl_plan_data,
    acl_plan_loading,
    acl_plan_error,

    acl_plan_add_data,
    acl_plan_add_loading,
    acl_plan_add_error,

    acl_plan_delete_data,
    acl_plan_delete_loading,
    acl_plan_delete_error,
  };
};

export default withRouter(
  connect(mapStateToProps, {
    prmList,
    planList,
    prmListFresh,
    storePlan,
    storePlanFresh,
    deletePlan,
    deletePlanFresh,
    getMenuPrice,
    getMenuPriceFresh,
  })(CreatePlan)
);
