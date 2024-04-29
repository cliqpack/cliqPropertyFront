import {
  MODULE_ROUTE_LIST,
  MODULE_GET,
  MODULE_DELETE,
  MODULE_ROUTE_ADD,
  MODULE_EDIT_SUCCESS,
  MODULE_EDIT_FAILED,
  MODULE_ROUTE_DELETE,
  MODULE_ROUTE_ADD_FRESH,
  MODULE_EDIT_FRESH,
  MODULE_LIST_FRESH,
  MODULE_ROUTE_DELETE_FRESH,
  MODULE_ROUTE_LIST_FRESH,
} from "./actionTypes";

const initialState = {
  module_route_list_data: null,
  module_route_list_error: null,
  module_route_list_loading: false,

  module_get_data: null,
  module_get_error: null,
  module_get_loading: false,

  module_delete_data: null,
  module_delete_error: null,
  module_delete_loading: false,

  module_route_add_data: null,
  module_route_add_error: null,
  module_route_add_loading: false,

  module_edit_data: null,
  module_edit_error: null,
  module_edit_loading: false,

  module_route_delete_data: null,
  module_route_delete_error: null,
  module_route_delete_loading: false,
};

const module = (state = initialState, action) => {
 
  switch (action.type) {
    case MODULE_ROUTE_LIST:
      state = {
        ...state,
        module_route_list_data:
          action.status == "Success" ? action.payload : null,
        module_route_list_error:
          action.status == "Failed" ? action.payload : null,
        module_route_list_loading: action.status,
      };
      break;
    case MODULE_GET:
      state = {
        ...state,
        module_get_data: action.status == "Success" ? action.payload : null,
        module_get_error: action.status == "Failed" ? action.payload : null,
        module_get_loading: action.status,
      };
      break;
    case MODULE_DELETE:
      state = {
        ...state,
        module_delete_data: action.status == "Success" ? action.payload : null,
        module_delete_error: action.status == "Failed" ? action.payload : null,
        module_delete_loading: action.status,
      };
      break;
    case MODULE_ROUTE_ADD:
      state = {
        ...state,
        module_route_add_data:
          action.status == "Success" ? action.payload : null,
        module_route_add_error:
          action.status == "Failed" ? action.payload : null,
        module_route_add_loading: action.status,
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
    case MODULE_ROUTE_DELETE:
      state = {
        ...state,
        module_route_delete_data:
          action.status == "Success" ? action.payload : null,
        module_route_delete_error:
          action.status == "Failed" ? action.payload : null,
        module_route_delete_loading: action.status,
      };
      break;
    case MODULE_ROUTE_ADD_FRESH:
      state = {
        ...state,
        module_route_add_data: action.payload,
        module_route_add_error: action.error,
        module_route_add_loading: action.status,
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
    case MODULE_LIST_FRESH:
      state = {
        ...state,
        module_get_data: null,
        module_get_error: action.payload,
        module_get_loading: action.status,
      };
      break;
    case MODULE_ROUTE_DELETE_FRESH:
      state = {
        ...state,
        module_route_delete_data: null,
        module_route_delete_error: action.payload,
        module_route_delete_loading: action.status,
      };
      break;
    case MODULE_ROUTE_LIST_FRESH:
      state = {
        ...state,
        module_route_list_error: action.payload,
        module_route_list_loading: action.status,
      };
      break;
    default:
      state = { ...state };
      break;
  }
  return state;
};

export default module;
