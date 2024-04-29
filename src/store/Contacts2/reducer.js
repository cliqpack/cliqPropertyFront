const initialState = {
  contacts_list_data: null,
  contacts_list_error: null,
  contacts_list_loading: false,

  contact_add_id: null,
  contacts_add_loading: false,

  supplier_add_loading: false,
  supplier_add_data: null,

  supplier_info_data: null,
  supplier_info_error: null,
  supplier_info_loading: false,

  supplier_update_data: null,
  supplier_update_error: null,
  supplier_update_loading: false,

  contacts_show_data: null,
  contacts_show_error: null,
  contacts_show_loading: false,

  get_owner_contact_data: null,
  get_owner_contact_error: null,
  get_owner_contact_loading: false,

  contacts_edit_data: null,
  contacts_edit_error: null,
  contacts_edit_loading: false,

  contacts_list_owner: null,
  contacts_list_owner_error: null,
  contacts_list_owner_loading: false,

  contacts_list_tenant: null,
  contacts_list_tenant_error: null,
  contacts_list_tenant_loading: false,

  contacts_list_supplier: null,
  contacts_list_supplier_error: null,
  contacts_list_supplier_loading: false,

  contacts_list_seller: null,
  contacts_list_seller_error: null,
  contacts_list_seller_loading: false,

  user_list_data: null,
  user_list_error: null,
  user_list_loading: false,

  contact_label: null,
  contact_label_error: null,
  contact_label_loading: false,

  // Activity
  contact_all_activity: null,
  contact_all_activity_error: null,
  contact_all_activity_loading: false,

  gmtfbs_contacts_data: null,
  gmtfbs_contacts_error: null,
  gmtfbs_contacts_loading: false,

  smta_contacts_data: null,
  smta_contacts_error: null,
  smta_contacts_loading: false,

  email_validation_check_loading: false,

  contacts_show_folio_data: null,
  contacts_show_folio_error: null,
  contacts_show_folio_loading: false,
};

const contacts = (state = initialState, action) => {
  switch (action.type) {
    case "CONTACT_LIST":
      state = {
        ...state,
        contacts_list_data: action.payload,
        contacts_list_error: null,
        contacts_list_loading: action.status,
      };
      break;
    case "CONTACT_LIST_TYPE_OWNER":
      state = {
        ...state,
        contacts_list_owner: action.payload,
        contacts_list_owner_error: null,
        contacts_list_owner_loading: action.status,
      };
      break;
    case "CONTACT_LIST_TYPE_TENANT":
      state = {
        ...state,
        contacts_list_tenant: action.payload,
        contacts_list_tenant_error: null,
        contacts_list_tenant_loading: action.status,
      };
      break;
    case "CONTACT_LIST_TYPE_SUPPLIER":
      state = {
        ...state,
        contacts_list_supplier: action.payload,
        contacts_list_supplier_error: null,
        contacts_list_supplier_loading: action.status,
      };
      break;
    case "CONTACT_LIST_TYPE_SELLER":
      state = {
        ...state,
        contacts_list_seller: action.payload,
        contacts_list_seller_error: null,
        contacts_list_seller_loading: action.status,
      };
      break;
    case "SHOW_CONTACT":
      state = {
        ...state,
        contacts_show_data: action.payload,
        contacts_show_error: null,
        contacts_show_loading: action.status,
      };
      break;
    case "GET_OWNER_CONTACT":
      state = {
        ...state,
        get_owner_contact_data: action.payload,
        get_owner_contact_error: null,
        get_owner_contact_loading: action.status,
      };
      break;
    case "GET_OWNER_CONTACT_FRESH":
      state = {
        ...state,
        get_owner_contact_data: null,
        get_owner_contact_error: null,
        get_owner_contact_loading: false,
      };
      break;
    case "SHOW_CONTACT_FOLIO":
      state = {
        ...state,
        contacts_show_folio_data: action.payload,
        contacts_show_folio_error: null,
        contacts_show_folio_loading: action.status,
      };
      break;
    case "EDIT_CONTACT":
      state = {
        ...state,
        contacts_edit_data: action.payload,
        contacts_edit_error: null,
        contacts_edit_loading: action.status,
      };
      break;
    case "EDIT_CONTACT_FRESH":
      state = {
        ...state,
        contacts_edit_data: action.payload,
        contacts_edit_error: null,
        contacts_edit_loading: action.status,
      };
      break;
    case "ADD_CONTACT_FRESH":
      state = {
        ...state,
        contact_add_id: null,
        contacts_add_loading: action.status,
      };
      break;
    case "CONTACT_LIST_FRESH":
      state = {
        ...state,
        contacts_list_data: action.status,
        contacts_list_loading: false,
      };
      break;
    case "SHOW_CONTACT_FRESH":
      state = {
        ...state,
        contacts_show_data: null,
        contacts_show_loading: action.status,
      };
      break;

    case "CONTACT_ADD":
      state = {
        ...state,
        contact_add_id: action.payload,
        contacts_add_loading: action.status,
      };
      break;
    case "EDIT_CONTACT_ADD":
      state = {
        ...state,
        contacts_add_loading: action.status,
      };
      break;

    case "SUPPLIER_ADD":
      state = {
        ...state,
        supplier_add_data: action.payload,
        supplier_add_loading: action.status,
      };
      break;

    case "ADD_SUPPLIER_FRESH":
      state = {
        ...state,
        supplier_add_loading: action.status,
      };
      break;

    case "SUPPLIER_INFO":
      state = {
        ...state,
        supplier_info_data: action.payload,
        supplier_info_error: null,
        supplier_info_loading: action.status,
      };
      break;

    case "SUPPLIER_INFO_FRESH":
      state = {
        ...state,
        supplier_info_data: action.payload,
        supplier_info_error: action.error,
        supplier_info_loading: action.status,
      };
      break;

    case "SUPPLIER_UPDATE":
      state = {
        ...state,
        supplier_update_data: action.payload,
        supplier_update_error: null,
        supplier_update_loading: action.status,
      };
      break;
    case "SUPPLIER_UPDATE_FRESH":
      state = {
        ...state,
        supplier_update_data: action.payload,
        supplier_update_error: action.error,
        supplier_update_loading: action.status,
      };
      break;
    case "CONTACT_LABEL":
      state = {
        ...state,
        contact_label: action.payload,
        contact_label_error: action.error,
        contact_label_loading: action.status,
      };
      break;
    case "GET_MESSAGE_TEMPLATES_FOR_CONTACTS_BY_SELECT":
      state = {
        ...state,
        gmtfbs_contacts_data: action.payload,
        gmtfbs_contacts_error: action.error,
        gmtfbs_contacts_loading: action.status,
      };
      break;
    case "SEND_MAIL_TO_ACTIVITY_CONTACTS":
      state = {
        ...state,
        smta_contacts_data: action.payload,
        smta_contacts_error: action.status,
        smta_contacts_loading: action.status,
      };
      break;
    case "SEND_MAIL_TO_ACTIVITY_CONTACTS_FRESH":
      state = {
        ...state,
        smta_contacts_loading: action.status,
      };
      break;
    case "EMAIL_VALIDATION_CHECK":
      state = {
        ...state,
        email_validation_check_data: action.payload,
        email_validation_check_loading: action.status,
      };
      break;
    case "EMAIL_VALIDATION_CHECK_FRESH":
      state = {
        ...state,
        email_validation_check_loading: action.status,
      };
      break;
    default:
      state = { ...state };
      break;
  }
  return state;
};

export default contacts;
