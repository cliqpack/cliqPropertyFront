const initialState = {
  acl_plan_data: null,
  acl_plan_loading: false,
  acl_plan_error: null,

  acl_plan_add_data: null,
  acl_plan_add_loading: false,
  acl_plan_add_error: null,

  acl_plan_delete_data: null,
  acl_plan_delete_loading: false,
  acl_plan_delete_error: null,

  owner_plan_data: null,
  owner_plan_loading: false,
  owner_plan_error: null,
  
  get_plan_schedule_data: null,
  get_plan_schedule_error: null,
  get_plan_schedule_loading: false,

  store_addons_loading: false,
};

const Plan = (state = initialState, action) => {
  switch (action.type) {
    case "PLAN_LIST":
      state = {
        ...state,
        acl_plan_data: action.payload,
        acl_plan_error: action.error,
        acl_plan_loading: action.status,
      };
      break;
    case "OWNER_PLAN":
      state = {
        ...state,
        owner_plan_data: action.payload,
        owner_plan_error: action.error,
        owner_plan_loading: action.status,
      };
      break;
    case "PLAN_LIST_FRESH":
      state = {
        ...state,
        acl_plan_data: null,
        acl_plan_error: action.error,
        acl_plan_loading: action.status,
      };
      break;
    case "PLAN_ADD":
      state = {
        ...state,
        acl_plan_add_data: action.payload,
        acl_plan_add_error: action.error,
        acl_plan_add_loading: action.status,
      };
      break;
    case "PLAN_DELETE":
      state = {
        ...state,
        acl_plan_delete_data: action.payload,
        acl_plan_delete_error: action.error,
        acl_plan_delete_loading: action.status,
      };
      break;
    case "STORE_ADDONS":
      state = {
        ...state,
        store_addons_loading: action.status,
      };
      break;
    case "STORE_ADDONS_FRESH":
      state = {
        ...state,
        store_addons_loading: action.status,
      };
      break;
    case "GET_PLAN_SCHEDULE":
      state = {
        ...state,
        get_plan_schedule_data: action.payload,
        get_plan_schedule_error: action.error,
        get_plan_schedule_loading: action.status,
      };
      break;
    case "GET_PLAN_SCHEDULE_FRESH":
      state = {
        ...state,
        get_plan_schedule_loading: action.status,
      };
      break;
    default:
      state = { ...state };
      break;
  }
  return state;
};

export default Plan;
