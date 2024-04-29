import axios from "axios";
import { head } from "store/common/ApiHeader";

export const FolioLedgerReportApi = () => {
    var url = `${process.env.REACT_APP_LOCALHOST}/reports/folio-ledger`;
    const headers = head();
    return dispatch => {
        axios
            .get(url, { headers: headers })
            .then(response => {
                dispatch({
                    type: "FOLIO_LEDGER_REPORT_API",
                    payload: response.data,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: "FOLIO_LEDGER_REPORT_API",
                    payload: error,
                    status: "Failed",
                });
            });
    };
};

export const FilterFolioLedgerReportApi = (state) => {
    var url = `${process.env.REACT_APP_LOCALHOST}/reports/filter/folio-ledger`;
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
                    type: "FILTER_FOLIO_LEDGER_REPORT_API",
                    payload: response.data,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: "FILTER_FOLIO_LEDGER_REPORT_API",
                    payload: error,
                    status: "Failed",
                });
            });
    };
};

export const FilterFolioLedgerReportApiFresh = () => {
    return dispatch =>
        dispatch({
            type: "FILTER_FOLIO_LEDGER_REPORT_API_FRESH",
            status: false,
        });
};

export const downloadFolioLedgerPdf = (state) => {
    var url = `${process.env.REACT_APP_LOCALHOST}/reports/download/folio-ledger`;
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
                    type: "DOWNLOAD_FOLIO_LEDGER_PDF",
                    payload: response.data,
                    status: "Success",
                });
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement("a");
                link.href = url;
                link.setAttribute("download", `folioledger.pdf`);
                document.body.appendChild(link);
                link.click();
            })
            .catch(error => {
                dispatch({
                    type: "DOWNLOAD_FOLIO_LEDGER_PDF",
                    payload: error,
                    status: "Failed",
                });
            });
    };
};

export const downloadFolioLedgerPdfFresh = () => {
    return dispatch =>
        dispatch({
            type: "DOWNLOAD_FOLIO_LEDGER_FRESH",
            status: false,
        });
};