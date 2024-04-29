const initialState = {
  company_data: null,
  company_data_error: null,
  company_data_loading: false,

  company_data_edit_loading: false,
};

const Company = (state = initialState, action) => {
  switch (action.type) {
    case "COMPANY_DATA":
      state = {
        ...state,
        company_data: action.payload,
        company_data_error: action.status,
        company_data_loading: action.status,
      };
      break;
    case "COMPANY_DATA_EDIT":
      state = {
        ...state,
        company_data_edit_loading: action.status,
      };
      break;

    default:
      state = { ...state };
      break;
  }
  return state;
};

export default Company;
