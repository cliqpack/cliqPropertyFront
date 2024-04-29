import moment from "moment";
import React, { useEffect, useState } from "react";
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
    FormGroup,
    FormText,
} from "reactstrap";
import { connect } from "react-redux";
import Select from "react-select"

import { } from "store/actions";


import toastr from "toastr";
import { useHistory, useParams } from "react-router-dom";



const EditChequeModal = props => {
    const [state, setState] = useState()

    const handleValues = e => {
        setState({ ...state, [e.target.name]: e.target.value });
    };

    const toggle = () => props.setState(prev => ({ activeTab: "2", checkModal: !prev.checkModal }));


    return (
        <>



            <button type="button" className="btn btn-sm btn-info" onClick={toggle}>
                Edit Cheque Number
            </button>


            <Modal isOpen={props.state.checkModal} toggle={toggle} scrollable={true}>
                <ModalHeader toggle={toggle}>
                    <span className="text-primary">New number for Cheque #520.<br />
                        Please enter a new Cheque number.</span>
                </ModalHeader>

                <ModalBody>

                    <div>
                        <div className="mb-3 w-100">
                            <Row className="d-flex align-items-center">


                                <Col md={12}>
                                    <input
                                        name="cheque"
                                        type="number"
                                        onChange={handleValues}
                                        className="form-control"
                                    />

                                </Col>
                            </Row>
                        </div>

                    </div>

                </ModalBody>
                <ModalFooter>
                    <div className="d-flex justify-content-end">
                        <button
                            type="submit"
                            className="btn btn-info"
                            onClick={toggle}
                        >
                            <i className="fas fa-times me-1"></i> Close
                        </button>
                        <button
                            type="submit"
                            className="btn btn-info ms-2"

                        >
                            <i className="fas fa-file-alt me-1"></i> Save
                        </button>
                    </div>

                </ModalFooter>
            </Modal>
        </>
    );
};
const mapStateToProps = gstate => {


    const {

    } = gstate.Bills;

    return {

    };
};

export default connect(mapStateToProps, {

})(EditChequeModal);
