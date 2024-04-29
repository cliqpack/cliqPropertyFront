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
  Button,
  Badge,
  CardImg,
  Alert,
  Card,
  CardBody,
  CardTitle,
} from "reactstrap";
import { useHistory, useParams, withRouter } from "react-router-dom";
import { map } from "lodash";
import { projects } from "./Data";
import classnames from "classnames";
import {
  ListingListInspectionInfo,
  InspectionDetailsInfoData,
  InspectionInfoData,
  InspectionInfoDataOT,
  getPropertyInfo,
} from "store/actions";
import moment from "moment";
import Img from "../../assets/Property/5.jpg";
import OTHeader from "./OTHeader";
import { withTranslation, useTranslation } from "react-i18next";
import ApartmentAndAddress from "./Common/ApartmentAndAddress";


const OTInspectionInfo = props => {
  const { id } = useParams();
  const { t } = useTranslation();

  const [init, setInit] = useState(true);

  const propertyImage =
    props.property_list_t_id_data?.data[0]?.owner_properties[0]?.property_image;

  // console.log(props.inspection_info_ot_data?.data);
  const roomData = props.inspection_info_ot_data?.data;
  console.log(props.inspection_info_ot_data?.inspection?.inspection_routine_overview);
  console.log(roomData);
  const data = props.inspection_info_data?.data?.data;
  // console.log(props.inspection_info_data?.data?.data);

  const propertyData = props.property_info_data?.data?.data;
  const address = data?.address;
  // console.log(address);
  // console.log(propertyData);

  useEffect(() => {
    if (init) {

      props.InspectionInfoData(id);
      props.InspectionInfoDataOT(id);




      setInit(false);
    }
    if (data) {
      props.getPropertyInfo(data?.property_id);
    }
  }, [data]);
  const [roomInfo, setRoomInfo] = useState(roomData?.[0]);
  const handleRoomInfo = (data) => {
    console.log(data);
    setRoomInfo(data)
  }
  return (
    <React.Fragment>
      <div id="layout-wrapper">
        <OTHeader text="1" />
        <div className="main-content">
          <div>
            {/* <div>
              <CardImg
                src={propertyImage ? propertyImage : Img}
                className="img-fluid"
                style={{ height: "300px", objectFit: "cover" }}
              />
            </div> */}
            <Row style={{ marginTop: "80px" }}>
              <Col md={1}></Col>
              <Col md={10}>
                <ApartmentAndAddress propertyData={propertyData} address={address} />
                <Row>
                  <Col md={8}>
                    <div>
                      <Card className="custom_card_border_design me-2">
                        <CardBody>
                          <div>
                            <span className="font-weight-bold">
                              {t(data?.inspection_type)}
                            </span>{" "}
                            - <span>{data?.reference}</span>
                          </div>
                          <div className="py-1">
                            <span>
                              {t('Inspect')} {t('Date')}:
                              {" " + moment(data?.inspection_date).format(
                                "MMMM Do YYYY"
                              )}
                            </span>
                          </div>
                        </CardBody>
                      </Card>

                      <div>
                        <Row>

                          <div>
                            <span>{t('Areas')} {t('of')} {t('note')}</span>
                            <hr />
                          </div>

                          <Col md={3}>
                            {roomData ? roomData?.map(
                              (data, i) =>
                                data?.delete_status == "false" && (
                                  <div key={i}>

                                    <Button className="w-100 mb-2" onClick={() => handleRoomInfo(data)}>
                                      {data?.room}
                                    </Button>

                                  </div>
                                )
                            ) : <p className="lead">{t('No')} {t('report')} {t('done')} {t('yet')}</p>}
                          </Col>

                          <Col md={9}>
                            {roomInfo ?
                              roomInfo?.delete_status == "false" && (
                                <div>
                                  <Card className="custom_card_border_design me-2">
                                    <CardBody>
                                      <CardTitle className="h4 mt-0">
                                        {roomInfo?.room}
                                      </CardTitle>
                                      {roomInfo?.inspectin_details.map((item, j) => {
                                        return (
                                          <span
                                            className="font-14 text-muted"
                                            key={j}
                                          >
                                            {item?.room_attributes}
                                          </span>
                                        );
                                      })}
                                    </CardBody>
                                    <Row>
                                      {roomInfo?.inspectin_details.map((item, j) =>
                                        item?.room_image?.map((item2, k) => (
                                          <Col md={6} key={k}>
                                            <CardImg
                                              className="img-fluid w-100 ps-3 pb-2"
                                              src={
                                                item2?.image_path
                                                  ? `${process.env.REACT_APP_IMAGE}${item2?.image_path}`
                                                  : ""
                                              }
                                            />
                                          </Col>
                                        ))
                                      )}
                                    </Row>
                                  </Card>
                                </div>
                              )
                              : <p className="lead">{t('No')} {t('report')} {t('done')} {t('yet')}</p>}
                          </Col>
                        </Row>
                      </div>
                    </div>
                  </Col>
                  <Col md={4}>
                    <Card className="custom_card_border_design me-2">
                      <CardBody>


                        <div>
                          <span>
                            {t('General')} {t('Comments')}: <br />
                            {props.inspection_info_ot_data?.inspection?.inspection_routine_overview?.general_notes}
                          </span>
                        </div>
                      </CardBody>
                    </Card>
                    <hr />

                    <Card className="custom_card_border_design me-2">
                      <CardBody>
                        <div className="d-flex flex-column py-1">
                          <span className="py-1">{t('Suggested')} {t('follow')}-{t('up')} {t('actions')} </span>
                          <span className="py-1">{props.inspection_info_ot_data?.inspection?.inspection_routine_overview?.follow_up_actions
                          }</span>
                        </div>
                      </CardBody>
                    </Card>

                    <hr />
                    <Card className="custom_card_border_design me-2">
                      <CardBody>
                        <div className="py-1">
                          <span>{t('Documents')}</span>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </Col>
              <Col md={1}></Col>
            </Row>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = gstate => {
  const {
    listing_list_inspection_info_data,
    listing_list_inspection_info_loading,
  } = gstate.Listing;

  const { inspection_info_ot_data } = gstate.OTDashboard;

  const {
    inspection_info_data,
    inspection_info_error,
    inspection_info_loading,
  } = gstate.Inspections;

  const { property_info_data, property_info_error, property_info_loading } =
    gstate.property;

  return {
    listing_list_inspection_info_data,
    listing_list_inspection_info_loading,
    inspection_info_data,
    inspection_info_error,
    inspection_info_loading,

    inspection_info_ot_data,

    property_info_data,
    property_info_error,
    property_info_loading,
  };
};

export default withRouter(
  connect(mapStateToProps, {
    ListingListInspectionInfo,
    InspectionDetailsInfoData,
    InspectionInfoData,
    InspectionInfoDataOT,
    getPropertyInfo,
  })(OTInspectionInfo)
);
