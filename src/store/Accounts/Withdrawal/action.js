import axios from "axios";

export const eftBpayWithdraw = (data, type) => {
    var authUser = JSON.parse(localStorage.getItem("authUser"));
    var url = `${process.env.REACT_APP_LOCALHOST}/eft-bpay-withdraw`;
    const formData = { data, type };
    return dispatch => {
        const headers = {
            "Content-Type": "application/json",

            "Access-Control-Allow-Origin": "*",

            Authorization: "Bearer " + authUser.token,
        };
        axios
            .post(url, formData, { headers: headers })
            .then(response => {
                console.log(response);
                dispatch({
                    type: "EFT_WITHDRAWALS",
                    payload: response.data,
                    status: response.data.status,
                });
            })
            .catch(error => {
                dispatch({
                    type: "EFT_WITHDRAWALS",
                    payload: error,
                    status: "Failed",
                });
            });
    };
};

export const eftBpayWithdrawFresh = () => {
    return dispatch => {
        dispatch({
            type: "EFT_WITHDRAWALS_FRESH",
            payload: null,
            status: false,
        });
    };
};


export const chequeWithdraw = (data, type) => {
    var authUser = JSON.parse(localStorage.getItem("authUser"));
    var url = `${process.env.REACT_APP_LOCALHOST}/cheque-withdraw`;
    const formData = { data, type };
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
                    type: "CHEQUE_WITHDRAWALS",
                    payload: response.data,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: "CHEQUE_WITHDRAWALS",
                    payload: error,
                    status: "Failed",
                });
            });
    };
};

export const chequeWithdrawFresh = () => {
    return dispatch => {
        dispatch({
            type: "CHEQUE_WITHDRAWALS_FRESH",
            payload: null,
            status: false,
        });
    };
};

export const onlyBpayWithdraw = (data, type) => {
    var authUser = JSON.parse(localStorage.getItem("authUser"));
    var url = `${process.env.REACT_APP_LOCALHOST}/only-bpay-withdraw`;
    const formData = { data, type };
    return dispatch => {
        const headers = {
            "Content-Type": "application/json",

            "Access-Control-Allow-Origin": "*",

            Authorization: "Bearer " + authUser.token,
        };
        axios
            .post(url, formData, { headers: headers })
            .then(response => {
                console.log(response);
                dispatch({
                    type: "EFT_WITHDRAWALS",
                    payload: response.data,
                    status: response.data.status,
                });
            })
            .catch(error => {
                dispatch({
                    type: "EFT_WITHDRAWALS",
                    payload: error,
                    status: "Failed",
                });
            });
    };
};