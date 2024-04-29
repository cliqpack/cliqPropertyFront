import axios from "axios";
import { head } from "store/common/ApiHeader";

export const planList = () => {
    let headers = head();
    let url = `${process.env.REACT_APP_LOCALHOST}/menu-plan`;
    return dispatch => {
        axios
            .get(url, { headers: headers })
            .then(
                response => {
                    dispatch({
                        type: 'PLAN_LIST',
                        payload: response.data,
                        status: 'Success'
                    })
                }
            )
            .catch(
                error => {
                    dispatch({
                        type: 'PLAN_LIST',
                        payload: error,
                        status: 'Failed'
                    })
                }
            )
    }
};
export const planListFresh = () => {
    return dispatch =>
        dispatch({
            type: "PLAN_LIST_FRESH",
            error: null,
            status: false,
        });
};
export const storePlan = (state, menus, price) => {
    let headers = head();
    let url = `${process.env.REACT_APP_LOCALHOST}/menu-plan`;
    let formData = {
        name: state.name,
        details:state.details,
        price:price,
        frequency_type:state.selectedFrequencyType.value,
        menus:menus,
    };
    return dispatch => {
        axios
            .post(url, formData, { headers: headers })
            .then(
                response => {
                    dispatch({
                        type: 'PLAN_ADD',
                        payload: response.data,
                        status: 'Success'
                    })
                }
            )
            .catch(
                error => {
                    dispatch({
                        type: 'PLAN_ADD',
                        payload: error,
                        status: 'Failed'
                    })
                }
            )
    }
};
export const storePlanFresh = () => {
    return dispatch =>
        dispatch({
            type: "PLAN_ADD",
            error: null,
            status: false,
        });
};
export const deletePlan = (id) => {
    let headers = head();
    let url = `${process.env.REACT_APP_LOCALHOST}/menu-plan/`+id;
    return dispatch => {
        axios
            .delete(url, { headers: headers })
            .then(
                response => {
                    dispatch({
                        type: 'PLAN_DELETE',
                        payload: response,
                        status: 'Success'
                    })
                }
            )
            .catch(
                error => {
                    dispatch({
                        type: 'PLAN_DELETE',
                        payload: error,
                        status: 'Failed'
                    })
                }
            )
    }
};
export const deletePlanFresh = () => {
    return dispatch =>
        dispatch({
            type: "PLAN_DELETE",
            error: null,
            status: false,
        });
};
export const storeAddons = (state) => {
    let headers = head();
    let url = `${process.env.REACT_APP_LOCALHOST}/menu-price`;
    let formData = {
        menu_id: state.menu,
        price: state.price,
    };
    return dispatch => {
        axios
            .post(url, formData, { headers: headers })
            .then(
                response => {
                    dispatch({
                        type: 'STORE_ADDONS',
                        payload: response.data,
                        status: 'Success'
                    })
                }
            )
            .catch(
                error => {
                    dispatch({
                        type: 'STORE_ADDONS',
                        payload: error,
                        status: 'Failed'
                    })
                }
            )
    }
};
export const storeAddonsFresh = () => {
    return dispatch =>
        dispatch({
            type: "STORE_ADDONS_FRESH",
            error: null,
            status: false,
        });
};
export const addonList = () => {
    let headers = head();
    let url = `${process.env.REACT_APP_LOCALHOST}/update-invoice`;
    return dispatch => {
        axios
            .get(url, { headers: headers })
            .then(
                response => {
                    dispatch({
                        type: 'ADDONS_LIST',
                        payload: response.data,
                        status: 'Success'
                    })
                }
            )
            .catch(
                error => {
                    dispatch({
                        type: 'ADDONS_LIST',
                        payload: error,
                        status: 'Failed'
                    })
                }
            )
    }
};
export const deleteAddon = (id) => {
    let headers = head();
    let url = `${process.env.REACT_APP_LOCALHOST}/update-invoice`;
    return dispatch => {
        axios
            .delete(url, { headers: headers })
            .then(
                response => {
                    dispatch({
                        type: 'DELETE_ADDON',
                        payload: response.data,
                        status: 'Success'
                    })
                }
            )
            .catch(
                error => {
                    dispatch({
                        type: 'DELETE_ADDON',
                        payload: error,
                        status: 'Failed'
                    })
                }
            )
    }
};
export const ownerPlan = (id, proId) => {
    let headers = head();
    let url = `${process.env.REACT_APP_LOCALHOST}/owner-plan/${id}?proId=${proId}`;
    return dispatch => {
        axios
            .get(url, { headers: headers })
            .then(
                response => {
                    dispatch({
                        type: 'OWNER_PLAN',
                        payload: response.data,
                        status: 'Success'
                    })
                }
            )
            .catch(
                error => {
                    dispatch({
                        type: 'OWNER_PLAN',
                        payload: error,
                        status: 'Failed'
                    })
                }
            )
    }
}
export const getPlanSchedule = (id, planId, proId) => {
    let headers = head();
    let url = `${process.env.REACT_APP_LOCALHOST}/get/plan/schedule/${id}/${planId}?proId=${proId}`;
    return dispatch => {
        axios
            .get(url, { headers: headers })
            .then(
                response => {
                    dispatch({
                        type: 'GET_PLAN_SCHEDULE',
                        payload: response.data,
                        status: 'Success'
                    })
                }
            )
            .catch(
                error => {
                    dispatch({
                        type: 'GET_PLAN_SCHEDULE',
                        payload: error,
                        status: 'Failed'
                    })
                }
            )
    }
};

export const getPlanScheduleFresh = () => {
    return dispatch =>
        dispatch({
            type: "GET_PLAN_SCHEDULE_FRESH",
            status: false,
        });
};