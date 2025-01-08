import React, { useEffect, useRef, useState } from "react";
import {
    Link,
    useHistory,
    useLocation,
    useParams,
    withRouter,
} from "react-router-dom";
import { Card, CardBody, Col, Container, Row, Table, CardImg } from "reactstrap";
import { isEmpty, map } from "lodash";


import { JobsListById, sendWorkOrderEmail, sendWorkorderEmailFresh } from "store/actions";
//Import Image
import logo from "../../assets/images/Myday.png";
import PropTypes from "prop-types";
import { getInvoiceDetail } from "../../store/invoices/actions";
import { connect } from "react-redux";
import moment from "moment";
import toastr from "toastr";


document.title = "Work order";


const JobInfoWorkOrderActionInvoice = (props) => {
    const { id } = useParams();
    let history = useHistory();


    useEffect(() => {
        if (props.jobListById_show_loading === false) {
            props.JobsListById(id);
        } else if (props.send_work_order__loading == "Success") {
            toastr.success("Email send Successfully");
            props.sendWorkorderEmailFresh();
        }
    }, [props.jobListById_show_loading, props.send_work_order__loading])



    console.log(props.jobListById_show_data);
    // console.log(props.jobListById_show_loading);
    const data = props.jobListById_show_data?.data;
    console.log(data);

    // const goBack = () => history.push(`/maintenanceInfo/${id}`)
    const goBack = () => window.close();


    //Print the Invoice
    const printInvoice = () => {
        window.print();
    };

    let template = `
    <div class="">
    <div class="container-fluid">
    <div class="row">
    <div class="col-lg-12">
    <div class="card">
    <div class="card-body">

                            <div class="d-flex justify-content-between">
                                <h2 class="text-info font-weight-bold">Work order</h2>
                            </div>
                            <hr />
                            <div class="row">
                            <div class="col-sm-6 mt-3">
                                    <img src=${logo} alt="logo" height="50" />
                                </div>
                                <div class="col-sm-6 mt-3 text-sm-end">

                                    <address>

                                        <strong>(w) 9999 3333</strong>
                                        <br />
                                        <div>
                                            www.mytown.com
                                        </div>
                                        <div>
                                            noreply@propertyme.com
                                        </div>
                                        <div>
                                            46 Hall St <br />
                                            Bondi Beach NSW 2026 <br />

                                        </div>
                                        <div>
                                            ABN:
                                        </div>
                                        <div>
                                            Licence:
                                        </div>
                                    </address>
                                </div>
                            </div>

                            <div class="py-2 mt-3">
                                <h3 class="font-weight-bold">
                                    Work Order

                                </h3>
                            </div>
                            
                                ${data?.maintenance_assign?.supplier &&
        `<div class="row ps-5">
                                    <div class="col-sm-6 mt-3">
                                            <div>
                                                ${data?.maintenance_assign?.supplier?.reference}
                                            </div>
                                            <div class="py-1">
                                                ${data?.maintenance_assign?.supplier?.email}
                                            </div>
                                            <div>
                                                ${data?.maintenance_assign?.supplier?.work_phone}
                                            </div>
                                        </div>

                                        <div class="col-sm-6 mt-3 text-sm-end">
                                            <h4 class="font-weight-bold">
                                                Job number - 000${data?.id}

                                            </h4>
                                            <br />
                                            <div>
                                                Created on:  ${moment(data?.created_at).utc().format('YYYY-MM-DD')}

                                                <br />
                                                Due:  ${data?.due_by}
                                            </div>
                                        </div>
                                    </div>`
        }

                            <hr />
                            <div class="py-2 mt-3">
                                <h4 class="font-weight-bold">
                                    Details
                                </h4>
                            </div>

                            <div class="row">
                            <div class="col-sm-6 mt-3 text-sm-start">
                                    <div>
                                        <p class="font-weight-bold">Property</p>
                                        <address class="ms-3">
                                            ${data?.properties[0]?.reference}
                                        </address>

                                    </div>
                                    <div>
                                        <p class="font-weight-bold">
                                            For access contact the ${data?.properties[0]?.tenant[0] ? 'tenant' : 'owner'} on:

                                        </p>
                                        <p class="ms-2">

                                            ${data?.properties[0]?.tenant[0]?.first_name + ' ' + data?.properties[0]?.tenant[0]?.last_name}
                                        </p>
                                        <div class="ms-5">
                                            <span>
                                                (m) ${data?.properties[0]?.tenant[0]?.mobile_phone} (h) ${data?.properties[0]?.tenant[0]?.home_phone} (w) ${data?.properties[0]?.tenant[0]?.work_phone}

                                            </span>
                                            <br />
                                            <span>
                                                (e) ${data?.properties[0]?.tenant[0]?.email}

                                            </span>
                                        </div>
                                    </div>
                                    <p class="mt-2">Work order issued on behalf of the owner - ${data?.properties[0]?.owner[0]?.reference}
                                    </p>
                                </div>
                            <div class="col-sm-6 mt-3 text-sm-start">
                                    <p class="font-weight-bold">
                                        For queries contact the agent on:

                                    </p>
                                    <div class="ms-2">
                                        <p>
                                            ${data?.manager_first_name + ' ' + data?.manager_last_name}

                                        </p>
                                        <div class="ms-4">
                                            <span class="mb-2">
                                                (m) 8801854764489

                                            </span>
                                            <br />
                                            <span>
                                                (e) abhijit.das@cliqpack.com


                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <hr />


                            <div class="py-2 mt-3">
                                <h3 class="font-weight-bold">
                                    Description

                                </h3>
                            </div>

                            <div class="row">
                            <div class="col-sm-6 mt-3 text-sm-start">
                                    <div>
                                        <p class="font-weight-bold">
                                            Summary
                                        </p>
                                        <span class="ms-3">
                                            ${data?.summary}
                                        </span>
                                    </div>
                                    <div class="mt-2">
                                        <p class="font-weight-bold">
                                            Description
                                        </p>
                                        <span class="ms-3">

                                            ${data?.description}
                                        </span>
                                    </div>
                                    <div class="mt-2">

                                        <p class="font-weight-bold">
                                            Notes
                                        </p>
                                        <span class="d-flex flex-column">
                                            ${data?.work_order_notes}
                                        </span>
                                    </div>
                                </div>
                            <div class="col-sm-6 mt-3 text-sm-end"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </div>
    </div >`

    const [emailTemplate, setEmailTemplate] = useState({
        template,
        email: data?.maintenance_assign?.supplier?.email,
    });

    const sendEmail = () => {
        props.sendWorkOrderEmail(emailTemplate);
    };

    return (
        <React.Fragment>
            <div className="">
                <Container fluid>
                    <Row>
                        <Col lg="12">
                            <Card>
                                <CardBody>

                                    <div className="d-flex justify-content-between">
                                        <h2 className="text-info font-weight-bold">Work order</h2>

                                        <div>
                                            <button
                                                type="button"
                                                className="btn btn-info w-md me-2"
                                                onClick={goBack}
                                            >

                                                <i className="fas fa-times-circle font-size-16 me-1"></i>
                                                Close

                                            </button>
                                            <button
                                                type="button"
                                                className="btn btn-info w-md"
                                                onClick={sendEmail}
                                            >

                                                <i className="fas fa-envelope font-size-16 me-1"></i>
                                                Send in Email

                                            </button>
                                        </div>
                                    </div>
                                    <hr />
                                    <Row>
                                        <Col sm="6" className="mt-3">
                                            <img src={logo} alt="logo" height="50" />
                                        </Col>
                                        <Col sm="6" className="mt-3 text-sm-end">

                                            <address>

                                                <strong>(w) 9999 3333</strong>
                                                <br />
                                                <div>
                                                    www.mytown.com
                                                </div>
                                                <div>
                                                    noreply@propertyme.com
                                                </div>
                                                <div>
                                                    46 Hall St <br />
                                                    Bondi Beach NSW 2026 <br />

                                                </div>
                                                <div>
                                                    ABN:
                                                </div>
                                                <div>
                                                    Licence:
                                                </div>
                                            </address>
                                        </Col>
                                    </Row>

                                    <div className="py-2 mt-3">
                                        <h3 className="font-weight-bold">
                                            Work Order

                                        </h3>
                                    </div>
                                    <Row className="ps-5">
                                        {data?.maintenance_assign?.supplier &&
                                            <>
                                                <Col sm="6" className="mt-3">
                                                    <div>
                                                        {data?.maintenance_assign?.supplier?.reference}
                                                    </div>
                                                    <div className="py-1">
                                                        {data?.maintenance_assign?.supplier?.email}
                                                    </div>
                                                    <div>
                                                        {data?.maintenance_assign?.supplier?.work_phone}
                                                    </div>
                                                </Col>

                                                <Col sm="6" className="mt-3 text-sm-end">
                                                    <h4 className="font-weight-bold">
                                                        Job number - 000{data?.id}

                                                    </h4>
                                                    <br />
                                                    <div>
                                                        Created on:  {moment(data?.created_at).utc().format('YYYY-MM-DD')}

                                                        <br />
                                                        Due:  {data?.due_by}
                                                    </div>
                                                </Col>
                                            </>
                                        }
                                    </Row>

                                    <hr />
                                    <div className="py-2 mt-3">
                                        <h4 className="font-weight-bold">
                                            Details
                                        </h4>
                                    </div>

                                    <Row>
                                        <Col sm="6" className="mt-3 text-sm-start">
                                            <div>
                                                <p className="font-weight-bold">Property</p>
                                                <address className="ms-3">
                                                    {data?.properties[0]?.reference}
                                                </address>

                                            </div>
                                            <div>
                                                <p className="font-weight-bold">
                                                    For access contact the {data?.properties[0]?.tenant[0] ? 'tenant' : 'owner'} on:

                                                </p>
                                                <p className="ms-2">

                                                    {data?.properties[0]?.tenant[0]?.first_name + ' ' + data?.properties[0]?.tenant[0]?.last_name}
                                                </p>
                                                <div className="ms-5">
                                                    <span>
                                                        (m) {data?.properties[0]?.tenant[0]?.mobile_phone} (h) {data?.properties[0]?.tenant[0]?.home_phone} (w) {data?.properties[0]?.tenant[0]?.work_phone}

                                                    </span>
                                                    <br />
                                                    <span>
                                                        (e) {data?.properties[0]?.tenant[0]?.email}

                                                    </span>
                                                </div>
                                            </div>
                                            <p className="mt-2">Work order issued on behalf of the owner - {data?.properties[0]?.owner[0]?.reference}
                                            </p>
                                        </Col>
                                        <Col sm="6" className="mt-3 text-sm-start">
                                            <p className="font-weight-bold">
                                                For queries contact the agent on:

                                            </p>
                                            <div className="ms-2">
                                                <p>
                                                    {data?.manager_first_name + ' ' + data?.manager_last_name}

                                                </p>
                                                <div className="ms-4">
                                                    <span className="mb-2">
                                                        (m) 8801854764489

                                                    </span>
                                                    <br />
                                                    <span>
                                                        (e) abhijit.das@cliqpack.com


                                                    </span>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>

                                    <hr />


                                    <div className="py-2 mt-3">
                                        <h3 className="font-weight-bold">
                                            Description

                                        </h3>
                                    </div>

                                    <Row>
                                        <Col sm="6" className="mt-3 text-sm-start">
                                            <div>
                                                <p className="font-weight-bold">
                                                    Summary
                                                </p>
                                                <span className="ms-3">
                                                    {data?.summary}
                                                </span>
                                            </div>
                                            <div className="mt-2">
                                                <p className="font-weight-bold">
                                                    Description
                                                </p>
                                                <span className="ms-3">

                                                    {data?.description}
                                                </span>
                                            </div>
                                            <div className="mt-2">

                                                <p className="font-weight-bold">
                                                    Notes
                                                </p>
                                                <span className="d-flex flex-column">
                                                    {data?.work_order_notes}
                                                    <CardImg style={{ width: '60%' }} className="img-fluid mt-2" src={data?.jobs_images[0]?.image_path
                                                    } />
                                                </span>
                                            </div>
                                        </Col>
                                        <Col sm="6" className="mt-3 text-sm-end"></Col>

                                    </Row>

                                    <div className="d-print-none">
                                        <div className="float-end">
                                            <Link
                                                to="#"
                                                onClick={printInvoice}
                                                className="btn btn-success me-1"
                                            >
                                                <i className="fa fa-print" />
                                            </Link>{" "}
                                            {/* <Link
                                                        to="#"
                                                        className="btn btn-info w-md"
                                                    >
                                                        Send
                                                    </Link> */}
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row >

                </Container>
            </div >
        </React.Fragment >
    );
};


const mapStateToProps = gstate => {

    const { jobListById_show_loading, jobListById_show_data, getQuote_show_loading, getQuote_show_data, job_modal_edit_loading, supplier_list_loading, supplier_list_data, job_info_image_add_loading, job_status_loading, add_supplier_from_job_loading, job_delete_loading } = gstate.Jobs;
    const { send_work_order__loading } = gstate.Activity;
    return {
        jobListById_show_loading, jobListById_show_data, getQuote_show_loading, getQuote_show_data, job_modal_edit_loading, supplier_list_loading, supplier_list_data, job_info_image_add_loading, job_status_loading, add_supplier_from_job_loading, job_delete_loading, send_work_order__loading
    }
}

export default withRouter(
    connect(mapStateToProps, {
        JobsListById,
        sendWorkOrderEmail,
        sendWorkorderEmailFresh,
    })(JobInfoWorkOrderActionInvoice)
);