import axios from "axios";
import { head } from "store/common/ApiHeader";

export const CashBookReportApi = () => {
    console.log('yay');
    var url = `${process.env.REACT_APP_LOCALHOST}/reports/cashbook`;
    const headers = head();
    return dispatch => {
        axios
            .get(url, { headers: headers })
            .then(response => {
                dispatch({
                    type: "CASHBOOK_REPORT_API",
                    payload: response.data,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: "CASHBOOK_REPORT_API",
                    payload: error,
                    status: "Failed",
                });
            });
    };
};

export const FilterCashBookReportApi = (state) => {
    var url = `${process.env.REACT_APP_LOCALHOST}/reports/filter/cashbook`;
    const headers = head();
    let formData = {
        filterBy: state.filterBy.value,
        transactionOn: state.transactionOn.value,
        from_date: state.from_date, 
        to_date: state.to_date,
    }
    return dispatch => {
        axios
            .post(url, formData, { headers: headers })
            .then(response => {
                dispatch({
                    type: "FILTER_CASHBOOK_REPORT_API",
                    payload: response.data,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: "FILTER_CASHBOOK_REPORT_API",
                    payload: error,
                    status: "Failed",
                });
            });
    };
};

export const FilterCashBookReportApiFresh = () => {
    return dispatch =>
        dispatch({
            type: "FILTER_CASHBOOK_REPORT_API_FRESH",
            status: false,
        });
};

export const downloadCashbookPdf = (state) => {
    var url = `${process.env.REACT_APP_LOCALHOST}/reports/download/cashbook-pdf`;
    const headers = head();
    let formData = {
        filterBy: state.filterBy.value,
        transactionOn: state.transactionOn.value,
        from_date: state.from_date, 
        to_date: state.to_date,
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
                    type: "DOWNLOAD_CASHBOOK_PDF",
                    payload: response.data,
                    status: "Success",
                });
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement("a");
                link.href = url;
                link.setAttribute("download", `cashbook.pdf`);
                document.body.appendChild(link);
                link.click();
            })
            .catch(error => {
                dispatch({
                    type: "DOWNLOAD_CASHBOOK_PDF",
                    payload: error,
                    status: "Failed",
                });
            });
    };
};

export const downloadCashbookPdfFresh = () => {
    return dispatch =>
        dispatch({
            type: "DOWNLOAD_CASHBOOK_PDF_FRESH",
            status: false,
        });
};