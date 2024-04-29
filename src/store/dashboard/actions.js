// import {
//     API_SUCCESS,
//     API_FAIL,
//     GET_CHARTS_DATA,
// } from "./actionTypes";

// export const apiSuccess = (actionType, data) => ({
//     type: API_SUCCESS,
//     payload: { actionType, data },
// });

// export const apiFail = (actionType, error) => ({
//     type: API_FAIL,
//     payload: { actionType, error },
// });

// // charts data
// export const getChartsData = (periodType) => ({
//     type: GET_CHARTS_DATA,
//     payload: periodType
// });

import axios from "axios";

export const getChartsData = () => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));

  var url = `${process.env.REACT_APP_LOCALHOST}/dashboard`;
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
          type: "GET_CHARTS_DATA",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "GET_CHARTS_DATA",
          payload: error,
          status: "Failed",
        });
      });
  };
};


export const getDeshboardInsightsPropertyData = () => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));

  var url = `${process.env.REACT_APP_LOCALHOST}/routineInspectionComplete`;
  //var url = `${process.env.REACT_APP_LOCALHOST}/routineInspectionComplete`;
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
          type: "DASHBOARD_INSIGHTS_PROPERTY",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "DASHBOARD_INSIGHTS_PROPERTY",
          payload: error,
          status: "Failed",
        });
      });
  };
};


export const getInsightsActiveProperties = () => {
  // console.log("============ I am here ================")
  var authUser = JSON.parse(localStorage.getItem("authUser"));

  // var url = `${process.env.REACT_APP_LOCALHOST}/`;
  var url = `${process.env.REACT_APP_LOCALHOST}/activeProperties`;
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
          type: "INSIGHTS_ACTIVE_PROPERTIES",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "INSIGHTS_ACTIVE_PROPERTIES",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const getInsightsEntryInspection = () => {
  // console.log("============ I am here ================")
  var authUser = JSON.parse(localStorage.getItem("authUser"));

  // var url = `${process.env.REACT_APP_LOCALHOST}/`;
  var url = `${process.env.REACT_APP_LOCALHOST}/entryInspectionComplete`;
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
          type: "INSIGHTS_ENTRY_INSPECTION",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "INSIGHTS_ENTRY_INSPECTION",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const getInsightsExitInspection = () => {
  // console.log("============ I am here ================")
  var authUser = JSON.parse(localStorage.getItem("authUser"));

  // var url = `${process.env.REACT_APP_LOCALHOST}/`;
  var url = `${process.env.REACT_APP_LOCALHOST}/exitInspectionComplete`;
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
          type: "INSIGHTS_EXIT_INSPECTION",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "INSIGHTS_EXIT_INSPECTION",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const getGainProperties = () => {

  var authUser = JSON.parse(localStorage.getItem("authUser"));

  var url = `${process.env.REACT_APP_LOCALHOST}/gainProperties`;
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
          type: "INSIGHTS_GAIN_PROPERTIES",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "INSIGHTS_GAIN_PROPERTIES",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const getLostProperties = () => {

  var authUser = JSON.parse(localStorage.getItem("authUser"));

  var url = `${process.env.REACT_APP_LOCALHOST}/lostProperties`;
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
          type: "INSIGHTS_LOST_PROPERTIES",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "INSIGHTS_LOST_PROPERTIES",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const getInsightTenantArears = (days) => {

  var authUser = JSON.parse(localStorage.getItem("authUser"));

  var url = `${process.env.REACT_APP_LOCALHOST}/tenantArreas`;
  const formData = {
    days: days
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
          type: `INSIGHTS_TENANT_ARREAS_${days}_days`,
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: `INSIGHTS_TENANT_ARREAS_${days}`,
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const getJobAssigned = () => {

  var authUser = JSON.parse(localStorage.getItem("authUser"));

  var url = `${process.env.REACT_APP_LOCALHOST}/jobAssignedTime`;
  const formData = {};
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
          type: "INSIGHTS_JOB_ASSIGNED",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "INSIGHTS_JOB_ASSIGNED",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const getJobsOpen = () => {

  var authUser = JSON.parse(localStorage.getItem("authUser"));

  var url = `${process.env.REACT_APP_LOCALHOST}/jobOpen`;
  const formData = {};
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
          type: "INSIGHTS_JOBS_OPEN",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "INSIGHTS_JOBS_OPEN",
          payload: error,
          status: "Failed",
        });
      });
  };
};


export const getTaskOverdue = () => {

  var authUser = JSON.parse(localStorage.getItem("authUser"));

  var url = `${process.env.REACT_APP_LOCALHOST}/taskOverDue`;
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
          type: "INSIGHTS_TASK_OVERDUE",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "INSIGHTS_TASK_OVERDUE",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const getConversationOpen = () => {

  var authUser = JSON.parse(localStorage.getItem("authUser"));

  var url = `${process.env.REACT_APP_LOCALHOST}/conversationOpen`;
  const formData = {};
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
          type: "INSIGHTS_CONVERSATION_OPEN",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "INSIGHTS_CONVERSATION_OPEN",
          payload: error,
          status: "Failed",
        });
      });
  };
};