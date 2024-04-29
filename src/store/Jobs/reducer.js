const initialState = {
    job_modal_add_loading: false,
    job_modal_add_id: null,

    job_property_access_data: null,
    job_property_access_error: null,
    job_property_access_loading: false,

    jobs_list_id: null,
    jobs_list_data: null,
    jobs_list_error: null,
    jobs_list_loading: false,

    jobListById_show_data: null,
    jobListById_show_error: null,
    jobListById_show_loading: false,

    jobs_label: null,
    jobs_label_error: null,
    jobs_label_loading: false,

    getQuote_show_data: null,
    getQuote_show_error: null,
    getQuote_show_loading: false,

    job_quote_add_loading: false,
    job_quote_edit_loading: false,
    job_quote_delete_loading: false,

    supplier_list_data: null,
    supplier_list_error: null,
    supplier_list_loading: false,

    job_modal_edit_data: null,
    job_modal_edit_error: null,
    job_modal_edit_loading: false,

    jobs_job_image_add: null,
    jobs_job_image_add_error: null,
    jobs_job_image_add_loading: null,

    job_info_image_add: null,
    job_info_image_add_error: null,
    job_info_image_add_loading: false,

    job_status_loading: false,

    add_supplier_from_job_loading: false,

    job_delete_loading: false,
    upload_job_file_loading: false,

    gmtfjbs_data: null,
    gmtfjbs_error: null,
    gmtfjbs_loading: false,

    smta_jobs_data: null,
    smta_jobs_error: null,
    smta_jobs_loading: false,

    send_sms_template_jobs_data: null,
    send_sms_template_jobs_error: null,
    send_sms_template_jobs_loading: false,

    job_image_delete_loading: false
};

const Jobs = (state = initialState, action) => {
    switch (action.type) {
        case "JOB_PROPERTY_ACCESS":
            state = {
                ...state,
                job_property_access_data: action.payload,
                job_property_access_error: null,
                job_property_access_loading: action.status,
            };
            break;
        case "JOB_PROPERTY_ACCESS_FRESH":
            state = {
                ...state,
                job_property_access_data: action.payload,
                job_property_access_error: null,
                job_property_access_loading: action.status,
            };
            break;
        case "JOB_MODAL_ADD":
            state = {
                ...state,
                job_modal_add_id: action.payload,
                job_modal_add_loading: action.status,
            };
            break;
        case "JOBS_LIST":
            state = {
                ...state,
                jobs_list_data: action.payload,
                jobs_list_error: null,
                jobs_list_loading: action.status,
            };
            break;
        case "JOBS_LIST_FRESH":
            state = {
                ...state,

                jobs_list_loading: false,
            };
            break;
        case "JOB_MODAL_ADD_FRESH":
            state = {
                ...state,

                job_modal_add_loading: action.status,
            };
            break;
        case "JOBS_LIST_BY_ID":
            state = {
                ...state,
                jobListById_show_data: action.payload,
                jobListById_show_error: null,
                jobListById_show_loading: action.status,
            };
            break;
        case "JOBS_LIST_BY_ID_FRESH":
            state = {
                ...state,
                jobListById_show_data: null,
                jobListById_show_error: null,
                jobListById_show_loading: action.status,
            };
            break;
        case "JOBS_LABEL":
            state = {
                ...state,
                jobs_label: action.payload,
                jobs_label_error: action.error,
                jobs_label_loading: action.status,
            };
            break;
        case "GET_QUOTE":
            state = {
                ...state,
                getQuote_show_data: action.payload,
                getQuote_show_error: null,
                getQuote_show_loading: action.status,
            };
            break;
        case "GET_QUOTE_FRESH":
            state = {
                ...state,
                getQuote_show_loading: action.status,
            };
            break;

        case "JOB_QUOTE_ADD":
            state = {
                ...state,
                job_quote_add_loading: action.status,
            };
            break;
        case "JOB_QUOTE_ADD_FRESH":
            state = {
                ...state,
                job_quote_add_loading: action.status,
            };
            break;
        case "JOB_QUOTE_EDIT":
            state = {
                ...state,
                job_quote_edit_loading: action.status,
            };
            break;
        case "JOB_QUOTE_EDIT_FRESH":
            state = {
                ...state,
                job_quote_edit_loading: action.status,
            };
            break;
        case "DELETE_QUOTE":
            state = {
                ...state,
                job_quote_delete_loading: action.status,
            };
            break;
        case "DELETE_QUOTE_FRESH":
            state = {
                ...state,
                job_quote_delete_loading: action.status,
            };
            break;
        case "UPLOAD_JOB_FILE":
            state = {
                ...state,
                upload_job_file_loading: action.status,
            };
            break;
        case "UPLOAD_JOB_FILE_FRESH":
            state = {
                ...state,
                upload_job_file_loading: action.status,
            };
            break;
        case "SUPPLIER_LIST":
            state = {
                ...state,
                supplier_list_data: action.payload,
                supplier_list_error: null,
                supplier_list_loading: action.status,
            };
            break;
        case "SUPPLIER_LIST_FRESH":
            state = {
                ...state,
                supplier_list_loading: action.status,
            };
            break;
        case "JOB_MODAL_EDIT":
            state = {
                ...state,
                job_modal_edit_data: action.payload,
                job_modal_edit_error: null,
                job_modal_edit_loading: action.status,
            };
            break;
        case "JOB_MODAL_EDIT_FRESH":
            state = {
                ...state,
                job_modal_edit_loading: action.status,
            };
            break;
        case "JOB_INFO_IMAGE_ADD":
            state = {
                ...state,
                job_info_image_add: action.payload,
                job_info_image_add_error: action.error,
                job_info_image_add_loading: action.status,
            };
            break;
        case "GET_JOB_IMAGE":
            state = {
                ...state,
                job_image_add: action.payload,
                job_image_add_error: action.error,
                job_image_add_loading: action.status,
            };
            break;
        case "GET_JOB_IMAGE_FRESH":
            state = {
                ...state,
                job_info_image_add_loading: action.status,
            };
            break;

        case "ADD_SUPPLIER_FROM_JOB":
            state = {
                ...state,
                add_supplier_from_job_loading: action.status,
            };
            break;
        case "ADD_SUPPLIER_FROM_JOB_FRESH":
            state = {
                ...state,
                add_supplier_from_job_loading: action.status,
            };
            break;

        case "JOB_APPROVE":
            state = {
                ...state,
                job_status_loading: action.status,
            }
            break;
        case "JOB_QUOTE_APPROVE":
            state = {
                ...state,
                job_status_loading: action.status,
            }
            break;
        case "JOB_UNAPPROVE":
            state = {
                ...state,
                job_status_loading: action.status,
            }
            break;
        case "JOB_UNQUOTED":
            state = {
                ...state,
                job_status_loading: action.status,
            }
            break;
        case "JOB_ASSIGNED":
            state = {
                ...state,
                job_status_loading: action.status,
            }
            break;
        case "JOB_UNASSIGNED":
            state = {
                ...state,
                job_status_loading: action.status,
            }
            break;
        case "JOB_FINISHED":
            state = {
                ...state,
                job_status_loading: action.status,
            }
            break;
        case "JOB_COMPLETED":
            state = {
                ...state,
                job_status_loading: action.status,
            }
            break;
        case "JOB_REOPEN":
            state = {
                ...state,
                job_status_loading: action.status,
            }
            break;

        case "JOB_OWNER_ASSIGNED":
            state = {
                ...state,
                job_status_loading: action.status,
            }
            break;
        case "JOB_TENANT_ASSIGNED":
            state = {
                ...state,
                job_status_loading: action.status,
            }
            break;
        case "JOB_STATUS_FRESH":
            state = {
                ...state,
                job_status_loading: action.status,
            }
            break;
        case "JOB_DELETE":
            state = {
                ...state,
                job_delete_loading: action.status,
            }
            break;
        case "JOB_DELETE_FRESH":
            state = {
                ...state,
                job_delete_loading: action.status,
            }
            break;
        case "GET_MESSAGE_TEMPLATES_FOR_JOBS_BY_SELECT":
            state = {
                ...state,
                gmtfjbs_data: action.payload,
                gmtfjbs_error: action.error,
                gmtfjbs_loading: action.status,
            }
            break;
        case "SEND_MAIL_TO_ACTIVITY_JOBS":
            state = {
                ...state,
                smta_jobs_data: action.payload,
                smta_jobs_error: action.status,
                smta_jobs_loading: action.status,
            };
            break;
        case "SEND_MAIL_TO_ACTIVITY_JOBS_FRESH":
            state = {
                ...state,
                smta_jobs_loading: action.status,
            };
            break;
        case "SEND_SMS_TO_ACTIVITY_JOBS":
            state = {
                ...state,
                send_sms_template_jobs_data: action.payload,
                send_sms_template_jobs_error: action.status,
                send_sms_template_jobs_loading: action.status,
            };
            break;
        case "SEND_SMS_TO_ACTIVITY_JOBS_FRESH":
            state = {
                ...state,
                send_sms_template_jobs_loading: action.status,
            };
            break;
        case "JOB_IMAGE_DELETE":
            state = {
                ...state,
                job_image_delete_loading: action.status,
            };
            break;
        case "JOB_IMAGE_DELETE_FRESH":
            state = {
                ...state,
                job_image_delete_loading: action.status,
            };
            break;

        default:
            state = { ...state };
            break;
    }
    return state;
};

export default Jobs;