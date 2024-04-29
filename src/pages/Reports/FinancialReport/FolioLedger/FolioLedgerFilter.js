import React, { useState } from "react";
import { Col } from "reactstrap";
import FilterDynamicReport from "pages/Reports/FilterDynamicReport";
import ReactSelectComp from "components/FormComponent/Select/ReactSelectComp";
import moment from "moment";
import "flatpickr/dist/themes/material_blue.css"
import Flatpickr from "react-flatpickr"

function FolioLedgerFilter(props) {
    const today = moment().format("yyyy-MM-DD");
    let currentDate = moment();

    let firstDayOfMonth = currentDate.clone().startOf('month');

    let lastDayOfMonth = currentDate;

    let formattedFirstDay = firstDayOfMonth.format('YYYY-MM-DD');
    let formattedLastDay = lastDayOfMonth.format('YYYY-MM-DD');

    let firstDayOfLastMonth = currentDate.clone().subtract(1, 'month').startOf('month');

    // Get the last day of the previous month
    let lastDayOfLastMonth = currentDate.clone().subtract(1, 'month').endOf('month');

    // Format the dates if needed
    let formattedLastMonthFirstDay = firstDayOfLastMonth.format('YYYY-MM-DD');
    let formattedLastMonthLastDay = lastDayOfLastMonth.format('YYYY-MM-DD');

    const [state, setState] = useState({
        filterBy: { label: "Transaction Date", value: "Transaction Date" },
        optionsFilterBy: [
            { label: "Transaction Date", value: "Transaction Date" },
            { label: "Created Date", value: "Created Date" }
        ],
        transactionOn: { label: "This Month", value: "This Month" },
        optionsTransactionOn: [
            { label: "Today", value: "Today" },
            { label: "This Month", value: "This Month" },
            { label: "Last Month", value: "Last Month" },
            { label: "Custom", value: "Custom" },
        ],
        from_date: formattedFirstDay, to_date: formattedLastDay, dOpen: false,
    })

    const handleTransactionOn = e => {
        if (e.value === 'Today') {
            setState(prev => ({ ...prev, transactionOn: e, from_date: today, to_date: today }));
        } else if (e.value === 'This Month') {
            setState({ ...state, transactionOn: e, from_date: formattedFirstDay, to_date: formattedLastDay });
        } else if (e.value === 'Last Month') {
            setState({ ...state, transactionOn: e, from_date: formattedLastMonthFirstDay, to_date: formattedLastMonthLastDay });
        } else {
            setState({ ...state, transactionOn: e });
        }
    };
    const handleFilterBy = e => {
        setState(prev => ({ ...prev, filterBy: e }));
    };
    const fromDateHandler = (selectedDates, dateStr, instance) => {
        setState({ ...state, ['from_date']: dateStr, transactionOn: { label: "Custom", value: "Custom" } });
    }
    const toDateHandler = (selectedDates, dateStr, instance) => {
        setState({ ...state, ['to_date']: dateStr, transactionOn: { label: "Custom", value: "Custom" } });
    }
    const handleFilterFunction = () => {
        props.startLoader()
        props.FilterFolioLedgerReportApi(state)
    }

    function printDiv(divName) {
        var printContents = document.getElementById(divName).innerHTML;
        var originalContents = document.body.innerHTML;

        document.body.innerHTML = printContents;

        window.print();

        document.body.innerHTML = originalContents;
    }

    const printHandler = () => {
        printDiv('printableArea');
    }

    const handlePdf = () => {
        props.downloadPdf(state)
    }

    let downloadButtons = <>
        <button
            className="btn btn-sm btn-buttonColor m-2"
            onClick={printHandler}
            type="button"
        >
            <i className="fas fa-print"></i> Print
        </button>
        <button
            className="btn btn-sm btn-buttonColor m-2"
            onClick={handlePdf}
            type="button"
        >
            <i className="fas fa-download"></i> PDF
        </button>
    </>

    let rightSideButtons = <></>

    return <FilterDynamicReport downloadButtons={downloadButtons} rightSideButtons={rightSideButtons} handleFilterFunction={handleFilterFunction}>
        <Col md={3}>
            <ReactSelectComp name={'Transaction Date'} value={state.transactionOn} options={state.optionsTransactionOn} handler={handleTransactionOn} />
        </Col>
        <Col md={2}>
            <div className="form-group-new">
                <Flatpickr
                    className="form-control d-block"
                    placeholder="Pick a Date..."
                    value={state.from_date}
                    options={{
                        altInput: true,
                        format: "d/m/Y",
                        altFormat: "d/m/Y",
                        onChange: fromDateHandler
                    }}
                />
                <label htmlFor="usr">From</label>
            </div>
        </Col>
        <Col md={2}>
            <div className="form-group-new">
                <Flatpickr
                    className="form-control d-block"
                    placeholder="Pick a Date..."
                    value={state.to_date}
                    options={{
                        altInput: true,
                        format: "d/m/Y",
                        altFormat: "d/m/Y",
                        onChange: toDateHandler
                    }}
                />
                <label htmlFor="usr">To</label>
            </div>
        </Col>
        <Col md={4}></Col>
        <Col md={1}>
            <button
                className="btn btn-buttonColor"
                onClick={handleFilterFunction}
                type="button"
            >
                Filter
            </button>
        </Col>
    </FilterDynamicReport>
}

export default FolioLedgerFilter