import axios from "axios";

const head = () => {
    let authUser = JSON.parse(localStorage.getItem("authUser"));
    return {
        "Content-Type": "application/json",

        "Access-Control-Allow-Origin": "*",

        Authorization: "Bearer " + authUser?.token,
    };
}

export const storeFee = (state, button) => {
    let url = `${process.env.REACT_APP_LOCALHOST}/fee/setting`;
    let headers = head();
    let formData = {
        display_name: state.fee_name,
        charging: state.propertyBtn === true ? "Ownership" : 'Folio',
        fee_type: state.selectedFeeType?.value,
        value: state.percentBtn === true ? "%" : '$',
        notes: state.notes,
        account_id: state.selectedAccount?.value,
        status: button.switch1,
        frequencyType: state.selectedFrequencyType?.value,
        month: state.selectedMonth?.value,
        dayOfMonth: state.selectedDate?.value,
        weekName: state.selectedWeekName?.value,
        time: state.time,
    }
    return dispatch => {
        axios
            .post(url, formData, { headers })
            .then(response => {
                dispatch({
                    type: 'STORE_FEE',
                    payload: response.data,
                    status: response.data.status
                })
            })
            .catch(error => {
                dispatch({
                    type: 'STORE_FEE',
                    payload: error,
                    status: 'Failed'
                })
            })
    }
}
export const storeFeeFresh = () => {
    return dispatch =>
        dispatch({
            type: "STORE_FEE_FRESH",
            error: null,
            status: false,
        });
};
export const getFees = () => {
    var url = `${process.env.REACT_APP_LOCALHOST}/fee/setting`;
    let headers = head();
    return dispatch => {
        axios
            .get(url, { headers })
            .then(response => {
                dispatch({
                    type: "GET_FEES",
                    payload: response.data,
                    status: response.data.status,
                });
            })
            .catch(error => {
                dispatch({
                    type: "GET_FEES",
                    payload: error,
                    status: "Failed",
                });
            });
    };
};
export const updateFee = (state, button, id) => {
    let url = `${process.env.REACT_APP_LOCALHOST}/fee/setting/${id}`;
    let headers = head();
    let formData = {
        display_name: state.fee_name,
        charging: state.propertyBtn === true ? "Ownership" : 'Folio',
        fee_type: state.selectedFeeType?.value,
        value: state.percentBtn === true ? "%" : '$',
        price: state.price,
        notes: state.notes,
        account_id: state.selectedAccount?.value,
        menu_id: button.switch3 === false ? null : state.selectedMenu?.value,
        status: button.switch1,
        frequencyType: state.selectedFrequencyType?.value,
        month: state.selectedMonth?.value,
        dayOfMonth: state.selectedDate?.value,
        weekName: state.selectedWeekName?.value,
        time: state.time,
    };
    return dispatch => {
        axios
            .put(url, formData, { headers })
            .then(
                response => {
                    dispatch({
                        type: 'UPDATE_FEE',
                        payload: response.data,
                        status: response.data.status
                    })
                }
            )
            .catch(
                error => {
                    dispatch({
                        type: 'UPDATE_FEE',
                        payload: error,
                        status: 'Failed'
                    })
                }
            )
    }
};
export const updateFeeFresh = () => {
    return dispatch =>
        dispatch({
            type: "UPDATE_FEE_FRESH",
            error: null,
            status: false,
        });
};
export const getOwnerShipFees = () => {
    var url = `${process.env.REACT_APP_LOCALHOST}/get/ownership/fees`;
    let headers = head();
    return dispatch => {
        axios
            .get(url, { headers })
            .then(response => {
                dispatch({
                    type: "GET_OWNERSHIP_FEES",
                    payload: response.data,
                    status: response.data.status,
                });
            })
            .catch(error => {
                dispatch({
                    type: "GET_OWNERSHIP_FEES",
                    payload: error,
                    status: "Failed",
                });
            });
    };
};
export const getFolioFees = () => {
    var url = `${process.env.REACT_APP_LOCALHOST}/get/folio/fees`;
    let headers = head();
    return dispatch => {
        axios
            .get(url, { headers })
            .then(response => {
                dispatch({
                    type: "GET_FOLIO_FEES",
                    payload: response.data,
                    status: response.data.status,
                });
            })
            .catch(error => {
                dispatch({
                    type: "GET_FOLIO_FEES",
                    payload: error,
                    status: "Failed",
                });
            });
    };
};
export const getOwnerFolioFees = (id) => {
    var url = `${process.env.REACT_APP_LOCALHOST}/get/owner/folio/fees/${id}`;
    let headers = head();
    return dispatch => {
        axios
            .get(url, { headers })
            .then(response => {
                dispatch({
                    type: "GET_OWNER_FOLIO_FEES",
                    payload: response.data,
                    status: 'Success',
                });
            })
            .catch(error => {
                dispatch({
                    type: "GET_OWNER_FOLIO_FEES",
                    payload: error,
                    status: "Failed",
                });
            });
    };
};

export const getOwnerFolioFeesFresh = () => {
    return dispatch =>
        dispatch({
            type: "GET_OWNER_FOLIO_FEES_FRESH",
            error: null,
            status: false,
        });
};