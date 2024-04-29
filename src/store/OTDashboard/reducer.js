const initialState = {
    property_list_ot_data: null,
    property_list_ot_error: null,
    property_list_ot_loading: false,

    property_list_t_data: null,
    property_list_t_error: null,
    property_list_t_loading: false,

    property_list_ot_id_data: null,
    property_list_ot_id_error: null,
    property_list_ot_id_loading: false,

    property_list_t_id_data: null,
    property_list_t_id_error: null,
    property_list_t_id_loading: false,

    jobs_list_by_id_ot_data: null,
    jobs_list_by_id_ot_error: null,
    jobs_list_by_id_ot_loading: false,

    inspection_info_ot_data: null,
    inspection_info_ot_error: null,
    inspection_info_ot_loading: false,

    property_list_tenant_id_data: null,
    property_list_tenant_id_error: null,
    property_list_tenant_id_loading: false,

    mail_send_tenant_loading: false,

    add_maintenance_tenant_loading: false,

    current_balance_ownerPanel_data: null,
    current_balance_ownerPanel_error: null,
    current_balance_ownerPanel_loading: false,

    chart_data: null,
    chart_error: null,
    chart_loading: false,

    tenant_all_doc_data: null,
    tenant_all_doc_error: null,
    tenant_all_doc_loading: null,

    tenant_activity_data: null,
    tenant_activity_error: null,
    tenant_activity_loading: null,
};

const OTDashboard = (state = initialState, action) => {
    switch (action.type) {
        case "PROPERTY_LIST_OT":
            state = {
                ...state,
                property_list_ot_data: action.payload,
                property_list_ot_error: null,
                property_list_ot_loading: action.status,
            };
            break;
        case "PROPERTY_LIST_OT_ID":
            state = {
                ...state,
                property_list_ot_id_data: action.payload,
                property_list_ot_id_error: null,
                property_list_ot_id_loading: action.status,
            };
            break;
        case "PROPERTY_LIST_OT_FRESH":
            state = {
                ...state,

                property_list_ot_loading: action.status,
            };
            break;
        case "PROPERTY_LIST_T":
            state = {
                ...state,
                property_list_t_data: action.payload,
                property_list_t_error: null,
                property_list_t_loading: action.status,
            };
            break;
        case "PROPERTY_LIST_T_ID":
            state = {
                ...state,
                property_list_t_id_data: action.payload,
                property_list_t_id_error: null,
                property_list_t_id_loading: action.status,
            };
            break;
        case "JOBS_LIST_BY_ID_OT":
            state = {
                ...state,
                jobs_list_by_id_ot_data: action.payload,
                jobs_list_by_id_ot_error: null,
                jobs_list_by_id_ot_loading: action.status,
            };
            break;
        case "INSPECTION_INFO_OT":
            state = {
                ...state,
                inspection_info_ot_data: action.payload,
                inspection_info_ot_error: null,
                inspection_info_ot_loading: action.status,
            };
            break;
        case "PROPERTY_LIST_TENANT_ID":
            state = {
                ...state,
                property_list_tenant_id_data: action.payload,
                property_list_tenant_id_error: null,
                property_list_tenant_id_loading: action.status,
            };
            break;
        case "CURRENT_BALANCE_OWNER_PANEL":
            state = {
                ...state,
                current_balance_ownerPanel_data: action.payload,
                current_balance_ownerPanel_error: null,
                current_balance_ownerPanel_loading: action.status,
            };
            break;
        case "MAIL_SEND_TENANT":
            state = {
                ...state,
                mail_send_tenant_loading: action.status,
            };
            break;
        case "MAIL_SEND_TENANT_FRESH":
            state = {
                ...state,
                mail_send_tenant_loading: action.status,
            };
            break;

        case "ADD_MAINTENANCE_TENANT":
            state = {
                ...state,
                add_maintenance_tenant_error: action.status,
                add_maintenance_tenant_loading: action.status,
            };
            break;
        case "ADD_MAINTENANCE_TENANT_FRESH":
            state = {
                ...state,
                add_maintenance_tenant_loading: action.status,
            };
            break;
        case "CHART_DATA":
            state = {
                ...state,
                chart_data: action.payload,
                chart_error: null,
                chart_loading: action.status,
            };
            break;
        case "TENANT_ALL_DOC":
            state = {
                ...state,
                tenant_all_doc_data: action.payload,
                tenant_all_doc_error: null,
                tenant_all_doc_loading: action.status,
            };
            break;
        case "TENANT_ACTIVITY":
            state = {
                ...state,
                tenant_activity_data: action.payload,
                tenant_activity_error: null,
                tenant_activity_loading: action.status,
            };
            break;
        case "OWNER_PANEL_DOC":
            state = {
                ...state,
                owner_panel_doc_data: action.payload,
                owner_panel_doc_error: null,
                owner_panel_doc_loading: action.status,
            };
            break;
        default:
            state = { ...state };
            break;
    }
    return state;
};

export default OTDashboard;