const INITIAL_STATE = {
    all_property_document: null,
    all_property_document_error: null,
    all_property_document_loading: false,

    store_property_document: null,
    store_property_document_error: null,
    store_property_document_loading: false,

    all_contact_document: null,
    all_contact_document_error: null,
    all_contact_document_loading: false,

    store_inspection_task_job_document: null,
    store_inspection_task_job_document_error: null,
    store_inspection_task_job_document_loading: false,

    all_task_document: null,
    all_task_document_error: null,
    all_task_document_loading: false,

    all_job_document: null,
    all_job_document_error: null,
    all_job_document_loading: false,

    all_inspection_document: null,
    all_inspection_document_error: null,
    all_inspection_document_loading: false,

    all_job_task_inspection_document: null,
    all_job_task_inspection_document_error: null,
    all_job_task_inspection_document_loading: false,

    user_document_update_data: null,
    user_document_update_error: null,
    user_document_update_loading: false,

    user_document_delete_loading: false,
    user_document_delete_error: null,

    contact_document_name_update_error: null,
    contact_document_name_update_loading: false,

    contact_document_delete_loading: false,
    contact_document_delete_error: null,

    inspection_document_name_update_error: null,
    inspection_document_name_update_loading: false,

    inspection_document_delete_error: null,
    inspection_document_delete_loading: false,

    maintenance_document_name_update_error: null,
    maintenance_document_name_update_loading: false,

    maintenance_document_delete_error: null,
    maintenance_document_delete_loading: false,

    task_document_name_update_error: null,
    task_document_name_update_loading: false,

    task_document_delete_error: null,
    task_document_delete_loading: false,

    all_listing_doc_data: null,
    all_listing_data_doc_loading: false,

    store_contact_doc_loading: false,

    all_settings_doc: null,
    all_settings_doc_error: false,
    all_settings_doc_loading: false,

    edit_settings_doc_loading: false,

    remove_settings_doc_loading: false,

    all_settings_log: null,
    all_settings_log_error: false,
    all_settings_log_loading: false,

    add_message_option_loading: false,

    change_email_settings_loading: false,

    all_settings_message: null,
    all_settings_message_error: false,
    all_settings_message_loading: false,

    change_visibilty_loading: false,

    msg_options_email_data: null,
    msg_options_email_data_error: false,
    msg_options_email_data_loading: false,

    all_document_by_property: null,
    all_document_by_property_error: false,
    all_document_by_property_loading: false,


    all_document_by_inspection_data: null,
    all_document_by_inspection_loading: false,

    all_document_by_job_data: null,
    all_document_by_job_loading: false,

    all_document_by_listing_data: null,
    all_document_by_listing_loading: false,

}

const Document = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "ALL_PROPERTY_DOCUMENT":
            return state = {
                ...state,
                all_property_document: action.payload,
                all_property_document_error: action.error,
                all_property_document_loading: action.status,
            }
        case "ALL_PROPERTY_DOCUMENT_FRESH":
            return state = {
                ...state,
                all_property_document: action.payload,
                all_property_document_error: action.error,
                all_property_document_loading: action.status,
            }
        case "ALL_DOCUMENT_BY_PROPERTY":
            return state = {
                ...state,
                all_document_by_property: action.payload,
                all_document_by_property_error: action.error,
                all_document_by_property_loading: action.status,
            }
        case "STORE_PROPERTY_DOCUMENT":
            return state = {
                ...state,
                store_property_document: action.payload,
                store_property_document_error: action.error,
                store_property_document_loading: action.status,
            }
        case "STORE_PROPERTY_DOCUMENT_FRESH":
            return state = {
                ...state,
                store_property_document: action.payload,
                store_property_document_error: action.error,
                store_property_document_loading: action.status,
            }
        case "ALL_CONTACT_DOCUMENT":
            return state = {
                ...state,
                all_contact_document: action.payload,
                all_contact_document_error: action.error,
                all_contact_document_loading: action.status,
            }
        case "STORE_DOCUMENT":
            return state = {
                ...state,
                store_inspection_task_job_document: action.payload,
                store_inspection_task_job_document_error: action.error,
                store_inspection_task_job_document_loading: action.status,
            }
        case "STORE_DOCUMENT_FRESH":
            return state = {
                ...state,
                store_inspection_task_job_document: action.payload,
                store_inspection_task_job_document_error: action.error,
                store_inspection_task_job_document_loading: action.status,
            }
        case "ALL_TASK_DOCUMENT":
            return state = {
                ...state,
                all_task_document: action.payload,
                all_task_document_error: action.error,
                all_task_document_loading: action.status,
            }
        case "ALL_JOB_DOCUMENT":
            return state = {
                ...state,
                all_job_document: action.payload,
                all_job_document_error: action.error,
                all_job_document_loading: action.status,
            }
        case "ALL_INSPECTION_DOCUMENT":
            return state = {
                ...state,
                all_inspection_document: action.payload,
                all_inspection_document_error: action.error,
                all_inspection_document_loading: action.status,
            }
        case "ALL_JOB_TASK_INSPECTION_DOCUMENT":
            return state = {
                ...state,
                all_job_task_inspection_document: action.payload,
                all_job_task_inspection_document_error: action.error,
                all_job_task_inspection_document_loading: action.status,
            }
        case "USER_DOCUMENT_UPDATE":
            return state = {
                ...state,
                user_document_update_error: action.error,
                user_document_update_loading: action.status,
            };
            break;
        case "USER_DOCUMENT_UPDATE_FRESH":
            return state = {
                ...state,
                user_document_update_error: action.error,
                user_document_update_loading: action.status,
            };
            break;
        case "USER_DOCUMENT_DELETE":
            return state = {
                ...state,
                user_document_delete_error: action.error,
                user_document_delete_loading: action.status,
            };
            break;
        case "USER_DOCUMENT_DELETE_FRESH":
            return state = {
                ...state,
                user_document_delete_loading: action.status,
            };
            break;

        case "CONTACT_DOCUMENT_NAME_UPDATE":
            return state = {
                ...state,
                contact_document_name_update_error: action.error,
                contact_document_name_update_loading: action.status,
            };
            break;

        case "CONTACT_DOCUMENT_NAME_UPDATE_FRESH":
            return state = {
                ...state,
                contact_document_name_update_error: action.error,
                contact_document_name_update_loading: action.status,
            };
            break;
        case "CONTACT_DOCUMENT_DELETE":
            return state = {
                ...state,
                contact_document_delete_error: action.error,
                contact_document_delete_loading: action.status,
            };
            break;
        case "CONTACT_DOCUMENT_DELETE_FRESH":
            return state = {
                ...state,
                contact_document_delete_error: action.error,
                contact_document_delete_loading: action.status,
            };
            break;

        case "INSPECTION_DOCUMENT_NAME_UPDATE":
            return state = {
                ...state,
                inspection_document_name_update_error: action.error,
                inspection_document_name_update_loading: action.status,
            };
            break;
        case "INSPECTION_DOCUMENT_NAME_UPDATE_FRESH":
            return state = {
                ...state,
                inspection_document_name_update_error: action.error,
                inspection_document_name_update_loading: action.status,
            };
            break;
        case "INSPECTION_DOCUMENT_DELETE":
            return state = {
                ...state,
                inspection_document_delete_error: action.error,
                inspection_document_delete_loading: action.status,
            };
            break;
        case "INSPECTION_DOCUMENT_DELETE_FRESH":
            return state = {
                ...state,
                inspection_document_delete_error: action.error,
                inspection_document_delete_loading: action.status,
            };
            break;
        case "MAINTENANCE_DOCUMENT_NAME_UPDATE":
            return state = {
                ...state,
                maintenance_document_name_update_error: action.error,
                maintenance_document_name_update_loading: action.status,
            };
            break;
        case "MAINTENANCE_DOCUMENT_NAME_UPDATE_FRESH":
            return state = {
                ...state,
                maintenance_document_name_update_error: action.error,
                maintenance_document_name_update_loading: action.status,
            };
            break;
        case "MAINTENANCE_DOCUMENT_DELETE":
            return state = {
                ...state,
                maintenance_document_delete_error: action.error,
                maintenance_document_delete_loading: action.status,
            };
            break;
        case "MAINTENANCE_DOCUMENT_DELETE_FRESH":
            return state = {
                ...state,
                maintenance_document_delete_error: action.error,
                maintenance_document_delete_loading: action.status,
            };
            break;

        case "TASK_DOCUMENT_NAME_UPDATE":
            return state = {
                ...state,
                task_document_name_update_error: action.error,
                task_document_name_update_loading: action.status,
            };
            break;
        case "TASK_DOCUMENT_NAME_UPDATE_FRESH":
            return state = {
                ...state,
                task_document_name_update_error: action.error,
                task_document_name_update_loading: action.status,
            };
            break;
        case "TASK_DOCUMENT_DELETE":
            return state = {
                ...state,
                task_document_delete_error: action.error,
                task_document_delete_loading: action.status,
            };
            break;

        case "TASK_DOCUMENT_DELETE_FRESH":
            return state = {
                ...state,
                task_document_delete_error: action.error,
                task_document_delete_loading: action.status,
            };
            break;
        case "ALL_LISTING_DOCUMENT":
            return state = {
                ...state,
                all_listing_doc_data: action.payload,
                all_listing_data_doc_loading: action.status,
            };
            break;
        case "STORE_CONTACT_DOCUMENT":
            return state = {
                ...state,
                store_contact_doc_loading: action.status,
            };
            break;
        case "STORE_CONTACT_DOCUMENT_FRESH":
            return state = {
                ...state,
                store_contact_doc_loading: action.status,
            };
            break;
        case "ALL_SETTINGS_DOC":
            state = {
                ...state,
                all_settings_doc: action.payload,
                all_settings_doc_error: action.error,
                all_settings_doc_loading: action.status,
            }
            break;
        case "ALL_SETTINGS_LOG":
            state = {
                ...state,
                all_settings_log: action.payload,
                all_settings_log_error: action.error,
                all_settings_log_loading: action.status,
            }
            break;
        case "ALL_SETTINGS_MESSAGE":
            state = {
                ...state,
                all_settings_message: action.payload,
                all_settings_message_error: action.error,
                all_settings_message_loading: action.status,
            }
            break;
        case "MESSAGE_OPTIONS_EMAIL_DATA":
            state = {
                ...state,
                msg_options_email_data: action.payload,
                msg_options_email_data_error: action.error,
                msg_options_email_data_loading: action.status,
            }
            break;
        case "EDIT_SETTINGS_DOC":
            state = {
                ...state,
                edit_settings_doc_loading: action.status,
            }
            break;
        case "EDIT_SETTINGS_DOC_FRESH":
            state = {
                ...state,
                edit_settings_doc_loading: action.status,
            }
            break;
        case "REMOVE_SETTINGS_DOC":
            state = {
                ...state,
                remove_settings_doc_loading: action.status,
            }
            break;
        case "REMOVE_SETTINGS_DOC_FRESH":
            state = {
                ...state,
                remove_settings_doc_loading: action.status,
            }
            break;
        case "ADD_MESSAGE_OPTIONS":
            state = {
                ...state,
                add_message_option_loading: action.status,
            }
            break;
        case "ADD_MESSAGE_OPTIONS_FRESH":
            state = {
                ...state,
                add_message_option_loading: action.status,
            }
            break;
        case "CHANGE_EMAIL_SETTINGS":
            state = {
                ...state,
                change_email_settings_loading: action.status,
            }
            break;
        case "CHANGE_EMAIL_SETTINGS_FRESH":
            state = {
                ...state,
                change_email_settings_loading: action.status,
            }
            break;
        case "CHANGE_VISIBILTY":
            state = {
                ...state,
                change_visibilty_loading: action.status,
            }
            break;
        case "CHANGE_VISIBILTY_FRESH":
            state = {
                ...state,
                change_visibilty_loading: action.status,
            }
            break;

        case "ALL_DOCUMENT_BY_INSPECTION":
            state = {
                ...state,
                all_document_by_inspection_data: action.payload,
                all_document_by_inspection_loading: action.status,
            }
            break;
        case "ALL_DOCUMENT_BY_JOB":
            state = {
                ...state,
                all_document_by_job_data: action.payload,
                all_document_by_job_loading: action.status,
            }
            break;
        case "ALL_LISTING_DOCUMENT":
            state = {
                ...state,
                all_document_by_listing_data: action.payload,
                all_document_by_listing_loading: action.status,
            }
            break;

        default:
            state = { ...state };
            break;
    }
    return state;
}

export default Document; 