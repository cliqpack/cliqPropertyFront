import React, { useEffect, useState } from "react";
// import Breadcrumbs from "components/Common/Breadcrumb";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { Link, withRouter, useHistory, useParams } from "react-router-dom";

import classnames from "classnames";

import {
    Card,
    Alert,
    CardBody,
    CardTitle,
    Col,
    Container,
    Row,
    CardText,
    Nav,
    NavItem,
    NavLink,
    TabContent,
    TabPane,
    Label,
    Input,
    Button,
    CardHeader,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    FormGroup,
} from "reactstrap";
import DatatableTables2 from "pages/Tables/DatatableTables2";
import Parser from "html-react-parser";
import { AllDocumentByProperty, documentUpdateById, documentUpdateByIdFresh, documentDeleteById, documentDeleteByIdFresh } from "store/actions";
import moment from "moment";
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

function PropertyAllDocument(props) {

    const history = useHistory();
    const { id } = useParams();
    const [init, setInit] = useState(true)
    const [rowData, setRowData] = useState();
    const [docID, setDocId] = useState();
    const [table, setTable] = useState([]);
    const [actionArray, setActionArray] = useState([]);
    console.log(actionArray);
    const handleModal = (rowData) => {

        //setRowData(rowData.doc_path);
        setRowData(rowData.name == null ? rowData.doc_path : rowData.name);
        setDocId(rowData.id);
        toggleModal();
    }

    const handleModal1 = (rowData) => {

        //setRowData(rowData.doc_path);
        setDocId(rowData.id);
        toggleModal1();
    }
    const [state, setState] = useState({
        activeTab: "1",
    });
    const dateRef = (cell, row) => {
        return <span>{moment(row.created_at).format("DD-MM-YYYY")}</span>;
    };


    const fileRef = (cell, row) => {
        return <a href={process.env.REACT_APP_DOCUMENT + row.doc_path} target="_blank" rel="noreferrer noopener">{row.name == null ? row.doc_path.slice(0, 35) : row.name}</a>;
    };


    const propertyRef = (cell, row) => {
        return <span className="text-primary" onClick={() => pushProperty(row.property_id)}>{row.property.reference.slice(0, 40)}</span>;
    };

    const ownerRef = (cell, row) => {
        return <span className="text-primary" onClick={() => pushOwner(row.owner_id)}>{row.owner_id ? row.property.owner : ''}</span>;
    };

    const tenantRef = (cell, row) => {
        return <span className="text-primary" onClick={() => pushTenant(row.tenant_id)}>{row.tenant_id ? row.property.tenant : ''}</span>;
    };
    const sizeRef = (cell, row) => {
        return <span className="text-primary" onClick={() => pushTenant(row.tenant_id)}>{row.file_size ? Number((row.file_size) / 1024).toFixed(2) + " " + "kb" : ''}</span>;
    };

    const buttonRef = (cell, row) => {
        return <>
            <span className="text-primary" ><Button color="info" onClick={() => handleModal(row)}>Edit</Button></span>
            {" "}
            <span className="text-primary" ><Button color="danger" onClick={() => handleModal1(row)}>Delete</Button></span>
        </>;
    };

    const pushProperty = (id) => {
        history.push("/propertyInfo/" + id);
    }
    const pushOwner = (id) => {
        history.push("/contactsInfo/owner/" + id);
    }
    const pushTenant = (id) => {
        history.push("/contactsInfo/tenant/" + id);
    }

    const { SearchBar } = Search;

    const pageOptions = {
        sizePerPage: 10,
        totalSize: props.all_document_by_property?.data?.data?.length, // replace later with size(customers),
        custom: true,
    };

    const handleSelect = (isSelect, rows, e) => {
        // console.log(isSelect, rows);
        if (rows) {
            setActionArray(prevArray => [...prevArray, isSelect]);
            setTable([...table, isSelect?.id]);

        } else {
            setActionArray(cur => cur.filter(data => data?.id !== isSelect?.id));
            setTable(cur => cur.filter(data => data !== isSelect?.id));

        }
    };

    const handleSelectAll = (isSelect, rows, e) => {
        // console.log(isSelect, rows);
        if (isSelect) {
            setActionArray(rows);
            setTable(data)

        } else {
            setActionArray([]);
            setTable([])

        }
    };

    let node;
    const defaultSorted = [
        {
            dataField: "id",
            order: "asc",
        },
    ];

    const refDetail = (e, column, columnIndex, row, rowIndex) => {
        handleModal(row)


    };

    const columnData = [
        {
            dataField: "created_at",
            text: "Date",
            formatter: dateRef,
            events: {
                onClick: (e, column, columnIndex, row, rowIndex) => {
                    refDetail(e, column, columnIndex, row, rowIndex);
                },
            },
            sort: true,
        },
        {
            dataField: "name",
            text: "Filename",
            formatter: fileRef,
            sort: true,
        },
        {
            dataField: "property.reference",
            text: "Property",
            formatter: propertyRef,

            sort: true,
        },
        {
            dataField: "property.owner",
            text: "Owner",
            formatter: ownerRef,
            sort: true,
        },
        {
            dataField: "property.tenant",
            text: "Tenant",
            formatter: tenantRef,
            sort: true,
        },
        {
            dataField: "file_size",
            text: "Size",
            formatter: sizeRef,
            sort: true,
        },

        {
            dataField: "",
            text: "Action",
            //sort: true,
            // formatter: buttonRef
        },
        // {
        //     dataField: "",
        //     text: "Size",
        //     sort: true,
        // },
    ];

    const [modal, setModal] = useState(false);
    const [modal1, setModal1] = useState(false);

    const toggleModal = () => setModal(!modal);
    const toggleModal1 = () => setModal1(!modal1);

    const handleFileName = (e) => {

        setRowData(e.target.value);
    }
    const handleSubmit = (e) => {
        e.preventDefault();

        props.documentUpdateById(rowData, actionArray[0].id);
        setModal(false)

    }

    const handleSubmit1 = (e) => {
        e.preventDefault();

        props.documentDeleteById(actionArray[0].id);
        setModal1(false)

    }
    useEffect(() => {
        if (init) {
            props.AllDocumentByProperty(id, 'Uploaded');
            setInit(false)
        }
        if (props.user_document_update_loading === "Success") {
            toastr.success('Edited Successfull');
            props.documentUpdateByIdFresh();
            // props.AllDocumentByProperty(id);
            toggle(state.activeTab)
            setTable([])
        }

        if (props.user_document_delete_loading === "Success") {
            toastr.success('Deleted Successfull');
            props.documentDeleteByIdFresh();
            // props.AllDocumentByProperty(id);
            toggle(state.activeTab)

        }

    }, [props.all_property_document_loading, props.user_document_update_loading, props.user_document_delete_loading]);

    useEffect(() => {
        if (modal) {
            setRowData(actionArray?.[0]?.name)
        }
    }, [modal])

    const toggle = (tab, type) => {
        if (state.activeTab !== tab) {
            setState({
                ...state,
                activeTab: tab,
            });
        }
        if (tab == '1') {
            props.AllDocumentByProperty(id, 'Uploaded')
        } else {
            props.AllDocumentByProperty(id, 'Generated')

        }
    };

    const selectRow = {
        mode: "checkbox",
        selected: table,

        onSelect: handleSelect,

        onSelectAll: handleSelectAll,
    };

    console.log(props.all_document_by_property);

    return (
        <div className="page-content">
            <Container fluid={true}>
                <Row>
                    <Col lg={12}>
                        <div>
                            <Card>
                                <CardBody>
                                    <h4 className="ms-2 mb-4 text-primary">Document for {props.all_property_document?.data?.data[0]?.property?.reference}</h4>
                                    <div className="button-groups">
                                        {state.activeTab == '1' &&
                                            <button
                                                type="button"
                                                className="btn btn-info"
                                                disabled={actionArray.length == 1 ? false : true}
                                                onClick={toggleModal}
                                            >
                                                <i className="fas fa-pen me-1" />Edit File name
                                            </button>}

                                        <button
                                            type="button"
                                            className="btn btn-secondary ms-1"
                                            disabled={actionArray.length ? false : true}
                                            onClick={toggleModal1}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </CardBody>
                            </Card>
                            <Card>
                                <CardBody>
                                    <div>
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
                                                    Uploaded
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
                                                    Generated
                                                </NavLink>
                                            </NavItem>
                                        </Nav>



                                        <TabContent
                                            activeTab={state.activeTab}
                                            className="p-3 text-muted"
                                        >
                                            <TabPane tabId={state.activeTab}>
                                                <Row>
                                                    <Col sm="12">
                                                        {/* <CardText className="mb-0">
                                                            {props.all_property_document ? (
                                                                <DatatableTables2
                                                                    products={props.all_property_document.data}
                                                                    columnData={columnData}
                                                                />
                                                            ) : null}
                                                        </CardText> */}
                                                        <CardText className="mb-0">
                                                            {props.all_document_by_property &&
                                                                <PaginationProvider
                                                                    pagination={paginationFactory(pageOptions)}
                                                                    keyField="id"
                                                                    columns={columnData}
                                                                    data={props.all_document_by_property?.data?.data}
                                                                >
                                                                    {({ paginationProps, paginationTableProps }) => (
                                                                        <ToolkitProvider
                                                                            keyField="id"
                                                                            columns={columnData}
                                                                            data={props.all_document_by_property?.data?.data}
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
                                                                                                <div className="d-flex justify-content-end align-items-center search-box" style={{ marginTop: "100px" }}>
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
                                                            {/* {jobData.data ? (
                                                                <DatatableTables2
                                                                    products={jobData}
                                                                    columnData={columnJobData}
                                                                />
                                                            ) : null} */}
                                                        </CardText>
                                                    </Col>
                                                </Row>
                                            </TabPane>
                                        </TabContent>
                                    </div>
                                </CardBody>
                            </Card>
                        </div>
                    </Col>
                </Row>
            </Container>

            {/* ============ edit modal start=============== */}
            <Modal isOpen={modal} toggle={toggleModal} >
                <ModalHeader className="text-info" toggle={toggleModal}>
                    <span className="text-info">Edit {actionArray?.[0]?.name} file name</span>
                </ModalHeader>
                <ModalBody>
                    <form className="py-2">
                        <FormGroup row>
                            <Label for="exampleText" sm={3}>
                                File Name
                            </Label>
                            <Col sm={9}>
                                <Input
                                    id="exampleText"
                                    name="fileName"
                                    value={rowData}
                                    type="text"
                                    required={true}
                                    onChange={handleFileName}
                                />
                            </Col>
                        </FormGroup>

                    </form>
                </ModalBody>
                <ModalFooter>
                    <div style={{ display: "flex", justifyContent: "flex-end", gap: 5 }}>
                        <Button color="primary" onClick={handleSubmit}>
                            Submit
                        </Button>{' '}
                        <Button color="secondary" onClick={toggleModal}>
                            Cancel
                        </Button>
                    </div>
                </ModalFooter>
            </Modal>
            {/* ============ edit modal ends=============== */}

            {/* ============ delete modal start=============== */}
            <Modal isOpen={modal1} toggle={toggleModal1} centered={true} style={{ width: "300px" }}>
                <ModalBody >
                    <div style={{ height: "100px" }}>
                        <div style={{ textAlign: "center" }}>
                            <h4>Are you sure?</h4>
                        </div>
                        <div style={{ display: "flex", justifyContent: "center", gap: 5, marginTop: "30px" }}>
                            <Button color="danger" type="submit" onClick={handleSubmit1}>
                                Yes
                            </Button>{' '}
                            <Button color="secondary" onClick={toggleModal1}>
                                No
                            </Button>
                        </div>
                    </div>



                </ModalBody>
                <ModalFooter>

                </ModalFooter>
            </Modal>
            {/* ============ delete modal ends=============== */}
        </div>
    );
}

const mapStateToProps = gstate => {
    const {
        all_property_document,
        all_property_document_error,
        all_property_document_loading,

        user_document_update_data,
        user_document_update_error,
        user_document_update_loading,

        user_document_delete_loading,

        all_document_by_property, all_document_by_property_error, all_document_by_property_loading
    } = gstate.Document;
    return {
        all_property_document,
        all_property_document_error,
        all_property_document_loading,

        user_document_update_data,
        user_document_update_error,
        user_document_update_loading,

        user_document_delete_loading,
        all_document_by_property, all_document_by_property_error, all_document_by_property_loading

    };
};

export default withRouter(
    connect(mapStateToProps, {
        AllDocumentByProperty,
        documentUpdateById,
        documentUpdateByIdFresh,
        documentDeleteById, documentDeleteByIdFresh,

    })(PropertyAllDocument)
);
