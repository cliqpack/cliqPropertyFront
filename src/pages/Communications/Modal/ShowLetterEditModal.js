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
    ModalFooter,
} from 'reactstrap';
import Loader from 'components/Loder/Loder';
import { CKEditor } from "@ckeditor/ckeditor5-react";
import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";
const editorConfiguration = {
    toolbar: [
        "heading",
        "|",
        "bold",
        "italic",
        "underline",
        "fontFamily",
        "fontSize",
        "fontColor",
        "fontBackgroundColor",
        "alignment",
        "|",
        "blockQuote",
        "|",
        "indent",
        "outdent",
        "|",
        "|",
        "numberedList",
        "bulletedList",
        "insertTable",
        "mergeTableCells",
        "mediaEmbed",
        "|",
        "undo",
        "redo",
    ],
    list: {
        properties: {
            styles: true,
            startIndex: true,
            reversed: true,
        },
    },
};


const ShowEditLetterModal = ({ show, toggle, data, fetchOutboxLetter }) => {
    const [loading, setLoading] = useState(false);
    const [body, setBody] = useState(data.body);

    const handleEdit = async () => {
        const authUser = JSON.parse(localStorage.getItem('authUser'));
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authUser.token}`
        };
        const url = `${process.env.REACT_APP_LOCALHOST}/letters/${data.id}`;
        const formData = {
            message: body
        }
        setLoading(true);
        try {
            const response = await axios.put(url, formData, { headers });
            toastr.success(response.data.message);
            setLoading(!loading)
            toggle()
            fetchOutboxLetter(null, "message_with_mails.updated_at", "desc", 1, 10);
        } catch (error) {
            console.error(error.message);
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
                                </Row>
                            </CardHeader>
                            <div className='pt-3'>
                                <CKEditor
                                    editor={DecoupledEditor}
                                    config={editorConfiguration}
                                    data={body}
                                    style={{ zindex: "1" }}
                                    onReady={editor => {
                                        if (editor) {
                                            editor.ui
                                                .getEditableElement()
                                                .parentElement.insertBefore(
                                                    editor.ui.view.toolbar.element,
                                                    editor.ui.getEditableElement()
                                                );
                                        }
                                    }}
                                    onChange={(event, editor) => {
                                        const data = editor.getData();
                                        setBody(data);
                                    }}
                                />
                            </div>
                        </Card>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Col md="3" className="text-end">
                        <Button color="secondary" onClick={toggle} className="me-2">
                            Cancel
                        </Button>
                        <Button color="secondary" onClick={handleEdit}>
                            Update
                        </Button>
                    </Col>
                </ModalFooter>
            </Modal>
        </>
    );
};

export default ShowEditLetterModal;
