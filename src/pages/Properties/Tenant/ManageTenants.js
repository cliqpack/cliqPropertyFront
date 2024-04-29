import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import Select from "react-select";
import moment from "moment";
import {
  getPropertyInfo,
  getTenantForManage,
  getTenantForManageFresh,
  makeTenant,
  makeTenantFresh,
} from "store/actions";

import {
  Table,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Alert,
  Container,
  CardText,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Label,
  Modal,
  Input,
  Button,
  CardHeader,
  //   Form,
  FormGroup,
} from "reactstrap";
import classnames from "classnames";
import { Link, useHistory, withRouter, useParams } from "react-router-dom";
import Breadcrumbs from "components/Common/Breadcrumb";
import toastr from "toastr";

const ManageTenant = props => {
  const { id } = useParams();
  const history = useHistory();
  const [disableBtn, setDisableBtn] = useState("");

  const backHandler = () => {
    props.getTenantForManageFresh();
    history.push(`/propertyInfo/${id}`)
    // history.push({
    //   pathname: "/propertyTenantAdd",
    //   state: {
    //     data: "manageTenant",
    //     id: id,
    //   },
    // });
  };

  const tenantEditHandler = (id, tabId) => {
    history.push("/tenant/edit/" + id + "/" + tabId);
  };

  useEffect(() => {
    if (props.property_info_loading === false) {
      props.getPropertyInfo(id);
    }
    if (props.manage_tenant_list_loading === false) {
      props.getTenantForManage(id);
    }
    if (props.manage_tenant_list_loading === "Success") {
      const disable = props.manage_tenant_list_data?.data?.data?.filter(
        (item, i) => item.status == "true"
      );
      setDisableBtn(disable);
    }
    if (props.make_new_tenant_loading === 'Success') {
      props.getTenantForManage(id);
      toastr.success(props.make_new_tenant.message);
      props.makeTenantFresh();
    }
    if (props.make_new_tenant_loading === 'Tenant Add Failed') {
      toastr.error(props.make_new_tenant.message);
      props.makeTenantFresh();
    }
  }, [props.property_info_loading, props.manage_tenant_list_loading, props.make_new_tenant_loading]);

  const property_data = props.property_info_data?.data;

  const data = [
    {
      id: 1,
      Contact: "Willis Pickering",
      Folio: "Willis Pickering (TEN00035)",
      Phone: "(m) 0411 888 222",
      Email: "noreply@propertyme.com",
      Rent: "200.00",
      BondAmount: "800.00",
      RentPeriod: "weekly",
      BankReference: "",
      MovedIn: "21 Dec 2022",
      AgreementStart: "21 Dec 2022",
    },
  ];

  const tenantFolioHandler = (contactId, tId, fId) => {
    history.push(`/tenantFolio/${id}/${contactId}/${tId}/${fId}`);
  };
  console.log(props.make_new_tenant);

  const handleTenant = () => {
    history.push(`/propertyTenantAdd/${id}`);
  }

  return (
    <div className="page-content">
      {/* <Breadcrumbs title="Manage Tenant" breadcrumbItem="Properties" /> */}
      <h4 className="ms-2 text-primary">Manage Tenant</h4>

      <Row>
        <Col lg={2} style={{ display: "flex", flexDirection: "column" }}>
          <Card style={{ borderRadius: "15px" }}>
            <CardBody>
              <div>
                <h4 className="text-primary py-1">
                  Manage Tenants&nbsp;-&nbsp;
                  {property_data && property_data?.data?.reference
                    ? property_data?.data?.reference
                    : ""}
                </h4>

                <div
                  style={{
                    borderBottom: "1.2px dotted #c9c7c7",
                  }}
                ></div>
                <div className="py-2 mt-1 d-flex gap-2 flex-column justify-content-center">
                  <button
                    type="button"
                    className="btn btn-info "
                    onClick={backHandler}
                  >
                    <i className="fas fa-angle-left font-size-18" /> Back
                  </button>

                  {/* <Link to={`/propertyTenantAdd/${id}`}> */}
                  <button
                    type="button"
                    className="btn btn-info"
                    // disabled={disableBtn[0]?.status ? true : false}
                    onClick={() => handleTenant()}
                  >
                    <i className="fas fa-house-damage" /> New Tenant
                  </button>
                  {/* </Link> */}
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>

        <Col md={10} className="p-0">
          {props.manage_tenant_list_data?.data?.data?.map((data, i) => (
            <Card key={i} className="custom_card_border_design me-2" >
              <CardBody>
                <div className="py-3 my-3">
                  {/* {console.log(data)} */}
                  <Row>
                    <Col md={6}>
                      <h4 className="text-primary">
                        {data?.tenant_contact?.reference} {data?.tenant_contact?.status === 'true' && <span>(current)</span>} {data?.tenant_contact?.status === 'false'&& data?.tenant_contact?.tenant_folio?.previous === 1 && <span>(previous)</span>} {data?.tenant_contact?.status === 'false'&& data?.tenant_contact?.tenant_folio?.previous === 0 && <span>(Upcomming)</span>}
                      </h4>
                    </Col>
                    <Col md={6} className="d-flex justify-content-end">

                      <Button
                        type="button"
                        className="ms-1 btn btn-info"
                        onClick={() => {
                          tenantEditHandler(data.id, 2);
                        }}
                      >
                        <i className="fa fa-solid fa-pen" />
                      </Button>

                      <Button type="button" className="ms-1 btn btn-info" onClick={() => { tenantFolioHandler(data?.tenant_contact?.contact_id, data?.tenant_contact_id, data?.tenant_contact?.tenant_folio?.id) }}>
                        <i className="fa fa-solid fa-dollar-sign" />
                      </Button>
                      {(data?.status === 'false' && data?.tenant_contact?.tenant_folio?.previous === 0) &&
                        <Button type="button" className="ms-1 btn btn-secondary" onClick={() => { props.makeTenant(id, data?.tenant_contact?.tenant_folio?.id) }}>
                          Make Current
                        </Button>
                      }
                    </Col>
                    <div
                      className="my-1"
                      style={{ borderBottom: "1.2px dotted #c9c7c7" }}
                    />
                  </Row>

                  <Row className="pt-1">
                    <Col md={6}>
                      <Row className="py-1">
                        <Col md={5}>
                          <span className="text-primary">Contact</span>
                        </Col>
                        <Col md={7}>{data?.tenant_contact?.reference}</Col>
                      </Row>
                      <div
                        className="w-100"
                        style={{
                          borderBottom: "1.2px dotted #c9c7c7",
                        }}
                      />
                    </Col>
                    <Col md={6}>
                      <Row className="py-1">
                        <Col md={5}>
                          <span className="text-primary">Folio</span>
                        </Col>
                        <Col md={7}>{data?.tenant_contact?.reference}</Col>
                      </Row>
                      <div
                        className="w-100"
                        style={{
                          borderBottom: "1.2px dotted #c9c7c7",
                        }}
                      />
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6}>
                      <Row className="py-1">
                        <Col md={5}>
                          <span className="text-primary">Phone</span>
                        </Col>
                        <Col md={7}>
                          {data?.tenant_contact?.mobile_phone &&
                            `(m) ${data?.tenant_contact?.mobile_phone}`}
                          {data?.tenant_contact?.home_phone &&
                            `(h) ${data?.tenant_contact?.home_phone}`}
                          {data?.tenant_contact?.work_phone &&
                            `(h) ${data?.tenant_contact?.work_phone}`}
                        </Col>
                      </Row>
                      <div
                        className="w-100"
                        style={{
                          borderBottom: "1.2px dotted #c9c7c7",
                        }}
                      />
                    </Col>

                    <Col md={6}>
                      <Row className="py-1">
                        <Col md={5}>
                          <span className="text-primary">Email</span>
                        </Col>
                        <Col md={7}>{data?.tenant_contact?.email}</Col>
                      </Row>
                      <div
                        className="w-100"
                        style={{
                          borderBottom: "1.2px dotted #c9c7c7",
                        }}
                      />
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6}>
                      <Row className="py-1">
                        <Col md={5}>
                          <span className="text-primary">Rent</span>
                        </Col>
                        <Col md={7}>
                          {data?.tenant_contact?.tenant_folio?.rent}
                        </Col>
                      </Row>
                      <div
                        className="w-100"
                        style={{
                          borderBottom: "1.2px dotted #c9c7c7",
                        }}
                      />
                    </Col>

                    <Col md={6}>
                      <Row className="py-1">
                        <Col md={5}>
                          <span className="text-primary">Bond amount</span>
                        </Col>
                        <Col md={7}>
                          {data?.tenant_contact?.tenant_folio?.bond_amount}
                        </Col>
                      </Row>
                      <div
                        className="w-100"
                        style={{
                          borderBottom: "1.2px dotted #c9c7c7",
                        }}
                      />
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6}>
                      <Row className="py-1">
                        <Col md={5}>
                          <span className="text-primary">Rent period</span>
                        </Col>
                        <Col md={7}>
                          {data?.tenant_contact?.tenant_folio?.rent_type}
                        </Col>
                      </Row>
                      <div
                        className="w-100"
                        style={{
                          borderBottom: "1.2px dotted #c9c7c7",
                        }}
                      />
                    </Col>

                    <Col md={6}>
                      <Row className="py-1">
                        <Col md={5}>
                          <span className="text-primary">Bank reference</span>
                        </Col>
                        <Col md={7}>
                          {data?.tenant_contact?.tenant_folio?.bank_reterence}
                        </Col>
                      </Row>
                      <div
                        className="w-100"
                        style={{
                          borderBottom: "1.2px dotted #c9c7c7",
                        }}
                      />
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6}>
                      <Row className="py-1">
                        <Col md={5}>
                          <span className="text-primary">Moved in</span>
                        </Col>
                        <Col md={7}>
                          {data?.tenant_contact?.tenant_folio?.move_in}
                        </Col>
                      </Row>
                      <div
                        className="w-100"
                        style={{
                          borderBottom: "1.2px dotted #c9c7c7",
                        }}
                      />
                    </Col>

                    <Col md={6}>
                      <Row className="py-1">
                        <Col md={5}>
                          <span className="text-primary">Agreement start</span>
                        </Col>
                        <Col md={7}>
                          {data?.tenant_contact?.tenant_folio?.agreement_start}
                        </Col>
                      </Row>
                      <div
                        className="w-100"
                        style={{
                          borderBottom: "1.2px dotted #c9c7c7",
                        }}
                      />
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6}>
                      <Row className="py-1">
                        <Col md={5}>
                          <span className="text-primary">Moved out</span>
                        </Col>
                        <Col md={7}>
                          {data?.tenant_contact?.tenant_folio?.move_out}
                        </Col>
                      </Row>
                      <div
                        className="w-100"
                        style={{
                          borderBottom: "1.2px dotted #c9c7c7",
                        }}
                      />
                    </Col>

                    <Col md={6}>
                      <Row className="py-1">
                        <Col md={5}>
                          <span className="text-primary">Agreement end</span>
                        </Col>
                        <Col md={7}>
                          {data?.tenant_contact?.tenant_folio?.agreement_end}
                        </Col>
                      </Row>
                      <div
                        className="w-100"
                        style={{
                          borderBottom: "1.2px dotted #c9c7c7",
                        }}
                      />
                    </Col>
                  </Row>
                </div>
              </CardBody>
            </Card>
          ))}
        </Col>
        <Col md={3}></Col>
      </Row>
    </div>
  );
};

const mapStateToProps = gstate => {
  const {
    property_info_data,
    property_info_error,
    property_info_loading,
    manage_tenant_list_data,
    manage_tenant_list_loading,
    make_new_tenant,
    make_new_tenant_error,
    make_new_tenant_loading,
  } = gstate.property;

  return {
    property_info_data,
    property_info_error,
    property_info_loading,
    manage_tenant_list_data,
    manage_tenant_list_loading,
    make_new_tenant,
    make_new_tenant_error,
    make_new_tenant_loading,
  };
};

export default withRouter(
  connect(mapStateToProps, {
    getPropertyInfo,
    getTenantForManage,
    getTenantForManageFresh,
    makeTenant,
    makeTenantFresh,
  })(ManageTenant)
);
