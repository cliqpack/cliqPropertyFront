import React, { createRef } from "react";
import {
    useHistory,
    useParams,
    withRouter,
} from "react-router-dom";

import { transactionsInfoList } from "store/actions";
//Import Image
import { connect } from "react-redux";



const InvoiceHeader = (props) => {
    const { id } = useParams();
    const history = useHistory();
    const ref = createRef();

    // const goBack = () => history.push(`/maintenanceInfo/${id}`)
    const goBack = () => window.close();

    const printHandler = () => {
        props.printDiv('printableArea');
    }
    const pdfHandler = () => {
        props.downloadPdfDocument();
    }

    window.onafterprint = function () {
        window.location.reload(true);
    }


    return (
        <React.Fragment>
            <div className="d-flex justify-content-between align-items-center py-2 px-4 bg-info">
                <div>
                    <button type="button" className="btn btn-secondary" onClick={goBack}>
                        <i className="fas fa-times me-1"></i>  Close
                    </button>
                </div>
                <div className="button-items">
                    {/* <button type="button" className="btn btn-secondary" onClick={pdfHandler}>
                        <i className="fas fa-download me-1" />  Download
                    </button> */}
                    <button type="button" className="btn btn-secondary" onClick={printHandler}>
                        <i className="fas fa-print me-1" />  Print
                    </button>
                    {/* <a className="btn btn-secondary" rel="noopener noreferrer" >
                        <i className="far fa-file-pdf me-1" />  PDF
                    </a>


                    <button type="button" className="btn btn-secondary">
                        <i className="fas fa-envelope me-1" />  Send in Email
                    </button> */}
                </div>
            </div>
        </React.Fragment>
    );
};


const mapStateToProps = gstate => {
    const {
    } = gstate.AccountsTransactions;

    return {
    };
}

export default withRouter(
    connect(mapStateToProps, {
        transactionsInfoList
    })(InvoiceHeader)
);