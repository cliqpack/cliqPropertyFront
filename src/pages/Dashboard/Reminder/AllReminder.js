import React, { useState, useEffect, useRef } from "react";
import moment from "moment";
import { connect } from "react-redux";
import PropTypes, { number } from "prop-types";
import { useDispatch } from "react-redux";
import {
    Card,
    Alert,
    CardBody,
    CardText,
    CardTitle,
    Col,
    Container,
    Row,
    Label,
    Input,
    Button,
    CardHeader,
    Nav,
    NavItem,
    NavLink,
    TabContent,
    TabPane,
    ButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from "reactstrap";
import Select from "react-select";
import { getAllReminders, completeReminderFresh, completeReminder } from "store/actions";
import { Link, useHistory, withRouter } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";
import toastr from "toastr";
import ToolkitProvider, {
    Search,
} from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
    PaginationProvider,
    PaginationListStandalone,
    SizePerPageDropdownStandalone,
} from "react-bootstrap-table2-paginator";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import AddReminder from "./AddReminder";
import classnames from "classnames";
import RemoveReminder from "pages/Properties/Reminders/RemoveReminder";
import CompleteReminder from "./CompleteReminder";
import CreateJobReminder from "./CreateJobReminder";
import ReminderMessageModal from "./ReminderMessageModal";


document.title = "CliqProperty";

const AllReminder = props => {
    const history = useHistory();
    const { id } = useParams();
    const [state, setState] = useState({
        reminderModal: false, init: true, activeTab: "1", drp_link: false, completeReminder: false, job: false

    });
    const [selected, setSelected] = useState([])

    console.log(state.activeTab);

    const toggleCompleteReminder = () => {
        setState(prev => ({ ...prev, completeReminder: !prev.completeReminder }));
    }
    const toggleJobReminder = () => {
        setState(prev => ({ ...prev, job: !prev.job }));
    }

    const [actionArray, setActionArray] = useState([]);
    console.log(actionArray);
    const { SearchBar } = Search;

    const pageOptions = {
        sizePerPage: 10,
        totalSize: props.all_reminders_data?.data?.length, // replace later with size(customers),
        custom: true,
    };

    let node;
    const defaultSorted = [
        {
            dataField: "id",
            order: "asc",
        },
    ];

    const contact = (cell, row) => {

        if (row.contact == 'supplier') {
            return <span>{row.supplier.reference}</span>
        } else {
            return <span>{row.contact}</span>
        }
    }

    const status = (cell, row) => {
        if (row.status == 1) {
            return <span>Active</span>
        } else {
            return <span>Inctive</span>

        }
    }

    const refDetail = (e, column, columnIndex, row, rowIndex) => {
        setActionArray(row);
        toggleModalRemiinder();
    }

    const frequency = (cell, row) => {
        return <span>{row.frequency && `${row.frequency} ${row.frequency_type}`}</span>
    }

    const dateRef = (cell, row) => <span>{cell ? moment(cell).format('DD/MM/yyyy') : ''}</span>;

    const manager = (cell, row) => <span>{row.property?.manager_name}</span>

    const duedateRef = (cell, row) => <span className={`${moment(row.due).isBefore(moment()) ? `text-danger` : `text-dark`}`}>{moment(row.due).format('DD/MM/yyyy')}</span>

    const propertyRef = (cell, row) => <span>{row.property?.reference}</span>

    const noteRef = (cell, row) => <span>{cell == 'null' ? '' : cell}</span>

    const activeData = [
        // {
        //     dataField: "id",
        //     text: "Id",
        //     sort: true,

        // },
        {
            dataField: "name",
            text: "Name",
            sort: true,
            events: {
                onClick: (e, column, columnIndex, row, rowIndex) => { refDetail(e, column, columnIndex, row, rowIndex); }
            },
        },
        {
            dataField: "",
            text: "Property",
            formatter: propertyRef,
            // sort: true,
            // events: {
            //     onClick: (e, column, columnIndex, row, rowIndex) => { refDetail(e, column, columnIndex, row, rowIndex); }
            // },
        },
        {
            dataField: "",
            text: "Contact",
            formatter: contact,
            // sort: true,
            // events: {
            //     onClick: (e, column, columnIndex, row, rowIndex) => { refDetail(e, column, columnIndex, row, rowIndex); }
            // },
        },
        {
            dataField: "",
            text: "Manager",
            formatter: manager,
            // sort: true,
            // events: {
            //     onClick: (e, column, columnIndex, row, rowIndex) => { refDetail(e, column, columnIndex, row, rowIndex); }
            // },
        },
        // {
        //     dataField: "default_frequency",
        //     text: "Frequency",
        //     formatter: frequency,
        //     sort: true,
        //     events: {
        //         onClick: (e, column, columnIndex, row, rowIndex) => { refDetail(e, column, columnIndex, row, rowIndex); }
        //     },
        // },
        {
            dataField: "",
            text: "Due",
            formatter: duedateRef,
            // sort: true,
            // events: {
            //     onClick: (e, column, columnIndex, row, rowIndex) => { refDetail(e, column, columnIndex, row, rowIndex); }
            // },
        },
        {
            dataField: "certificate_expiry",
            text: "Expiry",
            sort: true,
            formatter: dateRef,
            // events: {
            //     onClick: (e, column, columnIndex, row, rowIndex) => { refDetail(e, column, columnIndex, row, rowIndex); }
            // },
        },
        {
            dataField: "",
            text: "Previous Due",
            sort: true,
            events: {
                onClick: (e, column, columnIndex, row, rowIndex) => { refDetail(e, column, columnIndex, row, rowIndex); }
            },
        },
        {
            dataField: "notes",
            text: "Notes",
            ref: noteRef,
            sort: true,

        },
    ];

    const activeData1 = [
        // {
        //     dataField: "id",
        //     text: "Id",
        //     sort: true,

        // },
        {
            dataField: "name",
            text: "Name",
            sort: true,
            events: {
                onClick: (e, column, columnIndex, row, rowIndex) => { refDetail(e, column, columnIndex, row, rowIndex); }
            },
        },
        {
            dataField: "",
            text: "Property",
            formatter: propertyRef,
            sort: true,
            events: {
                onClick: (e, column, columnIndex, row, rowIndex) => { refDetail(e, column, columnIndex, row, rowIndex); }
            },
        },
        {
            dataField: "status",
            text: "Status",
            // formatter: contact,
            sort: true,
            events: {
                onClick: (e, column, columnIndex, row, rowIndex) => { refDetail(e, column, columnIndex, row, rowIndex); }
            },
        },
        {
            dataField: "",
            text: "Contact",
            formatter: contact,
            sort: true,
            events: {
                onClick: (e, column, columnIndex, row, rowIndex) => { refDetail(e, column, columnIndex, row, rowIndex); }
            },
        },

        {
            dataField: "",
            text: "Manager",
            formatter: manager,
            sort: true,
            events: {
                onClick: (e, column, columnIndex, row, rowIndex) => { refDetail(e, column, columnIndex, row, rowIndex); }
            },
        },
        // {
        //     dataField: "default_frequency",
        //     text: "Frequency",
        //     formatter: frequency,
        //     sort: true,
        //     events: {
        //         onClick: (e, column, columnIndex, row, rowIndex) => { refDetail(e, column, columnIndex, row, rowIndex); }
        //     },
        // },
        {
            dataField: "",
            text: "Due",
            formatter: duedateRef,
            sort: true,
            events: {
                onClick: (e, column, columnIndex, row, rowIndex) => { refDetail(e, column, columnIndex, row, rowIndex); }
            },
        },
        {
            dataField: "certificate_expiry",
            text: "Expiry",
            sort: true,
            formatter: dateRef,
            events: {
                onClick: (e, column, columnIndex, row, rowIndex) => { refDetail(e, column, columnIndex, row, rowIndex); }
            },
        },
        {
            dataField: "",
            text: "Previous Due",
            sort: true,
            events: {
                onClick: (e, column, columnIndex, row, rowIndex) => { refDetail(e, column, columnIndex, row, rowIndex); }
            },
        },
        {
            dataField: "notes",
            text: "Notes",
            ref: noteRef,
            sort: true,

        },
    ];

    const handleSelect = (isSelect, rows, e) => {
        // console.log(isSelect, rows);
        if (rows) {
            setActionArray(prevArray => [...prevArray, isSelect]);
            setSelected(prev => ([...prev, isSelect.id]))

        } else {
            setActionArray(cur => cur.filter(data => data?.id !== isSelect?.id));
            setSelected(cur => cur.filter(data => data.id !== rows.id))


        }
    };

    const handleSelectAll = (isSelect, rows, e) => {
        // console.log(isSelect, rows);
        if (isSelect) {
            setActionArray(rows);
            setSelected(rows.map(item => item.id))


        } else {
            setActionArray([]);
            setSelected([])

        }
    };
    const [table, setTable] = useState([]);

    const [msgModal, setMsgModal] = useState(false);

    const toggleMsgModal = () => {
        setMsgModal(prev => !prev);
    };

    // Select  Button operation
    const selectRow = {
        mode: "checkbox",
        // selected: table,

        onSelect: handleSelect,

        onSelectAll: handleSelectAll,
        selected: selected

    };

    const toggleModalRemiinder = () => {
        if (state.reminderModal) {
            setActionArray('')
        }
        setState(prev => ({ ...prev, reminderModal: !prev.reminderModal }));
    };

    console.log(actionArray);

    useEffect(() => {
        if (state.init) {
            props.getAllReminders('due')
            setState({ ...state, init: false })
        }

    }, []);

    const toggle = (tab) => {
        if (state.activeTab !== tab) {
            setState({
                ...state,

                activeTab: tab,
            });
        }
        setActionArray([]);
        setTable([]);

        console.log(tab);
        // return
        if (tab == '1') {
            props.getAllReminders('due')
        }
        if (tab == '2') {
            props.getAllReminders('progress')
        }
        if (tab == '3') {
            props.getAllReminders('active')
        }
        if (tab == '4') {
            props.getAllReminders('closed')
        }
    };



    const [rmv, setRmv] = useState(false)

    const toggleRemoveRemiinder = () => setRmv(prev => !prev);

    const completeHandler = () => {
        props.completeReminder('Closed', actionArray)
    }


    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid={true}>
                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardBody>
                                    <h4 className="ms-2 text-primary mb-4">Reminders </h4>
                                    <div
                                        className="w-100 mt-2 mb-4"
                                        style={{
                                            borderBottom: "1.2px dotted #c9c7c7",
                                        }}
                                    ></div>
                                    <div className="button-groups">
                                        <button
                                            type="button"
                                            className="btn btn-info me-1"
                                            onClick={toggleModalRemiinder}
                                        >
                                            <i className="fas fa-tag me-1" />
                                            Add Reminder
                                        </button>

                                        <Button
                                            className="btn w-md me-1"
                                            color="info"
                                            onClick={toggleMsgModal}
                                        >
                                            <i className="fas fa-paper-plane me-1"></i>
                                            Message
                                            <i className="fas fa-angle-down ms-1" />
                                        </Button>
                                        <ButtonDropdown
                                            isOpen={state.drp_link}
                                            toggle={() =>
                                                setState(prev => ({ ...prev, drp_link: !prev.drp_link }))
                                            }
                                        >
                                            <DropdownToggle caret color="secondary" disabled={actionArray?.length > 0 ? false : true}
                                            >
                                                Actions <i className="mdi mdi-chevron-down"></i>
                                            </DropdownToggle>
                                            <DropdownMenu>
                                                {state.activeTab == '4' ?
                                                    <>
                                                        <DropdownItem onClick={toggleCompleteReminder} disabled={state.activeTab != '4' ? false : true}>Mark Complete</DropdownItem>
                                                        <DropdownItem onClick={toggleRemoveRemiinder} disabled={state.activeTab != '4' ? false : true}>Delete Reminder</DropdownItem>
                                                        <DropdownItem onClick={toggleJobReminder} disabled={state.activeTab != '4' ? false : true}>Create Job</DropdownItem>
                                                    </>
                                                    :
                                                    <>
                                                        <DropdownItem onClick={toggleCompleteReminder}>Mark Complete</DropdownItem>
                                                        <DropdownItem onClick={toggleRemoveRemiinder} disabled={actionArray?.length == 1 ? false : true}>Delete Reminder</DropdownItem>
                                                        <DropdownItem onClick={toggleJobReminder} disabled={actionArray?.length == 1 ? false : true}>Create Job</DropdownItem>
                                                    </>
                                                }
                                            </DropdownMenu>
                                        </ButtonDropdown>
                                    </div>
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
                                                Due
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
                                                In Progress
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
                                                All Active
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink
                                                style={{ cursor: "pointer" }}
                                                className={classnames({
                                                    active: state.activeTab === "4",
                                                })}
                                                onClick={() => {
                                                    toggle("4");
                                                }}
                                            >
                                                Closed
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
                                                        {props.all_reminders_data &&
                                                            <PaginationProvider
                                                                pagination={paginationFactory(pageOptions)}
                                                                keyField="id"
                                                                columns={activeData}
                                                                data={props.all_reminders_data?.data}
                                                            >
                                                                {({ paginationProps, paginationTableProps }) => (
                                                                    <ToolkitProvider
                                                                        keyField="id"
                                                                        columns={activeData}
                                                                        data={props.all_reminders_data?.data}
                                                                        search
                                                                    >
                                                                        {toolkitProps => (
                                                                            <React.Fragment>
                                                                                <Row className="mb-2">
                                                                                    <Col md={2}></Col>
                                                                                    <Col md={10}></Col>
                                                                                </Row>

                                                                                <Row>
                                                                                    <Col xl="12">
                                                                                        <div className="table-responsive">
                                                                                            <div className="d-flex justify-content-end align-items-center search-box" style={{ marginTop: "70px" }}>
                                                                                                <SearchBar
                                                                                                    {...toolkitProps.searchProps}
                                                                                                />
                                                                                            </div>
                                                                                            <BootstrapTable
                                                                                                ref={n => (node = n)}
                                                                                                keyField={"id"}
                                                                                                responsive
                                                                                                bordered={false}
                                                                                                striped={false}
                                                                                                defaultSorted={defaultSorted}
                                                                                                selectRow={selectRow}
                                                                                                tabIndexCell
                                                                                                classes={
                                                                                                    "table align-middle table-nowrap"
                                                                                                }
                                                                                                headerWrapperClasses={"thead-light"}
                                                                                                {...toolkitProps.baseProps}
                                                                                                {...paginationTableProps}
                                                                                            />
                                                                                        </div>
                                                                                    </Col>
                                                                                </Row>

                                                                                <Row className="align-items-md-center mt-30">
                                                                                    <Col className="inner-custom-pagination d-flex">
                                                                                        <div className="d-inline">
                                                                                            <SizePerPageDropdownStandalone
                                                                                                {...paginationProps}
                                                                                            />
                                                                                        </div>
                                                                                        <div className="text-md-right ms-auto">
                                                                                            <PaginationListStandalone
                                                                                                {...paginationProps}
                                                                                            />
                                                                                        </div>
                                                                                    </Col>
                                                                                </Row>
                                                                            </React.Fragment>
                                                                        )}
                                                                    </ToolkitProvider>
                                                                )}
                                                            </PaginationProvider>}
                                                    </CardText>

                                                </Col>
                                            </Row>
                                        </TabPane>
                                        <TabPane tabId="2">
                                            <Row>
                                                <Col sm="12">
                                                    <CardText className="mb-0">
                                                        {props.all_reminders_data &&
                                                            <PaginationProvider
                                                                pagination={paginationFactory(pageOptions)}
                                                                keyField="id"
                                                                columns={activeData1}
                                                                data={props.all_reminders_data?.data}
                                                            >
                                                                {({ paginationProps, paginationTableProps }) => (
                                                                    <ToolkitProvider
                                                                        keyField="id"
                                                                        columns={activeData1}
                                                                        data={props.all_reminders_data?.data}
                                                                        search
                                                                    >
                                                                        {toolkitProps => (
                                                                            <React.Fragment>
                                                                                <Row className="mb-2">
                                                                                    <Col md={2}></Col>
                                                                                    <Col md={10}></Col>
                                                                                </Row>

                                                                                <Row>
                                                                                    <Col xl="12">
                                                                                        <div className="table-responsive">
                                                                                            <div className="d-flex justify-content-end align-items-center search-box" style={{ marginTop: "70px" }}>
                                                                                                <SearchBar
                                                                                                    {...toolkitProps.searchProps}
                                                                                                />
                                                                                            </div>
                                                                                            <BootstrapTable
                                                                                                ref={n => (node = n)}
                                                                                                keyField={"id"}
                                                                                                responsive
                                                                                                bordered={false}
                                                                                                striped={false}
                                                                                                defaultSorted={defaultSorted}
                                                                                                selectRow={selectRow}
                                                                                                tabIndexCell
                                                                                                classes={
                                                                                                    "table align-middle table-nowrap"
                                                                                                }
                                                                                                headerWrapperClasses={"thead-light"}
                                                                                                {...toolkitProps.baseProps}
                                                                                                {...paginationTableProps}
                                                                                            />
                                                                                        </div>
                                                                                    </Col>
                                                                                </Row>

                                                                                <Row className="align-items-md-center mt-30">
                                                                                    <Col className="inner-custom-pagination d-flex">
                                                                                        <div className="d-inline">
                                                                                            <SizePerPageDropdownStandalone
                                                                                                {...paginationProps}
                                                                                            />
                                                                                        </div>
                                                                                        <div className="text-md-right ms-auto">
                                                                                            <PaginationListStandalone
                                                                                                {...paginationProps}
                                                                                            />
                                                                                        </div>
                                                                                    </Col>
                                                                                </Row>
                                                                            </React.Fragment>
                                                                        )}
                                                                    </ToolkitProvider>
                                                                )}
                                                            </PaginationProvider>}
                                                    </CardText>

                                                </Col>
                                            </Row>
                                        </TabPane>
                                        <TabPane tabId="3">
                                            <Row>
                                                <Col sm="12">
                                                    <CardText className="mb-0">
                                                        {props.all_reminders_data &&
                                                            <PaginationProvider
                                                                pagination={paginationFactory(pageOptions)}
                                                                keyField="id"
                                                                columns={activeData}
                                                                data={props.all_reminders_data?.data}
                                                            >
                                                                {({ paginationProps, paginationTableProps }) => (
                                                                    <ToolkitProvider
                                                                        keyField="id"
                                                                        columns={activeData}
                                                                        data={props.all_reminders_data?.data}
                                                                        search
                                                                    >
                                                                        {toolkitProps => (
                                                                            <React.Fragment>
                                                                                <Row className="mb-2">
                                                                                    <Col md={2}></Col>
                                                                                    <Col md={10}></Col>
                                                                                </Row>

                                                                                <Row>
                                                                                    <Col xl="12">
                                                                                        <div className="table-responsive">
                                                                                            <div className="d-flex justify-content-end align-items-center search-box" style={{ marginTop: "70px" }}>
                                                                                                <SearchBar
                                                                                                    {...toolkitProps.searchProps}
                                                                                                />
                                                                                            </div>
                                                                                            <BootstrapTable
                                                                                                ref={n => (node = n)}
                                                                                                keyField={"id"}
                                                                                                responsive
                                                                                                bordered={false}
                                                                                                striped={false}
                                                                                                defaultSorted={defaultSorted}
                                                                                                selectRow={selectRow}
                                                                                                tabIndexCell
                                                                                                classes={
                                                                                                    "table align-middle table-nowrap"
                                                                                                }
                                                                                                headerWrapperClasses={"thead-light"}
                                                                                                {...toolkitProps.baseProps}
                                                                                                {...paginationTableProps}
                                                                                            />
                                                                                        </div>
                                                                                    </Col>
                                                                                </Row>

                                                                                <Row className="align-items-md-center mt-30">
                                                                                    <Col className="inner-custom-pagination d-flex">
                                                                                        <div className="d-inline">
                                                                                            <SizePerPageDropdownStandalone
                                                                                                {...paginationProps}
                                                                                            />
                                                                                        </div>
                                                                                        <div className="text-md-right ms-auto">
                                                                                            <PaginationListStandalone
                                                                                                {...paginationProps}
                                                                                            />
                                                                                        </div>
                                                                                    </Col>
                                                                                </Row>
                                                                            </React.Fragment>
                                                                        )}
                                                                    </ToolkitProvider>
                                                                )}
                                                            </PaginationProvider>}
                                                    </CardText>

                                                </Col>
                                            </Row>
                                        </TabPane>
                                        <TabPane tabId="4">
                                            <Row>
                                                <Col sm="12">
                                                    <CardText className="mb-0">
                                                        {props.all_reminders_data &&
                                                            <PaginationProvider
                                                                pagination={paginationFactory(pageOptions)}
                                                                keyField="id"
                                                                columns={activeData}
                                                                data={props.all_reminders_data?.data}
                                                            >
                                                                {({ paginationProps, paginationTableProps }) => (
                                                                    <ToolkitProvider
                                                                        keyField="id"
                                                                        columns={activeData}
                                                                        data={props.all_reminders_data?.data}
                                                                        search
                                                                    >
                                                                        {toolkitProps => (
                                                                            <React.Fragment>
                                                                                <Row className="mb-2">
                                                                                    <Col md={2}></Col>
                                                                                    <Col md={10}></Col>
                                                                                </Row>

                                                                                <Row>
                                                                                    <Col xl="12">
                                                                                        <div className="table-responsive">
                                                                                            <div className="d-flex justify-content-end align-items-center search-box" style={{ marginTop: "70px" }}>
                                                                                                <SearchBar
                                                                                                    {...toolkitProps.searchProps}
                                                                                                />
                                                                                            </div>
                                                                                            <BootstrapTable
                                                                                                ref={n => (node = n)}
                                                                                                keyField={"id"}
                                                                                                responsive
                                                                                                bordered={false}
                                                                                                striped={false}
                                                                                                defaultSorted={defaultSorted}
                                                                                                selectRow={selectRow}
                                                                                                tabIndexCell
                                                                                                classes={
                                                                                                    "table align-middle table-nowrap"
                                                                                                }
                                                                                                headerWrapperClasses={"thead-light"}
                                                                                                {...toolkitProps.baseProps}
                                                                                                {...paginationTableProps}
                                                                                            />
                                                                                        </div>
                                                                                    </Col>
                                                                                </Row>

                                                                                <Row className="align-items-md-center mt-30">
                                                                                    <Col className="inner-custom-pagination d-flex">
                                                                                        <div className="d-inline">
                                                                                            <SizePerPageDropdownStandalone
                                                                                                {...paginationProps}
                                                                                            />
                                                                                        </div>
                                                                                        <div className="text-md-right ms-auto">
                                                                                            <PaginationListStandalone
                                                                                                {...paginationProps}
                                                                                            />
                                                                                        </div>
                                                                                    </Col>
                                                                                </Row>
                                                                            </React.Fragment>
                                                                        )}
                                                                    </ToolkitProvider>
                                                                )}
                                                            </PaginationProvider>}
                                                    </CardText>

                                                </Col>
                                            </Row>
                                        </TabPane>

                                    </TabContent>

                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
            {state.reminderModal && <AddReminder reminderModal={state.reminderModal}
                toggle={toggleModalRemiinder}
                data={actionArray}
                setActionArray={setActionArray}
                toggleTab={() => toggle(state.activeTab)}
            />

            }
            {rmv && <RemoveReminder status={rmv} toggle={toggleRemoveRemiinder} data={actionArray} setActionArray={setActionArray} tab={toggle} state={state} toggleTab={() => toggle(state.activeTab)} text='All' />}
            {state.completeReminder && <CompleteReminder data={actionArray} toggle={toggleCompleteReminder} status={state.completeReminder} setState={setState} setActionArray={setActionArray} tab={toggle} state={state} toggleTab={() => toggle(state.activeTab)}
            />}
            {state.job && <CreateJobReminder status={state.job} toggle={toggleJobReminder} data={actionArray} setTable={setTable} tab={toggle} state={state} setActionArray={setActionArray}
                toggleTab={() => toggle(state.activeTab)}
                setSelected={setSelected}
            />}

            {msgModal &&
                <ReminderMessageModal toggle={toggleMsgModal}
                    msgModal={msgModal}
                    data={actionArray}

                />}
        </React.Fragment>
    );
};

const mapStateToProps = gstate => {
    const { all_reminders_data, complete_reminder_loading } = gstate.Portfolio;

    return { all_reminders_data, complete_reminder_loading };
};

export default withRouter(connect(mapStateToProps, { getAllReminders, completeReminderFresh, completeReminder })(AllReminder));
