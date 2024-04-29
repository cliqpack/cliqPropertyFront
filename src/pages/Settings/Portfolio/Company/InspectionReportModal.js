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

import { addInspectionReportModal, addInspectionReportModalFresh, getInspectionReportModal } from "store/actions";

import toastr from "toastr";
import { useHistory, useParams } from "react-router-dom";
import Loder from "components/Loder/Loder";
import Switch from "react-switch";
// Form Editor
import { CKEditor } from "@ckeditor/ckeditor5-react";
import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";
import { setIn } from "formik";

const InspectionReportModal = props => {
  const [state, setState] = useState({
    data: '', data1: ''
  })
  const [init, setInit] = useState(true)
  const [data, setData] = useState('')
  const [data1, setData1] = useState('')
  console.log(data, data1);


  useEffect(() => {
    if (props.add_inspection_report_modal_loading == 'Success') {
      toastr.success('Success');
      props.addInspectionReportModalFresh();
      props.toggle()
    }
    // if (init) {
    //   props.getInspectionReportModal();
    //   setInit(false)
    // }
  }, [props.add_inspection_report_modal_loading,]);

  const handleSave = () => {
    props.addInspectionReportModal(data, data1)
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
      <Modal
        isOpen={props.inspectionModal}
        toggle={props.toggle}
        scrollable={true}
        size='lg'
      >
        <ModalHeader toggle={props.toggle} className="text-info">
          Inspection report disclaimer
        </ModalHeader>

        <ModalBody>
          <Row>
            <Col lg={12}>
              <div className="py-3">
                <div className="card-title">Entry & Exit inspection reports</div>
                <CKEditor
                  editor={DecoupledEditor}
                  config={editorConfiguration}
                  data={data}
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
                    console.log(event, editor, data);
                    setData(data);
                  }}
                // onBlur={(event, editor) => {
                //   console.log('Blur.', editor);
                // }}
                // onFocus={(event, editor) => {
                //   console.log('Focus.', editor);
                // }}
                />
              </div>
              <p>When populated, this disclaimer will be displayed on Entry and Exit inspection reports</p>

              <div className="py-3 mt-5">
                <div className="card-title">Routine inspection reports</div>
                <CKEditor
                  editor={DecoupledEditor}
                  config={editorConfiguration}
                  data={data1}

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
                    setData1(data)


                  }}
                // onBlur={(event, editor) => {
                //   console.log('Blur.', editor);
                // }}
                // onFocus={(event, editor) => {
                //   console.log('Focus.', editor);
                // }}
                />
              </div>
              <p>When populated, this disclaimer will be displayed on Routine inspection reports</p>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button
            style={{
              backgroundColor: "#FF8170",
              border: "none",
            }}
            onClick={e => {
              props.toggle(); setData(''), setData1('')
            }}>
            <i className="fas fa-times me-1"></i>Cancel
          </Button>
          <Button color="info" onClick={handleSave}>
            <i className="fas fa-file-alt me-1"></i> Save
          </Button>
        </ModalFooter>
      </Modal>

      {/* ===============Inspection modal ends here ================*/}
    </>
  );
};
const mapStateToProps = gstate => {
  const { add_inspection_report_modal_loading, inspection_report_modal_data, inspection_report_modal_loading } = gstate.Portfolio;


  return { add_inspection_report_modal_loading, inspection_report_modal_data, inspection_report_modal_loading };
};
export default connect(mapStateToProps, { addInspectionReportModal, addInspectionReportModalFresh, getInspectionReportModal })(InspectionReportModal);