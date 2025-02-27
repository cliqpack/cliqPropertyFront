import moment from 'moment';
import React, { useEffect, useState } from 'react';
import {
    Col,
    Row,
    CardText,
    Modal,
    ModalBody,
} from "reactstrap";
import { connect } from "react-redux";
import {
    getMessageTemplatesForListingBySelect, sendMailFromTemplatesInListing, sendMailFromTemplatesInListingFresh, listAllActivity
} from 'store/actions';
import Select from "react-select"
import toastr from "toastr";


const MessagesModal = (props) => {
    const [dd, setDD] = useState(false);

    // State to track selected button and options
    const [state, setState] = useState({
        selectedBtn: [
            { label: "Owner", value: "Owner" },
            { label: "Tenant", value: "Tenant" },
            { label: "Supplier", value: "Supplier" }
        ],
        optionBtn: [
            { label: "Owner", value: "Owner" },
            { label: "Tenant", value: "Tenant" },
            { label: "Supplier", value: "Supplier" }
        ],
        selectShowBtnData: false
    });

    const [button, setButton] = useState({
        tenancyYesBtn: true, ownerBtn: true, tenantBtn: true, supplierBtn: true
    });

    // State to track selected listing type (Rental or Sale)
    const [listingType, setListingType] = useState('rental'); // Default selected is 'rental'

    // Function to handle button click and trigger API based on listing type
    const handleListingTypeChange = (type) => {
        setListingType(type); // Update the listing type state
        props.getMessageTemplatesForListingBySelect(state.selectedBtn, null, type); // Trigger API with new type
    }

    // Handle template selection
    const handleSelectBtn = e => {
        setState({ ...state, selectedBtn: e, selectShowBtnData: true });
        props.getMessageTemplatesForListingBySelect(e, null, listingType); // Include listingType as parameter
    }

    // Handle search functionality
    const searchHandler = e => {
        setState({ ...state, search: e.target.value });
        props.getMessageTemplatesForListingBySelect(state.selectedBtn, e.target.value, listingType); // Include listingType as parameter
    }

    // Handle sending message on item click
    const clickHandler = (id, sub) => {
        props.sendMailFromTemplatesInListing(id, sub, props.listingId);
    }

    useEffect(() => {
        if (props.smta_listing_loading === 'Success') {
            toastr.success("Success");
            props.sendMailFromTemplatesInListingFresh();
            props.listAllActivity(props.listingId);
            props.toggle();
        }
        if (props.msgModal) {
            props.getMessageTemplatesForListingBySelect(state.selectedBtn, null, listingType); // Include listingType in API call
        }
    }, [props.smta_listing_loading]);

    return (
        <>
            <Modal isOpen={props.msgModal} toggle={props.toggle} centered>
                <ModalBody style={{ backgroundColor: "#F2F6FA" }}>
                    <div>
                        <div className="d-flex" style={{ justifyContent: "center", alignItems: "center" }}>
                            <form className="app-search d-flex">
                                <input
                                    type="text"
                                    id="header-search"
                                    placeholder="Search"
                                    name="s"
                                    className='placeHolderColor'
                                    onKeyUp={searchHandler}
                                    style={{ width: "370px", textAlign: "center", backgroundColor: "#E4E4E4", borderRadius: "8px 0px 0px 8px", padding: "8px", border: "none", borderRight: "0px", color: "#686868" }}
                                />
                                <button type="submit" style={{ textAlign: "center", backgroundColor: "#CECECE", borderRadius: "0px 8px 8px 0px", padding: "8px", border: "none", color: "#686868", width: "60px" }}>
                                    <i className="bx bx-search-alt font-size-20" ></i>
                                </button>
                            </form>
                        </div>

                        <Row style={{ paddingTop: "20px", justifyContent: "center", alignItems: "center" }}>
                            <Col md={11} className=''>
                                <div className="form-group-new">
                                    <Select
                                        value={state.selectedBtn}
                                        isMulti={true}
                                        onChange={handleSelectBtn}
                                        options={state.optionBtn}
                                        classNamePrefix="select2-selection"
                                    />
                                    <label htmlFor="usr" style={{ marginTop: "-5px" }}>Select</label>
                                </div>
                            </Col>
                        </Row>

                        {/* Rental and Sale Buttons */}
                        <div className="d-flex justify-content-left mb-3">
                            <button
                                className={`btn ${listingType === 'rental' ? 'btn-primary' : 'btn-outline-primary'}`}
                                onClick={() => handleListingTypeChange('rental')}
                                style={{ marginRight: '10px' }}
                            >
                                Rental
                            </button>
                            <button
                                className={`btn ${listingType === 'sale' ? 'btn-primary' : 'btn-outline-primary'}`}
                                onClick={() => handleListingTypeChange('sale')}
                            >
                                Sale
                            </button>
                        </div>

                        <div style={{ borderBottom: "1.2px dotted #c9c7c7" }} />
                        <Row className='mt-3'>
                            <Col sm="12">
                                <CardText className="mb-0">
                                    <ul style={{ listStyle: 'none' }}>
                                        {props.gmtfbs_listings_data?.data?.data.map((item, i) =>
                                            <li key={i} className='py-2' style={{ cursor: 'pointer' }}>
                                                <Row>
                                                    <Col md={2}>
                                                        {item.message_trigger_to === 'Owner' &&
                                                            <i className='bx bx-home-circle font-size-16' />}
                                                        {item.message_trigger_to === 'Tenant' &&
                                                            <i className='bx bx-group font-size-16' />}
                                                        {item.message_trigger_to === 'Supplier' &&
                                                            <i className='bx bx-user-plus font-size-16' />}
                                                    </Col>
                                                    <Col md={7}>
                                                        <span className='text-primary' onClick={() => clickHandler(item?.id, item?.subject)}>{item?.subject}</span>
                                                    </Col>
                                                    <Col md={3} className='d-flex justify-content-center align-items-center'>
                                                        {item.type === 'email' && <i className='fas fa-envelope mx-1' />}
                                                        {item.type === 'sms' && <i className='fas fa-mobile-alt mx-1' />}
                                                        {item.type === 'letter' && <i className='fas fa-print mx-1' />}
                                                    </Col>
                                                </Row>
                                            </li>
                                        )}
                                    </ul>
                                </CardText>
                            </Col>
                        </Row>
                    </div>
                </ModalBody>
            </Modal>
        </>
    );
}

const mapStateToProps = gstate => {
    const {
        gmtfbs_listings_data, smta_listing_loading
    } = gstate.Listing;

    return {
        gmtfbs_listings_data, smta_listing_loading
    };
};

export default connect(mapStateToProps, {
    getMessageTemplatesForListingBySelect, sendMailFromTemplatesInListing, sendMailFromTemplatesInListingFresh, listAllActivity
})(MessagesModal);
