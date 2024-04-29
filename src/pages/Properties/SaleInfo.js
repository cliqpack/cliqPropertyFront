import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import Select from "react-select";
import moment from "moment";
import {
  getPropertyInfo,
  SaleAgreementInfo,
  SaleAgreementInfoFresh,
  SaleAgreementInfoForPropertyFresh,
  editSaleAgreementInfoFresh,
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

const SaleInfo = props => {
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    if (props.property_info_loading === false) {
      props.getPropertyInfo(id);
    }
    if (props.seller_info_loading === false) {
      props.SaleAgreementInfo(id);
      props.SaleAgreementInfoForPropertyFresh();
      props.editSaleAgreementInfoFresh();
    }
  }, [props.property_info_loading, props.seller_info_loading]);
  // console.log(props.property_info_loading);
  // console.log(props.property_info_data?.data);
  const property_data = props.property_info_data?.data;
  // console.log(props.seller_info_data?.data?.data);
  // console.log(props.seller_info_loading);
  const data = props.seller_info_data?.data?.data;
  console.log(data);

  const editSaleHandler = (p_id, saleId, tabId) => {
    props.SaleAgreementInfoFresh();
    props.editSaleAgreementInfoFresh();
    history.push(`/editSaleAgreement/${p_id}/${saleId}/${tabId}`);
  };

  return (
    <div className="page-content">
      {/* <Breadcrumbs title="Manage Sales" breadcrumbItem="Properties" /> */}
      <h4 className="ms-2 text-primary">Manage Sales</h4>

      <Row>
        <Col lg={2} style={{ display: "flex", flexDirection: "column" }}>
          <Card>
            <CardBody>
              <div>
                <h4 className="text-primary py-1">
                  Manage Sales - {property_data && property_data?.data?.reference
                    ? property_data?.data?.reference
                    : ""}
                </h4>

                <div
                  style={{
                    borderBottom: "1.2px dotted #c9c7c7",
                  }}
                ></div>
                <div className="py-2 mt-1 d-flex flex-column gap-2">
                  <Link to={`/propertyInfo/${id}`}>
                    <button type="button" className="btn btn-info w-lg ">
                      <i className="fas fa-angle-left font-size-18" /> Back
                    </button>
                  </Link>
                  <Link to={`/addSaleAgreement/${id}`}>
                    <button type="button" className="btn btn-info w-sm">
                      <i className="fas fa-house-damage" /> New Sale Agreement
                    </button>
                  </Link>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>


        <Col md={10} className="p-0">
          <Card className="custom_card_border_design me-2">
            <CardBody>
              {data?.length > 0 ? (
                data?.map((data, i) => (
                  <div key={i} className="py-3 my-3">
                    {console.log(data)}
                    <Row>
                      <Col md={6}>
                        <h4 className="text-primary">
                          <i className="fas fa-house-damage font-size-20 me-1"></i>
                          {i == 0 ? `Sale Agreement` : `Past Sale Agreement`}
                        </h4>
                      </Col>
                      <Col
                        md={6}
                        className="d-flex justify-content-end align-items-center"
                      >
                        {data?.has_buyer === "true" && (
                          <span>
                            Agreement ended{" "}
                            {moment(
                              data?.sales_contact?.seller_folio?.agreement_end
                            ).format("DD MMM YYYY")}
                          </span>
                        )}
                        {data?.has_buyer === "false" && (
                          <span>Settled on 27 Oct 2022</span>
                        )}

                        <Button
                          type="button"
                          className="ms-1 btn btn-info"
                          onClick={() =>
                            editSaleHandler(
                              data?.property_id,
                              data?.id,
                              data?.has_buyer === "false" ? "2" : "3"
                            )
                          }
                        >
                          <i className="fa fa-solid fa-pen" />
                        </Button>

                        <Button type="button" className="ms-1 btn btn-info">
                          <i className="fa fa-solid fa-dollar-sign" />
                        </Button>
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
                            <span className="text-primary">Seller</span>
                          </Col>
                          <Col md={7}>
                            {`${data?.sales_contact?.first_name} ${data?.sales_contact?.last_name}`}
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
                            <span className="text-primary">Asking price</span>
                          </Col>
                          <Col md={7}>
                            {data?.sales_contact?.seller_folio?.asking_price}
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
                            <span className="text-primary">Folio</span>
                          </Col>
                          <Col
                            md={7}
                          >{`${data?.sales_contact?.first_name} ${data?.sales_contact?.last_name}`}</Col>
                        </Row>
                        <div
                          className="w-100"
                          style={{
                            borderBottom: "1.2px dotted #c9c7c7",
                          }}
                        />
                      </Col>
                      {data?.has_buyer === "true" && (
                        <Col md={6}>
                          <Row className="py-1">
                            <Col md={5}>
                              <span className="text-primary">
                                Purchase price
                              </span>
                            </Col>
                            <Col md={7}>
                              {data?.buyer_contact?.buyer_folio?.purchase_price}
                            </Col>
                          </Row>
                          <div
                            className="w-100"
                            style={{
                              borderBottom: "1.2px dotted #c9c7c7",
                            }}
                          />
                        </Col>
                      )}
                    </Row>

                    <Row>
                      <Col md={6}>
                        <Row className="py-1">
                          <Col md={5}>
                            <span className="text-primary">Agreement</span>
                          </Col>
                          <Col md={7}>
                            from{" "}
                            {moment(
                              data?.sales_contact?.seller_folio?.agreement_start
                            ).format("DD MMM YYYY")}{" "}
                            <b>to</b>{" "}
                            {moment(
                              data?.sales_contact?.seller_folio?.agreement_end
                            ).format("DD MMM YYYY")}
                          </Col>
                        </Row>
                        <div
                          className="w-100"
                          style={{
                            borderBottom: "1.2px dotted #c9c7c7",
                          }}
                        />
                      </Col>
                      {data?.has_buyer === "true" && (
                        <Col md={6}>
                          <Row className="py-1">
                            <Col md={5}>
                              <span className="text-primary">Commission</span>
                            </Col>
                            <Col md={7}>
                              {data?.buyer_contact?.buyer_folio?.commission}
                            </Col>
                          </Row>
                          <div
                            className="w-100"
                            style={{
                              borderBottom: "1.2px dotted #c9c7c7",
                            }}
                          />
                        </Col>
                      )}
                    </Row>

                    <Row>
                      {data?.has_buyer === "true" && (
                        <Col md={6}>
                          <Row className="py-1">
                            <Col md={5}>
                              <span className="text-primary">Buyer</span>
                            </Col>
                            <Col md={7}>
                              {data?.buyer_contact?.first_name}{" "}
                              {data?.buyer_contact?.last_name}
                            </Col>
                          </Row>
                          <div
                            className="w-100"
                            style={{
                              borderBottom: "1.2px dotted #c9c7c7",
                            }}
                          />
                        </Col>
                      )}
                      <Col md={6}>
                        {/* <Row className="py-1">
                  <Col md={5}>
                    <span className="text-primary">Commission</span>
                  </Col>
                  <Col md={7}>(OWN0032)</Col>
                </Row>
                <div
                  className="w-100"
                  style={{
                    borderBottom: "1.2px dotted #c9c7c7",
                  }}
                /> */}
                      </Col>
                    </Row>

                    <Row>
                      {data?.has_buyer === "true" && (
                        <Col md={6}>
                          <Row className="py-1">
                            <Col md={5}>
                              <span className="text-primary">Settlement</span>
                            </Col>
                            <Col md={7}>
                              {data?.buyer_contact?.buyer_folio?.settlement_due}
                            </Col>
                          </Row>
                          <div
                            className="w-100"
                            style={{
                              borderBottom: "1.2px dotted #c9c7c7",
                            }}
                          />
                        </Col>
                      )}
                      <Col md={6}>
                        {/* <Row className="py-1">
                  <Col md={5}>
                    <span className="text-primary">Commission</span>
                  </Col>
                  <Col md={7}>(OWN0032)</Col>
                </Row>
                <div
                  className="w-100"
                  style={{
                    borderBottom: "1.2px dotted #c9c7c7",
                  }}
                /> */}
                      </Col>
                    </Row>
                  </div>
                ))
              ) : (
                <span>
                  No sale agreements have been created for this property.
                </span>
              )}
            </CardBody>
          </Card>
        </Col>

      </Row>
    </div>
  );
};

const mapStateToProps = gstate => {
  const {
    property_info_data,
    property_info_error,
    property_info_loading,
    seller_info_data,
    seller_info_loading,
  } = gstate.property;

  return {
    property_info_data,
    property_info_error,
    property_info_loading,
    seller_info_data,
    seller_info_loading,
  };
};

export default withRouter(
  connect(mapStateToProps, {
    getPropertyInfo,
    SaleAgreementInfo,
    SaleAgreementInfoForPropertyFresh,
    SaleAgreementInfoFresh,
    editSaleAgreementInfoFresh,
  })(SaleInfo)
);
