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

import { addInvoicePaymentsModal, addInvoicePaymentsModalFresh, getInvoicePaymentsModal, toggleLoading } from "store/actions";

import toastr from "toastr";
import { useHistory, useParams } from "react-router-dom";
import Loder from "components/Loder/Loder";
import Switch from "react-switch";
// Form Editor
import { CKEditor } from "@ckeditor/ckeditor5-react";
import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";
import './myCkEditor.css';

const InvoicePaymentsModal = props => {
  const [state, setState] = useState(null);
  const [init, setInit] = useState(true);
  // console.log(state);
  const [isLoading, setIsLoading] = useState(false)



  useEffect(() => {

    // if (init) {
    //   props.getInvoicePaymentsModal();
    //   setInit(false)
    // }
    if (props.add_invoice_payments_modal_loading === 'Success') {
      toastr.success('Success');
      props.addInvoicePaymentsModalFresh();
      setIsLoading(false)
      props.toggle();

    }
    if (props.invoice_payments_modal_data) {
      // setState()
    }
  }, [props.add_invoice_payments_modal_loading]);

  // console.log(props.toggleLoadingStatus);

  const handleSave = () => {
    props.toggleLoading();
    setIsLoading(true)
    props.addInvoicePaymentsModal(state);
  };


  const handler = e => {
    // console.log(state.replace(/&nbsp;/g, ''));
    // return
    setState(`${state} {Tenant Bank Reference}`)

  }



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
        isOpen={props.invoiceModal}
        toggle={props.toggle}
        scrollable={true}
      >
        <ModalHeader toggle={props.toggle}>
          Invoice payment instructions
        </ModalHeader>

        <ModalBody>
          <Row>
            <Col lg={12}>
              <div>
                <CKEditor
                  editor={DecoupledEditor}
                  config={editorConfiguration}
                  data={state}

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
                    console.log(editor);
                    let data = editor.getData();


                    // .replace('</p>', '')
                    // console.log(data.split("").reverse().join(""));
                    // return
                    // setState(data.replace(/&nbsp;/g, ''));
                    setState(data)
                  }}
                // onBlur={(event, editor) => {
                //   console.log('Blur.', editor);
                // }}
                // onFocus={(event, editor) => {
                //   console.log('Focus.', editor);
                // }}
                />
              </div>
              <div className="py-2">
                <p>Insert your merge field: <span onClick={handler} style={{ backgroundColor: '#f2f4f2', cursor: 'pointer' }} className="p-1">{`{Tenant Bank Reference}`}</span></p>
              </div>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>



          <Button
            style={{
              backgroundColor: "#FF8170",
              border: "none",

            }}
            onClick={e => { props.toggle(); setState(null) }} disabled={isLoading ? true : false}>
            <i className="fas fa-times me-1"></i>Cancel
          </Button>
          <Button color="info" onClick={handleSave} disabled={isLoading ? true : false}>

            <><i className="fas fa-file-alt me-1"></i> Save</>


          </Button>


        </ModalFooter>
      </Modal >

      {/* ===============Inspection modal ends here ================*/}
    </>
  );
};
const mapStateToProps = gstate => {
  const { add_invoice_payments_modal_loading, invoice_payments_modal_data, invoice_payments_modal_loading, toggleLoadingStatus } = gstate.Portfolio;


  return { add_invoice_payments_modal_loading, invoice_payments_modal_data, invoice_payments_modal_loading, toggleLoadingStatus };
};
export default connect(mapStateToProps, { addInvoicePaymentsModal, addInvoicePaymentsModalFresh, getInvoicePaymentsModal, toggleLoading })(InvoicePaymentsModal);