import axios from "axios";
import toastr from "toastr";

export const BankList = () => {
    var authUser = JSON.parse(localStorage.getItem("authUser"));

    var url = `${process.env.REACT_APP_LOCALHOST}/current-deposit-in-one-list`;
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
                    type: "BANKING_LIST",
                    payload: response.data,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: "BANKING_LIST",
                    payload: error,
                    status: "Failed",
                });
            });
    };
};

export const DepositOutstanding = (data) => {
    var authUser = JSON.parse(localStorage.getItem("authUser"));

    var url = `${process.env.REACT_APP_LOCALHOST}/deposit-selected-current-list`;
    return dispatch => {
        const headers = {
            "Content-Type": "application/json",

            "Access-Control-Allow-Origin": "*",

            Authorization: "Bearer " + authUser.token,
        };
        const formData = { data };
        axios
            .post(url, formData, { headers: headers })
            .then(response => {
                dispatch({
                    type: "DEPOSIT_OUTSTANDING",
                    payload: response.data,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: "DEPOSIT_OUTSTANDING",
                    payload: error,
                    status: "Failed",
                });
            });
    };
};

export const DepositOutstandingFresh = () => {
    return dispatch =>
        dispatch({
            type: "DEPOSIT_OUTSTANDING_FRESH",
            status: false,
        });
};

export const DepositOutstandingShow = () => {
    var authUser = JSON.parse(localStorage.getItem("authUser"));

    var url = `${process.env.REACT_APP_LOCALHOST}/banking-deposit-list-details`;
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
                    type: "DEPOSIT_OUTSTANDING_SHOW",
                    payload: response.data,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: "DEPOSIT_OUTSTANDING_SHOW",
                    payload: error,
                    status: "Failed",
                });
            });
    };
};

export const DepositOutstandingShowFresh = () => {
    return dispatch =>
        dispatch({
            type: "DEPOSIT_OUTSTANDING_SHOW_FRESH",
            status: false,
        });
};

export const OutstandingList = (month, year) => {
    var authUser = JSON.parse(localStorage.getItem("authUser"));

    var url = `${process.env.REACT_APP_LOCALHOST}/monthly-banking-deposit-list/${month}/${year}`;
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
                    type: "OUTSTANDING_LIST",
                    payload: response.data,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: "OUTSTANDING_LIST",
                    payload: error,
                    status: "Failed",
                });
            });
    };
};

export const DepositOutstandingList = () => {
    var authUser = JSON.parse(localStorage.getItem("authUser"));

    var url = `${process.env.REACT_APP_LOCALHOST}/current-deposit`;
    return dispatch => {
        const headers = {
            "Content-Type": "application/json",

            "Access-Control-Allow-Origin": "*",

            Authorization: "Bearer " + authUser.token,
        };
        const formData = {};
        axios
            .post(url, formData, { headers: headers })
            .then(response => {
                dispatch({
                    type: "DEPOSIT_OUTSTANDING_LIST",
                    payload: response.data,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: "DEPOSIT_OUTSTANDING_LIST",
                    payload: error,
                    status: "Failed",
                });
            });
    };
};

export const DepositOutstandingListFresh = () => {
    return dispatch =>
        dispatch({
            type: "DEPOSIT_OUTSTANDING_LIST_FRESH",
            status: false,
        });
};

export const DepositOutstandingOneListData = (id) => {
    var authUser = JSON.parse(localStorage.getItem("authUser"));

    var url = `${process.env.REACT_APP_LOCALHOST}/current-deposit-list/${id}`;
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
                    type: "DEPOSIT_OUTSTANDING_ONE_LIST",
                    payload: response.data,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: "DEPOSIT_OUTSTANDING_ONE_LIST",
                    payload: error,
                    status: "Failed",
                });
            });
    };
};

export const CancelDeposit = (data) => {
    var authUser = JSON.parse(localStorage.getItem("authUser"));

    var url = `${process.env.REACT_APP_LOCALHOST}/cancelLastDiposit`;
    return dispatch => {
        const headers = {
            "Content-Type": "application/json",

            "Access-Control-Allow-Origin": "*",

            Authorization: "Bearer " + authUser.token,
        };
        axios
            .post(url, data, { headers: headers })
            .then(response => {
                dispatch({
                    type: "CANCEL_DEPOSIT",
                    payload: response.data,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: "CANCEL_DEPOSIT",
                    payload: error,
                    status: "Failed",
                });
            });
    };
};
export const CancelDepositFresh = () => {
    return dispatch => {
        dispatch({
            type: "CANCEL_DEPOSIT_FRESH",
            payload: null,
            status: false,
        })
    };
};
export const lastDeposit = () => {
    var authUser = JSON.parse(localStorage.getItem("authUser"));

    var url = `${process.env.REACT_APP_LOCALHOST}/last-deposit`;
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
                    type: "LAST_DEPOSIT",
                    payload: response.data,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: "LAST_DEPOSIT",
                    payload: error,
                    status: "Failed",
                });
            });
    };
};