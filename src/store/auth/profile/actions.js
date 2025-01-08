import { PROFILE_ERROR, PROFILE_SUCCESS, EDIT_PROFILE, EDIT_PASSWORD, RESET_PROFILE_FLAG } from "./actionTypes"
import axios from "axios";

var authUser = JSON.parse(localStorage.getItem("authUser"));

export const editProfile = user => {
  var authUsers = JSON.parse(localStorage.getItem("authUser"));
  var url = process.env.REACT_APP_LOCALHOST + "/updateInfo";

  const formData = {
    first_name: user.fname,
    last_name: user.lname,
    email: user.email,
    user_type: user.user_type,
    work_phone: user.work_phone,
    mobile_phone: user.mobile_phone,
    address: user.address,
    facebook_link: user.facebook_link,
    linked_in_link: user.linked_in_link,
    twitter_link: user.twitter_link,
    id: user.id,
  };

  return dispatch => {
    const headers = {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",

      Authorization: "Bearer " + authUsers.token,
    };
    axios
      .post(url, formData, { headers: headers })
      .then(response => {
        dispatch({
          type: EDIT_PROFILE,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: EDIT_PROFILE,
          status: "Failed",
        });
      });
  };
}



export const profileDetails = () => {

  var url = process.env.REACT_APP_LOCALHOST + "/user-info";
  var authUser = JSON.parse(localStorage.getItem("authUser"));


  return dispatch => {
    const headers = {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",

      Authorization: "Bearer " + authUser.token,
    };
    axios
      .post(url, '', { headers: headers })
      .then(response => {
        dispatch({
          type: "PROFILE_DETAILS",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "PROFILE_DETAILS",
          status: "Failed",
        });
      });
  };
}
export const editProfileFresh = () => {
  return dispatch => dispatch({
    type: EDIT_PROFILE,
    status: false,
  });
};
export const editPassword = user => {
  var authUsers = JSON.parse(localStorage.getItem("authUser"));
  var url = process.env.REACT_APP_LOCALHOST + "/changepassword";

  const formData = {
    password: user.confirm_password,
    oldPassword: user.password,
  };

  return dispatch => {
    const headers = {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",

      Authorization: "Bearer " + authUsers.token,
    };
    axios
      .post(url, formData, { headers: headers })
      .then(response => {
        dispatch({
          type: EDIT_PASSWORD,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: EDIT_PASSWORD,
          status: "Failed",
        });
      });
  };
}
export const editPasswordFresh = () => {
  return dispatch => dispatch({
    type: EDIT_PASSWORD,
    status: false,
  });
};

export const profileSuccess = msg => {
  return {
    type: PROFILE_SUCCESS,
    payload: msg,
  }
}

export const profileError = error => {
  return {
    type: PROFILE_ERROR,
    payload: error,
  }
}

export const resetProfileFlag = error => {
  return {
    type: RESET_PROFILE_FLAG,
  }
}


export const addProPic = (file) => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  let url = process.env.REACT_APP_LOCALHOST + "/update/profile";
  return dispatch => {
    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: "Bearer " + authUser.token,
    };
    const options = {
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        let percent = Math.floor((loaded * 100) / total)
        console.log(`${loaded}kb of ${total}kb | ${percent}%`);
        let detail = `${loaded}kb of ${total}kb | ${percent}%`;
        // if( percent < 100 ){
        //   this.setState({ uploadPercentage: percent })
        // }
        dispatch({
          type: "UPLOAD_IMAGE",
          payload: percent,
          status: "Success",
          detail: detail
        });
      },

      headers: headers
    }
    let formData = new FormData();
    formData.append("image", file);

    axios
      .post(url, formData, options)
      .then(response => dispatch({
        type: "PROPIC_ADD",
        payload: response,
        status: "Success",

      }))
      .catch(error => {
        dispatch({
          type: "PROPIC_ADD",
          payload: error,
          status: "Failed",
        });
      });
  };
}

export const addProPicFresh = () => {
  return dispatch => dispatch({
    type: "PROPIC_ADD",
    status: false,
  });
};

export const getSettingsNotification = () => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  let url = `${process.env.REACT_APP_LOCALHOST}/setting/notification`;
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
          type: "NOTIFICATION_DATA",
          payload: response,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "NOTIFICATION_DATA",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const getSettingsNotificationFresh = () => {
  return dispatch => dispatch({
    type: "NOTIFICATION_DATA_FRESH",
    status: false,
  });
};

export const addNotificationProfile = data => {

  var authUsers = JSON.parse(localStorage.getItem("authUser"));
  var url = process.env.REACT_APP_LOCALHOST + "/setting/notification";

  const formData = {
    new_job_added: data.jobYesBtn ? 1 : 0,
    unread_emails: data.emailYesBtn ? 1 : 0,
    mention_by_team: data.mentionYesBtn ? 1 : 0,
    notification_preference: data.emailData
  };
  console.log(formData);



  return dispatch => {
    const headers = {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",

      Authorization: "Bearer " + authUsers.token,
    };
    axios
      .post(url, formData, { headers: headers })
      .then(response => {
        dispatch({
          type: 'ADD_NOTIFICATION',
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: 'ADD_NOTIFICATION',
          status: "Failed",
        });
      });
  };
}

export const addNotificationProfileFresh = () => {
  return dispatch => dispatch({
    type: 'ADD_NOTIFICATION_FRESH',
    status: false,
  });
};