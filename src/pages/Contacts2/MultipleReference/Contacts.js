import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import Select from "react-select";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import ContactForm from "./ContactForm";
import {
    Card,
    Alert,
    CardBody,
    CardTitle,
    Col,
    Container,
    Row,
    Label,
    Modal,
    Input,
    Button,
    CardHeader,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    UncontrolledAlert,
} from "reactstrap";


import { Link, useHistory, withRouter } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage, useFormik } from "formik";

import toastr from "toastr";


const Contacts = props => {
    const history = useHistory();
    const [state, setState] = useState({
        reference: '',
        abn: '',
        notes: '',
        contacts: [
            {
                reference: '',
                first_name: '',
                last_name: '',
                salutation: '',
                company_name: '',
                mobile_phone: '',
                work_phone: '',
                home_phone: '',
                email: '',
                check: [],
                work_phone: '',
                deleted: false,
                primary: true,
            }
        ],
    });
    const [validatedState, setValidatedState] = useState(false);
    const [submitError, setSubmitError] = useState(true);
    const [showAlert, setShowAlert] = useState(false);
    const [countDelete, setCountDelete] = useState(1);
    const [postalAddress, setPostalAddress] = useState([{
        postal_building_name: '',
        postal_unit: '',
        postal_number: '',
        postal_street: '',
        postal_suburb: '',
        postal_postcode: '',
        postal_state: '',
        postal_country: '',
    }]);
    const [physicalAddress, setPhysicalAddress] = useState([{
        physical_building_name: '',
        physical_unit: '',
        physical_number: '',
        physical_street: '',
        physical_suburb: '',
        physical_postcode: '',
        physical_state: '',
        physical_country: '',
    }]);
    const [step, setStep] = useState(0);
    const [btnRows, setBtnRows] = useState([{ btn: '' }]);
    const [activeState, setActiveState] = useState(0);
    const [addressState, setAddressState] = useState(true);
    const [selectedId, setSelectedId] = useState();
    const [optionGroup, setOptionGroup] = useState();
    const [optionGroupState, setOptionGroupState] = useState(true);
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [forCheck, setForCheck] = useState([{
        smsCheck: false,
        emailCheck: false,
        printCheck: false,
    }]);
    const [checkState, setCheckState] = useState([[]]);


    document.title = "Contacts | My Day";

    const [show, setShow] = useState(false);

    const handlePropertyFormValues = e => {
        // var reference='';
        setState({ ...state, [e.target.name]: e.target.value });
        // if(e.target.name=="reference"){
        //     state.contacts.length>1?state.contacts.map((item,key)=>{
        //         return(item?item.reference: null)
        //     }):state.reference 
        // }

    };
    const handleContactFormValues = (name, val, idx) => {
        let value = [...state.contacts];
        let contact = value[idx];
        contact[name] = val;
        value[idx] = contact;
        setState({ ...state, contacts: value })
    };
    const autoPostalFormValues = (idx, postal_country, postal_state, postal_postcode, postal_suburb, postal_street, postal_number) => {
        let postals = [...postalAddress];
        let postal = postals[idx];
        postal['postal_country'] = postal_country;
        postal['postal_state'] = postal_state;
        postal['postal_postcode'] = postal_postcode;
        postal['postal_suburb'] = postal_suburb;
        postal['postal_street'] = postal_street;
        postal['postal_number'] = postal_number;
        postals[idx] = postal;
        setPostalAddress(postals);
    };
    const autoPhysicalFormValues = (idx, physical_country, physical_state, physical_postcode, physical_suburb, physical_street, physical_number) => {
        let physicals = [...physicalAddress];
        let physical = physicals[idx];
        physical['physical_country'] = physical_country;
        physical['physical_state'] = physical_state;
        physical['physical_postcode'] = physical_postcode;
        physical['physical_suburb'] = physical_suburb;
        physical['physical_street'] = physical_street;
        physical['physical_number'] = physical_number;
        physicals[idx] = physical;
        setPhysicalAddress(physicals);
    };
    const handlePostalFormFieldValues = (e, idx) => {
        let postals = [...postalAddress];
        let postal = postals[idx];
        postal[e.target.name] = e.target.value;
        postals[idx] = postal;
        setPostalAddress(postals);
    };
    const handlePhysicalFormFieldValues = e => {
        let physicals = [...physicalAddress];
        let physical = physicals[idx];
        physical[e.target.name] = e.target.value;
        physicals[idx] = physical;
        setPhysicalAddress(physicals);
    };
    const handleSameAddress = (idx, bname = '', country = '', number = '', code = '', state = '', street = '', suburb = '', unit = '') => {
        let physicals = [...physicalAddress];
        let physical = physicals[idx];
        physical.physical_building_name = bname;
        physical.physical_country = country;
        physical.physical_number = number;
        physical.physical_postcode = code;
        physical.physical_state = state;
        physical.physical_street = street;
        physical.physical_suburb = suburb;
        physical.physical_unit = unit;
        physicals[idx] = physical;
        setPhysicalAddress(physicals)
    };
    useEffect(() => {
        // if (props.contacts_add_loading === "Success") {
        //     toastr.success("Contact added successfully");
        //     props.contactList();
        //     history.push("/contactsInfo/" + props.contact_add_id.contact_id);
        // }
    }, []);

    const handleBtnRows = () => {
        const item = { btn: '' };
        setBtnRows([...btnRows, item]);
        let value = [...state['contacts']];
        value.push({
            reference: '',
            first_name: '',
            last_name: '',
            salutation: '',
            company_name: '',
            mobile_phone: '',
            work_phone: '',
            home_phone: '',
            email: '',
            check: [],
            work_phone: '',
            deleted: false,
            primary: false,
        });
        setState({ ...state, contacts: value });
        setForCheck([
            ...forCheck,
            {
                smsCheck: false,
                emailCheck: false,
                printCheck: false,
            }
        ])
        setCheckState([...checkState, []]);
        setPhysicalAddress([
            ...physicalAddress,
            {
                physical_building_name: '',
                physical_unit: '',
                physical_number: '',
                physical_street: '',
                physical_suburb: '',
                physical_postcode: '',
                physical_state: '',
                physical_country: '',
            }
        ])

        setPostalAddress([
            ...postalAddress,
            {
                postal_building_name: '',
                postal_unit: '',
                postal_number: '',
                postal_street: '',
                postal_suburb: '',
                postal_postcode: '',
                postal_state: '',
                postal_country: '',
            }
        ]);
        setCountDelete(prev => prev + 1);
    }

    const handleSubmit = (e, idx) => {
        setActiveState(idx);
        setStep(idx);
    }

    const checkTrueHandler = (boolean, value, idx) => {
        let check = [...forCheck];
        let newCheck = check[idx];
        newCheck[boolean] = true;
        check[idx] = newCheck;
        setForCheck(check);
        let val = [...state['contacts']];
        let checkValue = val[idx]['check'];
        checkValue.push(value);
        val[idx]['check'] = checkValue;
        setState({ ...state, contacts: val });
    }

    const checkFalseHandler = (boolean, value, idx) => {
        let check = [...forCheck];
        let newCheck = check[idx];
        newCheck[boolean] = false;
        check[idx] = newCheck;
        setForCheck(check);
        let val = [...state['contacts']];
        let checkValue = val[idx]['check'];
        let newcheckValue = checkValue.filter(item => item !== value);
        val[idx]['check'] = newcheckValue;
        setState({ ...state, contacts: val });
    }

    const checkHandler = (value, idx, checkstate, checkname) => {
        let check = [...forCheck];
        let idxCheck = check[idx];
        if (value === '') {
            if (idxCheck[checkstate] === false) {
                return;
            } else {
                checkFalseHandler(checkstate, checkname, idx);
            }
        } else {
            if (idxCheck[checkstate] === true) {
                return;
            } else {
                checkTrueHandler(checkstate, checkname, idx);
            }
        }
    }

    const communicationHandler = (e, idx) => {
        let val = e.target.value, checked = e.target.checked;
        if (val === 'Print' && checked === true) {
            checkTrueHandler('printCheck', 'Print', idx);
        } else if (val === 'Print' && checked === false) {
            checkFalseHandler('printCheck', 'Print', idx);
        } else if (val === 'Email' && checked === true) {
            checkTrueHandler('emailCheck', 'Email', idx);
        } else if (val === 'Email' && checked === false) {
            checkFalseHandler('emailCheck', 'Email', idx);
        } else if (val === 'SMS' && checked === true) {
            checkTrueHandler('smsCheck', 'SMS', idx);
        } else if (val === 'SMS' && checked === false) {
            checkFalseHandler('smsCheck', 'SMS', idx);
        }
    };

    const handleDeletedContact = (idx) => {
        let value = [...state['contacts']];
        let newVal = value[idx];
        newVal['deleted'] = true;
        value[idx] = newVal;
        setState({
            ...state,
            contacts: value,
        });
        setCountDelete(prev => prev - 1);
    }

    const handleUndoContact = (idx) => {
        let value = [...state['contacts']];
        let newVal = value[idx];
        newVal['deleted'] = false;
        value[idx] = newVal;
        setState({
            ...state,
            contacts: value,
        });
        setCountDelete(prev => prev + 1);
    }

    const handleContactReference = (e, statename, idx) => {
        let first = state.contacts[idx]['first_name'] ? state.contacts[idx]['first_name'] + " " : '';
        let last = state.contacts[idx]['last_name'] ? state.contacts[idx]['last_name'] : '';
        let company = state.contacts[idx]['company_name'] ? " - " + state.contacts[idx]['company_name'] + " " : '';
        if (statename === 'first_name') { first = e.target.value + ' ' }
        else if (statename === 'last_name') { last = e.target.value }
        else if (statename === 'company_name') { company = ' - ' + e.target.value + ' ' }
        let reference = first + last + company;
        let val = [...state['contacts']];
        let con = val[idx];
        con['reference'] = reference;
        val[idx] = con;
        let ref = state.contacts.map((item, key) => {
            return ((key > 0 && item.reference) ? ' & ' : '') + item.reference;
        });
        let mainRef = ref.toString().replace(/ ,/g, '')
        setState({ ...state, reference: mainRef, contacts: val });
    }

    const setPrimaryHandler = (idx) => {
        // Contact
        let contacts = [...state.contacts];
        let contact = contacts[0];
        contact['primary'] = false;
        contacts[0] = contact;
        let primaryContact = contacts[idx];
        primaryContact['primary'] = true;
        contacts.splice(idx, 1);
        contacts.splice(0, 0, primaryContact);
        setState({ ...state, contacts });

        // Physical Address
        let physicals = [...physicalAddress];
        let primaryPhysical = physicals[idx];
        physicals.splice(idx, 1);
        physicals.splice(0, 0, primaryPhysical);
        setPhysicalAddress(physicals);

        // Postal Address
        let postals = [...postalAddress];
        let primaryPostal = postals[idx];
        postals.splice(idx, 1);
        postals.splice(0, 0, primaryPostal);
        setPostalAddress(postals);

        setStep(0);
        setActiveState(0);
    }

    const formSubmitHandler = (e) => {
        e.preventDefault();
        let handleState = true;
        state.contacts.map(item => {
            if (item.reference === '') {
                handleState = false;
                setSubmitError(false);
            }
        })
        if (handleState) {
            setValidatedState(true);
        }
    }

    if (validatedState) {
        setValidatedState(false);
    }

    if (submitError === false) {
        setSubmitError(true)
        setShowAlert(true);
        setTimeout(() => {
            setShowAlert(false);
        }, 5000);
    }

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid={true}>
                    <div className="d-flex flex-column justify-content-start">
                        <div className="py-2 ps-3">
                            <div>
                                <div className="mb-3">
                                    <div>
                                        <form className="form-horizontal mt-2">
                                            <div>
                                                <Card>
                                                    <CardBody>
                                                        <div className="w-75 d-flex justify-content-between align-items-center pb-1">

                                                            <h4 className="text-primary mt-2 my-2">
                                                                New Contact
                                                            </h4>


                                                            {/* <div>
                                                                <div>
                                                                    <button
                                                                        type="button"
                                                                        onClick={handleShow}
                                                                        className="btn btn-secondary"
                                                                        data-toggle="modal"
                                                                        data-target="#myModal"
                                                                    >
                                                                        <i className="fa fa-regular fa-user me-1" />
                                                                        Select Contact
                                                                    </button>

                                                                    <Modal isOpen={show} toggle={handleShow}>
                                                                        <div className="modal-header">
                                                                            <h5
                                                                                className="modal-title mt-0"
                                                                                id="myModalLabel"
                                                                            >
                                                                                <h4 className="text-primary">
                                                                                    Select Contact
                                                                                </h4>
                                                                            </h5>
                                                                            <button
                                                                                type="button"
                                                                                onClick={handleClose}
                                                                                className="close"
                                                                                data-dismiss="modal"
                                                                                aria-label="Close"
                                                                            >
                                                                                <span aria-hidden="true">&times;</span>
                                                                            </button>
                                                                        </div>
                                                                        <div className="modal-body">
                                                                            <div className="mb-3 select2-container">
                                                                                <Label>Single Select</Label>
                                                                                <Select
                                                                                    value={selectedGroup}
                                                                                    onChange={handleSelectGroup}
                                                                                    options={optionGroup}
                                                                                    classNamePrefix="select2-selection"
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                        <div className="modal-footer">
                                                                            <button
                                                                                type="button"
                                                                                onClick={handleClose}
                                                                                className="btn btn-secondary"
                                                                                data-dismiss="modal"
                                                                            >
                                                                                Close
                                                                            </button>
                                                                            <button
                                                                                type="button"
                                                                                className="btn btn-info"
                                                                                onClick={handlePushData}
                                                                            >
                                                                                OK
                                                                            </button>
                                                                        </div>
                                                                    </Modal>
                                                                </div>
                                                            </div> */}
                                                        </div>
                                                        <div className="w-75" style={{
                                                            borderBottom:
                                                                "1.2px dotted #c9c7c7",
                                                        }}></div>
                                                        <div className="my-3 w-75">
                                                            <Row className="d-flex justify-content-evenly align-items-center">
                                                                <Col md={2}>
                                                                    <Label for="reference" className="form-label">
                                                                        Reference
                                                                    </Label>
                                                                </Col>
                                                                <Col md={8}>
                                                                    <input
                                                                        className="form-control"
                                                                        name="reference"
                                                                        type="text"
                                                                        value={state.reference}
                                                                        onChange={handlePropertyFormValues}
                                                                    />
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                    </CardBody>
                                                </Card>
                                                <Card>
                                                    <CardBody>
                                                        <Row>
                                                            <Col md={3}><h4 className="text-primary mb-3">People</h4></Col>
                                                            <Col md={6}>
                                                                <Row className="d-flex justify-content-end">
                                                                    <Col md={11}>
                                                                        {
                                                                            btnRows.map((item, idx) => <Button type="button" color="dark" outline={step === idx ? false : true} key={idx} className="m-1 btn-sm" onClick={e => handleSubmit(e, idx)}><span style={{ textDecoration: state.contacts[idx].deleted ? 'line-through' : 'none' }}
                                                                                title={state.contacts[idx].first_name || state.contacts[idx].last_name || state.contacts[idx].company_name ? state.contacts[idx].reference
                                                                                    : 'New Person'}
                                                                            >{idx === 0 && <i className="fas fa-star"></i>} {
                                                                                    state.contacts[idx].first_name || state.contacts[idx].last_name || state.contacts[idx].company_name ?
                                                                                        state.contacts[idx].reference.length <= 12 ? state.contacts[idx].reference : state.contacts[idx].reference.slice(0, 12) + '....'
                                                                                        : 'New Person'
                                                                                }</span></Button>)
                                                                        }
                                                                    </Col>
                                                                    <Col md={1}>
                                                                        <Button
                                                                            color="secondary"
                                                                            className="m-1 btn-sm"
                                                                            onClick={handleBtnRows}
                                                                            disabled={btnRows.length > 9 ? true : false}
                                                                        >
                                                                            Add
                                                                        </Button>
                                                                    </Col>
                                                                </Row>
                                                            </Col>
                                                        </Row>
                                                        <div className="w-75" style={{
                                                            borderBottom:
                                                                "1.2px dotted #c9c7c7",
                                                        }}></div>
                                                        {
                                                            state.contacts.map((item, idx) => {
                                                                console.log('checking');
                                                                return (
                                                                    <div key={idx} style={activeState === idx ? { display: 'block' } : { display: 'none' }}>
                                                                        <ContactForm
                                                                            idx={idx}
                                                                            communicationHandler={communicationHandler}
                                                                            handleContactFormValues={handleContactFormValues}
                                                                            autoPostalFormValues={autoPostalFormValues}
                                                                            autoPhysicalFormValues={autoPhysicalFormValues}
                                                                            handlePostalFormFieldValues={handlePostalFormFieldValues}
                                                                            handlePhysicalFormFieldValues={handlePhysicalFormFieldValues}
                                                                            forCheck={forCheck}
                                                                            handleDeletedContact={handleDeletedContact}
                                                                            handleUndoContact={handleUndoContact}
                                                                            handleContactReference={handleContactReference}
                                                                            setPrimaryHandler={setPrimaryHandler}
                                                                            state={state.contacts[idx]}
                                                                            countDelete={countDelete}
                                                                            checkHandler={checkHandler}
                                                                            physicalAddress={physicalAddress[idx]}
                                                                            postalAddress={postalAddress[idx]}
                                                                            handleSameAddress={handleSameAddress}
                                                                        />
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                    </CardBody>
                                                </Card>
                                                <Card>
                                                    <CardBody>
                                                        <h4 className="text-primary mb-3">
                                                            ABN

                                                        </h4>
                                                        <div className="w-75" style={{
                                                            borderBottom:
                                                                "1.2px dotted #c9c7c7",
                                                        }}></div>
                                                        <div className="mb-3 w-75">
                                                            <Row className="mt-3">
                                                                <Col md={2}>
                                                                    <Label for="abn" className="form-label">
                                                                        ABN
                                                                    </Label>
                                                                </Col>

                                                                <Col md={8}>
                                                                    <input
                                                                        className="form-control"
                                                                        name="abn"
                                                                        type="text"
                                                                        value={state.abn}
                                                                        onChange={handlePropertyFormValues}
                                                                    />
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                    </CardBody>
                                                </Card>
                                                <Card>
                                                    <CardBody>
                                                        <h4 className="text-primary mb-3">
                                                            Notes
                                                        </h4>
                                                        <div className="w-75" style={{
                                                            borderBottom:
                                                                "1.2px dotted #c9c7c7",
                                                        }}></div>
                                                        <div className="mb-3 w-75">
                                                            <Row className="mt-3">
                                                                <Col md={2}>
                                                                    <Label for="notes" className="form-label">
                                                                        Notes
                                                                    </Label>
                                                                </Col>

                                                                <Col md={8}>
                                                                    <input
                                                                        className="form-control"
                                                                        name="notes"
                                                                        type="text"
                                                                        value={state.notes}
                                                                        onChange={handlePropertyFormValues}
                                                                    />
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                    </CardBody>
                                                </Card>
                                            </div>
                                            {showAlert &&
                                                <UncontrolledAlert color="danger" role="alert">
                                                    A person requires either a first name or a last name or a company name
                                                </UncontrolledAlert>
                                            }
                                            <div className="w-75">
                                                <div className="mt-2 d-flex justify-content-end g-4">
                                                    <button
                                                        className="btn btn-secondary w-md ms-5"
                                                        type="button"
                                                    >
                                                        <i className="fas fa-times me-1"></i>Cancel
                                                    </button>
                                                    <button
                                                        className="btn btn-info w-md ms-2"
                                                        onClick={formSubmitHandler}
                                                    >
                                                        <i className="fas fa-file-alt me-1"></i> Save
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        </React.Fragment>
    );
};

const mapStateToProps = gstate => {
    const {

    } = gstate.Contacts2;
    return {

    };
};

export default withRouter(
    connect(mapStateToProps, {

    })(Contacts)
);
