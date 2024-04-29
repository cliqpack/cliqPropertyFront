const initialState = {
    cashbook_report_data: null,
    filter_cashbook_report_loading: false,
    download_cashbook_pdf_loading: false
};

const CashBookReducer = (state = initialState, action) => {
    switch (action.type) {
        case "CASHBOOK_REPORT_API":
            state = {
                ...state,
                cashbook_report_data: action.payload,
            };
            break;
        case "FILTER_CASHBOOK_REPORT_API":
            state = {
                ...state,
                cashbook_report_data: action.payload,
                filter_cashbook_report_loading: action.status,
            };
            break;
        case "FILTER_CASHBOOK_REPORT_API_FRESH":
            state = {
                ...state,
                filter_cashbook_report_loading: action.status,
            };
            break;
        case "DOWNLOAD_CASHBOOK_PDF":
            state = {
                ...state,
                download_cashbook_pdf_loading: action.status,
            };
            break;
        case "DOWNLOAD_CASHBOOK_PDF_FRESH":
            state = {
                ...state,
                download_cashbook_pdf_loading: action.status,
            };
            break;
        default:
            state = { ...state };
            break;
    }
    return state;
};

export default CashBookReducer;