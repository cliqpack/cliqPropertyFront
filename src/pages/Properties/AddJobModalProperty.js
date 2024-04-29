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
import { connect } from "react-redux";

import {
  addJobModal,
  JobsListFresh,
  addJobModalFresh,
  PropertyAllActivity,
  JobsListByIdFresh,
} from "store/actions";
import { propertyList } from "../../store/Properties/actions";
import {
  addInspectionInfo,
  InspectionListFresh,
  getUser,
  getJobPropertyAccess,
} from "store/actions";

import toastr from "toastr";
import { useHistory, useParams } from "react-router-dom";
import Loder from "components/Loder/Loder";

import "flatpickr/dist/themes/material_blue.css";
import Flatpickr from "react-flatpickr";
import Select from "react-select";
import './property.css'


const AddJobModalProperty = props => {
  const { id } = useParams();
  const history = useHistory();
  const [inspectionModal, setInspectionModal] = useState(false);
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  const [state, setState] = useState({ property: props.id, dateCheck: false });
  console.log(state);
  const [propertySelectDataShow, setPropertySelectDataShow] = useState(true);
  // Form 2 Button value state
  const [report, setReport] = useState({
    reportBtn: "",
    accessBtn: "",
  });
  // console.log(state, report);
  const [isHover, setIsHover] = useState(false);

  const handleMouseEnter = () => {
    setIsHover(true);
  };
  const handleMouseLeave = () => {
    setIsHover(false);
  };
  const [agentBtn, setAgentBtn] = useState(false);
  const [ownerBtn, setOwnerBtn] = useState(false);
  const [tenantBtn, setTenantBtn] = useState(false);
  const [agentBtn1, setAgentBtn1] = useState(false);
  const [ownerBtn1, setOwnerBtn1] = useState(false);
  const [tenantBtn1, setTenantBtn1] = useState(false);
  const [open, setOpen] = useState(false);

  const [ownerBtnShow, setOwnerBtnShow] = useState(false);
  const [tenantBtnShow, setTenantBtnShow] = useState(false);

  const [ownerCheckShow, setOwnerCheckShow] = useState(false);
  const [tenantCheckShow, setTenantCheckShow] = useState(false);

  const [contactIds, setContactIds] = useState({});
  const [contactIdState, setContactIdState] = useState(true);
  const [showLoder, setShowLoder] = useState(false);
  const [hideLoder, setHideLoder] = useState(false);
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

  // console.log(state);

  // const toggle = () => setInspectionModal(prev => !prev);
  const toggleOff = () => {
    setInspectionModal(false);
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

  if (propertySelectDataShow) {
    props.getJobPropertyAccess(props.id);
    setPropertySelectDataShow(false);
  }

  if (
    props.job_property_access_data &&
    props.job_property_access_data.message === "Successfull" &&
    contactIdState
  ) {
    setContactIdState(false);
    setContactIds({
      owner_id: props.job_property_access_data.data.owner[0]?.id
        ? props.job_property_access_data.data.owner[0]?.id
        : null,
      tenant_id: props.job_property_access_data.data.tenant[0]?.id
        ? props.job_property_access_data.data.tenant[0]?.id
        : null,
      tenant_email: props.job_property_access_data.data.tenant[0]?.email
        ? props.job_property_access_data.data.tenant[0]?.email
        : null,
      owner_email: props.job_property_access_data.data.owner[0]?.email
        ? props.job_property_access_data.data.owner[0]?.email
        : null,
    });
  }
  console.log(showModal);

  const dateHandler = (selectedDates, dateStr, instance) => {
    console.log(dateStr);
    setState({ ...state, ['due_by']: dateStr });
  }

  useEffect(() => {
    let optionManager;
    if (props.user_list_data) {
      optionManager = props.user_list_data?.data.map(item => ({
        label: item.first_name + " " + item.last_name,
        value: item.id,
      }));
      setState(prev => ({ ...prev, optionManager: optionManager }));
    }

    if (props.property_list_loading === false) {
      props.propertyList();
    } else if (props.user_list_loading == false) {
      props.getUser();
    } else if (props.job_modal_add_loading === "Success") {
      toastr.success("Job Added Successfully");
      props.JobsListByIdFresh();
      // setShowModal(false);
      props.PropertyAllActivity(props.id);

      if (open) {
        console.log("in");
        if (props.job_modal_add_id?.job_id !== undefined) {
          console.log("in in");
          history.push("/maintenanceInfo/" + props.job_modal_add_id?.job_id);
        }
      }
      props.addJobModalFresh();
      props.JobsListFresh();
      props.toggle();
    } else if (props.job_modal_add_loading === "Failed") {
      toastr.error(props.job_modal_add_id);
      props.addJobModalFresh();
      props.JobsListFresh();
      props.toggle();
    }
    if (
      props.job_property_access_data?.data?.owner[0] !== undefined &&
      props.job_property_access_data?.data?.tenant[0] === undefined
    ) {
      console.log("owner btn");
      setReport({ reportBtn: "Owner", accessBtn: "Owner" });
      setOwnerBtn(true);
      setOwnerBtn1(true);
      setOwnerBtnShow(true);
      setOwnerCheckShow(true);
    } else if (
      props.job_property_access_data?.data?.tenant[0] !== undefined &&
      props.job_property_access_data?.data?.owner[0] !== undefined
    ) {
      // console.log("Tenant btn");
      setReport({ reportBtn: "Tenant", accessBtn: "Tenant" });
      setTenantBtn(true);
      setTenantBtn1(true);
      setOwnerBtnShow(true);
      setTenantBtnShow(true);
    } else if (
      props.job_property_access_data?.data?.owner[0] === undefined &&
      props.job_property_access_data?.data?.tenant[0] !== undefined
    ) {
      setReport({ reportBtn: "Tenant", accessBtn: "Tenant" });
      setTenantBtn(true);
      setTenantBtn1(true);
      setTenantBtnShow(true);
      setTenantCheckShow(true);
    }

  }, [
    props.user_list_loading,
    props.property_list_loading,
    props.job_modal_add_loading,
    props.job_property_access_data, props.user_list_data,
    showLoder,
    showModal,
  ]);

  const selectHandler = e => {
    if (e.target.name == 'due_by') {
      console.log('--in--');
      setState({ ...state, [e.target.name]: e.target.value, dateCheck: true });
    } else {
      setState({ ...state, [e.target.name]: e.target.value });
    }
  };
  const selectHandlerForProperty = e => {
    setState({ ...state, [e.target.name]: e.target.value });
    setPropertySelectDataShow(true);
  };

  const SaveAndOpenHandler = e => {
    handleSubmit(e);
    setOpen(true);
  };

  const pId = state.property;

  const handleSubmit = e => {
    e.preventDefault();
    props.addJobModal(state, report, contactIds);
    // setShowModal(true);
    // props.toggle();
  };

  let userData = undefined;
  if (props.user_list_data) {
    userData = props.user_list_data?.data?.map((item, key) => (
      <option key={key} value={item.id}>
        {item.first_name + " " + item.last_name}
      </option>
    ));
  }
  console.log(props);
  const handleSelectGroupManager = e => {
    setState({ ...state, selectedManager: e });
  };
  return (
    <>
      {/* show loder component  */}
      <Loder status={showModal} />
      {/* hide loder component */}
      {/* {hideLoder ? <Loder status="false" /> : null} */}
      {/* ===============Inspection modal start from here ================*/}

      <Modal isOpen={props.jobModal} toggle={props.toggle} scrollable={true} >
        <ModalHeader style={{ backgroundColor: "#153D58" }}>
          <div style={{ display: "flex", justifyContent: "space-between", width: "460px", marginTop: "10px" }}>
            <div>
              {/* <i className="fas fa-wrench font-size-20 me-2 text-white"></i> */}
              <span className="text-white">New Job for {props.propertyRef || ''}</span>
            </div>
            <i className="mdi mdi-close-thick font-size-20 text-white" onClick={props.toggle} style={{ cursor: "pointer" }}></i>
          </div>
        </ModalHeader>

        <ModalBody style={{ backgroundColor: "#F2F6FA" }}>
          <Form className="form p-3">
            <FormGroup row>
              <Label for="exampleSelect" md={4} className="">
                Property
              </Label>
              <Col md={8} className="d-flex align-items-center">

                <div onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  className={`text-primary`}
                  style={{ textDecoration: isHover ? 'underline' : '', cursor: 'pointer', color: "#003786 !important" }}>{props.propertyRef || ''}
                </div>
              </Col>
            </FormGroup>



            <FormGroup row>
              <Label for="exampleSelect" md={4}>
                Reported by
              </Label>
              <Col md={8}>
                <div className="btn-group btn-group-justified">
                  <div className="btn-group">
                    <Button
                      color={agentBtn ? "labelColor" : "light"}
                      onClick={e => {
                        toggleAgentBtn(e);
                      }}
                    >
                      <span>
                        {/* {agentBtn ? (
                                                    <i className="bx bx-comment-check"></i>
                                                ) : null} */}
                        Agent
                      </span>
                    </Button>
                  </div>

                  {ownerBtnShow && (
                    <div className="btn-group">
                      <Button
                        color={ownerBtn ? "labelColor" : "light"}
                        onClick={e => {
                          toggleOwnerBtn(e);
                        }}
                      >
                        <span>
                          {ownerCheckShow ? (
                            <i className="bx bx-comment-check"></i>
                          ) : null}
                          Owner
                        </span>
                      </Button>
                    </div>
                  )}
                  {tenantBtnShow && (
                    <div className="btn-group">
                      <Button
                        color={tenantBtn ? "labelColor" : "light"}
                        onClick={e => {
                          toggleTenantBtn(e);
                        }}
                      >
                        <span>
                          {tenantCheckShow ? (
                            <i className="bx bx-comment-check"></i>
                          ) : null}
                          Tenant
                        </span>
                      </Button>
                    </div>
                  )}
                </div>
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label for="exampleSelect" md={4}>
                Access
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

                        Agent
                      </span>
                    </Button>
                  </div>
                  {ownerBtnShow && (
                    <div className="btn-group">
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
                          Owner
                        </span>
                      </Button>
                    </div>
                  )}
                  {tenantBtnShow && (
                    <div className="btn-group">
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
                          Tenant
                        </span>
                      </Button>
                    </div>
                  )}
                </div>
              </Col>
            </FormGroup>



            <FormGroup row>
              {/* <Label for="exampleSelect" md={4}>
                Date
              </Label> */}
              <Col md={11}>
                <div className="form-group-new" style={{ marginBottom: "-15px" }}>
                  <Flatpickr
                    className="form-control d-block"
                    placeholder="Pick a Date..."
                    value={state.due_by}
                    // onChange={() => dateHandler()}
                    options={{
                      altInput: true,
                      format: "d/m/Y",
                      altFormat: "d/m/Y",
                      onChange: dateHandler
                    }}
                  />
                  <label htmlFor="usr">Date</label>
                </div>
              </Col>
            </FormGroup>

            <FormGroup row>
              {/* <Label for="exampleSelect" md={4}>
                Manager
              </Label> */}
              <Col md={11}>

                <div className="form-group-new" style={{ marginBottom: "-15px", position: "relative", zIndex: "10" }}>
                  <Select
                    value={state.selectedManager}
                    onChange={handleSelectGroupManager}
                    options={state.optionManager}
                    classNamePrefix="select2-selection"
                    placeholder='Select a manager...'
                  />
                  <label htmlFor="usr">Manager</label>
                </div>
              </Col>
            </FormGroup>

            <FormGroup row>
              {/* <Label for="exampleSelect" md={4}>
                Summary
              </Label> */}

              <Col md={11}>
                <div className="form-group-new" style={{ marginBottom: "-15px" }}>
                  <Input
                    name="summary"
                    type="text"
                    placeholder="Summary"
                    className="form-control"
                    value={state.summary}
                    onChange={selectHandler}
                  />
                  <label htmlFor="usr">Summary</label>
                </div>
              </Col>
            </FormGroup>

            <FormGroup row className="mb-4">
              <Label for="exampleSelect " className="form-group-new-desc-label" style={{ marginBottom: "-10px", zIndex: "2", width: "90px", padding: "0px 3px 0px 3px" }}>
                Description
              </Label>

              <Col md={11}>
                <div className="form-group-new-desc" style={{ marginBottom: "-15px" }}>
                  <Input
                    name="description"
                    type="textarea"
                    rows="5"
                    className="form-control-new-desc"
                    //placeholder="Description"
                    value={state.description}
                    onChange={selectHandler}
                    style={{ height: "80px" }}
                  />
                  {/* <label htmlFor="usr" style={{ marginTop: "-10px" }}>Description</label> */}
                </div>
              </Col>
            </FormGroup>

            <FormGroup row>
              {/* <Label for="exampleSelect" md={4}>
                Work order notes
              </Label> */}
              <Label for="exampleSelect " className="form-group-new-desc-label" style={{ marginBottom: "-10px", zIndex: "2", width: "135px", padding: "0px 3px 0px 3px" }}>
                Work order notes
              </Label>

              <Col md={11}>
                <div className="form-group-new-desc" >
                  <Input
                    name="notes"
                    type="textarea"
                    rows="3"
                    className="form-control-new-desc"
                    //placeholder="Supplier instructions"
                    value={state.notes}
                    onChange={selectHandler}
                    style={{ height: "65px" }}
                  />
                  {/* <label htmlFor="usr" style={{ marginTop: "-10px" }}>Work order notes</label> */}
                </div>
              </Col>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter style={{ backgroundColor: "#F2F6FA" }}>
          <Button color="buttonColor" onClick={props.toggle}>
            <i className="fas fa-times me-1"></i>Cancel
          </Button>
          <Button
            color="buttonColor"
            disabled={state.selectedManager && state.summary ? false : true}
            onClick={e => {
              handleSubmit(e);

            }}
          >
            <i className="fas fa-save me-1"></i> Save
          </Button>

          <Button color="buttonColor"
            disabled={state.selectedManager && state.summary ? false : true} onClick={SaveAndOpenHandler}>
            <i className="fas fa-save me-1"></i>Save & Open
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
  JobsListByIdFresh,
  JobsListFresh,
  addJobModalFresh,
  getJobPropertyAccess,
  PropertyAllActivity,
})(AddJobModalProperty);
