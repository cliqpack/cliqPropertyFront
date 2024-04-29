import {
  REGISTER_USER,
  REGISTER_USER_SUCCESSFUL,
  REGISTER_USER_FAILED,
  REGISTER_USER_CLEAR,
  COMPANY_LIST,
  COMPANY_ADD,
  COMPANY_ADD_FRESH,
  COMPANY_LIST_FRESH,
  REGISTERED_USER_LIST,
  USER_DELETE,
  USER_DELETE_FRESH,
  USER_UPDATE,
  USER_UPDATE_FRESH,
  USER_INFO,
  USER_INFO_FRESH,
  REGISTER_OWNER_TENANT
} from "./actionTypes";

const initialState = {
  registrationError: null,
  message: null,
  loading: false,

  user_tenant_loading: false,
  user_tenant_user: null,
  user_tenant_registrationError: null,

  company_list_data: null,
  company_list_error: null,
  company_list_loading: false,

  user_list_data: null,
  user_list_error: null,
  user_list_loading: false,

  company_add_data: null,
  company_add_error: null,
  company_add_loading: false,

  user_delete_data: null,
  user_delete_error: null,
  user_delete_loading: false,

  user_info_data: null,
  user_info_error: null,
  user_info_loading: false,

  user_update_data: null,
  user_update_error: null,
  user_update_loading: false,
};

const account = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_USER:
      state = {
        ...state,
        user: null,
        loading: true,
        registrationError: null,
      };
      break;
    case REGISTER_USER_SUCCESSFUL:
      state = {
        ...state,
        loading: action.status,
        user: action.payload,
        registrationError: null,
      };
      break;
    case REGISTER_USER_FAILED:
      state = {
        ...state,
        user: null,
        loading: action.status,
        registrationError: action.payload,
      };
      break;
    case REGISTER_USER_CLEAR:
      state = {
        ...state,
        user: null,
        loading: false,
        registrationError: null,
      };
      break;
    case REGISTER_OWNER_TENANT:
      state = {
        ...state,
        user_tenant_loading: action.status,
        user_tenant_user: action.payload,
        user_tenant_registrationError: null,
      };
      break;
    case 'REGISTER_OWNER_TENANT_FRESH':
      state = {
        ...state,
        user_tenant_loading: action.status,
        user_tenant_user: action.payload,
        user_tenant_registrationError: null,
      };
      break;
    case COMPANY_LIST:
      state = {
        ...state,
        company_list_data: action.payload,
        company_list_error: null,
        company_list_loading: action.status,
      };
      break;
    case COMPANY_ADD:
      state = {
        ...state,
        company_add_data: action.payload,
        company_add_error: null,
        company_add_loading: action.status,
      };
      break;
    case COMPANY_ADD_FRESH:
      state = {
        ...state,
        company_add_data: action.payload,
        company_add_error: action.error,
        company_add_loading: action.status,
      };
      break;
    case COMPANY_LIST_FRESH:
      state = {
        ...state,
        company_list_error: action.payload,
        company_list_loading: action.status,
      };
      break;
    case REGISTERED_USER_LIST:
      state = {
        ...state,
        user_list_data: action.payload,
        user_list_error: null,
        user_list_loading: action.status,
      };
      break;
    case USER_DELETE:
      state = {
        ...state,
        user_delete_data: action.payload,
        user_delete_error: null,
        user_delete_loading: action.status,
      };
      break;
    case USER_DELETE_FRESH:
      state = {
        ...state,
        user_delete_data: null,
        user_delete_error: action.payload,
        user_delete_loading: action.status,
      };
      break;
    case USER_INFO:
      state = {
        ...state,
        user_info_data: action.payload,
        user_info_error: null,
        user_info_loading: action.status,
      };
      break;
    case USER_INFO_FRESH:
      state = {
        ...state,
        user_info_data: action.payload,
        user_info_error: action.error,
        user_info_loading: action.status,
      };
      break;
    case USER_UPDATE:
      state = {
        ...state,
        user_update_error: null,
        user_update_loading: action.status,
      };
      break;
    case USER_UPDATE_FRESH:
      state = {
        ...state,
        user_update_data: null,
        user_update_error: action.payload,
        user_update_loading: action.status,
      };
      break;
    default:
      state = { ...state };
      break;
  }
  return state;
};

export default account;
