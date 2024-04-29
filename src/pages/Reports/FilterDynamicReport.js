import React, { Fragment } from "react";
import { Card, CardBody, Row } from "reactstrap";

export default function FilterDynamicReport(props) {

    return <Fragment>
        <div className="d-flex justify-content-between">
            <div>
                { props.downloadButtons }
            </div>
            <div>
                { props.rightSideButtons }
            </div>
        </div>
        <Card className="mt-4">
            <CardBody>
                <Row>
                    { props.children }
                </Row>
            </CardBody>
        </Card>
    </Fragment>
}