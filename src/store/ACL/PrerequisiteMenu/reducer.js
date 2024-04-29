const initialState = {
    prm_data: null,
    prm_loading: false,
    prm_error: null,
  
    prm_add_data: null,
    prm_add_loading: false,
    prm_add_error: null,
  
  };
  
  const Prm = (state = initialState, action) => {
    switch (action.type) {
      case "PRM_LIST":
        state = {
          ...state,
          prm_data: action.payload,
          prm_error: action.error,
          prm_loading: action.status,
        };
        break;
      case "PRM_ADD":
        state = {
          ...state,
          prm_add_data: action.payload,
          prm_add_error: action.error,
          prm_add_loading: action.status,
        };
        break;
      
      default:
        state = { ...state };
        break;
    }
    return state;
  };
  
  export default Prm;
  