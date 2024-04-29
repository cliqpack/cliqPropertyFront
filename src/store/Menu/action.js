import axios from "axios";

export const MenuListData = () => {
    let authUser = JSON.parse(localStorage.getItem('authUser'));
    var url = `${process.env.REACT_APP_LOCALHOST}/menu`;

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
                        type: 'MENU_LIST',
                        payload: response.data,
                        status: 'Success'
                    })
                }
            )
            .catch(
                error => {
                    dispatch({
                        type: 'MENU_LIST',
                        payload: error,
                        status: 'Failed'
                    })
                }
            )
    }
};

export const menuListDataFresh = () => {
    return dispatch =>
        dispatch({
            type: "MENU_LIST",
            payload: null,
            error: null,
            status: false,
        });
};

export const MenuListDataOT = (id) => {
    let authUser = JSON.parse(localStorage.getItem('authUser'));
    var url = `${process.env.REACT_APP_LOCALHOST}/menu-ot/${id}`;

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
                        type: 'MENU_LIST_OT',
                        payload: response.data,
                        status: 'Success'
                    })
                }
            )
            .catch(
                error => {
                    dispatch({
                        type: 'MENU_LIST_OT',
                        payload: error,
                        status: 'Failed'
                    })
                }
            )
    }
};

export const MenuListDataOTFresh = () => {
    return dispatch =>
        dispatch({
            type: "MENU_LIST_OT",
            status: false,
        });
}