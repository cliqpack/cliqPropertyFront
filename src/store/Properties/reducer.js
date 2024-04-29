const initialState = {
  property_list_data: null,
  property_list_error: null,
  property_list_loading: false,

  bill_property_list_data: null,
  bill_property_list_error: null,
  bill_property_list_loading: false,

  inv_property_list_data: null,
  inv_property_list_error: null,
  inv_property_list_loading: false,

  property_add_loading: false,
  property_add_data: null,

  property_add_tanent: null,
  property_add_tanent_loading: false,

  property_owner_add_loading: false,

  property_info_data: null,
  property_info_error: null,
  property_info_loading: false,

  property_edit_info_data: null,
  property_edit_info_error: null,
  property_edit_info_loading: false,

  property_update_info_data: null,
  property_update_info_error: null,
  property_update_info_loading: false,

  user_list_data: null,
  user_list_error: null,
  user_list_loading: false,
  user_owner_list_data: null,
  user_owner_list_error: null,
  user_owner_list_loading: false,

  user_info_data: null,
  user_info_error: null,
  user_info_loading: false,

  property_type_data: null,
  property_type_error: null,
  property_type_loading: false,

  // Property Tenant data
  property_tenant_info_data: null,
  property_tenant_info_error: null,
  property_tenant_info_loading: false,

  // Owner Data
  owner_info_data: null,
  owner_info_error: null,
  owner_info_loading: false,

  // Owner Data
  agreement_fee: null,
  agreement_fee_error: null,
  agreement_fee_loading: false,

  property_owner_update_loading: false,

  // Tenant data
  tenant_info_data: null,
  tenant_info_error: null,
  tenant_info_loading: false,

  // Property owner data
  property_owner_info_data: null,
  property_owner_info_error: null,
  property_owner_info_loading: false,

  // Property all owner data
  property_all_owner_info_data: null,
  property_all_owner_info_error: null,
  property_all_owner_info_loading: false,

  //property key add
  property_key_add_data: null,
  property_key_add_error: null,
  property_key_add_loading: false,

  //property key update
  property_key_update_data: null,
  property_key_update_error: null,
  property_key_update_loading: false,

  periodic_tenancy_update_data: null,
  periodic_tenancy_update_error: null,
  periodic_tenancy_update_loading: false,

  //property key
  property_key_data: null,
  property_key_error: null,
  property_key_loading: false,

  // property key latest value
  property_key_value: null,
  property_key_value_error: null,
  property_key_value_loading: false,

  inspection_lebel: null,
  inspection_lebel_error: null,
  inspection_lebel_loading: false,

  property_archived: null,
  property_archived_error: null,
  property_archived_loading: false,

  // undo_archived_property: null,
  // undo_archived_property_error: null,
  undo_archived_property_loading: false,

  get_archived_property: null,
  get_archived_property_error: null,
  get_archived_property_loading: false,

  get_rental_property: null,
  get_rental_property_error: null,
  get_rental_property_loading: false,
  //Seller
  seller_add_data: null,
  seller_add_loading: false,

  seller_info_data: null,
  seller_info_error: null,
  seller_info_loading: false,

  //buyer
  buyer_add_data: null,
  buyer_add_loading: false,

  //seller info property
  seller_info_property_data: null,
  seller_info_property_error: null,
  seller_info_property_loading: false,

  edit_sale_agreement_loading: null,

  edit_seller_info_property_data: null,
  edit_seller_info_property_error: null,
  edit_seller_info_property_loading: false,

  get_sales_property_data: null,
  get_sales_property_error: null,
  get_sales_property_loading: false,

  get_arrears_property_data: null,
  get_arrears_property_error: null,
  get_arrears_property_loading: false,

  get_vacancies_property_data: null,
  get_vacancies_property_error: null,
  get_vacancies_property_loading: false,

  get_renewals_property_data: null,
  get_renewals_property_error: null,
  get_renewals_property_loading: false,

  manage_tenant_list_data: null,
  manage_tenant_list_error: null,
  manage_tenant_list_loading: false,

  tenant_move_out_data: null,
  tenant_move_out_error: null,
  tenant_move_out_loading: false,

  percentage: null,
  percentage_loading: false,
  percentage_detail: false,

  percentage_multiple: null,
  percentage_multiple_loading: false,
  percentage_multiple_detail: false,

  // PROPERTY FEE
  get_property_fee_data: null,
  get_property_fee_error: null,
  get_property_fee_loading: false,

  // PROPERTY FEE
  get_owner_property_fee_list_data: null,
  get_owner_property_fee_list_error: null,
  get_owner_property_fee_list_loading: false,

  //message templates
  gmtfp_data: null,
  gmtfp_error: null,
  gmtfp_loading: false,

  smta_data: null,
  smta_error: null,
  smta_loading: false,

  gmtfpbb_data: null,
  gmtfpbb_error: null,
  gmtfpbb_loading: false,

  rent_details_data: null,
  rent_details_error: null,
  rent_details_loading: false,

  rent_details_add_data: null,
  rent_details_add_error: null,
  rent_details_add_loading: false,

  rent_discount_add_data: null,
  rent_discount_add_error: null,
  rent_discount_add_loading: false,

  send_sms_template_data: null,
  send_sms_template_error: null,
  send_sms_template_loading: false,

  manage_owner_list_data: null,
  manage_owner_list_error: null,
  manage_owner_list_loading: false,

  charge_manual_fee_data: null,
  charge_manual_fee_data_error: null,
  charge_manual_fee_data_loading: false,

  check_owner_payable_info: null,
  check_owner_payable_info_error: null,
  check_owner_payable_info_loading: false,

  make_new_tenant: null,
  make_new_tenant_error: null,
  make_new_tenant_loading: false,

  change_owner: false,

  check_unique_key_data: null,
  check_unique_key_loading: false,

  property_image_delete_data: null,
  property_image_delete_error: null,
  property_image_delete_loading: false,

  user_list_mention: null,
  user_list_mention_error: false,
  user_list_mention_loading: false,

  property_strata_manager_data: null,
  property_strata_manager_error: null,
  property_strata_manager_loading: false,

  //language
  select_language_data: null,
  select_language_error: false,
  select_language_loading: false,
  get_select_language_data: null,
  get_select_language_error: false,
  get_select_language_loading: false,
};

const property = (state = initialState, action) => {
  switch (action.type) {
    case "PROPERTY_LIST":
      state = {
        ...state,
        property_list_data: action.payload,
        property_list_error: null,
        property_list_loading: action.status,
      };
      break;
    case "BILL_PROPERTY_LIST":
      state = {
        ...state,
        bill_property_list_data: action.payload,
        bill_property_list_error: null,
        bill_property_list_loading: action.status,
      };
      break;
    case "INVOICE_PROPERTY_LIST":
      state = {
        ...state,
        inv_property_list_data: action.payload,
        inv_property_list_error: null,
        inv_property_list_loading: action.status,
      };
      break;
    case "PROPERTY_ADD":
      state = {
        ...state,
        property_add_data: action.payload,
        property_add_loading: action.status,
      };
      break;
    case "PROPERTY_KEY_VALUE":
      state = {
        ...state,
        property_key_value: action.payload,
        property_key_value_error: action.error,
        property_key_value_loading: action.status,
      };
      break;
    case "PROPERTY_ADD_MEMBER":
      state = {
        ...state,
        property_add_loading: action.status,
      };
      break;
    case "PROPERTY_ADD_FRESH":
      state = {
        ...state,
        property_add_loading: action.status,
      };
      break;
    case "PROPERTY_INFO":
      state = {
        ...state,
        property_info_data: action.payload,
        property_info_error: null,
        property_info_loading: action.status,
      };
      break;
    case "PROPERTY_INFO_FRESH":
      state = {
        ...state,
        property_info_data: action.payload,
        property_info_error: action.error,
        property_info_loading: action.status,
      };
      break;
    case "PROPERTY_EDIT_INFO":
      state = {
        ...state,
        property_edit_info_data: action.payload,
        property_edit_info_error: null,
        property_edit_info_loading: action.status,
      };
      break;
    case "UPDATE_PROPERTY_INFO":
      state = {
        ...state,
        property_update_info_data: action.payload,
        property_update_info_error: null,
        property_update_info_loading: action.status,
      };
      break;
    case "UPDATE_PROPERTY_INFO_FRESH":
      state = {
        ...state,
        property_update_info_data: action.payload,
        property_update_info_error: null,
        property_update_info_loading: action.status,
      };
      break;
    case "TENANT_UPDATE":
      state = {
        ...state,
        tenant_update_data: action.payload,
        tenant_update_error: null,
        tenant_update_loading: action.status,
      };
      break;
    case "TENANT_UPDATE_FRESH":
      state = {
        ...state,
        tenant_update_loading: action.status,
      };
      break;
    case "USER_LIST":
      state = {
        ...state,
        user_list_data: action.payload,
        user_list_error: null,
        user_list_loading: action.status,
      };
      break;
    case "USER_LIST_DATA":
      state = {
        ...state,
        user_list_mention: action.payload,
        user_list_mention_error: null,
        user_list_mention_loading: action.status,
      };
      break;
    case "USER_OWNER_LIST":
      state = {
        ...state,
        user_owner_list_data: action.payload,
        user_owner_list_error: null,
        user_owner_list_loading: action.status,
      };
      break;

    //====upload image====
    case "UPLOAD_IMAGE":
      state = {
        ...state,
        percentage: action.payload,
        percentage_loading: action.status,
        percentage_detail: action.detail,
      };
      break;

    case "UPLOAD_IMAGE_FRESH":
      state = {
        ...state,
        percentage: action.percent,
        percentage_loading: action.status,
      };
      break;
    //====upload image====
    case "UPLOAD_MULTIPLE_IMAGE":
      state = {
        ...state,
        percentage_multiple: action.payload,
        percentage_multiple_loading: action.status,
        percentage_multiple_detail: action.detail,
      };
      break;

    case "UPLOAD_MULTIPLE_IMAGE_FRESH":
      state = {
        ...state,
        percentage_multiple: action.percent,
        percentage_multiple_loading: action.status,
      };
      break;
    // ----------------------
    case "PROPERTY_TYPE":
      state = {
        ...state,
        property_type_data: action.payload,
        property_type_error: action.error,
        property_type_loading: action.status,
      };
      break;
    case "PROPERTY_STRATA_MANAGER":
      state = {
        ...state,
        property_strata_manager_data: action.payload,
        property_strata_manager_error: action.error,
        property_strata_manager_loading: action.status,
      };
      break;
    case "USER_INFO":
      state = {
        ...state,
        user_info_data: action.payload,
        user_info_error: null,
        user_info_loading: action.status,
      };
      break;
    case "PROPERTY_ADD_TANENT":
      state = {
        ...state,
        property_add_tanent: action.payload,
        property_add_tanent_loading: action.status,
      };
      break;
    case "PROPERTY_TENANT_ADD_FRESH":
      state = {
        ...state,
        property_add_tanent_loading: action.status,
      };
      break;
    case "OWNER_ADD":
      state = {
        ...state,
        property_owner_add_loading: action.status,
      };
      break;
    case "OWNER_UPDATE":
      state = {
        ...state,
        property_owner_update_loading: action.status,
      };
      break;
    case "CHANGE_OWNER":
      state = {
        ...state,
        change_owner: action.status,
      };
      break;
    case "CHANGE_OWNER_FRESH":
      state = {
        ...state,
        change_owner: action.status,
      };
      break;
    case "OWNER_UPDATE_FRESH":
      state = {
        ...state,
        property_owner_update_loading: action.status,
      };
      break;

    case "OWNER_INFO":
      state = {
        ...state,
        owner_info_data: action.payload,
        owner_info_error: null,
        owner_info_loading: action.status,
      };
      break;

    case "OWNER_INFO_FRESH":
      state = {
        ...state,
        owner_info_data: null,
        owner_info_error: null,
        owner_info_loading: false,
      };
      break;

    case "CHARGE_OWNER_MANUAL_FEE":
      state = {
        ...state,
        charge_manual_fee_data: action.payload,
        charge_manual_fee_data_error: null,
        charge_manual_fee_data_loading: action.status,
      };
      break;

    case "CHARGE_OWNER_MANUAL_FEE_FRESH":
      state = {
        ...state,
        charge_manual_fee_data: action.payload,
        charge_manual_fee_data_error: null,
        charge_manual_fee_data_loading: action.status,
      };
      break;

    case "UPDATE_OWNER_INFO":
      state = {
        ...state,
        property_owner_info_data: action.payload,
        property_owner_info_error: null,
        property_owner_info_loading: action.status,
      };
      break;
    case "PROPERTY_OWNER_ADD_FRESH":
      state = {
        ...state,
        property_owner_add_loading: action.status,
      };
      break;
    case "TENANT_INFO":
      state = {
        ...state,
        tenant_info_data: action.payload,
        tenant_info_error: null,
        tenant_info_loading: action.status,
      };
      break;
    case "PROPERTY_TENANT_INFO":
      state = {
        ...state,
        property_tenant_info_data: action.payload,
        property_tenant_info_error: null,
        property_tenant_info_loading: action.status,
      };
      break;
    case "PROPERTY_TENANT_INFO_FRESH":
      state = {
        ...state,
        property_tenant_info_loading: action.status,
      };
      break;
    case "TENANT_INFO_FRESH":
      state = {
        ...state,
        tenant_info_data: action.payload,
        tenant_info_error: action.error,
        tenant_info_loading: action.status,
      };
      break;
    case "PROPERTY_OWNER_INFO":
      state = {
        ...state,
        property_owner_info_data: action.payload,
        property_owner_info_error: null,
        property_owner_info_loading: action.status,
      };
      break;
    case "PROPERTY_OWNER_INFO_FRESH":
      state = {
        ...state,
        property_owner_info_data: action.payload,
        property_owner_info_error: action.error,
        property_owner_info_loading: action.status,
      };
      break;
    case "PROPERTY_ALL_OWNER_INFO":
      state = {
        ...state,
        property_all_owner_info_data: action.payload,
        property_all_owner_info_error: null,
        property_all_owner_info_loading: action.status,
      };
      break;
    case "PROPERTY_ALL_OWNER_INFO_FRESH":
      state = {
        ...state,
        property_all_owner_info_data: action.payload,
        property_all_owner_info_error: action.error,
        property_all_owner_info_loading: action.status,
      };
      break;
    case "CHECK_OWNER_PAYABLE_INFO":
      state = {
        ...state,
        check_owner_payable_info: action.payload,
        check_owner_payable_info_error: action.error,
        check_owner_payable_info_loading: action.status,
      };
      break;
    case "PROPERTY_LIST_FRESH":
      state = {
        ...state,
        property_list_error: action.error,
        property_list_loading: action.status,
      };
      break;
    case "BILL_PROPERTY_LIST_FRESH":
      state = {
        ...state,
        bill_property_list_error: action.error,
        bill_property_list_loading: action.status,
      };
      break;
    case "INVOICE_PROPERTY_LIST_FRESH":
      state = {
        ...state,
        inv_property_list_error: action.error,
        inv_property_list_loading: action.status,
      };
      break;
    case "PROPERTY_KEY_ADD":
      state = {
        ...state,
        property_key_add_data: action.payload,
        property_key_add_error: action.error,
        property_key_add_loading: action.status,
      };
      break;
    case "PROPERTY_KEY_UPDATE":
      state = {
        ...state,
        property_key_update_data: action.payload,
        property_key_update_error: action.error,
        property_key_update_loading: action.status,
      };
      break;
    case "PERIODIC_TENANCY_UPDATE":
      state = {
        ...state,
        periodic_tenancy_update_data: action.payload,
        periodic_tenancy_update_error: action.error,
        periodic_tenancy_update_loading: action.status,
      };
      break;
    case "RENT_DETAILS_ADD":
      state = {
        ...state,
        rent_details_add_data: action.payload,
        rent_details_add_error: action.error,
        rent_details_add_loading: action.status,
      };
      break;
    case "RENT_DISCOUNT_ADD":
      state = {
        ...state,
        rent_discount_add_data: action.payload,
        rent_discount_add_error: action.error,
        rent_discount_add_loading: action.status,
      };
      break;
    case "RENT_DETAILS":
      state = {
        ...state,
        rent_details_data: action.payload,
        rent_details_error: action.error,
        rent_details_loading: action.status,
      };
      break;
    case "PROPERTY_KEY_ADD_FRESH":
      state = {
        ...state,
        property_key_add_data: action.payload,
        property_key_add_error: action.error,
        property_key_add_loading: action.status,
      };
      break;
    case "PROPERTY_KEY_UPDATE_FRESH":
      state = {
        ...state,
        property_key_update_data: action.payload,
        property_key_update_error: action.error,
        property_key_update_loading: action.status,
      };
      break;
    case "PROPERTY_KEY":
      state = {
        ...state,
        property_key_data: action.payload,
        property_key_error: action.error,
        property_key_loading: action.status,
      };
    case "PROPERTY_KEY_VALUE_FRESH":
      state = {
        ...state,
        property_key_value: action.payload,
        property_key_value_error: action.error,
        property_key_value_loading: action.status,
      };
    case "INSPECTION_LEBEL":
      state = {
        ...state,
        inspection_lebel: action.payload,
        inspection_lebel_error: action.error,
        inspection_lebel_loading: action.status,
      };
      break;
    case "PROPERTY_ARCHIVED":
      state = {
        ...state,
        property_archived: action.payload,
        property_archived_error: action.error,
        property_archived_loading: action.status,
      };
      break;
    case "UNDO_ARCHIVED_PROPERTY":
      state = {
        ...state,
        // undo_archived_property: action.payload,
        // undo_archived_property_error: action.error,
        undo_archived_property_loading: action.status,
      };
      break;
    case "GET_ARCHIVED_PROPERTY":
      state = {
        ...state,
        get_archived_property: action.payload,
        get_archived_property_error: action.error,
        get_archived_property_loading: action.status,
      };
      break;
    case "GET_RENTAL_PROPERTY":
      state = {
        ...state,
        get_rental_property: action.payload,
        get_rental_property_error: action.error,
        get_rental_property_loading: action.status,
      };
      break;
    case "GET_RENTAL_PROPERTY_FRESH":
      state = {
        ...state,
        // get_rental_property: action.payload,
        // get_rental_property_error: action.error,
        get_rental_property_loading: action.status,
      };
      break;
    case "SELLER_ADD":
      state = {
        ...state,
        seller_add_data: action.payload,
        seller_add_loading: action.status,
      };
      break;
    case "BUYER_ADD":
      state = {
        ...state,
        buyer_add_data: action.payload,
        buyer_add_loading: action.status,
      };
      break;
    case "SELLER_ADD_FRESH":
      state = {
        ...state,
        seller_add_loading: action.status,
      };
      break;
    case "BUYER_ADD_FRESH":
      state = {
        ...state,
        buyer_add_loading: action.status,
      };
      break;
    case "SELLER_INFO":
      state = {
        ...state,
        seller_info_data: action.payload,
        seller_info_error: action.status,
        seller_info_loading: action.status,
      };
      break;
    case "SELLER_INFO_FRESH":
      state = {
        ...state,
        seller_info_loading: action.status,
      };
      break;
    case "SELLER_INFO_PROPERTY":
      state = {
        ...state,
        seller_info_property_data: action.payload,
        seller_info_property_error: action.status,
        seller_info_property_loading: action.status,
      };
      break;

    case "SELLER_INFO_PROPERTY_FRESH":
      state = {
        ...state,
        seller_info_property_data: action.payload,
        seller_info_property_error: action.status,
        seller_info_property_loading: action.status,
      };
      break;
    case "EDIT_SELLER_INFO_PROPERTY":
      state = {
        ...state,
        edit_seller_info_property_data: action.payload,
        edit_seller_info_property_error: action.status,
        edit_seller_info_property_loading: action.status,
      };
      break;
    case "EDIT_SELLER_INFO_PROPERTY_FRESH":
      state = {
        ...state,
        edit_seller_info_property_loading: action.status,
      };
      break;
    case "EDIT_SALE_AGREEMENT":
      state = {
        ...state,
        edit_sale_agreement_loading: action.status,
      };
      break;
    case "EDIT_SALE_AGREEMENT_FRESH":
      state = {
        ...state,
        edit_sale_agreement_loading: action.status,
      };
      break;
    case "GET_SALES_PROPERTY":
      state = {
        ...state,
        get_sales_property_data: action.payload,
        get_sales_property_error: action.status,
        get_sales_property_loading: action.status,
      };
      break;
    case "GET_SALES_PROPERTY_FRESH":
      state = {
        ...state,

        get_sales_property_loading: action.status,
      };
      break;
    case "GET_ARREARS_PROPERTY":
      state = {
        ...state,
        get_arrears_property_data: action.payload,
        get_arrears_property_error: action.status,
        get_arrears_property_loading: action.status,
      };
      break;
    case "GET_ARREARS_PROPERTY_FRESH":
      state = {
        ...state,
        get_arrears_property_loading: action.status,
      };
      break;
    case "GET_VACANCIES_PROPERTY":
      state = {
        ...state,
        get_vacancies_property_data: action.payload,
        get_vacancies_property_error: action.status,
        get_vacancies_property_loading: action.status,
      };
      break;
    case "GET_VACANCIES_PROPERTY_FRESH":
      state = {
        ...state,
        get_vacancies_property_loading: action.status,
      };
      break;
    case "GET_RENEWALS_PROPERTY":
      state = {
        ...state,
        get_renewals_property_data: action.payload,
        get_renewals_property_error: action.status,
        get_renewals_property_loading: action.status,
      };
      break;
    case "MANAGE_TENANT_LIST":
      state = {
        ...state,
        manage_tenant_list_data: action.payload,
        manage_tenant_list_error: action.status,
        manage_tenant_list_loading: action.status,
      };
      break;
    case "MANAGE_TENANT_LIST_FRESH":
      state = {
        ...state,
        manage_tenant_list_loading: action.status,
      };
      break;
    case "MAKE_NEW_TENANT":
      state = {
        ...state,
        make_new_tenant: action.payload,
        make_new_tenant_error: action.status,
        make_new_tenant_loading: action.status,
      };
      break;
    case "MAKE_NEW_TENANT_FRESH":
      state = {
        ...state,
        make_new_tenant_loading: action.status,
      };
      break;
    case "MANAGE_OWNER_LIST":
      state = {
        ...state,
        manage_owner_list_data: action.payload,
        manage_owner_list_error: action.status,
        manage_owner_list_loading: action.status,
      };
      break;
    case "GET_RENEWALS_PROPERTY_FRESH":
      state = {
        ...state,

        get_renewals_property_loading: action.status,
      };
    case "TENANT_MOVE_OUT":
      state = {
        ...state,
        tenant_move_out_data: action.payload,
        tenant_move_out_error: action.status,
        tenant_move_out_loading: action.status,
      };
      break;
    case "TENANT_MOVE_OUT_FRESH":
      state = {
        ...state,

        tenant_move_out_loading: action.status,
      };
      break;
    case "GET_PROPERTY_FEE":
      state = {
        ...state,
        get_property_fee_data: action.payload,
        get_property_fee_error: action.status,
        get_property_fee_loading: action.status,
      };
      break;
    case "GET_PROPERTY_FEE_FRESH":
      state = {
        ...state,
        // get_property_fee_data: null,
        // get_property_fee_error: null,
        get_property_fee_loading: false,
      };
      break;
    case "GET_OWNER_PROPERTY_FEE_LIST":
      state = {
        ...state,
        get_owner_property_fee_list_data: action.payload,
        get_owner_property_fee_list_error: action.status,
        get_owner_property_fee_list_loading: action.status,
      };
      break;
    case "GET_OWNER_PROPERTY_FEE_LIST_FRESH":
      state = {
        ...state,
        get_owner_property_fee_list_data: null,
        get_owner_property_fee_list_error: null,
        get_owner_property_fee_list_loading: false,
      };
      break;
    case "GET_MESSAGE_TEMPLATES_FOR_PROPERTY":
      state = {
        ...state,
        gmtfp_data: action.payload,
        gmtfp_error: action.status,
        gmtfp_loading: action.status,
      };
      break;
    case "GET_MESSAGE_TEMPLATES_FOR_PROPERTY_FRESH":
      state = {
        ...state,
        gmtfp_loading: action.status,
      };
      break;
    case "GET_MESSAGE_TEMPLATES_FOR_PROPERTY_BY_BTN":
      state = {
        ...state,
        gmtfpbb_data: action.payload,
        gmtfpbb_error: action.status,
        gmtfpbb_loading: action.status,
      };
      break;
    case "SEND_MAIL_TO_ACTIVITY":
      state = {
        ...state,
        smta_data: action.payload,
        smta_error: action.status,
        smta_loading: action.status,
      };
      break;
    case "SEND_MAIL_TO_ACTIVITY_FRESH":
      state = {
        ...state,

        smta_loading: action.status,
      };
      break;
    case "SEND_SMS_TO_ACTIVITY":
      state = {
        ...state,
        send_sms_template_data: action.payload,
        send_sms_template_error: action.status,
        send_sms_template_loading: action.status,
      };
      break;
    case "SEND_SMS_TO_ACTIVITY_FRESH":
      state = {
        ...state,
        send_sms_template_loading: action.status,
      };
      break;
    case "AGREEMENT_DATE_RENEWAL":
      state = {
        ...state,
        agreement_fee: action.payload,
        agreement_fee_error: null,
        agreement_fee_loading: action.status,
      };
      break;
    case "AGREEMENT_DATE_RENEWAL_FRESH":
      state = {
        ...state,
        agreement_fee: action.payload,
        agreement_fee_error: null,
        agreement_fee_loading: action.status,
      };
      break;
    case "CHECK_UNIQUE_KEY":
      state = {
        ...state,
        check_unique_key_data: action.payload,
        check_unique_key_loading: action.status,
      };
      break;
    case "CHECK_UNIQUE_KEY_FRESH":
      state = {
        ...state,
        check_unique_key_loading: action.status,
      };
      break;
    case "PROPERTY_IMAGE_DELETE":
      state = {
        ...state,
        property_image_delete_data: action.payload,
        property_image_delete_error: action.error,
        property_image_delete_loading: action.status,
      };
      break;
    case "SELECT_LANGUAGE":
      state = {
        ...state,
        // select_language_data: action.payload,
        // select_language_error: action.error,
        select_language_loading: action.status,
      };
      break;
    case "SELECT_LANGUAGE_FRESH":
      state = {
        ...state,
        // select_language_data: action.payload,
        // select_language_error: action.error,
        select_language_loading: action.status,
      };
      break;
    case "GET_SELECTED_LANG":
      state = {
        ...state,
        get_select_language_data: action.payload,
        get_select_language_error: action.error,
        get_select_language_loading: action.status,
      };
      break;
    default:
      state = { ...state };
      break;
  }
  return state;
};

export default property;
