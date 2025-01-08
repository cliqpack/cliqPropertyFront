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
import TenantBondDetails from "../../Properties/TenantBondDetails";
import { TenantInfoFresh, storePropertyDocument } from "store/actions";
import {
  
  editPropertyTanentBondDetails
} from "../../../store/Properties/actions";
import Aos from "aos";
import "aos/dist/aos.css";
import moment from "moment";
import Loder from "components/Loder/Loder";

const ContactsInfoOfTenant = ({
  item,
  items,
  handleTenantFiles, show, setShow
}) => {
  console.log(item);
  console.log(items);
  const [state, setState] = useState({});
  const [state2, setState2] = useState({});
  const history = useHistory();
  const dispatch = useDispatch();
  const { id } = useParams();
  const inputFile = useRef(null);
  const [toggleBondState, setToggleBondState] = useState(false);
  const toggleBondDetails = () => {
    setToggleBondState((prev) => !prev);
  };
  const [showDropZone, setShowDropZone] = useState(false);
  const [postalAddress, setPostalAddress] = useState([]);
  const [paymentStatus, setPaymentStatus] = useState("add");
  const [physicalAddress, setPhysicalAddress] = useState([]);
  const [formTwoButtonValue, setFormTwoButtonValue] = useState({
    wfmBtn: "Weekly",
    rentTax: 0,
    periodic_tenancy: 0,
    rentInvoiceBtn: 0,
    exclude_form_arrears: 0,
    tenant_access: 0,
  });
  const tenantEditHandler = (id, tabId) => {
    dispatch(TenantInfoFresh());
    history.push("/tenant/edit/" + id + "/" + tabId);
  };
  const [checkState, setCheckState] = useState([[]]);
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
  const handleBondValues = (e) => {
    let value = e.target.value;
    value = +value;
    if (typeof value === "number") {
      if (formTwoButtonValue.wfmBtn === "Weekly") {
        setWeeklyRent(value);
        value *= 4.33;
        value = value.toFixed(2);
        setState2({ ...state2, rent: e.target.value, bond_required: value });
        setFortNightlyRent();
        setMonthlyRent();
      } else if (formTwoButtonValue.wfmBtn === "FortNightly") {
        setFortNightlyRent(value);
        value *= 2;
        value = value.toFixed(2);
        setState2({ ...state2, rent: e.target.value, bond_required: value });
        setWeeklyRent();
        setMonthlyRent();
      } else if (formTwoButtonValue.wfmBtn === "Monthly") {
        setMonthlyRent(value);
        value /= 1.1;
        value = value.toFixed(2);
        setState2({ ...state2, rent: e.target.value, bond_required: value });
        setWeeklyRent();
        setFortNightlyRent();
      }
    } else {
      setState2({ ...state2, rent: e.target.value, bond_required: "" });
    }
  };
  const handlePropertyFormTwoValues = (e) => {
    if (e.target.name == "agreement_start") {
      const date_end1 = moment(e.target.value)
        .add(364, "days")
        .format("yyyy-MM-DD");
      const substractDay = moment(e.target.value)
        .subtract(1, "days")
        .format("yyyy-MM-DD");
      const substractDay1 = moment(date_end1)
        .subtract(3, "Month")
        .format("yyyy-MM-DD");
      setState2({
        ...state2,
        [e.target.name]: e.target.value,
        ["agreement_end"]: date_end1,
        ["paid_to"]: substractDay,
        ["next_rent_review"]: substractDay1,
      });
    } else if (e.target.name == "agreement_end") {
      const substractMonthThree = moment(e.target.value)
        .subtract(3, "Month")
        .format("yyyy-MM-DD");

      setState2({ ...state2, ["agreement_end"]: substractMonthThree });
    } else if (e.target.name == "rent_review_frequency") {
      const date_end2 = moment()
        .add(e.target.value, "Month")
        .format("yyyy-MM-DD");
      setState2({
        ...state2,
        ["next_rent_review"]: date_end2,
        ["rent_review_frequency"]: e.target.value,
      });
    } else if (e.target.name == "move_out") {
      setDateCheck({ ...dateCheck, moveOut: true });
      setState2({ ...state2, [e.target.name]: e.target.value });
    } else {
      const { name, value } = e.target;
      const newState = { ...state2, [name]: value };
      if (name === "bond_required") {
        const bondRequired = parseFloat(newState.bond_required) || 0;
        const bondHeld = parseFloat(newState.bond_held) || 0;
        newState.bond_arrears = bondRequired - bondHeld;
      }
      setState2(newState);
    }
  };
  const handlePropertyFormBond = (e) => {
    const bond__paid = e.target.value;
    const bond__arrears =
      +state2.bond_required - (+state2.bond_receipted + +bond__paid);
    const bond__held = +state2.bond_receipted + +bond__paid;

    setState2((prev) => ({
      ...prev,
      [e.target.name]: bond__paid,
      bond_arrears: bond__arrears,
      bond_held: bond__held,
    }));
  };
  const handleBondDetails =  () => {
    editPropertyTanentBondDetails(
      state,
      state2,
      formTwoButtonValue,
      id,
      checkState,
      postalAddress,
      physicalAddress,
      paymentStatus,
     
    );
  }
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
                    Tenant
                    {
                      item.tenant_folio?.archive == 1 && <span className="font-size-14">
                        {" "}(Archived on{" "}
                        {moment(item.tenant_folio?.updated_at).format(
                          "DD MMM YYYY"
                        )})
                      </span>
                    }
                  </h4>
                </Col>
                {item.tenant_folio?.archive === 1 ? (
                  <Col md={6} className="d-flex justify-content-end align-items-center">
                    <i
                      className="fas fa-archive font-size-16 text-muted"
                      style={{ padding: "9px 12px", borderRadius: "5px", backgroundColor: "#d3d3d3" }}
                      title="This item is archived"
                    />
                  </Col>
                ) : (
                  <Col md={6} className="d-flex justify-content-end align-items-center">
                    <i
                      className="fas fa-cloud-upload-alt font-size-16 me-1 text-white"
                      style={{ padding: "9px 12px", backgroundColor: "#0F2E5A", borderRadius: "5px" }}
                    />
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
                  
                    <Button
                          type="button"
                          className="ms-1 btn btn-labelColor"
                          onClick={() => {
                            tenantFolioHandler(
                                  item?.property_id,
                                  item?.contact_id,
                                  item?.id,
                                  item?.tenant_folio?.id,


                              );
                          }}
                      >
                          <i className="fa fa-solid fa-dollar-sign" />
                      </Button>
                  </Col>
                )}

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
                                $
                                {item.tenant_folio?.rent
                                  ? item.tenant_folio?.rent
                                  : 0.0}
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
                              <p style={{ cursor: "pointer" }}
                                  className="text-textTitleColor" onClick={toggleBondDetails} >
                                {/* {"$" +
                                  item.tenant_folio?.bond_required +
                                  " " +
                                  "required, " +
                                  "$" +
                                  item.tenant_folio?.bond_held ? item.tenant_folio?.bond_held : '' +
                                  " " +
                                "held"} */}
                                {`${item.tenant_folio?.bond_required && `$${item.tenant_folio?.bond_required} required`} ${item.tenant_folio?.bond_held == null ? '' : `, $${item.tenant_folio?.bond_held} held`}`}
                              </p>
                              {toggleBondState && (
                                <TenantBondDetails
                                cid={item.tenant_info_data?.data?.data?.id}
                                conid={item.tenant_info_data?.data?.data?.contact_id}
                                propID={item.tenant_info_data?.data?.data?.property_id}
                                toggleBondDetails={toggleBondDetails}
                                state={state}
                                state2={state2}
                                handlePropertyFormTwoValues={handlePropertyFormTwoValues}
                                handlePropertyFormBond={handlePropertyFormBond}
                                handleBondDetails={handleBondDetails} 
                                />
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
                                  $
                                  {item.tenant_folio?.invoice_days_in_advance
                                    ? item.tenant_folio?.invoice_days_in_advance
                                    : "0.00"}
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
                                  $
                                  {item.tenant_folio?.part_paid
                                    ? item.tenant_folio?.part_paid
                                    : "0.00"}
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
  const { 
    contacts_show_data,
     contacts_show_loading,
     tenant_bond_update_data,
    tenant_bond_update_error,
    tenant_bond_update_loading,
     } = gstate.Contacts2;
  return {
    contacts_show_data,
    contacts_show_loading,
    tenant_bond_update_data,
    tenant_bond_update_error,
    tenant_bond_update_loading,
  };
};
export default withRouter(
  connect(mapStateToProps, {
    TenantInfoFresh, storePropertyDocument,editPropertyTanentBondDetails
  })(ContactsInfoOfTenant)
);
