import moment from "moment";
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
  FormText,
} from "reactstrap";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { connect } from "react-redux";
import Select from "react-select";

import { addReminder, addReminderFresh, SupplierList, getReminder, editReminder, editReminderFresh } from "store/actions";

import toastr from "toastr";
import { useHistory, useParams } from "react-router-dom";
import Loder from "components/Loder/Loder";
import Switch from "react-switch";
// Form Editor
import { CKEditor } from "@ckeditor/ckeditor5-react";
import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";
import SingleButton from "common/Button/SingleButton";


const AddReminderModal = props => {
  const [state, setState] = useState({
    propertyBtn: false,
    ownerBtn: false,
    supplierBtn: false,
    monthsBtn: false,
    weekBtn: true,
    activeBtn: true,
    init: true,
    frequency_type: 'weeks'

  });
  const [status, setStatus] = useState(false)
  console.log(state);
  console.log(props.data);


  const [state2, setState2] = useState({ optionSupplier: [] })


  // console.log(state2);

  const [form1state, setForm1State] = useState({
    switch1: true,
    switch2: false,
    selectedFiles: [],
  });

  const stateHandler = e => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const toggleWeekBtn = () => {
    setState({
      ...state,
      monthsBtn: false,
      weekBtn: true,
      frequency_type: state.frequency > 1 ? 'weeks' : 'week'

    });
  };
  const toggleMonthsBtn = () => {
    setState({
      ...state,
      monthsBtn: true,
      weekBtn: false,
      frequency_type: state.frequency > 1 ? 'months' : 'month'

    });
  };

  const toggleSupplierBtn = () => {
    setState({
      ...state,
      propertyBtn: false,
      ownerBtn: false,
      supplierBtn: true,
      default_contact: 'supplier'

    });
  };

  const togglePropertyBtn = () => {
    setState({
      ...state,
      propertyBtn: true,
      ownerBtn: false,
      supplierBtn: false,
      default_contact: 'Property Manager'

    });
  };

  const toggleOwnerBtn = () => {
    setState({
      ...state,
      propertyBtn: false,
      ownerBtn: true,
      supplierBtn: false,
      default_contact: 'Owner'
    });
  };

  const handleSave = () => {
    setStatus(true)
    props.addReminder(state, state2)
  };
  const handleEdit = () => {
    setStatus(true)

    props.editReminder(state, state2, props.data?.id)
  };

  useEffect(() => {
    if (props.edit_reminder_loading == 'Success') {
      toastr.success('Success');
      props.editReminderFresh();
      props.getReminder();
      props.setActionArray([])
      setStatus(false)
      props.toggle();
    }

    if (props.edit_reminder_loading == 'Failed') {
      toastr.error('Failed');
      props.editReminderFresh();

    }

    if (state.init) {
      props.SupplierList();
      setState({ ...state, init: false })
    }
    let option;
    if (props.supplier_list_data) {
      option = props.supplier_list_data?.data?.map(item => ({
        label: item.reference,
        value: item.id,
      }));
      setState2(prev => ({ ...prev, optionSupplier: option }));
    }
    if (props.add_reminder_loading == 'Success') {
      toastr.success('Success');
      props.addReminderFresh();
      props.getReminder();
      props.setActionArray([])
      setStatus(false)

      props.toggle();

    }

    if (props.add_reminder_loading == 'Failed') {
      toastr.error('Failed');
      props.addReminderFresh();
      setStatus(false)

    }

    if (props.data?.id) {
      setState(prev => ({
        ...prev,
        name: props.data.name,
        default_frequency: props.data.default_frequency,
        default_contact: props.data.default_contact,
        supplierBtn: props.data.default_contact == 'supplier' ? true : false,
        ownerBtn: props.data.default_contact == 'Owner' ? true : false,
        propertyBtn: props.data.default_contact == 'Property Manager' ? true : false,
        frequency_type: props.data.frequency_type == 'weeks' ? 'weeks' : 'months',
        frequency: props.data.default_frequency,
        monthsBtn: props.data.frequency_type == 'months' ? true : false,
        weekBtn: props.data.frequency_type == 'weeks' ? true : false,
        activeBtn: props.data.status == '1' ? true : false
      }))

      setState2(prev => ({ ...prev, selectedSupplier: { label: props.data?.supplier?.reference, value: props.data?.supplier?.id } }))
    }

  }, [props.add_reminder_loading, props.supplier_list_data, props.edit_reminder_loading, props.data?.id]);


  const handleSelectSupplier = e => {
    setState2({ ...state2, selectedSupplier: e })
  }

  const Offsymbol = () => {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          fontSize: 12,
          color: "#fff",
          paddingRight: 2,
        }}
      >
        {" "}
        No
      </div>
    );
  };
  const OnSymbol = props => {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          fontSize: 12,
          color: "#fff",
          paddingRight: 2,
        }}
      >
        {" "}
        Yes
      </div>
    );
  };

  const cancelHandler = () => {

    props.toggle(); setState({
      propertyBtn: false,
      ownerBtn: false,
      supplierBtn: false,
      monthsBtn: false,
      weekBtn: true,
      activeBtn: false
    });
    props.setActionArray([])

  }


  return (
    <>
      <Modal
        isOpen={props.reminderModal}
        toggle={e => {
          props.toggle(); setState({
            propertyBtn: false,
            ownerBtn: false,
            supplierBtn: false,
            monthsBtn: false,
            weekBtn: true,
            activeBtn: false
          });
          props.setActionArray([])
        }}
        scrollable={true}
        size="lg"
      >
        <ModalHeader
          toggle={e => {
            props.toggle(); setState({
              propertyBtn: false,
              ownerBtn: false,
              supplierBtn: false,
              monthsBtn: false,
              weekBtn: true,
              activeBtn: false
            });
            props.setActionArray([])
          }}
        >
          {props.data?.id ? 'Edit Reminder' : "Add Reminder"}
        </ModalHeader>

        <ModalBody>
          <Row>
            <Col lg={12}>
              <Row className="py-2">
                <Col
                  md={3}
                  className="d-flex justify-content-start align-items-center ps-5"
                >
                  Name
                </Col>
                <Col md={8} className="">
                  {props.data?.id ? props.data?.name :
                    <div className="w-50">
                      <input
                        className="form-control"
                        type="text"
                        name="name"
                        value={state.name}
                        placeholder=""
                        onChange={stateHandler}
                      />
                    </div>}
                </Col>
              </Row>
              <div
                className="w-100 mt-2 mb-4"
                style={{
                  borderBottom: "1.2px dotted #c9c7c7",
                }}
              ></div>
              <Row className="py-3">
                <Col
                  md={3}
                  className="d-flex justify-content-start  ps-5"
                ></Col>
                <Col md={8} className="">
                  <i className="fas fa-info-circle me-1" />
                  <span>
                    Select optional defaults for contact and frequency. You can
                    change these for individual properties
                  </span>
                </Col>
              </Row>

              <Row className="py-3">
                <Col
                  md={3}
                  className="d-flex justify-content-start align-items-center ps-5"
                >
                  Contact
                </Col>
                <Col md={8} className="">
                  <div className="btn-group btn-group-justified">
                    <div className="btn-group">
                      <Button
                        color={state.supplierBtn ? "secondary" : "light"}
                        onClick={toggleSupplierBtn}
                      >
                        {state.supplierBtn ? (
                          <i className="bx bx-comment-check"></i>
                        ) : null}
                        <span> Supplier</span>
                      </Button>
                    </div>
                    <div className="btn-group">
                      <Button
                        color={state.propertyBtn ? "secondary" : "light"}
                        onClick={togglePropertyBtn}
                      >
                        {state.propertyBtn ? (
                          <i className="bx bx-comment-check"></i>
                        ) : null}
                        <span> Property Manager</span>
                      </Button>
                    </div>
                    <div className="btn-group">
                      <Button
                        color={state.ownerBtn ? "secondary" : "light"}
                        onClick={toggleOwnerBtn}
                      >
                        {state.ownerBtn ? (
                          <i className="bx bx-comment-check"></i>
                        ) : null}
                        <span> Owner</span>
                      </Button>
                    </div>
                  </div>
                </Col>
              </Row>

              {state.supplierBtn == true &&
                <Row className="py-3">
                  <Col
                    md={3}
                    className="d-flex justify-content-start align-items-center ps-5"
                  >
                    Supplier

                  </Col>
                  <Col md={6}>
                    <div className="">
                      <Select
                        value={state2.selectedSupplier}
                        onChange={handleSelectSupplier}
                        options={state2.optionSupplier}
                        disabled={state2.optionSupplier.length == 0 ? true : false}
                        classNamePrefix="select2-selection"
                        placeholder='Select a Supplier...'
                      />
                    </div>
                  </Col>
                </Row>}

              {/* <Row className="py-3">
                <Col
                  md={3}
                  className="d-flex justify-content-start align-items-center ps-5"
                >
                  Frequency
                </Col>
                <Col md={1}>
                  <input
                    className="form-control"
                    type="text"
                    name="frequency"
                    value={state.frequency}
                    placeholder=""
                    onChange={stateHandler}
                  />
                </Col>
                <Col md={4} className="">
                  <div className="btn-group btn-group-justified">
                    <div className="btn-group">
                      <Button
                        color={state.weekBtn ? "secondary" : "light"}
                        onClick={toggleWeekBtn}
                      >
                        {state.weekBtn ? (
                          <i className="bx bx-comment-check"></i>
                        ) : null}
                        <span> Weeks</span>
                      </Button>
                    </div>
                    <div className="btn-group">
                      <Button
                        color={state.monthsBtn ? "secondary" : "light"}
                        onClick={toggleMonthsBtn}
                      >
                        {state.monthsBtn ? (
                          <i className="bx bx-comment-check"></i>
                        ) : null}
                        <span> Months</span>
                      </Button>
                    </div>
                  </div>
                </Col>
              </Row> */}

              <Row className="py-1">
                <Col
                  md={3}
                  className="d-flex justify-content-start align-items-center ps-5"
                >
                  Active
                </Col>
                <Col md={8} className="">
                  <Switch
                    uncheckedIcon={<Offsymbol />}
                    checkedIcon={<OnSymbol />}
                    className="me-1 mb-sm-8 mb-2"
                    onColor="#153D58"
                    onChange={() => {
                      setState({
                        ...state,
                        activeBtn: !state.activeBtn,
                      });
                    }}
                    checked={state.activeBtn}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          {props.data?.id ?
            // <Button color="info" onClick={e => { props.toggle(); props.setActionArray() }}>
            //   <i className="fas fa-times me-1"></i>Cancel
            // </Button>

            <SingleButton text='Cancel' color="danger" handler={cancelHandler} icon='fas fa-times' marginEnd='me-1' />
            :
            // <Button color="info"
            //   onClick={e => {
            //     props.toggle(); setState({
            //       propertyBtn: false,
            //       ownerBtn: false,
            //       supplierBtn: false,
            //       monthsBtn: false,
            //       weekBtn: true,
            //       activeBtn: false
            //     });
            //     props.setActionArray('')
            //   }}
            // >
            //   <i className="fas fa-times me-1"></i>Cancel
            // </Button>
            <SingleButton text='Cancel' color="danger" handler={cancelHandler} icon='fas fa-times' marginEnd='me-1' />
          }

          {props.data?.id ?
            // <Button color="info" onClick={handleEdit}>
            //   <i className="fas fa-file-alt me-1"></i> Save
            // </Button>
            <SingleButton text='Save' color="info" handler={handleEdit} icon='fas fa-file-alt' marginEnd='me-1' />
            :
            // <Button color="info" onClick={handleSave}>
            //   <i className="fas fa-file-alt me-1"></i> Save
            // </Button>
            <SingleButton text='Save' color="info" handler={handleSave} icon='fas fa-file-alt' marginEnd='me-1' />
          }
        </ModalFooter>
      </Modal>
      {status && <Loder status={status} />}

      {/* ===============Inspection modal ends here ================*/}
    </>
  );
};
const mapStateToProps = gstate => {
  const { add_reminder_loading, edit_reminder_loading } = gstate.Portfolio;
  const {

    supplier_list_loading,
    supplier_list_data,

  } = gstate.Jobs;
  return {
    supplier_list_loading,
    supplier_list_data,

    add_reminder_loading, edit_reminder_loading
  };
};
export default connect(mapStateToProps, { addReminder, addReminderFresh, SupplierList, getReminder, editReminder, editReminderFresh })(AddReminderModal);
