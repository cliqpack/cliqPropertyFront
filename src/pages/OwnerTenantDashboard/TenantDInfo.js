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
  CardImg,
  Badge,
  CardTitle,
  CardText,
} from "reactstrap";
import { useParams, withRouter, Link } from "react-router-dom";
import { map } from "lodash";
import CardProjects1 from "./CardProjects1";
import { projects } from "./Data";
import classnames from "classnames";
import {
  propertyListForOwnerAndTenant,
  propertyListForTenantById,
} from "store/actions";
import Img from "../../assets/Property/5.jpg";
import logo from "../../assets/images/Myday.png";
import avatar4 from "../../assets/images/users/avatar-4.jpg";
import moment from "moment";
import TenantMessageModal from "./TenantMessageModal";
import TenantMaintenanceModal from "./TenantMaintenanceModal";
import { date } from "yup";
import AddJobModal from "pages/Jobs/AddJobModal";

document.title = "CliqProperty";

const TenantDInfo = props => {
  const [init, setInit] = useState(true);
  const { id } = useParams();
  console.log(id);

  const [state, setState] = useState({
    activeTab: "1",
    activeTab1: "5",
    activeTab2: "9",
    activeTab3: "13",
    verticalActiveTab: "1",
    verticalActiveTabWithIcon: "1",
    customActiveTab: "1",
    customIconActiveTab: "1",
    activeTabJustify: "5",
    col1: true,
    col2: false,
    col3: false,
    col5: true,
    col6: true,
    col7: true,
    col8: true,
    col9: true,
    col10: false,
    col11: false,
  });

  const toggle1 = (tab) => {
    if (state.activeTab1 !== tab) {
      setState({
        activeTab1: tab,
      });
    }
  }

  useEffect(() => {
    if (init) {
      props.propertyListForTenantById(id);
      setInit(false);
    }
  }, []);

  // console.log(props.property_list_tenant_id_data?.data);
  const tenantData = props.property_list_tenant_id_data?.data[0];
  // console.log(props.property_list_tenant_id_data);
  // console.log(tenantData);
  const tenantFolio = tenantData?.tenant_contact?.tenant_folio;
  const tenantImage = tenantData?.tenant_properties?.property_images?.[tenantData?.tenant_properties?.property_images?.length - 1]?.property_image
    ;

  console.log(tenantImage, 'tenantImage-----');
  const address = tenantData?.tenant_properties?.property_address;
  // console.log(address);
  const propertyData = tenantData?.tenant_properties;
  const receipt = props.property_list_tenant_id_data?.receipt;
  const maintenance = props.property_list_tenant_id_data?.maintenance;
  const inspection = props.property_list_tenant_id_data?.inspection;
  // console.log(propertyData);
  //agreement date calculation
  var date1 = moment(tenantFolio?.agreement_end);
  var date2 = moment(new date());
  var diff = date2.diff(date1, "days");
  console.log(diff);
  //end agreement date calculation

  //rent date calculation
  var date3 = moment(tenantFolio?.paid_to);
  var date4 = moment(new date());
  var diff2 = date4.diff(date3, "days");
  console.log(diff2);
  //end rent date calculation

  //move in to agreement end//
  var date6 = moment(tenantFolio?.agreement_end);
  var date5 = moment(tenantFolio?.move_in);
  var diff3 = date6.diff(date5, "days");
  var result = 0;
  if (tenantFolio?.rent_type == "Weekly") {
    result = Number(diff3) / 7;
  } else if (tenantFolio?.rent_type == "Monthly") {
    result = Number(diff3) / 30;
  }

  var rent = "";
  var move_in = moment(tenantFolio?.move_in).format("DD MMM YYYY");
  for (var i = 0; i < Math.floor(result); i++) {
    var from = move_in;
    var from_date = moment(from).format("DD MMM YYYY");
    var to_date = "";
    if (tenantFolio?.rent_type == "Weekly") {
      move_in = moment(move_in).format("DD MMM YYYY");
      to_date = moment(move_in).add(7, "days").format("DD MMM YYYY");
    } else if (tenantFolio?.rent_type == "Monthly") {
      move_in = moment(move_in).format("DD MMM YYYY");
      to_date = moment(move_in).add(30, "days").format("DD MMM YYYY");
    }
    var now_date = moment(new date());
    var diff4 = moment(now_date).diff(to_date, "days");
    console.log(diff4);
    rent = (
      <Card>
        <CardBody>
          <Row>
            <Col
              md={2}
              className="d-flex justify-content-center align-items-start"
            >
              <i className="fas fa-home fa-2x"></i>
            </Col>
            <Col md={8}>
              <div className="d-flex justify-content-between">
                <div>
                  <span>
                    <b>Rent</b>
                  </span>
                  {diff4 > 0 && (
                    <span className="ms-2 rounded-pill bg-danger py-1 px-2 text-white">
                      {diff4} DAYS OVERDUE
                    </span>
                  )}
                  {diff4 <= 0 && (
                    <span className="ms-2 rounded-pill bg-info py-1 px-2 text-white">
                      DUE IN {Number(diff4) * Number(-1)} DAYS
                    </span>
                  )}
                </div>
                <div>
                  <span>

                    <b>${tenantFolio?.part_paid <= 0 ? tenantFolio?.rent : tenantFolio?.rent - tenantFolio?.part_paid}</b>
                  </span>
                </div>
              </div>
              <hr />
              {/* start from here */}

              <Row>
                <Col md={6}>
                  <b>Amount</b>
                </Col>
                <Col md={6}>
                  ${tenantFolio?.rent}
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <b>Less paid</b>
                </Col>
                <Col md={6}>
                  {"-"}${tenantFolio?.part_paid}
                </Col>
              </Row>

              <hr />
              {/* ends here */}
              <Row>
                <Col md={3}>
                  <b>Due</b>
                </Col>
                <Col md={9}>
                  {moment(from_date).subtract(1, "days").format("DD MMM YYYY")}
                </Col>
              </Row>
              <Row>
                <Col md={3}>
                  <b>Period</b>
                </Col>
                <Col md={9}>
                  {from_date}
                  {" - "}
                  {to_date}
                </Col>
              </Row>
            </Col>
          </Row>
        </CardBody>
      </Card>
    );
  }

  var receipt_data = receipt?.map((item, key) => (
    <Card key={key}>
      <CardBody>
        <Row>
          <Col
            md={2}
            className="d-flex justify-content-center align-items-start"
          >
            <i className="far fa-money-bill-alt fa-2x"></i>
          </Col>
          <Col md={8}>
            <div className="d-flex justify-content-between">
              <div>
                <span>
                  <b>Receipt</b>
                </span>
              </div>
              <div>
                <span>
                  <b>${item?.rent_amount}</b>
                </span>
              </div>
            </div>
            <hr />
            <Row>
              <Col md={3}>
                <b>Date</b>
              </Col>
              <Col md={9}>{moment(item?.created_at).format("DD MMM YYYY")}</Col>
            </Row>
            <Row>
              <Col md={3}>
                <b>Description</b>
              </Col>
              <Col md={9}>{item?.summary}</Col>
            </Row>
            <Row>
              <Col md={3}>
                <b>Reference</b>
              </Col>
              <Col md={9}>{item?.ref}</Col>
            </Row>
          </Col>
        </Row>
      </CardBody>
    </Card>
  ));

  var maintenance_data = maintenance?.map((item, key) => (
    <Card key={key}>
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
                  <b>Maintenance: {item?.status} </b>
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
              <Col md={9}>{moment(item?.created_at).format("DD MMM YYYY")}</Col>
            </Row>
            <Row>
              <Col md={3}>
                <b>Summary</b>
              </Col>
              <Col md={9}>{item?.summary}</Col>
            </Row>
            {/* <Row>
          <Col md={3}>
            <b>Reference</b>
          </Col>
          <Col md={9}>{item?.ref}</Col>
        </Row> */}
          </Col>
        </Row>
      </CardBody>
    </Card>
  ));

  var inspection_data = inspection?.map((item, key) => (
    <Card key={key}>
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
                  <b>Inspection: {item?.status} </b>
                </span>
                <span>

                  {/* {moment(new date()).diff(moment(item?.inspection_date).format("DD MMM YYYY"))} */}
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
                <b>Date</b>
              </Col>
              <Col md={9}>{moment(item?.inspection_date).format("DD MMM YYYY")}</Col>
            </Row>
            <Row>
              <Col md={3}>
                <b>Time</b>
              </Col>
              <Col md={9}>{item?.start_time}</Col>
            </Row>
            <Row>
              <Col md={3}>
                <b>Type</b>
              </Col>
              <Col md={9}>{item?.inspection_type}</Col>
            </Row>
            <Row>
              <Col md={3}>
                <b>Attending</b>
              </Col>
              <Col md={9}>{item?.manager}</Col>
            </Row>
          </Col>
        </Row>
      </CardBody>
    </Card>
  ));

  return (
    <div style={{ marginTop: "120px" }}>


      <Container fluid>
        <Container>
          <Row className="mt-5">
            <Col md={3} className="p-0">
              <Card className="custom_card_border_design me-2" style={{ height: "475px" }}>
                <CardBody>

                  <div className="d-flex justify-content-center">
                    <div className="avatar-lg">
                      {propertyData?.manager?.profile == null && (
                        <span className="avatar-title rounded-circle bg-light text-danger fa-2x">
                          {propertyData?.manager?.first_name.slice(0, 1)}
                          {propertyData?.manager?.last_name.slice(0, 1)}
                        </span>
                      )}
                      {propertyData?.manager?.profile != null && (
                        <img className="avatar-title rounded-circle" src={process.env.REACT_APP_IMAGE + '/' + propertyData?.manager?.profile} />
                      )}
                    </div>
                  </div>
                  <div>
                    <div className="d-flex justify-content-center mt-2">
                      <strong>
                        {propertyData?.manager?.first_name}{" "}
                        {propertyData?.manager?.last_name}
                      </strong>
                    </div>
                    <div className="d-flex justify-content-center mt-2">
                      <span>Property Manager</span>
                    </div>
                  </div>
                  <hr />

                  <div className="my-3 d-flex flex-column text-white">
                    <Link to={`/tenantActivity/${id}`}>
                      <Button className="btn w-100 m-1" color="info" >
                        Activity
                      </Button>
                    </Link>
                    <Link to={`/tenantTransactions/${id}`}>
                      <Button className="btn w-100 m-1" color="info" >
                        Transactions

                      </Button>
                    </Link>
                    <Link to={`/tenantDocuments/${id}`}>
                      <Button className="btn w-100 m-1" color="info" >
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
                            <span>{`${address?.building_name || ''} ${address?.unit || ''}/${address?.number || ""} ${address?.street || ''} ${address?.suburb || ''} ${address?.postcode || ''} ${address?.state || ''} ${address?.country || ''}`}</span>
                          </span>
                        ) : (
                          ""
                        )}
                      </span>
                    </div>
                    <div>
                      <div className="d-flex align-items-start">
                        <span className="mt-4">
                          <b>Apartment:</b>
                        </span>
                        <span className="d-flex flex-wrap text-muted justify-content-start ms-1 mt-3">
                          <Badge className="py-2 px-4 me-3 bg-info">
                            <span>
                              {/* <span className="font-size-11">Bedroom</span>{" "} */}
                              <i className="fas fa-bed font-size-14 mx-1"></i>{" "}
                              <span className="font-size-12">
                                ({propertyData?.bedroom || '0'})
                              </span>
                            </span>
                          </Badge>
                          <Badge className="py-2 px-4 me-3 bg-secondary">
                            <span>
                              {/* <span className="font-size-11">Bathroom</span>{" "} */}
                              <i className="fas fa-bath font-size-14 mx-1"></i>{" "}
                              <span className="font-size-12">
                                ({propertyData?.bathroom || '0'})
                              </span>
                            </span>
                          </Badge>
                          <Badge className="py-2 px-4 bg-success">
                            <span>
                              {/* <span className="font-size-11">Car space</span>{" "} */}
                              <i className="fas fa-car font-size-14 mx-1"></i>{" "}
                              <span className="font-size-12">
                                ({propertyData?.car_space || '0'})
                              </span>
                            </span>
                          </Badge>
                        </span>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>

              <Card className="custom_card_border_design me-2 " >
                <CardBody>
                  <Row>
                    <Col>
                      <Row className="py-1">
                        <Col md={4}>
                          <b>Paid to</b>
                        </Col>
                        <Col md={8}>
                          {moment(new Date()).isAfter(tenantFolio?.paid_to) ==
                            true ? (
                            <span className="text-danger">
                              {moment(tenantFolio?.paid_to).format("DD MMM YYYY")}
                            </span>
                          ) : (
                            <span className="text-primary">
                              {moment(tenantFolio?.paid_to).format("DD MMM YYYY")}
                            </span>
                          )}
                        </Col>
                      </Row>
                      <Row className="py-1 mt-2">
                        <Col md={4}>
                          <b>Part paid</b>
                        </Col>
                        <Col md={8}>
                          {tenantFolio?.part_paid ? "$" + tenantFolio?.part_paid : ""}
                        </Col>
                      </Row>
                      <Row className="py-1 mt-2">
                        <Col md={4}>
                          <b>Deposits</b>
                        </Col>
                        <Col md={8}>
                          {tenantFolio?.deposit ? "$" + tenantFolio?.deposit : ""}
                        </Col>
                      </Row>
                      <Row className="py-1 mt-2">
                        <Col md={4}>
                          <b>Rent</b>
                        </Col>
                        <Col md={8}>
                          {tenantFolio?.rent ? "$" + tenantFolio?.rent : ""}
                        </Col>
                      </Row>
                      <Row className="py-1 mt-2">
                        <Col md={4}>
                          <b>Moved in</b>
                        </Col>
                        <Col md={8}>
                          {tenantFolio?.move_in
                            ? moment(tenantFolio?.move_in).format("DD MMM YYYY")
                            : ""}
                        </Col>
                      </Row>

                      <Row className="py-1 mt-2">
                        <Col md={4}>
                          <b>Agreement</b>
                        </Col>
                        <Col md={8}>
                          {tenantFolio?.agreement_start
                            ? moment(tenantFolio?.agreement_start).format(
                              "DD MMM YYYY"
                            )
                            : ""}{" "}
                          to{" "}
                          {tenantFolio?.agreement_end
                            ? moment(tenantFolio?.agreement_end).format(
                              "DD MMM YYYY"
                            )
                            : ""}
                        </Col>
                      </Row>
                      <Row className="py-1 mt-2 mb-4">
                        <Col md={4}>
                          <b>Bond held</b>
                        </Col>
                        <Col md={8}>
                          {tenantFolio?.bond_held ? "$" + tenantFolio?.bond_held : ""}
                        </Col>
                      </Row>
                    </Col>


                  </Row>
                </CardBody>
              </Card>



            </Col>
            <Col md={3} className="p-0">
              <Card className="custom_card_border_design me-2">
                <CardImg
                  src={tenantImage ? `${process.env.REACT_APP_IMAGE}${tenantImage}` : Img}
                  className="img-fluid"
                  style={{ height: "460px", objectFit: "cover", borderRadius: "10px" }}
                />
              </Card>
            </Col>
          </Row>
          <Row>
            <Col>
              <Col lg={12}>
                <Card className="custom_card_border_design me-2">
                  <CardBody>
                    {/* <CardTitle className="h4">Justify Tabs</CardTitle> */}
                    <Nav pills className="navtab-bg nav-justified">
                      <NavItem>
                        <NavLink
                          style={{ cursor: "pointer" }}
                          className={classnames({
                            active: state.activeTab1 === "5",
                          })}
                          onClick={() => {
                            toggle1("5");
                          }}
                        >
                          Rent
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          style={{ cursor: "pointer" }}
                          className={classnames({
                            active: state.activeTab1 === "6",
                          })}
                          onClick={() => {
                            toggle1("6");
                          }}
                        >
                          Maintenance
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          style={{ cursor: "pointer" }}
                          className={classnames({
                            active: state.activeTab1 === "7",
                          })}
                          onClick={() => {
                            toggle1("7");
                          }}
                        >
                          Inspection
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          style={{ cursor: "pointer" }}
                          className={classnames({
                            active: state.activeTab1 === "8",
                          })}
                          onClick={() => {
                            toggle1("8");
                          }}
                        >
                          Receipt
                        </NavLink>
                      </NavItem>
                    </Nav>

                    <TabContent
                      activeTab={state.activeTab1}
                      className="p-3 text-muted"
                    >
                      <TabPane tabId="5">
                        <Row>
                          <Col sm="12">
                            {rent}
                          </Col>
                        </Row>
                      </TabPane>
                      <TabPane tabId="6">
                        <Row>
                          <Col sm="12">
                            {maintenance_data}
                          </Col>
                        </Row>
                      </TabPane>
                      <TabPane tabId="7">
                        <Row>
                          <Col sm="12">
                            {inspection_data}
                          </Col>
                        </Row>
                      </TabPane>

                      <TabPane tabId="8">
                        <Row>
                          <Col sm="12">
                            {receipt_data}
                          </Col>
                        </Row>
                      </TabPane>
                    </TabContent>
                  </CardBody>
                </Card>
              </Col>
              {/* ================ tab design starts from here ====================== */}
              {/* {rent}
              {maintenance_data}
              {inspection_data} */}
              {diff > 0 && (
                <Card>
                  <CardBody>
                    <Row>
                      <Col
                        md={2}
                        className="d-flex justify-content-center align-items-start"
                      >
                        <i className="fas fa-walking fa-2x"></i>
                      </Col>
                      <Col md={8}>
                        <div className="d-flex justify-content-between">
                          <div>
                            <span>
                              <b>Agreement End</b>
                            </span>
                            <span className="ms-2 rounded-pill bg-danger py-1 px-2 text-white">
                              {diff} Days Ago
                            </span>
                          </div>
                          <div>
                            <span>
                              <b></b>
                            </span>
                          </div>
                        </div>
                        <hr />
                        <Row>
                          <Col md={3}>
                            <b>Date</b>
                          </Col>
                          <Col md={9}>{tenantFolio?.agreement_end}</Col>
                        </Row>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              )}
            </Col>
          </Row>
        </Container>
      </Container>
    </div>
  );
};

const mapStateToProps = gstate => {
  const {
    property_list_ot_data,
    property_list_ot_error,
    property_list_ot_loading,

    property_list_t_data,
    property_list_t_loading,

    property_list_tenant_id_data,
  } = gstate.OTDashboard;
  const { userDetails } = gstate.Login;
  return {
    property_list_ot_data,
    property_list_ot_error,
    property_list_ot_loading,

    userDetails,

    property_list_t_data,
    property_list_t_loading,

    property_list_tenant_id_data,
  };
};

export default withRouter(
  connect(mapStateToProps, {
    propertyListForOwnerAndTenant,
    propertyListForTenantById,
  })(TenantDInfo)
);
