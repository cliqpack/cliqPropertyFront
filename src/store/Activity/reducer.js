const initialState = {
  //Property Activity
  property_all_activity: null,
  property_all_activity_error: null,
  property_all_activity_loading: false,

  property_activities: null,
  property_activities_error: null,
  property_activities_loading: false,

  add_message_data: null,
  add_message_data_error: null,
  add_message_data_loading: false,

  //Contacts Activity
  contacts_all_activity: null,
  contacts_all_activity_error: null,
  contacts_all_activity_loading: false,

  contacts_message_data: null,
  contacts_message_data_error: null,
  contacts_message_data_loading: false,

  property_message_data: null,
  property_message_data_error: null,
  property_message_data_loading: false,
  contact_activities: null,
  contact_activities_error: null,
  contact_activities_loading: false,

  task_activities: null,
  task_activities_error: null,
  task_activities_loading: false,

  task_message_data: null,
  task_message_data_error: null,
  task_message_data_loading: false,

  mail_message_data: null,
  mail_message_data_error: null,
  mail_message_data_loading: false,

  job_all_activity: null,
  job_all_activity_error: null,
  job_all_activity_loading: false,

  job_message_data: null,
  job_message_data_error: null,
  job_message_data_loading: false,

  listing_message_data: null,
  listing_message_data_error: null,
  listing_message_data_loading: false,

  inspection_message_data: null,
  inspection_message_data_error: null,
  inspection_message_data_loading: false,

  send_email_data: null,
  send_email_error: null,
  send_email_loading: false,

  send_work_order_email_data: null,
  send_work_order__error: null,
  send_work_order__loading: false,

  job_all_data: null,
  job_all_data_error: null,
  job_all_data_loading: false,

  inspection_all_activity: null,
  inspection_all_activity_error: null,
  inspection_all_activity_loading: false,

  list_all_activity: null,
  list_all_activity_error: null,
  list_all_activity_loading: false,

  contacts_all_owner_activity: null,
  contacts_all_owner_activity_error: null,
  contacts_all_owner_activity_loading: false,

  inspection_for_all_activity: null,
  inspection_for_all_activity_error: null,
  inspection_for_all_activity_loading: false,

  job_for_all_activity: null,
  job_for_all_activity_error: null,
  job_for_all_activity_loading: false,

  listing_for_all_activity: null,
  listing_for_all_activity_error: null,
  listing_for_all_activity_loading: false,

  send_sms_data: null,
  send_sms_error: null,
  send_sms_loading: false,
};

const Activity = (state = initialState, action) => {
  switch (action.type) {
    case "PROPERTY_ALL_ACTIVITY":
      state = {
        ...state,
        property_all_activity: action.payload,
        property_all_activity_error: action.error,
        property_all_activity_loading: action.status,
      };
      break;
    case "PROPERTY_ACTIVITIES":
      state = {
        ...state,
        property_activities: action.payload,
        property_activities_error: action.error,
        property_activities_loading: action.status,
      };
      break;
    case "PROPERTY_ACTIVITIES_FRESH":
      state = {
        ...state,
        property_activities_loading: action.status,
      };
      break;

    case "CONTACT_ACTIVITIES":
      state = {
        ...state,
        contact_activities: action.payload,
        contact_activities_error: action.error,
        contact_activities_loading: action.status,
      };
      break;
    case "TASK_ACTIVITIES":
      state = {
        ...state,
        task_activities: action.payload,
        task_activities_error: action.error,
        task_activities_loading: action.status,
      };
      break;
    case "ADD_MESSAGE":
      state = {
        ...state,
        add_message_data: action.payload,
        add_message_data_error: action.error,
        add_message_data_loading: action.status,
      };
      break;
    case "ADD_MESSAGE_FRESH":
      state = {
        ...state,

        add_message_data_loading: action.status,
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
    case "CONTACTS_MESSAGE":
      state = {
        ...state,
        contacts_message_data: action.payload,
        contacts_message_data_error: action.error,
        contacts_message_data_loading: action.status,
      };
      break;

    case "PROPERTY_MESSAGE":
      state = {
        ...state,
        property_message_data: action.payload,
        property_message_data_error: action.error,
        property_message_data_loading: action.status,
      };
      break;
    case "CONTACTS_ALL_ACTIVITY":
      state = {
        ...state,
        contacts_all_activity: action.payload,
        contacts_all_activity_error: action.error,
        contacts_all_activity_loading: action.status,
      };
      break;

    case "TASK_MESSAGE":
      state = {
        ...state,
        task_message_data: action.payload,
        task_message_data_error: action.error,
        task_message_data_loading: action.status,
      };
      break;
      case "MAIL_MESSAGE":
        state = {
          ...state,
          mail_message_data: action.payload,
          mail_message_data_error: action.error,
          mail_message_data_loading: action.status,
        };
        break;
    case "JOB_ALL_ACTIVITY":
      state = {
        ...state,
        job_all_activity: action.payload,
        job_all_activity_error: action.error,
        job_all_activity_loading: action.status,
      };
      break;
    case "JOB_FOR_ALL_ACTIVITY":
      state = {
        ...state,
        job_for_all_activity: action.payload,
        job_for_all_activity_error: action.error,
        job_for_all_activity_loading: action.status,
      };
      break;
    case "LIST_ALL_ACTIVITY":
      state = {
        ...state,
        list_all_activity: action.payload,
        list_all_activity_error: action.error,
        list_all_activity_loading: action.status,
      };
      break;
    case "JOB_MESSAGE":
      state = {
        ...state,
        job_message_data: action.payload,
        job_message_data_error: action.error,
        job_message_data_loading: action.status,
      };
      break;
    case "JOB_MESSAGE_FRESH":
      state = {
        ...state,
        job_message_data: action.payload,
        job_message_data_error: action.error,
        job_message_data_loading: action.status,
      };
      break;
    case "JOB_ALL_DATA":
      state = {
        ...state,
        job_all_data: action.payload,
        job_all_data_error: action.error,
        job_all_data_loading: action.status,
      };
      break;
    case "LISTING_MESSAGE":
      state = {
        ...state,
        listing_message_data: action.payload,
        listing_message_data_error: action.error,
        listing_message_data_loading: action.status,
      };
      break;
    case "INSPECTION_ALL_ACTIVITY":
      state = {
        ...state,
        inspection_all_activity: action.payload,
        inspection_all_activity_error: action.error,
        inspection_all_activity_loading: action.status,
      };
      break;
    case "INSPECTION_FOR_ALL_ACTIVITY":
      state = {
        ...state,
        inspection_for_all_activity: action.payload,
        inspection_for_all_activity_error: action.error,
        inspection_for_all_activity_loading: action.status,
      };
      break;
    case "LISTINGS_FOR_ALL_ACTIVITY":
      state = {
        ...state,
        listing_for_all_activity: action.payload,
        listing_for_all_activity_error: action.error,
        listing_for_all_activity_loading: action.status,
      };
      break;
    case "INSPECTION_MESSAGE":
      state = {
        ...state,
        inspection_message_data: action.payload,
        inspection_message_data_error: action.error,
        inspection_message_data_loading: action.status,
      };
      break;
    case "SEND_EMAIL":
      state = {
        ...state,
        send_email_data: action.payload,
        send_email_error: action.error,
        send_email_loading: action.status,
      };
      break;
    case "SEND_EMAIL_FRESH":
      state = {
        ...state,
        send_email_data: action.payload,
        send_email_error: action.error,
        send_email_loading: action.status,
      };
      break;
    case "SEND_SMS":
      state = {
        ...state,
        send_sms_data: action.payload,
        send_sms_error: action.error,
        send_sms_loading: action.status,
      };
      break;
    case "SEND_SMS_FRESH":
      state = {
        ...state,

        send_sms_loading: action.status,
      };
      break;
    case "SEND_WORK_ORDER_EMAIL":
      state = {
        ...state,
        send_work_order_email_data: action.payload,
        send_work_order__error: action.error,
        send_work_order__loading: action.status,
      };
      break;
    default:
      state = { ...state };
      break;
  }
  return state;
};

export default Activity;
