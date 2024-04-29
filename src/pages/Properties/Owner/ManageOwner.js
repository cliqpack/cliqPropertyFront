import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import Select from "react-select";
import moment from "moment";
import {
  getPropertyInfo,
  getTenantForManage,
  getTenantForManageFresh,
  getOwnerForManage,
  getPropertyOwnerInfo,
  OwnerInfoFresh,
  getPropertyAllOwnerInfo,
  checkOwnerPayableInfo,
  changeOwner,
  changeOwnerFresh,
} from "store/actions";
import toastr from "toastr";

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
import { useDispatch } from "react-redux";
import Breadcrumbs from "components/Common/Breadcrumb";

const ManageOwner = props => {
  const { id } = useParams();
  const history = useHistory();
  const [disableBtn, setDisableBtn] = useState("");
  const [init, setInit] = useState(true);
  const [show, setShow] = useState(false);
  const [check, setCheck] = useState(false);
  const [contact, setContact] = useState({ id: '', reference: '', folioId: '' });

  const backHandler = () => {
    history.push(`/propertyInfo/${id}`);
  };

  const handleShow = () => {
    setShow(prev => !prev);
  }

  const tenantEditHandler = (id, tabId) => {
    history.push("/tenant/edit/" + id + "/" + tabId);
  };

  useEffect(() => {
    if (props.property_info_loading === false) {
      props.getPropertyInfo(id);
    }
    if (init) {
      props.getOwnerForManage(id);
      props.getPropertyOwnerInfo(id);
      props.getPropertyAllOwnerInfo(id);
      setInit(false);
    }
    if (props.check_owner_payable_info && check) {
      setShow(true);
      setCheck(false);
    }
    if (props.change_owner === 'Success') {
      toastr.success('Owner changed');
      props.getPropertyAllOwnerInfo(id);
      props.changeOwnerFresh();
      handleShow();
    }
  }, [props.check_owner_payable_info, props.change_owner]);

  const ownerFolioHandler = (contactId, oId, folioCode, fId) => {
    history.push({
      pathname: `/ownerFolio/${id}/${fId}`,
      state: { contactId, oId, folioCode, fId },
    });
  };

  const property_data = props.property_info_data?.data;

  let ownerInfoData = undefined;
  if (props.property_owner_info_data) {
    ownerInfoData = props.property_owner_info_data.data;
  }

  const dispatch = useDispatch();

  const ownerEditHandler = (id, tabId, fId, proId) => {
    dispatch(OwnerInfoFresh());
    history.push({ pathname: `/owner/edit/${id}/${fId}/${tabId}`, state: { proId } });
  };

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

  const currentOwnerHandler = (contactId, ref, folioId) => {
    props.checkOwnerPayableInfo(id, contactId);
    setContact({ id: contactId, reference: ref, folioId: folioId });
    setCheck(true);
  }

  const handleOwner = () => {
    props.changeOwner(contact, id);
  }

  console.log(props.property_all_owner_info_data);

  const handleNewOwner = () => {
    history.push(`/propertyOwnerAdd/${id}`);
  }

  return (
    <div className="page-content">
      {/* <Breadcrumbs title="Manage Owner" breadcrumbItem="Properties" /> */}
      <h4 className="ms-2 text-primary">Manage Owner</h4>

      <Row>
        <Col lg={2} style={{ display: "flex", flexDirection: "column" }}>
          <Card>
            <CardBody>
              <div>
                <h4 className="text-primary py-1">
                  Manage Owner&nbsp;-&nbsp;
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
                    className="btn btn-info"
                    onClick={backHandler}
                  >
                    <i className="fas fa-angle-left font-size-18" /> Back
                  </button>

                  {/* <Link to={`/propertyOwnerAdd/${id}`}> */}
                  <button
                    type="button"
                    className="btn btn-info"
                    // disabled={disableBtn[0]?.status ? true : false}
                    onClick={() => handleNewOwner()}
                  >
                    <i className="fas fa-house-damage" /> New Owner
                  </button>
                  {/* </Link> */}
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>

        <Col md={10} className="p-0">
          {props.property_all_owner_info_loading === "Success" ?
            props.property_all_owner_info_data?.data?.data?.map(item => {
              return <>
                <Card data-aos="fade-right" data-aos-once={true} className="custom_card_border_design me-2">
                  <CardBody>
                    <div>
                      <div className="">
                        <Row className="d-flex justify-content-between">
                          {" "}
                          <Col md={8} className="d-flex">
                            <div>
                              <h4 className="text-primary">
                                <i className="fas fa-home me-2"></i>{item?.reference}{" "}
                                {item?.status == '1' && <span className="badge badge-soft-primary">
                                  current
                                </span>}
                              </h4>
                            </div>
                          </Col>
                          <Col
                            style={{ cursor: "pointer" }}
                            md={4}
                            className="d-flex justify-content-end"
                          >
                            <Button
                              type="button"
                              className="btn btn-info"
                              onClick={() => {
                                ownerEditHandler(item?.id, 2, item?.owner_folios?.id, id);
                              }}
                            >
                              <i className="fa fa-solid fa-pen" />
                            </Button>
                            {
                              item?.status === 0 &&
                              (<Button
                                type="button"
                                className="ms-1 btn btn-secondary"
                                onClick={() => currentOwnerHandler(item?.id, item?.reference, item?.owner_folios?.id)}
                              >
                                <i className="fas fa-gavel"></i>{" "} Make current
                              </Button>)
                            }
                          </Col>
                          <div
                            className="my-1"
                            style={{ borderBottom: "1.2px dotted #c9c7c7" }}
                          />
                        </Row>
                      </div>

                      <div className="mt-3">
                        <Row>
                          <Col md={6}>
                            <Row>
                              <Col>
                                <Row className="py-1">
                                  <Col md={5}>
                                    <span className="text-primary">Contact</span>
                                  </Col>
                                  <Col md={7}>
                                    <Link
                                      to={`/contactsInfo/${item?.contact_id}`}
                                    >
                                      {item?.reference}
                                    </Link>
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
                              {item?.mobile_phone ||
                                item?.home_phone ||
                                item?.work_phone ? (
                                <Col className="py-1">
                                  <Row>
                                    <Col md={5}>
                                      <span className="text-primary">Phone</span>
                                    </Col>
                                    <Col md={7}>
                                      <span>
                                        {item?.mobile_phone && `(m) ${item?.mobile_phone}`}
                                        {item?.home_phone && `(h) ${item?.home_phone}`}
                                        {item?.work_phone && `(w) ${item?.work_phone}`}
                                      </span>
                                    </Col>
                                  </Row>
                                  <div
                                    className="w-100"
                                    style={{
                                      borderBottom: "1.2px dotted #c9c7c7",
                                    }}
                                  />
                                </Col>
                              ) : (
                                ""
                              )}
                            </Row>
                            {/* <Row>
                              <Col className="py-1">
                                <Row>
                                  <Col md={5}>
                                    <span className="text-primary">
                                      Fee schedule{" "}
                                    </span>
                                  </Col>
                                  <Col md={7}>
                                    <Link
                                      to={`/owner/edit/${ownerInfoData?.data?.id}/3`}
                                    >
                                      <span>
                                        {
                                          ownerInfoData?.data?.owner_property_fees
                                            ?.length
                                        }{" "}
                                        fees{" "}
                                        <i className="fas fa-pen font-size-14 text-primary ms-1"></i>
                                      </span>
                                    </Link>
                                  </Col>
                                </Row>
                                <div
                                  className="w-100"
                                  style={{
                                    borderBottom: "1.2px dotted #c9c7c7",
                                  }}
                                />
                              </Col>
                            </Row> */}

                            {item?.owner_folios?.balance ||
                              item?.owner_folios?.total_money ||
                              item?.owner_folios?.regular_intervals ? (
                              <Row>
                                <Col className="py-1">
                                  <Row>
                                    <Col md={5}>
                                      <span className="text-primary">
                                        Disbursements
                                      </span>
                                    </Col>
                                    <Col md={7}>
                                      {item?.owner_folios?.balance
                                        ? `on balance of ${item?.owner_folios?.balance || "0.00"
                                        }৳/`
                                        : ""}{" "}
                                      {item?.owner_folios?.total_money
                                        ? ` on total money in of ${item?.owner_folios?.total_money ||
                                        "0.00"
                                        }৳`
                                        : ""}{" "}
                                      {item?.owner_folios?.regular_intervals
                                        ? `/ at ${item?.owner_folios?.regular_intervals} intervals`
                                        : ""}
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
                            ) : (
                              ""
                            )}
                            <Row>
                              {item?.owner_folios?.next_disburse_date ? (
                                <Col className="py-1">
                                  <Row>
                                    <Col md={5}>
                                      <span className="text-primary">
                                        Next Disbursement
                                      </span>
                                    </Col>
                                    <Col md={7}>
                                      <span className="badge rounded-pill bg-primary justify-content-center align-items-center p-2 mb-2">
                                        {moment(
                                          item?.owner_folios?.next_disburse_date
                                        ).format("DD/MM/YYYY") || ""}
                                      </span>
                                    </Col>
                                  </Row>
                                  <div
                                    className="w-100 "
                                    style={{
                                      borderBottom: "1.2px dotted #c9c7c7",
                                    }}
                                  />
                                </Col>
                              ) : (
                                ""
                              )}
                            </Row>
                            <Row>
                              {item?.owner_folios?.agreement_end ? (
                                <Col className="py-1">
                                  <Row>
                                    <Col md={5}>
                                      <span className="text-primary">
                                        Agreement end
                                      </span>
                                    </Col>
                                    <Col md={7}>
                                      <span className="badge rounded-pill bg-warning justify-content-center align-items-center p-2 mb-2">
                                        {moment(
                                          item?.owner_folios?.agreement_end
                                        ).format("DD MMM yyyy") || ""}
                                      </span>
                                    </Col>
                                  </Row>
                                  <div
                                    className="w-100 "
                                    style={{
                                      borderBottom: "1.2px dotted #c9c7c7",
                                    }}
                                  />
                                </Col>
                              ) : (
                                ""
                              )}
                            </Row>
                          </Col>
                          <Col md={6}>
                            <div>
                              <Col className="py-1">
                                <Row>
                                  <Col md={5}>
                                    <span className="text-primary">Folio</span>
                                  </Col>
                                  <Col md={7}>
                                    <div
                                      className="text-primary"
                                      onClick={() => {
                                        ownerFolioHandler(
                                          item?.contact_id,
                                          item?.id,
                                          item?.owner_folios?.folio_code,
                                          item?.owner_folios?.id
                                        );
                                      }}
                                    >
                                      {item?.reference}
                                      ({item?.owner_folios?.folio_code})
                                    </div>
                                  </Col>
                                </Row>
                                <div
                                  className="w-100"
                                  style={{
                                    borderBottom: "1.2px dotted #c9c7c7",
                                  }}
                                />
                              </Col>
                            </div>

                            {item?.email && (
                              <div>
                                <Col className="py-1">
                                  <Row>
                                    <Col md={4}>
                                      <span className="text-primary">Email</span>
                                    </Col>
                                    <Col md={8}>
                                      {item?.email || ""}
                                    </Col>
                                  </Row>
                                  <div
                                    className="w-100"
                                    style={{
                                      borderBottom: "1.2px dotted #c9c7c7",
                                    }}
                                  />
                                </Col>
                              </div>
                            )}
                            <div>
                              <Col className="py-1">
                                <Row>
                                  <Col md={5}>
                                    <span className="text-primary">
                                      Payment methods{" "}
                                    </span>
                                  </Col>
                                  <Col md={7}>
                                    <Link
                                      to={{ pathname: `/owner/edit/${item?.id}/${item?.owner_folios?.id}/4`, state: id }}
                                      className="d-flex"
                                    >
                                      {item?.owner_payment.length >
                                        0
                                        ? item?.owner_payment.map(
                                          (i, x) => (
                                            <span key={x}>
                                              {i.method !== null
                                                ? i.method
                                                : ""}{" "}
                                              &nbsp;
                                            </span>
                                          )
                                        )
                                        : ""}
                                      <i className="me-2 mdi mdi-pencil d-block font-size-16 text-primary"></i>
                                    </Link>
                                  </Col>
                                </Row>{" "}
                                <div
                                  className="w-100"
                                  style={{
                                    borderBottom: "1.2px dotted #c9c7c7",
                                  }}
                                />
                              </Col>
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </>
            })
            : null}
        </Col>
        <Col md={3}></Col>
        {
          show &&
          <Modal
            isOpen={show}
            toggle={handleShow}
          >
            <div className="modal-header">
              <h5
                className="modal-title mt-0 text-primary"
                id="myModalLabel"
              >
                Change the owner for {property_data && property_data?.data?.reference
                  ? property_data?.data?.reference
                  : ""}
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={handleShow}
              >
                <span aria-hidden="true">
                  &times;
                </span>
              </button>
            </div>
            <div className="modal-body">
              <div className="mb-3 select2-container">
                {
                  props.check_owner_payable_info?.data?.check === false &&
                  <span>Click ok to make <b>{contact.reference}</b> the current owner</span>
                }
                {
                  props.check_owner_payable_info?.data?.check === true &&
                  <span>Please complete all the transaction related to <b>{contact.reference}</b></span>
                }
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                onClick={handleShow}
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                <i className="fas fa-window-close"></i>{" "}{props.check_owner_payable_info?.data?.check === false ? 'Cancel' : 'Close'}
              </button>
              {props.check_owner_payable_info?.data?.check === false &&
                < button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleOwner}
                >
                  OK
                </button>
              }
            </div>
          </Modal>
        }
      </Row>
    </div >
  );
};

const mapStateToProps = gstate => {
  const {
    property_info_data,
    property_info_error,
    property_info_loading,
    manage_tenant_list_data,
    manage_tenant_list_loading,
    manage_owner_list_data,
    property_owner_info_data,
    property_all_owner_info_data,
    property_all_owner_info_error,
    property_all_owner_info_loading,
    check_owner_payable_info,
    check_owner_payable_info_error,
    check_owner_payable_info_loading,
    change_owner,
  } = gstate.property;

  return {
    property_info_data,
    property_info_error,
    property_info_loading,
    manage_tenant_list_data,
    manage_tenant_list_loading,
    manage_owner_list_data,
    property_owner_info_data,
    property_all_owner_info_data,
    property_all_owner_info_error,
    property_all_owner_info_loading,
    check_owner_payable_info,
    check_owner_payable_info_error,
    check_owner_payable_info_loading,
    change_owner,
  };
};

export default withRouter(
  connect(mapStateToProps, {
    getPropertyInfo,
    getTenantForManage,
    getTenantForManageFresh,
    getOwnerForManage,
    getPropertyOwnerInfo,
    OwnerInfoFresh,
    getPropertyAllOwnerInfo,
    checkOwnerPayableInfo,
    changeOwner,
    changeOwnerFresh,
  })(ManageOwner)
);
