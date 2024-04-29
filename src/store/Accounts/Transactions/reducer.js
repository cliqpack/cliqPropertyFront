const initialState = {
  tenant_folio_list_data: null,
  tenant_folio_list_data_error: null,
  tenant_folio_list_data_loading: false,

  tenant_info_data: null,
  tenant_info_data_error: null,
  tenant_info_data_loading: null,

  add_tenant_receipt_data: null,
  add_tenant_receipt_loading: null,

  tenant_deposit_receipt_data: null,
  tenant_deposit_receipt_loading: null,

  add_folio_receipt_loading: false,
  add_folio_withdraw_loading: false,
  add_journal_loading: false,

  transaction_list_data: null,
  transaction_list_error: null,
  transaction_list_loading: false,

  receipt_folio_list_data: null,
  receipt_folio_list_error: null,
  receipt_folio_list_loading: false,

  receipt_folio_balance_data: null,
  receipt_folio_balance_error: null,
  receipt_folio_balance_loading: false,

  transaction_list_info_data: null,
  transaction_list_info_error: null,
  transaction_list_info_loading: false,

  transaction_list_id_data: null,
  transaction_list_id_error: null,
  transaction_list_id_loading: false,

  archive_tenant_data: null,
  archive_tenant_error: null,
  archive_tenant_loading: false,

  archive_owner_data: null,
  archive_owner_error: null,
  archive_owner_loading: false,

  disburse_tenant_data: null,
  disburse_tenant_error: null,
  disburse_tenant_loading: false,

  reverse_receipt_data: null,
  reverse_receipt_error: null,
  reverse_receipt_loading: false,

  import_bank_file_data: null,
  import_bank_file_error: null,
  import_bank_file_loading: false,

  reconcile_bank_file_data: null,
  reconcile_bank_file_error: null,
  reconcile_bank_file_loading: false,

  reconcile_bank_file_store_loading: false,

  delete_import_bank_file_loading: false,

  receipt_as_rent_loading: false,

  transaction_list_id_owner_folio_data: null,
  transaction_list_id_owner_folio_error: null,
  transaction_list_id_owner_folio_loading: false,

  pending_bills_owner_folio_data: null,
  pending_bills_owner_folio_error: null,
  pending_bills_owner_folio_loading: false,

  paid_bills_owner_folio_data: null,
  paid_bills_owner_folio_error: null,
  paid_bills_owner_folio_loading: false,

  pending_invoices_owner_folio_data: null,
  pending_invoices_owner_folio_error: null,
  pending_invoices_owner_folio_loading: false,

  rent_action_data: null,
  rent_action_error: null,
  rent_action_loading: false,

  reset_rent_loading: false,

  rent_management_list_data: null,
  rent_management_list_error: null,
  rent_management_list_loading: false,

  rent_action_store_loading: false,
  delete_rent_action_loading: false,

  seller_folio_list_data: null,
  seller_folio_list_data_loading: false,

  seller_folio_list_id_data: null,
  seller_folio_list_id_data_loading: false,

  add_sale_receipt_data_loading: false,

  transaction_list_id_seller_folio_data: null,
  transaction_list_id_seller_folio_error: false,
  transaction_list_id_seller_folio_loading: false,

  pending_bills_seller_folio_data: null,
  pending_bills_seller_folio_error: false,
  pending_bills_seller_folio_loading: false,

  paid_bills_seller_folio_data: null,
  paid_bills_seller_folio_error: false,
  paid_bills_seller_folio_loading: false,

  archive_seller_data: null,
  archive_seller_error: false,
  archive_seller_loading: false,

  supplier_folio_transactions_data: null,
  supplier_folio_transactions_data_loading: false,

  supplier_folio_bill_data: null,
  supplier_folio_bill_data_loading: false,

  supplier_folio_invoice_data: null,
  supplier_folio_invoice_data_loading: false,

  cancel_rent_loading: false,

  generate_rent_invoice_loading: false
};

const AccountsTransactions = (state = initialState, action) => {
  switch (action.type) {
    case "TENANT_FOLIO_LIST":
      state = {
        ...state,
        tenant_folio_list_data: action.payload,
        tenant_folio_list_data_error: action.status,
        tenant_folio_list_data_loading: action.status,
      };
      break;
    case "TENANT_INFO":
      state = {
        ...state,
        tenant_info_data: action.payload,
        tenant_info_data_error: action.status,
        tenant_info_data_loading: action.status,
      };
      break;
    case "TENANT_INFO_FRESH":
      state = {
        ...state,
        tenant_info_data: null,
        tenant_info_data_error: null,
        tenant_info_data_loading: null,
      };
      break;
    case "ADD_TENANT_RECEIPT":
      state = {
        ...state,
        add_tenant_receipt_data: action.payload,
        add_tenant_receipt_loading: action.status,
      };
      break;
    case "TENANT_DEPOSIT_RECEIPT":
      state = {
        ...state,
        tenant_deposit_receipt_data: action.payload,
        tenant_deposit_receipt_loading: action.status,
      };
      break;
    case "TENANT_DEPOSIT_RECEIPT_FRESH":
      state = {
        ...state,
        tenant_deposit_receipt_data: action.payload,
        tenant_deposit_receipt_loading: action.status,
      };
      break;

    case "ADD_TENANT_RECEIPT_FRESH":
      state = {
        ...state,
        add_tenant_receipt_data: null,
        add_tenant_receipt_loading: false,
      };
      break;
    case "FOLIO_RECEIPT":
      state = {
        ...state,
        add_folio_receipt_loading: action.status,
      };
      break;
    case "FOLIO_RECEIPT_FRESH":
      state = {
        ...state,
        add_folio_receipt_loading: action.status,
      };
      break;
    case "TRANSACTIONS_LIST":
      state = {
        ...state,
        transaction_list_data: action.payload,
        transaction_list_error: action.status,
        transaction_list_loading: action.status,
      };
      break;
    case "FOLIO_WITHDRAW":
      state = {
        ...state,
        add_folio_withdraw_loading: action.status,
      };
      break;
    case "FOLIO_WITHDRAW_FRESH":
      state = {
        ...state,
        add_folio_withdraw_loading: action.status,
      };
      break;
    case "JOURNAL":
      state = {
        ...state,
        add_journal_loading: action.status,
      };
      break;
    case "TRANSACTIONS_LIST_FRESH":
      state = {
        ...state,
        transaction_list_loading: action.status,
      };
    case "JOURNAL_FRESH":
      state = {
        ...state,
        add_journal_loading: action.status,
      };
      break;
    case "RECEIPT_FOLIO_LIST":
      state = {
        ...state,
        receipt_folio_list_data: action.payload,
        receipt_folio_list_error: action.status,
        receipt_folio_list_loading: action.status,
      };
      break;
    case "RECEIPT_FOLIO_BALANCE":
      state = {
        ...state,
        receipt_folio_balance_data: action.payload,
        receipt_folio_balance_error: action.status,
        receipt_folio_balance_loading: action.status,
      };
      break;
    case "RECEIPT_FOLIO_BALANCE_FRESH":
      state = {
        ...state,
        receipt_folio_balance_data: action.payload,
        receipt_folio_balance_error: action.status,
        receipt_folio_balance_loading: action.status,
      };
      break;
    case "RECEIPT_FOLIO_BALANCE_LOADING_FRESH":
      state = {
        ...state,
        receipt_folio_balance_loading: action.status,
      };
      break;
    case "TRANSACTIONS_LIST_INFO":
      state = {
        ...state,
        transaction_list_info_data: action.payload,
        transaction_list_info_error: action.status,
        transaction_list_info_loading: action.status,
      };
    case "TRANSACTIONS_LIST_INFO_FRESH":
      state = {
        ...state,
        transaction_list_info_loading: action.status,
      };
    case "TRANSACTIONS_LIST_ID":
      state = {
        ...state,
        transaction_list_id_data: action.payload,
        transaction_list_id_error: action.status,
        transaction_list_id_loading: action.status,
      };
      break;
    case "TRANSACTIONS_LIST_ID_FRESH":
      state = {
        ...state,

        transaction_list_id_loading: action.status,
      };
      break;
    case "INVOICE_UNPAID_LIST_ID":
      state = {
        ...state,
        invoice_unpaid_list_id_data: action.payload,
        invoice_unpaid_list_id_error: action.status,
        invoice_unpaid_list_id_loading: action.status,
      };
      break;
    case "INVOICE_UNPAID_LIST_ID_FRESH":
      state = {
        ...state,
        invoice_unpaid_list_id_loading: action.status,
      };
      break;
    case "INVOICE_PAID_LIST_ID":
      state = {
        ...state,
        invoice_paid_list_id_data: action.payload,
        invoice_paid_list_id_error: action.status,
        invoice_paid_list_id_loading: action.status,
      };
      break;
    case "INVOICE_PAID_LIST_ID_FRESH":
      state = {
        ...state,
        invoice_paid_list_id_loading: action.status,
      };
      break;
    case "ARCHIVE_TENANT":
      state = {
        ...state,

        archive_tenant_data: action.payload,
        archive_tenant_error: action.status,
        archive_tenant_loading: action.status,
      };
      break;
    case "ARCHIVE_OWNER":
      state = {
        ...state,

        archive_owner_data: action.payload,
        archive_owner_error: action.status,
        archive_owner_loading: action.status,
      };
      break;
    case "ARCHIVE_SELLER":
      state = {
        ...state,
        archive_seller_data: action.payload,
        archive_seller_error: action.status,
        archive_seller_loading: action.status,
      };
      break;
    case "ARCHIVE_TENANT_FRESH":
      state = {
        ...state,

        archive_tenant_loading: action.status,
      };
      break;
    case "DISBURSE_TENANT":
      state = {
        ...state,
        disburse_tenant_data: action.payload,
        disburse_tenant_error: action.status,
        disburse_tenant_loading: action.status,
      };
      break;
    case "DISBURSE_TENANT_FRESH":
      state = {
        ...state,
        disburse_tenant_loading: action.status,
      };
      break;
    case "REVERSE_RECEIPT":
      state = {
        ...state,

        reverse_receipt_data: action.payload,
        reverse_receipt_error: action.status,
        reverse_receipt_loading: action.status,
      };
      break;
    case "REVERSE_RECEIPT_FRESH":
      state = {
        ...state,
        reverse_receipt_loading: action.status,
        reverse_receipt_data: action.payload,
      };
      break;
    case "IMPORT_BANK_FILE":
      state = {
        ...state,
        import_bank_file_data: action.payload,
        import_bank_file_error: action.status,
        import_bank_file_loading: action.status,
      };
      break;
    case "IMPORT_BANK_FILE_FRESH":
      state = {
        ...state,
        import_bank_file_loading: action.status,
      };
      break;
    case "DELETE_IMPORT_BANK_FILE_DATA":
      state = {
        ...state,
        delete_import_bank_file_loading: action.status,
      };
      break;
    case "DELETE_IMPORT_BANK_FILE_DATA_FRESH":
      state = {
        ...state,
        delete_import_bank_file_loading: action.status,
      };
      break;
    case "RECEIPT_AS_RENT":
      state = {
        ...state,
        receipt_as_rent_loading: action.status,
      };
      break;
    case "RECEIPT_AS_RENT_FRESH":
      state = {
        ...state,
        receipt_as_rent_loading: action.status,
      };
      break;
    case "RECONCILE_BANK_FILE_STORE":
      state = {
        ...state,
        reconcile_bank_file_store_loading: action.status,
      };
      break;
    case "RECONCILE_BANK_FILE_STORE_FRESH":
      state = {
        ...state,
        reconcile_bank_file_store_loading: action.status,
      };
      break;
    case "RECONCILE_BANK_FILE":
      state = {
        ...state,
        reconcile_bank_file_data: action.payload,
        reconcile_bank_file_error: action.status,
        reconcile_bank_file_loading: action.status,
      };
      break;
    case "RECONCILE_BANK_FILE_FRESH":
      state = {
        ...state,
        reconcile_bank_file_data: action.payload,
        reconcile_bank_file_error: action.status,
        reconcile_bank_file_loading: action.status,
      };
      break;
    case "RECONCILE_BANK_FILE_FRESH":
      state = {
        ...state,
        reconcile_bank_file_data: action.payload,
        reconcile_bank_file_error: action.status,
        reconcile_bank_file_loading: action.status,
      };
      break;
    case "TRANSACTIONS_LIST_ID_OWNER_FOLIO":
      state = {
        ...state,
        transaction_list_id_owner_folio_data: action.payload,
        transaction_list_id_owner_folio_error: action.status,
        transaction_list_id_owner_folio_loading: action.status,
      };
      break;
    case "TRANSACTIONS_LIST_ID_OWNER_FOLIO_FRESH":
      state = {
        ...state,
        transaction_list_id_owner_folio_loading: action.status,
      };
      break;
    case "TRANSACTIONS_LIST_ID_SELLER_FOLIO":
      state = {
        ...state,
        transaction_list_id_seller_folio_data: action.payload,
        transaction_list_id_seller_folio_error: action.status,
        transaction_list_id_seller_folio_loading: action.status,
      };
      break;
    case "TRANSACTIONS_LIST_ID_SELLER_FOLIO_FRESH":
      state = {
        ...state,
        transaction_list_id_seller_folio_loading: action.status,
      };
      break;
    case "PENDING_BILLS_OWNER":
      state = {
        ...state,
        pending_bills_owner_folio_data: action.payload,
        pending_bills_owner_folio_error: action.status,
        pending_bills_owner_folio_loading: action.status,
      };
      break;
    case "PENDING_BILLS_OWNER_FRESH":
      state = {
        ...state,
        pending_bills_owner_folio_loading: action.status,
      };
      break;
    case "PAID_BILLS_OWNER":
      state = {
        ...state,
        paid_bills_owner_folio_data: action.payload,
        paid_bills_owner_folio_error: action.status,
        paid_bills_owner_folio_loading: action.status,
      };
      break;
    case "PAID_BILLS_OWNER_FRESH":
      state = {
        ...state,
        paid_bills_owner_folio_loading: action.status,
      };
      break;
    case "PENDING_BILLS_SELLER":
      state = {
        ...state,
        pending_bills_seller_folio_data: action.payload,
        pending_bills_seller_folio_error: action.status,
        pending_bills_seller_folio_loading: action.status,
      };
      break;
    case "PENDING_BILLS_SELLER_FRESH":
      state = {
        ...state,
        pending_bills_seller_folio_loading: action.status,
      };
      break;
    case "PAID_BILLS_SELLER":
      state = {
        ...state,
        paid_bills_seller_folio_data: action.payload,
        paid_bills_seller_folio_error: action.status,
        paid_bills_seller_folio_loading: action.status,
      };
      break;
    case "PAID_BILLS_SELLER_FRESH":
      state = {
        ...state,
        paid_bills_seller_folio_loading: action.status,
      };
      break;
    case "PENDING_INVOICES_OWNER":
      state = {
        ...state,
        pending_invoices_owner_folio_data: action.payload,
        pending_invoices_owner_folio_error: action.status,
        pending_invoices_owner_folio_loading: action.status,
      };
      break;
    case "PENDING_INVOICES_OWNER_FRESH":
      state = {
        ...state,
        pending_invoices_owner_folio_loading: action.status,
      };
      break;
    case "RENT_ACTION":
      state = {
        ...state,
        rent_action_data: action.payload,
        rent_action_error: action.status,
        rent_action_loading: action.status,
      };
      break;
    case "RESET_RENT":
      state = {
        ...state,
        reset_rent_loading: action.status,
      };
      break;
    case "RESET_RENT_FRESH":
      state = {
        ...state,
        reset_rent_loading: action.status,
      };
      break;
    case "RENT_MANAGEMENT_LIST":
      state = {
        ...state,
        rent_management_list_data: action.payload,
        rent_management_list_error: action.status,
        rent_management_list_loading: action.status,
      };
      break;
    case "RENT_MANAGEMENT_LIST_FRESH":
      state = {
        ...state,

        rent_management_list_loading: action.status,
      };
      break;
    case "RENT_ACTION_FRESH":
      state = {
        ...state,
        rent_action_loading: action.status,
      };
      break;
    case "RENT_ACTION_STORE":
      state = {
        ...state,
        rent_action_store_loading: action.status,
      };
      break;
    case "RENT_ACTION_STORE_FRESH":
      state = {
        ...state,
        rent_action_store_loading: action.status,
      };
      break;
    case "DELETE_RENT_ACTION":
      state = {
        ...state,
        delete_rent_action_loading: action.status,
      };
      break;
    case "DELETE_RENT_ACTION_FRESH":
      state = {
        ...state,
        delete_rent_action_loading: action.status,
      };
      break;
    case "SELLER_FOLIO_LIST":
      state = {
        ...state,
        seller_folio_list_data: action.payload,
        seller_folio_list_data_loading: action.status,
      };
      break;
    case "SELLER_FOLIO_LIST_ID":
      state = {
        ...state,
        seller_folio_list_id_data: action.payload,
        seller_folio_list_id_data_loading: action.status,
      };
      break;
    case "ADD_SALE_RECEIPT":
      state = {
        ...state,
        // seller_folio_list_id_data: action.payload,
        add_sale_receipt_data_loading: action.status,
      };
      break;
    case "ADD_SALE_RECEIPT_FRESH":
      state = {
        ...state,
        // seller_folio_list_id_data: action.payload,
        add_sale_receipt_data_loading: action.status,
      };
      break;
    case "SUPPLIER_FOLIO_TRANSACTIONS":
      state = {
        ...state,
        supplier_folio_transactions_data: action.payload,
        supplier_folio_transactions_data_loading: action.status,
      };
      break;
    case "SUPPLIER_FOLIO_BILLS":
      state = {
        ...state,
        supplier_folio_bill_data: action.payload,
        supplier_folio_bill_data_loading: action.status,
      };
      break;
    case "SUPPLIER_FOLIO_INVOICE":
      state = {
        ...state,
        supplier_folio_invoice_data: action.payload,
        supplier_folio_invoice_data_loading: action.status,
      };
      break;
    case "CANCEL_RENT":
      state = {
        ...state,

        cancel_rent_loading: action.status,
      };
      break;
    case "CANCEL_RENT_FRESH":
      state = {
        ...state,

        cancel_rent_loading: action.status,
      };
      break;
    case "GENERATE_RENT_INVOICE":
      state = {
        ...state,

        generate_rent_invoice_loading: action.status,
      };
      break;
    case "GENERATE_RENT_INVOICE_FRESH":
      state = {
        ...state,

        generate_rent_invoice_loading: action.status,
      };
      break;
    default:
      state = { ...state };
      break;
  }
  return state;
};

export default AccountsTransactions;
