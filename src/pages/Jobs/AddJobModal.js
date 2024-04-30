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
  InputGroup
} from "reactstrap";
import { connect } from "react-redux";

import {
  addJobModal,
  JobsListFresh,
  addJobModalFresh,
  JobsList,
} from "store/actions";
import { propertyList } from "../../store/Properties/actions";
import { addInspectionInfo, InspectionListFresh, getUser, getJobPropertyAccess, getJobPropertyAccessFresh } from "store/actions";

import toastr from "toastr";
import { useHistory, useParams } from "react-router-dom";
import Loder from "components/Loder/Loder";
import "flatpickr/dist/themes/material_blue.css"
import Flatpickr from "react-flatpickr"
import Select from "react-select";
import { withTranslation, useTranslation } from "react-i18next";


const AddJobModal = props => {
  const { t } = useTranslation();

  const { id } = useParams();
  const history = useHistory();
  const [inspectionModal, setInspectionModal] = useState(false);
  const [state, setState] = useState({});
  console.log(state);
  const [state2, setState2] = useState({});

  const [contactIds, setContactIds] = useState({});
  const [contactIdState, setContactIdState] = useState(true);
  const [propertySelectDataShow, setPropertySelectDataShow] = useState(false);
  // Form 2 Button value state
  const [report, setReport] = useState({
    reportBtn: "",
    accessBtn: "",
  });
  const [agentBtn, setAgentBtn] = useState(false);
  const [ownerBtn, setOwnerBtn] = useState(false);
  const [tenantBtn, setTenantBtn] = useState(false);
  const [agentBtn1, setAgentBtn1] = useState(false);
  const [ownerBtn1, setOwnerBtn1] = useState(false);
  const [tenantBtn1, setTenantBtn1] = useState(false);

  const [open, setOpen] = useState(false);
  console.log(open);
  const [ownerBtnShow, setOwnerBtnShow] = useState(false);
  const [tenantBtnShow, setTenantBtnShow] = useState(false)
  const [ownerCheckShow, setOwnerCheckShow] = useState(false)
  const [tenantCheckShow, setTenantCheckShow] = useState(false)
  const [showModal, setShowModal] = useState(false);
  const toggleTenantBtn = () => {
    setReport({ ...report, reportBtn: "Tenant" });
    setTenantBtn(true);
    setAgentBtn(false);
    setOwnerBtn(false);
  };
  const toggleAgentBtn = () => {
    setReport({ ...report, reportBtn: "Agent" });
    setTenantBtn(false);
    setAgentBtn(true);
    setOwnerBtn(false);
  };
  const toggleOwnerBtn = () => {
    setReport({ ...report, reportBtn: "Owner" });
    setTenantBtn(false);
    setAgentBtn(false);
    setOwnerBtn(true);
  };

  const toggleTenantBtn1 = () => {
    setReport({ ...report, accessBtn: "Tenant" });
    setTenantBtn1(true);
    setAgentBtn1(false);
    setOwnerBtn1(false);
  };
  const toggleAgentBtn1 = () => {
    setReport({ ...report, accessBtn: "Agent" });
    setTenantBtn1(false);
    setAgentBtn1(true);
    setOwnerBtn1(false);
  };
  const toggleOwnerBtn1 = () => {
    setReport({ ...report, accessBtn: "Owner" });
    setTenantBtn1(false);
    setAgentBtn1(false);
    setOwnerBtn1(true);
  };

  const toggle = () => setInspectionModal(prev => !prev);
  const toggleOff = () => {
    setInspectionModal(false);
    toggleAndFreshData();
  };

  if (propertySelectDataShow) {
    props.getJobPropertyAccess(state.selectedProperty?.value);
    setPropertySelectDataShow(false);
    setContactIdState(true)
  }

  if (props.job_property_access_data && props.job_property_access_data.message === 'Successfull' && contactIdState) {
    setContactIdState(false);
    setContactIds({
      owner_id: props.job_property_access_data.data?.owner[0]?.id ? props.job_property_access_data.data?.owner[0]?.id : null,
      tenant_id: props.job_property_access_data?.data?.tenant[0]?.id ? props.job_property_access_data?.data?.tenant[0]?.id : null,
      tenant_email: props.job_property_access_data?.data?.tenant[0]?.email ? props.job_property_access_data?.data?.tenant[0]?.email : null,
      owner_email: props.job_property_access_data?.data?.owner[0]?.email ? props.job_property_access_data?.data?.owner[0]?.email : null,
    });
  }


  const dateHandler = (selectedDates, dateStr, instance) => {
    console.log(dateStr);
    setState({ ...state, ['due_by']: dateStr });
  }


  useEffect(() => {



    let optionManager;
    if (props.user_list_data?.data) {
      optionManager = props.user_list_data?.data.map(item => ({
        label: item.first_name + " " + item.last_name,
        value: item.id,
      }));
      setState2(prev => ({ ...prev, optionManager: optionManager }));
    }

    let optionProperty;
    if (props.property_list_data?.data) {
      optionProperty = props.property_list_data?.data.map(item => ({
        label: item.reference,
        value: item.id,
      }));
      setState2(prev => ({ ...prev, optionProperty: optionProperty }));
    }

    if (props.property_list_loading === false) {
      props.propertyList();
    } else if (props.user_list_loading == false) {
      props.getUser();
    }
    if (props.job_modal_add_loading === "Success") {
      toastr.success("Job Added Successfully");
      props.addJobModalFresh();
      props.JobsListFresh();
      props.JobsList(props.tab, '1', '10', null, "id", "desc");
      console.log(props.job_modal_add_id);

      if (open && props.job_modal_add_id?.job_id) {
        console.log('ok');
        console.log(props.job_modal_add_id?.job_id);
        history.push("/maintenanceInfo/" + props.job_modal_add_id?.job_id);
        setOpen(false)

      }
      setShowModal(false);
      toggleOff();
    }
    if (props.job_modal_add_loading === "Failed") {
      toastr.error('Something went wrong');
      props.addJobModalFresh();
      props.JobsListFresh();
      setShowModal(false);

    }
    if (
      props.job_property_access_data?.data?.owner[0] !== undefined &&
      props.job_property_access_data?.data?.tenant[0] === undefined
    ) {
      setReport({ reportBtn: "Owner", accessBtn: "Owner" });
      setOwnerBtn(true);
      setOwnerBtn1(true);
      setOwnerBtnShow(true);
      setOwnerCheckShow(true);
      console.log('Owner');

    }
    if (
      props.job_property_access_data?.data?.tenant[0] !== undefined &&
      props.job_property_access_data?.data?.owner[0] !== undefined) {
      setReport({ reportBtn: "Tenant", accessBtn: "Tenant" });
      setTenantBtn(true);
      setTenantBtn1(true);
      setOwnerBtnShow(true);
      setTenantBtnShow(true);
      console.log('Tenant');
    }
    if (
      props.job_property_access_data?.data?.owner[0] === undefined &&
      props.job_property_access_data?.data?.tenant[0] !== undefined
    ) {
      setReport({ reportBtn: "Tenant", accessBtn: "Tenant" });
      setTenantBtn(true);
      setTenantBtn1(true);
      setTenantBtnShow(true)
      setTenantCheckShow(true);
      console.log('Tenant 2');

    }
  }, [
    props.user_list_loading,
    props.property_list_loading,
    props.job_modal_add_loading,
    props.job_property_access_data, props.property_list_data?.data,
    props.user_list_data?.data, props.job_modal_add_id?.job_id, open
  ]);


  const selectHandler = e => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const selectHandlerForProperty = e => {
    setState({ ...state, [e.target.name]: e.target.value });
    setPropertySelectDataShow(true);
    props.getJobPropertyAccessFresh();
  };

  const SaveAndOpenHandler = e => {
    handleSubmit(e);
    setOpen(true);
    toggleAndFreshData();
  };

  const toggleAndFreshData = () => {
    setInspectionModal(false);

    setState({});
    setReport({});
    setOwnerBtn(false);
    setOwnerBtn1(false);
    setTenantBtn(false);
    setTenantBtn1(false);
    setOwnerBtnShow(false);
    setTenantBtnShow(false);
    setTenantCheckShow(false);
    setOwnerCheckShow(false);
    setTenantBtn1(false);
    setAgentBtn1(false);
    setOwnerBtn1(false);
  };

  const pId = state.property;
  const handleSubmit = e => {
    e.preventDefault();
    // setShowModal(true);
    props.addJobModal(state, report, contactIds);
  };

  let userData = undefined;
  if (props.user_list_data) {
    userData = props.user_list_data?.data?.map((item, key) => (
      <option key={key} value={item.id}>
        {item.first_name + " " + item.last_name}
      </option>
    ));
  }

  const handleSelectProperty = e => {
    setState({ ...state, selectedProperty: e });
    setPropertySelectDataShow(true);
    props.getJobPropertyAccessFresh();
    setOwnerBtn(false);
    setOwnerBtn1(false);
    setTenantBtn(false);
    setTenantBtn1(false);
    setOwnerBtnShow(false);
    setTenantBtnShow(false);
    setTenantCheckShow(false);
    setOwnerCheckShow(false);
    setTenantBtn1(false);
    setAgentBtn1(false);
    setOwnerBtn1(false);
  };

  const handleSelectGroupManager = e => {
    setState({ ...state, selectedManager: e });
  };

  const localizeItem = text => `${t(text)}`


  return (
    <>
      <button
        type="button"
        className="btn btn-info custom-button-side-row-font-size " onClick={toggle}>

        {localizeItem('Add')} {localizeItem('Job')}  <i className="bx bxs-wrench font-size-18 align-mpIddle me-1"></i>

      </button>
      <Loder status={showModal} />

      <Modal isOpen={inspectionModal} toggle={toggleOff} scrollable={true}>

        <ModalHeader style={{ backgroundColor: "#6E62E5" }}>
          {/* <i className="fas fa-wrench font-size-20 me-2 text-info"></i>
          <span className="text-info">New Job</span> */}


          <div style={{ display: "flex", justifyContent: "space-between", width: "460px", marginTop: "10px" }}>
            <div>
              {/* <i className="fas fa-wrench font-size-20 me-2 text-white"></i> */}
              <span className="text-white">{localizeItem('New')} {localizeItem('Job')}</span>
            </div>
            <i className="mdi mdi-close-thick font-size-20 text-white" onClick={toggleOff} style={{ cursor: "pointer" }}></i>
          </div>
        </ModalHeader>

        <ModalBody style={{ backgroundColor: "#F2F6FA" }}>
          <Form className="form p-3">
            <FormGroup row>
              {/* <Label for="exampleSelect" md={4}>
                Property
              </Label> */}
              <Col md={12} style={{ zIndex: "3" }}>

                <div className="form-group-new" style={{ marginBottom: "-15px" }}>
                  <Select
                    value={state2.selectedProperty}
                    onChange={handleSelectProperty}
                    options={state2.optionProperty}
                    classNamePrefix="select2-selection"
                    placeholder='Select a property...'
                  />
                  <label htmlFor="usr">{localizeItem('Property')}</label>
                </div>
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label for="exampleSelect" md={4}>
                {localizeItem('Reported')} {localizeItem('by')}
              </Label>
              <Col md={8}>
                <div className="btn-group btn-group-justified">
                  <div className="btn-group">
                    <Button
                      color={agentBtn ? "secondary" : "light"}
                      onClick={e => {
                        toggleAgentBtn(e);
                      }}
                    >
                      <span>
                        {/* {agentBtn ? (
                                                    <i className="bx bx-comment-check"></i>
                                                ) : null} */}
                        {localizeItem('Agent')}
                      </span>
                    </Button>
                  </div>

                  {ownerBtnShow && <div className="btn-group">
                    <Button
                      color={ownerBtn ? "secondary" : "light"}
                      onClick={e => {
                        toggleOwnerBtn(e);
                      }}
                    >
                      <span>
                        {ownerCheckShow ? (
                          <i className="bx bx-comment-check"></i>
                        ) : null}
                        {localizeItem('Owner')}
                      </span>
                    </Button>
                  </div>}
                  {tenantBtnShow && <div className="btn-group">
                    <Button
                      color={tenantBtn ? "secondary" : "light"}
                      onClick={e => {
                        toggleTenantBtn(e);
                      }}
                    >
                      <span>
                        {tenantCheckShow ? (
                          <i className="bx bx-comment-check"></i>
                        ) : null}
                        {localizeItem('Tenant')}
                      </span>
                    </Button>
                  </div>}

                </div>
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label for="exampleSelect" md={4}>
                {localizeItem('Access')}
              </Label>
              <Col md={8}>
                <div className="btn-group btn-group-justified">
                  <div className="btn-group">
                    <Button
                      color={agentBtn1 ? "secondary" : "light"}
                      onClick={e => {
                        toggleAgentBtn1(e);
                      }}
                    >
                      <span>
                        {/* {agentBtn1 ? (
                                                    <i className="bx bx-comment-check"></i>
                                                ) : null} */}
                        {localizeItem('Agent')}
                      </span>
                    </Button>
                  </div>
                  {ownerBtnShow && <div className="btn-group">
                    <Button
                      color={ownerBtn1 ? "secondary" : "light"}
                      onClick={e => {
                        toggleOwnerBtn1(e);
                      }}
                    >
                      <span>

                        {ownerCheckShow ? (
                          <i className="bx bx-comment-check"></i>
                        ) : null}
                        {localizeItem('Owner')}
                      </span>
                    </Button>
                  </div>}
                  {tenantBtnShow && <div className="btn-group">
                    <Button
                      color={tenantBtn1 ? "secondary" : "light"}
                      onClick={e => {
                        toggleTenantBtn1(e);
                      }}
                    >
                      <span>
                        {tenantCheckShow ? (
                          <i className="bx bx-comment-check"></i>
                        ) : null}
                        {localizeItem('Tenant')}
                      </span>
                    </Button>
                  </div>}
                </div>
              </Col>
            </FormGroup>

            <FormGroup row>
              {/* <Label for="exampleSelect" md={4}>
                Due by
              </Label> */}
              <Col md={12}>
                <div className="form-group-new" style={{ marginBottom: "-15px" }}>
                  <Flatpickr
                    className="form-control d-block"
                    placeholder="Pick a Date..."
                    value={state.date}
                    // onChange={() => dateHandler()}
                    options={{
                      altInput: true,
                      format: "d/m/Y",
                      altFormat: "d/m/Y",
                      onChange: dateHandler
                    }}
                  />
                  <label htmlFor="usr">{localizeItem('Due')} {localizeItem('by')}</label>
                </div>
              </Col>
            </FormGroup>

            <FormGroup row>
              {/* <Label for="exampleSelect" md={4}>
                Manager
              </Label> */}
              <Col md={12} style={{ zIndex: "2" }}>

                <div className="form-group-new" style={{ marginBottom: "-15px" }}>
                  <Select
                    value={state2.selectedManager}
                    onChange={handleSelectGroupManager}
                    options={state2.optionManager}
                    classNamePrefix="select2-selection"
                    placeholder='Select a manager...'
                  />
                  <label htmlFor="usr">{localizeItem('Manager')}</label>
                </div>
              </Col>
            </FormGroup>

            <FormGroup row>
              {/* <Label for="exampleSelect" md={4}>
                Summary
              </Label> */}

              <Col md={12}>
                <div className="form-group-new" style={{ marginBottom: "-25px" }}>
                  <Input
                    name="summary"
                    type="text"
                    placeholder="Summary"
                    className="form-control"
                    onChange={selectHandler}
                  />
                  <label htmlFor="usr">{localizeItem('Summary')}</label>
                </div>
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label for="exampleSelect " className="form-group-new-desc-label" style={{ marginBottom: "-10px", zIndex: "1", width: "90px", padding: "0px 3px 0px 3px" }}>
                {localizeItem('Description')}
              </Label>

              <Col md={12}>
                <div className="form-group-new-desc" >
                  <Input
                    name="description"
                    type="textarea"
                    rows="5"
                    className="form-control"
                    //placeholder="Description"
                    onChange={selectHandler}
                  />
                  {/* <label htmlFor="usr" style={{ marginTop: "-10px" }}>{localizeItem('Description')}</label> */}
                </div>
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label for="exampleSelect " className="form-group-new-desc-label" style={{ marginBottom: "-10px", zIndex: "1", width: "135px", padding: "0px 3px 0px 3px" }}>
                {localizeItem('Work')} {localizeItem('order')} {localizeItem('notes')}
              </Label>


              <Col md={12}>
                <div className="form-group-new-desc" >
                  <Input
                    name="notes"
                    type="textarea"
                    rows="3"
                    className="form-control"
                    placeholder="Supplier instructions"
                    onChange={selectHandler}
                  />
                </div>
              </Col>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter style={{ backgroundColor: "#F2F6FA" }}>
          <Button color="buttonCancelColor" onClick={toggleOff}>
            <i className="fas fa-times me-1"></i>{localizeItem('Cancel')}
          </Button>
          <Button
            color="buttonColor"
            disabled={state.summary && state.selectedManager && state.selectedProperty ? false : true}
            onClick={e => {
              handleSubmit(e);
            }}
          >
            <i className="fas fa-file-alt me-1"></i>{localizeItem('Save')}
          </Button>
          <Button color="buttonColor" disabled={state.summary && state.selectedManager && state.selectedProperty ? false : true} onClick={SaveAndOpenHandler}>
            <i className="fas fa-file-alt me-1"></i>{localizeItem('Save')} & {localizeItem('Open')}
          </Button>
        </ModalFooter>
      </Modal>

      {/* ===============Inspection modal ends here ================*/}
    </>
  );
};
const mapStateToProps = gstate => {
  const {
    user_list_data,
    user_list_error,
    user_list_loading,

    property_list_data,
    property_list_loading,
    property_add_loading,
  } = gstate.property;

  const {
    job_modal_add_loading,
    job_modal_add_id,

    job_property_access_data,
  } = gstate.Jobs;

  return {
    property_list_data,
    property_list_loading,
    property_add_loading,

    user_list_data,
    user_list_error,
    user_list_loading,

    job_modal_add_loading,
    job_modal_add_id,

    job_property_access_data,
  };
};
export default connect(mapStateToProps, {
  getUser,
  propertyList,
  addJobModal,
  JobsList,
  JobsListFresh,
  addJobModalFresh,
  getJobPropertyAccess,
  getJobPropertyAccessFresh,
})(AddJobModal);
