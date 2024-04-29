import axios from "axios";

export const chargeOwnerManualFee = data => {
    var authUser = JSON.parse(localStorage.getItem("authUser"));
    let url = `${process.env.REACT_APP_LOCALHOST}/charge/manual/fee`;
    return dispatch => {
        const headers = {
            "Content-Type": "application/json",

            "Access-Control-Allow-Origin": "*",

            Authorization: "Bearer " + authUser.token,
        };
        const formData = {
            manual_id: data.manual_id,
            owner_folio_id: data.owner_folio_id,
            property_id: data.property_id,
            amount: data.price,
            description: data.description,
            date: data.date
        }
        axios
            .post(url, formData, { headers: headers })
            .then(response => {
                dispatch({
                    type: "CHARGE_OWNER_MANUAL_FEE",
                    payload: response.data,
                    status: response.data.status,
                });
            })
            .catch(error => {
                dispatch({
                    type: "CHARGE_OWNER_MANUAL_FEE",
                    payload: error,
                    status: "Failed",
                });
            });
    };
};
export const chargeOwnerManualFeeFresh = () => {
    return dispatch =>
        dispatch({
            type: "CHARGE_OWNER_MANUAL_FEE_FRESH",
            payload: null,
            error: null,
            status: false,
        });
};

export const getOwnerInfo = (id, ownerFolioId) => {
    var authUser = JSON.parse(localStorage.getItem("authUser"));
    let url = `${process.env.REACT_APP_LOCALHOST}/owner/folio/edit/${id}/${ownerFolioId}`;
    return dispatch => {
        const headers = {
            "Content-Type": "application/json",

            "Access-Control-Allow-Origin": "*",

            Authorization: "Bearer " + authUser.token,
        };
        axios
            .get(url, { headers: headers })
            .then(response => {
                dispatch({
                    type: "OWNER_INFO",
                    payload: response,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: "OWNER_INFO",
                    payload: error,
                    status: "Failed",
                });
            });
    };
};

export const getAgreementFee = property_id => {
    var authUser = JSON.parse(localStorage.getItem("authUser"));
    let url = `${process.env.REACT_APP_LOCALHOST}/get-agreement-renew-fee/${property_id}`;
    return dispatch => {
        const headers = {
            "Content-Type": "application/json",

            "Access-Control-Allow-Origin": "*",

            Authorization: "Bearer " + authUser.token,
        };
        axios
            .get(url, { headers: headers })
            .then(response => {
                dispatch({
                    type: "AGREEMENT_DATE_RENEWAL",
                    payload: response,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: "AGREEMENT_DATE_RENEWAL",
                    payload: error,
                    status: "Failed",
                });
            });
    };
};
export const getAgreementFeeFresh = () => {
    return dispatch =>
        dispatch({
            type: "AGREEMENT_DATE_RENEWAL_FRESH",
            payload: null,
            error: null,
            status: false,
        });
};

export const editOwner = (owner, id, folio, phone, fee_temp_1, fee_temp_2, payment_method, ownerAccess, postalAddress, physicalAddress, checkState, contact_id = null, planData, frequencyState, proId) => {
    var authUser = JSON.parse(localStorage.getItem("authUser"));
    var url = `${process.env.REACT_APP_LOCALHOST}/property/owner/contact/${id}`;

    const formData = {
        proId: proId,
        contact_id: contact_id,
        // Owner Contact
        reference: owner.reference,
        contacts:owner.contacts,
    
        physical: physicalAddress,
        postal: postalAddress,

    
        notes: owner.notes,
        abn: owner.abn,
        communication: checkState,

        // Owner Folio
        folio_id:folio.id,
        total_money: folio.total_money,
        balance: folio.balance,
        regular_intervals: folio.regular_intervals,
        next_disburse_date: folio.next_disburse_date,
        withhold_amount: folio.withhold_amount,
        withold_reason: folio.withold_reason,
        agreement_start: folio.agreement_start,
        gained_reason: folio.gained_reason,
        comment: folio.comment,
        agreement_end: folio.agreement_end,
        owner_access: ownerAccess,

        // Owner fee temp 1
        fee_temp_1: fee_temp_1,
        // Owner fee temp 2
        fee_temp_2: fee_temp_2,
        // Owner pay method
        payment_method: payment_method,
        planData: planData ? [...planData[0]] : null,
        frequency: {
            planType: frequencyState.frequencyType,
            planId: planData ? planData[0][0]['plan_id'] : null,
            fortNightlyDate: frequencyState.fortNightlyDate ? frequencyState.fortNightlyDate : null,
            date: frequencyState.selectedDate?.value ? frequencyState.selectedDate?.value : null,
            month: frequencyState.selectedDate?.value ? frequencyState.selectedDate?.value : null,
            selectedMonth: frequencyState.selectedMonth?.value,
            selectedWeekName: frequencyState.selectedWeekName?.value ? frequencyState.selectedWeekName?.value : null,
            yearly: `${frequencyState.selectedDate?.value}/${frequencyState.selectedMonth?.value}`,
            time: frequencyState.time,
        }
    };
    console.log(formData);
    return dispatch => {
        const headers = {
            "Content-Type": "application/json",

            "Access-Control-Allow-Origin": "*",

            Authorization: "Bearer " + authUser.token,
        };

        axios
            .put(url, formData, { headers: headers })
            .then(response => {
                dispatch({
                    type: "OWNER_UPDATE",
                    payload: response.data,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: "OWNER_UPDATE",
                    payload: error,
                    status: "Failed",
                });
            });
    };
};

export const OwnerUpdateFresh = () => {
    return dispatch =>
        dispatch({
            type: "OWNER_UPDATE_FRESH",
            payload: null,
            error: null,
            status: false,
        });
};
export const OwnerInfoFresh = () => {
    return dispatch =>
        dispatch({
            type: "OWNER_INFO_FRESH",
            payload: null,
            error: null,
            status: false,
        });
};