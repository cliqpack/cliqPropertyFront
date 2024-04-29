const initialState = {
  due_disbursement_list_data: null,
  due_disbursement_list_loading: false,

  all_owner_due_disbursement_list_data: null,
  all_owner_due_disbursement_list_loading: false,

  store_disbursement_loading: false,
  store_single_disbursement_loading: false,
  store_supplier_disbursement_loading: false,
  store_seller_disbursement_loading:false,

  disbursement_preview_loading: false,
};

const Disbursement = (state = initialState, action) => {
  switch (action.type) {
    case "DUE_DISBURSEMENT_LIST":
      state = {
        ...state,
        due_disbursement_list_data: action.payload,
        due_disbursement_list_loading: action.status,
      };
      break;
    case "DUE_DISBURSEMENT_LIST_FRESH":
      state = {
        ...state,
        due_disbursement_list_data: action.payload,
        due_disbursement_list_loading: action.status,
      };
      break;
    case "DISBURSEMENT_PREVIEW":
      state = {
        ...state,
        disbursement_preview_loading: action.status,
      };
      break;
    case "DISBURSEMENT_PREVIEW_FRESH":
      state = {
        ...state,
        disbursement_preview_loading: action.status,
      };
      break;
    case "STORE_DISBURSEMENT":
      state = {
        ...state,
        store_disbursement_loading: action.status,
      };
      break;
    case "STORE_DISBURSEMENT_FRESH":
      state = {
        ...state,
        store_disbursement_loading: action.status,
      };
      break;
    case "STORE_SINGLE_DISBURSEMENT":
      state = {
        ...state,
        store_single_disbursement_loading: action.status,
      };
      break;
    case "STORE_SINGLE_DISBURSEMENT_FRESH":
      state = {
        ...state,
        store_single_disbursement_loading: action.status,
      };
      break;
    case "STORE_SUPPLIER_DISBURSEMENT":
      state = {
        ...state,
        store_supplier_disbursement_loading: action.status,
      };
      break;
    case "STORE_SUPPLIER_DISBURSEMENT_FRESH":
      state = {
        ...state,
        store_supplier_disbursement_loading: action.status,
      };
      break;
    case "STORE_SELLER_DISBURSEMENT":
      state = {
        ...state,
        store_seller_disbursement_loading: action.status,
      };
      break;
    case "STORE_SELLER_DISBURSEMENT_FRESH":
      state = {
        ...state,
        store_seller_disbursement_loading: action.status,
      };
      break;
    default:
      state = { ...state };
      break;
  }
  return state;
};

export default Disbursement;
