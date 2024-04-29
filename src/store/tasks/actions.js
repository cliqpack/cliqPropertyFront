import axios from "axios";
import { GET_TASKS, GET_TASKS_FAIL, GET_TASKS_SUCCESS, TASK_ADD, TASK_ADD_FRESH, GET_TASK_INFO, GET_TASK_INFO_FRESH, EDIT_TASK, TASK_EDIT_FRESH, EDIT_TASK_STATUS, TASK_LEBEL, GET_TASK_LABEL_INFO, GET_TASK_LABEL_INFO_FRESH, TASK_FILE, TASK_DELETE, TASK_DELETE_FRESH, GET_ALL_TASK, SWAP_TASK, SWAP_TASK_FRESH, GET_ALL_DUE_TASK, GET_ALL_ACTIVE_TASK, GET_ALL_DUE_LATER_TASK, GET_ALL_DUE_TASK_FRESH, GET_ALL_ACTIVE_TASK_FRESH, GET_TASK_ACTIVITY, GET_ALL_DUE_LATER_TASK_FRESH, GET_ALL_CLOSED_TASK, GET_ALL_CLOSED_TASK_FRESH, } from "./actionTypes"

export const getTasks = () => ({
    type: GET_TASKS,
})

export const getTasksSuccess = tasks => ({
    type: GET_TASKS_SUCCESS,
    payload: tasks,
})

export const getTasksFail = error => ({
    type: GET_TASKS_FAIL,
    payload: error,
})

export const addTask = (task, propertyId, contactId) => {
    console.log(task);
    var authUser = JSON.parse(localStorage.getItem("authUser"));
    var url = `${process.env.REACT_APP_LOCALHOST}/tasks`;
    const headers = {
        "Content-Type": "application/json",

        "Access-Control-Allow-Origin": "*",

        Authorization: "Bearer " + authUser.token,
    };
    const formData = {
        property_id: propertyId ? propertyId : task.property,
        contact_id: contactId ? contactId : task.contact,
        manager_id: task.manager,
        due_by: task.duedate,
        summary: task.summary,
        description: task.description,
    };
    console.log(formData);
    return dispatch => {
        axios
            .post(url, formData, { headers: headers })
            .then(response => {
                dispatch({
                    type: TASK_ADD,
                    payload: response.data,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: TASK_ADD,
                    payload: error,
                    status: "Failed",
                });
            });
    }
};

export const addTaskFresh = () => {
    return dispatch =>
        dispatch({
            type: TASK_ADD_FRESH,
            status: false,
        });
};

export const getTaskInfo = id => {
    var authUser = JSON.parse(localStorage.getItem("authUser"));
    const newUrl = `${process.env.REACT_APP_LOCALHOST}`;
    let url = `${newUrl}/tasks/${id}`;
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
                    type: GET_TASK_INFO,
                    payload: response,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: GET_TASK_INFO,
                    error: error,
                    status: "Failed",
                });
            });
    };
};

export const getTaskInfoFresh = () => {
    return dispatch =>
        dispatch({
            type: GET_TASK_INFO_FRESH,
            payload: null,
            error: null,
            status: false,
        });
};

export const editTask = (task, id) => {
    console.log(task, id);
    var authUser = JSON.parse(localStorage.getItem("authUser"));
    var url = `${process.env.REACT_APP_LOCALHOST}/tasks/${id}`;
    const headers = {
        "Content-Type": "application/json",

        "Access-Control-Allow-Origin": "*",

        Authorization: "Bearer " + authUser.token,
    };
    const formData = {
        property_id: task.property,
        contact_id: task.contact,
        manager_id: task.manager,
        due_by: task.due_by,
        summary: task.summary,
        description: task.description,
    };
    console.log(formData);
    // return;
    return dispatch => {
        axios
            .put(url, formData, { headers: headers })
            .then(response => {
                dispatch({
                    type: EDIT_TASK,
                    payload: response.data,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: EDIT_TASK,
                    payload: error,
                    status: "Failed",
                });
            });
    }
};

export const editTaskFresh = () => {
    return dispatch =>
        dispatch({
            type: TASK_EDIT_FRESH,
            payload: null,
            error: null,
            status: false,
        });
};

export const editTaskStatus = (status, complete_date, id) => {
    var authUser = JSON.parse(localStorage.getItem("authUser"));
    var url = `${process.env.REACT_APP_LOCALHOST}/task/status/update/${id}`;
    const headers = {
        "Content-Type": "application/json",

        "Access-Control-Allow-Origin": "*",

        Authorization: "Bearer " + authUser.token,
    };
    const formData = { status, complete_date };
    console.log(formData);
    return dispatch => {
        axios
            .put(url, formData, { headers: headers })
            .then(response => {
                dispatch({
                    type: EDIT_TASK_STATUS,
                    payload: response.data,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: EDIT_TASK_STATUS,
                    payload: error,
                    status: "Failed",
                });
            });
    }
};

export const editTaskStatusFresh = () => {
    return dispatch =>
        dispatch({
            type: EDIT_TASK_STATUS,
            payload: null,
            status: false,
        });
};

export const taskLebelInsert = (task_id, lebels) => {
    var authUser = JSON.parse(localStorage.getItem("authUser"));
    const newUrl = process.env.REACT_APP_LOCALHOST;
    var url = newUrl + "/task/label";
    const headers = {
        "Content-Type": "application/json",

        "Access-Control-Allow-Origin": "*",

        Authorization: "Bearer " + authUser.token,
    };

    const formData = {
        task_id: task_id,
        label: lebels,
    }

    console.log(formData);

    return dispatch => {
        axios
            .post(url, formData, { headers: headers })
            .then(response => {
                dispatch(getTaskInfo(task_id));
            })
            .catch(error => {
                dispatch({
                    type: TASK_LEBEL,
                    error: error,
                    status: "Failed",
                });
            });
    };
}

export const getTaskLabelInfo = id => {
    var authUser = JSON.parse(localStorage.getItem("authUser"));
    const newUrl = `${process.env.REACT_APP_LOCALHOST}`;
    let url = `${newUrl}/task/label/${id}`;
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
                    type: GET_TASK_LABEL_INFO,
                    payload: response,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: GET_TASK_LABEL_INFO,
                    error: error,
                    status: "Failed",
                });
            });
    };
};

export const getTaskLabelInfoFresh = () => {
    return dispatch =>
        dispatch({
            type: GET_TASK_LABEL_INFO_FRESH,
            payload: null,
            error: null,
            status: false,
        });
};

export const updateTaskFile = (file, id) => {
    var authUser = JSON.parse(localStorage.getItem("authUser"));
    let url = process.env.REACT_APP_LOCALHOST + "/upload/task/doc";
    return dispatch => {
        const headers = {
            "Content-Type": "application/json",

            "Access-Control-Allow-Origin": "*",

            Authorization: "Bearer " + authUser.token,
        };
        let formData = new FormData();
        console.log(file);
        formData.append("image", file);
        formData.append("id", id);

        axios
            .post(url, formData, { headers: headers })
            .then(response => {
                dispatch(getTaskInfo(id));
            })
            .catch(error => {
                dispatch({
                    type: TASK_FILE,
                    payload: error,
                    status: "Failed",
                });
            });
    };
};

export const deleteTask = (id) => {
    var authUser = JSON.parse(localStorage.getItem("authUser"));
    let url = `${process.env.REACT_APP_LOCALHOST}/tasks/${id}`;
    return dispatch => {
        const headers = {
            "Content-Type": "application/json",

            "Access-Control-Allow-Origin": "*",

            Authorization: "Bearer " + authUser.token,
        };

        axios
            .delete(url, { headers: headers })
            .then(response => {
                dispatch({
                    type: TASK_DELETE,
                    payload: response,
                    status: 'Success'
                });
            })
            .catch(error => {
                dispatch({
                    type: TASK_DELETE,
                    payload: error,
                    status: "Failed",
                });
            });
    };
};

export const deleteTaskFresh = () => {
    return dispatch =>
        dispatch({
            type: TASK_DELETE_FRESH,
            payload: null,
            error: null,
            status: false,
        });
};

export const getAllTask = () => {
    var authUser = JSON.parse(localStorage.getItem("authUser"));
    const newUrl = `${process.env.REACT_APP_LOCALHOST}`;
    let url = `${newUrl}/tasks`;
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
                    type: GET_ALL_TASK,
                    payload: response,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: GET_ALL_TASK,
                    error: error,
                    status: "Failed",
                });
            });
    };
};

export const getAllDueTask = (page, sizePerPage, search = null, sortField = null, sortValue = null) => {


    var authUser = JSON.parse(localStorage.getItem("authUser"));
    const newUrl = `${process.env.REACT_APP_LOCALHOST}`;
    let url = `${newUrl}/dueTask?page=${page}&sizePerPage=${sizePerPage}&q=${search}&sortField=${sortField}&sortValue=${sortValue}`;
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
                    type: GET_ALL_DUE_TASK,
                    payload: response,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: GET_ALL_DUE_TASK,
                    error: error,
                    status: "Failed",
                });
            });
    };
};

export const allDueTaskFresh = () => {
    return dispatch =>
        dispatch({
            type: GET_ALL_DUE_TASK_FRESH,
            status: false,
        });
};

export const getAllActiveTask = (page, sizePerPage, search = null, sortField = null, sortValue = null) => {
    var authUser = JSON.parse(localStorage.getItem("authUser"));
    const newUrl = `${process.env.REACT_APP_LOCALHOST}`;
    // let url = `${newUrl}/activeTask?page=${page}&sizePerPage=${sizePerPage}&q=${search}&sortField=${sortField}&sortValue=${sortValue}`;
    let url = `${newUrl}/activeTask-ssr?page=${page}&sizePerPage=${sizePerPage}&q=${search}&sortField=${sortField}&sortValue=${sortValue}`;
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
                    type: GET_ALL_ACTIVE_TASK,
                    payload: response,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: GET_ALL_ACTIVE_TASK,
                    error: error,
                    status: "Failed",
                });
            });
    };
};

export const allActiveTaskFresh = () => {
    return dispatch =>
        dispatch({
            type: GET_ALL_ACTIVE_TASK_FRESH,
            status: false,
        });
};

export const getAllDueLaterTask = (page, sizePerPage, search = null, sortField = null, sortValue = null) => {
    var authUser = JSON.parse(localStorage.getItem("authUser"));
    const newUrl = `${process.env.REACT_APP_LOCALHOST}`;
    let url = `${newUrl}/dueLaterTaskSsr?page=${page}&sizePerPage=${sizePerPage}&q=${search}&sortField=${sortField}&sortValue=${sortValue}`;
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
                    type: GET_ALL_DUE_LATER_TASK,
                    payload: response,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: GET_ALL_DUE_LATER_TASK,
                    error: error,
                    status: "Failed",
                });
            });
    };
};


export const getAllDueLaterTaskFresh = () => {
    return dispatch =>
        dispatch({
            type: GET_ALL_DUE_LATER_TASK_FRESH,
            // payload: null,
            error: null,
            status: false,
        });
};

export const getAllTaskFresh = () => {
    return dispatch =>
        dispatch({
            type: 'GET_ALL_TASK_FRESH',
            // payload: null,
            error: null,
            status: false,
        });
};


export const swapTask = (item_id, from, to) => {

    console.log(item_id, from, to);

    var authUser = JSON.parse(localStorage.getItem("authUser"));
    var url = `${process.env.REACT_APP_LOCALHOST}/task/kanban/change/status/update/${item_id}`;
    const headers = {
        "Content-Type": "application/json",

        "Access-Control-Allow-Origin": "*",

        Authorization: "Bearer " + authUser.token,
    };
    const formData = {
        item_id: item_id,
        from: from,
        to: to,

    };
    return dispatch => {
        axios
            .put(url, formData, { headers: headers })
            .then(response => {
                dispatch({
                    type: SWAP_TASK,
                    payload: response.data,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: SWAP_TASK,
                    payload: error,
                    status: "Failed",
                });
            });
    }
};


export const swapTaskFresh = () => {
    return dispatch =>
        dispatch({
            type: SWAP_TASK_FRESH,
            payload: null,
            error: null,
            status: false,
        });
};

export const getTaskAllActivity = id => {
    var authUser = JSON.parse(localStorage.getItem("authUser"));
    const newUrl = `${process.env.REACT_APP_LOCALHOST}`;
    let url = `${newUrl}/task/activity/${id}`;
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
                    type: GET_TASK_ACTIVITY,
                    payload: response,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: GET_TASK_ACTIVITY,
                    error: error,
                    status: "Failed",
                });
            });
    };
};

export const getClosedTask = (page, sizePerPage, search = null, sortField = null, sortValue = null) => {
    var authUser = JSON.parse(localStorage.getItem("authUser"));

    let url = `${process.env.REACT_APP_LOCALHOST}/closedTask-ssr?page=${page}&sizePerPage=${sizePerPage}&q=${search}&sortField=${sortField}&sortValue=${sortValue}`;
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
                    type: GET_ALL_CLOSED_TASK,
                    payload: response,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: GET_ALL_CLOSED_TASK,
                    error: error,
                    status: "Failed",
                });
            });
    };
};


export const getClosedTaskFresh = () => {
    return dispatch =>
        dispatch({
            type: GET_ALL_CLOSED_TASK_FRESH,
            error: null,
            status: false,
        });
};