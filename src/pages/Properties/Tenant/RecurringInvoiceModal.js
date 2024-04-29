import React, { useEffect, useState } from 'react'
import { Button, Card, CardBody, Col, Label, Modal, Row } from 'reactstrap'
import Select from "react-select";
import { supplierList, invoiceChartList } from 'store/actions'
import { useDispatch, useSelector } from 'react-redux';


export default function RecurringInvoiceModal({ status, toggle, setData, data, emptyDataHandler, mainData }) {
    console.log(data);
    const dispatch = useDispatch()
    const { supplier_list_data, invoice_chart_list_data } = useSelector(state => state.Bills)
    const [state, setState] = useState({ type: 'Owner', taxCheckInvoice: 0 })
    console.log(state);
    const [includeBtn, setIncludeBtn] = useState(state.type == 'Owner' ? true : false);
    const [selectedSupplier, setSelectedSupplier] = useState(null);
    const [optionGroupSupplier, setOptionGroupSupplier] = useState([

    ]);

    const [selectedInvoiceChart, setSelectedInvoiceChart] = useState(null);
    const [optionGroupInvoiceChart, setOptionGroupInvoiceChart] = useState([]);
    const [invoiceChecker, setInvoiceChecker] = useState(false);

    useEffect(() => {
        dispatch(supplierList())
        dispatch(invoiceChartList())

        if (data.id) {
            setState(prev => ({
                ...prev,
                // includeBtn: data.type == 'Owner' ? true : false,
                supplier: data.supplier, supplier_folio_id: data.supplier_folio_id,
                invoiceChart: data.invoiceChart, account_name: data.account_name,
                invoiceDetails: data.invoiceDetails,
                totalInvoiceAmount: data.totalInvoiceAmount,
                taxCheckInvoice: data.taxCheckInvoice == 1 ? 1 : 0,
                id: data.id


            }))

            setIncludeBtn(data.type == 'Owner' ? true : false,)

            setInvoiceChecker(data.taxCheckInvoice == 1 ? true : false)

            setSelectedSupplier({ label: data.supplier_name, value: data.supplier });

            setSelectedInvoiceChart({ label: data.account_name, value: data.invoiceChart });

        }
    }, [])



    useEffect(() => {
        if (includeBtn == true || includeBtn == false) {
            setState(prev => ({ ...prev, type: includeBtn ? 'Owner' : 'Supplier' }))

        }
        let optionChart;
        if (invoice_chart_list_data) {
            optionChart = invoice_chart_list_data?.data.map(item => ({
                label: item.account_number + ' - ' + item.account_name, value: item.id,
            }));
            setOptionGroupInvoiceChart(optionChart);
        }

        let optionSupplier;
        if (supplier_list_data?.data) {
            optionSupplier = supplier_list_data?.data.map(item => ({
                label: item.reference, value: item.id, supplier_folio_id: item.supplier_details?.id,
            }));
            setOptionGroupSupplier(optionSupplier);
        }
    }, [supplier_list_data, invoice_chart_list_data, includeBtn])


    const resetHandler = () => {
        setState({ type: 'Owner', taxCheckInvoice: 0 })
        setIncludeBtn(true)
        setSelectedSupplier(null)
        setSelectedInvoiceChart(null)
        setInvoiceChecker(false)
        emptyDataHandler()
    }

    const cancelHandler = () => {
        resetHandler()
        toggle()
    }

    const toggleIncludeBtn = () => {
        setIncludeBtn(prev => !prev)
    }
    const handleSelectSupplier = e => {
        setState({ ...state, supplier_name: e.label, supplier: e.value, supplier_folio_id: e.supplier_folio_id, })
        setSelectedSupplier(e);
    };

    const handleSelectInvoiceChart = e => {

        setState({ ...state, invoiceChart: e.value, account_name: e.label })
        setSelectedInvoiceChart(e);
    };

    const handleState = (e) => {
        setState({ ...state, [e.target.name]: e.target.value })
    }

    const checkHandlerInvoice = e => {
        if (e.target.value) {
            setState(prev => { return { ...prev, taxCheckInvoice: prev.taxCheckInvoice === 0 ? 1 : 0 } });
            setInvoiceChecker(prev => !prev);
        }
    }

    var uniq = 'id' + (new Date()).getTime();

    const handler = () => {
        if (data.id) {
            // setData(prev => ([...prev, { ...state }]));
            const handlerData = mainData.filter(item => item.id != state.id)
            console.log(handlerData);
            // return
            setData([...handlerData, state])

        } else {
            const handlerData = [...mainData]
            console.log(handlerData);
            // return
            setData(prev => ([...prev, { ...state, id: uniq }]));

        }
        resetHandler()
        toggle()
    }

    return (
        <>
            <Card>
                <CardBody>
                    <Modal
                        isOpen={status}
                        toggle={toggle}
                        size='lg'
                    >
                        <div className="modal-header">
                            <h5 className="modal-title mt-0" id="myModalLabel">
                                {data.id ? 'Edit' : 'New'} Recurring Invoice

                            </h5>
                            <button
                                type="button"
                                onClick={cancelHandler
                                }
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <Row className="mb-3 d-flex align-items-center">
                                <Col md={3}>
                                    <Label>
                                        From
                                    </Label>
                                </Col>
                                <Col md={6}>
                                    <div className="btn-group btn-group-justified">
                                        <div className="btn-group">
                                            <Button
                                                color={
                                                    includeBtn
                                                        ? "secondary"
                                                        : "light"
                                                }
                                                onClick={
                                                    toggleIncludeBtn
                                                }
                                                className='btn w-md'
                                            >
                                                {includeBtn ? (
                                                    <i className="bx bx-comment-check"></i>
                                                ) : null}
                                                <span>
                                                    {" "}
                                                    Owner
                                                </span>
                                            </Button>
                                        </div>

                                        <div className="btn-group">
                                            <Button
                                                color={
                                                    includeBtn == false
                                                        ? "secondary"
                                                        : "light"
                                                }
                                                onClick={
                                                    toggleIncludeBtn
                                                }
                                                className='btn w-md'
                                            >
                                                {includeBtn == false ? (
                                                    <i className="bx bx-comment-check"></i>
                                                ) : null}
                                                <span>
                                                    {" "}
                                                    Supplier
                                                </span>
                                            </Button>
                                        </div>
                                    </div>
                                </Col>
                            </Row>

                            {includeBtn == false &&
                                <Row className="mb-3 d-flex align-items-center">
                                    <Col md={3} >

                                        <Label>Select Supplier</Label>
                                    </Col>
                                    <Col md={8}>
                                        <div className="select2-container">
                                            <Select
                                                value={selectedSupplier}
                                                onChange={handleSelectSupplier}
                                                options={optionGroupSupplier}
                                                classNamePrefix="select2-selection"
                                                placeholder='Supplier'
                                            />
                                        </div>
                                    </Col>
                                </Row>}

                            <Row className="mb-3 d-flex align-items-center">
                                <Col md={3}><Label>Select Account</Label></Col>
                                <Col md={8}>
                                    <div className="select2-container">

                                        <Select
                                            value={selectedInvoiceChart}
                                            onChange={handleSelectInvoiceChart}
                                            options={optionGroupInvoiceChart}
                                            classNamePrefix="select2-selection"
                                            placeholder='Invoice Chart Account'
                                        />
                                    </div>
                                </Col>
                            </Row>

                            <Row className="mb-3 d-flex align-items-center">
                                <Col md={3}><Label>Details</Label></Col>
                                <Col md={8}>
                                    <div className="row">
                                        <div className="col-md-12">

                                            <input
                                                className="form-control"
                                                type="text"
                                                placeholder="Details"
                                                name="invoiceDetails"
                                                onChange={handleState}
                                                value={state.invoiceDetails}
                                            />
                                        </div>
                                    </div>
                                </Col>
                            </Row>

                            <Row className="mb-3 d-flex align-items-center">
                                <Col md={3}><Label>Amount</Label></Col>
                                <Col md={8}>
                                    <Row className="d-flex align-items-center">
                                        <Col md={6} className="d-flex">
                                            <div className="d-flex flex-column">
                                                <input
                                                    className="form-control"
                                                    name="totalInvoiceAmount"
                                                    id="totalInvoiceAmount"
                                                    type="text"
                                                    placeholder="0.00"
                                                    style={{
                                                        borderTopRightRadius: 0,
                                                        borderBottomRightRadius: 0,
                                                    }}
                                                    value={
                                                        state.totalInvoiceAmount
                                                    }
                                                    onChange={
                                                        handleState
                                                    }
                                                />
                                            </div>
                                            <span className="input-group-append">
                                                <span
                                                    className="input-group-text"
                                                    style={{
                                                        borderTopLeftRadius: 0,
                                                        borderBottomLeftRadius: 0,
                                                    }}
                                                >
                                                    ৳
                                                </span>
                                            </span>
                                        </Col>
                                        <Col md={6} >
                                            <div className="form-check mb-3">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id="defaultCheck1"
                                                    name="taxCheckInvoice"
                                                    onClick={e => checkHandlerInvoice(e)}
                                                    checked={invoiceChecker === true ? true : false}
                                                />
                                                <label
                                                    className="form-check-label"
                                                    htmlFor="defaultCheck1"
                                                >
                                                    Tax inc
                                                </label>
                                            </div>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>

                            <Row className="mb-3 d-flex align-items-center">
                                <Col md={3}></Col>
                                <Col md={8}>
                                    This amount will be added to each rent statement.

                                </Col>
                            </Row>

                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                onClick={cancelHandler}
                                className="btn btn-secondary"
                                data-dismiss="modal"
                            >
                                <i className='fas fa-times me-1' />
                                Cancel
                            </button>
                            <button
                                type="button"
                                className="btn btn-info"
                                onClick={handler}
                            >
                                <i className='fas fa-check me-1' />

                                {data.id ? 'Ok' : 'Add'}
                            </button>
                        </div>
                    </Modal>
                </CardBody>
            </Card>

        </>
    )
}
