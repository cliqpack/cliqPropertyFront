import axios from "axios";

export const Reconcile = (id) => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));

  var url = `${process.env.REACT_APP_LOCALHOST}/reconcile/${id}`;
  return dispatch => {
    const headers = {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",

      Authorization: "Bearer " + authUser.token,
    };
    axios
      .get(url, { headers: headers })
      .then(response => {
        dispatch({
          type: "RECONCILE",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "RECONCILE",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const ReconcileFresh = () => {
  return dispatch =>
    dispatch({
      type: "RECONCILE_FRESH",
      status: false,
    });
};

export const ApproveReconciliation = (id) => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));

  var url = `${process.env.REACT_APP_LOCALHOST}/approve/reconciliation/${id}`;
  return dispatch => {
    const headers = {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",

      Authorization: "Bearer " + authUser.token,
    };
    axios
      .get(url, { headers: headers })
      .then(response => {
        dispatch({
          type: "APPROVE_RECONCILIATION",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "APPROVE_RECONCILIATION",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const ApproveReconciliationFresh = () => {
  return dispatch =>
    dispatch({
      type: "APPROVE_RECONCILIATION_FRESH",
      status: false,
    });
};
export const ApprovedReconciliation = (date) => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));

  var url = `${process.env.REACT_APP_LOCALHOST}/reconciliation/approved?date=${date}`;
  return dispatch => {
    const headers = {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",

      Authorization: "Bearer " + authUser.token,
    };
    axios
      .get(url, { headers: headers })
      .then(response => {
        dispatch({
          type: "APPROVED_RECONCILIATION",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "APPROVED_RECONCILIATION",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const ApprovedReconciliationFresh = () => {
  return dispatch =>
    dispatch({
      type: "APPROVED_RECONCILIATION_FRESH",
      payload: false,
      status: false,
    });
};

export const RevokeReconciliation = (id) => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));

  var url = `${process.env.REACT_APP_LOCALHOST}/revoke/reconciliation/${id}`;
  return dispatch => {
    const headers = {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",

      Authorization: "Bearer " + authUser.token,
    };
    axios
      .get(url, { headers: headers })
      .then(response => {
        dispatch({
          type: "REVOKE_RECONCILIATION",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "REVOKE_RECONCILIATION",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const RevokeReconciliationFresh = () => {
  return dispatch =>
    dispatch({
      type: "REVOKE_RECONCILIATION_FRESH",
      status: false,
    });
};


export const ReconciliationStore = () => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));

  var url = `${process.env.REACT_APP_LOCALHOST}/reconcilliation_store`;
  return dispatch => {
    const headers = {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",

      Authorization: "Bearer " + authUser.token,
    };
    axios
      .get(url, { headers: headers })
      .then(response => {
        dispatch({
          type: "RECONCILIATIONS_STORE",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "RECONCILIATIONS_STORE",
          payload: error,
          status: "Failed",
        });
      });
  };
};
export const ReconciliationList = () => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));

  var url = `${process.env.REACT_APP_LOCALHOST}/reconcillation-list`;
  const formData = {};
  return dispatch => {
    const headers = {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",

      Authorization: "Bearer " + authUser.token,
    };
    axios
      .get(url, { headers: headers })
      .then(response => {
        dispatch({
          type: "RECONCILIATIONS_LIST",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "RECONCILIATIONS_LIST",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const ReconciliationListFresh = () => {
  return dispatch =>
    dispatch({
      type: "UPLOAD_BILLS_LIST_FRESH",
      status: false,
    });
};

export const ReconciliationData = params => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));

  var url = `${process.env.REACT_APP_LOCALHOST}/reconcillation-list-details`;
  const formData = {};
  return dispatch => {
    const headers = {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",

      Authorization: "Bearer " + authUser.token,
    };
    axios
      .post(url, { id: params }, { headers: headers })
      .then(response => {
        dispatch({
          type: "RECONCILIATION",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "RECONCILIATION",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const ReconciliationDataFresh = () => {
  return dispatch =>
    dispatch({
      type: "RECONCILIATION_FRESH",
      status: false,
    });
};

export const ReceiptList = (m, y) => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  var url = `${process.env.REACT_APP_LOCALHOST}/receipt-list-by-month/${m}/${y}`;
  const formData = {};
  return dispatch => {
    const headers = {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",

      Authorization: "Bearer " + authUser.token,
    };
    axios
      .get(url, { headers: headers })
      .then(response => {
        dispatch({
          type: "RECEIPT_LIST",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "RECEIPT_LIST",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const ReceiptListFresh = () => {
  return dispatch =>
    dispatch({
      type: "RECEIPT_LIST_FRESH",
      status: false,
    });
};

export const UnreconciledDepositsData = (m, y) => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  var url = `${process.env.REACT_APP_LOCALHOST}/unreconciled-deposit-list/${m}/${y}`;
  const formData = {};
  return dispatch => {
    const headers = {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",

      Authorization: "Bearer " + authUser.token,
    };
    axios
      .get(url, { headers: headers })
      .then(response => {
        dispatch({
          type: "UN_LIST",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "UN_LIST",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const UnreconciledDepositsDataFresh = () => {
  return dispatch =>
    dispatch({
      type: "UN_LIST_FRESH",
      status: false,
    });
};

export const adjustmentsData = id => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  var url = `${process.env.REACT_APP_LOCALHOST}/adjustment-list/${id}`;
  const formData = {};
  return dispatch => {
    const headers = {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",

      Authorization: "Bearer " + authUser.token,
    };
    axios
      .get(url, { headers: headers })
      .then(response => {
        dispatch({
          type: "AD_LIST",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "AD_LIST",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const adjustmentsDataFresh = () => {
  return dispatch =>
    dispatch({
      type: "AD_LIST_FRESH",
      status: false,
    });
};

export const allAdjustmentsData = id => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  var url = `${process.env.REACT_APP_LOCALHOST}/all-adjustment-list/${id}`;
  const formData = {};
  return dispatch => {
    const headers = {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",

      Authorization: "Bearer " + authUser.token,
    };
    axios
      .get(url, { headers: headers })
      .then(response => {
        dispatch({
          type: "ALL_AD_LIST",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "ALL_AD_LIST",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const allAdjustmentsDataFresh = () => {
  return dispatch =>
    dispatch({
      type: "ALL_AD_LIST_FRESH",
      payload: null,
      status: false,
    });
};

export const addAdjustment = (id, state) => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  var url = `${process.env.REACT_APP_LOCALHOST}/store-adjustment`;
  const formData = {
    r_month_details_id: id,
    adjustment_date: state.date,
    reason: state.reason,
    amount: state.amount,
  };
  return dispatch => {
    const headers = {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",

      Authorization: "Bearer " + authUser.token,
    };
    axios
      .post(url, formData, { headers: headers })
      .then(response => {
        dispatch({
          type: "ADD_ADJUSTMENT",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "ADD_ADJUSTMENT",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const addAdjustmentFresh = () => {
  return dispatch =>
    dispatch({
      type: "ADD_ADJUSTMENT_FRESH",
      status: false,
    });
};

export const removeAdjustment = (data, state) => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  var url = `${process.env.REACT_APP_LOCALHOST}/remove-adjustment`;
  const formData = {
    removedata: data,
    removed_reason: state.reason,
  };
  console.log(formData);
  return dispatch => {
    const headers = {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",

      Authorization: "Bearer " + authUser.token,
    };
    axios
      .post(url, formData, { headers: headers })
      .then(response => {
        dispatch({
          type: "RMV_ADJUSTMENT",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "RMV_ADJUSTMENT",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const removeAdjustmentFresh = () => {
  return dispatch =>
    dispatch({
      type: "RMV_ADJUSTMENT_FRESH",
      status: false,
    });
};

export const UnreconciledItemsReports = (month, year, id) => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));

  var url = `${process.env.REACT_APP_LOCALHOST}/unreconcilled-items/${month}/${year}/${id}`;
  const formData = {};
  return dispatch => {
    const headers = {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",

      Authorization: "Bearer " + authUser.token,
    };
    axios
      .get(url, { headers: headers })
      .then(response => {
        dispatch({
          type: "UNRECONCILE_ITEM_REPORT",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "UNRECONCILE_ITEM_REPORT",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const ReconcileBankDeposit = state => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  var url = `${process.env.REACT_APP_LOCALHOST}/reconcile-deposit`;
  return dispatch => {
    const headers = {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",

      Authorization: "Bearer " + authUser.token,
    };
    const formData = {
      data: state,
    };
    axios
      .post(url, formData, { headers: headers })
      .then(response => {
        dispatch({
          type: "RECONCILE_BANK_DEPOSIT",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "RECONCILE_BANK_DEPOSIT",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const ReconcileBankDepositFresh = () => {
  return dispatch =>
    dispatch({
      type: "RECONCILE_BANK_DEPOSIT_FRESH",
      status: false,
    });
};

export const UnreconcileBankDeposit = state => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  var url = `${process.env.REACT_APP_LOCALHOST}/unreconcile-deposit`;
  return dispatch => {
    const headers = {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",

      Authorization: "Bearer " + authUser.token,
    };
    const formData = {
      data: state,
    };
    axios
      .post(url, formData, { headers: headers })
      .then(response => {
        dispatch({
          type: "UNRECONCILE_BANK_DEPOSIT",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "UNRECONCILE_BANK_DEPOSIT",
          payload: error,
          status: "Failed",
        });
      });
  };
};
export const UnreconcileBankDepositFresh = () => {
  return dispatch =>
    dispatch({
      type: "UNRECONCILE_BANK_DEPOSIT_FRESH",
      status: false,
    });
};

export const UnreconciledAllDepositsData = (m, y) => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  var url = `${process.env.REACT_APP_LOCALHOST}/unreconciled-all-deposit-list/${m}/${y}`;
  return dispatch => {
    const headers = {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",

      Authorization: "Bearer " + authUser.token,
    };
    axios
      .get(url, { headers: headers })
      .then(response => {
        dispatch({
          type: "UN_ALL_LIST",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "UN_ALL_LIST",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const UnreconciledAllDepositsDataFresh = () => {
  return dispatch =>
    dispatch({
      type: "UN_ALL_LIST_FRESH",
      payload: null,
      error: null,
      status: false,
    });
};

export const folioLedgerReport = (year, month) => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  var url = `${process.env.REACT_APP_LOCALHOST}/folioledger/${year}/${month}`;
  return dispatch => {
    const headers = {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",

      Authorization: "Bearer " + authUser.token,
    };
    axios
      .get(url, { headers: headers })
      .then(response => {
        dispatch({
          type: "FL_DATA",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "FL_DATA",
          payload: error,
          status: "Failed",
        });
      });
  };
};
export const trialBalanceReport = (year, month) => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));

  var url = `${process.env.REACT_APP_LOCALHOST}/trialBalance/${year}/${month}`;
  const formData = {};
  return dispatch => {
    const headers = {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",

      Authorization: "Bearer " + authUser.token,
    };
    axios
      .get(url, { headers: headers })
      .then(response => {
        dispatch({
          type: "TRIAL_DATA",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "TRIAL_DATA",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const editBankStatementModel = (state, id) => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  var url = `${process.env.REACT_APP_LOCALHOST}/bankStatementBalance/${id}`;
  const formData = {
    bank_statement_balance_date: state.date,
    bank_statement_balance: state.balance,
  };
  return dispatch => {
    const headers = {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",

      Authorization: "Bearer " + authUser.token,
    };
    axios
      .post(url, formData, { headers: headers })
      .then(response => {
        dispatch({
          type: "BANK_STATEMENT_EDIT",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "BANK_STATEMENT_EDIT",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const editBankStatementModelFresh = () => {
  return dispatch =>
    dispatch({
      type: "BANK_STATEMENT_EDIT_FRESH",
      payload: null,
      error: null,
      status: false,
    });
};

export const unreconciledWithdrawalsAll = (year, month) => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  // var url = `${process.env.REACT_APP_LOCALHOST}/all/reconcillied/${year}/${month}`;
  var url = `${process.env.REACT_APP_LOCALHOST}/unreconcillied/withdrawls/${year}/${month}`;

  const formData = {};
  return dispatch => {
    const headers = {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",

      Authorization: "Bearer " + authUser.token,
    };
    axios
      .get(url, { headers: headers })
      .then(response => {
        dispatch({
          type: "UNRECONCILE_WITHDRAWALS_LIST_ALL",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "UNRECONCILE_WITHDRAWALS_LIST_ALL",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const unreconciledWithdrawalsAllFresh = () => {
  return dispatch =>
    dispatch({
      type: "UNRECONCILE_WITHDRAWALS_LIST_ALL_FRESH",
      payload: null,
      error: null,
      status: false,
    });
};

export const unreconciledWithdrawals = (year, month) => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  // var url = `${process.env.REACT_APP_LOCALHOST}/unreconcillied/withdrawls/${year}/${month}`;
  var url = `${process.env.REACT_APP_LOCALHOST}/all/reconcillied/${year}/${month}`;

  const formData = {};
  return dispatch => {
    const headers = {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",

      Authorization: "Bearer " + authUser.token,
    };
    axios
      .get(url, { headers: headers })
      .then(response => {
        dispatch({
          type: "UNRECONCILE_WITHDRAWALS_LIST",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "UNRECONCILE_WITHDRAWALS_LIST",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const unreconciledWithdrawalsFresh = () => {
  return dispatch =>
    dispatch({
      type: "UNRECONCILE_WITHDRAWALS_LIST_FRESH",
      payload: null,
      error: null,
      status: false,
    });
};

export const unreconciledWithdrawalsReconcile = data => {
  console.log(data);
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  var url = `${process.env.REACT_APP_LOCALHOST}/unreconcillied/withdrawls`;
  const formData = {
    id: data,
  };
  console.log(formData);
  return dispatch => {
    const headers = {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",

      Authorization: "Bearer " + authUser.token,
    };
    axios
      .put(url, formData, { headers: headers })
      .then(response => {
        dispatch({
          type: "UNRECONCILE_WITHDRAWALS_ADD",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "UNRECONCILE_WITHDRAWALS_ADD",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const unreconciledWithdrawalsReconcileFresh = () => {
  return dispatch =>
    dispatch({
      type: "UNRECONCILE_WITHDRAWALS_ADD_FRESH",
      payload: null,
      error: null,
      status: false,
    });
};

export const unreconciledWithdrawalsUnReconcile = data => {
  console.log(data);
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  var url = `${process.env.REACT_APP_LOCALHOST}/reconcillied`;
  const formData = {
    id: data,
  };
  console.log(formData);
  return dispatch => {
    const headers = {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",

      Authorization: "Bearer " + authUser.token,
    };
    axios
      .put(url, formData, { headers: headers })
      .then(response => {
        dispatch({
          type: "UNRECONCILE_WITHDRAWALS_RMV",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "UNRECONCILE_WITHDRAWALS_RMV",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const unreconciledWithdrawalsUnReconcileFresh = () => {
  return dispatch =>
    dispatch({
      type: "UNRECONCILE_WITHDRAWALS_RMV_FRESH",
      payload: null,
      error: null,
      status: false,
    });
};

export const withdrawalsNotProcessed = (year, month, type) => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  var url = `${process.env.REACT_APP_LOCALHOST}/withdraw/${month}/${year}/${type}`;
  const formData = {};
  return dispatch => {
    const headers = {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",

      Authorization: "Bearer " + authUser.token,
    };
    axios
      .get(url, { headers: headers })
      .then(response => {
        dispatch({
          type: "WITHDRAWALS_NOT_PROCESSED",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "WITHDRAWALS_NOT_PROCESSED",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const withdrawalsNotProcessedFresh = () => {
  return dispatch =>
    dispatch({
      type: "WITHDRAWALS_NOT_PROCESSED_FRESH",
      payload: null,
      error: null,
      status: false,
    });
};

export const withdrawalsNotProcessedDataPost = data => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  console.log(data);
  var url = `${process.env.REACT_APP_LOCALHOST}/withdraw`;
  const formData = {
    disburse: data,
  };
  console.log(formData);
  return dispatch => {
    const headers = {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",

      Authorization: "Bearer " + authUser.token,
    };
    axios
      .post(url, formData, { headers: headers })
      .then(response => {
        dispatch({
          type: "WITHDRAWALS_NOT_PROCESSED_POST",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "WITHDRAWALS_NOT_PROCESSED_POST",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const withdrawalsNotProcessedDataPostFresh = () => {
  return dispatch =>
    dispatch({
      type: "WITHDRAWALS_NOT_PROCESSED_POST_FRESH",
      payload: null,
      error: null,
      status: false,
    });
};

export const journalReport = (year, month) => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));

  var url = `${process.env.REACT_APP_LOCALHOST}/journalBalance/${year}/${month}`;
  const formData = {};
  return dispatch => {
    const headers = {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",

      Authorization: "Bearer " + authUser.token,
    };
    axios
      .get(url, { headers: headers })
      .then(response => {
        dispatch({
          type: "JOURNAL_REPORT_DATA",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "JOURNAL_REPORT_DATA",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const journalReportFresh = () => {
  return dispatch =>
    dispatch({
      type: "JOURNAL_REPORT_DATA_FRESH",
      payload: null,
      error: null,
      status: false,
    });
};

export const cashBookReport = (year, month) => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));

  var url = `${process.env.REACT_APP_LOCALHOST}/cashBookBalance/${year}/${month}`;
  const formData = {};
  return dispatch => {
    const headers = {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",

      Authorization: "Bearer " + authUser.token,
    };
    axios
      .get(url, { headers: headers })
      .then(response => {
        dispatch({
          type: "CASHBOOK_REPORT_DATA",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "CASHBOOK_REPORT_DATA",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const cashBookReportFresh = () => {
  return dispatch =>
    dispatch({
      type: "CASHBOOK_REPORT_DATA_FRESH",
      payload: null,
      error: null,
      status: false,
    });
};

export const transactionsAuditReport = (year, month) => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));

  var url = `${process.env.REACT_APP_LOCALHOST}/transactionAudit/${year}/${month}`;
  const formData = {};
  return dispatch => {
    const headers = {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",

      Authorization: "Bearer " + authUser.token,
    };
    axios
      .get(url, { headers: headers })
      .then(response => {
        dispatch({
          type: "TRANSACTION_AUDIT_REPORT_DATA",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "TRANSACTION_AUDIT_REPORT_DATA",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const transactionsAuditReportFresh = () => {
  return dispatch =>
    dispatch({
      type: "TRANSACTION_AUDIT_REPORT_DATA_FRESH",
      payload: null,
      error: null,
      status: false,
    });
};

export const newWithdrawals = (m, y) => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  var url = `${process.env.REACT_APP_LOCALHOST}/all-withdraw/${m}/${y}`;
  const formData = {};
  return dispatch => {
    const headers = {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",

      Authorization: "Bearer " + authUser.token,
    };
    axios
      .get(url, { headers: headers })
      .then(response => {
        dispatch({
          type: "NEWWITHDRAWALS_LIST",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "NEWWITHDRAWALS_LIST",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const newWithdrawalsFresh = () => {
  return dispatch =>
    dispatch({
      type: "NEWWITHDRAWALS_LIST_FRESH",
      status: false,
    });
};

export const cashBookReportReceipt = (year, month) => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));

  var url = `${process.env.REACT_APP_LOCALHOST}/receipt-list-report-by-month/${month}/${year}`;
  const formData = {};
  return dispatch => {
    const headers = {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",

      Authorization: "Bearer " + authUser.token,
    };
    axios
      .get(url, { headers: headers })
      .then(response => {
        dispatch({
          type: "CASHBOOK_REPORT_RECIEPT_DATA",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "CASHBOOK_REPORT_RECIEPT_DATA",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const cashBookReportReceiptFresh = () => {
  return dispatch =>
    dispatch({
      type: "CASHBOOK_REPORT_RECIEPT_DATA_FRESH",
      status: false,
    });
};

export const newWithDrawalsReport = (year, month) => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));

  var url = `${process.env.REACT_APP_LOCALHOST}/all-withdraw-report/${month}/${year}`;
  const formData = {};
  return dispatch => {
    const headers = {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",

      Authorization: "Bearer " + authUser.token,
    };
    axios
      .get(url, { headers: headers })
      .then(response => {
        dispatch({
          type: "NEW_WITHDRAWALS_REPORT_DATA",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "NEW_WITHDRAWALS_REPORT_DATA",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const newWithDrawalsReportFresh = () => {
  return dispatch =>
    dispatch({
      type: "NEW_WITHDRAWALS_REPORT_DATA_FRESH",
      status: false,
    });
};
