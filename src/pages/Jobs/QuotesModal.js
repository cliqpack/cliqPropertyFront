import moment from 'moment';
import React, { useEffect, useState, useRef } from 'react';
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
} from "reactstrap";
import { connect } from "react-redux";
import toastr from "toastr";
import { useHistory, useParams } from 'react-router-dom';
import { uploadJobFile, contactList, addQuoteJob, editQuoteJob, getQuote, addQuoteFresh, getQuoteInit, JobsListByIdFresh, SupplierList, getQuoteFresh, jobAllActivity, deleteQuoteJob, deleteQuoteJobFresh } from 'store/actions';
import Select from "react-select";
import { withTranslation, useTranslation } from "react-i18next";


const QuotesModal = (props) => {
    const { t } = useTranslation();

    const { id } = useParams()
    const history = useHistory();
    const inputFile = useRef(null);
    const [state, setState] = useState(props.editQuoteData ? {
        quote_id: props.editQuoteData.id,
        supplier: props.editQuoteData.supplier_id,
        reference: props.editQuoteData.reference,
        amount: props.editQuoteData.amount,
    } : {});
    const [state2, setState2] = useState({ optionSupplier: [] })
    console.log(state2.selectedSupplier);
    const [open, setOpen] = useState(false);
    const [showDropZone, setShowDropZone] = useState(false);
    const [init, setInit] = useState(true);

    useEffect(() => {

        let option;
        if (props.supplier_list_data) {
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
        if (props.job_quote_add_loading === "Success") {
            toastr.success("Quotes Added Successfully");
            props.JobsListByIdFresh();
            props.jobAllActivity(id);
            props.addQuoteFresh();
            props.getQuote(id);
            props.getQuoteFresh();
            setState({});
            props.toggle();
        }

        if (props.job_quote_add_loading === "Failed") {
            toastr.error("Failed");
            props.JobsListByIdFresh();

        }

        if (props.editQuoteData) {
            option = props.supplier_list_data?.data.map(item => ({
                label: item.reference,
                value: item.id,
            }));
            setState2({ ...state2, selectedSupplier: { label: props.editQuoteData.supplier.reference, value: props.editQuoteData.supplier_id }, optionSupplier: option });

        }

    }, [props.supplier_list_loading, props.job_quote_add_loading, props.supplier_list_data, props.editQuoteData,]);
    console.log(props.supplier_list_loading);
    console.log(props.supplier_list_data);

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
        props.addQuoteJob(id, state, 'u', state2);
    };
    const handleEditSubmit = (e) => {
        e.preventDefault();
        props.editQuoteJob(id, state, 'u', state2);
        props.toggleEditQuoteModal();
    };
    const handleDeleteSubmit = (e, quote_id) => {
        e.preventDefault();
        props.deleteQuoteJob(quote_id);
        props.toggleEditQuoteModal();
    }

    const handleChange = (e, quote_id) => {
        // await setFile(URL.createObjectURL(e.target.files[0]));
        // const property_image = await e.target.files[0];
        props.uploadJobFile(
            e.target.files[0],
            quote_id
        );
        props.toggleEditQuoteModal();
    };

    const DropFile = e => {
        e.preventDefault();
        setShowDropZone(false)
    };

    const Drag = e => {
        e.preventDefault();
        setShowDropZone(true)
    };

    const Dragend = e => {
        e.preventDefault();
        setShowDropZone(false)
    };

    const handleFiles = (e, propId) => {
        e.preventDefault();
        // props.storePropertyDocument(e.dataTransfer.files[0], propId);
    };

    const handleSelectSupplier = e => {
        setState2({ ...state2, selectedSupplier: e })
    }

    return (
        <>
            {/* <Button className="btn w-md m-1" color="info" onClick={e => { toggle(); props.getQuoteInit(id) }}>
                <i className="fas fa-wrench font-size-12 align-mpIddle me-2"></i>Quotes
            </Button> */}

            {/* ===============Inspection modal start from here ================*/}

            <Modal isOpen={props.inspectionModal ? props.inspectionModal : props.showEditQuoteModal} toggle={props.toggle ? props.toggle : props.toggleEditQuoteModal}
            // scrollable={true}
            >
                <ModalHeader toggle={props.toggle ? props.toggle : props.toggleEditQuoteModal}>
                    <i className="fas fa-wrench font-size-20 me-2 text-info"></i>
                    <span className='text-info'>{!props.editQuoteData ? `${t('New')} ${t('Quote')}` :
                        `${t('Edit')} ${t('Quote')}`}</span></ModalHeader>
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
                                    value={state.reference}
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
                                {/* <Row>
                                    <Col md={7}>
                                        <Input
                                            name="amount"
                                            type="text"
                                            value={state.amount}
                                            className='form-control'
                                            placeholder='$0.00'
                                            onChange={selectHandler}

                                        />
                                    </Col>
                                    <Col md={5} className='d-flex align-items-center'>
                                        <p className='pt-2'> Includes Tax</p>

                                    </Col>

                                </Row> */}
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
                                            value={state.amount}

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

                        {props.editQuoteData &&
                            <>
                                <FormGroup row>
                                    <Label
                                        for="exampleSelect"
                                        md={4}
                                    >
                                        {t('Requested')} {t('on')}
                                    </Label>
                                    <Col md={8} className="d-flex align-items-center">
                                        {moment(props.editQuoteData.created_at).format('DD MMM YYYY')}
                                    </Col>
                                </FormGroup>
                                <FormGroup
                                    row
                                // onDragOver={Drag}
                                // onDragLeave={Dragend}
                                // onDrop={DropFile}
                                >
                                    <Label
                                        md={4}
                                    >
                                        {t('Attachment')}
                                    </Label>
                                    <Col
                                        md={8}
                                        className="d-flex align-items-center justify-content-between"
                                    >
                                        <a href={process.env.REACT_APP_IMAGE + props.editQuoteData.file} target="_blank" rel="noreferrer">{props.editQuoteData?.file?.slice(0, 30)}</a>
                                        {/* <Button className="me-1" color="light" outline disabled>
                                            <i className="fas fa-cloud-upload-alt text-info font-size-16"></i>
                                        </Button> */}
                                        <Button
                                            className="btn me-1"
                                            color="info"
                                            onClick={() => inputFile.current.click()}
                                        >
                                            {" "}
                                            <i className="fas fa-paperclip d-block font-size-16"></i>
                                        </Button>
                                        <input
                                            type="file"
                                            onChange={(e) => handleChange(e, props.editQuoteData.id)}
                                            ref={inputFile}
                                            style={{ display: "none" }}
                                        />

                                    </Col>
                                </FormGroup>
                            </>
                        }
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={props.toggle ? props.toggle : props.toggleEditQuoteModal}><i className="fas fa-times me-1"></i>{t('Cancel')}</Button>
                    {!props.editQuoteData ?
                        <Button color="info" disabled={state2.selectedSupplier ? false : true} onClick={(e) => { handleSubmit(e); }} >
                            <i className="fas fa-file-alt me-1"></i>{t('Save')}
                        </Button> :
                        <>
                            <Button color="info" onClick={(e) => { handleDeleteSubmit(e, props.editQuoteData.id) }} >
                                <i className="fas fa-times me-1"></i>{t('Delete')}
                            </Button>
                            <Button color="info" onClick={(e) => { handleEditSubmit(e) }} >
                                <i className="fas fa-file-alt me-1"></i>{t('Save')}
                            </Button>
                        </>
                    }
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

        getQuote_show_loading,
        getQuote_show_data,

        supplier_list_loading,
        supplier_list_data,

        job_quote_add_loading
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

        getQuote_show_loading,
        getQuote_show_data,

        supplier_list_loading,
        supplier_list_data,

        job_quote_add_loading
    };
};
export default connect(mapStateToProps, {
    contactList,
    addQuoteJob,
    editQuoteJob,
    getQuote,
    addQuoteFresh,
    getQuoteInit,
    JobsListByIdFresh,
    SupplierList,
    uploadJobFile,
    getQuoteFresh,
    jobAllActivity,
    deleteQuoteJob,
    deleteQuoteJobFresh,
})(QuotesModal);


