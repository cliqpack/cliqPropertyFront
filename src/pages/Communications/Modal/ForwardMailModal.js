import React, { useState, useRef, useEffect } from "react";
import { useParams } from 'react-router-dom';
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Row,
    Col
} from "reactstrap";
import Select from "react-select";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";
import { TagsInput } from "react-tag-input-component";
import axios from "axios";
import toastr from "toastr";

const ForwardMailModal = (props) => {
    const timestamp = props.date;
    const dateObj = new Date(timestamp);
    const formattedDate = dateObj.toLocaleString();
    const { id } = useParams();

    const [state, setState] = useState({
        modal: false,
        loader: false,
        selectedContact: "",
        subject: "",
        body: "",
    });

    useEffect(() => {
        const originalMessage = `\n\nFrom: &lt;${props.from}&gt;<br/>Sent: ${formattedDate}<br/>To: &lt;${props.to}&gt;<br/>Subject: ${props.subject}<br/><br/>${props.body || ''}`;

        let replyChain = '';

        // Append all replies to the body with a divider between them
        if (props.reply && props.reply.length > 0) {
            props.reply.forEach((reply) => {
                const replyDate = new Date(reply.created_at).toLocaleString();
                replyChain += `<div style="margin: 20px 0; text-align: left;">---------------</div>`; // Divider between replies
                replyChain += `\n\nFrom: &lt;${reply.from}&gt;<br/>Sent: ${replyDate}<br/>To: &lt;${reply.to}&gt;<br/>Subject: ${reply.subject}<br/><br/>${reply.body || ''}`;
            });
        }

        setState((prev) => ({
            ...prev,
            mail_id: props.id,
            subject: `Fw: ${props.subject}`,
            body: `${originalMessage}${replyChain}`, // Combine original message and replies with dividers
        }));
    }, [props]);

    const [opencc, setOpencc] = useState(false);
    const [selectedCC, setSelectedCC] = useState([]);
    const [selectedBCC, setSelectedBCC] = useState([]);
    const [attached, setAttached] = useState([]);

    const [contacts, setContacts] = useState([]);
    const [isContactLoading, setIsContactLoading] = useState(false);
    const [text, setText] = useState('');
    const [typingTimeout, setTypingTimeout] = useState(null);

    const inputFileProp = useRef(null);

    const togglemodal = () => {
        props.setOpenForwardModal(false)
    };

    const selectHandlerForMessage = (selected) => {
        setState((prev) => ({ ...prev, selectedContact: selected }));
    };

    const handleSubejctChange = (e) => {
        setState((prev) => ({ ...prev, subject: e.target.value }));
    }

    const handleMulti3 = (e) => {
        setSelectedCC(e);
    };

    const handleMulti4 = (e) => {
        setSelectedBCC(e);
    };

    useEffect(() => {
        // Extract original attachments
        const attachments = props?.attached?.map(item => ({
            id: item?.attachemnt?.id,
            file_size: item?.attachemnt?.file_size,
            name: item?.attachemnt?.name,
            path: item?.attachemnt?.doc_path
        })) || [];

        // Extract and format reply attachments
        const replyAttachments = (props.reply || []).flatMap(reply =>
            reply.mail_attachment?.map(mailAttachment => ({
                id: mailAttachment.attachemnt.id,
                file_size: mailAttachment.attachemnt.file_size,
                name: mailAttachment.attachemnt.name,
                path: mailAttachment.attachemnt.doc_path
            })) || []
        );

        // Combine original and reply attachments
        const formattedAttachments = [...attachments, ...replyAttachments];

        // Set the formatted attachments
        setAttached(formattedAttachments);
    }, [props.attached, props.reply]);



    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'image/jpeg', 'image/png', 'image/gif'];

    const handleAttachment = async (e) => {
        const file = e.target.files[0]
        if (!allowedTypes.includes(file.type)) {
            toastr.error("File must be of type pdf, xls, xlsx, doc, docx, jpg, jpeg, png, gif")
            return;
        }

        const files = e.target.files;
        const formData = new FormData();

        for (let i = 0; i < files.length; i++) {
            formData.append('image[]', files[i]);
        }

        const authUser = JSON.parse(localStorage.getItem("authUser"));
        const headers = {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${authUser.token}`
        };
        const uploadURL = `${process.env.REACT_APP_LOCALHOST}/mail/attachment`;
        props.updateLoader(true)
        try {
            const response = await axios.post(uploadURL, formData, { headers: headers });
            setAttached((prev) => [...prev, ...response.data.data]);
            props.updateLoader(false)
        } catch (error) {
            toastr.error("Failed to upload attachments. Please try again.");
            console.error('Error uploading attachments:', error);
            props.updateLoader(false)
        }
    };

    useEffect(() => {
        const authUser = JSON.parse(localStorage.getItem("authUser"));
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authUser.token}`
        };
        const contactListUrl = `${process.env.REACT_APP_LOCALHOST}/message/recipients`;

        const fetchOptionContacts = async () => {
            try {
                setIsContactLoading(true);
                const response = await axios.post(contactListUrl, { text: text }, { headers: headers });
                const formattedContacts = response.data.data.map(contact => ({
                    label: `${contact.display} ( ${contact.email} )`,
                    value: contact.email
                }));
                setContacts(formattedContacts);
            } catch (error) {
                console.error('Error fetching contacts:', error);
            } finally {
                setIsContactLoading(false);
            }
        };

        fetchOptionContacts();
    }, [text])

    const handleSubmitMail = async () => {
        if (Object.keys(state.selectedContact).length === 0) {
            toastr.warning("Please select a contact email");
            return;
        }

        const user = JSON.parse(localStorage.getItem('authUser'));
        const mailData = {
            mail_id: id,
            to: state.selectedContact.value,
            from: user.user.email,
            cc: selectedCC,
            bcc: selectedBCC,
            subject: state.subject,
            body: state.body,
            attached: attached
        };

        const authUser = JSON.parse(localStorage.getItem("authUser"));
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authUser.token}`
        };
        const URL = `${process.env.REACT_APP_LOCALHOST}/message/email/forward`;

        setState((prev) => ({ ...prev, loader: true }));

        try {
            const response = await axios.post(URL, mailData, { headers: headers });
            toastr.success(response.data.message)
            togglemodal();
            setState((prev) => ({ ...prev, loader: false }));
            props.getMailDetails()

            setState({
                selectedContacts: "",
                subject: "",
                body: '',
            });
            setSelectedCC([])
            setSelectedBCC([])
            setAttached([])
        } catch (error) {
            toastr.error("Failed to send email. Please try again.");
            setState((prev) => ({ ...prev, loader: false }));
        }
    };

    const handleInputChange = (newValue) => {
        if (typingTimeout) {
            clearTimeout(typingTimeout);
        }

        const timeoutId = setTimeout(() => {
            setText(newValue);
        }, 500);

        setTypingTimeout(timeoutId);
    };

    return (
        <>
            <Modal
                isOpen={props.openForwardModal}
                role="dialog"
                autoFocus={true}
                centered={true}
                className="exampleModal"
                tabIndex="-1"
            >
                <div className="modal-content">
                    <ModalHeader style={{ backgroundColor: "#153D58" }}>
                        <div className="d-flex justify-content-between">
                            <div>
                                <span className="text-white">New </span>
                                <span className="text-white">Email</span>
                            </div>
                        </div>
                    </ModalHeader>

                    <ModalBody>
                        <form>
                            <div className="mb-3">
                                <Row>
                                    <Col
                                        md="9"
                                        className="d-flex justify-content-between"
                                        style={{ position: "relative", zIndex: "12" }}
                                    >
                                        <Select
                                            value={state.selectedContact}
                                            options={contacts}
                                            onChange={selectHandlerForMessage}
                                            onInputChange={handleInputChange}
                                            placeholder="Select Contacts..."
                                            className="form-control-new w-100"
                                            style={{ position: "absolute" }}
                                            isLoading={isContactLoading}
                                            noOptionsMessage={() => (props.isContactLoading ? "Loading..." : "No options available")}
                                        />
                                    </Col>

                                    <Col md={3} style={{ cursor: "pointer", textAlign: "end" }}>
                                        <p
                                            onClick={() => {
                                                setOpencc((prev) => !prev);
                                            }}
                                        >
                                            cc/bcc
                                            {opencc ? (
                                                <i className="fas fa-angle-up me-1" style={{ padding: "2px" }}></i>
                                            ) : (
                                                <i className="fas fa-angle-down me-1" style={{ padding: "2px" }}></i>
                                            )}
                                        </p>
                                    </Col>

                                    <div
                                        className="w-90 my-1 mx-3"
                                        style={{
                                            borderBottom: "1.2px dotted #c9c7c7",
                                            width: "90%",
                                        }}
                                    ></div>
                                </Row>
                            </div>

                            {opencc && (
                                <>
                                    <div className="mb-3">
                                        <TagsInput
                                            value={selectedCC}
                                            onChange={(e) => handleMulti3(e)}
                                            name="cc"
                                            placeHolder="Add CC and press Enter"
                                            style={{
                                                border: "none",
                                                backgroundColor: "#FFF !important",
                                                width: "100%",
                                            }}
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <TagsInput
                                            value={selectedBCC}
                                            onChange={(e) => handleMulti4(e)}
                                            name="bcc"
                                            placeHolder="Add BCC and press enter"
                                        />
                                    </div>
                                </>
                            )}

                            <div className="mb-3">
                                <Row>
                                    <Col md="9">
                                        <input
                                            type="subject"
                                            name="subject"
                                            placeholder="Subject"
                                            value={state.subject}
                                            onChange={(e) => handleSubejctChange(e)}
                                            style={{
                                                border: "none",
                                                backgroundColor: "#F2F6FA !important",
                                                width: "100%",
                                            }}
                                        />
                                    </Col>
                                    <Col md="3" style={{ textAlign: "end" }}>
                                        <input
                                            type="file"
                                            onChange={handleAttachment}
                                            ref={inputFileProp}
                                            style={{ display: "none" }}
                                            multiple
                                        />
                                        <Button
                                            type="button"
                                            color="secondary"
                                            onClick={() => inputFileProp.current.click()}
                                            className="me-1"
                                        >
                                            <i className="fas fa-paperclip me-1"></i>
                                        </Button>
                                    </Col>

                                    <div
                                        className="w-90 my-1 mx-3"
                                        style={{
                                            borderBottom: "1.2px dotted #c9c7c7",
                                            width: "90%",
                                        }}
                                    ></div>
                                </Row>
                            </div>

                            <CKEditor
                                editor={DecoupledEditor}
                                config={props.editorConfiguration} // Assuming editorConfiguration is passed as a prop
                                data={state.body} // Using props for template data
                                style={{ zIndex: "1" }}
                                onReady={(editor) => {
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
                                    setState((prev) => ({ ...prev, body: data }));
                                }}
                            />
                        </form>

                        <div className="mt-3">
                            {attached?.length > 0 &&
                                attached?.map((item, key) => (
                                    <div key={key} className="bg-info mb-2 p-1">
                                        <a
                                            className="text-light"
                                            href={`${process.env.REACT_APP_DOCUMENT}` + item.path}
                                            target="blank"
                                            rel="noopener noreferrer"
                                        >
                                            {key + 1}
                                            {`.`} {item.name} {` (`}
                                            {Math.floor(Number(item.file_size) / 1024)}
                                            {` kb)`}
                                        </a>
                                    </div>
                                ))}
                        </div>
                    </ModalBody>

                    <ModalFooter>
                        <div>
                            <Button
                                type="button"
                                color="danger"
                                onClick={togglemodal}
                                className="me-1"
                            >
                                <i className="fas fa-times me-1"></i>
                                Close
                            </Button>
                        </div>
                        <div>
                            <Button
                                type="button"
                                color="primary"
                                onClick={handleSubmitMail}
                                className="me-1"
                                disabled={state.loader}
                            >
                                {state.loader ? (
                                    <i className="fas fa-spinner fa-spin me-1"></i>
                                ) : (
                                    <i className="fas fa-paper-plane me-1"></i>
                                )}
                                Send
                            </Button>
                        </div>
                    </ModalFooter>
                </div>
            </Modal>
        </>
    );
};

export default ForwardMailModal;
