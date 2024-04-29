import axios from "axios";
import { isArray, property } from "lodash";

export const sendMail = (state, subject, attached, cc, bcc) => {
  console.log(state);
  console.log(subject);

  var authUser = JSON.parse(localStorage.getItem("authUser"));
  const newUrl = process.env.REACT_APP_LOCALHOST;
  var url = newUrl + "/message/mail";

  return dispatch => {
    const headers = {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",

      Authorization: "Bearer " + authUser.token,
    };

    let data = {
      id: Math.random(),
      from: "himelhimu6@gmail.com",
      to: state.email,
      body: state.body,
    };

    const formData = {
      mail_id: state.id,
      to: state.to,
      from: authUser.user.email,
      subject: subject || state.subject,
      body: state.body || state.mailBodyModalText,
      attached: attached,
      cc: cc,
      bcc: bcc,
      status: "outbox",
    };

    axios
      .post(url, formData, { headers: headers })
      .then(response => {
        dispatch({
          type: "MAIL_SEND",
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "MAIL_SEND",
          status: "Failed",
        });
      });
  };
};

export const mailSendFresh = () => {
  return dispatch =>
    dispatch({
      type: "MAIL_SEND_FRESH",
      // payload: null,
      // error: null,
      status: false,
    });
};

export const sendReply = (state, attached) => {
  console.log(state);

  var authUser = JSON.parse(localStorage.getItem("authUser"));
  const newUrl = process.env.REACT_APP_LOCALHOST;
  var url = newUrl + "/message-mail-reply";

  return dispatch => {
    const headers = {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",

      Authorization: "Bearer " + authUser.token,
    };

    const formData = {
      mail_id: state.id,
      to: state.to,
      from: state.from,
      subject: state.subject,
      body: state.body,
      status: "sent",
      attached: attached,
    };

    axios
      .post(url, formData, { headers: headers })
      .then(response => {
        dispatch({
          type: "SEND_REPLY",
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "SEND_REPLY",
          status: "Failed",
        });
      });
  };
};

export const sendReplyFresh = () => {
  return dispatch =>
    dispatch({
      type: "SEND_REPLY_FRESH",
      status: false,
    });
};

export const sendMultipleMail = mails => {
  console.log(mails);
  let mailId;
  if (isArray(mails)) {
    mailId = mails.map(item => item.id);
  } else {
    mailId = [mails.id];
  }
  console.log(mailId);

  var authUser = JSON.parse(localStorage.getItem("authUser"));
  const newUrl = process.env.REACT_APP_LOCALHOST;
  var url = newUrl + "/multiple/mail/sent";

  return dispatch => {
    const headers = {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",

      Authorization: "Bearer " + authUser.token,
    };

    // let data = {
    //   id: Math.random(),
    //   from: "himelhimu6@gmail.com",
    //   to: state.email,
    //   body: state.body,
    // };

    const formData = {
      mail_id: mailId,
    };
    console.log(formData);

    axios
      .post(url, formData, { headers: headers })
      .then(response => {
        dispatch({
          type: "MULTIPLE_MAIL_SEND",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "MULTIPLE_MAIL_SEND",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const multipleMailSendFresh = () => {
  return dispatch =>
    dispatch({
      type: "MULTIPLE_MAIL_SEND_FRESH",
      status: false,
    });
};

export const deleteMultipleMail = mails => {
  console.log(mails);
  const mailId = mails.map(item => item.id);
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  const newUrl = process.env.REACT_APP_LOCALHOST;
  var url = newUrl + "/multiple/mail/delete";

  return dispatch => {
    const headers = {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",

      Authorization: "Bearer " + authUser.token,
    };

    // let data = {
    //   id: Math.random(),
    //   from: "himelhimu6@gmail.com",
    //   to: state.email,
    //   body: state.body,
    // };

    const formData = {
      mail_id: mailId,
    };

    axios
      .post(url, formData, { headers: headers })
      .then(response => {
        dispatch({
          type: "MULTIPLE_MAIL_DELETE",
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "MULTIPLE_MAIL_DELETE",
          status: "Failed",
        });
      });
  };
};

export const multipleMailDeleteFresh = () => {
  return dispatch =>
    dispatch({
      type: "MULTIPLE_MAIL_DELETE_FRESH",
      status: false,
    });
};
export const sendMailTemplate = (state, subject) => {
  console.log(state);
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  const newUrl = process.env.REACT_APP_LOCALHOST;
  var url = newUrl + "/mail/template";

  return dispatch => {
    const headers = {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",

      Authorization: "Bearer " + authUser.token,
    };

    let data = {
      id: Math.random(),
      from: "himelhimu6@gmail.com",
      to: state.email,
      body: state.body,
      subject: subject,
    };

    console.log(data);
    const formData = {
      // to: state.to,
      from: "noreply@myday.com",
      name: state.to,
      body: state.body,
      subject: subject,
    };

    console.log(formData);

    axios
      .post(url, formData, { headers: headers })
      .then(response => {
        dispatch({
          type: "MAIL_TEMPLATE_SEND",
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "MAIL_TEMPLATE_SEND",
          status: "Failed",
        });
      });
  };
};

export const sendMailTemplateEditByUserID = (id, data) => {
  console.log(id, data);
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  const newUrl = process.env.REACT_APP_LOCALHOST;
  var url = newUrl + "/mail/template" + "/" + id;

  return dispatch => {
    const headers = {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",

      Authorization: "Bearer " + authUser.token,
    };

    // let data = {

    //   body: data.body,
    //   subject: data.subject
    // };

    // console.log(data);
    const formData = {
      body: data.body,
      subject: data.subject,
    };

    console.log(formData);

    axios
      .put(url, formData, { headers: headers })
      .then(response => {
        dispatch({
          type: "EDIT_MAIL_TEMPLATE",
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "EDIT_MAIL_TEMPLATE",
          status: "Failed",
        });
      });
  };
};

export const sendMailSeenUnseen = id => {
  console.log(id);

  var authUser = JSON.parse(localStorage.getItem("authUser"));
  const newUrl = process.env.REACT_APP_LOCALHOST;
  var url = newUrl + "/message-watch" + "/" + id;

  return dispatch => {
    const headers = {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",

      Authorization: "Bearer " + authUser.token,
    };

    // let data = {

    //   body: data.body,
    //   subject: data.subject
    // };

    // console.log(data);
    const formData = {
      watch: 0,
    };

    console.log(formData);

    axios
      .post(url, formData, { headers: headers })
      .then(response => {
        dispatch({
          type: "MAIL_SEEN_UNSEEN",
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "MAIL_SEEN_UNSEEN",
          status: "Failed",
        });
      });
  };
};

export const sendMailReplyCheck = id => {
  console.log(id);
  return 0;
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  const newUrl = process.env.REACT_APP_LOCALHOST;
  var url = newUrl + "/message-watch" + "/" + id;

  return dispatch => {
    const headers = {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",

      Authorization: "Bearer " + authUser.token,
    };

    // let data = {

    //   body: data.body,
    //   subject: data.subject
    // };

    // console.log(data);
    const formData = {
      watch: 0,
    };

    console.log(formData);

    axios
      .post(url, formData, { headers: headers })
      .then(response => {
        dispatch({
          type: "MAIL_REPLY_CHECK",
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "MAIL_REPLY_CHECK",
          status: "Failed",
        });
      });
  };
};

export const deleteMailTemplateByID = id => {
  console.log(id);
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  const newUrl = process.env.REACT_APP_LOCALHOST;
  var url = newUrl + "/multiple/mail/template/delete";

  return dispatch => {
    const headers = {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",

      Authorization: "Bearer " + authUser.token,
    };

    // let data = {

    //   body: data.body,
    //   subject: data.subject
    // };

    // console.log(data);
    // const formData = {
    //   body: data.body,
    //   subject: data.subject
    // };

    //console.log(formData);
    const formData = {
      id: [id],
    };
    console.log(formData);
    axios
      .post(url, formData, { headers: headers })
      .then(response => {
        dispatch({
          type: "DELETE_MAIL_TEMPLATE",
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "DELETE_MAIL_TEMPLATE",
          status: "Failed",
        });
      });
  };
};

export const deleteMailTemplateFresh = () => {
  return dispatch =>
    dispatch({
      type: "DELETE_MAIL_TEMPLATE_FRESH",
      // payload: null,
      // error: null,
      status: false,
    });
};

export const deleteMailTemplateMultiple = data => {
  const id = data.map(item => item.id);
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  const newUrl = process.env.REACT_APP_LOCALHOST;
  var url = newUrl + "/multiple/mail/template/delete";

  return dispatch => {
    const headers = {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",

      Authorization: "Bearer " + authUser.token,
    };

    // let data = {

    //   body: data.body,
    //   subject: data.subject
    // };

    // console.log(data);
    // const formData = {
    //   body: data.body,
    //   subject: data.subject
    // };

    //console.log(formData);
    const formData = {
      id: id,
    };
    console.log(formData);
    axios
      .post(url, formData, { headers: headers })
      .then(response => {
        dispatch({
          type: "DELETE_MAIL_TEMPLATE_MULTIPLE",
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "DELETE_MAIL_TEMPLATE_MULTIPLE",
          status: "Failed",
        });
      });
  };
};

export const deleteMailTemplateMultipleFresh = () => {
  return dispatch =>
    dispatch({
      type: "DELETE_MAIL_TEMPLATE_MULTIPLE_FRESH",
      // payload: null,
      // error: null,
      status: false,
    });
};

export const deleteSmsTemplateByID = id => {
  console.log(id);
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  const newUrl = process.env.REACT_APP_LOCALHOST;
  var url = newUrl + "/sms/template" + "/" + id;

  return dispatch => {
    const headers = {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",

      Authorization: "Bearer " + authUser.token,
    };

    // let data = {

    //   body: data.body,
    //   subject: data.subject
    // };

    // console.log(data);
    // const formData = {
    //   body: data.body,
    //   subject: data.subject
    // };

    //console.log(formData);

    axios
      .delete(url, { headers: headers })
      .then(response => {
        dispatch({
          type: "DELETE_SMS_TEMPLATE",
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "DELETE_SMS_TEMPLATE",
          status: "Failed",
        });
      });
  };
};

export const deleteSmsTemplateFresh = () => {
  return dispatch =>
    dispatch({
      type: "DELETE_SMS_TEMPLATE_FRESH",
      // payload: null,
      // error: null,
      status: false,
    });
};

export const deleteSmsTemplateMulti = data => {
  console.log(data);
  const id = data.map(item => item.id);
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  const newUrl = process.env.REACT_APP_LOCALHOST;
  var url = newUrl + "/sms/template/delete";

  return dispatch => {
    const headers = {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",

      Authorization: "Bearer " + authUser.token,
    };

    const formData = {
      id: id,
    };

    console.log(formData);

    axios
      .post(url, formData, { headers: headers })
      .then(response => {
        dispatch({
          type: "DELETE_MULTI_SMS_TEMPLATE",
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "DELETE_MULTI_SMS_TEMPLATE",
          status: "Failed",
        });
      });
  };
};

export const deleteSmsTemplateMultiFresh = () => {
  return dispatch =>
    dispatch({
      type: "DELETE_MULTI_SMS_TEMPLATE_FRESH",
      // payload: null,
      // error: null,
      status: false,
    });
};

export const sendSMSTemplateEditByUserID = (id, data) => {
  console.log(id, data);
  console.log("==============hello==================");
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  const newUrl = process.env.REACT_APP_LOCALHOST;
  var url = newUrl + "/sms/template" + "/" + id;

  return dispatch => {
    const headers = {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",

      Authorization: "Bearer " + authUser.token,
    };

    // let data = {

    //   body: data.body,
    //   subject: data.subject
    // };

    // console.log(data);
    const formData = {
      name: data.name,
      message: data.message,
    };

    console.log(formData);

    axios
      .put(url, formData, { headers: headers })
      .then(response => {
        dispatch({
          type: "EDIT_SMS_TEMPLATE",
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "EDIT_SMS_TEMPLATE",
          status: "Failed",
        });
      });
  };
};

export const sendMailTemplateFresh = () => {
  return dispatch =>
    dispatch({
      type: "MAIL_TEMPLATE_SEND_FRESH",
      // payload: null,
      // error: null,
      status: false,
    });
};

export const mailTemplateEditFresh = () => {
  return dispatch =>
    dispatch({
      type: "EDIT_MAIL_TEMPLATE_FRESH",
      // payload: null,
      // error: null,
      status: false,
    });
};

export const smsTemplateEditFresh = () => {
  return dispatch =>
    dispatch({
      type: "EDIT_SMS_TEMPLATE_FRESH",
      // payload: null,
      // error: null,
      status: false,
    });
};

export const mailList = () => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  const newUrl = process.env.REACT_APP_LOCALHOST;
  var url = newUrl + "/message/mail";

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
          type: "MAIL_LIST",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "MAIL_LIST",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const inboxList = (page, sizePerPage, search = null, sortField = null, sortValue = null) => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  // var url = newUrl + "/message-inbox";
  var url = `${process.env.REACT_APP_LOCALHOST}/message-inbox-ssr?page=${page}&sizePerPage=${sizePerPage}&q=${search}&sortField=${sortField}&sortValue=${sortValue}`;

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
          type: "INBOX_LIST",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "INBOX_LIST",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const inboxListFresh = () => {
  return dispatch =>
    dispatch({
      type: "INBOX_LIST",
      payload: null,
      error: null,
      status: false,
    });
};

export const inboxListOwner = () => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  const newUrl = process.env.REACT_APP_LOCALHOST;
  var url = newUrl + "/";

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
          type: "INBOX_LIST_OWNER",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "INBOX_LIST_OWNER",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const smsOutboxList = (page, sizePerPage, search = null, sortField = null, sortValue = null) => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  // const newUrl = process.env.REACT_APP_LOCALHOST;
  // var url = newUrl + "/sms-outbox";

  var url = `${process.env.REACT_APP_LOCALHOST}/sms-outbox-ssr?page=${page}&sizePerPage=${sizePerPage}&q=${search}&sortField=${sortField}&sortValue=${sortValue}`;


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
          type: "SMS_OUTBOX_LIST",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "SMS_OUTBOX_LIST",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const smsOutboxListFresh = () => {
  return dispatch =>
    dispatch({
      type: "SMS_OUTBOX_LIST",
      payload: null,
      error: null,
      status: false,
    });
};

export const spamList = (page, sizePerPage, search = null, sortField = null, sortValue = null) => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));

  var url = `${process.env.REACT_APP_LOCALHOST}/mail-spam-ssr?page=${page}&sizePerPage=${sizePerPage}&q=${search}&sortField=${sortField}&sortValue=${sortValue}`;


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
          type: "MAIL_SPAM_LIST",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "MAIL_SPAM_LIST",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const spamListFresh = () => {
  return dispatch =>
    dispatch({
      type: "MAIL_SPAM_LIST",
      payload: null,
      error: null,
      status: false,
    });
};

export const mailListFresh = () => {
  return dispatch =>
    dispatch({
      type: "MAIL_LIST_FRESH",
      // payload: null,
      // error: null,
      status: false,
    });
};

export const mailSeenUnseenFresh = () => {
  return dispatch =>
    dispatch({
      type: "MAIL_SEEN_UNSEEN_FRESH",
      // payload: null,
      // error: null,
      status: false,
    });
};

export const mailReplyCheckFresh = () => {
  return dispatch =>
    dispatch({
      type: "MAIL_REPLY_CHECK_FRESH",
      // payload: null,
      // error: null,
      status: false,
    });
};

export const templateList = (page, sizePerPage, search = null, sortField = null, sortValue = null) => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));

  var url = `${process.env.REACT_APP_LOCALHOST}/mail/template-ssr?page=${page}&sizePerPage=${sizePerPage}&q=${search}&sortField=${sortField}&sortValue=${sortValue}`;


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
          type: "TEMPLATE_LIST",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "TEMPLATE_LIST",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const templateListFresh = () => {
  return dispatch =>
    dispatch({
      type: "TEMPLATE_LIST_FRESH",
      // payload: null,
      // error: null,
      status: false,
    });
};

export const templateListById = id => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  const newUrl = process.env.REACT_APP_LOCALHOST;
  var url = newUrl + "/mail/template" + "/" + id;

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
          type: "TEMPLATE_LIST_ID",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "TEMPLATE_LIST_ID",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const templateListBySMSId = (id, status, message) => {
  console.log("==========Hello guys=========");
  //console.log(id, status, message);
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  const newUrl = process.env.REACT_APP_LOCALHOST;
  var url = newUrl + "/sms/template" + "/" + id;

  return dispatch => {
    const headers = {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",

      Authorization: "Bearer " + authUser.token,
    };

    const formData = {
      status: status,
      message: message,
    };

    axios
      .put(url, formData, { headers: headers })
      .then(response => {
        dispatch({
          type: "SCHEDULE_SMS_TEMP_EDIT",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "SCHEDULE_SMS_TEMP_EDIT",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const templateListBySMSIdFresh = () => {
  return dispatch =>
    dispatch({
      type: "SCHEDULE_SMS_TEMP_EDIT_FRESH",
      // payload: null,
      // error: null,
      status: false,
    });
};

export const sendSMSTemplate = (
  name,
  status,
  selectRegarding,
  selectTo,
  selectFrom,
  to,
  message
) => {
  console.log(name, status, selectRegarding, selectTo, selectFrom, to, message);

  var authUser = JSON.parse(localStorage.getItem("authUser"));
  const newUrl = process.env.REACT_APP_LOCALHOST;
  var url = newUrl + "/sms/template";

  return dispatch => {
    const headers = {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",

      Authorization: "Bearer " + authUser.token,
    };

    // let data = {
    //   id: Math.random(),
    //   from: "himelhimu6@gmail.com",
    //   to: state.email,
    //   body: state.body,
    // };

    const formData = {
      name: name,
      status: status,
      message: message,
      message_action_name_id: selectRegarding,
      message_trigger_to_id: selectTo,
      messsage_trigger_point_id: selectFrom,
      to: to,
      type: "sms",
    };

    axios
      .post(url, formData, { headers: headers })
      .then(response => {
        dispatch({
          type: "SMS_TEMPLATE_SEND",
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "SMS_TEMPLATE_SEND",
          status: "Failed",
        });
      });
  };
};

export const sendSMSTemplateFresh = () => {
  return dispatch =>
    dispatch({
      type: "SMS_TEMPLATE_SEND_FRESH",
      // payload: null,
      // error: null,
      status: false,
    });
};

export const templateListSMS = (page, sizePerPage, search = null, sortField = null, sortValue = null) => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));

  var url = `${process.env.REACT_APP_LOCALHOST}/sms/template-ssr?page=${page}&sizePerPage=${sizePerPage}&q=${search}&sortField=${sortField}&sortValue=${sortValue}`;


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
          type: "TEMPLATE_LIST_SMS",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "TEMPLATE_LIST_SMS",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const templateListSMSFresh = () => {
  return dispatch =>
    dispatch({
      type: "TEMPLATE_LIST_SMS_FRESH",
      // payload: null,
      // error: null,
      status: false,
    });
};

export const mailListUndelivered = (page, sizePerPage, search = null, sortField = null, sortValue = null) => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));

  var url = `${process.env.REACT_APP_LOCALHOST}/mail-undelivered-ssr?page=${page}&sizePerPage=${sizePerPage}&q=${search}&sortField=${sortField}&sortValue=${sortValue}`;


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
          type: "MAIL_LIST_UNDELIVERED",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "MAIL_LIST_UNDELIVERED",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const mailListUndeliveredFresh = () => {
  return dispatch =>
    dispatch({
      type: "MAIL_LIST_UNDELIVERED",
      payload: null,
      status: false,
    });
};

export const mailListUndeliveredOwner = () => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  const newUrl = process.env.REACT_APP_LOCALHOST;
  var url = newUrl + "/";

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
          type: "MAIL_LIST_UNDELIVERED_OWNER",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "MAIL_LIST_UNDELIVERED_OWNER",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const mailListSent = (page, sizePerPage, search = null, sortField = null, sortValue = null) => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  const newUrl = process.env.REACT_APP_LOCALHOST;
  // var url = newUrl + "/mail-sent";

  var url = `${process.env.REACT_APP_LOCALHOST}/mail-sent-ssr?page=${page}&sizePerPage=${sizePerPage}&q=${search}&sortField=${sortField}&sortValue=${sortValue}`;


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
          type: "MAIL_LIST_SENT",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "MAIL_LIST_SENT",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const mailListSentFresh = () => {
  return dispatch =>
    dispatch({
      type: "MAIL_LIST_SENT_FRESH",
      payload: null,
      error: null,
      status: false,
    });
};

export const sendSMS = (state, message) => {
  console.log("==========send sms===========");
  console.log(state);
  console.log(message);
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  const newUrl = process.env.REACT_APP_LOCALHOST;
  var url = newUrl + "/message-sms";
  //var url = newUrl + "/sms/sent";

  const formData = {
    to: state.to,
    from: "noreply@myday.com",
    body: message,
    type: "sms",
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
          type: "SMS_SEND",
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "SMS_SEND",
          status: "Failed",
        });
      });
  };
};

export const sendSMSFresh = () => {
  return dispatch =>
    dispatch({
      type: "SMS_SEND_FRESH",
      // payload: null,
      // error: null,
      status: false,
    });
};

export const deleteMultipleSMS = data => {
  console.log(data);
  const id = data.map(item => item.id);

  var authUser = JSON.parse(localStorage.getItem("authUser"));
  const newUrl = process.env.REACT_APP_LOCALHOST;
  var url = newUrl + "/sms/delete";
  //var url = newUrl + "/sms/sent";

  const formData = {
    id: id,
  };

  console.log(formData);

  return dispatch => {
    const headers = {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",

      Authorization: "Bearer " + authUser.token,
    };

    // return;

    axios
      .post(url, formData, { headers: headers })
      .then(response => {
        dispatch({
          type: "MULTIPLE_SMS_DELETE",
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "MULTIPLE_SMS_DELETE",
          status: "Failed",
        });
      });
  };
};

export const deleteMultipleSMSFresh = () => {
  return dispatch =>
    dispatch({
      type: "MULTIPLE_SMS_DELETE_FRESH",
      // payload: null,
      // error: null,
      status: false,
    });
};

export const smsList = (page, sizePerPage, search = null, sortField = null, sortValue = null) => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  // const newUrl = process.env.REACT_APP_LOCALHOST;
  // var url = newUrl + "/message-sms";

  var url = `${process.env.REACT_APP_LOCALHOST}/message-sms-ssr?page=${page}&sizePerPage=${sizePerPage}&q=${search}&sortField=${sortField}&sortValue=${sortValue}`;


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
          type: "SMS_LIST",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "SMS_LIST",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const smsListFresh = () => {
  return dispatch =>
    dispatch({
      type: "SMS_LIST",
      payload: null,
      status: false,
    });
};

export const getsentsmsList = () => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  const newUrl = process.env.REACT_APP_LOCALHOST;
  var url = newUrl + "/sms-sent";

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
          type: "SMS_SEND_LIST",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "SMS_SEND_LIST",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const scheduleRegardingData = () => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));

  var url = `${process.env.REACT_APP_LOCALHOST}/message/action`;
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
          type: "SCHEDULE_LIST",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "SCHEDULE_LIST",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const scheduleTriggerTo = data => {
  console.log(data);
  var authUser = JSON.parse(localStorage.getItem("authUser"));

  var url = `${process.env.REACT_APP_LOCALHOST}/message/action/trigger/to`;
  const formData = {
    id: data,
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
          type: "TRIGGER_TO_LIST",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "TRIGGER_TO_LIST",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const scheduleTriggerFrom = data => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));

  var url = `${process.env.REACT_APP_LOCALHOST}/message/action/trigger/point`;
  const formData = {
    id: data,
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
          type: "TRIGGER_FROM_LIST",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "TRIGGER_FROM_LIST",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const addSchedule = (data, data2, body, subject) => {
  // console.log(data, data2, body);
  // console.log(subject);
  var authUser = JSON.parse(localStorage.getItem("authUser"));

  var url = `${process.env.REACT_APP_LOCALHOST}/mail/template`;
  const formData = {
    name: data.name,
    message_action_name_id: data.selectRegarding.value,
    message_trigger_to_id: data.selectTo.value,
    messsage_trigger_point_id: data.selectFrom.value,
    body: body,
    status: data2.switch1,
    email_sends_automatically: data2.email_sends_automatically,

    subject: subject,
    type: "mail",
  };
  //console.log(formData);
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
          type: "ADD_SCHEDULE",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "ADD_SCHEDULE",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const addScheduleFresh = () => {
  return dispatch =>
    dispatch({
      type: "ADD_SCHEDULE_FRESH",
      // payload: null,
      // error: null,
      status: false,
    });
};

export const editSchedule = (id, switch1, body) => {
  console.log(id, switch1, body);

  var authUser = JSON.parse(localStorage.getItem("authUser"));
  const newUrl = process.env.REACT_APP_LOCALHOST;
  var url = newUrl + "/mail/template" + "/" + id;

  //var url = newUrl + "/sms/template" + "/" + id;
  const formData = {
    // name: data.name,
    // message_action_name_id: data.message_action.name,
    // message_trigger_to_id: data.action_trigger_to.trigger_to,
    // messsage_trigger_point_id: data.action_triggerfrom.trigger_point,
    body: body,
    status: switch1,
  };

  return dispatch => {
    const headers = {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",

      Authorization: "Bearer " + authUser.token,
    };
    axios
      .put(url, formData, { headers: headers })
      .then(response => {
        dispatch({
          type: "EDIT_SCHEDULE",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "EDIT_SCHEDULE",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const editScheduleFresh = () => {
  return dispatch =>
    dispatch({
      type: "EDIT_SCHEDULE_FRESH",
      // payload: null,
      // error: null,
      status: false,
    });
};

export const outboxMailData = (page, sizePerPage, search = null, sortField = null, sortValue = null) => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));


  var url = `${process.env.REACT_APP_LOCALHOST}/message-outbox-company-ssr?page=${page}&sizePerPage=${sizePerPage}&q=${search}&sortField=${sortField}&sortValue=${sortValue}`;
  // var url = `${process.env.REACT_APP_LOCALHOST}/message-outbox-company`;

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
          type: "OUTBOX_MAIL_LIST",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "OUTBOX_MAIL_LIST",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const outboxMailDataFresh = () => {
  return dispatch =>
    dispatch({
      type: "OUTBOX_MAIL_LIST",
      payload: null,
      error: null,
      status: false,
    });
};

export const outboxMailDataOwner = () => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));

  var url = `${process.env.REACT_APP_LOCALHOST}/message-outbox`;
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
          type: "OUTBOX_MAIL_LIST_OWNER",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "OUTBOX_MAIL_LIST_OWNER",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const deleteSMSOutbox = data => {
  console.log(data[0]?.id);
  var authUser = JSON.parse(localStorage.getItem("authUser"));

  var url = `${process.env.REACT_APP_LOCALHOST}/sms-outbox/delete/${data[0]?.id}`;

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
          type: "DELETE_OUTBOX_SMS",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "DELETE_OUTBOX_SMS",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const deleteSMSOutboxFresh = () => {
  return dispatch =>
    dispatch({
      type: "DELETE_OUTBOX_SMS_FRESH",
      // payload: null,
      // error: null,
      status: false,
    });
};

export const mailDetails = id => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));

  var url = `${process.env.REACT_APP_LOCALHOST}/message/mail/` + id;

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
          type: "MAIL_DETAILS",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "MAIL_DETAILS",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const mailDetailsFresh = () => {
  return dispatch =>
    dispatch({
      type: "MAIL_DETAILS_FRESH",
      status: false,
    });
};

export const mailDetailStatusAssign = (id, status, assign) => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  const newUrl = process.env.REACT_APP_LOCALHOST;
  var url = newUrl + "/mail-details-assign";

  return dispatch => {
    const headers = {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",

      Authorization: "Bearer " + authUser.token,
    };

    const formData = {
      id: id,
      status: status,
      assign: assign,
    };

    axios
      .post(url, formData, { headers: headers })
      .then(response => {
        dispatch({
          type: "STATUS_ASSIGN_SEND",
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "STATUS_ASSIGN_SEND",
          status: "Failed",
        });
      });
  };
};

export const mailDetailStatusAssignFresh = () => {
  return dispatch =>
    dispatch({
      type: "STATUS_ASSIGN_SEND",
      status: false,
    });
};

export const spamMove = (id) => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  const newUrl = process.env.REACT_APP_LOCALHOST;
  var url = newUrl + "/message/move-spam";

  return dispatch => {
    const headers = {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",

      Authorization: "Bearer " + authUser.token,
    };

    const formData = {
      id: id,
    };

    axios
      .post(url, formData, { headers: headers })
      .then(response => {
        dispatch({
          type: "MOVE_TO_SPAM",
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "MOVE_TO_SPAM",
          status: "Failed",
        });
      });
  };
};

export const spamMoveFresh = () => {
  return dispatch =>
    dispatch({
      type: "MOVE_TO_SPAM",
      status: false,
    });
};

export const mailDetailRegarding = (id, state) => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  const newUrl = process.env.REACT_APP_LOCALHOST;
  var url = newUrl + "/mail-details-regarding";

  return dispatch => {
    const headers = {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",

      Authorization: "Bearer " + authUser.token,
    };

    const formData = {
      id: id,
      property_id: state?.selectedProperty?.value,
      contact_id: state?.selectedContacts?.value,
      job_id: state?.selectedJobs?.value,
      inspection_id: state?.selectedInspections?.value,
      task_id: state?.selectedTasks?.value,
    };

    axios
      .post(url, formData, { headers: headers })
      .then(response => {
        dispatch({
          type: "MAIL_REGARDING",
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "MAIL_REGARDING",
          status: "Failed",
        });
      });
  };
};

export const mailDetailRegardingFresh = () => {
  return dispatch =>
    dispatch({
      type: "MAIL_REGARDING_FRESH",
      status: false,
    });
};

export const storeAttachment = (file) => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  const newUrl = `${process.env.REACT_APP_LOCALHOST}`;

  let url = `${newUrl}/mail/attachment`;
  let formData = new FormData();
  for (let i = 0; i < file.length; i++) {
    formData.append("image[]", file[i]);
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
          type: "STORE_ATTACHMENT",
          payload: response,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "STORE_ATTACHMENT",
          error: error,
          status: "Failed",
        });
      });
  };
};

export const storeAttachmentFresh = () => {
  return dispatch =>
    dispatch({
      type: "STORE_ATTACHMENT",
      payload: null,
      error: null,
      status: false,
    });
};
