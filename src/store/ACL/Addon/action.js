import axios from "axios";

export const storeAddon = (state, button) => {
    let authUser = JSON.parse(localStorage.getItem('authUser'));
    let url = `${process.env.REACT_APP_LOCALHOST}/addons`;
    let formData = {
        display_name: button.switch3 === false ? state.fee_name : state.selectedMenu?.label,
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
        const headers = {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: "Bearer " + authUser.token,
        }

        axios
            .post(url, formData, { headers: headers })
            .then(
                response => {
                    dispatch({
                        type: 'STORE_ADDON',
                        payload: response.data,
                        status: 'Success'
                    })
                }
            )
            .catch(
                error => {
                    dispatch({
                        type: 'STORE_ADDON',
                        payload: error,
                        status: 'Failed'
                    })
                }
            )
    }
};

export const storeAddonFresh = () => {
    return dispatch =>
        dispatch({
            type: "STORE_ADDON_FRESH",
            error: null,
            status: false,
        });
};

export const editAddon = (state, button, id) => {
    let authUser = JSON.parse(localStorage.getItem('authUser'));
    let url = `${process.env.REACT_APP_LOCALHOST}/addons/${id}`;
    let formData = {
        display_name: (button.switch3 === false || state.selectedMenu?.label === '') ? state.fee_name : state.selectedMenu?.label,
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
        const headers = {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: "Bearer " + authUser.token,
        }

        axios
            .put(url, formData, { headers: headers })
            .then(
                response => {
                    dispatch({
                        type: 'EDIT_ADDON',
                        payload: response.data,
                        status: 'Success'
                    })
                }
            )
            .catch(
                error => {
                    dispatch({
                        type: 'EDIT_ADDON',
                        payload: error,
                        status: 'Failed'
                    })
                }
            )
    }
};

export const editAddonFresh = () => {
    return dispatch =>
        dispatch({
            type: "EDIT_ADDON_FRESH",
            error: null,
            status: false,
        });
};

export const getAddons = () => {
    let authUser = JSON.parse(localStorage.getItem('authUser'));
    let url = `${process.env.REACT_APP_LOCALHOST}/addons`;
    return dispatch => {
        const headers = {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: "Bearer " + authUser.token,
        }

        axios
            .get(url, { headers: headers })
            .then(
                response => {
                    dispatch({
                        type: 'GET_ADDONS',
                        payload: response.data,
                        status: 'Success'
                    })
                }
            )
            .catch(
                error => {
                    dispatch({
                        type: 'GET_ADDONS',
                        payload: error,
                        status: 'Failed'
                    })
                }
            )
    }
};

export const getAddonsFresh = () => {
    return dispatch =>
        dispatch({
            type: "GET_ADDONS_FRESH",
            error: null,
            status: false,
        });
};

export const getPlanAddons = (folioId, proId) => {
    let authUser = JSON.parse(localStorage.getItem('authUser'));
    let url = `${process.env.REACT_APP_LOCALHOST}/owner/plan/${folioId}?proId=${proId}`;
    return dispatch => {
        const headers = {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: "Bearer " + authUser.token,
        }

        axios
            .get(url, { headers: headers })
            .then(
                response => {
                    dispatch({
                        type: 'GET_OWNER_PLAN_ADDONS',
                        payload: response.data,
                        status: 'Success'
                    })
                }
            )
            .catch(
                error => {
                    dispatch({
                        type: 'GET_OWNER_PLAN_ADDONS',
                        payload: error,
                        status: 'Failed'
                    })
                }
            )
    }
};

export const getPlanAddonsFresh = () => {
    return dispatch =>
        dispatch({
            type: "GET_OWNER_PLAN_ADDONS_FRESH",
            error: null,
            status: false,
        });
};
export const getActiveAddons = () => {
    let authUser = JSON.parse(localStorage.getItem('authUser'));
    let url = `${process.env.REACT_APP_LOCALHOST}/active-addon`;
    return dispatch => {
        const headers = {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: "Bearer " + authUser.token,
        }

        axios
            .get(url, { headers: headers })
            .then(
                response => {
                    dispatch({
                        type: 'GET_ACTIVE_ADDONS',
                        payload: response.data,
                        status: 'Success'
                    })
                }
            )
            .catch(
                error => {
                    dispatch({
                        type: 'GET_ACTIVE_ADDONS',
                        payload: error,
                        status: 'Failed'
                    })
                }
            )
    }
};

export const getActiveAddonsFresh = () => {
    return dispatch =>
        dispatch({
            type: "GET_ACTIVE_ADDONS_FRESH",
            error: null,
            status: false,
        });
};