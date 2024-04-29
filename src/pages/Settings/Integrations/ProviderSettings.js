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
    CardHeader,
} from "reactstrap";
import Select from "react-select";
import { Link, useHistory, withRouter } from "react-router-dom";

import toastr from "toastr";

import { providerSettingsList } from 'store/actions'


export default function ProviderSettings() {
    const dispatch = useDispatch()
    const { providerSettingsListData, providerSettingsListLoading } = useSelector(state => state.Portfolio)
    console.log(providerSettingsListData, providerSettingsListLoading);
    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid={true}>
                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardBody>
                                    <h4 className="ms-2 text-primary mb-4">Provider Settings
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

                                </CardBody>
                            </Card>
                        </Col>
                    </Row>

                </Container>

            </div>

        </React.Fragment>

    )
}
