import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
    Modal,
    ModalHeader,
    ModalBody,
    Row,
    Col,
    Card,
    CardBody,
    CardText,
} from "reactstrap";
import moment from "moment";
import { Tooltip } from "reactstrap";

export default function PropertyDocs({ documentModal, documentToggle, data, id, component, getAllPropertyDocs }) {

    const [tooltipOpen, setTooltipOpen] = useState({});

    // Toggle the tooltip for a specific document
    const toggleTooltip = (documentId) => {
        setTooltipOpen((prev) => ({
            ...prev,
            [documentId]: !prev[documentId],
        }));
    };

    const handleAccessToggle = async (documentId, currentAccess) => {
        const authUser = JSON.parse(localStorage.getItem("authUser"));
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authUser.token}`
        };
        const newAccess = currentAccess === 1 ? 0 : 1;
        const url = `${process.env.REACT_APP_LOCALHOST}/documents/${documentId}/access`;

        try {
            const response = await axios.put(url, { access: newAccess }, { headers: headers });
            getAllPropertyDocs(id)
        } catch (error) {
            console.error("Failed to update access", error);
        }
    };

    return (
        <Modal isOpen={documentModal} toggle={documentToggle} style={{ maxWidth: '700px' }} >
            <ModalHeader style={{ backgroundColor: "#153D58", height: "60px", maxWidth: '700px' }}>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "650px",
                        marginTop: "10px",
                    }}
                >
                    <div>
                        <p
                            className="fw-bold ps-2 font-size-16"
                            style={{ color: "white" }}
                        >
                            Documents
                        </p>
                    </div>
                    <div>
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "10px",
                            }}
                        >
                            <div
                                style={{
                                    cursor: "pointer",
                                    width: "50px",
                                    backgroundColor: "#3C627B",
                                    borderRadius: "8px",
                                }}
                            >
                                <Link to={`${component === 'Property' ? `/all-property-document/${id}` : component === 'Task' ? `/all-task-document/${id}` : component === 'Jobs' ? `/all-job-document/${id}` : `/all-listing-document/${id}`}`}>
                                    <div className="badge badge-soft-secondary d-flex align-items-start px-3 py-2 font-size-16 text-white">
                                        All
                                    </div>
                                </Link>
                            </div>
                            <div onClick={documentToggle} style={{ cursor: "pointer" }}>
                                <i className="mdi mdi-close-thick font-size-20 text-white"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </ModalHeader>
            <ModalBody>
                <Row>
                    <Col sm="12">
                        <CardText className="mb-0">
                            <div
                                style={{
                                    maxHeight: "380px",
                                    overflowY: "auto",
                                    overflowX: "hidden",
                                }}
                            >
                                <Row>
                                    {data?.map((element) => (
                                        <Col md={12} key={element.id}>
                                            <Card>
                                                <CardBody>
                                                    <Row>
                                                        <Col md={11}>
                                                            <Row>
                                                                <Col md={6}>
                                                                    <Row className="d-flex">
                                                                        <Col md={2} className="d-flex align-items-center">
                                                                            {element.owner_id || element.tenant_id ? (
                                                                                <div style={{ background: '#F2F2F2' }} className="px-2 py-2 rounded">
                                                                                    {element.owner_id && <i className="bx bxs-group font-size-22" />}
                                                                                    {element.tenant_id && <i className="fas fa-home font-size-22" />}
                                                                                </div>
                                                                            ) : ''}
                                                                            {component === 'Task' && <i className="fas fa-file-alt font-size-24" />}
                                                                            {component === 'Jobs' && <i className="fas fa-wrench font-size-24"></i>}
                                                                        </Col>
                                                                        <Col md={10} className="ps-3">
                                                                            <Row className="d-flex flex-column">
                                                                                <Col>
                                                                                    <div>
                                                                                        <a
                                                                                            href={`${process.env.REACT_APP_IMAGE}${element.doc_path}`}
                                                                                            target="_blank"
                                                                                            rel="noreferrer noopener"
                                                                                            style={{ fontSize: "14px" }}
                                                                                            download={element.name}
                                                                                        >
                                                                                            {element.name ?? element.doc_path.slice(0, 13) + "..."}
                                                                                        </a>
                                                                                    </div>
                                                                                </Col>
                                                                                <Col className="pt-2">
                                                                                    <div className="d-flex align-items-center">
                                                                                        <i className="far fa-clock me-2" />
                                                                                        {moment(element.created_at).format("DD MMM YYYY")}
                                                                                    </div>
                                                                                </Col>
                                                                            </Row>
                                                                        </Col>
                                                                    </Row>
                                                                </Col>
                                                                <Col md={4} className="d-flex justify-content-center">
                                                                    <div>
                                                                        <div className="d-flex align-items-center">
                                                                            <i className="far fa-clock me-2" />
                                                                            {moment(element.created_at).format("DD MMM YYYY")}
                                                                        </div>
                                                                        <div className="d-flex align-items-center pt-2">
                                                                            <i className="fas fa-file me-2"></i>
                                                                            {(Number(element.file_size) / 1024).toFixed(2) + " kb"}
                                                                        </div>
                                                                    </div>
                                                                </Col>
                                                                <Col md={2} className="d-flex justify-content-center align-items-center">
                                                                    <i
                                                                        className={`fas ${element.access === 1 ? 'fa-eye' : 'fa-eye-slash'} font-size-20`}
                                                                        style={{ color: 'black', cursor: 'pointer' }}
                                                                        onClick={() => handleAccessToggle(element.id, element.access)}
                                                                        id={`Tooltip-${element.id}`}
                                                                    ></i>
                                                                    <Tooltip
                                                                        isOpen={tooltipOpen[element.id]}
                                                                        target={`Tooltip-${element.id}`}
                                                                        toggle={() => toggleTooltip(element.id)}
                                                                    >
                                                                        {(() => {
                                                                            if (element.access === 1) {
                                                                                if (element.tenant_id) {
                                                                                    return "Visible to tenant";
                                                                                } else if (element.owner_id) {
                                                                                    return "Visible to owner";
                                                                                }
                                                                            }
                                                                            if (element.access === 0) {
                                                                                if (element.tenant_id) {
                                                                                    return "Invisible to tenant";
                                                                                } else if (element.owner_id) {
                                                                                    return "Invisible to owner";
                                                                                }
                                                                            }
                                                                        })()}
                                                                    </Tooltip>
                                                                </Col>
                                                            </Row>
                                                        </Col>
                                                    </Row>
                                                </CardBody>
                                            </Card>
                                        </Col>
                                    ))}
                                </Row>
                            </div>
                        </CardText>
                    </Col>
                </Row>
            </ModalBody>
        </Modal>
    );
}
