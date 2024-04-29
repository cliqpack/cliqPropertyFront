import axios from "axios";

export const userPlanList = () => {
    let authUser = JSON.parse(localStorage.getItem('authUser'));
    let url = `${process.env.REACT_APP_LOCALHOST}/user-plan`;

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
                        type: 'USER_PLAN_LIST',
                        payload: response.data,
                        status: 'Success'
                    })
                }
            )
            .catch(
                error => {
                    dispatch({
                        type: 'USER_PLAN_LIST',
                        payload: error,
                        status: 'Failed'
                    })
                }
            )
    }
};

export const storeUserPlan = (state) => {
    let authUser = JSON.parse(localStorage.getItem('authUser'));
    let url = `${process.env.REACT_APP_LOCALHOST}/user-plan`;
    let formData = {
        user: state.user,
        plan:state.plan,
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
                        type: 'USER_PLAN_ADD',
                        payload: response.data,
                        status: 'Success'
                    })
                }
            )
            .catch(
                error => {
                    dispatch({
                        type: 'USER_PLAN_ADD',
                        payload: error,
                        status: 'Failed'
                    })
                }
            )
    }
};

export const storeUserPlanFresh = () => {
    return dispatch =>
        dispatch({
            type: "USER_PLAN_ADD",
            error: null,
            status: false,
        });
};

export const deleteUserPlan = (id) => {
    let authUser = JSON.parse(localStorage.getItem('authUser'));
    let url = `${process.env.REACT_APP_LOCALHOST}/user-plan/`+id;
    

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
                    dispatch(userPlanList())
                }
            )
            .catch(
                error => {
                    dispatch({
                        type: 'USER_PLAN_ADD',
                        payload: error,
                        status: 'Failed'
                    })
                }
            )
    }
};
