import React, { useState, useEffect, useRef } from "react";
import moment from "moment";
import { connect, useSelector } from "react-redux";
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
    CardHeader, UncontrolledAlert
} from "reactstrap";
import Select from "react-select";
import { Link, useHistory, withRouter, useParams } from "react-router-dom";

import toastr from "toastr";

import {
    providerSettingsListById, addProviderSettingsListById, addProviderSettingsListByIdFresh, integrationsList,
    deleteSettingsProviderById
} from 'store/actions'
import Switch from "react-switch";


export default function ProviderSettingsForCompany() {
    const history = useHistory()
    const { id } = useParams()
    const dispatch = useDispatch()
    const { providerSettingsListIDData,
        providerSettingsListIDLoading,
        addProviderSettingsListIDLoading, deleteProviderSettingsListIDLoading } = useSelector(state => state.Portfolio)

    console.log(providerSettingsListIDData?.data);


    const [state, setState] = useState({
        activeBtn: true,
    });

    console.log(state);

    useEffect(() => {
        if (addProviderSettingsListIDLoading == 'Success') {
            toastr.success('Success');
            dispatch(addProviderSettingsListByIdFresh())
            dispatch(integrationsList())
            history.push('/integrations')
        }

        if (providerSettingsListIDData?.data) {
            const { is_enable, agent_id, name, id

            } = providerSettingsListIDData?.data
            setState({
                ...state, activeBtn: is_enable == 1 ? true : false, agent: agent_id, name, id

            })
        }

    }, [addProviderSettingsListIDLoading, providerSettingsListIDLoading, providerSettingsListIDData?.data])

    useEffect(() => {
        dispatch(providerSettingsListById(id))
    }, [])


    const stateHandler = e => {
        setState({ ...state, [e.target.name]: e.target.value });
    };

    const handleSave = (e) => {
        e.preventDefault()
        console.log(state.agent.length);
        // return
        if (state.agent.length < 6) {
            toastr.warning(`The Agent ID must be at least 6 characters for ${state.name}`)
        } else {

            dispatch(addProviderSettingsListById(state))
        }
    }


    const deleteHandler = () => { }

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
        <React.Fragment>
            <div className="page-content">
                <Container fluid={true}>
                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardBody>
                                    <h4 className="ms-2 text-primary mb-4">Provider settings for Realestate.com.au
                                    </h4>
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

                                    <Row>
                                        <Col md={9}>

                                            <div >
                                                <UncontrolledAlert
                                                    color="info"
                                                    className="alert-dismissible fade show"
                                                    role="alert"
                                                    style={{ height: '100px' }}
                                                >
                                                    <Row>
                                                        <Col md={3}>
                                                            <i className="far fa-lightbulb me-2"></i>
                                                            <span className="fw-bold">Info</span>
                                                        </Col>
                                                        <Col md={9}>
                                                            {`Before you begin, you'll need to contact your advertising provider and request they switch you over to PropertyMe. For more info see our knowledge base articles`}
                                                        </Col>
                                                    </Row>
                                                </UncontrolledAlert>
                                            </div>


                                            <div className="my-4">
                                                <Row className="py-1">
                                                    <Col
                                                        md={3}
                                                        className="d-flex justify-content-start align-items-center ps-5"
                                                    >
                                                        Enabled
                                                    </Col>
                                                    <Col md={8} className="">
                                                        <Switch
                                                            uncheckedIcon={<Offsymbol />}
                                                            checkedIcon={<OnSymbol />}
                                                            className="me-1 mb-sm-8 mb-2"
                                                            onColor="#153D58"
                                                            onChange={() => {
                                                                setState({
                                                                    ...state,
                                                                    activeBtn: !state.activeBtn,
                                                                });
                                                            }}
                                                            checked={state.activeBtn}
                                                        />
                                                    </Col>
                                                </Row>

                                                <Row className="py-2">
                                                    <Col
                                                        md={3}
                                                        className="d-flex justify-content-start align-items-center ps-5"
                                                    >
                                                        Name
                                                    </Col>
                                                    <Col md={8} className="">

                                                        <div className="w-100">
                                                            <input
                                                                className="form-control"
                                                                type="text"
                                                                name="name"
                                                                value={state.name}
                                                                placeholder=""
                                                                onChange={stateHandler}
                                                            />
                                                        </div>
                                                    </Col>
                                                </Row>

                                                <Row className="py-2">
                                                    <Col
                                                        md={3}
                                                        className="d-flex justify-content-start align-items-center ps-5"
                                                    >
                                                        Agent ID
                                                    </Col>
                                                    <Col md={8} className="">

                                                        <div className="w-100">
                                                            <input
                                                                className="form-control"
                                                                type="text"
                                                                name="agent"
                                                                value={state.agent}
                                                                placeholder=""
                                                                onChange={stateHandler}
                                                            />
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </div>

                                            <div className="w-100 d-flex justify-content-end">
                                                {/* <Button color="danger" onClick={deleteHandler}>Delete</Button> */}
                                                <Button color="secondary" className="mx-1">Cancel</Button>
                                                <Button color="info" onClick={(e) => handleSave(e)}>Save</Button>
                                            </div>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>

            </div>


        </React.Fragment>
    )
}
