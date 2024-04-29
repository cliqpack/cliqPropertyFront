import {
  ROLE_LIST,
  MODULE_GET_SUCCESS,
  MODULE_GET_FAILED,
  ROLE_ADD,
  ROLE_ASSIGN,
  MODULE_EDIT_SUCCESS,
  MODULE_EDIT_FAILED,
  ROLE_DELETE,
  ROLE_ADD_FRESH,
  ROLE_DELETE_FRESH,
  ROLE_ASSIGN_FRESH,
  MODULE_EDIT_FRESH,
  MODULE_LIST_FRESH,
} from "./actionTypes";

const initialState = {
  role_list_data: null,
  role_list_error: null,
  role_list_loading: false,

  module_get_data: null,
  module_get_error: null,
  module_get_loading: false,

  role_add_data: null,
  role_add_error: null,
  role_add_loading: false,

  module_edit_data: null,
  module_edit_error: null,
  module_edit_loading: false,

  role_assign_data: null,
  role_assign_error: null,
  role_assign_loading: false,

  role_delete_data: null,
  role_delete_error: null,
  role_delete_loading: false,
};

const role = (state = initialState, action) => {

  switch (action.type) {
    case ROLE_LIST:
      state = {
        ...state,
        role_list_data: action.status == "Success" ? action.payload : null,
        role_list_error: action.status == "Failed" ? action.payload : null,
        role_list_loading: action.status,
      };
      break;
    case MODULE_GET_SUCCESS:
      state = {
        ...state,
        module_get_data: action.payload,
        module_get_error: null,
        module_get_loading: action.status,
      };
      break;
    case MODULE_GET_FAILED:
      state = {
        ...state,
        module_get_data: null,
        module_get_error: action.payload,
        module_get_loading: action.status,
      };
      break;
    case ROLE_ADD:
      state = {
        ...state,
        role_add_data: action.status == "Success" ? action.payload : null,
        role_add_error: action.status == "Failed" ? action.payload : null,
        role_add_loading: action.status,
      };
      break;
    case ROLE_ASSIGN:
      state = {
        ...state,
        role_assign_data: action.status == "Success" ? action.payload : null,
        role_assign_error: action.status == "Failed" ? action.payload : null,
        role_assign_loading: action.status,
      };
      break;
    case MODULE_EDIT_SUCCESS:
      state = {
        ...state,
        module_edit_data: action.payload,
        module_edit_error: null,
        module_edit_loading: action.status,
      };
      break;
    case MODULE_EDIT_FAILED:
      state = {
        ...state,
        module_edit_data: null,
        module_edit_error: action.payload,
        module_edit_loading: action.status,
      };
      break;
    case ROLE_DELETE:
      state = {
        ...state,
        role_delete_data: action.status == "Success" ? action.payload : null,
        role_delete_error: action.status == "Failed" ? action.payload : null,
        role_delete_loading: action.status,
      };
      break;
    case ROLE_ADD_FRESH:
      state = {
        ...state,
        role_add_data: action.payload,
        role_add_error: action.error,
        role_add_loading: action.status,
      };
      break;
    case MODULE_EDIT_FRESH:
      state = {
        ...state,
        module_edit_data: null,
        module_edit_error: action.payload,
        module_edit_loading: action.status,
      };
      break;
    case ROLE_DELETE_FRESH:
      state = {
        ...state,
        role_delete_data: null,
        role_delete_error: action.payload,
        role_delete_loading: action.status,
      };
      break;
    case ROLE_ASSIGN_FRESH:
      state = {
        ...state,
        role_assign_data: action.payload,
        role_assign_error: action.error,
        role_assign_loading: action.status,
      };
      break;
    case MODULE_LIST_FRESH:
      state = {
        ...state,
        role_list_error: action.payload,
        role_list_loading: action.status,
      };
      break;
    default:
      state = { ...state };
      break;
  }
  return state;
};

export default role;
