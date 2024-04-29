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

import { addInspectionInfo, InspectionListFresh, getUser } from 'store/actions';
import { addListingsModal, ListingsListFresh, addListingsModalFresh } from '../../store/Listings/actions'

import toastr from "toastr";
import { useHistory } from 'react-router-dom';


const ListingsModal = (props) => {
    const history = useHistory();
    const [inspectionModal, setInspectionModal] = useState(false);
    // const [type, setType] = useState('Sale');

    // const [property, SetProperty] = useState(props.propertyInfoData?.data.data.reference);
    const [state, setState] = useState({
        type: 'Rental',
    })

    const toggle = () => setInspectionModal(!inspectionModal);

    // console.log(props.listing_modal_add_loading);
    useEffect(() => {
        if (props.listing_modal_add_loading === "Success") {
            console.log(props.listing_modal_add_loading);
            console.log('Inside sucess-----');
            toastr.success("Listing Added Successfully");
            props.addListingsModalFresh();
        }
        if (props.listing_modal_add_loading === 'Failed') {
            toastr.error("Something went wrong");

        }
        if (props.user_list_loading == false) {
            props.getUser();
        }

    }, [props.user_list_loading, props.listing_modal_add_loading]);

    const selectHandler = e => {
        setState({ ...state, [e.target.name]: e.target.value });
    };

    const id = props.id;

    const handleSubmit = (e) => {
        e.preventDefault();
        props.ListingsListFresh();
        props.addListingsModal(state, id);

    };

    // console.log(props.propertyInfoData?.data.data.reference);

    let userData = undefined;
    if (props.user_list_data) {
        userData = props.user_list_data?.data?.map((item, key) => (
            <option key={key} value={item.id}>
                {item.first_name + " " + item.last_name}
            </option>
        ));
    }

    return (
        <>
            <Button className="btn w-md m-1" color="info" onClick={toggle}>
                <i className="fas fa-laptop-house font-size-12 align-middle me-2"></i> Listings
            </Button>

            {/* ===============Inspection modal start from here ================*/}

            <Modal isOpen={inspectionModal} toggle={toggle} >
                <ModalHeader toggle={toggle}>
                    <i className="bx bx-task me-1" ></i>
                    New Listing for name</ModalHeader>

                <ModalBody>
                    <Form className="form p-3">

                        <FormGroup row>
                            <Label
                                for="exampleSelect"
                                sm={3}
                            >
                                Property
                            </Label>
                            <Col sm={9}>
                                <Input
                                    id="exampleSelect"
                                    name="property"

                                    type="select"
                                    disabled
                                // required={true}

                                >
                                    <option>{props.propertyInfoData?.data?.data?.reference}</option>
                                </Input>
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Label
                                for="exampleSelect"
                                sm={3}
                            >
                                Type
                            </Label>
                            <Col sm={9}>
                                <Input
                                    id="exampleSelect"
                                    name="type"

                                    onChange={selectHandler}
                                    type="select"
                                    required={true}
                                >
                                    <option>
                                        Rental
                                    </option>
                                    <option>
                                        Sale
                                    </option>


                                </Input>
                            </Col>
                        </FormGroup>


                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={(e) => { handleSubmit(e); toggle(); }} >
                        <i className="fas fa-file-alt me-1"></i>Save
                    </Button>
                    {/* <Button color="primary" onClick={toggle} >
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
        user_list_data,
        user_list_error,
        user_list_loading,
    } = gstate.property;

    const {
        inspection_add_data,
        inspection_add_error,
        inspection_add_loading,

    } = gstate.Inspections;

    const {
        listing_modal_add_loading

    } = gstate.Listing;

    return {
        inspection_add_data,
        inspection_add_error,
        inspection_add_loading,

        user_list_data,
        user_list_error,
        user_list_loading,

        listing_modal_add_loading
    };
};
export default connect(mapStateToProps, {
    addInspectionInfo,
    InspectionListFresh,
    getUser,
    addListingsModal,
    ListingsListFresh,
    addListingsModalFresh
})(ListingsModal);


