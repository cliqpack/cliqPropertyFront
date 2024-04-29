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
import { } from "store/actions";
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
import PropertyKey from "pages/Properties/PropertyKey";

document.title = "CliqProperty";

const KeyManagement = props => {
    const history = useHistory();
    const { id } = useParams();
    const [state, setState] = useState({
        reminderModal: false, init: true, drp_link: false, selectedGroup: [], optionGroup: [],
        optionTeam: []
    });
    const [keyModal, setKeyModal] = useState(false);

    const tog_key_modal = () => {
        setKeyModal(prevState => !prevState);

    };

    const [actionArray, setActionArray] = useState([]);
    console.log(actionArray);
    const { SearchBar } = Search;

    const pageOptions = {
        sizePerPage: 10,
        totalSize: []?.length, // replace later with size(customers),
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
        tog_key_modal()
    }

    var keyText = {
        selectselectedGroup: state.selectedGroup || [],
        optionGroup: state.optionGroup || [],
        property_id: actionArray?.id || '',
        optionTeam: state.optionTeam || [],
    };

    const frequency = (cell, row) => {
        return <span>{row.frequency && `${row.frequency} ${row.frequency_type}`}</span>
    }

    const dateRef = (cell, row) => <span>{moment(cell).format('DD/MM/yyyy')}</span>

    const propertyRef = (cell, row) => <div className="text-info d-flex justify-content-center" onClick={() => propertyLink(row.property_id)}>{row.property_id}</div>
    const propertyLink = id => history.push(`/propertyInfo/${id}`)
    const keyRef = (cell, row) => <div className="d-flex justify-content-center"><span className="text-info">{row.key_number}</span></div>

    const activeData = [

        {
            dataField: "return_due",
            text: "Return due",
            sort: true,

            events: {
                onClick: (e, column, columnIndex, row, rowIndex) => {
                    refDetail(e, column, columnIndex, row, rowIndex);
                }
            },
        },
        {
            dataField: "",
            text: "Overdue",
            sort: true,
            events: {
                onClick: (e, column, columnIndex, row, rowIndex) => {
                    refDetail(e, column, columnIndex, row, rowIndex);
                }
            },

        },
        {
            dataField: "key_number",
            text: "Key number",
            formatter: keyRef,
            events: {
                onClick: (e, column, columnIndex, row, rowIndex) => {
                    refDetail(e, column, columnIndex, row, rowIndex);
                }
            },
        },

        {
            dataField: "",
            text: "Property",
            formatter: propertyRef

        },
        {
            dataField: "",
            text: "Checked out to",

        },
        {
            dataField: "",
            text: "Manager",

        },
        {
            dataField: "",
            text: "Inspection scheduled",

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


    useEffect(() => {
        if (state.init) {

            setState({ ...state, init: false })
        }
    }, []);


    const allData = [
        {
            "id": 2,
            "contact_id": 2,
            "property_id": 1,
            "return_due": "2023-08-17",
            "return_time": "10:29:00",
            "note": "notes",
            "check_type": "in",
            "created_at": "2023-08-17T04:30:16.000000Z",
            "updated_at": "2023-08-17T04:30:16.000000Z",
            "status": null,
            "key_number": 269,
            "team_member_id": null,
            "property": {
                "id": 1,
                "reference": "ABBO60.7",
                "manager_id": 1,
                "location": null,
                "property_type": 1,
                "primary_type": "Residential",
                "description": null,
                "bathroom": "3",
                "bedroom": "2",
                "car_space": "2",
                "floor_area": null,
                "floor_size": null,
                "land_area": null,
                "land_size": null,
                "key_number": 269,
                "strata_manager_id": null,
                "routine_inspections_frequency": "2",
                "routine_inspections_frequency_type": "monthly",
                "first_routine": 6,
                "first_routine_frequency_type": "Weekly",
                "routine_inspection_due_date": "2023-08-30",
                "note": null,
                "property_image": null,
                "owner": "Haitao Du",
                "tenant": "Desiree Brudenell & Michael Brudenell",
                "company_id": 1,
                "created_at": "2023-07-14T18:00:00.000000Z",
                "updated_at": "2023-08-16T07:30:41.000000Z",
                "status": "Active",
                "youtube_link": null,
                "vr_link": null,
                "subject": null,
                "manager": "Raymond Tang",
                "manager_name": "Raymond Tang",
                "tenant_id": 1,
                "owner_id": 1,
                "tenant_contact_id": 2419,
                "owner_contact_id": 1278,
                "last_inspection": [],
                "stata_manager_name": " "
            },
            "contact": {
                "id": 2,
                "reference": "RTBA",
                "type": null,
                "first_name": "Bond",
                "last_name": "Authority",
                "salutation": "Bond",
                "company_name": null,
                "mobile_phone": null,
                "work_phone": null,
                "home_phone": null,
                "email": "noname@email.com",
                "abn": null,
                "notes": null,
                "owner": 0,
                "tenant": 0,
                "supplier": 1,
                "seller": 0,
                "company_id": 1,
                "created_at": "2023-07-14T18:00:00.000000Z",
                "updated_at": "2023-07-14T18:00:00.000000Z",
                "buyer": 0
            },
            "team_member": null
        },
        {
            "id": 3,
            "contact_id": 2677,
            "property_id": 2,
            "return_due": "2023-08-30",
            "return_time": "22:32:00",
            "note": "qqq",
            "check_type": "out",
            "created_at": "2023-08-17T04:32:53.000000Z",
            "updated_at": "2023-08-17T04:32:53.000000Z",
            "status": "Contact",
            "team_member_id": null,
            "key_number": 269,

            "property": {
                "id": 2,
                "reference": "Abbott Street, 7/60",
                "manager_id": 10000000,
                "location": "-37.9495197,145.0086156",
                "property_type": 1,
                "primary_type": "Residential",
                "description": null,
                "bathroom": "2",
                "bedroom": "3",
                "car_space": "2",
                "floor_area": "m2",
                "floor_size": null,
                "land_area": "m2",
                "land_size": null,
                "key_number": 216,
                "strata_manager_id": null,
                "routine_inspections_frequency": "6",
                "routine_inspections_frequency_type": "Weekly",
                "first_routine": 6,
                "first_routine_frequency_type": "Weekly",
                "routine_inspection_due_date": "2023-09-21",
                "note": null,
                "property_image": null,
                "owner": "Admin Owner - cliqpack",
                "tenant": "Admin Tenant - cliqpack",
                "company_id": 2,
                "created_at": "2023-08-10T03:58:47.000000Z",
                "updated_at": "2023-08-10T04:05:15.000000Z",
                "status": "Active",
                "youtube_link": null,
                "vr_link": null,
                "subject": null,
                "manager": "abhi das",
                "manager_name": "abhi das",
                "tenant_id": 414,
                "owner_id": 432,
                "tenant_contact_id": 2677,
                "owner_contact_id": 2677,
                "last_inspection": [],
                "stata_manager_name": " "
            },
            "contact": {
                "id": 2677,
                "reference": "cliqpack",
                "type": null,
                "first_name": "Admin",
                "last_name": "",
                "salutation": null,
                "company_name": "cliqpack",
                "mobile_phone": "0184764489",
                "work_phone": "0184764489",
                "home_phone": null,
                "email": "cliqpack2@gmail.com",
                "abn": "0",
                "notes": null,
                "owner": 1,
                "tenant": 1,
                "supplier": 1,
                "seller": 0,
                "company_id": 2,
                "created_at": "2023-07-24T06:04:37.000000Z",
                "updated_at": "2023-08-10T04:05:15.000000Z",
                "buyer": 0
            },
            "team_member": null
        }
    ]

    // console.log(JSON.stringify(allData))


    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid={true}>
                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardBody>
                                    <h4 className="ms-2 text-primary mb-4">
                                        Key Management
                                    </h4>
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
                                        // onClick={toggleModalRemiinder}
                                        >
                                            Check In
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-info me-1"
                                        // onClick={toggleModalRemiinder}
                                        >
                                            Check Out
                                        </button>

                                        <Button
                                            className="btn w-md me-1"
                                            color="info"
                                        // onClick={toggleMsgModal}
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

                                                <DropdownItem
                                                    // onClick={toggleCompleteReminder} 
                                                    disabled={state.activeTab != '4' ? false : true}>
                                                    Mark Complete
                                                </DropdownItem>




                                            </DropdownMenu>
                                        </ButtonDropdown>
                                    </div>
                                </CardBody>
                            </Card>

                            <Card>
                                <CardBody>
                                    <CardText className="mb-0">
                                        {allData &&
                                            <PaginationProvider
                                                pagination={paginationFactory(pageOptions)}
                                                keyField="id"
                                                columns={activeData}
                                                data={allData}
                                            >
                                                {({ paginationProps, paginationTableProps }) => (
                                                    <ToolkitProvider
                                                        keyField="id"
                                                        columns={activeData}
                                                        data={allData}
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
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>

            {keyModal &&
                <PropertyKey
                    keyModal={keyModal}
                    toggle={tog_key_modal}
                    text={keyText}
                ></PropertyKey>}

        </React.Fragment>
    );
};

const mapStateToProps = gstate => {
    const { } = gstate.property;

    return {};
};

export default withRouter(connect(mapStateToProps, {

})(KeyManagement));
