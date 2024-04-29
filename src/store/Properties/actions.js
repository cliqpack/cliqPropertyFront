import axios from "axios";

export const addProperty = (
  property,
  state2,
  description,
  inspection,
  address
) => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  const newUrl = `${process.env.REACT_APP_LOCALHOST}`;
  var url = `${newUrl}/properties`;
  const headers = {
    "Content-Type": "application/json",

    "Access-Control-Allow-Origin": "*",

    Authorization: "Bearer " + authUser.token,
  };
  const formData = {
    reference: property.reference,
    building: address.building,
    unit: address.unit,
    number: address.number,
    street: address.street,
    suburb: address.suburb,
    postcode: address.postcode,
    state: address.state,
    country: address.country,
    manager_id: property.selectedManager.value,
    location: state2.location,
    property_type: property.selectedType.value || "",
    primary_type: property.selectedPrimaryType.value || "",
    description: description,
    bedroom: property.bedroom,
    bathroom: property.bathroom,
    car_space: property.car_space,
    subject: property.subject,
    floor_area: property.selectedFloorArea
      ? property.selectedFloorArea.value
      : null,
    floor_size: property.floorSize,
    land_area: property.selectedLandArea
      ? property.selectedLandArea.value
      : null,
    land_size: property.landSize,
    key_number: property.keyNumber,
    strata_manager_id: property.selectedStrataManager
      ? property.selectedStrataManager.value
      : null,

    routine_inspections_frequency: property.routine_inspections_frequency,
    first_routine: property.first_routine,
    first_routine_frequency_type: inspection.first_routine_frequency_type,
    routine_inspection_due_date: property.routine_inspection_due_date,
    routine_inspections_frequency_type:
      inspection.routine_inspections_frequency_type,
    routine_inspections_UoM: property.routine_inspections_UoM,
    note: property.note,
    youtube_link: property.youtube_link,
    vr_link: property.vr_link,
  };
  return dispatch => {
    axios
      .post(url, formData, { headers: headers })
      .then(response => {
        dispatch({
          type: "PROPERTY_ADD",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "PROPERTY_ADD",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const addCheckoutPropertyKey = (property, status) => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  const newUrl = `${process.env.REACT_APP_LOCALHOST}`;
  var url = `${newUrl}/propertyCheckout/store`;
  const headers = {
    "Content-Type": "application/json",

    "Access-Control-Allow-Origin": "*",

    Authorization: "Bearer " + authUser.token,
  };
  const formData = {
    property_id: property.property_id,
    contact_id: property.contact_id,
    manager_id: property.manager_id,
    return_due: property.return_due,
    return_time: property.return_time,
    note: property.notes,
    status: status,
  };
  return dispatch => {
    axios
      .post(url, formData, { headers: headers })
      .then(response => {
        dispatch({
          type: "PROPERTY_KEY_ADD",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "PROPERTY_KEY_ADD",
          error: error,
          status: "Failed",
        });
      });
  };
};

export const addCheckoutPropertyKeyIn = property => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  const newUrl = `${process.env.REACT_APP_LOCALHOST}`;

  var url = `${newUrl}/propertyCheckin/store`;
  const headers = {
    "Content-Type": "application/json",

    "Access-Control-Allow-Origin": "*",

    Authorization: "Bearer " + authUser.token,
  };
  const formData = {
    property_id: property.property_id,
    contact_id: property.contact_id,
    manager_id: property.manager_id,
    return_due: property.date_return,
    return_time: property.return_time,
    note: property.notes,
  };
  return dispatch => {
    axios
      .post(url, formData, { headers: headers })
      .then(response => {
        dispatch({
          type: "PROPERTY_KEY_ADD",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "PROPERTY_KEY_ADD",
          error: error,
          status: "Failed",
        });
      });
  };
};

export const addCheckoutPropertyKeyUp = property => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  const newUrl = `${process.env.REACT_APP_LOCALHOST}`;

  var url = `${newUrl}/propertyCheckout/update`;
  const headers = {
    "Content-Type": "application/json",

    "Access-Control-Allow-Origin": "*",

    Authorization: "Bearer " + authUser.token,
  };
  const formData = {
    checkout_id: property.checkout_id,
    property_id: property.property_id,
    contact_id: property.contact_id,
    manager_id: property.manager_id,

    return_due: property.return_due,
    return_time: property.return_time,
    note: property.notes,
  };
  return dispatch => {
    axios
      .post(url, formData, { headers: headers })
      .then(response => {
        dispatch({
          type: "PROPERTY_KEY_UPDATE",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "PROPERTY_KEY_UPDATE",
          error: error,
          status: "Failed",
        });
      });
  };
};

export const addCheckoutPropertyKeyFresh = () => {
  return dispatch =>
    dispatch({
      type: "PROPERTY_KEY_ADD_FRESH",
      payload: null,
      error: null,
      status: false,
    });
};

export const updateCheckoutPropertyKeyFresh = () => {
  return dispatch =>
    dispatch({
      type: "PROPERTY_KEY_UPDATE_FRESH",
      payload: null,
      error: null,
      status: false,
    });
};

export const getPropertyKey = id => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  const newUrl = `${process.env.REACT_APP_LOCALHOST}`;

  let url = `${newUrl}/propertyCheckout/${id}`;
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
          type: "PROPERTY_KEY",
          payload: response,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "PROPERTY_KEY",
          error: error,
          status: "Failed",
        });
      });
  };
};

export const getPropertyKeyFresh = () => {
  return dispatch => {
    dispatch({
      type: "PROPERTY_KEY",
      payload: null,
      error: null,
      status: false,
    });
  };
};

export const getUser = () => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  let url = `${process.env.REACT_APP_LOCALHOST}/all-user`;
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
          type: "USER_LIST",
          payload: response,
          status: "Success",
        });
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

export const getUserForMention = () => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  let url = `${process.env.REACT_APP_LOCALHOST}/display/mention/user`;
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
          type: "USER_LIST_DATA",
          payload: response,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "USER_LIST_DATA",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const getUserOwner = () => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  let url = `${process.env.REACT_APP_LOCALHOST}/all-user-owner`;
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
          type: "USER_OWNER_LIST",
          payload: response,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "USER_OWNER_LIST",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const getPropertyInfo = id => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  let url = `${process.env.REACT_APP_LOCALHOST}/properties/${id}`;
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
          type: "PROPERTY_INFO",
          payload: response,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "PROPERTY_INFO",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const getPropertyInfoFresh = () => {
  return dispatch => {
    dispatch({
      type: "PROPERTY_INFO_FRESH",
      payload: null,
      error: null,
      status: false,
    });
  };
};
export const getPropertyType = () => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  let url = `${process.env.REACT_APP_LOCALHOST}/get_property_type`;
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
          type: "PROPERTY_TYPE",
          payload: response,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "PROPERTY_TYPE",
          error: error,
          status: "Failed",
        });
      });
  };
};

export const getStrataManager = () => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  let url = `${process.env.REACT_APP_LOCALHOST}/get-strata-manager`;
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
          type: "PROPERTY_STRATA_MANAGER",
          payload: response,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "PROPERTY_STRATA_MANAGER",
          error: error,
          status: "Failed",
        });
      });
  };
};

export const getPropertyEditInfo = id => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  let url = `${process.env.REACT_APP_LOCALHOST}/properties/${id}/edit`;
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
          type: "PROPERTY_EDIT_INFO",
          payload: response,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "PROPERTY_EDIT_INFO",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const updatePropertyInfo = (
  id,
  property,
  state2,
  description,
  state,
  address
) => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  let url = `${process.env.REACT_APP_LOCALHOST}/properties/${id}`;
  const formData = {
    id: id,
    building_name: address.building_name,
    country: address.country,
    unit: address.unit,
    number: address.number,
    street: address.street,
    suburb: address.suburb,
    postcode: address.postcode,
    state: address.state,
    reference: property.reference,
    subject: property.subject,
    manager_id: state.selectedManager.value,
    location: state2.location,
    property_type: state.selectedType.value,
    primary_type: state.selectedPrimaryType.value,
    description: description,
    // floor_area: state.selectedFloorArea.value,
    floor_area: state.selectedFloorArea ? state.selectedFloorArea.value : null,

    floor_size: property.floorSize,
    land_size: property.landSize,
    // land_area: state.selectedLandArea.value,
    land_area: state.selectedLandArea ? state.selectedLandArea.value : null,

    bedroom: property.bedroom,
    bathroom: property.bathroom,
    car_space: property.car_space,
    // floor_area_UoM: property.floor_area_UoM,
    key_number: property.keyNumber,
    // strata_manager_id: state.selectedStrataManager.value,
    strata_manager_id: state.selectedStrataManager
      ? state.selectedStrataManager.value
      : null,

    first_routine: property.first_routine,
    first_routine_frequency_type: property.first_routine_frequency_type,
    routine_inspections_frequency: property.routine_inspections_frequency,
    routine_inspections_frequency: property.routine_inspections_frequency,
    routine_inspections_frequency_type:
      property.routine_inspections_frequency_type,
    // first_routine: property.first_routine,
    // first_routine_UoM:property.first_routine_UoM,
    routine_inspection_due_date: property.routine_inspection_due_date,
    note: property.note,
    youtube_link: property.youtube_link,
    vr_link: property.vr_link,
  };
  return dispatch => {
    const headers = {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",

      Authorization: "Bearer " + authUser.token,
    };
    axios
      .put(url, formData, { headers: headers })
      .then(response => {
        dispatch({
          type: "UPDATE_PROPERTY_INFO",
          payload: response,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "UPDATE_PROPERTY_INFO",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const propertyUpdateFresh = () => {
  return dispatch =>
    dispatch({
      type: "UPDATE_PROPERTY_INFO_FRESH",
      payload: null,
      error: null,
      status: false,
    });
};

export const updatePicture = (file, id) => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  let url = `${process.env.REACT_APP_LOCALHOST}/uploadPropertyImage`;
  return dispatch => {
    const headers = {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",

      Authorization: "Bearer " + authUser.token,
    };
    let formData = new FormData();

    formData.append("image", file);
    formData.append("id", id);
    const options = {
      onUploadProgress: progressEvent => {
        const { loaded, total } = progressEvent;
        let percent = Math.floor((loaded * 100) / total);
        let detail = `${loaded}kb of ${total}kb | ${percent}%`;
        // if( percent < 100 ){
        //   this.setState({ uploadPercentage: percent })
        // }
        dispatch({
          type: "UPLOAD_IMAGE",
          payload: percent,
          status: "Success",
          detail: detail,
        });
      },

      headers: headers,
    };

    axios
      .post(url, formData, options)
      .then(response => {
        dispatch(getPropertyInfo(id));

        // dispatch({
        //   type: "USER_LIST",
        //   payload: response,
        //   status: "Success",
        // });
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
export const storeMultiplePicture = (file, id) => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  let url = `${process.env.REACT_APP_LOCALHOST}/uploadMultiplePropertyImage`;
  return dispatch => {
    const headers = {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",

      Authorization: "Bearer " + authUser.token,
    };
    let formData = new FormData();
    for (let i = 0; i < file.length; i++) {
      formData.append("image[]", file[i]);
    }
    formData.append("id", id);
    const options = {
      onUploadProgress: progressEvent => {
        const { loaded, total } = progressEvent;
        let percent = Math.floor((loaded * 100) / total);
        let detail = `${loaded}kb of ${total}kb | ${percent}%`;
        // if( percent < 100 ){
        //   this.setState({ uploadPercentage: percent })
        // }
        dispatch({
          type: "UPLOAD_MULTIPLE_IMAGE",
          payload: percent,
          status: "Success",
          detail: detail,
        });
      },

      headers: headers,
    };

    axios
      .post(url, formData, options)
      .then(response => {
        dispatch(getPropertyInfo(id));

        // dispatch({
        //   type: "USER_LIST",
        //   payload: response,
        //   status: "Success",
        // });
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

export const uploadImagePercentageFresh = () => {
  return dispatch => {
    dispatch({
      type: "UPLOAD_IMAGE_FRESH",
      status: false,
      percent: null,
    });
  };
};
export const uploadMultipleImagePercentageFresh = () => {
  return dispatch => {
    dispatch({
      type: "UPLOAD_MULTIPLE_IMAGE_FRESH",
      status: false,
      percent: null,
    });
  };
};

export const updateDoc = (file, id) => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));

  let url = `${process.env.REACT_APP_LOCALHOST}/uploadPropertyDoc`;
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
        dispatch(getPropertyInfo(id));

        // dispatch({
        //   type: "USER_LIST",
        //   payload: response,
        //   status: "Success",
        // });
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

export const propertyList = (
  page,
  sizePerPage,
  search = null,
  sortField = null,
  sortValue = null,
  ssr = null
) => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  let property_id = localStorage.getItem("owner_property_id");
  var url;
  if (ssr === "ssr") {
    url = `${process.env.REACT_APP_LOCALHOST}/properties-ssr?page=${page}&sizePerPage=${sizePerPage}&q=${search}&sortField=${sortField}&sortValue=${sortValue}`;
  } else {
    url = `${process.env.REACT_APP_LOCALHOST}/properties?property_id=${property_id}`;
  }

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
          type: "PROPERTY_LIST",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "PROPERTY_LIST",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const propertyListFresh = () => {
  return dispatch => {
    dispatch({
      type: "PROPERTY_LIST_FRESH",
      status: false,
      error: null,
    });
  };
};


export const billPropertyList = () => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  let url = `${process.env.REACT_APP_LOCALHOST}/bill/property/list`;

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
          type: "BILL_PROPERTY_LIST",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "BILL_PROPERTY_LIST",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const billPropertyListFresh = () => {
  return dispatch => {
    dispatch({
      type: "BILL_PROPERTY_LIST_FRESH",
      status: false,
      error: null,
    });
  };
};

export const invPropertyList = () => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  var url = `${process.env.REACT_APP_LOCALHOST}/inv-properties`;

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
          type: "INVOICE_PROPERTY_LIST",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "INVOICE_PROPERTY_LIST",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const invPropertyListFresh = () => {
  return dispatch => {
    dispatch({
      type: "INVOICE_PROPERTY_LIST_FRESH",
      status: false,
      error: null,
    });
  };
};

export const propertyAddFresh = () => {
  return dispatch =>
    dispatch({
      type: "PROPERTY_ADD_FRESH",
      payload: null,
      error: null,
      status: false,
    });
};

export const addPropertyMember = (property_id, member_id, type) => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  var url = `${process.env.REACT_APP_LOCALHOST}/addPropertyMember`;
  const headers = {
    "Content-Type": "application/json",

    "Access-Control-Allow-Origin": "*",

    Authorization: "Bearer " + authUser.token,
  };
  const formData = {
    member_type: type,
    property_id: property_id,
    member_id: member_id,
  };

  axios
    .post(url, formData, { headers: headers })
    .then(response => {
      dispatch({
        type: "PROPERTY_ADD_MEMBER",
        payload: response.data,
        status: "Success",
      });
    })
    .catch(error => {
      dispatch({
        type: "PROPERTY_ADD_MEMBER",
        payload: error,
        status: "Failed",
      });
    });
};

export const getUserInfo = id => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  var url = `${process.env.REACT_APP_LOCALHOST}/user-info-data/${id}`;
  const formData = {};
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
          type: "USER_INFO",
          payload: response,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "USER_INFO",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const addPropertyTanent = (
  tenantcontact,
  tenantfolio,
  tenantfoliobtnvalue,
  property_id,
  phone,
  contact_id = null,
  postal,
  physical,
  check,
  invoice
) => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  var url = `${process.env.REACT_APP_LOCALHOST}/property/tenant/store`;
  const formData = {
    // Tenant contact values
    property_id: property_id,
    contact_id: contact_id,
    reference: tenantcontact.reference,

    reference: tenantcontact.reference,
    contacts: tenantcontact.contacts,

    physical: physical,
    postal: postal,

    notes: tenantcontact.notes,
    abn: tenantcontact.abn,
    communication: check,

    // Tenant folio values
    rent: tenantfolio.rent,
    rent_type: tenantfoliobtnvalue.wfmBtn,
    rent_includes_tax: tenantfoliobtnvalue.rentTax,
    bond_required: tenantfolio.bond_required,
    bond_held: tenantfolio.bond_held ? tenantfolio.bond_held : 0,
    move_in: tenantfolio.move_in,
    move_out: tenantfolio.move_out,
    agreement_start: tenantfolio.agreement_start,
    agreement_end: tenantfolio.agreement_end,
    periodic_tenancy: tenantfoliobtnvalue.periodic_tenancy,
    paid_to: tenantfolio.paid_to,
    part_paid: tenantfolio.part_paid,
    invoice_days_in_advance: tenantfolio.invoice_days_in_advance,
    rent_review_frequency: tenantfolio.rent_review_frequency,
    next_rent_review: tenantfolio.next_rent_review,
    exclude_form_arrears: tenantfoliobtnvalue.exclude_form_arrears,
    bank_reterence: tenantfolio.bank_reterence,
    receipt_warning: tenantfolio.receipt_warning,
    tenant_access: tenantfoliobtnvalue.tenant_access,
    bond_arreas: tenantfolio.bond_arrears,
    bond_notes: tenantfolio.bond_notes,
    bond_already_paid: tenantfolio.bond_paid,
    bond_reference: tenantfolio.bond_reference,
    break_lease: tenantfolio.break_lease,
    termination: tenantfolio.termination,
    rent_invoice: tenantfoliobtnvalue.rentInvoiceBtn,

    invoice: invoice
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
          type: "PROPERTY_ADD_TANENT",
          payload: response.data,
          status: response.data.status,
        });
      })
      .catch(error => {
        dispatch({
          type: "PROPERTY_ADD_TANENT",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const addPropertyTanentFresh = () => {
  return dispatch =>
    dispatch({
      type: "PROPERTY_TENANT_ADD_FRESH",
      status: false,
    });
};

export const editPropertyTanent = (
  tenantcontact,
  tenantfolio,
  tenantfoliobtnvalue,
  id,
  checkState,
  postalAddress,
  physicalAddress,
  paymentStatus,
  payment_method,
  invoice
) => {

  var authUser = JSON.parse(localStorage.getItem("authUser"));
  var url = `${process.env.REACT_APP_LOCALHOST}/property/tenant/contact/${id}`;
  const formData = {
    // Tenant contact values
    tenant_id: id,

    reference: tenantcontact.reference,
    contacts: tenantcontact.contacts,

    physical: physicalAddress,
    postal: postalAddress,
    notes: tenantcontact.notes,
    abn: tenantcontact.abn,
    communication: [...new Set(checkState)],

    // Tenant folio values
    rent: tenantfolio.rent,
    rent_type: tenantfoliobtnvalue.wfmBtn,
    rent_includes_tax: tenantfoliobtnvalue.rentTax,
    bond_required: tenantfolio.bond_required,
    bond_held: tenantfolio.bond_held,
    move_in: tenantfolio.move_in,
    move_out: tenantfolio.move_out,
    agreement_start: tenantfolio.agreement_start,
    agreement_end: tenantfolio.agreement_end,
    periodic_tenancy: tenantfoliobtnvalue.periodic_tenancy,
    paid_to: tenantfolio.paid_to,
    part_paid: tenantfolio.part_paid,
    invoice_days_in_advance: tenantfolio.invoice_days_in_advance,
    rent_review_frequency: tenantfolio.rent_review_frequency,
    next_rent_review: tenantfolio.next_rent_review,
    exclude_form_arrears: tenantfoliobtnvalue.exclude_form_arrears,
    bank_reterence: tenantfolio.bank_reterence,
    receipt_warning: tenantfolio.receipt_warning,
    tenant_access: tenantfoliobtnvalue.tenant_access,
    bond_arreas: tenantfolio.bond_arrears,
    bond_notes: tenantfolio.bond_notes,
    bond_already_paid: tenantfolio.bond_paid,
    bond_receipted: tenantfolio.bond_receipted,
    bond_reference: tenantfolio.bond_reference,
    break_lease: tenantfolio.break_lease,
    termination: tenantfolio.termination,
    rent_invoice: tenantfoliobtnvalue.rentInvoiceBtn,

    payment_status: paymentStatus,
    payment_method: payment_method,
    invoice: invoice
  };

  return dispatch => {
    const headers = {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",

      Authorization: "Bearer " + authUser.token,
    };

    axios
      .put(url, formData, { headers: headers })
      .then(response => {
        dispatch({
          type: "TENANT_UPDATE",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "TENANT_UPDATE",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const tenantUpdateFresh = () => {
  return dispatch =>
    dispatch({
      type: "TENANT_UPDATE_FRESH",
      status: false,
    });
};

export const addOwner = (
  property,
  property_id,
  folio,
  phone,
  fee_temp_1,
  fee_temp_2,
  payment_method,
  ownerAccess,
  contact_id = null,
  physical,
  postal,
  check,
  planData,
  frequencyState,
  ownerFolioState
) => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  var url = `${process.env.REACT_APP_LOCALHOST}/property/owner/store`;
  // console.log(property);
  // console.log(check);
  // return 0;
  const formData = {
    property_id: property_id,
    contact_id: contact_id,
    // Owner Contact
    reference: property.reference,
    contacts: property.contacts,

    physical: physical,
    postal: postal,

    notes: property.notes,
    abn: property.abn,
    communication: check,

    // Owner Folio
    new_folio: folio.new_folio,
    folio_id: folio.folio_id,
    total_money: folio.total_money,
    balance: folio.balance,
    regular_intervals: folio.regular_intervals,
    next_disburse_date: folio.next_disburse_date,
    withhold_amount: folio.withhold_amount,
    withold_reason: folio.withold_reason,
    agreement_start: folio.agreement_start,
    gained_reason: folio.gained_reason,
    comment: folio.comment,
    agreement_end: folio.agreement_end,
    owner_access: ownerAccess,

    // Owner fee temp 1
    fee_temp_1: fee_temp_1,
    // Owner fee temp 2
    fee_temp_2: fee_temp_2,
    // Owner pay method
    payment_method: payment_method,
    planData: planData ? [...planData[0]] : undefined,
    frequency: {
      planType: frequencyState.frequencyType,
      planId: planData ? planData[0][0]["plan_id"] : undefined,
      fortNightlyDate: frequencyState.fortNightlyDate
        ? frequencyState.fortNightlyDate
        : null,
      date: frequencyState.selectedDate?.value
        ? frequencyState.selectedDate?.value
        : null,
      month: frequencyState.selectedDate?.value
        ? frequencyState.selectedDate?.value
        : null,
      selectedMonth: frequencyState.selectedMonth?.value,
      selectedWeekName: frequencyState.selectedWeekName?.value
        ? frequencyState.selectedWeekName?.value
        : null,
      yearly: `${frequencyState.selectedDate?.value}/${frequencyState.selectedMonth?.value}`,
      time: frequencyState.time,
    },
    ownerFolioState
  };

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
          type: "OWNER_ADD",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "OWNER_ADD",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const updatePropertyOwner = (id, owner) => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  let url = `${process.env.REACT_APP_LOCALHOST}/properties/${id}`;
  const formData = {
    id: id,
    reference: owner.reference,
    first_name: owner.first_name,
    last_name: owner.last_name,
    salutation: owner.salutation,
    company_name: owner.company_name,
    email: owner.email,
    mobile_phone: owner.mobile_phone,
    home_phone: owner.home_phone,
    work_phone: owner.work_phone,
    physical_building_name: owner.physical_building_name,
    physical_country: owner.physical_country,
    physical_number: owner.physical_number,
    physical_postcode: owner.physical_postcode,
    physical_state: owner.physical_state,
    physical_street: owner.physical_street,
    physical_suburb: owner.physical_suburb,
    physical_unit: owner.physical_unit,
    postal_building_name: owner.postal_building_name,
    postal_country: owner.postal_country,
    postal_number: owner.postal_number,
    postal_postcode: owner.postal_postcode,
    postal_state: owner.postal_state,
    postal_street: owner.postal_street,
    postal_suburb: owner.postal_suburb,
    postal_unit: owner.postal_unit,
    notes: owner.notes,
    abn: owner.abn,

    //Folios
    total_money: owner.total_money,
    balance: owner.balance,
    regular_intervals: owner.regular_intervals,
    next_disburse_date: owner.next_disburse_date,
    withhold_amount: owner.withhold_amount,
    withold_reason: owner.withold_reason,
    agreement_start: owner.agreement_start,
    gained_reason: owner.gained_reason,
    comment: owner.comment,
    agreement_end: owner.agreement_end,
    owner_access: owner.owner_access,
  };

  return dispatch => {
    const headers = {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",

      Authorization: "Bearer " + authUser.token,
    };
    axios
      .put(url, formData, { headers: headers })
      .then(response => {
        dispatch({
          type: "UPDATE_OWNER_INFO",
          payload: response,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "UPDATE_OWNER_INFO",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const propertyOwnerAddFresh = () => {
  return dispatch =>
    dispatch({
      type: "PROPERTY_OWNER_ADD_FRESH",
      status: false,
    });
};

export const getPropertyOwnerInfo = propertyId => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  let url = `${process.env.REACT_APP_LOCALHOST}/property/owner/info/${propertyId}`;
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
          type: "PROPERTY_OWNER_INFO",
          payload: response,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "PROPERTY_OWNER_INFO",
          payload: error,
          status: "Failed",
        });
      });
  };
};
export const getPropertyAllOwnerInfo = propertyId => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  let url = `${process.env.REACT_APP_LOCALHOST}/property/all/owner/info/${propertyId}`;
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
          type: "PROPERTY_ALL_OWNER_INFO",
          payload: response,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "PROPERTY_ALL_OWNER_INFO",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const propertyOwnerInfoFresh = () => {
  return dispatch => {
    dispatch({
      type: "PROPERTY_OWNER_INFO_FRESH",
      payload: null,
      error: null,
      status: false,
    });
  };
};
export const propertyAllOwnerInfoFresh = () => {
  return dispatch => {
    dispatch({
      type: "PROPERTY_ALL_OWNER_INFO_FRESH",
      payload: null,
      error: null,
      status: false,
    });
  };
};

export const checkOwnerPayableInfo = (propertyId, contactId) => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  let url = `${process.env.REACT_APP_LOCALHOST}/check/owner/payable/${propertyId}/${contactId}`;
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
          type: "CHECK_OWNER_PAYABLE_INFO",
          payload: response,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "CHECK_OWNER_PAYABLE_INFO",
          payload: error,
          status: "Failed",
        });
      });
  };
};
export const changeOwner = (data, propId) => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  let url = `${process.env.REACT_APP_LOCALHOST}/change/owner`;
  return dispatch => {
    const headers = {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",

      Authorization: "Bearer " + authUser.token,
    };
    let formData = {
      propertyId: propId,
      id: data.id,
      folioId: data.folioId,
    };
    axios
      .post(url, formData, { headers: headers })
      .then(response => {
        dispatch({
          type: "CHANGE_OWNER",
          payload: response,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "CHANGE_OWNER",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const changeOwnerFresh = () => {
  return dispatch => {
    dispatch({
      type: "CHANGE_OWNER_FRESH",
      status: false,
    });
  };
};
export const addOwnerFresh = () => {
  return dispatch => {
    dispatch({
      type: "ADD_OWNER_FRESH",
      status: false,
    });
  };
};

// export const propertyListFresh = () => {
//   return dispatch => {
//     dispatch({
//       type: "PROPERTY_LIST_FRESH",
//       status: false,
//       error: null,
//     });
//   };
// };

export const PropertyKey = () => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  const newUrl = `${process.env.REACT_APP_LOCALHOST}`;

  let url = `${newUrl}/get_property_key`;
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
          type: "PROPERTY_KEY_VALUE",
          payload: response,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "PROPERTY_KEY_VALUE",
          error: error,
          status: "Failed",
        });
      });
  };
};

export const PropertyKeyValueFresh = () => {
  return dispatch => {
    dispatch({
      type: "PROPERTY_KEY_VALUE_FRESH",
      payload: null,
      status: false,
      error: null,
    });
  };
};

export const getPropertyEditInfoFresh = () => {
  return dispatch => {
    dispatch({
      type: "PROPERTY_EDIT_INFO",
      payload: null,
      status: false,
    });
  };
};

export const lebelInsert2 = (insId, lebels) => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  const newUrl = process.env.REACT_APP_LOCALHOST;
  var url = newUrl + "/properties/info/label";
  const headers = {
    "Content-Type": "application/json",

    "Access-Control-Allow-Origin": "*",

    Authorization: "Bearer " + authUser.token,
  };

  const formData = {
    property_id: insId,
    labels: lebels,
  };

  return dispatch => {
    axios
      .post(url, formData, { headers: headers })
      .then(response => {
        dispatch(getPropertyInfo(insId));
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

export const archieveProperty = id => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  let url = `${process.env.REACT_APP_LOCALHOST}/propertiesArchivedStatus/${id}`;
  return dispatch => {
    const headers = {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",

      Authorization: "Bearer " + authUser.token,
    };
    const formData = {};
    axios
      .put(url, formData, { headers: headers })
      .then(response => {
        dispatch(propertyList());
      })
      .catch(error => {
        dispatch({
          type: "PROPERTY_ARCHIVED",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const undoArchieveProperty = id => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  let url = `${process.env.REACT_APP_LOCALHOST}/propertiesActiveStatus/${id}`;
  return dispatch => {
    const headers = {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",

      Authorization: "Bearer " + authUser.token,
    };
    const formData = {};
    axios
      .put(url, formData, { headers: headers })
      .then(response => {
        dispatch(propertyList());
      })
      .catch(error => {
        dispatch({
          type: "UNDO_ARCHIVED_PROPERTY",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const getArchieveProperty = (
  page,
  sizePerPage,
  search = null,
  sortField = null,
  sortValue = null,
  ssr = null
) => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  // let url = `${process.env.REACT_APP_LOCALHOST}/getArchivedProperty`;
  let url = `${process.env.REACT_APP_LOCALHOST}/getArchivedProperty_ssr?page=${page}&sizePerPage=${sizePerPage}&q=${search}&sortField=${sortField}&sortValue=${sortValue}`;

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
          type: "GET_ARCHIVED_PROPERTY",
          payload: response,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "GET_ARCHIVED_PROPERTY",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const getArchievePropertyFresh = () => {
  return dispatch =>
    dispatch({
      type: "GET_ARCHIVED_PROPERTY",
      // payload: null,
      // error: null,
      status: false,
    });
};

export const getRentalProperty = (
  page,
  sizePerPage,
  search = null,
  sortField = null,
  sortValue = null,
  ssr = null
) => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  // let url = `${process.env.REACT_APP_LOCALHOST}/property-rental`;
  let url = `${process.env.REACT_APP_LOCALHOST}/property-rental_ssr?page=${page}&sizePerPage=${sizePerPage}&q=${search}&sortField=${sortField}&sortValue=${sortValue}`;

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
          type: "GET_RENTAL_PROPERTY",
          payload: response,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "GET_RENTAL_PROPERTY",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const getRentalPropertyFresh = () => {
  return dispatch =>
    dispatch({
      type: "GET_RENTAL_PROPERTY_FRESH",
      // payload: null,
      error: null,
      status: false,
    });
};

export const addSaleAgreement = (
  seller,
  physicalAddress,
  postalAddress,
  property_id,
  folio,
  phone,
  payment_method,
  contact_id = null
) => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  var url = `${process.env.REACT_APP_LOCALHOST}/sellers`;
  const formData = {
    property_id: property_id,
    contact_id: contact_id,
    // Sale Contact
    reference: seller.reference,
    contacts: seller.contacts,

    physical: physicalAddress,
    postal: postalAddress,

    notes: seller.notes,
    abn: seller.abn,
    communication: seller.check,

    // Sale Folio

    agreement_start: folio.agreement_start,
    agreement_end: folio.agreement_end,
    asking_price: folio.asking_price,
    commission: folio.commission,

    // Sale pay method
    payment_method: payment_method,
  };

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
          type: "SELLER_ADD",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "SELLER_ADD",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const addSaleAgreementFresh = () => {
  return dispatch =>
    dispatch({
      type: "SELLER_ADD_FRESH",
      payload: null,
      error: null,
      status: false,
    });
};

export const SaleAgreementInfo = id => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  let url = `${process.env.REACT_APP_LOCALHOST}/sellAgreement/${id}`;
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
          type: "SELLER_INFO",
          payload: response,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "SELLER_INFO",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const SaleAgreementInfoFresh = () => {
  return dispatch =>
    dispatch({
      type: "SELLER_INFO_FRESH",
      payload: null,
      error: null,
      status: false,
    });
};

export const addBuyer = (
  buyer,
  property_id,
  saleId,
  folio,
  phone,
  payment_method,
  physicalAddress,
  postalAddress,
  contact_id = null
) => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  var url = `${process.env.REACT_APP_LOCALHOST}/buyers`;
  const formData = {
    property_id: property_id,
    contact_id: contact_id,
    saleAgreementId: saleId,
    // Sale Contact
    reference: buyer.reference,
    contacts: buyer.contacts,

    physical: physicalAddress,
    postal: postalAddress,

    notes: buyer.notes,
    abn: buyer.abn,
    communication: buyer.check,

    // Sale Folio

    agreement_start: folio.agreement_start,
    agreement_end: folio.agreement_end,
    asking_price: folio.asking_price,
    commission: folio.commission,
    purchase_price: folio.purchase_price,
    contract_exchange: folio.contract_exc,
    deposit_due: folio.deposit_due,
    settlement_due: folio.settlement_due,

    // Sale pay method
    payment_method: payment_method,
  };

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
          type: "BUYER_ADD",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "BUYER_ADD",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const addBuyerFresh = () => {
  return dispatch =>
    dispatch({
      type: "BUYER_ADD_FRESH",
      payload: null,
      error: null,
      status: false,
    });
};

export const SaleAgreementInfoForProperty = id => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  let url = `${process.env.REACT_APP_LOCALHOST}/salesInfo/${id}`;
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
          type: "SELLER_INFO_PROPERTY",
          payload: response,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "SELLER_INFO_PROPERTY",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const SaleAgreementInfoForPropertyFresh = () => {
  return dispatch =>
    dispatch({
      type: "SELLER_INFO_PROPERTY_FRESH",
      payload: null,
      error: null,
      status: false,
    });
};

export const editSaleAgreementInfo = (id, saleId) => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  let url = `${process.env.REACT_APP_LOCALHOST}/salesAgreementInfo/${id}/${saleId}`;
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
          type: "EDIT_SELLER_INFO_PROPERTY",
          payload: response,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "EDIT_SELLER_INFO_PROPERTY",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const editSaleAgreementInfoFresh = () => {
  return dispatch =>
    dispatch({
      type: "EDIT_SELLER_INFO_PROPERTY_FRESH",
      payload: null,
      error: null,
      status: false,
    });
};

export const editSaleAgreement = (
  property_id,
  contact_id = null,
  saleId,
  buyer_id = null,
  seller,
  phone,
  communication,
  postalAddress,
  physicalAddress,
  buyer,
  buyerPhone,
  buyerCommunication,
  postalAddressBuyer,
  physicalAddressBuyer,
  folio,
  payment_method
) => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  var url = `${process.env.REACT_APP_LOCALHOST}/sellers/${saleId}`;

  const formData = {
    property_id: property_id,
    contact_id: contact_id,
    sale_id: saleId,
    buyer_id: buyer_id,
    // Sale Contact
    reference: seller.reference,
    contacts: seller.contacts,

    physical: physicalAddress,
    postal: postalAddress,

    notes: seller.notes,
    abn: seller.abn,

    // Buyer Contact
    buyer_reference: buyer.reference,
    buyer_contacts: buyer.contacts,

    buyer_physical: physicalAddressBuyer,
    buyer_postal: postalAddressBuyer,

    buyer_notes: buyer.notes,
    buyer_abn: buyer.abn,
    // Buyer Folio

    agreement_start: folio.agreement_start,
    agreement_end: folio.agreement_end,
    asking_price: folio.asking_price,
    commission: folio.commission,
    purchase_price: folio.purchase_price,
    contract_exchange: folio.contract_exchange,
    deposit_due: folio.deposit_due,
    settlement_due: folio.settlement_due,

    // Sale pay method
    payment_method: payment_method,
  };

  return dispatch => {
    const headers = {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",

      Authorization: "Bearer " + authUser.token,
    };

    axios
      .put(url, formData, { headers: headers })
      .then(response => {
        dispatch({
          type: "EDIT_SALE_AGREEMENT",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "EDIT_SALE_AGREEMENT",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const editSaleAgreementFresh = () => {
  return dispatch =>
    dispatch({
      type: "EDIT_SALE_AGREEMENT_FRESH",
      payload: null,
      error: null,
      status: false,
    });
};

export const getSalesProperty = (
  page,
  sizePerPage,
  search = null,
  sortField = null,
  sortValue = null
) => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  // let url = `${process.env.REACT_APP_LOCALHOST}/sales`;
  let url = `${process.env.REACT_APP_LOCALHOST}/sales_ssr?page=${page}&sizePerPage=${sizePerPage}&q=${search}&sortField=${sortField}&sortValue=${sortValue}`;

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
          type: "GET_SALES_PROPERTY",
          payload: response,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "GET_SALES_PROPERTY",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const getSalesPropertyFresh = () => {
  return dispatch =>
    dispatch({
      type: "GET_SALES_PROPERTY_FRESH",
      payload: null,
      error: null,
      status: false,
    });
};

export const getArrearsProperty = (
  page,
  sizePerPage,
  search = null,
  sortField = null,
  sortValue = null,
  ssr = null
) => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  // let url = `${process.env.REACT_APP_LOCALHOST}/arreas`;
  let url = `${process.env.REACT_APP_LOCALHOST}/arreas_ssr?page=${page}&sizePerPage=${sizePerPage}&q=${search}&sortField=${sortField}&sortValue=${sortValue}`;

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
          type: "GET_ARREARS_PROPERTY",
          payload: response,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "GET_ARREARS_PROPERTY",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const getArrearsPropertyFresh = () => {
  return dispatch =>
    dispatch({
      type: "GET_ARREARS_PROPERTY_FRESH",
      // payload: null,
      // error: null,
      status: false,
    });
};

export const getVacanciesProperty = (
  page,
  sizePerPage,
  search = null,
  sortField = null,
  sortValue = null
) => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  // let url = `${process.env.REACT_APP_LOCALHOST}/vacancies`;
  let url = `${process.env.REACT_APP_LOCALHOST}/vacancies_ssr?page=${page}&sizePerPage=${sizePerPage}&q=${search}&sortField=${sortField}&sortValue=${sortValue}`;

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
          type: "GET_VACANCIES_PROPERTY",
          payload: response,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "GET_VACANCIES_PROPERTY",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const getVacanciesPropertyFresh = () => {
  return dispatch =>
    dispatch({
      type: "GET_VACANCIES_PROPERTY_FRESH",
      payload: null,
      error: null,
      status: false,
    });
};

export const getRenewalsProperty = (
  page,
  sizePerPage,
  search = null,
  sortField = null,
  sortValue = null,
  ssr = null
) => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  // let url = `${process.env.REACT_APP_LOCALHOST}/renewals`;
  let url = `${process.env.REACT_APP_LOCALHOST}/renewals_ssr?page=${page}&sizePerPage=${sizePerPage}&q=${search}&sortField=${sortField}&sortValue=${sortValue}`;

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
          type: "GET_RENEWALS_PROPERTY",
          payload: response,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "GET_RENEWALS_PROPERTY",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const getRenewalsPropertyFresh = () => {
  return dispatch =>
    dispatch({
      type: "GET_RENEWALS_PROPERTY_FRESH",
      // payload: null,
      error: null,
      status: false,
    });
};

export const getTenantForManage = id => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  let url = `${process.env.REACT_APP_LOCALHOST}/property-tenants/${id}`;
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
          type: "MANAGE_TENANT_LIST",
          payload: response,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "MANAGE_TENANT_LIST",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const makeTenant = (propId, fId) => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  let url = `${process.env.REACT_APP_LOCALHOST}/make-tenant/${propId}/${fId}`;
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
          type: "MAKE_NEW_TENANT",
          payload: response.data,
          status: response.data.status,
        });
      })
      .catch(error => {
        dispatch({
          type: "MAKE_NEW_TENANT",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const makeTenantFresh = () => {
  return dispatch => {
    dispatch({
      type: "MAKE_NEW_TENANT_FRESH",
      status: false,
    });
  };
};

export const getTenantForManageFresh = () => {
  return dispatch =>
    dispatch({
      type: "MANAGE_TENANT_LIST_FRESH",
      payload: null,
      error: null,
      status: false,
    });
};

export const getOwnerForManage = id => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  let url = `${process.env.REACT_APP_LOCALHOST}/properties/${id}`;
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
          type: "MANAGE_OWNER_LIST",
          payload: response,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "MANAGE_OWNER_LIST",
          payload: error,
          status: "Failed",
        });
      });
  };
};
export const getAllOwner = id => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  let url = `${process.env.REACT_APP_LOCALHOST}/properties/${id}`;
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
          type: "MANAGE_OWNER_LIST",
          payload: response,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "MANAGE_OWNER_LIST",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const tenantMoveOut = id => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  var url = `${process.env.REACT_APP_LOCALHOST}/property-tenant-due-check`;
  const formData = {
    tenant_id: id,
  };
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
          type: "TENANT_MOVE_OUT",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "TENANT_MOVE_OUT",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const tenantMoveOutFresh = () => {
  return dispatch =>
    dispatch({
      type: "TENANT_MOVE_OUT_FRESH",
      payload: null,
      error: null,
      status: false,
    });
};

export const getPropertyFee = () => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  let url = `${process.env.REACT_APP_LOCALHOST}/owner/fee/list`;
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
          type: "GET_PROPERTY_FEE",
          payload: response,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "GET_PROPERTY_FEE",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const getPropertyFeeFresh = () => {
  return dispatch =>
    dispatch({
      type: "GET_PROPERTY_FEE_FRESH",
    });
};
export const getOwnerPropertyFeeList = ($fId) => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  let url = `${process.env.REACT_APP_LOCALHOST}/get/owner/property/feelist/${$fId}`;
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
          type: "GET_OWNER_PROPERTY_FEE_LIST",
          payload: response,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "GET_OWNER_PROPERTY_FEE_LIST",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const getOwnerPropertyFeeListFresh = () => {
  return dispatch =>
    dispatch({
      type: "GET_OWNER_PROPERTY_FEE_LIST_FRESH",
    });
};

export const getMessageTemplatesForProperty = () => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  let url = `${process.env.REACT_APP_LOCALHOST}/message/mail/template/all`;
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
          type: "GET_MESSAGE_TEMPLATES_FOR_PROPERTY",
          payload: response,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "GET_MESSAGE_TEMPLATES_FOR_PROPERTY",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const getMessageTemplatesForPropertyFresh = () => {
  return dispatch =>
    dispatch({
      type: "GET_MESSAGE_TEMPLATES_FOR_PROPERTY_FRESH",
    });
};

export const sendMailFromTemplatesInMail = (id, sub, propId) => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  var url = `${process.env.REACT_APP_LOCALHOST}/message/mail/template/activity`;
  const formData = {
    property_id: propId,
    template_id: id,
    subject: sub,
  };
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
          type: "SEND_MAIL_TO_ACTIVITY",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "SEND_MAIL_TO_ACTIVITY",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const sendMailFromTemplatesInMailFresh = () => {
  return dispatch =>
    dispatch({
      type: "SEND_MAIL_TO_ACTIVITY_FRESH",
    });
};

export const sendSMSFromTemplatesInMail = (id, sub, propId) => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  var url = `${process.env.REACT_APP_LOCALHOST}/message/mail/template/activity`;
  const formData = {
    property_id: propId,
    template_id: id,
    subject: sub,
  };
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
          type: "SEND_SMS_TO_ACTIVITY",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "SEND_SMS_TO_ACTIVITY",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const sendSMSFromTemplatesInMailFresh = () => {
  return dispatch =>
    dispatch({
      type: "SEND_SMS_TO_ACTIVITY_FRESH",
    });
};

export const getMessageTemplatesForPropertyByBtn = (
  data = null,
  query = null,
  data2
) => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  const newData = data.map(item => item.label);

  let url = `${process.env.REACT_APP_LOCALHOST}/message/mail/template/filter`;
  const formData = {
    trigger_to: data,
    trigger_to2: newData,
    query: query,
    data: data2,
  };
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
          type: "GET_MESSAGE_TEMPLATES_FOR_PROPERTY_BY_BTN",
          payload: response,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "GET_MESSAGE_TEMPLATES_FOR_PROPERTY_BY_BTN",
          payload: error,
          status: "Failed",
        });
      });
  };
};
export const addPeriodic = (property, periodic) => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  const newUrl = `${process.env.REACT_APP_LOCALHOST}`;
  var url = `${newUrl}/periodic-tenancy`;
  const headers = {
    "Content-Type": "application/json",

    "Access-Control-Allow-Origin": "*",

    Authorization: "Bearer " + authUser.token,
  };
  const formData = {
    id: property.id,
    agreement_start: property.agreement_start,
    agreement_end: property.agreement_end,
    periodic: periodic,
    create_bill: property.create_bill,
    fee_data: property.fee_data,
    folio_fee_data: property.folio_fee_data,
    property_fee_data: property.property_fee_data,
    property_id: property.property_id,
  };
  return dispatch => {
    axios
      .post(url, formData, { headers: headers })
      .then(response => {
        dispatch({
          type: "PERIODIC_TENANCY_UPDATE",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "PERIODIC_TENANCY_UPDATE",
          error: error,
          status: "Failed",
        });
      });
  };
};

export const addPeriodicFresh = () => {
  return dispatch =>
    dispatch({
      type: "PERIODIC_TENANCY_UPDATE",
      payload: null,
      error: null,
      status: false,
    });
};

export const editRentDetails = (property, cid) => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  const newUrl = `${process.env.REACT_APP_LOCALHOST}`;

  var url = `${newUrl}/rentdetails`;
  const headers = {
    "Content-Type": "application/json",

    "Access-Control-Allow-Origin": "*",

    Authorization: "Bearer " + authUser.token,
  };
  const formData = {
    notice_period: property.notice_period,
    new_rent_from: property.new_rent_from,
    new_rent_value: property.new_rent_value,
    tc_id: cid,
  };
  return dispatch => {
    axios
      .post(url, formData, { headers: headers })
      .then(response => {
        dispatch({
          type: "RENT_DETAILS_ADD",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "RENT_DETAILS_ADD",
          error: error,
          status: "Failed",
        });
      });
  };
};

export const editRentDetailsFresh = () => {
  return dispatch =>
    dispatch({
      type: "RENT_DETAILS_ADD",
      payload: null,
      error: null,
      status: false,
    });
};

export const rentDiscount = (state, cid) => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  const newUrl = `${process.env.REACT_APP_LOCALHOST}`;

  var url = `${newUrl}/rent-discount`;
  const headers = {
    "Content-Type": "application/json",

    "Access-Control-Allow-Origin": "*",

    Authorization: "Bearer " + authUser.token,
  };

  const formData = {
    schedule_for: state.schedule_for,
    discount_amount: state.discount_amount,
    tc_id: cid,
  };
  return dispatch => {
    axios
      .post(url, formData, { headers: headers })
      .then(response => {
        dispatch({
          type: "RENT_DISCOUNT_ADD",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "RENT_DISCOUNT_ADD",
          error: error,
          status: "Failed",
        });
      });
  };
};

export const rentDiscountFresh = () => {
  return dispatch =>
    dispatch({
      type: "RENT_DISCOUNT_ADD",
      payload: null,
      error: null,
      status: false,
    });
};

export const getRentDetails = (id, property_id) => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  let url = `${process.env.REACT_APP_LOCALHOST}/rentdetails/${id}/${property_id}`;
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
          type: "RENT_DETAILS",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "RENT_DETAILS",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const getRentDetailsFresh = () => {
  return dispatch =>
    dispatch({
      type: "RENT_DETAILS",
      payload: null,
      error: null,
      status: false,
    });
};

export const checkUniqueKeyNumber = key => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  const newUrl = `${process.env.REACT_APP_LOCALHOST}`;

  var url = `${newUrl}/property/key/unique`;
  const headers = {
    "Content-Type": "application/json",

    "Access-Control-Allow-Origin": "*",

    Authorization: "Bearer " + authUser.token,
  };
  const formData = {
    key_number: key,
  };
  return dispatch => {
    axios
      .post(url, formData, { headers: headers })
      .then(response => {
        dispatch({
          type: "CHECK_UNIQUE_KEY",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "CHECK_UNIQUE_KEY",
          error: error,
          status: "Failed",
        });
      });
  };
};

export const checkUniqueKeyNumberFresh = () => {
  return dispatch =>
    dispatch({
      type: "CHECK_UNIQUE_KEY_FRESH",
      payload: null,
      error: null,
      status: false,
    });
};

export const propertyImageDelete = id => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  var url = `${process.env.REACT_APP_LOCALHOST}/PropertyImage/${id}`;

  return dispatch => {
    const headers = {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",

      Authorization: "Bearer " + authUser.token,
    };
    axios
      .delete(url, { headers: headers })
      .then(response => {
        dispatch({
          type: "PROPERTY_IMAGE_DELETE",
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "PROPERTY_IMAGE_DELETE",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const propertyImageDeleteFresh = () => {
  return dispatch =>
    dispatch({
      type: "PROPERTY_IMAGE_DELETE",
      status: false,
    });
};


export const selectLanguage = (data, id) => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  const newUrl = `${process.env.REACT_APP_LOCALHOST}`;

  var url = `${newUrl}/multiple/language`;
  const headers = {
    "Content-Type": "application/json",

    "Access-Control-Allow-Origin": "*",

    Authorization: "Bearer " + authUser.token,
  };

  const formData = {
    language_code: data,
    id: id
  }
  console.log(formData);

  return dispatch => {
    axios
      .post(url, formData, { headers: headers })
      .then(response => {
        dispatch({
          type: "SELECT_LANGUAGE",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "SELECT_LANGUAGE",
          error: error,
          status: "Failed",
        });
      });
  };
};

export const selectLanguageFresh = () => {
  return dispatch =>
    dispatch({
      type: "SELECT_LANGUAGE_FRESH",
      status: false,
    });
};


export const getSelectedLanguage = (id) => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  let url = `${process.env.REACT_APP_LOCALHOST}/multiple/language/${id}`;
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
          type: "GET_SELECTED_LANG",
          payload: response,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "GET_SELECTED_LANG",
          payload: error,
          status: "Failed",
        });
      });
  };
};
