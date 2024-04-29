const initialState = {
    addon_loading: false,

    edit_addon_loading: false,

    get_addon_data: null,
    get_addon_error: null,
    get_addon_loading: false,
    
    get_owner_plan_addon_data: null,
    get_owner_plan_addon_error: null,
    get_owner_plan_addon_loading: false,

    get_active_addon_data: null,
    get_active_addon_error: null,
    get_active_addon_loading: false,
};

const Addon = (state = initialState, action) => {
    switch (action.type) {
        case "STORE_ADDON":
            state = {
                ...state,
                addon_loading: action.status,
            };
            break;

        case "STORE_ADDON_FRESH":
            state = {
                ...state,
                addon_loading: action.status,
            };
            break;
        case "EDIT_ADDON":
            state = {
                ...state,
                edit_addon_loading: action.status,
            };
            break;

        case "EDIT_ADDON_FRESH":
            state = {
                ...state,
                edit_addon_loading: action.status,
            };
            break;
        case "GET_ADDONS":
            state = {
                ...state,
                get_addon_data: action.payload,
                get_addon_error: action.payload,
                get_addon_loading: action.status,
            };
            break;

        case "GET_ADDONS_FRESH":
            state = {
                ...state,
                get_addon_data: action.payload,
                get_addon_error: action.payload,
                get_addon_loading: action.status,
            };
            break;
        case "GET_OWNER_PLAN_ADDONS":
            state = {
                ...state,
                get_owner_plan_addon_data: action.payload,
                get_owner_plan_addon_error: action.payload,
                get_owner_plan_addon_loading: action.status,
            };
            break;
        case "GET_OWNER_PLAN_ADDONS_FRESH":
            state = {
                ...state,
                get_owner_plan_addon_data: action.payload,
                get_owner_plan_addon_error: action.payload,
                get_owner_plan_addon_loading: action.status,
            };
            break;
        case "GET_ACTIVE_ADDONS":
            state = {
                ...state,
                get_active_addon_data: action.payload,
                get_active_addon_error: action.payload,
                get_active_addon_loading: action.status,
            };
            break;

        case "GET_ACTIVE_ADDONS_FRESH":
            state = {
                ...state,
                get_active_addon_data: action.payload,
                get_active_addon_error: action.payload,
                get_active_addon_loading: action.status,
            };
            break;

        default:
            state = { ...state };
            break;
    }
    return state;
};

export default Addon;
