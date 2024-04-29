import axios from "axios";

export const AllPropertyDocument = (id, data) => {
    var authUser = JSON.parse(localStorage.getItem("authUser"));
    const newUrl = `${process.env.REACT_APP_LOCALHOST}`;

    let url = `${newUrl}/getPropertyDoc/${id}`;


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
                    type: "ALL_PROPERTY_DOCUMENT",
                    payload: response,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: "ALL_PROPERTY_DOCUMENT",
                    error: error,
                    status: "Failed",
                });
            });
    };
};


/*
* All action for property document name edit & delete - start from here
*/


export const AllDocumentByProperty = (id, data) => {
    var authUser = JSON.parse(localStorage.getItem("authUser"));
    const newUrl = `${process.env.REACT_APP_LOCALHOST}`;

    let url = `${newUrl}/propertiesGeneratedAndUploadedDoc/${id}`;
    const formData = {
        name: data,
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
                    type: "ALL_DOCUMENT_BY_PROPERTY",
                    payload: response,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: "ALL_DOCUMENT_BY_PROPERTY",
                    error: error,
                    status: "Failed",
                });
            });
    };
};


export const AllDocumentByInspection = (id, data) => {
    var authUser = JSON.parse(localStorage.getItem("authUser"));
    const newUrl = `${process.env.REACT_APP_LOCALHOST}`;

    let url = `${newUrl}/inspectionGeneratedAndUploadedDoc/${id}`;
    const formData = {
        name: data,
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
                    type: "ALL_DOCUMENT_BY_INSPECTION",
                    payload: response,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: "ALL_DOCUMENT_BY_INSPECTION",
                    error: error,
                    status: "Failed",
                });
            });
    };
};
export const AllDocumentByJob = (id, data) => {
    var authUser = JSON.parse(localStorage.getItem("authUser"));
    const newUrl = `${process.env.REACT_APP_LOCALHOST}`;

    let url = `${newUrl}/generatedAndUploadedDoc/${id}`;
    const formData = {
        name: data,
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
                    type: "ALL_DOCUMENT_BY_JOB",
                    payload: response,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: "ALL_DOCUMENT_BY_JOB",
                    error: error,
                    status: "Failed",
                });
            });
    };
};

export const documentUpdateById = (data, id) => {

    var authUser = JSON.parse(localStorage.getItem("authUser"));
    const newUrl = `${process.env.REACT_APP_LOCALHOST}`;

    let url = `${newUrl}/propertyDocEdit/${id}`;
    const formData = {
        name: data,

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
                    type: "USER_DOCUMENT_UPDATE",
                    payload: response,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: "USER_DOCUMENT_UPDATE",
                    error: error,
                    status: "Failed",
                });
            });
    };
};

export const documentDeleteById = (docID) => {
    console.log(docID);
    var authUser = JSON.parse(localStorage.getItem("authUser"));
    const newUrl = `${process.env.REACT_APP_LOCALHOST}`;

    let url = `${newUrl}/deletePropertyDoc/${docID}`;
    // const formData = {
    //     name: rowData,

    // };

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
                    type: "USER_DOCUMENT_DELETE",
                    payload: response,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: "USER_DOCUMENT_DELETE",
                    error: error,
                    status: "Failed",
                });
            });
    };
};

export const documentDeleteByIdFresh = () => {
    return dispatch =>
        dispatch({
            type: "USER_DOCUMENT_DELETE_FRESH",
            payload: null,
            error: null,
            status: false,
        });
};

export const documentUpdateByIdFresh = () => {
    return dispatch =>
        dispatch({
            type: "USER_DOCUMENT_UPDATE_FRESH",
            payload: null,
            error: null,
            status: false,
        });
};

/*
* All action for property document name edit & delete -ends here
*/

/*
* All action for contact document name edit & delete - start from here
*/
export const contactDocumentUpdateById = (rowData, docID) => {
    console.log(rowData, docID);
    var authUser = JSON.parse(localStorage.getItem("authUser"));
    const newUrl = `${process.env.REACT_APP_LOCALHOST}`;

    let url = `${newUrl}/propertyDocEdit/${docID}`;
    const formData = {
        name: rowData,

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
                    type: "CONTACT_DOCUMENT_NAME_UPDATE",
                    payload: response,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: "CONTACT_DOCUMENT_NAME_UPDATE",
                    error: error,
                    status: "Failed",
                });
            });
    };
};

export const contactDocumentUpdateByIdFresh = () => {
    return dispatch =>
        dispatch({
            type: "CONTACT_DOCUMENT_NAME_UPDATE_FRESH",
            payload: null,
            error: null,
            status: false,
        });
};

export const contactDocumentDeleteById = (docID) => {
    console.log(docID);
    var authUser = JSON.parse(localStorage.getItem("authUser"));
    const newUrl = `${process.env.REACT_APP_LOCALHOST}`;

    let url = `${newUrl}/deletePropertyDoc/${docID}`;
    // const formData = {
    //     name: rowData,

    // };

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
                    type: "CONTACT_DOCUMENT_DELETE",
                    payload: response,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: "CONTACT_DOCUMENT_DELETE",
                    error: error,
                    status: "Failed",
                });
            });
    };
};

export const contactDocumentDeleteByIdFresh = () => {
    return dispatch =>
        dispatch({
            type: "CONTACT_DOCUMENT_DELETE_FRESH",
            payload: null,
            error: null,
            status: false,
        });
};

/*
* All action for contact document name edit & delete -ends here
*/

/*
* All action for inspection document name edit & delete - start from here
*/
export const inspectionDocumentUpdateById = (rowData, docID) => {
    console.log(rowData, docID);
    var authUser = JSON.parse(localStorage.getItem("authUser"));
    const newUrl = `${process.env.REACT_APP_LOCALHOST}`;

    let url = `${newUrl}/inspectionDocEdit/${docID}`;
    const formData = {
        name: rowData,

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
                    type: "INSPECTION_DOCUMENT_NAME_UPDATE",
                    payload: response,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: "INSPECTION_DOCUMENT_NAME_UPDATE",
                    error: error,
                    status: "Failed",
                });
            });
    };
};

export const inspectionDocumentUpdateByIdFresh = () => {
    return dispatch =>
        dispatch({
            type: "INSPECTION_DOCUMENT_NAME_UPDATE_FRESH",
            payload: null,
            error: null,
            status: false,
        });
};

export const inspectionDocumentDeleteById = (docID) => {
    console.log(docID);
    var authUser = JSON.parse(localStorage.getItem("authUser"));
    const newUrl = `${process.env.REACT_APP_LOCALHOST}`;

    let url = `${newUrl}/deleteInspectionDoc/${docID}`;
    // const formData = {
    //     name: rowData,

    // };

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
                    type: "INSPECTION_DOCUMENT_DELETE",
                    payload: response,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: "INSPECTION_DOCUMENT_DELETE",
                    error: error,
                    status: "Failed",
                });
            });
    };
};

export const inspectionDocumentDeleteByIdFresh = () => {
    return dispatch =>
        dispatch({
            type: "INSPECTION_DOCUMENT_DELETE_FRESH",
            payload: null,
            error: null,
            status: false,
        });
};

/*
* All action for inspection document name edit & delete -ends here
*/


/*
* All action for Maintenance document name edit & delete - start from here
*/
export const maintenanceDocumentUpdateById = (rowData, docID) => {
    console.log(rowData, docID);
    var authUser = JSON.parse(localStorage.getItem("authUser"));
    const newUrl = `${process.env.REACT_APP_LOCALHOST}`;

    let url = `${newUrl}/inspectionDocEdit/${docID}`;
    const formData = {
        name: rowData,

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
                    type: "MAINTENANCE_DOCUMENT_NAME_UPDATE",
                    payload: response,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: "MAINTENANCE_DOCUMENT_NAME_UPDATE",
                    error: error,
                    status: "Failed",
                });
            });
    };
};

export const maintenanceDocumentUpdateByIdFresh = () => {
    return dispatch =>
        dispatch({
            type: "MAINTENANCE_DOCUMENT_NAME_UPDATE_FRESH",
            payload: null,
            error: null,
            status: false,
        });
};

export const maintenanceDocumentDeleteById = (docID) => {
    console.log(docID);
    var authUser = JSON.parse(localStorage.getItem("authUser"));
    const newUrl = `${process.env.REACT_APP_LOCALHOST}`;

    let url = `${newUrl}/deleteInspectionDoc/${docID}`;
    // const formData = {
    //     name: rowData,

    // };

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
                    type: "MAINTENANCE_DOCUMENT_DELETE",
                    payload: response,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: "MAINTENANCE_DOCUMENT_DELETE",
                    error: error,
                    status: "Failed",
                });
            });
    };
};

export const maintenanceDocumentDeleteByIdFresh = () => {
    return dispatch =>
        dispatch({
            type: "MAINTENANCE_DOCUMENT_DELETE_FRESH",
            payload: null,
            error: null,
            status: false,
        });
};

/*
* All action for Maintenance document name edit & delete -ends here
*/


/*
* All action for task document name edit & delete - start from here
*/
export const taskDocumentUpdateById = (rowData, docID) => {
    console.log(rowData, docID);
    var authUser = JSON.parse(localStorage.getItem("authUser"));
    const newUrl = `${process.env.REACT_APP_LOCALHOST}`;

    let url = `${newUrl}/inspectionDocEdit/${docID}`;
    const formData = {
        name: rowData,

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
                    type: "TASK_DOCUMENT_NAME_UPDATE",
                    payload: response,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: "TASK_DOCUMENT_NAME_UPDATE",
                    error: error,
                    status: "Failed",
                });
            });
    };
};

export const taskDocumentUpdateByIdFresh = () => {
    return dispatch =>
        dispatch({
            type: "TASK_DOCUMENT_NAME_UPDATE_FRESH",
            payload: null,
            error: null,
            status: false,
        });
};

export const taskDocumentDeleteById = (docID) => {
    console.log(docID);
    var authUser = JSON.parse(localStorage.getItem("authUser"));
    const newUrl = `${process.env.REACT_APP_LOCALHOST}`;

    let url = `${newUrl}/deleteInspectionDoc/${docID}`;
    // const formData = {
    //     name: rowData,

    // };

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
                    type: "TASK_DOCUMENT_DELETE",
                    payload: response,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: "TASK_DOCUMENT_DELETE",
                    error: error,
                    status: "Failed",
                });
            });
    };
};

export const taskDocumentDeleteByIdFresh = () => {
    return dispatch =>
        dispatch({
            type: "TASK_DOCUMENT_DELETE_FRESH",
            payload: null,
            error: null,
            status: false,
        });
};

/*
* All action for task document name edit & delete -ends here
*/
export const AllPropertyDocumentFresh = () => {
    return dispatch =>
        dispatch({
            type: "ALL_PROPERTY_DOCUMENT_FRESH",
            payload: null,
            error: null,
            status: false,
        });
};

export const storePropertyDocument = (file, propertyId = null, contactId = null, tenantId = null, ownerId = null, supplier_id = null, selerId = null) => {
    var authUser = JSON.parse(localStorage.getItem("authUser"));
    const newUrl = `${process.env.REACT_APP_LOCALHOST}`;

    let url = `${newUrl}/uploadPropertyDoc`;
    let formData = new FormData();
    for (let i = 0; i < file.length; i++) {
        formData.append("image[]", file[i]);
    }
    formData.append("id", propertyId);
    formData.append("contact_id", contactId);
    formData.append("owner_id", ownerId);
    formData.append("tenant_id", tenantId);
    formData.append("supplier_id", supplier_id);
    formData.append("seller_id", selerId);

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
                    type: "STORE_PROPERTY_DOCUMENT",
                    payload: response,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: "STORE_PROPERTY_DOCUMENT",
                    error: error,
                    status: "Failed",
                });
            });
    };
};

export const storePropertyDocumentFresh = () => {
    return dispatch =>
        dispatch({
            type: "STORE_PROPERTY_DOCUMENT_FRESH",
            payload: null,
            error: null,
            status: false,
        });
};

export const AllContactDocument = (id) => {
    var authUser = JSON.parse(localStorage.getItem("authUser"));
    const newUrl = `${process.env.REACT_APP_LOCALHOST}`;

    let url = `${newUrl}/getContactDoc/${id}`;
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
                    type: "ALL_CONTACT_DOCUMENT",
                    payload: response,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: "ALL_CONTACT_DOCUMENT",
                    error: error,
                    status: "Failed",
                });
            });
    };
};

export const storeInspectionTaskJobDocument = (file, propertyId = null, task_id = null, inspection_id = null, job_id = null, listing_id = null) => {
    var authUser = JSON.parse(localStorage.getItem("authUser"));
    const newUrl = `${process.env.REACT_APP_LOCALHOST}`;
    console.log(file);

    // return;
    // let url = `${newUrl}/uploadInspectionMaintenanceTaskDoc`;
    let url = `${newUrl}/uploadInspectionMaintenanceTaskDocMultiple`;
    let formData = new FormData();

    for (let i = 0; i < file.length; i++) {
        formData.append("image[]", file[i]);
    }
    formData.append("property_id", propertyId);
    formData.append("task_id", task_id);
    formData.append("inspection_id", inspection_id);
    formData.append("job_id", job_id);
    formData.append("listing_id", listing_id);

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
                    type: "STORE_DOCUMENT",
                    payload: response,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: "STORE_DOCUMENT",
                    error: error,
                    status: "Failed",
                });
            });
    };
};

export const storeInspectionTaskJobDocumentFresh = () => {
    return dispatch =>
        dispatch({
            type: "STORE_DOCUMENT_FRESH",
            payload: null,
            error: null,
            status: false,
        });
};

export const AllTaskDocument = (id) => {
    var authUser = JSON.parse(localStorage.getItem("authUser"));
    const newUrl = `${process.env.REACT_APP_LOCALHOST}`;

    let url = `${newUrl}/getTaskDoc/${id}`;
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
                    type: "ALL_TASK_DOCUMENT",
                    payload: response,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: "ALL_TASK_DOCUMENT",
                    error: error,
                    status: "Failed",
                });
            });
    };
};
export const AllListingDocument = (id, data) => {
    var authUser = JSON.parse(localStorage.getItem("authUser"));
    const newUrl = `${process.env.REACT_APP_LOCALHOST}`;

    let url = `${newUrl}/generatedAndUploadedDoc/${id}`;

    const formData = {
        name: data,
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
                    type: "ALL_LISTING_DOCUMENT",
                    payload: response,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: "ALL_LISTING_DOCUMENT",
                    error: error,
                    status: "Failed",
                });
            });
    };
};

export const AllJobDocument = (id) => {
    var authUser = JSON.parse(localStorage.getItem("authUser"));
    const newUrl = `${process.env.REACT_APP_LOCALHOST}`;

    let url = `${newUrl}/getMaintenanceDoc/${id}`;
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
                    type: "ALL_JOB_DOCUMENT",
                    payload: response,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: "ALL_JOB_DOCUMENT",
                    error: error,
                    status: "Failed",
                });
            });
    };
};

export const AllInspectionDocument = (id) => {
    var authUser = JSON.parse(localStorage.getItem("authUser"));
    const newUrl = `${process.env.REACT_APP_LOCALHOST}`;

    let url = `${newUrl}/getInspectionDoc/${id}`;
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
                    type: "ALL_INSPECTION_DOCUMENT",
                    payload: response,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: "ALL_INSPECTION_DOCUMENT",
                    error: error,
                    status: "Failed",
                });
            });
    };
};

export const AllJobTaskInspectionDocument = () => {
    var authUser = JSON.parse(localStorage.getItem("authUser"));
    const newUrl = `${process.env.REACT_APP_LOCALHOST}`;

    let url = `${newUrl}/getInspectionMaintenanceTaskDoc`;
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
                    type: "ALL_JOB_TASK_INSPECTION_DOCUMENT",
                    payload: response,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: "ALL_JOB_TASK_INSPECTION_DOCUMENT",
                    error: error,
                    status: "Failed",
                });
            });
    };
};


export const getListingDoc = (id) => {
    var authUser = JSON.parse(localStorage.getItem("authUser"));
    const newUrl = `${process.env.REACT_APP_LOCALHOST}`;

    let url = `${newUrl}/getListingDoc/${id}`;
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
                    type: "ALL_LISTING_DOCUMENT",
                    payload: response,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: "ALL_LISTING_DOCUMENT",
                    error: error,
                    status: "Failed",
                });
            });
    };
};

export const storeContactDoc = (file, contactId = null, id = null, type) => {
    var authUser = JSON.parse(localStorage.getItem("authUser"));
    const newUrl = `${process.env.REACT_APP_LOCALHOST}`;

    let url = `${newUrl}/uploadPropertyDoc`;
    let formData = new FormData();

    for (let i = 0; i < file.length; i++) {
        formData.append("image[]", file[i]);
    }

    formData.append("contact_id", contactId);
    formData.append("contact_type_id", id);
    formData.append("type", type);


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
                    type: "STORE_CONTACT_DOCUMENT",
                    payload: response,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: "STORE_CONTACT_DOCUMENT",
                    error: error,
                    status: "Failed",
                });
            });
    };
};

export const storeContactDocFresh = () => {
    return dispatch =>
        dispatch({
            type: "STORE_CONTACT_DOCUMENT_FRESH",
            payload: null,
            error: null,
            status: false,
        });
};

export const getAllDocumentsForSettings = (data) => {
    var authUser = JSON.parse(localStorage.getItem("authUser"));
    const newUrl = `${process.env.REACT_APP_LOCALHOST}`;

    let url = `${newUrl}/activity/setting/doc/all`;
    const formData = {
        name: data,
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
                    type: "ALL_SETTINGS_DOC",
                    payload: response.data,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: "ALL_SETTINGS_DOC",
                    error: error,
                    status: "Failed",
                });
            });
    };
};

export const editDocumentForSettings = (state, data, id) => {
    var authUser = JSON.parse(localStorage.getItem("authUser"));
    const newUrl = `${process.env.REACT_APP_LOCALHOST}`;
    console.log(state, data, id);
    let url = `${newUrl}/activity/setting/doc/all/${id}`;
    const formData = {
        name: state.label_name,
        id: id,
        inspection_id: data.inspection_id,
        job_id: data.job_id,
        listing_id: data.listing_id,
        task_id: data.task_id,
    };
    console.log(formData);
    // return

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
                    type: "EDIT_SETTINGS_DOC",
                    payload: response,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: "EDIT_SETTINGS_DOC",
                    error: error,
                    status: "Failed",
                });
            });
    };
};

export const editDocumentForSettingsFresh = () => {
    return dispatch =>
        dispatch({
            type: "EDIT_SETTINGS_DOC_FRESH",
            payload: null,
            error: null,
            status: false,
        });
};

export const removeDocumentsForSettings = (data) => {
    var authUser = JSON.parse(localStorage.getItem("authUser"));
    const newUrl = `${process.env.REACT_APP_LOCALHOST}`;

    let url = `${newUrl}/activity/setting/doc/remove`;
    const formData = {
        data: data,
    };
    console.log(formData);
    // return

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
                    type: "REMOVE_SETTINGS_DOC",
                    payload: response,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: "REMOVE_SETTINGS_DOC",
                    error: error,
                    status: "Failed",
                });
            });
    };
};

export const removeDocumentsForSettingsFresh = () => {
    return dispatch =>
        dispatch({
            type: "REMOVE_SETTINGS_DOC_FRESH",
            payload: null,
            error: null,
            status: false,
        });
};

export const getMessageOptions = () => {
    var authUser = JSON.parse(localStorage.getItem("authUser"));
    const newUrl = `${process.env.REACT_APP_LOCALHOST}`;

    let url = `${newUrl}/message/setting`;
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
                    type: "ALL_SETTINGS_MESSAGE",
                    payload: response,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: "ALL_SETTINGS_MESSAGE",
                    error: error,
                    status: "Failed",
                });
            });
    };
};

export const addMessageOptions = (data) => {
    console.log({ ...data });
    const { leftBtn, middletBtn, rightBtn, selectedBehaviour } = data
    // return;
    var authUser = JSON.parse(localStorage.getItem("authUser"));
    const newUrl = `${process.env.REACT_APP_LOCALHOST}`;

    let url = `${newUrl}/message/setting`;

    const formData = {
        email_from_name_type: leftBtn ? 'User and Company Name' : middletBtn ? 'User Name' : rightBtn ? 'Company Name' : '',
        sending_behaviour: selectedBehaviour?.label,
        email_will_be_sent_as: ''
    }
    console.log(formData);
    // return

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
                    type: "ADD_MESSAGE_OPTIONS",
                    payload: response,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: "ADD_MESSAGE_OPTIONS",
                    error: error,
                    status: "Failed",
                });
            });
    };
};

export const addMessageOptionsFresh = () => {
    return dispatch =>
        dispatch({
            type: "ADD_MESSAGE_OPTIONS_FRESH",
            payload: null,
            error: null,
            status: false,
        });
};

export const getMessageOptionsData = (data) => {
    var authUser = JSON.parse(localStorage.getItem("authUser"));
    const newUrl = `${process.env.REACT_APP_LOCALHOST}`;

    let url = `${newUrl}/email/sent/as/setting`;

    const formData = {

    }

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
                    type: "MESSAGE_OPTIONS_EMAIL_DATA",
                    payload: response,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: "MESSAGE_OPTIONS_EMAIL_DATA",
                    error: error,
                    status: "Failed",
                });
            });
    };
};

export const changeEmailSettings = (id, data) => {
    console.log(id, data);
    // return;
    var authUser = JSON.parse(localStorage.getItem("authUser"));
    const newUrl = `${process.env.REACT_APP_LOCALHOST}`;

    let url = `${newUrl}/protfolio/email/setting`;

    const formData = {
        portfolio_email: `${data?.email}`,
        message_setting_id: id
    }
    console.log(formData);
    // return

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
                    type: "CHANGE_EMAIL_SETTINGS",
                    payload: response,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: "CHANGE_EMAIL_SETTINGS",
                    error: error,
                    status: "Failed",
                });
            });
    };
};

export const changeEmailSettingsFresh = () => {
    return dispatch =>
        dispatch({
            type: "CHANGE_EMAIL_SETTINGS_FRESH",
            payload: null,
            error: null,
            status: false,
        });
};

export const getSettingsLog = (data) => {
    var authUser = JSON.parse(localStorage.getItem("authUser"));
    const newUrl = `${process.env.REACT_APP_LOCALHOST}`;

    let url = `${newUrl}/activity/setting`;

    const formData = {

    }

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
                    type: "ALL_SETTINGS_LOG",
                    payload: response.data,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: "ALL_SETTINGS_LOG",
                    error: error,
                    status: "Failed",
                });
            });
    };
};

export const documentVisibilty = (data) => {


    var authUser = JSON.parse(localStorage.getItem("authUser"));
    const newUrl = `${process.env.REACT_APP_LOCALHOST}`;

    let url = `${newUrl}/`;

    const formData = {

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
                    type: "CHANGE_VISIBILTY",
                    payload: response,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: "CHANGE_VISIBILTY",
                    error: error,
                    status: "Failed",
                });
            });
    };
};

export const documentVisibiltyFresh = () => {
    return dispatch =>
        dispatch({
            type: "CHANGE_VISIBILTY_FRESH",
            payload: null,
            error: null,
            status: false,
        });
};

