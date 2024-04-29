import axios from "axios";

export const ListingList = () => {
  //console.log()
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  const newUrl = process.env.REACT_APP_LOCALHOST;
  var url = newUrl + "/listing";

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
          type: "LISTING_LIST",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "LISTING_LIST",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const addListingsModal = (data, id) => {

  var authUser = JSON.parse(localStorage.getItem("authUser"));
  const newUrl = process.env.REACT_APP_LOCALHOST;
  var url = newUrl + "/listing";
  console.log(data, +id);

  const headers = {
    "Content-Type": "application/json",

    "Access-Control-Allow-Origin": "*",

    Authorization: "Bearer " + authUser.token,
  };
  const formData = {
    property_id: +id || data.selectedProperty.value,
    type: data.selectedType.value,
  };

  console.log(formData);
  // return
  return dispatch => {
    axios
      .post(url, formData, { headers: headers })
      .then(response => {
        dispatch({
          type: "LISTINGS_MODAL_ADD",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "LISTINGS_MODAL_ADD",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const addListingsModalFresh = () => {
  return dispatch => {
    dispatch({
      type: "LISTINGS_MODAL_ADD_FRESH",
      payload: null,
      status: false,
    });
  };
}

export const ListingsListFresh = () => {
  return dispatch => {
    dispatch({
      type: "LISTINGS_LIST_FRESH",
      status: false,
    });
  };
};

export const ListingListInfo = id => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  const newUrl = process.env.REACT_APP_LOCALHOST;
  var url = newUrl + "/listing/" + id;
  // console.log(url);

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
          type: "LISTING_LIST_INFO",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "LISTING_LIST_INFO",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const ListingsInfoFresh = () => {
  return dispatch => {
    dispatch({
      type: "LISTINGS_INFO_FRESH",
      payload: null,
      status: false,
    });
  };
};

export const updatePropertyInfoFromListingList = (l_id, p_id, property, address, state) => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  const newUrl = process.env.REACT_APP_LOCALHOST;
  var url = newUrl + "/listing/property/information/" + p_id;

  console.log(state);

  const formData = {
    // id: id,
    building_name: address.building_name,
    country: address.country,
    unit: address.unit,
    number: address.number,
    street: address.street,
    suburb: address.suburb,
    postcode: address.postcode,
    state: address.state,
    reference: property.reference,
    manager_id: state.selectedManager.value,
    location: property.location,
    primary_type: state.selectedPrimaryType.value,
    property_type: state.selectedType.value,
    floor_area: property.floorArea,
    floor_size: property.floorSize,
    land_size: property.landSize,
    land_area: property.landArea,
    bedroom: property.bedroom,
    bathroom: property.bathroom,
    car_space: property.car_space,
    garages: property.garages,
    carports: property.carports,
    open_car_space: property.open_car_space,

    listing_id: l_id

    // floor_area_UoM: property.floor_area_UoM,

    // first_routine: property.first_routine,
    // first_routine_UoM:property.first_routine_UoM,
  };
  return dispatch => {
    console.log(formData);
    const headers = {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",

      Authorization: "Bearer " + authUser.token,
    };

    axios
      .put(url, formData, { headers: headers })
      .then(response => {
        dispatch({
          type: "UPDATE_PROPERTY_LISTING_INFO",
          payload: response,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "UPDATE_PROPERTY_LISTING_INFO",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const updatePropertyInfoFromListingListFresh = () => {
  console.log("=========fresh fresh==========")
  return dispatch => {
    dispatch({
      type: "UPDATE_PROPERTY_LISTING_INFO_FRESH",
      payload: null,
      error: null,
      status: false,
    });
  };
};

export const RentalListingData = id => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  const newUrl = process.env.REACT_APP_LOCALHOST;
  var url = newUrl + "/advertisement/listing/" + id;

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
          type: "RENTAL_LISTING_DATA",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "RENTAL_LISTING_DATA",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const rentalListingFresh = () => {
  return dispatch => {
    dispatch({
      type: "RENTAL_LISTING_DATA_FRESH",
      payload: null,
      error: null,
      status: false,
    });
  };
};

export const rentalListingUpdate = (data, id) => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  const newUrl = process.env.REACT_APP_LOCALHOST;
  var url = newUrl + "/advertisement/listing/" + id;
  const headers = {
    "Content-Type": "application/json",

    "Access-Control-Allow-Origin": "*",

    Authorization: "Bearer " + authUser.token,
  };
  const formData = {
    bond: data.bond,
    date_available: data.available_date,
    display_rent: data.display_rent,
    listing_agent_primary: data.primary_listing_agent,
    listing_agent_secondary: data.secondary_listing_agent,
    rent: data.rent_per_week,
  };

  return dispatch => {
    console.log(formData);
    axios
      .put(url, formData, { headers: headers })
      .then(response => {
        dispatch({
          type: "RENTAL_LISTING_UPDATE",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "RENTAL_LISTING_UPDATE",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const rentalListingUpdateFresh = () => {
  console.log("Holle from fresh");
  return dispatch => {
    dispatch({
      type: "RENTAL_LISTING_UPDATE_FRESH",
      payload: null,
      error: null,
      status: false,
    });
  };
};

export const listingGeneralFeature = data => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  console.log(data);
  const newUrl = process.env.REACT_APP_LOCALHOST;
  var url = newUrl + "/listing/advert/general/features/" + data.id;

  return dispatch => {
    const headers = {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",

      Authorization: "Bearer " + authUser.token,
    };
    // const formData = {
    //   new_or_established: data.new_or_established,
    //   bond: data.bond,
    //   display_rent: data.display_rent,
    //   primary_listing_agent: data.primary_listing_agent,
    //   rent_per_week: data.rent_per_week,
    //   secondary_listing_agent: data.secondary_listing_agent,
    // };
    //console.log(formData);

    axios
      .put(url, data, { headers: headers })
      .then(response => {
        console.log(response);
        dispatch({
          type: "LISTING_GENERAL_FEATURE",
          payload: response,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "LISTING_GENERAL_FEATURE",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const listingLinks = (id, data) => {
  console.log(data);
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  const newUrl = process.env.REACT_APP_LOCALHOST;
  var url = newUrl + "/listing/advert/video/url/" + id;
  // console.log(data, id);

  const headers = {
    "Content-Type": "application/json",

    "Access-Control-Allow-Origin": "*",

    Authorization: "Bearer " + authUser.token,
  };

  const formData = {
    video_url: data.videoURL,
    online_tour: data.online,
  };

  return dispatch => {
    console.log(formData);
    axios
      .put(url, formData, { headers: headers })
      .then(response => {
        dispatch({
          type: "LISTING_LINKS",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "LISTING_LINKS",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const listingLinksInfo = id => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  const newUrl = process.env.REACT_APP_LOCALHOST;
  var url = newUrl + "/listing/advert/video/url/" + id;

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
          type: "LISTING_LINKS_DATA",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "LISTING_LINKS_DATA",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const listingLinksFresh = () => {
  return dispatch => {
    dispatch({
      type: "LISTING_LINKS_DATA_FRESH",
      payload: null,
      error: null,
      status: false,
    });
  };
};

export const ListingListInspectionInfo = id => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  const newUrl = process.env.REACT_APP_LOCALHOST;
  var url = newUrl + "/listing/info/inspection/" + id;
  // console.log(url);

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
          type: "LISTING_LIST_INSPECTION_INFO",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "LISTING_LIST_INSPECTION_INFO",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const ListingListInspectionInfoFresh = () => {
  return dispatch => {
    dispatch({
      type: "LISTING_LIST_INSPECTION_INFO_FRESH",
      payload: null,
      error: null,
      status: false,
    });
  };
};

export const rentalListDescUpdate = (data, id) => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  const newUrl = process.env.REACT_APP_LOCALHOST;
  var url = newUrl + "/listing/property/details/" + id;
  const headers = {
    "Content-Type": "application/json",

    "Access-Control-Allow-Origin": "*",

    Authorization: "Bearer " + authUser.token,
  };

  const formData = {
    title: data.reference,
    description: data.details,
  };

  return dispatch => {
    console.log(formData);
    axios
      .put(url, formData, { headers: headers })
      .then(response => {
        dispatch({
          type: "RENTAL_LISTING_UPDATE_DESC",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "RENTAL_LISTING_UPDATE_DESC",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const rentalListDescUpdateFresh = () => {
  return dispatch => {
    dispatch({
      type: "RENTAL_LISTING_UPDATE_DESC_FRESH",
      payload: null,
      error: null,
      status: false,
    });
  };
};

export const ListingDescData = id => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  const newUrl = process.env.REACT_APP_LOCALHOST;
  var url = newUrl + "/listing/property/details/" + id;

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
          type: "LISTING_DESC_DATA",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "LISTING_DESC_DATA",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const ListingDescDataFresh = () => {
  return dispatch => {
    dispatch({
      type: "LISTING_DESC_DATA_FRESH",
      payload: null,
      error: null,
      status: false,
    });
  };
};

export const getListInspectionModalInfo = id => {
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
          type: "INSPECTION_INFO_MODAL_DATA",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "INSPECTION_INFO_MODAL_DATA",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const generalListFeatureImageAdd = data => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  const newUrl = process.env.REACT_APP_LOCALHOST;
  var url = newUrl + "/uploadMultipleAdvertImage";
  // var url = newUrl + "/advertisement/slider";
  const headers = {
    "Content-Type": "application/json",

    "Access-Control-Allow-Origin": "*",

    Authorization: "Bearer " + authUser.token,
  };

  console.log(data);

  const formData = new FormData();
  for (let i = 0; i < data.file.length; i++) {
    formData.append("image[]", data.file[i]);
  }
  formData.append("listing_id", data.listing_id);
  formData.append("property_id", data.property_id);
  formData.append("advert_slider", data.file);

  return dispatch => {
    axios
      .post(url, formData, { headers: headers })
      .then(response => {
        dispatch({
          type: "GENERAL_LIST_FEATURE_IMAGE_ADD",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "GENERAL_LIST_FEATURE_IMAGE_ADD",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const generalListFeatureImageAddFresh = () => {
  return dispatch => {
    dispatch({
      type: "GENERAL_LIST_FEATURE_IMAGE_ADD_FRESH",
      payload: null,
      error: null,
      status: false,
    });
  };
};

export const generalListImageAdd = data => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  const newUrl = process.env.REACT_APP_LOCALHOST;
  // var url = newUrl + "/listing/advert/floor/image";
  var url = newUrl + "/uploadMultipleFloorImage";
  console.log(data);
  const headers = {
    "Content-Type": "application/json",

    "Access-Control-Allow-Origin": "*",

    Authorization: "Bearer " + authUser.token,
  };

  const formData = new FormData();
  for (let i = 0; i < data.file.length; i++) {
    formData.append("image[]", data.file[i]);
  }
  formData.append("listing_id", data.listing_id);
  formData.append("property_id", data.property_id);
  // formData.append("image", data.file);

  return dispatch => {
    axios
      .post(url, formData, { headers: headers })
      .then(response => {
        dispatch({
          type: "GENERAL_LIST_IMAGE_ADD",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "GENERAL_LIST_IMAGE_ADD",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const generalListImageAddFresh = () => {
  return dispatch => {
    dispatch({
      type: "GENERAL_LIST_IMAGE_ADD_FRESH",
      payload: null,
      error: null,
      status: false,
    });
  };
};

export const GetListingSliderImage = data => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  const newUrl = process.env.REACT_APP_LOCALHOST;
  var url = newUrl + "/get/listing/advert/slider";
  return dispatch => {
    const formData = {
      listing_id: data.listing_id,
      property_id: data.property_id,
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
          type: "GET_GENERAL_LIST_FEATURE_IMAGE",
          payload: response,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "GET_GENERAL_LIST_FEATURE_IMAGE",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const GetListingSliderImageFresh = () => {
  return dispatch => {
    dispatch({
      type: "GET_GENERAL_LIST_FEATURE_IMAGE_FRESH",
      payload: null,
      error: null,
      status: false,
    });
  };
};

export const getGeneralFeature = userID => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));

  const newUrl = process.env.REACT_APP_LOCALHOST;
  var url = newUrl + "/listing/advert/general/features/" + userID;

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
          type: "GET_LISTING_GENERAL_FEATURE",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "GET_LISTING_GENERAL_FEATURE",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const getGeneralFeatureFresh = () => {

  return dispatch => {
    dispatch({
      type: "GET_LISTING_GENERAL_FEATURE_FRESH",
      payload: null,
      error: null,
      status: false,
    });
  };
};

export const listingGeneralFeatureFresh = () => {
  return dispatch => {
    dispatch({
      type: "LISTING_GENERAL_FEATURE",
      payload: null,
      status: false,
    });
  };
};

export const listingStatus = (id, status) => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  const newUrl = process.env.REACT_APP_LOCALHOST;
  var url = newUrl + "/listing/update/label/" + id;

  const headers = {
    "Content-Type": "application/json",

    "Access-Control-Allow-Origin": "*",

    Authorization: "Bearer " + authUser.token,
  };
  const formData = { id: id, status: status, };
  console.log(formData);
  return dispatch => {
    axios
      .put(url, formData, { headers: headers })
      .then(response => {
        console.log(response);
        dispatch({
          type: "LISTING_STATUS",
          payload: response,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "LISTING_STATUS",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const listingStatusFresh = () => {
  return dispatch => {
    dispatch({
      type: "LISTING_STATUS_FRESH",
      payload: null,
      status: false,
    });
  };
};

export const offMarketStatus = (id, status) => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  const newUrl = process.env.REACT_APP_LOCALHOST;
  var url = newUrl + "/listing/offmarket/" + id;

  const headers = {
    "Content-Type": "application/json",

    "Access-Control-Allow-Origin": "*",

    Authorization: "Bearer " + authUser.token,
  };
  const formData = { id: id, status: status, };
  console.log(formData);
  return dispatch => {
    axios
      .put(url, formData, { headers: headers })
      .then(response => {
        console.log(response);
        dispatch({
          type: "OFF_MARKET",
          payload: response,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "OFF_MARKET",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const offMarketStatusFresh = () => {
  return dispatch => {
    dispatch({
      type: "OFF_MARKET_FRESH",
      payload: null,
      status: false,
    });
  };
};

export const deleteListing = (id) => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  const newUrl = process.env.REACT_APP_LOCALHOST;
  var url = newUrl + "/listing/" + id;

  const headers = {
    "Content-Type": "application/json",

    "Access-Control-Allow-Origin": "*",

    Authorization: "Bearer " + authUser.token,
  };
  return dispatch => {
    axios
      .delete(url, { headers: headers })
      .then(response => {
        console.log(response);
        dispatch({
          type: "DELETE_LISTING",
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "DELETE_LISTING",
          status: "Failed",
        });
      });
  };
};

export const deleteListingFresh = () => {
  return dispatch => {
    dispatch({
      type: "DELETE_LISTING_FRESH",
      status: false,
    });
  };
};

export const getMessageTemplatesForListingBySelect = (data, query = null) => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  const newData = data.map((item) => item.label);

  let url = `${process.env.REACT_APP_LOCALHOST}/listing/message/mail/template/filter`;
  const formData = {
    trigger_to: data,
    trigger_to2: newData,
    query: query
  }
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
          type: "GET_MESSAGE_TEMPLATES_FOR_LISTINGS_BY_SELECT",
          payload: response,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "GET_MESSAGE_TEMPLATES_FOR_LISTINGS_BY_SELECT",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const sendMailFromTemplatesInListing = (id, sub, listingId) => {
  console.log(id, sub, listingId);
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  var url = `${process.env.REACT_APP_LOCALHOST}/listing/message/mail/template/activity`;
  const formData = {
    listing_id: listingId,
    template_id: id,
    subject: sub
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
          type: "SEND_MAIL_TO_ACTIVITY_LISTING",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "SEND_MAIL_TO_ACTIVITY_LISTING",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const sendMailFromTemplatesInListingFresh = () => {
  return dispatch =>
    dispatch({
      type: "SEND_MAIL_TO_ACTIVITY_LISTING_FRESH"
    });
};


export const republishListing = (id) => {


  var authUser = JSON.parse(localStorage.getItem("authUser"));
  const newUrl = `${process.env.REACT_APP_LOCALHOST}`;

  let url = `${newUrl}/listing/republish/${id}`;

  const formData = {

  }

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
          type: "REPUBLISH_LISTING",
          payload: response,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "REPUBLISH_LISTING",
          error: error,
          status: "Failed",
        });
      });
  };
};

export const republishListingFresh = () => {
  return dispatch =>
    dispatch({
      type: "REPUBLISH_LISTING_FRESH",
      payload: null,
      error: null,
      status: false,
    });
};