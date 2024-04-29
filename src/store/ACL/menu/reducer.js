import {
  MENU_LIST,
  MENU_ADD,
  MENU_EDIT,
  MENU_DELETE,
  MENU_ADD_FRESH,
  MENU_EDIT_FRESH,
  MENU_DELETE_FRESH,
  MENU_LIST_FRESH,
} from "./actionTypes";

const initialState = {
  menu_list_data: null,
  menu_list_error: null,
  menu_list_loading: false,

  menu_add_data: null,
  menu_add_error: null,
  menu_add_loading: false,

  menu_edit_data: null,
  menu_edit_error: null,
  menu_edit_loading: false,

  menu_delete_data: null,
  menu_delete_error: null,
  menu_delete_loading: false,
};

const menu = (state = initialState, action) => {


  switch (action.type) {
    case MENU_LIST:
      state = {
        ...state,
        menu_list_data:action.status=="Success"?action.payload:null,
        menu_list_error: action.status=="Failed"?action.payload:null,
        menu_list_loading: action.status,
      };
      break;
    case MENU_ADD:
      state = { 
        ...state, 
        menu_add_data: action.status=="Success"?action.payload:null,
        menu_add_error: action.status=="Failed"?action.payload:null,
        menu_add_loading: action.status,
      };
      break;
    case MENU_EDIT:
      state = { 
        ...state,
        menu_edit_data:action.status=="Success"?action.payload:null,
        menu_edit_error: action.status=="Failed"?action.payload:null,
        menu_edit_loading: action.status, 

      };
      break;
    case MENU_DELETE:
      state = { 
        ...state, 
        menu_delete_data:action.status=="Success"?action.payload:null,
        menu_delete_error: action.status=="Failed"?action.payload:null,
        menu_delete_loading: action.status,
       };
      break;
    case MENU_ADD_FRESH:
      state = { 
        ...state, 
        menu_add_data: action.payload,
        menu_add_error: action.error,
        menu_add_loading: action.status,
      };
      break;
    case MENU_EDIT_FRESH:
      state = { 
        ...state, 
        menu_edit_data:action.payload,
        menu_edit_error: action.error,
        menu_edit_loading: action.status,
      };
      break;
    case MENU_DELETE_FRESH:
      state = { 
        ...state, 
        menu_delete_data:action.payload,
        menu_delete_error: action.error,
        menu_delete_loading: action.status,
      };
      break;
      case MENU_LIST_FRESH:
        state = { 
          ...state, 
          menu_list_error: action.payload,
          menu_list_loading: action.status,
        };
        break;
    default:
      state = { ...state };
      break;
  }
  return state;
};

export default menu;
