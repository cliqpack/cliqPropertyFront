import axios from "axios";

export const companyDataForPortfolio = () => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));

  var url = `${process.env.REACT_APP_LOCALHOST}/company_setting`;
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
          type: "COMPANY_DATA",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "COMPANY_DATA",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const companyDataForPortfolioEdit = state => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  const newUrl = `${process.env.REACT_APP_LOCALHOST}`;
  var url = `${newUrl}/company_setting`;

  const formData = {
    portfolio_name: state.portfolio_name,
    country_id: state.selectedCountry.value,
    region_id: state.selectedRegion.value,
    licence_number: state.licence_number,
    include_property_key_number: state.include_property_key_number,
    update_inspection_date: state.update_inspection_date,
    client_access: state.client_access,
    client_access_url: state.client_access_url,
    portfolio_id: state.portfolio_id,
    // working_hours:state.,
    rental_position_on_receipts: state.rental_position_on_receipts,
    show_effective_paid_to_dates: state.show_effective_paid_to_dates,
    include_paid_bills: state.include_paid_bills,
    bill_approval: state.bill_approval,
    join_the_test_program: state.join_the_test_program,
  };

  console.log(formData);
  // return

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
          type: "COMPANY_DATA_EDIT",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "COMPANY_DATA_EDIT",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const companyDataForPortfolioEditFresh = () => {
  return dispatch =>
    dispatch({
      type: "COMPANY_DATA_EDIT_FRESH",
      status: false,
    });
};

export const portfolioFeeAdd = (state, state2) => {
  console.log(state, state2);
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  const newUrl = `${process.env.REACT_APP_LOCALHOST}`;
  var url = `${newUrl}/`;

  const formData = {};

  console.log(formData);

  return dispatch => {
    const headers = {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",

      Authorization: "Bearer " + authUser.token,
    };
    // axios
    //   .post(url, formData, { headers: headers })
    //   .then(response => {
    //     dispatch({
    //       type: "FEE_ADD",
    //       payload: response.data,
    //       status: "Success",
    //     });
    //   })
    //   .catch(error => {
    //     dispatch({
    //       type: "FEE_ADD",
    //       payload: error,
    //       status: "Failed",
    //     });
    //   });
  };
};

export const portfolioFeeAddFresh = () => {
  return dispatch =>
    dispatch({
      type: "FEE_ADD_FRESH",
      status: false,
    });
};

export const accountsListForSettings = () => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));

  var url = `${process.env.REACT_APP_LOCALHOST}/inv-acc-list`;
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
          type: "SETTINGS_ACCOUNTS_LIST",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "SETTINGS_ACCOUNTS_LIST",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const accountsListForSettingsFresh = () => {
  return dispatch =>
    dispatch({
      type: "SETTINGS_ACCOUNTS_LIST_FRESH",
      status: false,
    });
};

export const portfolioFeeGet = () => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  const newUrl = `${process.env.REACT_APP_LOCALHOST}`;
  var url = `${newUrl}/`;

  const formData = {};

  console.log(formData);

  return dispatch => {
    const headers = {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",

      Authorization: "Bearer " + authUser.token,
    };
    axios
      .get(url, formData, { headers: headers })
      .then(response => {
        dispatch({
          type: "FEE_GET",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "FEE_GET",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const portfolioFeeGetFresh = () => {
  return dispatch =>
    dispatch({
      type: "FEE_GET_FRESH",
      status: false,
    });
};

export const companyDataForPortfolioCountry = () => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));

  var url = `${process.env.REACT_APP_LOCALHOST}/company/setting/country`;
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
          type: "COMPANY_DATA_COUNTRY",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "COMPANY_DATA_COUNTRY",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const companyDataForPortfolioRegion = () => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));

  var url = `${process.env.REACT_APP_LOCALHOST}/company/setting/region`;
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
          type: "COMPANY_DATA_REGION",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "COMPANY_DATA_REGION",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const companyDataForPortfolioBankingEdit = state => {
  // console.log({ ...state });
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  const newUrl = `${process.env.REACT_APP_LOCALHOST}`;
  var url = `${newUrl}/banking/setting`;

  const formData = {
    account_name: state.account_name,
    bsb: state.bsb,
    account_number: state.account_number,
    unique_identifying_number: state.unique_identifying_number,
    bank_id: state.selectedBank.value,
    // unique_identifying_number: state.unique_identifying_number,
    eft_payments_enable: state.eft_payments_enable,
    default_statement_description: state.default_statement_description,
    statement_description_as_property_reference:
      state.statement_description_as_property_reference,
    statement_description_as_property_reference:
      state.statement_description_as_property_reference,
    de_user_id: state.de_user_id,
    file_format_id: state.selectedFileFormat.value,
    tenant_direct_debitenable_enable: state.tenant_direct_debitenable_enable,
    change_to_days_to_clear: state.change_to_days_to_clear,
    bpay_enable: state.bpay_enable,
    customer_id: state.customer_id,
    customer_name: state.customer_name,
    bpay_for: state.bpay_for,
  };

  // console.log(formData);

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
          type: "BANKING_DATA_EDIT",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "BANKING_DATA_EDIT",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const companyDataForPortfolioBankingEditFresh = () => {
  return dispatch =>
    dispatch({
      type: "BANKING_DATA_EDIT_FRESH",
      status: false,
    });
};

export const companyDataForPortfolioBanking = () => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));

  var url = `${process.env.REACT_APP_LOCALHOST}/banking/setting`;
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
          type: "BANKING_DATA",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "BANKING_DATA",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const companyDataForPortfolioBankingFresh = () => {
  return dispatch =>
    dispatch({
      type: "BANKING_DATA_FRESH",
      status: false,
    });
};

export const bankingBankData = () => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));

  var url = `${process.env.REACT_APP_LOCALHOST}/banking/setting/bank/name`;
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
          type: "BANKING_BANK_DATA",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "BANKING_BANK_DATA",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const bankingFileData = () => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));

  var url = `${process.env.REACT_APP_LOCALHOST}/banking/setting/fileFormat`;
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
          type: "BANKING_FILE_DATA",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "BANKING_FILE_DATA",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const companyDataForPortfolioLabel = () => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));

  var url = `${process.env.REACT_APP_LOCALHOST}/label/setting`;
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
          type: "LABEL_DATA",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "LABEL_DATA",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const companyDataForPortfolioLabelsAdd = state => {
  console.log({ ...state });
  // return
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  const newUrl = `${process.env.REACT_APP_LOCALHOST}`;
  var url = `${newUrl}/label/setting`;

  const formData = {
    label_name: state.label_name,
    preview: state.preview,
    type: state.propertyBtn ? 'Property' : state.contactBtn ? 'Contact' : state.jobBtn ? 'Job' : state.inspectBtn ? 'Inspection' : state.taskBtn ? 'Task' : '',
    priority: state.impBtn ? 'Important' : 'Info',
    preview: 1,
  };

  console.log(formData);
  // return;

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
          type: "LABEL_ADD",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "LABEL_ADD",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const companyDataForPortfolioLabelsAddFresh = () => {
  return dispatch =>
    dispatch({
      type: "LABEL_ADD_FRESH",
      status: false,
    });
};

export const companyDataForPortfolioLabelsEdit = state => {
  console.log({ ...state });
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  const newUrl = `${process.env.REACT_APP_LOCALHOST}`;
  var url = `${newUrl}/label/setting/${state.id}`;

  const formData = {
    label_name: state.label_name,
    preview: state.preview,
    type: state.propertyBtn ? 'Property' : state.contactBtn ? 'Contact' : state.jobBtn ? 'Job' : state.inspectBtn ? 'Inspection' : state.taskBtn ? 'Task' : '',
    priority: state.impBtn ? 'Important' : 'Info',
    preview: 1,
  };

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
          type: "LABEL_EDIT",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "LABEL_EDIT",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const companyDataForPortfolioLabelsEditFresh = () => {
  return dispatch =>
    dispatch({
      type: "LABEL_EDIT_FRESH",
      status: false,
    });
};

export const addChartOfAccounts = state => {
  console.log({ ...state });
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  const newUrl = `${process.env.REACT_APP_LOCALHOST}`;
  var url = `${newUrl}/account/setting`;

  const formData = {
    account_number: state.account_number,
    account_name: state.account_name,
    description: state.description,
    type: state.type,
    tax: state.tax,
    hidden: state.hidden,
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
          type: "ADD_CHART_OF_ACCOUNTS",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "ADD_CHART_OF_ACCOUNTS",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const addChartOfAccountsFresh = () => {
  return dispatch =>
    dispatch({
      type: "ADD_CHART_OF_ACCOUNTS_FRESH",
      status: false,
    });
};

export const getChartOfAccounts = state => {
  console.log({ ...state });
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  const newUrl = `${process.env.REACT_APP_LOCALHOST}`;
  var url = `${newUrl}/account/setting`;

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
          type: "GET_CHART_OF_ACCOUNTS",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "GET_CHART_OF_ACCOUNTS",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const editChartOfAccounts = state => {
  console.log({ ...state });
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  const newUrl = `${process.env.REACT_APP_LOCALHOST}`;
  var url = `${newUrl}/account/setting/${state.id}`;

  const formData = {
    account_number: state.account_number,
    account_name: state.account_name,
    description: state.description,
    type: state.type,
    tax: state.tax,
    hidden: state.hidden,
  };

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
          type: "EDIT_CHART_OF_ACCOUNTS",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "EDIT_CHART_OF_ACCOUNTS",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const editChartOfAccountsFresh = () => {
  return dispatch =>
    dispatch({
      type: "EDIT_CHART_OF_ACCOUNTS_FRESH",
      status: false,
    });
};

export const removeChartsOfAcc = data => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  var url = `${process.env.REACT_APP_LOCALHOST}/account/setting/destroy`;
  const formData = {
    id: data,
    // removed_reason: state.reason,
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
          type: "RMV_CHARTOFACCOUNTS",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "RMV_CHARTOFACCOUNTS",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const removeChartsOfAccFresh = () => {
  return dispatch =>
    dispatch({
      type: "RMV_CHARTOFACCOUNTS_FRESH",
      status: false,
    });
};

export const removeLabels = data => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  var url = `${process.env.REACT_APP_LOCALHOST}/label/setting/delete`;
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
      .post(url, formData, { headers: headers })
      .then(response => {
        dispatch({
          type: "RMV_LABEL",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "RMV_LABEL",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const removeLabelsFresh = () => {
  return dispatch =>
    dispatch({
      type: "RMV_LABEL_FRESH",
      status: false,
    });
};


export const addWorkingHours = (id, data) => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  var url = `${process.env.REACT_APP_LOCALHOST}/company/setting/working/hour`;
  const formData = {
    data: data,
    company_settings_id: id

  };
  console.log(formData);
  // return;
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
          type: "ADD_WORKING_HOURS",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "ADD_WORKING_HOURS",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const addWorkingHoursFresh = () => {
  return dispatch =>
    dispatch({
      type: "ADD_WORKING_HOURS_FRESH",
      status: false,
    });
};

export const getWorkingHours = () => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));

  var url = `${process.env.REACT_APP_LOCALHOST}/company/setting/working/hour`;
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
          type: "WORKING_HOURS",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "WORKING_HOURS",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const getWorkingHoursFresh = () => {
  return dispatch =>
    dispatch({
      type: "WORKING_HOURS_FRESH",
      status: false,
    });
};

export const toggleLoading = () => {
  return dispatch =>
    dispatch({
      type: "TOGGLE_LOADING",
      status: true,
    });
};

export const addInvoicePaymentsModal = data => {
  const value = data.replace(/&nbsp;/g, '');
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  var url = `${process.env.REACT_APP_LOCALHOST}/company/setting/invoice/payment/instructions`;
  const formData = {
    payment_instructions: value,
  };
  console.log(formData);
  // return;
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
          type: "ADD_INVOICE_PAYMENTS_MODAL",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "ADD_INVOICE_PAYMENTS_MODAL",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const addInvoicePaymentsModalFresh = () => {
  return dispatch =>
    dispatch({
      type: "ADD_INVOICE_PAYMENTS_MODAL_FRESH",
      status: false,
    });
};

export const getInvoicePaymentsModal = () => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));

  var url = `${process.env.REACT_APP_LOCALHOST}/`;
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
          type: "INVOICE_PAYMENTS_MODAL",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "INVOICE_PAYMENTS_MODAL",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const addInspectionReportModal = (data, data1) => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  var url = `${process.env.REACT_APP_LOCALHOST}/company/setting/disclaimer`;
  const formData = {
    entry_exit_inspection_reports: data.replace(/&nbsp;/g, ''),
    routine_inspection_reports: data1.replace(/&nbsp;/g, ''),
  };
  console.log(formData);
  // return
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
          type: "ADD_INSPECTION_REPORT_MODAL",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "ADD_INSPECTION_REPORT_MODAL",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const addInspectionReportModalFresh = () => {
  return dispatch =>
    dispatch({
      type: "ADD_INSPECTION_REPORT_MODAL_FRESH",
      status: false,
    });
};

export const getInspectionReportModal = () => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));

  var url = `${process.env.REACT_APP_LOCALHOST}/`;
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
          type: "INSPECTION_REPORT_MODAL",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "INSPECTION_REPORT_MODAL",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const addReason = (data) => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  var url = `${process.env.REACT_APP_LOCALHOST}/reason/setting`;
  const formData = {
    reason: data.description,
    // gainBtn: data.gainBtn,
    // lostBtn: data.lostBtn,
    type: data.gainBtn ? 'Gain' : 'Lost'
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
          type: "ADD_REASON",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "ADD_REASON",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const addReasonFresh = () => {
  return dispatch =>
    dispatch({
      type: "ADD_REASON_FRESH",
      status: false,
    });
};

export const editReason = (data, id) => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  var url = `${process.env.REACT_APP_LOCALHOST}/reason/setting/${id}`;
  const formData = {
    reason: data.description,
    // gainBtn: data.gainBtn,
    // lostBtn: data.lostBtn,
    type: data.gainBtn ? 'Gain' : 'Lost'
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
          type: "EDIT_REASON",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "EDIT_REASON",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const editReasonFresh = () => {
  return dispatch =>
    dispatch({
      type: "EDIT_REASON_FRESH",
      status: false,
    });
};


export const getReasons = () => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));

  var url = `${process.env.REACT_APP_LOCALHOST}/reason/setting`;
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
          type: "REASONS",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "REASONS",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const removeReason = (data) => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  var url = `${process.env.REACT_APP_LOCALHOST}/reason/setting/delete`;
  const formData = {
    id: data
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
          type: "REMOVE_REASON",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "REMOVE_REASON",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const reomveReasonFresh = () => {
  return dispatch =>
    dispatch({
      type: "REMOVE_REASON_FRESH",
      status: false,
    });
};

export const addReminder = (data, data2) => {
  console.log(data, data2);
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  var url = `${process.env.REACT_APP_LOCALHOST}/reminder/setting`;
  const formData = {
    status: data.activeBtn,
    // monthsBtn: data.monthsBtn,
    // weekBtn: data.weekBtn,
    frequency_type: data.frequency_type,
    // propertyBtn: data.propertyBtn,
    // supplierBtn: data.supplierBtn,
    // ownerBtn: data.ownerBtn,
    default_contact: data.default_contact,
    default_frequency: data.frequency,
    name: data.name,
    supplier: data2.selectedSupplier && data2.selectedSupplier.value,
    // id: data2.selectedSupplier && data2.selectedSupplier.value,
    system_template: null

  };
  console.log(formData);
  // return;

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
          type: "ADD_REMINDER",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "ADD_REMINDER",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const addReminderFresh = () => {
  return dispatch =>
    dispatch({
      type: "ADD_REMINDER_FRESH",
      status: false,
    });
};

export const getReminder = () => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));

  var url = `${process.env.REACT_APP_LOCALHOST}/reminder/setting`;
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
          type: "REMINDERS",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "REMINDERS",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const editReminder = (data, data2, id) => {
  console.log(data, data2, id);
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  var url = `${process.env.REACT_APP_LOCALHOST}/reminder/setting/${id}`;
  const formData = {
    status: data.activeBtn,
    // monthsBtn: data.monthsBtn,
    // weekBtn: data.weekBtn,
    frequency_type: data.frequency_type,
    // propertyBtn: data.propertyBtn,
    // supplierBtn: data.supplierBtn,
    // ownerBtn: data.ownerBtn,
    default_contact: data.default_contact,
    default_frequency: data.frequency,
    name: data.name,
    supplier: data2.selectedSupplier && data2.selectedSupplier.value,
    // id: data2.selectedSupplier && data2.selectedSupplier.value,
    system_template: null

  };
  console.log(formData);
  // return;

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
          type: "EDIT_REMINDER",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "EDIT_REMINDER",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const editReminderFresh = () => {
  return dispatch =>
    dispatch({
      type: "EDIT_REMINDER_FRESH",
      status: false,
    });
};

export const addReminderImage = (file, id) => {
  console.log(file, id);
  console.log();
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  // console.log(data);
  const newUrl = process.env.REACT_APP_LOCALHOST;
  var url = newUrl + "/reminder/doc/attach";
  // var url = newUrl + "/uploadInspectionMaintenanceTaskDocMultiple";
  const headers = {
    "Content-Type": "application/json",

    "Access-Control-Allow-Origin": "*",

    Authorization: "Bearer " + authUser.token,
  };

  // const formData = {
  //   brand_image: data
  // }
  let formData = new FormData();
  for (let i = 0; i < file.length; i++) {
    formData.append("image[]", file[i]);
  }
  formData.append("reminder_properties_id", id);


  console.log(formData);
  // return;
  return dispatch => {
    axios
      .post(url, formData, { headers: headers })
      .then(response => {
        console.log(response);
        dispatch({
          type: "REMINDER_IMAGE_ADD",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "REMINDER_IMAGE_ADD",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const addReminderImageFresh = () => {
  return dispatch =>
    dispatch({
      type: "REMINDER_IMAGE_ADD_FRESH",
      status: false,
    });
};

export const addReminderProperty = (data, data2, id) => {
  console.log(data, data2, id);
  // return;
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  var url = `${process.env.REACT_APP_LOCALHOST}/property/reminder`;
  const formData = {
    property_id: data2.selectedProperty && data2.selectedProperty.value || id,
    reminder_setting_id: data2.selectedReminder && data2.selectedReminder.value,

    frequency_type: data.frequency_type,

    contact: data.default_contact,
    frequency: data.frequency,
    name: data2.selectedReminder && data2.selectedReminder.label,
    supplier: data2.selectedSupplier && data2.selectedSupplier.value,
    system_template: null,
    notes: data.notes,
    certificate_expiry: data.certificate_expiry,
    due: data.due,


  };
  console.log(formData);
  // return;

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
          type: "ADD_REMINDER_PROPERTY",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "ADD_REMINDER_PROPERTY",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const addReminderPropertyFresh = () => {
  return dispatch =>
    dispatch({
      type: "ADD_REMINDER_PROPERTY_FRESH",
      status: false,
    });
};

export const getReminderProperty = () => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));

  var url = `${process.env.REACT_APP_LOCALHOST}/properties/reminder/name`;
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
          type: "REMINDERS_PROPERTY",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "REMINDERS_PROPERTY",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const getAllReminderProperty = () => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));

  var url = `${process.env.REACT_APP_LOCALHOST}/property/reminder`;
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
          type: "ALL_REMINDERS_PROPERTY",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "ALL_REMINDERS_PROPERTY",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const getPropertyReminder = (id) => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));

  var url = `${process.env.REACT_APP_LOCALHOST}/onlyPropertyReminder/${id}`;
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
          type: "GET_REMINDERS_PROPERTY",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "GET_REMINDERS_PROPERTY",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const editReminderProperty = (data, data2, p_id, id, file) => {
  console.log(data, data2, id);
  // return;
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  var url = `${process.env.REACT_APP_LOCALHOST}/property/reminder/update/${id}`;
  let formData = new FormData();
  for (let i = 0; i < file?.length; i++) {
    formData.append("image[]", file[i]);
  }
  formData.append("property_id", p_id);
  formData.append("reminder_setting_id", data2.selectedReminder && data2.selectedReminder.value);
  formData.append("frequency_type", data.frequency_type);
  formData.append("name", data2.selectedReminder && data2.selectedReminder.label);
  formData.append("supplier", data2.selectedSupplier && data2.selectedSupplier.value || null);
  formData.append("certificate_expiry", data.certificate_expiry);
  formData.append("notes", data.notes);
  formData.append("due", data.due);
  formData.append("contact", data.default_contact);
  formData.append("frequency", data.frequency);
  formData.append("status", data.status);

  // const formData = {
  //   property_id: id,
  //   reminder_setting_id: data2.selectedReminder && data2.selectedReminder.value,

  //   frequency_type: data.frequency_type,

  //   contact: data.default_contact,
  //   frequency: data.frequency,
  //   name: data2.selectedReminder && data2.selectedReminder.label,
  //   supplier: data2.selectedSupplier && data2.selectedSupplier.value,
  //   system_template: null,
  //   notes: data.notes,
  //   certificate_expiry: data.certificate_expiry,
  //   due: data.due,


  // };


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
          type: "EDIT_REMINDER_PROPERTY",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "EDIT_REMINDER_PROPERTY",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const editReminderPropertyFresh = () => {
  return dispatch =>
    dispatch({
      type: "EDIT_REMINDER_PROPERTY_FRESH",
      status: false,
    });
};

export const deletePropertyReminder = data => {
  console.log(data);
  const dataId = data.map((item) => item.id)
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  const newUrl = process.env.REACT_APP_LOCALHOST;
  var url = newUrl + "/property/reminder/delete";

  return dispatch => {
    const headers = {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",

      Authorization: "Bearer " + authUser.token,
    };

    // let data = {
    //   id: Math.random(),
    //   from: "himelhimu6@gmail.com",
    //   to: state.email,
    //   body: state.body,
    // };

    const formData = {
      id: dataId,
    };
    console.log(formData);
    // return
    axios
      .post(url, formData, { headers: headers })
      .then(response => {
        dispatch({
          type: "DELETE_PROPERTY_REMINDER",
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "DELETE_PROPERTY_REMINDER",
          status: "Failed",
        });
      });
  };
};

export const deletePropertyReminderFresh = () => {
  return dispatch =>
    dispatch({
      type: "DELETE_PROPERTY_REMINDER_FRESH",
      status: false,
    });
};

export const deleteReminder = data => {
  console.log(data);
  const dataId = data.map((item) => item.id)
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  const newUrl = process.env.REACT_APP_LOCALHOST;
  var url = newUrl + "/reminder/setting/delete";

  return dispatch => {
    const headers = {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",

      Authorization: "Bearer " + authUser.token,
    };

    // let data = {
    //   id: Math.random(),
    //   from: "himelhimu6@gmail.com",
    //   to: state.email,
    //   body: state.body,
    // };

    const formData = {
      id: dataId,
    };

    axios
      .post(url, formData, { headers: headers })
      .then(response => {
        dispatch({
          type: "DELETE_REMINDER",
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "DELETE_REMINDER",
          status: "Failed",
        });
      });
  };
};

export const deleteReminderFresh = () => {
  return dispatch =>
    dispatch({
      type: "DELETE_REMINDER_FRESH",
      status: false,
    });
}

export const getAllReminders = (data) => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));

  var url = `${process.env.REACT_APP_LOCALHOST}/taskreminder/list`;
  const formData = {
    status: data
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
          type: "ALL_REMINDERS",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "ALL_REMINDERS",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const completeReminder = (data, data2) => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  console.log(Array.isArray(data2));
  // let id;
  // if (Array.isArray(data2)) {
  //   console.log(data2);
  //   console.log('in');
  //   id: data2.map((item) => item.id);
  //   console.log(id);
  // } else {
  //   console.log(data2);
  //   id: [data2]
  // }
  // console.log(id);
  var url = `${process.env.REACT_APP_LOCALHOST}/taskreminders/complete`;
  const formData = {
    reminder_status: data,
    id: Array.isArray(data2) ? data2.map((item) => item.id) : [data2],
  };
  console.log(formData);
  // return;
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
          type: "COMPLETE_REMINDER",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "COMPLETE_REMINDER",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const completeReminderFresh = () => {
  return dispatch =>
    dispatch({
      type: "COMPLETE_REMINDER_FRESH",
      status: false,
    });
}


export const createJobReminder = (data) => {
  console.log(data);
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  var url = `${process.env.REACT_APP_LOCALHOST}/reminder/setting`;
  const formData = {
    reminder: "reminder",
    reminder_status: "active",
    due_by: data.due_by,
    summary: data.summary,
    description: data.description,
    work_order_notes: data.notes,


  };
  console.log(formData);
  // return;

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
          type: "CREATE_JOB_REMINDER",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "CREATE_JOB_REMINDER",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const createJobReminderFresh = () => {
  return dispatch =>
    dispatch({
      type: "CREATE_JOB_REMINDER_FRESH",
      status: false,
    });
}

export const getMessageTemplatesForRemindersBySelect = (data, query = null) => {
  const newData = data.map((item) => item.label)
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  let url = `${process.env.REACT_APP_LOCALHOST}/reminder/message/mail/template/filter`;
  const formData = {
    trigger_to: data,
    trigger_to2: newData,
    query: query,
  }
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
          type: "GET_MESSAGE_TEMPLATES_FOR_REMINDERS_BY_SELECT",
          payload: response,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "GET_MESSAGE_TEMPLATES_FOR_REMINDERS_BY_SELECT",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const sendMailFromTemplatesInReminders = (id, sub, reminder_id) => {
  console.log(id, sub, reminder_id);
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  var url = `${process.env.REACT_APP_LOCALHOST}/reminder/message/mail/template/activity`;
  const formData = {
    template_id: id,
    subject: sub,
    reminder_id: reminder_id.map((item) => item.id)
  };
  console.log(formData);
  // return;
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
          type: "SEND_MAIL_TO_ACTIVITY_REMINDERS",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "SEND_MAIL_TO_ACTIVITY_REMINDERS",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const sendMailFromTemplatesInRemindersFresh = () => {
  return dispatch =>
    dispatch({
      type: "SEND_MAIL_TO_ACTIVITY_REMINDERS_FRESH",
      payload: null,
      error: null,
      status: false,
    });
};

export const getBrandSettings = () => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));

  var url = `${process.env.REACT_APP_LOCALHOST}/brand/setting/statement`;
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
          type: "BRANDS_DATA",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "BRANDS_DATA",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const getBrandSettingsFresh = () => {
  return dispatch =>
    dispatch({
      type: "BRANDS_DATA_FRESH",
      payload: null,
      error: null,
      status: false,
    });
};

export const addBrandSettings = state => {
  console.log({ ...state });
  const { activeBtn, addressBtn, agencyBtn, colorRgb, colorRgb1, colorRgb2, headerBtn, height, img, leftBtn, rightBtn, brand_image } = state

  // return
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  const newUrl = `${process.env.REACT_APP_LOCALHOST}`;
  var url = `${newUrl}/brand/setting/statement`;

  const formData = {
    header_height_by_millimeter: height,
    hide_report_header: null,
    is_hard_copy: null,
    is_logo_include_address: null,
    is_logo_include_name: null,
    logo_maximum_height: null,
    logo_position: rightBtn ? 'Right' : 'Left',
    logo_width: null,
    primary_colour: colorRgb,
    print_address_next_to_logo: addressBtn,
    print_name_next_to_logo: agencyBtn,
    secondary_colour: colorRgb1,
    show_report_header: headerBtn,
    third_colour: colorRgb2,
    brand_image: brand_image
  };

  console.log(formData);
  // return;

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
          type: "ADD_BRAND",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "ADD_BRAND",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const addBrandSettingsFresh = () => {
  return dispatch =>
    dispatch({
      type: "ADD_BRAND_FRESH",
      payload: null,
      error: null,
      status: false,
    });
};

export const addBrandImage = (file) => {
  console.log(file);
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  // console.log(data);
  const newUrl = process.env.REACT_APP_LOCALHOST;
  var url = newUrl + "/brand/setting/logo";
  const headers = {
    "Content-Type": "application/json",

    "Access-Control-Allow-Origin": "*",

    Authorization: "Bearer " + authUser.token,
  };

  // const formData = {
  //   brand_image: data
  // }
  let formData = new FormData();
  // for (let i = 0; i < file.length; i++) {
  //   formData.append("brand_image[]", file[i]);
  // }
  formData.append("brand_image", file[0]);

  console.log(formData);
  // return;
  return dispatch => {
    axios
      .post(url, formData, { headers: headers })
      .then(response => {
        dispatch({
          type: "BRAND_IMAGE_ADD",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "BRAND_IMAGE_ADD",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const addBrandImageFresh = () => {
  return dispatch =>
    dispatch({
      type: "BRAND_IMAGE_ADD_FRESH",
      payload: null,
      error: null,
      status: false,
    });
};

export const removeBrandImage = data => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  var url = `${process.env.REACT_APP_LOCALHOST}/brand/setting/logo/delete`;
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
      .post(url, formData, { headers: headers })
      .then(response => {
        dispatch({
          type: "RMV_BRAND_IMAGE",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "RMV_BRAND_IMAGE",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const removeBrandImageFresh = () => {
  return dispatch =>
    dispatch({
      type: "RMV_BRAND_IMAGE_FRESH",
      payload: null,
      error: null,
      status: false,
    });
};


export const getSettingsEmailStationaryData = () => {
  return async (dispatch) => {
    try {
      const authUser = JSON.parse(localStorage.getItem("authUser"));

      const url = `${process.env.REACT_APP_LOCALHOST}/brand/setting/email`;
      const headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${authUser.token}`,
      };

      const response = await axios.get(url, { headers });

      dispatch({
        type: "SETTINGS_EMAIL_DATA_SUCCESS",
        payload: response.data,
        status: 'Success'
      });
    } catch (error) {
      dispatch({
        type: "SETTINGS_EMAIL_DATA_SUCCESS_FAILURE",
        payload: error,
        status: 'Failed'

      });
    }
  };
};


export const addEmailSettings = (state, img) => {
  // console.log({ ...state }, { ...img });
  const { rightHeaderBtn, leftHeaderBtn, middleHeaderBtn, headerImgHeight, leftHeaderTextBtn, middleHeaderTextBtn, rightHeaderTextBtn, headerBgColor, leftFooterBtn, middleFooterBtn, rightFooterBtn, HeaderText, FooterText,
    leftFooterTextBtn, middletFooterTextBtn, rightFooterTextBtn, footerImgHeight, footerBgColor, bodyColor,
    bodyBgColor, selectedFont, selectedFontSize, }
    = state  // return
  console.log({ ...img });
  // console.log(img.footerImgFile?.[0], img.footerImgFile?.image_name);
  // return

  var authUser = JSON.parse(localStorage.getItem("authUser"));
  const newUrl = `${process.env.REACT_APP_LOCALHOST}`;
  var url = `${newUrl}/brand/setting/email`;

  let formData = new FormData();
  formData.append("leftHeaderBtn", leftHeaderBtn ? 1 : 0);
  formData.append("middleHeaderBtn", middleHeaderBtn ? 1 : 0);
  formData.append("rightHeaderBtn", rightHeaderBtn ? 1 : 0);
  formData.append("headerImgHeight", headerImgHeight ? 1 : 0);
  formData.append("leftHeaderTextBtn", leftHeaderTextBtn ? 1 : 0);
  formData.append("middleHeaderTextBtn", middleHeaderTextBtn ? 1 : 0);
  formData.append("rightHeaderTextBtn", rightHeaderTextBtn ? 1 : 0);
  formData.append("headerBgColor", headerBgColor);
  formData.append("headerImageRemoved", img.headerImageRemoved);
  formData.append("footerImageRemoved", img.footerImageRemoved);
  formData.append("headerImg", img?.headerImgFile?.length > 0 ? img.headerImgFile?.[0] : img.headerImgFile);
  formData.append("footerImg", img?.footerImgFile?.length > 0 ? img.footerImgFile?.[0] : img.footerImgFile);
  formData.append("footerImgHeight", footerImgHeight);
  formData.append("leftFooterBtn", leftFooterBtn ? 1 : 0);
  formData.append("middleFooterBtn", middleFooterBtn ? 1 : 0);
  formData.append("rightFooterBtn", rightFooterBtn ? 1 : 0);
  formData.append("leftFooterTextBtn", leftFooterTextBtn ? 1 : 0);
  formData.append("middleFooterTextBtn", middletFooterTextBtn ? 1 : 0);
  formData.append("rightFooterTextBtn", rightFooterTextBtn ? 1 : 0);
  formData.append("footerBgColor", footerBgColor);
  formData.append("bodyColor", bodyColor);
  formData.append("bodyBgColor", bodyBgColor);
  formData.append("headerText", HeaderText);
  formData.append("footerText", FooterText);
  formData.append("selectedFont", selectedFont ? selectedFont.label : '');
  formData.append("selectedFontSize", selectedFontSize ? selectedFontSize.label : '');

  for (var key of formData.entries()) {
    console.log(key[0] + ", " + key[1]);
  }
  // return
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
          type: "ADD_EMAIL_SETTINGS",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "ADD_EMAIL_SETTINGS",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const addEmailSettingsFresh = () => {
  return dispatch =>
    dispatch({
      type: "ADD_EMAIL_SETTINGS_FRESH",
      payload: null,
      error: null,
      status: false,
    });
};

export const removeHeaderEmailImg = (file) => {
  console.log(file);
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  // console.log(data);
  const newUrl = process.env.REACT_APP_LOCALHOST;
  var url = newUrl + "";
  const headers = {
    "Content-Type": "application/json",

    "Access-Control-Allow-Origin": "*",

    Authorization: "Bearer " + authUser.token,
  };

  // const formData = {
  //   brand_image: data
  // }
  let formData = new FormData();
  // for (let i = 0; i < file.length; i++) {
  //   formData.append("brand_image[]", file[i]);
  // }
  formData.append("brand_image", file[0]);

  console.log(formData);
  // return;
  return dispatch => {
    axios
      .post(url, formData, { headers: headers })
      .then(response => {
        dispatch({
          type: "REMOVE_EMAIL_HEADER_IMG",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "REMOVE_EMAIL_HEADER_IMG",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const removeHeaderEmailImgFresh = () => {
  return dispatch =>
    dispatch({
      type: "REMOVE_EMAIL_HEADER_IMG_FRESH",
      payload: null,
      error: null,
      status: false,
    });
};

export const removeFooterEmailImg = (file) => {
  console.log(file);
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  // console.log(data);
  const newUrl = process.env.REACT_APP_LOCALHOST;
  var url = newUrl + "";
  const headers = {
    "Content-Type": "application/json",

    "Access-Control-Allow-Origin": "*",

    Authorization: "Bearer " + authUser.token,
  };

  // const formData = {
  //   brand_image: data
  // }
  let formData = new FormData();
  // for (let i = 0; i < file.length; i++) {
  //   formData.append("brand_image[]", file[i]);
  // }
  formData.append("brand_image", file[0]);

  console.log(formData);
  // return;
  return dispatch => {
    axios
      .post(url, formData, { headers: headers })
      .then(response => {
        dispatch({
          type: "REMOVE_EMAIL_FOOTER_IMG",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "REMOVE_EMAIL_FOOTER_IMG",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const removeFooterEmailImgFresh = () => {
  return dispatch =>
    dispatch({
      type: "REMOVE_EMAIL_FOOTER_IMG_FRESH",
      payload: null,
      error: null,
      status: false,
    });
};

export const addDepositClearanceDays = state => {

  var authUser = JSON.parse(localStorage.getItem("authUser"));
  const newUrl = `${process.env.REACT_APP_LOCALHOST}`;
  var url = `${newUrl}/banking/setting/deposit/Clearance`;

  const formData = {
    data: state
  };

  console.log(formData);
  // return;

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
          type: "ADD_DEPOSIT_CLEARANCE",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "ADD_DEPOSIT_CLEARANCE",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const addDepositClearanceDaysFresh = () => {
  return dispatch =>
    dispatch({
      type: "ADD_DEPOSIT_CLEARANCE_FRESH",
      payload: null,
      error: null,
      status: false,
    });
};

export const getDepositClearanceData = () => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));

  var url = `${process.env.REACT_APP_LOCALHOST}/banking/setting/deposit/Clearance`;
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
          type: "GET_DEPOSIT_CLEARANCE",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "GET_DEPOSIT_CLEARANCE",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const getDepositClearanceDataFresh = () => {
  return dispatch =>
    dispatch({
      type: "GET_DEPOSIT_CLEARANCE_FRESH",
      payload: null,
      error: null,
      status: false,
    });
};


export const integrationsList = () => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));

  var url = `${process.env.REACT_APP_LOCALHOST}/setting/listing/provider`;
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
          type: "INTEGRATIONS_LIST",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "INTEGRATIONS_LIST",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const providerSettingsList = () => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));

  var url = `${process.env.REACT_APP_LOCALHOST}/`;
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
          type: "PROVIDER_SETTINGS_LIST",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "PROVIDER_SETTINGS_LIST",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const providerSettingsListById = (id) => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));

  var url = `${process.env.REACT_APP_LOCALHOST}/setting/listing/provider/${id}`;

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
          type: "PROVIDER_SETTINGS_LIST_ID",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "PROVIDER_SETTINGS_LIST_ID",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const addProviderSettings = (data) => {

  console.log(data);
  // return

  var authUser = JSON.parse(localStorage.getItem("authUser"));

  var url = `${process.env.REACT_APP_LOCALHOST}/setting/listing/provider`;


  const formData = {
    is_enable: data?.activeBtn,
    name: data?.name,
    agent_id: data?.agent,
    is_available: false,
    external_provider_type: "Example Type"
  };

  console.log(formData);
  // return

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
          type: "ADD_PROVIDER_SETTINGS",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "ADD_PROVIDER_SETTINGS",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const addProviderSettingsFresh = () => {
  return dispatch =>
    dispatch({
      type: "ADD_PROVIDER_SETTINGS_FRESH",
      payload: null,
      error: null,
      status: false,
    });
};


export const addProviderSettingsListById = (data) => {

  console.log(data);
  // return

  var authUser = JSON.parse(localStorage.getItem("authUser"));

  var url = `${process.env.REACT_APP_LOCALHOST}/setting/listing/provider/${data.id}`;


  const formData = {
    is_enable: data?.activeBtn,
    name: data?.name,
    agent_id: data?.agent,
    is_available: false,
    external_provider_type: "Example Type"
  };

  console.log(formData);
  // return

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
          type: "ADD_PROVIDER_SETTINGS_LIST_ID",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "ADD_PROVIDER_SETTINGS_LIST_ID",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const addProviderSettingsListByIdFresh = () => {
  return dispatch =>
    dispatch({
      type: "ADD_PROVIDER_SETTINGS_LIST_ID_FRESH",
      payload: null,
      error: null,
      status: false,
    });
};

export const deleteSettingsProviderById = (id) => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));

  var url = `${process.env.REACT_APP_LOCALHOST}/setting/listing/provider/${id}`;

  const formData = {};

  return dispatch => {
    const headers = {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",

      Authorization: "Bearer " + authUser.token,
    };
    axios
      .delete(url, { headers: headers })
      .then(response => {
        dispatch({
          type: "DELETE_PROVIDER_SETTINGS_LIST_ID",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "DELETE_PROVIDER_SETTINGS_LIST_ID",
          payload: error,
          status: "Failed",
        });
      });
  };
};