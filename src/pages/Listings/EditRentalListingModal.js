import React, { useEffect, useState } from "react";
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
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  FormText, UncontrolledAlert,

} from "reactstrap";
import { connect } from "react-redux";
import Select from "react-select";

import {
  contactList,
  rentalListingUpdate,
  rentalListingUpdateFresh,
  rentalListingFresh, ListingsInfoFresh
} from "store/actions";

import toastr from "toastr";
import { useHistory } from "react-router-dom";
import Loder from "components/Loder/Loder";
import "flatpickr/dist/themes/material_blue.css"
import Flatpickr from "react-flatpickr"

const EditRentalListingModal = props => {
  const DUMMY_DATA = {
    primary_listing_agent: "",
    secondary_listing_agent: "",
    available_date: "",
    rent_per_week: "",
    display_rent: 1,
    bond: "",
  };

  const [disable, setDisable] = useState(true)
  const history = useHistory();
  const [inspectionModal, setInspectionModal] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedSecondaryGroup, setSelectedSecondaryGroup] = useState(null);
  const [optionGroup, setOptionGroup] = useState();
  const [optionGroupState, setOptionGroupState] = useState(true);

  const [displayYesRentBtn, setDisplayYesRentBtn] = useState(true);
  const [displayNoRentBtn, setDisplayNoRentBtn] = useState(false);

  const [state, setState] = useState({
    display_rent: 1
  });
  console.log(state);

  const [showAlert, setShowAlert] = useState(false)
  console.log(showAlert);

  const [stateStatus, setStateStatus] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const toggle = () => setInspectionModal(!inspectionModal);

  const toggleDisplayNoBtn = () => {
    setState({ ...state, display_rent: 0 });
    setDisplayNoRentBtn(true);
    setDisplayYesRentBtn(false);
  };
  const toggleDisplayYesBtn = () => {
    setState({ ...state, display_rent: 1 });
    setDisplayYesRentBtn(true);
    setDisplayNoRentBtn(false);
  };
  // console.log(props.rental_listing_update_loading);

  const handleSubmit = e => {
    e.preventDefault();
    setShowModal(true);
    props.rentalListingUpdate(state, props.listing_id);
    props.rentalListingFresh();

    // else {

    // }
  };

  useEffect(() => {
    if (props.contacts_list_loading === false) {
      // props.contactList();
    }

    if (props.rental_listing_update_loading == "Success") {
      toastr.success("Update Successfully");
      props.rentalListingUpdateFresh();
      props.ListingsInfoFresh()
      setShowModal(false)
    }
  }, [props.contacts_list_loading, props.rental_listing_update_loading]);

  const handleFormValues = e => {
    console.log(e.target.name);

    if (e.target.name == 'rent_per_week') {

      if (Number(e.target.value) < 199) {

        setShowAlert(true)
        setState({
          ...state,
          [e.target.name]: e.target.value,
        });
      } else {
        setShowAlert(false)
        setState({
          ...state,
          [e.target.name]: e.target.value,
        });
      }
    } else {
      setShowAlert(false)
      setState({
        ...state,
        [e.target.name]: e.target.value,
      });

    }


  };


  const handleRent = e => {
    if (Number(e.target.value) < 199) {
      toastr.warning('Rent has to be equal or greater than 200')
    } else {
      return
      // setState({
      //   ...state,
      //   [e.target.name]: e.target.value,
      // });
    }
  }

  const handlePrimarySelectGroup = e => {
    setSelectedGroup(e);
    setState({
      ...state,
      primary_listing_agent: e.value,
    });
  };
  const handleSecondarySelectGroup = e => {
    setSelectedSecondaryGroup(e);
    setState({
      ...state,
      secondary_listing_agent: e.value,
    });
  };

  let option;
  if (props.contacts_list_data && optionGroupState) {
    option = props.contacts_list_data.data.map(item => ({
      options: [{ label: item.reference, value: item.id }],
    }));

    setOptionGroup(option);
    setOptionGroupState(false);
  }

  let rentalData;
  if (props.rentalListingData !== null && stateStatus === true) {
    rentalData = props.rentalListingData;
    setState({
      ...state,
      primary_listing_agent: rentalData.listing_agent_primary,
      secondary_listing_agent: rentalData.listing_agent_secondary,
      available_date: rentalData.date_available,
      rent_per_week: rentalData.rent,
      display_rent: rentalData.display_rent,
      bond: rentalData.bond,
    });
    setStateStatus(false);
  }

  let userData;
  if (props.user_list_data) {
    userData = props.user_list_data?.data?.map((item, key) => (
      <option key={key} value={item.id}>
        {item.first_name + " " + item.last_name}
      </option>
    ));
  }

  const dateHandler = (selectedDates, dateStr, instance) => {
    console.log(dateStr);
    setState({ ...state, available_date: dateStr })

  }


  const disableHandler = () => {
    if (state.available_date == null) {
      return setDisable
    } else if (state.rent == null) {
      return true

    } else if (state.bond == null) {
      return true

    } else {
      return false
    }
  }


  return (
    <>
      <Button className="btn" color="info" onClick={toggle}>
        <i className="fas fa-pen font-size-12"></i>
      </Button>
      <Loder status={showModal} />
      {/* ===============Inspection modal start from here ================*/}

      <Modal size="lg" isOpen={inspectionModal} toggle={toggle}>
        <ModalHeader toggle={toggle}>
          <span className="text-info">Edit Rental Listing Detail</span>
        </ModalHeader>

        <ModalBody>
          <Form className="form p-3">
            <FormGroup row>
              <Label for="primary_listing_agent" sm={3}>
                Listing agent (primary)
              </Label>
              <Col sm={7}>
                {/* <Select
                                    value={userData}
                                    onChange={handlePrimarySelectGroup}
                                    options={userData}
                                    classNamePrefix="select2-selection"
                                /> */}
                <select
                  name="primary_listing_agent"
                  value={state.primary_listing_agent}
                  className="form-select"
                  onChange={handleFormValues}
                >
                  <option>Choose..</option>
                  {userData}
                </select>
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label for="secondary_listing_agent" sm={3}>
                Listing agent (secondary)
              </Label>
              <Col sm={7}>
                <select
                  name="secondary_listing_agent"
                  value={state.secondary_listing_agent}
                  className="form-select"
                  onChange={handleFormValues}
                >
                  <option>Choose..</option>
                  {userData}
                </select>
              </Col>
            </FormGroup>

            {/* <FormGroup row>
              <Label for="available_date" sm={3}>
                Date Available
              </Label>
              <Col sm={4}>
                <input
                  className="form-control"
                  type="date"
                  onChange={handleFormValues}
                  value={state.available_date}
                  name="available_date"
                  id="available_date"
                />
              </Col>
            </FormGroup> */}
            <FormGroup row>
              <Label for="exampleSelect" md={3}>
                Date
              </Label>
              <Col md={4}>
                <div className="">
                  <Flatpickr
                    className="form-control d-block"
                    placeholder="Pick a Date..."
                    value={state.available_date}
                    // onChange={() => dateHandler()}
                    options={{
                      altInput: true,
                      format: "d/m/Y",
                      altFormat: "d/m/Y",
                      onChange: dateHandler
                    }}
                  />
                </div>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="rent_per_week" sm={3}>
                Rent
              </Label>
              <Col sm={9} className="d-flex flex-column">
                <div className="pb-2 d-flex">
                  <input
                    className="form-control w-25"
                    type="text"
                    // onBlur={handleRent}
                    onChange={handleFormValues}
                    value={state.rent_per_week}
                    name="rent_per_week"
                    id="rent_per_week"
                  />
                  <div className="d-flex align-items-center ms-2">per week</div>
                </div>

                {showAlert &&
                  <UncontrolledAlert color="danger" role="alert">
                    Rent has to be equal or greater than 200
                  </UncontrolledAlert>
                }

              </Col>

            </FormGroup>
            <FormGroup row>
              <Label for="display_rent" sm={3}>
                Display Rent
              </Label>
              <Col md={4}>
                <div className="btn-group btn-group-justified">
                  <div className="btn-group">
                    <Button
                      color={displayYesRentBtn ? "secondary" : "light"}
                      onClick={toggleDisplayYesBtn}
                    >
                      {displayYesRentBtn ? (
                        <i className="bx bx-comment-check"></i>
                      ) : null}
                      <span> Yes</span>
                    </Button>
                  </div>
                  <div className="btn-group">
                    <Button
                      color={displayNoRentBtn ? "secondary" : "light"}
                      onClick={toggleDisplayNoBtn}
                    >
                      {displayNoRentBtn ? (
                        <i className="bx bx-comment-check"></i>
                      ) : null}
                      <span> No</span>
                    </Button>
                  </div>
                </div>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="bond" sm={3}>
                Bond
              </Label>
              <Col sm={9}>
                <input
                  className="form-control w-25"
                  type="text"
                  onChange={handleFormValues}
                  value={state.bond}
                  name="bond"
                  id="bond"
                />

              </Col>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>
            <i className="fas fa-times"></i> Cancel
          </Button>
          <Button
            color="primary"
            disabled={state.available_date && state.rent_per_week > 199 && state.bond ? false : true}
            onClick={e => {
              handleSubmit(e);
              toggle();
            }}
          >
            <i className="fas fa-file-alt me-1"></i>Save
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};
const mapStateToProps = gstate => {
  const { contacts_list_data, contacts_list_error, contacts_list_loading } =
    gstate.Contacts2;

  const { rental_listing_update_loading } = gstate.Listing;

  const { user_list_data } = gstate.property;


  return {
    contacts_list_data,
    contacts_list_error,
    contacts_list_loading,

    rental_listing_update_loading,

    user_list_data,
  };
};
export default connect(mapStateToProps, {
  contactList,
  rentalListingUpdate,
  rentalListingUpdateFresh,
  rentalListingFresh, ListingsInfoFresh
})(EditRentalListingModal);
