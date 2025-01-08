import {
  PROFILE_ERROR,
  PROFILE_SUCCESS,
  EDIT_PROFILE,
  EDIT_PASSWORD,
  RESET_PROFILE_FLAG, ADD_NOTIFICATION, ADD_NOTIFICATION_FRESH, NOTIFICATION_DATA
} from "./actionTypes";

const initialState = {
  error: "",
  success: "",
  profile_edit_status: false,
  password_update_status: false,
  pro_pic: undefined,
  pro_pic_status: false,
  profile_details: undefined,
  add_notification_loading: false,
  notification_data: null,
  notification_error: false,
  notification_loading: false,
};

const profile = (state = initialState, action) => {

  switch (action.type) {
    case EDIT_PROFILE:
      state = { ...state, profile_edit_status: action.status, profile_details: undefined };
      break;
    case EDIT_PASSWORD:

      state = { ...state, password_update_status: action.status };
      break;
    case PROFILE_SUCCESS:
      state = { ...state, success: action.payload };
      break;
    case PROFILE_ERROR:
      state = { ...state, error: action.payload };
      break;
    case RESET_PROFILE_FLAG:
      state = { ...state, success: null };
      break;
    case 'ADD_NOTIFICATION':
      state = { ...state, add_notification_loading: action.status };
      break;
    case 'ADD_NOTIFICATION_FRESH':
      state = { ...state, add_notification_loading: action.status };
      break;
    case "PROFILE_DETAILS":
      state = { ...state, profile_details: action.payload.data };
      break;
    case "PROPIC_ADD":
      state = {
        ...state,
        pro_pic: action.payload,
        pro_pic_status: action.status,

      };
      break;
    case "NOTIFICATION_DATA":
      state = {
        ...state,
        notification_data: action.payload,
        notification_error: null,
        notification_loading: action.status,
      };
      break;
    case "NOTIFICATION_DATA_FRESH":
      state = {
        ...state,

        notification_loading: action.status,
      };
      break;
    default:
      state = { ...state };
      break;
  }
  return state;
};

export default profile;
