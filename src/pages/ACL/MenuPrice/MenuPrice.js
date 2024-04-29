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
import { MenuListData } from "store/Menu/action";
import {
  menuPriceList,
  AddMenuPrice,
  addMenuPriceFresh,
  deleteMenuPrice,
} from "store/ACL/MenuPrice/action";

const MenuPrice = props => {
  const [state, setState] = useState();
  const [deleteState, setDeleteState] = useState(false);
  const [deleteId, setDeleteId] = useState('');

  document.title = "CliqProperty";
  useEffect(() => {
    if (props.menu_price_loading === false) {
      props.menuPriceList();
    }
    if (props.menu_price_add_loading == "Success") {
      toastr.success("Plan Added Successfully");
      props.menuPriceList();
      props.addMenuPriceFresh();
    }
  }, [props.menu_price_loading, props.menu_price_add_loading]);

  const deleteMenu = id => {
    props.deleteMenuPrice(id);
    toastr.success("Addon price deleted Successfully");
    setDeleteState(false);
  };

  var menuData = undefined;
  var menuPrice = undefined;
  if (props.menu_price_data != null) {

    menuPrice = props.menu_price_data?.menuPrice?.map((item, key) => (
      <tr key={key}>
        <th scope="row">{key + 1}</th>
        <td>{item.menu.menu_title}</td>
        <td>{item.price}৳</td>
        <td>
          <button
            type="submit"
            className="btn btn-danger w-md"
            onClick={() => { setDeleteId(item.id); setDeleteState(prev => !prev) }}
          >
            Delete
          </button>
        </td>
      </tr>
    ));
  }

  if (props.menu_loading == "Success") {
    menuData = props.menu_data.data.map((item, key) => (
      <option key={key} value={item.id}>
        {item.menu_title}
      </option>
    ));
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="Forms" breadcrumbItem="Addons Price" />
          <Row>
            <Col lg={6}>
              <Card>
                <CardBody>
                  <CardTitle className="mb-4">Create Addons Price</CardTitle>

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
                        price: (state && state.price) || "",
                      }}
                      validationSchema={Yup.object().shape({
                        menu: Yup.string().required("Please Enter Menu"),
                        price: Yup.string().required("Please Enter price"),
                      })}
                      onSubmit={(values, onSubmitProps) => {
                        props.AddMenuPrice(values);
                        onSubmitProps.resetForm();
                        console.log(values);
                      }}
                    >
                      {({ errors, status, touched }) => (
                        <Form className="form-horizontal">
                          <div className="mb-3">
                            <Label for="name" className="form-label">
                              Addons
                            </Label>
                            <Field
                              as="select"
                              name="menu"
                              className="form-select"
                            >
                              <option>Select Addons...</option>
                              {menuData}
                            </Field>
                            <ErrorMessage
                              name="name"
                              component="div"
                              className="invalid-feedback"
                            />
                          </div>

                          <div className="mb-3">
                            <Label for="name" className="form-label">
                              Price
                            </Label>
                            <Field
                              name="price"
                              type="text"
                              className={
                                "form-control" +
                                (errors.price && touched.price
                                  ? " is-invalid"
                                  : "")
                              }
                            />
                            <ErrorMessage
                              name="price"
                              component="div"
                              className="invalid-feedback"
                            />
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
                  <CardTitle className="mb-4">Addons Price List</CardTitle>

                  <div className="table-responsive">
                    <Table className="table mb-0">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Addon</th>
                          <th>Price</th>
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
  const { menu_data, menu_loading, menu_error } = state.MenuList;
  const {
    menu_price_data,
    menu_price_loading,
    menu_price_error,

    menu_price_add_data,
    menu_price_add_loading,
    menu_price_add_error,
  } = state.MenuPrice;
  return {
    menu_data,
    menu_loading,
    menu_error,

    menu_price_data,
    menu_price_loading,
    menu_price_error,

    menu_price_add_data,
    menu_price_add_loading,
    menu_price_add_error,
  };
};

export default withRouter(
  connect(mapStateToProps, {
    MenuListData,
    menuPriceList,
    AddMenuPrice,
    addMenuPriceFresh,
    deleteMenuPrice,
  })(MenuPrice)
);
