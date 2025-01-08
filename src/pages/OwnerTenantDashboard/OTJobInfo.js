import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  Col,
  Container,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Card,
  CardBody,
  Button,
  Badge,
  CardImg,
  Alert,
} from "reactstrap";
import { useHistory, useParams, withRouter } from "react-router-dom";
import { map } from "lodash";
import { projects } from "./Data";
import classnames from "classnames";
import { JobsListById, getPropertyInfo } from "store/actions";
import moment from "moment";
import "./pInfo.css";
import OTHeader from "./OTHeader";
import Img from "../../assets/Property/5.jpg";
import { withTranslation, useTranslation } from "react-i18next";
import ApartmentAndAddress from "./Common/ApartmentAndAddress";


const OTJobInfo = props => {
  const { id } = useParams();
  const { t } = useTranslation();

  const jobData = props.jobListById_show_data?.data;
  // console.log(jobData);
  const jobImages = jobData?.jobs_images[jobData?.jobs_images.length - 1]?.image_path;
  // console.log(jobImages);

  const propertyData = jobData?.properties[0];
  const address = propertyData?.property_address;

  const srcImg = jobData?.jobs_images[1]?.image_path;

  const propertyImage =
    props.property_list_t_id_data?.data[0]?.owner_properties[0]?.property_image;

  // console.log(propertyImage);

  useEffect(() => {
    props.JobsListById(id);
    if (jobData) {
      props.getPropertyInfo(jobData?.property_id);
    }
  }, []);
  // console.log(props.jobListById_show_data?.data);

  return (
    <React.Fragment>
      <div id="layout-wrapper">
        <OTHeader text="1" />
        <div className="main-content" style={{ marginTop: "100px" }}>
          <div>

            <Row>
              <Col md={1}></Col>
              <Col md={10}>
                <div>




                  <Row>
                    <Col md={7} lg={7} xs={12} sm={12} className="p-0 m-0">
                      <ApartmentAndAddress propertyData={propertyData} address={address} />
                      <Card className="p-details custom_card_border_design" >
                        <CardBody>
                          <div className="d-flex py-1">
                            <span><strong>{t('Job')} - </strong>{jobData?.summary}</span>
                          </div>
                          <div className="mt-2">
                            <span>
                              <strong>{t('Reference')} -</strong>
                              {t('Job')} 000{jobData?.id}
                            </span>
                          </div>
                          <div>

                            {jobData?.due_by &&
                              <div className="mt-2"><span>
                                <strong>{t('Date')} {t('reported')} -</strong>
                                {moment(jobData?.due_by).format("MMMM Do YYYY")}
                              </span>
                              </div>
                            }
                            {jobData?.due_by &&
                              <div className="mt-2">
                                <span>
                                  <strong>{t('Due')} {t('Date')} -</strong>
                                  {moment(jobData?.due_by).format("MMMM Do YYYY")}
                                </span>
                              </div>}
                            {jobData?.maintenance_assign?.supplier
                              ?.company_name && <div className="mt-2">
                                <span>
                                  <strong>{t('Assigned')} {t('to')} -</strong>
                                  {
                                    jobData?.maintenance_assign?.supplier
                                      ?.company_name
                                  }
                                </span>
                              </div>}
                            {jobData?.reported_by && <div className="mt-2">
                              <span>
                                <strong>{t('Reported')} {t('by')} -</strong>
                                {t(jobData?.reported_by)}
                              </span>
                            </div>}
                            {jobData?.status && <div className="mt-2">
                              <span>
                                <strong>{t('Status')} -</strong>
                                {t(jobData?.status)}
                              </span>
                            </div>}
                            {jobData?.description && <div className="mt-2">
                              <span>
                                <strong>{t('Description')} - </strong>
                                {jobData?.description}
                              </span>
                            </div>}
                          </div>
                          <div className="mt-2">

                          </div>
                        </CardBody>
                      </Card>

                      <Card className="custom_card_border_design py-3 px-3 my-4">
                        <CardBody>
                          <span className="fw-bold">{t('Info')}</span>
                          <div>
                            {jobData?.status == 'Closed' ?
                              <Alert color="info">
                                <div>

                                  (<><i className="fas fa-check-circle fs-2x me-2"></i>
                                    {t('This')} {t('was')} {t('Closed')} {t('on')}
                                    {jobData?.completed ? moment(jobData?.completed).format(
                                      "MMMM Do YYYY"
                                    ) : ""}</>)
                                </div>
                              </Alert>
                              : ""
                            }
                            {console.log(propertyData?.owner[0]?.reference
                            )}
                            <strong className="me-1">{t('Owner')}: </strong> {propertyData?.owner[0]?.reference}<br />
                            <strong className="me-1">{t('Tenant')}: </strong> {propertyData?.tenant[0]?.reference}<br />
                          </div>
                        </CardBody>
                      </Card>


                    </Col>

                    <Col md={5} sm={12} xs={12} className="mt-4">


                      <Card className="custom_card_border_design me-2">
                        {/* process.env.REACT_APP_IMAGE */}

                        <CardImg
                          src={jobImages ? jobImages : Img}
                          className="img-fluid"
                          style={{ height: "400px", objectFit: "cover", borderRadius: "10px" }}
                        />

                      </Card>
                    </Col>
                  </Row>
                </div>
              </Col>
              <Col md={1}></Col>
            </Row>

            <Row>
              <Col md={1}></Col>
              <Col md={10} className="m-0 p-0">
                <div>
                  <Card className="custom_card_border_design me-2">
                    <CardBody>
                      <div>
                        <div>
                          <strong>{t('Quotes')}</strong>
                        </div>
                        <hr />

                        <div>
                          {jobData?.quoates.length == 0 ?
                            <span>{t('No')} {t('Quotes')}!</span> :
                            jobData?.quoates.map((item, key) => (

                              <Row key={key} className='px-2 mt-1 py-3 rounded' >
                                <Col md={6}>
                                  <div className="fw-bold">{item.supplier.first_name} {item.supplier.last_name}</div>
                                  <div>{t('Amount')} <span className="fw-bold">${item.amount}</span></div>
                                  <div>{t('Reference')} <span className="fw-bold">{item.reference}</span></div>
                                </Col>
                                <Col md={6} className='d-flex justify-content-end'>
                                  {moment(item.updated_at).format('MMM DD, yyyy')}
                                </Col>
                              </Row>
                            ))
                          }
                        </div>
                      </div>
                    </CardBody>
                  </Card>

                  <Card className="custom_card_border_design me-2">
                    <CardBody>
                      <div>
                        <div>
                          <span className="fw-bold">{t('Bills')}</span>
                        </div>
                        <hr />
                        {jobData?.bill ?
                          <div
                          >

                            <Row className="px-2 mt-1 py-3 rounded" >
                              <Col md={6} className='d-flex flex-column'>
                                <span>{t(`Bills`)} <b>#{jobData?.bill?.id}</b></span>
                                <span>{t(`Amount`)} <b>${jobData?.bill?.amount}</b></span>
                                <span>{t(`Details`)} <b>{jobData?.bill?.details}</b></span>
                              </Col>
                              <Col md={6} className='d-flex justify-content-end'>
                                {moment(jobData?.bill?.billing_date).format('MMM DD, yyyy')}
                              </Col>
                            </Row>

                          </div> :
                          <span>{t('No')} {t('Bills')}</span>}
                      </div>
                    </CardBody>
                  </Card>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = gstate => {
  const {
    property_list_t_id_data,
    property_list_t_id_loading,
    jobs_list_by_id_ot_data,
  } = gstate.OTDashboard;

  const { jobListById_show_data } = gstate.Jobs;

  const { property_info_data, property_info_error, property_info_loading } =
    gstate.property;

  return {
    property_info_data,
    property_info_error,
    property_info_loading,

    jobListById_show_data,
  };
};

export default withRouter(
  connect(mapStateToProps, {
    JobsListById,
    getPropertyInfo,
  })(OTJobInfo)
);
