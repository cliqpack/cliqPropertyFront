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




const FilterModal = props => {



    const handleSubmit = () => {
        props.action()
        props.toggle()
    }
    const handleReset = () => {
        props.reset()
        props.toggle()
    }

    useEffect(() => {
        if (props.transaction_list_info_loading === false) {
            props.transactionsInfoList(props.state.transactionId)
        }
    }, [props.transaction_list_info_loading]);

    return (
        <>
            <Modal isOpen={props.open} toggle={props.toggle}>
                <ModalHeader toggle={props.toggle}>
                    <span className="text-primary">
                        Filter
                    </span>
                </ModalHeader>

                <ModalBody>
                    <Row>
                        <Col md={12}>
                            <div className="mb-3 w-100">
                                { props.body }
                            </div>
                        </Col>
                    </Row>
                </ModalBody>
                <ModalFooter>
                    <div className="d-flex justify-content-end">
                        <button
                            type="submit"
                            className="btn btn-info"
                            onClick={handleReset}
                        >
                            <i className="fas fa-ban"></i> Reset
                        </button>
                        <button
                            type="submit"
                            className="btn btn-info ms-2"
                            onClick={handleSubmit}
                        >
                            <i className="fas fa-filter"></i> Filter
                        </button>
                    </div>

                </ModalFooter>
            </Modal>



        </>
    );
};



const mapStateToProps = gstate => {


    const {
        // transaction_list_info_loading, transaction_list_info_data
    } = gstate.AccountsTransactions;

    return {
        // transaction_list_info_loading, transaction_list_info_data
    };
};

export default connect(mapStateToProps, {
    // transactionsInfoList
})(FilterModal);

