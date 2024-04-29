import moment from 'moment';
import React, { useState } from 'react'
import { Card, CardBody, Col, Row, Tooltip } from 'reactstrap';
import TooltipVisibility from './TooltipVisibility';

// const TooltipMemo = React.memo(TooltipVisibility);

export default function Documents({ data }) {
    console.log(data);
    return (
        <div
            style={{
                maxHeight: "380px",
                overflowY: "auto",
                overflowX: "hidden",
            }}
        >
            <Row>


                {data.map(
                    (element, idx) => {
                        return (
                            <Col md={4} key={element.id}>


                                <Card>
                                    <CardBody>



                                        <div className="d-flex flex-column justify-content-between" style={{
                                            minHeight: '90px'
                                        }}>

                                            <div className="d-flex justify-content-start align-items-center">

                                                <div className="col-md-1 d-flex justify-content-start align-items-center">
                                                    {element.owner_id && <i className="fas fa-home me-2" style={{ fontSize: '18px' }}></i>}
                                                    {element.tenant_id && <i className="bx bxs-group me-2" style={{ fontSize: '18px' }}></i>}
                                                </div>
                                                <div className='col-md-9 ps-2'>
                                                    <a
                                                        href={
                                                            process.env.REACT_APP_IMAGE +
                                                            element.doc_path
                                                        }
                                                        target="_blank"
                                                        rel="noreferrer noopener"
                                                    >

                                                        {element.name == null
                                                            ? element.doc_path.slice(
                                                                0,
                                                                13
                                                            ) + "..."
                                                            : element.name}

                                                    </a>
                                                </div>

                                                {element.owner_id &&
                                                    <TooltipVisibility visibility={'visible'} text='to owner'
                                                        placement='right' direction='TooltipRight'
                                                    />}
                                                {element.tenant_id &&
                                                    <TooltipVisibility visibility={'visible'} text='to tenant'
                                                        placement='bottom' direction='TooltipBottom'
                                                    />}
                                            </div>


                                            <Row className='d-flex'>
                                                <Col md={1}>
                                                    <i className="fas fa-file me-2"></i>

                                                </Col>
                                                <Col md={10} className=''>
                                                    {(
                                                        Number(
                                                            element.file_size
                                                        ) / 1024
                                                    ).toFixed(2) +
                                                        " " +
                                                        "kb"}
                                                </Col>
                                            </Row>


                                            <Row className='d-flex'>
                                                <Col md={1}>
                                                    <i className="far fa-clock me-2" />

                                                </Col>
                                                <Col md={10}>
                                                    {moment(
                                                        element?.created_at
                                                    ).format("DD MMM YYYY")}
                                                </Col>
                                            </Row>




                                        </div>

                                    </CardBody>
                                </Card>
                            </Col>
                        );
                    }
                )}
            </Row>
        </div>
    )
}
