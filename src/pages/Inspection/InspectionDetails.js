import React, { useEffect, useRef, useState } from "react";
import { withRouter, useLocation, useHistory } from "react-router-dom";
import moment from "moment";
import { connect } from "react-redux";
import {
  Table,
  Col,
  Row,
  Modal,
  Button,
} from "reactstrap";
import Select from "react-select";
import {
  addCheckoutPropertyKey,
  addCheckoutPropertyKeyFresh,
  addCheckoutPropertyKeyIn,
  addCheckoutPropertyKeyUp,
  updateCheckoutPropertyKeyFresh,
  getPropertyKey,
} from "../../store/Properties/actions";

import { getAllDataForMsgTemplates } from 'store/actions'
import MessagesModal from "./MessagesModal/MessagesModal";

const InspectionDetails = props => {
  let history = useHistory();

  const [msgModal, setMsgModal] = useState(false);

  const toggleMsgModal = () => {
    setMsgModal(prev => !prev);
    // props.getAllDataForMsgTemplates();
  };

  useEffect(() => {
    if (props.property_key_loading === "Success") {
      // set_by_useEffect();
    }
  }, [props.property_key_loading]);
  // if(propGet){
  //   props.getPropertyKey(props.text?.property_id);
  //   setPropGet(false);
  // }

  const handleChangeKey = (e, name) => {
    if (name != "contact_id") {
      setCheckoutKey({ ...checkoutKey, [e.target.name]: e.target.value });
    } else {
      setCheckoutKey({ ...checkoutKey, [name]: e.value });
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


  const scheduleEdit = (selState, prop, date, time, id, address) => {
    history.push({
      pathname: "/inspectionDayEdit/" + date,
      state: {
        property: selState,
        selectedProp: prop,
        locations: "",
        start_time: time,
        insId: id,
        address: address,
      },
    });
  };

  console.log(props.text);

  const editScheduleHandler = () => {
    var selState = [];
    var prop = [];
    // console.log(props.text);
    // return
    props.text.inspections.map((item, key) => {
      selState.push({ label: item.property, value: item.property_id });
      prop.push({ item });
    });
    let address = {
      building_name: props.text.building_name,
      unit: props.text.unit,
      number: props.text.number,
      street: props.text.street,
      suburb: props.text.suburb,
      postcode: props.text.postcode,
      state: props.text.state,
      country: props.text.country,
    };

    scheduleEdit(
      selState,
      prop,
      props.text.date,
      props.text.start_time,
      props.text.id,
      address
    );
  }

  return (
    <>
      <Modal isOpen={props.keyModal} toggle={props.toggle}>
        <div className="modal-header">
          <h5 className="modal-title mt-0" id="myModalLabel">
            Inspection Schedule
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
              <div className="table-responsive">
                <Table className="table mb-0">
                  <thead>
                    <tr>
                      <th>Start Time</th>
                      <th>Property</th>
                      <th>type</th>
                      <th>Summery</th>
                    </tr>
                  </thead>
                  <tbody>
                    {props.text?.inspections
                      ?.map((item, key) => (
                        <tr key={key}>
                          <th scope="row">{moment(item.schedule_time, "hh:mm A").format("hh:mm A")}</th>
                          <td>{item.property}</td>
                          <td>{item.inspection_details?.inspection_type}</td>
                          <td>{item.inspection_details?.summery}</td>
                        </tr>))}
                  </tbody>
                </Table>
              </div>
            </Col>
          </Row>

        </div>
        <div className="modal-footer">
          <div className="w-100 d-flex justify-content-end">
            <Button color="secondary" onClick={editScheduleHandler}>
              Edit schedule
            </Button>

            <Button color="info" onClick={toggleMsgModal} className="mx-1"
            >
              Message              <i className="fas fa-angle-down me-1 font-size-16" />

            </Button>
            <Button color="secondary" onClick={props.toggle}
            >
              Close
            </Button>
            {/* <button
              type="button"
              className="btn btn-info custom-button-side-row-font-size"
            >

              Edit schedule
            </button>
            <button
              type="button"
              className="btn btn-info custom-button-side-row-font-size"
              onClick={toggleMsgModal}
            >

              Message
              <i className="fas fa-angle-down me-1 font-size-16" />
            </button>

            <button
              type="button"
              onClick={props.toggle}
              className="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button> */}
          </div>
        </div>
      </Modal>
      {msgModal && (
        <MessagesModal
          toggle={toggleMsgModal}
          msgModal={msgModal}
          masterId={props.text.id}

        />
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
  getPropertyKey, getAllDataForMsgTemplates
})(InspectionDetails);
