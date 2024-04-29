const initialState = {
    bills_report_data: null,
    bills_report_data_loading: false,
    download_bills_pdf_loading: false,
    download_bills_excel_loading: false,

    letting_fee_bills_data: null,
    letting_fee_bills_data_loading: false,
    download_filter_letting_fee_bills_pdf_loading: false,
    download_filter_letting_fee_bills_excel_loading: false,

    unpaid_bills_report_data: null,
    unpaid_bills_report_data_loading: false,
    download_unpaid_bills_pdf_loading: false,
    download_unpaid_bills_excel_loading: false,
};

const BillReportReducer = (state = initialState, action) => {
    switch (action.type) {
        case "BILLS_REPORT":
            state = {
                ...state,
                bills_report_data: action.payload,
            };
            break;
        case "FILTER_BILLS_REPORT":
            state = {
                ...state,
                bills_report_data: action.payload,
                bills_report_data_loading: action.status,
            };
            break;
        case "FILTER_BILLS_REPORT_FRESH":
            state = {
                ...state,
                bills_report_data_loading: action.status,
            };
            break;
        case "DOWNLOAD_BILLS_PDF":
            state = {
                ...state,
                download_bills_pdf_loading: action.status,
            };
            break;
        case "DOWNLOAD_BILLS_PDF_FRESH":
            state = {
                ...state,
                download_bills_pdf_loading: action.status,
            };
            break;
        case "DOWNLOAD_BILLS_EXCEL":
            state = {
                ...state,
                download_bills_excel_loading: action.status,
            };
            break;
        case "DOWNLOAD_BILLS_EXCEL_FRESH":
            state = {
                ...state,
                download_bills_excel_loading: action.status,
            };
            break;
        case "LETTING_FEE_BILLS_REPORT":
            state = {
                ...state,
                letting_fee_bills_data: action.payload,
            };
            break;
        case "FILTER_LETTING_FEE_BILLS_REPORT":
            state = {
                ...state,
                letting_fee_bills_data: action.payload,
                letting_fee_bills_data_loading: action.status,
            };
            break;
        case "FILTER_LETTING_FEE_BILLS_REPORT_FRESH":
            state = {
                ...state,
                letting_fee_bills_data_loading: action.status,
            };
            break;
        case "DOWNLOAD_LETTING_FEE_BILLS_PDF":
            state = {
                ...state,
                download_filter_letting_fee_bills_pdf_loading: action.status,
            };
            break;
        case "DOWNLOAD_LETTING_FEE_BILLS_PDF_FRESH":
            state = {
                ...state,
                download_filter_letting_fee_bills_pdf_loading: action.status,
            };
            break;
        case "DOWNLOAD_LETTING_FEE_BILLS_EXCEL":
            state = {
                ...state,
                download_filter_letting_fee_bills_excel_loading: action.status,
            };
            break;
        case "DOWNLOAD_LETTING_FEE_BILLS_EXCEL_FRESH":
            state = {
                ...state,
                download_filter_letting_fee_bills_excel_loading: action.status,
            };
            break;
        case "UNPAID_BILLS_REPORT":
            state = {
                ...state,
                unpaid_bills_report_data: action.payload,
            };
            break;
        case "FILTER_UNPAID_BILLS_REPORT":
            state = {
                ...state,
                unpaid_bills_report_data: action.payload,
                unpaid_bills_report_data_loading: action.status,
            };
            break;
        case "FILTER_UNPAID_BILLS_REPORT_FRESH":
            state = {
                ...state,
                unpaid_bills_report_data_loading: action.status,
            };
            break;
        case "DOWNLOAD_UNPAID_BILLS_PDF":
            state = {
                ...state,
                download_unpaid_bills_pdf_loading: action.status,
            };
            break;
        case "DOWNLOAD_UNPAID_BILLS_PDF_FRESH":
            state = {
                ...state,
                download_unpaid_bills_pdf_loading: action.status,
            };
            break;
        case "DOWNLOAD_UNPAID_BILLS_EXCEL":
            state = {
                ...state,
                download_unpaid_bills_excel_loading: action.status,
            };
            break;
        case "DOWNLOAD_UNPAID_BILLS_EXCEL_FRESH":
            state = {
                ...state,
                download_unpaid_bills_excel_loading: action.status,
            };
            break;
        default:
            state = { ...state };
            break;
    }
    return state;
};

export default BillReportReducer;