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

import {
  removeChartsOfAcc,
  removeChartsOfAccFresh,
  getChartOfAccounts,
} from "store/actions";

import toastr from "toastr";
import { useHistory, useParams } from "react-router-dom";
import Loder from "components/Loder/Loder";
import Switch from "react-switch";
// Form Editor
import { CKEditor } from "@ckeditor/ckeditor5-react";
import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";

const RemoveAccountModal = props => {
  const handleSave = e => {
    e.preventDefault();
    props.removeChartsOfAcc(props.Id);
  };

  useEffect(() => {
    if (props.rmv_chart_of_accounts_loading === "Success") {
      // toastr.danger("Removed");
      toastr.success("Removed");

      props.removeChartsOfAccFresh();
      props.getChartOfAccounts();
      props.toggle();
    }
  }, [props.rmv_chart_of_accounts_loading]);
  console.log(props.rmv_chart_of_accounts_loading);

  return (
    <>
      <Modal
        isOpen={props.accountModalRemove}
        toggle={props.toggle}
        scrollable={true}
        size="lg"
      >
        <ModalHeader toggle={props.toggle}></ModalHeader>

        <ModalBody>
          <Row>
            <Col lg={12}>Permanently remove {props.length} chart accounts?</Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button color="info" onClick={props.toggle}>
            <i className="fas fa-times me-1"></i>Cancel
          </Button>
          <Button color="info" onClick={handleSave}>
            <i className="fas fa-file-alt me-1"></i> Ok
          </Button>
        </ModalFooter>
      </Modal>

      {/* ===============Inspection modal ends here ================*/}
    </>
  );
};
const mapStateToProps = gstate => {
  const { rmv_chart_of_accounts_loading } = gstate.Portfolio;

  return { rmv_chart_of_accounts_loading };
};
export default connect(mapStateToProps, {
  removeChartsOfAcc,
  removeChartsOfAccFresh,
  getChartOfAccounts,
})(RemoveAccountModal);
