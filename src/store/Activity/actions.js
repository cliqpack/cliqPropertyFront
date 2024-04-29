import axios from "axios";

//Property activity

export const PropertyAllActivity = (id) => {
    var authUser = JSON.parse(localStorage.getItem("authUser"));
    const newUrl = `${process.env.REACT_APP_LOCALHOST}`;

    let url = `${newUrl}/property/activity/${id}`;
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
                    type: "PROPERTY_ALL_ACTIVITY",
                    payload: response,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: "PROPERTY_ALL_ACTIVITY",
                    error: error,
                    status: "Failed",
                });
            });
    };
};
export const PropertyActivities = (id, data) => {
    var authUser = JSON.parse(localStorage.getItem("authUser"));
    const newUrl = `${process.env.REACT_APP_LOCALHOST}`;

    let url = `${newUrl}/only-selected-all-activities/${id}`;

    const formData = {
        // property_id: id,
        data: data
    }

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
                    type: "PROPERTY_ACTIVITIES",
                    payload: response,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: "PROPERTY_ACTIVITIES",
                    error: error,
                    status: "Failed",
                });
            });
    };
};

export const AllActivityFresh = () => {
    return dispatch =>
        dispatch({
            type: "PROPERTY_ACTIVITIES_FRESH",
            payload: null,
            error: null,
            status: false,
        });
};

export const ContactAllActivity = (id) => {
    var authUser = JSON.parse(localStorage.getItem("authUser"));
    const newUrl = `${process.env.REACT_APP_LOCALHOST}`;

    let url = `${newUrl}/contact-activities/${id}`;
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
                    type: "CONTACT_ACTIVITIES",
                    payload: response,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: "CONTACT_ACTIVITIES",
                    error: error,
                    status: "Failed",
                });
            });
    };
};

export const ContactForAllActivity = (id) => {
    var authUser = JSON.parse(localStorage.getItem("authUser"));
    const newUrl = `${process.env.REACT_APP_LOCALHOST}`;

    let url = `${newUrl}/contact-activities/${id}`;
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
                    type: "CONTACT_ACTIVITIES",
                    payload: response,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: "CONTACT_ACTIVITIES",
                    error: error,
                    status: "Failed",
                });
            });
    };
};

export const getMessageProperties = id => {
    var authUser = JSON.parse(localStorage.getItem("authUser"));
    let url = `${process.env.REACT_APP_LOCALHOST}/property/recent/${id}`;
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
                    type: "PROPERTY_MESSAGE",
                    payload: response,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: "PROPERTY_MESSAGE",
                    payload: error,
                    status: "Failed",
                });
            });
    };
};

export const taskAllActivity = (id, data) => {
    var authUser = JSON.parse(localStorage.getItem("authUser"));
    const newUrl = `${process.env.REACT_APP_LOCALHOST}`;

    let url = `${newUrl}/task-all-activities/${id}`;
    const formData = {
        data: data
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
                    type: "TASK_ACTIVITIES",
                    payload: response,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: "TASK_ACTIVITIES",
                    error: error,
                    status: "Failed",
                });
            });
    };
};

export const inspectionAllActivity = (id) => {
    var authUser = JSON.parse(localStorage.getItem("authUser"));
    const newUrl = `${process.env.REACT_APP_LOCALHOST}`;

    let url = `${newUrl}/inspection/activity/${id}`;
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
                    type: "INSPECTION_ALL_ACTIVITY",
                    payload: response,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: "INSPECTION_ALL_ACTIVITY",
                    error: error,
                    status: "Failed",
                });
            });
    };
};

export const inspectionForAllActivity = (id, data) => {
    var authUser = JSON.parse(localStorage.getItem("authUser"));
    const newUrl = `${process.env.REACT_APP_LOCALHOST}`;

    let url = `${newUrl}/inspection-all-activities/${id}`;

    const formData = {
        data: data,
        // inspection_id: id
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
                    type: "INSPECTION_FOR_ALL_ACTIVITY",
                    payload: response,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: "INSPECTION_FOR_ALL_ACTIVITY",
                    error: error,
                    status: "Failed",
                });
            });
    };
};

export const listingsForAllActivity = (id, data) => {
    var authUser = JSON.parse(localStorage.getItem("authUser"));
    const newUrl = `${process.env.REACT_APP_LOCALHOST}`;

    let url = `${newUrl}/listing-all-activities/${id}`;

    const formData = {
        data: data,
        // inspection_id: id
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
                    type: "LISTINGS_FOR_ALL_ACTIVITY",
                    payload: response,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: "LISTINGS_FOR_ALL_ACTIVITY",
                    error: error,
                    status: "Failed",
                });
            });
    };
};

export const addComment = (state, mention_Id, p_id = null, c_id = null, t_id = null, i_id = null, l_id = null, j_id = null,m_id=null) => {

    console.log(state, mention_Id.length);

    var authUser = JSON.parse(localStorage.getItem("authUser"));
    const newUrl = process.env.REACT_APP_LOCALHOST;
    var url = newUrl + "/store/comment";

    const headers = {
        "Content-Type": "application/json",

        "Access-Control-Allow-Origin": "*",

        Authorization: "Bearer " + authUser.token,
    };
    const formData = {
        property_id: p_id,
        contact_id: c_id,
        task_id: t_id,
        inspection_id: i_id,
        maintenance_id: j_id,
        listing_id: l_id,
        mail_id:m_id,
        mention_Id: mention_Id,
        mention: mention_Id.length > 0 ? state : null,
        comment: mention_Id.length == 0 ? state : null
    };

    console.log(formData);
    // return;


    return dispatch => {
        axios
            .post(url, formData, { headers: headers })
            .then(response => {
                dispatch({
                    type: "ADD_MESSAGE",
                    payload: response.data,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: "ADD_MESSAGE",
                    payload: error,
                    status: "Failed",
                });
            });
    };
};

export const addCommentFresh = () => {
    return dispatch =>
        dispatch({
            type: "ADD_MESSAGE_FRESH",
            payload: null,
            error: null,
            status: false,
        });
};


//Contacts activity
export const ContactsAllActivity = (id) => {
    var authUser = JSON.parse(localStorage.getItem("authUser"));
    const newUrl = `${process.env.REACT_APP_LOCALHOST}`;

    let url = `${newUrl}/contact/activity/${id}`;
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
                    type: "CONTACTS_ALL_ACTIVITY",
                    payload: response,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: "CONTACTS_ALL_ACTIVITY",
                    error: error,
                    status: "Failed",
                });
            });
    };
};




export const getMessageContacts = id => {
    var authUser = JSON.parse(localStorage.getItem("authUser"));
    let url = `${process.env.REACT_APP_LOCALHOST}/contact/recent/${id}`;
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
                    type: "CONTACTS_MESSAGE",
                    payload: response,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: "CONTACTS_MESSAGE",
                    payload: error,
                    status: "Failed",
                });
            });
    };
};

export const getMessageTask = id => {
    var authUser = JSON.parse(localStorage.getItem("authUser"));
    let url = `${process.env.REACT_APP_LOCALHOST}/task/recent/${id}`;
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
                    type: "TASK_MESSAGE",
                    payload: response,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: "TASK_MESSAGE",
                    payload: error,
                    status: "Failed",
                });
            });
    };
};

export const getMessageMail = id => {
    var authUser = JSON.parse(localStorage.getItem("authUser"));
    let url = `${process.env.REACT_APP_LOCALHOST}/mail/recent/${id}`;
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
                    type: "MAIL_MESSAGE",
                    payload: response,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: "MAIL_MESSAGE",
                    payload: error,
                    status: "Failed",
                });
            });
    };
};

export const jobAllActivity = (id) => {
    var authUser = JSON.parse(localStorage.getItem("authUser"));
    const newUrl = `${process.env.REACT_APP_LOCALHOST}`;

    let url = `${newUrl}/job/activity/${id}`;
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
                    type: "JOB_ALL_ACTIVITY",
                    payload: response,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: "JOB_ALL_ACTIVITY",
                    error: error,
                    status: "Failed",
                });
            });
    };
};

export const jobForAllActivity = (id, data) => {
    var authUser = JSON.parse(localStorage.getItem("authUser"));
    const newUrl = `${process.env.REACT_APP_LOCALHOST}`;

    let url = `${newUrl}/maintenance-all-activities/${id}`;
    const formData = {
        data: data
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
                    type: "JOB_FOR_ALL_ACTIVITY",
                    payload: response,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: "JOB_FOR_ALL_ACTIVITY",
                    error: error,
                    status: "Failed",
                });
            });
    };
};

export const getMessageJob = id => {
    var authUser = JSON.parse(localStorage.getItem("authUser"));
    let url = `${process.env.REACT_APP_LOCALHOST}/job/recent/${id}`;
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
                    type: "JOB_MESSAGE",
                    payload: response,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: "JOB_MESSAGE",
                    payload: error,
                    status: "Failed",
                });
            });
    };
};

export const getMessageJobFresh = () => {
    return dispatch =>
        dispatch({
            type: "JOB_MESSAGE_FRESH",
            payload: null,
            error: null,
            status: false,
        });
};

export const getJobAllData = id => {
    var authUser = JSON.parse(localStorage.getItem("authUser"));
    let url = `${process.env.REACT_APP_LOCALHOST}/all-job/${id}`;
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
                    type: "JOB_ALL_DATA",
                    payload: response,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: "JOB_ALL_DATA",
                    payload: error,
                    status: "Failed",
                });
            });
    };
};

export const getMessageListing = id => {
    var authUser = JSON.parse(localStorage.getItem("authUser"));
    let url = `${process.env.REACT_APP_LOCALHOST}/listing/recent/${id}`;
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
                    type: "LISTING_MESSAGE",
                    payload: response,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: "LISTING_MESSAGE",
                    payload: error,
                    status: "Failed",
                });
            });
    };
};

export const getActivityInspection = id => {
    var authUser = JSON.parse(localStorage.getItem("authUser"));
    let url = `${process.env.REACT_APP_LOCALHOST}/inspection/recent/${id}`;
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
                    type: "INSPECTION_ACTIVITY",
                    payload: response,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: "INSPECTION_ACTIVITY",
                    payload: error,
                    status: "Failed",
                });
            });
    };
};

export const getMessageInspection = id => {
    var authUser = JSON.parse(localStorage.getItem("authUser"));
    let url = `${process.env.REACT_APP_LOCALHOST}/inspection/recent/${id}`;
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
                    type: "INSPECTION_MESSAGE",
                    payload: response,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: "INSPECTION_MESSAGE",
                    payload: error,
                    status: "Failed",
                });
            });
    };
};
export const sendEmail = state => {
    // console.log(state);
    var authUser = JSON.parse(localStorage.getItem("authUser"));
    let url = `${process.env.REACT_APP_LOCALHOST}/property-activity-email/${state.id}`;
    return dispatch => {
        const headers = {
            "Content-Type": "application/json",

            "Access-Control-Allow-Origin": "*",

            Authorization: "Bearer " + authUser.token,
        };
        const formData = {
            property_activity_email_id: state.id,
            to: state.to,
            subject: state.subject,
            body: state.body,
            type: state.type
        }
        // console.log(formData);
        axios
            .post(url, formData, { headers: headers })
            .then(response => {
                dispatch({
                    type: "SEND_EMAIL",
                    payload: response,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: "SEND_EMAIL",
                    payload: error,
                    status: "Failed",
                });
            });
    };
};

export const sendEmailFresh = () => {
    return dispatch =>
        dispatch({
            type: "SEND_EMAIL_FRESH",
            payload: null,
            error: null,
            status: false,
        });
};

export const sendSMSTemp = state => {
    // console.log(state);
    var authUser = JSON.parse(localStorage.getItem("authUser"));
    let url = `${process.env.REACT_APP_LOCALHOST}/sms/sent`;
    return dispatch => {
        const headers = {
            "Content-Type": "application/json",

            "Access-Control-Allow-Origin": "*",

            Authorization: "Bearer " + authUser.token,
        };
        const formData = {
            property_activity_sms_id: state.id,
            to: state.to,
            // subject: state.subject,
            body: state.body,
            // type: state.type
        }
        console.log(formData);
        axios
            .post(url, formData, { headers: headers })
            .then(response => {
                dispatch({
                    type: "SEND_SMS",
                    payload: response,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: "SEND_SMS",
                    payload: error,
                    status: "Failed",
                });
            });
    };
};

export const sendSMSTempFresh = () => {
    return dispatch =>
        dispatch({
            type: "SEND_SMS_FRESH",
            payload: null,
            error: null,
            status: false,
        });
};

export const sendWorkOrderEmail = state => {
    var authUser = JSON.parse(localStorage.getItem("authUser"));
    let url = `${process.env.REACT_APP_LOCALHOST}/work-order-send-email`;
    return dispatch => {
        const headers = {
            "Content-Type": "application/json",

            "Access-Control-Allow-Origin": "*",

            Authorization: "Bearer " + authUser.token,
        };
        const formData = {
            a_to: state.email,
            subject: "Work order",
            body: state.template,
            property_activity_email_id: 1,
        }
        console.log(formData);
        axios
            .post(url, formData, { headers: headers })
            .then(response => {
                dispatch({
                    type: "SEND_WORK_ORDER_EMAIL",
                    payload: response,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: "SEND_WORK_ORDER_EMAIL",
                    payload: error,
                    status: "Failed",
                });
            });
    };
};
export const sendWorkorderEmailFresh = () => {
    return dispatch =>
        dispatch({
            type: "SEND_WORK_ORDER_EMAIL",
            payload: null,
            error: null,
            status: false,
        });
};

export const listAllActivity = (id) => {
    var authUser = JSON.parse(localStorage.getItem("authUser"));
    const newUrl = `${process.env.REACT_APP_LOCALHOST}`;

    let url = `${newUrl}/listing/activity/${id}`;
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
                    type: "LIST_ALL_ACTIVITY",
                    payload: response,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: "LIST_ALL_ACTIVITY",
                    error: error,
                    status: "Failed",
                });
            });
    };
};