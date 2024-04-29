import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { withRouter, useHistory, Link } from "react-router-dom";
import classnames from "classnames";
import {
    Card,
    CardBody,
    Col,
    Container,
    Row,
    CardText,
    Nav,
    NavItem,
    NavLink,
    TabContent,
    TabPane,
    ButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from "reactstrap";
import { tenantInfoFresh, transactionsList, transactionsInfoListFresh, ImportBankFile, ImportBankFileFresh } from "store/actions";
import AddReceipt from "./AddReceipt"
import FolioReceipt from './FolioReceipt';
import FolioWithdraw from "./FolioWithdraw";
import Journal from './Journal';
import DatatableTables2 from '../../Tables/DatatableTables2';
import TransactionsInfoModal from "./TransactionsInfoModal";
import moment from "moment";
import TransactionsInfoModalReverse from "./TransactionsInfoModalReverse";
import TransactionsInfoModalEdit from "./TransactionsInfoModalEdit";
import ClearFundModal from "./clearFundModal";
import Breadcrumbs from "components/Common/Breadcrumb";
import AddDepositReceipt from "./AddDepositReceipt";



document.title = "Transactions";


function TransactionList(props) {
    const history = useHistory()
    const inputRef = useRef();
    const [state, setState] = useState({
        activeTab: "1",
        drp_link: false,
        transactionInfoModal: false,
        transactionInfoModalReverse: false,
        transactionInfoModalEdit: false,
        clearFundModal: false
    });
    const [seen, setSeen] = useState(false);

    const toggleModalTransactions = () => {
        setState(prev => ({ ...prev, transactionInfoModal: !prev.transactionInfoModal }));
        props.transactionsInfoListFresh();
    };
    const toggleModalTransactionsReverse = (id) => {
        setState(prev => ({ ...prev, transactionInfoModalReverse: !prev.transactionInfoModalReverse, receipt_id: id }));
    };
    const toggleModalTransactionsEdit = () => {
        setState(prev => ({ ...prev, transactionInfoModalEdit: !prev.transactionInfoModalEdit }));
    };
    const toggleClearFund = () => {
        setState(prev => ({ ...prev, clearFundModal: !prev.clearFundModal }));
    };
    const [showFolioReceiptModal, setShowFolioReceiptModal] = useState(false);
    const toggleFolioReceiptModal = () => setShowFolioReceiptModal(prev => !prev)
    const [showFolioWithdrawModal, setShowFolioWithdrawModal] = useState(false);
    const toggleFolioWithdrawModal = () => setShowFolioWithdrawModal(prev => !prev)
    const [showJournalModal, setShowJournalModal] = useState(false);
    const toggleJournalModal = () => setShowJournalModal(prev => !prev)
    const [showModalAdd, setShowModalAdd] = useState(false);
    const [showDepositModal, setShowDepositModal] = useState(false);
    const toggleAdd = () => {
        setShowModalAdd(prev => !prev)
        props.tenantInfoFresh();
    };
    const toggleDepositModal = (from = null) => {
        if (from === 'Close') {
            props.tenantInfoFresh();
        } else {
            setShowModalAdd(prev => !prev)
        }
        setShowDepositModal(prev => !prev);
    };
    const toggle = tab => {
        if (state.activeTab !== tab) {
            setState({
                ...state,
                activeTab: tab,
            });
        };
        if (tab == 1) {
            props.transactionsList("this_month");
        } else if (tab == 2) {
            props.transactionsList("last_month");
        } else {
            props.transactionsList("all");
        };
    };
    const transactionsDetails = (e, column, columnIndex, row, rowIndex) => {
        setState({ ...state, transactionId: row.id, transactionsDetails: row })
        toggleModalTransactions();
    };
    const amountRef = (cell, row) => {
        return <span>{cell}৳</span>
    }
    const typeFormatter = (cell, row) => {
        return <span>
            {cell} {row.reversed === 1 ? <i className="fas fa-undo"></i> : ''}
        </span>
    }
    const activeData = [
        {
            dataField: "id",
            text: "Audit",
            sort: true,
            events: {
                onClick: (e, column, columnIndex, row, rowIndex) => {
                    transactionsDetails(e, column, columnIndex, row, rowIndex);
                },
            },
        },
        {
            dataField: "receipt_date",
            text: "Date",
            sort: true,
            events: {
                onClick: (e, column, columnIndex, row, rowIndex) => {
                    transactionsDetails(e, column, columnIndex, row, rowIndex);
                },
            },
        },
        {
            dataField: "ref",
            text: "Ref",
            sort: true,
            events: {
                onClick: (e, column, columnIndex, row, rowIndex) => {
                    transactionsDetails(e, column, columnIndex, row, rowIndex);
                },
            },

        },
        {
            dataField: "new_type",
            text: "Type",
            sort: true,
            formatter: typeFormatter,
            events: {
                onClick: (e, column, columnIndex, row, rowIndex) => {
                    transactionsDetails(e, column, columnIndex, row, rowIndex);
                },
            },
        },
        {
            dataField: "property.reference",
            text: "Property",
            sort: true,
            events: {
                onClick: (e, column, columnIndex, row, rowIndex) => {
                    transactionsDetails(e, column, columnIndex, row, rowIndex);
                },
            },
        },
        {
            dataField: "summary",
            text: "Summary",
            sort: true,
            events: {
                onClick: (e, column, columnIndex, row, rowIndex) => {
                    transactionsDetails(e, column, columnIndex, row, rowIndex);
                },
            },
        },
        {
            dataField: "amount",
            text: "Amount",
            sort: true,
            formatter: amountRef,
            events: {
                onClick: (e, column, columnIndex, row, rowIndex) => {
                    transactionsDetails(e, column, columnIndex, row, rowIndex);
                },
            },
        },
    ];
    useEffect(() => {
        if (!seen) {
            props.transactionsList("this_month");
            setSeen(true);
        }
        if (props.import_bank_file_loading === 'Success') {
            props.ImportBankFileFresh();
            history.push('/import/bank/file');
        }
    }, [props.import_bank_file_loading]);
    const handleImportedFile = (e) => {
        props.ImportBankFile(e.target.files[0]);
    }
    const pushToBankTransactions = () => {
        history.push('transaction/process');
    }
    return (
        <div className="page-content">
            {
                showDepositModal &&
                <AddDepositReceipt
                    showDepositModal={showDepositModal}
                    toggleDepositModal={toggleDepositModal}
                />
            }
            <Container fluid={true}>
                <Breadcrumbs title="Transactions" breadcrumbItem="Accounts" />
                <Row>
                    <Card>
                        <CardBody>
                            <Row>
                                <Col md={9}>
                                    <div className="button-items">
                                        <button type="button" className="btn btn-info me-1" onClick={() => inputRef.current.click()}>
                                            <i className="fas fa-file-import me-1" />
                                            Import Bank File
                                        </button>
                                        <input style={{ display: 'none' }} ref={inputRef} type="file" onChange={handleImportedFile} />
                                        <button type="button" className="btn btn-info me-1" onClick={toggleAdd}>
                                            <div className="d-flex align-items-center">
                                                <i className="bx bxs-group me-1 font-size-16"></i>
                                                <span>Add Tenant Receipt</span>
                                            </div>
                                        </button>
                                        <button type="button" className="btn btn-info me-1">
                                            <Link to={`/saleReceipt`}>
                                                <div className="d-flex align-items-center text-white
                                                ">
                                                    <i className="fas fa-house-damage me-1" />
                                                    <span>  Add Sale receipt</span>
                                                </div>
                                            </Link>
                                        </button>
                                        {
                                            showFolioReceiptModal ?
                                                <FolioReceipt showModal={showFolioReceiptModal} toggle={toggleFolioReceiptModal} /> : ''
                                        }
                                        {
                                            showFolioWithdrawModal ?
                                                <FolioWithdraw showModal={showFolioWithdrawModal} toggle={toggleFolioWithdrawModal} /> : ''
                                        }
                                        {
                                            showJournalModal ?
                                                <Journal showModal={showJournalModal} toggle={toggleJournalModal} /> : ''
                                        }
                                        <ButtonDropdown
                                            isOpen={state.drp_link}
                                            toggle={() =>
                                                setState(prev => ({ ...prev, drp_link: !prev.drp_link }))
                                            }
                                        >
                                            <DropdownToggle caret color="secondary">
                                                Actions <i className="mdi mdi-chevron-down"></i>
                                            </DropdownToggle>
                                            <DropdownMenu>
                                                <DropdownItem onClick={toggleFolioReceiptModal}>Folio Receipt</DropdownItem>
                                                <DropdownItem onClick={toggleFolioWithdrawModal}>Folio Withdraw</DropdownItem>
                                                <DropdownItem onClick={toggleJournalModal}>Journal</DropdownItem>
                                            </DropdownMenu>
                                        </ButtonDropdown>
                                    </div>
                                </Col>
                                <Col md={3}>
                                    {
                                        props.transaction_list_data?.uploadedBankFileNumber ?
                                            <div className="d-flex align-items-center p-2" style={{ borderBottom: '1px solid #B2BEB5', borderRight: '1px solid #B2BEB5', cursor: 'pointer' }} onClick={pushToBankTransactions}>
                                                <i className="fas fa-align-justify font-size-20" />
                                                <div className="d-flex flex-column justify-content-center mx-2 py-1 px-3">
                                                    <span style={{ fontSize: '22px' }}>{props.transaction_list_data?.uploadedBankFileNumber || 0}</span>
                                                    <span>Bank Transactions</span>
                                                </div>
                                                <i className="fas fa-arrow-right font-size-18" />
                                            </div> : ''
                                    }
                                </Col>
                            </Row>
                            {
                                showModalAdd ? <AddReceipt toggle={toggleAdd} toggleDepositModal={toggleDepositModal} showModal={showModalAdd} setShowModal={setShowModalAdd} /> : null
                            }
                        </CardBody>
                    </Card>
                    <Card>
                        <CardBody>
                            <Nav className="icon-tab nav-justified">
                                <NavItem>
                                    <NavLink
                                        style={{ cursor: "pointer" }}
                                        className={classnames({
                                            active: state.activeTab === "1",
                                        })}
                                        onClick={() => {
                                            toggle("1");
                                        }}
                                    >
                                        This Month
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        style={{ cursor: "pointer" }}
                                        className={classnames({
                                            active: state.activeTab === "2",
                                        })}
                                        onClick={() => {
                                            toggle("2");
                                        }}
                                    >
                                        Last Month
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        style={{ cursor: "pointer" }}
                                        className={classnames({
                                            active: state.activeTab === "3",
                                        })}
                                        onClick={() => {
                                            toggle("3");
                                        }}
                                    >
                                        ALL
                                    </NavLink>
                                </NavItem>
                            </Nav>
                            <TabContent
                                activeTab={state.activeTab}
                                className="p-3 text-muted"
                            >
                                <TabPane tabId="1">
                                    <Row>
                                        <Col sm="12">
                                            <CardText className="mb-0">
                                                {props.transaction_list_data ? (
                                                    <DatatableTables2
                                                        products={props.transaction_list_data}
                                                        columnData={activeData}
                                                    />
                                                ) : null}
                                            </CardText>
                                        </Col>
                                    </Row>
                                </TabPane>
                                <TabPane tabId="2">
                                    <Row>
                                        <Col sm="12">
                                            <CardText className="mb-0">
                                                {props.transaction_list_data ? (
                                                    <DatatableTables2
                                                        products={props.transaction_list_data}
                                                        columnData={activeData}
                                                    // url={url}
                                                    />
                                                ) : null}
                                            </CardText>
                                        </Col>
                                    </Row>
                                </TabPane>
                                <TabPane tabId="3">
                                    <Row>
                                        <Col sm="12">
                                            <CardText className="mb-0">
                                                {props.transaction_list_data ? (
                                                    <DatatableTables2
                                                        products={props.transaction_list_data}
                                                        columnData={activeData}
                                                    // url={url}
                                                    />
                                                ) : null}
                                            </CardText>
                                        </Col>
                                    </Row>
                                </TabPane>
                            </TabContent>
                        </CardBody>
                    </Card>
                </Row>
            </Container>
            {
                state.transactionInfoModal &&
                <TransactionsInfoModal receipt={state.transactionsDetails} state={state} setState={setState} toggle={toggleModalTransactions} toggleReverse={toggleModalTransactionsReverse} toggleEdit={toggleModalTransactionsEdit} toggleClearFund={toggleClearFund} />
            }
            {/* {state.transactionInfoModal ? <TransactionsInfoModal state={state} setState={setState} toggle={toggleModalTransactions} toggleReverse={toggleModalTransactionsReverse} toggleEdit={toggleModalTransactionsEdit} /> : null} */}
            <TransactionsInfoModalReverse state={state} setState={setState} toggle={toggleModalTransactionsReverse} toggleinfo={toggleModalTransactions} />
            <TransactionsInfoModalEdit state={state} setState={setState} toggle={toggleModalTransactionsEdit} />
            <ClearFundModal state={state} setState={setState} toggle={toggleClearFund} />

        </div>
    );
}
const mapStateToProps = gstate => {
    const {
        transaction_list_loading, transaction_list_data, import_bank_file_data, import_bank_file_error, import_bank_file_loading
    } = gstate.AccountsTransactions;
    return {
        transaction_list_loading, transaction_list_data, import_bank_file_data, import_bank_file_error, import_bank_file_loading
    };
};
export default withRouter(connect(mapStateToProps, {
    tenantInfoFresh, transactionsList, transactionsInfoListFresh, ImportBankFile, ImportBankFileFresh
})(TransactionList));
