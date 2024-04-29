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
  Table
} from "reactstrap";
import { useHistory, useParams, withRouter } from "react-router-dom";
import { map } from "lodash";
import { projects } from "./Data";
import classnames from "classnames";
import {
  getPropertyInfo,
  JobsListById,
  ListingListInspectionInfo,
  propertyListForOwnerById,
  JobsListByIdOT,
  currentBalanceInfoOwnerById, financialChartData, ownerPanelDoc
} from "store/actions";
import moment from "moment";
import "./pInfo.css";
import CardProjectsForJob from "./CardProjectsForJob";

import Img from "../../assets/Property/5.jpg";
import CardProjectForInspection from "./CardProjectForInspection";
import Apaexlinecolumn from "pages/AllCharts/apex/apaexlinecolumn";
import Apexchart from "./Chart/ApexChart";
import { withTranslation, useTranslation } from "react-i18next";
import ApartmentAndAddress from "./Common/ApartmentAndAddress";


const OTPropertyInfo2 = props => {
  const { id } = useParams();
  const history = useHistory();
  const { t } = useTranslation();

  const [init, setInit] = useState(true);

  let language = localStorage.getItem("i18nextLng");


  useEffect(() => {
    if (init) {
      props.getPropertyInfo(id);

      // props.JobsListById(id);

      props.ListingListInspectionInfo(id);

      props.propertyListForOwnerById(id);

      props.JobsListByIdOT(id);

      props.currentBalanceInfoOwnerById(id);

      props.financialChartData(id);

      props.ownerPanelDoc(language, id)

      setInit(false);
    }
  }, []);




  const propertyData = props.property_info_data?.data?.data;
  const ownerDocData = [...props.owner_panel_doc_data?.data?.property_docs ? props.owner_panel_doc_data?.data?.property_docs : [], ...props.owner_panel_doc_data?.data?.all_property_docs ? props.owner_panel_doc_data?.data?.all_property_docs : []];
  // const sortData = ownerDocData.sort(function (a, b) {
  //   // Convert the date strings to Date objects
  //   let dateA = moment(a.created_at).format("DD MMM YYYY hh:mm")
  //   let dateB = moment(b.created_at).format("DD MMM YYYY hh:mm")
  //   // console.log(dateA);
  //   // Subtract the dates to get a value that is either negative, positive, or zero
  //   return dateA - dateB;
  // });

  const sortData = ownerDocData.sort(function (a, b) {
    // Turn your strings into dates, and then subtract them
    // to get a value that is either negative, positive, or zero.
    return new Date(b.created_at) - new Date(a.created_at);
  })





  // ownerDocData.sort((a, b) => b.created_at - a.created_at)
  //  [...props.owner_panel_doc_data?.data?.property_docs, ...props.owner_panel_doc_data?.data?.all_property_docs
  // ]

  const address = propertyData?.property_address;
  const jobData = props.jobs_list_by_id_ot_data?.data;

  let ownerInfoData = props.current_balance_ownerPanel_data;





  const inspectionData = props.listing_list_inspection_info_data?.data;
  // console.log(props.listing_list_inspection_info_loading);
  const tenantData = props.property_list_t_id_data?.data;
  const propertyImage = props.property_list_t_id_data?.data[0]?.owner_properties?.property_images[props.property_list_t_id_data?.data[0]?.owner_properties?.property_images?.length - 1]?.property_image



  const tenantName = `${props.property_list_t_id_data?.data[0]?.owner_properties?.tenant_one
    ?.first_name
    ? props.property_list_t_id_data?.data[0]?.owner_properties?.tenant_one
      ?.first_name
    : ""
    } ${props.property_list_t_id_data?.data[0]?.owner_properties?.tenant_one
      ?.last_name
      ? props.property_list_t_id_data?.data[0]?.owner_properties?.tenant_one
        ?.last_name
      : ""
    }`;
  const tenantFName =
    props.property_list_t_id_data?.data[0]?.owner_properties?.tenant_one
      ?.first_name;

  const tenantFolioData =
    props.property_list_t_id_data?.data[0]?.owner_properties?.tenant_one
      ?.tenant_folio;

  return (
    <React.Fragment>
      <div className="main-property" style={{ marginTop: "100px" }}>
        <Row className="m-3">



          <Col md={7} lg={7} xs={12} sm={12} >
            <Card className="p-details custom_card_border_design me-2" style={{ height: { md: "350px", sx: "500px" } }}>
              <CardBody style={{ height: "340px", }}>
                <Row className="py-2">

                  <Col md={10} xs={12} className="d-flex flex-column">
                    <h3>{propertyData?.reference}</h3>
                    <div className="d-flex justify-content-between py-2">
                      <Col md={4}>
                        <p className="fw-bold">{t('Address')}</p>
                      </Col>
                      <Col md={8} >

                        {address?.building_name}
                        {" "}
                        {address?.unit}
                        {address?.street} <br />
                        {address?.suburb}
                        {address?.postcode && ','}
                        {address?.postcode}
                        {address?.state && ','}
                        {address?.state}
                        {address?.country && ','}
                        {address?.country} <br />
                      </Col>
                    </div>

                    <div className="d-flex justify-content-between py-2">
                      <Col md={4}>
                        <p className="fw-bold">{t('Apartment')}</p>
                      </Col>
                      <Col md={8}>
                        <div className="d-flex flex-column align-items-start">
                          <span className="d-flex flex-wrap text-muted justify-content-start ms-1">
                            <Badge className='py-2 px-3 bg-info'>
                              <span>
                                <i className="fas fa-bed font-size-14 mx-1"></i>{" "}
                                <span className="font-size-12">
                                  ({propertyData?.bedroom || '0'})
                                </span>
                              </span>
                            </Badge>
                            <Badge className='py-2 px-3 mx-3 bg-secondary'>
                              <span>
                                <i className="fas fa-bath font-size-14 mx-1"></i>{" "}
                                <span className="font-size-12">
                                  ({propertyData?.bathroom || '0'})
                                </span>
                              </span>
                            </Badge>
                            <Badge className='py-2 px-3 bg-success'>
                              <span>
                                <i className="fas fa-car font-size-14 mx-1"></i>{" "}
                                <span className="font-size-12">
                                  ({propertyData?.car_space || '0'})
                                </span>
                              </span>
                            </Badge>
                          </span>
                        </div>
                      </Col>
                    </div>


                    <div className="d-flex justify-content-between py-2">
                      <Col md={4}>
                        <p className="fw-bold">{t('General Comment')}</p>
                      </Col>
                      <Col md={8}>
                        <span className="py-1">
                          {t('Your')} {t('tenant')} {tenantName && <b>{tenantName}</b>}{" "}
                          {t('pays')}{" "}
                          {tenantFolioData?.rent && (
                            <b>
                              ${tenantFolioData?.rent}{" "}

                              {t(tenantFolioData?.rent_type)}
                            </b>
                          )}{" "}
                          <br /> {t('and')} {t('is')} {t('paid')} {t('up')} {t('to')}{" "}
                          {tenantFolioData?.paid_to && (
                            <b>
                              {moment(tenantFolioData?.paid_to).format(
                                "MMMM Do YYYY"
                              )}
                            </b>
                          )}
                        </span>
                      </Col>
                    </div>

                    <div className="d-flex justify-content-between py-2">
                      <Col md={4}>
                        <p className="fw-bold">{t('Agreement')} {t('Duration')}</p>
                      </Col>
                      <Col md={8}>
                        <span className="py-1">
                          {t('Agreement')} {t('from')}{" "}
                          <b>{tenantFolioData?.agreement_start}</b> {t('to')}{" "}
                          <b>{tenantFolioData?.agreement_end}</b>
                        </span>{" "}
                        <br />
                        <span className="py-1">
                          {t('Moved')} {t('in')}{" "}
                          <b>
                            {moment(tenantFolioData?.move_in).format(
                              "MMMM Do YYYY"
                            )}
                          </b>
                        </span>
                      </Col>
                    </div>

                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>


          <Col md={5} sm={12} xs={12}>
            <Card className="custom_card_border_design me-2">
              <CardImg
                src={propertyImage ? process.env.REACT_APP_IMAGE + propertyImage : Img}
                // src={Img}
                className="img-fluid"
                style={{ height: "340px", objectFit: "cover", borderRadius: "10px" }}
              />
            </Card>
          </Col>



        </Row>


        <Row className="m-3">
          <Col md={1}></Col>
          <Col md={12}>
            <div>

              {/* <Card>
                <CardBody>

                  <ApartmentAndAddress propertyData={propertyData} address={address} />
                </CardBody>
              </Card> */}

              {/* ============ Current Balance (all properties) start from here ========== */}
              <div>
                <div>
                  <div>
                    <Card className="custom_card_border_design me-2">
                      <CardBody>
                        <div>
                          {" "}
                          <h4>{t('Current')} {t('Balance')}</h4>
                        </div>
                        <hr />

                        {/* <Row style={{ cursor: "pointer" }}>
                          {jobData?.map((data, i) => (
                            <CardProjectsForJob key={i} data={data} />
                          ))}
                        </Row> */}
                        <Table responsive borderless>
                          <thead>
                            <tr>

                              <th>
                                {t('Opening')} {t('balance')}
                              </th>
                              <th>
                                {t('Money')} {t('in')}
                              </th>
                              <th>
                                {t('Money')} {t('out')}
                              </th>
                              <th>
                                {t('Bills')} {t('outstanding')}
                              </th>
                              <th>
                                {t('Net')} {t('balance')}
                              </th>

                            </tr>
                          </thead>
                          <tbody>
                            <tr>

                              <td>
                                <span className="text-muted">
                                  $
                                  {ownerInfoData?.data?.owner_folio?.opening_balance == null ? "0.00" : ownerInfoData?.data?.owner_folio?.opening_balance}
                                </span>
                              </td>
                              <td>
                                <span className="text-muted">
                                  $
                                  {ownerInfoData?.data?.owner_folio?.money_in ? ownerInfoData?.data?.owner_folio?.money_in : "0.00"}
                                </span>
                              </td>
                              <td>
                                <span className="text-muted">
                                  { }
                                  ${ownerInfoData?.data?.owner_folio?.money_out ? ownerInfoData?.data?.owner_folio?.money_out : "0.00"}
                                </span>
                              </td>
                              <td>
                                <span className="text-muted">
                                  $
                                  {ownerInfoData?.ownerPendingBill
                                    ?.total_bills_amount_sum_amount
                                    ? ownerInfoData?.ownerPendingBill
                                      ?.total_bills_amount_sum_amount
                                    : "0.00"}
                                </span>
                              </td>
                              <td>
                                <span className="text-muted">
                                  $
                                  {ownerInfoData?.data?.owner_folio?.money_in == 0
                                    ? "0.00"
                                    : props.current_balance_ownerPanel_data?.folio?.money_in ? props.current_balance_ownerPanel_data?.folio?.money_in : 0 -
                                      (ownerInfoData?.data?.owner_folio?.money_out ? ownerInfoData?.data?.owner_folio?.money_out : 0 +
                                        ownerInfoData?.data?.owner_folio?.uncleared ? ownerInfoData?.data?.owner_folio?.uncleared : 0)}

                                </span>
                              </td>

                            </tr>
                          </tbody>
                        </Table>
                      </CardBody>
                    </Card>
                  </div>
                </div>
              </div>
              {/* ============ Current Balance (all properties) ends here ========== */}

              {/* ============ Financial Activity (all properties)  start from here ========== */}
              {props.chart_data?.data?.money_in.length > 0 || props.chart_data?.data?.money_out.length > 0 ? <div>
                <div>
                  <div>

                    <Card className="custom_card_border_design me-2">
                      <CardBody>
                        <div>
                          {" "}
                          <h4>{t('Financial')} {t('Activity')} ({t('all')} {t('properties')}) </h4>
                        </div>
                        <hr />
                        {/* <Apaexlinecolumn /> */}

                        {props.chart_data?.data?.money_in.length > 0 || props.chart_data?.data?.money_out.length > 0 ? <Apexchart data={props.chart_data?.data} /> : ""}
                      </CardBody>
                    </Card>
                  </div>
                </div>
              </div> : null}
              {/* ============ Financial Activity (all properties)  ends here ========== */}

              <div>
                <div>
                  <div>
                    <Card className="custom_card_border_design me-2">
                      <CardBody>
                        <div>
                          {" "}
                          <h4>{t('Jobs')}</h4>
                        </div>
                        <hr />

                        {jobData ? <Row style={{ cursor: "pointer" }}>
                          {jobData?.map((data, i) => (
                            <CardProjectsForJob key={i} data={data} />
                          ))}
                        </Row> :
                          <div className="w-100 d-flex justify-content-center">Loading...</div>
                        }
                      </CardBody>
                    </Card>
                  </div>
                </div>
              </div>


              <Card className="custom_card_border_design me-2">

                <CardBody>
                  <div>
                    <h4>{t('Inspections')}</h4>
                    <hr />

                    {inspectionData ? <Row style={{ cursor: "pointer" }}>
                      {inspectionData?.map((data, i) => (
                        <CardProjectForInspection data={data} key={i} />
                      ))}
                    </Row> :
                      <div className="w-100 d-flex justify-content-center">Loading...</div>

                    }
                  </div>
                </CardBody>
              </Card>

              <Card className="custom_card_border_design me-2">
                <CardBody>
                  <div>
                    <div>
                      <h4>{t('Documents')}</h4>
                    </div>
                    <hr />
                    {sortData ? '' : <div>
                      <span className="text-muted">
                        {t('Click')} a {t('document')} row to show that document and any
                        attached files.
                      </span>
                    </div>}

                    {sortData.map((item, key) => (
                      <div
                        className="ps-4 pe-3 mt-1 py-3 d-flex justify-content-between"
                        style={{ backgroundColor: "#DCDCDC" }}
                        key={key}
                      >
                        <div>
                          <div>

                            <a
                              href={process.env.REACT_APP_DOCUMENT_2 + item.doc_path}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <i className="fas fa-file me-2"></i> {t('Document')} #
                              {item.id}{" "}{item.name}
                            </a>
                          </div>
                          <div>
                            {/* <a
                              href={process.env.REACT_APP_DOCUMENT_2 + item.doc_path}
                              target="_blank"
                              rel="noreferrer"
                            >
                              {item.doc_path}
                            </a> */}
                          </div>
                        </div>
                        <span>
                          {" "}
                          {moment(item?.created_at).format("DD MMM YYYY")}
                        </span>
                      </div>
                    ))}
                    {/* <div className="d-flex justify-content-end">
                      <span className="p-1">Show more documents</span>
                    </div> */}
                  </div>
                </CardBody>
              </Card>
            </div>
          </Col>
          <Col md={1}></Col>
        </Row>
      </div>
    </React.Fragment >
  );
};

const mapStateToProps = gstate => {
  const {
    property_list_t_id_data,
    property_list_t_id_loading,
    jobs_list_by_id_ot_data,


    current_balance_ownerPanel_data,
    current_balance_ownerPanel_error,
    current_balance_ownerPanel_loading,

    chart_data,

    owner_panel_doc_data
  } = gstate.OTDashboard;

  const { property_info_data, property_info_error, property_info_loading } =
    gstate.property;

  const { jobListById_show_data, jobListById_show_loading } = gstate.Jobs;

  const {
    listing_list_inspection_info_data,
    listing_list_inspection_info_loading,
  } = gstate.Listing;

  const { } = gstate.Login;

  return {
    property_info_data,
    property_info_error,
    property_info_loading,
    jobListById_show_data,
    jobListById_show_loading,
    listing_list_inspection_info_data,
    listing_list_inspection_info_loading,
    property_list_t_id_data,
    property_list_t_id_loading,
    jobs_list_by_id_ot_data,

    current_balance_ownerPanel_data,
    current_balance_ownerPanel_error,
    current_balance_ownerPanel_loading,

    chart_data,

    owner_panel_doc_data
  };
};

export default withRouter(
  connect(mapStateToProps, {
    getPropertyInfo,
    JobsListById,
    ListingListInspectionInfo,
    propertyListForOwnerById,
    JobsListByIdOT,
    currentBalanceInfoOwnerById,
    financialChartData,
    ownerPanelDoc
  })(OTPropertyInfo2)
);
