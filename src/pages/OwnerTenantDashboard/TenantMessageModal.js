import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  Button,
  Card,
  Col,
  Container,
  Input,
  Label,
  Row,
  TabContent,
  TabPane,
  Nav,
  Media,
  Alert,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  NavItem,
  NavLink,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  ButtonDropdown,
} from "reactstrap";
import classnames from "classnames";
import { sendMessageTenant, sendMessageTenantFresh } from "store/actions";
import { Link, useParams, withRouter } from "react-router-dom";
import toastr from "toastr";



const TenantMessageModal = props => {
  const [state, setState] = useState({
    modal: false,
  });
  const togglemodal = () => {
    setState(prevState => ({
      modal: !prevState.modal,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault()
    props.sendMessageTenant(props.mail, state);
    togglemodal();
  };
  const selectHandlerForMessage = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (props.mail_send_tenant_loading === 'Success') {
      props.sendMessageTenantFresh();
      toastr.success('Success')
    }
  }, [props.mail_send_tenant_loading]);
  // console.log(props.mail_send_tenant_loading);
  return (
    <React.Fragment>
      {/* <Button className="btn w-md m-1" color="info" onClick={togglemodal}>
        <i className="fab fa-rocketchat me-2"></i>Message Agent
      </Button> */}
      <Link to="/messages-tenant">
        <Button className="btn w-md m-1 w-100" color="info">
          <i className="fab fa-rocketchat me-2"></i>Message Agent
        </Button>
      </Link>

      <Modal
        isOpen={state.modal}
        role="dialog"
        autoFocus={true}
        centered={true}
        className="exampleModal"
        tabIndex="-1"
      // toggle={this.togglemodal}
      >
        <div className="modal-content">
          <ModalHeader>Message Agent</ModalHeader>
          <ModalBody>
            <form>
              <div className="mb-3">
                <Input
                  type="subject"
                  name="subject"
                  className="form-control"
                  placeholder="Subject"
                  onChange={selectHandlerForMessage}
                />
              </div>
              <div className="mb-3">
                <Input
                  type="textarea"
                  name="body"
                  className="form-control"
                  placeholder="Body"
                  rows="3"
                  onChange={selectHandlerForMessage}
                />
              </div>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button type="button" color="secondary" onClick={togglemodal}>
              Close
            </Button>
            <Button type="button" color="info" onClick={handleSubmit}>
              Send <i className="fab fa-telegram-plane ms-1"></i>
            </Button>
          </ModalFooter>
        </div>
      </Modal>
    </React.Fragment>
  );
};

const mapStateToProps = gstate => {
  const {
    mail_send_tenant_loading
  } = gstate.OTDashboard;
  return {
    mail_send_tenant_loading
  };
};

export default withRouter(
  connect(mapStateToProps, {
    sendMessageTenant, sendMessageTenantFresh
  })(TenantMessageModal)
);
