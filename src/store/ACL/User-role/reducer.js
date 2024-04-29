import {
  USER_ROLE_LIST,
  ROLE_USER_ASSIGN,
  USER_ROLE_LIST_DATA,
  ROLE_USER_ASSIGN_FRESH,
  MODULE_EDIT_FRESH,
  MODULE_DELETE_FRESH,
  MODULE_LIST_FRESH,
} from "./actionTypes";

const initialState = {
  user_role_list_data: null,
  user_role_list_error: null,
  user_role_list_loading: false,

  user_role_assign_data: null,
  user_role_assign_error: null,
  user_role_assign_loading: false,

  user_role_list_data_data: null,
  user_role_list_data_error: null,
  user_role_list_data_loading: false,
};

const role = (state = initialState, action) => {
 
  switch (action.type) {
    case USER_ROLE_LIST:
      state = {
        ...state,
        user_role_list_data: action.status == "Success" ? action.payload : null,
        user_role_list_error: action.status == "Failed" ? action.payload : null,
        user_role_list_loading: action.status,
      };
      break;
    case ROLE_USER_ASSIGN:
      state = {
        ...state,
        user_role_assign_data: action.status == "Success" ? action.payload : null,
        user_role_assign_error: action.status == "Failed" ? action.payload : null,
        user_role_assign_loading: action.status,
      };
      break;
      case USER_ROLE_LIST_DATA:
        state = {
          ...state,
          user_role_list_data_data: action.status == "Success" ? action.payload : null,
          user_role_list_data_error: action.status == "Failed" ? action.payload : null,
          user_role_list_data_loading: action.status,
        };
        break;
    case ROLE_USER_ASSIGN_FRESH:
      state = {
        ...state,
        user_role_assign_data: action.payload,
        user_role_assign_error: action.error,
        user_role_assign_loading: action.status,
        user_role_list_data_loading:action.status
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
    case MODULE_DELETE_FRESH:
      state = {
        ...state,
        role_delete_data: null,
        role_delete_error: action.payload,
        role_delete_loading: action.status,
      };
      break;
    case MODULE_LIST_FRESH:
      state = {
        ...state,
        role_list_error: action.payload,
        role_list_loading: action.status,
      };
    case "USER_ROLES_DELETE":
      state ={
        ...state,
        user_role_list_data_loading:false
      }
      break;
    default:
      state = { ...state };
      break;
  }
  return state;
};

export default role;
