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

import { addInspectionInfo, InspectionListFresh, getUser, addListingsModalFresh, ListingListInfo, PropertyAllActivity } from 'store/actions';
import { addListingsModal, ListingsListFresh } from '../../store/Listings/actions';
import {
    propertyList
} from "../../store/Properties/actions";

import toastr from "toastr";
import { useHistory } from 'react-router-dom';
import Loder from 'components/Loder/Loder';
import Select from "react-select";
import './property.css'


const ListingsModalProperties = (props) => {
    const history = useHistory();

    const [inspectionModal, setInspectionModal] = useState(false);
    const [saveNExitStatus, setSaveNExitStatus] = useState(false);
    // const [type, setType] = useState('Sale');

    // const [property, SetProperty] = useState(props.propertyInfoData?.data.data.reference);
    const [state, setState] = useState({
        property: '',
        optionType: [
            { label: 'Rental', value: 'Rental' },
            // { label: 'Sale', value: 'Sale' },
        ],
        selectedType: { label: 'Rental', value: 'Rental' },

    })

    console.log(state);

    const toggle = () => setInspectionModal(!inspectionModal);
    const [showModal, setShowModal] = useState(false);

    //console.log(props.data.data.id);
    useEffect(() => {
        if (props.property_list_loading === false) {
            props.propertyList();
        }
        if (props.user_list_loading == false) {
            props.getUser();
        }
        if (props.listing_modal_add_loading === "Success") {
            // setShowModal(false);
            toastr.success("Listing Added Successfully");
            props.addListingsModalFresh();
            props.ListingsListFresh();
            props.PropertyAllActivity(props.id);

            props.toggle();
        }
        if (props.listing_modal_add_loading === "Failed") {
            // setShowModal(false);

            toastr.error("Something wenr wrong!!");
            props.addListingsModalFresh();

            // props.toggle();

        }
    }, [props.user_list_loading, props.property_list_loading, props.listing_modal_add_loading]);

    console.log(props.listing_modal_add_loading);

    const selectHandler = e => {
        setState({ ...state, [e.target.name]: e.target.value });
    };

    const id = state.property;
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(state);
        // props.ListingsListFresh();
        props.addListingsModal(state, props.id);
    };
    console.log(props.id);
    let userData = undefined;
    if (props.user_list_data) {
        userData = props.user_list_data?.data?.map((item, key) => (
            <option key={key} value={item.id}>
                {item.first_name + " " + item.last_name}
            </option>
        ));
    }
    if (props.listing_modal_add_data && saveNExitStatus) {
        let listingId = props.listing_modal_add_data.listing_id;
        props.ListingListInfo(listingId);
        props.addListingsModalFresh();
        history.push('/listingInfo/' + listingId);
    }

    const handleSelectType = e => {
        setState({ ...state, selectedType: e })
    };

    return (
        <>
            <Loder status={showModal} />
            {/* ===============Inspection modal start from here ================*/}

            <Modal isOpen={props.listingModal} toggle={props.toggle} style={{ boxShadow: "0px 4px 15px 0px rgba(0, 0, 0, 0.25)", borderRadius: "8px" }}>
                <ModalHeader style={{ backgroundColor: "#153D58" }} >
                    <div style={{ display: "flex", justifyContent: "space-between", width: "460px", marginTop: "10px" }}>
                        <div className='d-flex'>
                            {/* <i className="bx bx-task me-1 text-white" ></i> */}
                            {/* <div className='text-white'> New Listing for {props.propertyInfoData}</div> */}
                            <div className='text-white'> New Listing </div>
                        </div>
                        <div style={{ cursor: "pointer" }}>
                            <i className="mdi mdi-close-thick font-size-20 text-white" onClick={props.toggle}></i>
                        </div>
                    </div>
                </ModalHeader>

                <ModalBody style={{ backgroundColor: "#F2F6FA" }}>
                    <Form className="form p-3">

                        <FormGroup row>
                            {/* <Label
                                for="exampleSelect"
                                sm={3}
                            >
                                Property
                            </Label> */}
                            <Col sm={12}>
                                <div className="form-group-new" style={{ marginBottom: "-15px" }}>
                                    {
                                        props.id ?
                                            <Input
                                                name="property"
                                                value={props.id}
                                                type="select"
                                                // onChange={selectHandler}
                                                required={true}
                                                disabled={true}
                                            >
                                                <option value={props.id}>{props.propertyInfoData}</option>
                                            </Input> :
                                            <Input
                                                id="exampleSelect"
                                                name="property"
                                                value={state.property}
                                                type="select"
                                                onChange={selectHandler}
                                                required={true}

                                            >
                                                <option>Choose...</option>
                                                {props.property_list_data?.data.map(item => (
                                                    <>
                                                        <option key={item.id} value={item.id}>{item.reference}</option>
                                                        {item.reference}
                                                    </>
                                                ))}

                                            </Input>
                                    }
                                    <label htmlFor="usr">Property</label>
                                </div>
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            {/* <Label
                                for="exampleSelect"
                                sm={3}
                            >
                                Type
                            </Label> */}
                            <Col sm={12}>
                                {/* <Input
                                    id="exampleSelect"
                                    name="type"

                                    onChange={selectHandler}
                                    type="select"
                                    required={true}
                                >
                                    <option>Choose...</option>
                                    <option>
                                        Rental
                                    </option>
                                    <option>
                                        Sale
                                    </option>


                                </Input> */}
                                <div className="form-group-new" style={{ marginBottom: "-35px" }}>
                                    <Select
                                        value={state.selectedType}
                                        onChange={handleSelectType}
                                        options={state.optionType}
                                        classNamePrefix="select2-selection"
                                        placeholder='Please Select Type...'

                                    />
                                    <label htmlFor="usr">Type</label>
                                </div>
                            </Col>
                        </FormGroup>


                    </Form>
                </ModalBody>
                <ModalFooter style={{ backgroundColor: "#F2F6FA" }}>
                    <Button disabled={state.selectedType ? false : true} color="buttonColor" onClick={handleSubmit} >
                        <i className="fas fa-file-alt me-1"></i>Save
                    </Button>
                    <Button disabled={state.selectedType ? false : true} color="buttonColor" onClick={e => { handleSubmit(e); setSaveNExitStatus(true); }} >
                        <i className="fas fa-file-alt me-1"></i>Save & Open
                    </Button>

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

        property_list_data,
        property_list_loading,
        property_add_loading,
    } = gstate.property;

    const {
        inspection_add_data,
        inspection_add_error,
        inspection_add_loading,
    } = gstate.Inspections;

    const {
        listing_modal_add_loading,
        listing_modal_add_data,
    } = gstate.Listing;

    return {
        inspection_add_data,
        inspection_add_error,
        inspection_add_loading,

        property_list_data,
        property_list_loading,
        property_add_loading,

        user_list_data,
        user_list_error,
        user_list_loading,

        listing_modal_add_data,
        listing_modal_add_loading,
    };
};
export default connect(mapStateToProps, {
    addInspectionInfo,
    InspectionListFresh,
    getUser,
    addListingsModal,
    propertyList,
    ListingsListFresh,
    addListingsModalFresh,
    ListingListInfo, PropertyAllActivity
})(ListingsModalProperties);


