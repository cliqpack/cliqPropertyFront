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

import { addInspectionInfo, InspectionListFresh, getUser, addListingsModalFresh, ListingListInfo } from 'store/actions';
import { addListingsModal, ListingsListFresh } from '../../store/Listings/actions';
import {
    propertyList
} from "../../store/Properties/actions";

import toastr from "toastr";
import { useHistory } from 'react-router-dom';
import Loder from 'components/Loder/Loder';
import Select from "react-select";


const ListingsModal1 = (props) => {
    const history = useHistory();
    const [inspectionModal, setInspectionModal] = useState(false);
    const [saveNExitStatus, setSaveNExitStatus] = useState(false);
    // const [type, setType] = useState('Sale');

    // const [property, SetProperty] = useState(props.propertyInfoData?.data.data.reference);
    const [state, setState] = useState({

        optionType: [
            { label: 'Rental', value: 'Rental' },
            // { label: 'Sale', value: 'Sale' },
        ],
        selectedType: { label: 'Rental', value: 'Rental' },

    })

    console.log(state);

    const toggle = () => {
        setInspectionModal(!inspectionModal)
    };
    const [showModal, setShowModal] = useState(false);

    //console.log(props.data.data.id);
    useEffect(() => {

        let optionProperty;
        if (props.property_list_data?.data) {
            optionProperty = props.property_list_data?.data?.map(item => ({
                label: item.reference,
                value: item.id,
            }));
            setState(prev => ({ ...prev, optionProperty: optionProperty }));
        }

        if (props.property_list_loading === false) {
            props.propertyList();
        }
        if (props.user_list_loading == false) {
            props.getUser();
        }
        if (props.listing_modal_add_loading === "Success") {
            toastr.success("Listing Added Successfully");
            props.addListingsModalFresh();
            props.listingApi()
            setShowModal(false);
            setState({
                optionType: [
                    { label: 'Rental', value: 'Rental' },
                    // { label: 'Sale', value: 'Sale' },
                ],
            })
        }
        if (props.listing_modal_add_loading === "Failed") {
            setShowModal(false);
            toastr.error("Something wenr wrong!!");

        }
    }, [props.user_list_loading, props.property_list_loading, props.listing_modal_add_loading, props.property_list_data?.data]);

    const selectHandler = e => {
        setState({ ...state, [e.target.name]: e.target.value });
    };

    const id = state.property;
    const handleSubmit = (e) => {
        e.preventDefault();
        setShowModal(true);
        console.log(state);
        props.ListingsListFresh();
        props.addListingsModal(state, state.property);
    };

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
    };

    const handleSelectProperty = e => {
        setState({ ...state, selectedProperty: e })
    };

    const handleSelectType = e => {
        setState({ ...state, selectedType: e })
    };



    return (
        <>
            <button className="btn btn-buttonColor custom-button-side-row-font-size" onClick={toggle}>

                New Listings <i className="bx bx-plus-circle font-size-18 align-middle ms-2" />

            </button>
            <Loder status={showModal} />
            {/* ===============Inspection modal start from here ================*/}

            <Modal isOpen={inspectionModal} toggle={toggle} >
                <ModalHeader style={{ backgroundColor: "#6E62E5" }}>

                    <div style={{ display: "flex", justifyContent: "space-between", width: "460px", marginTop: "10px" }}>
                        <div>
                            <span className="text-white">New Listing</span>
                        </div>
                        <i className="mdi mdi-close-thick font-size-20 text-white" onClick={toggle} style={{ cursor: "pointer" }}></i>
                    </div>
                </ModalHeader>

                <ModalBody style={{ backgroundColor: "#F2F6FA" }}>
                    <Form className="form p-3">

                        <FormGroup row>
                            <Col md={12}>
                                <div className="form-group-new" style={{ marginBottom: "-15px" }}>
                                    <Select
                                        value={state.selectedProperty}
                                        onChange={handleSelectProperty}
                                        options={state.optionProperty}
                                        classNamePrefix="select2-selection"
                                        placeholder='Please Select Property...'
                                    />
                                    <label htmlFor="usr">Property</label>
                                </div>
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Col md={12}>
                                <div className="form-group-new" style={{ marginBottom: "-15px" }}>
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
                    <Button disabled={state.selectedProperty && state.selectedType ? false : true} color="buttonColor" onClick={(e) => { handleSubmit(e); toggle(); }} >
                        <i className="fas fa-file-alt me-1"></i>Save
                    </Button>
                    <Button disabled={state.selectedProperty && state.selectedType ? false : true} color="buttonColor" onClick={e => { handleSubmit(e); setSaveNExitStatus(true); }} >
                        <i className="fas fa-file-alt me-1"></i>Save & Open
                    </Button>

                </ModalFooter>
            </Modal>
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
    ListingListInfo,
})(ListingsModal1);


