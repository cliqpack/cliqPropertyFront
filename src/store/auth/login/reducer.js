import {
  LOGIN_USER,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGIN_FRESH,
  LOGOUT_USER,
  LOGOUT_USER_SUCCESS,
  API_ERROR,
  EMAIL_SUCCESS,
  EMAIL_FAILED,
  // FORGOT_PASSWORD_SUCCESS,
  // FORGOT_PASSWORD_FAILED
  NOTIFICATION_LIST,
  READ_NOTIFICATION,
  READ_NOTIFICATION_FRESH
} from "./actionTypes";

const initialState = {
  error: "",
  loading: false,
  userDetails: undefined,
  email_loading: false,
  email_userDetails: null,
  password_success_details: null,
  password_success_loading: false,
  notification_list_details: null,
  notification_list_loading: false,
  read_notification_loading: false,
  read_all_notification_loading: false,
  all_notification_data: null,
  all_notification_loading: false,
  unread_notification_loading: false
};

const login = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      state = {
        ...state,
        loading: true,
      };
      break;
    case LOGIN_SUCCESS:
      state = {
        ...state,
        loading: action.status,
        userDetails: action.payload,
      };
      break;
    case LOGIN_FAILED:
      state = { ...state, error: action.payload, loading: action.status };
      break;
    case LOGIN_FRESH:
      state = { ...state, error: action.payload, loading: false };
      break;
    case LOGOUT_USER:
      state = { ...state };
      break;
    case LOGOUT_USER_SUCCESS:
      state = { ...state };
      break;
    case API_ERROR:
      state = { ...state, error: action.payload, loading: false };
      break;
    case EMAIL_SUCCESS:
      state = {
        ...state,
        email_loading: action.status,
        email_userDetails: action.payload,
      };
      break;
    case EMAIL_FAILED:
      state = {
        ...state,
        email_error: action.payload,
        email_loading: action.status,
      };
      break;
    case "OWNER_TENANT_EMAIL_FRESH":
      state = {
        ...state,
        email_userDetails: action.payload,
        email_loading: action.status,
      };
      break;
    case "FORGOT_PASSWORD_SUCCESS":
      state = {
        ...state,
        password_success_details: action.payload,
        password_success_loading: action.status,
      };
      break;
    case "NOTIFICATION_LIST":
      state = {
        ...state,
        notification_list_details: action.payload,
        notification_list_loading: action.status,
      };
      break;
    case "NOTIFICATION_LIST_FRESH":
      state = {
        ...state,
        notification_list_loading: action.status,
      };
      break;
    case "READ_NOTIFICATION":
      state = {
        ...state,
        read_notification_loading: action.status,
      };
      break;
    case "READ_NOTIFICATION_FRESH":
      state = {
        ...state,
        read_notification_loading: action.status,
      };
      break;
    case "UNREAD_NOTIFICATION":
      state = {
        ...state,
        unread_notification_loading: action.status,
      };
      break;
    case "UNREAD_NOTIFICATION_FRESH":
      state = {
        ...state,
        unread_notification_loading: action.status,
      };
      break;
    case "READ_ALL_NOTIFICATION":
      state = {
        ...state,
        read_all_notification_loading: action.status,
      };
      break;
    case "READ_ALL_NOTIFICATION_FRESH":
      state = {
        ...state,
        read_all_notification_loading: action.status,
      };
      break;
    case "ALL_NOTIFICATION":
      state = {
        ...state,
        all_notification_data: action.payload,
        all_notification_loading: action.status,
      };
      break;
    default:
      state = { ...state };
      break;
  }
  return state;
};

export default login;
