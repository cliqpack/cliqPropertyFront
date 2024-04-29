import axios from "axios";
import { property } from "lodash";

var authUser = JSON.parse(localStorage.getItem("authUser"));

export const addJobModal = (state, report, contact) => {
    console.log(state, report, contact);
    var authUser = JSON.parse(localStorage.getItem("authUser"));
    const newUrl = process.env.REACT_APP_LOCALHOST;
    var url = newUrl + "/jobs";
    // console.log(data, id);

    const headers = {
        "Content-Type": "application/json",

        "Access-Control-Allow-Origin": "*",

        Authorization: "Bearer " + authUser.token,
    };
    const formData = {
        property_id: state.property || state.selectedProperty.value,
        reported_by: report.reportBtn,
        access: report.accessBtn,
        due_by: state.due_by,
        manager_id: state.manager_id || state.selectedManager && state.selectedManager.value,
        summary: state.summary,
        work_order_notes: state.notes,
        description: state.description,
        owner_id: contact.owner_id,
        tenant_id: contact.tenant_id,
        tenant_email: contact.tenant_email,
        owner_email: contact.owner_email,

        property_reminder_id: state.reminder_id,

        reminder: "reminder",
        reminder_status: "active"
    };

    console.log(formData);
    // return;

    return dispatch => {
        axios
            .post(url, formData, { headers: headers })
            .then(response => {
                console.log(response);
                dispatch({
                    type: "JOB_MODAL_ADD",
                    payload: response.data,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: "JOB_MODAL_ADD",
                    payload: error,
                    status: "Failed",
                });
            });
    };
};

export const addJobModalFresh = () => {
    return dispatch => {
        dispatch({
            type: "JOB_MODAL_ADD_FRESH",
            status: false,
            error: null,
        });
    };
};

export const getJobPropertyAccess = (id) => {
    //console.log()
    var authUser = JSON.parse(localStorage.getItem("authUser"));
    const newUrl = process.env.REACT_APP_LOCALHOST;
    var url = newUrl + "/job/property/" + id;

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
                    type: "JOB_PROPERTY_ACCESS",
                    payload: response.data,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: "JOB_PROPERTY_ACCESS",
                    payload: error,
                    status: "Failed",
                });
            });
    };
};

export const getJobPropertyAccessFresh = (id) => {
    return dispatch => {
        dispatch({
            type: "JOB_PROPERTY_ACCESS_FRESH",
            status: false,
            error: null,
        });
    };
};



export const JobsList = (status, page, sizePerPage, search = null, sortField = null, sortValue = null) => {
    var authUser = JSON.parse(localStorage.getItem("authUser"));
    let property_id = localStorage.getItem("owner_property_id");
    // var url = `${process.env.REACT_APP_LOCALHOST}/jobs/index/with/status`;
    var url = `${process.env.REACT_APP_LOCALHOST}/jobs/index/with/status_ssr`;
    const formData = {
        status: status,
        page: page,
        sizePerPage: sizePerPage,
        search: search,
        sortField: sortField,
        sortValue: sortValue,
        property_id: property_id,
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
                    type: "JOBS_LIST",
                    payload: response.data,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: "JOBS_LIST",
                    payload: error,
                    status: "Failed",
                });
            });
    };
};

export const JobsListFresh = () => {
    return dispatch => {
        dispatch({
            type: "JOBS_LIST_FRESH",
            status: null,
        });
    };
};

export const JobsListById = id => {
    var authUser = JSON.parse(localStorage.getItem("authUser"));

    var url = `${process.env.REACT_APP_LOCALHOST}/jobs/${id}`;
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
                    type: "JOBS_LIST_BY_ID",
                    payload: response.data,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: "JOBS_LIST_BY_ID",
                    payload: error,
                    status: "Failed",
                });
            });
    };
};

export const JobsListByIdFresh = () => {
    return dispatch => {
        dispatch({
            type: "JOBS_LIST_BY_ID_FRESH",
            status: false,
            error: null,
        });
    };
};

export const JobsLabel = (insId, lebels) => {
    var authUser = JSON.parse(localStorage.getItem("authUser"));
    const newUrl = process.env.REACT_APP_LOCALHOST;
    var url = newUrl + "/job/info/label";
    const headers = {
        "Content-Type": "application/json",

        "Access-Control-Allow-Origin": "*",

        Authorization: "Bearer " + authUser.token,
    };

    const formData = {
        job_id: insId,
        labels: lebels,
    }

    // console.log(formData);

    return dispatch => {
        axios
            .post(url, formData, { headers: headers })
            .then(response => {
                dispatch(JobsListById(insId));
            })
            .catch(error => {
                dispatch({
                    type: "JOBS_LABEL",
                    error: error,
                    status: "Failed",
                });
            });
    };
}

export const getQuoteInit = id => {
    var authUser = JSON.parse(localStorage.getItem("authUser"));

    var url = `${process.env.REACT_APP_LOCALHOST}/job/quote/init`;
    const headers = {
        "Content-Type": "application/json",

        "Access-Control-Allow-Origin": "*",

        Authorization: "Bearer " + authUser.token,
    };
    const formData = {
        job_id: id,

    };

    return dispatch => {


        axios
            .post(url, formData, { headers: headers })
            .then(response => {

                dispatch(getQuote(id));
                dispatch(JobsListById(id));
            })
            .catch(error => {
                dispatch({
                    type: "JOB_QUOTE_ADD",
                    payload: error,
                    status: "Failed",
                });
            });
    };
};

export const getQuote = id => {
    var authUser = JSON.parse(localStorage.getItem("authUser"));

    var url = `${process.env.REACT_APP_LOCALHOST}/jobs/quote/${id}`;
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
                    type: "GET_QUOTE",
                    payload: response.data,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: "GET_QUOTE",
                    payload: error,
                    status: "Failed",
                });
            });
    };
};

export const getQuoteFresh = () => {
    return dispatch => {
        dispatch({
            type: "GET_QUOTE_FRESH",
            status: false,
            error: null,
        });
    };
};

export const addQuoteJob = (id, state, sequence, state2) => {
    console.log(id, state);
    var authUser = JSON.parse(localStorage.getItem("authUser"));
    const newUrl = process.env.REACT_APP_LOCALHOST;
    var url = newUrl + "/jobs/quote";
    // console.log(data, id);

    const headers = {
        "Content-Type": "application/json",

        "Access-Control-Allow-Origin": "*",

        Authorization: "Bearer " + authUser.token,
    };
    const formData = {
        job_id: id,
        supplier: state2.selectedSupplier.value,
        reference: state.reference,
        amount: state.amount,
    };

    console.log(formData);
    return dispatch => {

        axios
            .post(url, formData, { headers: headers })
            .then(response => {
                console.log(response);
                if (sequence == 'u') {
                    dispatch({
                        type: "JOB_QUOTE_ADD",
                        payload: response.data,
                        status: "Success",
                    });
                } else if (sequence == 'd') {
                    dispatch({
                        type: "JOB_QUOTE_ADD",
                        payload: response.data,
                        status: "Successd",
                    });
                }

            })
            .catch(error => {
                dispatch({
                    type: "JOB_QUOTE_ADD",
                    payload: error,
                    status: "Failed",
                });
            });
    };
};

export const addQuoteFresh = () => {
    return dispatch => {
        dispatch({
            type: "JOB_QUOTE_ADD_FRESH",
            status: false,
            error: null,
        });
    };
};

export const editQuoteJob = (id, state, text, state2) => {
    console.log(state2);
    var authUser = JSON.parse(localStorage.getItem("authUser"));
    const newUrl = process.env.REACT_APP_LOCALHOST;
    var url = newUrl + "/jobs/quote/" + state.quote_id;

    const headers = {
        "Content-Type": "application/json",

        "Access-Control-Allow-Origin": "*",

        Authorization: "Bearer " + authUser.token,
    };
    const formData = {
        quote_id: state.quote_id,
        job_id: id,
        // supplier: state.supplier || state2.selectedSupplier.value,
        supplier: state2.selectedSupplier && state2.selectedSupplier.value,
        reference: state.reference,
        amount: state.amount,
    };
    console.log(formData);
    // return;

    return dispatch => {

        axios
            .put(url, formData, { headers: headers })
            .then(response => {
                dispatch({
                    type: "JOB_QUOTE_EDIT",
                    payload: response.data,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: "JOB_QUOTE_EDIT",
                    payload: error,
                    status: "Failed",
                });
            });
    };
};

export const editQuoteFresh = () => {
    return dispatch => {
        dispatch({
            type: "JOB_QUOTE_EDIT_FRESH",
            status: false,
            error: null,
        });
    };
};

export const deleteQuoteJob = (id) => {
    var authUser = JSON.parse(localStorage.getItem("authUser"));
    const newUrl = process.env.REACT_APP_LOCALHOST;
    var url = newUrl + "/jobs/quote/" + id;

    const headers = {
        "Content-Type": "application/json",

        "Access-Control-Allow-Origin": "*",

        Authorization: "Bearer " + authUser.token,
    };

    return dispatch => {

        axios
            .delete(url, { headers: headers })
            .then(response => {
                dispatch({
                    type: "DELETE_QUOTE",
                    payload: response.data,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: "DELETE_QUOTE",
                    payload: error,
                    status: "Failed",
                });
            });
    };
};

export const deleteQuoteJobFresh = () => {
    return dispatch => {
        dispatch({
            type: "DELETE_QUOTE_FRESH",
            status: false,
            error: null,
        });
    };
};

export const uploadJobFile = (file, id) => {
    console.log(id);
    var authUser = JSON.parse(localStorage.getItem("authUser"));
    const newUrl = process.env.REACT_APP_LOCALHOST;
    var url = newUrl + "/job/quote_image";

    const headers = {
        "Content-Type": "application/json",

        "Access-Control-Allow-Origin": "*",

        Authorization: "Bearer " + authUser.token,
    };
    const formData = new FormData();
    formData.append("image", file);
    formData.append("id", id);
    console.log(formData);

    return dispatch => {

        axios
            .post(url, formData, { headers: headers })
            .then(response => {
                dispatch({
                    type: "UPLOAD_JOB_FILE",
                    payload: response.data,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: "UPLOAD_JOB_FILE",
                    payload: error,
                    status: "Failed",
                });
            });
    };
};

export const uploadJobFileFresh = () => {
    return dispatch => {
        dispatch({
            type: "UPLOAD_JOB_FILE_FRESH",
            status: false,
            error: null,
        });
    };
};

export const addSupplierFromJob = (id, job_id) => {
    console.log(id, job_id);
    var authUser = JSON.parse(localStorage.getItem("authUser"));
    const newUrl = process.env.REACT_APP_LOCALHOST;
    var url = newUrl + "/job/assign";


    const headers = {
        "Content-Type": "application/json",

        "Access-Control-Allow-Origin": "*",

        Authorization: "Bearer " + authUser.token,
    };
    const formData = {
        job_id: job_id,
        supplier_id: id
    };

    return dispatch => {
        console.log(formData);

        axios
            .post(url, formData, { headers: headers })
            .then(response => {
                console.log(response);
                dispatch({
                    type: "ADD_SUPPLIER_FROM_JOB",
                    payload: response.data,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: "ADD_SUPPLIER_FROM_JOB",
                    payload: error,
                    status: "Failed",
                });
            });
    };
};

export const addSupplierFromJobFresh = () => {
    return dispatch => {
        dispatch({
            type: "ADD_SUPPLIER_FROM_JOB_FRESH",
            status: false,
            error: null,
        });
    };
};

export const addQuoteJobApprove = (id, job_id) => {
    // console.log(id);
    var authUser = JSON.parse(localStorage.getItem("authUser"));
    const newUrl = process.env.REACT_APP_LOCALHOST;
    var url = newUrl + "/job/quote/approve";
    // console.log(data, id);

    const headers = {
        "Content-Type": "application/json",

        "Access-Control-Allow-Origin": "*",

        Authorization: "Bearer " + authUser.token,
    };
    const formData = {
        id: id,
        job_id: job_id
    };

    return dispatch => {
        // console.log(formData);

        axios
            .post(url, formData, { headers: headers })
            .then(response => {
                console.log(response);
                dispatch({
                    type: "JOB_QUOTE_APPROVE",
                    payload: response.data,
                    status: "Approve",
                });
            })
            .catch(error => {
                dispatch({
                    type: "JOB_QUOTE_APPROVE",
                    payload: error,
                    status: "Failed",
                });
            });
    };
};

export const SupplierList = () => {
    var authUser = JSON.parse(localStorage.getItem("authUser"));

    var url = `${process.env.REACT_APP_LOCALHOST}/supplier`;
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
                    type: "SUPPLIER_LIST",
                    payload: response.data,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: "SUPPLIER_LIST",
                    payload: error,
                    status: "Failed",
                });
            });
    };
};

export const SupplierListFresh = () => {
    return dispatch => {
        dispatch({
            type: "SUPPLIER_LIST_FRESH",
            status: false,
            error: null,
        });
    };
}

export const editJobInfo = (state, id, data) => {
    console.log(data);
    var authUser = JSON.parse(localStorage.getItem("authUser"));
    const newUrl = process.env.REACT_APP_LOCALHOST;
    var url = newUrl + "/jobs/" + id;
    // console.log(data, id);

    const headers = {
        "Content-Type": "application/json",

        "Access-Control-Allow-Origin": "*",

        Authorization: "Bearer " + authUser.token,
    };
    const formData = {
        tenant_id: data.selectedTenant.value,
        access: data.selectedAccess.value,
        due_by: state.due_by,
        manager_id: data.selectedManager.value,
        summary: state.summary,
        work_order_notes: state.work_order_notes,
        description: state.description
    };

    console.log(formData);

    return dispatch => {

        axios
            .put(url, formData, { headers: headers })
            .then(response => {
                console.log(response);
                dispatch({
                    type: "JOB_MODAL_EDIT",
                    payload: response.data,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: "JOB_MODAL_EDIT",
                    payload: error,
                    status: "Failed",
                });
            });
    };
};

export const editJobInfoFresh = () => {
    return dispatch => {
        dispatch({
            type: "JOB_MODAL_EDIT_FRESH",
            status: false,
            error: null,
        });
    };
};

export const jobInfoImageAdd = (data, id) => {
    console.log(data);
    console.log(id);
    var authUser = JSON.parse(localStorage.getItem("authUser"));
    // console.log(data);
    const newUrl = process.env.REACT_APP_LOCALHOST;
    var url = newUrl + "/job/image";
    const headers = {
        "Content-Type": "application/json",

        "Access-Control-Allow-Origin": "*",

        Authorization: "Bearer " + authUser.token,
    };

    // const formData = new FormData();
    // formData.append("job_id", data.job_id);

    // formData.append("image", data.file);
    let formData = new FormData();
    for (let i = 0; i < data.length; i++) {
        console.log(i);
        formData.append("image[]", data[i]);
    }

    formData.append("job_id", id);
    console.log(formData);
    return dispatch => {
        axios
            .post(url, formData, { headers: headers })
            .then(response => {
                dispatch({
                    type: "JOB_INFO_IMAGE_ADD",
                    payload: response.data,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: "JOB_INFO_IMAGE_ADD",
                    payload: error,
                    status: "Failed",
                });
            });
    };
};

export const GetJobsSliderImage = data => {
    var authUser = JSON.parse(localStorage.getItem("authUser"));
    const newUrl = process.env.REACT_APP_LOCALHOST;
    var url = newUrl + "/get/listing/advert/slider";
    return dispatch => {
        const formData = {
            listing_id: data.listing_id,
            property_id: data.property_id,
        };
        const headers = {
            "Content-Type": "application/json",

            "Access-Control-Allow-Origin": "*",

            Authorization: "Bearer " + authUser.token,
        };
        axios
            .post(url, formData, { headers: headers })
            .then(response => {
                dispatch({
                    type: "GET_JOB_IMAGE",
                    payload: response,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: "GET_JOB_IMAGE",
                    payload: error,
                    status: "Failed",
                });
            });
    };
};

export const jobInfoImageAddFresh = () => {
    return dispatch => {
        dispatch({
            type: "GET_JOB_IMAGE_FRESH",
            status: false,
            error: null,
        });
    };
}

export const jobApprove = (id) => {
    // console.log(state, report);
    var authUser = JSON.parse(localStorage.getItem("authUser"));
    const newUrl = process.env.REACT_APP_LOCALHOST;
    var url = newUrl + "/job/approve";
    // console.log(data, id);

    const headers = {
        "Content-Type": "application/json",

        "Access-Control-Allow-Origin": "*",

        Authorization: "Bearer " + authUser.token,
    };
    const formData = {
        job_id: id
    };

    return dispatch => {
        console.log(formData);

        axios
            .post(url, formData, { headers: headers })
            .then(response => {

                dispatch({
                    type: "JOB_APPROVE",
                    payload: response.data,
                    status: "Approve",
                });
            })
            .catch(error => {
                dispatch({
                    type: "JOB_APPROVE",
                    payload: error,
                    status: "Failed",
                });
            });
    };
};

export const jobUnapprove = (id) => {
    // console.log(state, report);
    var authUser = JSON.parse(localStorage.getItem("authUser"));
    const newUrl = process.env.REACT_APP_LOCALHOST;
    var url = newUrl + "/job/unapprove";
    // console.log(data, id);

    const headers = {
        "Content-Type": "application/json",

        "Access-Control-Allow-Origin": "*",

        Authorization: "Bearer " + authUser.token,
    };
    const formData = {
        job_id: id
    };

    return dispatch => {
        console.log(formData);

        axios
            .post(url, formData, { headers: headers })
            .then(response => {

                dispatch({
                    type: "JOB_UNAPPROVE",
                    payload: response.data,
                    status: "Unapprove",
                });
            })
            .catch(error => {
                dispatch({
                    type: "JOB_UNAPPROVE",
                    payload: error,
                    status: "Failed",
                });
            });
    };
};

export const jobUnquote = (id) => {
    // console.log(state, report);
    var authUser = JSON.parse(localStorage.getItem("authUser"));
    const newUrl = process.env.REACT_APP_LOCALHOST;
    var url = newUrl + "/job/unquoted";
    // console.log(data, id);

    const headers = {
        "Content-Type": "application/json",

        "Access-Control-Allow-Origin": "*",

        Authorization: "Bearer " + authUser.token,
    };
    const formData = {
        job_id: id
    };

    return dispatch => {
        console.log(formData);

        axios
            .post(url, formData, { headers: headers })
            .then(response => {

                dispatch({
                    type: "JOB_UNQUOTED",
                    payload: response.data,
                    status: "Unquoted",
                });
            })
            .catch(error => {
                dispatch({
                    type: "JOB_UNQUOTED",
                    payload: error,
                    status: "Failed",
                });
            });
    };
};

export const jobAssigned = (id) => {
    // console.log(state, report);
    var authUser = JSON.parse(localStorage.getItem("authUser"));
    const newUrl = process.env.REACT_APP_LOCALHOST;
    var url = newUrl + "/jobs";
    // console.log(data, id);

    const headers = {
        "Content-Type": "application/json",

        "Access-Control-Allow-Origin": "*",

        Authorization: "Bearer " + authUser.token,
    };
    const formData = {
        job_id: id
    };

    return dispatch => {
        console.log(formData);

        axios
            .post(url, formData, { headers: headers })
            .then(response => {

                dispatch({
                    type: "JOB_ASSIGNED",
                    payload: response.data,
                    status: "Assigned",
                });
            })
            .catch(error => {
                dispatch({
                    type: "JOB_ASSIGNED",
                    payload: error,
                    status: "Failed",
                });
            });
    };
};

export const jobUnassigned = (id) => {
    // console.log(state, report);
    var authUser = JSON.parse(localStorage.getItem("authUser"));
    const newUrl = process.env.REACT_APP_LOCALHOST;
    var url = newUrl + "/job/unassign";
    // console.log(data, id);

    const headers = {
        "Content-Type": "application/json",

        "Access-Control-Allow-Origin": "*",

        Authorization: "Bearer " + authUser.token,
    };
    const formData = {
        job_id: id
    };

    return dispatch => {
        console.log(formData);

        axios
            .post(url, formData, { headers: headers })
            .then(response => {

                dispatch({
                    type: "JOB_UNASSIGNED",
                    payload: response.data,
                    status: "Unassigned",
                });
            })
            .catch(error => {
                dispatch({
                    type: "JOB_UNASSIGNED",
                    payload: error,
                    status: "Failed",
                });
            });
    };
};

export const jobFinished = (id) => {
    // console.log(state, report);
    var authUser = JSON.parse(localStorage.getItem("authUser"));
    const newUrl = process.env.REACT_APP_LOCALHOST;
    var url = newUrl + "/job/finish";
    // console.log(data, id);

    const headers = {
        "Content-Type": "application/json",

        "Access-Control-Allow-Origin": "*",

        Authorization: "Bearer " + authUser.token,
    };
    const formData = {
        job_id: id
    };

    return dispatch => {
        console.log(formData);

        axios
            .post(url, formData, { headers: headers })
            .then(response => {

                dispatch({
                    type: "JOB_FINISHED",
                    payload: response.data,
                    status: "Finished",
                });
            })
            .catch(error => {
                dispatch({
                    type: "JOB_FINISHED",
                    payload: error,
                    status: "Failed",
                });
            });
    };
};



export const jobOwnerAssigned = (id, job_id) => {
    // console.log(state, report);
    var authUser = JSON.parse(localStorage.getItem("authUser"));
    const newUrl = process.env.REACT_APP_LOCALHOST;
    var url = newUrl + "/job/ownerAssign";
    // console.log(data, id);

    const headers = {
        "Content-Type": "application/json",

        "Access-Control-Allow-Origin": "*",

        Authorization: "Bearer " + authUser.token,
    };
    const formData = {
        job_id: job_id.toString(),
        owner_id: id
    };

    return dispatch => {
        console.log(formData);

        axios
            .post(url, formData, { headers: headers })
            .then(response => {

                dispatch({
                    type: "JOB_OWNER_ASSIGNED",
                    payload: response.data,
                    status: "ownerAssigned",
                });
            })
            .catch(error => {
                dispatch({
                    type: "JOB_OWNER_ASSIGNED",
                    payload: error,
                    status: "Failed",
                });
            });
    };
};

export const jobTenantAssigned = (id, job_id) => {
    // console.log(state, report);
    var authUser = JSON.parse(localStorage.getItem("authUser"));
    const newUrl = process.env.REACT_APP_LOCALHOST;
    var url = newUrl + "/job/tenantAssign";
    // console.log(data, id);

    const headers = {
        "Content-Type": "application/json",

        "Access-Control-Allow-Origin": "*",

        Authorization: "Bearer " + authUser.token,
    };
    const formData = {
        job_id: job_id,
        tenant_id: id.toString()
    };

    return dispatch => {
        console.log(formData);

        axios
            .post(url, formData, { headers: headers })
            .then(response => {

                dispatch({
                    type: "JOB_TENANT_ASSIGNED",
                    payload: response.data,
                    status: "tenantAssigned",
                });
            })
            .catch(error => {
                dispatch({
                    type: "JOB_TENANT_ASSIGNED",
                    payload: error,
                    status: "Failed",
                });
            });
    };
};

export const jobCompleted = (id) => {
    // console.log(state, report);
    var authUser = JSON.parse(localStorage.getItem("authUser"));
    const newUrl = process.env.REACT_APP_LOCALHOST;
    var url = newUrl + "/job/close";
    // console.log(data, id);

    const headers = {
        "Content-Type": "application/json",

        "Access-Control-Allow-Origin": "*",

        Authorization: "Bearer " + authUser.token,
    };
    const formData = {
        job_id: id
    };

    return dispatch => {
        console.log(formData);

        axios
            .post(url, formData, { headers: headers })
            .then(response => {

                dispatch({
                    type: "JOB_COMPLETED",
                    payload: response.data,
                    status: "Completed",
                });
            })
            .catch(error => {
                dispatch({
                    type: "JOB_COMPLETED",
                    payload: error,
                    status: "Failed",
                });
            });
    };
};

export const jobReopen = (id) => {
    // console.log(state, report);
    var authUser = JSON.parse(localStorage.getItem("authUser"));
    const newUrl = process.env.REACT_APP_LOCALHOST;
    var url = newUrl + "/job/reopen";
    // console.log(data, id);

    const headers = {
        "Content-Type": "application/json",

        "Access-Control-Allow-Origin": "*",

        Authorization: "Bearer " + authUser.token,
    };
    const formData = {
        job_id: id
    };

    return dispatch => {
        console.log(formData);

        axios
            .post(url, formData, { headers: headers })
            .then(response => {

                dispatch({
                    type: "JOB_REOPEN",
                    payload: response.data,
                    status: "Reopen",
                });
            })
            .catch(error => {
                dispatch({
                    type: "JOB_REOPEN",
                    payload: error,
                    status: "Failed",
                });
            });
    };
};

export const jobStatusFresh = () => {
    return dispatch => {
        dispatch({
            type: "JOB_STATUS_FRESH",
            status: false,
            error: null,
        });
    };
}

export const deleteJob = (id) => {
    var authUser = JSON.parse(localStorage.getItem("authUser"));
    let url = `${process.env.REACT_APP_LOCALHOST}/jobs/${id}`;
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
                    type: "JOB_DELETE",
                    payload: response,
                    status: 'Success'
                });
            })
            .catch(error => {
                dispatch({
                    type: "JOB_DELETE",
                    payload: error,
                    status: "Failed",
                });
            });
    };
};

export const deleteJobFresh = () => {
    return dispatch =>
        dispatch({
            type: "JOB_DELETE_FRESH",
            payload: null,
            error: null,
            status: false,
        });
};

export const getMessageTemplatesForJobsBySelect = (data, query = null) => {
    const newData = data.map((item) => item.label)
    var authUser = JSON.parse(localStorage.getItem("authUser"));
    let url = `${process.env.REACT_APP_LOCALHOST}/maintenance/message/mail/template/filter`;
    const formData = {
        trigger_to: data,
        trigger_to2: newData,
        query: query,
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
                    type: "GET_MESSAGE_TEMPLATES_FOR_JOBS_BY_SELECT",
                    payload: response,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: "GET_MESSAGE_TEMPLATES_FOR_JOBS_BY_SELECT",
                    payload: error,
                    status: "Failed",
                });
            });
    };
};

export const sendMailFromTemplatesInJobs = (id, sub, jobId) => {
    console.log(id, sub, jobId);
    var authUser = JSON.parse(localStorage.getItem("authUser"));
    var url = `${process.env.REACT_APP_LOCALHOST}/maintenance/message/mail/template/activity`;
    const formData = {
        maintenance_id: jobId,
        template_id: id,
        subject: sub
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
                    type: "SEND_MAIL_TO_ACTIVITY_JOBS",
                    payload: response.data,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: "SEND_MAIL_TO_ACTIVITY_JOBS",
                    payload: error,
                    status: "Failed",
                });
            });
    };
};

export const sendMailFromTemplatesInJobsFresh = () => {
    return dispatch =>
        dispatch({
            type: "SEND_MAIL_TO_ACTIVITY_JOBS_FRESH",
            payload: null,
            error: null,
            status: false,
        });
};

export const sendSMSFromTemplatesInJobs = (id, sub, jobId) => {
    console.log(id, sub, jobId);
    var authUser = JSON.parse(localStorage.getItem("authUser"));
    var url = `${process.env.REACT_APP_LOCALHOST}/`;
    const formData = {
        maintenance_id: jobId,
        template_id: id,
        subject: sub
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
                    type: "SEND_SMS_TO_ACTIVITY_JOBS",
                    payload: response.data,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: "SEND_SMS_TO_ACTIVITY_JOBS",
                    payload: error,
                    status: "Failed",
                });
            });
    };
};

export const sendSMSFromTemplatesInJobsFresh = () => {
    return dispatch =>
        dispatch({
            type: "SEND_SMS_TO_ACTIVITY_JOBS_FRESH",
            payload: null,
            error: null,
            status: false,
        });
};

export const jobImageDelete = id => {
    var authUser = JSON.parse(localStorage.getItem("authUser"));
    var url = `${process.env.REACT_APP_LOCALHOST}/maintenanceImage/${id}`;

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
                    type: "JOB_IMAGE_DELETE",
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: "JOB_IMAGE_DELETE",
                    payload: error,
                    status: "Failed",
                });
            });
    };
};

export const jobImageDeleteFresh = () => {
    return dispatch =>
        dispatch({
            type: "JOB_IMAGE_DELETE_FRESH",
            status: false,
        });
};