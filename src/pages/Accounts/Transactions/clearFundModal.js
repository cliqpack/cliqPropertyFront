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
    Table
} from "reactstrap";
import { connect } from "react-redux";
import Select from "react-select"

import { transactionsInfoList } from "store/actions";


import toastr from "toastr";
import { useHistory, useParams } from "react-router-dom";




const ClearFundModal = props => {



    const handleSubmit = () => {

    }

    useEffect(() => {

        if (props.transaction_list_info_loading === false) {
            props.transactionsInfoList(props.state.transactionId)
        }
    }, [props.transaction_list_info_loading]);

    return (
        <>
            <Modal isOpen={props.state.clearFundModal} toggle={props.toggle}>
                <ModalHeader toggle={props.toggle}>
                    <i className="fas fa-dollar-sign font-size-16 me-1 text-primary"></i>
                    <span className="text-primary">
                        This will set clear date to today for 300.00৳ deposit
                    </span>
                </ModalHeader>

                <ModalBody>
                    <Row>
                        <Col md={12}>
                            <div className="mb-3 w-100">
                                Are you sure you want to continue?

                            </div>
                        </Col>
                    </Row>
                </ModalBody>
                <ModalFooter>
                    <div className="d-flex justify-content-end">
                        <button
                            type="submit"
                            className="btn btn-info"
                            onClick={props.toggle}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="btn btn-info ms-2"
                            onClick={handleSubmit}
                        >
                            OK
                        </button>
                    </div>

                </ModalFooter>
            </Modal>



        </>
    );
};



const mapStateToProps = gstate => {


    const {
        transaction_list_info_loading, transaction_list_info_data
    } = gstate.AccountsTransactions;

    return {
        transaction_list_info_loading, transaction_list_info_data
    };
};

export default connect(mapStateToProps, {
    transactionsInfoList
})(ClearFundModal);

