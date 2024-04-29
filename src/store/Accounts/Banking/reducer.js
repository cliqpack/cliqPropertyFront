const initialState = {
    banking_list: null,
    banking_list_error: null,
    banking_list_loading: false,

    deposit_outstanding_loading: false,

    outstanding_list: null,
    outstanding_list_error: null,
    outstanding_list_loading: false,

    deposit_outstanding_show: null,
    deposit_outstanding_show_error: null,
    deposit_outstanding_show_loading: false,

    deposit_outstanding_list_loading: false,

    deposit_outstanding_one_list: null,
    deposit_outstanding_one_list_error: null,
    deposit_outstanding_one_list_loading: false,

    cancel_deposit_data: null,
    cancel_deposit_data_error: null,
    cancel_deposit_data_loading: false,

    last_deposit_data: null,
    last_deposit_data_error: null,
    last_deposit_data_loading: false,
};

const Banking = (state = initialState, action) => {
    switch (action.type) {
        case "BANKING_LIST":
            state = {
                ...state,
                banking_list: action.payload,
                banking_list_error: action.error,
                banking_list_loading: action.status,
            }
            break;
        case "DEPOSIT_OUTSTANDING":
            state = {
                ...state,
                deposit_outstanding_loading: action.status,
            }
            break;
        case "DEPOSIT_OUTSTANDING_FRESH":
            state = {
                ...state,
                deposit_outstanding_loading: action.status,
            }
            break;
        case "DEPOSIT_OUTSTANDING_SHOW":
            state = {
                ...state,
                deposit_outstanding_show: action.payload,
                deposit_outstanding_show_error: action.error,
                deposit_outstanding_show_loading: action.status,
            }
            break;
        case "DEPOSIT_OUTSTANDING_SHOW_FRESH":
            state = {
                ...state,
                deposit_outstanding_show_loading: action.status,
            }
            break;
        case "OUTSTANDING_LIST":
            state = {
                ...state,
                outstanding_list: action.payload,
                outstanding_list_error: action.error,
                outstanding_list_loading: action.status,
            }
            break;
        case "DEPOSIT_OUTSTANDING_LIST":
            state = {
                ...state,
                deposit_outstanding_list_loading: action.status,
            }
            break;
        case "DEPOSIT_OUTSTANDING_LIST_FRESH":
            state = {
                ...state,
                deposit_outstanding_list_loading: action.status,
            }
            break;
        case "DEPOSIT_OUTSTANDING_ONE_LIST":
            state = {
                ...state,
                deposit_outstanding_one_list: action.payload,
                deposit_outstanding_one_list_error: action.error,
                deposit_outstanding_one_list_loading: action.status,
            }
            break;
        case "CANCEL_DEPOSIT":
            state = {
                ...state,
                cancel_deposit_data: action.payload,
                cancel_deposit_data_error: action.error,
                cancel_deposit_data_loading: action.status,
            }
            break;
        case "CANCEL_DEPOSIT_FRESH":
            state = {
                ...state,
                cancel_deposit_data: action.payload,
                cancel_deposit_data_error: action.error,
                cancel_deposit_data_loading: action.status,
            }
            break;
        case "LAST_DEPOSIT":
            state = {
                ...state,
                last_deposit_data: action.payload,
                last_deposit_data_error: action.error,
                last_deposit_data_loading: action.status,
            }
            break;
        default:
            state = { ...state }
            break;
    }
    return state;
};

export default Banking;