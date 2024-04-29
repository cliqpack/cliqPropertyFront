import React from "react";
import {
  useLocation,
  withRouter,
  Link,
  useParams,
  useHistory,
} from "react-router-dom";
import { Card, CardBody, CardTitle, Col, Row } from "reactstrap";
import { connect } from "react-redux";
import { useDispatch } from "react-redux";

import { } from "store/actions";
import Aos from "aos";
import "aos/dist/aos.css";
import moment from "moment";

const ContactsInfoOfBuyer = ({ item, showDropZone }) => {
  const history = useHistory();
  const dispatch = useDispatch();



  return (
    <Card data-aos="fade-right" data-aos-once={true}>
      <CardBody>
        <div className="w-100 mt-4">
          <Row className="d-flex justify-content-between">
            {" "}
            <Col md={6} className="d-flex align-items-center">
              <h4 className="ms-1 text-primary">
                <i className="fas fa-house-damage font-size-18 text-primary me-2" />
                Buyer of: {item.property.reference}
              </h4>
            </Col>
            <Col
              md={6}
              className="d-flex justify-content-end align-items-center"
            >
              {/* <i
                      className="fa fa-solid fa-cloud fa-2x text-info"
                      style={{ color: "#1e7dc8" }}
                    />
                    <button type="button" className="ms-1 btn btn-info">
                      <i className="fa fa-solid fa-paperclip" />
                    </button>
                    <button type="button" className="ms-1 btn btn-info">
                      <i className="fa fa-regular fa-user" />

                    </button> */}
              <i className="fas fa-cloud-upload-alt fa-2x me-1" />
              <button
                type="button"
                className="ms-1 btn btn-info"
              // onClick={() => {
              //   ownerEditHandler(item.id, 2);
              // }}
              >
                <i className="fa fa-solid fa-pen" />
              </button>
              {/* <button type="button" className="ms-1 btn btn-info">
                      <i className="fa fa-solid fa-dollar-sign" />
                    </button> */}
            </Col>
          </Row>{" "}
          <div
            className="w-100 mt-2 "
            style={{ borderBottom: "1.2px dotted #c9c7c7" }}
          />
          {showDropZone ? (
            <div
              style={{
                position: "relative",
                height: "400px",
                width: "100%",
                border: "4px dashed grey",
                borderRadius: "5px",
              }}
              onDrop={e =>
                handleOwnerFiles(
                  e,
                  items.owner_properties.id,
                  item.contact_id,
                  item.id
                )
              }
            >
              <div
                className="dz-message needsclick"
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                <div className="mb-3">
                  <i className="display-4 text-muted bx bxs-cloud-upload" />
                </div>
                <h4>Add document to Seller</h4>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>

        {!showDropZone ? (
          <div className="mt-3">
            <Row>
              <Col md={6}>
                <div className="py-1">
                  <Col>
                    <Row className="d-flex">
                      <Col md={5}>
                        <p className="text-primary">Property</p>
                      </Col>
                      <Col md={7}>
                        {" "}
                        <p>
                          <Link to={`/propertyInfo/${item.property.id}`}>
                            {item.property.reference}
                          </Link>
                        </p>
                      </Col>
                    </Row>
                    <div
                      className="w-100 "
                      style={{ borderBottom: "1.2px dotted #c9c7c7" }}
                    />
                  </Col>
                </div>
                {/* <div className="py-1">
                  <Col>
                    <Row className="d-flex">
                      <Col md={5}>
                        <p className="text-primary">Seller</p>
                      </Col>
                      <Col md={7}>
                        <p className="">Seller</p>
                      </Col>
                    </Row>
                    <div
                      className="w-100 "
                      style={{ borderBottom: "1.2px dotted #c9c7c7" }}
                    />
                  </Col>
                </div> */}

                <div className="py-2">
                  <Col>
                    <Row>
                      <Col md={5}>
                        <p className="text-primary">Purchase price</p>
                      </Col>
                      <Col md={7}>
                        <span className="">
                          {item?.buyer_folio?.purchase_price || "0.00"}৳
                        </span>
                      </Col>
                    </Row>
                    <div
                      className="w-100 "
                      style={{ borderBottom: "1.2px dotted #c9c7c7" }}
                    />
                  </Col>
                </div>

                <div className="py-2">
                  <Col>
                    <Row>
                      <Col md={5}>
                        <p className="text-primary">Commission</p>
                      </Col>
                      <Col md={7}>
                        <span className="">
                          {item?.buyer_folio?.commission || "0.00"}৳
                        </span>
                      </Col>
                    </Row>
                    <div
                      className="w-100 "
                      style={{ borderBottom: "1.2px dotted #c9c7c7" }}
                    />
                  </Col>
                </div>
              </Col>
              <Col md={6}>
                <div className="py-1">
                  <Col>
                    <Row className="d-flex">
                      <Col md={5}>
                        <p className="text-primary">Folio code</p>
                      </Col>
                      <Col md={7}>
                        <p>{`${item.first_name} ${item.last_name} `} </p>
                      </Col>
                    </Row>
                    <div
                      className="w-100 "
                      style={{ borderBottom: "1.2px dotted #c9c7c7" }}
                    />
                  </Col>
                </div>
                <div className="py-1">
                  <Col>
                    <Row className="d-flex">
                      <Col md={5}>
                        <p className="text-primary">Agreement</p>
                      </Col>
                      <Col md={7}>
                        <p>
                          {" "}
                          from{" "}
                          {moment(item.buyer_folio.agreement_start).format(
                            "DD MMM yyyy"
                          )}{" "}
                          to{" "}
                          {moment(item.buyer_folio.agreement_end).format(
                            "DD MMM yyyy"
                          )}
                        </p>
                      </Col>
                    </Row>{" "}
                    <div
                      className="w-100 "
                      style={{ borderBottom: "1.2px dotted #c9c7c7" }}
                    />
                  </Col>
                </div>
                <div className="py-1">
                  <Col>
                    <Row className="d-flex">
                      <Col md={5}>
                        <p className="text-primary">Payment methods</p>
                      </Col>
                      <Col md={7}>
                        <p>
                          {item.buyer_payment?.length > 0
                            ? item.buyer_payment.map((i, ix) => (
                              <span key={ix}>{i.method} &nbsp;</span>
                            ))
                            : ""}
                          <i className="me-2 mdi mdi-pencil d-block font-size-16 text-primary"></i>
                        </p>
                      </Col>
                    </Row>{" "}
                    <div
                      className="w-100 "
                      style={{ borderBottom: "1.2px dotted #c9c7c7" }}
                    />
                  </Col>
                  {item.buyer_folio.deposit_due && <div className="py-1">
                    <Col>
                      <Row className="d-flex">
                        <Col md={5}>
                          <p className="text-primary">Deposit due</p>
                        </Col>
                        <Col md={7}>
                          <p className="d-flex text-primary">
                            {item.buyer_folio.deposit_due && moment(item.buyer_folio.deposit_due).format(
                              "DD MMM yyyy"
                            )}
                          </p>
                        </Col>
                      </Row>{" "}
                      <div
                        className="w-100 "
                        style={{ borderBottom: "1.2px dotted #c9c7c7" }}
                      />
                    </Col>
                  </div>}

                  {item.buyer_folio.contract_exchange &&
                    <div className="py-1">
                      <Col>
                        <Row className="d-flex">
                          <Col md={5}>
                            <p className="text-primary">Contract exchange</p>
                          </Col>
                          <Col md={7}>
                            <p className="d-flex text-primary">
                              {moment(item.buyer_folio.contract_exchange).format(
                                "DD MMM yyyy"
                              )}
                            </p>
                          </Col>
                        </Row>{" "}
                        <div
                          className="w-100 "
                          style={{ borderBottom: "1.2px dotted #c9c7c7" }}
                        />
                      </Col>
                    </div>}

                  {item.buyer_folio.settlement_due &&
                    <div className="py-1">
                      <Col>
                        <Row className="d-flex">
                          <Col md={5}>
                            <p className="text-primary">Settlement</p>
                          </Col>
                          <Col md={7}>
                            <p className="d-flex text-primary">
                              {moment(item.buyer_folio.settlement_due).format(
                                "DD MMM yyyy"
                              )}
                            </p>
                          </Col>
                        </Row>{" "}
                        <div
                          className="w-100 "
                          style={{ borderBottom: "1.2px dotted #c9c7c7" }}
                        />
                      </Col>
                    </div>}

                </div>
              </Col>
            </Row>
          </div>
        ) : (
          ""
        )}
      </CardBody>
    </Card>
  );
};

Aos.init({
  once: true,
});

const mapStateToProps = gstate => {
  const { } = gstate.Contacts2;
  return {};
};
export default withRouter(connect(mapStateToProps, {})(ContactsInfoOfBuyer));
