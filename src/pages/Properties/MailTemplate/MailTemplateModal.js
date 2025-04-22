import React, { Fragment, useState, useEffect } from "react";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  Modal,
  Row,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Input,
} from "reactstrap";

import MailLogo from "../../../assets/images/mail_realty_me_logo.png";
import { sendEmail, sendEmailFresh } from "store/actions";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";
import toastr from "toastr";
import moment from "moment";

import { withRouter, Link, useParams } from "react-router-dom";
import { connect } from "react-redux";
import parse from "html-react-parser";

const MailTemplateModal = props => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  let mailBody = "";

  // `<div style="background-color: #f7f7f7; padding: 20px">
  //     <div style="width: 50%; margin: auto; background-color: #fff; max-height: 600px;">
  //         <div style="height: 70px; background-color: #556ee6;" className="d-flex justify-content-end pr-3 pt-2">
  //             <img src=${MailLogo} height="90%" width="170px" />
  //         </div>
  //         <div style="padding: 16px;">
  //             <p>Dear Concern,</p>
  //             ${props.data?.inspection_id == null &&
  //     `<p>The job number for your recent request is #${props.data?.maintenance_id}.</p>`
  //     }
  //             <p>${props.data?.property_activity_email[0]?.email_body}</p>
  //             <p>Many thanks,</p>
  //             <p>
  //                 ${authUser.user.first_name + " " + authUser.user.last_name
  //     } <br />
  //                 ${props.data?.property_activity_email[0]?.email_from} <br />
  //                 9999 3333 <br />
  //                 ${authUser.user.email} <br />
  //                 www.mytown.com <br />
  //             </p>
  //         </div>
  //         <div style="height: 70px; background-color: rgba(52,58,64,.25)"></div>
  //     </div>
  // </div>`;

  console.log(props.data);

  const [state, setState] = useState({
    id: props.data?.message?.id,

    to: props.data?.message?.to ? props.data.message?.to : "",
    subject: props.data?.message?.subject ? props.data?.message?.subject : "",
    body: props.data?.message?.body ? props.data?.message?.body : "",
  });

  console.log("--70--");
  console.log(state);

  const [inputState, setInputState] = useState(false);
  const [dropdownBtn, setDropdownBtn] = useState(false);
  const [modalState, setModalState] = useState(false);
  const [editModalState, setEditModalState] = useState(false);

  useEffect(() => {
    if (props.send_email_loading === "Success") {
      toastr.success("Email sent successfully");
      props.sendEmailFresh();
      console.log("fresh");
      tog_large();
    }
  }, [props.send_email_loading]);
  console.log(props.send_email_loading);

  const tog_large = () => {
    setModalState(prevState => !prevState);
  };

  const togx_large = () => {
    setEditModalState(prevState => !prevState);
  };

  const removeBodyCss = () => {
    document.body.classList.add("no_padding");
  };

  // let date = new Date(props.data?.created_at);
  // let dt =
  //     date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();

  const handleEdit = () => {
    tog_large();
    togx_large();
  };

  const handleState = e => {
    setState(prevState => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmitEmail = () => {
    console.log("inside");
    props.sendEmail(state);
  };

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

  return (
    <Fragment>
      {/* <div
                className="py-2  d-flex"
                onClick={tog_large}
                data-toggle="modal"
                data-target=".bs-example-modal-xl"
            >
                <div className="d-flex justify-content-center">
                    <div className="avatar-sm me-2">
                        <span className="avatar-title rounded-circle bg-light text-primary fa-2x">
                            {authUser.user?.first_name.slice(0, 1)}
                        </span>
                    </div>
                </div>
                <div
                    className="w-100"
                    style={{
                        borderBottom: "1.2px dotted #c9c7c7",
                    }}
                >
                    <div className="d-flex justify-content-between">
                        <div>
                            {props.data?.type == "email" && (
                                <i className="fas fa-envelope"></i>
                            )}
                            {props.data?.type == "email_letter" && (
                                <i className="fas fa-file-signature"></i>
                            )}
                            <span className="font-size-13 ms-1 text-info">
                                {" "}
                                {props.data?.property_activity_email[0]?.subject}
                                {props.data?.message?.subject}
                            </span>
                        </div>
                        {props.data?.maintenance?.due_by && (
                  <div>
                    {props.data?.maintenance?.status === "Reported" ? (
                      ""
                    ) : moment(new Date()).isAfter(
                      props.data?.maintenance?.due_by
                    ) == true ? (
                      <span className="text-danger">
                        <i className="far fa-calendar me-1"></i>
                        {props.data?.maintenance?.due_by}
                      </span>
                    ) : (
                      <span className="text-primary">
                        <i className="far fa-calendar me-1"></i>
                        {props.data?.maintenance?.due_by}
                      </span>
                    )}
                  </div>
                )}
                        <div>
                            <i className='far fa-calendar me-1' />
                            {moment(props.data?.message?.created_at).format('DD/MM/yyyy')}</div>
                    </div>
                    <div className="mt-1">
                        <span className="font-size-13 ps-1">
                            To {props.data?.message?.to}
                        </span>
                    </div>
                </div>
            </div> */}
      <Modal
        size="xl"
        isOpen={props.modalState}
        toggle={props.tog_large}
        style={{ width: "70%" }}
      >
        <div className="modal-header">
          <h4
            className="modal-title mt-0 text-primary"
            id="myExtraLargeModalLabel"
          >
            <i className="fas fa-envelope"></i>{" "}
            {props.data?.type == "email" && "Email to"}
            {props.data?.type == "email_letter" && " Letter to "}{" "}
            {/* {props.data?.property_activity_email[0]?.email_to} */}
            {props.data?.message?.to}
          </h4>

          <button
            onClick={props.tog_large}
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          <Row>
            <Col md={9}>
              <Row>
                <Col md={1}>
                  <span style={{ color: "#6e6e6e", fontWeight: "bold" }}>
                    To
                  </span>
                </Col>
                <Col md={7}>
                  <span className="text-primary">
                    {props.data?.message?.to}
                  </span>
                </Col>
                <Col md={4}>
                  <span style={{ color: "#6e6e6e", fontWeight: "bold" }}>
                    Property
                  </span>{" "}
                  <span className="text-primary">
                    {moment(props.data?.created_at).format("DD/MM/yyyy")}
                  </span>
                </Col>
                <Col md={1}>
                  <span style={{ color: "#6e6e6e", fontWeight: "bold" }}>
                    Subject
                  </span>
                </Col>
                <Col md={11}>
                  {/* {props.data?.property_activity_email[0]?.subject} */}
                  {props.data?.message?.subject}
                </Col>
              </Row>
            </Col>
            <Col md={3} className="d-flex">
              <Button
                color="info"
                type="button"
                className="me-2"
                onClick={handleSubmitEmail}
              >
                <i className="fas fa-envelope"></i> Send
              </Button>
              <Dropdown
                isOpen={dropdownBtn}
                toggle={() => setDropdownBtn(prevState => !prevState)}
              >
                <DropdownToggle className="btn btn-secondary" caret>
                  Actions <i className="mdi mdi-chevron-down"></i>
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem onClick={handleEdit}>Edit</DropdownItem>
                  {/* <DropdownItem>Delete</DropdownItem>
                                        <DropdownItem>Report</DropdownItem> */}
                  {/* <hr />
                                        <DropdownItem>
                                            <Link to={'/view-original'} target="_blank" rel="noopener noreferrer">View Original</Link>
                                        </DropdownItem> */}
                </DropdownMenu>
              </Dropdown>
            </Col>
          </Row>
          <hr />
          <div style={{ backgroundColor: "#f7f7f7", padding: "20px" }}>
            <div
              style={{
                width: "50%",
                margin: "auto",
                backgroundColor: "#fff",
                maxHeight: "600px",
              }}
            >
              <div
                style={{ height: "70px", backgroundColor: "#556ee6" }}
                className="d-flex justify-content-end pr-3 pt-2"
              >
                {/* <img src={MailLogo} height="90%" width="170px" /> */}
              </div>

              <div style={{ padding: "16px" }}>
                {/* <p>Dear Concern,</p> */}
                {/* <p>
                      {props.data?.inspection_id == null && (
                        <>
                          The job number for your recent request is #
                          {props.data?.maintenance_id}
                        </>
                      )}
                    </p> */}
                {/* <p>{parse(`${props.data?.property_activity_email[0]?.email_body}`)}</p> */}
                <p>{parse(`${props.data?.message?.body}`)}</p>
                {/* <p>Many thanks,</p> */}
                <p>
                  {/* {authUser.user.first_name + " " + authUser.user.last_name}{" "}
                      <br />
                      {props.data?.property_activity_email[0]?.email_from} <br />
                      9999 3333 <br />
                      {authUser.user.email} <br /> */}
                  www.cliqproperty.com <br />
                </p>
              </div>

              <div
                style={{
                  height: "70px",
                  backgroundColor: "rgba(52,58,64,.25)",
                }}
              ></div>
            </div>
          </div>
        </div>
      </Modal>

      <Modal
        size="xl"
        isOpen={editModalState}
        toggle={togx_large}
        style={{ width: "70%" }}
      >
        <div className="modal-header">
          <h4
            className="modal-title mt-0 text-primary"
            id="myExtraLargeModalLabel"
          >
            <i className="fas fa-envelope"></i> New Email
          </h4>
          <button
            onClick={() => setEditModalState(false)}
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          <div className="input-group mb-3">
            <Button
              color="info"
              type="button"
              id="inputGroupFileAddon03"
              className="btn-sm"
              style={{ backgroundColor: "#f1f1f1", color: "#949494" }}
            >
              To
            </Button>
            <Input
              type="text"
              className="form-control-sm"
              id="inputGroupFile03"
              aria-describedby="inputGroupFileAddon03"
              aria-label="Upload"
              name="to"
              value={state.to}
              onChange={handleState}
            />
            {/* <Button
                                color="info"
                                type="button"
                                id="inputGroupFileAddon03"
                                className="btn-sm"
                                style={{ backgroundColor: '#f1f1f1', color: '#949494' }}
                                onClick={()=>setInputState((prevState)=>!prevState)}
                            >
                                { inputState ? <i className="fas fa-angle-down"></i>
                                : <i className="fas fa-angle-up"></i> }
                            </Button> */}
          </div>
          {inputState && (
            <>
              <div className="input-group mb-3">
                <Button
                  color="info"
                  type="button"
                  id="inputGroupFileAddon03"
                  className="btn-sm"
                  style={{ backgroundColor: "#f1f1f1", color: "#949494" }}
                >
                  Cc
                </Button>
                <Input
                  type="text"
                  className="form-control-sm"
                  id="inputGroupFile03"
                  aria-describedby="inputGroupFileAddon03"
                  aria-label="Upload"
                  name="cc"
                  value={state.cc}
                  onChange={handleState}
                />
              </div>
              <div className="input-group mb-3">
                <Button
                  color="info"
                  type="button"
                  id="inputGroupFileAddon03"
                  className="btn-sm"
                  style={{ backgroundColor: "#f1f1f1", color: "#949494" }}
                >
                  Bcc
                </Button>
                <Input
                  type="text"
                  className="form-control-sm"
                  id="inputGroupFile03"
                  aria-describedby="inputGroupFileAddon03"
                  aria-label="Upload"
                  name="bcc"
                  value={state.bcc}
                  onChange={handleState}
                />
              </div>
            </>
          )}
          <div>
            <Input
              type="text"
              className="form-control-sm"
              id="inputGroupFile03"
              aria-describedby="inputGroupFileAddon03"
              aria-label="Upload"
              name="subject"
              value={state.subject}
              onChange={handleState}
            />
          </div>
          <div
            className="mt-4"
            style={{ height: "300px", overflowY: "scroll" }}
          >
            <CKEditor
              editor={DecoupledEditor}
              config={editorConfiguration}
              data={`

                  <p>${props.data?.message?.body}</p>
                        ${props.data?.message?.from} <br />

                                        ${authUser.user.email} <br />
                                        www.cliqproperty.com <br />
                                    </p>
                                `}
              onReady={editor => {
                console.log("Editor is ready to use!", editor);

                // Insert the toolbar before the editable area.
                if (editor) {
                  editor.ui
                    .getEditableElement()
                    .parentElement.insertBefore(
                      editor.ui.view.toolbar.element,
                      editor.ui.getEditableElement()
                    );

                  textEditor = editor;
                }
              }}
              onChange={(event, editor) => {
                const data = editor.getData();
                console.log({ event, editor, data });
                setState(prevState => {
                  return { ...prevState, body: data };
                });
              }}
              onBlur={(event, editor) => {
                console.log("Blur.", editor);
              }}
              onFocus={(event, editor) => {
                console.log("Focus.", editor);
              }}
            />
          </div>
          <hr />
          <div className="d-flex justify-content-end">
            <Button color="primary">
              <i className="fas fa-paper-plane"></i> Send
            </Button>
          </div>
        </div>
      </Modal>
    </Fragment>
  );
};

const mapStateToProps = gstate => {
  const { send_email_data, send_email_error, send_email_loading } =
    gstate.Activity;
  return {
    send_email_data,
    send_email_error,
    send_email_loading,
  };
};
export default withRouter(
  connect(mapStateToProps, {
    sendEmail,
    sendEmailFresh,
  })(MailTemplateModal)
);
