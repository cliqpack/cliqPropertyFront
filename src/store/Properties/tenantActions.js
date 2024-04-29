import axios from "axios";

export const getPropertyTenantInfo = propertyId => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  let url = `${process.env.REACT_APP_LOCALHOST}/property/tenant/info/${propertyId}`;
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
          type: "PROPERTY_TENANT_INFO",
          payload: response,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "PROPERTY_TENANT_INFO",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const getPropertyTenantInfoFresh = () => {
  return dispatch =>
    dispatch({
      type: "PROPERTY_TENANT_INFO_FRESH",
      status: false,
    });
};



export const getTenantInfo = id => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  let url = `${process.env.REACT_APP_LOCALHOST}/tenants/${id}/edit`;
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
          type: "TENANT_INFO",
          payload: response,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "TENANT_INFO",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const TenantInfoFresh = () => {
  return dispatch =>
    dispatch({
      type: "TENANT_INFO_FRESH",
      payload: null,
      error: null,
      status: false,
    });
};

export const propertyTenantInfoFresh = () => {
  return dispatch =>
    dispatch({
      type: "PROPERTY_TENANT_INFO_FRESH",
      payload: null,
      error: null,
      status: false,
    });
};



export const propertyTenantAddFresh = () => {
  return dispatch =>
    dispatch({
      type: "PROPERTY_TENANT_ADD_FRESH",
      status: false,
    });
};
