import axios from "axios";

const head = () => {
    let authUser = JSON.parse(localStorage.getItem("authUser"));
    return {
        "Content-Type": "application/json",

        "Access-Control-Allow-Origin": "*",

        Authorization: "Bearer " + authUser?.token,
    };
}


export const supplierFolioInfo = (id) => {
    var authUser = JSON.parse(localStorage.getItem("authUser"));

    var url = `${process.env.REACT_APP_LOCALHOST}/supplier-folio-info/${id}`;
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
                    type: "SUPPLIER_FOLIO_INFO",
                    payload: response.data,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: "SUPPLIER_FOLIO_INFO",
                    payload: error,
                    status: "Failed",
                });
            });
    };
};


export const transactionsListByIdForSupplierFolio = (time, folio_id) => {
    var authUser = JSON.parse(localStorage.getItem("authUser"));

    var url = `${process.env.REACT_APP_LOCALHOST}/supplier-transaction-list?timeline=${time}&folio_id=${folio_id}`;
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
                    type: "TRANSACTIONS_LIST_ID_SUPPLIER_FOLIO",
                    payload: response.data,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: "TRANSACTIONS_LIST_ID_SUPPLIER_FOLIO",
                    payload: error,
                    status: "Failed",
                });
            });
    };
};

export const transactionsListByIdForSupplierFolioFresh = () => {
    return dispatch =>
        dispatch({
            type: "TRANSACTIONS_LIST_ID_SUPPLIER_FOLIO_FRESH",
            status: false,
        });
};

export const PendingBillsForSupplier = (f_id) => {
    var authUser = JSON.parse(localStorage.getItem("authUser"));

    var url = `${process.env.REACT_APP_LOCALHOST}/supplier-pending-bill/${f_id}`;
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
                    type: "PENDING_BILLS_SUPPLIER",
                    payload: response.data,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: "PENDING_BILLS_SUPPLIER",
                    payload: error,
                    status: "Failed",
                });
            });
    };
};

export const PendingBillsForSupplierFresh = () => {
    return dispatch =>
        dispatch({
            type: "PENDING_BILLS_SUPPLIER_FRESH",
            status: false,
        });
};

export const paidBillsForSupplier = (f_id) => {
    var authUser = JSON.parse(localStorage.getItem("authUser"));

    var url = `${process.env.REACT_APP_LOCALHOST}/supplier-paid-bill/${f_id}`;
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
                    type: "PAID_BILLS_SUPPLIER",
                    payload: response.data,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: "PAID_BILLS_SUPPLIER",
                    payload: error,
                    status: "Failed",
                });
            });
    };
};

export const paidBillsForSupplierFresh = () => {
    return dispatch =>
        dispatch({
            type: "PAID_BILLS_SUPPLIER_FRESH",
            status: false,
        });
};

export const PendingInvoicesForSupplier = (f_id) => {
    var authUser = JSON.parse(localStorage.getItem("authUser"));

    var url = `${process.env.REACT_APP_LOCALHOST}/supplier-pending-invoice/${f_id}`;
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
                    type: "PENDING_INVOICES_SUPPLIER",
                    payload: response.data,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: "PENDING_INVOICES_SUPPLIER",
                    payload: error,
                    status: "Failed",
                });
            });
    };
};

export const PendingInvoicesForSupplierFresh = () => {
    return dispatch =>
        dispatch({
            type: "PENDING_INVOICES_SUPPLIER_FRESH",
            status: false,
        });
};


export const supplierDisbursement = id => {
    var url = `${process.env.REACT_APP_LOCALHOST}/supplier-disbursement/${id}`;
    const headers = head();
    return dispatch => {
        const formData = { id };
        axios
            .get(url, { headers })
            .then(response => {
                dispatch({
                    type: "SUPPLIER_FOLIO_DISBURSEMENT",
                    payload: response.data,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: "SUPPLIER_FOLIO_DISBURSEMENT",
                    payload: error,
                    status: "Failed",
                });
            });
    };
};

export const supplierDisbursementFresh = () => {
    return dispatch => {
        dispatch({
            type: "SUPPLIER_FOLIO_DISBURSEMENT_FRESH",
            status: false,
        });
    };
};