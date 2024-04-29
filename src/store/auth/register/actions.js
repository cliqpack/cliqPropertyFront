import {
  REGISTER_USER,
  REGISTER_USER_SUCCESSFUL,
  REGISTER_USER_FAILED,
  COMPANY_LIST,
  COMPANY_ADD,
  COMPANY_ADD_FRESH,
  COMPANY_LIST_FRESH,
  REGISTERED_USER_LIST,
  USER_DELETE,
  USER_DELETE_FRESH,
  USER_INFO,
  USER_INFO_FRESH,
  USER_UPDATE,
  USER_UPDATE_FRESH,
  REGISTER_OWNER_TENANT,
} from "./actionTypes";
import axios from "axios";

var authUser = JSON.parse(localStorage.getItem("authUser"));

// Generate Password Function
function makePassword(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export const registerUser = (user) => {
  var url = process.env.REACT_APP_LOCALHOST + "/register";
  const formData = {
    first_name: user.fname,
    last_name: user.lname,
    email: user.email,
    user_type: user.user_type,
    work_phone: user.work_phone,
    mobile_phone: user.mobile_phone,
    password: user.password,
    company_id: user.company_name,
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
          type: REGISTER_USER_SUCCESSFUL,
          payload: response,
          status: "Success",
        });
      })
      .catch(err => {
        dispatch({
          type: REGISTER_USER_FAILED,
          payload: err,
          status: "Faild",
        });
      });
  };
};

export const registerUserInManager = (user, phone) => {
  console.log(user);
  console.log(phone);
  //return 0;
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  var url = process.env.REACT_APP_LOCALHOST + "/register-in-manager";
  const formData = {
    first_name: user.fname,
    last_name: user.lname,
    email: user.email,
    user_type: "Property Manager",
    work_phone: phone.work_phone,
    mobile_phone: phone.mobile_phone,
    password: user.password,
    company_id: authUser.user.company_id,
    role_id: user.role,
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
          type: REGISTER_USER_SUCCESSFUL,
          payload: response,
          status: "Success",
        });
      })
      .catch(err => {
        dispatch({
          type: REGISTER_USER_FAILED,
          payload: err,
          status: "Faild",
        });
      });
  };
};

export const companyListRegister = () => {
  var url = process.env.REACT_APP_LOCALHOST + "/companies";
  const formData = {};
  return dispatch => {
    const headers = {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",
    };
    axios
      .get(url, { headers: headers })
      .then(response => {
        dispatch({
          type: COMPANY_LIST,
          payload: response,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: COMPANY_LIST,
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const addCompanyRegister = company => {
  console.log(company);
  var url = process.env.REACT_APP_LOCALHOST + "/companies";
  const formData = {
    company_name: company.company,
    address: company.address,
    phone: company.phone,
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
          type: COMPANY_ADD,
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: COMPANY_ADD,
          payload: error,
          status: "Failed",
        });
      });
  };
};
export const companyAddFreshRegister = () => {
  return dispatch =>
    dispatch({
      type: COMPANY_ADD_FRESH,
      payload: null,
      error: null,
      status: false,
    });
};
export const companyListFreshRegister = () => {
  return dispatch =>
    dispatch({
      type: COMPANY_LIST_FRESH,
      payload: null,
      error: null,
      status: false,
    });
};
export const registerUserSuccessful = user => {
  return {
    type: REGISTER_USER_SUCCESSFUL,
    payload: user,
  };
};

export const registerUserFailed = user => {
  return {
    type: REGISTER_USER_FAILED,
    payload: user,
  };
};

export const registerStatusClear = () => {
  return dispatch =>
    dispatch({
      type: REGISTER_USER_FAILED,
      user: null,
      registrationError: null,
      loading: false,
    });
};

export const userList = () => {
  var url = process.env.REACT_APP_LOCALHOST + "/all-user";
  var authUser = JSON.parse(localStorage.getItem("authUser"));

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
          type: REGISTERED_USER_LIST,
          payload: response,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: REGISTERED_USER_LIST,
          payload: error,
          status: "Failed",
        });
        console.log("response");
      });
  };
};

export const deleteUserData = id => {
  var url = process.env.REACT_APP_LOCALHOST + "/users/" + id;
  var authUser = JSON.parse(localStorage.getItem("authUser"));

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
          type: USER_DELETE,
          status: "Success",
        });
      })

      .catch(error => {
        dispatch({
          type: USER_DELETE,
          payload: error,
          status: "Faild",
        });
      });
  };
};
export const userDeleteFresh = () => {
  return dispatch =>
    dispatch({
      type: USER_DELETE_FRESH,
      payload: null,
      status: false,
    });
};

export const userGetInfo = id => {
  var url = process.env.REACT_APP_LOCALHOST + "/user-info-data/" + id;
  var authUser = JSON.parse(localStorage.getItem("authUser"));

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
          type: USER_INFO,
          payload: response,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: USER_INFO,
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const updateUserData = user => {
  console.log(user);
  var authUser = JSON.parse(localStorage.getItem("authUser"));

  var url = process.env.REACT_APP_LOCALHOST + "/updateInfo";
  const formData = {
    id: user.userid,
    first_name: user.user_fname,
    last_name: user.user_lname,
    work_phone: user.user_work_phone,
    mobile_phone: user.user_mobile_phone,
    user_type: user.user_user_type,
    company_id: user.company_name,
    address: user.address,
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
          type: USER_UPDATE,
          status: "Success",
        });
      })

      .catch(error => {
        dispatch({
          type: USER_UPDATE,
          payload: error,
          status: "Faild",
        });
      });
  };
};

export const userInfoFresh = () => {
  return dispatch =>
    dispatch({
      type: USER_INFO_FRESH,
      payload: null,
      error: null,
      status: false,
    });
};

export const userUpdateFresh = () => {
  return dispatch =>
    dispatch({
      type: USER_UPDATE_FRESH,
      payload: null,
      status: false,
    });
};

// OWNER TENANT REGISTER FORM
export const registerOwnerTenant = (user, id) => {
  var url = process.env.REACT_APP_LOCALHOST + "/register-other-update";
  const formData = {
    user_id: id,
    first_name: user.fname,
    last_name: user.lname,
    user_type: user.user_type,
    work_phone: user.work_phone,
    mobile_phone: user.mobile_phone,
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
          type: REGISTER_OWNER_TENANT,
          payload: response,
          status: "Success",
        });
      })
      .catch(err => {
        dispatch({
          type: REGISTER_OWNER_TENANT,
          payload: err,
          status: "Failed",
        });
      });
  };
};

export const registerOwnerTenantFresh = () => {
  return dispatch =>
    dispatch({
      type: 'REGISTER_OWNER_TENANT_FRESH',
      payload: null,
      status: false,
    });
};
