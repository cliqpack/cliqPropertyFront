import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
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
  FormGroup,
} from "reactstrap";
import classnames from "classnames";
import { addMaintenanceTenant, addJobModal, addJobModalFresh, JobsListFresh, addMaintenanceTenantFresh } from "store/actions";
import toastr from "toastr";


const TenantMaintenanceModal = props => {
  const imageMimeType = /image\/(png|jpg|jpeg|mp3)/i;
  const data = props.data;
  console.log(data);

  const [state, setState] = useState({
    modal: false,
  });
  const [featureImage, setFeatureImage] = useState();
  // console.log(featureImage);

  const togglemodal = () => {
    setState(prevState => ({
      modal: !prevState.modal,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    props.addMaintenanceTenant(state, data);
    togglemodal();
  };
  const selectHandlerForMessage = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const handleFeatureImage = (e) => {
    const file = e.target.files[0];
    console.log(file);
    if (!file.type.match(imageMimeType)) {
      alert("Image type is not valid");
      return;
    }
    setFeatureImage(file);
    console.log("Image link: " + file);
  };
  useEffect(() => {
    if (props.add_maintenance_tenant_loading === 'Success') {
      toastr.success("Success");
      props.addMaintenanceTenantFresh();
    }
    if (props.job_modal_add_loading === "Success") {
      toastr.success("Success");

      props.addJobModalFresh();
      props.JobsListFresh();
    }
  }, [props.job_modal_add_loading, props.add_maintenance_tenant_loading]);
  // console.log(props.add_maintenance_tenant_loading);
  return (
    <React.Fragment>
      <Button className="btn w-md m-1 w-100" color="info" onClick={togglemodal}>
        <i className="fas fa-wrench me-2"></i>New Maintenance
      </Button>
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
          {/* <ModalHeader>New Maintenance</ModalHeader> */}
          <ModalHeader style={{ backgroundColor: "#153D58" }}>
            {/* <i className="fas fa-wrench font-size-20 me-2 text-info"></i>
          <span className="text-info">New Job</span> */}


            <div style={{ display: "flex", justifyContent: "space-between", width: "460px", marginTop: "10px" }}>
              <div>
                {/* <i className="fas fa-wrench font-size-20 me-2 text-white"></i> */}
                <span className="text-white">New Maintenance</span>
              </div>
              <i className="mdi mdi-close-thick font-size-20 text-white" onClick={togglemodal} style={{ cursor: "pointer" }}></i>
            </div>
          </ModalHeader>
          <ModalBody style={{ backgroundColor: "#F2F6FA", paddingTop: "30px" }}>
            <form>
              <div className="form-group-new">
                <Input
                  type="text"
                  name="summary"
                  className="form-control"
                  placeholder="Summary"
                  onChange={selectHandlerForMessage}
                />
                <label htmlFor="usr">Summary</label>
              </div>
              {/* <div className="form-group-new">
                <Input
                  type="textarea"
                  name="description"
                  className="form-control"
                  placeholder="Description"
                  rows="4"
                  onChange={selectHandlerForMessage}
                />
                <label htmlFor="usr">Description</label>
              </div> */}




              <FormGroup row>
                <Label for="exampleSelect " className="form-group-new-desc-label" style={{ marginBottom: "-10px", zIndex: "1", width: "90px", padding: "0px 3px 0px 3px" }}>
                  Description
                </Label>

                <Col md={12}>
                  <div className="form-group-new-desc" >
                    <Input
                      type="textarea"
                      name="description"
                      className="form-control"
                      placeholder="Description"
                      rows="4"
                      onChange={selectHandlerForMessage}
                    />
                  </div>
                </Col>
              </FormGroup>
            </form>
          </ModalBody>
          <ModalFooter style={{ backgroundColor: "#F2F6FA" }}>
            <Button type="button" color="buttonCancelColor" onClick={togglemodal}>
              Close
            </Button>
            <Button type="button" color="buttonColor" onClick={handleSubmit}>
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
    add_maintenance_tenant_loading
  } = gstate.OTDashboard;
  const {
    job_modal_add_loading,
    job_modal_add_id,

    job_property_access_data,
  } = gstate.Jobs;
  return {
    add_maintenance_tenant_loading,

    job_modal_add_loading,
    job_modal_add_id,

    job_property_access_data,
  };
};

export default withRouter(
  connect(mapStateToProps, {
    addMaintenanceTenant, addJobModal, addJobModalFresh, JobsListFresh, addMaintenanceTenantFresh
  })(TenantMaintenanceModal)
);
