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
import {
  getMessageTemplatesForProperty, sendMailFromTemplatesInMail, sendMailFromTemplatesInMailFresh, PropertyAllActivity, getMessageTemplatesForPropertyByBtn, sendSMSFromTemplatesInMail,
  sendSMSFromTemplatesInMailFresh
} from 'store/actions';
import Select from "react-select"
import toastr from "toastr";
import './property.css'

const MessagesModal = (props) => {

  const [state, setState] = useState({
    selectedBtn: [
      { label: "Owner", value: "Owner" },
      { label: "Tenant", value: "Tenant" },
      { label: "Supplier", value: "Supplier" },
      { label: "Strata Manager", value: "Strata Manager" }
    ],
    optionBtn: [
      { label: "Owner", value: "Owner" },
      { label: "Tenant", value: "Tenant" },
      { label: "Supplier", value: "Supplier" },
      { label: "Strata Manager", value: "Strata Manager" }
    ],
    selectShowBtnData: false
  });

  const [button, setButton] = useState({
    tenancyYesBtn: true,
    saleYesBtn: false, 
    ownerBtn: true,
    tenantBtn: true,
    supplierBtn: true,
    btnData: 'tenancy'
  });

  // Toggle Tenancy button
  const toggleTenancyBtn = () => {
    setButton(prev => ({
      ...prev,
      tenancyYesBtn: !prev.tenancyYesBtn,
      saleYesBtn: false,
      btnData: prev.tenancyYesBtn === true ? '' : 'tenancy'
    }));
  }

  // Toggle Sale button
  const toggleSaleBtn = () => {
    setButton(prev => ({
      ...prev,
      saleYesBtn: !prev.saleYesBtn,
      tenancyYesBtn: false, // Deselect Tenancy if Sale is selected
      btnData: prev.saleYesBtn === true ? '' : 'Sales Agreement' // Set Sales Agreement when Sale is selected
    }));
  }

  const clickHandler = (id, sub) => {
    props.sendMailFromTemplatesInMail(id, sub, props.propId);
  }

  const handleSelectBtn = e => {
    setState({ ...state, selectedBtn: e, selectShowBtnData: true });
    props.getMessageTemplatesForPropertyByBtn(e, null, button.btnData);
  }

  const searchHandler = e => {
    props.getMessageTemplatesForPropertyByBtn(state.selectedBtn, e.target.value, button.btnData);
  }

  useEffect(() => {
    if (props.smta_loading === 'Success') {
      toastr.success("Success");
      props.sendMailFromTemplatesInMailFresh();
      props.PropertyAllActivity(props.propId);
      props.toggle();
    }
    if (props.send_sms_template_loading === 'Success') {
      toastr.success("Success");
      props.sendSMSFromTemplatesInMailFresh();
      props.PropertyAllActivity(props.propId);
      props.toggle();
    }
    if (button.tenancyYesBtn || button.saleYesBtn) {
      props.getMessageTemplatesForPropertyByBtn(state.selectedBtn, state.search, button.btnData);
    }
  }, [props.smta_loading, props.send_sms_template_loading, button.tenancyYesBtn, button.saleYesBtn]);

  return (
    <>
      <Modal isOpen={props.msgModal} toggle={props.toggle} centered size="md" style={{ maxWidth: '50%' }}>
        <ModalBody style={{ backgroundColor: "#F2F6FA" }}>
          <div>
            <div>
              <div className="d-flex" style={{ justifyContent: "center", alignItems: "center" }}>
                <form className="app-search d-flex">
                  <input
                    type="text"
                    id="header-search"
                    placeholder="Search"
                    name="s"
                    className='placeHolderColor'
                    onKeyUp={searchHandler}
                    style={{ width: "370px", textAlign: "center", backgroundColor: "#E4E4E4", borderRadius: "8px 0px 0px 8px", padding: "8px", border: "none", borderRight: "0px", color: "#686868" }}
                  />
                  <button type="submit" style={{ textAlign: "center", backgroundColor: "#CECECE", borderRadius: "0px 8px 8px 0px", padding: "8px", border: "none", color: "#686868", width: "60px" }}>
                    <i className="bx bx-search-alt font-size-20" ></i>
                  </button>
                </form>
              </div>

              <Row style={{ paddingTop: "20px", justifyContent: "center", alignItems: "center" }}>
                <Col md={11}>
                  <div className="form-group-new">
                    <Select
                      value={state.selectedBtn}
                      isMulti={true}
                      onChange={handleSelectBtn}
                      options={state.optionBtn}
                      className="form-control-new"
                    />
                    <label htmlFor="usr" style={{ marginTop: "-5px" }}>Select</label>
                  </div>
                </Col>
              </Row>
              <Row style={{ marginBottom: "20px" }}>
                <Col md={11}>
                  <div className="btn-group btn-group-justified">
                    <div className="btn-group" style={{ paddingLeft: "25px" }}>
                      <Button
                        className='btn-sm'
                        color={button.tenancyYesBtn ? "labelColor" : "light"}
                        onClick={toggleTenancyBtn}
                      >
                        {button.tenancyYesBtn && <i className="bx bx-comment-check"></i>}
                        <span> Tenancy</span>
                      </Button>
                    </div>
                    <div className="btn-group" style={{ paddingLeft: "10px" }}>
                      <Button
                        className='btn-sm'
                        color={button.saleYesBtn ? "labelColor" : "light"}
                        onClick={toggleSaleBtn}
                      >
                        {button.saleYesBtn && <i className="bx bx-file"></i>}
                        <span> Sale</span>
                      </Button>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
            <Row className='mt-3'>
              <Col sm="12">
                <CardText className="mb-0">
                  <ul style={{ listStyle: 'none' }}>
                    {
                      props.gmtfpbb_data?.data?.data.map((item, i) =>
                        <li key={i} className='py-2' style={{ cursor: 'pointer' }} onClick={() => clickHandler(item?.id, item?.subject)}>
                          <Row>
                            <Col md={2}>
                              {item.message_trigger_to === 'Owner' && <i className='bx bx-home-circle font-size-16' />}
                              {item.message_trigger_to === 'Tenant' && <i className='bx bx-group font-size-16' />}
                              {item.message_trigger_to === 'Supplier' && <i className='bx bx-user-plus font-size-16' />}
                              {item.message_trigger_to === 'Strata Manager' && <i className='bx bx-user font-size-16' />}
                              {item.message_trigger_to === 'Buyer' && (
                                <i className="bx bx-user-check font-size-16" />
                              )}
                              {item.message_trigger_to === 'Seller' && (
                                <i className="bx bx-user-minus font-size-16" />
                              )}
                            </Col>
                            <Col md={7}><span className='text-primary'>{item?.subject}</span></Col>
                            <Col md={3} className='d-flex justify-content-center align-items-center'>
                              {item.type === 'email' && <i className='fas fa-envelope mx-1' />}
                              {item.type === 'sms' && <i className='fas fa-mobile-alt mx-1' />}
                              {item.type === 'letter' && <i className='fas fa-print mx-1' />}
                            </Col>
                          </Row>
                        </li>
                      )
                    }
                  </ul>
                </CardText>
              </Col>
            </Row>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
}

const mapStateToProps = gstate => {
  const {
    gmtfp_data,
    gmtfp_loading,
    smta_data,
    smta_loading,
    gmtfpbb_data,
    gmtfpbb_loading
  } = gstate.property;

  return {
    gmtfp_data,
    gmtfp_loading,
    smta_data,
    smta_loading,
    gmtfpbb_data,
    gmtfpbb_loading
  };
};

export default connect(mapStateToProps, {
  getMessageTemplatesForProperty,
  sendMailFromTemplatesInMail,
  sendMailFromTemplatesInMailFresh,
  PropertyAllActivity,
  getMessageTemplatesForPropertyByBtn,
  sendSMSFromTemplatesInMail,
  sendSMSFromTemplatesInMailFresh
})(MessagesModal);
