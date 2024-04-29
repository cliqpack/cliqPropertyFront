import React, { useEffect, useState } from "react";
import TenantDInfo from "./TenantDInfo";
import { connect } from "react-redux";

import { useParams, withRouter, Link } from "react-router-dom";
import Header from "components/VerticalLayout/Header";
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
  CardImg,
  Badge,
} from "reactstrap";

//import logo from "../../assets/images/logo.svg";
import logoLightPng from "../../assets/images/logo-light.png";
import logoLightSvg from "../../assets/images/Asset-light.png";
//import logoDark from "../../assets/images/Myday.png";
import {
  propertyListForOwnerAndTenant,
  propertyListForTenantById,
  PropertyAllActivity, tenantActivityPanel
} from "store/actions";
import moment from "moment";
import TenantMessageModal from "./TenantMessageModal";
import TenantMaintenanceModal from "./TenantMaintenanceModal";
// import logo from "../../assets/images/Myday.png";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import Img from "../../assets/Property/5.jpg";

import logo from "../../assets/images/Asset-light.png";
import logoDark from "../../assets/images/Myday.png";

const TenantDDetailsActivity = props => {
  const [init, setInit] = useState(true);
  const { id } = useParams();
  const [isFits, setIsFits] = useState(false);

  useEffect(() => {
    if (init) {
      props.propertyListForTenantById(id);
      // props.tenantActivityPanel(props.property_list_tenant_id_data?.data[0]?.property_id, props.property_list_tenant_id_data.tenant_contact_id
      // )
      setInit(false);
    }
    if (props.property_list_tenant_id_data?.data[0]?.property_id) {
      props.PropertyAllActivity(
        props.property_list_tenant_id_data?.data[0]?.property_id
      );
      props.tenantActivityPanel(props.property_list_tenant_id_data?.data[0]?.property_id, props.property_list_tenant_id_data?.data[0]?.tenant_contact_id
      )

    }
  }, [props.property_list_tenant_id_data?.data[0]?.property_id]);
  // console.log(props.property_list_tenant_id_data?.data[0]?.tenant_contact_id);
  console.log(props.tenant_activity_data?.data);
  console.log(props.tenant_activity_data?.completed?.data);
  const tenantData = props.property_list_tenant_id_data?.data[0];

  const tenantImage = tenantData?.tenant_properties?.property_images?.[tenantData?.tenant_properties?.property_images?.length - 1]?.property_image
    ;
  const address = tenantData?.tenant_properties?.property_address;
  const propertyData = tenantData?.tenant_properties;
  console.log("===============In tenant activity==============");
  return (
    <React.Fragment>

      {/* <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 999,
          backgroundColor: "#153D58"
        }}
        className="navbar-brand-box"
      >
        <Link to="/" className="logo logo-light">
          
          <span className="logo-lg">
            <img src={logoDark} alt="" height="19" />
          </span>
        </Link>
      </div> */}

      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          backgroundColor: "#153D58",
          zIndex: 999,
        }}
        className="navbar-brand-box"
      >
        <Link to="/owner-tenant-dashboard" className="logo logo-dark">
          <span className="logo-sm">
            <img src={logo} alt="" height="22" />
          </span>
          <span className="logo-lg ">
            <img src={logoDark} alt="" height="30" />
          </span>
        </Link>

        <Link to="/owner-tenant-dashboard" className="logo logo-light">
          <span className="logo-sm">
            <img src={logo} alt="" height="30" />
          </span>
          <span className="logo-lg">
            <img src={logoDark} alt="" height="30" />
          </span>
        </Link>
      </div>

      <Header />
      <div style={{ marginTop: "100px" }}>
        <Container>
          <Row>
            <Col md={3} >
              <Card className="custom_card_border_design me-2">
                <CardBody>
                  <div className="my-3 d-flex flex-column text-white">
                    {/* <Link to={`/tenantActivity/${id}`}>
                      <Button className="btn w-100 m-1" color="info">
                        Activity
                      </Button>
                    </Link> */}
                    <Link to={`/tenantTransactions/${id}`}>
                      <Button className="btn w-100 m-1" color="info">
                        Transactions
                      </Button>
                    </Link>
                    <Link to={`/tenantDocuments/${id}`}>
                      <Button className="btn w-100 m-1" color="info">
                        Documents
                      </Button>
                    </Link>
                    <TenantMessageModal
                      mail={tenantData?.tenant_contact?.email}
                    />
                    <TenantMaintenanceModal data={tenantData} />
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col md={9} className="p-0 ">
              <Row>
                <Col md={7} className="p-0">
                  <Card style={{ height: "320px" }} className="custom_card_border_design me-2">
                    <CardBody>
                      <div className="py-1">
                        <div className="d-flex">
                          <span className="me-2">
                            <b>Address:</b>
                          </span>
                          <span>
                            {address?.country ? (
                              <span>
                                <span>{`${address?.building_name || ""} ${address?.unit || ""
                                  }/${address?.number || ""} ${address?.street || ""
                                  } ${address?.suburb || ""} ${address?.postcode || ""
                                  } ${address?.state || ""} ${address?.country || ""
                                  }`}</span>
                              </span>
                            ) : (
                              ""
                            )}
                          </span>
                        </div>
                        <div>
                          <div className="d-flex align-items-start">
                            <span className="mt-3">
                              <b>Apartment: </b>
                            </span>
                            <span className="d-flex flex-wrap text-muted justify-content-start ms-1 mt-3">
                              <Badge className="py-2 px-4 me-3 bg-info">
                                <span>
                                  {/* <span className="font-size-11">Bedroom</span>{" "} */}
                                  <i className="fas fa-bed font-size-14 mx-1"></i>{" "}
                                  <span className="font-size-12">
                                    ({propertyData?.bedroom || "0"})
                                  </span>
                                </span>
                              </Badge>
                              <Badge className="py-2 px-4 me-3 bg-secondary">
                                <span>
                                  {/* <span className="font-size-11">Bathroom</span>{" "} */}
                                  <i className="fas fa-bath font-size-14 mx-1"></i>{" "}
                                  <span className="font-size-12">
                                    ({propertyData?.bathroom || "0"})
                                  </span>
                                </span>
                              </Badge>
                              <Badge className="py-2 px-4 bg-success">
                                <span>
                                  {/* <span className="font-size-11">Car space</span>{" "} */}
                                  <i className="fas fa-car font-size-14 mx-1"></i>{" "}
                                  <span className="font-size-12">
                                    ({propertyData?.car_space || "0"})
                                  </span>
                                </span>
                              </Badge>
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
                <Col md={5} className="p-0">
                  <Card className="custom_card_border_design me-2 p-0">
                    <CardImg
                      src={tenantImage ? `${process.env.REACT_APP_IMAGE}${tenantImage}` : Img}
                      className="img-fluid"
                      style={{ height: "460px", objectFit: "cover", borderRadius: "10px" }}
                    />
                  </Card>
                </Col>
              </Row>
              <Card className="custom_card_border_design me-2">
                <CardBody>
                  <span className="h5"> Current Activity</span>
                </CardBody>
              </Card>

              {props.tenant_activity_data?.data?.map((item, i) => (
                <div key={i}>
                  {item.inspection && (
                    <Card className="custom_card_border_design me-2">
                      <CardBody>
                        <Row>
                          <Col
                            md={2}
                            className="d-flex justify-content-center align-items-start"
                          >
                            <i className="fas fa-eye fa-2x"></i>
                          </Col>
                          <Col md={8}>
                            <div className="d-flex justify-content-between">
                              <div>
                                <span>
                                  <b>Inspection: {item?.inspection?.status}</b>
                                </span>
                                <span></span>
                              </div>
                              <div></div>
                            </div>
                            <hr />
                            <Row>
                              <Col md={3}>
                                <b>Date</b>
                              </Col>
                              <Col md={9}>
                                {moment(item?.inspection?.created_at).format(
                                  "DD MMM YYYY"
                                )}
                              </Col>
                            </Row>
                            <Row>
                              <Col md={3}>
                                <b>Time</b>
                              </Col>
                              <Col md={9}>{item?.inspection?.start_time}</Col>
                            </Row>
                            <Row>
                              <Col md={3}>
                                <b>Type</b>
                              </Col>
                              <Col md={9}>
                                {item?.inspection?.inspection_type}
                              </Col>
                            </Row>
                            <Row>
                              <Col md={3}>
                                <b>Attending</b>
                              </Col>
                              <Col md={9}>{item?.inspection?.manager}</Col>
                            </Row>
                          </Col>
                        </Row>
                      </CardBody>
                    </Card>
                  )}

                  {item.maintenance && (
                    <Card className="custom_card_border_design me-2">
                      <CardBody>
                        <Row>
                          <Col
                            md={2}
                            className="d-flex justify-content-center align-items-start"
                          >
                            <i className="fas fa-tools fa-2x"></i>
                          </Col>
                          <Col md={8}>
                            <div className="d-flex justify-content-between">
                              <div>
                                <span>
                                  <b>
                                    Maintenance: {item?.maintenance?.status}{" "}
                                  </b>
                                </span>
                              </div>
                              <div>
                                {/* <span>
              <b>{item?.rent_amount}</b>
            </span> */}
                              </div>
                            </div>
                            <hr />
                            <Row>
                              <Col md={3}>
                                <b>Reported On</b>
                              </Col>
                              <Col md={9}>
                                {moment(item?.maintenance?.created_at).format(
                                  "DD MMM YYYY"
                                )}
                              </Col>
                            </Row>
                            <Row>
                              <Col md={3}>
                                <b>Summary</b>
                              </Col>
                              <Col md={9}>{item?.maintenance?.summary}</Col>
                            </Row>
                            {/* <Row>
          <Col md={3}>
            <b>Reference</b>
          </Col>
          <Col md={9}>{item?.ref}</Col>
        </Row> */}
                            <div className="mt-2 pb-2">
                              {item?.maintenance?.jobs_images[0]?.image_path && <Row>
                                <Col className="col-6">
                                  <div>
                                    <img
                                      onClick={() => setIsFits(true)}
                                      className="img-fluid"
                                      alt="Skote"
                                      src={item?.maintenance?.jobs_images[0]?.image_path}
                                      width="145"
                                    />
                                  </div>
                                </Col>
                              </Row>}
                              {/* <img
                                onClick={() => setIsFits(true)}
                                className="img-fluid"
                                alt=""
                                src={item?.maintenance?.jobs_images[0]?.image_path}
                                width="75"
                              /> */}

                              {isFits && <Lightbox
                                mainSrc={item?.maintenance?.jobs_images[0]?.image_path}
                                enableZoom={false}
                                // imageCaption={
                                //   "Caption. Can be aligned it to any side and contain any HTML."
                                // }
                                onCloseRequest={() => setIsFits(false)}
                              />}
                            </div>
                          </Col>
                        </Row>
                        {/* <Row>
                          <Col>
                            <img
                              onClick={() => setIsFits(true)}
                              className="img-fluid"
                              alt=""
                              src={img}
                              width="75"
                            />
                          </Col>
                        </Row> */}
                      </CardBody>
                    </Card>
                  )}
                </div>
              ))}

              <Card className="custom_card_border_design me-2">
                <CardBody>
                  <span className="h5">Completed Activity</span>
                </CardBody>
              </Card>

              {props.tenant_activity_data?.completed?.data.map((item, i) => (
                <div key={i}>
                  {item.inspection && (
                    <Card className="custom_card_border_design me-2">
                      <CardBody>
                        <Row>
                          <Col
                            md={2}
                            className="d-flex justify-content-center align-items-start"
                          >
                            <i className="fas fa-eye fa-2x"></i>
                          </Col>
                          <Col md={8}>
                            <div className="d-flex justify-content-between">
                              <div>
                                <span>
                                  <b>Inspection: {item?.inspection?.status}</b>
                                </span>
                                <span></span>
                              </div>
                              <div></div>
                            </div>
                            <hr />
                            <Row>
                              <Col md={3}>
                                <b>Date</b>
                              </Col>
                              <Col md={9}>
                                {moment(item?.inspection?.created_at).format(
                                  "DD MMM YYYY"
                                )}
                              </Col>
                            </Row>
                            <Row>
                              <Col md={3}>
                                <b>Time</b>
                              </Col>
                              <Col md={9}>{item?.inspection?.start_time}</Col>
                            </Row>
                            <Row>
                              <Col md={3}>
                                <b>Type</b>
                              </Col>
                              <Col md={9}>
                                {item?.inspection?.inspection_type}
                              </Col>
                            </Row>
                            <Row>
                              <Col md={3}>
                                <b>Attending</b>
                              </Col>
                              <Col md={9}>{item?.inspection?.manager}</Col>
                            </Row>
                          </Col>
                        </Row>
                      </CardBody>
                    </Card>
                  )}

                  {item.maintenance && (
                    <Card>
                      <CardBody>
                        <Row>
                          <Col
                            md={2}
                            className="d-flex justify-content-center align-items-start"
                          >
                            <i className="fas fa-tools fa-2x"></i>
                          </Col>
                          <Col md={8}>
                            <div className="d-flex justify-content-between">
                              <div>
                                <span>
                                  <b>
                                    Maintenance: {item?.maintenance?.status}{" "}
                                  </b>
                                </span>
                              </div>
                              <div>
                                {/* <span>
              <b>{item?.rent_amount}</b>
            </span> */}
                              </div>
                            </div>
                            <hr />
                            <Row>
                              <Col md={3}>
                                <b>Reported On</b>
                              </Col>
                              <Col md={9}>
                                {moment(item?.maintenance?.created_at).format(
                                  "DD MMM YYYY"
                                )}
                              </Col>
                            </Row>
                            <Row>
                              <Col md={3}>
                                <b>Summary</b>
                              </Col>
                              <Col md={9}>{item?.maintenance?.summary}</Col>
                            </Row>
                            {/* <Row>
          <Col md={3}>
            <b>Reference</b>
          </Col>
          <Col md={9}>{item?.ref}</Col>
        </Row> */}
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <img
                              onClick={() => setIsFits(true)}
                              className="img-fluid"
                              alt=""
                              // src={img3}
                              width="75"
                            />
                          </Col>
                        </Row>
                      </CardBody>
                    </Card>
                  )}
                </div>
              ))}
            </Col>


          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

// export default TenantDDetailsActivity;
const mapStateToProps = gstate => {
  const {
    property_list_ot_data,
    property_list_ot_error,
    property_list_ot_loading,

    property_list_t_data,
    property_list_t_loading,

    property_list_tenant_id_data, tenant_activity_data
  } = gstate.OTDashboard;
  const { userDetails } = gstate.Login;
  const { property_all_activity } = gstate.Activity;
  return {
    property_list_ot_data,
    property_list_ot_error,
    property_list_ot_loading,

    userDetails,

    property_list_t_data,
    property_list_t_loading,

    property_list_tenant_id_data,
    property_all_activity, tenant_activity_data
  };
};

export default withRouter(
  connect(mapStateToProps, {
    propertyListForOwnerAndTenant,
    propertyListForTenantById,
    PropertyAllActivity, tenantActivityPanel
  })(TenantDDetailsActivity)
);
