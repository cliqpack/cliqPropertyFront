import React, { Fragment, useEffect, useState } from "react";
import Select from "react-select";
import "flatpickr/dist/themes/material_blue.css"
import Flatpickr from "react-flatpickr"
import { Card, CardBody, Row, Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from "reactstrap";
import moment from "moment";

export default function FilterReport(props) {
    const today = moment().format("yyyy-MM-DD");
    let currentDate = moment();

    let firstDayOfMonth = currentDate.clone().startOf('month');

    let lastDayOfMonth = currentDate.clone().endOf('month');

    let formattedFirstDay = firstDayOfMonth.format('YYYY-MM-DD');
    let formattedLastDay = lastDayOfMonth.format('YYYY-MM-DD');

    let firstDayOfLastMonth = currentDate.clone().subtract(1, 'month').startOf('month');

    // Get the last day of the previous month
    let lastDayOfLastMonth = currentDate.clone().subtract(1, 'month').endOf('month');

    // Format the dates if needed
    let formattedLastMonthFirstDay = firstDayOfLastMonth.format('YYYY-MM-DD');
    let formattedLastMonthLastDay = lastDayOfLastMonth.format('YYYY-MM-DD');

    const [operand, setOperand] = useState(true)
    const [state, setState] = useState({
        selectedDueType: { label: "This Month", value: "This Month" },
        optionDueType: [
            { label: "All", value: "All" },
            { label: "Today", value: "Today" },
            { label: "This Month", value: "This Month" },
            { label: "Last Month", value: "Last Month" },
            { label: "Custom", value: "Custom" },
        ],
        from_date: formattedFirstDay, to_date: formattedLastDay, dOpen: false,
    })
    const handleSelectDueType = e => {
        if (e.value === 'Today') {
            setState({ ...state, selectedDueType: e, from_date: today, to_date: today });
        } else if (e.value === 'This Month') {
            setState({ ...state, selectedDueType: e, from_date: formattedFirstDay, to_date: formattedLastDay });
        } else if (e.value === 'Last Month') {
            setState({ ...state, selectedDueType: e, from_date: formattedLastMonthFirstDay, to_date: formattedLastMonthLastDay });
        } else {
            setState({ ...state, selectedDueType: e });
        }
    };
    const fromDateHandler = (selectedDates, dateStr, instance) => {
        setState({ ...state, ['from_date']: dateStr, selectedDueType: { label: "Custom", value: "Custom" } });
    }
    const toDateHandler = (selectedDates, dateStr, instance) => {
        setState({ ...state, ['to_date']: dateStr, selectedDueType: { label: "Custom", value: "Custom" } });
    }
    const handleFilterFunction = () => {
        props.startLoader()
        props.filterFunction(state)
    }
    const operandHandler = () => {
        setOperand(!operand)
    }
    const downloadPdfHandler = () => {
        props.startLoader()
        props.downloadPdf(state)
    }
    const downloadExcelHandler = () => {
        props.startLoader()
        props.downloadExcel(state)
    }
    useEffect(() => {
        if (props?.filterValue?.type === 'All') {
            setState({ ...state, selectedDueType: { label: props?.filterValue?.type, value: props?.filterValue?.type } });
        } else {
            setState({ 
                ...state, 
                selectedDueType: { label: props?.filterValue?.type, value: props?.filterValue?.type },
                from_date: props?.filterValue?.from,
                to_date: props?.filterValue?.to,
            });
        }
    }, [props?.filterValue])

    return <Fragment>
        <div className="d-flex justify-content-between">
            <div>
                <Dropdown
                    isOpen={state.dOpen}
                    toggle={() => setState(prev => ({ ...prev, dOpen: !prev.dOpen }))}
                >
                    <DropdownToggle className="btn btn-sm btn-buttonColor m-2" caret>
                        Export{" "}
                        <i className="mdi mdi-chevron-down"></i>
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem onClick={ downloadPdfHandler }>
                            Export PDF
                        </DropdownItem>
                        <DropdownItem onClick={ downloadExcelHandler }>
                            Export Excel
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
            <div>
                <button
                    className="btn btn-sm btn-buttonColor m-2"
                    onClick={operandHandler}
                    type="button"
                >
                    {operand ? <i className="fas fa-minus"></i> : <i className="fas fa-plus"></i>}
                </button>
                <button
                    className="btn btn-sm btn-buttonColor"
                    onClick={handleFilterFunction}
                    type="button"
                >
                    <i className="fas fa-redo"></i>
                </button>
            </div>
        </div>
        <Card className="mt-4">
            <CardBody>
                <Row>
                    <Col md={3}>
                        <div className="form-group-new">
                            <Select
                                value={state.selectedDueType}
                                onChange={
                                    handleSelectDueType
                                }
                                options={state.optionDueType}
                                //classNamePrefix="select2-selection"
                                className="form-control-new"
                                style={{ border: "none" }}
                            />
                            <label htmlFor="usr">
                                Due
                            </label>
                        </div>
                    </Col>
                    <Col md={3}>
                        {
                            state.selectedDueType.value !== 'All' &&
                            <div className="form-group-new">
                                <Flatpickr
                                    className="form-control d-block"
                                    placeholder="Pick a Date..."
                                    value={state.from_date
                                    }
                                    options={{
                                        altInput: true,
                                        format: "d/m/Y",
                                        altFormat: "d/m/Y",
                                        onChange: fromDateHandler
                                    }}
                                />
                                <label htmlFor="usr">From</label>
                            </div>
                        }
                    </Col>
                    <Col md={3}>
                        {
                            state.selectedDueType.value !== 'All' &&
                            <div className="form-group-new">
                                <Flatpickr
                                    className="form-control d-block"
                                    placeholder="Pick a Date..."
                                    value={state.to_date
                                    }
                                    options={{
                                        altInput: true,
                                        format: "d/m/Y",
                                        altFormat: "d/m/Y",
                                        onChange: toDateHandler
                                    }}
                                />
                                <label htmlFor="usr">To</label>
                            </div>
                        }
                    </Col>

                    <Col md={2}></Col>
                    <Col md={1}>
                        <button
                            className="btn btn-buttonColor"
                            onClick={handleFilterFunction}
                            type="button"
                        >
                            Filter
                        </button>
                    </Col>
                </Row>
            </CardBody>
        </Card>
    </Fragment>
}