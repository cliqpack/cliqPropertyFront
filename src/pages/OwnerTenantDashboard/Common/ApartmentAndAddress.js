import React from 'react'
import { Badge, Card, CardBody, Col, Row } from 'reactstrap'
import { withTranslation, useTranslation } from "react-i18next";


export default function ApartmentAndAddress({ propertyData, address }) {
    const { t } = useTranslation();
    return (

        <Row className="custom_card_border_design py-3 mx-1 my-4">

            <Col md={4} className="mt-3 text-sm-start">
                <address>
                    <strong>({t('Property')}) {propertyData?.reference}</strong>
                    {/* <br />
                    <br /> */}
                    {/* <div>
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
                    </div> */}
                </address>
            </Col>
            <Col md={8}>

                <div className="d-flex flex-column align-items-end">
                    {/* <span className="my-2">{t('Apartment')}</span> */}
                    <span className="d-flex flex-wrap text-muted justify-content-start ms-1 mt-3">
                        <Badge className='py-2 px-3 bg-info'>
                            <span>
                                {/* <span className="font-size-11">{t('Bedroom')}</span>{" "} */}
                                <i className="fas fa-bed font-size-14 mx-1"></i>{" "}
                                <span className="font-size-12">
                                    ({propertyData?.bedroom || '0'})
                                </span>
                            </span>
                        </Badge>
                        <Badge className='py-2 px-3 mx-3 bg-secondary'>
                            <span>
                                {/* <span className="font-size-11">{t('Bathroom')}</span>{" "} */}
                                <i className="fas fa-bath font-size-14 mx-1"></i>{" "}
                                <span className="font-size-12">
                                    ({propertyData?.bathroom || '0'})
                                </span>
                            </span>
                        </Badge>
                        <Badge className='py-2 px-3 bg-success'>
                            <span>
                                {/* <span className="font-size-11">{t('Car')} {t('space')}</span>{" "} */}
                                <i className="fas fa-car font-size-14 mx-1"></i>{" "}
                                <span className="font-size-12">
                                    ({propertyData?.car_space || '0'})
                                </span>
                            </span>
                        </Badge>
                    </span>
                </div>
            </Col>


        </Row>

    )
}
