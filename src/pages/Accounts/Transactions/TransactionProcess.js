import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { withRouter, useHistory } from "react-router-dom";
import classnames from "classnames";
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
    ButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Table
} from "reactstrap";

import { } from "store/actions";
import { reconcileBankFile, reconcileBankFileFresh, tenantInfoFresh, tenantInformation, deleteImportedBankFileData, deleteImportedBankFileDataFresh, receiptAsRent, receiptAsRentFresh } from "store/actions";
import AddReceipt from "./AddReceipt";
import toastr from "toastr";

document.title = "CliqProperty";

function TransactionProcess(props) {
    const history = useHistory();
    const [seen, setSeen] = useState(false);
    const inputRef = useRef();
    const [receiptData, setReceiptData] = useState({
        amount: '',
        label: '',
        value: '',
        selectedFolio: '',
        bank_data_id: '',
    });
    const [state, setState] = useState({
        drp_link: false,
        transactionInfoModal: false,
        transactionInfoModalReverse: false,
        transactionInfoModalEdit: false,
        clearFundModal: false,
        drp_success1: false,
    });

    // --------------------- RECEIPT STATE
    const [showModalAdd, setShowModalAdd] = useState(false);
    // --------------------------

    useEffect(() => {
        if (!seen) {
            props.reconcileBankFile();
        }
        if (props.delete_import_bank_file_loading === 'Success') {
            props.reconcileBankFile();
            toastr.error('Deleted');
            props.deleteImportedBankFileDataFresh();
        }
        if (props.receipt_as_rent_loading === 'Success') {
            props.reconcileBankFile();
            props.receiptAsRentFresh();
            toastr.success('Rent paid successfuly');
        }
        setSeen(true);
    }, [props.delete_import_bank_file_loading, props.receipt_as_rent_loading]);

    const pushToProperty = (id) => {
        history.push(`/propertyInfo/${id}`);
    }
    const pushToContact = (id) => {
        history.push(`/contactsInfo/${id}`);
    }

    // ------------------------ RECEIPT
    const toggleAdd = () => {

        setShowModalAdd(prev => !prev)

        props.tenantInfoFresh();
    };
    // ----------------------------

    const handleRentPay = (receipt_date, bank_reference, bank_data_id, tenant_id, owner_id, amount) => {
        let data = { receipt_date, bank_reference, bank_data_id, tenant_id, owner_id, amount };
        props.receiptAsRent(data);
    }
    const handleDeleteButton = (id) => {
        props.deleteImportedBankFileData(id);
    }

    return (
        <div className="page-content">
            <Container fluid={true}>
                <Row>
                    {
                        showModalAdd ? <AddReceipt toggle={toggleAdd} showModal={showModalAdd} setShowModal={setShowModalAdd} amount={receiptData.amount} selectedFolio={receiptData.selectedFolio} label={receiptData.label} value={receiptData.value} bank_data_id={receiptData.bank_data_id} /> : null
                    }
                    <Card>
                        <CardBody>
                            <h4 className="ms-2 text-primary">Process Bank Statement</h4>
                            <Row>
                                <div className="button-items">

                                </div>
                            </Row>
                        </CardBody>
                    </Card>


                    <Card>
                        <CardBody>
                            <Row>
                                <Col sm="12">
                                    <CardText className="mb-0">
                                        <div className="table-responsive">
                                            <Table className="table mb-0">
                                                <tbody>
                                                    {
                                                        props.reconcile_bank_file_data?.data?.map((item, idx) => {
                                                            return (
                                                                <tr key={idx}>
                                                                    <td>{item.date} ({item.description})</td>
                                                                    <td>{item.credit > 0 ? `${item.credit}৳ (CREDIT)` : ''} {item.debit > 0 ? `${item.debit}৳ (DEBIT)` : ''}</td>
                                                                    <td>
                                                                        {
                                                                            item.tenant_folios ?
                                                                                <>
                                                                                    <span className="text-primary" onClick={() => pushToContact(item?.tenant_folios?.tenant_contacts?.contact_id)}><i className="bx bx-male"></i> {item?.tenant_folios?.tenant_contacts?.reference} ({item?.tenant_folios?.folio_code})</span><br />
                                                                                    <span className="text-primary" onClick={() => pushToProperty(item?.tenant_folios?.tenant_properties?.id)}><i className="fas fa-home"></i> {item?.tenant_folios?.tenant_properties?.reference}</span><br />
                                                                                    <i className="fas fa-link"></i> {item.description}
                                                                                </> :
                                                                                <>
                                                                                    No match < br />
                                                                                    {item.credit > 0 ? `${item.credit}৳` : ''} {item.debit > 0 ? `${item.debit}৳` : ''}
                                                                                </>
                                                                        }

                                                                    </td>
                                                                    <td>
                                                                        {
                                                                            item.tenant_folios ?
                                                                                <div className="btn-group mb-2">
                                                                                    <ButtonDropdown
                                                                                        isOpen={state.drp_success1 && (idx === state.dropdownNumber)}
                                                                                        toggle={() =>
                                                                                            setState(prev => ({
                                                                                                ...prev, drp_success1: !state.drp_success1, dropdownNumber: idx
                                                                                            }))
                                                                                        }
                                                                                    >
                                                                                        <Button id="caret" color="warning" className="btn btn-sm btn-warning" onClick={() => handleRentPay(item.date, item.description, item.id, item?.tenant_folios?.tenant_contact_id, item?.tenant_folios?.tenant_properties?.owner_id, item.credit ? item.credit : item.debit)}>
                                                                                            Receipt as rent
                                                                                        </Button>
                                                                                        <DropdownToggle
                                                                                            caret
                                                                                            color="warning"
                                                                                            className="dropdown-toggle-split btn btn-sm btn-warning"
                                                                                        >
                                                                                            <i className="mdi mdi-chevron-down"></i>
                                                                                        </DropdownToggle>
                                                                                        <DropdownMenu>
                                                                                            <DropdownItem
                                                                                                onClick={() => {
                                                                                                    toggleAdd();
                                                                                                    setReceiptData({
                                                                                                        selectedFolio: item?.tenant_folios?.tenant_contact_id,
                                                                                                        amount: item.credit > 0 ? item.credit : item.debit,
                                                                                                        value: item?.tenant_folios?.tenant_contact_id,
                                                                                                        label: item?.tenant_folios?.tenant_contacts?.first_name + ' ' + item?.tenant_folios?.tenant_contacts?.last_name + '--' + item?.tenant_folios?.tenant_properties?.reference,
                                                                                                        bank_data_id: item.id
                                                                                                    })
                                                                                                    props.tenantInformation(item?.tenant_folios?.id);
                                                                                                }}>
                                                                                                <i className="bx bx-male"></i> Receipt as something else
                                                                                            </DropdownItem>
                                                                                            <DropdownItem onClick={() => { toggleAdd(); setReceiptData({ selectedFolio: '', amount: item.credit > 0 ? item.credit : item.debit, value: '', label: '', bank_data_id: item.id }) }}>
                                                                                                <i className="bx bx-male"></i> Receipt to another tenant
                                                                                            </DropdownItem>
                                                                                        </DropdownMenu>
                                                                                    </ButtonDropdown>
                                                                                </div> :
                                                                                <button type="button" className="btn btn-sm btn-light me-1" onClick={() => { toggleAdd(); setReceiptData({ selectedFolio: '', amount: item.credit > 0 ? item.credit : item.debit, value: '', label: '', bank_data_id: item.id }) }}>
                                                                                    Receipt to a tenant
                                                                                </button>
                                                                        }
                                                                    </td>
                                                                    <td>
                                                                        <button type="button" className="btn btn-sm btn-danger me-1" onClick={() => handleDeleteButton(item.id)}>
                                                                            <i className="fas fa-times"></i>
                                                                        </button>
                                                                    </td>
                                                                </tr>
                                                            )
                                                        })
                                                    }
                                                </tbody>
                                            </Table>
                                        </div>
                                    </CardText>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Row>
            </Container>
        </div>
    );

}


const mapStateToProps = gstate => {
    const {
        reconcile_bank_file_data,
        reconcile_bank_file_error,
        reconcile_bank_file_loading,
        delete_import_bank_file_loading,
        receipt_as_rent_loading,
    } = gstate.AccountsTransactions;
    return {
        reconcile_bank_file_data,
        reconcile_bank_file_error,
        reconcile_bank_file_loading,
        delete_import_bank_file_loading,
        receipt_as_rent_loading,
    };
};


export default withRouter(connect(mapStateToProps, {
    reconcileBankFile,
    reconcileBankFileFresh,
    tenantInfoFresh,
    tenantInformation,
    deleteImportedBankFileData,
    deleteImportedBankFileDataFresh,
    receiptAsRent,
    receiptAsRentFresh,
})(TransactionProcess));
