import React, { useEffect, useState, useRef } from "react";
import { useParams, withRouter, useHistory } from "react-router-dom";
import {
    Container,
    Row,
    Col,
} from "reactstrap";
import moment from "moment";
import { connect } from "react-redux";
import { ownerStatementReport, ownerStatementReportFresh, storeAttachmentForSendInEmail } from "store/actions";
import Loder from "components/Loder/Loder";
import Select from "react-select";
import iframeImage from '../../../../assets/images/folioLedger.pdf'

function OwnerStatementReport(props) {
    const { id, property_id } = useParams();
    const history = useHistory();
    const iframeRef = useRef(null);
    const [dummyImage, setDummyImage] = useState(iframeImage);
    const [selectedDate, setSelectedDate] = useState({});
    const [optionGroupDate, setOptionGroupDate] = useState([]);
    const [loader, setLoader] = useState(false);
    const startLoader = () => setLoader(true);
    const endLoader = () => setLoader(false);
    const handleSelectDate = e => {
        setSelectedDate(e);
    };
    const sendDocumentHandler = async () => {
        const response = await fetch(`${process.env.REACT_APP_IMAGE + selectedDate.value}`);
        const blob = await response.blob();

        const formData = new FormData();
        formData.append('image[]', blob, 'file.pdf');
        props.storeAttachmentForSendInEmail(formData);
        history.push('/messages', { uploaded: true });
    }
    const handleDownload = async () => {
        const pdfUrl = process.env.REACT_APP_IMAGE + selectedDate.value;
        try {
            const response = await fetch(pdfUrl);
            const blob = await response.blob();
            
            // Create a temporary URL and trigger a download
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'statement.pdf'; // Set a default filename
            document.body.appendChild(a);
            a.click();
            
            // Clean up
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Error downloading the PDF:", error);
        }
    };
    
    const handlePrint = () => {
        if (iframeRef.current) {
            // Access the content window of the iframe and trigger the print
            iframeRef.current.contentWindow.focus(); // Ensure the iframe has focus
            iframeRef.current.contentWindow.print();
        }
    };
    useEffect(() => {
        props.ownerStatementReport(id, property_id)
    }, [])
    useEffect(() => {
        if (props.owner_statements_loading == 'Success') {
            let option, doc_path_data, doc_path_label;
            if (props.owner_statements?.data) {
                option = props.owner_statements?.data.map((item, index) => {
                    let formattedDate = moment(item.created_at).format('DD/MM/YYYY');
                    if (index == 0) {
                        doc_path_data = item.doc_path
                        doc_path_label = `#${item.id} - ${formattedDate}`
                    }
                    return {
                        label: `#${item.id} - ${formattedDate}`, value: item.doc_path
                    }
                });
                setOptionGroupDate(option);
                setSelectedDate({ label: doc_path_label, value: doc_path_data });
            }
            props.ownerStatementReportFresh()
        }
    }, [props.owner_statements_loading])
    console.log(selectedDate);


    return <div className="page-content">
        {loader && <Loder status={loader} />}
        <Container fluid={true} style={{ height: '800px' }}>
            <h4 className="text-primary py-2">Statements</h4>
            <Row className="mb-4">
                <Col md="4">
                    <div className="mb-4 select2-container">
                        <Select
                            value={selectedDate}
                            onChange={handleSelectDate}
                            options={optionGroupDate}
                            classNamePrefix="select2-selection"
                            placeholder='Select Statement'
                        />
                    </div>
                </Col>
            </Row>
            {
                selectedDate?.value &&
                <div style={{ height: '100%' }}>
                    <div className="d-flex justify-content-end align-items-center py-2 px-4">
                        <div className="button-items">
                            {/* <a href={process.env.REACT_APP_IMAGE + selectedDate.value} download="statement.pdf" className="download-button"> */}
                                <button type="button" className="btn btn-secondary" onClick={handleDownload}>
                                    <i className="fas fa-download me-1" />  Download
                                </button>
                            {/* </a> */}
                            <button type="button" className="btn btn-secondary" onClick={handlePrint}>
                                <i className="fas fa-print me-1" />  Print
                            </button>

                            {/* <a className="btn btn-secondary" rel="noopener noreferrer" >
                        <i className="far fa-file-pdf me-1" />  PDF
                    </a> */}
                            <button type="button" className="btn btn-secondary"
                                onClick={sendDocumentHandler}
                            >
                                <i className="fas fa-envelope me-1" />  Send in Email
                            </button>
                        </div>
                    </div>
                    <iframe ref={iframeRef} src={process.env.REACT_APP_IMAGE + selectedDate.value} height="100%" style={{ width: "100%", height: "100%", repeat: 'no-repeat', objectFit: "contain", overflow: "auto", position: 'center' }} />
                    {/* <iframe ref={iframeRef} src={iframeImage} height="100%" style={{ width: "100%", height: "100%", repeat: 'no-repeat', objectFit: "contain", overflow: "auto", position: 'center' }} /> */}
                </div>
            }

        </Container>
    </div>
}

const mapStateToProps = gstate => {
    const { owner_statements, owner_statements_loading } = gstate.AccountsTransactions;
    return {
        owner_statements, owner_statements_loading
    };
};

export default withRouter(
    connect(mapStateToProps, {
        ownerStatementReport, ownerStatementReportFresh, storeAttachmentForSendInEmail
    })(OwnerStatementReport)
);