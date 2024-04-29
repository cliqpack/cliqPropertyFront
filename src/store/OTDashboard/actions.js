import axios from "axios";
import { property } from "lodash";

export const propertyListForOwnerAndTenant = () => {
    var authUser = JSON.parse(localStorage.getItem("authUser"));
    var url = `${process.env.REACT_APP_LOCALHOST}/owner/properties`;

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
                    type: "PROPERTY_LIST_OT",
                    payload: response.data,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: "PROPERTY_LIST_OT",
                    payload: error,
                    status: "Failed",
                });
            });
    };
};

export const propertyListForOwnerAndTenantFresh = () => {
    return dispatch => {
        dispatch({
            type: "PROPERTY_LIST_OT_FRESH",
            status: false,
            error: null,
        });
    };
};

export const propertyListForTenant = () => {
    var authUser = JSON.parse(localStorage.getItem("authUser"));
    var url = `${process.env.REACT_APP_LOCALHOST}/tenant/properties`;

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
                    type: "PROPERTY_LIST_T",
                    payload: response.data,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: "PROPERTY_LIST_T",
                    payload: error,
                    status: "Failed",
                });
            });
    };
};

export const propertyListForOwnerAndTenantByID = (id) => {
    var authUser = JSON.parse(localStorage.getItem("authUser"));
    var url = `${process.env.REACT_APP_LOCALHOST}/owner/properties/${id}`;

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
                    type: "PROPERTY_LIST_OT_ID",
                    payload: response.data,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: "PROPERTY_LIST_OT_ID",
                    payload: error,
                    status: "Failed",
                });
            });
    };
};

export const propertyListForOwnerById = (id) => {
    var authUser = JSON.parse(localStorage.getItem("authUser"));
    var url = `${process.env.REACT_APP_LOCALHOST}/owner/properties/${id}`;

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
                    type: "PROPERTY_LIST_T_ID",
                    payload: response.data,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: "PROPERTY_LIST_T_ID",
                    payload: error,
                    status: "Failed",
                });
            });
    };
};

export const propertyListForTenantById = (id) => {
    var authUser = JSON.parse(localStorage.getItem("authUser"));
    // var url = `${process.env.REACT_APP_LOCALHOST}/tenant/properties/${id}`;
    var url = `${process.env.REACT_APP_LOCALHOST}/property_tenant_all_information/${id}/${authUser.user.id}`;
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
                    type: "PROPERTY_LIST_TENANT_ID",
                    payload: response.data,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: "PROPERTY_LIST_TENANT_ID",
                    payload: error,
                    status: "Failed",
                });
            });
    };
};

export const currentBalanceInfoOwnerById = (id) => {
    var authUser = JSON.parse(localStorage.getItem("authUser"));
    // var url = `${process.env.REACT_APP_LOCALHOST}/tenant/properties/${id}`;
    var url = `${process.env.REACT_APP_LOCALHOST}/property/owner/panel/info/${id}`;
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
                    type: "CURRENT_BALANCE_OWNER_PANEL",
                    payload: response.data,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: "CURRENT_BALANCE_OWNER_PANEL",
                    payload: error,
                    status: "Failed",
                });
            });
    };
};

export const JobsListByIdOT = id => {
    var authUser = JSON.parse(localStorage.getItem("authUser"));

    var url = `${process.env.REACT_APP_LOCALHOST}/job/by_property/${id}`;
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
                    type: "JOBS_LIST_BY_ID_OT",
                    payload: response.data,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: "JOBS_LIST_BY_ID_OT",
                    payload: error,
                    status: "Failed",
                });
            });
    };
};

export const InspectionInfoDataOT = id => {
    var authUser = JSON.parse(localStorage.getItem("authUser"));

    var url = `${process.env.REACT_APP_LOCALHOST}/inspection-details-ownar-tenant/${id}`;
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
                    type: "INSPECTION_INFO_OT",
                    payload: response.data,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: "INSPECTION_INFO_OT",
                    payload: error,
                    status: "Failed",
                });
            });
    };
};

export const sendMessageTenant = (mail, state) => {
    var authUser = JSON.parse(localStorage.getItem("authUser"));
    const newUrl = process.env.REACT_APP_LOCALHOST;
    var url = newUrl + "/tenant/for/mail";

    return dispatch => {
        const headers = {
            "Content-Type": "application/json",

            "Access-Control-Allow-Origin": "*",

            Authorization: "Bearer " + authUser.token,
        };



        const formData = {
            to: mail,
            from: "noreply@myday.com",
            subject: state.subject,
            body: state.body,
            status: "outbox-tenant",
        };

        console.log(formData);

        axios
            .post(url, formData, { headers: headers })
            .then(response => {
                dispatch({
                    type: "MAIL_SEND_TENANT",
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: "MAIL_SEND_TENANT",
                    status: "Failed",
                });
            });
    };
};

export const sendMessageTenantFresh = () => {
    return dispatch =>
        dispatch({
            type: "MAIL_SEND_TENANT_FRESH",
            payload: null,
            error: null,
            status: false,
        });
};

export const addMaintenanceTenant = (state, data) => {
    var authUser = JSON.parse(localStorage.getItem("authUser"));
    const newUrl = process.env.REACT_APP_LOCALHOST;
    var url = newUrl + "/tenantStore";

    return dispatch => {
        const headers = {
            "Content-Type": "application/json",

            "Access-Control-Allow-Origin": "*",

            Authorization: "Bearer " + authUser.token,
        };

        const formData = {
            summary: state.summary,
            description: state.description,

            property_id: data.property_id,
            reported_by: 'tenant',
            access: 'tenant',
            due_by: "2022-11-03",
            manager_id: '2',
            work_order_notes: 'notes',
            owner_id: 2,
            tenant_id: 4,
            tenant_email: "fury@mailinator.com",
            owner_email: "mirajul.hoque@cliqpack.com",

        };



        console.log(formData);

        axios
            .post(url, formData, { headers: headers })
            .then(response => {
                dispatch({
                    type: "ADD_MAINTENANCE_TENANT",
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: "ADD_MAINTENANCE_TENANT",
                    status: "Failed",
                });
            });
    };
};

export const addMaintenanceTenantFresh = () => {
    return dispatch =>
        dispatch({
            type: "ADD_MAINTENANCE_TENANT_FRESH",
            payload: null,
            error: null,
            status: false,
        });
};

export const financialChartData = id => {
    var authUser = JSON.parse(localStorage.getItem("authUser"));

    var url = `${process.env.REACT_APP_LOCALHOST}/owner_money_in_out/${id}`;
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
                    type: "CHART_DATA",
                    payload: response.data,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: "CHART_DATA",
                    payload: error,
                    status: "Failed",
                });
            });
    };
};

export const tenantAllDocument = (id) => {
    var authUser = JSON.parse(localStorage.getItem("authUser"));
    // var url = `${process.env.REACT_APP_LOCALHOST}/tenant/properties/${id}`;
    var url = `${process.env.REACT_APP_LOCALHOST}/getAllModulePropertyDoc/${id}`;
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
                    type: "TENANT_ALL_DOC",
                    payload: response.data,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: "TENANT_ALL_DOC",
                    payload: error,
                    status: "Failed",
                });
            });
    };
};

export const tenantActivityPanel = (p_id, t_id) => {
    var authUser = JSON.parse(localStorage.getItem("authUser"));
    var url = `${process.env.REACT_APP_LOCALHOST}/tenant/panel/activities/${p_id}/${t_id}`;

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
                    type: "TENANT_ACTIVITY",
                    payload: response.data,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: "TENANT_ACTIVITY",
                    payload: error,
                    status: "Failed",
                });
            });
    };
};

export const ownerPanelDoc = (data, id) => {
    var authUser = JSON.parse(localStorage.getItem("authUser"));

    var url = `${process.env.REACT_APP_LOCALHOST}/ownerPanalShow/${id}`;
    const formData = {
        language: data
    };
    console.log(formData, data);
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
                    type: "OWNER_PANEL_DOC",
                    payload: response.data,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: "OWNER_PANEL_DOC",
                    payload: error,
                    status: "Failed",
                });
            });
    };
};