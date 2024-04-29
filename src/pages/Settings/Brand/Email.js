import React, { useState, useEffect, useRef } from "react";
import moment from "moment";
import { connect } from "react-redux";
import PropTypes, { number } from "prop-types";
import { useDispatch } from "react-redux";
import {
    Card,
    Alert,
    CardBody,
    CardText,
    CardTitle,
    Col,
    Container,
    Row,
    Label,
    Input,
    Button,
    CardHeader,
    Nav,
    NavItem,
    NavLink,
    TabContent,
    TabPane
} from "reactstrap";
import Select from "react-select";
import { getSettingsEmailStationaryData, addEmailSettings, addEmailSettingsFresh } from "store/actions";
import { Link, useHistory, withRouter } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";
import toastr from "toastr";
import ToolkitProvider, {
    Search,
} from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
    PaginationProvider,
    PaginationListStandalone,
    SizePerPageDropdownStandalone,
} from "react-bootstrap-table2-paginator";
import classnames from "classnames";
import EmailImage from "./EmailImage";
import ColorPicker from '@vtaits/react-color-picker';
import '@vtaits/react-color-picker/dist/index.css';
import ColorBtn from "common/Button/ColorBtn";
import SelectSearch from "common/Select-Search/SelectSearch";


document.title = "CliqProperty";

const Email = props => {
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(false)

    const [init, setInit] = useState(true)
    const [state, setState] = useState({
        leftHeaderBtn: true, middleHeaderBtn: false, rightHeaderBtn: false,
        leftHeaderTextBtn: true, middleHeaderTextBtn: false, rightHeaderTextBtn: false,
        leftFooterBtn: true, middleFooterBtn: false, rightFooterBtn: false,
        leftFooterTextBtn: true, middleFooterTextBtn: false, rightFooterTextBtn: false,
        HeaderText: "", FooterText: '',

        activeTab: '1', headerBgColor: "#FFFFFF", footerBgColor: "#FFFFFF", bodyColor: "#FFFFFF", bodyBgColor: "#FFFFFF", headerImgHeight: '22', footerImgHeight: '22', headerColor: "#FFFFFF", footerColor: '#FFFFFF',

        selectedFont: [],
        optionFont: [
            { label: 'Arial', value: 'Arial' },
            { label: 'Courier', value: 'Courier' },
            { label: 'Georgia', value: 'Georgia' },
            { label: 'Verdana', value: 'Verdana' },
        ],
        selectedFontSize: [],
        optionFontSize: [
            { label: 10, value: 10 },
            { label: 11, value: 11 },
            { label: 12, value: 12 },
            { label: 13, value: 13 },
            { label: 14, value: 14 },
            { label: 15, value: 15 },
            { label: 16, value: 16 },

        ]

    });

    // console.log(state);


    const togglePositionHeaderBtn = (data) => {
        setState(prev => ({
            ...prev,
            leftHeaderBtn: data == 'Left' ? true : false, middleHeaderBtn: data == 'Middle' ? true : false, rightHeaderBtn: data == 'Right' ? true : false,
        }))
    }
    const togglePositionHeaderTextBtn = (data) => {
        setState(prev => ({
            ...prev,
            leftHeaderTextBtn: data == 'Left' ? true : false, middleHeaderTextBtn: data == 'Middle' ? true : false, rightHeaderTextBtn: data == 'Right' ? true : false,
        }))
    }
    const togglePositionFooterBtn = (data) => {

        setState(prev => ({
            ...prev,
            leftFooterBtn: data == 'Left' ? true : false, middleFooterBtn: data == 'Middle' ? true : false, rightFooterBtn: data == 'Right' ? true : false,
        }))
    }
    const togglePositionFooterTextBtn = (data) => {
        setState(prev => ({
            ...prev,
            leftFooterTextBtn: data == 'Left' ? true : false, middleFooterTextBtn: data == 'Middle' ? true : false, rightFooterTextBtn: data == 'Right' ? true : false,
        }))
    }
    const [img, setImg] = useState({ headerImg: '', headerImgFile: '', footerImg: '', footerImgFile: '', headerImageRemoved: null, footerImageRemoved: null, })


    useEffect(() => {
        if (props.settingsEmailData?.data?.email_settings) {


            const {
                left_header_btn, middle_header_btn, right_header_btn, left_header_text_btn, middle_header_text_btn, right_header_text_btn, headerImgHeight, header_bg_color, left_footer_btn, middle_footer_btn, right_footer_btn, left_footer_text_btn, middle_footer_text_btn, right_footer_text_btn, footer_bg_color,
                body_color, body_bg_color, selected_font, selected_font_size, header_text, footer_text,

            } = props.settingsEmailData?.data?.email_settings;


            setState({
                ...state,
                leftHeaderBtn: left_header_btn == 1 ? true : false,
                middleHeaderBtn: middle_header_btn == 1 ? true : false,
                rightHeaderBtn: right_header_btn == 1 ? true : false,
                leftHeaderTextBtn: left_header_text_btn == 1 ? true : false,
                middleHeaderTextBtn: middle_header_text_btn == 1 ? true : false,
                rightHeaderTextBtn: right_header_text_btn == 1 ? true : false,
                // headerImgHeight: headerImgHeight,
                headerBgColor: header_bg_color,
                HeaderText: header_text,


                FooterText: footer_text,
                leftFooterBtn: left_footer_btn == 1 ? true : false,
                middleFooterBtn: middle_footer_btn == 1 ? true : false,
                rightFooterBtn: right_footer_btn == 1 ? true : false,
                leftFooterTextBtn: left_footer_text_btn == 1 ? true : false,
                middleFooterTextBtn: middle_footer_text_btn == 1 ? true : false,
                rightFooterTextBtn: right_footer_text_btn == 1 ? true : false,
                footerBgColor: footer_bg_color,

                bodyColor: body_color,
                bodyBgColor: body_bg_color,

                selectedFont: { label: selected_font, value: selected_font },
                selectedFontSize: { label: selected_font_size, value: selected_font_size },

                // headerImg: props.settingsEmailData?.data?.header_image,
                // footerImg: props.settingsEmailData?.data?.footer_image

            })

        }

        if (props.settingsEmailData?.data) {
            setImg({
                ...img,
                headerImg: props.settingsEmailData?.data?.header_image?.mail_image ? `${process.env.REACT_APP_IMAGE}${props.settingsEmailData?.data?.header_image?.mail_image}` : null,
                headerImgFile: props.settingsEmailData?.data?.header_image && props.settingsEmailData?.data?.header_image,
                footerImg: props.settingsEmailData?.data?.footer_image?.mail_image ? `${process.env.REACT_APP_IMAGE}${props.settingsEmailData?.data?.footer_image?.mail_image}` : "",
                footerImgFile: props.settingsEmailData?.data?.footer_image && props.settingsEmailData?.data?.footer_image

            })
        }





        if (init) {
            props.getSettingsEmailStationaryData();
            setInit(false)
        }

        if (props.add_email_settings_loading == 'Success') {
            toastr.success('Success');
            props.addEmailSettingsFresh();
            props.getSettingsEmailStationaryData();
            setIsLoading(false)
        }

        if (props.add_email_settings_loading == 'Failed') {
            toastr.error('Failed');
            props.addEmailSettingsFresh();
            setIsLoading(false)

        }

    }, [props.add_email_settings_loading, props.settingsEmailData?.data?.email_settings,
    props.settingsEmailData?.data]);


    const toggle = (tab, type = null) => {
        if (state.activeTab !== tab) {
            setState({
                ...state, activeTab: tab,
            });
        }
    }

    const onDragRgb = (c1) => {
        setState({ ...state, headerBgColor: c1 })
    }
    const onDragRgb1 = (c1) => {
        setState({ ...state, footerBgColor: c1 })
    }
    const onDragRgb2 = (c1) => {
        setState({ ...state, bodyColor: c1 })
    }
    const onDragRgb3 = (c1) => {
        setState({ ...state, bodyBgColor: c1 })
    }
    const colorHandler = e => {
        console.log(e.target.name);
        return
        setState({ ...state, [e.target.name]: e.target.value });
    }

    const stateHandler = e => {
        setState({ ...state, [e.target.name]: e.target.value });
    }

    const editorHandler = (data, tab) => {

        // return
        setState({
            ...state,
            [tab == "Header" ? "HeaderText" : 'FooterText']: data.replace('<p>', '').replace('</p>', '')
        })
    }

    const handleSelectFont = e => {
        setState({ ...state, selectedFont: e });
    };
    const handleSelectFontSize = e => {
        setState({ ...state, selectedFontSize: e });
    };

    const saveHandler = () => {
        setIsLoading(true)
        props.addEmailSettings(state, img);
    }

    const removeImage = (e, type) => {

        console.log(type);
        if (type == 'Header') {
            setImg({
                ...img,
                headerImg: null,
                headerImgFile: null,
                headerImageRemoved: 'header'

            })
        } else {
            setImg({
                ...img,

                footerImg: null,
                footerImgFile: null,
                footerImageRemoved: 'footer'

            })
        }

    }

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid={true}>
                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardBody>
                                    <h4 className="ms-2 text-primary mb-4">Email Stationery Designer</h4>
                                    <div
                                        className="w-100 mt-2 mb-4"
                                        style={{
                                            borderBottom: "1.2px dotted #c9c7c7",
                                        }}
                                    ></div>

                                </CardBody>
                            </Card>

                            <Card>
                                <CardBody>
                                    <CardText className="pt-3">
                                        <Row>
                                            <Col md={8}>
                                                <div className="p-1">
                                                    {/* Header */}

                                                    <div
                                                        onClick={() => toggle("1")}
                                                        style={{
                                                            background: state.headerBgColor ? state.headerBgColor : '',
                                                            height: '70px'
                                                        }}
                                                    // className={`d-flex ${state.leftHeaderBtn || state.leftHeaderTextBtn ? `justify-content-start` : state.middleHeaderBtn || state.middleHeaderTextBtn ? `justify-content-center` : `justify-content-end`} align-items-center`}
                                                    >
                                                        <Row>
                                                            <Col className='d-flex align-items-center' md={state.leftHeaderBtn ? 6 : ''}>
                                                                {state.leftHeaderBtn &&
                                                                    <img src={img?.headerImg}
                                                                        className="img-fluid"
                                                                        style={{
                                                                            height: `${state.headerImgHeight}mm`,

                                                                            width: 'auto',
                                                                            maxHeight: '70px'
                                                                        }}
                                                                    />}
                                                                {state.leftHeaderTextBtn && state.HeaderText}
                                                            </Col>
                                                            <Col className='d-flex align-items-center' md={state.middleHeaderBtn ? 6 : ''}>
                                                                {state.middleHeaderBtn &&
                                                                    <img src={img?.headerImg}
                                                                        className="img-fluid"
                                                                        style={{
                                                                            height: `${state.headerImgHeight}mm`,

                                                                            width: 'auto',
                                                                            maxHeight: '70px'
                                                                        }}
                                                                    />}
                                                                {state.middleHeaderTextBtn && state.HeaderText}

                                                            </Col>
                                                            <Col className='d-flex justify-content-center align-items-center' md={state.rightHeaderBtn ? 6 : ''}>
                                                                {state.rightHeaderBtn &&
                                                                    <img src={img?.headerImg}
                                                                        className="img-fluid"
                                                                        style={{
                                                                            height: `${state.headerImgHeight}mm`,

                                                                            width: 'auto',
                                                                            maxHeight: '70px'
                                                                        }}
                                                                    />}
                                                                {state.rightHeaderTextBtn && state.HeaderText}
                                                            </Col>
                                                        </Row>

                                                    </div>


                                                    {/* body */}

                                                    <div
                                                        style={{ background: state.bodyColor }} >
                                                        <Row
                                                            onClick={() => toggle('3')} className="">
                                                            <Col

                                                                md={12}
                                                                style={{
                                                                    fontSize: state.selectedFontSize.label &&
                                                                        state.selectedFontSize.label,
                                                                    fontFamily: state.selectedFont.label &&
                                                                        state.selectedFont.label,
                                                                    minHeight: `calc(100vh-280px)`
                                                                }}>
                                                                <div className="px-2 py-4 d-flex flex-column">
                                                                    <span className="pb-1">Hi There,</span>

                                                                    <span className="pb-1">
                                                                        This is a preview of a sample email with some text in it. Edit the settings on the right in the Header, Footer and Body and see how they affect the presentation of your emails here.
                                                                    </span>

                                                                    <span className="pb-1">
                                                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam feugiat nisi et vestibulum efficitur. Aenean pulvinar quam ut diam efficitur, nec congue sem fermentum. Nunc cursus varius purus quis tristique. Nunc finibus non quam ac lobortis. Nunc lacinia magna venenatis augue cursus congue.
                                                                    </span>

                                                                    <span className="pb-1">
                                                                        Pellentesque fermentum quam ut neque malesuada fringilla. In sodales a orci non tincidunt. Aenean ultricies sit amet metus non suscipit. Fusce euismod lacus nec orci tincidunt hendrerit. Phasellus ullamcorper ante mi, nec maximus ante interdum ut. Donec sit amet tristique sem. Ut luctus elit dictum, scelerisque nulla commodo, congue odio.
                                                                    </span>
                                                                    <span className="pb-1">Kind regards</span>

                                                                    <span className="pb-1"> Nulla Aenean</span>
                                                                    <span className="pb-1">Phone: 0411 222 333</span>
                                                                    <span>Email: email@mail.com</span>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                    {/* Footer */}

                                                    <div style={{
                                                        background: state.footerBgColor ? state.footerBgColor : '',
                                                        paddingTop: '40px'
                                                    }}>
                                                        <div
                                                            onClick={() => toggle("2")}


                                                        >


                                                            <Row>
                                                                <Col className='d-flex align-items-center' md={state.leftFooterBtn ? 6 : ''}>
                                                                    {state.leftFooterBtn &&
                                                                        <img src={img?.footerImg}
                                                                            className="img-fluid"
                                                                            style={{
                                                                                height: `${state.footerImgHeight}mm`,

                                                                                width: 'auto',
                                                                                maxHeight: '70px'
                                                                            }}
                                                                        />}
                                                                    {state.leftFooterTextBtn && state.FooterText}
                                                                </Col>
                                                                <Col className='d-flex align-items-center' md={state.middleFooterBtn ? 6 : ''}>
                                                                    {state.middleFooterBtn &&
                                                                        <img src={img?.footerImg}
                                                                            className="img-fluid"
                                                                            style={{
                                                                                height: `${state.footerImgHeight}mm`,

                                                                                width: 'auto',
                                                                                maxHeight: '70px'
                                                                            }}
                                                                        />}
                                                                    {state.middleFooterTextBtn && state.FooterText}

                                                                </Col>
                                                                <Col className='d-flex justify-content-center align-items-center' md={state.rightFooterBtn ? 6 : ''}>
                                                                    {state.rightFooterBtn &&
                                                                        <img src={img?.footerImg}
                                                                            className="img-fluid"
                                                                            style={{
                                                                                height: `${state.footerImgHeight}mm`,

                                                                                width: 'auto',
                                                                                maxHeight: '70px'
                                                                            }}
                                                                        />}
                                                                    {state.rightFooterTextBtn && state.FooterText}
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                        <div style={{ height: '150px', background: state.bodyBgColor }} className="d-flex justify-content-center align-items-top"><span>Click to <Link>unsubscribe</Link> from future email communication</span></div>
                                                    </div>
                                                </div>
                                            </Col>
                                            <Col md={4}>
                                                <Nav className="nav-tabs-custom nav-justified nav nav-tabs">

                                                    <NavItem>
                                                        <NavLink
                                                            style={{ cursor: "pointer" }}
                                                            className={classnames({
                                                                active: state.activeTab === "1",
                                                            })}
                                                            onClick={() => {
                                                                toggle("1");
                                                            }}
                                                        >
                                                            Header
                                                        </NavLink>
                                                    </NavItem>
                                                    <NavItem>
                                                        <NavLink
                                                            style={{ cursor: "pointer" }}
                                                            className={classnames({
                                                                active: state.activeTab === "2",
                                                            })}
                                                            onClick={() => {
                                                                toggle("2");
                                                            }}
                                                        >
                                                            Footer
                                                        </NavLink>
                                                    </NavItem>
                                                    <NavItem>
                                                        <NavLink
                                                            style={{ cursor: "pointer" }}
                                                            className={classnames({
                                                                active: state.activeTab === "3",
                                                            })}
                                                            onClick={() => {
                                                                toggle("3");
                                                            }}
                                                        >
                                                            Body
                                                        </NavLink>
                                                    </NavItem>
                                                </Nav>

                                                <TabContent
                                                    activeTab={state.activeTab}
                                                    className="p-3 text-muted"
                                                >
                                                    <TabPane tabId="1">
                                                        <Row>
                                                            <Col sm="12">
                                                                <CardText className="mb-0">

                                                                    <EmailImage
                                                                        img={img}
                                                                        setImg={setImg}
                                                                        state={state}
                                                                        togglePositionHeaderBtn={togglePositionHeaderBtn}
                                                                        togglePositionHeaderTextBtn={togglePositionHeaderTextBtn}
                                                                        stateHandler={stateHandler}
                                                                        tab='Header'
                                                                        editorHandler={editorHandler}
                                                                        name='headerImgHeight'
                                                                        removeImage={removeImage}
                                                                    />
                                                                    <div className="py-1">
                                                                        <ColorBtn
                                                                            onDrag={onDragRgb}
                                                                            text='Primary'
                                                                            name='headerBgColor'
                                                                            rgb={state.headerBgColor}
                                                                            handler={stateHandler}
                                                                        />
                                                                    </div>


                                                                </CardText>
                                                            </Col>

                                                        </Row>
                                                    </TabPane>
                                                    <TabPane tabId="2">
                                                        <Row>
                                                            <Col sm="12">
                                                                <CardText className="mb-0">
                                                                    <EmailImage img={img} setImg={setImg} state={state} togglePositionHeaderBtn={togglePositionHeaderBtn}
                                                                        togglePositionFooterBtn={togglePositionFooterBtn}
                                                                        togglePositionFooterTextBtn={togglePositionFooterTextBtn}
                                                                        stateHandler={stateHandler} tab='Footer' editorHandler={editorHandler}
                                                                        name='footerImgHeight'
                                                                        removeImage={removeImage}
                                                                    />
                                                                    <div className="py-1">

                                                                        <ColorBtn
                                                                            onDrag={onDragRgb1}
                                                                            text='Background'
                                                                            name='footerBgColor'
                                                                            rgb={state.footerBgColor}
                                                                            handler={stateHandler}
                                                                        />
                                                                    </div>
                                                                </CardText>
                                                            </Col>
                                                        </Row>
                                                    </TabPane>
                                                    <TabPane tabId="3">
                                                        <div className="py-1 mt-2" >
                                                            <div className="mb-1">Default font name</div>
                                                            <SelectSearch value={state.selectedFont} handler={handleSelectFont}
                                                                options={state.optionFont} />
                                                        </div>
                                                        <div className="py-1 mt-2">
                                                            <div className="mb-1">Default font size</div>
                                                            <SelectSearch value={state.selectedFontSize} handler={handleSelectFontSize}
                                                                options={state.optionFontSize} />
                                                        </div>
                                                        <div className="py-1 mt-2 d-flex">

                                                            <ColorBtn
                                                                onDrag={onDragRgb2}
                                                                text='Body'
                                                                name='bodyColor'
                                                                rgb={state.bodyColor}
                                                                handler={stateHandler}
                                                            />

                                                            <ColorBtn
                                                                onDrag={onDragRgb3}
                                                                text='Background'
                                                                name='bodyBgColor'
                                                                rgb={state.bodyBgColor}
                                                                handler={stateHandler}
                                                            />
                                                        </div>

                                                    </TabPane>

                                                </TabContent>
                                                <div
                                                    className="w-100 mt-2 mb-4"
                                                    style={{
                                                        borderBottom: "1.2px dotted #c9c7c7",
                                                    }}
                                                ></div>

                                                <div className="d-flex justify-content-end">
                                                    <Button disabled={isLoading} onClick={saveHandler} color="info">Save</Button>
                                                </div>
                                            </Col>
                                        </Row>

                                    </CardText>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment >
    );
};

const mapStateToProps = gstate => {
    const { } = gstate.property;
    const { settingsEmailData, settingsEmailDataStatus, add_email_settings_loading } = gstate.Portfolio;

    return { settingsEmailData, settingsEmailDataStatus, add_email_settings_loading };
};

export default withRouter(connect(mapStateToProps, {
    getSettingsEmailStationaryData, addEmailSettings, addEmailSettingsFresh
})(Email));







