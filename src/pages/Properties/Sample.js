import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Select from "react-select";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import {
  Card,
  Alert,
  CardBody,
  CardTitle,
  Col,
  Container,
  Row,
  Label,
  Modal,
  Input,
  Button,
  CardHeader,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";

//common
// import TextualInputs from "./TextualInputs"
// import { addContact, contactList } from "../../store/Contacts2/actions";
// Form Editor
import { Link, useHistory, withRouter } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";
import toastr from "toastr";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { propTypes } from "react-bootstrap-editable";
const AnyReactComponent = ({ text }) => <div>{text}</div>;

const PropertyOwnerAdd = props => {
  const [inputFields, setInputFields] = useState([
    { id: Math.round(Math.random() * 10), firstName: "", lastName: "" },
  ]);

  const handleSubmit = e => {
    e.preventDefault();
    console.log("InputFields", inputFields);
  };

  const handleChangeInput = (id, event) => {
    const newInputFields = inputFields.map(i => {
      if (id === i.id) {
        i[event.target.name] = event.target.value;
      }
      return i;
    });

    setInputFields(newInputFields);
  };

  const handleAddFields = () => {
    setInputFields([
      ...inputFields,
      { id: Math.round(Math.random() * 10), firstName: "", lastName: "" },
    ]);
  };

  const handleRemoveFields = id => {
    const values = [...inputFields];
    values.splice(
      values.findIndex(value => value.id === id),
      1
    );
    setInputFields(values);
  };

  return (
    <React.Fragment>
      <div className="mt-5 pt-5">
        <Formik
          // enableReinitialize={true}
          // initialValues={{
          //   reference: (state && state.reference) || "",
          //   manager: (state && state.manager) || "",

          //   building: (state && state.building) || "",
          //   unit: (state && state.unit) || "",
          //   number: (state && state.number) || "",
          //   street: (state && state.street) || "",
          //   suburb: (state && state.suburb) || "",
          //   postcode: (state && state.postcode) || "",
          //   state: (state && state.state) || "",
          //   country: (state && state.country) || "",
          //   primaryType: (state && state.primaryType) || "",
          //   type: (state && state.type) || "",
          //   description: (state && state.description) || "",
          //   floorSize: (state && state.floorSize) || "",
          //   floorArea: (state && state.floorArea) || "",
          //   landSize: (state && state.landSize) || "",
          //   landArea: (state && state.landArea) || "",
          //   keyNumber: (state && state.keyNumber) || "",
          //   strataManager: (state && state.strataManager) || "",
          //   routine_inspections_frequency:
          //     (state && state.routine_inspections_frequency) || "",
          //   routine_inspections_frequency_type:
          //     (state && state.routine_inspections_frequency_type) || "",
          //   note: (state && state.note) || "",
          // }}
          // validationSchema={Yup.object().shape({
          //   reference: Yup.string().required("Please Enter Reference"),
          //   manager: Yup.string().required("Manager Name Redquired"),

          //   building: Yup.string().required("Please Enter Building"),
          //   unit: Yup.string().required("Please Enter Unit"),
          //   number: Yup.number()
          //     .typeError("you must specify a number")
          //     .required("Please Enter Number"),
          //   street: Yup.string().required("Please Enter Street"),
          //   suburb: Yup.string().required("Please Enter Suburb"),
          //   postcode: Yup.string()
          //     .typeError("you must specify a number")
          //     .required("Please Enter Postcode"),
          //   state: Yup.string().required("Please Enter State"),
          //   country: Yup.string().required("Please Enter Country"),

          //   floorSize: Yup.string().required("Floor Size required"),
          //   landSize: Yup.string().required("Land Size Required"),

          //   primaryType: Yup.string().required("Please Enter Primary Type"),
          //   type: Yup.string().required("Please Enter Property Type"),
          //   floorArea: Yup.string().required("Floor Area Required"),
          //   landArea: Yup.string().required("Land Area Required"),
          //   keyNumber: Yup.number()
          //     .typeError("you must specify a number")
          //     .required("Key Number Required"),
          //   strataManager: Yup.string().required("Starta Manager Required"),
          //   routine_inspections_frequency: Yup.number()
          //     .typeError("you must specify a number")
          //     .required("Required"),
          //   note: Yup.string().required("Please Enter Note"),
          // })}
          onSubmit={(values, onSubmitProps) => {
            console.log();
            // dispatch(addProperty(values, state2));
            // dispatch(propertyListFresh());
            // onSubmitProps.resetForm();
          }}
        >
          {({ errors, status, touched }) => (
            <Form className="form-horizontal">
              <h1>Heading</h1>
              {inputFields.map(inputField => (
                <div key={inputField.id}>
                  <div className="mb-3 row">
                    <label
                      htmlFor="example-text-input"
                      className="col-md-2 col-form-label"
                    >
                      Name
                    </label>
                    <div className="col-md-10">
                      <input
                        className="form-control"
                        name="name"
                        value={inputField.name}
                        type="text"
                        defaultValue="Artisanal kale"
                        onChange={event =>
                          handleChangeInput(inputField.id, event)
                        }
                      />
                    </div>
                  </div>
                  <button
                    onClick={handleAddFields}
                    className="btn btn-info w-md"
                    type="submit"
                  >
                    Increase
                  </button>
                  <button
                    onClick={() => handleRemoveFields(inputField.id)}
                    className="btn btn-info w-md"
                    type="submit"
                    disabled={inputFields.length === 1}
                  >
                    Decrease
                  </button>
                </div>
              ))}

              <div className="mt-3">
                <button
                  className="btn btn-info w-md"
                  type="submit"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = gstate => {
  const {
    contacts_list_data,
    contacts_list_error,
    contacts_list_loading,

    contacts_add_loading,

    user_list_data,
    user_list_error,
    user_list_loading,
  } = gstate.Contacts2;
  return {
    contacts_list_data,
    contacts_list_error,
    contacts_list_loading,

    contacts_add_loading,

    user_list_data,
    user_list_error,
    user_list_loading,
  };
};

export default withRouter(connect(mapStateToProps, {})(PropertyOwnerAdd));
