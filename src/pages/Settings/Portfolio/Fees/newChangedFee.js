import React, { Fragment, useEffect, useState } from "react";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { connect } from "react-redux";
import Select from "react-select";
import { storeFee, accounts, storeFeeFresh, getFees, updateFee, updateFeeFresh } from "store/actions";
import toastr from "toastr";
import Switch from "react-switch";
import FeeModal from "components/FeeComponents/FeeModal";
import {
    Col,
    Row,
    Button,
} from "reactstrap";

const NewFeesModal = props => {
    const [seen, setSeen] = useState(false);
    const [error, setError] = useState({
        name: '',
        account: '',
        feeType: '',
        frequncyType: '',
        month: '',
        date: '',
        weekName: '',
    });
    const [selectedAccount, setSelectedAccount] = useState({});
    const [selectedFeeType, setSelectedFeeType] = useState({});
    const [selectedFrequencyType, setSelectedFrequencyType] = useState({});
    const [selectedMonth, setSelectedMonth] = useState({});
    const [selectedDate, setSelectedDate] = useState({});
    const [selectedWeekName, setSelectedWeekName] = useState({});
    const [state, setState] = useState({
        notes: '',
        time: '06:00',
        fee_name: '',
        disableBtn: false,
        propertyBtn: true,
        ownerBtn: false,
        percentBtn: true,
        amountBtn: false,
    });

    const [form1state, setForm1State] = useState({
        switch1: false,
        switch2: false,
    });
    const errorFresh = () => {
        setError({
            name: '',
            account: '',
            feeType: '',
            frequncyType: '',
            month: '',
            date: '',
            weekName: '',
        })
    }
    const stateHandler = e => {
        errorFresh()
        setState({ ...state, [e.target.name]: e.target.value });
    };

    const togglePercentBtn = () => {
        setState({
            ...state,
            percentBtn: true,
            amountBtn: false,
        });
    };

    const toggleAmountBtn = () => {
        setState({
            ...state,
            percentBtn: false,
            amountBtn: true,
        });
    };

    const togglePropertyBtn = () => {
        setState({
            ...state,
            selectedFeeType: {},
            optionFeeType: [
                {
                    options: [
                        { label: "Every rent receipt", value: "Every rent receipt" },
                        { label: "First rent receipt", value: "First rent receipt" },
                        { label: "Agreement date - renewed", value: "Agreement date - renewed" },
                        { label: "Every owner invoice receipt", value: "Every owner invoice receipt" },
                        { label: "Inspection completed - entry", value: "Inspection completed - entry" },
                        { label: "Inspection completed - exit", value: "Inspection completed - exit" },
                        { label: "Inspection completed - routine", value: "Inspection completed - routine" },
                        { label: "Supplier bill created", value: "Supplier bill created" },
                        { label: "Recurring", value: "Recurring" },
                        { label: "Manual", value: "Manual" },
                        { label: "Every times run disbursement", value: "Every times run disbursement" },
                    ],
                },
            ],
            propertyBtn: true,
            ownerBtn: false,
            disableBtn: false,
        });
    };

    const toggleOwnerBtn = () => {
        setState({
            ...state,
            selectedFeeType: {},
            optionFeeType: [
                {
                    options: [
                        // { label: "Each statement period", value: "First Receipt Per Statement" },
                        { label: "Recurring", value: "Recurring" },
                        { label: "Manual", value: "Manual" },
                    ],
                },
            ],
            propertyBtn: false,
            ownerBtn: true,
            percentBtn: false,
            amountBtn: true,
            disableBtn: false
        });
    };

    const handleSelectGroupAccount = e => {
        errorFresh();
        setState({ ...state, selectedAccount: e });
    };
    const handleSelectFrequencyType = e => {
        errorFresh();
        if (e.label === 'Yearly') {
            setState(prev => ({ ...prev, selectedFrequencyType: e, selectedWeekName: {}, selectedDate: {} }));
        } else if (e.label === 'Weekly') {
            setState(prev => ({ ...prev, selectedFrequencyType: e, selectedMonth: {}, selectedDate: {} }));
        } else if (e.label === 'Monthly') {
            setState(prev => ({ ...prev, selectedFrequencyType: e, selectedMonth: {}, selectedWeekName: {}, }));
        }
        setState(prev => ({ ...prev, selectedFrequencyType: e }));
    };
    const handleSelectMonth = e => {
        errorFresh();
        setState(prev => ({ ...prev, selectedMonth: e }));
    };
    const handleSelectDate = e => {
        errorFresh();
        setState(prev => ({ ...prev, selectedDate: e }));
    };
    const handleSelectWeekName = e => {
        errorFresh();
        setState(prev => ({ ...prev, selectedWeekName: e }));
    };
    const handleSelectGroupFeeType = e => {
        errorFresh();
        if (e.label === "Inspection completed - entry" || e.label === "Inspection completed - exit" || e.label === "Inspection completed - routine" || e.label === "Recurring") {
            setState(prev => ({ ...prev, selectedFeeType: e, amountBtn: true, percentBtn: false, disableBtn: true }));
        } else setState(prev => ({ ...prev, selectedFeeType: e, disableBtn: false }));
    };
    const handleRecurringTime = e => {
        console.log(e.target.value);
        errorFresh();
        setState(prev => ({ ...prev, time: e.target.value }));
    };

    const handleSave = (e) => {
        e.preventDefault();
        if (state.fee_name === '') {
            setError(prev => ({
                ...prev,
                name: 'Please enter display name',
            }));
        }
        if (JSON.stringify(state.selectedAccount) === '{}') {
            setError(prev => ({
                ...prev,
                account: 'Please select account',
            }));
        }
        if (JSON.stringify(state.selectedFeeType) === '{}') {
            setError(prev => ({
                ...prev,
                feeType: 'Please select fee type',
            }));
        }
        if (JSON.stringify(state.selectedFrequencyType) === '{}' && JSON.stringify(state.selectedFeeType) !== '{}' && state.selectedFeeType.label === 'Recurring') {
            setError(prev => ({
                ...prev,
                frequncyType: 'Please select frequency type',
            }));
        }
        if (JSON.stringify(state.selectedMonth) === '{}' && JSON.stringify(state.selectedFrequencyType) !== '{}' && state.selectedFrequencyType.label === 'Yearly') {
            setError(prev => ({
                ...prev,
                month: 'Please select a day of the year for frequency.',
            }));
        }
        if (JSON.stringify(state.selectedDate) === '{}' && JSON.stringify(state.selectedFrequencyType) !== '{}' && state.selectedFrequencyType.label === 'Yearly') {
            setError(prev => ({
                ...prev,
                date: 'Please select a day of the year for frequency.',
            }));
        }
        if (JSON.stringify(state.selectedDate) === '{}' && JSON.stringify(state.selectedFrequencyType) !== '{}' && state.selectedFrequencyType.label === 'Monthly') {
            setError(prev => ({
                ...prev,
                date: 'Please select a day of the year for frequency.',
            }));
        }
        if (JSON.stringify(state.selectedWeekName) === '{}' && JSON.stringify(state.selectedFrequencyType) !== '{}' && state.selectedFrequencyType.label === 'Weekly') {
            setError(prev => ({
                ...prev,
                weekName: 'Please select a day of the year for frequency.',
            }));
        }
        if (state.fee_name !== '' && JSON.stringify(state.selectedAccount) !== '{}' && JSON.stringify(state.selectedFeeType) !== '{}') {
            if (props.data) props.updateFee(state, form1state, props.data?.id);
            else props.storeFee(state, form1state);
        }
    };

    const getDate = (param) => {
        let elm;
        state.optionDate.forEach(element => {
            element.options.forEach(el => {
                if (param == el.label) {
                    elm = el;
                }
            })
        });
        return elm;
    }
    const getMonth = (param) => {
        let elm;
        state.optionMonth.forEach(element => {
            element.options.forEach(el => {
                if (param == el.value) {
                    elm = el;
                }
            })
        });
        return elm;
    }

    useEffect(() => {
        if (!seen) {
            props.accounts();
        }
        let optionAccount;
        if (props.accounts_data?.data) {
            optionAccount = props.accounts_data?.data.map(item => ({
                label: item.account_number + ' - ' + item.account_name,
                value: item.id,
            }));
            setState(prev => ({ ...prev, optionAccount: optionAccount }));
        }
        if (props.store_fee_loading === 'Success') {
            toastr.success('New fee created successfully');
            props.storeFeeFresh();
            props.getFees();
            props.toggle();
        }
        if (props.update_fee_loading === 'Success') {
            toastr.success('Fee updated successfully');
            props.updateFeeFresh();
            props.getFees();
            props.setData('');
            props.toggle();
        }
        if (props.data) {
            let val = props.data;
            let text = val?.yearly;
            if (val?.frequnecy_type === 'Yearly') {
                text = text.split('/');
            }
            setState(prev => ({
                ...prev,
                fee_name: val?.display_name,
                selectedAccount: { label: val?.account?.account_name, value: val?.account?.id },
                selectedFeeType: { label: val?.fee_type, value: val?.fee_type },
                propertyBtn: val?.charging === 'Ownership' ? true : false,
                ownerBtn: val?.charging === 'Ownership' ? false : true,
                percentBtn: val?.value === '%' ? true : false,
                amountBtn: val?.value === '৳' ? true : false,
                time: val?.time ? val?.time : '06:00',
                notes: val?.note,
                selectedFrequencyType: val?.frequnecy_type ? { label: val?.frequnecy_type, value: val?.frequnecy_type } : {},
                selectedMonth: val?.frequnecy_type === 'Yearly' ? getMonth(text['1']) : {},
                selectedWeekName: val?.frequnecy_type === 'Weekly' ? { label: val?.weekly, value: val?.weekly } : {},
                disableBtn: (val?.fee_type === 'Inspection completed - entry' || val?.fee_type === 'Inspection completed - exit' || val?.fee_type === 'Inspection completed - routine' || val?.fee_type === 'Recurring'),
                selectedDate: (val?.frequnecy_type === 'Monthly' || val?.frequnecy_type === 'Yearly') ?
                    val?.frequnecy_type === 'Monthly' ? getDate(val?.monthly) : getDate(Number(text['0'])) : {},
            }));
            setForm1State(prev => ({
                ...prev,
                switch3: val?.menu_id ? true : false,
                switch1: val?.status === 1 ? true : false,
            }));
        }
        setSeen(true);
    }, [props.accounts_loading, props.menu_loading, props.store_fee_loading, props.update_fee_loading, props.accounts_data]);

    const Offsymbol = () => {
        return (
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                    fontSize: 12,
                    color: "#fff",
                    paddingRight: 2,
                }}
            >
                {" "}
                No
            </div>
        );
    };
    const OnSymbol = props => {
        return (
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                    fontSize: 12,
                    color: "#fff",
                    paddingRight: 2,
                }}
            >
                {" "}
                Yes
            </div>
        );
    };

    let display_name = <Row className="py-2">
        <Col md={4} className="d-flex justify-content-start ps-5">
            Display name
        </Col>
        <Col md={8} className="">
            <div>
                <input
                    className="form-control px-2"
                    type="text"
                    name="fee_name"
                    placeholder="Fee name"
                    onChange={stateHandler}
                    value={state.fee_name}
                />
            </div>
            {
                error.name !== '' &&
                <div className="text-danger">
                    {error.name}
                </div>
            }
        </Col>
    </Row>
    let calculation = <Row className="py-2">
        <Col md={4} className="d-flex justify-content-start ps-5">
            Calculation
        </Col>
        <Col md={8} className="">
            <div className="btn-group btn-group-justified">
                <div className="btn-group">
                    <Button
                        color={state.percentBtn ? "secondary" : "light"}
                        onClick={togglePercentBtn}
                        disabled={state.ownerBtn && true || state.disableBtn && true}
                    >
                        {state.percentBtn ? (
                            <i className="bx bx-comment-check"></i>
                        ) : null}
                        <span> Percent</span>
                    </Button>
                </div>
                <div className="btn-group">
                    <Button
                        color={state.amountBtn ? "secondary" : "light"}
                        onClick={toggleAmountBtn}
                        disabled={!state.ownerBtn ? false : true}
                    >
                        {state.amountBtn ? (
                            <i className="bx bx-comment-check"></i>
                        ) : null}
                        <span> Fixed Amount</span>
                    </Button>
                </div>
            </div>
        </Col>
    </Row>

    return (
        <Fragment>
            <FeeModal>
                {{ display_name, calculation }}
            </FeeModal>
        </Fragment>
    );
};
const mapStateToProps = gstate => {
    const { accounts_data, accounts_loading } = gstate.Bills;
    const {
        store_fee_loading,
        update_fee_loading,
    } = gstate.FeeSettings;

    return {
        fee_add_data,
        fee_add_data_loading,
        accounts_data,
        accounts_loading,
        store_fee_loading,
        update_fee_loading,
    };
};
export default connect(mapStateToProps, { accounts, storeFee, storeFeeFresh, getFees, updateFee, updateFeeFresh })(
    NewFeesModal
);
