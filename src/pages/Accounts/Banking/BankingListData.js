import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withRouter, useHistory, useParams } from "react-router-dom";
import { DepositOutstandingOneListData } from "store/actions";
import DatatableTables2 from "pages/Tables/DatatableTables2";
import {
    Card,
    CardBody,
    Col,
    Container,
    Row,
    Button,
} from "reactstrap";
import toastr from "toastr";
import moment from 'moment';

document.title = "Banking";

function BankingListData(props) {
    let date = moment().format("YYYY");
    const { id } = useParams();
    const [seen, setSeen] = useState(false);
    const [state, setState] = useState();
    const history = useHistory();

    useEffect(() => {
        if (!seen) {
            props.DepositOutstandingOneListData(id);
        }
        setSeen(true);
    }, [props.deposit_outstanding_one_list_loading]);

    const cashRef = (cell, row) => {
        return <span>{row?.receipt?.payment_method === 'cash' ? <>{row?.receipt?.amount}৳</> : ''}</span>
    }
    const cardRef = (cell, row) => {
        return <span>{row?.receipt?.payment_method === 'card' ? <>{row?.receipt?.amount}৳</> : ''}</span>
    }
    const chequeRef = (cell, row) => {
        return <span>{row?.receipt?.payment_method === 'cheque' ? <>{row?.receipt?.amount}৳</> : ''}</span>
    }

    const receiptRef = (cell, row) => {
        return <span>#{row?.receipt_id}</span>
    }
    const pushToProperty = (id) => {
        history.push(`/propertyInfo/${id}`);
    }
    const propertyRef = (cell, row) => {
        return <span className="text-primary" onClick={() => pushToProperty(row?.receipt?.property?.id)}>{row?.receipt?.property?.reference}</span>
    }
    const folioRef = (cell, row) => {
        if (row?.receipt?.folio_type == "Tenant") {
            return <span className="text-primary">{row?.receipt?.tenant_folio?.folio_code}</span>
        } else if (row?.receipt?.folio_type == "Owner") {
            return <span className="text-primary">{row?.receipt?.owner_folio?.folio_code}</span>
        } else if (row?.receipt?.folio_type == "Supplier") {
            return <span className="text-primary">{row?.receipt?.supplier_folio?.folio_code}</span>
        }
    }

    const columnData = [
        {
            dataField: "id",
            text: "Id #",
            // formatter: idRef,
            sort: true,
        },
        {
            dataField: "bank_deposit_list.deposit_date",
            text: "Date",
            sort: true,
        },
        {
            dataField: "receipt_id",
            text: "Receipt",
            formatter: receiptRef,
            sort: true,
        },
        {
            dataField: "receipt.folio_id",
            text: "To Folio",
            formatter: folioRef,
            sort: true,
        },
        {
            dataField: "receipt.property.reference",
            text: "Property",
            formatter: propertyRef,
            sort: true,
        },
        {
            dataField: "receipt.payment_method",
            text: "Type",
            // formatter: typeRef,
            sort: true,
        },
        {
            dataField: "",
            text: "Card Amount",
            formatter: cardRef,
            sort: true,
        },
        {
            dataField: "",
            text: "Cash Amount",
            formatter: cashRef,
            sort: true,
        },
        {
            dataField: "",
            text: "Cheque Amount",
            formatter: chequeRef,
            sort: true,
        },
    ];

    console.log(props.deposit_outstanding_one_list);

    return (
        <div className="page-content">
            <Container fluid={true}>
                <Row>
                    <Card>
                        <CardBody>
                            <h3 className="text-primary">Banking - Receipts for deposit</h3>
                        </CardBody>
                    </Card>
                    <Col lg={12}>
                        <div>
                            <Card>
                                <CardBody>
                                    {props.deposit_outstanding_one_list ? (
                                        <DatatableTables2
                                            products={props.deposit_outstanding_one_list}
                                            columnData={columnData}
                                        />
                                    ) : null}
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
        deposit_outstanding_one_list,
        deposit_outstanding_one_list_error,
        deposit_outstanding_one_list_loading,
    } = gstate.Banking;
    return {
        deposit_outstanding_one_list,
        deposit_outstanding_one_list_error,
        deposit_outstanding_one_list_loading,
    };
};

export default withRouter(connect(mapStateToProps, {
    DepositOutstandingOneListData
})(BankingListData));
