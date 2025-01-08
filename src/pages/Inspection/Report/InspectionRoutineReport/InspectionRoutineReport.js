import React, { useEffect, useRef, useState } from "react";
// import "../InspectionInfo.css";
import {
  Link,
  useHistory,
  useLocation,
  useParams,
  withRouter,
} from "react-router-dom";
import { connect } from "react-redux";
import EditRoutineAttributeForm from "./EditRoutineAttributeForm";
import RoutineAttributeForm from "./RoutineAttributeForm";
import toastr from "toastr";
import EditRoomModal from "pages/Inspection/RoomEdit/EditRoomModal";

import {
  Card,
  CardBody,
  Col,
  Row,
  Button,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Label,
  Form,
  Input,
} from "reactstrap";

import {
  getPropertyRooms,
  storeRoutineInspectionInfo,
  storeRoutineInspectionInfoFresh,
  InspectionDetailsInfoData,
  InspectionDetailsInfoDataFresh,
  updateRoutineInspectionInfoFresh,
  updateRoutineInspectionInfo,
  GetRoutineInspectionImageFresh,
  GetRoutineInspectionImage,
  deletePropertyRoom,
  sortRoomFresh,
  getPropertyRoomFresh,
  updateRoutineInspectionImageFresh,
  deleteRoomFresh,
  sendMailTemplateFresh,
  reportPrint,
  reportPrintFresh,
} from "store/actions";
import classnames from "classnames";
import Switch from "react-switch";
import Dropzone from "react-dropzone";
import DummyImg from "../../../../assets/images/dummy-image-square.jpg";
import Breadcrumbs from "components/Common/Breadcrumb";

const InspectionRoutineReport = props => {
  const history = useHistory();
  const { insID, propID } = useParams();
  const [state, setState] = useState({
    verticalActiveTabWithIcon: "1",
  });
  const [form1state, setForm1State] = useState({
    switch1: false,
    switch2: false,
    selectedFiles: [],
  });
  const [fillState, setFillState] = useState(true);

  const [formState, setFormState] = useState([]);
  const [formStateStatus, setFormStateStatus] = useState(true);
  const [routineDescription, setRoutineDescription] = useState();
  const [init, setInit] = useState(true);

  const toggleVerticalIcon = (tab, room_id) => {
    if (state.verticalActiveTabWithIcon !== tab) {
      setState({
        verticalActiveTabWithIcon: tab,
      });
    }
    props.GetRoutineInspectionImage(insID, room_id, propID);
  };

  if (init) {
    props.InspectionDetailsInfoData(insID);
    setInit(false);
  }

  useEffect(() => {
    if (props.property_room_list_loading === false) {
      props.getPropertyRooms(propID, insID);
    }
    if (props.store_routine_inspection_add_loading === "Success") {
      toastr.success("Inspection Report Saved Successfully");
      props.storeRoutineInspectionInfoFresh();
    }
    if (props.inspection_info_details_loading === false) {
      props.InspectionDetailsInfoData(insID);
    }
    if (props.update_routine_inspection_add_loading === "Success") {
      toastr.success("Inspection Report updated Successfully");
      props.updateRoutineInspectionInfoFresh();
    }
    if (props.sort_room_loading == "Success") {
      toastr.success("Sorted");
      props.sortRoomFresh();
      props.getPropertyRoomFresh();
      props.InspectionDetailsInfoDataFresh();
      // window.location.reload();
    }
    if (props.update_routine_inspection_image_loading === "Success") {
      toastr.success("Uploaded Successfully");
    }

    if (props.inspection_preview_loading === "Success") {
      // endLoader();
      props.reportPrintFresh();
    }
    if (props.inspection_preview_loading === "Failed") {
      // endLoader();
      toastr.warning("Something went wrong!");
      props.reportPrintFresh();
    }
  }, [
    props.property_room_list_loading,
    props.store_routine_inspection_add_loading,
    props.inspection_info_details_loading,
    props.update_routine_inspection_add_loading,
    state.verticalActiveTabWithIcon,
    props.sort_room_loading,
    props.update_routine_inspection_image_loading,
    props.inspection_preview_loading,
  ]);

  // console.log(props.update_routine_inspection_image_loading);

  let propsRoomValues = [],
    propsRoomOverView;
  const initCall = () => {
    if (fillState) {
      setForm1State({
        ...form1state,
        switch1: propsRoomOverView.share_with_owner ? true : false,
        switch2: propsRoomOverView.share_with_tenant ? true : false,
        rent: propsRoomOverView.rent_review,
        waterMeter: propsRoomOverView.water_meter_reading,
        notes: propsRoomOverView.general_notes,
        followUp: propsRoomOverView.follow_up_actions,
      });
    }
    setFillState(false);
  };
  if (props.property_room_list) {
    propsRoomValues = props.property_room_list?.data?.data;
    propsRoomOverView = props.property_room_list?.data?.routine_overview;
    if (propsRoomOverView != null && fillState) {
      initCall();
    }
  }
  // console.log(propsRoomValues);

  let inspectionInfoDetailsData = [];
  if (
    props.inspection_info_details &&
    props.inspection_info_details.data.message === "Successfull"
  ) {
    inspectionInfoDetailsData = props.inspection_info_details?.data?.data;
  }

  const handleInspectionFormState = (val, idx) => {
    let value = [...formState];
    console.log(value);
    value[idx]["routine_description"] = val;
    setFormState(value);
  };
  const handleInspectionFormFileState = (files, idx) => {
    let value = [...formState];
    value[idx]["selectedFiles"] = files;
    setFormState(value);
  };

  let roomValues, roomAttributeValues;
  roomValues = propsRoomValues?.map((item, idx) => {
    let navIndex = 2;
    navIndex += idx;
    return (
      <NavItem key={idx}>
        <NavLink
          style={{ cursor: "pointer" }}
          className={classnames({
            "mb-2": true,
            active: state.verticalActiveTabWithIcon == navIndex,
          })}
          onClick={() => {
            toggleVerticalIcon(navIndex, item.id);
          }}
        >
          <i className="fas fa-home"></i>{" "}
          <span
            style={{
              textDecoration:
                item.delete_status === "false" ? "none" : "line-through",
            }}
          >
            {item.room}
          </span>
        </NavLink>
      </NavItem>
    );
  });

  var routineAttributeFormState = [];
  var editroomAttributeFormState = [];

  propsRoomValues?.map((item, idx) => {
    routineAttributeFormState.push({
      name: item.room,
      inspection_id: insID,
      room_id: item.id,
      property_id: item.property_id,
      routine_description: item.routine_description,
      selectedFiles: [],
    });
  });

  inspectionInfoDetailsData.map((item, idx) => {
    editroomAttributeFormState.push({
      name: item.room,
      inspection_id: insID,
      room_id: item.id,
      property_id: item.property_id,
      routine_description: item.inspectin_details?.routine_description,
      selectedFiles: [],
    });
  });


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


  if (
    routineAttributeFormState.length > 0 &&
    formStateStatus &&
    inspectionInfoDetailsData.length === 0
  ) {
    setFormState(routineAttributeFormState);
    setFormStateStatus(false);
  }

  if (
    inspectionInfoDetailsData.length > 0 &&
    formStateStatus
  ) {
    setFormState(editroomAttributeFormState);
    setFormStateStatus(false);
  }

  const handleFormBtnState = () => {
    if (
      routineAttributeFormState.length > 0 &&
      inspectionInfoDetailsData.length === 0
    ) {
      props.storeRoutineInspectionInfo(formState, form1state, insID, propID);
    } else if (
      editroomAttributeFormState.length > 0 &&
      inspectionInfoDetailsData.length > 0
    ) {
      props.updateRoutineInspectionInfo(formState, form1state, insID, propID);
    }
    // props.InspectionDetailsInfoDataFresh();
  };

  const previewDoc = () => {
    // startLoader();
    props.reportPrint(insID, "report");
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <h4 className="ms-2 text-primary">Inspection Routine Report</h4>
        <Row>
          <Col>
            <Row className="mt-1">
              <Col>
                <Card>
                  <CardBody>
                    {/* <Row>
                      <Col md={9}>
                        <h3 className="text-primary">
                          Inspection Routine Report
                        </h3>
                      </Col>
                    </Row>
                    <div className="borderBottom mt-2" /> */}
                    <Row>
                      <Col md={9}>
                        <Button
                          type="button"
                          className="btn w-md m-1"
                          color="secondary"
                          onClick={() => {
                            history.push("/inspectionInfo/" + insID);
                          }}
                        >
                          <i className="fas fa-arrow-left me-1"></i> Back
                        </Button>
                        <Button
                          type="button"
                          className="btn w-md m-1"
                          color="info"
                          onClick={previewDoc}
                        >
                          <i className="fas fa-print me-1"></i> Print
                        </Button>
                        {/* <EditRoomModal
                          propsRoomValues={propsRoomValues}
                          propsCall={initCall}
                          routine={true}
                          propID={propID}
                          insID={insID}
                          deleteRoom={props.deletePropertyRoom}
                          deleteRoomFresh={props.deleteRoomFresh}
                        /> */}
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
                <Row className="mt-3">
                  <Col md="2">
                    <Card style={{ borderRadius: "15px" }}>
                      <CardBody>
                        <Nav className="flex-column vertical-icon">
                          <NavItem>
                            <NavLink
                              style={{ cursor: "pointer" }}
                              className={classnames({
                                "mb-2": true,
                                active: state.verticalActiveTabWithIcon === "1",
                              })}
                              onClick={() => {
                                toggleVerticalIcon("1");
                              }}
                            >
                              <i className="fas fa-home"></i> Overview
                            </NavLink>
                          </NavItem>
                          {roomValues
                            ? roomValues.sort((a, b) => {
                              if (a.id > b.id) return 1;
                              if (a.id < b.id) return -1;
                              return 0;
                            })
                            : null}
                        </Nav>
                      </CardBody>
                    </Card>
                  </Col>

                  <Col md="10">
                    <Card className="custom_card_border_design me-2 p-5">
                      <TabContent
                        activeTab={state.verticalActiveTabWithIcon}
                        className="text-muted mt-4 mt-md-0"
                      >
                        <TabPane tabId="1">
                          <Form>
                            <Row>
                              <Label
                                htmlFor="horizontal-firstname-Input"
                                className="col-sm-2 col-form-label"
                              >
                                Share with owner
                              </Label>
                              <Col sm={1}>
                                <Switch
                                  uncheckedIcon={<Offsymbol />}
                                  checkedIcon={<OnSymbol />}
                                  className="me-1 mb-sm-8 mb-2"
                                  onColor="#153D58"
                                  onChange={() => {
                                    setForm1State({
                                      ...form1state,
                                      switch1: !form1state.switch1,
                                    });
                                  }}
                                  checked={form1state.switch1}
                                />
                              </Col>

                              <Label
                                htmlFor="horizontal-email-Input"
                                className="col-sm-2 col-form-label"
                              >
                                Share with tenant
                              </Label>
                              <Col sm={1}>
                                <Switch
                                  uncheckedIcon={<Offsymbol />}
                                  checkedIcon={<OnSymbol />}
                                  className="me-1 mb-sm-8 mb-2"
                                  onColor="#153D58"
                                  onChange={() => {
                                    setForm1State({
                                      ...form1state,
                                      switch2: !form1state.switch2,
                                    });
                                  }}
                                  checked={form1state.switch2}
                                />
                              </Col>

                              {/* <Label
                                htmlFor="horizontal-password-Input"
                                className="col-sm-3 col-form-label"
                              >
                                Rent review
                              </Label> */}
                              <Col sm={3} className="d-flex gap-1">
                                <span className="input-group-append rounded-start">
                                  <span
                                    className="input-group-text"
                                    style={{
                                      borderTopRightRadius: 0,
                                      borderBottomRightRadius: 0,
                                      fontWeight: 600,
                                      color: "#127afa !important",
                                    }}
                                  >
                                    $
                                  </span>
                                </span>
                                <div className="form-group">
                                  <Input
                                    type="text"
                                    className="form-control"
                                    id="horizontal-password-Input"
                                    placeholder="0.00"
                                    name="rent"
                                    value={form1state.rent}
                                    onChange={e => {
                                      setForm1State({
                                        ...form1state,
                                        rent: e.target.value,
                                      });
                                    }}
                                    style={{
                                      borderTopLeftRadius: 0,
                                      borderBottomLeftRadius: 0,
                                      fontWeight: 600,
                                      color: "#127afa !important",
                                    }}
                                  />
                                  <label htmlFor="usr">Rent review</label>
                                </div>
                              </Col>

                              {/* <Label
                                htmlFor="horizontal-password-Input"
                                className="col-sm-3 col-form-label"
                              >
                                Water Meter Reading
                              </Label> */}
                              <Col sm={3}>
                                <div className="form-group mt-1">
                                  <Input
                                    type="text"
                                    className="form-control"
                                    id="horizontal-password-Input"
                                    placeholder="0"
                                    value={form1state.waterMeter}
                                    onChange={e => {
                                      setForm1State({
                                        ...form1state,
                                        waterMeter: e.target.value,
                                      });
                                    }}
                                  />
                                  <label htmlFor="usr">
                                    Water Meter Reading
                                  </label>
                                </div>
                              </Col>
                            </Row>

                            <div className="row mb-4">
                              <Label
                                htmlFor="horizontal-password-Input"
                                className="col-sm-3 col-form-label"
                              >
                                General Notes
                              </Label>
                              <Col>
                                <Input
                                  type="textarea"
                                  className="form-control"
                                  id="horizontal-password-Input"
                                  value={form1state.notes}
                                  onChange={e => {
                                    setForm1State({
                                      ...form1state,
                                      notes: e.target.value,
                                    });
                                  }}
                                />
                              </Col>
                            </div>

                            <div className="row mb-4">
                              <Label
                                htmlFor="horizontal-password-Input"
                                className="col-sm-3 col-form-label"
                              >
                                Follow up actions
                              </Label>
                              <Col>
                                <Input
                                  type="textarea"
                                  className="form-control"
                                  id="horizontal-password-Input"
                                  placeholder=""
                                  value={form1state.followUp}
                                  onChange={e => {
                                    setForm1State({
                                      ...form1state,
                                      followUp: e.target.value,
                                    });
                                  }}
                                  maxLength="225"
                                  rows="8"
                                  style={{
                                    fontWeight: 600,
                                    color: "#127afa !important",
                                  }}
                                />
                              </Col>
                            </div>
                          </Form>
                        </TabPane>

                        {inspectionInfoDetailsData.length > 0 &&
                          inspectionInfoDetailsData.map((item, idx) => {
                            let navIndex = 2;
                            navIndex += idx;

                            return (
                              <TabPane tabId={navIndex} key={idx}>
                                <EditRoutineAttributeForm
                                  roomStatus={item.delete_status}
                                  attrRoomName={item.room}
                                  // routineDescription={item.inspectin_details.routine_description}
                                  handleFormState={handleInspectionFormState}
                                  handleFormFileState={
                                    handleInspectionFormFileState
                                  }
                                  index={idx}
                                  state={editroomAttributeFormState[idx]}
                                  inspectionID={insID}
                                  roomId={item.id}
                                  propertyId={item.property_id}
                                  dummyImage={
                                    props.get_routine_inspection_image
                                      ? props.get_routine_inspection_image.data
                                        ? props.get_routine_inspection_image
                                          .data.data.length > 0
                                          ? props.get_routine_inspection_image
                                            .data.data
                                          : DummyImg
                                        : DummyImg
                                      : DummyImg
                                  }
                                />
                              </TabPane>
                            );
                          })}
                        {inspectionInfoDetailsData.length == 0 &&
                          propsRoomValues?.map((item, idx) => {
                            let navIndex = 2;
                            navIndex += idx;

                            return (
                              <TabPane tabId={navIndex} key={idx}>
                                <RoutineAttributeForm
                                  roomStatus={item.delete_status}
                                  attrRoomName={item.room}
                                  handleFormState={handleInspectionFormState}
                                  handleFormFileState={
                                    handleInspectionFormFileState
                                  }
                                  routineDescription={item.description}
                                  index={idx}
                                  inspectionID={insID}
                                  roomId={item.id}
                                  propertyId={item.property_id}
                                  dummyImage={
                                    props.get_routine_inspection_image
                                      ? props.get_routine_inspection_image.data
                                        ? props.get_routine_inspection_image
                                          .data.data.length > 0
                                          ? props.get_routine_inspection_image
                                            .data.data
                                          : DummyImg
                                        : DummyImg
                                      : DummyImg
                                  }
                                />
                              </TabPane>
                            );
                          })}
                      </TabContent>
                      {/* <Button
                        color="buttonColor"
                        className="w-md"
                        onClick={handleFormBtnState}
                      >
                        Submit
                      </Button> */}

                      {/* <Row>
                        <Col
                          md={12}
                          className="mt-1 d-flex justify-content-end"
                        >
                          <Button
                            color="buttonColor"
                            className="w-md"
                            onClick={handleFormBtnState}
                          >
                            Submit
                          </Button>
                        </Col>
                      </Row> */}
                    </Card>
                  </Col>
                </Row>

                <Row>
                  <Col
                    md={12}
                    className="mt-1 d-flex justify-content-end"
                  >
                    <Button
                      color="buttonColor"
                      className="w-md"
                      onClick={handleFormBtnState}
                    >
                      Submit
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = gstate => {
  const {
    property_room_list,
    property_room_list_error,
    property_room_list_loading,

    store_routine_inspection_add_data,
    store_routine_inspection_add_error,
    store_routine_inspection_add_loading,

    inspection_info_details,
    inspection_info_details_error,
    inspection_info_details_loading,

    update_routine_inspection_add_data,
    update_routine_inspection_add_error,
    update_routine_inspection_add_loading,
    get_routine_inspection_image_loading,
    get_routine_inspection_image,

    update_routine_inspection_image_loading,

    sort_room_loading,

    inspection_preview_loading,
  } = gstate.Inspections;

  return {
    property_room_list,
    property_room_list_error,
    property_room_list_loading,

    store_routine_inspection_add_data,
    store_routine_inspection_add_error,
    store_routine_inspection_add_loading,

    inspection_info_details,
    inspection_info_details_error,
    inspection_info_details_loading,

    update_routine_inspection_add_data,
    update_routine_inspection_add_error,
    update_routine_inspection_add_loading,

    update_routine_inspection_image_loading,

    get_routine_inspection_image_loading,
    get_routine_inspection_image,

    sort_room_loading,

    inspection_preview_loading,
  };
};

export default withRouter(
  connect(mapStateToProps, {
    getPropertyRooms,
    storeRoutineInspectionInfo,
    storeRoutineInspectionInfoFresh,
    InspectionDetailsInfoData,
    InspectionDetailsInfoDataFresh,
    updateRoutineInspectionInfo,
    updateRoutineInspectionInfoFresh,
    GetRoutineInspectionImageFresh,
    GetRoutineInspectionImage,
    deletePropertyRoom,
    sortRoomFresh,
    getPropertyRoomFresh,
    updateRoutineInspectionImageFresh,
    deleteRoomFresh,
    reportPrint,
    reportPrintFresh,
  })(InspectionRoutineReport)
);
