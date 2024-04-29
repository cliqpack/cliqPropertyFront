const initialState = {
  menu_data: null,
  menu_loading: false,
  menu_error: null,

  menu_data_ot: null,
  menu_loading_ot: false,
  menu_error_ot: null,

};

const MenuList = (state = initialState, action) => {
  switch (action.type) {
    case "MENU_LIST":
      state = {
        ...state,
        menu_data: action.payload,
        menu_error: action.error,
        menu_loading: action.status,
      };
      break;
    case "MENU_LIST_OT":
      state = {
        ...state,
        menu_data_ot: action.payload,
        menu_error_ot: action.error,
        menu_loading_ot: action.status,
      };
      break;
    default:
      state = { ...state };
      break;
  }
  return state;
};

export default MenuList;
