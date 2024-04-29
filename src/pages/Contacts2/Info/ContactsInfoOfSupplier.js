import React, { useEffect, useState, useRef } from "react";
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
} from "reactstrap";
import {
    useLocation,
    withRouter,
    Link,
    useParams,
    useHistory,
} from "react-router-dom";
import { connect } from "react-redux";
import { SupplierInfoFresh, storePropertyDocument } from 'store/actions';
import { useDispatch } from "react-redux";
import Aos from "aos";
import "aos/dist/aos.css";

const ContactsInfoOfSupplier = ({ item }) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { id } = useParams();
    const inputFile = useRef(null);
    const [showDropZone, setShowDropZone] = useState(false);

    const supplierEditHandler = (id, tId) => {
        dispatch(SupplierInfoFresh());
        history.push("/supplier/edit/" + id + '/' + tId);
    };

    const tenantDrag = e => {
        e.preventDefault();
        setShowDropZone(true);
    };

    const tenantDragend = e => {
        e.preventDefault();

        setShowDropZone(false);
    };

    const tenantDropFile = e => {
        e.preventDefault();
        setShowDropZone(false);
    };

    const handlejobDoc = e => {
        e.preventDefault();
        // setShow(true)
        dispatch(storePropertyDocument(
            e.dataTransfer.files,
            item.property_id, item?.contact_id, null, null, item.id, null
        ));
    };

    const handleUploadFiles = async e => {
        dispatch(storePropertyDocument(
            e.target.files,
            item.property_id, item?.contact_id, null, null, item.id, null
        ));
    };


    const supplierFolioHandler = (folio_id, id) => {
        history.push('/supplierFolio/' + folio_id, { id: id });
    };

    return (
        <React.Fragment>
            <Card data-aos="fade-right" data-aos-once={true} className="custom_card_border_design me-2">
                <CardBody>
                    <div className=""
                        onDragOver={tenantDrag}
                        onDragLeave={tenantDragend}
                        onDrop={tenantDropFile}
                    >

                        {showDropZone &&
                            <div
                                style={{
                                    position: "relative",
                                    height: "300px",
                                    width: "100%",
                                    border: "4px dashed grey",
                                    borderRadius: "5px",
                                }}
                                onDrop={e => handlejobDoc(e)}
                                className="mt-2"
                            >
                                <div
                                    className="dz-message needsclick"
                                    style={{
                                        position: "absolute",
                                        left: "50%",
                                        top: "50%",
                                        transform: "translate(-50%, -50%)",
                                    }}
                                >
                                    <div className="mb-3">
                                        <i className="display-4 text-muted bx bxs-cloud-upload" />
                                    </div>
                                    <h4>Add document for Supplier</h4>
                                </div>
                            </div>
                        }


                        {!showDropZone ? <div>
                            <div className="w-100 mt-1">
                                <Row className="d-flex justify-content-between">
                                    {" "}
                                    <Col md={6} className="d-flex align-items-center">
                                        <h4 className="d-flex align-items-center text-primary fw-bold">

                                            Supplier
                                        </h4>

                                    </Col>
                                    <Col md={6} className="d-flex justify-content-end align-items-center">
                                        <i className="fas fa-cloud-upload-alt font-size-16 me-1 text-white" style={{ padding: "9px 12px", backgroundColor: "#0F2E5A", borderRadius: "5px" }} />
                                        <input
                                            type="file"
                                            onChange={handleUploadFiles}
                                            ref={inputFile}
                                            style={{ display: "none" }}
                                            multiple
                                        />
                                        <Button
                                            className="btn"
                                            color="info"
                                            onClick={() => inputFile.current.click()}
                                        >
                                            {" "}
                                            <i className="bx bx-camera d-block font-size-20"></i>
                                        </Button>
                                        <button type="button" className="ms-1 btn btn-info" onClick={() => supplierEditHandler(item.id, 2)}>
                                            <i className="fa fa-solid fa-pen" />
                                        </button>
                                        <Button
                                            type="button"
                                            className="ms-1 btn btn-labelColor"
                                            onClick={() => {
                                                supplierFolioHandler(
                                                    item.supplier_details.id, item.id

                                                );
                                            }}
                                        >
                                            <i className="fa fa-solid fa-dollar-sign" />
                                        </Button>

                                    </Col>
                                </Row>{" "}
                                <div
                                    className="w-100 mt-2 "
                                    style={{ borderBottom: "1.2px solid #153D56" }}
                                />
                            </div>

                            <div className="mt-3">
                                <Row className="py-1">
                                    <Col md={6}>
                                        <Row className="d-flex">
                                            <Col md={5}>
                                                <p className="text-textTitleColor">Company</p>
                                            </Col>
                                            <Col md={7}>
                                                {" "}
                                                <p style={{ color: "#003786" }}>{item.company_name ? item.company_name : ''}</p>
                                            </Col>
                                        </Row>
                                        <div
                                            className="w-100 "
                                            style={{ borderBottom: "1.2px solid #C1C1C1" }}
                                        />
                                    </Col>
                                    <Col md={6}>
                                        <Row className="d-flex">
                                            <Col md={5}>
                                                <p className="text-textTitleColor">Folio code</p>
                                            </Col>
                                            <Col md={7}>
                                                {" "}
                                                <Link to={`/supplier/edit/${item.id}/2`}>
                                                    {item?.first_name ? item?.first_name + ' ' : ''}
                                                    {item?.last_name ? item?.last_name : ''} ({item?.supplier_details?.folio_code})
                                                </Link>
                                            </Col>
                                        </Row>
                                        <div
                                            className="w-100 "
                                            style={{ borderBottom: "1.2px solid #C1C1C1" }}
                                        />
                                    </Col>
                                </Row>
                                <Row className="py-1">
                                    <Col md={6}>
                                        <Row className="d-flex">
                                            <Col md={5}>
                                                <p className="text-textTitleColor">Account code</p>
                                            </Col>
                                            <Col md={7}>
                                                {/* <p>{item?.supplier_details?.account ? item?.supplier_details?.supplier_account?.account_name + ' ' + item?.supplier_details?.supplier_account?.account_number + : ''}</p> */}
                                                <p>{item?.supplier_details?.supplier_account?.account_name ?
                                                    `${item?.supplier_details?.supplier_account?.account_name} - ${item?.supplier_details?.supplier_account?.account_number}`
                                                    : ""}</p>
                                            </Col>
                                        </Row>
                                        <div
                                            className="w-100 "
                                            style={{ borderBottom: "1.2px solid #C1C1C1" }}
                                        />
                                    </Col>
                                    <Col md={6}>
                                        <Row className="d-flex">
                                            <Col md={5}>
                                                <p className="text-textTitleColor">Balances</p>
                                            </Col>
                                            <Col md={7}>
                                                <p>{item.supplier_details?.balance ? item.supplier_details?.balance : 0.00}৳</p>
                                            </Col>
                                        </Row>{" "}
                                        <div
                                            className="w-100 "
                                            style={{ borderBottom: "1.2px solid #C1C1C1" }}
                                        />
                                    </Col>
                                </Row>
                                <Row className="py-1">
                                    <Col md={6}>
                                        <Row className="d-flex">
                                            <Col md={5}>
                                                <p className="text-textTitleColor">Website</p>
                                            </Col>
                                            <Col md={7}>
                                                <p>{item.supplier_details?.website ? item.supplier_details?.website : ''}</p>
                                            </Col>
                                        </Row>
                                        <div
                                            className="w-100 "
                                            style={{ borderBottom: "1.2px solid #C1C1C1" }}
                                        />
                                    </Col>
                                    <Col md={6}>
                                        <Row className="d-flex">
                                            <Col md={5}>
                                                <p className="text-textTitleColor">Bills pending</p>
                                            </Col>
                                            <Col md={7}>
                                                <p>{item?.total_bills_amount_sum_amount ? `${item?.total_bills_amount_sum_amount}৳` : '0.00'}৳</p>
                                            </Col>
                                        </Row>{" "}
                                        <div
                                            className="w-100 "
                                            style={{ borderBottom: "1.2px solid #C1C1C1" }}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <Row className="d-flex">
                                            <Col md={5}>
                                                <p className="text-textTitleColor">ABN</p>
                                            </Col>
                                            <Col md={7}>
                                                <p>{item.supplier_details?.abn ? item.supplier_details?.abn : ''}</p>
                                            </Col>
                                        </Row>
                                        <div
                                            className="w-100 "
                                            style={{ borderBottom: "1.2px solid #C1C1C1" }}
                                        />
                                    </Col>
                                    <Col md={6}>
                                        <Row className="d-flex">
                                            <Col md={5}>
                                                <p className="text-textTitleColor">Invoices pending</p>
                                            </Col>
                                            <Col md={7}>
                                                {" "}
                                                <p>{item.total_due_invoice_sum_amount ? `${(item.total_due_invoice_sum_amount - item.total_part_paid_invoice_sum_paid)}৳` : '0.00৳'}</p>
                                            </Col>
                                        </Row>{" "}
                                        <div
                                            className="w-100 "
                                            style={{ borderBottom: "1.2px solid #C1C1C1" }}
                                        />
                                    </Col>
                                </Row>
                                <Row className="py-1">
                                    <Col md={6}>
                                        <Row className="d-flex">
                                            <Col md={5}>
                                                <p></p>
                                            </Col>
                                            <Col md={7}></Col>
                                        </Row>
                                    </Col>
                                    <Col md={6}>
                                        <Row className="d-flex">
                                            <Col md={5}>
                                                {" "}
                                                <p className="text-textTitleColor">Bill priority</p>
                                            </Col>
                                            <Col md={7}>
                                                {" "}
                                                <p>{item.supplier_details?.priority ? item.supplier_details?.priority : ''}</p>
                                            </Col>
                                        </Row>{" "}
                                        <div
                                            className="w-100 "
                                            style={{ borderBottom: "1.2px solid #C1C1C1" }}
                                        />
                                    </Col>
                                </Row>
                                <Row className="py-1">
                                    <Col md={6}>
                                        <Row className="d-flex">
                                            <Col md={5}>
                                                <p className="text-textTitleColor"></p>
                                            </Col>
                                            <Col md={7}>
                                                {" "}
                                                <p></p>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col md={6}>
                                        <Row className="d-flex">
                                            <Col md={5}>
                                                <p className="text-textTitleColor">Payment methods</p>
                                            </Col>
                                            <Col md={7}>
                                                <Link to={`/supplier/edit/${item.id}/3`}>
                                                    <div className='d-flex'>
                                                        <p>
                                                            {item.supplier_payments.length === 0 ? 'None' : item.supplier_payments.length === 1 ? item.supplier_payments[0]?.payment_method : `Split(${item.supplier_payments.map(item =>
                                                                item.split_type == '৳' ? `${item.split ? item.split : '0'}.00৳` : ` ${item.split}%`
                                                            )}
                                          )`
                                                            }
                                                        </p>
                                                        <i className="ms-1 mdi mdi-pencil d-block font-size-16 text-textTitleColor"></i>
                                                    </div>
                                                </Link>
                                            </Col>
                                        </Row>{" "}
                                        <div
                                            className="w-100 "
                                            style={{ borderBottom: "1.2px solid #C1C1C1" }}
                                        />
                                    </Col>
                                </Row>
                            </div>
                        </div> : ''
                        }


                    </div>
                </CardBody>
            </Card>
        </React.Fragment>
    );
};

Aos.init({
    once: true,
});

const mapStateToProps = gstate => {
    const {
        contacts_show_data,
        contacts_show_loading,
    } =
        gstate.Contacts2;
    return {
        contacts_show_data,
        contacts_show_loading,
    };
};
export default withRouter(
    connect(mapStateToProps, {

        SupplierInfoFresh, storePropertyDocument
    })(ContactsInfoOfSupplier)
);