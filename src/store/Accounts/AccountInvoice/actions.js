import axios from "axios";

export const invoiceDueList = () => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));

  var url = `${process.env.REACT_APP_LOCALHOST}/account-invoice-bill`;
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
          type: "INVOICE_LIST",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "INVOICE_LIST",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const futureInvoiceBillList = () => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));

  var url = `${process.env.REACT_APP_LOCALHOST}/get-future-invoice-list`;
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
          type: "FUTURE_INVOICE_LIST",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "FUTURE_INVOICE_LIST",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const paidInvoiceBillList = () => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));

  var url = `${process.env.REACT_APP_LOCALHOST}/get-paid-invoice-list`;

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
          type: "PAID_INVOICE_LIST",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "PAID_INVOICE_LIST",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const uploadedInvoiceBillList = () => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));

  var url = `${process.env.REACT_APP_LOCALHOST}/get-uploaded-invoice-list`;

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
          type: "UPLOADED_INVOICE_LIST",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "UPLOADED_INVOICE_LIST",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const invoiceTenant = () => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));

  var url = `${process.env.REACT_APP_LOCALHOST}/account-invoice-bill`;
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
          type: "INVOICE_TENANT",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "INVOICE_TENANT",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const editBillsWithTenantInvoice = (data, file, id) => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  var url = `${process.env.REACT_APP_LOCALHOST}/update-invoice/${id}`;

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
  formData.append("owner_folio_id", data.owner_folio_id ? data.owner_folio_id : "");
  formData.append("supplier_folio_id", data.supplier_folio_id ? data.supplier_folio_id : "");
  formData.append("tenant_folio_id", data.tenant_folio_id ? data.tenant_folio_id : "");
  formData.append("allocatedAmount", data.allocatedAmount ? data.allocatedAmount : "");
  formData.append("remainingAllocatedAmount", data.remainingAllocatedAmount ? data.remainingAllocatedAmount : "");

  console.log(data, file, id);

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
          type: "EDIT_BILLS_TENANT_INVOICE",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "EDIT_BILLS_TENANT_INVOICE",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const editBillsWithTenantInvoiceFresh = () => {
  return dispatch =>
    dispatch({
      type: "EDIT_BILLS_TENANT_INVOICE_FRESH",
      status: false,
    });
};

export const deleteInvoice = id => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  var url = `${process.env.REACT_APP_LOCALHOST}/account-invoice-bill/${id}`;

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
          type: "DELETE_INVOICE",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "DELETE_INVOICE",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const deleteInvoiceFresh = () => {
  return dispatch =>
    dispatch({
      type: "DELETE_INVOICE_FRESH",
      status: false,
    });
};

export const deleteInvoices = ids => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  var url = `${process.env.REACT_APP_LOCALHOST}/delete-invoices`;

  return dispatch => {
    const formData = {
      invoices: ids,
    };
    const headers = {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",

      Authorization: "Bearer " + authUser.token,
    };

    axios
      .post(url, formData, { headers: headers })
      .then(response => {
        dispatch({
          type: "DELETE_INVOICES",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "DELETE_INVOICES",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const deleteInvoicesFresh = () => {
  return dispatch =>
    dispatch({
      type: "DELETE_INVOICES_FRESH",
      status: false,
    });
};
