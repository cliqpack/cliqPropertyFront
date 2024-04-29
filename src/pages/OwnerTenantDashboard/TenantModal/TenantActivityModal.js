import moment from 'moment';
import React, { useEffect, useState } from 'react';
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
    Form,
    FormGroup, FormText
} from "reactstrap";
import { connect } from "react-redux";

import { } from 'store/actions';


import toastr from "toastr";
import { useHistory } from 'react-router-dom';

const TenantActivityModal = (props) => {
    console.log(props.data);
    return (
        <>
            {/* ===============Inspection modal start from here ================*/}

            <Modal isOpen={props.show} toggle={props.toggle} >
                {/* <ModalHeader toggle={props.toggle}>
                    <i className="bx bx-task me-1" ></i>
                    New Listing for name
                </ModalHeader> */}

                <ModalBody>
                    <div>
                        <div className='py-3'><h5 className='text-primary'>Transaction Detail</h5></div>
                        {props.data?.receipt_details?.map((item, i) => (
                            <div key={i}>
                                <Row className="py-2">
                                    {/* <Col md={3}>{item.allocation}</Col> */}
                                    <Col md={6}>{item.description || ''}</Col>
                                    <Col md={6} className='d-flex justify-content-end'>{item?.amount || ''}</Col>
                                </Row>
                            </div>
                        ))}
                        <Row>
                            <Col md={6} className='fw-bold'>Total</Col>
                            <Col md={6} className='fw-bold d-flex justify-content-end'>
                                {props.data?.amount || ''}
                            </Col>
                        </Row>
                        <div
                            className='my-4'
                            style={{ borderBottom: "1.2px dotted #c9c7c7" }}
                        />
                        <div>
                            <Row>
                                <Col md={6}>
                                    Transaction date
                                </Col>
                                <Col md={6} className='d-flex justify-content-end'>
                                    {moment(props.data?.receipt_date || '').format('DD MMMM yyyy')}
                                </Col>
                            </Row>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={props.toggle}>
                        {/* <i className="fas fa-file-alt me-1"></i> */}
                        Close
                    </Button>
                    {/* <Button color="primary" onClick={e => { handleSubmit(e); setSaveNExitStatus(true); }} >
                        <i className="fas fa-file-alt me-1"></i>Save & Open
                    </Button> */}

                </ModalFooter>
            </Modal>

            {/* ===============Inspection modal ends here ================*/}
        </>

    )
}
const mapStateToProps = gstate => {
    const {

    } = gstate.property;

    const {

    } = gstate.Inspections;

    const {

    } = gstate.Listing;

    return {

    };
};
export default connect(mapStateToProps, {

})(TenantActivityModal);


