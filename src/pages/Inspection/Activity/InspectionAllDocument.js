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
    ModalBody,
    FormGroup,
} from "reactstrap";
import DatatableTables2 from "pages/Tables/DatatableTables2";
import Parser from "html-react-parser";
import { AllJobTaskInspectionDocument, inspectionDocumentUpdateById, inspectionDocumentUpdateByIdFresh, inspectionDocumentDeleteById, inspectionDocumentDeleteByIdFresh, AllDocumentByInspection } from "store/actions";
import moment from "moment";
import toastr from "toastr";

function InspectionAllDocument(props) {
    const { id } = useParams();
    const history = useHistory();
    const [modal, setModal] = useState(false);
    const [modal1, setModal1] = useState(false);

    const toggleModal = () => setModal(!modal);
    const toggleModal1 = () => setModal1(!modal1);
    const [rowData, setRowData] = useState();
    const [docID, setDocId] = useState();
    const handleModal = (rowData) => {
        console.log(rowData);
        //setRowData(rowData.doc_path);
        setRowData(rowData.name == null ? rowData.doc_path : rowData.name);
        setDocId(rowData.id);
        toggleModal();
    }

    const handleModal1 = (rowData) => {
        console.log(rowData);
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
        return <a href={process.env.REACT_APP_IMAGE + row.doc_path} target="_blank" rel="noreferrer noopener">{row.name == null ? row.doc_path.slice(0, 35) : row.name}</a>;
    };

    const propertyRef = (cell, row) => {
        return <span className="text-primary" onClick={() => pushProperty(row.property_id)}>{row.property?.reference.slice(0, 40)}</span>;
    };

    const ownerRef = (cell, row) => {
        return <span className="text-primary" onClick={() => pushOwner(row.owner_id)}>{row.property?.owner_id ? row.property?.owner : ''}</span>;
    };

    const tenantRef = (cell, row) => {
        return <span className="text-primary" onClick={() => pushTenant(row.tenant_id)}>{row.property?.tenant_id ? row.property?.tenant : ''}</span>;
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

    const handleFileName = (e) => {
        console.log(e.target.value);
        setRowData(e.target.value);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(rowData, docID);
        props.inspectionDocumentUpdateById(rowData, docID);
        setModal(false)

    }

    const handleSubmit1 = (e) => {
        e.preventDefault();
        //console.log(rowData);
        props.inspectionDocumentDeleteById(docID);
        setModal1(false)

    }

    const pushProperty = (id) => {
        history.push("/propertyInfo/" + id);
    }
    const pushOwner = (id) => {
        history.push("/contactsInfo/owner/" + id);
    }
    const pushTenant = (id) => {
        history.push("/contactsInfo/tenant/" + id);
    }

    const columnData = [
        {
            dataField: "id",
            text: "Date",
            formatter: dateRef,
            sort: true,
        },
        {
            dataField: "",
            text: "Filename",
            formatter: fileRef,
            sort: true,
        },
        {
            dataField: "",
            text: "Property",
            formatter: propertyRef,
            sort: true,
        },
        {
            dataField: "",
            text: "Owner",
            formatter: ownerRef,
            sort: true,
        },
        {
            dataField: "",
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
            formatter: buttonRef
        },
        // {
        //     dataField: "",
        //     text: "Client Access",
        //     sort: true,
        // },
        // {
        //     dataField: "",
        //     text: "Size",
        //     sort: true,
        // },
    ];
    console.log(props.all_document_by_inspection_data);

    const [init, setInit] = useState(true)

    useEffect(() => {
        if (init) {
            props.AllDocumentByInspection(id, 'Uploaded');
            setInit(false)
        }

        if (props.inspection_document_name_update_loading === "Success") {
            toastr.success('Edited Successfull');
            props.inspectionDocumentUpdateByIdFresh();
            props.AllJobTaskInspectionDocument();
        }

        if (props.inspection_document_delete_loading === "Success") {
            toastr.success('Deleted Successfull');
            props.inspectionDocumentDeleteByIdFresh();
            props.AllJobTaskInspectionDocument();
        }
    }, [props.all_document_by_inspection_loading, props.inspection_document_name_update_loading, props.inspection_document_delete_loading]);

    const toggle = (tab, type) => {
        if (state.activeTab !== tab) {
            setState({
                ...state,
                activeTab: tab,
            });
        }

        if (tab == 1) {
            props.AllDocumentByInspection(id, 'Uploaded')
        } else {
            props.AllDocumentByInspection(id, 'Generated')
        }
    };

    console.log(props.all_job_task_inspection_document);

    return (
        <div className="page-content">
            <Container fluid={true}>
                <Row>
                    <Col lg={12}>
                        <div>
                            <Card>
                                <CardBody>
                                    <h4 className="ms-2 mb-4 text-primary">Document</h4>
                                    <div className="button-items">
                                        {/* <Link to="/contact">
                      <button type="button" className="btn btn-info">
                        <i className="bx bx-user font-size-16 align-middle me-2"></i>
                        Add Contact
                      </button>
                    </Link>

                    <Link to="/addSupplier">
                      <button type="button" className="btn btn-info">
                        <i className="bx bx-user-plus font-size-18 align-middle me-2"></i>
                        Add Supplier
                      </button>
                    </Link> */}

                                        {/* <button type="button" className="btn btn-secondary">
                      <i className="fas fas fa-paper-plane font-size-12 align-middle me-2"></i>
                      Message
                      <i className="fas fas fa-chevron-down font-size-12 align-middle ms-2"></i>
                    </button>

                    <button disable type="button" className="btn btn-secondary">
                      Actions
                      <i className="fas fas fa-chevron-down font-size-12 align-middle ms-2"></i>
                    </button> */}
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
                                            <TabPane tabId="1">
                                                <Row>
                                                    <Col sm="12">
                                                        <CardText className="mb-0">
                                                            {props.all_document_by_inspection_data ? (
                                                                <DatatableTables2
                                                                    products={props.all_document_by_inspection_data.data}
                                                                    columnData={columnData}
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
                                                            {props.all_document_by_inspection_data ? (
                                                                <DatatableTables2
                                                                    products={props.all_document_by_inspection_data.data}
                                                                    columnData={columnData}
                                                                />
                                                            ) : null}
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

                {/* ============ edit modal start=============== */}
                <Modal isOpen={modal} toggle={toggleModal} centered={true}>
                    <ModalBody>
                        <form onSubmit={handleSubmit}>
                            <FormGroup row>
                                <Label for="exampleText" sm={3}>
                                    File Name
                                </Label>
                                <Col sm={9}>
                                    <Input
                                        id="exampleText"
                                        name="fileName"
                                        value={rowData ? rowData : ''}
                                        type="text"
                                        required={true}
                                        onChange={handleFileName}
                                    />
                                </Col>
                            </FormGroup>
                            <div style={{ display: "flex", justifyContent: "flex-end", gap: 5 }}>
                                <Button color="primary" type="submit">
                                    Submit
                                </Button>{' '}
                                <Button color="secondary" onClick={toggleModal}>
                                    Cancel
                                </Button>
                            </div>
                        </form>
                    </ModalBody>

                </Modal>
                {/* ============ edit modal ends=============== */}


                {/* ============ delete modal start=============== */}
                <Modal isOpen={modal1} toggle={toggleModal1} centered={true} style={{ width: "300px" }}>
                    <ModalBody >
                        <div style={{ height: "100px" }}>
                            <div style={{ textAlign: "center" }}>
                                <h4>Are you sure ?</h4>
                            </div>
                            <div style={{ display: "flex", justifyContent: "center", gap: 5, marginTop: "30px" }}>
                                <Button color="primary" type="submit" onClick={handleSubmit1}>
                                    Submit
                                </Button>{' '}
                                <Button color="secondary" onClick={toggleModal1}>
                                    Cancel
                                </Button>
                            </div>
                        </div>



                    </ModalBody>

                </Modal>
                {/* ============ delete modal ends=============== */}
            </Container>
        </div>
    );
}

const mapStateToProps = gstate => {
    const {
        all_job_task_inspection_document,
        all_job_task_inspection_document_error,
        all_job_task_inspection_document_loading,

        inspection_document_name_update_error,
        inspection_document_name_update_loading,

        inspection_document_delete_error,
        inspection_document_delete_loading, all_document_by_inspection_data, all_document_by_inspection_loading
    } = gstate.Document;
    return {
        all_job_task_inspection_document,
        all_job_task_inspection_document_error,
        all_job_task_inspection_document_loading,

        inspection_document_name_update_error,
        inspection_document_name_update_loading,

        inspection_document_delete_error,
        inspection_document_delete_loading, all_document_by_inspection_data, all_document_by_inspection_loading
    };
};

export default withRouter(
    connect(mapStateToProps, {
        AllJobTaskInspectionDocument,
        inspectionDocumentUpdateById,
        inspectionDocumentUpdateByIdFresh,
        inspectionDocumentDeleteById,
        inspectionDocumentDeleteByIdFresh, AllDocumentByInspection
    })(InspectionAllDocument)
);
