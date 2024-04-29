import axios from "axios";

export const prmList = () => {
    let authUser = JSON.parse(localStorage.getItem('authUser'));
    let url = `${process.env.REACT_APP_LOCALHOST}/pre-requisite-menu`;

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
                        type: 'PRM_LIST',
                        payload: response.data,
                        status: 'Success'
                    })
                }
            )
            .catch(
                error => {
                    dispatch({
                        type: 'PRM_LIST',
                        payload: error,
                        status: 'Failed'
                    })
                }
            )
    }
};
export const prmListFresh = () => {
    return dispatch =>
        dispatch({
            type: "PRM_LIST",
            payload: null,
            error: null,
            status: false,
        });
};
export const storePrm = (state, menus) => {
    let authUser = JSON.parse(localStorage.getItem('authUser'));
    let url = `${process.env.REACT_APP_LOCALHOST}/pre-requisite-menu`;
    // let formData = {
    //     menu_id: state.menu,
    //     prm: menus,
    // };
    let formData = {
        addon_id: state.value,
        prm: menus,
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
                        type: 'PRM_ADD',
                        payload: response.data,
                        status: 'Success'
                    })
                }
            )
            .catch(
                error => {
                    dispatch({
                        type: 'PRM_ADD',
                        payload: error,
                        status: 'Failed'
                    })
                }
            )
    }
};

export const storePrmFresh = () => {
    return dispatch =>
        dispatch({
            type: "PRM_ADD",
            error: null,
            status: false,
        });
};

export const deletePrm = (id) => {
    let authUser = JSON.parse(localStorage.getItem('authUser'));
    let url = `${process.env.REACT_APP_LOCALHOST}/pre-requisite-menu/` + id;


    return dispatch => {
        const headers = {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: "Bearer " + authUser.token,
        }

        axios
            .delete(url, { headers: headers })
            .then(
                response => {
                    dispatch(prmList())
                }
            )
            .catch(
                error => {
                    dispatch({
                        type: 'PRM_ADD',
                        payload: error,
                        status: 'Failed'
                    })
                }
            )
    }
};

