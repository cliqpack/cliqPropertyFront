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

import { transactionsInfoList, accountsList } from "store/actions";


import toastr from "toastr";
import { useHistory, useParams } from "react-router-dom";




const TransactionsInfoModalEdit = props => {

    const [state, setState] = useState();
    const [selectedAccount, setSelectedAccount] = useState();

    const handleSelectAccount = e => {

        setState({ ...state, account: e.value })
        setSelectedAccount(e);
    };
    const [optionGroupAccount, setOptionGroupAccount] = useState([]);



    const handleSubmit = () => {

    }

    useEffect(() => {
        if (props.accounts_list_loading === false) {

            props.accountsList()
        }

        let optionAccount;
        if (props.accounts_list_data?.data) {
            optionAccount = props.accounts_list_data?.data.map(item => ({
                label: item.account_name, value: item.id,
            }));
            setOptionGroupAccount(optionAccount);
        }
    }, [props.accounts_list_loading]);

    return (
        <>
            <Modal isOpen={props.state.transactionInfoModalEdit} toggle={props.toggle}>
                <ModalHeader toggle={props.toggle}>
                    <i className="fas fa-dollar-sign font-size-16 me-1 text-primary"></i>
                    <span className="text-primary">
                        Adjust Chart Account

                    </span>
                </ModalHeader>

                <ModalBody>
                    <Row>
                        <Col md={12}>
                            <div className="mb-3 w-100">
                                <Row className="d-flex align-items-center">

                                    <label>Select new chart account to apply to the transaction:</label>
                                    <Col md={12}>
                                        <Select
                                            value={selectedAccount}
                                            onChange={handleSelectAccount}
                                            options={optionGroupAccount}
                                            classNamePrefix="select2-selection"
                                            placeholder='Account'
                                        />

                                    </Col>
                                </Row>

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
                            Save
                        </button>
                    </div>

                </ModalFooter>
            </Modal>



        </>
    );
};



const mapStateToProps = gstate => {
    const {


        accounts_list_data,
        accounts_list_loading,


    } = gstate.Bills;

    const {
        transaction_list_info_loading, transaction_list_info_data
    } = gstate.AccountsTransactions;

    return {
        transaction_list_info_loading, transaction_list_info_data, accounts_list_data, accounts_list_loading,
    };
};

export default connect(mapStateToProps, {
    transactionsInfoList, accountsList
})(TransactionsInfoModalEdit);

