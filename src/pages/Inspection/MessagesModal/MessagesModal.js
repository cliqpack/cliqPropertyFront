import moment from 'moment';
import React, { useEffect, useState } from 'react';
import {
  Col,
  Row,
  CardText,
  Button,
  Modal,
  ModalBody,

} from "reactstrap";
import { connect } from "react-redux";

import { getMessageTemplatesForInspectionBySelect, sendMailFromTemplatesInInspection, sendMailFromTemplatesInInspectionFresh, inspectionAllActivity, getAllDataForMsgTemplates, searchTemplatesFromInspection } from 'store/actions';

import Select from "react-select"

import toastr from "toastr";
import { useHistory } from 'react-router-dom';

const MessagesModal = (props) => {
  const [dd, setDD] = useState(false)
  const [state, setState] = useState({
    selectedBtn: [
      { label: "Owner", value: "Owner" },
      { label: "Tenant", value: "Tenant" },
      { label: "Supplier", value: "Supplier" }
    ], optionBtn: [
      { label: "Owner", value: "Owner" },
      { label: "Tenant", value: "Tenant" },
      { label: "Supplier", value: "Supplier" }
    ],
    selectShowBtnData: false,
  });
  const [button, setButton] = useState({
    routineYesBtn: false, btnData: 'Inspections'

  })
  console.log(button);
  const clickHandler = (id, sub) => {
    console.log(id);
    props.sendMailFromTemplatesInInspection(id, sub, props.inspectionId, props.masterId)
  }

  const handleSelectBtn = e => {
    setState({ ...state, selectedBtn: e, selectShowBtnData: true });
    props.getMessageTemplatesForInspectionBySelect(e, null, button.btnData)
  }



  const searchHandler = e => {
    setState({ ...state, ['search']: e.target.value });
    props.getMessageTemplatesForInspectionBySelect(state.selectedBtn, e.target.value, button.btnData)
  }
  const toggleRoutineBtn = () => {
    setButton(prev => ({ ...prev, routineYesBtn: !prev.routineYesBtn, btnData: prev.routineYesBtn == true ? 'Inspections' : 'Routine' }))
  }

  useEffect(() => {
    if (props.gmtfibs_loading == false) {
      props.getMessageTemplatesForInspectionBySelect(state.selectedBtn, state.search, button.btnData)
    }
    if (props.smta_inspec_loading === 'Success') {
      toastr.success("Success");
      props.sendMailFromTemplatesInInspectionFresh();
      if (props.masterId) {

      } else {
        props.inspectionAllActivity(props.inspectionId)

      }
      props.toggle();
    }

    if (button) {
      props.getMessageTemplatesForInspectionBySelect(state.selectedBtn, state.search, button.btnData)
    }
  }, [props.smta_inspec_loading, button, props.gmtfibs_loading])


  return (
    <>
      {/* ===============Inspection modal start from here ================*/}

      <Modal isOpen={props.msgModal} toggle={props.toggle} centered>
        <ModalBody style={{ backgroundColor: "#F2F6FA" }}>
          <div>
            <div className=''>
              <div className="d-flex" style={{ justifyContent: "center", alignItems: "center" }}>
                <form className="app-search d-flex">
                  <input
                    type="text"
                    id="header-search"
                    placeholder="Search"
                    name="s"
                    className='placeHolderColor'
                    //onKeyUp={searchHandler}
                    onChange={searchHandler}
                    style={{ width: "370px", textAlign: "center", backgroundColor: "#E4E4E4", borderRadius: "8px 0px 0px 8px", padding: "8px", border: "none", borderRight: "0px", color: "#686868" }}

                  />
                  <button style={{ textAlign: "center", backgroundColor: "#CECECE", borderRadius: "0px 8px 8px 0px", padding: "8px", border: "none", color: "#686868", width: "60px" }}><i className="bx bx-search-alt font-size-20" ></i></button>
                </form>
              </div>

              <Row style={{ paddingTop: "20px", justifyContent: "center", alignItems: "center" }}>
                <Col md={11} className=''>

                  <div className="form-group-new">
                    <Select
                      value={state.selectedBtn}
                      isMulti={true}
                      onChange={handleSelectBtn}
                      options={state.optionBtn}
                      classNamePrefix="select2-selection"
                    />
                    <label htmlFor="usr" style={{ marginTop: "-5px" }}>Select</label>
                  </div>
                </Col>
              </Row>


              <Row style={{ marginBottom: "20px" }}>
                <Col md={11} className=''>

                  <div className="btn-group btn-group-justified">
                    <div className="btn-group" style={{ paddingLeft: "25px" }}>
                      <Button
                        className='btn-sm py-1'

                        color={
                          button.routineYesBtn
                            ? "info"
                            : "light"
                        }
                        onClick={
                          toggleRoutineBtn
                        }
                      >
                        {button.routineYesBtn ? (
                          <i className="bx bx-comment-check"></i>
                        ) : null}
                        <span> Routine</span>
                      </Button>
                    </div>

                  </div>
                </Col>
              </Row>

            </div>
            <div
              style={{ borderBottom: "1.2px dotted #c9c7c7" }}
            />
            <Row className='mt-3'>
              <Col sm="12">
                <CardText className="mb-0">
                  <ul style={{ listStyle: 'none' }}>
                    {props.gmtfibs_data?.data?.data.map((item, i) =>
                      <li key={i} className='py-2' style={{ cursor: 'pointer' }} onClick={() => clickHandler(item?.id, item?.subject)}>
                        <Row>
                          <Col md={2}>
                            {item.message_trigger_to == 'Owner' &&
                              <i className='bx bx-home-circle font-size-16' />
                            }
                            {item.message_trigger_to == 'Tenant' &&
                              <i className='bx bx-group font-size-16' />}
                            {item.message_trigger_to == 'Supplier' &&
                              <i className='bx bx-user-plus font-size-16' />}
                          </Col>
                          <Col md={7}><span className='text-primary' >{item?.subject}</span></Col>
                          <Col md={3} className='d-flex justify-content-center align-items-center'>
                            {item.type == 'email' && <i className='fas fa-envelope mx-1' />}
                            {item.type == 'sms' && <i className='fas fa-mobile-alt mx-1' />}


                          </Col>
                        </Row>
                      </li>
                    )}
                  </ul>
                  {/* } */}
                </CardText>
              </Col>
            </Row>
          </div>
        </ModalBody>
      </Modal>

      {/* ===============Inspection modal ends here ================*/}
    </>

  )
}
const mapStateToProps = gstate => {
  const {
    gmtfibs_data, gmtfibs_loading, smta_inspec_data, smta_inspec_loading, inspec_msg_temp_all_data, inspec_msg_temp_all_loading, search_templates_data, search_templates_loading
  } = gstate.Inspections;

  return {
    gmtfibs_data, gmtfibs_loading, smta_inspec_data, smta_inspec_loading, inspec_msg_temp_all_data, inspec_msg_temp_all_loading, search_templates_data, search_templates_loading

  };
};
export default connect(mapStateToProps, {
  getMessageTemplatesForInspectionBySelect, sendMailFromTemplatesInInspection, sendMailFromTemplatesInInspectionFresh, inspectionAllActivity, getAllDataForMsgTemplates, searchTemplatesFromInspection
})(MessagesModal);


