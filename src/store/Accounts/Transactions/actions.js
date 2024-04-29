import axios from "axios";
export const tenant_folios = (search = null) => {
    var authUser = JSON.parse(localStorage.getItem("authUser"));

    var url = `${process.env.REACT_APP_LOCALHOST}/account/tenant-folio-list?q=${search}`;
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
                    type: "TENANT_FOLIO_LIST",
                    payload: response.data,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: "TENANT_FOLIO_LIST",
                    payload: error,
                    status: "Failed",
                });
            });
    };
};


export const tenantInformation = (id) => {
    var authUser = JSON.parse(localStorage.getItem("authUser"));
    var url = `${process.env.REACT_APP_LOCALHOST}/account/tenant-recipt-info/${id}`;
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
                    type: "TENANT_INFO",
                    payload: response.data,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: "TENANT_INFO",
                    payload: error,
                    status: "Failed",
                });
            });
    };

}


export const tenantInfoFresh = () => {


    return dispatch =>
        dispatch({
            type: "TENANT_INFO_FRESH",
            status: false,
        });
};


export const addTenantReceiptFresh = () => {

    return dispatch =>
        dispatch({
            type: "ADD_TENANT_RECEIPT_FRESH",
            status: false,
        });
};




export const addInvoices = (data) => {
    var authUser = JSON.parse(localStorage.getItem("authUser"));
    var url = `${process.env.REACT_APP_LOCALHOST}/account-receipt`;

    return dispatch => {

        const headers = {
            "Content-Type": "application/json",

            "Access-Control-Allow-Origin": "*",

            Authorization: "Bearer " + authUser.token,
        };
        axios
            .post(url, data, { headers: headers })
            .then(response => {
                dispatch({
                    type: "ADD_TENANT_RECEIPT",
                    payload: response.data,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: "ADD_TENANT_RECEIPT",
                    payload: error,
                    status: "Failed",
                });
            });
    };
};

export const tenantDepositReceipt = (data) => {
    var authUser = JSON.parse(localStorage.getItem("authUser"));
    var url = `${process.env.REACT_APP_LOCALHOST}/tenant-deposit-receipt`;

    return dispatch => {

        const headers = {
            "Content-Type": "application/json",

            "Access-Control-Allow-Origin": "*",

            Authorization: "Bearer " + authUser.token,
        };
        axios
            .post(url, data, { headers: headers })
            .then(response => {
                dispatch({
                    type: "TENANT_DEPOSIT_RECEIPT",
                    payload: response.data,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: "TENANT_DEPOSIT_RECEIPT",
                    payload: error,
                    status: "Failed",
                });
            });
    };
};

export const tenantDepositReceiptFresh = () => {
    return dispatch =>
        dispatch({
            type: "TENANT_DEPOSIT_RECEIPT_FRESH",
            payload: null,
            status: false,
        });
};

export const receipt_folio_list = (type) => {
    var authUser = JSON.parse(localStorage.getItem("authUser"));
    var url = `${process.env.REACT_APP_LOCALHOST}/get-receipt-folios/${type}`;
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
                    type: "RECEIPT_FOLIO_LIST",
                    payload: response.data,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: "RECEIPT_FOLIO_LIST",
                    payload: error,
                    status: "Failed",
                });
            });
    };
}
export const receipt_folio_balance = (type, id) => {
    var authUser = JSON.parse(localStorage.getItem("authUser"));
    var url = `${process.env.REACT_APP_LOCALHOST}/get-receipt-folio-balance/${type}/${id}`;
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
                    type: "RECEIPT_FOLIO_BALANCE",
                    payload: response.data,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: "RECEIPT_FOLIO_BALANCE",
                    payload: error,
                    status: "Failed",
                });
            });
    };
}

export const receipt_folio_balance_fresh = () => {
    return dispatch =>
        dispatch({
            type: "RECEIPT_FOLIO_BALANCE_FRESH",
            payload: null,
            status: false,
        });
};
export const receipt_folio_balance_loading_fresh = () => {
    return dispatch =>
        dispatch({
            type: "RECEIPT_FOLIO_BALANCE_LOADING_FRESH",
            status: false,
        });
};

export const FolioReceiptAction = (state) => {
    var authUser = JSON.parse(localStorage.getItem("authUser"));

    var url = `${process.env.REACT_APP_LOCALHOST}/folio-receipt`;
    const formData = {
        type: state.type,
        invoiceDate: state.invoiceDate,
        pay_type: state.pay_type,
        chequeDetails: state.chequeDetails,
        note: state.note,
        folio_id: state.folio_id,
        folio_type: state.folio_type,
        amount: state.amount,
        invoiceChart: state.invoiceChart,
        money_from: state.money_from,
        description: state.description,
        contact_id: state.contact_id,
        property_id: state.property_id,
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
                    type: "FOLIO_RECEIPT",
                    payload: response.data,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: "FOLIO_RECEIPT",
                    payload: error,
                    status: "Failed",
                });
            });
    };
};
export const FolioReceiptActionFresh = () => {
    return dispatch =>
        dispatch({
            type: "FOLIO_RECEIPT_FRESH",
            status: false,
        });
};

export const FolioWithdrawAction = (state) => {
    var authUser = JSON.parse(localStorage.getItem("authUser"));

    var url = `${process.env.REACT_APP_LOCALHOST}/folio-withdraw`;
    const formData = {
        amount: state.amount,
        includeTax: state.includeTax,
        withdrawDate: state.withdrawDate,
        transferred: state.transferred,
        note: state.note,
        folio_id: state.folio_id,
        folio_type: state.folio_type,
        invoiceChart: state.invoiceChart,
        payee: state.payee,
        check_number: state.check_number,
        property_id: state.property_id,
        contact_id: state.contact_id,
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
                    type: "FOLIO_WITHDRAW",
                    payload: response.data,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: "FOLIO_WITHDRAW",
                    payload: error,
                    status: "Failed",
                });
            });
    };
};

export const FolioWithdrawActionFresh = () => {
    return dispatch =>
        dispatch({
            type: "FOLIO_WITHDRAW_FRESH",
            status: false,
        });
};

export const JournalAction = (state) => {
    var authUser = JSON.parse(localStorage.getItem("authUser"));

    var url = `${process.env.REACT_APP_LOCALHOST}/journal`;
    const formData = {
        amount: state.amount,
        includeTax: state.includeTax,
        note: state.note,
        invoiceChart: state.invoiceChart,
        from_folio_type: state.from_folio_type,
        to_folio_type: state.to_folio_type,
        from_property_id: state.from_property_id,
        to_property_id: state.to_property_id,
        from_contact_id: state.from_contact_id,
        to_contact_id: state.to_contact_id,
        from_folio_id: state.from_folio_id,
        to_folio_id: state.to_folio_id,
        details: state.details,
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
                    type: "JOURNAL",
                    payload: response.data,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: "JOURNAL",
                    payload: error,
                    status: "Failed",
                });
            });
    };
};

export const JournalActionFresh = () => {
    return dispatch =>
        dispatch({
            type: "JOURNAL_FRESH",
            status: false,
        });
};



export const transactionsList = (time) => {
    var authUser = JSON.parse(localStorage.getItem("authUser"));

    var url = `${process.env.REACT_APP_LOCALHOST}/account-receipt?timeline=${time}`;
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
                    type: "TRANSACTIONS_LIST",
                    payload: response.data,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: "TRANSACTIONS_LIST",
                    payload: error,
                    status: "Failed",
                });
            });
    };
};

export const transactionsListFresh = () => {
    return dispatch =>
        dispatch({
            type: "TRANSACTIONS_LIST_FRESH",
            status: false,
        });
};

export const transactionsListById = (time, p_id, c_id, folio_id) => {
    var authUser = JSON.parse(localStorage.getItem("authUser"));

    var url = `${process.env.REACT_APP_LOCALHOST}/tenant-receipt-list?timeline=${time}&property_id=${p_id}&contact_id=${c_id}&folio_id=${folio_id}`;
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
                    type: "TRANSACTIONS_LIST_ID",
                    payload: response.data,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: "TRANSACTIONS_LIST_ID",
                    payload: error,
                    status: "Failed",
                });
            });
    };
};

export const transactionsListFreshById = () => {
    return dispatch =>
        dispatch({
            type: "TRANSACTIONS_LIST_ID_FRESH",
            status: false,
        });
};

export const transactionsInfoList = (receipt_id) => {
    var authUser = JSON.parse(localStorage.getItem("authUser"));

    var url = `${process.env.REACT_APP_LOCALHOST}/account-receipt/${receipt_id}`;
    const formData = { id: receipt_id };
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
                    type: "TRANSACTIONS_LIST_INFO",
                    payload: response.data,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: "TRANSACTIONS_LIST_INFO",
                    payload: error,
                    status: "Failed",
                });
            });
    };
};

export const transactionsInfoListFresh = () => {
    return dispatch =>
        dispatch({
            type: "TRANSACTIONS_LIST_INFO_FRESH",
            status: false,
        });
};



export const tenantArchive = (id, status) => {
    var authUser = JSON.parse(localStorage.getItem("authUser"));

    var url = `${process.env.REACT_APP_LOCALHOST}/property-tenant-due-check-and-archive`;
    const formData = {
        tenant_id: id,
        status: status,
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
                    type: "ARCHIVE_TENANT",
                    payload: response.data,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: "ARCHIVE_TENANT",
                    payload: error,
                    status: "Failed",
                });
            });
    };
};

export const tenantArchiveFresh = () => {
    return dispatch =>
        dispatch({
            type: "ARCHIVE_TENANT_FRESH",
            status: false,
        });
};


export const ownerArchive = (id, status) => {
    var authUser = JSON.parse(localStorage.getItem("authUser"));

    var url = `${process.env.REACT_APP_LOCALHOST}/property-owner-due-check-and-archive`;
    const formData = {
        owner_id: id,
        status: status,
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
                    type: "ARCHIVE_OWNER",
                    payload: response.data,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: "ARCHIVE_OWNER",
                    payload: error,
                    status: "Failed",
                });
            });
    };
};

export const ownerArchiveFresh = () => {
    return dispatch =>
        dispatch({
            type: "ARCHIVE_OWNER",
            status: false,
        });
};

export const disburseTenant = (id, folioId) => {
    var authUser = JSON.parse(localStorage.getItem("authUser"));

    var url = `${process.env.REACT_APP_LOCALHOST}/disburse/tenant`;
    const formData = { id, folioId };
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
                    type: "DISBURSE_TENANT",
                    payload: response.data,
                    status: response.data.status,
                });
            })
            .catch(error => {
                dispatch({
                    type: "DISBURSE_TENANT",
                    payload: error,
                    status: "Failed",
                });
            });
    };
};

export const disburseTenantFresh = () => {
    return dispatch =>
        dispatch({
            type: "DISBURSE_TENANT_FRESH",
            status: false,
        });
};

export const reverseReceipt = (state, id, receipt_type) => {
    var authUser = JSON.parse(localStorage.getItem("authUser"));
    let url;
    if (receipt_type === 'Tenant Receipt') {
        url = `${process.env.REACT_APP_LOCALHOST}/tenant/receipt/reverse/${id}`;
    } else {
        url = `${process.env.REACT_APP_LOCALHOST}/receipt/reverse/${id}`;
    }
    const formData = {
        id: id,
        reversalReason: state.reason
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
                    type: "REVERSE_RECEIPT",
                    payload: response.data,
                    status: response.data?.Status,
                });
            })
            .catch(error => {
                dispatch({
                    type: "REVERSE_RECEIPT",
                    payload: error,
                    status: "Failed",
                });
            });
    };
};

export const reverseReceiptFresh = () => {
    return dispatch =>
        dispatch({
            type: "REVERSE_RECEIPT_FRESH",
            status: false,
            payload: null,
        });
};

export const ImportBankFile = (file) => {
    var authUser = JSON.parse(localStorage.getItem("authUser"));

    var url = `${process.env.REACT_APP_LOCALHOST}/import/bank/file`;

    let formData = new FormData();

    formData.append("file", file);

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
                    type: "IMPORT_BANK_FILE",
                    payload: response.data,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: "IMPORT_BANK_FILE",
                    payload: error,
                    status: "Failed",
                });
            });
    };
};

export const ImportBankFileFresh = () => {
    return dispatch =>
        dispatch({
            type: "IMPORT_BANK_FILE_FRESH",
            status: false,
        });
};

export const reconcileBankFileStore = (data) => {
    var authUser = JSON.parse(localStorage.getItem("authUser"));

    var url = `${process.env.REACT_APP_LOCALHOST}/import/bank/reconciliation`;

    let formData = { data }
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
                    type: "RECONCILE_BANK_FILE_STORE",
                    payload: response.data,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: "RECONCILE_BANK_FILE_STORE",
                    payload: error,
                    status: "Failed",
                });
            });
    };
};

export const reconcileBankFileStoreFresh = () => {
    return dispatch =>
        dispatch({
            type: "RECONCILE_BANK_FILE_STORE_FRESH",
            status: false,
        });
};

export const deleteImportedBankFileData = (id) => {
    var authUser = JSON.parse(localStorage.getItem("authUser"));

    var url = `${process.env.REACT_APP_LOCALHOST}/import/bank/file/delete/${id}`;

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
                    type: "DELETE_IMPORT_BANK_FILE_DATA",
                    payload: response.data,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: "DELETE_IMPORT_BANK_FILE_DATA",
                    payload: error,
                    status: "Failed",
                });
            });
    };
};

export const deleteImportedBankFileDataFresh = () => {
    return dispatch =>
        dispatch({
            type: "DELETE_IMPORT_BANK_FILE_DATA_FRESH",
            status: false,
        });
};

export const receiptAsRent = (data) => {
    var authUser = JSON.parse(localStorage.getItem("authUser"));

    var url = `${process.env.REACT_APP_LOCALHOST}/receipt/as/rent`;

    return dispatch => {
        const headers = {
            "Content-Type": "application/json",

            "Access-Control-Allow-Origin": "*",

            Authorization: "Bearer " + authUser.token,
        };
        axios
            .post(url, data, { headers: headers })
            .then(response => {
                dispatch({
                    type: "RECEIPT_AS_RENT",
                    payload: response.data,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: "RECEIPT_AS_RENT",
                    payload: error,
                    status: "Failed",
                });
            });
    };
};

export const receiptAsRentFresh = () => {
    return dispatch =>
        dispatch({
            type: "RECEIPT_AS_RENT_FRESH",
            status: false,
        });
};

export const reconcileBankFile = (data) => {
    var authUser = JSON.parse(localStorage.getItem("authUser"));

    var url = `${process.env.REACT_APP_LOCALHOST}/get/bank/import/Reconciliation`;

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
                    type: "RECONCILE_BANK_FILE",
                    payload: response.data,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: "RECONCILE_BANK_FILE",
                    payload: error,
                    status: "Failed",
                });
            });
    };
};

export const reconcileBankFileFresh = () => {
    return dispatch =>
        dispatch({
            type: "RECONCILE_BANK_FILE_FRESH",
            status: false,
        });
};

export const invoiceuUnpaidListById = (p_id, t_id) => {
    var authUser = JSON.parse(localStorage.getItem("authUser"));

    var url = `${process.env.REACT_APP_LOCALHOST}/tenant-pending-invoice/${p_id}/${t_id}`;
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
                    type: "INVOICE_UNPAID_LIST_ID",
                    payload: response.data,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: "INVOICE_UNPAID_LIST_ID",
                    payload: error,
                    status: "Failed",
                });
            });
    };
};

export const invoiceUnpaidListFreshById = () => {
    return dispatch =>
        dispatch({
            type: "INVOICE_UNPAID_LIST_ID_FRESH",
            status: false,
        });
};

export const invoicePaidListById = (p_id, t_id) => {
    var authUser = JSON.parse(localStorage.getItem("authUser"));

    var url = `${process.env.REACT_APP_LOCALHOST}/tenant-paid-invoice/${p_id}/${t_id}`;
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
                    type: "INVOICE_PAID_LIST_ID",
                    payload: response.data,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: "INVOICE_PAID_LIST_ID",
                    payload: error,
                    status: "Failed",
                });
            });
    };
};

export const invoicePaidListFreshById = () => {
    return dispatch =>
        dispatch({
            type: "INVOICE_PAID_LIST_ID_FRESH",
            status: false,
        });
};

export const transactionsListByIdForOwnerFolio = (time, p_id, owner_id, folio_id) => {
    var authUser = JSON.parse(localStorage.getItem("authUser"));

    var url = `${process.env.REACT_APP_LOCALHOST}/owner/receipt-list-by-month?timeline=${time}&property_id=${p_id}&owner_id=${owner_id}&folio_id=${folio_id}`;
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
                    type: "TRANSACTIONS_LIST_ID_OWNER_FOLIO",
                    payload: response.data,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: "TRANSACTIONS_LIST_ID_OWNER_FOLIO",
                    payload: error,
                    status: "Failed",
                });
            });
    };
};

export const transactionsListByIdForOwnerFolioFresh = () => {
    return dispatch =>
        dispatch({
            type: "TRANSACTIONS_LIST_ID_OWNER_FOLIO_FRESH",
            status: false,
        });
};

export const transactionsListByIdForSellerFolio = (time, p_id, seller_id, folio_id) => {
    var authUser = JSON.parse(localStorage.getItem("authUser"));

    var url = `${process.env.REACT_APP_LOCALHOST}/seller/receipt-list-by-month?timeline=${time}&property_id=${p_id}&seller_id=${seller_id}&folio_id=${folio_id}`;
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
                    type: "TRANSACTIONS_LIST_ID_SELLER_FOLIO",
                    payload: response.data,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: "TRANSACTIONS_LIST_ID_SELLER_FOLIO",
                    payload: error,
                    status: "Failed",
                });
            });
    };
};

export const transactionsListByIdForSellerFolioFresh = () => {
    return dispatch =>
        dispatch({
            type: "TRANSACTIONS_LIST_ID_SELLER_FOLIO_FRESH",
            status: false,
        });
};

export const PendingBillsForOwner = (p_id, o_id) => {
    var authUser = JSON.parse(localStorage.getItem("authUser"));

    var url = `${process.env.REACT_APP_LOCALHOST}/owner-pending-bill/${p_id}/${o_id}`;
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
                    type: "PENDING_BILLS_OWNER",
                    payload: response.data,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: "PENDING_BILLS_OWNER",
                    payload: error,
                    status: "Failed",
                });
            });
    };
};

export const PendingBillsForOwnerFresh = () => {
    return dispatch =>
        dispatch({
            type: "PENDING_BILLS_OWNER_FRESH",
            status: false,
        });
};

export const PaidBillsForOwner = (p_id, o_id) => {
    var authUser = JSON.parse(localStorage.getItem("authUser"));

    var url = `${process.env.REACT_APP_LOCALHOST}/owner-paid-bill/${p_id}/${o_id}`;
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
                    type: "PAID_BILLS_OWNER",
                    payload: response.data,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: "PAID_BILLS_OWNER",
                    payload: error,
                    status: "Failed",
                });
            });
    };
};

export const PaidBillsForOwnerFresh = () => {
    return dispatch =>
        dispatch({
            type: "PAID_BILLS_OWNER_FRESH",
            status: false,
        });
};

export const PendingInvoicesForOwner = (p_id, o_id) => {
    var authUser = JSON.parse(localStorage.getItem("authUser"));

    var url = `${process.env.REACT_APP_LOCALHOST}/owner-pending-invoice/${p_id}/${o_id}`;
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
                    type: "PENDING_INVOICES_OWNER",
                    payload: response.data,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: "PENDING_INVOICES_OWNER",
                    payload: error,
                    status: "Failed",
                });
            });
    };
};

export const PendingInvoicesForOwnerFresh = () => {
    return dispatch =>
        dispatch({
            type: "PENDING_INVOICES_OWNER_FRESH",
            status: false,
        });
};

export const RentActionList = (id) => {
    var authUser = JSON.parse(localStorage.getItem("authUser"));

    var url = `${process.env.REACT_APP_LOCALHOST}/rent-actions/${id}`;
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
                    type: "RENT_ACTION",
                    payload: response.data,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: "RENT_ACTION",
                    payload: error,
                    status: "Failed",
                });
            });
    };
};

export const RentActionListFresh = () => {
    return dispatch =>
        dispatch({
            type: "RENT_ACTION_FRESH",
            status: false,
        });
};

export const rentManagementList = (id, prop_Id, page,
    sizePerPage,
    search = null,
    sortField = null,
    sortValue = null,
) => {
    var authUser = JSON.parse(localStorage.getItem("authUser"));

    var url = `${process.env.REACT_APP_LOCALHOST}/rent-management/${id}/${prop_Id}?page=${page}&sizePerPage=${sizePerPage}&q=${search}&sortField=${sortField}&sortValue=${sortValue}`;
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
                    type: "RENT_MANAGEMENT_LIST",
                    payload: response.data,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: "RENT_MANAGEMENT_LIST",
                    payload: error,
                    status: "Failed",
                });
            });
    };
};


export const rentManagementListFresh = () => {
    return dispatch =>
        dispatch({
            type: "RENT_MANAGEMENT_LIST_FRESH",
            status: false,
        });
};

export const RentActionStore = (state, folioId) => {
    var authUser = JSON.parse(localStorage.getItem("authUser"));

    var url = `${process.env.REACT_APP_LOCALHOST}/rent-action-store`;

    let formData = { amount: state.amount, details: state.comment, tenant_folio_id: folioId };
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
                    type: "RENT_ACTION_STORE",
                    payload: response.data,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: "RENT_ACTION_STORE",
                    payload: error,
                    status: "Failed",
                });
            });
    };
};

export const RentActionStoreFresh = () => {
    return dispatch =>
        dispatch({
            type: "RENT_ACTION_STORE_FRESH",
            status: false,
        });
};

export const RentReset = (state) => {
    let authUser = JSON.parse(localStorage.getItem("authUser"));
    let url = `${process.env.REACT_APP_LOCALHOST}/reset-rent-management`;
    let formData = {
        tenant_id: state.tenant_id,
        property_id: state.property_id,
        rent: state.rent,
        rent_type: state.rent_type,
        part_paid: state.part_paid,
        paid_to: state.paid_to,
        reason: state.reason,
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
                    type: "RESET_RENT",
                    payload: response.data,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: "RESET_RENT",
                    payload: error,
                    status: "Failed",
                });
            });
    };
};

export const RentResetFresh = () => {
    return dispatch =>
        dispatch({
            type: "RESET_RENT_FRESH",
            status: false,
        });
};

export const DeleteRentAction = (data) => {
    var authUser = JSON.parse(localStorage.getItem("authUser"));

    var url = `${process.env.REACT_APP_LOCALHOST}/rent-action-delete`;

    return dispatch => {
        const headers = {
            "Content-Type": "application/json",

            "Access-Control-Allow-Origin": "*",

            Authorization: "Bearer " + authUser.token,
        };
        axios
            .post(url, data, { headers: headers })
            .then(response => {
                dispatch({
                    type: "DELETE_RENT_ACTION",
                    payload: response.data,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: "DELETE_RENT_ACTION",
                    payload: error,
                    status: "Failed",
                });
            });
    };
};

export const DeleteRentActionFresh = () => {
    return dispatch =>
        dispatch({
            type: "DELETE_RENT_ACTION_FRESH",
            status: false,
        });
};


export const sellerFolioList = () => {
    var authUser = JSON.parse(localStorage.getItem("authUser"));

    var url = `${process.env.REACT_APP_LOCALHOST}/seller/folio`;
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
                    type: "SELLER_FOLIO_LIST",
                    payload: response.data,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: "SELLER_FOLIO_LIST",
                    payload: error,
                    status: "Failed",
                });
            });
    };
};

export const sellerFolioListById = (id) => {
    var authUser = JSON.parse(localStorage.getItem("authUser"));

    var url = `${process.env.REACT_APP_LOCALHOST}/seller/folio/${id}`;
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
                    type: "SELLER_FOLIO_LIST_ID",
                    payload: response.data,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: "SELLER_FOLIO_LIST_ID",
                    payload: error,
                    status: "Failed",
                });
            });
    };
};


export const addSaleReceiptAction = (state, select) => {
    console.log(state, select);
    // return
    var authUser = JSON.parse(localStorage.getItem("authUser"));

    var url = `${process.env.REACT_APP_LOCALHOST}/seller-folio-receipt`;
    // const formData = {
    //     type: state.type,
    //     invoiceDate: state.invoiceDate,
    //     pay_type: state.pay_type,
    //     chequeDetails: state.chequeDetails,
    //     note: state.note,
    //     folio_id: state.folio_id,
    //     folio_type: state.folio_type,
    //     amount: state.amount,
    //     invoiceChart: state.invoiceChart,
    //     money_from: state.money_from,
    //     description: state.description,
    //     contact_id: state.contact_id,
    //     property_id: state.property_id,
    // };
    const formData = {
        folio_id: select.selectedFolio.value,
        folio_type: 'Seller',
        property_id: state.property_id,
        amount: state.amount,
        date: state.date,
        pay_type: state.cashBtn ? 'cash' : state.chequeBtn ? 'cheque' : state.cardBtn ? 'card' : state.eftBtn ? 'eft' : ''
        ,
        note: state.note,
        description: state.description,
        money_from: state.sellerBtn ? 'seller' : state.buyerBtn ? 'buyer' : state.otherBtn ? state.moneyPaid : ''
        ,
        account: select.selectedAccount.value,
        chequeDetails: state.chequeDetails,


    }

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
                    type: "ADD_SALE_RECEIPT",
                    payload: response.data,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: "ADD_SALE_RECEIPT",
                    payload: error,
                    status: "Failed",
                });
            });
    };
};

export const addSaleReceiptActionFresh = () => {
    return dispatch =>
        dispatch({
            type: "ADD_SALE_RECEIPT_FRESH",
            status: false,
        });
};

export const PendingBillsForSeller = (p_id, o_id) => {
    var authUser = JSON.parse(localStorage.getItem("authUser"));

    var url = `${process.env.REACT_APP_LOCALHOST}/seller-pending-bill/${p_id}/${o_id}`;
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
                    type: "PENDING_BILLS_SELLER",
                    payload: response.data,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: "PENDING_BILLS_SELLER",
                    payload: error,
                    status: "Failed",
                });
            });
    };
};

export const PendingBillsForSellerFresh = () => {
    return dispatch =>
        dispatch({
            type: "PENDING_BILLS_SELLER_FRESH",
            status: false,
        });
};

export const PaidBillsForSeller = (p_id, o_id) => {
    var authUser = JSON.parse(localStorage.getItem("authUser"));

    var url = `${process.env.REACT_APP_LOCALHOST}/seller-paid-bill/${p_id}/${o_id}`;
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
                    type: "PAID_BILLS_SELLER",
                    payload: response.data,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: "PAID_BILLS_SELLER",
                    payload: error,
                    status: "Failed",
                });
            });
    };
};

export const PaidBillsForSellerFresh = () => {
    return dispatch =>
        dispatch({
            type: "PAID_BILLS_SELLER_FRESH",
            status: false,
        });
};

export const sellerArchive = (id, property_id, status) => {
    var authUser = JSON.parse(localStorage.getItem("authUser"));

    var url = `${process.env.REACT_APP_LOCALHOST}/property-seller-due-check-and-archive`;
    const formData = {
        seller_id: id,
        property_id: property_id,
        status: status,
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
                    type: "ARCHIVE_SELLER",
                    payload: response.data,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: "ARCHIVE_SELLER",
                    payload: error,
                    status: "Failed",
                });
            });
    };
};

export const sellerArchiveFresh = () => {
    return dispatch =>
        dispatch({
            type: "ARCHIVE_SELLER",
            status: false,
        });
};

export const supplierFolioForTransaction = () => {
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
                    type: "SUPPLIER_FOLIO_TRANSACTIONS",
                    payload: response.data,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: "SUPPLIER_FOLIO_TRANSACTIONS",
                    payload: error,
                    status: "Failed",
                });
            });
    };
};

export const supplierFolioForBill = () => {
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
                    type: "SUPPLIER_FOLIO_BILLS",
                    payload: response.data,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: "SUPPLIER_FOLIO_BILLS",
                    payload: error,
                    status: "Failed",
                });
            });
    };
};

export const supplierFolioForInvoice = () => {
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
                    type: "SUPPLIER_FOLIO_INVOICE",
                    payload: response.data,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: "SUPPLIER_FOLIO_INVOICE",
                    payload: error,
                    status: "Failed",
                });
            });
    };
};


export const cancelRent = (data) => {
    var authUser = JSON.parse(localStorage.getItem("authUser"));

    var url = `${process.env.REACT_APP_LOCALHOST}/cancel-recurring-invoice`;
    const formData = {
        data: data
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
                    type: "CANCEL_RENT",
                    payload: response.data,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: "CANCEL_RENT",
                    payload: error,
                    status: "Failed",
                });
            });
    };
};

export const cancelRentFresh = () => {
    return dispatch =>
        dispatch({
            type: "CANCEL_RENT_FRESH",
            status: false,
        });
};
export const generateRentInvoice = (data) => {
    var authUser = JSON.parse(localStorage.getItem("authUser"));

    var url = `${process.env.REACT_APP_LOCALHOST}/generate-recurring-invoice`;
    const formData = {
        data: data
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
                    type: "GENERATE_RENT_INVOICE",
                    payload: response.data,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: "GENERATE_RENT_INVOICE",
                    payload: error,
                    status: "Failed",
                });
            });
    };
};

export const generateRentInvoiceFresh = () => {
    return dispatch =>
        dispatch({
            type: "GENERATE_RENT_INVOICE_FRESH",
            status: false,
        });
};