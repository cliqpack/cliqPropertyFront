import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
    Col,
    Container,
    Pagination,
    PaginationItem,
    PaginationLink,
    Row,
    Nav,
    NavItem,
    NavLink,
    TabContent,
    TabPane,
    Card,
    CardBody,
    Button,
} from "reactstrap";
import { useParams, withRouter, useLocation } from "react-router-dom";
import { map } from "lodash";
import CardProjects1 from "./CardProjects1";
import { projects } from "./Data";
import classnames from "classnames";
import {
    propertyListForOwnerAndTenant,
    propertyListForTenant,
} from "store/actions";
import OTHeader from "./OTHeader";
import Breadcrumbs from "components/Common/Breadcrumb";
import PropertyList from "pages/Properties/PropertyList";
import { withTranslation, useTranslation } from "react-i18next";

document.title = "CliqProperty";

const otDashboard = {
    position: "relative",
    top: "100px"
    //border: "5px solid red"
};

const fixedBottom = {
    position: "fixed",
    bottom: "0",
    left: "0",
    right: "0",
    color: "black",
};

const fixedTop = {
    position: "fixed",
    top: "80px",
    left: "0",
    right: "0",
    color: "black",
};

const OTDashboard = (props) => {
    const { id } = useParams();
    const { t } = useTranslation();
    const location = useLocation();

    const [isLoading, setIsLoading] = useState(true);

    const [state, setState] = useState({
        activeTab: "2",
    });
    const [ownerBtn, setOwnerBtn] = useState(false);
    const [tenantBtn, setTenantBtn] = useState(false);
    const [tenantDataShow, setTenantDataShow] = useState(false);
    console.log(tenantDataShow);

    // console.log(props.property_list_ot_loading);

    const toggleOwnerBtn = () => {
        // setReport({ ...report, reportBtn: "Owner" });
        setAgentBtn(false);
        setOwnerBtn(true);
    };

    const toggleTenantBtn = () => {
        // setReport({ ...report, reportBtn: "Tenant" });
        setAgentBtn(false);
        setOwnerBtn(false);
    };

    const authUser = JSON.parse(localStorage.getItem("authUser"));
    console.log(authUser);

    useEffect(() => {
        if (authUser?.tenantAccess) {
            props.propertyListForTenant();
        }
        if (authUser?.ownerAccess) {
            props.propertyListForOwnerAndTenant();
        }
        if (authUser?.tenantAccess && authUser?.ownerAccess == false) {
            setTenantDataShow(true);
        }
    }, [
        props.property_list_t_loading,
        props.property_list_ot_loading,
        authUser?.tenantAccess,
        authUser?.ownerAccess,
    ]);

    // console.log(props.property_list_ot_data);
    const ownerData = props.property_list_ot_data?.data;
    const tenantData = props.property_list_t_data?.data;
    const tenantLoading = props.property_list_t_loading;
    // console.log(props.property_list_t_data, props.property_list_t_loading);
    // console.log(ownerData);
    // console.log(tenantData);

    const toggle = (tab, type = null) => {
        if (state.activeTab !== tab) {
            setState({
                ...state,
                activeTab: tab,
            });
        }
    };
    return (
        <React.Fragment>
            <OTHeader text="2" />

            <div className="mt-3 pt-5" style={otDashboard} >
                {/* <div className="bg-light">
                    <Container style={{ paddingTop: '30px' }}>
                        <Breadcrumbs title="myday" breadcrumbItem="Properties List" />
                    </Container>
                </div> */}

                <Container className="mt-4">
                    <div style={{ cursor: "pointer" }}>
                        {/* {tenantDataShow === false &&
                            ownerData ? <Row>
                            {ownerData?.map((data, i) =>
                                <CardProjects1 key={i} data={data?.owner_properties} ownerProp={data?.owner_properties} />
                            )}
                        </Row> : ''
                            // <div className="d-flex justify-content-center w-100">Loading...</div>
                        } */}

                        {
                            tenantDataShow ? (
                                <Row>
                                    {props.property_list_t_loading ? (
                                        tenantData?.map((data, i) => (
                                            <CardProjects1
                                                key={i}
                                                data={data?.tenant_properties}
                                                tenantProp={data?.tenant_properties}
                                            />
                                        ))
                                    ) : (
                                        <div
                                            className="d-flex justify-content-center align-items-center"
                                            style={{ height: "80vh" }}
                                        >
                                            <div
                                                className="spinner-border text-dark m-1"
                                                role="status"
                                            >
                                                <span className="sr-only">Loading...</span>
                                            </div>
                                        </div>
                                    )}
                                </Row>
                            ) : (
                                <Row>
                                    {props.property_list_ot_loading == "Success" ? (
                                        ownerData?.map((data, i) => (
                                            <CardProjects1
                                                key={i}
                                                data={data?.owner_properties}
                                                ownerProp={data?.owner_properties}
                                            />
                                        ))
                                    ) : (
                                        <div
                                            className="d-flex justify-content-center align-items-center"
                                            style={{ height: "80vh" }}
                                        >
                                            <div
                                                className="spinner-border text-dark m-1"
                                                role="status"
                                            >
                                                <span className="sr-only">Loading...</span>
                                            </div>
                                        </div>
                                    )}
                                </Row>
                            )
                            // <div className="d-flex justify-content-center w-100">Loading...</div>
                        }
                    </div>
                </Container>

                <div className="bg-light mt-7 py-2" style={fixedTop}>
                    <nav className="navbar navbar-light bg-light justify-content-center px-4">
                        <div>
                            {authUser?.ownerAccess && (
                                <button
                                    type="button"
                                    className="px-5 py-2"
                                    onClick={(e) => setTenantDataShow(false)}
                                    style={{
                                        borderRadius: "10px",
                                        backgroundColor:
                                            tenantDataShow == false ? "#159B9C" : "#72C3C3",
                                        border: "none",
                                        color: "white",
                                    }}
                                >
                                    <i className="fas fa-user font-size-14 text-light me-1" />
                                    {t("Owner")}
                                </button>
                            )}

                            {authUser?.tenantAccess && (
                                <button
                                    type="button"
                                    className="px-5 py-2 ms-2"
                                    style={{
                                        borderRadius: "10px",
                                        backgroundColor:
                                            tenantDataShow == true ? "#159B9C" : "#72C3C3",
                                        border: "none",
                                        color: "white",
                                    }}
                                    onClick={(e) => setTenantDataShow(true)}
                                >
                                    <i className="fas fa-user-plus font-size-14 text-light me-1" />
                                    {t("Tenant")}
                                </button>
                            )}
                        </div>
                    </nav>
                </div>
            </div>
        </React.Fragment>
    );
};

const mapStateToProps = (gstate) => {
    const {
        property_list_ot_data,
        property_list_ot_error,
        property_list_ot_loading,

        property_list_t_data,
        property_list_t_loading,
    } = gstate.OTDashboard;
    const { userDetails } = gstate.Login;
    return {
        property_list_ot_data,
        property_list_ot_error,
        property_list_ot_loading,

        userDetails,

        property_list_t_data,
        property_list_t_loading,
    };
};

export default withRouter(
    connect(mapStateToProps, {
        propertyListForOwnerAndTenant,
        propertyListForTenant,
    })(OTDashboard)
);
