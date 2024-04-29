import {
  ROLE_ADD,
  MODULE_GET_SUCCESS,
  MODULE_GET_FAILED,
  MODULE_EDIT_SUCCESS,
  MODULE_EDIT_FAILED,
  ROLE_ASSIGN,
  ROLE_LIST,
  ROLE_DELETE,
  MODULE_ADD_FRESH,
  ROLE_ADD_FRESH,
  ROLE_DELETE_FRESH,
  ROLE_ASSIGN_FRESH,
  MODULE_EDIT_FRESH,
  MODULE_LIST_FRESH,
} from "./actionTypes";
import axios from "axios";

var authUser = JSON.parse(localStorage.getItem("authUser"));

export const addRole = (menu) => {

  var url = process.env.REACT_APP_LOCALHOST + "/roleInsertAjaxRequest";
  const formData = {
    roleName: menu.role,
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
          type: ROLE_ADD,
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: ROLE_ADD,
          payload: error,
          status: "Faild",
        });
      });
  };
};
export const roleAssignModule = (modules, role) => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  var url = process.env.REACT_APP_LOCALHOST + "/roleModuleAssignAjax";
  const formData = {
    module: modules,
    role: role,
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
          type: ROLE_ASSIGN,
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: ROLE_ASSIGN,
          payload: error,
          status: "Faild",
        });
      });
  };
};
export const getModule = menu => {
  console.log(menu);
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  var url = process.env.REACT_APP_LOCALHOST + "/getModules";
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
          type: MODULE_GET_SUCCESS,
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: MODULE_GET_FAILED,
          payload: error,
          status: "Faild",
        });
      });
  };
};
export const editModule = user => {
  console.log(user);
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  var url = process.env.REACT_APP_LOCALHOST + "/login";
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
export const roleList = () => {
  console.log("=============hello GUYS==========");
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  var url = process.env.REACT_APP_LOCALHOST + "/getAllRoles";
  const formData = {
    id: module,
  };
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
          type: ROLE_LIST,
          payload: response,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: ROLE_LIST,
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const roleDelete = (id) => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  var url = process.env.REACT_APP_LOCALHOST + "/rolesDeleteAjax";
  const formData = {
    'role_id': id
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
          type: ROLE_DELETE,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: ROLE_DELETE,
          payload: error,
          status: "Faild",
        });
      });
  };
};

export const roleAddFresh = () => {
  return dispatch =>
    dispatch({
      type: ROLE_ADD_FRESH,
      payload: null,
      error: null,
      status: false,
    });
};
export const roleDeleteFresh = () => {
  return dispatch =>
    dispatch({
      type: ROLE_DELETE_FRESH,
      payload: null,
      error: null,
      status: false,
    });
};
export const roleAssignFresh = () => {
  return dispatch =>
    dispatch({
      type: ROLE_ASSIGN_FRESH,
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
// export const moduleRouteDeleteFresh = () => {
//   return dispatch =>
//     dispatch({
//       type: MODULE_DELETE_FRESH,
//       payload: null,
//       status: false,
//     });
// };
export const moduleRouteListFresh = () => {
  return dispatch =>
    dispatch({
      type: MODULE_LIST_FRESH,
      payload: null,
      error: null,
      status: false,
    });
};
