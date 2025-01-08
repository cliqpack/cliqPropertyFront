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
import { tenantArchive, tenantArchiveFresh } from "store/actions";
import Loder from 'components/Loder/Loder';
import toastr from "toastr";
import { useHistory } from 'react-router-dom';


const TenantArchiveModal = (props) => {
    const history = useHistory();
    const submitHandler = () => {
        props.tenantArchive(props.id, 'false');
        props.setLoader(true)
    }
    
    useEffect(() => {
        if (props.archive_tenant_loading === 'Failed') {
            toastr.error(props.archive_tenant_data)
            props.tenantArchiveFresh();
            props.setLoader(false)
            props.toggle();
        } else if (props.archive_tenant_loading === 'Success') {
            toastr.success(props.archive_tenant_data)
            props.tenantArchiveFresh();
            props.setLoader(false)
            props.toggle();
        } else if (props.archive_tenant_loading === 'SQL ERROR') {
            toastr.success("Something went wrong!")
            props.tenantArchiveFresh();
            props.setLoader(false)
            props.toggle();
        }
    }, [props.archive_tenant_loading]);


    return (
        <>
            {/* ===============Inspection modal start from here ================*/}
            <Modal isOpen={props.state.archiveModal} toggle={props.toggle} >
                <ModalHeader toggle={props.toggle}>
                </ModalHeader>

                <ModalBody>
                    Are you sure you want to archive the folio TEN000{props.id} from all future transactions?
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={props.toggle}>
                        <i className="fas fa-file-alt me-1"></i>Cancel
                    </Button>
                    <Button color="primary" onClick={submitHandler}>
                        <i className="fas fa-file-alt me-1"></i>Ok
                    </Button>

                </ModalFooter>
            </Modal>
        </>
    )
}
const mapStateToProps = gstate => {
    const {
        transaction_list_id_loading, archive_tenant_loading, archive_tenant_data
    } = gstate.AccountsTransactions;

    return {
        transaction_list_id_loading, archive_tenant_loading, archive_tenant_data
    };
};
export default connect(mapStateToProps, {
    tenantArchive, tenantArchiveFresh
})(TenantArchiveModal);