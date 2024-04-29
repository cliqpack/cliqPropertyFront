import React, {
    useEffect,
    useRef,
    useState,
    useMemo,
    useCallback,
} from "react";
import {
    Link,
    useHistory,
    useLocation,
    useParams,
    withRouter,
} from "react-router-dom";
import {
    Card,
    CardBody,
    CardTitle,
    Col,
    Row,
    CardText,
    Nav,
    NavItem,
    NavLink,
    TabContent,
    TabPane,
    Button,
    Modal,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Alert,
    Progress,
    Carousel,
    CarouselControl,
    CarouselItem,
    Label,
    Tooltip,
    Container,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from "reactstrap";
import TooltipVisibility from './Documents/TooltipVisibility';
import moment from "moment";


export default function PropertyDocs({ documentModal, documentToggle, data, id, component }) {
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
                                justifyItems: "center",
                                justifyContent: "flex-end",
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

                                <Link to={`${component == 'Property' ? `/all-property-document/${id}` : component == 'Task' ? `/all-task-document/${id}` : component == 'Jobs' ? `/all-job-document/${id}` : `/all-listing-document/${id}`}`}>

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
                                    {data?.map(
                                        (element, idx) => {
                                            return (

                                                <Col md={12} key={element.id}>

                                                    <Card>
                                                        <CardBody>
                                                            {/* <div
                                                                style={{
                                                                    display: "flex",
                                                                    justifyContent: "space-between",
                                                                }}
                                                            >
                                                                <div
                                                                    style={{
                                                                        width: "60%",
                                                                        display: "flex",
                                                                        justifyContent: "flex-start",
                                                                    }}
                                                                >
                                                                    <div style={{ fontSize: "35px" }}>
                                                                        <i className="bx bxs-file-pdf me-2 font-size-25" />
                                                                    </div>
                                                                    <div>
                                                                        <div>
                                                                            <a
                                                                                href={
                                                                                    process.env.REACT_APP_IMAGE +
                                                                                    element.doc_path
                                                                                }
                                                                                target="_blank"
                                                                                rel="noreferrer noopener"
                                                                                style={{ fontSize: "14px" }}
                                                                            >
                                                                                {element.name == null
                                                                                    ? element.doc_path.slice(0, 13) +
                                                                                    "..."
                                                                                    : element.name}
                                                                            </a>
                                                                        </div>
                                                                        <div
                                                                            style={{ display: "flex", gap: "20px" }}
                                                                        >
                                                                            <div className="d-flex align-items-center">
                                                                                <i className="far fa-clock me-2" />
                                                                                {moment(element?.created_at).format(
                                                                                    "DD MMM YYYY"
                                                                                )}
                                                                            </div>
                                                                            <div className="d-flex align-items-center">
                                                                                <i className="fas fa-file me-2"></i>
                                                                                {(
                                                                                    Number(element.file_size) / 1024
                                                                                ).toFixed(2) +
                                                                                    " " +
                                                                                    "kb"}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                {element.owner_id && (
                                                                    <TooltipVisibility
                                                                        visibility={"visible"}
                                                                        text="to owner"
                                                                        placement="right"
                                                                        direction="TooltipRight"
                                                                    />
                                                                )}
                                                                {element.tenant_id && (
                                                                    <TooltipVisibility
                                                                        visibility={"visible"}
                                                                        text="to tenant"
                                                                        placement="bottom"
                                                                        direction="TooltipBottom"
                                                                    />
                                                                )}

                                                            </div> */}
                                                            <Row>
                                                                <Col md={1} className="d-flex justify-content-center align-items-center">
                                                                    {/* <div className="form-check">
                                                                        <input
                                                                            className="form-check-input"
                                                                            type="checkbox"
                                                                            value=""
                                                                            id="defaultCheck1"
                                                                        />

                                                                    </div> */}
                                                                </Col>
                                                                <Col md={11}>
                                                                    <Row>
                                                                        <Col md={6} className="">
                                                                            <Row className="d-flex">
                                                                                <Col md={2} className="d-flex align-items-center">


                                                                                    {element.owner_id || element.tenant_id ? <div style={{
                                                                                        background: '#F2F2F2'
                                                                                    }} className="px-2 py-2 rounded">
                                                                                        {element.owner_id &&
                                                                                            <i className="bx bxs-group font-size-22" />
                                                                                        }
                                                                                        {element.tenant_id &&
                                                                                            <i className="fas fa-home font-size-22" />}

                                                                                    </div> : ''}
                                                                                    {component == 'Task' &&
                                                                                        <i className="fas fa-file-alt
                                                                                        font-size-24" />
                                                                                    }
                                                                                    {component == 'Jobs' &&
                                                                                        <i className="fas fa-wrench font-size-24"></i>

                                                                                    }

                                                                                </Col>
                                                                                <Col md={10} className="ps-3">
                                                                                    <Row className="d-flex flex-column">
                                                                                        <Col className="">
                                                                                            <div>
                                                                                                <a
                                                                                                    href={
                                                                                                        process.env.REACT_APP_IMAGE +
                                                                                                        element.doc_path
                                                                                                    }
                                                                                                    target="_blank"
                                                                                                    rel="noreferrer noopener"
                                                                                                    style={{ fontSize: "14px" }}
                                                                                                    download={element.name}

                                                                                                >
                                                                                                    {element.name == null
                                                                                                        ? element.doc_path.slice(0, 13) +
                                                                                                        "..."
                                                                                                        : element.name}
                                                                                                </a>
                                                                                            </div>
                                                                                        </Col>
                                                                                        <Col className="pt-2">
                                                                                            <div className="d-flex align-items-center">
                                                                                                <i className="far fa-clock me-2" />
                                                                                                {moment(element?.created_at).format(
                                                                                                    "DD MMM YYYY"
                                                                                                )}
                                                                                            </div>
                                                                                        </Col>
                                                                                    </Row>
                                                                                </Col>
                                                                            </Row>
                                                                        </Col>
                                                                        <Col md={4} className="d-flex justify-content-center">
                                                                            <div

                                                                            >
                                                                                <div className="d-flex align-items-center">
                                                                                    <i className="far fa-clock me-2" />
                                                                                    {moment(element?.created_at).format(
                                                                                        "DD MMM YYYY"
                                                                                    )}
                                                                                </div>
                                                                                <div className="d-flex align-items-center pt-2">
                                                                                    <i className="fas fa-file me-2"></i>
                                                                                    {(
                                                                                        Number(element.file_size) / 1024
                                                                                    ).toFixed(2) +
                                                                                        " " +
                                                                                        "kb"}
                                                                                </div>
                                                                            </div>
                                                                        </Col>
                                                                        <Col md={2}>
                                                                            {element.owner_id && (
                                                                                <TooltipVisibility
                                                                                    visibility={"visible"}
                                                                                    text="to owner"
                                                                                    placement="right"
                                                                                    direction="TooltipRight"
                                                                                />
                                                                            )}
                                                                            {element.tenant_id && (
                                                                                <TooltipVisibility
                                                                                    visibility={"visible"}
                                                                                    text="to tenant"
                                                                                    placement="bottom"
                                                                                    direction="TooltipBottom"
                                                                                />
                                                                            )}
                                                                        </Col>
                                                                    </Row>
                                                                </Col>
                                                            </Row>

                                                        </CardBody>
                                                    </Card>
                                                </Col>
                                            );
                                        }
                                    )}
                                </Row>
                            </div>
                        </CardText>
                    </Col>
                </Row>
            </ModalBody>
        </Modal>
    )
}
