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
  CardHeader,
  Button,
  CardImg,
  Badge,
} from "reactstrap";

//import logo from "../../assets/images/logo.svg";
import logoLightPng from "../../assets/images/logo-light.png";
import logoLightSvg from "../../assets/images/Asset-light.png";
//import logoDark from "../../assets/images/Myday.png";
import Img from "../../assets/Property/5.jpg";
import {
  propertyListForOwnerAndTenant,
  propertyListForTenantById,
  PropertyAllActivity,
  tenantAllDocument,
  transactionsListById,
} from "store/actions";
import moment from "moment";
import TenantMessageModal from "./TenantMessageModal";
import TenantMaintenanceModal from "./TenantMaintenanceModal";
import TenantActivityModal from "./TenantModal/TenantActivityModal";
import logo from "../../assets/images/Asset-light.png";
import logoDark from "../../assets/images/Myday.png";
// import logo from "../../assets/images/Myday.png";

const TenantTransactions = props => {
  const [init, setInit] = useState(true);
  const { id } = useParams();

  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState();
  // console.log(data);
  const toggleModal = () => { setShowModal(prev => !prev) }

  useEffect(() => {
    if (init) {
      props.propertyListForTenantById(id);

      setInit(false);
    }
    if (props.property_list_tenant_id_data?.data[0]?.property_id) {
      props.PropertyAllActivity(
        props.property_list_tenant_id_data?.data[0]?.property_id
      );
      const p_id = props.property_list_tenant_id_data?.data[0]?.property_id;
      const c_id =
        props.property_list_tenant_id_data?.data[0]?.tenant_contact?.contact_id;
      const folio_id =
        props.property_list_tenant_id_data?.data[0]?.tenant_contact
          ?.tenant_folio?.id;
      props.transactionsListById("All", p_id, c_id, folio_id);
    }
  }, [props.property_list_tenant_id_data?.data[0]?.property_id]);

  // console.log(props.transaction_list_id_data?.data);
  const tenantData = props.property_list_tenant_id_data?.data[0];
  const p_id = props.property_list_tenant_id_data?.data[0]?.property_id;
  const c_id =
    props.property_list_tenant_id_data?.data[0]?.tenant_contact?.contact_id;
  const folio_id =
    props.property_list_tenant_id_data?.data[0]?.tenant_contact?.tenant_folio
      ?.id;

  const tenantImage = tenantData?.tenant_properties?.property_images?.[tenantData?.tenant_properties?.property_images?.length - 1]?.property_image
    ;
  const address = tenantData?.tenant_properties?.property_address;
  const propertyData = tenantData?.tenant_properties;

  const tenantModalHandler = (data) => {
    // console.log(data);
    setData(data);
    toggleModal();
  }

  return (
    <React.Fragment>
      {/* <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          backgroundColor: "white",
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
            <Col md={3} className="p-0">
              <Card className="custom_card_border_design me-2">
                <CardBody>
                  <div className="my-3 d-flex flex-column text-white">
                    <Link to={`/tenantActivity/${id}`}>
                      <Button className="btn w-100 m-1" color="info">
                        Activity
                      </Button>
                    </Link>
                    {/* <Link to={`/tenantTransactions/${id}`}>
                      <Button className="btn w-100 m-1" color="info">
                        Transactions
                      </Button>
                    </Link> */}
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
            <Col md={6} className="p-0">
              <Card className="custom_card_border_design me-2">
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
                      <div className="d-flex flex-column align-items-start">
                        <span className="mt-2">
                          <b>Apartment</b>
                        </span>
                        <span className="d-flex flex-wrap text-muted justify-content-start ms-1 mt-3">
                          <Badge className="py-2 px-4 me-3 bg-info">
                            <span>
                              <span className="font-size-11">Bedroom</span>{" "}
                              <i className="fas fa-bed font-size-14 mx-1"></i>{" "}
                              <span className="font-size-12">
                                ({propertyData?.bedroom || "0"})
                              </span>
                            </span>
                          </Badge>
                          <Badge className="py-2 px-4 me-3 bg-secondary">
                            <span>
                              <span className="font-size-11">Bathroom</span>{" "}
                              <i className="fas fa-bath font-size-14 mx-1"></i>{" "}
                              <span className="font-size-12">
                                ({propertyData?.bathroom || "0"})
                              </span>
                            </span>
                          </Badge>
                          <Badge className="py-2 px-4 bg-success">
                            <span>
                              <span className="font-size-11">Car space</span>{" "}
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

              {props.transaction_list_id_data?.data.map((data, i) => (
                <Card key={i} onClick={() => tenantModalHandler(data)} style={{ cursor: 'pointer' }} className="custom_card_border_design me-2">
                  <CardBody>
                    {console.log(data.receipt_details)}
                    <div className="fw-bold py-1 pb-1">{moment(data?.receipt_date).format('DD MMMM yyyy')}</div>

                    {data?.receipt_details?.map((item, i) => (
                      <>
                        <Row className="py-2">
                          <Col md={3}>{item.allocation}</Col>
                          <Col md={6}>{item.description}</Col>
                          <Col md={3}>{item.amount}</Col>
                        </Row>
                      </>
                    ))}
                  </CardBody>
                </Card>
              ))}
            </Col>
            <Col md={3}>
              <Card className="custom_card_border_design me-2">

                <CardImg
                  src={tenantImage ? `${process.env.REACT_APP_IMAGE}${tenantImage}` : Img}
                  className="img-fluid"
                  style={{ height: "460px", objectFit: "cover", borderRadius: "10px" }}
                />
              </Card>
            </Col>

          </Row>
        </Container>
      </div>
      {showModal && <TenantActivityModal show={showModal} toggle={toggleModal} data={data} />
      }
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

    property_list_tenant_id_data,
    tenant_all_doc_data,
  } = gstate.OTDashboard;
  const { userDetails } = gstate.Login;
  const { transaction_list_id_data } = gstate.AccountsTransactions;
  const { property_all_activity } = gstate.Activity;
  return {
    property_list_ot_data,
    property_list_ot_error,
    property_list_ot_loading,

    userDetails,

    property_list_t_data,
    property_list_t_loading,

    property_list_tenant_id_data,
    property_all_activity,
    tenant_all_doc_data,
    transaction_list_id_data,
  };
};

export default withRouter(
  connect(mapStateToProps, {
    propertyListForOwnerAndTenant,
    propertyListForTenantById,
    PropertyAllActivity,
    tenantAllDocument,
    transactionsListById,
  })(TenantTransactions)
);
