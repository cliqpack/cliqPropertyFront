import React, { useEffect, useState, Fragment } from "react";
import {
    Row,
    Col,
    Button,
} from "reactstrap";

import { getAddons, getAddonsFresh, planList, planListFresh, getPlanAddons, getPlanAddonsFresh } from "store/actions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom/cjs/react-router-dom";

const Plans = (props) => {
    const [seen, setSeen] = useState(true);

    useEffect(() => {
        if (seen && props?.statedata?.edit === true && props?.statedata?.folioId) {
            props.getPlanAddons(props?.statedata?.folioId, props?.statedata?.proId);
            props.getAddons();
            props.planList();
            setSeen(true);
        } else if (seen && props?.statedata?.edit === false) {
            props.getAddons();
            props.planList();
            setSeen(true);
        }
        if (props.acl_plan_loading == "Success" && props.get_addon_loading == "Success") {
            state_data();
        }
        if (props.acl_plan_loading == "Success" && props.get_owner_plan_addon_loading == "Success") {
            state_data_edit();
        }
    }, [props.acl_plan_loading, props.get_addon_loading, props?.statedata?.folioId, props.get_owner_plan_addon_loading]);
    const state_data = () => {
        var data = [];
        var data_sub = [];
        let length = props.acl_plan_data?.menu_plan?.length - 1;
        props.acl_plan_data?.menu_plan?.map((item, key) => {
            props.get_addon_data?.data?.map((itemAddon, keyAddon) => {
                let flag = 0;
                let length = props.get_addon_data.data.length - 1;
                let detailsLength = item?.details?.length;
                if (detailsLength > 0) {
                    item?.details?.map((items, keyDetails, index) => {
                        let length = item.details.length - 1;
                        if (itemAddon.id == items.addon_id) {
                            data.push({ 'key': keyAddon, 'addon_id': itemAddon?.id, 'plan_id': item?.id, 'display_name': itemAddon?.display_name, 'note': itemAddon?.note, 'status': true, 'optional': false });
                            flag = 1;
                        } else if (length == keyDetails && flag == 0) {
                            data.push({ 'key': keyAddon, 'addon_id': itemAddon?.id, 'plan_id': item?.id, 'display_name': itemAddon?.display_name, 'note': itemAddon?.note, 'status': false, 'optional': true });
                            flag = 1;
                        } else if (length == keyDetails && flag == 1) {
                            flag = 0;
                        }
                    });
                } else {
                    data.push({ 'key': keyAddon, 'addon_id': itemAddon?.id, 'plan_id': item?.id, 'display_name': itemAddon?.display_name, 'note': itemAddon?.note, 'status': false, 'optional': true });
                }
                if (length == keyAddon) {
                    data_sub.push(data);
                    data = [];
                }
            })
            if (key == length) {
                props.statedata.setPlanState(data_sub);
            }
        });
    };
    const state_data_edit = () => {
        var data = [];
        var data_sub = [];
        var owndata = [];
        let length = props.acl_plan_data?.menu_plan?.length - 1;
        props.acl_plan_data?.menu_plan?.map((item, key) => {
            props.get_addon_data?.data?.map((itemAddon, keyAddon) => {
                let flag = 0;
                let length = props.get_addon_data.data.length - 1;
                let detailslength = item?.details?.length;
                if (detailslength > 0) {
                    item?.details?.map((items, keyDetails, index) => {
                        let length = item.details.length - 1;
                        if (itemAddon.id == items.addon_id) {
                            data.push({
                                'key': keyAddon,
                                'addon_id': itemAddon?.id,
                                'plan_id': item?.id,
                                'display_name': itemAddon?.display_name,
                                'note': itemAddon?.note,
                                'status': true,
                                'optional': false,
                                'value': itemAddon.value,
                                'price': itemAddon.price,
                                'type': itemAddon?.fee_type,
                                'defaultManual': itemAddon?.fee_type === 'Manual' ? true : false,
                            });
                            flag = 1;
                        } else if (length == keyDetails && flag == 0) {
                            data.push({ 'key': keyAddon, 'addon_id': itemAddon?.id, 'plan_id': item?.id, 'display_name': itemAddon?.display_name, 'note': itemAddon?.note, 'type': itemAddon?.fee_type, 'status': false, 'optional': true, 'value': itemAddon.value, 'price': itemAddon.price });
                            flag = 1;
                        } else if (length == keyDetails && flag == 1) {
                            flag = 0;
                        }
                    });
                } else {
                    data.push({ 'key': keyAddon, 'addon_id': itemAddon?.id, 'plan_id': item?.id, 'display_name': itemAddon?.display_name, 'note': itemAddon?.note, 'type': itemAddon?.fee_type, 'status': false, 'optional': true, 'value': itemAddon.value, 'price': itemAddon.price });
                }
                if (props.get_owner_plan_addon_data.ownerPlanAddon.length > 0 && (item?.id === props.get_owner_plan_addon_data.ownerPlanAddon[0].plan_id)) {
                    owndata = [...data];
                    props.get_owner_plan_addon_data.ownerPlanAddon.map((ownitem, ownid) => {
                        if (itemAddon.id == ownitem.addon_id) {
                            data[keyAddon] = {
                                'key': keyAddon,
                                'addon_id': itemAddon?.id,
                                'plan_id': item?.id,
                                'display_name': itemAddon?.display_name,
                                'note': itemAddon?.note,
                                'type': itemAddon?.fee_type,
                                'status': true,
                                'optional': ownitem.optional_addon === 0 ? false : true,
                                'value': itemAddon.value,
                                'price': itemAddon.price,
                                'defaultManual': itemAddon?.fee_type === 'Manual' ? true : false,
                            };
                        }
                    })
                }
                if (length == keyAddon) {
                    data_sub.push(data);
                    data = [];
                }
            })

            let PlanIdx = 0;
            let planDataSub = data_sub;
            if (props.get_owner_plan_addon_data.ownerPlan) {
                planDataSub?.map((item, index) => {
                    item.map((addon, idx) => {
                        if (addon.plan_id === props.get_owner_plan_addon_data.ownerPlan.menu_plan_id) {
                            PlanIdx = index;
                            return;
                        }
                    })
                });
            }
            if (key == length) {
                props.statedata.setPlanIndex(prev => ({
                    ...prev,
                    index: props.get_owner_plan_addon_data.ownerPlan ? PlanIdx : undefined,
                    selected: props.get_owner_plan_addon_data.ownerPlan ? true : false,
                    initialSelected: false
                }))
                props.statedata.setPlanState(data_sub);
            }
        });
    };
    const plan_customise = (e, plan_key, addon_key) => {
        e.stopPropagation();
        let state_data = props.statedata.planState;
        var data = [];
        var data_sub = [];
        var main_length = state_data.length - 1;
        state_data.map((item, key) => {
            let length = item.length - 1;
            if (key == plan_key) {
                item.map((value, index) => {
                    if (index == addon_key) {
                        data.push({ ...value, 'status': value.status ? false : true });
                    } else {
                        data.push({ ...value });
                    }

                    if (length == index) {
                        data_sub.push(data);
                        data = [];
                    }
                });
            } else {
                item.map((value, index) => {
                    data.push({ ...value });
                    if (length == index) {
                        data_sub.push(data);
                        data = [];
                    }
                });
            }
            if (main_length == key) {
                props.statedata.setPlanState(data_sub);
            }
        });
    }
    const plan_customise_edit = (e, plan_key, addon_key) => {
        e.stopPropagation();
        let state_data = props.statedata.planState;
        var data = [];
        var data_sub = [];
        var main_length = state_data.length - 1;
        state_data.map((item, key) => {
            let length = item.length - 1;
            if (key == plan_key) {
                item.map((value, index) => {
                    if (index == addon_key) {
                        data.push({ ...value, 'status': value.status ? false : true });
                    } else {
                        data.push({ ...value });
                    }

                    if (length == index) {
                        data_sub.push(data);
                        data = [];
                    }
                });
            } else {
                item.map((value, index) => {
                    data.push({ ...value });
                    if (length == index) {
                        data_sub.push(data);
                        data = [];
                    }
                });
            }
            if (main_length == key) {
                props.statedata.setPlanState(data_sub);
            }
        });
    }
    const selectKey = (key, frequency, planId) => {
        if (props.statedata.planIndex.initialSelected === true && key === 0) {
            props.statedata.setPlanIndex({ index: 0, selected: true, initialSelected: false, planFrequency: frequency, planID: planId })
            props.setFrequencyState(prev => ({ ...prev, time: '06:00', fortNightlyDate: '', selectedMonth: {}, selectedWeekName: {}, selectedDate: {}, }))
        } else {
            if (key === props.statedata.planIndex.index) {
                props.statedata.setPlanIndex({ index: undefined, selected: false, initialSelected: false, planFrequency: frequency, planID: planId })
                props.setFrequencyState(prev => ({ ...prev, time: '06:00', fortNightlyDate: '', selectedMonth: {}, selectedWeekName: {}, selectedDate: {}, }))
            } else {
                props.statedata.setPlanIndex({ index: key, selected: true, initialSelected: false, planFrequency: frequency, planID: planId })
                props.setFrequencyState(prev => ({ ...prev, time: '06:00', fortNightlyDate: '', selectedMonth: {}, selectedWeekName: {}, selectedDate: {}, }))
            }
        }
    }
    const handleManualBtn = (e, item) => {
        e.stopPropagation()
        props.statedata?.handleCreateBill(item)
    }
    return (
        <Fragment>
            <Row>
                <Col md={4}>
                    <div
                        className="d-flex justify-content-center align-items-center fw-bold border-bottom border-2"
                        style={{ height: "93px" }}
                    >
                        <span className="text-secondery" style={{ fontSize: "16px" }}>Property management service</span>
                    </div>
                    <div className="d-flex flex-column"></div>
                    <div className="pt-1">
                        {props.get_addon_data?.data?.map((item, key) => (
                            <div className="d-flex flex-column justify-content-center align-items-start py-2" key={key} style={{ fontSize: '11px', height: '60px' }}>
                                <span>{item.display_name}</span>
                                <span>({`${item.fee_type} ${item.frequnecy_type ? item.frequnecy_type : ''}`})</span>
                            </div>
                        ))}
                    </div>
                </Col>
                <Col md={8}>
                    <div className="row flex-nowrap overflow-auto">

                        {props.acl_plan_data?.menu_plan?.map((item, key) => {
                            return (<div className="col-4" key={key}>
                                <div className={props.statedata.planIndex.index == key ? "rounded border border-2 border-info" : 'rounded border border-2'}
                                    onClick={() => { selectKey(key, item.frequency_type, item.id) }}
                                >
                                    <div
                                        className="d-flex flex-column justify-content-center align-items-center"
                                        style={{ height: "90px", backgroundColor: "#E5FCF6" }}

                                    >
                                        <div style={{ color: "#153D58", fontSize: "11px" }} className="text-center">
                                            {" "}
                                            {item?.name}
                                        </div>
                                        <div className="fw-bold">
                                            <span className="text-info" style={{ fontSize: "16px" }}>
                                                {item?.price}৳
                                            </span>{" "}
                                            <span className="text-info">
                                                { item.frequency_type === 'Yearly' && 'py' }
                                                { item.frequency_type === 'Monthly' && 'pm' }
                                                { item.frequency_type === 'FortNightly' && 'Fortn' }
                                                { item.frequency_type === 'Weekly' && 'pw' }
                                            </span>
                                        </div>
                                    </div>
                                    <div>
                                        {
                                            props.statedata.planState?.map((itemAddon, keyAddon) => {
                                                if (key === keyAddon) {
                                                    return itemAddon.map((addon, addonidx) => {
                                                        if (addon.status == true && addon.optional === false) {
                                                            return (
                                                                <div className="border border-1 text-center py-3" key={addonidx} style={{ height: '60px' }}>
                                                                    <Row>
                                                                        <Col md={5}>
                                                                            <span style={{ fontSize: "10px", display: 'inline-block', marginTop: '6px' }}>
                                                                                {/* {addon?.value === '$' && addon?.value}
                                                                                {addon?.price}
                                                                                {addon?.value === '%' && addon?.value} */}
                                                                            </span>
                                                                        </Col>
                                                                        <Col md={7} className="d-flex justify-content-between">
                                                                            <div className="text-center" key={addonidx} style={{ marginTop: '3px' }}>
                                                                                <i className="fas fa-check text-info" />
                                                                            </div>
                                                                            {
                                                                                (addon?.type === 'Manual' && addon?.defaultManual) &&
                                                                                <Button className="btn btn-sm me-1 mb-3" style={{ backgroundColor: '#159B9C', outline: 'none' }} onClick={(e) => handleManualBtn(e, addon)}><i className="fas fa-plus"></i></Button>
                                                                            }
                                                                        </Col>
                                                                    </Row>
                                                                </div>
                                                            );
                                                        } else if (addon.status == true && addon.optional === true) {
                                                            return (<div className="border border-1 text-center py-3" key={addonidx} style={{ height: '60px' }}>
                                                                <Row>
                                                                    <Col md={5}>
                                                                        <span style={{ fontSize: "10px", display: 'inline-block', marginTop: '6px' }}>
                                                                            {addon?.price}{addon?.value}
                                                                        </span>
                                                                    </Col>
                                                                    <Col md={7} className="d-flex justify-content-between">
                                                                        <div className="form-check" style={{ marginTop: '3px' }}>
                                                                            <input
                                                                                className="form-check-input"
                                                                                type="checkbox"
                                                                                value=""
                                                                                id="defaultCheck2"
                                                                                checked
                                                                                onClick={(e) => { plan_customise_edit(e, keyAddon, addonidx) }}
                                                                            />
                                                                        </div>
                                                                        {
                                                                            (addon?.type === 'Manual' && addon?.defaultManual) &&
                                                                            <Button className="btn btn-sm me-1 mb-3" style={{ backgroundColor: '#159B9C', outline: 'none' }} onClick={(e) => handleManualBtn(e, addon)}><i className="fas fa-plus"></i></Button>
                                                                        }
                                                                    </Col>
                                                                </Row>
                                                            </div>);
                                                        } else if (addon.status == false) {
                                                            return (<div className="border border-1 text-center py-3" key={addonidx} style={{ height: '60px' }}>
                                                                <Row>
                                                                    <Col md={5}>
                                                                        <span style={{ fontSize: "10px", display: 'inline-block', marginTop: '6px' }}>
                                                                            {addon?.price}{addon?.value}
                                                                        </span>
                                                                    </Col>
                                                                    <Col md={7} className="d-flex justify-content-between">
                                                                        <div className="form-check" style={{ marginTop: '3px' }}>
                                                                            <input
                                                                                className="form-check-input"
                                                                                type="checkbox"
                                                                                value=""
                                                                                id="defaultCheck2"
                                                                                onClick={(e) => { plan_customise_edit(e, keyAddon, addonidx) }}
                                                                            />
                                                                        </div>
                                                                    </Col>
                                                                </Row>
                                                            </div>);
                                                        }
                                                    })
                                                }
                                            })
                                        }
                                    </div>
                                </div>
                            </div>);
                        })}
                    </div>
                </Col>
            </Row>
        </Fragment>
    );
}
const mapStateToProps = gstate => {
    const {
        get_addon_data,
        get_addon_error,
        get_addon_loading,

        get_owner_plan_addon_data,
        get_owner_plan_addon_error,
        get_owner_plan_addon_loading,
    } = gstate.Addon;
    const {
        acl_plan_data,
        acl_plan_loading,
        acl_plan_error,
    } = gstate.Plan;
    return {
        acl_plan_data,
        acl_plan_loading,
        acl_plan_error,

        get_addon_data,
        get_addon_error,
        get_addon_loading,

        get_owner_plan_addon_data,
        get_owner_plan_addon_error,
        get_owner_plan_addon_loading,
    };
};

export default withRouter(connect(mapStateToProps, { getAddons, getAddonsFresh, planList, planListFresh, getPlanAddons, getPlanAddonsFresh })(Plans));
