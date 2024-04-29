const initialState = {
    folio_ledger_report_data: null,
    filter_folio_ledger_report_loading: false,
};

const FolioLedgerReducer = (state = initialState, action) => {
    switch (action.type) {
        case "FOLIO_LEDGER_REPORT_API":
            state = {
                ...state,
                folio_ledger_report_data: action.payload,
            };
            break;
        case "FILTER_FOLIO_LEDGER_REPORT_API":
            state = {
                ...state,
                folio_ledger_report_data: action.payload,
                filter_folio_ledger_report_loading: action.status,
            };
            break;
        case "FILTER_FOLIO_LEDGER_REPORT_API_FRESH":
            state = {
                ...state,
                filter_folio_ledger_report_loading: action.status,
            };
            break;
        default:
            state = { ...state };
            break;
    }
    return state;
};

export default FolioLedgerReducer;