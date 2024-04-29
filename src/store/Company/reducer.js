 const initialState = {
    company_list_data: null,
    company_list_error: null,
    company_list_loading: false,
  
    company_add_data: null,
    company_add_error: null,
    company_add_loading: false,
  
    company_edit_loading: null,
    company_edit_error: null,
    company_edit_loading: false,
  
    company_delete_data: null,
    company_delete_error: null,
    company_delete_loading: false,
  
  };
  
  const company = (state = initialState, action) => {
    
    
    switch (action.type) {
      
      case "COMPANY_LIST":
        state = {
          ...state,
          company_list_data:action.payload,
          company_list_error: null,
          company_list_loading: action.status,
        };
        break;
      case "company_add":
        state = { 
          ...state, 
          company_add_data: action.payload,
          company_add_error: null,
          company_add_loading: action.status,
        };
        break;
      case "COMPANY_DELETE":
        state = { 
          ...state, 
          company_delete_data:action.payload,
          company_delete_error: null,
          company_delete_loading: action.status,
         };
        break;
      case "COMPANY_ADD_FRESH":
        state = { 
          ...state, 
          company_add_data: action.payload,
          company_add_error: action.error,
          company_add_loading: action.status,
        };
        break;
    //   case MENU_EDIT_FRESH:
    //     state = { 
    //       ...state, 
    //       company_edit_loading:null,
    //       company_edit_error: action.payload,
    //       company_edit_loading: action.status,
    //     };
    //     break;
      case "COMPANY_DELETE_FRESH":
        state = { 
          ...state, 
          company_delete_data:null,
          company_delete_error: action.payload,
          company_delete_loading: action.status,
        };
        break;
        case "COMPANY_LIST_FRESH":
          state = { 
            ...state, 
            company_list_error: action.payload,
            company_list_loading: action.status,
          };
          break;
        
      default:
        state = { ...state };
        break;
    }
    return state;
  };
  
  export default company;


  
  