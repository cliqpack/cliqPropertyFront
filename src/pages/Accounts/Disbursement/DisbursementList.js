import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withRouter, useHistory } from "react-router-dom";
import classnames from "classnames";
import {
    Card,
    CardBody,
    Col,
    Container,
    Row,
    Nav,
    NavItem,
    NavLink,
    TabContent,
    TabPane,
    Label,
    Input,
} from "reactstrap";
import toastr from "toastr";
import Loder from "components/Loder/Loder";

import { dueDisbursementList, dueDisbursementListFresh, previewDisbursement, previewDisbursementFresh, storeDisbursement, storeDisbursementFresh, storeSupplierDisbursement, storeSupplierDisbursementFresh } from "store/actions";
import moment from "moment";
import Breadcrumbs from "components/Common/Breadcrumb";
import RemotePagination from "pages/Task/RemotePagination";
document.title = "CliqProperty";

function DisbursementList(props) {
    const [loader, setLoader] = useState(false);
    const [dataState, setDataState] = useState({
        page: 1,
        data: [],
        sizePerPage: 10,
        dataLength: 0,
        loading: false,
    });
    const [search, setSearch] = useState('');
    const [data, setData] = useState(
        [
            { id: 1, reference: 'Himel vai', property: 'Bent st 01', type: 'Cash', last_date: '22-11-2022', due_date: '22-11-2022', withhold: 500, bills_due: '', fee_raised: '', payout: 230, preview: '' },
            { id: 2, reference: 'Alif', property: 'Lofty', type: 'Card', last_date: '23-11-2022', due_date: '23-11-2022', withhold: 200, bills_due: '', fee_raised: 300, payout: 230, preview: '' },
            { id: 3, reference: 'Karim', property: 'Cambridge', type: 'Cheque', last_date: '24-11-2022', due_date: '24-11-2022', withhold: '', bills_due: 200, fee_raised: '', payout: 230, preview: '' },

        ]
    );
    const [includeSupplier, setIncludeSupplier] = useState(false);
    const [disbursementData, setDisbursementData] = useState([]);
    const [allOwnerDisbursementData, setAllOwnerDisbursementData] = useState([]);
    const [allSupplierDisbursementData, setAllSupplierDisbursementData] = useState([]);
    const [state, setState] = useState({
        activeTab: "1",
        page: 1,
        sizePerPage: 10,
        productData: data,
        DUEOWNselected: [],
        ALLOWNselected: [],
        ALLSUPselected: [],
    });
    const history = useHistory();

    const toggle = (tab, type) => {
        props.dueDisbursementListFresh();
        if (state.activeTab !== tab) {
            setState({
                ...state,
                activeTab: tab,
                DUEOWNselected: tab === '1' ? [...state.DUEOWNselected] : [],
                ALLOWNselected: tab === '2' ? [...state.ALLOWNselected] : [],
                ALLSUPselected: tab === '3' ? [...state.ALLSUPselected] : [],
            });
        }
        setSearch('');
        if (type === 'DueOwners') {
            setDataState(prev => ({ ...prev, data: [], loading: true }));
            props.dueDisbursementList(type, dataState.page, dataState.sizePerPage, null, 'next_disburse_date', 'desc');
        } else if (type === 'AllOwners') {
            setDataState(prev => ({ ...prev, data: [], loading: true }));
            props.dueDisbursementList(type, dataState.page, dataState.sizePerPage, null, 'next_disburse_date', 'desc');
        } else if (type === 'AllSuppliers') {
            setDataState(prev => ({ ...prev, data: [], loading: true }));
            props.dueDisbursementList(type, dataState.page, dataState.sizePerPage, null, 'folio_code', 'desc');
        }
    };

    const startLoader = () => setLoader(true);
    const endLoader = () => setLoader(false);


    useEffect(() => {
        if (props.store_supplier_disbursement_loading === "Success") {
            toastr.success("Disbursed");
            setState({ ...state, DUEOWNselected: [], ALLOWNselected: [], ALLSUPselected: [] });
            setAllSupplierDisbursementData([]);
            props.storeSupplierDisbursementFresh();
            props.dueDisbursementList("AllSuppliers", dataState.page, dataState.sizePerPage, null, 'folio_code', 'desc');
            endLoader()
        }
    }, [props.store_supplier_disbursement_loading]);

    useEffect(() => {
        if (props.disbursement_preview_loading === 'Success') {
            endLoader();
            props.previewDisbursementFresh();
        }
        if (props.disbursement_preview_loading === 'Failed') {
            endLoader();
            toastr.warning("Something went wrong!");
            props.previewDisbursementFresh();
        }
    }, [props.disbursement_preview_loading]);

    console.log(props.due_disbursement_list_loading);
    useEffect(() => {
        if (props.due_disbursement_list_loading === 'Success') {
            setDataState((prev) => ({
                ...prev,
                page: Number(props.due_disbursement_list_data?.page),
                data: props.due_disbursement_list_data?.data,
                sizePerPage: props.due_disbursement_list_data?.sizePerPage,
                dataLength: props.due_disbursement_list_data?.length,
                loading: false,
                owners: props.due_disbursement_list_data?.owners,
                withdrawals: props.due_disbursement_list_data?.withdrawal,
            }));
            props.dueDisbursementListFresh();
        }
    }, [props.due_disbursement_list_loading])
    useEffect(() => {
        if (props.store_disbursement_loading === "Success") {
            toastr.success("Disbursed");
            props.storeDisbursementFresh();
            setDisbursementData([]);
            setAllOwnerDisbursementData([])
            setState({ ...state, DUEOWNselected: [], ALLOWNselected: [], ALLSUPselected: [] });
            if (state.activeTab === "1") {
                props.dueDisbursementList("DueOwners", dataState.page, dataState.sizePerPage, null, 'next_disburse_date', 'desc');
            } else if (state.activeTab === "2") {
                props.dueDisbursementList("AllOwners", dataState.page, dataState.sizePerPage, null, 'next_disburse_date', 'desc');
            }
            endLoader()
        }
    }, [props.store_disbursement_loading])

    // Plan based
    const totalPayout = (row) => {
        let moneyIn = row?.money_in ? row?.money_in : 0;
        let invoices = row.total_due_invoice_sum_amount ? row.total_due_invoice_sum_amount : 0;
        let rent = row.total_due_rent_sum_amount ? row.total_due_rent_sum_amount : 0;
        let bills = row.total_bills_amount_sum_amount ? row.total_bills_amount_sum_amount : 0;
        let withhold = row.withhold_amount ? row.withhold_amount : 0;
        let moneyOut = row.money_out ? row.money_out : 0;
        let uncleared = row.uncleared ? row.uncleared : 0;
        let deposit = row.total_deposit_sum_amount ? row.total_deposit_sum_amount : 0;
        let remainingAmount = row.opening_balance ? row.opening_balance : 0;
        let payout = parseInt(moneyIn) + parseInt(remainingAmount) - parseInt(moneyOut) - parseInt(bills) - parseInt(withhold) - parseInt(uncleared);
        return payout;
    }
    const dueAmount = (cell, row) => {
        let payout = totalPayout(row)
        if (payout > 0) {
            return `${payout}৳`;
        } else return '0৳';

    }

    const payBy = (cell, row) => {
        let payby = row?.owner_payment?.map((item, idx) => {
            return <span key={idx}>{idx > 0 ? ', ' : ''}{item.method}</span>
        });
        return <span>{payby}</span>;
    };

    const supplierBillPending = (cell, row) => {
        return <span>{row.total_bills_pending_sum_amount ? `${row.total_bills_pending_sum_amount}৳` : '0৳'}</span>
    };
    const supplierInvoicePending = (cell, row) => {
        return <span>{row.total_due_invoice_sum_amount ? `${(+row.total_due_invoice_sum_amount - +row.total_due_invoice_sum_paid)}৳` : '0৳'}</span>
    };
    const supplierBalance = (cell, row) => {
        return <span>{row.balance}৳</span>
    };
    const payBySupplier = (cell, row) => {
        let payby = row?.supplier_payment?.map((item, idx) => {
            return <span key={idx}>{idx > 0 ? ', ' : ''}{item.payment_method}</span>
        });
        return <span>{payby}</span>;
    };

    const ownerBillPending = (cell, row) => {
        return <span>{row.total_bills_amount_sum_amount ? '৳' + row.total_bills_amount_sum_amount : '0৳'}</span>
    };
    const ownerInvoicePending = (cell, row) => {
        return <span>{row.total_due_invoice_sum_amount ? '৳' + row.total_due_invoice_sum_amount : '0৳'}</span>
    };
    const withholdRef = (cell, row) => {
        return <span>{row.withhold_amount ? row.withhold_amount : 0}৳</span>
    }
    const previewDoc = (row) => {
        startLoader();
        props.previewDisbursement(row);
    }
    const docPathFormatter = (cell, row) => {
        let payout = totalPayout(row);
        if (payout > 0) {
            return <div onClick={() => previewDoc(row)}><span className="text-primary"><i className="fab fa-dochub"></i></span></div>
        } else return <span></span>
    }
    const columnData = [
        {
            dataField: "owner_contacts.reference",
            text: "Reference",
            // formatter: ref,
            // sort: true,
        },
        {
            dataField: "owner_properties.reference",
            text: "Property",
            // sort: true,
        },
        {
            dataField: "folio_code",
            text: "Folio",
            sort: true,
        },
        {
            dataField: "next_disburse_date",
            text: "Due",
            sort: true,
        },
        {
            dataField: "",
            text: "Pay By",
            // sort: true,
            formatter: payBy
        },
        {
            dataField: "withhold_amount",
            text: "Withhold",
            formatter: withholdRef,
            // sort: true,
        },
        {
            dataField: "total_bills_amount_sum_amount",
            text: "Bills Due",
            formatter: ownerBillPending,
            // sort: true,
            // events: {
            //     onClick: (e, column, columnIndex, row, rowIndex) => {
            //         billDetails(e, row);
            //     }
            // }
        },
        {
            dataField: "total_due_invoice_sum_amount",
            text: "Pending Invoices",
            formatter: ownerInvoicePending,
            // sort: true,
            // events: {
            //     onClick: (e, column, columnIndex, row, rowIndex) => {
            //         billDetails(e, row);
            //     }
            // }
        },
        // {
        //     dataField: "fee_raised",
        //     text: "Fees Raised",
        //     sort: true,
        //     // formatter: feeRaised,
        //     formatter: planRaised,
        // },
        {
            dataField: "",
            text: "Payout",
            formatter: dueAmount,
            // sort: true,
        },
        {
            dataField: "preview",
            text: "Preview",
            formatter: docPathFormatter,
            // sort: true,
        },
    ];

    const columnAllSupplierData = [
        {
            dataField: "supplier_contact.reference",
            text: "Reference",
            // formatter: ref,
            // sort: true,
        },
        {
            dataField: "folio_code",
            text: "Folio",
            sort: true,
        },
        {
            dataField: "",
            text: "Pay By",
            // sort: true,
            formatter: payBySupplier
        },
        {
            dataField: "total_bills_pending_sum_amount",
            text: "Bills Pending",
            formatter: supplierBillPending,
            // sort: true,
        },
        {
            dataField: "total_due_invoice_sum_amount",
            text: "Invoices Pending",
            formatter: supplierInvoicePending,
            // sort: true,
        },
        {
            dataField: "balance",
            text: "Balance",
            formatter: supplierBalance,
            sort: true,
        },
    ];

    const handleTableChange = (type, { page, sizePerPage, sortField, sortOrder }) => {
        setDataState(prev => ({ ...prev, loading: true }));
        if (!search) {
            if (sortField) {
                state.activeTab == "1" ?
                    props.dueDisbursementList('DueOwners', page, sizePerPage, null, sortField, sortOrder)
                    : state.activeTab == "2" ?
                        props.dueDisbursementList('AllOwners', dataState.page, dataState.sizePerPage, null, sortField, sortOrder) :
                        props.dueDisbursementList('AllSuppliers', page, sizePerPage, null, sortField, sortOrder)
            } else {
                state.activeTab == "1" ?
                    props.dueDisbursementList('DueOwners', page, sizePerPage, null, 'next_disburse_date', 'desc')
                    : state.activeTab == "2" ?
                        props.dueDisbursementList('AllOwners', dataState.page, dataState.sizePerPage, null, 'next_disburse_date', 'desc') :
                        props.dueDisbursementList('AllSuppliers', page, sizePerPage, null, 'folio_code', 'desc')
            }
        } else {
            if (sortField) {
                state.activeTab == "1" ?
                    props.dueDisbursementList('DueOwners', page, sizePerPage, search, sortField, sortOrder)
                    : state.activeTab == "2" ?
                        props.dueDisbursementList('AllOwners', page, sizePerPage, search, sortField, sortOrder) :
                        props.dueDisbursementList('AllSuppliers', page, sizePerPage, search, sortField, sortOrder)
            } else {
                state.activeTab == "1" ?
                    props.dueDisbursementList('DueOwners', page, sizePerPage, search, 'next_disburse_date', 'desc')
                    : state.activeTab == "2" ?
                        props.dueDisbursementList('AllOwners', page, sizePerPage, search, 'next_disburse_date', 'desc') :
                        props.dueDisbursementList('AllSuppliers', page, sizePerPage, search, 'folio_code', 'desc')
            }
        }
    }
    const handleSearchState = (e) => {
        setSearch(e.target.value);
    }

    const defaultSorted = [
        {
            dataField: "next_disburse_date",
            order: "desc",
        },
    ];
    const defaultSupplierSorted = [
        {
            dataField: "folio_code",
            order: "desc",
        },
    ];

    const pageOptions = {
        sizePerPage: 10,
        totalSize: data.length, // replace later with size(customers),
        custom: true,
    };

    // Select All Button operation
    const selectRow1 = {
        mode: "checkbox",
        onSelect: (row, isSelect, rowIndex, e) => {
            let value = [...disbursementData];
            if (isSelect) {
                value.push(row);
                setDisbursementData(value);
                setState({ ...state, DUEOWNselected: [...state.DUEOWNselected, row.id] })
            } else {
                let index = value.indexOf(row);
                value.splice(index, 1);
                setDisbursementData(value);
                setState({ ...state, DUEOWNselected: state.DUEOWNselected.filter(data => data !== row.id) })
            }
        },
        onSelectAll: (isSelect, rows, e) => {
            if (isSelect) {
                setDisbursementData(rows);
                setState({ ...state, DUEOWNselected: rows.map(item => item.id) });
            } else {
                setState({ ...state, DUEOWNselected: [] });
                setDisbursementData([]);
            }
        },
        selected: [...state.DUEOWNselected]
    };
    const selectRow2 = {
        mode: "checkbox",
        onSelect: (row, isSelect, rowIndex, e) => {
            let value = [...allOwnerDisbursementData];
            if (isSelect) {
                value.push(row);
                setAllOwnerDisbursementData(value);
                setState({ ...state, ALLOWNselected: [...state.ALLOWNselected, row.id] })
            } else {
                let index = value.indexOf(row);
                value.splice(index, 1);
                setAllOwnerDisbursementData(value);
                setState({ ...state, ALLOWNselected: state.ALLOWNselected.filter(data => data !== row.id) })
            }
        },
        onSelectAll: (isSelect, rows, e) => {
            if (isSelect) {
                setAllOwnerDisbursementData(rows);
                setState({ ...state, ALLOWNselected: rows.map(item => item.id) });
            } else {
                setAllOwnerDisbursementData([])
                setState({ ...state, ALLOWNselected: [] });
            };
        },
        selected: [...state.ALLOWNselected]
    };
    const selectRow3 = {
        mode: "checkbox",
        onSelect: (row, isSelect, rowIndex, e) => {
            let value = [...allSupplierDisbursementData];
            if (isSelect) {
                value.push(row);
                setAllSupplierDisbursementData(value);
                setState({ ...state, ALLSUPselected: [...state.ALLSUPselected, row.id] })
            } else {
                let index = value.indexOf(row);
                value.splice(index, 1);
                setAllSupplierDisbursementData(value);
                setState({ ...state, ALLSUPselected: state.ALLSUPselected.filter(data => data !== row.id) })
            }
        },
        onSelectAll: (isSelect, rows, e) => {
            if (isSelect) {
                setAllSupplierDisbursementData(rows);
                setState({ ...state, ALLSUPselected: rows.map(item => item.id) });
            } else {
                setAllSupplierDisbursementData([])
                setState({ ...state, ALLSUPselected: [] });
            };
        },
        selected: [...state.ALLSUPselected]
    };

    const handleDueOwnerSelectedData = () => {
        startLoader()
        props.storeDisbursement(disbursementData, includeSupplier)
        setDisbursementData([])
    }
    const handleAllOwnerSelectedData = () => {
        startLoader()
        props.storeDisbursement(allOwnerDisbursementData);
        setAllOwnerDisbursementData([])
    }
    const handleAllSupplierSelectedData = () => {
        startLoader()
        props.storeSupplierDisbursement(allSupplierDisbursementData)
        setAllSupplierDisbursementData([])
    }
    const pushToWithdrawal = () => {
        history.push(`/withdrawalsList/${moment().format('MM')}/${moment().format('YYYY')}`)
    }

    return (
        <div className="page-content">
            <Container fluid={true}>
                <Breadcrumbs title="Disbursement" breadcrumbItem="Accounts" />

                <Row>
                    <Col lg={12}>
                        <div>
                            {/* <Card>
                                <CardBody>
                                    <h4 className="ms-2 text-primary">Disbursement</h4>
                                </CardBody>
                            </Card> */}
                            <Row>
                                <Col md={9}>
                                    <Row>
                                        <Col md={4}>
                                            <Card className="mini-stats-wid" onClick={pushToWithdrawal} style={{ cursor: 'pointer' }}>
                                                <CardBody>
                                                    <div className="d-flex flex-wrap">
                                                        <div className="me-3">
                                                            <p className="text-muted mb-2">Withdrawls</p>
                                                            <h5 className="mb-0">{dataState?.withdrawals}</h5>
                                                        </div>

                                                        <div className="avatar-sm ms-auto">
                                                            <div className="avatar-title bg-light rounded-circle text-primary font-size-20">
                                                                <i className="fas fa-upload"></i>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </CardBody>
                                            </Card>
                                        </Col>
                                        {/* <Col md={4}>
                                            <Card className="mini-stats-wid">
                                                <CardBody>
                                                    <div className="d-flex flex-wrap">
                                                        <div className="me-3">
                                                            <p className="text-muted mb-2">Bill Approvals</p>
                                                            <h5 className="mb-0">4</h5>
                                                        </div>

                                                        <div className="avatar-sm ms-auto">
                                                            <div className="avatar-title bg-light rounded-circle text-primary font-size-20">
                                                                <i className="fas fa-indent"></i>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </CardBody>
                                            </Card>
                                        </Col> */}
                                    </Row>
                                </Col>
                                <Col md={3}>
                                    <Card className="mini-stats-wid">
                                        <CardBody>
                                            <div className="d-flex flex-wrap">
                                                <div className="me-3">
                                                    <p className="text-muted mb-2">Owners</p>
                                                    <h5 className="mb-0">{dataState?.owners}</h5>
                                                </div>

                                                <div className="avatar-sm ms-auto">
                                                    <div className="avatar-title bg-light rounded-circle text-primary font-size-20">
                                                        <i className="fas fa-home"></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                            <Card>
                                <CardBody>
                                    <Row >
                                        <Col sm={12} md={12} lg={9}>
                                            <Nav className="icon-tab nav-justified">
                                                <NavItem>
                                                    <NavLink
                                                        style={{ cursor: "pointer" }}
                                                        className={classnames({
                                                            active: state.activeTab === "1",
                                                        })}
                                                        onClick={() => {
                                                            toggle("1", 'DueOwners');
                                                        }}
                                                    >
                                                        Due Owners
                                                    </NavLink>
                                                </NavItem>
                                                <NavItem>
                                                    <NavLink
                                                        style={{ cursor: "pointer" }}
                                                        className={classnames({
                                                            active: state.activeTab === "2",
                                                        })}
                                                        onClick={() => {
                                                            toggle("2", 'AllOwners');
                                                        }}
                                                    >
                                                        All Owners
                                                    </NavLink>
                                                </NavItem>
                                                <NavItem>
                                                    <NavLink
                                                        style={{ cursor: "pointer" }}
                                                        className={classnames({
                                                            active: state.activeTab === "3",
                                                        })}
                                                        onClick={() => {
                                                            toggle("3", 'AllSuppliers');
                                                        }}
                                                    >
                                                        All Suppliers
                                                    </NavLink>
                                                </NavItem>
                                            </Nav>
                                        </Col>

                                    </Row>
                                    <TabContent
                                        activeTab={state.activeTab}
                                        className="p-3 text-muted"
                                    >
                                        <TabPane tabId="1">
                                            <Row>
                                                <div className="d-flex justify-content-between">
                                                    <div className="d-flex justify-content-start">
                                                        <div style={{ marginTop: "50px" }}>
                                                            <button type="button" className="btn btn-sm btn-info" onClick={handleDueOwnerSelectedData} disabled={disbursementData.length > 0 ? false : true}>
                                                                <i className="fas fa-upload"></i> Disburse
                                                            </button>
                                                        </div>
                                                        <div className="form-check ms-3" style={{ marginTop: "50px" }}>
                                                            <Label
                                                                for="defaultCheck3"
                                                                className="form-check-label"
                                                            >
                                                                Include all suppliers
                                                            </Label>
                                                            <Input
                                                                name="communication"
                                                                type="checkbox"
                                                                className="form-check-input"
                                                                value="SMS"
                                                                id="defaultCheck3"
                                                                disabled={disbursementData.length > 0 ? false : true}
                                                                checked={
                                                                    includeSupplier === true
                                                                        ? true
                                                                        : false
                                                                }
                                                                onClick={() => setIncludeSupplier(prev => !prev)}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <RemotePagination
                                                    data={dataState?.data.length > 0 ? dataState.data : []}
                                                    page={dataState.page}
                                                    sizePerPage={dataState.sizePerPage}
                                                    totalSize={dataState.dataLength}
                                                    onTableChange={handleTableChange}
                                                    columns={columnData}
                                                    search={search}
                                                    onSearchState={handleSearchState}
                                                    loading={dataState.loading}
                                                    selectRow={selectRow1}
                                                    defaultSorted={defaultSorted}
                                                />
                                            </Row>
                                        </TabPane>
                                        <TabPane tabId="2">
                                            <Row>
                                                <div className="d-flex justify-content-between">
                                                    <div style={{ marginTop: "50px" }}>
                                                        <button type="button" className="btn btn-sm btn-info" onClick={handleAllOwnerSelectedData} disabled={allOwnerDisbursementData.length > 0 ? false : true}>
                                                            <i className="fas fa-upload"></i> Disburse
                                                        </button>
                                                    </div>
                                                </div>
                                                <RemotePagination
                                                    data={dataState?.data.length > 0 ? dataState.data : []}
                                                    page={dataState.page}
                                                    sizePerPage={dataState.sizePerPage}
                                                    totalSize={dataState.dataLength}
                                                    onTableChange={handleTableChange}
                                                    columns={columnData}
                                                    search={search}
                                                    onSearchState={handleSearchState}
                                                    loading={dataState.loading}
                                                    selectRow={selectRow2}
                                                    defaultSorted={defaultSorted}
                                                />
                                            </Row>
                                        </TabPane>
                                        <TabPane tabId="3">
                                            <Row>
                                                <div className="d-flex justify-content-between">
                                                    <div style={{ marginTop: "50px" }}>
                                                        <button type="button" className="btn btn-sm btn-info" onClick={handleAllSupplierSelectedData} disabled={allSupplierDisbursementData.length > 0 ? false : true}>
                                                            <i className="fas fa-upload"></i> Disburse
                                                        </button>
                                                    </div>
                                                </div>
                                                <RemotePagination
                                                    data={dataState?.data.length > 0 ? dataState.data : []}
                                                    page={dataState.page}
                                                    sizePerPage={dataState.sizePerPage}
                                                    totalSize={dataState.dataLength}
                                                    onTableChange={handleTableChange}
                                                    columns={columnAllSupplierData}
                                                    search={search}
                                                    onSearchState={handleSearchState}
                                                    loading={dataState.loading}
                                                    selectRow={selectRow3}
                                                    defaultSorted={defaultSupplierSorted}
                                                />
                                            </Row>
                                        </TabPane>
                                    </TabContent>
                                </CardBody>
                            </Card>

                        </div>
                    </Col>
                </Row>
            </Container>
            <Loder status={loader} />
        </div >
    );
}

const mapStateToProps = gstate => {
    const {
        due_disbursement_list_data,
        due_disbursement_list_loading,

        store_disbursement_loading,
        store_supplier_disbursement_loading,

        disbursement_preview_loading,
    } = gstate.Disbursement;
    return {
        due_disbursement_list_data,
        due_disbursement_list_loading,

        store_disbursement_loading,
        store_supplier_disbursement_loading,

        disbursement_preview_loading,
    };
};

export default withRouter(connect(mapStateToProps, {
    dueDisbursementList, dueDisbursementListFresh, previewDisbursement, previewDisbursementFresh, storeDisbursement, storeDisbursementFresh, storeSupplierDisbursement, storeSupplierDisbursementFresh
})(DisbursementList));
