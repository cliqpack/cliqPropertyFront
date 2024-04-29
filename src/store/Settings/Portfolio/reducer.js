const initialState = {
  company_data: null,
  company_data_error: null,
  company_data_loading: false,

  company_data_edit_loading: false,

  fee_add_data: null,
  fee_add_data_error: null,
  fee_add_data_loading: false,

  settings_accounts_list_data: null,
  settings_accounts_list_error: null,
  settings_accounts_list_loading: false,

  fee_data: null,
  fee_data_error: null,
  fee_data_loading: false,

  cdc_list_data: null,
  cdc_list_error: null,
  cdc_list_loading: false,

  cdr_list_data: null,
  cdr_list_error: null,
  cdr_list_loading: false,

  bde_list_loading: false,

  bd_list_data: null,
  bd_list_error: null,
  bd_list_loading: false,

  bbd_list_data: null,
  bbd_list_error: null,
  bbd_list_loading: false,

  bfd_list_data: null,
  bfd_list_error: null,
  bfd_list_loading: false,

  label_list_data: null,
  label_list_error: null,
  label_list_loading: false,

  label_add_loading: false,

  label_edit_loading: false,

  add_chart_of_accounts_loading: false,

  chartAccount_list_data: null,
  chartAccount_list_error: null,
  chartAccount_list_loading: false,

  edit_chart_of_accounts_loading: false,

  rmv_chart_of_accounts_loading: false,

  rmv_label_loading: false,

  add_working_hours_data: null,
  add_working_hours_error: null,
  add_working_hours_loading: false,

  working_hours_data: null,
  working_hours_error: null,
  working_hours_loading: false,

  add_invoice_payments_modal_loading: null,

  invoice_payments_modal_data: null,
  invoice_payments_modal_error: null,
  invoice_payments_modal_loading: false,

  add_inspection_report_modal_loading: false,

  inspection_report_modal_data: null,
  inspection_report_modal_error: null,
  inspection_report_modal_loading: false,

  add_reason_loading: false,

  reasons_data: null,
  reasons_data_error: null,
  reasons_data_loading: false,

  add_reminder_loading: false,

  reminders_data: null,
  reminders_data_error: null,
  reminders_data_loading: false,

  edit_reminder_loading: false,

  add_reminder_property_loading: false,

  reminders_property_data: null,
  reminders_property_data_error: false,
  reminders_property_data_loading: false,

  all_reminders_property_data: null,
  all_reminders_property_data_error: false,
  all_reminders_property_data_loading: false,

  edit_reminder_property_loading: false,

  delete_property_reminder_loading: false,

  delete_reminder_loading: false,

  get_reminders_property_data: null,
  get_reminders_property_data_error: false,
  get_reminders_property_data_loading: false,

  all_reminders_data: null,
  all_reminders_data_error: false,
  all_reminders_data_loading: false,

  complete_reminder_loading: false,

  create_job_reminder_loading: false,

  gmtfrbs_data: null,
  gmtfrbs_error: false,
  gmtfrbs_loading: false,

  smta_reminders_loading: false,

  add_brand_loading: false,
  brands_data: null,
  brands_error: false,
  brands_loading: false,

  add_brand_img_loading: false,
  rmv_brand_img_loading: false,

  settingsEmailData: null,
  settingsEmailDataStatus: false,

  add_email_settings_loading: false,

  addDepositClearanceStatus: false,
  getDepositClearance: null,
  getDepositClearanceStatus: false,

  toggleLoadingStatus: false,

  removeEmailHeaderImg: false,
  removeEmailFooterImg: false,

  edit_reason_loading: false,

  remove_reason_loading: false,

  reminderImgAddLoading: false,

  integrationListData: null,
  integrationListLoading: false,

  providerSettingsListData: null,
  providerSettingsListLoading: false,

  providerSettingsListIDData: null,
  providerSettingsListIDLoading: false,

  addProviderSettingsListIDLoading: false,

  deleteProviderSettingsListIDLoading: false,

  addProviderSettingsLoading: false
};

const Portfolio = (state = initialState, action) => {
  switch (action.type) {
    case "COMPANY_DATA":
      state = {
        ...state,
        company_data: action.payload,
        company_data_error: action.status,
        company_data_loading: action.status,
      };
      break;
    case "COMPANY_DATA_EDIT":
      state = {
        ...state,
        company_data_edit_loading: action.status,
      };
      break;
    case "COMPANY_DATA_EDIT_FRESH":
      state = {
        ...state,
        company_data_edit_loading: action.status,
      };
      break;
    case "FEE_ADD":
      state = {
        ...state,
        fee_add_data: action.payload,
        fee_add_data_error: action.status,
        fee_add_data_loading: action.status,
      };
      break;
    case "FEE_ADD_FRESH":
      state = {
        ...state,

        fee_add_data_loading: action.status,
      };
      break;
    case "FEE_GET":
      state = {
        ...state,
        fee_data: action.payload,
        fee_data_error: action.status,
        fee_data_loading: action.status,
      };
      break;
    case "FEE_GET_FRESH":
      state = {
        ...state,

        fee_data_loading: action.status,
      };
      break;
    case "SETTINGS_ACCOUNTS_LIST":
      state = {
        ...state,
        settings_accounts_list_data: action.payload,
        settings_accounts_list_error: action.status,
        settings_accounts_list_loading: action.status,
      };
      break;
    case "SETTINGS_ACCOUNTS_LIST_FRESH":
      state = {
        ...state,
        settings_accounts_list_loading: action.status,
      };
      break;
    case "COMPANY_DATA_COUNTRY":
      state = {
        ...state,
        cdc_list_data: action.payload,
        cdc_list_error: action.status,
        cdc_list_loading: action.status,
      };
      break;
    case "COMPANY_DATA_REGION":
      state = {
        ...state,
        cdr_list_data: action.payload,
        cdr_list_error: action.status,
        cdr_list_loading: action.status,
      };
      break;
    case "BANKING_DATA_EDIT":
      state = {
        ...state,

        bde_list_loading: action.status,
      };
      break;
    case "BANKING_DATA_EDIT_FRESH":
      state = {
        ...state,

        bde_list_loading: action.status,
      };
      break;
    case "BANKING_DATA":
      state = {
        ...state,
        bd_list_data: action.payload,
        bd_list_error: action.status,
        bd_list_loading: action.status,
      };
      break;
    case "BANKING_BANK_DATA":
      state = {
        ...state,
        bbd_list_data: action.payload,
        bbd_list_error: action.status,
        bbd_list_loading: action.status,
      };
      break;
    case "BANKING_FILE_DATA":
      state = {
        ...state,
        bfd_list_data: action.payload,
        bfd_list_error: action.status,
        bfd_list_loading: action.status,
      };
      break;
    case "LABEL_DATA":
      state = {
        ...state,
        label_list_data: action.payload,
        label_list_error: action.status,
        label_list_loading: action.status,
      };
      break;
    case "LABEL_ADD":
      state = {
        ...state,

        label_add_loading: action.status,
      };
      break;
    case "LABEL_ADD_FRESH":
      state = {
        ...state,

        label_add_loading: action.status,
      };
      break;
    case "LABEL_EDIT":
      state = {
        ...state,

        label_edit_loading: action.status,
      };
      break;

    case "LABEL_EDIT_FRESH":
      state = {
        ...state,

        label_edit_loading: action.status,
      };
      break;

    case "ADD_CHART_OF_ACCOUNTS":
      state = {
        ...state,

        add_chart_of_accounts_loading: action.status,
      };
      break;
    case "ADD_CHART_OF_ACCOUNTS_FRESH":
      state = {
        ...state,

        add_chart_of_accounts_loading: action.status,
      };
      break;
    case "EDIT_CHART_OF_ACCOUNTS":
      state = {
        ...state,

        edit_chart_of_accounts_loading: action.status,
      };
      break;
    case "EDIT_CHART_OF_ACCOUNTS_FRESH":
      state = {
        ...state,

        edit_chart_of_accounts_loading: action.status,
      };
      break;
    case "GET_CHART_OF_ACCOUNTS":
      state = {
        ...state,
        chartAccount_list_data: action.payload,
        chartAccount_list_error: action.status,
        chartAccount_list_loading: action.status,
      };
      break;
    case "RMV_CHARTOFACCOUNTS":
      state = {
        ...state,

        rmv_chart_of_accounts_loading: action.status,
      };
      break;
    case "RMV_CHARTOFACCOUNTS_FRESH":
      state = {
        ...state,

        rmv_chart_of_accounts_loading: action.status,
      };
      break;
    case "RMV_LABEL":
      state = {
        ...state,

        rmv_label_loading: action.status,
      };
      break;
    case "RMV_LABEL_FRESH":
      state = {
        ...state,

        rmv_label_loading: action.status,
      };
      break;
    case "ADD_WORKING_HOURS":
      state = {
        ...state,
        add_working_hours_data: action.payload,
        add_working_hours_error: action.status,
        add_working_hours_loading: action.status,
      };
      break;
    case "ADD_WORKING_HOURS_FRESH":
      state = {
        ...state,
        add_working_hours_loading: action.status,
      };
      break;
    case "WORKING_HOURS":
      state = {
        ...state,
        working_hours_data: action.payload,
        working_hours_error: action.status,
        working_hours_loading: action.status,
      };
      break;
    case "WORKING_HOURS_FRESH":
      state = {
        ...state,

        working_hours_loading: action.status,
      };
      break;
    case "ADD_INVOICE_PAYMENTS_MODAL":
      state = {
        ...state,
        add_invoice_payments_modal_loading: action.status,
      };
      break;
    case "ADD_INVOICE_PAYMENTS_MODAL_FRESH":
      state = {
        ...state,
        add_invoice_payments_modal_loading: action.status,
      };
      break;
    case "INVOICE_PAYMENTS_MODAL":
      state = {
        ...state,
        invoice_payments_modal_data: action.payload,
        invoice_payments_modal_error: action.status,
        invoice_payments_modal_loading: action.status,
      };
      break;
    case "ADD_INSPECTION_REPORT_MODAL":
      state = {
        ...state,
        add_inspection_report_modal_loading: action.status,
      };
      break;
    case "ADD_INSPECTION_REPORT_MODAL_FRESH":
      state = {
        ...state,
        add_inspection_report_modal_loading: action.status,
      };
      break;
    case "INSPECTION_REPORT_MODAL":
      state = {
        ...state,
        inspection_report_modal_data: action.payload,
        inspection_report_modal_error: action.status,
        inspection_report_modal_loading: action.status,
      };
      break;
    case "ADD_REASON":
      state = {
        ...state,
        add_reason_loading: action.status,
      };
      break;
    case "ADD_REASON_FRESH":
      state = {
        ...state,
        add_reason_loading: action.status,
      };
      break;
    case "EDIT_REASON":
      state = {
        ...state,
        edit_reason_loading: action.status,
      };
      break;
    case "EDIT_REASON_FRESH":
      state = {
        ...state,
        edit_reason_loading: action.status,
      };
      break;
    case "REASONS":
      state = {
        ...state,
        reasons_data: action.payload,
        reasons_data_error: action.status,
        reasons_data_loading: action.status,
      };
      break;
    case "REMOVE_REASON":
      state = {
        ...state,
        remove_reason_loading: action.status,
      };
      break;
    case "REMOVE_REASON_FRESH":
      state = {
        ...state,
        remove_reason_loading: action.status,
      };
      break;
    case "ADD_REMINDER":
      state = {
        ...state,
        add_reminder_loading: action.status,
      };
      break;
    case "ADD_REMINDER_FRESH":
      state = {
        ...state,
        add_reminder_loading: action.status,
      };
      break;
    case "REMINDERS":
      state = {
        ...state,
        reminders_data: action.payload,
        reminders_data_error: action.status,
        reminders_data_loading: action.status,
      };
      break;
    case "EDIT_REMINDER":
      state = {
        ...state,
        edit_reminder_loading: action.status,
      };
      break;
    case "EDIT_REMINDER_FRESH":
      state = {
        ...state,
        edit_reminder_loading: action.status,
      };
      break;
    case "ADD_REMINDER_PROPERTY":
      state = {
        ...state,
        add_reminder_property_loading: action.status,
      };
      break;
    case "ADD_REMINDER_PROPERTY_FRESH":
      state = {
        ...state,
        add_reminder_property_loading: action.status,
      };
      break;
    case "EDIT_REMINDER_PROPERTY":
      state = {
        ...state,
        edit_reminder_property_loading: action.status,
      };
      break;
    case "EDIT_REMINDER_PROPERTY_FRESH":
      state = {
        ...state,
        edit_reminder_property_loading: action.status,
      };
      break;
    case "REMINDERS_PROPERTY":
      state = {
        ...state,
        reminders_property_data: action.payload,
        reminders_property_data_error: action.status,
        reminders_property_data_loading: action.status,
      };
      break;
    case "ALL_REMINDERS_PROPERTY":
      state = {
        ...state,
        all_reminders_property_data: action.payload,
        all_reminders_property_data_error: action.status,
        all_reminders_property_data_loading: action.status,
      };
      break;
    case "DELETE_PROPERTY_REMINDER":
      state = {
        ...state,
        delete_property_reminder_loading: action.status,
      };
      break;
    case "DELETE_PROPERTY_REMINDER_FRESH":
      state = {
        ...state,
        delete_property_reminder_loading: action.status,
      };
      break;
    case "DELETE_REMINDER":
      state = {
        ...state,
        delete_reminder_loading: action.status,
      };
      break;
    case "DELETE_REMINDER_FRESH":
      state = {
        ...state,
        delete_reminder_loading: action.status,
      };
      break;
    case "GET_REMINDERS_PROPERTY":
      state = {
        ...state,
        get_reminders_property_data: action.payload,
        get_reminders_property_data_error: action.status,
        get_reminders_property_data_loading: action.status,
      };
      break;
    case "ALL_REMINDERS":
      state = {
        ...state,
        all_reminders_data: action.payload,
        all_reminders_data_error: action.status,
        all_reminders_data_loading: action.status,
      };
      break;
    case "COMPLETE_REMINDER":
      state = {
        ...state,
        complete_reminder_loading: action.status,
      };
      break;
    case "COMPLETE_REMINDER_FRESH":
      state = {
        ...state,
        complete_reminder_loading: action.status,
      };
      break;
    case "CREATE_JOB_REMINDER":
      state = {
        ...state,
        create_job_reminder_loading: action.status,
      };
      break;
    case "CREATE_JOB_REMINDER_FRESH":
      state = {
        ...state,
        create_job_reminder_loading: action.status,
      };
      break;
    case "BRANDS_DATA":
      state = {
        ...state,
        brands_data: action.payload,
        brands_error: action.status,
        brands_loading: action.status,
      };
      break;
    case "BRANDS_DATA_FRESH":
      state = {
        ...state,

        brands_loading: action.status,
      };
      break;
    case "ADD_BRAND":
      state = {
        ...state,
        add_brand_loading: action.status,
      };
      break;
    case "ADD_BRAND_FRESH":
      state = {
        ...state,
        add_brand_loading: action.status,
      };
      break;
    case "BRAND_IMAGE_ADD":
      state = {
        ...state,
        add_brand_img_loading: action.status,
      };
      break;
    case "BRAND_IMAGE_ADD_FRESH":
      state = {
        ...state,
        add_brand_img_loading: action.status,
      };
      break;
    case "RMV_BRAND_IMAGE":
      state = {
        ...state,
        rmv_brand_img_loading: action.status,
      };
      break;
    case "RMV_BRAND_IMAGE_FRESH":
      state = {
        ...state,
        rmv_brand_img_loading: action.status,
      };
      break;
    case "ADD_EMAIL_SETTINGS":
      state = {
        ...state,
        add_email_settings_loading: action.status,
      };
      break;
    case "ADD_EMAIL_SETTINGS_FRESH":
      state = {
        ...state,
        add_email_settings_loading: action.status,
      };
      break;

    case "GET_MESSAGE_TEMPLATES_FOR_REMINDERS_BY_SELECT":
      state = {
        ...state,
        gmtfrbs_data: action.payload,
        gmtfrbs_error: action.error,
        gmtfrbs_loading: action.status,
      }
      break;
    case "SEND_MAIL_TO_ACTIVITY_REMINDERS":
      state = {
        ...state,
        // smta_reminders_data: action.payload,
        // smta_reminders_error: action.status,
        smta_reminders_loading: action.status,
      };
      break;
    case "SETTINGS_EMAIL_DATA_SUCCESS":
      return {
        ...state,
        settingsEmailData: action.payload,
        settingsEmailDataStatus: action.status,
      };
    case "ADD_DEPOSIT_CLEARANCE":
      return {
        ...state,
        addDepositClearanceStatus: action.status,
      };
    case "ADD_DEPOSIT_CLEARANCE_FRESH":
      return {
        ...state,
        addDepositClearanceStatus: action.status,
      };
    case "GET_DEPOSIT_CLEARANCE":
      return {
        ...state,
        getDepositClearance: action.payload,
        getDepositClearanceStatus: action.status,
      };
    case "GET_DEPOSIT_CLEARANCE_FRESH":
      return {
        ...state,
        getDepositClearanceStatus: action.status,
      };
    case "TOGGLE_LOADING":
      return {
        ...state,
        toggleLoadingStatus: !state.toggleLoadingStatus,
      };
    case "REMOVE_EMAIL_HEADER_IMG":
      return {
        ...state,
        removeEmailHeaderImg: action.status,
      };
    case "REMOVE_EMAIL_HEADER_IMG_FRESH":
      return {
        ...state,
        removeEmailHeaderImg: action.status,
      };
    case "REMOVE_EMAIL_FOOTER_IMG":
      return {
        ...state,
        removeEmailFooterImg: action.status,
      };
    case "REMOVE_EMAIL_FOOTER_IMG_FRESH":
      return {
        ...state,
        removeEmailFooterImg: action.status,
      };
    case "REMINDER_IMAGE_ADD":
      return {
        ...state,
        reminderImgAddLoading: action.status,
      };
    case "REMINDER_IMAGE_ADD_FRESH":
      return {
        ...state,
        reminderImgAddLoading: action.status,
      };
    case "INTEGRATIONS_LIST":
      return {
        ...state,
        integrationListData: action.payload,
        integrationListLoading: action.status,
      };
    case "PROVIDER_SETTINGS_LIST":
      return {
        ...state,
        providerSettingsListData: action.payload,
        providerSettingsListLoading: action.status,
      };
    case "PROVIDER_SETTINGS_LIST_ID":
      return {
        ...state,
        providerSettingsListIDData: action.payload,
        providerSettingsListIDLoading: action.status,
      };
    case "ADD_PROVIDER_SETTINGS":
      return {
        ...state,
        addProviderSettingsLoading: action.status,
      };
    case "ADD_PROVIDER_SETTINGS_FRESH":
      return {
        ...state,
        addProviderSettingsLoading: action.status,
      };
    case "ADD_PROVIDER_SETTINGS_LIST_ID":
      return {
        ...state,
        addProviderSettingsListIDLoading: action.status,
      };
    case "ADD_PROVIDER_SETTINGS_LIST_ID_FRESH":
      return {
        ...state,
        addProviderSettingsListIDLoading: action.status,
      };
    case "DELETE_PROVIDER_SETTINGS_LIST_ID":
      return {
        ...state,
        deleteProviderSettingsListIDLoading: action.status,
      };



    default:

      state = { ...state };
      break;
  }
  return state;
};

export default Portfolio;
