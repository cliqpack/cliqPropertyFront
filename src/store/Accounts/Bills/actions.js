import axios from "axios";

export const addBills = (data, file, seller) => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  var url = `${process.env.REACT_APP_LOCALHOST}/bills`;

  let formData = new FormData();
  formData.append("file", file);
  formData.append("uploaded", data.uploaded || "");
  formData.append("billing_date", data.billsDate || "");
  formData.append("supplier_contact_id", data.supplier || "");
  formData.append("bill_account_id", data.account || "");
  formData.append("priority", data.priority || "");
  formData.append("details", data.details || "");
  formData.append("property_id", data.property_Id || "");
  formData.append("invoice_ref", data.invoiceReference || "");
  formData.append("amount", data.amount || "");
  formData.append("include_tax", data.taxCheck || "");
  formData.append("maintenance_id", data.jobOrReminder || "");
  formData.append("supplier_details_id", data.supplier_folio_id || "");
  formData.append("owner_folio_id", data.owner_folio_id || "");
  formData.append("seller_id", seller?.value || "");

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
          type: "ADD_BILLS",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "ADD_BILLS",
          payload: error,
          status: "Failed",
        });
      });
  };
};
export const addBillsFresh = () => {
  return dispatch =>
    dispatch({
      type: "ADD_BILLS_FRESH",
      status: false,
    });
};
export const editBills = (id, data, file) => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  var url = `${process.env.REACT_APP_LOCALHOST}/update-bill/${id}`;

  let formData = new FormData();
  formData.append("file", file);
  formData.append("billing_date", data.billsDate);
  formData.append("supplier_contact_id", data.supplier || null);
  formData.append("bill_account_id", data.account || null);
  formData.append("priority", data.priority || null);
  formData.append("details", data.details || null);
  formData.append("property_id", data.property_Id || null);
  formData.append("invoice_ref", data.invoiceReference || null);
  formData.append("amount", data.amount || null);
  formData.append("include_tax", data.taxCheck || null);
  formData.append("maintenance_id", data.jobOrReminder || null);
  formData.append("supplier_details_id", data.supplier_details_id || "");
  formData.append("owner_folio_id", data.owner_folio_id || "");

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
          type: "EDIT_BILLS",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "EDIT_BILLS",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const editBillsFresh = () => {
  return dispatch =>
    dispatch({
      type: "EDIT_BILLS_FRESH",
      status: false,
    });
};

export const addBillsWithTenantInvoice = (data, file, fromBill = "") => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  var url = `${process.env.REACT_APP_LOCALHOST}/account-invoice-bill`;
  let formData = new FormData();
  formData.append("file", file ? file : "");
  formData.append(
    "invoice_billing_date",
    data.invoiceDate ? data.invoiceDate : ""
  );
  formData.append(
    "chart_of_account_id",
    data.invoiceChart ? data.invoiceChart : ""
  );
  formData.append("details", data.invoiceDetails ? data.invoiceDetails : "");
  formData.append("property_id", data.property_Id ? data.property_Id : "");
  formData.append(
    "amount",
    data.totalInvoiceAmount ? data.totalInvoiceAmount : ""
  );
  formData.append(
    "include_tax",
    data.taxCheckInvoice ? data.taxCheckInvoice : ""
  );
  formData.append("tenant_contact_id", data.tenancy ? data.tenancy : "");
  formData.append("supplier_contact_id", data.supplier ? data.supplier : "");
  formData.append("uploaded", data.uploaded ? data.uploaded : "");
  formData.append(
    "allocatedAmount",
    data.allocatedAmount ? data.allocatedAmount : ""
  );
  formData.append(
    "owner_folio_id",
    data.owner_folio_id ? data.owner_folio_id : ""
  );
  formData.append(
    "supplier_folio_id",
    data.supplier_folio_id ? data.supplier_folio_id : ""
  );
  formData.append(
    "tenant_folio_id",
    data.tenant_folio_id ? data.tenant_folio_id : ""
  );
  formData.append("fromBill", fromBill ? fromBill : "");

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
          type: "ADD_BILLS_TENANT_INVOICE",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "ADD_BILLS_TENANT_INVOICE",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const addBillsWithTenantInvoiceFresh = () => {
  return dispatch =>
    dispatch({
      type: "ADD_BILLS_TENANT_INVOICE_FRESH",
      status: false,
    });
};

export const uploadBillsList = () => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));

  var url = `${process.env.REACT_APP_LOCALHOST}/get-uploaded-bill-list`;
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
          type: "UPLOAD_BILLS_LIST",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "UPLOAD_BILLS_LIST",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const uploadBillsListFresh = () => {
  return dispatch =>
    dispatch({
      type: "UPLOAD_BILLS_LIST_FRESH",
      status: false,
    });
};

export const billApprovalList = () => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));

  var url = `${process.env.REACT_APP_LOCALHOST}/get-approval-bill-list`;
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
          type: "APPROVAL_BILLS_LIST",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "APPROVAL_BILLS_LIST",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const billApprovalListFresh = () => {
  return dispatch =>
    dispatch({
      type: "APPROVAL_BILLS_LIST_FRESH",
      status: false,
    });
};

export const accountsList = () => {
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
          type: "ACCOUNTS_LIST",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "ACCOUNTS_LIST",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const accountsListFresh = () => {
  return dispatch =>
    dispatch({
      type: "ACCOUNTS_LIST_FRESH",
      status: false,
    });
};
export const billAccountsList = () => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));

  var url = `${process.env.REACT_APP_LOCALHOST}/bill-acc-list`;
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
          type: "BILL_ACCOUNTS_LIST",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "BILL_ACCOUNTS_LIST",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const billAccountsListFresh = () => {
  return dispatch =>
    dispatch({
      type: "BILL_ACCOUNTS_LIST_FRESH",
      status: false,
    });
};

export const accounts = () => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));

  var url = `${process.env.REACT_APP_LOCALHOST}/accounts`;
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
          type: "ACCOUNTS",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "ACCOUNTS",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const accountsFresh = () => {
  return dispatch =>
    dispatch({
      type: "ACCOUNTS_FRESH",
      status: false,
    });
};

export const supplierList = () => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));

  var url = `${process.env.REACT_APP_LOCALHOST}/supplier/contact/list`;
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
          type: "SUPPLIER_LIST",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "SUPPLIER_LIST",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const supplierListFresh = () => {
  return dispatch =>
    dispatch({
      type: "SUPPLIER_LIST_FRESH",
      status: false,
    });
};

export const folioList = () => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));

  var url = `${process.env.REACT_APP_LOCALHOST}/contacts`;
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
          type: "FOLIO_LIST",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "FOLIO_LIST",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const folioListFresh = () => {
  return dispatch =>
    dispatch({
      type: "FOLIO_LIST_FRESH",
      status: false,
    });
};

export const jobList = (property_id, supplier_id) => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));

  var url = `${process.env.REACT_APP_LOCALHOST}/get-job-list/${property_id}/${supplier_id}`;
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
          type: "JOB_LIST",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "JOB_LIST",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const jobListFresh = () => {
  return dispatch =>
    dispatch({
      type: "JOB_LIST_FRESH",
      status: false,
    });
};

export const invoiceChartList = () => {
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
          type: "INVOICE_CHART_LIST",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "INVOICE_CHART_LIST",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const invoiceChartListFresh = () => {
  return dispatch =>
    dispatch({
      type: "INVOICE_CHART_LIST_FRESH",
      status: false,
    });
};

export const tenancyList = property_id => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));

  var url = `${process.env.REACT_APP_LOCALHOST}/get-property-tenant/${property_id}`;
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
          type: "TENANCY_LIST",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "TENANCY_LIST",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const tenancyListFresh = () => {
  return dispatch =>
    dispatch({
      type: "TENANCY_LIST_FRESH",
      status: false,
    });
};

export const allBillsListDue = () => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));

  var url = `${process.env.REACT_APP_LOCALHOST}/bills`;
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
          type: "BILLS_LIST",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "BILLS_LIST",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const allBillsListDueFresh = () => {
  return dispatch =>
    dispatch({
      type: "BILLS_LIST_FRESH",
      status: false,
    });
};

export const allBillsListFuture = () => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));

  var url = `${process.env.REACT_APP_LOCALHOST}/get-future-bill-list`;
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
          type: "BILLS_LIST_FUTURE",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "BILLS_LIST_FUTURE",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const allBillsListFutureFresh = () => {
  return dispatch =>
    dispatch({
      type: "BILLS_LIST_FUTURE_FRESH",
      status: false,
    });
};

export const allBillsListPaid = () => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));

  var url = `${process.env.REACT_APP_LOCALHOST}/get-paid-bill-list`;
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
          type: "BILLS_LIST_PAID",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "BILLS_LIST_PAID",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const allBillsListPaidFresh = () => {
  return dispatch =>
    dispatch({
      type: "BILLS_LIST_PAID_FRESH",
      status: false,
    });
};

export const editBillDataShow = id => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));

  var url = `${process.env.REACT_APP_LOCALHOST}/api/bills/edit/${id}`;
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
          type: "EDIT_BILL_DATA",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "EDIT_BILL_DATA",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const editBillDataShowFresh = () => {
  return dispatch =>
    dispatch({
      type: "EDIT_BILL_DATA_FRESH",
      status: false,
    });
};

export const payBill = (id) => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));

  var url = `${process.env.REACT_APP_LOCALHOST}/pay-bill/${id}`;

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
          type: "PAY_BILL",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "PAY_BILL",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const payBillFresh = () => {
  return dispatch =>
    dispatch({
      type: "PAY_BILL_FRESH",
      status: false,
    });
};

export const payBillFromList = data => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));

  var url = `${process.env.REACT_APP_LOCALHOST}/selected-bill-pay`;
  return dispatch => {
    const headers = {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",

      Authorization: "Bearer " + authUser.token,
    };
    const formData = {
      payBill: data,
    };
    axios
      .post(url, formData, { headers: headers })
      .then(response => {
        dispatch({
          type: "PAY_BILL_LIST",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "PAY_BILL_LIST",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const payBillFromListFresh = () => {
  return dispatch =>
    dispatch({
      type: "PAY_BILL_LIST_FRESH",
      status: false,
    });
};

export const approveBill = id => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));

  var url = `${process.env.REACT_APP_LOCALHOST}/approve-bill/${id}`;

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
          type: "APPROVE_BILL",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "APPROVE_BILL",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const approveBillFresh = () => {
  return dispatch =>
    dispatch({
      type: "APPROVE_BILL_FRESH",
      status: false,
    });
};

export const approveMultipleBill = data => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));

  var url = `${process.env.REACT_APP_LOCALHOST}/approve-multiple-bill`;

  return dispatch => {
    const headers = {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",

      Authorization: "Bearer " + authUser.token,
    };

    axios
      .post(url, { data }, { headers: headers })
      .then(response => {
        dispatch({
          type: "APPROVE_MULTIPLE_BILL",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "APPROVE_MULTIPLE_BILL",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const approveMultipleBillFresh = () => {
  return dispatch =>
    dispatch({
      type: "APPROVE_MULTIPLE_BILL_FRESH",
      status: false,
    });
};

export const deleteBill = id => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));

  var url = `${process.env.REACT_APP_LOCALHOST}/bills/${id}`;

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
          type: "DELETE_BILL",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "DELETE_BILL",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const deleteBillFresh = () => {
  return dispatch =>
    dispatch({
      type: "DELETE_BILL_FRESH",
      status: false,
    });
};

export const deleteBillAction = state => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));

  var url = `${process.env.REACT_APP_LOCALHOST}/delete-multiple-bill`;

  const formData = {
    deleteBill: state,
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
          type: "DELETE_BILL_ACTION",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "DELETE_BILL_ACTION",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const deleteBillActionFresh = () => {
  return dispatch =>
    dispatch({
      type: "DELETE_BILL_ACTION_FRESH",
      status: false,
    });
};
