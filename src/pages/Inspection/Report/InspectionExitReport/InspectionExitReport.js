import React, { useEffect, useRef, useState } from "react";
import "../../InspectionInfo.css";
import { useParams, withRouter, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import ExitAttributeForm from "./ExitAttributeForm";
import EditExitAttributeForm from "./EditExitAttributeForm";
import toastr from "toastr";

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
  storeInspectionInfo,
  storeInspectionFresh,
  InspectionDetailsInfoDataEntryExit,
  InspectionDetailsInfoData,
  InspectionDetailsInfoDataFresh,
  updateInspectionInfoDetailsFresh,
  updateInspectionInfoDetails,
  GetRoutineInspectionImageFresh,
  GetRoutineInspectionImage,
  updateRoutineInspectionImageFresh,
  GetDescription,
  GetDescriptionFresh,
  deletePropertyRoom,
  getPropertyRoomFresh,
  reportPrint,
  reportPrintFresh,
} from "store/actions";

import EditRoomModal from "pages/Inspection/RoomEdit/EditRoomModal";

import DummyImg from "../../../../assets/images/dummy-image-square.jpg";

import classnames from "classnames";
import Switch from "react-switch";
import Breadcrumbs from "components/Common/Breadcrumb";

const InspectionExitReport = props => {
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
  const [showDropZone, setShowDropZone] = useState({
    propertyPhoto: false,
  });
  const [formState, setFormState] = useState([]);
  const [formStateStatus, setFormStateStatus] = useState(true);
  const [description, setDescription] = useState("");
  const [editDescription, setEditDescription] = useState([]);
  const [descriptionStatus, setDescriptionStatus] = useState(true);
  const [inspectionInfoDetailsMapData, setInspectionInfoDetailsMapData] =
    useState([]);
  const [
    inspectionInfoDetailsMapDataStatus,
    setInspectionInfoDetailsMapDataStatus,
  ] = useState(true);
  const [fillState, setFillState] = useState(true);
  const [init, setInit] = useState(true);

  const handleDescription = (e, idx) => {
    let desc = [...description];
    desc[idx]["description"] = e.target.value;
    setDescription(desc);
  };
  const handleEditDescription = (e, idx) => {
    let desc = [...editDescription];
    desc[idx]["description"] = e.target.value;
    setEditDescription(desc);
  };
  const toggleVerticalIcon = (tab, room_id) => {
    if (state.verticalActiveTabWithIcon !== tab) {
      setState({
        verticalActiveTabWithIcon: tab,
      });
    }
    props.GetRoutineInspectionImageFresh();
    props.GetRoutineInspectionImage(insID, room_id, propID);
  };
  if (init) {
    props.InspectionDetailsInfoDataEntryExit(insID);
    setInit(false);
  }

  useEffect(() => {
    if (props.inspected_description_loading === false) {
      props.GetDescription(insID, propID);
      //   setDescriptionStatus(true);
    }
    if (props.update_routine_inspection_image_loading === "Success") {
      toastr.success("Image uploaded successfully.");
      props.updateRoutineInspectionImageFresh();
    }
    if (props.property_room_list_loading === false) {
      props.getPropertyRooms(propID, insID);
    }
    if (props.store_inspection_add_loading === "Success") {
      toastr.success("Inspection details added");
      props.storeInspectionFresh();
      props.getPropertyRoomFresh();
    }
    if (props.inspection_info_details_loading === false) {
      //   props.InspectionDetailsInfoData(insID);
      props.InspectionDetailsInfoDataEntryExit(insID);
    }
    if (props.update_inspection_details_loading === "Success") {
      toastr.success("Inspection details updated");

      setInspectionInfoDetailsMapData([]);
      setInspectionInfoDetailsMapDataStatus(true);
      props.updateInspectionInfoDetailsFresh();
      // props.InspectionDetailsInfoDataEntryExit(insID);
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
    props.store_inspection_add_loading,
    props.inspection_info_details_loading,
    props.inspection_info_details,
    props.update_inspection_details_loading,
    props.update_routine_inspection_image_loading,
    props.inspected_description_loading,
    props.inspection_preview_loading,
  ]);

  let propsRoomValues = [];
  let propsRoomOverView = undefined;
  const lol = () => {
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
    propsRoomValues = props.property_room_list.data.data;

    propsRoomOverView = props.property_room_list.data.routine_overview;
    if (propsRoomOverView != null && fillState) {
      lol();
    }
  }

  let inspectionInfoDetailsData = [];
  if (
    props.inspection_info_details &&
    props.inspection_info_details.data.message === "Successfull"
  ) {
    inspectionInfoDetailsData = props.inspection_info_details.data.data;
  }

  let inspecInfoDetailsMapData = [];
  if (inspectionInfoDetailsData.length > 0) {
    inspecInfoDetailsMapData = propsRoomValues.map((item, idx) => {
      let mapData = [];
      mapData = inspectionInfoDetailsData.filter((i, idxx) => {
        return item.id === i.room_id;
      });
      return mapData;
    });
  }
  if (
    inspecInfoDetailsMapData.length > 0 &&
    inspectionInfoDetailsMapDataStatus === true
  ) {
    setInspectionInfoDetailsMapData(inspecInfoDetailsMapData);
    setInspectionInfoDetailsMapDataStatus(false);
  }

  const handleInspectionFormState = (
    e,
    idx = null,
    roomIdx = null,
    booleanValue = null,
    attrRoomName = null,
    attrName = null,
    attrFieldName = null,
    selectedFiles = null
  ) => {
    let value = [...formState];
    let attributeValue = [...value[roomIdx]["name"].attribute];
    attributeValue[idx] = {
      ...attributeValue[idx],
      [attrFieldName]: booleanValue,
    };

    value[roomIdx]["name"] = {
      ...value[roomIdx]["name"],
      name: attrRoomName,
      attribute: [...attributeValue],
      selectedFiles: selectedFiles,
    };
    setFormState(value);
  };

  let roomValues, roomAttributeValues;
  roomValues = propsRoomValues.map((item, idx) => {
    let navIndex = 2;
    navIndex += idx;
    return (
      <NavItem key={idx}>
        <NavLink
          style={{ cursor: "pointer" }}
          className={classnames({
            "mb-2": true,
            active: state.verticalActiveTabWithIcon === navIndex,
          })}
          onClick={() => {
            toggleVerticalIcon(navIndex, item.id);
          }}
        >
          <span
            style={{
              textDecoration:
                item.delete_status === "false" ? "none" : "line-through",
            }}
          >
            <i className="fas fa-home"></i> {item.room}
          </span>
        </NavLink>
      </NavItem>
    );
  });

  let roomAttributeFormState = [],
    desc = [];
  roomAttributeValues = propsRoomValues.map((item, idx) => {
    let navIndex = 2;
    navIndex += idx;
    let attributeArray = [];
    item.property_attribute.map((i, idxx) => {
      attributeArray.push({
        attr1: i.field,
        clean: "",
        undamaged: "",
        working: "",
        comment: "",
      });
    });

    roomAttributeFormState.push({
      name: {
        name: item.room,
        inspection_id: insID,
        room_id: item.id,
        property_id: item.property_id,
        attribute: attributeArray,
        selectedFiles: [],
      },
    });

    desc.push({ description: "" });

    return (
      <TabPane tabId={navIndex} key={idx}>
        <ExitAttributeForm
          attribute={item.property_attribute}
          roomStatus={item.delete_status}
          handleFormState={handleInspectionFormState}
          attrRoomName={item.room}
          roomIdx={idx}
          dummyImage={
            props.get_routine_inspection_image
              ? props.get_routine_inspection_image.data
                ? props.get_routine_inspection_image.data.data.length > 0
                  ? props.get_routine_inspection_image.data.data
                  : DummyImg
                : DummyImg
              : DummyImg
          }
          roomId={item.id}
          inspectionID={insID}
          propertyId={propID}
          handleDescription={handleDescription}
        />
      </TabPane>
    );
  });

  let editroomAttributeFormState = [],
    editRoomAttributeValues = [];
  if (inspectionInfoDetailsData.length > 0) {
    editRoomAttributeValues = propsRoomValues.map((item, idx) => {
      let navIndex = 2;
      navIndex += idx;
      let attributeArray = [];
      if (inspectionInfoDetailsMapData.length > 0) {
        inspectionInfoDetailsMapData[idx].map((i, idxx) => {
          attributeArray.push({
            attr1: i.room_attributes,
            clean: i.clean,
            undamaged: i.undamaged,
            working: i.working,
            comment: i.comment,
          });
        });
      } else {
        inspecInfoDetailsMapData[idx].map((i, idxx) => {
          attributeArray.push({
            attr1: i.room_attributes,
            clean: i.clean,
            undamaged: i.undamaged,
            working: i.working,
            comment: i.comment,
          });
        });
      }

      editroomAttributeFormState.push({
        name: {
          name: item.room,
          inspection_id: insID,
          room_id: item.id,
          property_id: item.property_id,
          attribute: attributeArray,
          routine_description:
            inspectionInfoDetailsData[idx]["routine_description"],
          selectedFiles: [],
        },
      });
      // const description_data = editDescription != "[]" && editDescription[idx];

      return (
        <TabPane tabId={navIndex} key={idx}>
          <EditExitAttributeForm
            roomStatus={item.delete_status}
            attribute={inspectionInfoDetailsMapData[idx]}
            handleFormState={handleInspectionFormState}
            attrRoomName={item.room}
            roomIdx={idx}
            dummyImage={
              props.get_routine_inspection_image
                ? props.get_routine_inspection_image.data
                  ? props.get_routine_inspection_image.data.data.length > 0
                    ? props.get_routine_inspection_image.data.data
                    : DummyImg
                  : DummyImg
                : DummyImg
            }
            roomId={item.id}
            inspectionID={insID}
            propertyId={propID}
            handleDescription={handleEditDescription}
            description={
              editDescription.length > 0
                ? editDescription[idx]["description"]
                : ""
            }
          // description={description_data["description"]}
          />
        </TabPane>
      );
    });
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

  if (
    roomAttributeFormState.length > 0 &&
    formStateStatus &&
    inspectionInfoDetailsData.length === 0
  ) {
    setDescription(desc);
    setFormState(roomAttributeFormState);
    setFormStateStatus(false);
  }

  if (
    editroomAttributeFormState.length > 0 &&
    formStateStatus &&
    inspectionInfoDetailsData.length > 0
  ) {
    setFormState(editroomAttributeFormState);
    setFormStateStatus(false);
  }

  const handleFormBtnState = () => {
    if (
      roomAttributeFormState.length > 0 &&
      inspectionInfoDetailsData.length === 0 &&
      propsRoomOverView == null
    ) {
      props.storeInspectionInfo(
        formState,
        form1state,
        insID,
        propID,
        description
      );
    } else if (
      editroomAttributeFormState.length >= 0 &&
      inspectionInfoDetailsData.length >= 0 &&
      propsRoomOverView != null
    ) {
      const finalDesc =
        propsRoomOverView != null && inspectionInfoDetailsData.length == 0
          ? description
          : editDescription;
      props.updateInspectionInfoDetails(
        formState,
        form1state,
        insID,
        propID,
        finalDesc
      );
      console.log("====================================");
      console.log("update" + " " + description);
      console.log("update" + " " + editDescription);
      console.log("update" + " " + finalDesc);
      console.log("====================================");
    }
    setDescriptionStatus(true);
    // props.GetDescriptionFresh();
    // props.InspectionDetailsInfoDataFresh();

    // console.log(editroomAttributeFormState);
    // console.log(inspectionInfoDetailsData);
    // console.log(propsRoomOverView);
  };

  if (props.inspected_description && descriptionStatus) {
    setEditDescription(props.inspected_description.data.data);
    setDescriptionStatus(false);
  }

  // console.log(editDescription);
  // console.log('Im in exit main component');

  const previewDoc = () => {
    // startLoader();
    props.reportPrint(insID, "exit");
    // console.log('====================================');
    // console.log("in");
    // console.log('====================================');
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Breadcrumbs
          title="Inspection Exit Report"
          breadcrumbItem="Inspections"
        />

        <Row>
          <Col>
            <Row className="m-2">
              <Card>
                <CardBody>
                  {/* <Row>
                    <Col md={9}>
                      <h3 className="text-primary">Inspection Exit Report</h3>
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
                        deleteRoom={props.deletePropertyRoom}
                      /> */}
                    </Col>
                  </Row>
                </CardBody>
              </Card>
              <Col>
                <Row className="mt-3">
                  <Col md="3">
                    <Card>
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
                          {roomValues ? roomValues : null}
                        </Nav>
                      </CardBody>
                    </Card>
                  </Col>

                  <Col md="9">
                    <TabContent
                      activeTab={state.verticalActiveTabWithIcon}
                      className="text-muted mt-4 mt-md-0"
                    >
                      <TabPane tabId="1">
                        <Form>
                          <div className="row mb-4">
                            <Label
                              htmlFor="horizontal-firstname-Input"
                              className="col-sm-3 col-form-label"
                            >
                              Share with owner
                            </Label>
                            <Col sm={9}>
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
                          </div>
                          <div className="row mb-4">
                            <Label
                              htmlFor="horizontal-password-Input"
                              className="col-sm-3 col-form-label"
                            >
                              Rent review
                            </Label>
                            <Col sm={2} className="d-flex">
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
                            </Col>
                          </div>

                          <div className="row mb-4">
                            <Label
                              htmlFor="horizontal-password-Input"
                              className="col-sm-3 col-form-label"
                            >
                              Water Meter Reading
                            </Label>
                            <Col sm={2}>
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
                            </Col>
                          </div>

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
                        propsRoomOverView != null
                        ? editRoomAttributeValues
                        : roomAttributeValues}
                    </TabContent>
                    <Button
                      color="info"
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

    store_inspection_add_data,
    store_inspection_add_error,
    store_inspection_add_loading,

    inspection_info_details,
    inspection_info_details_error,
    inspection_info_details_loading,

    update_inspection_details_data,
    update_inspection_details_error,
    update_inspection_details_loading,

    get_routine_inspection_image,

    update_routine_inspection_image_loading,

    inspected_description,
    inspected_description_error,
    inspected_description_loading,

    inspection_preview_loading,
  } = gstate.Inspections;

  return {
    property_room_list,
    property_room_list_error,
    property_room_list_loading,

    store_inspection_add_data,
    store_inspection_add_error,
    store_inspection_add_loading,

    inspection_info_details,
    inspection_info_details_error,
    inspection_info_details_loading,

    update_inspection_details_data,
    update_inspection_details_error,
    update_inspection_details_loading,

    get_routine_inspection_image,
    update_routine_inspection_image_loading,

    inspected_description,
    inspected_description_error,
    inspected_description_loading,
    inspection_preview_loading,
  };
};

export default withRouter(
  connect(mapStateToProps, {
    getPropertyRooms,
    storeInspectionInfo,
    storeInspectionFresh,
    InspectionDetailsInfoDataEntryExit,
    InspectionDetailsInfoData,
    InspectionDetailsInfoDataFresh,
    updateInspectionInfoDetails,
    updateInspectionInfoDetailsFresh,
    GetRoutineInspectionImageFresh,
    GetRoutineInspectionImage,
    updateRoutineInspectionImageFresh,
    GetDescription,
    GetDescriptionFresh,
    deletePropertyRoom,
    getPropertyRoomFresh,
    reportPrint,
    reportPrintFresh,
  })(InspectionExitReport)
);
