import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { ReconciliationList, ReconciliationListFresh, ReconciliationDataFresh, ReconciliationStore, ApproveReconciliation, ApproveReconciliationFresh } from "store/actions";
import DatatableTables2 from '../../Tables/DatatableTables2';
import toastr from "toastr";
import {
    Card,
    CardBody,
    Col,
    Container,
    Row,
    CardText,
    Badge
} from "reactstrap";
import moment from "moment";
import Breadcrumbs from "components/Common/Breadcrumb";
document.title = "cliqproperty";
function ReconciliationsList(props) {
    const [state, setState] = useState({
        activeTab: "1",
    });
    const [seen, setSeen] = useState(false);
    const history = useHistory();
    const titleDetail = (e, column, columnIndex, row, rowIndex) => {
        props.ReconciliationListFresh();
        props.ReconciliationDataFresh();
        history.push({
            pathname: `/reconciliation/${row.id}`,
            state: {
                search: `?recon=${row.id}`,
                date: row.date,
                id: row.id
            }
        });
    };
    const approveHandler = (id) => {
        props.ApproveReconciliation(id);
    };
    const titleRef = (cell, row) => <span className="text-primary">{moment(cell).format('MMMM YYYY')}</span>
    const statusRef = (cell, row) => {
        if (row?.reconciliation_status === "approved" || row?.reconciliation_status === "closed") {
            return <span className="text-success"><i className="fas fa-check"></i> Approved and Closed</span>
        }
        // else if (row?.reconciliation_status === "approve") {
        //     return <button type="button" className="btn btn-sm btn-info" onClick={() => approveHandler(row.id)}>
        //         <i className="fas fa-check me-1" />  Approve
        //     </button>
        // }
    }
    const activeData = [
        {
            dataField: "date",
            text: "Month",
            sort: true,
            formatter: titleRef,
            events: {
                onClick: (e, column, columnIndex, row, rowIndex) => { titleDetail(e, column, columnIndex, row, rowIndex); }
            },
        },
        {
            dataField: "summary",
            text: "Summary",
            sort: true
        },
        {
            dataField: "status",
            text: "Status",
            formatter: statusRef,
        },
    ];
    const handleReconcile = () => {
        props.ReconciliationListFresh();
        props.ReconciliationDataFresh();
        history.push({
            pathname: `/reconciliation/${props.recon_list_data?.data?.[0].id}`,
            state: {
                search: `?recon=${props.recon_list_data?.data?.[0].id}`,
                date: props.recon_list_data?.data?.[0].date,
                id: props.recon_list_data?.data?.[0].id
            }
        });
    }
    useEffect(() => {
        if (!seen) {
            props.ReconciliationList();
            props.ReconciliationStore();
            setSeen(true);
        }
        if (props.recon_list_loading === false) {
            props.ReconciliationList();
            props.ReconciliationDataFresh();
        }
        if (props.approve_reconciliation_loading === 'Success') {
            toastr.success('Approved');
            props.ReconciliationList();
            props.ApproveReconciliationFresh();
        }
        if (props.approve_reconciliation_loading === 'Failed') {
            toastr.error('Approve reconciliation failed');
            props.ReconciliationList();
            props.ApproveReconciliationFresh();
        }
    }, [props.approve_reconciliation_loading]);
    const pushToWithdrawal = () => {
        history.push(`withdrawalsList/${moment().format('MM')}/${moment().format('YYYY')}`)
    }
    return (
        <div className="page-content">
            <Container fluid={true}>
                <Breadcrumbs title="Reconciliations" breadcrumbItem="Accounts" />
                <Row>
                    <Col lg={12}>
                        <div>
                            <Row>
                                <Col md={4}>
                                    <Card>
                                        <CardBody>
                                            <Row>
                                                <Col className='d-flex p-1'>
                                                    <div className="d-flex align-items-center p-2" style={{ borderBottom: '1px solid #B2BEB5', borderRight: '1px solid #B2BEB5', cursor: 'pointer' }} onClick={pushToWithdrawal}>
                                                        <Badge className="py-2">
                                                            <i className="fas fa-upload font-size-20" />
                                                        </Badge>
                                                        <div className="d-flex flex-column justify-content-center mx-2 py-1 px-3">
                                                            <span style={{ fontSize: '22px' }}>{props.recon_list_data?.totalWithdraw ? props.recon_list_data?.totalWithdraw : 0}</span>
                                                            <span>Withdrawals</span>
                                                        </div>
                                                        <i className="fas fa-arrow-right font-size-18" />
                                                    </div>
                                                </Col>
                                            </Row>
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col md={8}>
                                    <Card>
                                        <CardBody>
                                            <h4 className="ms-2 text-info">Reconciliations</h4>
                                            <Row className="py-2">
                                                <Col md={9} className=''>
                                                    <div className="button-items">
                                                        <button type="button" className="btn btn-info" onClick={handleReconcile}>
                                                            Reconcile <i className="fas fa-angle-right ms-2" />
                                                        </button>
                                                    </div>
                                                </Col>
                                                <Col md={3}>
                                                    <div>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                            <Card>
                                <CardBody>
                                    <CardText className="mb-0">
                                        <div className="d-flex justify-content-start">
                                            <h4 className="text-primary">Monthly Reconciliations</h4>
                                        </div>
                                        {props.recon_list_data ? (
                                            <DatatableTables2
                                                products={props.recon_list_data}
                                                columnData={activeData}
                                            // url={url}
                                            />
                                        ) : null}
                                    </CardText>
                                </CardBody>
                            </Card>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div >
    );
}
const mapStateToProps = gstate => {
    const {
        recon_list_data,
        recon_list_error,
        recon_list_loading,
        approve_reconciliation_loading,
    } = gstate.Reconciliations;
    return {
        recon_list_data,
        recon_list_error,
        recon_list_loading,
        approve_reconciliation_loading,
    };
};
export default connect(mapStateToProps, {
    ReconciliationList, ReconciliationListFresh, ReconciliationDataFresh, ReconciliationStore, ApproveReconciliation, ApproveReconciliationFresh
})(ReconciliationsList);