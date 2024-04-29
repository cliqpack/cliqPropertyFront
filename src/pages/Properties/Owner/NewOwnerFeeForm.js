import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Select from "react-select";
import "../style.css";
import {
    Row,
    Col,
    Card,
    CardBody,
    CardTitle,
    Label,
    Button,
} from "reactstrap";

import { withRouter } from "react-router-dom";
import { getFolioFees, getOwnerFolioFees, getOwnerFolioFeesFresh } from "store/actions";

const NewOwnerFeeForm = (props) => {
    const [optionGroup6, setOptionGroup6] = useState([]);
    const handleAddRow = () => {
        const item = {
            name: "",
        };
        props.setRows3([...props.rows3, item]);

        props.setState3([
            ...props.state3,
            {
                selectedValues: {},
                fee_template: "",
                income_account: "",
                fee_trigger: "",
                notes: "",
                amount: "",
                errorState: false,
                error: "none",
                blurState: "",
                types: "",
            },
        ]);
    };

    const handleRemoveRow = (e, idx) => {
        if (props.rows3.length > 0) {
            var rowIndex = [...props.rows3];
            rowIndex.splice(idx, 1);
            props.setRows3(rowIndex);

            var rowStateValue = [...props.state3];
            rowStateValue.splice(idx, 1);
            props.setState3(rowStateValue);
        }
    };

    const handleChangeInput = async (idx, e, type) => {
        const values = [...props.state3];

        values[idx][type] = e.value;
        values[idx]["selectedValues"] = e;
        values[idx]["income_account"] = `${e.account_name}(${e.account_tax === 1 ? "inc. tax" : "Ex. tax"
            })`;
        values[idx]["fee_trigger"] = e.fee_type;
        values[idx]["fee_template"] = e.label;
        values[idx]["notes"] = e.notes;
        values[idx]["types"] = e.types;
        await props.setState3(values);
    };

    const handlePropertyFormValues4 = (idx, e) => {
        let data = [...props.state3];
        data[idx][e.target.name] = e.target.value;
        props.setState3(data);
        
    };
    useEffect(() => {
        props.getFolioFees();
    }, [])
    useEffect(() => {
        if (props.ownerFolioState.folioState === 'EXISTING_FOLIO') {
            props.getOwnerFolioFeesFresh();
            props.getOwnerFolioFees(props.ownerFolioState.folioId);
        }
    }, [props.ownerFolioState])
    useEffect(() => {
        if (props.get_owner_folio_fees_loading === 'Success') {
            props.setRows3([...props.get_owner_folio_fees_data?.data]);
            let ownerfolio_fee_data = [];
            if (props.get_owner_folio_fees_data?.data?.length > 0) {
                props.get_owner_folio_fees_data?.data.map(
                    (item, idx) => {
                        ownerfolio_fee_data.push({
                            selectedValues: {
                                label: item?.fee_settings?.display_name,
                                value: item?.fee_settings?.id,
                            },
                            fee_template: item?.fee_settings?.display_name,
                            income_account: item?.income_account,
                            fee_trigger: item?.fee_trigger,
                            notes: item?.notes,
                            amount: item?.amount,
                            types: item?.fee_settings?.value,
                        });
                    }
                );
            }
            props.setState3([...ownerfolio_fee_data]);
        }
    }, [props.get_owner_folio_fees_loading])
    useEffect(() => {
        let optionFolioFees;
        if (props.get_folio_fee_data) {
            optionFolioFees = props.get_folio_fee_data?.data.map(item => ({
                label: item.display_name,
                value: item.id,
                types: item.value,
                fee_type: item.fee_type,
                charging: item.charging,
                account_id: item.account_id,
                account_name: item.account.account_name,
                account_number: item.account.account_number,
                account_type: item.account.type,
                account_tax: item.account.tax,
                notes: item.note,
            }));
            setOptionGroup6(optionFolioFees);
        }
    }, [props.get_folio_fee_data])

    return (
        <Card>
            <CardBody style={{ width: "100%" }}>
                <CardTitle className="text-primary mb-4">
                    Folio - {`${props.state?.reference}`}{props.ownerFolioState.folioState === 'EXISTING_FOLIO' ? ` (${props.ownerFolioState.folioCode})` : " "}
                </CardTitle>
                {props.rows3.map((item, idx) => (
                    <Row key={idx} id={"addr" + idx}>
                        <Col lg={2}>
                            <div>
                                <div className="mb-3 select2-container">
                                    <Label htmlFor="name">
                                        Fee template
                                    </Label>
                                    <Select
                                        value={
                                            props.state3[idx][
                                            "selectedValues"
                                            ]
                                        }
                                        onChange={e =>
                                            handleChangeInput(
                                                idx,
                                                e,
                                                "fee_template"
                                            )
                                        }
                                        options={optionGroup6}
                                        classNamePrefix="select2-selection"
                                        placeholder="Fee template"
                                    />
                                </div>
                            </div>
                        </Col>

                        <Col lg={2}>
                            <label htmlFor="income_account">
                                Account
                            </label>

                            <p>
                                {
                                    props.state3[idx][
                                    "income_account"
                                    ]
                                }
                            </p>
                        </Col>

                        <Col lg={2}>
                            <label htmlFor="fee_trigger">
                                Fee trigger
                            </label>

                            <p>
                                {props.state3[idx]["fee_trigger"]}
                            </p>
                        </Col>

                        <Col lg={2}>
                            <label htmlFor="notes">
                                Notes
                            </label>

                            <p>{props.state3[idx]["notes"]}</p>
                        </Col>

                        <Col
                            lg={2}
                            className="mb-3 d-flex flex-column align-items-center"
                        >
                            <label htmlFor="amount">
                                Amount
                            </label>
                            <Row>
                                <Col className="d-flex justify-content-center align-items-center">
                                    {props.state3[idx].types ==
                                        "৳" && (
                                            <span className="input-group-append rounded-start">
                                                <span
                                                    className="input-group-text"
                                                    style={{
                                                        borderTopRightRadius: 0,
                                                        borderBottomRightRadius: 0,
                                                        borderTopLeftRadius: 5,
                                                        borderBottomLeftRadius: 5,
                                                    }}
                                                >
                                                    ৳
                                                </span>
                                            </span>
                                        )}
                                    <input
                                        name="amount"
                                        type="text"
                                        className="form-control w-50"
                                        style={{
                                            borderTopLeftRadius:
                                                props.state3[idx]
                                                    .types == "৳"
                                                    ? 0
                                                    : 5,
                                            borderBottomLeftRadius:
                                                props.state3[idx]
                                                    .types == "৳"
                                                    ? 0
                                                    : 5,
                                            borderTopRightRadius:
                                                props.state3[idx]
                                                    .types == "%"
                                                    ? 0
                                                    : 5,
                                            borderBottomRightRadius:
                                                props.state3[idx]
                                                    .types == "%"
                                                    ? 0
                                                    : 5,
                                        }}
                                        value={
                                            props.state3[idx]["amount"]
                                        }
                                        onChange={e =>
                                            handlePropertyFormValues4(
                                                idx,
                                                e
                                            )
                                        }
                                    />
                                    {props.state3[idx].types ==
                                        "%" && (
                                            <span className="input-group-append">
                                                <span
                                                    className="input-group-text"
                                                    style={{
                                                        borderTopLeftRadius: 0,
                                                        borderBottomLeftRadius: 0,
                                                        borderTopRightRadius: 5,
                                                        borderBottomRightRadius: 5,
                                                    }}
                                                >
                                                    %
                                                </span>
                                            </span>
                                        )}
                                </Col>
                            </Row>
                        </Col>
                        <Col
                            lg={2}
                            className="form-group align-self-center d-flex justify-content-end"
                        >
                            <Button
                                onClick={e =>
                                    handleRemoveRow(e, idx)
                                }
                                color="danger"
                            >
                                Remove
                            </Button>
                        </Col>
                        {props.state3[idx]["errorState"] ? (
                            <div className="d-flex align-items-start text-warning">
                                <i className="fas fa-exclamation-triangle me-1"></i>
                                <p>{props.state3[idx]["error"]}</p>
                            </div>
                        ) : (
                            ""
                        )}
                    </Row>
                ))}

                <div className="d-flex justify-content-end">
                    {" "}
                    <Button
                        onClick={handleAddRow}
                        color="info"
                        className="mt-3 mt-lg-0"
                    >
                        Add{" "}
                    </Button>{" "}
                </div>
            </CardBody>
        </Card>
    );
}
const mapStateToProps = gstate => {
    const { get_folio_fee_data, get_owner_folio_fees_data, get_owner_folio_fees_loading } = gstate.FeeSettings;
    return {
        get_folio_fee_data,
        get_owner_folio_fees_data,
        get_owner_folio_fees_loading,
    };
};
export default withRouter(
    connect(mapStateToProps, {
        getFolioFees, getOwnerFolioFees, getOwnerFolioFeesFresh
    })(NewOwnerFeeForm)
);