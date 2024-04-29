import React, { useEffect, useState, useRef } from "react";
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

import { OwnerInfoFresh, storeInspectionTaskJobDocument, storePropertyDocument } from "store/actions";
import Aos from "aos";
import "aos/dist/aos.css";
import moment from "moment";
import Loder from "components/Loder/Loder";

const ContactsInfoOfOwner = ({
  item,
  items,
  handleOwnerFiles, show, setShow
}) => {
  console.log(item);
  const history = useHistory();
  const { id } = useParams();
  const dispatch = useDispatch();
  const inputFile = useRef(null);

  const [showDropZone, setShowDropZone] = useState(false);

  const ownerEditHandler = (id, tabId, fId, proId) => {
    dispatch(OwnerInfoFresh());
    history.push({pathname: `/owner/edit/${id}/${fId}/${tabId}`, state: {proId: proId}});
  };

  const ownerFolioHandler = (contactId, oId, folioCode, fId) => {
    // history.push(`/ownerFolio/${id}/${contactId}/${oId}`);
    history.push({
      pathname: `/ownerFolio/${item.property_id}/${fId}`,
      state: { contactId, oId, folioCode, fId },
    });
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
      item.property_id, item?.contact_id, null, item.id
    ));
  };

  const handlejobDoc = e => {
    e.preventDefault();
    setShow(true)
    dispatch(storePropertyDocument(
      e.dataTransfer.files,
      item.property_id, item?.contact_id, null, item.id
    ));
  };



  return (
    <React.Fragment>
      <Card data-aos="fade-right" data-aos-once={true} className="custom_card_border_design me-2">
        <CardBody>
          <div className="w-100 mt-1">
            <Row className="d-flex justify-content-between">
              {" "}
              <Col md={6} className="d-flex">
                <h4 className="ms-1 text-primary fw-bold">
                  Owner
                </h4>

              </Col>
              <Col
                md={6}
                className="d-flex justify-content-end align-items-center"
              >

                <i className="fas fa-cloud-upload-alt font-size-16 me-1 text-white" style={{ padding: "9px 12px", backgroundColor: "#0F2E5A", borderRadius: "5px" }} />

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
                  <i className="bx bx-camera d-block font-size-18"></i>
                </Button>
                <button
                  type="button"
                  className="ms-1 btn btn-info"
                  onClick={() => {
                    ownerEditHandler(item.id, 2, items?.owner_properties?.current_owner_folio?.id, item.property_id);
                  }}
                >
                  <i className="fa fa-solid fa-pen" />
                </button>

              </Col>
            </Row>{" "}
            <div
              className="w-100 mt-2 "
              style={{ borderBottom: "1.2px solid #153D56" }}
            />

          </div>

          <div
            onDragOver={tenantDrag}
            onDragLeave={tenantDragend}
            onDrop={tenantDropFile}
          >
            {showDropZone &&
              <div
                style={{
                  position: "relative",
                  height: "300px",
                  width: "100%",
                  border: "4px dashed grey",
                  borderRadius: "5px",
                }}
                onDrop={e => handlejobDoc(e)}
                className="mt-2"
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
                  <h4>Add document for Owner</h4>
                </div>
              </div>
            }


            {!showDropZone ? (
              <div className="mt-3">
                <Row>
                  <Col md={6}>
                    <div className="py-1">
                      <Col>
                        <Row className="d-flex">
                          <Col md={5}>
                            <p className="text-textTitleColor">Property</p>
                          </Col>
                          <Col md={7}>
                            {" "}
                            <p style={{ color: "#003786" }}>
                              <Link to={`/propertyInfo/${item.property_id}`}>
                                {items?.owner_properties?.reference
                                  ? items?.owner_properties?.reference
                                  : ""}
                              </Link>
                            </p>
                          </Col>
                        </Row>
                        <div
                          className="w-100 "
                          style={{ borderBottom: "1.2px solid #C1C1C1" }}
                        />
                      </Col>
                    </div>
                    <div className="py-1">
                      <Col>
                        <Row className="d-flex">
                          <Col md={5}>
                            <p className="text-textTitleColor">Fee schedule</p>
                          </Col>
                          <Col md={7}>
                            <p
                              onClick={() => ownerEditHandler(item.id, 3, items?.owner_properties?.current_owner_folio?.id, item.property_id)}
                              className="text-primary"
                              style={{ cursor: 'pointer' }}
                            >
                              {item?.user?.user_plan?.plan?.details ? item?.user?.user_plan?.plan?.details?.length : 0} fees
                            </p>
                          </Col>
                        </Row>
                        <div
                          className="w-100 "
                          style={{ borderBottom: "1.2px solid #C1C1C1" }}
                        />
                      </Col>
                    </div>
                    {items?.owner_properties?.current_owner_folio?.balance && (
                      <div className="py-1">
                        <Col>
                          <Row className="d-flex">
                            <Col md={5}>
                              <p className="text-textTitleColor">Disbursements</p>
                            </Col>
                            <Col md={7}>
                              {items?.owner_properties?.current_owner_folio?.balance &&
                                items?.owner_properties?.current_owner_folio?.total_money &&
                                items?.owner_properties?.current_owner_folio?.regular_intervals ? (
                                <p>
                                  on balance of 
                                  {items?.owner_properties?.current_owner_folio?.balance
                                    ? items?.owner_properties?.current_owner_folio?.balance
                                    : ""}৳{" "}
                                  /on total money in of 
                                  {items?.owner_properties?.current_owner_folio?.balance
                                    ? items?.owner_properties?.current_owner_folio?.total_money
                                    : ""}৳
                                  /at
                                  {items?.owner_properties?.current_owner_folio?.regular_intervals} intervals
                                </p>
                              ) : (
                                ""
                              )}
                            </Col>
                          </Row>
                          <div
                            className="w-100 "
                            style={{ borderBottom: "1.2px solid #C1C1C1" }}
                          />
                        </Col>
                      </div>
                    )}
                    {items?.owner_properties?.current_owner_folio?.next_disburse_date ? (
                      <div className="py-2">
                        <Col>
                          <Row>
                            <Col md={5}>
                              <p className="text-textTitleColor">Next disbursement</p>
                            </Col>
                            <Col md={7}>
                              <span className="font-size-12 badge square-pill bg-labelColor float-start my-1 px-2 py-2 mx-1">
                                {items?.owner_properties?.current_owner_folio?.next_disburse_date
                                  ? moment(
                                    items?.owner_properties?.current_owner_folio?.next_disburse_date
                                  ).format("DD-MM-YYYY")
                                  : ""}
                              </span>
                            </Col>
                          </Row>
                          <div
                            className="w-100 "
                            style={{ borderBottom: "1.2px solid #C1C1C1" }}
                          />
                        </Col>
                      </div>
                    ) : (
                      ""
                    )}
                  </Col>
                  <Col md={6}>
                    <div className="py-1">
                      <Col>
                        <Row className="d-flex">
                          <Col md={5}>
                            <p className="text-textTitleColor">Folio code</p>
                          </Col>
                          <Col md={7}>
                            <p
                              style={{ cursor: "pointer" }}
                              className="text-primary"
                              onClick={() =>
                                ownerFolioHandler(
                                  item?.contact_id,
                                  item?.id,
                                  items?.owner_properties?.current_owner_folio?.folio_code,
                                  items?.owner_properties?.current_owner_folio?.id,
                                )
                              }
                            >

                              {`${item?.first_name || ""} ${item?.last_name || ""
                                } ${items?.owner_properties?.current_owner_folio?.folio_code
                                  ? `(${items?.owner_properties?.current_owner_folio?.folio_code})`
                                  : ""
                                }`}
                            </p>
                          </Col>
                        </Row>
                        <div
                          className="w-100 "
                          style={{ borderBottom: "1.2px solid #C1C1C1" }}
                        />
                      </Col>
                    </div>
                    <div className="py-1">
                      <Col>
                        <Row className="d-flex">
                          <Col md={5}>
                            <p className="text-textTitleColor">Balances</p>
                          </Col>
                          <Col md={7}>
                            <p>
                              {items?.owner_properties?.current_owner_folio?.balance
                                ? items?.owner_properties?.current_owner_folio?.balance
                                : "0.00"}৳
                            </p>
                          </Col>
                        </Row>{" "}
                        <div
                          className="w-100 "
                          style={{ borderBottom: "1.2px solid #C1C1C1" }}
                        />
                      </Col>
                    </div>
                    <div className="py-1">
                      <Col>
                        <Row className="d-flex">
                          <Col md={5}>
                            <p className="text-textTitleColor">Withhold amount</p>
                          </Col>
                          <Col md={7}>
                            <p>
                              {items?.owner_properties?.current_owner_folio?.withhold_amount
                                ? items?.owner_properties?.current_owner_folio?.withhold_amount
                                : "0.00"}৳
                            </p>
                          </Col>
                        </Row>{" "}
                        <div
                          className="w-100 "
                          style={{ borderBottom: "1.2px solid #C1C1C1" }}
                        />
                      </Col>
                      <div className="py-1">
                        <Col>
                          <Row className="d-flex">
                            <Col md={5}>
                              <p className="text-textTitleColor">Payment methods</p>
                            </Col>
                            <Col md={7}>
                              <div
                                onClick={() => ownerEditHandler(item.id, 4, items?.owner_properties?.current_owner_folio?.id, item.property_id)}
                                className="d-flex align-items-start text-primary"
                                style={{ cursor: 'pointer' }}
                              >

                                <p>
                                  {item.owner_payment.length === 0 ? 'None' : item.owner_payment.length === 1 ? item.owner_payment[0]?.method : `Split(
                                            ${item.owner_payment.map(item =>
                                    item.split_type == '৳' ? `${item.split ? item.split : '0'}.00৳` : ` ${item.split}%`
                                  )}
                                          )`
                                  }
                                </p>
                                <i className="me-2 mdi mdi-pencil d-block font-size-16 text-primary"></i>
                              </div>
                            </Col>
                          </Row>{" "}
                          <div
                            className="w-100 "
                            style={{ borderBottom: "1.2px solid #C1C1C1" }}
                          />
                        </Col>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            ) : (
              ""
            )}
          </div>


        </CardBody>
      </Card>
      {show && <Loder status={show} />}
    </React.Fragment>
  );
};

Aos.init({
  once: true,
});

const mapStateToProps = gstate => {
  const { contacts_show_data, contacts_show_loading } = gstate.Contacts2;

  const {
    all_job_document,
    all_job_document_error,
    all_job_document_loading,

    store_inspection_task_job_document_loading,
    all_listing_doc_data,
    all_listing_data_doc_loading, store_property_document_loading
  } = gstate.Document;

  return {
    contacts_show_data,
    contacts_show_loading,
    all_job_document,
    all_job_document_error,
    all_job_document_loading,

    store_inspection_task_job_document_loading,
    all_listing_doc_data,
    all_listing_data_doc_loading, store_property_document_loading
  };
};
export default withRouter(
  connect(mapStateToProps, {
    OwnerInfoFresh, storeInspectionTaskJobDocument, storePropertyDocument
  })(ContactsInfoOfOwner)
);
