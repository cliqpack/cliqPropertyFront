import React, { useState } from 'react';
import axios from 'axios';
import toastr from 'toastr';
import {
    Card,
    Col,
    Row,
    CardText,
    Button,
    CardHeader,
    Modal,
    ModalHeader,
    ModalBody,
} from 'reactstrap';
import Loader from 'components/Loder/Loder';

const ShowLetterModal = ({ show, toggle, data }) => {
    const [loading, setLoading] = useState(false);

    const printLetter = () => {
        const printWindow = window.open('', '');
        printWindow.document.write(`
            <html>
                <head>
                    <style>
                        @media print {
                            @page {
                                margin: 0;
                            }
                            body {
                                font-family: Arial, sans-serif;
                                margin: 60px;
                            }
                        }
                    </style>
                </head>
                <body>
                    <div>${data.body}</div>
                </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.print();
    };

    const downloadLetter = async () => {
        const authUser = JSON.parse(localStorage.getItem('authUser'));
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authUser.token}`
        };
        const url = `${process.env.REACT_APP_LOCALHOST}/letters/${data.id}/download`;

        setLoading(true);
        try {
            const response = await axios.get(url, {
                headers,
                responseType: 'blob'
            });

            const blobUrl = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = blobUrl;
            link.setAttribute('download', `letter_${data.id}.pdf`);

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(blobUrl);

            toastr.success('Letter downloaded successfully');
        } catch (error) {
            toastr.warning('Failed to download letter');
            console.error('Download error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {loading && <Loader status={loading} />}
            <Modal isOpen={show} toggle={toggle} size="lg">
                <ModalHeader toggle={toggle}>
                    <span className='text-primary'>
                        <i className="fas fa-print me-1"></i>Letter
                    </span>
                </ModalHeader>
                <ModalBody>
                    <div className='px-2'>
                        <Card className="p-3">
                            <CardHeader>
                                <Row>
                                    <Col md="9">
                                        <CardText>
                                            <strong>To: </strong>
                                            <span className='text-primary'>{data.recipient_full_name}</span>
                                        </CardText>
                                        <CardText>
                                            <strong>Subject: </strong>
                                            {data.subject}
                                        </CardText>
                                    </Col>
                                    <Col md="3" className="text-end">
                                        <Button color="secondary" onClick={printLetter} className="me-2">
                                            <i className="fas fa-print"></i>
                                        </Button>
                                        <Button color="secondary" onClick={downloadLetter}>
                                            <i className="fas fa-download"></i>
                                        </Button>
                                    </Col>
                                </Row>
                            </CardHeader>
                            <div className='pt-3'>
                                <CardText>
                                    {/* {data.body} */}
                                    <span dangerouslySetInnerHTML={{ __html: data.body }} />
                                </CardText>
                            </div>
                        </Card>
                    </div>
                </ModalBody>
            </Modal>
        </>
    );
};

export default ShowLetterModal;
