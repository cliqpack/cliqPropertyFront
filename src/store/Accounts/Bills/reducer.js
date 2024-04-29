const initialState = {
  add_bills_loading: false,

  accounts_list_data: null,
  accounts_list_error: null,
  accounts_list_loading: false,

  accounts_data: null,
  accounts_error: null,
  accounts_loading: false,

  supplier_list_data: null,
  supplier_list_error: null,
  supplier_list_loading: false,

  folio_list_data: null,
  folio_list_error: null,
  folio_list_loading: false,

  job_list_data: null,
  job_list_error: null,
  job_list_loading: false,

  tenancy_list_data: null,
  tenancy_list_error: null,
  tenancy_list_loading: false,

  invoice_chart_list_data: null,
  invoice_chart_list_error: null,
  invoice_chart_list_loading: false,

  add_bills_tenant_invoice_loading: false,

  bills_list_data: null,
  bills_list_error: null,
  bills_list_loading: false,

  bills_list_future_data: null,
  bills_list_future_error: null,
  bills_list_future_loading: false,

  bills_list_paid_data: null,
  bills_list_paid_error: null,
  bills_list_paid_loading: false,

  edit_bills_loading: false,

  pay_bill_loading: false,

  delete_bill_loading: false,

  upload_bills_list_data: null,
  upload_bills_list_error: null,
  upload_bills_list_loading: false,

  approval_bills_list_data: null,
  approval_bills_list_error: null,
  approval_bills_list_loading: false,

  approve_bill_loading: false,
  approve_multiple_bill_loading: false,

  pay_bill_list_loading: false,

  delete_bill_action_loading: false,

  bill_accounts_list_data: null,
  bill_accounts_list_error: null,
  bill_accounts_list_loading: false,
};

const Bills = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_BILLS":
      state = {
        ...state,
        add_bills_loading: action.status,
      };
      break;
    case "ADD_BILLS_FRESH":
      state = {
        ...state,
        add_bills_loading: action.status,
      };
      break;
    case "EDIT_BILLS":
      state = {
        ...state,
        edit_bills_loading: action.status,
      };
      break;
    case "EDIT_BILLS_FRESH":
      state = {
        ...state,
        edit_bills_loading: action.status,
      };
      break;
    case "ADD_BILLS_TENANT_INVOICE":
      state = {
        ...state,
        add_bills_tenant_invoice_loading: action.status,
      };
      break;
    case "ADD_BILLS_TENANT_INVOICE_FRESH":
      state = {
        ...state,
        add_bills_tenant_invoice_loading: action.status,
      };
      break;
    case "ACCOUNTS_LIST":
      state = {
        ...state,
        accounts_list_data: action.payload,
        accounts_list_error: action.status,
        accounts_list_loading: action.status,
      };
      break;
    case "ACCOUNTS_LIST_FRESH":
      state = {
        ...state,
        accounts_list_loading: action.status,
      };
      break;
    case "BILL_ACCOUNTS_LIST":
      state = {
        ...state,
        bill_accounts_list_data: action.payload,
        bill_accounts_list_error: action.status,
        bill_accounts_list_loading: action.status,
      };
      break;
    case "BILL_ACCOUNTS_LIST_FRESH":
      state = {
        ...state,
        bill_accounts_list_loading: action.status,
      };
      break;
    case "ACCOUNTS":
      state = {
        ...state,
        accounts_data: action.payload,
        accounts_error: action.status,
        accounts_loading: action.status,
      };
      break;
    case "ACCOUNTS_FRESH":
      state = {
        ...state,
        accounts_loading: action.status,
      };
      break;
    case "SUPPLIER_LIST":
      state = {
        ...state,
        supplier_list_data: action.payload,
        supplier_list_error: action.status,
        supplier_list_loading: action.status,
      };
      break;
    case "SUPPLIER_LIST_FRESH":
      state = {
        ...state,
        supplier_list_loading: action.status,
      };
      break;
    case "FOLIO_LIST":
      state = {
        ...state,
        folio_list_data: action.payload,
        folio_list_error: action.status,
        folio_list_loading: action.status,
      };
      break;
    case "FOLIO_LIST_FRESH":
      state = {
        ...state,
        folio_list_loading: action.status,
      };
      break;
    case "JOB_LIST":
      state = {
        ...state,
        job_list_data: action.payload,
        job_list_error: action.status,
        job_list_loading: action.status,
      };
      break;
    case "JOB_LIST_FRESH":
      state = {
        ...state,

        job_list_loading: action.status,
      };
      break;
    case "INVOICE_CHART_LIST":
      state = {
        ...state,
        invoice_chart_list_data: action.payload,
        invoice_chart_list_error: action.status,
        invoice_chart_list_loading: action.status,
      };
      break;
    case "INVOICE_CHART_LIST_FRESH":
      state = {
        ...state,

        invoice_chart_list_loading: action.status,
      };
      break;
    case "TENANCY_LIST":
      state = {
        ...state,
        tenancy_list_data: action.payload,
        tenancy_list_error: action.status,
        tenancy_list_loading: action.status,
      };
      break;
    case "TENANCY_LIST_FRESH":
      state = {
        ...state,
        tenancy_list_loading: action.status,
      };
      break;
    case "BILLS_LIST":
      state = {
        ...state,
        bills_list_data: action.payload,
        bills_list_error: action.status,
        bills_list_loading: action.status,
      };
      break;
    case "BILLS_LIST_FRESH":
      state = {
        ...state,
        bills_list_loading: action.status,
      };
      break;
    case "BILLS_LIST_FUTURE":
      state = {
        ...state,
        bills_list_future_data: action.payload,
        bills_list_future_error: action.status,
        bills_list_future_loading: action.status,
      };
      break;
    case "BILLS_LIST_FUTURE_FRESH":
      state = {
        ...state,
        bills_list_future_loading: action.status,
      };
      break;
    case "BILLS_LIST_PAID":
      state = {
        ...state,
        bills_list_paid_data: action.payload,
        bills_list_paid_error: action.status,
        bills_list_paid_loading: action.status,
      };
      break;
    case "BILLS_LIST_PAID_FRESH":
      state = {
        ...state,
        bills_list_paid_loading: action.status,
      };
      break;
    case "PAY_BILL":
      state = {
        ...state,
        pay_bill_loading: action.status,
      };
      break;
    case "PAY_BILL_LIST":
      state = {
        ...state,
        pay_bill_list_loading: action.status,
      };
      break;
    case "PAY_BILL_LIST_FRESH":
      state = {
        ...state,
        pay_bill_list_loading: action.status,
      };
      break;
    case "PAY_BILL_FRESH":
      state = {
        ...state,
        pay_bill_loading: action.status,
      };
      break;
    case "DELETE_BILL":
      state = {
        ...state,
        delete_bill_loading: action.status,
      };
      break;
    case "DELETE_BILL_FRESH":
      state = {
        ...state,
        delete_bill_loading: action.status,
      };
      break;
    case "UPLOAD_BILLS_LIST":
      state = {
        ...state,
        upload_bills_list_data: action.payload,
        upload_bills_list_error: action.status,
        upload_bills_list_loading: action.status,
      };
      break;
    case "UPLOAD_BILLS_LIST_FRESH":
      state = {
        ...state,

        upload_bills_list_loading: action.status,
      };
      break;
    case "APPROVAL_BILLS_LIST":
      state = {
        ...state,
        approval_bills_list_data: action.payload,
        approval_bills_list_error: action.status,
        approval_bills_list_loading: action.status,
      };
      break;
    case "APPROVAL_BILLS_LIST_FRESH":
      state = {
        ...state,

        approval_bills_list_loading: action.status,
      };
      break;
    case "APPROVE_BILL":
      state = {
        ...state,
        approve_bill_loading: action.status,
      };
      break;
    case "APPROVE_BILL_FRESH":
      state = {
        ...state,
        approve_bill_loading: action.status,
      };
      break;
    case "APPROVE_MULTIPLE_BILL":
      state = {
        ...state,
        approve_multiple_bill_loading: action.status,
      };
      break;
    case "APPROVE_MULTIPLE_BILL_FRESH":
      state = {
        ...state,
        approve_multiple_bill_loading: action.status,
      };
      break;
    case "DELETE_BILL_ACTION":
      state = {
        ...state,

        delete_bill_action_loading: action.status,
      };
      break;
    case "DELETE_BILL_ACTION_FRESH":
      state = {
        ...state,

        delete_bill_action_loading: action.status,
      };
      break;

    default:
      state = { ...state };
      break;
  }
  return state;
};

export default Bills;
