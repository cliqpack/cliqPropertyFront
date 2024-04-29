const initialState = {
  listing_list_data: null,
  listing_list_error: null,
  listing_list_loading: false,

  listing_list_info_data: null,
  listing_list_info_error: null,
  listing_list_info_loading: false,

  property_update_listing_info_data: null,
  property_update_listing_info_error: null,
  property_update_listing_info_loading: false,

  rental_listing_data: null,
  rental_listing_data_error: null,
  rental_listing_loading: false,

  listing_modal_add_data: null,
  listing_modal_add_loading: false,

  general_feature_data: null,
  general_feature_data_error: false,
  general_feature_data_loading: false,

  get_general_feature_data: null,
  get_general_feature_data_error: null,
  get_general_feature_data_loading: false,

  link_data: null,
  link_data_error: null,
  link_data_loading: false,

  listing_list_inspection_info_data: null,
  listing_list_inspection_info_error: null,
  listing_list_inspection_info_loading: false,

  rental_listing_update_desc_data: null,
  rental_listing_update_desc_data_error: null,
  rental_listing_update_desc_loading: false,

  list_desc_data: null,
  list_desc_data_error: null,
  list_desc_loading: false,

  inspection_info_modal_data: null,
  inspection_info_modal_data_error: null,
  inspection_info_modal_loading: false,

  listing_link_data: null,
  listing_link_data_error: null,
  listing_link_data_loading: false,

  general_list_feature_image_add: null,
  general_list_feature_image_add_error: null,
  general_list_feature_image_add_loading: false,

  get_list_feature_image: null,
  get_list_feature_image_error: null,
  get_list_feature_image_loading: false,

  listing_status_data: null,
  listing_status_loading: false,

  delete_listing_loading: false,

  general_list_image_add: null,
  general_list_image_add_error: null,
  general_list_image_add_loading: false,

  gmtfbs_listings_data: null,
  gmtfbs_listings_error: null,
  gmtfbs_listings_loading: false,

  smta_listing_data: null,
  smta_listing_error: null,
  smta_listing_loading: false,

  off_market_status_loading: false,

  republish_listing_loading: false,

};

const Listing = (state = initialState, action) => {
  switch (action.type) {
    case "LISTING_LIST":
      state = {
        ...state,
        listing_list_data: action.payload,
        listing_list_error: null,
        listing_list_loading: action.status,
      };
      break;
    case "LISTINGS_MODAL_ADD":
      state = {
        ...state,
        listing_modal_add_data: action.payload,
        listing_modal_add_loading: action.status,
      };
      break;
    case "LISTINGS_MODAL_ADD_FRESH":
      state = {
        ...state,
        listing_modal_add_data: action.payload,
        listing_modal_add_loading: action.status,
      };
      break;
    case "LISTINGS_LIST_FRESH":
      state = {
        ...state,
        listing_list_data: action.status,
        listing_list_loading: false,
      };
      break;
    case "LISTING_LIST_INFO":
      state = {
        ...state,
        listing_list_info_data: action.payload,
        listing_list_info_error: null,
        listing_list_info_loading: action.status,
      };
      break;
    case "LISTINGS_INFO_FRESH":
      state = {
        ...state,
        listing_list_info_data: action.payload,
        listing_list_info_error: null,
        listing_list_info_loading: action.status,
      };
      break;
    case "UPDATE_PROPERTY_LISTING_INFO":
      state = {
        ...state,
        property_update_listing_info_data: action.payload,
        property_update_listing_info_error: null,
        property_update_listing_info_loading: action.status,
      };
      break;
    case "UPDATE_PROPERTY_LISTING_INFO_FRESH":
      state = {
        ...state,
        property_update_listing_info_loading: action.status,
      };
      break;
    case "RENTAL_LISTING_DATA":
      state = {
        ...state,
        rental_listing_data: action.payload,
        rental_listing_data_error: null,
        rental_listing_loading: action.status,
      };
      break;
    case "RENTAL_LISTING_DATA_FRESH":
      state = {
        ...state,
        rental_listing_data: action.payload,
        rental_listing_data_error: null,
        rental_listing_loading: action.status,
      };
      break;
    case "RENTAL_LISTING_UPDATE":
      state = {
        ...state,
        rental_listing_update_data: action.payload,
        rental_listing_update_data_error: null,
        rental_listing_update_loading: action.status,
      };
      break;
    case "RENTAL_LISTING_UPDATE_FRESH":
      state = {
        ...state,
        rental_listing_update_data: action.payload,
        rental_listing_update_data_error: null,
        rental_listing_update_loading: action.status,
      };
      break;
    // case "RENTAL_LISTING_UPDATE_FRESH":
    //   state = {
    //     ...state,
    //     rental_listing_data: action.payload,
    //     rental_listing_data_error: null,
    //     rental_listing_loading: false,
    //   };
    //   break;
    case "LISTING_LIST_INSPECTION_INFO":
      state = {
        ...state,
        listing_list_inspection_info_data: action.payload,
        listing_list_inspection_info_error: null,
        listing_list_inspection_info_loading: action.status,
      };
      break;
    case "LISTING_LIST_INSPECTION_INFO_FRESH":
      state = {
        ...state,
        listing_list_inspection_info_data: action.payload,
        listing_list_inspection_info_error: null,
        listing_list_inspection_info_loading: action.status,
      };
      break;
    case "RENTAL_LISTING_UPDATE_DESC":
      state = {
        ...state,
        rental_listing_update_desc_data: action.payload,
        rental_listing_update_desc_data_error: null,
        rental_listing_update_desc_loading: action.status,
      };
      break;
    case "RENTAL_LISTING_UPDATE_DESC_FRESH":
      state = {
        ...state,
        rental_listing_update_desc_data: action.payload,
        rental_listing_update_desc_data_error: null,
        rental_listing_update_desc_loading: action.status,
      };
      break;
    case "LISTING_DESC_DATA":
      state = {
        ...state,
        list_desc_data: action.payload,
        list_desc_data_error: null,
        list_desc_loading: action.status,
      };
      break;
    case "LISTING_DESC_DATA_FRESH":
      state = {
        ...state,
        list_desc_data: action.payload,
        list_desc_data_error: null,
        list_desc_loading: action.status,
      };
      break;
    case "INSPECTION_INFO_MODAL_DATA":
      state = {
        ...state,
        inspection_info_modal_data: action.payload,
        inspection_info_modal_data_error: null,
        inspection_info_modal_loading: action.status,
      };
      break;

    case "LISTING_GENERAL_FEATURE":
      state = {
        ...state,
        general_feature_data: action.payload,
        general_feature_data_error: null,
        general_feature_data_loading: action.status,
      };
      break;

    case "GET_LISTING_GENERAL_FEATURE":
      state = {
        ...state,
        get_general_feature_data: action.payload,
        get_general_feature_data_error: null,
        get_general_feature_data_loading: action.status,
      };
      break;
    case "GET_LISTING_GENERAL_FEATURE_FRESH":
      state = {
        ...state,

        get_general_feature_data_loading: action.status,
      };
      break;


    case "LISTING_LINKS":
      state = {
        ...state,
        link_data: action.payload,
        link_data_error: null,
        link_data_loading: action.status,
      };
      break;
    case "GENERAL_LIST_FEATURE_IMAGE_ADD":
      state = {
        ...state,
        general_list_feature_image_add: action.payload,
        general_list_feature_image_add_error: action.error,
        general_list_feature_image_add_loading: action.status,
      };
      break;
    case "GENERAL_LIST_FEATURE_IMAGE_ADD_FRESH":
      state = {
        ...state,
        general_list_feature_image_add: action.payload,
        general_list_feature_image_add_error: action.error,
        general_list_feature_image_add_loading: action.status,
      };
      break;
    case "GENERAL_LIST_IMAGE_ADD":
      state = {
        ...state,
        general_list_image_add: action.payload,
        general_list_image_add_error: action.error,
        general_list_image_add_loading: action.status,
      };
      break;
    case "GENERAL_LIST_IMAGE_ADD_FRESH":
      state = {
        ...state,
        general_list_image_add: action.payload,
        general_list_image_add_error: action.error,
        general_list_image_add_loading: action.status,
      };
      break;
    case "LISTING_LINKS_DATA":
      state = {
        ...state,
        listing_link_data: action.payload,
        listing_link_data_error: null,
        listing_link_data_loading: action.status,
      };
      break;
    case "LISTING_LINKS_DATA_FRESH":
      state = {
        ...state,
        link_data: action.payload,
        link_data_error: action.error,
        link_data_loading: action.status,
        // listing_link_data: action.payload,
        // listing_link_data_error: action.error,
        // listing_link_data_loading: action.status,
        // link_data: action.payload,
        // link_data_error: null,
        // link_data_loading: action.status,
      };
      break;

    case "GET_GENERAL_LIST_FEATURE_IMAGE":
      state = {
        ...state,
        get_list_feature_image: action.payload,
        get_list_feature_image_error: action.error,
        get_list_feature_image_loading: action.status,
      };

      break;
    case "GET_GENERAL_LIST_FEATURE_IMAGE_FRESH":
      state = {
        ...state,
        get_list_feature_image: action.payload,
        get_list_feature_image_error: action.error,
        get_list_feature_image_loading: action.status,
      };

      break;
    case "LISTING_STATUS":
      state = {
        ...state,
        listing_status_data: action.payload,
        listing_status_loading: action.status,
      };
      break;

    case "LISTING_STATUS_FRESH":
      state = {
        ...state,
        listing_status_data: action.payload,
        listing_status_loading: action.status,
      };
      break;
    case "DELETE_LISTING":
      state = {
        ...state,
        delete_listing_loading: action.status,
      };
      break;
    case "DELETE_LISTING_FRESH":
      state = {
        ...state,
        delete_listing_loading: action.status,
      };
      break;
    case "GET_MESSAGE_TEMPLATES_FOR_LISTINGS_BY_SELECT":
      state = {
        ...state,
        gmtfbs_listings_data: action.payload,
        gmtfbs_listings_error: action.error,
        gmtfbs_listings_loading: action.status,
      }
      break;
    case "SEND_MAIL_TO_ACTIVITY_LISTING":
      state = {
        ...state,
        smta_listing_data: action.payload,
        smta_listing_error: action.status,
        smta_listing_loading: action.status,
      };
      break;
    case "SEND_MAIL_TO_ACTIVITY_LISTING_FRESH":
      state = {
        ...state,

        smta_listing_loading: action.status,
      };
      break;
    case "OFF_MARKET":
      state = {
        ...state,

        off_market_status_loading: action.status,
      };
      break;
    case "OFF_MARKET_FRESH":
      state = {
        ...state,

        off_market_status_loading: action.status,
      };
      break;

    case "REPUBLISH_LISTING":
      state = {
        ...state,
        republish_listing_loading: action.status,
      }
      break;
    case "REPUBLISH_LISTING_FRESH":
      state = {
        ...state,
        republish_listing_loading: action.status,
      }
      break;
    default:
      state = { ...state };
      break;
  }
  return state;
};

export default Listing;
