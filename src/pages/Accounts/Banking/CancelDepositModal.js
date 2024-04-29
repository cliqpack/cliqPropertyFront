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
import { CancelDeposit, lastDeposit, CancelDepositFresh, BankList, DepositOutstandingShow } from "store/actions";



import toastr from "toastr";
import { useHistory } from 'react-router-dom';


const CancelDepositModal = (props) => {
    const history = useHistory();
    const [seen, setSeen] = useState(false);


    const [state, setState] = useState({

    })

    const submitHandler = () => {
        props.CancelDeposit(props.last_deposit_data?.current);
    }

    useEffect(() => {
        if (!seen) {
            props.lastDeposit();
        }
        if (props.cancel_deposit_data_loading === 'Success') {
            toastr.success('Last deposit cancelled');
            props.BankList();
            props.DepositOutstandingShow();
            props.CancelDepositFresh();
            props.toggle();
        }
        setSeen(true)
    }, [props.cancel_deposit_data_loading])

    let modalBody = <span>No deposit record found</span>
    if (props.last_deposit_data?.current) {
        modalBody = <div>
            <span> The last bank deposit was on <b>{moment(props.last_deposit_data?.current?.deposit_date).format('DD/MM/YYYY')}</b> with total amount <b>{props.last_deposit_data?.current?.total}৳</b> <br /></span>
            <span>  Are you sure you want to cancel the <b>last bank deposit</b>?</span>
        </div>
    }
    console.log(props.last_deposit_data);

    return (
        <>
            <Modal isOpen={props.state.deopsitModal} toggle={props.toggle}>
                <ModalHeader toggle={props.toggle}>
                </ModalHeader>

                <ModalBody>
                    {modalBody}
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={props.toggle}>
                        Cancel
                    </Button>
                    <Button 
                        color="primary" onClick={submitHandler}
                        disabled={props.last_deposit_data?.current ? false : true}
                    >
                        Ok
                    </Button>

                </ModalFooter>
            </Modal>

        </>

    )
}
const mapStateToProps = gstate => {
    const {
        cancel_deposit_data_loading,
        last_deposit_data,
        last_deposit_data_error,
        last_deposit_data_loading,
    } = gstate.Banking;

    return {
        cancel_deposit_data_loading,
        last_deposit_data,
        last_deposit_data_error,
        last_deposit_data_loading,
    };
};
export default connect(mapStateToProps, {
    CancelDeposit, lastDeposit, CancelDepositFresh, BankList, DepositOutstandingShow
})(CancelDepositModal);


