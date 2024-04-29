import {
  MODULE_ROUTE_ADD,
  MODULE_GET,
  MODULE_DELETE,
  MODULE_EDIT_SUCCESS,
  MODULE_EDIT_FAILED,
  MODULE_ROUTE_LIST,
  MODULE_ROUTE_DELETE,
  MODULE_ROUTE_ADD_FRESH,
  MODULE_EDIT_FRESH,
  MODULE_ROUTE_DELETE_FRESH,
  MODULE_LIST_FRESH,
  MODULE_ROUTE_LIST_FRESH
} from "./actionTypes";
import axios from "axios";

var authUser = JSON.parse(localStorage.getItem("authUser"));

export const addRoute = (menu, id) => {
  
  var url = process.env.REACT_APP_LOCALHOST+"/moduleDetailsInsertAjax";
  const formData = {
    route: menu.route,
    module: id,
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
          type: MODULE_ROUTE_ADD,
          payload:response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: MODULE_ROUTE_ADD,
          payload: error,
          status: "Failed",
        });
      });
  };
};
export const getModule = menu => {
  console.log(menu);
  var url = process.env.REACT_APP_LOCALHOST+"/getModules";
  const formData = {
    menu_id: menu.value,
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
          type: MODULE_GET,
          payload:response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: MODULE_GET,
          payload: error,
          status: "Failed",
        });
      });
  };
};
export const editModule = user => {
  console.log(user);
  var url = process.env.REACT_APP_LOCALHOST+"/login";
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
        dispatch({
          type: MODULE_EDIT_SUCCESS,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: MODULE_EDIT_FAILED,
          payload: error,
          status: "Faild",
        });
      });
  };
};
export const moduleDelete = (id) => {
  var url = process.env.REACT_APP_LOCALHOST+"/modules/"+id;
  
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
          type: MODULE_DELETE,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: MODULE_DELETE,
          payload: error,
          status: "Failed",
        });
      });
  };
};
export const moduleRouteList = (module) => {
  var url = process.env.REACT_APP_LOCALHOST+"/getRouteByModule";
  const formData = {
    id:module,
  };
  return dispatch => {
    const headers = {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",

      Authorization: "Bearer " + authUser.token,
    };
    axios
      .post(url, formData,{ headers: headers })
      .then(response => {
        dispatch({
          type: MODULE_ROUTE_LIST,
          payload: response,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: MODULE_ROUTE_LIST,
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const moduleRouteDelete = (id) => {
  var url = process.env.REACT_APP_LOCALHOST+"/moduleDetailsDeleteAjax";
  const formData = {
    'id':id
  };
  return dispatch => {
    const headers = {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",

      Authorization: "Bearer " + authUser.token,
    };
    axios
      .post(url, formData,{ headers: headers })
      .then(response => {
        dispatch({
          type: MODULE_ROUTE_DELETE,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: MODULE_ROUTE_DELETE,
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const moduleAddFresh = () => {
  return dispatch =>
    dispatch({
      type: MODULE_ROUTE_ADD_FRESH,
      payload: null,
      error: null,
      status: false,
    });
};
export const moduleListFresh = () => {
  return dispatch =>
    dispatch({
      type: MODULE_LIST_FRESH,
      payload: null,
      error: null,
      status: false,
    });
};
export const moduleEditFresh = () => {
  return dispatch =>
    dispatch({
      type: MODULE_EDIT_FRESH,
      payload: null,
      status: false,
    });
};
export const moduleRouteDeleteFresh = () => {
  return dispatch =>
    dispatch({
      type: MODULE_ROUTE_DELETE_FRESH,
      payload: null,
      status: false,
    });
};
export const moduleRouteListFresh = () => {
  return dispatch =>
    dispatch({
      type: MODULE_ROUTE_LIST_FRESH,
      payload: null,
      error: null,
      status: false,
    });
};
