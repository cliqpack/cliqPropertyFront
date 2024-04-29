const initialState = {
  //Inspection data add
  inspection_add_data: null,
  inspection_add_error: null,
  inspection_add_loading: false,

  // Inspection List Data
  inspection_list_data: null,
  inspection_list_error: null,
  inspection_list_loading: false,

  // Inspection Info
  inspection_info_data: null,
  inspection_info_error: null,
  inspection_info_loading: false,

  // Inspection Update
  inspection_update_data: null,
  inspection_update_error: null,
  inspection_update_loading: false,

  // Geographic property location data
  geographic_data: null,
  geographic_error: null,
  geographic_loading: false,

  //inspection schedule data
  inspection_schedule_data: null,
  inspection_schedule_error: null,
  inspection_schedule_loading: false,

  //
  filter_data: null,
  filter_error: null,
  filter_loading: false,

  // Property Room
  property_room_list: null,
  property_room_list_error: null,
  property_room_list_loading: false,

  // Store inspection info data
  store_inspection_add_data: null,
  store_inspection_add_error: null,
  store_inspection_add_loading: false,

  //inspection schedule list
  inspection_schedule_list_data: null,
  inspection_schedule_list_error: null,
  inspection_schedule_list_loading: false,

  //inspection unschedule list
  unschedule_list_data: null,
  unschedule_list_error: null,
  unschedule_list_loading: false,

  // Store routine inspection data
  store_routine_inspection_add_data: null,
  store_routine_inspection_add_error: null,
  store_routine_inspection_add_loading: false,

  // Update routine inspection data
  update_routine_inspection_add_data: null,
  update_routine_inspection_add_error: null,
  update_routine_inspection_add_loading: false,

  // Inspection info details
  inspection_info_details: null,
  inspection_info_details_error: null,
  inspection_info_details_loading: false,

  // Update inspection info data
  update_inspection_details_data: null,
  update_inspection_details_error: null,
  update_inspection_details_loading: false,

  update_routine_inspection_image: null,
  update_routine_inspection_image_error: null,
  update_routine_inspection_image_loading: false,

  get_routine_inspection_image: null,
  get_routine_inspection_image_error: null,
  get_routine_inspection_image_loading: false,

  inspection_lebel: null,
  inspection_lebel_error: null,
  inspection_lebel_loading: false,

  inspection_status: null,
  inspection_status_error: null,
  inspection_status_loading: false,

  inspection_schedule_edit_data: null,
  inspection_schedule_edit_error: null,
  inspection_schedule_edit_loading: false,

  inspected_description: null,
  inspected_description_error: null,
  inspected_description_loading: false,

  delete_property_room: null,
  delete_property_room_loading: false,

  restore_property_room: null,
  restore_property_room_loading: false,

  add_routine_room: null,
  add_routine_room_loading: false,

  //Sort room
  sort_room: null,
  sort_room_loading: false,

  gmtfibs_data: null,
  gmtfibs_error: null,
  gmtfibs_loading: false,

  smta_inspec_data: null,
  smta_inspec_error: null,
  smta_inspec_loading: false,

  inspec_msg_temp_all_data: null,
  inspec_msg_temp_all_error: null,
  inspec_msg_temp_all_loading: false,

  search_templates_data: null,
  search_templates_error: null,
  search_templates_loading: false,

  inspection_preview_loading: false,

  inspection_list_other_data: null,
  inspection_list_other_error: null,
  inspection_list_other_loading: false,

  inspection_inspected_list_data: null,
  inspection_inspected_list_error: null,
  inspection_inspected_list_loading: false,

  inspection_complete_list_data: null,
  inspection_complete_list_error: null,
  inspection_complete_list_loading: false,
};

let data;

const Inspections = (state = initialState, action) => {
  switch (action.type) {
    case "INSPECTION_DATA":
      state = {
        ...state,
        inspection_add_data: action.payload,
        inspection_add_error: action.error,
        inspection_add_loading: action.status,
      };
      break;
    case "INSPECTION_ADD_FRESH":
      state = {
        ...state,
        inspection_add_data: action.payload,
        inspection_add_error: action.error,
        inspection_add_loading: action.status,
      };
      break;
    case "INSPECTION_LIST":
      state = {
        ...state,
        inspection_list_data: action.payload,
        inspection_list_error: null,
        inspection_list_loading: action.status,
      };
      break;
    case "INSPECTION_LIST_FRESH":
      state = {
        ...state,
        inspection_list_data: action.payload,
        inspection_list_error: null,
        inspection_list_loading: action.status,
      };
      break;
    case "INSPECTION_LIST_OTHER":
      state = {
        ...state,
        inspection_list_other_data: action.payload,
        inspection_list_other_error: null,
        inspection_list_other_loading: action.status,
      };
      break;
    case "INSPECTION_LIST_OTHER_FRESH":
      state = {
        ...state,
        inspection_list_other_data: action.payload,
        inspection_list_other_error: null,
        inspection_list_other_loading: action.status,
      };
      break;
    case "INSPECTION_INFO":
      state = {
        ...state,
        inspection_info_data: action.payload,
        inspection_info_error: null,
        inspection_info_loading: action.status,
      };
      break;
    case "INSPECTION_INFO_FRESH":
      state = {
        ...state,
        inspection_info_data: action.payload,
        inspection_info_error: null,
        inspection_info_loading: action.status,
      };
      break;
    case "INSPECTION_UPDATE":
      state = {
        ...state,
        inspection_update_data: action.payload,
        inspection_update_error: null,
        inspection_update_loading: action.status,
      };
      break;
    case "INSPECTION_UPDATE_FRESH":
      state = {
        ...state,
        inspection_update_data: action.payload,
        inspection_update_error: null,
        inspection_update_loading: action.status,
      };
      break;
    case "GEOGRAPHIC_DATA":
      state = {
        ...state,
        geographic_data: action.payload,
        geographic_error: null,
        geographic_loading: action.status,
      };
      break;
    case "GEOGRAPHIC_DATA_FRESH":
      state = {
        ...state,
        geographic_data: action.payload,
        geographic_error: null,
        geographic_loading: action.status,
      };
      break;
    case "INSPECTION_SCHEDULE_DATA":
      state = {
        ...state,
        inspection_schedule_data: action.payload,
        inspection_schedule_error: action.error,
        inspection_schedule_loading: action.status,
      };
      break;

    case "INSPECTION_SCHEDULE_DATA_EDIT":
      state = {
        ...state,
        inspection_schedule_edit_data: action.payload,
        inspection_schedule_edit_error: action.error,
        inspection_schedule_edit_loading: action.status,
      };
      break;
    case "FILTER_DATA":
      state = {
        ...state,
        filter_data: action.payload,
        filter_error: action.error,
        filter_loading: action.status,
      };
      break;
    case "FILTER_DATA_FRESH":
      state = {
        ...state,
        filter_data: action.payload,
        filter_error: action.error,
        filter_loading: action.status,
      };
      break;
    case "PROPERTY_ROOM":
      state = {
        ...state,
        property_room_list: action.payload,
        property_room_list_error: null,
        property_room_list_loading: action.status,
      };
      break;
    case "PROPERTY_ROOM_FRESH":
      state = {
        ...state,
        property_room_list: action.payload,
        property_room_list_error: action.error,
        property_room_list_loading: action.status,
      };
      break;
    case "STORE_INSPECTION_INFO_DATA":
      data = action.payload?.detailData;
      state = {
        ...state,
        store_inspection_add_data: action.payload,
        store_inspection_add_error: action.error,
        store_inspection_add_loading: action.status,

        inspection_info_detail: data,
        inspection_info_details_error: action.error,
        inspection_info_details_loading: action.status,

        inspected_description: { data: { data: action.payload?.description } },
        inspected_description_error: action.error,
        inspected_description_loading: action.status,
      };
      break;
    case "INSPECTION_SCHEDULE_DATA":
      state = {
        ...state,
        inspection_schedule_data: action.payload,
        inspection_schedule_error: action.error,
        inspection_schedule_loading: action.status,
      };
      break;
    case "INSPECTION_SCHEDULE_LIST":
      state = {
        ...state,
        inspection_schedule_list_data: action.payload,
        inspection_schedule_list_error: action.error,
        inspection_schedule_list_loading: action.status,
      };
      break;
    case "INSPECTION_INSPECTED_LIST":
      state = {
        ...state,
        inspection_inspected_list_data: action.payload,
        inspection_inspected_list_error: action.error,
        inspection_inspected_list_loading: action.status,
      };
      break;
    case "INSPECTION_COMPLETE_LIST":
      state = {
        ...state,
        inspection_complete_list_data: action.payload,
        inspection_complete_list_error: action.error,
        inspection_complete_list_loading: action.status,
      };
      break;
    case "UNSCHEDULE_LIST":
      state = {
        ...state,
        unschedule_list_data: action.payload,
        unschedule_list_error: action.error,
        unschedule_list_loading: action.status,
      };
      break;
    case "STORE_INSPECTION_INFO_FRESH":
      state = {
        ...state,
        store_inspection_add_data: action.payload,
        store_inspection_add_error: action.error,
        store_inspection_add_loading: action.status,
      };
      break;
    case "STORE_ROUTINE_INSPECTION_INFO_DATA":
      state = {
        ...state,
        store_routine_inspection_add_data: action.payload,
        store_routine_inspection_add_error: action.error,
        store_routine_inspection_add_loading: action.status,
      };
      break;
    case "STORE_ROUTINE_INSPECTION_INFO_FRESH":
      state = {
        ...state,
        store_routine_inspection_add_data: action.payload,
        store_routine_inspection_add_error: action.error,
        store_routine_inspection_add_loading: action.status,
      };
      break;
    case "UPDATE_ROUTINE_INSPECTION_INFO_DATA":
      state = {
        ...state,
        update_routine_inspection_add_data: action.payload,
        update_routine_inspection_add_error: action.error,
        update_routine_inspection_add_loading: action.status,
      };
      break;
    case "UPDATE_ROUTINE_INSPECTION_INFO_FRESH":
      state = {
        ...state,
        update_routine_inspection_add_data: action.payload,
        update_routine_inspection_add_error: action.error,
        update_routine_inspection_add_loading: action.status,
      };
      break;
    case "UPDATE_ROUTINE_INSPECTION_IMAGE":
      state = {
        ...state,
        update_routine_inspection_image: action.payload,
        update_routine_inspection_image_error: action.error,
        update_routine_inspection_image_loading: action.status,
      };
      break;
    case "UPDATE_ROUTINE_INSPECTION_IMAGE_FRESH":
      state = {
        ...state,
        update_routine_inspection_image: action.payload,
        update_routine_inspection_image_error: action.error,
        update_routine_inspection_image_loading: action.status,
      };
      break;
    case "INSPECTION_INFO_DETAILS":
      state = {
        ...state,
        inspection_info_details: action.payload,
        inspection_info_details_error: action.error,
        inspection_info_details_loading: action.status,
      };
      break;
    case "INSPECTION_INFO_DETAILS_FRESH":
      state = {
        ...state,
        inspection_info_details: action.payload,
        inspection_info_details_error: action.error,
        inspection_info_details_loading: action.status,
      };
      break;
    case "UPDATE_INSPECTION_INFO_DATA":
      data = action.payload?.detailData;
      state = {
        ...state,
        update_inspection_details_data: action.payload,
        update_inspection_details_error: action.error,
        update_inspection_details_loading: action.status,

        inspection_info_detail: data,
        inspection_info_details_error: action.error,
        inspection_info_details_loading: action.status,

        inspected_description: { data: { data: action.payload?.description } },
        inspected_description_error: action.error,
        inspected_description_loading: action.status,
      };
      break;
    case "UPDATE_INSPECTION_INFO_DATA_FRESH":
      state = {
        ...state,
        update_inspection_details_data: action.payload,
        update_inspection_details_error: action.error,
        update_inspection_details_loading: action.status,
      };
      break;
    case "GET_ROUTINE_INSPECTION_IMAGE":
      state = {
        ...state,
        get_routine_inspection_image: action.payload,
        get_routine_inspection_image_error: action.error,
        get_routine_inspection_image_loading: action.status,
      };
      break;

    case "INSPECTION_LEBEL":
      state = {
        ...state,
        inspection_lebel: action.payload,
        inspection_lebel_error: action.error,
        inspection_lebel_loading: action.status,
      };
      break;
    case "INSPECTION_STATUS":
      state = {
        ...state,
        inspection_status: action.payload,
        inspection_status_error: action.error,
        inspection_status_loading: action.status,
      };
      break;
    case "GET_DESCRIPTION":
      state = {
        ...state,
        inspected_description: action.payload,
        inspected_description_error: action.error,
        inspected_description_loading: action.status,
      };
      break;
    case "GET_DESCRIPTION_FRESH":
      state = {
        ...state,
        inspected_description: action.payload,
        inspected_description_error: action.error,
        inspected_description_loading: action.status,
      };
      break;
    case "GET_ROUTINE_INSPECTION_IMAGE_FRESH":
      state = {
        ...state,
        get_routine_inspection_image_loading: action.status,
      };
      break;
    case "DELETE_PROPERTY_ROOM":
      state = {
        ...state,
        delete_property_room: action.payload,
        delete_property_room_loading: action.status,
      };
      break;

    case "DELETE_PROPERTY_ROOM_FRESH":
      state = {
        ...state,
        delete_property_room_loading: action.status,
      };
      break;
    case "RESTORE_PROPERTY_ROOM":
      state = {
        ...state,
        restore_property_room: action.payload,
        restore_property_room_loading: action.status,
      };
      break;
    case "ADD_ROUTINE_ROOM":
      state = {
        ...state,
        add_routine_room: action.payload,
        add_routine_room_loading: action.status,
      };
      break;
    case "ADD_ROUTINE_ROOM_FRESH":
      state = {
        ...state,

        add_routine_room_loading: action.status,
      };
      break;
    case "SORT_ROOM":
      state = {
        ...state,
        sort_room: action.payload,
        sort_room_loading: action.status,
      };
      break;
    case "SORT_ROOM_FRESH":
      state = {
        ...state,

        sort_room_loading: action.status,
      };
      break;
    case "GET_MESSAGE_TEMPLATES_FOR_INSPECTION_BY_SELECT":
      state = {
        ...state,
        gmtfibs_data: action.payload,
        gmtfibs_error: action.error,
        gmtfibs_loading: action.status,
      };
      break;
    case "SEND_MAIL_TO_ACTIVITY_INSPECTION":
      state = {
        ...state,
        smta_inspec_data: action.payload,
        smta_inspec_error: action.status,
        smta_inspec_loading: action.status,
      };
      break;
    case "SEND_MAIL_TO_ACTIVITY_INSPECTION_FRESH":
      state = {
        ...state,
        smta_inspec_loading: action.status,
      };
      break;
    case "INSPECTION_MESSAGE_TEMPLATES_ALL":
      state = {
        ...state,
        inspec_msg_temp_all_data: action.payload,
        inspec_msg_temp_all_error: action.status,
        inspec_msg_temp_all_loading: action.status,
      };
      break;
    case "SEARCH_TEMPLATES":
      state = {
        ...state,
        search_templates_data: action.payload,
        search_templates_error: action.status,
        search_templates_loading: action.status,
      };
      break;
    case "REPORT_PREVIEW":
      state = {
        ...state,
        inspection_preview_loading: action.status,
      };
      break;
    case "REPORT_PREVIEW_FRESH":
      state = {
        ...state,
        inspection_preview_loading: action.status,
      };
      break;
    default:
      state = { ...state };
      break;
  }
  return state;
};

export default Inspections;
