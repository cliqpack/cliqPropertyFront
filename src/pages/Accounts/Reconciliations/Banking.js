import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { Link, withRouter, useHistory } from "react-router-dom";
import { } from "store/actions";
import classnames from "classnames";
import DatatableTables2 from '../../Tables/DatatableTables2';
import toastr from "toastr";


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

import { setDefaultLocale } from "react-datepicker";
import moment from "moment";
import { logDOM } from "@testing-library/react";
import AdjustmentModal from "./Adjustments/AdjustmentModal";


document.title = "Reconciliations";



function Banking(props) {
    const [state, setState] = useState({
        showModal: false
    })

    const toggleModal = () => setState(prev => ({ showModal: !prev.showModal }))
    const inputRef = useRef(null);

    const [data, setData] = useState({});

    const history = useHistory();

    const date = moment().format("yyyy-MM-DD");







    const deleteDetails = (e, column, columnIndex, row, rowIndex) => {
        setData(row);

    };

    const deleteHandler = () => {
        e.preventDefault();

    }

    const statusRef = (cell, row) => {

        if (cell === 1) {
            return <span className=""><i className="fas fa-check" /></span>;
        } else {
            return <span className=""></span>;
        }
    };



    const amountRef = (cell, row) => {
        <span className="badge rounded-pill bg-secondary">{cell}</span>
    }

    const uploadBillDetails = (row) => {

    };

    const editRef = (cell, row) => (<span onClick={() => uploadBillDetails(row)} className="text-primary">Edit</span>)

    const delRef = (cell, row) => (<span className="text-danger" onClick={() => setDeleteState(prev => !prev)}>Delete</span>);



    const fileRef = (cell, row) => {
        return <a href={process.env.REACT_APP_IMAGE + row.file} target="_blank" rel="noreferrer noopener">{row.file?.slice(0, 150)}</a>
    }

    const activeData = [
        {
            dataField: "billing_date",
            text: "Date",
            sort: true
        },
        {
            dataField: "file",
            text: "File name",
            formatter: fileRef,
            sort: true
        },
        {
            dataField: "status",
            text: "Status",
            sort: true
        },
        {
            dataField: "",
            text: "Edit",
            sort: true,
            formatter: editRef,
        },
        {
            dataField: "",
            text: "Actions",
            sort: true,
            formatter: delRef,
            events: {
                onClick: (e, column, columnIndex, row, rowIndex) => {
                    deleteDetails(e, column, columnIndex, row, rowIndex);
                },
            },
        },
    ];

    const handleSubmitUploadBill = (e) => {

    }

    useEffect(() => {

    }, []);


    return (
        <div className="page-content">
            <Container fluid={true}>
                <Row>
                    <Col lg={12}>
                        <div>
                            <Row>
                                <Col md={12}>
                                    <Card>
                                        <CardBody>
                                            <Row>
                                                <Col md={6} className='px-1 py-2'>
                                                    <Row className="border-2">
                                                        <Col md={2} className='d-flex justify-content-center align-items-center'>
                                                            <i className="fas fa-university fa-3x" />
                                                        </Col>
                                                        <Col md={9} className='d-flex flex-column'>
                                                            <div><span>November 2022 (up to Thursday,24 November 2022)</span></div>
                                                            <Row className="d-flex justify-content-between align-items-center mt-2">
                                                                <Col className="d-flex flex-column justify-content-between py-1">
                                                                    <span>$6500.00</span>
                                                                    <span>cash</span>
                                                                </Col>
                                                                <Col className="d-flex flex-column justify-content-between py-1">
                                                                    <span>$0.00</span>
                                                                    <span>Cheque</span>
                                                                </Col>
                                                                <Col className="d-flex flex-column justify-content-between py-1">
                                                                    <span>$0.00</span>
                                                                    <span>card</span>
                                                                </Col>
                                                                <Col className="d-flex flex-column justify-content-between py-1">
                                                                    <span>$6500.00</span>
                                                                    <span>total</span>
                                                                </Col>
                                                            </Row>
                                                        </Col>
                                                        <Col md={1} className='d-flex justify-content-center align-items-center'>
                                                            <i className="fas fa-arrow-right font-size-18" />
                                                        </Col>
                                                    </Row>
                                                </Col>
                                                <Col md={6} className='d-flex justify-content-start align-items-center'>
                                                    <div className="button-items">
                                                        <button type="button" className="btn btn-info">
                                                            Deposit all outstanding
                                                        </button>
                                                        <button type="button" className="btn btn-secondary">
                                                            Actions
                                                        </button>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>





                            <Card>
                                <CardBody>
                                    <CardText className="mb-0">
                                        {/* {props.upload_bills_list_data ? (
                                            <DatatableTables2
                                                products={props.upload_bills_list_data}
                                                columnData={activeData}
                                            // url={url}
                                            />
                                        ) : null} */}
                                    </CardText>
                                </CardBody>
                            </Card>

                        </div>
                    </Col>
                </Row>
            </Container>



        </div >
    );
}

const mapStateToProps = gstate => {
    const {



    } = gstate.property;

    const {

    } = gstate.Bills;

    return {

    };
};

export default connect(mapStateToProps, {
})(Banking);