import React, { useEffect, useRef } from "react";
import {
    Card,
    CardBody,
    Col,
    Container,
    Row,
    Table
} from "reactstrap";
import { connect } from "react-redux";

import { ImportBankFile, ImportBankFileFresh, reconcileBankFileStore, reconcileBankFileStoreFresh } from "store/actions";

import { useHistory, withRouter } from "react-router-dom";

const ImportedBankFile = (props) => {
    const inputRef = useRef();
    const history = useHistory();
    const handleImportedFile = (e) => {
        props.ImportBankFile(e.target.files[0]);
    }
    useEffect(() => {
        if (props.import_bank_file_loading === 'Success') {
            props.ImportBankFileFresh()
        }
    }, [props.import_bank_file_loading]);
    console.log(props.import_bank_file_data);
    const navigateBack = () => {
        history.goBack();
    }
    const reconcileTransaction = () => {
        if (props.import_bank_file_data?.uploaded !== 1) {
            props.reconcileBankFileStore(props.import_bank_file_data?.data);
        }
        history.push('/transaction/process');
    }
    return (
        <div className="page-content">
            <Container fluid={true}>
                <Row>
                    <Col lg={12}>
                        <div>
                            <Row>
                                <Col md={12}>
                                    <Card>
                                        <CardBody>
                                            <h4 className="ms-2 text-primary">Upload Bank File</h4><br />
                                            <div className="d-flex justify-content-between">
                                                <div>
                                                    <button type="button" className="btn btn-sm btn-secondary me-1" onClick={navigateBack}>
                                                        <i className="fas fa-arrow-left me-1" />
                                                        Back
                                                    </button>
                                                    <button type="button" className="btn btn-sm btn-info me-1" onClick={() => inputRef.current.click()}>
                                                        <i className="fas fa-upload me-1" />
                                                        Choose another file
                                                    </button>
                                                    <input style={{ display: 'none' }} ref={inputRef} type="file" onChange={handleImportedFile} />
                                                </div>

                                                <button type="button" className="btn btn-sm btn-info me-1" onClick={reconcileTransaction}>
                                                    <i className="fas fa-columns me-1" />
                                                    Reconcile transactions
                                                </button>
                                            </div>
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <Card>
                            <CardBody>
                                <div className="table-responsive">
                                    <h5 className="text-warning text-center">{props.import_bank_file_data?.uploaded === 1 && 'This file has been imported previously'}</h5>
                                    <Table className="table mb-0">
                                        <thead>
                                            <tr>
                                                <th>Date</th>
                                                <th>Type</th>
                                                <th>Description</th>
                                                <th>Debit</th>
                                                <th>Credit</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                props.import_bank_file_data?.data?.map((item, idx) => {
                                                    return (
                                                        <tr key={idx}>
                                                            <td>{item.date}</td>
                                                            <td>{item.type}</td>
                                                            <td>{item.description}</td>
                                                            <td>{item.type === "DR" ? item.amount : ''}</td>
                                                            <td>{item.type === "CR" ? item.amount : ''}</td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </Table>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div >
    )
}

const mapStateToProps = gstate => {
    const {
        import_bank_file_data, import_bank_file_error, import_bank_file_loading
    } = gstate.AccountsTransactions;
    return {
        import_bank_file_data, import_bank_file_error, import_bank_file_loading
    };
};


export default withRouter(connect(mapStateToProps, {
    ImportBankFile, ImportBankFileFresh, reconcileBankFileStore, reconcileBankFileStoreFresh
})(ImportedBankFile));