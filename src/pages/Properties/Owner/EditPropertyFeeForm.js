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
    Button,
} from "reactstrap";

import { withRouter } from "react-router-dom";
import { getOwnerShipFees } from "store/actions";

const EditPropertyFeeForm = (props) => {
    const [optionGroup7, setOptionGroup7] = useState([]);

    const handleAddRow7 = () => {
        const item = {
            name: "",
        };
        props.setRows4([...props.rows4, item]);

        props.setState7([
            ...props.state7,
            {
                selectedValues: {},
                fee_template: "",
                income_account: "",
                fee_trigger: "",
                notes: "",
                types: "",
                amount: "",
                amountPlaceholder: "",
                errorState: false,
                error: "none",
            },
        ]);
    };

    const handleRemoveRow7 = (e, idx) => {
        if (props.rows4.length > 0) {
            var rowIndex = [...props.rows4];
            rowIndex.splice(idx, 1);
            props.setRows4(rowIndex);

            var rowStateValue = [...props.state7];
            rowStateValue.splice(idx, 1);
            props.setState7(rowStateValue);
        }
    };

    const handlePropertyFormValues7 = (idx, e) => {
        let data = [...props.state7];
        data[idx][e.target.name] = e.target.value;
        props.setState7(data);
    };

    const handleChangeInput2 = async (idx, e, type) => {
        const values = [...props.state7];
        values[idx][type] = e.label;
        values[idx]["selectedValues"] = e;
        values[idx]["income_account"] = `${e.account_name}(${e.account_tax === 1 ? "inc. tax" : "Ex. tax"
            })`;
        values[idx]["fee_trigger"] = e.fee_type;
        values[idx]["notes"] = e.notes;
        values[idx]["types"] = e.types;
        await props.setState7(values);
    };

    useEffect(() => {
        props.getOwnerShipFees()
    }, [])
    useEffect(() => {
        let optionOwnerShipFees;
        if (props.get_ownership_fee_data) {
            optionOwnerShipFees = props.get_ownership_fee_data?.data.map(item => ({
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
            setOptionGroup7(optionOwnerShipFees);
        }
    }, [props.get_ownership_fee_data])

    return (
        <Card>
            <CardBody>
                <CardTitle className="text-primary mb-4">
                    {props.propertyRef}
                </CardTitle>
                {props.rows4.map((item, idx) => (
                    <Row id={"addr" + idx} key={idx}>
                        <Col lg="2" className="mb-3">
                            <label htmlFor="fee_template">
                                Fee template
                            </label>
                            <div>
                                <div className="mb-3 select2-container">
                                    <Select
                                        value={
                                            props.state7[idx][
                                            "selectedValues"
                                            ]
                                        }
                                        onChange={e =>
                                            handleChangeInput2(
                                                idx,
                                                e,
                                                "fee_template"
                                            )
                                        }
                                        options={optionGroup7}
                                        classNamePrefix="select2-selection"
                                        name="fee_template"
                                        placeholder="Fee template"
                                    />
                                </div>
                            </div>
                        </Col>

                        <Col lg="2" className="mb-3">
                            <label htmlFor="income_account">
                                Account
                            </label>

                            <p>
                                {
                                    props.state7[idx][
                                    "income_account"
                                    ]
                                }
                            </p>
                        </Col>

                        <Col lg="2" className="mb-3">
                            <label htmlFor="fee_trigger">
                                Fee trigger
                            </label>

                            <p>
                                {props.state7[idx]["fee_trigger"]}
                            </p>
                        </Col>

                        <Col lg="2" className="mb-3">
                            <label htmlFor="note">
                                Notes
                            </label>
                            <p>{props.state7[idx]["note"]}</p>
                        </Col>

                        <Col
                            lg="2"
                            className="mb-3 d-flex flex-column align-items-center"
                        >
                            <label htmlFor="amount">
                                Amount
                            </label>

                            <Row>
                                <Col className="d-flex justify-content-center align-items-center">
                                    {props.state7[idx].types ==
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
                                        value={
                                            props.state7[idx]["amount"]
                                        }
                                        className="form-control w-50"
                                        style={{
                                            borderTopLeftRadius:
                                                props.state7[idx].types ==
                                                    "৳"
                                                    ? 0
                                                    : 5,
                                            borderBottomLeftRadius:
                                                props.state7[idx].types ==
                                                    "৳"
                                                    ? 0
                                                    : 5,
                                            borderTopRightRadius:
                                                props.state7[idx].types ==
                                                    "%"
                                                    ? 0
                                                    : 5,
                                            borderBottomRightRadius:
                                                props.state7[idx].types ==
                                                    "%"
                                                    ? 0
                                                    : 5,
                                        }}
                                        onChange={e =>
                                            handlePropertyFormValues7(
                                                idx,
                                                e
                                            )
                                        }
                                    />
                                    {props.state7[idx].types ==
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
                            lg="2"
                            className="form-group align-self-center d-flex justify-content-end"
                        >
                            <Button
                                onClick={e =>
                                    handleRemoveRow7(e, idx)
                                }
                                color="danger"
                            >
                                Remove
                            </Button>
                        </Col>

                        {props.state7[idx]["errorState"] ? (
                            <div className="d-flex align-items-start text-warning">
                                <i className="fas fa-exclamation-triangle me-1"></i>
                                <p>{props.state7[idx]["error"]}</p>
                            </div>
                        ) : (
                            ""
                        )}
                    </Row>
                ))}

                <div className="d-flex justify-content-end">
                    {" "}
                    <Button
                        onClick={handleAddRow7}
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
    const { get_ownership_fee_data } = gstate.FeeSettings;
    return {
        get_ownership_fee_data
    };
};

export default withRouter(
    connect(mapStateToProps, {
        getOwnerShipFees
    })(EditPropertyFeeForm)
);