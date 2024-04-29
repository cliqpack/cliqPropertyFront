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



import toastr from "toastr";
import { useHistory } from 'react-router-dom';


const TenantArchiveModal = (props) => {
    const history = useHistory();


    const [state, setState] = useState({

    })

    const submitHandler = () => {
        props.tenantArchive(props.id,'false');
    }
    useEffect(() => {
        if (props.archive_tenant_loading === 'Success') {
            if (props.archive_tenant_data?.staus == 0) {
                toastr.warning(props.archive_tenant_data?.message);
            } else {
                toastr.success('Success');
            }
            props.tenantArchiveFresh();
            props.toggle();
        }
    }, [props.archive_tenant_loading, props.archive_tenant_data]);


    return (
        <>


            {/* ===============Inspection modal start from here ================*/}

            <Modal isOpen={props.state.archiveModal} toggle={props.toggle} >
                <ModalHeader toggle={props.toggle}>
                </ModalHeader>

                <ModalBody>
                    Are you sure you want to archive the folio TEN00034 from all future transactions?

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

            {/* ===============Inspection modal ends here ================*/}
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


