import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Col,
  Row,
  Label,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
} from "reactstrap";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { connect } from "react-redux";
import Loder from "components/Loder/Loder";

import {
  editSchedule,
  editScheduleFresh,
  templateList,
  templateListBySMSId,
  smsTemplateEditFresh,
  templateListSMS,
  templateListBySMSIdFresh,
} from "store/actions";

import toastr from "toastr";
import Switch from "react-switch";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";

const EditScheduleModal = props => {
  const [state, setState] = useState({});
  const [editMailStatus, setEditMailStatus] = useState(false);

  const [form1state, setForm1State] = useState({
    switch1: true,
  });
  const handleSaveSchedule = e => {
    e.preventDefault();
    props.toggle();
    setEditMailStatus(true);
    props.editSchedule(
      props.schedule.templateData.id,
      form1state.switch1,
      state.body
    );
  };

  const handleSaveScheduleForSMS = e => {
    e.preventDefault();
    props.toggle();
    setEditMailStatus(true);
    props.templateListBySMSId(
      props.schedule.templateData.id,
      form1state.switch1,
      state.body
    );
  };

  const handleSaveScheduleForLetter = async (e) => {
    e.preventDefault();

    if (state.body === "") {
      toastr.warning("Body con not be empty");
      return;
    }

    props.toggle();
    setEditMailStatus(true);

    const authUser = JSON.parse(localStorage.getItem("authUser"));
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authUser.token}`
    };

    const Url = `${process.env.REACT_APP_LOCALHOST}/letter/templates/${props.schedule.templateData.id}`;

    const data = {
      message: state.body,
      status: form1state.switch1,
    }

    try {
      const response = await axios.put(Url, data, { headers: headers });
      toastr.success(response.data.message)
      setEditMailStatus(false);
      props.fetchLetterTemplate(null, "updated_at", "desc", 1, 10);
    } catch (error) {
      toastr.warning(error.message);
      setEditMailStatus(false);
    }
  };

  useEffect(() => {
    if (props.edit_schedule_loading === "Success") {
      toastr.success("Successfully Edited");
      setEditMailStatus(false);
      props.editScheduleFresh();
      props.templateList();
    }
    if (props.schedule_sms_temp_edit === "Success") {
      toastr.success("Successfully Edited");
      setEditMailStatus(false);
      props.templateListBySMSIdFresh();
      props.templateListSMS();
      props.templateList();
    }
    // else if (props.schedule_sms_temp_edit === 'Failed') {
    //     toastr.warning("Error");
    //     setEditMailStatus(false);
    // }

    if (props.schedule.templateData) {
      setForm1State(prev => ({
        ...prev,
        switch1: props.schedule.templateData.status == 1 ? true : false,
      }));
    }
  }, [
    props.edit_schedule_loading,
    props.schedule.templateData,
    props.schedule_sms_temp_edit,
  ]);

  const Offsymbol = () => {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          fontSize: 12,
          color: "#fff",
          paddingRight: 2,
        }}
      >
        {" "}
        No
      </div>
    );
  };
  const OnSymbol = props => {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          fontSize: 12,
          color: "#fff",
          paddingRight: 2,
        }}
      >
        {" "}
        Yes
      </div>
    );
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
    <>
      <Loder status={editMailStatus} />
      <Modal
        isOpen={props.editScheduleModal}
        toggle={props.toggle}
        scrollable={true}
      >
        <ModalHeader toggle={props.toggle}>
          <i className="bx bx-task text-primary"></i>&nbsp;
          <span className="text-primary">Edit Schedule</span>
        </ModalHeader>

        <ModalBody>
          <Row>
            <Col lg={12}>
              <Form className="form p-3">
                <div className="row mb-4">
                  <Col sm={4}>
                    <Label
                      htmlFor="horizontal-firstname-Input"
                      className="col-sm-3 col-form-label"
                    >
                      Active
                    </Label>
                  </Col>
                  <Col sm={8}>
                    <Switch
                      uncheckedIcon={<Offsymbol />}
                      checkedIcon={<OnSymbol />}
                      className="me-1 mb-sm-8 mb-2"
                      onColor="#153D58"
                      onChange={() => {
                        setForm1State({
                          ...form1state,
                          switch1: !form1state.switch1,
                        });
                      }}
                      checked={form1state.switch1}
                    />
                  </Col>
                </div>
                <FormGroup row>
                  <Label for="property" sm={4}>
                    Name
                  </Label>
                  <Col sm={8}>
                    <div className="d-flex p-2">
                      <i className="fas fa-lock me-2" />
                      {props?.schedule?.templateData?.name}
                    </div>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="contact" sm={4}>
                    This message is regarding
                  </Label>
                  <Col sm={8}>
                    <div className="d-flex p-2">
                      <i className="fas fa-lock me-2" />
                      {props?.schedule?.templateData?.message_action_name}
                    </div>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="manager" sm={4}>
                    This message will be sent to
                  </Label>
                  <Col sm={8}>
                    <div className="d-flex p-2">
                      <i className="fas fa-lock me-2" />
                      {props?.schedule?.templateData?.message_trigger_to}
                    </div>
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Label for="manager" sm={4}>
                    This message will be sent when
                  </Label>
                  <Col sm={8}>
                    <div className="d-flex p-2">
                      <i className="fas fa-lock me-2" />
                      {props?.schedule?.templateData?.messsage_trigger_point}
                    </div>
                  </Col>
                </FormGroup>

                <div className="py-3">
                  <CKEditor
                    editor={DecoupledEditor}
                    config={editorConfiguration}
                    data={
                      props.schedule?.templateData?.body
                        ? props.schedule?.templateData?.body
                        : props.schedule?.templateData?.message
                    }
                    onReady={editor => {
                      if (editor) {
                        editor.ui
                          .getEditableElement()
                          .parentElement.insertBefore(
                            editor.ui.view.toolbar.element,
                            editor.ui.getEditableElement()
                          );

                        // textEditor = editor;
                      }
                    }}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      setState({ ...state, body: data });
                    }}
                  />
                </div>
              </Form>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button color="info" onClick={props.toggle}>
            Cancel
          </Button>
          <Button
            color="info"
            onClick={(e) => {
              const { type } = props.schedule?.templateData || {};

              type === "mail"
                ? handleSaveSchedule(e)
                : type === "sms"
                  ? handleSaveScheduleForSMS(e)
                  : type === "letter"
                    ? handleSaveScheduleForLetter(e)
                    : console.warn("Unknown type");
            }}
          >
            Save
          </Button>
        </ModalFooter>
      </Modal>

      {/* ===============Inspection modal ends here ================*/}
    </>
  );
};
const mapStateToProps = gstate => {
  const {
    edit_schedule_loading,
    edit_sms_template_loading,
    schedule_sms_temp_edit_data,
    schedule_sms_temp_edit_error,
    schedule_sms_temp_edit,
  } = gstate.Message;

  return {
    edit_schedule_loading,
    edit_sms_template_loading,
    schedule_sms_temp_edit_data,
    schedule_sms_temp_edit_error,
    schedule_sms_temp_edit,
  };
};
export default connect(mapStateToProps, {
  editSchedule,
  editScheduleFresh,
  templateList,
  templateListBySMSId,
  smsTemplateEditFresh,
  templateListSMS,
  templateListBySMSIdFresh,
})(EditScheduleModal);
