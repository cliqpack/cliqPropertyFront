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
import { set } from "lodash";



const ReverseModal = props => {
    const { id } = useParams();
    const currentDate = moment().format('YYYY-MM-DD');

    const [state, setState] = useState({ date: currentDate })




    const handleSave = (e) => {
        e.preventDefault();

    }

    const handleClose = (e) => {
        e.preventDefault();
        props.toggle();
    }

    useEffect(() => {


    }, []);

    return (
        <>





            <Modal size="lg" isOpen={props.state.reverseModal} toggle={props.toggle} scrollable={true}>
                <ModalHeader toggle={props.toggle}>

                    <span className="text-primary">Are you sure you want to reverse the last disbursement for OWN00033 now?
                    </span>
                </ModalHeader>

                {/* <ModalBody>

                    <div>
                        This disbursement will not change the Next Disbursement Date for this owner. If required, check and amend the Next Disbursement Date for this owner after processing this manual disbursement.
                    </div>

                </ModalBody> */}
                <ModalFooter>
                    <div className="d-flex justify-content-end">
                        <button
                            type="submit"
                            className="btn btn-info"
                            onClick={handleClose}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="btn btn-info ms-2"
                            onClick={handleSave}
                        >
                            Ok
                        </button>
                    </div>

                </ModalFooter>
            </Modal>
        </>
    );
};
const mapStateToProps = gstate => {


    const {
    } = gstate.Reconciliations;
    return {


    };
};

export default connect(mapStateToProps, {
})(ReverseModal);
