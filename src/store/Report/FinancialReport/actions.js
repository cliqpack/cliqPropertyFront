import axios from "axios";
import { head } from "store/common/ApiHeader";

export const AllBillsReport = () => {
    var url = `${process.env.REACT_APP_LOCALHOST}/reports/bills`;
    const headers = head();
    return dispatch => {
        axios
            .get(url, { headers: headers })
            .then(response => {
                dispatch({
                    type: "BILLS_REPORT",
                    payload: response.data,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: "BILLS_REPORT",
                    payload: error,
                    status: "Failed",
                });
            });
    };
};

export const FilterBillsReport = (state) => {
    var url = `${process.env.REACT_APP_LOCALHOST}/reports/filter/bills`;
    const headers = head();
    let formData = {
        type: state.selectedDueType.value,
        from: state.from_date,
        to: state.to_date,
    }
    return dispatch => {
        axios
            .post(url, formData, { headers: headers })
            .then(response => {
                dispatch({
                    type: "FILTER_BILLS_REPORT",
                    payload: response.data,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: "FILTER_BILLS_REPORT",
                    payload: error,
                    status: "Failed",
                });
            });
    };
};

export const FilterBillsReportFresh = () => {
    return dispatch =>
        dispatch({
            type: "FILTER_BILLS_REPORT_FRESH",
            status: false,
        });
};

export const downloadBillsPdf = (state) => {
    var url = `${process.env.REACT_APP_LOCALHOST}/reports/download/bills-pdf`;
    const headers = head();
    let formData = {
        type: state.selectedDueType.value,
        from: state.from_date,
        to: state.to_date,
    }
    return dispatch => {
        axios({
            method: "post",
            responseType: "blob",
            url,
            headers,
            data: formData,
          })
            // .post(url, formData, { headers: headers })
            .then(response => {
                dispatch({
                    type: "DOWNLOAD_BILLS_PDF",
                    payload: response.data,
                    status: "Success",
                });
                // const url = `${process.env.REACT_APP_IMAGE}${response.data}`;
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement("a");
                // link.target = "_blank";
                link.href = url;
                link.setAttribute("download", `AccountsBills.pdf`);
                document.body.appendChild(link);
                link.click();
            })
            .catch(error => {
                dispatch({
                    type: "DOWNLOAD_BILLS_PDF",
                    payload: error,
                    status: "Failed",
                });
            });
    };
};

export const downloadBillsPdfFresh = () => {
    return dispatch =>
        dispatch({
            type: "DOWNLOAD_BILLS_PDF_FRESH",
            status: false,
        });
};

export const downloadBillsExcel = (state) => {
    var url = `${process.env.REACT_APP_LOCALHOST}/reports/download/bills-excel`;
    const headers = head();
    let formData = {
        type: state.selectedDueType.value,
        from: state.from_date,
        to: state.to_date,
    }
    return dispatch => {
        axios
            .post(url, formData, { headers: headers })
            .then(response => {
                dispatch({
                    type: "DOWNLOAD_BILLS_EXCEL",
                    payload: response.data,
                    status: "Success",
                });
                const blob = new Blob([response.data]);

                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'AccountBills.csv');
                document.body.appendChild(link);

                link.click();

                window.URL.revokeObjectURL(url);
                document.body.removeChild(link);
            })
            .catch(error => {
                dispatch({
                    type: "DOWNLOAD_BILLS_EXCEL",
                    payload: error,
                    status: "Failed",
                });
            });

    };
};

export const downloadBillsExcelFresh = () => {
    return dispatch =>
        dispatch({
            type: "DOWNLOAD_BILLS_EXCEL_FRESH",
            status: false,
        });
};

export const AllLettingFeeBillsReport = () => {
    var url = `${process.env.REACT_APP_LOCALHOST}/reports/letting-fee-bills`;
    const headers = head();
    console.log(url);
    return dispatch => {
        axios
            .get(url, { headers: headers })
            .then(response => {
                dispatch({
                    type: "LETTING_FEE_BILLS_REPORT",
                    payload: response.data,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: "LETTING_FEE_BILLS_REPORT",
                    payload: error,
                    status: "Failed",
                });
            });
    };
};

export const FilterLettingFeeBillsReport = (state) => {
    var url = `${process.env.REACT_APP_LOCALHOST}/reports/filter/letting-fee-bills`;
    const headers = head();
    let formData = {
        type: state.selectedDueType.value,
        from: state.from_date,
        to: state.to_date,
    }
    return dispatch => {
        axios
            .post(url, formData, { headers: headers })
            .then(response => {
                dispatch({
                    type: "FILTER_LETTING_FEE_BILLS_REPORT",
                    payload: response.data,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: "FILTER_LETTING_FEE_BILLS_REPORT",
                    payload: error,
                    status: "Failed",
                });
            });
    };
};

export const FilterLettingFeeBillsReportFresh = () => {
    return dispatch =>
        dispatch({
            type: "FILTER_LETTING_FEE_BILLS_REPORT_FRESH",
            status: false,
        });
};

export const downloadLettingFeeBillsPdf = (state) => {
    var url = `${process.env.REACT_APP_LOCALHOST}/reports/download/letting-fee-bills-pdf`;
    const headers = head();
    let formData = {
        type: state.selectedDueType.value,
        from: state.from_date,
        to: state.to_date,
    }
    return dispatch => {
        axios({
            method: "post",
            responseType: "blob",
            url,
            headers,
            data: formData,
          })
            // .post(url, formData, { headers: headers })
            .then(response => {
                dispatch({
                    type: "DOWNLOAD_LETTING_FEE_BILLS_PDF",
                    payload: response.data,
                    status: "Success",
                });
                // const url = `${process.env.REACT_APP_IMAGE}${response.data}`;
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement("a");
                // link.target = "_blank";
                link.href = url;
                link.setAttribute("download", `LettingFeeBills.pdf`);
                document.body.appendChild(link);
                link.click();
            })
            .catch(error => {
                dispatch({
                    type: "DOWNLOAD_LETTING_FEE_BILLS_PDF",
                    payload: error,
                    status: "Failed",
                });
            });
    };
};

export const downloadLettingFeeBillsPdfFresh = () => {
    return dispatch =>
        dispatch({
            type: "DOWNLOAD_LETTING_FEE_BILLS_PDF_FRESH",
            status: false,
        });
};

export const downloadLettingFeeBillsExcel = (state) => {
    let url = `${process.env.REACT_APP_LOCALHOST}/reports/download/letting-fee-bills-excel`;
    const headers = head();
    let formData = {
        type: state.selectedDueType.value,
        from: state.from_date,
        to: state.to_date,
    }
    return dispatch => {
        axios
            .post(url, formData, { headers: headers })
            .then(response => {
                dispatch({
                    type: "DOWNLOAD_LETTING_FEE_BILLS_EXCEL",
                    payload: response.data,
                    status: "Success",
                });
                const blob = new Blob([response.data]);

                // Create a link element to trigger the download
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'Accounts-LettingFeeBills.csv');
                document.body.appendChild(link);

                // Trigger the download
                link.click();

                // Clean up
                window.URL.revokeObjectURL(url);
                document.body.removeChild(link);
            })
            .catch(error => {
                dispatch({
                    type: "DOWNLOAD_LETTING_FEE_BILLS_EXCEL",
                    payload: error,
                    status: "Failed",
                });
            });
    };
};

export const downloadLettingFeeBillsExcelFresh = () => {
    return dispatch =>
        dispatch({
            type: "DOWNLOAD_LETTING_FEE_BILLS_EXCEL_FRESH",
            status: false,
        });
};

export const LettingFeeLastMonthBillsReport = () => {
    var url = `${process.env.REACT_APP_LOCALHOST}/reports/letting-fee-last-month-bills`;
    const headers = head();
    return dispatch => {
        axios
            .get(url, { headers: headers })
            .then(response => {
                dispatch({
                    type: "LETTING_FEE_BILLS_REPORT",
                    payload: response.data,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: "LETTING_FEE_BILLS_REPORT",
                    payload: error,
                    status: "Failed",
                });
            });
    };
};

export const LettingFeeThisMonthBillsReport = () => {
    var url = `${process.env.REACT_APP_LOCALHOST}/reports/letting-fee-this-month-bills`;
    const headers = head();
    return dispatch => {
        axios
            .get(url, { headers: headers })
            .then(response => {
                dispatch({
                    type: "LETTING_FEE_BILLS_REPORT",
                    payload: response.data,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: "LETTING_FEE_BILLS_REPORT",
                    payload: error,
                    status: "Failed",
                });
            });
    };
};

export const UnpaidBillsReport = () => {
    var url = `${process.env.REACT_APP_LOCALHOST}/reports/unpaid-bills`;
    const headers = head();
    return dispatch => {
        axios
            .get(url, { headers: headers })
            .then(response => {
                dispatch({
                    type: "UNPAID_BILLS_REPORT",
                    payload: response.data,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: "UNPAID_BILLS_REPORT",
                    payload: error,
                    status: "Failed",
                });
            });
    };
};

export const FilterUnpaidBillsReport = (state) => {
    var url = `${process.env.REACT_APP_LOCALHOST}/reports/filter/unpaid-bills`;
    const headers = head();
    let formData = {
        type: state.selectedDueType.value,
        from: state.from_date,
        to: state.to_date,
    }
    return dispatch => {
        axios
            .post(url, formData, { headers: headers })
            .then(response => {
                dispatch({
                    type: "FILTER_UNPAID_BILLS_REPORT",
                    payload: response.data,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: "FILTER_UNPAID_BILLS_REPORT",
                    payload: error,
                    status: "Failed",
                });
            });
    };
};

export const FilterUnpaidBillsReportFresh = () => {
    return dispatch =>
        dispatch({
            type: "FILTER_UNPAID_BILLS_REPORT_FRESH",
            status: false,
        });
};

export const downloadUnpaidBillsPdf = (state) => {
    var url = `${process.env.REACT_APP_LOCALHOST}/reports/download/unpaid-bills-pdf`;
    const headers = head();
    let formData = {
        type: state.selectedDueType.value,
        from: state.from_date,
        to: state.to_date,
    }
    return dispatch => {
        axios({
            method: "post",
            responseType: "blob",
            url,
            headers,
            data: formData,
          })
            // .post(url, formData, { headers: headers })
            .then(response => {
                dispatch({
                    type: "DOWNLOAD_UNPAID_BILLS_PDF",
                    payload: response.data,
                    status: "Success",
                });
                // const url = `${process.env.REACT_APP_IMAGE}${response.data}`;
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement("a");
                // link.target = "_blank";
                link.href = url;
                link.setAttribute("download", `AccountsUnpaidBills.pdf`);
                document.body.appendChild(link);
                link.click();
            })
            .catch(error => {
                dispatch({
                    type: "DOWNLOAD_UNPAID_BILLS_PDF",
                    payload: error,
                    status: "Failed",
                });
            });
    };
};

export const downloadUnpaidBillsPdfFresh = () => {
    return dispatch =>
        dispatch({
            type: "DOWNLOAD_UNPAID_BILLS_PDF_FRESH",
            status: false,
        });
};

export const downloadUnpaidBillsExcel = (state) => {
    var url = `${process.env.REACT_APP_LOCALHOST}/reports/download/unpaid-bills-excel`;
    const headers = head();
    let formData = {
        type: state.selectedDueType.value,
        from: state.from_date,
        to: state.to_date,
    }
    return dispatch => {
        axios
            .post(url, formData, { headers: headers })
            .then(response => {
                dispatch({
                    type: "DOWNLOAD_UNPAID_BILLS_EXCEL",
                    payload: response.data,
                    status: "Success",
                });
                const blob = new Blob([response.data]);

                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'AccountsUnpaidBills.csv');
                document.body.appendChild(link);

                link.click();

                window.URL.revokeObjectURL(url);
                document.body.removeChild(link);
            })
            .catch(error => {
                dispatch({
                    type: "DOWNLOAD_UNPAID_BILLS_EXCEL",
                    payload: error,
                    status: "Failed",
                });
            });

    };
};

export const downloadUnpaidBillsExcelFresh = () => {
    return dispatch =>
        dispatch({
            type: "DOWNLOAD_UNPAID_BILLS_EXCEL_FRESH",
            status: false,
        });
};