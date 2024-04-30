import React, { useEffect, useState } from "react"
import {
    Col,
    Row,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Label,
    Input,
    FormGroup,
} from "reactstrap"
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css"
import { connect } from "react-redux"
import Select from "react-select"
import { portfolioFeeAdd, accounts, storeAddon, storeAddonFresh, getAddons, editAddon, editAddonFresh } from "store/actions"
import { MenuListData } from "store/Menu/action"
import toastr from "toastr"
import Switch from "react-switch"
import { optionFeeType, optionDate, optionMonth, optionWeekName, optionFrequencyType } from "pages/common/common"

const NewAddonModal = props => {
    const [seen, setSeen] = useState(false);
    const [error, setError] = useState({
        name: '',
        account: '',
        feeType: '',
        frequncyType: '',
        price: '',
        month: '',
        date: '',
        weekName: '',
    });

    const [state, setState] = useState({
        price: '',
        notes: '',
        time: '06:00',
        fee_name: '',
        selectedAccount: {},
        optionAccount: [],
        optionMenu: [],
        selectedFeeType: {},
        selectedFrequencyType: {},
        selectedMonth: {},
        selectedDate: {},
        selectedWeekName: {},
        selectedMenu: {},
        optionFeeType: optionFeeType,
        optionFrequencyType: optionFrequencyType,
        optionMonth: optionMonth,
        optionDate: optionDate,
        optionWeekName: optionWeekName,
        disableBtn: false,
        propertyBtn: true,
        ownerBtn: false,
        percentBtn: true,
        amountBtn: false,
    });

    const [form1state, setForm1State] = useState({
        switch1: false,
        switch2: false,
        switch3: false,
    });
    const errorFresh = () => {
        setError({ name: '', account: '', feeType: '', price: '' })
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
            optionFeeType: optionFeeType,
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
    const handleSelectMenu = e => {
        errorFresh();
        setState(prev => ({ ...prev, selectedMenu: e }));
    };
    const handleRecurringTime = e => {
        errorFresh();
        setState(prev => ({ ...prev, time: e.target.value }));
    };

    const handleSave = (e) => {
        e.preventDefault();
        if (state.fee_name === '' && JSON.stringify(state.selectedMenu) === '{}') {
            setError(prev => ({
                ...prev,
                name: 'Please enter display name',
            }));
        }
        if (state.price === '') {
            setError(prev => ({
                ...prev,
                price: 'Please enter price',
            }));
        }
        if (state.price !== '' && isNaN(state.price)) {
            setState(prev => ({ ...prev, price: '' }))
            setError(prev => ({
                ...prev,
                price: 'Only numerical number will be taken',
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
        if ((state.fee_name !== '' || JSON.stringify(state.selectedMenu) !== '{}') && state.price !== '' && JSON.stringify(state.selectedAccount) !== '{}' && JSON.stringify(state.selectedFeeType) !== '{}') {
            if (props.data) props.editAddon(state, form1state, props.data?.id);
            else props.storeAddon(state, form1state);
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
            props.MenuListData();
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

        let optionMenu;
        if (props.menu_data?.data) {
            optionMenu = props.menu_data?.data.map(item => ({
                label: item.menu_title,
                value: item.id,
            }));
            setState(prev => ({ ...prev, optionMenu: optionMenu }));
        }
        if (props.addon_loading === 'Success') {
            toastr.success('New addon created successfully');
            props.storeAddonFresh();
            props.getAddons();
            props.toggle();
        }
        if (props.edit_addon_loading === 'Success') {
            toastr.success('Addon updated successfully');
            props.editAddonFresh();
            props.getAddons();
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
                price: val?.price,
                fee_name: val?.display_name,
                selectedAccount: { label: val?.account?.account_name, value: val?.account?.id },
                selectedFeeType: { label: val?.fee_type, value: val?.fee_type },
                selectedMenu: { label: val?.menu_id ? val?.display_name : '', value: val?.menu_id ? val?.menu_id : '' },
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
    }, [props.accounts_loading, props.menu_loading, props.addon_loading, props.edit_addon_loading, props.accounts_data]);

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

    return (
        <>
            <Modal
                isOpen={props.state.newFeesModal}
                toggle={() => {
                    props.toggle();
                    props.setData('');
                }}
                size="lg"
                style={{ width: '500px' }}
            >
                {/* <ModalHeader toggle={() => {
                    props.toggle();
                    props.setData('');
                }}>{props.data ? 'Update' : 'New'} Addon</ModalHeader> */}



                <ModalHeader style={{ backgroundColor: "#6E62E5" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", width: "470px", marginTop: "10px" }}>
                        <div>

                            <span className="text-white">{props.data ? 'Update' : 'New'} Addon</span>
                        </div>
                        <i className="mdi mdi-close-thick font-size-20 text-white" onClick={() => { props.toggle(), props.setData() }} style={{ cursor: "pointer" }}></i>
                    </div>
                </ModalHeader>
                <ModalBody style={{ backgroundColor: "#F2F6FA" }}>
                    <Row>
                        <Col lg={12}>
                            <Row className="py-2">
                                <Col md={4} className="d-flex justify-content-start ps-5">
                                    Menu
                                </Col>
                                <Col md={8} className="">
                                    <div>
                                        <Switch
                                            uncheckedIcon={<Offsymbol />}
                                            checkedIcon={<OnSymbol />}
                                            className="me-1 mb-sm-8 mb-2"
                                            onColor="#153D58"
                                            onChange={() => {
                                                setForm1State(prev => ({
                                                    ...prev,
                                                    switch3: !prev.switch3,
                                                }));
                                            }}
                                            checked={form1state.switch3}
                                        />
                                    </div>
                                </Col>
                            </Row>
                            <Row className="py-2 justify-content-center" style={{ position: "relative", zIndex: "15" }}>
                                <Col md={11} className="">
                                    <div className="form-group-new" style={{ marginBottom: "-15px" }}>
                                        {
                                            !form1state.switch3 ?
                                                <input
                                                    className="form-control px-2"
                                                    type="text"
                                                    name="fee_name"
                                                    placeholder="Fee name"
                                                    onChange={stateHandler}
                                                    value={state.fee_name}
                                                /> :
                                                <Select
                                                    value={state.selectedMenu}
                                                    onChange={handleSelectMenu}
                                                    options={state.optionMenu}
                                                    classNamePrefix="select2-selection"
                                                />
                                        }
                                        <label htmlFor="usr">Display name</label>
                                    </div>
                                    {
                                        error.name !== '' &&
                                        <div className="text-danger">
                                            {error.name}
                                        </div>
                                    }
                                </Col>
                            </Row>
                            <Row className="py-2">
                                <Col md={6} className="d-flex justify-content-start ps-5">
                                    Who are you charging
                                </Col>
                                <Col md={6} className="">
                                    <div className="btn-group btn-group-justified">
                                        <div className="btn-group">
                                            <Button
                                                color={state.propertyBtn ? "buttonColor" : "light"}
                                            //onClick={togglePropertyBtn}
                                            >
                                                {state.propertyBtn ? (
                                                    <i className="bx bx-comment-check"></i>
                                                ) : null}
                                                <span> Property</span>
                                            </Button>
                                        </div>
                                        {/* <div className="btn-group">
                                            <Button
                                                color={state.ownerBtn ? "secondary" : "light"}
                                                onClick={toggleOwnerBtn}
                                            >
                                                {state.ownerBtn ? (
                                                    <i className="bx bx-comment-check"></i>
                                                ) : null}
                                                <span> Owner</span>
                                            </Button>
                                        </div> */}
                                    </div>
                                </Col>
                            </Row>
                            <Row className="py-2 justify-content-center" style={{ position: "relative", zIndex: "12" }}>
                                {/* <Col md={4} className="d-flex justify-content-start ps-5">
                                    Account
                                </Col> */}
                                <Col md={11} className="">
                                    <div className="form-group-new" style={{ marginBottom: "-15px" }}>
                                        <Select
                                            value={state.selectedAccount}
                                            onChange={handleSelectGroupAccount}
                                            options={state.optionAccount}
                                            classNamePrefix="select2-selection"
                                            placeholder="Select an account"
                                        />
                                        <label htmlFor="usr">Account</label>
                                    </div>
                                    {
                                        error.account !== '' &&
                                        <div className="text-danger">
                                            {error.account}
                                        </div>
                                    }
                                </Col>
                            </Row>
                            <Row className="py-2 justify-content-center" style={{ position: "relative", zIndex: "2" }}>
                                {/* <Col md={4} className="d-flex justify-content-start ps-5">
                                    Fee type
                                </Col> */}
                                <Col md={11} className="">
                                    <div className="form-group-new" style={{ marginBottom: "-15px" }}>
                                        <Select
                                            value={state.selectedFeeType}
                                            onChange={handleSelectGroupFeeType}
                                            options={state.optionFeeType}
                                            classNamePrefix="select2-selection"
                                            isDisabled={props.data ? true : false}
                                            placeholder="Select a fee type"
                                        />
                                        <label htmlFor="usr">Fee type</label>
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
                                <Row className="py-2 justify-content-center">

                                    <Col md={11} className="">
                                        <div className="form-group-new" style={{ marginBottom: "-15px" }}>
                                            <Select
                                                value={state.selectedFrequencyType}
                                                onChange={handleSelectFrequencyType}
                                                options={state.optionFrequencyType}
                                                classNamePrefix="select2-selection"
                                                placeholder="Select a frequency type"
                                            />
                                            <label htmlFor="usr">Frequency type</label>
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
                                <Row className="py-2 justify-content-center">

                                    <Col md={11} className="d-flex gap-1">
                                        <Col md={6} className="">
                                            <div className="form-group-new" style={{ marginBottom: "-15px" }}>
                                                <Select
                                                    value={state.selectedMonth}
                                                    onChange={handleSelectMonth}
                                                    options={state.optionMonth}
                                                    classNamePrefix="select2-selection"
                                                    placeholder="Select a month"
                                                />
                                                <label htmlFor="usr">Month</label>
                                            </div>
                                            {
                                                error.month !== '' &&
                                                <div className="text-danger">
                                                    {error.month}
                                                </div>
                                            }
                                        </Col>
                                        <Col md={6} className="">
                                            <div className="form-group-new" style={{ marginBottom: "-15px" }}>
                                                <Select
                                                    value={state.selectedDate}
                                                    onChange={handleSelectDate}
                                                    options={state.optionDate}
                                                    classNamePrefix="select2-selection"
                                                    placeholder="Select a day"
                                                />
                                                <label htmlFor="usr">Day</label>
                                            </div>
                                            {
                                                error.date !== '' &&
                                                <div className="text-danger">
                                                    {error.date}
                                                </div>
                                            }
                                        </Col>
                                    </Col>

                                </Row>

                            }
                            {
                                state.selectedFrequencyType?.label === 'Monthly' &&
                                <Row className="py-2 justify-content-center">

                                    <Col md={11} className="">
                                        <div className="form-group-new" style={{ marginBottom: "-15px" }}>
                                            <Select
                                                value={state.selectedDate}
                                                onChange={handleSelectDate}
                                                options={state.optionDate}
                                                classNamePrefix="select2-selection"
                                                placeholder="Select a day"
                                            />
                                            <label htmlFor="usr">Day</label>
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
                                <Row className="py-2 justify-content-center">
                                    {/* <Col md={4} className="d-flex justify-content-start ps-5">
                                        Day of week
                                    </Col> */}
                                    <Col md={11} className="">
                                        <div className="form-group-new" style={{ marginBottom: "-15px" }}>
                                            <Select
                                                value={state.selectedWeekName}
                                                onChange={handleSelectWeekName}
                                                options={state.optionWeekName}
                                                classNamePrefix="select2-selection"
                                                placeholder="Select a day of week"
                                            />
                                            <label htmlFor="usr"> Day of week</label>
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
                                <Row className="py-2 justify-content-center">
                                    {/* <Col md={4} className="d-flex justify-content-start ps-5">
                                        Time
                                    </Col> */}
                                    <Col md={11} className="">
                                        <div className="form-group-new" style={{ marginBottom: "-15px" }}>
                                            <input
                                                className="form-control"
                                                type="time"
                                                value={state.time}
                                                defaultValue="06:00:00"
                                                id="example-time-input"
                                                onChange={handleRecurringTime}
                                            />
                                            <label htmlFor="usr">Time</label>
                                        </div>
                                    </Col>
                                </Row>
                            }
                            {
                                state.selectedFeeType?.label === 'Manual' &&
                                <div className="justify-content-center" style={{ textAlign: "center", justifyContent: "center", alignItems: "center", paddingLeft: "20px" }}>
                                    <FormGroup row style={{ position: "relative", zIndex: "1" }}>

                                        <Label for="exampleSelect " className="form-group-new-desc-label" style={{ marginBottom: "-10px", zIndex: "10", width: "50px", padding: "0px 3px 0px 3px" }}>
                                            Notes
                                        </Label>
                                        <Col md={11} className="">
                                            <div className="form-group-new-desc" >
                                                <Input
                                                    id="basicpill-address-input1"
                                                    className="form-control"
                                                    rows="5"
                                                    name="notes"
                                                    type="textarea"
                                                    //placeholder="Notes"
                                                    onChange={stateHandler}
                                                    value={state.notes}
                                                />

                                            </div>
                                        </Col>

                                    </FormGroup>
                                </div>
                            }
                            <Row className="py-2">
                                {/* <Col md={4} className="d-flex justify-content-start ps-5">
                                    Price
                                </Col> */}
                                <Col md={11} className="d-flex justify-content-center gap-4" style={{ paddingLeft: "43px" }}>
                                    <Col md={5} className="">
                                        <Row className="d-flex align-items-center">
                                            <Col
                                                md={12}
                                                className="d-flex mb-1"
                                            >
                                                <div className="form-group-new">
                                                    <input
                                                        className="form-control"
                                                        name="price"
                                                        id="amount"
                                                        type="text"
                                                        placeholder="0.00"
                                                        style={{
                                                            borderTopRightRadius: 0,
                                                            borderBottomRightRadius: 0,
                                                            borderTopLeftRadius: 5,
                                                            borderBottomLeftRadius: 5,
                                                        }}
                                                        value={state.price}
                                                        onChange={stateHandler}
                                                    />
                                                    <label htmlFor="usr">Price</label>
                                                </div>
                                                {
                                                    state.amountBtn &&
                                                    <span className="input-group-append">
                                                        <span
                                                            className="input-group-text"
                                                            style={{
                                                                borderTopLeftRadius: 0,
                                                                borderBottomLeftRadius: 0,
                                                            }}
                                                        >
                                                            ৳
                                                        </span>
                                                    </span>
                                                }
                                                {
                                                    state.percentBtn &&
                                                    <span className="input-group-append">
                                                        <span
                                                            className="input-group-text"
                                                            style={{
                                                                borderTopLeftRadius: 0,
                                                                borderBottomLeftRadius: 0,
                                                            }}
                                                        >
                                                            %
                                                        </span>
                                                    </span>
                                                }
                                            </Col>
                                        </Row>
                                        {
                                            error.price !== '' &&
                                            <div className="text-danger">
                                                {error.price}
                                            </div>
                                        }
                                    </Col>
                                    <Col md={7} className="">
                                        <div className="btn-group btn-group-justified">
                                            <div className="btn-group">
                                                <Button
                                                    color={state.percentBtn ? "#6E62E5" : "light"}
                                                    onClick={togglePercentBtn}
                                                    disabled={state.ownerBtn && true || state.disableBtn && true}
                                                // disabled={!state.ownerBtn ? false : true }
                                                >
                                                    {state.percentBtn ? (
                                                        <i className="bx bx-comment-check"></i>
                                                    ) : null}
                                                    <span> Percent</span>
                                                </Button>
                                            </div>
                                            <div className="btn-group">
                                                <Button
                                                    color={state.amountBtn ? "#6E62E5" : "light"}
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
                                </Col>
                            </Row>

                            <Row>
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
                </ModalBody >
                <ModalFooter style={{ backgroundColor: "#F2F6FA" }}>
                    <Button color="danger" onClick={
                        () => {
                            props.toggle();
                            props.setData('');
                        }
                    }>
                        <i className="fas fa-times me-1"></i>Cancel
                    </Button>
                    <Button color="buttonColor" onClick={handleSave}>
                        <i className="fas fa-file-alt me-1"></i> Save
                    </Button>
                </ModalFooter>
            </Modal >
        </>
    );
};
const mapStateToProps = gstate => {
    const { fee_add_data, fee_add_data_loading } = gstate.Portfolio;
    const { menu_data, menu_loading, menu_error } = gstate.MenuList;
    const { accounts_data, accounts_loading } = gstate.Bills;

    const {
        addon_loading,
        edit_addon_loading,
    } = gstate.Addon;

    return {
        menu_data,
        menu_loading,
        menu_error,
        fee_add_data,
        fee_add_data_loading,
        accounts_data,
        accounts_loading,

        addon_loading,
        edit_addon_loading,
    };
};
export default connect(mapStateToProps, { portfolioFeeAdd, accounts, MenuListData, storeAddon, storeAddonFresh, getAddons, editAddon, editAddonFresh })(
    NewAddonModal
);
