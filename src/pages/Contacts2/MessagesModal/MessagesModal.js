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
    FormGroup, FormText, Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
} from "reactstrap";
import { connect } from "react-redux";

import { getMessageTemplatesForContactBySelect, sendMailFromTemplatesInContacts, sendMailFromTemplatesInContactsFresh, ContactsAllActivity } from 'store/actions';

import Select from "react-select"

import toastr from "toastr";
import { useHistory } from 'react-router-dom';

const MessagesModal = (props) => {
    const [dd, setDD] = useState(false)
    const [state, setState] = useState({
        selectedBtn: [
            { label: "Owner", value: "Owner" },
            { label: "Tenant", value: "Tenant" },
            { label: "Supplier", value: "Supplier" }
        ], optionBtn: [
            { label: "Owner", value: "Owner" },
            { label: "Tenant", value: "Tenant" },
            { label: "Supplier", value: "Supplier" }
        ],
        selectShowBtnData: false
    });
    const [button, setButton] = useState({
        tenancyYesBtn: true, ownerBtn: true, tenantBtn: true, supplierBtn: true
    })



    const clickHandler = (id, sub) => {
        console.log(id);
        props.sendMailFromTemplatesInContacts(id, sub, props.contactId);
    }

    const handleSelectBtn = e => {
        setState({ ...state, selectedBtn: e, selectShowBtnData: true })
    }

    const searchHandler = e => {
        setState({ ...state, ['search']: e.target.value })
    }

    useEffect(() => {
        if (props.smta_contacts_loading === 'Success') {
            toastr.success("Success");
            props.sendMailFromTemplatesInContactsFresh();
            props.ContactsAllActivity(props.contactId)
            props.toggle();
        }
        if (state.selectedBtn) {
            if (state.selectedBtn.length > 0) {
                props.getMessageTemplatesForContactBySelect(state.selectedBtn, null)
            }
        }
        if (state.search) {
            console.log(state.search);
            console.log(state.search.length);
            if (state.search.length) {
                props.getMessageTemplatesForContactBySelect(state.selectedBtn, state.search)
            }
        }
    }, [state.selectedBtn, props.smta_contacts_loading, state.search])
    console.log(props.gmtfbs_contacts_data?.data?.data);
    console.log(props.contactId);

    return (
        <>
            {/* ===============Inspection modal start from here ================*/}

            <Modal isOpen={props.msgModal} toggle={props.toggle} centered>
                <ModalBody style={{ backgroundColor: "#F2F6FA" }}>
                    <div>
                        <div className=''>
                            <div className="d-flex" style={{ justifyContent: "center", alignItems: "center" }}>
                                <form className="app-search d-flex">
                                    <input
                                        type="text"
                                        // className="form-control rounded bg-light border-light"
                                        placeholder="Search..."
                                        className='placeHolderColor'
                                        onChange={searchHandler}
                                        style={{ width: "370px", textAlign: "center", backgroundColor: "#E4E4E4", borderRadius: "8px 0px 0px 8px", padding: "8px", border: "none", borderRight: "0px", color: "#686868" }}
                                    />
                                    <button type="submit" style={{ textAlign: "center", backgroundColor: "#CECECE", borderRadius: "0px 8px 8px 0px", padding: "8px", border: "none", color: "#686868", width: "60px" }}><i className="bx bx-search-alt font-size-20" ></i></button>
                                </form>

                            </div>
                            <Row style={{ paddingTop: "20px", justifyContent: "center", alignItems: "center" }}>
                                {/* <Col md={3} className=''>

                                </Col> */}
                                <Col md={11} className=''>

                                    <div className="form-group-new">
                                        <Select
                                            value={state.selectedBtn}
                                            isMulti={true}
                                            onChange={handleSelectBtn}
                                            options={state.optionBtn}
                                            className="form-control-new"
                                        />
                                        <label htmlFor="usr" style={{ marginTop: "-5px" }}>Select</label>
                                    </div>
                                </Col>
                            </Row>
                        </div>

                        <Row style={{ marginBottom: "20px" }}>
                            <Col md={11}>
                                <CardText className="mb-0">
                                    <ul style={{ listStyle: 'none' }}>
                                        {props.gmtfbs_contacts_data?.data?.data.map((item, i) =>
                                            <li key={i} className='py-2' style={{ cursor: 'pointer' }}>
                                                <Row>
                                                    <Col md={2}>
                                                        {item.message_trigger_to == 'Owner' &&
                                                            <i className='bx bx-home-circle font-size-16' />
                                                        }
                                                        {item.message_trigger_to == 'Tenant' &&
                                                            <i className='bx bx-group font-size-16' />}
                                                        {item.message_trigger_to == 'Supplier' &&
                                                            <i className='bx bx-user-plus font-size-16' />}
                                                    </Col>
                                                    <Col md={7}><span className='text-primary' onClick={() => clickHandler(item?.id, item?.subject)}>{item?.subject}</span></Col>
                                                    <Col md={3}>
                                                        <i className='fas fa-envelope me-1' />


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

            {/* ===============Inspection modal ends here ================*/}
        </>

    )
}
const mapStateToProps = gstate => {
    const { gmtfbs_contacts_data, smta_contacts_loading
    } = gstate.Contacts2;

    return {
        gmtfbs_contacts_data, smta_contacts_loading

    };
};
export default connect(mapStateToProps, {
    getMessageTemplatesForContactBySelect, sendMailFromTemplatesInContacts, sendMailFromTemplatesInContactsFresh, ContactsAllActivity
})(MessagesModal);


