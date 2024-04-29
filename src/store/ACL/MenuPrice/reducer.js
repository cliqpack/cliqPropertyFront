const initialState = {
  menu_price_data: null,
  menu_price_loading: false,
  menu_price_error: null,

  get_menu_price_data: null,
  get_menu_price_loading: false,
  get_menu_price_error: null,

  menu_price_add_data: null,
  menu_price_add_loading: false,
  menu_price_add_error: null,
};

const MenuPrice = (state = initialState, action) => {
  switch (action.type) {
    case "MENU_PRICE_LIST":
      state = {
        ...state,
        menu_price_data: action.payload,
        menu_price_error: action.error,
        menu_price_loading: action.status,
      };
      break;
    case "GET_MENU_PRICE":
      state = {
        ...state,
        get_menu_price_data: action.payload,
        get_menu_price_error: action.error,
        get_menu_price_loading: action.status,
      };
      break;
      case "GET_MENU_PRICE_FRESH":
        state = {
          ...state,
          get_menu_price_loading: action.status,
        };
        break;
    case "MENU_PRICE_ADD":
      state = {
        ...state,
        menu_price_add_data: action.payload,
        menu_price_add_error: action.error,
        menu_price_add_loading: action.status,
      };
      break;

    default:
      state = { ...state };
      break;
  }
  return state;
};

export default MenuPrice;
