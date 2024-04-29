import {
  LOGIN_USER,
  LOGIN_SUCCESS,
  LOGIN_FRESH,
  LOGIN_FAILED,
  LOGOUT_USER,
  LOGOUT_USER_SUCCESS,
  API_ERROR,
  SOCIAL_LOGIN,
  EMAIL_SUCCESS,
  EMAIL_FAILED,
} from "./actionTypes";
import axios from "axios";
// import { NULL } from "node-sass";

export const loginUser = user => {

  const newUrl = process.env.REACT_APP_LOCALHOST;
  var url = newUrl + "/login";
  const formData = {
    email: user.email,
    password: user.password,
  };
  return dispatch => {
    const headers = {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",


    };
    axios
      .post(url, formData, { headers: headers })
      .then(response => {
        localStorage.setItem("authUser", JSON.stringify(response.data));
        dispatch({
          type: LOGIN_SUCCESS,
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: LOGIN_FAILED,
          payload: error,
          status: "Faild",
        });
      });
  };
};

export const loginSuccess = user => {
  return {
    type: LOGIN_SUCCESS,
    payload: user,
  };
};

export const logoutUser = history => {
  return {
    type: LOGOUT_USER,
    payload: { history },
  };
};

export const logoutUserSuccess = () => {
  return {
    type: LOGOUT_USER_SUCCESS,
    payload: {},
  };
};

export const apiError = error => {
  return {
    type: API_ERROR,
    payload: error,
  };
};

export const socialLogin = (data, history, type) => {
  return {
    type: SOCIAL_LOGIN,
    payload: { data, history, type },
  };
};
export const loginStatusClear = () => {
  return dispatch =>
    dispatch({
      type: LOGIN_FRESH,
      payload: null,
      status: false,
    });
};

export const ownerTenantLogin = user => {
  const newUrl = process.env.REACT_APP_LOCALHOST;
  var url = newUrl + "/register-other";
  const formData = {
    email: user.email,
  };
  console.log(formData);
  return dispatch => {
    const headers = {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",
    };
    axios
      .post(url, formData, { headers: headers })
      .then(response => {
        localStorage.setItem("authUser", JSON.stringify(response.data));
        dispatch({
          type: EMAIL_SUCCESS,
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: EMAIL_FAILED,
          payload: error,
          status: "Faild",
        });
      });
  };
};

export const ownerTenantEmailFresh = user => {
  return dispatch => {
    dispatch({
      type: "OWNER_TENANT_EMAIL_FRESH",
      payload: null,
      status: false,
    });
  };
};

export const forgotPassword = user => {

  const newUrl = process.env.REACT_APP_LOCALHOST;
  var url = newUrl + "/forgot-password";
  const formData = {
    email: user.email,
  };
  console.log(formData);
  return dispatch => {
    const headers = {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",
    };
    axios
      .post(url, formData, { headers: headers })
      .then(response => {
        localStorage.setItem("authUser", JSON.stringify(response.data));
        dispatch({
          type: 'FORGOT_PASSWORD_SUCCESS',
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: 'FORGOT_PASSWORD_FAILED',
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const getNotification = () => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  let url = `${process.env.REACT_APP_LOCALHOST}/notification`;
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
          type: "NOTIFICATION_LIST",
          payload: response,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "NOTIFICATION_LIST",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const getNotificationFresh = () => {
  return dispatch =>
    dispatch({
      type: "NOTIFICATION_LIST_FRESH",
      payload: null,
      error: null,
      status: false,
    });
};

export const notificationRead = (id) => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  const newUrl = `${process.env.REACT_APP_LOCALHOST}`;
  var url = `${newUrl}/notification/mark/as/read/${id}`;
  const headers = {
    "Content-Type": "application/json",

    "Access-Control-Allow-Origin": "*",

    Authorization: "Bearer " + authUser.token,
  };
  const formData = {
    id: id
  };
  return dispatch => {
    axios
      .post(url, formData, { headers: headers })
      .then(response => {
        dispatch({
          type: "READ_NOTIFICATION",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "READ_NOTIFICATION",
          error: error,
          status: "Failed",
        });
      });
  };
};

export const notificationReadFresh = () => {
  return dispatch =>
    dispatch({
      type: "READ_NOTIFICATION_FRESH",
      payload: null,
      error: null,
      status: false,
    });
};

export const notificationUnRead = (id) => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  const newUrl = `${process.env.REACT_APP_LOCALHOST}`;
  var url = `${newUrl}/notification/mark/unread/${id}`;
  const headers = {
    "Content-Type": "application/json",

    "Access-Control-Allow-Origin": "*",

    Authorization: "Bearer " + authUser.token,
  };
  const formData = {
    id: id
  };
  return dispatch => {
    axios
      .post(url, formData, { headers: headers })
      .then(response => {
        dispatch({
          type: "UNREAD_NOTIFICATION",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "UNREAD_NOTIFICATION",
          error: error,
          status: "Failed",
        });
      });
  };
};

export const notificationUnReadFresh = () => {
  return dispatch =>
    dispatch({
      type: "UNREAD_NOTIFICATION_FRESH",
      payload: null,
      error: null,
      status: false,
    });
};

export const readAllNotification = () => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  let url = `${process.env.REACT_APP_LOCALHOST}/notification/mark/all/as/read`;
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
          type: "READ_ALL_NOTIFICATION",
          payload: response,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "READ_ALL_NOTIFICATION",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const readAllNotificationFresh = () => {
  return dispatch =>
    dispatch({
      type: "READ_ALL_NOTIFICATION_FRESH",
      payload: null,
      error: null,
      status: false,
    });
};

export const getAllNotification = () => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  let url = `${process.env.REACT_APP_LOCALHOST}/all/notification`;
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
          type: "ALL_NOTIFICATION",
          payload: response,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "ALL_NOTIFICATION",
          payload: error,
          status: "Failed",
        });
      });
  };
};