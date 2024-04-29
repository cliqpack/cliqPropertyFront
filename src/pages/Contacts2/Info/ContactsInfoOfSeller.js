import React, { useState, useRef } from "react";
import {
  useLocation,
  withRouter,
  Link,
  useParams,
  useHistory,
} from "react-router-dom";
import { Card, CardBody, CardTitle, Col, Row, Button } from "reactstrap";
import { connect } from "react-redux";
import { useDispatch } from "react-redux";

import { storePropertyDocument } from "store/actions";
import Aos from "aos";
import "aos/dist/aos.css";
import moment from "moment";

const ContactsInfoOfSeller = ({ item }) => {
  const [showDropZone, setShowDropZone] = useState(false);

  const { id } = useParams();
  const inputFile = useRef(null);
  const dispatch = useDispatch();

  const sellerEditHandler = (id, tab) => {
    // history.push("/owner/edit/" + id + "/" + tabId);
  };
  console.log(item);
  const handlejobDoc = e => {
    e.preventDefault();
    // setShow(true)
    dispatch(storePropertyDocument(
      e.dataTransfer.files,
      item.property_id, item?.contact_id, null, null, null, item.id
    ));
  };

  const tenantDrag = e => {
    e.preventDefault();
    setShowDropZone(true);
  };

  const tenantDragend = e => {
    e.preventDefault();

    setShowDropZone(false);
  };

  const tenantDropFile = e => {
    e.preventDefault();
    setShowDropZone(false);
  };

  const handleUploadFiles = async e => {
    dispatch(storePropertyDocument(
      e.target.files,
      item.property_id, item?.contact_id, null, null, null, item.id
    ));
  };

  return (
    <Card data-aos="fade-right" data-aos-once={true}>
      <CardBody>
        <div className="w-100 mt-4">
          <Row className="d-flex justify-content-between">
            {" "}
            <Col md={6} className="d-flex align-items-center">
              <h4 className="ms-1 text-primary">
                <i className="fas fa-house-damage font-size-18 text-primary me-2" />
                Seller of: {item.property.reference}
              </h4>
            </Col>
            <Col
              md={6}
              className="d-flex justify-content-end align-items-center"
            >
              <i className="fas fa-cloud-upload-alt fa-2x me-1 text-info" />
              <input
                type="file"
                onChange={handleUploadFiles}
                ref={inputFile}
                style={{ display: "none" }}
                multiple
              />
              <Button
                className="btn"
                color="info"
                onClick={() => inputFile.current.click()}
              >
                {" "}
                <i className="bx bx-camera d-block font-size-20"></i>
              </Button>
              <Link to={`/editSaleAgreement/${item.property_id}/${item.id}/${item.property_sales_agreement?.has_buyer == 'true' ? '3' : '2'}`}>
                <button
                  type="button"
                  className="ms-1 btn btn-info"

                >
                  <i className="fa fa-solid fa-pen" />
                </button>
              </Link>

            </Col>
          </Row>{" "}
          <div
            className="w-100 mt-2 "
            style={{ borderBottom: "1.2px dotted #c9c7c7" }}
          />
        </div>
        <div onDragOver={tenantDrag}
          onDragLeave={tenantDragend}
          onDrop={tenantDropFile}>
          {showDropZone ? (
            <div
              style={{
                position: "relative",
                height: "400px",
                width: "100%",
                border: "4px dashed grey",
                borderRadius: "5px",
              }}
              onDrop={e => handlejobDoc(e)}

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

                  <div className="py-1">
                    <Col>
                      <Row className="d-flex">
                        <Col md={5}>
                          <p className="text-primary">Buyer</p>
                        </Col>
                        <Col md={7}>
                          {" "}
                          <p>

                          </p>
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
                          <p className="text-primary">Asking price</p>
                        </Col>
                        <Col md={7}>
                          ${item?.seller_folio.asking_price || "0.00৳"}
                        </Col>
                      </Row>
                      <div
                        className="w-100 "
                        style={{ borderBottom: "1.2px dotted #c9c7c7" }}
                      />
                    </Col>
                  </div>

                  {/* <div className="py-2">
                  <Col>
                    <Row>
                      <Col md={5}>
                        <p className="text-primary">Purchase price</p>
                      </Col>
                      <Col md={7}>
                        <span className="">
                          ${item?.seller_folio?.asking_price || "0.00"}
                        </span>
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
                          <p className="text-primary">Commission</p>
                        </Col>
                        <Col md={7}>
                          <span className="">
                            {item?.seller_folio?.commission || "0.00"}৳
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
                          <p className="text-primary">Balance</p>
                        </Col>
                        <Col md={7}>
                          <span className="">
                            {item?.seller_folio?.balance || "0.00"}৳
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
                          <p className="text-primary">Bills due</p>
                        </Col>
                        <Col md={7}>
                          <span className="">
                            0.00৳
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
                          <p>
                            {`${item?.first_name} ${item?.last_name}`} (
                            {`${item?.seller_folio?.folio_code}`})
                          </p>
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
                            from{" "}
                            {moment(item.seller_folio.agreement_start).format(
                              "DD MMM yyyy"
                            )}{" "}
                            to{" "}
                            {moment(item.seller_folio.agreement_end).format(
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


                          <Link to={`/editSaleAgreement/${item.property_id}/${item.id}/${item.property_sales_agreement?.has_buyer == 'true' ? '4' : '3'}`}>
                            <div className="d-flex">
                              <p>

                                {item.seller_payment.length === 0 ? 'None' : item.seller_payment.length === 1 ? item.seller_payment[0]?.method : `Split(
                                            ${item.seller_payment.map(item =>
                                  item.split_type == '৳' ? `${item.split}.00৳` : ` ${item.split}%`
                                )}
                                          )`
                                }
                              </p>
                              <i className="ms-1 mdi mdi-pencil d-block font-size-16 text-primary"></i>
                            </div>
                          </Link>
                        </Col>
                      </Row>{" "}
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
                          <p className="text-primary">Contract exchange</p>
                        </Col>
                        <Col md={7}>



                        </Col>
                      </Row>{" "}
                      <div
                        className="w-100 "
                        style={{ borderBottom: "1.2px dotted #c9c7c7" }}
                      />
                    </Col>

                  </div> */}

                  {/* <div className="py-1">
                    <Col>
                      <Row className="d-flex">
                        <Col md={5}>
                          <p className="text-primary">Settlement</p>
                        </Col>
                        <Col md={7}>



                        </Col>
                      </Row>{" "}
                      <div
                        className="w-100 "
                        style={{ borderBottom: "1.2px dotted #c9c7c7" }}
                      />
                    </Col>

                  </div> */}
                </Col>
              </Row>
            </div>
          ) : (
            ""
          )}
        </div>





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
export default withRouter(connect(mapStateToProps, { storePropertyDocument })(ContactsInfoOfSeller));
