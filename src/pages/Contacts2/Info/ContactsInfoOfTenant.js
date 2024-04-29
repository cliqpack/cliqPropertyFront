import React, { useRef, useState } from "react";
import {
  Card,
  Alert,
  CardBody,
  CardTitle,
  Col,
  Container,
  Row,
  CardText,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Label,
  Input,
  Button,
  CardHeader,
  Badge,
} from "reactstrap";
import {
  useLocation,
  withRouter,
  Link,
  useParams,
  useHistory,
} from "react-router-dom";
import { connect } from "react-redux";
import { useDispatch } from "react-redux";

import { TenantInfoFresh, storePropertyDocument } from "store/actions";

import Aos from "aos";
import "aos/dist/aos.css";
import moment from "moment";
import Loder from "components/Loder/Loder";

const ContactsInfoOfTenant = ({
  item,
  items,
  handleTenantFiles, show, setShow
}) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { id } = useParams();
  const inputFile = useRef(null);

  const [showDropZone, setShowDropZone] = useState(false);


  const tenantEditHandler = (id, tabId) => {
    dispatch(TenantInfoFresh());
    history.push("/tenant/edit/" + id + "/" + tabId);
  };

  const tenantFolioHandler = (p_id, c_id, t_Id, fId) => {
    history.push(`/tenantFolio/${p_id}/${c_id}/${t_Id}/${fId}`);
  };

  console.log(item);

  const handlejobDoc = e => {
    e.preventDefault();
    setShow(true)
    dispatch(storePropertyDocument(
      e.dataTransfer.files,
      item.property_id, item?.contact_id, item.id,
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
      item.property_id, item?.contact_id, item.id,
    ));
  };


  return (
    <React.Fragment>
      <Card data-aos="fade-right" data-aos-once={true} className="custom_card_border_design me-2">
        <CardBody>
          <div className="w-100 mt-1">
            <div>
              <Row className="d-flex justify-content-between">
                {" "}
                <Col md={6} className="d-flex">
                  <h4 className="ms-1 text-primary fw-bold">
                    {/* <i className="bx bxs-group text-textTitleColor me-1" /> */}
                    Tenant
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
                    <i className="bx bx-camera d-block font-size-20"></i>
                  </Button>
                  <button
                    type="button"
                    className="ms-1 btn btn-info"
                    onClick={() => {
                      tenantEditHandler(item.id, 2);
                    }}
                  >
                    <i className="fa fa-solid fa-pen" />
                  </button>

                </Col>
              </Row>{" "}
              <div
                className="w-100 mt-2 "
                style={{ borderBottom: "1.2px solid #153D56" }}
              ></div>
            </div>
            <div
              onDragOver={tenantDrag}
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
                    <h4>Add document for Tenant</h4>
                  </div>
                </div>
              ) : (
                ""
              )}

              {!showDropZone ? (
                <div className="mt-3">
                  <Row>
                    <Col md={6}>
                      <div>
                        <Col>
                          <Row>
                            <Col md={5}>
                              <p className="text-textTitleColor">Property</p>
                            </Col>
                            <Col md={7}>
                              {" "}
                              <p>
                                <Link to={`/propertyInfo/${item.property_id}`}>
                                  {items.tenant_properties?.reference}
                                </Link>
                              </p>
                            </Col>
                          </Row>
                          <div
                            className="w-100"
                            style={{
                              borderBottom: "1.2px solid #C1C1C1"
                            }}
                          ></div>
                        </Col>
                      </div>
                      <div className="py-1">
                        <Col>
                          <Row>
                            <Col md={5}>
                              <p className="text-textTitleColor">Rent</p>
                            </Col>
                            <Col md={7}>
                              {" "}
                              <p>
                                {item.tenant_folio?.rent
                                  ? item.tenant_folio?.rent
                                  : 0.0}৳
                              </p>
                            </Col>
                          </Row>
                          <div
                            className="w-100"
                            style={{
                              borderBottom: "1.2px solid #C1C1C1"
                            }}
                          ></div>
                        </Col>
                      </div>

                      <div className="py-1">
                        <Col>
                          <Row>
                            <Col md={5}>
                              <p className="text-textTitleColor">Period</p>
                            </Col>
                            <Col md={7}>
                              {" "}
                              <p>
                                {item.tenant_folio?.rent_type
                                  ? item.tenant_folio?.rent_type
                                  : null}
                              </p>
                            </Col>
                          </Row>
                          <div
                            className="w-100"
                            style={{
                              borderBottom: "1.2px solid #C1C1C1"
                            }}
                          ></div>
                        </Col>
                      </div>
                      <div className="py-3">
                        <Col>
                          <Row>
                            <Col md={5}>
                              <p className="text-textTitleColor">Moved in</p>
                            </Col>
                            <Col md={7}>
                              {" "}
                              <span className="font-size-12 badge square-pill bg-labelColor float-start my-1 px-2 py-2 mx-1">
                                {item.tenant_folio?.move_in
                                  ? moment(item.tenant_folio?.move_in).format(
                                    "DD-MM-YYYY"
                                  )
                                  : ""}
                              </span>
                            </Col>
                          </Row>
                          <div
                            className="w-100"
                            style={{
                              borderBottom: "1.2px solid #C1C1C1"
                            }}
                          ></div>
                        </Col>
                      </div>

                      <div className="py-1">
                        {item.tenant_folio?.move_out && (
                          <Col>
                            <Row>
                              <Col md={5}>
                                <p className="text-textTitleColor">Moved Out</p>
                              </Col>
                              <Col md={7}>
                                {" "}
                                <p>
                                  {item.tenant_folio?.move_out
                                    ? moment(item.tenant_folio?.move_out).format(
                                      "MM-DD-YYYY"
                                    )
                                    : null}
                                </p>
                              </Col>
                            </Row>
                            <div
                              className="w-100"
                              style={{
                                borderBottom: "1.2px solid #C1C1C1"
                              }}
                            ></div>
                          </Col>
                        )}
                      </div>
                      <div className="py-1">
                        <Col>
                          <Row>
                            <Col md={5}>
                              <p className="text-textTitleColor">Bond</p>
                            </Col>
                            <Col md={7}>
                              <p>
                                {/* {"$" +
                                  item.tenant_folio?.bond_required +
                                  " " +
                                  "required, " +
                                  "$" +
                                  item.tenant_folio?.bond_held ? item.tenant_folio?.bond_held : '' +
                                  " " +
                                "held"} */}
                                {`${item.tenant_folio?.bond_required && `${item.tenant_folio?.bond_required}৳ required`} ${item.tenant_folio?.bond_held == null ? '' : `, ${item.tenant_folio?.bond_held}৳ held`}`}
                              </p>
                            </Col>
                          </Row>
                          <div
                            className="w-100"
                            style={{
                              borderBottom: "1.2px solid #C1C1C1"
                            }}
                          ></div>
                        </Col>
                      </div>
                      <div className="py-1">
                        <Col>
                          <Row>
                            <Col md={5}>
                              <p className="text-textTitleColor">Arrears Automation</p>
                            </Col>
                            <Col md={7}>
                              {" "}
                              <p>
                                {item.tenant_folio?.exclude_form_arrears === 0
                                  ? "No"
                                  : "Yes"}
                              </p>
                            </Col>
                          </Row>
                          <div
                            className="w-100"
                            style={{
                              borderBottom: "1.2px solid #C1C1C1"
                            }}
                          ></div>
                        </Col>
                      </div>
                    </Col>
                    {item.tenant_folio?.folio_code &&
                      <Col md={6}>
                        <div className="py-1">
                          <Col>
                            <Row>
                              <Col md={5}>
                                <p className="text-textTitleColor">Folio code</p>
                              </Col>
                              <Col md={7}>
                                {" "}
                                <p
                                  style={{ cursor: "pointer" }}
                                  className="text-textTitleColor"
                                  onClick={() =>
                                    tenantFolioHandler(
                                      item.property_id,
                                      item.contact_id,
                                      item.id,
                                      item.tenant_folio?.id
                                    )
                                  }
                                >
                                  {/* {item.first_name !== null
                              ? item.first_name + " "
                              : null}
                            {item.last_name !== null ? item.last_name : null} */}
                                  {`${item.first_name || ""} ${item.last_name} ${item.tenant_folio?.folio_code
                                    ? `(${item.tenant_folio?.folio_code})`
                                    : ""
                                    }`}
                                </p>
                              </Col>
                            </Row>
                            <div
                              className="w-100"
                              style={{
                                borderBottom: "1.2px solid #C1C1C1"
                              }}
                            ></div>
                          </Col>
                        </div>
                        <div className="py-1">
                          <Col>
                            <Row>
                              <Col md={5}>
                                <p className="text-textTitleColor">Invoices due</p>
                              </Col>
                              <Col md={7}>
                                {" "}
                                <p>
                                  {item.tenant_folio?.invoice_days_in_advance
                                    ? item.tenant_folio?.invoice_days_in_advance
                                    : "0.00"}৳
                                </p>
                              </Col>
                            </Row>
                            <div
                              className="w-100"
                              style={{
                                borderBottom: "1.2px solid #C1C1C1"
                              }}
                            ></div>
                          </Col>
                        </div>

                        <div className="py-3">
                          <Col>
                            <Row>
                              <Col md={5}>
                                <p className="text-textTitleColor">Paid to</p>
                              </Col>
                              <Col md={7}>
                                <span className="font-size-12 badge square-pill bg-labelColor float-start my-1 px-2 py-2 mx-1">
                                  {item.tenant_folio?.paid_to
                                    ? moment(item.tenant_folio?.paid_to).format(
                                      "DD-MM-YYYY"
                                    )
                                    : ""}
                                </span>
                              </Col>
                            </Row>
                            <div
                              className="w-100"
                              style={{
                                borderBottom: "1.2px solid #C1C1C1"
                              }}
                            ></div>
                          </Col>
                        </div>

                        <div className="py-1">
                          <Col>
                            <Row>
                              <Col md={5}>
                                <p className="text-textTitleColor">Part paid</p>
                              </Col>
                              <Col md={7}>
                                {" "}
                                <p>
                                  {item.tenant_folio?.part_paid
                                    ? item.tenant_folio?.part_paid
                                    : "0.00"}৳
                                </p>
                              </Col>
                            </Row>
                            <div
                              className="w-100"
                              style={{
                                borderBottom: "1.2px solid #C1C1C1"
                              }}
                            ></div>
                          </Col>
                        </div>

                        <div className="py-1">
                          <Col>
                            <Row>
                              <Col md={5}>
                                <p className="text-textTitleColor">Agreement</p>
                              </Col>
                              <Col md={7}>
                                {" "}
                                {item.tenant_folio?.agreement_start && (
                                  <p>


                                    {`from ${item.tenant_folio?.agreement_start
                                      ? moment(
                                        item.tenant_folio?.agreement_start
                                      ).format("DD MMM YYYY")
                                      : ""
                                      } to ${item.tenant_folio?.agreement_end
                                        ? moment(
                                          item.tenant_folio?.agreement_end
                                        ).format("DD MMM YYYY")
                                        : ""
                                      }`}
                                  </p>
                                )}
                              </Col>
                            </Row>
                            <div
                              className="w-100"
                              style={{
                                borderBottom: "1.2px solid #C1C1C1"
                              }}
                            ></div>
                          </Col>
                        </div>

                        <div className="py-1">
                          <Col>
                            <Row>
                              <Col md={5}>
                                <p className="text-textTitleColor">Periodic tenancy</p>
                              </Col>
                              <Col md={7}>
                                {" "}
                                <p>
                                  {item.tenant_folio?.periodic_tenancy === 0
                                    ? "No"
                                    : "Yes"}
                                </p>
                              </Col>
                            </Row>
                            <div
                              className="w-100"
                              style={{
                                borderBottom: "1.2px solid #C1C1C1"
                              }}
                            ></div>
                          </Col>
                        </div>

                        <div className="py-1">
                          <Col>
                            <Row>
                              <Col md={5}>
                                <p className="text-textTitleColor">Bank reference</p>
                              </Col>
                              <Col md={7}>
                                {" "}
                                <p>
                                  {item.tenant_folio?.bank_reterence
                                    ? item.tenant_folio?.bank_reterence
                                    : ""}
                                </p>
                              </Col>
                            </Row>
                            <div
                              className="w-100"
                              style={{
                                borderBottom: "1.2px solid #C1C1C1"
                              }}
                            ></div>
                          </Col>
                        </div>

                        {item.tenant_folio?.invoice_days_in_advance ? (
                          <div className="py-1">
                            <Col>
                              <Row>
                                <Col md={5}>
                                  <p className="text-textTitleColor">Rent Invoiced</p>
                                </Col>
                                <Col md={7}>
                                  <p>
                                    {item.tenant_folio?.invoice_days_in_advance
                                      ? item.tenant_folio?.invoice_days_in_advance
                                      : ""}{" "}
                                    days prior
                                  </p>
                                </Col>
                              </Row>
                              <div
                                className="w-100"
                                style={{
                                  borderBottom: "1.2px solid #C1C1C1"
                                }}
                              ></div>
                            </Col>
                          </div>
                        ) : (
                          ""
                        )}

                        <div className="py-1">
                          <Col>
                            <Row>
                              <Col md={5}>
                                <p className="text-textTitleColor">Receipt warning</p>
                              </Col>
                              <Col md={7}>
                                {" "}
                                <p>
                                  {item.tenant_folio?.receipt_warning
                                    ? item.tenant_folio?.receipt_warning
                                    : ""}
                                </p>
                              </Col>
                            </Row>
                            <div
                              className="w-100"
                              style={{
                                borderBottom: "1.2px solid #C1C1C1"
                              }}
                            ></div>
                          </Col>
                        </div>
                      </Col>}
                  </Row>
                </div>
              ) : (
                ""
              )}
            </div>

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
  return {
    contacts_show_data,
    contacts_show_loading,
  };
};
export default withRouter(
  connect(mapStateToProps, {
    TenantInfoFresh, storePropertyDocument
  })(ContactsInfoOfTenant)
);
