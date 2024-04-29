const initialState = {
  add_invoice_loading: false,
  edit_invoice_loading: false,

  invoice_list_data: null,
  invoice_list_data_error: null,
  invoice_list_data_loading: false,

  future_invoice_list_data: null,
  future_invoice_list_data_error: null,
  future_invoice_list_data_loading: false,

  paid_invoice_list_data: null,
  paid_invoice_list_data_error: null,
  paid_invoice_list_data_loading: false,

  uploaded_invoice_list_data: null,
  uploaded_invoice_list_data_error: null,
  uploaded_invoice_list_data_loading: false,

  delete_invoice_loading: false,
  delete_invoices_loading: false,
};

const AccountsInvoices = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_INVOICE":
      state = {
        ...state,
        add_invoice_loading: action.status,
      };
      break;
    case "EDIT_BILLS_TENANT_INVOICE":
      state = {
        ...state,
        edit_invoice_loading: action.status,
      };
      break;
    case "EDIT_BILLS_TENANT_INVOICE_FRESH":
      state = {
        ...state,
        edit_invoice_loading: action.status,
      };
      break;
    case "INVOICE_LIST":
      state = {
        ...state,
        invoice_list_data: action.payload,
        invoice_list_data_error: action.status,
        invoice_list_data_loading: action.status,
      };
      break;
    case "FUTURE_INVOICE_LIST":
      state = {
        ...state,
        future_invoice_list_data: action.payload,
        future_invoice_list_data_error: action.status,
        future_invoice_list_data_loading: action.status,
      };
      break;
    case "PAID_INVOICE_LIST":
      state = {
        ...state,
        paid_invoice_list_data: action.payload,
        paid_invoice_list_data_error: action.status,
        paid_invoice_list_data_loading: action.status,
      };
      break;
    case "UPLOADED_INVOICE_LIST":
      state = {
        ...state,
        uploaded_invoice_list_data: action.payload,
        uploaded_invoice_list_data_error: action.status,
        uploaded_invoice_list_data_loading: action.status,
      };
      break;
    case "INVOICE_TENANT":
      state = {
        ...state,
        invoice_tenant_data: action.payload,
        invoice_tenant_data_error: action.status,
        invoice_tenant_data_loading: action.status,
      };
      break;
    case "DELETE_INVOICE":
      state = {
        ...state,
        delete_invoice_loading: action.status,
      };
      break;
    case "DELETE_INVOICE_FRESH":
      state = {
        ...state,
        delete_invoice_loading: action.status,
      };
      break;
    case "DELETE_INVOICES":
      state = {
        ...state,
        delete_invoices_loading: action.status,
      };
      break;
    case "DELETE_INVOICES_FRESH":
      state = {
        ...state,
        delete_invoices_loading: action.status,
      };
      break;
    default:
      state = { ...state };
      break;
  }
  return state;
};

export default AccountsInvoices;
