import {
  MENU_ADD,
  MENU_EDIT,
  MENU_LIST,
  MENU_DELETE,
  MENU_ADD_FRESH,
  MENU_EDIT_FRESH,
  MENU_DELETE_FRESH,
  MENU_LIST_FRESH,
} from "./actionTypes";
import axios from "axios";

var authUser = JSON.parse(localStorage.getItem("authUser"));

export const addMenu = menu => {
  console.log(menu);
  var url = `${process.env.REACT_APP_LOCALHOST}/menus`;
  const formData = {
    menu_title: menu.menu,
    slug: menu.slug,
    sort_order: menu.sort_order,
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
          type: MENU_ADD,
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: MENU_ADD,
          payload: error,
          status: "Failed",
        });
      });
  };
};
export const editMenu = user => {
  console.log(user);
  var url = `${process.env.REACT_APP_LOCALHOST}/login`;
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
          type: MENU_EDIT,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: MENU_EDIT,
          payload: error,
          status: "Failed",
        });
      });
  };
};
export const menuList = () => {
  var authUsers = JSON.parse(localStorage.getItem("authUser"));
  var url = `${process.env.REACT_APP_LOCALHOST}/menus`;
  const formData = {};
  return dispatch => {
    const headers = {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",

      Authorization: "Bearer " + authUsers.token,
    };
    axios
      .get(url, { headers: headers })
      .then(response => {
        dispatch({
          type: MENU_LIST,
          payload: response,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: MENU_LIST,
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const menuDelete = (id) => {
  var url = `${process.env.REACT_APP_LOCALHOST}/menus/${id}`;
  const formData = {};
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
          type: MENU_DELETE,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: MENU_DELETE,
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const menuAddFresh = () => {
  return dispatch =>
    dispatch({
      type: MENU_ADD_FRESH,
      payload: null,
      error: null,
      status: false,
    });
};
export const menuEditFresh = () => {
  return dispatch =>
    dispatch({
      type: MENU_EDIT_FRESH,
      payload: null,
      status: false,
    });
};
export const menuDeleteFresh = () => {
  return dispatch =>
    dispatch({
      type: MENU_DELETE_FRESH,
      payload: null,
      status: false,
    });
};
export const menuListFresh = () => {
  return dispatch =>
    dispatch({
      type: MENU_LIST_FRESH,
      payload: null,
      error: null,
      status: false,
    });
};
