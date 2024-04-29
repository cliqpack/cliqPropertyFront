import {
  USER_ROLE_LIST,
  USER_ROLE_LIST_DATA,
  ROLE_USER_ASSIGN,
  ROLE_USER_ASSIGN_FRESH,
  MODULE_EDIT_FRESH,
  MODULE_DELETE_FRESH,
  MODULE_LIST_FRESH,
} from "./actionTypes";
import axios from "axios";

var authUser = JSON.parse(localStorage.getItem("authUser"));

export const roleAssignUser = (user,role) => {
  console.log(user);console.log(role);

  var url = process.env.REACT_APP_LOCALHOST+"/roleAssignUserInsertAjax";
  const formData = {
    user: user.value,
    role:role.value,
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
          type: ROLE_USER_ASSIGN,
          payload:response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: ROLE_USER_ASSIGN,
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const userRoleDelete = (id) => {
 
  var url = process.env.REACT_APP_LOCALHOST+"/userRolesDelete";
  const formData = {
    id: id

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
          type: "USER_ROLES_DELETE",
          payload:response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "USER_ROLES_DELETE",
          payload: error,
          status: "Failed",
        });
      });
  };
};
export const getUserRole = () => {
  // console.log(menu);
  var url = process.env.REACT_APP_LOCALHOST+"/roleAssignUser";
  // const formData = {
  //   menu_id: menu.value,
  // };
  
  return dispatch => {
    const headers = {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",

      Authorization: "Bearer " + authUser.token,
    };
    axios
      .get(url,  { headers: headers })
      .then(response => {
        dispatch({
          type: USER_ROLE_LIST,
          payload:response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: USER_ROLE_LIST,
          payload: error,
          status: "Faild",
        });
      });
  };
};

export const getUserRolelist = () => {
  // console.log(menu);
  var url = process.env.REACT_APP_LOCALHOST+"/userRoles";
  // const formData = {
  //   menu_id: menu.value,
  // };
  
  return dispatch => {
    const headers = {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",

      Authorization: "Bearer " + authUser.token,
    };
    axios
      .get(url,  { headers: headers })
      .then(response => {
        dispatch({
          type: USER_ROLE_LIST_DATA,
          payload:response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: USER_ROLE_LIST_DATA,
          payload: error,
          status: "Faild",
        });
      });
  };
};

export const roleDelete = (id) => {
  var url = process.env.REACT_APP_LOCALHOST+"/rolesDeleteAjax";
  const formData = {
    'role_id':id
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
          type: ROLE_DELETE_SUCCESS,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: ROLE_DELETE_FAILED,
          payload: error,
          status: "Faild",
        });
      });
  };
};

export const userRoleAddFresh = () => {
  return dispatch =>
    dispatch({
      type: ROLE_USER_ASSIGN_FRESH,
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
      type: MODULE_DELETE_FRESH,
      payload: null,
      status: false,
    });
};
export const moduleRouteListFresh = () => {
  return dispatch =>
    dispatch({
      type: MODULE_LIST_FRESH,
      payload: null,
      error: null,
      status: false,
    });
};
