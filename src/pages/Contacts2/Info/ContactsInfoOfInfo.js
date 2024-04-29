import React, { useEffect, useRef, useState } from "react";
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
} from "reactstrap";
import {
  useLocation,
  withRouter,
  Link,
  useParams,
  useHistory,
} from "react-router-dom";
import { TagsInput } from "react-tag-input-component";
import { lebelContact, showContact, showContactFresh } from "store/actions";
import { connect } from "react-redux";

import Aos from "aos";
import "aos/dist/aos.css";

const ContactsInfoOfInfo = props => {
  const { id } = useParams();
  const history = useHistory();

  const [level, setLevel] = useState(true);
  const [step, setStep] = useState(0);
  const [activeState, setActiveState] = useState(0);

  const handleMulti3 = e => {
    //setSelectedState(e);
    props.setSelectedLevel(e);
    props.lebelContact(id, e);
    // console.log(e);
  };

  const listEnable = () => {
    setLevel(false);
  };

  const disable = () => {
    let insLvl = [];
    // if (inspectionInfoData.inspection_level != []) {
    //   inspectionInfoData.inspection_level?.map(async (item, key) =>
    //     insLvl.push(item.labels)
    //   );
    //   setSelectedLevel(insLvl);
    // }
    setLevel(true);
  };

  const postalAddress =
    props.props.contacts_show_data?.data?.contact_postal_address;
  const physicalAddress =
    props.props.contacts_show_data?.data?.contact_physical_address;

  const contactEditHandler = id => {
    props.showContactFresh();
    history.push(`/contact/edit/${props.props.contacts_show_data?.data?.id}`);
  };
  const handleSubmit = (e, idx) => {
    setActiveState(idx);
    setStep(idx);
  };
  return (

    <Card data-aos="fade-right" data-aos-once={true} className="custom_card_border_design me-2">
      <CardBody className="w-100">
        <div className="mb-2 d-flex justify-content-between align-items-center">
          <h4 className="mb-2 text-primary fw-bold">People</h4>

          <div className="d-flex justify-content-end">
            <button
              type="button"
              className="me-1 btn btn-info"
              onClick={contactEditHandler}
            >
              <i className="mdi mdi-pencil d-block font-size-16"></i>
            </button>
            {props.props.contacts_show_data?.data?.contact_details.map(
              (item, idx) => (
                <Button
                  type="button"
                  color="labelColor"
                  outline={step == idx ? false : true}
                  key={idx}
                  className="btn-sm"
                  onClick={e => handleSubmit(e, idx)}
                  style={{ marginRight: "5px" }}
                >
                  <span
                    style={{
                      textDecoration: "none",
                    }}
                    title={`${item.first_name} ${item.last_name} ${item.company_name ? " - " + item.company_name : ""
                      }`}
                  >
                    {item.primary == 1 && <i className="fas fa-star"></i>}{" "}
                    {`${item.first_name} ${item.last_name} ${item.company_name ? " - " + item.company_name : ""
                      }`}
                  </span>
                </Button>

              )

            )}
          </div>
        </div>
        <div
          className="w-100 mt-2 "
          style={{ borderBottom: "1.2px solid #153D56" }}
        ></div>
        <div>
          {props.props.contacts_show_data?.data?.contact_details.map(
            (item, idx) => (
              <div
                key={idx}
                style={
                  activeState === idx
                    ? { display: "block" }
                    : { display: "none" }
                }
              >
                <Row>
                  <Col md={6}>
                    <div className="py-1">
                      <Col>
                        <Row className="d-flex mt-3">
                          <Col md={5}>
                            <p className="text-textTitleColor">Full name</p>
                          </Col>
                          <Col md={7}>
                            <p>
                              {`${item?.first_name ? item?.first_name : ""} ${item?.last_name ? item?.last_name : ""
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
                            <p className="text-wrap text-textTitleColor">
                              Postal Address
                            </p>
                          </Col>
                          <Col md={7}>
                            <p>
                              {`${item?.contact_details_postal_address
                                ?.building_name || ""
                                } ${item?.contact_details_postal_address?.unit
                                  ? `${item?.contact_details_postal_address?.unit}/`
                                  : ""
                                }${item?.contact_details_postal_address?.number ||
                                ""
                                } ${item?.contact_details_postal_address?.street ||
                                ""
                                } ${item?.contact_details_postal_address?.suburb ||
                                ""
                                } ${item?.contact_details_postal_address?.state ||
                                ""
                                } ${item?.contact_details_postal_address
                                  ?.postcode || ""
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
                            <p className="text-wrap text-textTitleColor">
                              Physical Address
                            </p>
                          </Col>
                          <Col md={7}>
                            <p>
                              {`${item?.contact_details_physical_address
                                ?.building_name || ""
                                } ${item?.contact_details_physical_address?.unit
                                  ? `${item?.contact_details_physical_address?.unit}/`
                                  : ""
                                }${item?.contact_details_physical_address
                                  ?.number || ""
                                } ${item?.contact_details_physical_address
                                  ?.street || ""
                                } ${item?.contact_details_physical_address
                                  ?.suburb || ""
                                } ${item?.contact_details_physical_address?.state ||
                                ""
                                } ${item?.contact_details_physical_address
                                  ?.postcode || ""
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
                        <Row>
                          <Col md={5} className="text-textTitleColor py-2">
                            Labels
                          </Col>
                          <Col
                            md={7}
                            className="py-2 d-flex align-items-center"
                          >
                            {level
                              ? props.selectedLevel?.map((item, key) => {
                                return (
                                  <span
                                    className="font-size-12 badge square-pill bg-primary float-start p-2"
                                    key={key}
                                  >
                                    {item}
                                  </span>
                                );
                              })
                              : null}{" "}
                            {level ? (
                              <a
                                onClick={() => {
                                  listEnable();
                                }}
                              >
                                <i className="fas fa-pencil-alt text-primary ms-2"></i>
                              </a>
                            ) : (
                              <>
                                <TagsInput
                                  value={props.selectedLevel}
                                  onChange={e => {
                                    handleMulti3(e);
                                  }}
                                  name="level"
                                  placeHolder="enter Level"
                                />
                                <a
                                  onClick={() => {
                                    disable();
                                  }}
                                >
                                  X
                                </a>
                              </>
                            )}
                          </Col>
                        </Row>
                        <div
                          className="w-100 "
                          style={{ borderBottom: "1.2px solid #C1C1C1" }}
                        />
                      </Col>
                    </div>
                  </Col>

                  <Col md={6}>
                    {item?.home_phone ? (
                      <div className="py-1">
                        <Col>
                          <Row className="d-flex">
                            <Col md={4}>
                              <p className="text-textTitleColor">Phone</p>
                            </Col>

                            <Col md={8}>
                              <p>{item?.home_phone}</p>
                            </Col>
                          </Row>{" "}
                          <div
                            className="w-100 "
                            style={{ borderBottom: "1.2px solid #C1C1C1" }}
                          />
                        </Col>
                      </div>
                    ) : null}

                    <div className="py-1">
                      {item?.work_phone ? (
                        <Col>
                          <Row className="d-flex">
                            <Col md={4}>
                              <p className="text-textTitleColor">Work</p>
                            </Col>
                            <Col md={8}>
                              <p>{item?.work_phone}</p>
                            </Col>
                          </Row>{" "}
                          <div
                            className="w-100 "
                            style={{ borderBottom: "1.2px solid #C1C1C1" }}
                          />
                        </Col>
                      ) : null}
                    </div>
                    <div className="py-1">
                      {item?.mobile_phone ? (
                        <Col>
                          <Row className="d-flex">
                            <Col md={4}>
                              <p className="text-textTitleColor">Mobile</p>
                            </Col>
                            <Col md={8}>
                              <p>{item?.mobile_phone}</p>
                            </Col>
                          </Row>{" "}
                          <div
                            className="w-100 "
                            style={{ borderBottom: "1.2px solid #C1C1C1" }}
                          />
                        </Col>
                      ) : null}
                    </div>
                    <div className="py-1">
                      {item?.email ? (
                        <Col>
                          <Row className="d-flex">
                            <Col md={4}>
                              <p className="text-textTitleColor">Email</p>
                            </Col>
                            <Col md={8}>
                              <p>{item?.email}</p>
                            </Col>
                          </Row>{" "}
                          <div
                            className="w-100 "
                            style={{ borderBottom: "1.2px solid #C1C1C1" }}
                          />
                        </Col>
                      ) : null}
                    </div>
                    <div className="py-2">
                      <Col>
                        <Row className="d-flex align-items-center">
                          <Col md={5}>
                            <p className="text-textTitleColor">Communications</p>
                          </Col>
                          <Col
                            md={7}
                            className="d-flex justify-content-start align-items-center"
                          >
                            {item?.contact_details_communications.length > 0
                              ? item?.contact_details_communications
                                ?.communication
                              : "None"}
                          </Col>
                        </Row>{" "}
                        <div
                          className="w-100 "
                          style={{ borderBottom: "1.2px solid #C1C1C1" }}
                        />
                      </Col>
                    </div>
                  </Col>
                </Row>
              </div>
            )
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
  const { contacts_list_data, contacts_list_loading, contacts_show_loading } =
    gstate.Contacts2;
  return { contacts_show_loading };
};

export default withRouter(
  connect(mapStateToProps, {
    lebelContact,
    showContact,
    showContactFresh,
  })(ContactsInfoOfInfo)
);
