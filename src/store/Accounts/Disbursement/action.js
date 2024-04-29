import axios from "axios";
import { head } from "store/common/ApiHeader";

export const dueDisbursementList = (
  type,
  page,
  sizePerPage,
  search = null,
  sortField = null,
  sortValue = null
) => {
  var url = `${process.env.REACT_APP_LOCALHOST}/newdisbursement/${type}?page=${page}&sizePerPage=${sizePerPage}&q=${search}&sortField=${sortField}&sortValue=${sortValue}`;
  const headers = head();
  return dispatch => {
    axios
      .get(url, { headers })
      .then(response => {
        dispatch({
          type: "DUE_DISBURSEMENT_LIST",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "DUE_DISBURSEMENT_LIST",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const dueDisbursementListFresh = () => {
  return dispatch => {
    dispatch({
      type: "DUE_DISBURSEMENT_LIST_FRESH",
      payload: null,
      status: false,
    });
  };
};

export const previewDisbursement = row => {
  var url = `${process.env.REACT_APP_LOCALHOST}/disburse/preview`;
  const headers = head();
  return dispatch => {
    const formData = {
      disburse: [row],
    };
    axios({
      method: "post",
      responseType: "blob",
      url,
      headers,
      data: formData,
    })
      .then(response => {
        dispatch({
          type: "DISBURSEMENT_PREVIEW",
          payload: response.data,
          status: "Success",
        });
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "file.pdf");
        document.body.appendChild(link);
        link.click();
      })
      .catch(error => {
        dispatch({
          type: "DISBURSEMENT_PREVIEW",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const previewDisbursementFresh = () => {
  return dispatch => {
    dispatch({
      type: "DISBURSEMENT_PREVIEW_FRESH",
      status: false,
    });
  };
};

export const storeDisbursement = (data, includeSupplier = undefined) => {
  var url = `${process.env.REACT_APP_LOCALHOST}/disburse/complete`;
  const headers = head();
  return dispatch => {
    const formData = {
      disburse: data,
      includeSupplier,
    };
    axios
      .post(url, formData, { headers })
      .then(response => {
        dispatch({
          type: "STORE_DISBURSEMENT",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "STORE_DISBURSEMENT",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const storeDisbursementFresh = () => {
  return dispatch => {
    dispatch({
      type: "STORE_DISBURSEMENT_FRESH",
      status: false,
    });
  };
};

export const storeSingleDisbursement = id => {
  var url = `${process.env.REACT_APP_LOCALHOST}/single/disburse/complete/${id}`;
  const headers = head();
  return dispatch => {
    const formData = { id };
    axios
      .post(url, formData, { headers })
      .then(response => {
        dispatch({
          type: "STORE_SINGLE_DISBURSEMENT",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "STORE_SINGLE_DISBURSEMENT",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const storeSingleDisbursementFresh = () => {
  return dispatch => {
    dispatch({
      type: "STORE_SINGLE_DISBURSEMENT_FRESH",
      status: false,
    });
  };
};

export const storeSupplierDisbursement = data => {
  var url = `${process.env.REACT_APP_LOCALHOST}/supplier/disburse/complete`;
  const headers = head();
  return dispatch => {
    const formData = { disburse: data };
    axios
      .post(url, formData, { headers })
      .then(response => {
        dispatch({
          type: "STORE_SUPPLIER_DISBURSEMENT",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "STORE_SUPPLIER_DISBURSEMENT",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const storeSupplierDisbursementFresh = () => {
  return dispatch => {
    dispatch({
      type: "STORE_SUPPLIER_DISBURSEMENT_FRESH",
      status: false,
    });
  };
};

export const storeSingleDisbursementSeller = (
  check,
  state,
  property_id,
  id
) => {
  var url = `${process.env.REACT_APP_LOCALHOST}/seller/disburse/complete/${id}`;
  const headers = head();
  return dispatch => {
    const formData = {
      check: check,
      amount: state.amount,
      property_id: property_id,
    };
    axios
      .post(url, formData, { headers })
      .then(response => {
        dispatch({
          type: "STORE_SELLER_DISBURSEMENT",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "STORE_SELLER_DISBURSEMENT",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const storeSingleDisbursementSellerFresh = () => {
  return dispatch => {
    dispatch({
      type: "STORE_SELLER_DISBURSEMENT_FRESH",
      status: false,
    });
  };
};
