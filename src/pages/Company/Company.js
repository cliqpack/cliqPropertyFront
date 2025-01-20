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
  addCompany,
  companyList,
  deleteCompany,
  companyAddFresh,
  companyListFresh,
  companyDeleteFresh

} from "../../store/Company/actions";

import { Link, withRouter } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import toastr from "toastr";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { propTypes } from "react-bootstrap-editable";

const Company = props => {
  const [state, setState] = useState();
  document.title = "CliqProperty";
  useEffect(() => {





    if (props.company_add_loading == "Success") {
      props.companyList()
      props.companyAddFresh()
      toastr.success(props.company_list_data.data.message);
      props.companyListFresh();
      setState(undefined);
    }

    else if (props.company_delete_loading == "Success") {
      props.companyList();
      props.companyDeleteFresh()
      toastr.success("Success");

    }


    if (props.company_list_loading == false) {

      props.companyList()
    }










  }, [props]);

  var companyData = undefined;
  if (props.company_list_data) {
    console.log(props.company_list_data)

    companyData = props.company_list_data.data.data.companies.map((item, key) => (
      <tr key={key}>
        <th scope="row">{key + 1}</th>
        <td>{item.company_name}</td>
        <td>{item.address}</td>
        <td>{item.phone}</td>
        <td>
          <button type="submit" className="btn btn-danger w-md" onClick={() => deleteCompany(item.id)}>
            Delete Menu
          </button>
        </td>
      </tr>
    ));
  }
  const deleteCompany = (id) => {
    props.deleteCompany(id);
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
                  <CardTitle className="mb-4">Add Company</CardTitle>

                  <div className="p-2">
                    {props.error ? (
                      <Alert color="danger">
                        {JSON.stringify(props.error.response.data.message)}
                      </Alert>
                    ) : null}
                    <Formik
                      enableReinitialize={true}
                      initialValues={{
                        company: (state && state.company) || "",
                        address: (state && state.address) || "",
                        phone: (state && state.phone) || "",
                      }}
                      validationSchema={Yup.object().shape({
                        company: Yup.string().required("Please Enter Company"),
                        address: Yup.string().required("Please Enter Address"),
                        phone: Yup.string().required("Please Enter Phone"),
                      })}
                      onSubmit={(values, onSubmitProps) => {
                        props.addCompany(values);
                        onSubmitProps.resetForm();
                      }}




                    >
                      {({ errors, status, touched }) => (
                        <Form className="form-horizontal">
                          <div className="mb-3">
                            <Label for="company" className="form-label">
                              Company
                            </Label>
                            <Field
                              name="company"
                              type="text"
                              className={
                                "form-control" +
                                (errors.company && touched.company
                                  ? " is-invalid"
                                  : "")
                              }
                            />
                            <ErrorMessage
                              name="company"
                              component="div"
                              className="invalid-feedback"
                            />
                          </div>
                          <div className="mb-3">
                            <Label for="address" className="form-label">
                              Address
                            </Label>
                            <Field
                              name="address"
                              type="text"
                              className={
                                "form-control" +
                                (errors.address && touched.address
                                  ? " is-invalid"
                                  : "")
                              }
                            />
                            <ErrorMessage
                              name="address"
                              component="div"
                              className="invalid-feedback"
                            />
                          </div>
                          <div className="mb-3">
                            <Label for="phone" className="form-label">
                              Phone
                            </Label>
                            <Field
                              name="phone"
                              type="text"
                              className={
                                "form-control" +
                                (errors.phone && touched.phone
                                  ? " is-invalid"
                                  : "")
                              }
                            />
                            <ErrorMessage
                              name="phone"
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
                  <CardTitle className="mb-4">Company List</CardTitle>

                  <div className="table-responsive">
                    <Table className="table mb-0">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Company</th>
                          <th>Address</th>
                          <th>Phone</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          companyData
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

// Menu.propTypes = {
//   addMenu: PropTypes.func,
//   editMenu: PropTypes.func,
//   menuList: PropTypes.func,
//   menuDelete: PropTypes.func,
//   menuAddFresh: PropTypes.func,
//   menuEditFresh: PropTypes.func,
//   menuDeleteFresh: PropTypes.func,
//   menuListFresh: PropTypes.func,
//   history: PropTypes.object,
//   menu_list_data: PropTypes.any,
//   menu_list_error: PropTypes.any,
//   menu_list_loading: PropTypes.any,
//   menu_add_data: PropTypes.any,
//   menu_add_error: PropTypes.any,
//   menu_add_loading: PropTypes.any,
//   menu_edit_data: PropTypes.any,
//   menu_edit_error: PropTypes.any,
//   menu_edit_loading: PropTypes.any,
//   menu_delete_data: PropTypes.any,
//   menu_delete_error: PropTypes.any,
//   menu_delete_loading: PropTypes.any,
// };

const mapStateToProps = gstate => {
  const {
    company_list_data,
    company_list_loading,
    company_add_loading,
    company_delete_loading,
    company_delete_data



  } = gstate.company;
  return {
    company_list_data,
    company_list_loading,
    company_add_loading,
    company_delete_loading,
    company_delete_data


  };
};

export default withRouter(
  connect(mapStateToProps, {
    addCompany,
    companyList,
    deleteCompany,
    companyAddFresh,
    companyListFresh,
    deleteCompany,
    companyDeleteFresh
  })(Company)
);
