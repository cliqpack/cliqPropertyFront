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
import { getOwnerShipFees, getOwnerPropertyFeeList, getOwnerPropertyFeeListFresh } from "store/actions";

const NewPropertyFeeForm = (props) => {
    const [optionGroup7, setOptionGroup7] = useState([]);

    const handleAddRow7 = (mainIdx) => {
        let state7Copy = [...props.state7];
        let mainIdxData = state7Copy[mainIdx]['data'];
        mainIdxData.push(
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
            }
        )
        state7Copy[mainIdx]['data'] = [...mainIdxData];
        props.setState7([...state7Copy]);
    };

    const handleRemoveRow7 = (e, idx, mainIdx) => {
        let lenCheck = [...props.state7];
        if (lenCheck[mainIdx]['data'].length > 0) {
            var rowStateValue = [...props.state7[mainIdx]['data']];
            rowStateValue.splice(idx, 1);
            let rowState = [...props.state7];
            rowState[mainIdx]['data'] = [...rowStateValue];
            props.setState7(rowState);
        }
    };

    const handlePropertyFormValues7 = (mainIdx, idx, e) => {
        let data = [...props.state7];
        data[mainIdx]['data'][idx][e.target.name] = e.target.value;
        props.setState7(data);
    };

    const handleChangeInput2 = async (mainIdx, idx, e, type) => {
        const values = [...props.state7];
        values[mainIdx]['data'][idx][type] = e.label;
        values[mainIdx]['data'][idx]["selectedValues"] = e;
        values[mainIdx]['data'][idx]["income_account"] = `${e.account_name}(${e.account_tax === 1 ? "inc. tax" : "Ex. tax"
            })`;
        values[mainIdx]['data'][idx]["fee_trigger"] = e.fee_type;
        values[mainIdx]['data'][idx]["notes"] = e.notes;
        values[mainIdx]['data'][idx]["types"] = e.types;
        await props.setState7(values);
    };
    console.log(props.get_owner_property_fee_list_data);
    console.log(props.get_owner_property_fee_list_loading);
    console.log(props.ownerFolioState);
    useEffect(() => {
        props.getOwnerShipFees()
    }, [])
    useEffect(() => {
        if (props.ownerFolioState.folioState === 'NEW_FOLIO') {
            props.setState7(
                [
                    {
                        reference: props.propertyRef,
                        property_id: props.propId,
                        owner_folio_id: null,
                        data: [

                        ]
                    }
                ]
            );
        }
    }, [props.ownerFolioState.folioState, props.propertyRef])
    useEffect(() => {
        if (props.get_owner_property_fee_list_loading === 'Success') {
            let property_fee_data = [];
            if (props.get_owner_property_fee_list_data?.data?.propertyWiseFee?.length > 0) {
                props.get_owner_property_fee_list_data?.data?.propertyWiseFee?.map(
                    (items, midx) => {
                        let dataa = [];
                        items?.proprty_fee?.map((item, idx) => {
                            dataa.push({
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
                        })
                        property_fee_data.push({
                            reference: items.reference,
                            property_id: items.id,
                            owner_folio_id: items.owner_folio_id,
                            data: [...dataa]
                        })
                    }
                );
            }
            if (props?.type === 'ADD') {
                props.setState7([
                    ...property_fee_data,
                    {
                        reference: props.propertyRef,
                        property_id: props.propId,
                        owner_folio_id: props.ownerFolioState.folioId,
                        data: [

                        ]
                    }
                ]);
            } else {
                props.setState7([...property_fee_data]);
            }
        }
    }, [props.get_owner_property_fee_list_loading])
    useEffect(() => {
        if (props.ownerFolioState.folioState === 'EXISTING_FOLIO') {
            props.getOwnerPropertyFeeListFresh();
            props.getOwnerPropertyFeeList(props.ownerFolioState.folioId);
        }
    }, [props.ownerFolioState])
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
    console.log(props.state7);
    return (
        <Card>
            {
                props.state7.map((items, mainIdx) => (
                    <CardBody key={mainIdx}>
                        <CardTitle className="text-primary mb-4">
                            {props.ownerFolioState.folioState === 'NEW_FOLIO' ?
                                props.propertyRef : items.reference}
                        </CardTitle>
                        {items.data.map((item, idx) => (
                            <Row id={"addr" + idx} key={idx}>
                                <Col lg="2" className="mb-3">
                                    <label htmlFor="fee_template">
                                        Fee template
                                    </label>
                                    <div>
                                        <div className="mb-3 select2-container">
                                            <Select
                                                value={
                                                    props.state7[mainIdx]['data'][idx][
                                                    "selectedValues"
                                                    ]
                                                }
                                                onChange={e =>
                                                    handleChangeInput2(
                                                        mainIdx,
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
                                            props.state7[mainIdx]['data'][idx][
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
                                        {props.state7[mainIdx]['data'][idx]["fee_trigger"]}
                                    </p>
                                </Col>

                                <Col lg="2" className="mb-3">
                                    <label htmlFor="note">
                                        Notes
                                    </label>
                                    <p>{props.state7[mainIdx]['data'][idx]["note"]}</p>
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
                                            {props.state7[mainIdx]['data'][idx].types ==
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
                                                    props.state7[mainIdx]['data'][idx]["amount"]
                                                }
                                                className="form-control w-50"
                                                style={{
                                                    borderTopLeftRadius:
                                                        props.state7[mainIdx]['data'][idx].types ==
                                                            "৳"
                                                            ? 0
                                                            : 5,
                                                    borderBottomLeftRadius:
                                                        props.state7[mainIdx]['data'][idx].types ==
                                                            "৳"
                                                            ? 0
                                                            : 5,
                                                    borderTopRightRadius:
                                                        props.state7[mainIdx]['data'][idx].types ==
                                                            "%"
                                                            ? 0
                                                            : 5,
                                                    borderBottomRightRadius:
                                                        props.state7[mainIdx]['data'][idx].types ==
                                                            "%"
                                                            ? 0
                                                            : 5,
                                                }}
                                                onChange={e =>
                                                    handlePropertyFormValues7(
                                                        mainIdx,
                                                        idx,
                                                        e
                                                    )
                                                }
                                            />
                                            {props.state7[mainIdx]['data'][idx].types ==
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
                                            handleRemoveRow7(e, idx, mainIdx)
                                        }
                                        color="danger"
                                    >
                                        Remove
                                    </Button>
                                </Col>

                                {props.state7[mainIdx]['data'][idx]["errorState"] ? (
                                    <div className="d-flex align-items-start text-warning">
                                        <i className="fas fa-exclamation-triangle me-1"></i>
                                        <p>{props.state7[mainIdx]['data'][idx]["error"]}</p>
                                    </div>
                                ) : (
                                    ""
                                )}
                            </Row>
                        ))}

                        <div className="d-flex justify-content-end">
                            {" "}
                            <Button
                                onClick={() => handleAddRow7(mainIdx)}
                                color="info"
                                className="mt-3 mt-lg-0"
                            >
                                Add{" "}
                            </Button>{" "}
                        </div>
                    </CardBody>
                ))
            }
        </Card>
    );
}

const mapStateToProps = gstate => {
    const {
        get_ownership_fee_data,
    } = gstate.FeeSettings;
    const {
        get_owner_property_fee_list_data,
        get_owner_property_fee_list_error,
        get_owner_property_fee_list_loading,
    } = gstate.property;
    return {
        get_ownership_fee_data,
        get_owner_property_fee_list_data,
        get_owner_property_fee_list_error,
        get_owner_property_fee_list_loading,
    };
};

export default withRouter(
    connect(mapStateToProps, {
        getOwnerShipFees, getOwnerPropertyFeeList, getOwnerPropertyFeeListFresh
    })(NewPropertyFeeForm)
);