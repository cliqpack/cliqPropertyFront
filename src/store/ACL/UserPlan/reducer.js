const initialState = {
    acl_user_plan_data: null,
    acl_user_plan_loading: false,
    acl_user_plan_error: null,
  
    
    acl_user_plan_add_data: null,
    acl_user_plan_add_loading: false,
    acl_user_plan_add_error: null,

  };
  
  const UserPlan = (state = initialState, action) => {
    switch (action.type) {
      case "USER_PLAN_LIST":
        state = {
          ...state,
          acl_user_plan_data: action.payload,
          acl_user_plan_error: action.error,
          acl_user_plan_loading: action.status,
        };
        break;
      case "USER_PLAN_ADD":
        state = {
          ...state,
          acl_user_plan_add_data: action.payload,
          acl_user_plan_add_error: action.error,
          acl_user_plan_add_loading: action.status,
        };
        break;
      default:
        state = { ...state };
        break;
    }
    return state;
  };
  
  export default UserPlan;
  