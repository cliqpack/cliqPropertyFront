import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
    Card,
    CardBody,
    Col,
    Container,
    Row,
} from "reactstrap";
import { getAddons, getAddonsFresh } from "store/actions";
import { withRouter } from "react-router-dom";
import NewAddonModal from "./NewAddonModal";
import DatatableTables2 from '../../Tables/DatatableTables2';
import Breadcrumbs from "components/Common/Breadcrumb";

document.title = "CliqProperty";

const AddonList = props => {
    const [state, setState] = useState({ newFeesModal: false });
    const [data, setData] = useState('');
    const [seen, setSeen] = useState(false);

    const toggleModalFee = () => {
        setState(prev => ({ ...prev, newFeesModal: !prev.newFeesModal }));
    };

    const statusRef = (cell, row) => {
        return <span>{row.status === 1 ? 'Yes' : 'No'}</span>
    };

    const openEditModal = (e, column, columnIndex, row, rowIndex) => {
        setData(row);
        toggleModalFee();
    };

    const activeData = [
        {
            dataField: "display_name",
            text: "Display Name",
            sort: true,
            events: {
                onClick: (e, column, columnIndex, row, rowIndex) => {
                    openEditModal(e, column, columnIndex, row, rowIndex);
                },
            },
        },
        {
            dataField: "charging",
            text: "Charging",
            sort: true,
            events: {
                onClick: (e, column, columnIndex, row, rowIndex) => {
                    openEditModal(e, column, columnIndex, row, rowIndex);
                },
            },
        },
        {
            dataField: "fee_type",
            text: "Type",
            sort: true,
            events: {
                onClick: (e, column, columnIndex, row, rowIndex) => {
                    openEditModal(e, column, columnIndex, row, rowIndex);
                },
            },
        },
        {
            dataField: "price",
            text: "Price",
            sort: true,
            events: {
                onClick: (e, column, columnIndex, row, rowIndex) => {
                    openEditModal(e, column, columnIndex, row, rowIndex);
                },
            },
        },
        {
            dataField: "value",
            text: "Value",
            sort: true,
            events: {
                onClick: (e, column, columnIndex, row, rowIndex) => {
                    openEditModal(e, column, columnIndex, row, rowIndex);
                },
            },
        },
        {
            dataField: "account.account_name",
            text: "Account",
            sort: true,
            events: {
                onClick: (e, column, columnIndex, row, rowIndex) => {
                    openEditModal(e, column, columnIndex, row, rowIndex);
                },
            },
        },

        {
            dataField: "",
            text: "Status",
            sort: true,
            events: {
                onClick: (e, column, columnIndex, row, rowIndex) => {
                    openEditModal(e, column, columnIndex, row, rowIndex);
                },
            },
            formatter: statusRef,
        },


    ];

    useEffect(() => {
        if (!seen) {
            props.getAddons();
        }
        setSeen(true);
    }, []);

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid={true}>
                    {/* <Breadcrumbs title="Addons" breadcrumbItem="Plans" /> */}
                    <h4 className="ms-2 text-primary">Addons</h4>
                    <Row>
                        <Col md={2}>
                            <Card style={{ borderRadius: "15px" }}>
                                <CardBody>
                                    {/* <h4 className="ms-2 text-primary mb-4">Addons</h4>
                                    <div
                                        className="w-100 mt-2 mb-4"
                                        style={{
                                            borderBottom: "1.2px dotted #c9c7c7",
                                        }}
                                    ></div> */}
                                    <div className="button-groups">
                                        <button
                                            type="button"
                                            className="btn btn-buttonColor w-100 d-flex justify-content-between"
                                            onClick={toggleModalFee}
                                        >
                                            New Addon
                                            <i className="bx bx-plus-circle font-size-18 align-middle ms-2" />
                                        </button>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>

                        <Col md={12} lg={10} xs={12} className="p-0" >
                            <Card className="custom_card_border_design me-2">
                                <CardBody>
                                    {props.get_addon_data ? (
                                        <DatatableTables2
                                            products={props.get_addon_data}
                                            columnData={activeData}
                                        />
                                    ) : null}
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
            {state.newFeesModal && <NewAddonModal state={state} data={data} toggle={toggleModalFee} setData={setData} />}
        </React.Fragment>
    );
};

const mapStateToProps = gstate => {
    const { } = gstate.Portfolio;
    const {
        get_addon_data,
        get_addon_error,
        get_addon_loading,
    } = gstate.Addon;
    return {
        get_addon_data,
        get_addon_error,
        get_addon_loading,
    };
};

export default withRouter(connect(mapStateToProps, { getAddons, getAddonsFresh })(AddonList));
