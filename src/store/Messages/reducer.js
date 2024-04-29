const initialState = {
  mail_list_data: [],
  mail_list_error: null,
  mail_list_loading: false,
  mail_add_loading: null,

  mail_attachment_data: null,
  mail_attachment_error: null,
  mail_attachment_loading: false,

  sms_list_data: [],
  sms_list_error: null,
  sms_list_loading: false,
  reply_sand_loading: null,

  inbox_list_data: [],
  inbox_list_error: null,
  inbox_list_loading: false,
  // mail_add_loading: null,

  mail_list_undelivered_data: null,
  mail_list_undelivered_error: null,
  mail_list_undelivered_loading: false,

  mail_list_sent_data: null,
  mail_list_sent_error: null,
  mail_list_sent_loading: false,

  sms_add_loading: false,

  sms_list_data: null,
  sms_list_error: null,
  sms_list_loading: false,

  //Template
  mail_template_add_loading: false,

  tmp_list_data: null,
  tmp_list_error: null,
  tmp_list_loading: false,

  tmp_list_id_data: null,
  tmp_list_id_error: null,
  tmp_list_id_loading: false,

  tmp_list_id_sms_data: null,
  tmp_list_id_sms_error: null,
  tmp_list_id_sms_loading: false,

  tmp_list_sms_data: null,
  tmp_list_sms_error: null,
  tmp_list_sms_loading: false,

  //SMS
  send_sms_loading: false,

  //edit mail template
  edit_mail_template_loading: false,

  //edit sms template
  edit_sms_template_loading: false,

  //delete mail template
  delete_mail_template_loading: false,

  //delete mail template
  delete_sms_template_loading: false,

  //multiple mail
  multiple_mail_add_loading: false,
  multiple_mail_delete_loading: false,

  schedule_list_data: null,
  schedule_list_error: null,
  schedule_list_loading: false,

  trigger_to_list_data: null,
  trigger_to_list_error: null,
  trigger_to_list_loading: false,

  trigger_from_list_data: null,
  trigger_from_list_error: null,
  trigger_from_list_loading: false,

  add_schedule_loading: false,

  edit_schedule_loading: false,

  schedule_sms_temp_edit_data: null,
  schedule_sms_temp_edit_error: null,
  schedule_sms_temp_edit: false,

  sms_outbox_data: null,
  sms_outbox_error: null,
  sms_outbox_loading: false,

  sms_sent_data: null,
  sms_sent_error: null,
  sms_sent_loading: false,

  mail_seen_unseen_loading: false,
  mail_reply_loading: false,

  outbox_mail_list_data: null,
  outbox_mail_list_error: null,
  outbox_mail_list_loading: false,

  delete_outbox_sms_data: false,

  inbox_list_owner_data: null,
  inbox_list_owner_error: null,
  inbox_list_owner_loading: false,

  outbox_list_owner_data: null,
  outbox_list_owner_error: null,
  outbox_list_owner_loading: false,

  mail_details_data: null,
  mail_details_error: null,
  mail_details_loading: false,

  move_to_spam: null,
  move_to_spam_error: null,
  move_to_spam_loading: false,

  mail_spam_data: null,
  mail_spam_error: null,
  mail_spam_loading: false,

  mail_regarding_data: null,
  mail_regarding_error: null,
  mail_regarding_loading: false,

  mail_status_assign_data: null,
  mail_status_assign_error: null,
  mail_status_assign_loading: false,

  mail_list_undelivered_owner_data: null,
  mail_list_undelivered_owner_error: null,
  mail_list_undelivered_owner_loading: false,

  multiple_sms_delete_loading: false,

  multiple_mail_temp_delete_loading: false,

  delete_multi_sms_temp__loading: false,
};

const Message = (state = initialState, action) => {
  switch (action.type) {
    case "MAIL_LIST":
      state = {
        ...state,
        mail_list_data: action.payload,
        mail_list_error: null,
        mail_list_loading: action.status,
      };
      break;

    case "SMS_LIST":
      state = {
        ...state,
        sms_list_data: action.payload,
        sms_list_error: null,
        sms_list_loading: action.status,
      };
      break;

    case "STORE_ATTACHMENT":
      state = {
        ...state,
        mail_attachment_data: action.payload,
        mail_attachment_error: null,
        mail_attachment_loading: action.status,
      };
      break;

    case "INBOX_LIST":
      state = {
        ...state,
        inbox_list_data: action.payload,
        inbox_list_error: null,
        inbox_list_loading: action.status,
      };
      break;

    case "SMS_OUTBOX_LIST":
      state = {
        ...state,
        sms_outbox_data: action.payload,
        sms_outbox_error: null,
        sms_outbox_loading: action.status,
      };
      break;
    case "MAIL_SPAM_LIST":
      state = {
        ...state,
        mail_spam_data: action.payload,
        mail_spam_error: null,
        mail_spam_loading: action.status,
      };
      break;
    case "STATUS_ASSIGN_SEND":
      state = {
        ...state,
        mail_status_assign_data: action.payload,
        mail_status_assign_error: null,
        mail_status_assign_loading: action.status,
      };
      break;
    case "MOVE_TO_SPAM":
      state = {
        ...state,
        move_to_spam: action.payload,
        move_to_spam_error: null,
        move_to_spam_loading: action.status,
      };
      break;

    case "MAIL_SEND":
      state = {
        ...state,
        // mail_add_error: null,
        mail_add_loading: action.status,
      };
      break;
    case "SEND_REPLY":
      state = {
        ...state,
        // mail_add_error: null,
        reply_sand_loading: action.status,
      };
      break;

    case "SEND_REPLY_FRESH":
      state = {
        ...state,
        // mail_add_error: null,
        reply_sand_loading: action.status,
      };
      break;
    case "MAIL_SEEN_UNSEEN_FRESH":
      state = {
        ...state,
        // mail_add_error: null,
        mail_seen_unseen_loading: action.status,
      };

    case "MAIL_REPLY_CHECK_FRESH":
      state = {
        ...state,
        // mail_add_error: null,
        mail_reply_loading: action.status,
      };
      break;
    case "MULTIPLE_MAIL_SEND":
      state = {
        ...state,
        // mail_add_error: null,
        multiple_mail_add_loading: action.status,
      };
      break;

    case "MULTIPLE_MAIL_SEND_FRESH":
      state = {
        ...state,
        // mail_list_error: null,
        multiple_mail_add_loading: action.status,
      };
      break;

    case "MULTIPLE_MAIL_DELETE":
      state = {
        ...state,
        // mail_add_error: null,
        multiple_mail_delete_loading: action.status,
      };
      break;
    case "MULTIPLE_MAIL_DELETE_FRESH":
      state = {
        ...state,
        // mail_list_error: null,
        multiple_mail_delete_loading: action.status,
      };
      break;
    case "MAIL_TEMPLATE_SEND":
      state = {
        ...state,
        // mail_add_error: null,
        mail_template_add_loading: action.status,
      };
      break;
    case "MAIL_TEMPLATE_SEND_FRESH":
      state = {
        ...state,
        // mail_add_error: null,
        mail_template_add_loading: action.status,
      };
      break;

    case "DELETE_MAIL_TEMPLATE_FRESH":
      state = {
        ...state,
        // mail_add_error: null,
        delete_mail_template_loading: action.status,
      };
      break;
    case "DELETE_SMS_TEMPLATE_FRESH":
      state = {
        ...state,
        // mail_add_error: null,
        delete_sms_template_loading: action.status,
      };
      break;
    case "EDIT_MAIL_TEMPLATE":
      state = {
        ...state,
        // mail_add_error: null,
        edit_mail_template_loading: action.status,
      };
      break;

    case "MAIL_SEEN_UNSEEN":
      state = {
        ...state,
        // mail_add_error: null,
        mail_seen_unseen_loading: action.status,
      };
      break;

    case "MAIL_REPLY_CHECK":
      state = {
        ...state,
        // mail_add_error: null,
        mail_reply_loading: action.status,
      };
      break;

    case "DELETE_MAIL_TEMPLATE":
      state = {
        ...state,
        // mail_add_error: null,
        delete_mail_template_loading: action.status,
      };
      break;

    case "DELETE_SMS_TEMPLATE":
      state = {
        ...state,
        // mail_add_error: null,
        delete_sms_template_loading: action.status,
      };
      break;

    case "EDIT_MAIL_TEMPLATE_FRESH":
      state = {
        ...state,
        // mail_add_error: null,
        edit_mail_template_loading: action.status,
      };
      break;

    case "EDIT_SMS_TEMPLATE":
      state = {
        ...state,
        // mail_add_error: null,
        edit_sms_template_loading: action.status,
      };
      break;

    case "EDIT_SMS_TEMPLATE_FRESH":
      state = {
        ...state,
        // mail_add_error: null,
        edit_sms_template_loading: action.status,
      };
      break;
    case "SMS_SEND":
      state = {
        ...state,
        // mail_add_error: null,
        sms_add_loading: action.status,
      };
      break;

    case "SMS_SEND_LIST":
      state = {
        ...state,
        sms_sent_data: action.payload,
        sms_sent_error: action.error,
        sms_sent_loading: action.status,
      };
      break;

    case "MAIL_SEND_FRESH":
      state = {
        ...state,
        // mail_list_error: null,
        mail_add_loading: action.status,
      };
      break;
    case "SMS_SEND_FRESH":
      state = {
        ...state,
        // mail_list_error: null,
        sms_add_loading: action.status,
      };
      break;
    case "MAIL_LIST_UNDELIVERED":
      state = {
        ...state,
        mail_list_undelivered_data: action.payload,
        mail_list_undelivered_error: null,
        mail_list_undelivered_loading: action.status,
      };
      break;
    case "MAIL_LIST_SENT":
      state = {
        ...state,
        mail_list_sent_data: action.payload,
        mail_list_sent_error: null,
        mail_list_sent_loading: action.status,
      };
      break;
    case "MAIL_LIST_SENT_FRESH":
      state = {
        ...state,
        mail_list_sent_data: action.payload,
        mail_list_sent_loading: action.status,
      };
      break;
    case "SMS_LIST":
      state = {
        ...state,
        sms_list_data: action.payload,
        sms_list_error: null,
        sms_list_loading: action.status,
      };
      break;
    case "TEMPLATE_LIST":
      state = {
        ...state,
        tmp_list_data: action.payload,
        tmp_list_error: null,
        tmp_list_loading: action.status,
      };
      break;
    case "TEMPLATE_LIST_FRESH":
      state = {
        ...state,
        tmp_list_loading: action.status,
      };
      break;
    case "TEMPLATE_LIST_ID":
      state = {
        ...state,
        tmp_list_id_data: action.payload,
        tmp_list_id_error: null,
        tmp_list_id_loading: action.status,
      };
      break;
    case "TEMPLATE_LIST_SMS_ID":
      state = {
        ...state,
        tmp_list_id_sms_data: action.payload,
        tmp_list_id_sms_error: null,
        tmp_list_id_sms_loading: action.status,
      };
      break;

    case "SCHEDULE_SMS_TEMP_EDIT":
      state = {
        ...state,
        schedule_sms_temp_edit_data: action.payload,
        schedule_sms_temp_edit_error: null,
        schedule_sms_temp_edit: action.status,
      };
      break;

    case "SCHEDULE_SMS_TEMP_EDIT_FRESH":
      state = {
        ...state,
        schedule_sms_temp_edit: action.status,
      };
      break;

    case "TEMPLATE_LIST_SMS":
      state = {
        ...state,
        tmp_list_sms_data: action.payload,
        tmp_list_sms_error: null,
        tmp_list_sms_loading: action.status,
      };
      break;
    case "TEMPLATE_LIST_SMS_FRESH":
      state = {
        ...state,
        tmp_list_sms_loading: action.status,
      };
      break;
    case "SMS_TEMPLATE_SEND":
      state = {
        ...state,
        send_sms_loading: action.status,
      };
      break;
    case "SMS_TEMPLATE_SEND_FRESH":
      state = {
        ...state,
        send_sms_loading: action.status,
      };
      break;
    case "SCHEDULE_LIST":
      state = {
        ...state,
        schedule_list_data: action.payload,
        schedule_list_error: null,
        schedule_list_loading: action.status,
      };
      break;
    case "TRIGGER_TO_LIST":
      state = {
        ...state,
        trigger_to_list_data: action.payload,
        trigger_to_list_error: null,
        trigger_to_list_loading: action.status,
      };
      break;
    case "TRIGGER_FROM_LIST":
      state = {
        ...state,
        trigger_from_list_data: action.payload,
        trigger_from_list_error: null,
        trigger_from_list_loading: action.status,
      };
      break;
    case "ADD_SCHEDULE":
      state = {
        ...state,

        add_schedule_loading: action.status,
      };
      break;
    case "ADD_SCHEDULE_FRESH":
      state = {
        ...state,

        add_schedule_loading: action.status,
      };
      break;
    case "EDIT_SCHEDULE":
      state = {
        ...state,

        edit_schedule_loading: action.status,
      };
      break;
    case "EDIT_SCHEDULE_FRESH":
      state = {
        ...state,

        edit_schedule_loading: action.status,
      };
      break;
    case "OUTBOX_MAIL_LIST":
      state = {
        ...state,
        outbox_mail_list_data: action.payload,
        outbox_mail_list_error: null,
        outbox_mail_list_loading: action.status,
      };
      break;
    case "MAIL_DETAILS":
      state = {
        ...state,
        mail_details_data: action.payload,
        mail_details_error: null,
        mail_details_loading: action.status,
      };
      break;
    case "MAIL_DETAILS_FRESH":
      state = {
        ...state,
        mail_details_loading: action.status,
      };
      break;
    case "MAIL_REGARDING":
      state = {
        ...state,
        mail_regarding_data: action.payload,
        mail_regarding_error: null,
        mail_regarding_loading: action.status,
      };
      break;
    case "MAIL_REGARDING_FRESH":
      state = {
        ...state,
        mail_regarding_loading: action.status,
      };
      break;
    case "DELETE_OUTBOX_SMS":
      state = {
        ...state,
        delete_outbox_sms_data: action.status,
      };
      break;
    case "DELETE_OUTBOX_SMS_FRESH":
      state = {
        ...state,
        delete_outbox_sms_data: action.status,
      };
      break;
    case "INBOX_LIST_OWNER":
      state = {
        ...state,
        inbox_list_owner_data: action.payload,
        inbox_list_owner_error: null,
        inbox_list_owner_loading: action.status,
      };
      break;
    case "OUTBOX_MAIL_LIST_OWNER":
      state = {
        ...state,
        outbox_list_owner_data: action.payload,
        outbox_list_owner_error: null,
        outbox_list_owner_loading: action.status,
      };
      break;
    case "MAIL_LIST_UNDELIVERED_OWNER":
      state = {
        ...state,
        mail_list_undelivered_owner_data: action.payload,
        mail_list_undelivered_owner_error: null,
        mail_list_undelivered_owner_loading: action.status,
      };
      break;
    case "MULTIPLE_SMS_DELETE":
      state = {
        ...state,
        multiple_sms_delete_loading: action.status,
      };
      break;
    case "MULTIPLE_SMS_DELETE_FRESH":
      state = {
        ...state,
        multiple_sms_delete_loading: action.status,
      };
      break;
    case "DELETE_MAIL_TEMPLATE_MULTIPLE":
      state = {
        ...state,
        multiple_mail_temp_delete_loading: action.status,
      };
      break;
    case "DELETE_MAIL_TEMPLATE_MULTIPLE_FRESH":
      state = {
        ...state,
        multiple_mail_temp_delete_loading: action.status,
      };
      break;
    case "DELETE_MULTI_SMS_TEMPLATE":
      state = {
        ...state,
        delete_multi_sms_temp__loading: action.status,
      };
      break;
    case "DELETE_MULTI_SMS_TEMPLATE_FRESH":
      state = {
        ...state,
        delete_multi_sms_temp__loading: action.status,
      };
      break;
  }

  return state;
};

export default Message;
