import React from "react";
import PropTypes from "prop-types";
import { Link, useHistory } from "react-router-dom";
import { map } from "lodash";
import { Badge, Card, CardBody, Row, Col } from "reactstrap";
import images from "assets/images";
import companies from "assets/images/companies";
import moment from "moment";
import { withTranslation, useTranslation } from "react-i18next";


const CardProjectForInspection = (props) => {
    const history = useHistory();
    const { t } = useTranslation();

    const data = props.data;
    console.log(data);
    const inspectionLinkHandler = (id) => {
        if (moment(new Date()).isAfter(data?.inspection_date)) {
            history.push(`/ot-inspectionInfo/${id}`)
        }
    }



    return (
        <React.Fragment>


            <Col xl="4" sm="12" onClick={e => inspectionLinkHandler(data?.id)}>

                <Card>
                    <CardBody>
                        <div >
                            <Row>
                                {/* <Col md={3}>
                                    <div className="avatar-md me-4">
                                        <span className="avatar-title rounded-circle bg-light text-danger fa-2x">

                                            {data?.reference?.slice(0, 1)}
                                        </span>
                                    </div>
                                </Col> */}
                                <div className="d-flex justify-content-start">
                                    <Col md={6}>
                                        <p className="fw-bold">Inspection:</p>
                                    </Col>
                                    <Col md={6}>
                                        <Badge className={data?.inspection_type == 'Routine' ? 'bg-info' : data?.inspection_type == 'Entry' ? 'bg-success' : 'bg-danger'} style={{ padding: '5px' }}>
                                            {t(data?.inspection_type)}

                                        </Badge>
                                    </Col>
                                </div>
                                <hr style={{ padding: "0px", margin: "0px" }} />

                                <div className="d-flex justify-content-between mt-2">
                                    <Col md={6}>
                                        <p className="fw-bold">  {t('Inspection')} {t('at')}{" "}</p>
                                    </Col>
                                    <Col md={6}>
                                        <span className="">
                                            {t(data?.reference)}
                                        </span>
                                    </Col>
                                </div>



                                <div className="d-flex justify-content-between mt-2">
                                    <Col md={6}>
                                        <p className="fw-bold">  {t('Finished')} {t('on')}{" "}</p>
                                    </Col>
                                    <Col md={6}>
                                        <span className="">
                                            {moment(new Date()).isAfter(data?.inspection_date) ? `Finished on ${moment(data?.inspection_date).format("dddd, MMMM Do YYYY")}` : 'Upcoming'}
                                        </span>
                                    </Col>
                                </div>


                                <div className="d-flex justify-content-between mt-2">
                                    <Col md={6}>
                                        <p className="fw-bold">  {t('Report')}{" "}</p>
                                    </Col>
                                    <Col md={6}>
                                        <span className="my-1">
                                            <i className="fas fa-file me-1"></i>
                                            <span className="me-1">{t('Report')}</span>
                                            <span className="me-1">{t('available')}</span>
                                        </span>
                                    </Col>
                                </div>




                                {/* <Col md={12} className='ms-3'>

                                    <div className="d-flex flex-column ps-2">
                                        <div className="flex-grow-1 overflow-hidden">
                                            <Badge className={data?.inspection_type == 'Routine' ? 'bg-info' : data?.inspection_type == 'Entry' ? 'bg-success' : 'bg-danger'} style={{ padding: '5px' }}>
                                                {t(data?.inspection_type)}

                                            </Badge>
                                            <span className="ms-2">
                                                <span> -{t('inspection')} {t('at')} {data?.reference}</span>
                                            </span>
                                        </div>
                                        <span className="my-1">
                                            <i className="fas fa-file me-1"></i>
                                            <span className="me-1">{t('Report')}</span>
                                            <span className="me-1">{t('available')}</span>
                                        </span>
                                        <span className="">
                                            {moment(new Date()).isAfter(data?.inspection_date) ? `Finished on ${moment(data?.inspection_date).format("dddd, MMMM Do YYYY")}` : 'Upcoming'}
                                        </span>


                                    </div>

                                </Col> */}
                            </Row>



                        </div>

                    </CardBody>

                </Card>
            </Col>


        </React.Fragment>
    );
};

export default CardProjectForInspection;