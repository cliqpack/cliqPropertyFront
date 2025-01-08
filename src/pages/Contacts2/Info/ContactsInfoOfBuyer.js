import React, { useState,useEffect, useRef }  from "react";
import {
  useLocation,
  withRouter,
  Link,
  useParams,
  useHistory,
} from "react-router-dom";
import { Card, CardBody, CardTitle, Col, Row ,Button} from "reactstrap";
import { connect } from "react-redux";
import { useDispatch } from "react-redux";
import { storePropertyDocument,getMessageContacts,ContactsAllActivity } from "store/actions";
import { } from "store/actions";
import Aos from "aos";
import "aos/dist/aos.css";
import moment from "moment";
import {showContact} from "../../../store/Contacts2/actions"

const ContactsInfoOfBuyer = ({ item, showDropZone,ContactsAllActivity,getMessageContacts,showContact }) => {
  console.log(item);
  
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const inputFile = useRef(null);
  const sellerFolioHandler = (contactId, folioCode, fId) => {
    history.push({
      pathname: `/sellerFolio/${id}/${fId}`,
      state: { contactId, folioCode, fId },
    });
  };
console.log(item);
    
      const handleUploadFiles = async e => {
        dispatch(storePropertyDocument(
          e.target.files,
          item.property_id, item?.contact_id, null, null, null, item.id
        ));
      };

      const sellerContactHandler = (contactId) =>{
        console.log(contactId);
        
        history.push({
          pathname: `/contactsInfo/${contactId}`,
          state: { contactId },
        });
      }
    
      useEffect(() => {
        showContact(id);
        getMessageContacts(id);
        ContactsAllActivity(id);
        
      }, [id]);


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
              <Button
                  type="button"
                  className="ms-1 btn btn-info"
                  onClick={() =>
                    sellerFolioHandler(
                      item?.property?.sales_agreemet ?.sales_contact?.seller_folio
                      ?.seller_contact_id,
                      item?.property?.sales_agreemet ?.sales_contact?.seller_folio?.folio_code,
                      item?.property?.sales_agreemet ?.sales_contact?.seller_folio?.id
                    )
                  }
                >
                  <i className="fa fa-solid fa-dollar-sign" />
                </Button>

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
                          ${item?.buyer_folio?.purchase_price || "0.00"}
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
                          ${item?.buyer_folio?.commission || "0.00"}
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
                        <p style={{ cursor: "pointer" }}
                              className="text-primary" onClick={() =>
                            sellerFolioHandler(
                              item?.property?.sales_agreemet ?.sales_contact?.seller_folio
                                ?.seller_contact_id,
                              item?.property?.sales_agreemet ?.sales_contact?.seller_folio
                                ?.folio_code,
                              item?.property?.sales_agreemet ?.sales_contact?.seller_folio
                                ?.id
                            )
                          }>{`${item.first_name} ${item.last_name} `} </p>
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
                      {/* <Col md={7}>
                        <p>
                          {item.buyer_payment?.length > 0
                            ? item.buyer_payment.map((i, ix) => (
                              <span key={ix}>{i.method} &nbsp;</span>
                            ))
                            : ""}
                          <i className=" mdi mdi-pencil d-block text-primary"></i>
                        </p>
                      </Col> */}
                      <Col md={7}>


                          <Link to={`/editSaleAgreement/${item.property_id}/${item.id}/${item.property.sales_agreemet?.has_buyer == 'true' ? '4' : '3'}`}>
                            <div className="d-flex">
                              <p>

                                {item.buyer_payment.length  === 0 ? 'None' :item.buyer_payment.length  === 1 ? item.buyer_payment[0]?.payment_method : `Split(
                                            ${item.buyer_payment.map(item =>
                                  item.split_type == '$' ? `$${item.split}.00` : ` ${item.split}%`
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
                <div className="py-1">
                  <Col>
                    <Row className="d-flex">
                    <Col md={5}>
                          <p className="text-primary">Seller</p>
                        </Col>
                        <Col md={7}>
                          {" "} 
                          <p   style={{ cursor: "pointer" }}
                              className="text-primary" onClick={() =>
                            sellerContactHandler(
                              item?.property?.sales_agreemet ?.sales_contact?.contact_id,
                              // item?.property?.sales_agreemet ?.sales_contact?.seller_folio
                              //   ?.folio_code,
                              // item?.property?.sales_agreemet ?.sales_contact?.seller_folio
                              //   ?.id
                            )
                          }>
                          {item?.property?.owner } 
                          </p>
                        </Col>
                    </Row>{" "}
                    <div
                      className="w-100 "
                      style={{ borderBottom: "1.2px dotted #c9c7c7" }}
                    />
                  </Col>
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
  const {
    contacts_all_activity_loading,
    contacts_all_activity,
    contacts_message_data_loading,
    contacts_message_data,
    
  } = gstate.Activity;
  const {
    all_contact_document,
    all_contact_document_error,
    all_contact_document_loading,
    
  } = gstate.Document;
  return {
    contacts_message_data_loading,
    contacts_message_data,
    all_contact_document,
    all_contact_document_error,
    all_contact_document_loading,
    contacts_all_activity_loading,
    contacts_all_activity,
  };
};
export default withRouter(connect(mapStateToProps, {storePropertyDocument,showContact,getMessageContacts,ContactsAllActivity})(ContactsInfoOfBuyer));
