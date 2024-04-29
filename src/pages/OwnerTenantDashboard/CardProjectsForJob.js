import React from "react";
import PropTypes from "prop-types";
import { Link, useHistory, useParams } from "react-router-dom";
import { map } from "lodash";
import { Badge, Card, CardBody, Row, Col } from "reactstrap";
import images from "assets/images";
import companies from "assets/images/companies";
import moment from "moment";
import { withTranslation, useTranslation } from "react-i18next";

const CardProjectsForJob = props => {
  const history = useHistory();
  const { t } = useTranslation();


  const data = props.data;

  const jobLinkHandler = id => {
    history.push(`/ot-jobInfo/${id}`);
  };

  return (
    <React.Fragment>
      <Col xl="4" sm="12" onClick={e => jobLinkHandler(data?.id)}>
        <Card>
          <CardBody>
            <div>
              <Row>
                {/* <Col md={3}>
                  <div className="avatar-md me-4">
                    <span className="avatar-title rounded-circle bg-light text-danger fa-2x">

                      {data?.property_reference?.slice(0, 1)}
                    </span>
                  </div>
                </Col> */}
                <Col md={12} className="ms-3">
                  <div className="d-flex flex-column ps-2">
                    {/* <div className="flex-grow-1 overflow-hidden">
                      <Badge
                        className={
                          data?.status == "Closed" ? "bg-info" : "bg-success"
                        }
                        style={{ padding: "5px" }}
                      >
                        {t(data?.status)}
                      </Badge>
                      <span className="ms-2">{data?.description}</span>
                    </div> */}
                    <div className="d-flex justify-content-start">
                      <Col md={6}>
                        <p className="fw-bold">Maintanance:</p>
                      </Col>
                      <Col md={6}>
                        <Badge
                          className={
                            data?.status == "Closed" ? "bg-info" : "bg-success"
                          }
                          style={{ padding: "5px" }}
                        >
                          {t(data?.status)}
                        </Badge>
                      </Col>
                    </div>
                    <hr style={{ padding: "0px", margin: "0px" }} />

                    <div className="d-flex justify-content-between mt-2">
                      <Col md={6}>
                        <p className="fw-bold">  {t('Created')} {t('at')}{" "}</p>
                      </Col>
                      <Col md={6}>
                        <p>  {moment(data?.created_at).format("MMMM Do YYYY")}</p>
                      </Col>
                    </div>

                    <div className="d-flex justify-content-between">
                      <Col md={6}>
                        <p className="fw-bold">{t("Status")}:</p>
                      </Col>
                      <Col md={6}>
                        <p> {t(data?.status)}</p>
                      </Col>
                    </div>



                    {/* <div className="flex-grow-1 overflow-hidden">
                      <span>
                        {t('Created')} {t('at')}{" "}
                        {moment(data?.created_at).format("MMMM Do YYYY")}
                      </span>
                    </div> */}

                    {/* <div>
                      <span>
                        {t(data?.status)}{" "}
                        {data?.completed == null
                          ? ""
                          : "on " +
                          moment(data?.completed).format(
                            "dddd, MMMM Do YYYY"
                          )}
                      </span>
                    </div> */}
                  </div>
                </Col>
              </Row>
            </div>
          </CardBody>
        </Card>
      </Col>
    </React.Fragment>
  );
};

export default CardProjectsForJob;
