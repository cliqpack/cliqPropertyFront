const initialState = {
    eft_withdrawal_data: null,
    eft_withdrawal_data_error: null,
    eft_withdrawal_data_loading: false,

    cheque_withdrawal_data: null,
    cheque_withdrawal_data_error: null,
    cheque_withdrawal_data_loading: false,
  };
  
  const Withdrawal = (state = initialState, action) => {
    switch (action.type) {
      case "EFT_WITHDRAWALS":
        state = {
          ...state,
          eft_withdrawal_data: action.payload,
          eft_withdrawal_data_error: action.status,
          eft_withdrawal_data_loading: action.status,
        };
        break;
      case "EFT_WITHDRAWALS_FRESH":
        state = {
          ...state,
          eft_withdrawal_data: action.payload,
          eft_withdrawal_data_error: action.status,
          eft_withdrawal_data_loading: action.status,
        };
        break;
      case "CHEQUE_WITHDRAWALS":
        state = {
          ...state,
          cheque_withdrawal_data: action.payload,
          cheque_withdrawal_data_error: action.status,
          cheque_withdrawal_data_loading: action.status,
        };
        break;
      case "CHEQUE_WITHDRAWALS_FRESH":
        state = {
          ...state,
          cheque_withdrawal_data: action.payload,
          cheque_withdrawal_data_error: action.status,
          cheque_withdrawal_data_loading: action.status,
        };
        break;
      default:
        state = { ...state };
        break;
    }
    return state;
  };
  
  export default Withdrawal;
  