const initialState = {
    supplier_folio_info_data: null,
    supplier_folio_info_error: null,
    supplier_folio_info_loading: false,


    transaction_list_id_supplier_folio_data: null,
    transaction_list_id_supplier_folio_error: null,
    transaction_list_id_supplier_folio_loading: false,

    pending_bills_supplier_folio_data: null,
    pending_bills_supplier_folio_error: false,
    pending_bills_supplier_folio_loading: false,

    paid_bills_supplier_folio_data: null,
    paid_bills_supplier_folio_error: false,
    paid_bills_supplier_folio_loading: false,

    pending_invoices_supplier_folio_data: null,
    pending_invoices_supplier_folio_error: false,
    pending_invoices_supplier_folio_loading: false,

    supplier_folio_disbursement_loading: false
}
const supplier = (state = initialState, action) => {
    switch (action.type) {

        case 'SUPPLIER_FOLIO_INFO':
            state = {
                ...state,
                supplier_folio_info_data: action.payload,
                supplier_folio_info_error: action.payload,
                supplier_folio_info_loading: action.status
            }
            break;
        case "TRANSACTIONS_LIST_ID_SUPPLIER_FOLIO":
            state = {
                ...state,
                transaction_list_id_supplier_folio_data: action.payload,
                transaction_list_id_supplier_folio_error: action.status,
                transaction_list_id_supplier_folio_loading: action.status,
            };
            break;
        case "TRANSACTIONS_LIST_ID_SUPPLIER_FOLIO_FRESH":
            state = {
                ...state,

                transaction_list_id_supplier_folio_loading: action.status,
            };
            break;

        case "PENDING_BILLS_SUPPLIER":
            state = {
                ...state,
                pending_bills_supplier_folio_data: action.payload,
                pending_bills_supplier_folio_error: action.status,
                pending_bills_supplier_folio_loading: action.status,
            };
            break;
        case "PENDING_BILLS_SUPPLIER_FRESH":
            state = {
                ...state,
                pending_bills_supplier_folio_loading: action.status,
            };
            break;
        case "PAID_BILLS_SUPPLIER":
            state = {
                ...state,
                paid_bills_supplier_folio_data: action.payload,
                paid_bills_supplier_folio_error: action.status,
                paid_bills_supplier_folio_loading: action.status,
            };
            break;
        case "PAID_BILLS_SUPPLIER_FRESH":
            state = {
                ...state,
                paid_bills_supplier_folio_loading: action.status,
            };
            break;


        case "PENDING_INVOICES_SUPPLIER":
            state = {
                ...state,
                pending_invoices_supplier_folio_data: action.payload,
                pending_invoices_supplier_folio_error: action.status,
                pending_invoices_supplier_folio_loading: action.status,
            };
            break;
        case "PENDING_INVOICES_SUPPLIER_FRESH":
            state = {
                ...state,
                pending_invoices_supplier_folio_loading: action.status,
            };
            break;
        case "SUPPLIER_FOLIO_DISBURSEMENT":
            state = {
                ...state,
                supplier_folio_disbursement_loading: action.status,
            };
            break;
        case "SUPPLIER_FOLIO_DISBURSEMENT_FRESH":
            state = {
                ...state,
                supplier_folio_disbursement_loading: action.status,
            };
            break;

        default:
            state = { ...state };
            break;
    }
    return state;
}
export default supplier;