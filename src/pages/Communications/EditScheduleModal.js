import moment from "moment";
import React, { useEffect, useState } from "react";
import {
  Card,
  Alert,
  CardBody,
  CardTitle,
  Col,
  Container,
  Row,
  CardText,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Label,
  Input,
  Button,
  CardHeader,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  FormText,
} from "reactstrap";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { connect } from "react-redux";
import Select from "react-select";
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
import { useHistory, useParams } from "react-router-dom";
import Switch from "react-switch";
// Form Editor
import { CKEditor } from "@ckeditor/ckeditor5-react";
import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";

const EditScheduleModal = props => {
  // console.log(props);
  const [state, setState] = useState({});
  const [editMailStatus, setEditMailStatus] = useState(false);

  const [form1state, setForm1State] = useState({
    switch1: true,
    // switch2: false,
    // selectedFiles: [],
  });
  const handleSaveSchedule = e => {
    e.preventDefault();
    console.log("========================I am MAIL======================");
    props.toggle();
    setEditMailStatus(true);
    // console.log(form1state.switch1, state.body)
    // console.log(props.schedule.templateData.id)
    //props.editSchedule(props.schedule.templateData, form1state, state)
    props.editSchedule(
      props.schedule.templateData.id,
      form1state.switch1,
      state.body
    );
  };

  const handleSaveScheduleForSMS = e => {
    e.preventDefault();
    console.log("==============I am sms===============");
    props.toggle();
    setEditMailStatus(true);
    console.log(form1state.switch1, state.body);
    console.log(props.schedule.templateData.id);
    //props.editSchedule(props.schedule.templateData, form1state, state)
    props.templateListBySMSId(
      props.schedule.templateData.id,
      form1state.switch1,
      state.body
    );
  };

  useEffect(() => {
    if (props.edit_schedule_loading === "Success") {
      toastr.success("Successfully Edited");
      setEditMailStatus(false);
      props.editScheduleFresh();
      props.templateList();
    }
    if (props.schedule_sms_temp_edit === "Success") {
      console.log("=====I am here======");
      toastr.success("Successfully Edited");
      setEditMailStatus(false);
      props.templateListBySMSIdFresh();
      props.templateListSMS();
      props.templateList();
    }
    // else if (props.schedule_sms_temp_edit === 'Failed') {
    //     //console.log("=====I am here======")
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
  // console.log(props.edit_schedule_loading);
  // console.log(props.schedule_sms_temp_edit);
  // console.log(props.schedule_sms_temp_edit_data, props.schedule_sms_temp_edit_error);
  // console.log(props.schedule);
  // console.log(props.schedule.templateData);
  // console.log(props.schedule?.templateData?.body);
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
                      {/* <input
                      className="form-control"
                      type="text"
                      name="name"
                      onChange={scheduleHandler}
                      placeholder="What will this be called?"
                    /> */}
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
                      {/* <Select
                      value={schedule.selectRegarding}
                      onChange={handleSelectRegion}
                      options={schedule.optionRegarding}
                      // placeholder="Contact"
                      classNamePrefix="select2-selection"
                    /> */}
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
                      {/* <Select
                      value={schedule.selectTo}
                      onChange={handleSelectTo}
                      options={schedule.optionTo}
                      classNamePrefix="select2-selection"
                    /> */}
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
                      {/* <Select
                      value={schedule.selectFrom}
                      onChange={handleSelectFrom}
                      options={schedule.optionFrom}
                      classNamePrefix="select2-selection"
                    /> */}
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
                      console.log("Editor is ready to use!", editor);

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

                      console.log(data);

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
            onClick={
              props.schedule?.templateData?.type === "mail"
                ? handleSaveSchedule
                : handleSaveScheduleForSMS
            }
          >
            Save
          </Button>
          {/* <FormGroup row>
                        <Label for="button" sm={3}></Label>
                        <Col sm={9} className="gap-3">
                            <Button color="info"
                            // onClick={toggleTempModal}
                            >
                                <i className="fa-solid fa-xmark"></i>Cancel
                            </Button>{" "}
                            <Button
                                color="info"

                                onClick={handleSaveSchedule}
                            >
                                <i className="far fa-save"></i> &nbsp; Save
                            </Button>{" "}
                        </Col>
                    </FormGroup> */}
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
