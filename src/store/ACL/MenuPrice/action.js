import axios from "axios";

export const menuPriceList = () => {
    let authUser = JSON.parse(localStorage.getItem('authUser'));
    let url = `${process.env.REACT_APP_LOCALHOST}/menu-price`;

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
                        type: 'MENU_PRICE_LIST',
                        payload: response.data,
                        status: 'Success'
                    })
                }
            )
            .catch(
                error => {
                    dispatch({
                        type: 'MENU_PRICE_LIST',
                        payload: error,
                        status: 'Failed'
                    })
                }
            )
    }
};
export const AddMenuPrice = (state) => {
    let authUser = JSON.parse(localStorage.getItem('authUser'));
    let url = `${process.env.REACT_APP_LOCALHOST}/menu-price`;
    let formData = {
        menu_id: state.menu,
        price:state.price
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
                        type: 'MENU_PRICE_ADD',
                        payload: response.data,
                        status: 'Success'
                    })
                }
            )
            .catch(
                error => {
                    dispatch({
                        type: 'MENU_PRICE_ADD',
                        payload: error,
                        status: 'Failed'
                    })
                }
            )
    }
};

export const addMenuPriceFresh = () => {
    return dispatch =>
        dispatch({
            type: "MENU_PRICE_ADD",
            error: null,
            status: false,
        });
};

export const getMenuPrice = (id) => {
    let authUser = JSON.parse(localStorage.getItem('authUser'));
    let url = `${process.env.REACT_APP_LOCALHOST}/menu-price/${id}`;
    

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
                        type: 'GET_MENU_PRICE',
                        payload: response.data,
                        status: 'Success'
                    })
                }
            )
            .catch(
                error => {
                    dispatch({
                        type: 'GET_MENU_PRICE',
                        payload: error,
                        status: 'Failed'
                    })
                }
            )
    }
};

// export const getMenuPriceFresh = () => {
//     console.log("in");
//     return dispatch =>
//         dispatch({
//             type: 'GET_MENU_PRICE_FRESH',
//             payload: null,
//             error: null,
//             status: false,
//         });
// };

export const getMenuPriceFresh = () => {
    return dispatch =>
        dispatch({
            type: "GET_MENU_PRICE_FRESH",
            status: false,
        });
};


export const deleteMenuPrice = (id) => {
    let authUser = JSON.parse(localStorage.getItem('authUser'));
    let url = `${process.env.REACT_APP_LOCALHOST}/menu-price/`+id;
    

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
                    dispatch(menuPriceList())
                }
            )
            .catch(
                error => {
                    dispatch({
                        type: 'MENU_PRICE_ADD',
                        payload: error,
                        status: 'Failed'
                    })
                }
            )
    }
};

