import React, { useEffect, useRef, useState } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
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
} from "reactstrap";
import Select from "react-select";
import toastr from "toastr";
import {
  addCheckoutPropertyKey,
  addCheckoutPropertyKeyFresh,
  addCheckoutPropertyKeyIn,
  addCheckoutPropertyKeyUp,
  updateCheckoutPropertyKeyFresh,
  getPropertyKey,
} from "../../store/Properties/actions";
import Loder from "components/Loder/Loder";
import "flatpickr/dist/themes/material_blue.css"
import Flatpickr from "react-flatpickr"
import './property.css'

const PropertyKey = props => {

  const [status, setStatus] = useState('')
  const [checkoutKey, setCheckoutKey] = useState([]);

  const [checkoutKeyIn, setCheckoutKeyIn] = useState([]);
  const [checkoutKeyUp, setCheckoutKeyUp] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState()
  const [selectedGroup1, setSelectedGroup1] = useState()
  const [tglfrm, setTglfrm] = useState(true);
  const [propGet, setPropGet] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {

    if (props.property_key_loading === "Success") {
      set_by_useEffect();
    }


    if (props.property_key_add_loading == "Success") {
      if (props.property_key_data?.data?.data?.check_type == "out") {
        toastr.success("Property Key Checkin Successfull");
        setShowModal(false);
        props.toggle();
      } else {
        props.toggle();
        toastr.success("Property Key CheckOut Successfull");
      }

      props.addCheckoutPropertyKeyFresh();
      props.getPropertyKey(props.text?.property_id);
    }
    if (props.property_key_add_loading == "Failed") {
      toastr.error('Something went wrong');
      setShowModal(false);
      props.addCheckoutPropertyKeyFresh();

    }

    if (props.property_key_update_loading == "Success") {

      toastr.success("Property Key Checkout Update Successfull");
      props.updateCheckoutPropertyKeyFresh();
      props.getPropertyKey(props.text?.property_id);
      setShowModal(false);
      props.toggle();
    }


  }, [props.property_key_loading, props.property_key_data, props.property_key_update_loading, props.property_key_add_loading,]);


  if (propGet) {
    props.getPropertyKey(props.text?.property_id);
    setPropGet(false);
  }

  const handleSelect = (e, status) => {
    console.log(e);
    setSelectedGroup(e);
    setCheckoutKey({ ...checkoutKey, contact_id: e.value })
    setStatus(status)
  }
  const handleSelect1 = e => {
    console.log(e);
    setSelectedGroup1(e);
    setCheckoutKey({ ...checkoutKey, manager_id: e.value })
    setStatus('Team')

  }

  const handleChangeKey = (e, name) => {
    // console.log(e);
    // if (name != "contact_id") {
    //   setCheckoutKey({ ...checkoutKey, [e.target.name]: e.target.value });
    // } else {
    //   setCheckoutKey({ ...checkoutKey, [name]: e.value });
    // }
    if (name == 'contact_id') {
      setCheckoutKey({ ...checkoutKey, [name]: e.value });
    } else if (name == 'manager_id') {
      setCheckoutKey({ ...checkoutKey, [name]: e.value });
    } else {
      setCheckoutKey({ ...checkoutKey, [e.target.name]: e.target.value })
    }
  };

  const handleChangeKeyIN = (e, name) => {
    setCheckoutKeyIn({ ...checkoutKeyIn, [e.target.name]: e.target.value });
    console.log(checkoutKeyIn);
  };

  const handleChangeKeyUP = (e, name) => {
    setCheckoutKeyUp({ ...checkoutKeyUp, [e.target.name]: e.target.value });
    console.log(checkoutKeyIn);
  };

  const tglFrm1 = () => {
    setTglfrm(true);
    // setCheckoutKey({ ...checkoutKey, contact_id: null, return_due: null, return_time: null, notes: null })
  };
  const tglFrm2 = () => {
    setTglfrm(false);
    // setCheckoutKey({ ...checkoutKey, contact_id: null, return_due: null, return_time: null, notes: null })
    setSelectedGroup1(props.text.optionTeam[0]);
    setCheckoutKey({ ...checkoutKey, manager_id: props.text.optionTeam[0].value })

    setStatus('Team')
  };

  const handlePropertyKey = () => {
    console.log("helllllooooo, who are you ?")
    setShowModal(true);
    console.log("hey")

    props.addCheckoutPropertyKey(checkoutKey, status);
    //props.toggle();
  };

  const handlePropertyKeyIN = () => {
    console.log("helllllooooo, who are you 2222 ?")
    setShowModal(true);
    console.log(checkoutKeyIn);
    props.addCheckoutPropertyKeyIn(checkoutKeyIn);
    //props.toggle();
  };

  const handlePropertyKeyUP = () => {
    // console.log(checkoutKeyUp);
    props.addCheckoutPropertyKeyUp(checkoutKeyUp);
  };

  // if (props.property_key_add_loading == "Success") {
  //   console.log(props.toggle);
  //   if (props.property_key_data?.data?.data?.check_type == "out") {
  //     toastr.success("Property Key Checkin Successfull");
  //   } else {
  //     props.toggle();
  //     toastr.success("Property Key CheckOut Successfull");
  //   }

  //   props.addCheckoutPropertyKeyFresh();
  //   props.getPropertyKey(props.text?.property_id);
  // }

  // if (props.property_key_update_loading == "Success") {
  //   // props.toggle();
  //   toastr.success("Property Key Checkout Update Successfull");
  //   props.updateCheckoutPropertyKeyFresh();
  //   props.getPropertyKey(props.text?.property_id);
  // }

  //console.log(props.property_key_data?.data?.data?.contact);
  const date_get = () => {
    var today = undefined;
    var td = new Date();
    var dd = String(td.getDate()).padStart(2, "0");
    var mm = String(td.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = td.getFullYear();

    today = yyyy + "-" + mm + "-" + dd;
    return today;
  };

  const timeNow = () => {
    var time = undefined;
    var d = new Date();
    var h = String(d.getHours()).padStart(2, "0");
    var m = String(d.getMinutes()).padStart(2, "0");
    time = h + ":" + m;
    return time;
  };

  const set_by_useEffect = async () => {
    setCheckoutKey({
      ...checkoutKey,
      ["property_id"]: props.text?.property_id,
      ["return_due"]: date_get(),
      ["return_time"]: timeNow(),
    });

    setCheckoutKeyUp({
      ...checkoutKeyUp,
      ["checkout_id"]: props.property_key_data?.data?.data?.id,
      ["contact_id"]: props.property_key_data?.data?.data?.contact_id,
      ['manager_id']: props.property_key_data?.data?.data?.team_member_id,

      ["return_due"]: props.property_key_data?.data?.data?.return_due,
      ["return_time"]: props.property_key_data?.data?.data?.return_time,
      ["notes"]: props.property_key_data?.data?.data?.note,
      ["property_id"]: props.text?.property_id,
    });

    setCheckoutKeyIn({
      ...checkoutKeyIn,
      ["contact_id"]: props.property_key_data?.data?.data?.contact_id,
      ['manager_id']: props.property_key_data?.data?.data?.team_member_id,
      ["date_return"]: date_get(),
      ["return_time"]: timeNow(),
      ["property_id"]: props.text?.property_id,
      ["notes"]: props.property_key_data?.data?.data?.note,
    });
  };

  const dateHandler = (selectedDates, dateStr, instance) => {
    console.log(dateStr);
    setCheckoutKeyUp({ ...checkoutKeyUp, ['return_due']: dateStr });
    setCheckoutKey({ ...checkoutKey, ['return_due']: dateStr });
  }

  const returnDateHandler = (selectedDates, dateStr, instance) => {
    setCheckoutKeyIn({ ...checkoutKeyIn, ['date_return']: dateStr });
  }


  return (
    <>

      {props.property_key_data?.data?.data?.check_type == "out" ? (
        <>
          <Loder status={showModal} />
          <Modal isOpen={props.keyModal} toggle={props.toggle} centered >

            <div className="modal-header" style={{ backgroundColor: "#153D58", display: "flex" }}>
              <h5 className="modal-title mt-0" id="myModalLabel" style={{ color: "white" }}>
                Check In / Update Key
              </h5>
              {/* <button
                type="button"
                onClick={props.toggle}
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                style={{ color: "white !important" }}
              >
                <span aria-hidden="true">&times;</span>
              </button> */}
              <div style={{ cursor: "pointer" }}>
                <i className="mdi mdi-close-thick font-size-20 text-white" onClick={props.toggle}></i>
              </div>
            </div>
            <div className="modal-body" style={{ backgroundColor: "#F2F6FA" }}>
              <Row className="mt-3 row align-items-center">
                <Col md={12} style={{ textAlign: 'center' }}>
                  <div className="btn-group btn-group-justified" >
                    <div className="btn-group">
                      <Button
                        className="btn w-lg"
                        color={tglfrm ? "labelColor" : "light"}
                        onClick={tglFrm1}
                      >
                        {tglfrm ? <i className="bx bx-comment-check"></i> : null}
                        <span> Check In</span>
                      </Button>
                    </div>
                    <div className="btn-group">
                      <Button
                        className="btn w-lg"
                        color={tglfrm == false ? "labelColor" : "light"}
                        onClick={tglFrm2}
                      >
                        {tglfrm == false ? (
                          <i className="bx bx-comment-check"></i>
                        ) : null}
                        <span> Update</span>
                      </Button>
                    </div>
                  </div>
                </Col>
              </Row>
              {tglfrm ? (
                <form>
                  <Row className="mt-4">
                    <Col md={3}>
                      <Label>Check in By</Label>
                    </Col>
                    <Col md={9}>
                      {`${props.property_key_data?.data?.data?.contact?.first_name || ''} ${props.property_key_data?.data?.data?.contact?.last_name || ''}`}
                      {props.property_key_data?.data?.data?.team_member?.full_name || ''}
                    </Col>
                  </Row>
                  <Row className="mt-3">
                    {/* <Col md={3}>
                      <Label for="date_return" className="form-label">
                        Date Return
                      </Label>
                    </Col> */}
                    <Col md={10}>
                      <div className="form-group-new">
                        <Flatpickr
                          className="form-control d-block"
                          placeholder="Pick a Date..."
                          value={checkoutKeyIn.date_return}
                          options={{
                            altInput: true,
                            format: "d/m/Y",
                            altFormat: "d/m/Y",
                            onChange: returnDateHandler
                          }}
                        />
                        <label htmlFor="usr">Date Return</label>
                      </div>
                    </Col>
                  </Row>
                  <Row>

                    <Col md={10}>
                      <div className="form-group-new">
                        <input
                          name="return_time"
                          type="time"
                          className="form-control"
                          onChange={e => {
                            handleChangeKeyIN(e, "");
                          }}
                          value={checkoutKeyIn.return_time}
                        />
                        <label htmlFor="usr">Time</label>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    {/* <Col md={3}>
                      <Label for="notes" className="form-label">
                        Notes
                      </Label>
                    </Col> */}
                    <Col md={10}>
                      <div className="form-group-new-desc" >
                        <Input
                          //name="notes"
                          className="form-control-new-desc"
                          type="textarea"
                          id="notes"
                          rows="3"
                          name="notes"
                          onChange={e => {
                            handleChangeKeyIN(e, "");
                          }}
                          style={{ height: "65px" }}
                          value={checkoutKeyIn.notes}
                        />
                        <label htmlFor="usr" style={{ marginTop: "-10px" }}>Notes</label>
                      </div>
                    </Col>
                  </Row>
                </form>
              ) : (
                <form>
                  <Row className="mt-4">
                    <Col md={4}>
                      <Label>Checked out to</Label>
                    </Col>
                    <Col md={8}>

                      {`${props.property_key_data?.data?.data?.contact?.first_name || ''} ${props.property_key_data?.data?.data?.contact?.last_name || ''}`}
                      {props.property_key_data?.data?.data?.team_member?.full_name || ''}

                    </Col>
                  </Row>
                  <Row className="mt-3">
                    {/* <Col md={4}>
                      <Label for="return_due" className="form-label">
                        Return due
                      </Label>
                    </Col> */}
                    <Col md={10}>
                      <div className="form-group-new">
                        <Flatpickr
                          className="form-control d-block"
                          placeholder="Pick a Date..."
                          value={checkoutKeyUp.return_due}
                          options={{
                            altInput: true,
                            format: "d/m/Y",
                            altFormat: "d/m/Y",
                            onChange: dateHandler
                          }}
                        />
                        <label htmlFor="usr">Return due</label>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    {/* <Col md={4}>
                      <Label for="return_due" className="form-label">
                        Time
                      </Label>
                    </Col> */}
                    <Col md={10}>
                      <div className="form-group-new">
                        <input
                          name="return_time"
                          type="time"
                          className="form-control"
                          onChange={e => {
                            handleChangeKeyUP(e, "");
                          }}
                          value={checkoutKeyUp.return_time}
                        />
                        <label htmlFor="usr"> Time</label>
                      </div>
                    </Col>
                  </Row>
                  <Row >
                    {/* <Col md={4}>
                      <Label for="notes" className="form-label">
                        Notes
                      </Label>
                    </Col> */}
                    <Col md={10}>
                      <div className="form-group-new-desc">
                        <Input
                          className="form-control-new-desc"
                          id="notes"
                          type="textarea"
                          rows="3"
                          name="notes"
                          onChange={e => {
                            handleChangeKeyUP(e, "");
                          }}
                          value={checkoutKeyUp.notes}
                          style={{ height: "65px" }}
                        />
                        <label htmlFor="usr" style={{ marginTop: "-10px" }}>Notes</label>
                      </div>
                    </Col>
                  </Row>
                </form>
              )}
            </div>
            <div className="modal-footer" style={{ backgroundColor: "#F2F6FA" }}>
              <button
                type="button"
                onClick={props.toggle}
                className="btn btn-buttonCancelColor"
                data-dismiss="modal"
              >
                Close
              </button>
              {tglfrm ? (
                <button
                  type="button"
                  className="btn btn-buttonColor"
                  onClick={handlePropertyKeyIN}
                >
                  Check In
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn-buttonColor"
                  onClick={handlePropertyKeyUP}
                >
                  Update
                </button>
              )}
            </div>

          </Modal>
        </>
      ) : (
        <>
          <Loder status={showModal} />
          <Modal isOpen={props.keyModal} toggle={props.toggle}>
            <div className="modal-header">
              <h5 className="modal-title mt-0" id="myModalLabel">
                Check Out Key
              </h5>
              <button
                type="button"
                onClick={props.toggle}
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <Row className="mt-3">
                <Col md={12}>
                  <div className="btn-group btn-group-justified">
                    <div className="btn-group">
                      <Button
                        color={tglfrm ? "secondary" : "light"}
                        onClick={tglFrm1}
                      >
                        {tglfrm ? <i className="bx bx-comment-check"></i> : null}
                        <span> Contact</span>
                      </Button>
                    </div>
                    <div className="btn-group">
                      <Button
                        color={tglfrm == false ? "secondary" : "light"}
                        onClick={tglFrm2}
                      >
                        {tglfrm == false ? (
                          <i className="bx bx-comment-check"></i>
                        ) : null}
                        <span> Team Member</span>
                      </Button>
                    </div>
                  </div>
                </Col>
              </Row>
              <form>
                <Row className="mt-5">
                  <Col md={3}>
                    <Label>Checked out to</Label>
                  </Col>
                  <Col md={9}>
                    {tglfrm ? <Select
                      value={selectedGroup}
                      options={props.text?.optionGroup}

                      // onChange={e => {
                      //   handleChangeKey(e, tglfrm ? "contact_id" : 'manager_id');
                      //   setStatus(tglfrm ? 'Contact' : 'Team')
                      // }}
                      onChange={e => handleSelect(e, 'Contact')}
                      classNamePrefix="select2-selection"

                    />
                      :
                      <Select
                        value={selectedGroup1}
                        options={props.text?.optionTeam}

                        // onChange={e => {
                        //   handleChangeKey(e, tglfrm ? "contact_id" : 'manager_id');
                        //   setStatus(tglfrm ? 'Contact' : 'Team')
                        // }}
                        onChange={handleSelect1}
                        classNamePrefix="select2-selection"

                      />}

                  </Col>
                </Row>
                <Row className="mt-4">
                  <Col md={3}>
                    <Label for="return_due" className="form-label">
                      Return due
                    </Label>
                  </Col>
                  <Col md={5}>
                    {/* <input
                      name="return_due"
                      type="date"
                      className="form-control"
                      onChange={e => {
                        handleChangeKey(e, "");
                      }}
                    /> */}
                    <Flatpickr
                      className="form-control d-block"
                      placeholder="Pick a Date..."
                      value={checkoutKey.return_due}
                      // onChange={() => dateHandler()}
                      options={{
                        altInput: true,
                        format: "d/m/Y",
                        altFormat: "d/m/Y",
                        onChange: dateHandler
                      }}
                    />
                  </Col>
                </Row>
                <Row className="mt-4">
                  <Col md={3}>
                    <Label for="return_due" className="form-label">
                      Time
                    </Label>
                  </Col>
                  <Col md={5}>
                    <input
                      name="return_time"
                      type="time"
                      className="form-control"
                      onChange={e => {
                        handleChangeKey(e, "");
                      }}
                      value={checkoutKey.return_time}
                    />
                  </Col>
                </Row>
                <Row className="mt-4">
                  <Col md={3}>
                    <Label for="notes" className="form-label">
                      Notes
                    </Label>
                  </Col>
                  <Col md={9}>
                    <textarea
                      className="form-control"
                      id="notes"
                      rows="3"
                      name="notes"
                      onChange={e => {
                        handleChangeKey(e, "");
                      }}
                    ></textarea>
                  </Col>
                </Row>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                onClick={props.toggle}
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-info"
                disabled={checkoutKey.return_due && checkoutKey.return_time
                  && checkoutKey.notes
                  ? false : true}
                onClick={handlePropertyKey}
              >
                Save changes
              </button>
            </div>
          </Modal>
        </>
      )}
    </>
  );
};

const mapStateToProps = gstate => {
  const {
    property_key_add_data,
    property_key_add_error,
    property_key_add_loading,

    property_key_data,
    property_key_error,
    property_key_loading,

    property_key_update_data,
    property_key_update_error,
    property_key_update_loading,
  } = gstate.property;

  return {
    property_key_add_data,
    property_key_add_error,
    property_key_add_loading,

    property_key_data,
    property_key_error,
    property_key_loading,

    property_key_update_data,
    property_key_update_error,
    property_key_update_loading,
  };
};
export default connect(mapStateToProps, {
  addCheckoutPropertyKey,
  addCheckoutPropertyKeyFresh,
  addCheckoutPropertyKeyIn,
  addCheckoutPropertyKeyUp,
  updateCheckoutPropertyKeyFresh,
  getPropertyKey,
})(PropertyKey);
