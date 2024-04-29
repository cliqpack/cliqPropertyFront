import React from "react"
import { Card, CardBody, CardTitle } from "reactstrap"
export default function ReportList({ title, children }) {
    return <Card className="mt-4">
        <CardBody className="mt-3">
            <CardTitle className="mb-4 h4">{title}</CardTitle>
            <div className="table-responsive mt-4">
                <table className="table align-middle table-nowrap">
                    <tbody>
                        { children }
                    </tbody>
                </table>
            </div>
        </CardBody>
    </Card>
}