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
} from "reactstrap";
import Select from "react-select";
import { getAllNotification, notificationRead, notificationUnRead, notificationReadFresh, notificationUnReadFresh } from "store/actions";
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

document.title = "cliqproperty";

const PropertyReminders = props => {
    const history = useHistory();
    const { id } = useParams();
    const [state, setState] = useState({ reminderModal: false, init: true });

    const [actionArray, setActionArray] = useState([]);
    const { SearchBar } = Search;

    const pageOptions = {
        sizePerPage: 10,
        totalSize: [].length, // replace later with size(customers),
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

    const dateRef = (cell, row) => <span>{moment(cell).format('DD/MM/yyyy')}</span>

    var authUsers = JSON.parse(localStorage.getItem("authUser"));
    console.log(authUsers?.user?.full_name);

    const managerRef = (cell, row) => <span>{authUsers?.user?.full_name}</span>

    const readHandler = (data, msg) => {
        console.log(msg);
        if (msg == "read") {
            props.notificationRead(data);
        } else {
            props.notificationUnRead(data);
        }
    };

    const statusRef = (cell, row) => <span onClick={e => readHandler(row.id, row.read_at ? "unread" : 'read')} className={row.read_at ? 'text-muted' : 'fw-bold'} style={{ cursor: 'pointer' }}>{row.read_at ? 'Read' : 'Unread'}</span>

    const readDetail = (e, column, columnIndex, row, rowIndex) => {

    };


    const activeData = [
        {
            dataField: "created_at",
            text: "Date",
            formatter: dateRef,
            sort: true,

        },
        {
            dataField: "data.comment",
            text: "Comment",
            sort: true,
        },
        {
            dataField: "data.send_user_name",
            text: "Mention",
            sort: true,

        },
        // {
        //     dataField: "",
        //     text: "Mention by",
        //     formatter: managerRef,

        //     sort: true,
        // },
        {
            dataField: "",
            text: "Status",
            formatter: statusRef,
            sort: true,

        },
    ];

    const handleSelect = (isSelect, rows, e) => {
        // console.log(isSelect, rows);
        if (rows) {
            setActionArray(prevArray => [...prevArray, isSelect]);
        } else {
            setActionArray(cur => cur.filter(data => data.id !== isSelect.id));
        }
    };

    const handleSelectAll = (isSelect, rows, e) => {
        // console.log(isSelect, rows);
        if (isSelect) {
            setActionArray(rows);
        } else {
            setActionArray([]);
        }
    };

    // Select  Button operation
    const selectRow = {
        mode: "checkbox",

        onSelect: handleSelect,

        onSelectAll: handleSelectAll,
    };

    const toggleModalRemiinder = () => {
        setState(prev => ({ ...prev, reminderModal: !prev.reminderModal }));
    };

    console.log(props.all_notification_data?.data?.data);

    useEffect(() => {
        if (props.read_notification_loading == 'Success') {
            toastr.success('Success');
            props.notificationReadFresh();
            props.getAllNotification()
        }
        if (props.unread_notification_loading == 'Success') {
            toastr.success('Success');
            props.notificationUnReadFresh();
            props.getAllNotification()
        }
        if (state.init) {
            props.getAllNotification();

            setState({ ...state, init: false })
        }
    }, [props.read_notification_loading, props.unread_notification_loading]);



    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid={true}>
                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardBody>
                                    <h4 className="ms-2 text-primary mb-4">Notifications</h4>

                                    <div
                                        className="w-100 mt-2 mb-4"
                                        style={{
                                            borderBottom: "1.2px dotted #c9c7c7",
                                        }}
                                    ></div>
                                </CardBody>
                            </Card>

                            <Card>
                                <CardBody>
                                    <CardText className="mb-0">

                                        {props.all_notification_data &&
                                            <PaginationProvider
                                                pagination={paginationFactory(pageOptions)}
                                                keyField="id"
                                                columns={activeData}
                                                data={props.all_notification_data?.data?.data}
                                            >
                                                {({ paginationProps, paginationTableProps }) => (
                                                    <ToolkitProvider
                                                        keyField="id"
                                                        columns={activeData}
                                                        data={props.all_notification_data?.data?.data}
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
                                                                            <div className="d-flex justify-content-end align-items-center search-box">
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
                                                                                // selectRow={selectRow}
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
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>

        </React.Fragment>
    );
};

const mapStateToProps = gstate => {
    const { all_notification_loading, all_notification_data, read_notification_loading, unread_notification_loading } = gstate.Login;

    return { all_notification_loading, all_notification_data, read_notification_loading, unread_notification_loading };
};

export default withRouter(connect(mapStateToProps, { getAllNotification, notificationRead, notificationUnRead, notificationReadFresh, notificationUnReadFresh })(PropertyReminders));
