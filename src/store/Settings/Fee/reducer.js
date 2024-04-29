const initialState = {
    store_fee_loading: false,
    get_fee_data: null,
    get_fee_error: null,
    get_fee_loading: false,
    get_ownership_fee_data: null,
    get_ownership_fee_error: null,
    get_ownership_fee_loading: false,
    get_folio_fee_data: null,
    get_folio_fee_error: null,
    get_folio_fee_loading: false,
    get_owner_folio_fees_data: null,
    get_owner_folio_fees_error: null,
    get_owner_folio_fees_loading: false,
    update_fee_loading: false,
}
const FeeSettings = (state = initialState, action) => {
    switch (action.type) {
        case 'STORE_FEE':
            state = {
                ...state,
                store_fee_loading: action.status,
            }
            break;
        case 'STORE_FEE_FRESH':
            state = {
                ...state,
                store_fee_loading: action.status,
            }
            break;
        case 'GET_FEES':
            state = {
                ...state,
                get_fee_data: action.payload,
                get_fee_error: action.payload,
                get_fee_loading: action.status
            }
            break;
        case 'GET_OWNERSHIP_FEES':
            state = {
                ...state,
                get_ownership_fee_data: action.payload,
                get_ownership_fee_error: action.payload,
                get_ownership_fee_loading: action.status
            }
            break;
        case 'GET_FOLIO_FEES':
            state = {
                ...state,
                get_folio_fee_data: action.payload,
                get_folio_fee_error: action.payload,
                get_folio_fee_loading: action.status
            }
            break;
        case 'GET_OWNER_FOLIO_FEES':
            state = {
                ...state,
                get_owner_folio_fees_data: action.payload,
                get_owner_folio_fees_error: action.payload,
                get_owner_folio_fees_loading: action.status
            }
            break;
        case 'GET_OWNER_FOLIO_FEES_FRESH':
            state = {
                ...state,
                get_owner_folio_fees_loading: action.status
            }
            break;
        case "UPDATE_FEE":
            state = {
                ...state,
                update_fee_loading: action.status,
            };
            break;

        case "UPDATE_FEE_FRESH":
            state = {
                ...state,
                update_fee_loading: action.status,
            };
            break;
        default:
            state = { ...state };
            break;
    }
    return state;
}
export default FeeSettings;