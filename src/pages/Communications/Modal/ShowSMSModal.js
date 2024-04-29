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

import { sendSMS, sendSMSFresh } from 'store/actions';


import toastr from "toastr";
import { useHistory } from 'react-router-dom';
import Loder from 'components/Loder/Loder';

const ShowSMSModal = (props) => {
    const history = useHistory();
    const [state, setState] = useState({})
    console.log(state);
    console.log('---sms modal---');
    console.log(props.data);
    useEffect(() => {
        // if (props.sms_add_loading === 'Succcess') {
        //     toastr.success('Success')
        //     props.sendSMSFresh();
        //     props.toggle();
        // }
        // if (props.sms_add_loading === 'Failed') {
        //     toastr.error('Something went wrong')
        //     props.sendSMSFresh();
        //     props.toggle();
        // }
        if (props.data) {
            setState({
                ...state,
                to: props.data.to,
            })
        }
    }, [props.data,]);

    const sendHandler = () => {
        props.sendSMS(state, props.data.body)

    }
    return (
        <>
            {/* ===============Inspection modal start from here ================*/}

            <Modal isOpen={props.show} toggle={props.toggle} >
                <ModalHeader toggle={props.toggle}>
                    <span className='text-primary'><i className='fas fa-sms me-1' />SMS</span>
                </ModalHeader>
                <ModalBody>
                    <div className='pt-3 px-2'>

                        <Card className="p-3 text-end">
                            <blockquote className="blockquote mb-0">
                                <CardText>
                                    {props.data.body}
                                </CardText>
                                {/* <footer className="blockquote-footer"> */}
                                <small className="text-muted">
                                    {" "}
                                    <cite title="Source Title"><span className='text-primary'>{props.data.to}</span></cite>
                                </small>
                                {/* </footer> */}
                            </blockquote>
                        </Card>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={props.toggle} >
                        Close
                    </Button>

                    <Button color="primary" onClick={sendHandler}>
                        Send
                    </Button>
                </ModalFooter>
            </Modal>

            {/* ===============Inspection modal ends here ================*/}
        </>

    )
}
const mapStateToProps = gstate => {
    const {
        sms_add_loading
    } = gstate.Message;



    return {
        sms_add_loading
    };
};
export default connect(mapStateToProps, {
    sendSMS, sendSMSFresh
})(ShowSMSModal);


