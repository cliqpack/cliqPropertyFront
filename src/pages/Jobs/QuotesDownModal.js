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
import toastr from "toastr";
import { useHistory, useParams } from 'react-router-dom';
import { contactList, addQuoteJob, getQuote, addQuoteFresh, getQuoteInit, JobsListByIdFresh, SupplierList, jobAllActivity } from 'store/actions';
import Select from "react-select";
import { withTranslation, useTranslation } from "react-i18next";


const QuotesDownModal = (props) => {
    const { t } = useTranslation();

    const { id } = useParams()
    const history = useHistory();
    const [inspectionModal, setInspectionModal] = useState(false);
    const [state, setState] = useState({});
    const [state2, setState2] = useState({});
    // console.log(state2);

    const [open, setOpen] = useState(false);
    const [init, setInit] = useState(true);

    const toggle = () => setInspectionModal(prev => !prev);

    useEffect(() => {
        let option;
        if (props.supplier_list_data?.data) {
            console.log('in');
            option = props.supplier_list_data?.data.map(item => ({
                label: item.reference,
                value: item.id,
            }));
            setState2(prev => ({ ...prev, optionSupplier: option }));
        }
        if (props.supplier_list_loading === false) {
            props.SupplierList();
        }
        if (props.job_quote_add_loading === "Successd") {
            toastr.success("Quotes Added Successfully");
            props.jobAllActivity(id);
            props.addQuoteFresh();
            props.getQuote(id);
            props.JobsListByIdFresh();
            toggle();
            setState({});
        }

    }, [props.supplier_list_loading, props.job_quote_add_loading, props.supplier_list_data?.data]);

    // if (init) {
    //     props.SupplierList();
    //     setInit(false);
    // }

    let supplierReference;
    if (props.supplier_list_data?.data) {
        supplierReference = props.supplier_list_data?.data?.map((item, key) => (

            <option key={key} value={item.id}>
                {item.reference}
            </option>

        ));
    }


    const selectHandler = e => {
        setState({ ...state, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        props.addQuoteJob(id, state, 'd', state2);
    };

    const handleSelectSupplier = e => {
        setState2({ ...state2, selectedSupplier: e })
    }

    return (
        <>
            <Button className="btn btn-sm m-1" color="info" onClick={e => { toggle(); props.getQuoteInit(id) }}>
                <i className="fas fa-wrench font-size-11 me-1"></i>{t('Add')}
            </Button>

            {/* ===============Inspection modal start from here ================*/}

            <Modal isOpen={inspectionModal} toggle={toggle}
            //  scrollable={true}
            >
                <ModalHeader toggle={toggle}>
                    <i className="fas fa-wrench font-size-20 me-2 text-info"></i>
                    <span className='text-info'>{t('New')} {t('Quotes')}</span></ModalHeader>

                <ModalBody>
                    <Form className="form p-3">

                        <FormGroup row>
                            <Label
                                for="exampleSelect"
                                md={4}
                            >
                                {t('Supplier')}
                            </Label>
                            <Col md={8}>
                                <div className='w-100'>
                                    {/* <Input
                                        pId="exampleSelect"
                                        name="supplier"
                                        value={state.supplier}
                                        type="select"
                                        onChange={selectHandler}
                                        required={true}
                                    >
                                        <option selected hidden>Assign a supplier</option>
                                        {supplierReference}
                                    </Input> */}
                                    <div className="">
                                        <Select
                                            value={state2.selectedSupplier}
                                            onChange={handleSelectSupplier}
                                            options={state2.optionSupplier}
                                            classNamePrefix="select2-selection"
                                            placeholder='Select a Supplier...'
                                        />
                                    </div>
                                </div>
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Label
                                for="exampleSelect"
                                md={4}
                            >
                                {t('Reference')}
                            </Label>

                            <Col md={8}>
                                <Input
                                    name="reference"
                                    type="text"
                                    placeholder='reference'
                                    className='form-control'
                                    onChange={selectHandler}

                                />

                            </Col>

                        </FormGroup>

                        <FormGroup row>

                            <Label
                                for="exampleSelect"
                                md={4}
                            >
                                {t('Amount')}

                            </Label>

                            <Col md={8}>
                                <Row>
                                    <Col md={12} className='d-flex justify-content-start align-items-center'>
                                        <span className="input-group-append rounded-start">
                                            <span
                                                className="input-group-text"
                                                style={{
                                                    borderTopRightRadius: 0,
                                                    borderBottomRightRadius: 0,
                                                }}
                                            >
                                                $
                                            </span>
                                        </span>
                                        <Input
                                            name="amount"
                                            type="text"
                                            style={{
                                                borderTopLeftRadius: 0,
                                                borderBottomLeftRadius: 0,
                                            }}
                                            className='form-control w-50'
                                            placeholder='0.00'
                                            onChange={selectHandler}

                                        />
                                        <p className='ps-2 mt-2'> {t('Includes')} {t('Tax')}</p>
                                    </Col>


                                </Row>
                            </Col>
                        </FormGroup>

                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={toggle}><i className="fas fa-times me-1"></i>{t('Cancel')}</Button>
                    <Button color="info" disabled={state2.selectedSupplier ? false : true} onClick={(e) => { handleSubmit(e); }} >
                        <i className="fas fa-file-alt me-1"></i>{t('Save')}
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
        job_modal_add_loading,
        job_modal_add_id,

        job_property_access_data,

        job_quote_add_loading,

        getQuote_show_loading,
        getQuote_show_data,

        supplier_list_loading,
        supplier_list_data
    } = gstate.Jobs;

    const { contacts_list_data, contacts_list_loading, contacts_show_loading } = gstate.Contacts2;


    return {


        property_list_data,
        property_list_loading,
        property_add_loading,

        user_list_data,
        user_list_error,
        user_list_loading,

        job_modal_add_loading,
        job_modal_add_id,

        job_property_access_data,

        contacts_list_data,
        contacts_list_loading,
        contacts_show_loading,

        job_quote_add_loading,

        getQuote_show_loading,
        getQuote_show_data,

        supplier_list_loading,
        supplier_list_data
    };
};
export default connect(mapStateToProps, {
    contactList,
    addQuoteJob,
    getQuote,
    addQuoteFresh,
    getQuoteInit,
    JobsListByIdFresh,
    SupplierList, jobAllActivity
})(QuotesDownModal);


