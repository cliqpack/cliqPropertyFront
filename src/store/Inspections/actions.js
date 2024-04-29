import axios from "axios";
import { property } from "lodash";
import { PropertyAllActivity } from "store/actions";

export const addInspectionInfo = (property, contact) => {
  console.log(property, contact);
  var authUser = JSON.parse(localStorage.getItem("authUser"));

  const newUrl = process.env.REACT_APP_LOCALHOST;
  var url = newUrl + "/inspection";

  const headers = {
    "Content-Type": "application/json",

    "Access-Control-Allow-Origin": "*",

    Authorization: "Bearer " + authUser.token,
  };
  const formData = {
    property_id: property.property_id,
    inspection_type: property.inspection_type,
    inspection_date: property.inspection_date,
    start_time: property.start_time,
    end_time: property.end_time,
    duration: property.duration,
    summery: property.summery,
    manager_id: property.manager_id,
    owner_contact_id: contact.owner_contact_id,
    tenant_contact_id: contact.tenant_contact_id,
  };

  return dispatch => {
    axios
      .post(url, formData, { headers: headers })
      .then(response => {
        dispatch({
          type: "INSPECTION_DATA",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "INSPECTION_DATA",
          error: error,
          status: "Failed",
        });
      });
  };
};

export const addInspectionFresh = () => {
  return dispatch =>
    dispatch({
      type: "INSPECTION_ADD_FRESH",
      payload: null,
      error: null,
      status: false,
    });
};

export const getInspectionList = (page, sizePerPage, search = null, sortField = null, sortValue = null) => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  let property_id = localStorage.getItem("owner_property_id");
  const newUrl = process.env.REACT_APP_LOCALHOST;
  // var url = newUrl + "/inspection";
  let url = `${newUrl}/inspection-ssr?page=${page}&sizePerPage=${sizePerPage}&q=${search}&sortField=${sortField}&sortValue=${sortValue}&property_id=${property_id}`;
  return dispatch => {
    const headers = {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",

      Authorization: "Bearer " + authUser.token,
    };
    axios
      .get(url, { headers: headers })
      .then(response => {
        dispatch({
          type: "INSPECTION_LIST",
          payload: response,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "INSPECTION_LIST",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const getInspectionListOther = () => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  const newUrl = process.env.REACT_APP_LOCALHOST;
  var url = newUrl + "/inspection";
  // let url = `${newUrl}/inspection-ssr?page=${page}&sizePerPage=${sizePerPage}&q=${search}&sortField=${sortField}&sortValue=${sortValue}`;
  return dispatch => {
    const headers = {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",

      Authorization: "Bearer " + authUser.token,
    };
    axios
      .get(url, { headers: headers })
      .then(response => {
        dispatch({
          type: "INSPECTION_LIST_OTHER",
          payload: response,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "INSPECTION_LIST_OTHER",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const InspectionListFresh = () => {
  return dispatch =>
    dispatch({
      type: "INSPECTION_LIST_FRESH",
      // payload: null,
      // error: null,
      status: false,
    });
};

export const InspectionListOtherFresh = () => {
  return dispatch =>
    dispatch({
      type: "INSPECTION_LIST_OTHER_FRESH",
      // payload: null,
      // error: null,
      status: false,
    });
};

export const InspectionInfoData = id => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  const newUrl = process.env.REACT_APP_LOCALHOST;
  var url = newUrl + "/inspection/" + id;
  return dispatch => {
    const headers = {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",

      Authorization: "Bearer " + authUser.token,
    };
    axios
      .get(url, { headers: headers })
      .then(response => {
        dispatch({
          type: "INSPECTION_INFO",
          payload: response,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "INSPECTION_INFO",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const InspectionInfoFresh = () => {
  return dispatch =>
    dispatch({
      type: "INSPECTION_INFO_FRESH",
      payload: null,
      error: null,
      status: false,
    });
};

export const updateInspectionInfo = (id, inspection, duration) => {
  console.log(inspection);
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  const newUrl = process.env.REACT_APP_LOCALHOST;
  var url = newUrl + "/inspection/" + id;
  const headers = {
    "Content-Type": "application/json",

    "Access-Control-Allow-Origin": "*",

    Authorization: "Bearer " + authUser.token,
  };
  const formData = {
    inspection_type: inspection.inspection_type,
    inspection_date: inspection.inspection_date,
    start_time: inspection.start_time,
    end_time: inspection.end_time,
    duration: duration ? duration : inspection.duration,
    summery: inspection.summery,
    manager_id: inspection.selectedManager && inspection.selectedManager.value,
  };

  console.log(formData);
  // return;

  return dispatch => {
    axios
      .put(url, formData, { headers: headers })
      .then(response => {
        dispatch({
          type: "INSPECTION_UPDATE",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "INSPECTION_UPDATE",
          error: error,
          status: "Failed",
        });
      });
  };
};

export const InspectionUpdateFresh = () => {
  return dispatch =>
    dispatch({
      type: "INSPECTION_UPDATE_FRESH",
      payload: null,
      error: null,
      status: false,
    });
};

export const geographicLocationData = () => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  const newUrl = process.env.REACT_APP_LOCALHOST;
  var url = newUrl + "/geographic/location";
  return dispatch => {
    const headers = {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",

      Authorization: "Bearer " + authUser.token,
    };
    axios
      .get(url, { headers: headers })
      .then(response => {
        dispatch({
          type: "GEOGRAPHIC_DATA",
          payload: response,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "GEOGRAPHIC_DATA",
          payload: error,
          status: "Failed",
        });
      });
  };
};
export const geographicLocationFresh = () => {
  return dispatch =>
    dispatch({
      type: "GEOGRAPHIC_DATA_FRESH",
      payload: null,
      error: null,
      status: false,
    });
};

export const filteredInspectionData = state => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  const newUrl = process.env.REACT_APP_LOCALHOST;
  var url = newUrl + "/filter/inspection";
  const headers = {
    "Content-Type": "application/json",

    "Access-Control-Allow-Origin": "*",

    Authorization: "Bearer " + authUser.token,
  };
  const formData = {
    manager: state.manager,
    data_set: state.data_set,
    inspection_start_date: state.inspection_due_from_date,
    inspection_end_date: state.inspection_due_to_date,
    agreement_start: state.agreement_ending_from_date,
    agreement_end: state.agreement_ending_to_date,
  };

  return dispatch => {
    axios
      .post(url, formData, { headers: headers })
      .then(response => {
        dispatch({
          type: "FILTER_DATA",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "FILTER_DATA",
          error: error,
          status: "Failed",
        });
      });
  };
};

export const filterFresh = () => {
  return dispatch =>
    dispatch({
      type: "FILTER_DATA_FRESH",
      payload: null,
      error: null,
      status: false,
    });
};

export const getPropertyRooms = (propertyId, inspectionId) => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  const newUrl = process.env.REACT_APP_LOCALHOST;
  var url = newUrl + "/rooms/" + propertyId + "/" + inspectionId;
  return dispatch => {
    const headers = {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",

      Authorization: "Bearer " + authUser.token,
    };
    axios
      .get(url, { headers: headers })
      .then(response => {
        dispatch({
          type: "PROPERTY_ROOM",
          payload: response,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "PROPERTY_ROOM",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const getPropertyRoomFresh = () => {
  return dispatch =>
    dispatch({
      type: "PROPERTY_ROOM_FRESH",
      payload: null,
      error: null,
      status: false,
    });
};

export const storeInspectionInfo = (
  property,
  overview,
  insID,
  propID,
  description
) => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  const newUrl = process.env.REACT_APP_LOCALHOST;
  var url = newUrl + "/inspectionDetails/add";
  const headers = {
    "Content-Type": "application/json",

    "Access-Control-Allow-Origin": "*",

    Authorization: "Bearer " + authUser.token,
  };
  const formData = {
    property,
    share_with_owner: overview.switch1,
    share_with_tanent: overview.switch2,
    rent_review: overview.rent,
    water_meter_reading: overview.waterMeter,
    general_notes: overview.notes,
    follow_up_actions: overview.followUp,
    inspection_id: insID,
    property_id: propID,
    description,
  };

  return dispatch => {
    axios
      .post(url, formData, { headers: headers })
      .then(response => {
        dispatch({
          type: "STORE_INSPECTION_INFO_DATA",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "STORE_INSPECTION_INFO_DATA",
          error: error,
          status: "Failed",
        });
      });
  };
};

export const addInspectionSchedule = (data, address) => {
  console.log(address);
  // return
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  const newUrl = process.env.REACT_APP_LOCALHOST;
  var url = newUrl + "/master/schedule";
  const headers = {
    "Content-Type": "application/json",

    "Access-Control-Allow-Origin": "*",

    Authorization: "Bearer " + authUser.token,
  };

  const formData = {
    manager_id: data.manager_id,
    ins_date: data.ins_date,
    properties: data.properties,
    property: data.property,
    start_time: data.start_time,
    duration:data.duration,
    building_name: address.building_name,
    unit: address.unit,
    number: address.number,
    street: address.street,
    suburb: address.suburb,
    postcode: address.postcode,
    state: address.state,
    country: address.country,
  };
  console.log(formData);
  //  return 0;

  return dispatch => {
    axios
      .post(url, formData, { headers: headers })
      .then(response => {
        dispatch({
          type: "INSPECTION_SCHEDULE_DATA",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "INSPECTION_SCHEDULE_DATA",
          error: error,
          status: "Failed",
        });
      });
  };
};
export const addInspectionScheduleFresh = () => {
  return dispatch =>
    dispatch({
      type: "INSPECTION_SCHEDULE_DATA",
      payload: null,
      error: null,
      status: false,
    });
};

export const getScheduleList = (page, sizePerPage, search = null, sortField = null, sortValue = null) => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  let property_id = localStorage.getItem("owner_property_id");
  var url = `${process.env.REACT_APP_LOCALHOST}/master/schedule-ssr?page=${page}&sizePerPage=${sizePerPage}&q=${search}&sortField=${sortField}&sortValue=${sortValue}&property_id=${property_id}`;
  return dispatch => {
    const headers = {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",

      Authorization: "Bearer " + authUser.token,
    };
    axios
      .get(url, { headers: headers })
      .then(response => {
        dispatch({
          type: "INSPECTION_SCHEDULE_LIST",
          payload: response,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "INSPECTION_SCHEDULE_LIST",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const scheduleListFresh = () => {
  return dispatch => {
    dispatch({
      type: "INSPECTION_SCHEDULE_LIST",
      status: false,
    });
  };
};

export const getInspectedList = (page, sizePerPage, search = null, sortField = null, sortValue = null) => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  let property_id = localStorage.getItem("owner_property_id");

  var url = `${process.env.REACT_APP_LOCALHOST}/inspected-ssr?page=${page}&sizePerPage=${sizePerPage}&q=${search}&sortField=${sortField}&sortValue=${sortValue}&property_id=${property_id}`;
  return dispatch => {
    const headers = {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",

      Authorization: "Bearer " + authUser.token,
    };
    axios
      .get(url, { headers: headers })
      .then(response => {
        dispatch({
          type: "INSPECTION_INSPECTED_LIST",
          payload: response,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "INSPECTION_INSPECTED_LIST",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const inspectedListFresh = () => {
  return dispatch => {
    dispatch({
      type: "INSPECTION_INSPECTED_LIST",
      status: false,
    });
  };
};

export const getUnscheduled = (page, sizePerPage, search = null, sortField = null, sortValue = null) => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  // const newUrl = process.env.REACT_APP_LOCALHOST;
  // var url = newUrl + "/inspection-uninspected";
  let property_id = localStorage.getItem("owner_property_id");
  var url = `${process.env.REACT_APP_LOCALHOST}/inspection-uninspected-ssr?page=${page}&sizePerPage=${sizePerPage}&q=${search}&sortField=${sortField}&sortValue=${sortValue}&property_id=${property_id}`;

  return dispatch => {
    const headers = {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",

      Authorization: "Bearer " + authUser.token,
    };
    axios
      .get(url, { headers: headers })
      .then(response => {
        dispatch({
          type: "UNSCHEDULE_LIST",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "UNSCHEDULE_LIST",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const getUnscheduledFresh = () => {
  return dispatch => {
    dispatch({
      type: "UNSCHEDULE_LIST",
      status: false,
    });
  };
};

export const getScheduleListFresh = () => {
  return dispatch => {
    dispatch({
      type: "SCHEDULE_LIST",
      payload: null,
      status: false,
    });
  };
};

export const storeInspectionFresh = () => {
  return dispatch =>
    dispatch({
      type: "STORE_INSPECTION_INFO_FRESH",
      payload: null,
      error: null,
      status: false,
    });
};

export const InspectionDetailsInfoData = id => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  const newUrl = process.env.REACT_APP_LOCALHOST;
  var url = newUrl + "/inspectionDetails/" + id;
  return dispatch => {
    const headers = {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",

      Authorization: "Bearer " + authUser.token,
    };
    axios
      .get(url, { headers: headers })
      .then(response => {
        dispatch({
          type: "INSPECTION_INFO_DETAILS",
          payload: response,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "INSPECTION_INFO_DETAILS",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const InspectionDetailsInfoDataEntryExit = id => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  const newUrl = process.env.REACT_APP_LOCALHOST;
  var url = newUrl + "/inspectionDetails-entry-exit/" + id;
  return dispatch => {
    const headers = {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",

      Authorization: "Bearer " + authUser.token,
    };
    axios
      .get(url, { headers: headers })
      .then(response => {
        dispatch({
          type: "INSPECTION_INFO_DETAILS",
          payload: response,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "INSPECTION_INFO_DETAILS",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const InspectionDetailsInfoDataFresh = () => {
  return dispatch =>
    dispatch({
      type: "INSPECTION_INFO_DETAILS_FRESH",
      payload: null,
      error: null,
      status: false,
    });
};

export const updateInspectionInfoDetails = (
  property,
  overview,
  inspectionID,
  propertyID,
  description
) => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  const newUrl = process.env.REACT_APP_LOCALHOST;
  var url =
    newUrl + "/inspectionDetails/update/" + inspectionID + "/" + propertyID;
  const headers = {
    "Content-Type": "application/json",

    "Access-Control-Allow-Origin": "*",

    Authorization: "Bearer " + authUser.token,
  };
  const formData = {
    property,
    share_with_owner: overview.switch1,
    share_with_tanent: overview.switch2,
    rent_review: overview.rent,
    water_meter_reading: overview.waterMeter,
    general_notes: overview.notes,
    follow_up_actions: overview.followUp,
    inspection_id: inspectionID,
    property_id: propertyID,
    description,
  };
  console.log(formData);
  return dispatch => {
    axios
      .put(url, formData, { headers: headers })
      .then(response => {
        dispatch({
          type: "UPDATE_INSPECTION_INFO_DATA",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "UPDATE_INSPECTION_INFO_DATA",
          error: error,
          status: "Failed",
        });
      });
  };
};

export const updateInspectionInfoDetailsFresh = () => {
  return dispatch =>
    dispatch({
      type: "UPDATE_INSPECTION_INFO_DATA_FRESH",
      payload: null,
      error: null,
      status: false,
    });
};

export const storeRoutineInspectionInfo = (
  property,
  overview,
  insID,
  propID
) => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  const newUrl = process.env.REACT_APP_LOCALHOST;
  var url = newUrl + "/routine/inspection/add";
  const headers = {
    "Content-Type": "application/json",

    "Access-Control-Allow-Origin": "*",

    Authorization: "Bearer " + authUser.token,
  };
  const formData = {
    property,
    insID,
    propID,
    switch1: overview.switch1,
    switch2: overview.switch2,
    rent: overview.rent,
    waterMeter: overview.waterMeter,
    notes: overview.notes,
    followUp: overview.followUp,
  };

  return dispatch => {
    axios
      .post(url, formData, { headers: headers })
      .then(response => {
        dispatch({
          type: "STORE_ROUTINE_INSPECTION_INFO_DATA",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "STORE_ROUTINE_INSPECTION_INFO_DATA",
          error: error,
          status: "Failed",
        });
      });
  };
};

export const storeRoutineInspectionInfoFresh = () => {
  return dispatch =>
    dispatch({
      type: "STORE_ROUTINE_INSPECTION_INFO_FRESH",
      payload: null,
      error: null,
      status: false,
    });
};

export const updateRoutineInspectionInfo = (
  property,
  overview,
  inspectionId,
  propID
) => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  const newUrl = process.env.REACT_APP_LOCALHOST;
  var url = newUrl + "/routine/inspection/update/" + inspectionId;
  const headers = {
    "Content-Type": "application/json",

    "Access-Control-Allow-Origin": "*",

    Authorization: "Bearer " + authUser.token,
  };

  const formData = {
    property,
    inspectionId,
    propID,
    switch1: overview.switch1,
    switch2: overview.switch2,
    rent: overview.rent,
    waterMeter: overview.waterMeter,
    notes: overview.notes,
    followUp: overview.followUp,
  };

  return dispatch => {
    axios
      .post(url, formData, { headers: headers })
      .then(response => {
        dispatch({
          type: "UPDATE_ROUTINE_INSPECTION_INFO_DATA",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "UPDATE_ROUTINE_INSPECTION_INFO_DATA",
          error: error,
          status: "Failed",
        });
      });
  };
};

export const updateRoutineInspectionImage = (
  inspectionId,
  files,
  propertyId,
  roomId
) => {
  // console.log(files);
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  const newUrl = process.env.REACT_APP_LOCALHOST;
  // var url = newUrl + "/routine/inspection/image/update/" + inspectionId;
  var url = newUrl + "/uploadMultipleRoutineImage";

  return dispatch => {
    const headers = {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",

      Authorization: "Bearer " + authUser.token,
    };

    let formData = new FormData();
    // formData.append("image", files);
    for (let i = 0; i < files.length; i++) {
      formData.append("image[]", files[i]);
    }
    // files.forEach((file, i) => {
    //   formData.append(`image[]`, file, file.name);
    // });
    formData.append("room_id", roomId);
    formData.append("property_id", propertyId);
    formData.append("inspection_id", inspectionId);

    console.log(files[0]);
    axios
      .post(url, formData, { headers: headers })
      .then(response => {
        dispatch({
          type: "UPDATE_ROUTINE_INSPECTION_IMAGE",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "UPDATE_ROUTINE_INSPECTION_IMAGE",
          error: error,
          status: "Failed",
        });
      });
  };
};

export const updateRoutineInspectionImageFresh = () => {
  return dispatch =>
    dispatch({
      type: "UPDATE_ROUTINE_INSPECTION_IMAGE_FRESH",
      payload: null,
      error: null,
      status: false,
    });
};

export const updateRoutineInspectionInfoFresh = () => {
  return dispatch =>
    dispatch({
      type: "UPDATE_ROUTINE_INSPECTION_INFO_FRESH",
      payload: null,
      error: null,
      status: false,
    });
};

export const GetRoutineInspectionImage = (inspectionID, roomId, propertyId) => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  const newUrl = process.env.REACT_APP_LOCALHOST;
  var url = newUrl + "/get/routine/inspection/image";
  return dispatch => {
    const formData = {
      inspectionID: inspectionID,
      roomId: roomId,
      propertyId: propertyId,
    };
    const headers = {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",

      Authorization: "Bearer " + authUser.token,
    };
    axios
      .post(url, formData, { headers: headers })
      .then(response => {
        dispatch({
          type: "GET_ROUTINE_INSPECTION_IMAGE",
          payload: response,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "GET_ROUTINE_INSPECTION_IMAGE",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const GetRoutineInspectionImageFresh = () => {
  return dispatch =>
    dispatch({
      type: "GET_ROUTINE_INSPECTION_IMAGE_FRESH",
      status: false,
    });
};

export const updatePictureIns = (file, id) => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  let url = process.env.REACT_APP_LOCALHOST + "/uploadInspectionImage";
  return dispatch => {
    const headers = {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",

      Authorization: "Bearer " + authUser.token,
    };
    let formData = new FormData();
    formData.append("image", file);
    formData.append("id", id);

    axios
      .post(url, formData, { headers: headers })
      .then(response => {
        dispatch(InspectionInfoData(id));
      })
      .catch(error => {
        dispatch({
          type: "USER_LIST",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const GetDescription = (inspectionID, propertyId) => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  const newUrl = process.env.REACT_APP_LOCALHOST;
  var url = `${newUrl}/get/description/${propertyId}/${inspectionID}`;
  return dispatch => {
    const headers = {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",

      Authorization: "Bearer " + authUser.token,
    };
    axios
      .get(url, { headers: headers })
      .then(response => {
        dispatch({
          type: "GET_DESCRIPTION",
          payload: response,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "GET_DESCRIPTION",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const GetDescriptionFresh = () => {
  return dispatch =>
    dispatch({
      type: "GET_DESCRIPTION_FRESH",
      payload: null,
      error: null,
      status: false,
    });
};

export const lebelInsert = (insId, lebels) => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  const newUrl = process.env.REACT_APP_LOCALHOST;
  var url = newUrl + "/inspection/info/label";
  const headers = {
    "Content-Type": "application/json",

    "Access-Control-Allow-Origin": "*",

    Authorization: "Bearer " + authUser.token,
  };

  const formData = {
    inspection_id: insId,
    labels: lebels,
  };

  return dispatch => {
    axios
      .post(url, formData, { headers: headers })
      .then(response => {
        dispatch(InspectionInfoData(insId));
      })
      .catch(error => {
        dispatch({
          type: "INSPECTION_LEBEL",
          error: error,
          status: "Failed",
        });
      });
  };
};

export const insComplete = insId => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  const newUrl = process.env.REACT_APP_LOCALHOST;
  var url = newUrl + "/inspection/complete/" + insId;
  const headers = {
    "Content-Type": "application/json",

    "Access-Control-Allow-Origin": "*",

    Authorization: "Bearer " + authUser.token,
  };

  return dispatch => {
    axios
      .get(url, { headers: headers })
      .then(response => {
        dispatch({
          type: "INSPECTION_STATUS",
          payload: response.data,
          status: "Completed",
        });
      })
      .catch(error => {
        dispatch({
          type: "INSPECTION_STATUS",
          error: error,
          status: "Failed",
        });
      });
  };
};

export const inspected = insId => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  const newUrl = process.env.REACT_APP_LOCALHOST;
  var url = newUrl + "/inspection/Inspected";
  const headers = {
    "Content-Type": "application/json",

    "Access-Control-Allow-Origin": "*",

    Authorization: "Bearer " + authUser.token,
  };

  const formData = {
    inspection_id: insId,
  };

  return dispatch => {
    axios
      .post(url, formData, { headers: headers })
      .then(response => {
        dispatch({
          type: "INSPECTION_STATUS",
          payload: response.data,
          status: "Inspected",
        });
      })
      .catch(error => {
        dispatch({
          type: "INSPECTION_STATUS",
          error: error,
          status: "Failed",
        });
      });
  };
};

export const markAsScheduled = insId => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  const newUrl = process.env.REACT_APP_LOCALHOST;
  var url = newUrl + "/inspection/markAsSchedule";
  const headers = {
    "Content-Type": "application/json",

    "Access-Control-Allow-Origin": "*",

    Authorization: "Bearer " + authUser.token,
  };

  const formData = {
    inspection_id: insId,
  };

  return dispatch => {
    axios
      .post(url, formData, { headers: headers })
      .then(response => {
        dispatch({
          type: "INSPECTION_STATUS",
          payload: response.data,
          status: "Scheduled",
        });
      })
      .catch(error => {
        dispatch({
          type: "INSPECTION_STATUS",
          error: error,
          status: "Failed",
        });
      });
  };
};

export const insDelete = insId => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  const newUrl = process.env.REACT_APP_LOCALHOST;
  var url = newUrl + "/inspection/inspectionDeleteAxios";
  const headers = {
    "Content-Type": "application/json",

    "Access-Control-Allow-Origin": "*",

    Authorization: "Bearer " + authUser.token,
  };

  const formData = {
    inspection_id: insId,
  };

  return dispatch => {
    axios
      .post(url, formData, { headers: headers })
      .then(response => {
        dispatch({
          type: "INSPECTION_STATUS",
          payload: response.data,
          status: "Deleted",
        });
      })
      .catch(error => {
        dispatch({
          type: "INSPECTION_STATUS",
          error: error,
          status: "Failed",
        });
      });
  };
};

export const InspectionStatusFresh = () => {
  return dispatch =>
    dispatch({
      type: "INSPECTION_STATUS",
      payload: null,
      error: null,
      status: false,
    });
};

export const editInspectionSchedule = (data, address) => {
  console.log(address);
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  const newUrl = process.env.REACT_APP_LOCALHOST;
  var url = newUrl + "/master/scheduleEdit";
  const headers = {
    "Content-Type": "application/json",

    "Access-Control-Allow-Origin": "*",

    Authorization: "Bearer " + authUser.token,
  };

  const formData = {
    manager_id: data.manager_id,
    ins_date: data.ins_date,
    properties: data.properties,
    property: data.property,
    start_time: data.start_time,
    duration:data.duration,
    schedule_id: data.schedule_id,
    building_name: address.building_name,
    unit: address.unit,
    number: address.number,
    street: address.street,
    suburb: address.suburb,
    postcode: address.postcode,
    state: address.state,
    country: address.country,

  };
  console.log(formData);


  return dispatch => {
    axios
      .post(url, formData, { headers: headers })
      .then(response => {
        dispatch({
          type: "INSPECTION_SCHEDULE_DATA_EDIT",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "INSPECTION_SCHEDULE_DATA_EDIT",
          error: error,
          status: "Failed",
        });
      });
  };
};
export const editInspectionScheduleFresh = () => {
  return dispatch =>
    dispatch({
      type: "INSPECTION_SCHEDULE_DATA_EDIT",
      payload: null,
      error: null,
      status: false,
    });
};

export const deletePropertyRoom = (id, propId) => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  const newUrl = process.env.REACT_APP_LOCALHOST;
  var url = newUrl + "/inspection/routine/room-delete";
  const headers = {
    "Content-Type": "application/json",

    "Access-Control-Allow-Origin": "*",

    Authorization: "Bearer " + authUser.token,
  };

  const formData = {
    room_id: id,
    property_id: propId,
  };

  return dispatch => {
    axios
      .post(url, formData, { headers: headers })
      .then(response => {
        dispatch({
          type: "DELETE_PROPERTY_ROOM",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "DELETE_PROPERTY_ROOM",
          status: "Failed",
        });
      });
  };
};

export const deleteRoomFresh = () => {
  return dispatch =>
    dispatch({
      type: "DELETE_PROPERTY_ROOM_FRESH",
      payload: null,
      error: null,
      status: false,
    });
};

export const restorePropertyRoom = (id, propId) => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  const newUrl = process.env.REACT_APP_LOCALHOST;
  var url = newUrl + "/inspection/routine/room-delete-undo";
  const headers = {
    "Content-Type": "application/json",

    "Access-Control-Allow-Origin": "*",

    Authorization: "Bearer " + authUser.token,
  };

  const formData = {
    room_id: id,
    property_id: propId,
  };

  return dispatch => {
    axios
      .post(url, formData, { headers: headers })
      .then(response => {
        dispatch({
          type: "RESTORE_PROPERTY_ROOM",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "RESTORE_PROPERTY_ROOM",
          status: "Failed",
        });
      });
  };
};

export const addRoutineRoom = (propId, state) => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  const newUrl = process.env.REACT_APP_LOCALHOST;
  var url = newUrl + "/inspection/routine/add-room";
  const headers = {
    "Content-Type": "application/json",

    "Access-Control-Allow-Origin": "*",

    Authorization: "Bearer " + authUser.token,
  };

  const formData = {
    property_id: propId,
    room_name: state,
  };

  return dispatch => {
    axios
      .post(url, formData, { headers: headers })
      .then(response => {
        dispatch({
          type: "ADD_ROUTINE_ROOM",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "ADD_ROUTINE_ROOM",
          status: "Failed",
        });
      });
  };
};

export const addRoutineRoomFresh = () => {
  return dispatch =>
    dispatch({
      type: "ADD_ROUTINE_ROOM_FRESH",
      payload: null,
      error: null,
      status: false,
    });
};

export const sortRoom = (id, pId, state) => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  const newUrl = process.env.REACT_APP_LOCALHOST;
  var url = newUrl + `/propertyRoomSequenceUpdate/${id}/${pId}`;
  const headers = {
    "Content-Type": "application/json",

    "Access-Control-Allow-Origin": "*",

    Authorization: "Bearer " + authUser.token,
  };

  const formData = {
    rooms: state.columns[0].cards,
  };

  return dispatch => {
    axios
      .put(url, formData, { headers: headers })
      .then(response => {
        dispatch({
          type: "SORT_ROOM",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "SORT_ROOM",
          status: "Failed",
        });
      });
  };
};

export const sortRoomFresh = () => {
  return dispatch =>
    dispatch({
      type: "SORT_ROOM_FRESH",
      payload: null,
      error: null,
      status: false,
    });
};

export const getMessageTemplatesForInspectionBySelect = (
  data = null,
  query = null,
  data2 = null
) => {
  // console.log(data);
  // console.log(data.map((item) => console.log(item.label)));
  const newData = data.map(item => item.label);
  // console.log(newData);
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  let url = `${process.env.REACT_APP_LOCALHOST}/inspection/message/mail/template/filter`;
  const formData = {
    trigger_to: data,
    trigger_to2: newData,
    query: query,
    data: data2,
  };
  console.log(formData);
  return dispatch => {
    const headers = {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",

      Authorization: "Bearer " + authUser.token,
    };
    axios
      .post(url, formData, { headers: headers })
      .then(response => {
        dispatch({
          type: "GET_MESSAGE_TEMPLATES_FOR_INSPECTION_BY_SELECT",
          payload: response,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "GET_MESSAGE_TEMPLATES_FOR_INSPECTION_BY_SELECT",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const sendMailFromTemplatesInInspection = (id, sub, inspecId, masterId) => {
  console.log(id, sub, inspecId, masterId);
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  var url = `${process.env.REACT_APP_LOCALHOST}/inspection/message/mail/template/activity`;
  const formData = {
    inspection_id: inspecId ? inspecId : null,
    template_id: id,
    subject: sub,
    masterId: masterId ? masterId : null
  };
  console.log(formData);
  // return
  return dispatch => {
    const headers = {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",

      Authorization: "Bearer " + authUser.token,
    };

    axios
      .post(url, formData, { headers: headers })
      .then(response => {
        dispatch({
          type: "SEND_MAIL_TO_ACTIVITY_INSPECTION",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "SEND_MAIL_TO_ACTIVITY_INSPECTION",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const sendMailFromTemplatesInInspectionFresh = () => {
  return dispatch =>
    dispatch({
      type: "SEND_MAIL_TO_ACTIVITY_INSPECTION_FRESH",
    });
};

export const getAllDataForMsgTemplates = () => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  var url = `${process.env.REACT_APP_LOCALHOST}/inspection/message/mail/template/all`;

  return dispatch => {
    const headers = {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",

      Authorization: "Bearer " + authUser.token,
    };

    axios
      .get(url, { headers: headers })
      .then(response => {
        dispatch({
          type: "INSPECTION_MESSAGE_TEMPLATES_ALL",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "INSPECTION_MESSAGE_TEMPLATES_ALL",
          payload: error,
          status: "Failed",
        });
      });
  };
};
// new for pdf download //

export const searchTemplatesFromInspection = (data, id, selected) => {
  console.log(data, selected);
  const newData = selected.map(item => item.label);

  var authUser = JSON.parse(localStorage.getItem("authUser"));
  var url = `${process.env.REACT_APP_LOCALHOST}/inspection/message/mail/template/search`;
  const formData = {
    query: data,
    inspection_id: id,
    trigger_to: newData,
  };
  console.log(formData);
  return dispatch => {
    const headers = {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",

      Authorization: "Bearer " + authUser.token,
    };

    // axios
    //   .post(url, formData, { headers: headers })
    //   .then(response => {
    //     dispatch({
    //       type: "SEARCH_TEMPLATES",
    //       payload: response.data,
    //       status: "Success",
    //     });
    //   })
    //   .catch(error => {
    //     dispatch({
    //       type: "SEARCH_TEMPLATES",
    //       payload: error,
    //       status: "Failed",
    //     });
    //   });
  };
};

export const reportPrint = (id, type) => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  var url = '';
  if (type == "report") {
    url = `${process.env.REACT_APP_LOCALHOST}/inspection/routine/pdf/${id}`;
  } else if (type == "entry") {
    url = `${process.env.REACT_APP_LOCALHOST}/inspection/entry/pdf/${id}`;
  } else if (type == "exit") {
    url = `${process.env.REACT_APP_LOCALHOST}/inspection/exit/pdf/${id}`;
  }
  // var url = `${process.env.REACT_APP_LOCALHOST}/disburse/preview`;

  return dispatch => {
    const headers = {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",

      Authorization: "Bearer " + authUser.token,
    };

    const formData = {
      disburse: "",
    };
    console.log(formData);

    axios({
      method: "post",
      responseType: "blob",
      url,
      headers,
      data: formData,
    })
      .then(response => {
        dispatch({
          type: "REPORT_PREVIEW",
          payload: response.data,
          status: "Success",
        });
        console.log("im in");
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "Report.pdf"); //or any other extension
        document.body.appendChild(link);
        link.click();
      })
      .catch(error => {
        dispatch({
          type: "REPORT_PREVIEW",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const reportPrintFresh = () => {
  return dispatch => {
    dispatch({
      type: "REPORT_PREVIEW_FRESH",
      status: false,
    });
  };
};

export const getCompleteList = (page, sizePerPage, search = null, sortField = null, sortValue = null) => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  let property_id = localStorage.getItem("owner_property_id");
  var url = `${process.env.REACT_APP_LOCALHOST}/complete-ssr?page=${page}&sizePerPage=${sizePerPage}&q=${search}&sortField=${sortField}&sortValue=${sortValue}&property_id=${property_id}`;
  return dispatch => {
    const headers = {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",

      Authorization: "Bearer " + authUser.token,
    };
    axios
      .get(url, { headers: headers })
      .then(response => {
        dispatch({
          type: "INSPECTION_COMPLETE_LIST",
          payload: response,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "INSPECTION_COMPLETE_LIST",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const completeListFresh = () => {
  return dispatch => {
    dispatch({
      type: "INSPECTION_COMPLETE_LIST",
      status: false,
    });
  };
};
