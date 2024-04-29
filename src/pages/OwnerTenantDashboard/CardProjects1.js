import React from "react";
import PropTypes from "prop-types";
import { Link, useHistory } from "react-router-dom";
import { map } from "lodash";
import { Badge, Card, CardBody, Col } from "reactstrap";
import images from "assets/images";
import companies from "assets/images/companies";
import moment from "moment";
import Img from '../../assets/Property/3.jpg'
import { withTranslation, useTranslation } from "react-i18next";



const CardProjects1 = (props) => {
    console.log(props.data, '----');
    const history = useHistory();
    const { t } = useTranslation();

    const data = props.data;
    // console.log(data);

    const address = data.property_address;
    const labels = data.properties_level;

    const propLinkHandler = () => {
        if (props.ownerProp) {
            history.push(`/info/${data.id}`);
        } else {
            history.push(`/DashboardTenantInfo/${data.id}`)
        }
    }

    const propertyImage = props.data.property_images?.[props.data.property_images?.length - 1]?.property_image;
    // console.log(propertyImage);


    return (
        <React.Fragment>



            <Col xl="4" sm="12" onClick={propLinkHandler}>
                <Card style={{ borderRadius: "25px", minHeight: '380px' }}>
                    <CardBody style={{ padding: 0, borderRadius: "25px" }} className='d-flex flex-column'>

                        <img src={propertyImage ? process.env.REACT_APP_IMAGE + propertyImage : Img} style={{ objectFit: 'cover', height: '200px', borderRadius: "25px" }} />


                        <div className="d-flex flex-column px-4 py-3">
                            <div className="d-flex align-items-center">
                                <div className="avatar-sm me-4">
                                    <span className="avatar-title rounded-circle bg-light text-danger font-size-16">
                                        {data.owner ? data.owner.slice(0, 1) : ''}
                                        {data.tenant ? data.tenant.slice(0, 1) : ''}
                                    </span>
                                </div>
                                <div className="d-flex flex-column justify-content-between w-75">
                                    <span className="text-muted py-1">
                                        <span><b>{data.reference}</b></span>
                                    </span>
                                    <div className="d-flex justify-content-between py-1">
                                        <span className="d-flex flex-column">

                                            {data?.owner && <span><b>{t('Owner')}:</b> {data?.owner}</span>}
                                            {props.tenantProp && < span > <b>{t('Tenant')}:</b> {data?.tenant}</span>}

                                        </span>
                                        <span>
                                            <span><b>{t('Manager')}:</b> {data?.manager}</span>
                                        </span>
                                    </div>
                                    <div className="d-flex flex-wrap justify-content-between pt-2">
                                        {labels?.map((item, i) =>
                                            <Badge key={i}>
                                                {item.labels}
                                            </Badge>
                                        )

                                        }
                                        <div>
                                            <i className="bx bx-calendar me-1" />
                                            {
                                                moment(data.created_at).utc().format('YYYY-MM-DD')
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>



                            <div className="border-top my-3" />




                            <div className="d-flex flex-column align-items-center">
                                <span className="d-flex flex-wrap text-muted justify-content-start ms-1">
                                    <Badge className="py-2 px-2 me-1 bg-info" style={{ borderRadius: '10px' }}>
                                        <span className="px-3">
                                            <span className="font-size-10"></span> <i className="fas fa-bed font-size-14 mx-1"></i> <span className="font-size-12">({data?.bedroom || '0'})</span>
                                        </span>
                                    </Badge>
                                    <Badge className="py-2 px-2 me-1 bg-secondary" style={{ borderRadius: '10px' }}>
                                        <span className="px-3">

                                            <span className="font-size-10"></span>  <i className="fas fa-bath font-size-14 mx-1"></i> <span className="font-size-12">({data?.bathroom || '0'})</span>
                                        </span>
                                    </Badge>
                                    <Badge className="py-2 px-2 bg-success" style={{ borderRadius: '10px' }}>
                                        <span className="px-3">
                                            <span className="font-size-10"></span> <i className="fas fa-car font-size-14 mx-1"></i> <span className="font-size-12">({data?.car_space || '0'})</span>
                                        </span>
                                    </Badge>
                                </span>
                            </div>

                        </div>



                    </CardBody>
                </Card>
            </Col>


        </React.Fragment >
    );
};

export default CardProjects1;