import TaskAdd from "pages/Task/TaskAdd";
import {
  GET_TASKS_SUCCESS,
  GET_TASKS_FAIL,
  TASK_ADD,
  TASK_ADD_FRESH,
  GET_TASK_INFO,
  GET_TASK_INFO_FRESH,
  EDIT_TASK,
  TASK_EDIT_FRESH,
  EDIT_TASK_STATUS,
  TASK_LEBEL,
  GET_TASK_LABEL_INFO,
  GET_TASK_LABEL_INFO_FRESH,
  TASK_FILE,
  TASK_DELETE,
  TASK_DELETE_FRESH,
  GET_ALL_TASK,
  SWAP_TASK,
  SWAP_TASK_FRESH,
  GET_ALL_DUE_TASK,
  GET_ALL_ACTIVE_TASK,
  GET_ALL_DUE_LATER_TASK,
  GET_ALL_DUE_TASK_FRESH,
  GET_ALL_ACTIVE_TASK_FRESH,
  GET_TASK_ACTIVITY,
  GET_ALL_DUE_LATER_TASK_FRESH,
  GET_ALL_CLOSED_TASK,
  GET_ALL_CLOSED_TASK_FRESH,
} from "./actionTypes";

const INIT_STATE = {
  tasks: [],
  error: {},
};
const initialState = {
  add_task: null,
  add_task_loading: false,

  get_task_info: null,
  get_task_info_error: null,
  get_task_info_loading: false,

  edit_task: null,
  edit_task_loading: false,

  edit_task_status_loading: false,

  get_task_label_info: null,
  get_task_label_info_error: null,
  get_task_label_info_loading: false,
  task_delete_loading: false,

  all_task: null,
  all_task_error: null,
  all_task_loading: false,

  all_due_task: null,
  all_due_task_error: null,
  all_due_task_loading: false,

  all_active_task: null,
  all_active_task_error: null,
  all_active_task_loading: false,

  all_due_later_task: null,
  all_due_later_task_error: null,
  all_due_later_task_loading: false,

  swap_task: null,
  swap_task_error: null,
  swap_task_loading: false,

  all_closed_task: null,
  all_closed_task_error: null,
  all_closed_task_loading: false,
};

const tasks = (state = initialState, action) => {
  switch (action.type) {
    case GET_TASKS_SUCCESS:
      return {
        ...state,
        tasks: action.payload,
      };

    case GET_TASKS_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case TASK_ADD:
      return {
        ...state,
        add_task: action.payload,
        add_task_loading: action.status,
      };
    case TASK_ADD_FRESH:
      return {
        ...state,
        add_task_loading: action.status,
      };
    case GET_TASK_INFO:
      return {
        ...state,
        get_task_info: action.payload,
        get_task_info_error: action.error,
        get_task_info_loading: action.status,
      };

    case GET_TASK_INFO_FRESH:
      return {
        ...state,
        get_task_info: action.payload,
        get_task_info_error: action.error,
        get_task_info_loading: action.status,
      };

    case EDIT_TASK:
      return {
        ...state,
        edit_task: action.payload,
        edit_task_loading: action.status,
      };
    case TASK_EDIT_FRESH:
      return {
        ...state,
        edit_task: action.payload,
        edit_task_loading: action.status,
      };
    case EDIT_TASK_STATUS:
      return {
        ...state,
        edit_task_status_loading: action.status,
      };
    case GET_TASK_LABEL_INFO:
      return {
        ...state,
        get_task_label_info: action.payload,
        get_task_label_info_error: action.error,
        get_task_label_info_loading: action.status,
      };
    case GET_TASK_LABEL_INFO_FRESH:
      return {
        ...state,
        get_task_label_info: action.payload,
        get_task_label_info_error: action.error,
        get_task_label_info_loading: action.status,
      };
    case TASK_DELETE:
      return {
        ...state,
        task_delete_loading: action.status,
      };
    case TASK_DELETE_FRESH:
      return {
        ...state,
        task_delete_loading: action.status,
      };
    case GET_ALL_TASK:
      return {
        ...state,
        all_task: action.payload,
        all_task_error: action.error,
        all_task_loading: action.status,
      };

    case GET_ALL_DUE_TASK:
      return {
        ...state,
        all_due_task: action.payload,
        all_due_task_error: action.error,
        all_due_task_loading: action.status,
      };

    case GET_ALL_DUE_TASK_FRESH:
      return {
        ...state,
        all_due_task_loading: action.status,
      };

    case GET_ALL_ACTIVE_TASK:
      return {
        ...state,
        all_active_task: action.payload,
        all_active_task_error: action.error,
        all_active_task_loading: action.status,
      };

    case GET_ALL_ACTIVE_TASK_FRESH:
      return {
        ...state,
        all_active_task_loading: action.status,
      };

    case GET_ALL_DUE_LATER_TASK:
      return {
        ...state,
        all_due_later_task: action.payload,
        all_due_later_task_error: action.error,
        all_due_later_task_loading: action.status,
      };
    case GET_ALL_DUE_LATER_TASK_FRESH:
      return {
        ...state,
        all_due_later_task_loading: action.status,
      };
    case GET_ALL_CLOSED_TASK:
      return {
        ...state,
        all_closed_task: action.payload,
        all_closed_task_error: action.error,
        all_closed_task_loading: action.status,
      };
    case GET_ALL_CLOSED_TASK_FRESH:
      return {
        ...state,
        all_closed_task_loading: action.status,
      };
    case "GET_ALL_TASK_FRESH":
      return {
        ...state,
        all_task: action.payload,
        all_task_error: action.error,
        all_task_loading: action.status,
      };

    case SWAP_TASK:
      return {
        ...state,
        swap_task: action.payload,
        swap_task_error: action.error,
        swap_task_loading: action.status,
      };
    case SWAP_TASK_FRESH:
      return {
        ...state,
        swap_task_loading: action.status,
      };
    case GET_TASK_ACTIVITY:
      return {
        ...state,
        task_all_activity: action.payload,
        task_all_activity_error: action.error,
        task_all_activity_loading: action.status,
      };
    default:
      return state;
  }
};

export default tasks;
