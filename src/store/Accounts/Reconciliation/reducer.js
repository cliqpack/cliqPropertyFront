const initialState = {
    recon_list_data: null,
    recon_list_error: null,
    recon_list_loading: false,

    recon_data: null,
    recon_error: null,
    recon_loading: false,

    receipt_list_data: null,
    receipt_list_error: null,
    receipt_list_loading: false,

    un_list_data: null,
    un_list_error: null,
    un_list_loading: false,

    un_all_list_data: null,
    un_all_list_error: null,
    un_all_list_loading: false,

    ad_list_data: null,
    ad_list_error: null,
    ad_list_loading: false,

    add_adjustment_loading: false,

    rmv_adjustment_loading: false,

    uir_list_data: null,
    uir_list_error: null,
    uir_list_loading: false,

    all_ad_list_data: null,
    all_ad_list_error: null,
    all_ad_list_loading: false,

    reconcile_bank_deposit_loading: false,

    unreconcile_bank_deposit_loading: false,

    un_all_list_data: null,
    un_all_list_error: null,
    un_all_list_loading: false,

    fl_data: null,
    fl_error: null,
    fl_loading: false,

    trial_data: null,
    trial_error: null,
    trial_loading: false,

    bank_statement_edit_data: null,
    bank_statement_edit_error: null,
    bank_statement_edit_loading: false,

    uwl_all_data: null,
    uwl_all_error: null,
    uwl_all_loading: false,

    uwl_data: null,
    uwl_error: null,
    uwl_loading: false,

    uwl_add_loading: false,

    uwl_rmv_loading: false,

    unp_data: null,
    unp_error: null,
    unp_loading: false,

    unp_post_loading: false,

    jrd_data: null,
    jrd_error: null,
    jrd_loading: false,

    crd_data: null,
    crd_error: null,
    crd_loading: false,

    tard_data: null,
    tard_error: null,
    tard_loading: false,

    new_withdrawals_data: null,
    new_withdrawals_error: null,
    new_withdrawals_loading: false,

    crrd_data: null,
    crrd_error: null,
    crrd_loading: false,

    nwrd_data: null,
    nwrd_error: null,
    nwrd_loading: false,

    reconciliation_store: null,
    reconciliation_store_error: null,
    reconciliation_store_loading: false,

    reconcile_store: null,
    reconcile_store_error: null,
    reconcile_store_loading: false,
    
    approve_reconciliation_loading: false,
    approved_reconciliation_status: false,
    approved_reconciliation_loading: false,
    revoke_reconciliation_loading: false,
}

const Reconciliations = (state = initialState, action) => {
    switch (action.type) {
        case 'RECONCILE':
            state = {
                ...state,
                reconcile_store: action.payload,
                reconcile_store_error: action.status,
                reconcile_store_loading: action.status,
            }
            break;
        case 'RECONCILE_FRESH':
            state = {
                ...state,
                reconcile_store_loading: action.status,
            }
            break;
        case 'APPROVE_RECONCILIATION':
            state = {
                ...state,
                approve_reconciliation_loading: action.status,
            }
            break;
        case 'APPROVE_RECONCILIATION_FRESH':
            state = {
                ...state,
                approve_reconciliation_loading: action.status,
            }
            break;
        case 'APPROVED_RECONCILIATION':
            state = {
                ...state,
                approved_reconciliation_status: action.payload.status,
                approved_reconciliation_loading: action.status,
            }
            break;
        case 'APPROVED_RECONCILIATION_FRESH':
            state = {
                ...state,
                approved_reconciliation_status: action.payload,
                approved_reconciliation_loading: action.status,
            }
            break;
        case 'REVOKE_RECONCILIATION':
            state = {
                ...state,
                revoke_reconciliation_loading: action.status,
            }
            break;
        case 'REVOKE_RECONCILIATION_FRESH':
            state = {
                ...state,
                revoke_reconciliation_loading: action.status,
            }
            break;
        case 'RECONCILIATIONS_STORE':
            state = {
                ...state,
                reconciliation_store: action.payload,
                reconciliation_store_error: action.status,
                reconciliation_store_loading: action.status,
            }
            break;
        case 'RECONCILIATIONS_LIST':
            state = {
                ...state,
                recon_list_data: action.payload,
                recon_list_error: action.status,
                recon_list_loading: action.status,
            }
            break;
        case 'RECONCILIATION':
            state = {
                ...state,
                recon_data: action.payload,
                recon_error: action.status,
                recon_loading: action.status,
            }
            break;
        case 'RECONCILIATION_FRESH':
            state = {
                ...state,
                recon_loading: action.status,
            }
            break;
        case 'RECEIPT_LIST':
            state = {
                ...state,
                receipt_list_data: action.payload,
                receipt_list_error: action.status,
                receipt_list_loading: action.status,
            }
            break;
        case 'RECEIPT_LIST_FRESH':
            state = {
                ...state,
                receipt_list_loading: action.status,
            }
            break;
        case 'UN_LIST':
            state = {
                ...state,
                un_list_data: action.payload,
                un_list_error: action.status,
                un_list_loading: action.status,
            }
            break;
        case 'UN_LIST_FRESH':
            state = {
                ...state,
                un_list_loading: action.status,
            }
            break;
        case 'UN_ALL_LIST':
            state = {
                ...state,
                un_all_list_data: action.payload,
                un_all_list_error: action.status,
                un_all_list_loading: action.status,
            }
            break;
        case 'UN_ALL_LIST_FRESH':
            state = {
                ...state,
                un_all_list_data: action.payload,
                un_all_list_error: action.error,
                un_all_list_loading: action.status,
            }
            break;
        case 'AD_LIST':
            state = {
                ...state,
                ad_list_data: action.payload,
                ad_list_error: action.status,
                ad_list_loading: action.status,
            }
            break;
        case 'AD_LIST_FRESH':
            state = {
                ...state,
                ad_list_loading: action.status,
            }
            break;
        case 'ALL_AD_LIST':
            state = {
                ...state,
                all_ad_list_data: action.payload,
                all_ad_list_error: action.status,
                all_ad_list_loading: action.status,
            }
            break;
        case 'ALL_AD_LIST_FRESH':
            state = {
                ...state,
                all_ad_list_data: action.payload,

                all_ad_list_loading: action.status,
            }
            break;
        case 'ADD_ADJUSTMENT':
            state = {
                ...state,
                add_adjustment_loading: action.status,
            }
            break;
        case 'ADD_ADJUSTMENT_FRESH':
            state = {
                ...state,
                add_adjustment_loading: action.status,
            }
            break;
        case 'RMV_ADJUSTMENT':
            state = {
                ...state,
                rmv_adjustment_loading: action.status,
            }
            break;
        case 'RMV_ADJUSTMENT_FRESH':
            state = {
                ...state,
                rmv_adjustment_loading: action.status,
            }
            break;
        case 'UNRECONCILE_ITEM_REPORT':
            state = {
                ...state,
                uir_list_data: action.payload,
                uir_list_error: action.status,
                uir_list_loading: action.status,
            }
            break;
        case 'RECONCILE_BANK_DEPOSIT':
            state = {
                ...state,
                reconcile_bank_deposit_loading: action.status,
            }
            break;

        case 'RECONCILE_BANK_DEPOSIT_FRESH':
            state = {
                ...state,
                reconcile_bank_deposit_loading: action.status,
            }
            break;

        case 'UNRECONCILE_BANK_DEPOSIT':
            state = {
                ...state,
                unreconcile_bank_deposit_loading: action.status,
            }
            break;
        case 'UNRECONCILE_BANK_DEPOSIT_FRESH':
            state = {
                ...state,
                unreconcile_bank_deposit_loading: action.status,
            }
            break;

        case 'UN_ALL_LIST':
            state = {
                ...state,
                un_all_list_data: action.payload,
                un_all_list_error: action.status,
                un_all_list_loading: action.status,
            }
            break;
        case 'UN_ALL_LIST_FRESH':
            state = {
                ...state,
                un_all_list_data: action.payload,
                un_all_list_error: action.error,
                un_all_list_loading: action.status,
            }
            break;
        case 'FL_DATA':
            state = {
                ...state,
                fl_data: action.payload,
                fl_error: action.status,
                fl_loading: action.status,
            }
            break;
        case 'TRIAL_DATA':
            state = {
                ...state,
                trial_data: action.payload,
                trial_error: action.status,
                trial_loading: action.status,
            }
            break;
        case 'BANK_STATEMENT_EDIT':
            state = {
                ...state,
                bank_statement_edit_data: action.payload,
                bank_statement_edit_error: action.status,
                bank_statement_edit_loading: action.status,
            }
            break;
        case 'BANK_STATEMENT_EDIT_FRESH':
            state = {
                ...state,
                bank_statement_edit_loading: action.status,
            }
            break;
        case 'UNRECONCILE_WITHDRAWALS_LIST_ALL':
            state = {
                ...state,
                uwl_all_data: action.payload,
                uwl_all_error: action.status,
                uwl_all_loading: action.status,
            }
            break;
        case 'UNRECONCILE_WITHDRAWALS_LIST_ALL_FRESH':
            state = {
                ...state,
                uwl_all_data: action.payload,

                uwl_all_loading: action.status,
            }
            break;
        case 'UNRECONCILE_WITHDRAWALS_LIST':
            state = {
                ...state,
                uwl_data: action.payload,
                uwl_error: action.status,
                uwl_loading: action.status,
            }
            break;
        case 'UNRECONCILE_WITHDRAWALS_LIST_FRESH':
            state = {
                ...state,
                uwl_loading: action.status,
            }
            break;
        case 'UNRECONCILE_WITHDRAWALS_ADD':
            state = {
                ...state,
                uwl_add_loading: action.status,
            }
            break;
        case 'UNRECONCILE_WITHDRAWALS_ADD_FRESH':
            state = {
                ...state,
                uwl_add_loading: action.status,
            }
            break;
        case 'UNRECONCILE_WITHDRAWALS_RMV':
            state = {
                ...state,
                uwl_rmv_loading: action.status,
            }
            break;
        case 'UNRECONCILE_WITHDRAWALS_RMV_FRESH':
            state = {
                ...state,
                uwl_rmv_loading: action.status,
            }
            break;
        case 'WITHDRAWALS_NOT_PROCESSED':
            state = {
                ...state,
                unp_data: action.payload,
                unp_error: action.status,
                unp_loading: action.status,
            }
            break;
        case 'WITHDRAWALS_NOT_PROCESSED_FRESH':
            state = {
                ...state,
                unp_loading: action.status,
            }
            break;
        case 'WITHDRAWALS_NOT_PROCESSED_POST':
            state = {
                ...state,
                unp_post_loading: action.status,
            }
            break;
        case 'WITHDRAWALS_NOT_PROCESSED_POST_FRESH':
            state = {
                ...state,
                unp_post_loading: action.status,
            }
            break;
        case 'JOURNAL_REPORT_DATA':
            state = {
                ...state,
                jrd_data: action.payload,
                jrd_error: action.status,
                jrd_loading: action.status,
            }
            break;
        case 'JOURNAL_REPORT_DATA_FRESH':
            state = {
                ...state,
                jrd_loading: action.status,
            }
            break;
        case 'CASHBOOK_REPORT_DATA':
            state = {
                ...state,
                crd_data: action.payload,
                crd_error: action.status,
                crd_loading: action.status,
            }
            break;
        case 'CASHBOOK_REPORT_DATA_FRESH':
            state = {
                ...state,
                crd_loading: action.status,
            }
            break;
        case 'TRANSACTION_AUDIT_REPORT_DATA':
            state = {
                ...state,
                tard_data: action.payload,
                tard_error: action.status,
                tard_loading: action.status,
            }
            break;
        case 'TRANSACTION_AUDIT_REPORT_DATA_FRESH':
            state = {
                ...state,
                tard_loading: action.status,
            }
            break;
        case 'NEWWITHDRAWALS_LIST':
            state = {
                ...state,
                new_withdrawals_data: action.payload,
                new_withdrawals_error: action.status,
                new_withdrawals_loading: action.status,
            }
            break;
        case 'NEWWITHDRAWALS_LIST_FRESH':
            state = {
                ...state,
                new_withdrawals_loading: action.status,
            }
            break;
        case 'CASHBOOK_REPORT_RECIEPT_DATA':
            state = {
                ...state,
                crrd_data: action.payload,
                crrd_error: action.status,
                crrd_loading: action.status,
            }
            break;
        case 'CASHBOOK_REPORT_RECIEPT_DATA_FRESH':
            state = {
                ...state,
                crrd_loading: action.status,
            }
            break;
        case 'NEW_WITHDRAWALS_REPORT_DATA':
            state = {
                ...state,
                nwrd_data: action.payload,
                nwrd_error: action.status,
                nwrd_loading: action.status,
            }
            break;
        case 'NEW_WITHDRAWALS_REPORT_DATA_FRESH':
            state = {
                ...state,
                nwrd_loading: action.status,
            }
            break;
        default:
            state = { ...state }
            break;
    }

    return state;
}

export default Reconciliations;