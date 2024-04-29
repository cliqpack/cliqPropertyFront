import React, { useState, useEffect } from "react";
import {
    Col,
    Row,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from "reactstrap";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { connect } from "react-redux";
import Select from "react-select";
import Switch from "react-switch";

const FeesModal = props => {
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
    const [optionAccount, setOptionAccount] = useState([]);
    const [optionWeekName, setOptionWeekName] = useState([]);
    const [optionDate, setOptionDate] = useState([
        {
            options: [
                { label: "1", value: "01" },
                { label: "2", value: "02" },
                { label: "3", value: "03" },
                { label: "4", value: "04" },
                { label: "5", value: "05" },
                { label: "6", value: "06" },
                { label: "7", value: "07" },
                { label: "8", value: "08" },
                { label: "9", value: "09" },
                { label: "10", value: "10" },
                { label: "11", value: "11" },
                { label: "12", value: "12" },
                { label: "13", value: "13" },
                { label: "14", value: "14" },
                { label: "15", value: "15" },
                { label: "16", value: "16" },
                { label: "17", value: "17" },
                { label: "18", value: "18" },
                { label: "19", value: "19" },
                { label: "20", value: "20" },
                { label: "21", value: "21" },
                { label: "22", value: "22" },
                { label: "23", value: "23" },
                { label: "24", value: "24" },
                { label: "25", value: "25" },
                { label: "26", value: "26" },
                { label: "27", value: "27" },
                { label: "28", value: "28" },
            ],
        },
    ]);
    const [optionMonth, setOptionMonth] = useState([
        {
            options: [
                { label: "January", value: "1" },
                { label: "February", value: "2" },
                { label: "March", value: "3" },
                { label: "April", value: "4" },
                { label: "May", value: "5" },
                { label: "June", value: "6" },
                { label: "July", value: "7" },
                { label: "August", value: "8" },
                { label: "September", value: "9" },
                { label: "October", value: "10" },
                { label: "November", value: "11" },
                { label: "December", value: "12" },
            ],
        },
    ]);
    const [optionFrequencyType, setOptionFrequencyType] = useState([
        {
            options: [
                { label: "Yearly", value: "Yearly" },
                { label: "Monthly", value: "Monthly" },
                { label: "Weekly", value: "Weekly" },
            ],
        },
    ]);
    const [optionFeeType, setOptionFeeType] = useState([
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
    ]);

    const [form1state, setForm1State] = useState({
        switch1: false,
        switch2: false,
        switch3: false,
        selectedFiles: [],
    });
    const stateHandler = e => {
        errorFresh()
        setState({ ...state, [e.target.name]: e.target.value });
    };

    const togglePropertyBtn = () => {
        setOptionFeeType(
            [
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
            ]
        )
    };

    const toggleOwnerBtn = () => {
        setOptionFeeType(
            [
                {
                    options: [
                        // { label: "Each statement period", value: "First Receipt Per Statement" },
                        { label: "Recurring", value: "Recurring" },
                        { label: "Manual", value: "Manual" },
                    ],
                },
            ]
        )
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
            setOptionAccount(optionAccount);
        }
        setSeen(true);
    }, [props.accounts_loading]);

    return (
        <>
            <Modal
                isOpen={props.state.newFeesModal}
                toggle={() => {
                    props.toggle();
                    props.setData('');
                }}
                size="lg"
                style={{ width: '600px' }}
            >
                <ModalHeader toggle={() => {
                    props.toggle();
                    props.setData('');
                }}>{props.data ? 'Update' : 'New'} Fee</ModalHeader>
                <ModalBody>
                    <Row>
                        <Col lg={12}>
                            {props.children.display_name}
                            <Row className="py-3">
                                <Col md={4} className="d-flex justify-content-start ps-5">
                                    Who are you charging
                                </Col>
                                <Col md={8} className="">
                                    <div className="btn-group btn-group-justified">
                                        <div className="btn-group">
                                            <Button
                                                color={state.propertyBtn ? "secondary" : "light"}
                                                onClick={togglePropertyBtn}
                                            >
                                                {state.propertyBtn ? (
                                                    <i className="bx bx-comment-check"></i>
                                                ) : null}
                                                <span> Property</span>
                                            </Button>
                                        </div>
                                        <div className="btn-group">
                                            <Button
                                                color={state.ownerBtn ? "secondary" : "light"}
                                                onClick={toggleOwnerBtn}
                                            >
                                                {state.ownerBtn ? (
                                                    <i className="bx bx-comment-check"></i>
                                                ) : null}
                                                <span> Owner</span>
                                            </Button>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                            <Row className="py-1 mb-2">
                                <Col md={4} className="d-flex justify-content-start ps-5">
                                    Account
                                </Col>
                                <Col md={8} className="">
                                    <div>
                                        <Select
                                            value={state.selectedAccount}
                                            onChange={handleSelectGroupAccount}
                                            options={optionAccount}
                                            classNamePrefix="select2-selection"
                                            placeholder="Select an account"
                                        />
                                    </div>
                                    {
                                        error.account !== '' &&
                                        <div className="text-danger">
                                            {error.account}
                                        </div>
                                    }
                                </Col>
                            </Row>
                            <Row className="py-1 mb-2">
                                <Col md={4} className="d-flex justify-content-start ps-5">
                                    Fee type
                                </Col>
                                <Col md={8} className="">
                                    <div>
                                        <Select
                                            value={state.selectedFeeType}
                                            onChange={handleSelectGroupFeeType}
                                            options={optionFeeType}
                                            classNamePrefix="select2-selection"
                                            isDisabled={props.data ? true : false}
                                            placeholder="Select a fee type"
                                        />
                                    </div>
                                    {
                                        error.feeType !== '' &&
                                        <div className="text-danger">
                                            {error.feeType}
                                        </div>
                                    }
                                </Col>
                            </Row>
                            {
                                state.selectedFeeType?.label === 'Recurring' &&
                                <Row className="py-1 mb-2">
                                    <Col md={4} className="d-flex justify-content-start ps-5">
                                        Frequency type
                                    </Col>
                                    <Col md={8} className="">
                                        <div>
                                            <Select
                                                value={state.selectedFrequencyType}
                                                onChange={handleSelectFrequencyType}
                                                options={optionFrequencyType}
                                                classNamePrefix="select2-selection"
                                                placeholder="Select a frequency type"
                                            />
                                        </div>
                                        {
                                            error.frequncyType !== '' &&
                                            <div className="text-danger">
                                                {error.frequncyType}
                                            </div>
                                        }
                                    </Col>
                                </Row>
                            }
                            {
                                state.selectedFrequencyType?.label === 'Yearly' &&
                                <Row className="py-1 mb-2">
                                    <Col md={4} className="d-flex justify-content-start ps-5">
                                        Day
                                    </Col>
                                    <Col md={4} className="">
                                        <div>
                                            <Select
                                                value={state.selectedMonth}
                                                onChange={handleSelectMonth}
                                                options={optionMonth}
                                                classNamePrefix="select2-selection"
                                                placeholder="Select a month"
                                            />
                                        </div>
                                        {
                                            error.month !== '' &&
                                            <div className="text-danger">
                                                {error.month}
                                            </div>
                                        }
                                    </Col>
                                    <Col md={4} className="">
                                        <div>
                                            <Select
                                                value={state.selectedDate}
                                                onChange={handleSelectDate}
                                                options={optionDate}
                                                classNamePrefix="select2-selection"
                                                placeholder="Select a day"
                                            />
                                        </div>
                                        {
                                            error.date !== '' &&
                                            <div className="text-danger">
                                                {error.date}
                                            </div>
                                        }
                                    </Col>
                                </Row>
                            }
                            {
                                state.selectedFrequencyType?.label === 'Monthly' &&
                                <Row className="py-1 mb-2">
                                    <Col md={4} className="d-flex justify-content-start ps-5">
                                        Day
                                    </Col>
                                    <Col md={8} className="">
                                        <div>
                                            <Select
                                                value={state.selectedDate}
                                                onChange={handleSelectDate}
                                                options={optionDate}
                                                classNamePrefix="select2-selection"
                                                placeholder="Select a day"
                                            />
                                        </div>
                                        {
                                            error.date !== '' &&
                                            <div className="text-danger">
                                                {error.date}
                                            </div>
                                        }
                                    </Col>
                                </Row>
                            }
                            {
                                state.selectedFrequencyType?.label === 'Weekly' &&
                                <Row className="py-1 mb-2">
                                    <Col md={4} className="d-flex justify-content-start ps-5">
                                        Day of week
                                    </Col>
                                    <Col md={8} className="">
                                        <div>
                                            <Select
                                                value={state.selectedWeekName}
                                                onChange={handleSelectWeekName}
                                                options={optionWeekName}
                                                classNamePrefix="select2-selection"
                                                placeholder="Select a day of week"
                                            />
                                        </div>
                                        {
                                            error.date !== '' &&
                                            <div className="text-danger">
                                                {error.weekName}
                                            </div>
                                        }
                                    </Col>
                                </Row>
                            }
                            {
                                state.selectedFeeType?.label === 'Recurring' &&
                                <Row className="py-1 mb-2">
                                    <Col md={4} className="d-flex justify-content-start ps-5">
                                        Time
                                    </Col>
                                    <Col md={8} className="">
                                        <div>
                                            <input
                                                className="form-control"
                                                type="time"
                                                value={state.time}
                                                defaultValue="06:00:00"
                                                id="example-time-input"
                                                onChange={handleRecurringTime}
                                            />
                                        </div>
                                    </Col>
                                </Row>
                            }
                            {
                                state.selectedFeeType?.label === 'Manual' &&
                                <Row className="py-2">
                                    <Col md={4} className="d-flex justify-content-start ps-5">
                                        Notes
                                    </Col>
                                    <Col md={8} className="">
                                        <div>
                                            <textarea
                                                id="basicpill-address-input1"
                                                className="form-control"
                                                rows="2"
                                                name="notes"
                                                placeholder="Notes"
                                                onChange={stateHandler}
                                                value={state.notes}
                                            />
                                        </div>
                                    </Col>
                                </Row>
                            }
                            {props.children.calculation}

                            <Row className="py-1">
                                <Col md={4} className="d-flex justify-content-start ps-5">
                                    Active
                                </Col>
                                <Col md={8} className="">
                                    <Switch
                                        uncheckedIcon={<Offsymbol />}
                                        checkedIcon={<OnSymbol />}
                                        className="me-1 mb-sm-8 mb-2"
                                        onColor="#153D58"
                                        onChange={() => {
                                            setForm1State({
                                                ...form1state,
                                                switch1: !form1state.switch1,
                                            });
                                        }}
                                        checked={form1state.switch1}
                                    />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={
                        () => {
                            props.toggle();
                            props.setData('');
                        }
                    }>
                        <i className="fas fa-times me-1"></i>Cancel
                    </Button>
                    <Button color="info" onClick={handleSave}>
                        <i className="fas fa-file-alt me-1"></i> Save
                    </Button>
                </ModalFooter>
            </Modal>
        </>
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
    FeesModal
);
