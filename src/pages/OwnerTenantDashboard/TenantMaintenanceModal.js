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
import { addMaintenanceTenant, addJobModal, addJobModalFresh, JobsListFresh, addMaintenanceTenantFresh, propertyListForTenantById } from "store/actions";
import toastr from "toastr";


const TenantMaintenanceModal = props => {
  const imageMimeType = /image\/(png|jpg|jpeg|mp3)/i;
  const fileInputRef = useRef(null);
  const data = props.data;

  const [state, setState] = useState({
    modal: false,
  });
  const [files, setFiles] = useState([]); // Store the selected files
  const [previews, setPreviews] = useState([]); // Store preview URLs

  const [featureImage, setFeatureImage] = useState();
  const handleChange = (event) => {
    const newFiles = Array.from(event.target.files);
    setFiles((prev) => [...prev, ...newFiles]);
    setPreviews((prev) => [
      ...prev,
      ...newFiles.map((file) => URL.createObjectURL(file)),
    ]);
  };

  const handleRemove = (event, index) => {
    event.preventDefault();
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    setPreviews((prevPreviews) => prevPreviews.filter((_, i) => i !== index));
    // Reset the input file
    fileInputRef.current.value = null; // Clears the file input element
  };

  const togglemodal = () => {
    setState(prevState => ({
      modal: !prevState.modal,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    props.addMaintenanceTenant(state, data, files);
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
  };
  useEffect(() => {
    if (props.add_maintenance_tenant_loading === 'Success') {
      toastr.success("Success");
      props.addMaintenanceTenantFresh();
      props.propertyListForTenantById(props.tid)
    }
    if (props.job_modal_add_loading === "Success") {
      toastr.success("Success");

      props.addJobModalFresh();
      props.JobsListFresh();
    }
  }, [props.job_modal_add_loading, props.add_maintenance_tenant_loading]);

  console.log(files, previews);


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
              <div className="form-group-new d-flex justify-content-start align-items-center">
                <Button
                  className="btn"
                  color="info"
                  onClick={() => fileInputRef.current.click()}
                >
                  {" "}
                  <i className="bx bx-camera"></i> Upload
                </Button>
                <div className="ps-2">{ files.length > 0 && `${files.length} attachments` }</div>

                <input
                  type="file"
                  onChange={handleChange}
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  accept="image/*"
                  multiple
                />
              </div>
              <div className="form-group-new">
                {previews.length > 0 && (
                  <div style={{ marginTop: "20px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
                    {previews.map((preview, index) => (
                      <div key={index} style={{ textAlign: "center" }}>
                        <img
                          src={preview}
                          alt={`Preview ${index}`}
                          style={{ width: "100px", height: "100px", objectFit: "cover" }}
                        />
                        <button
                          onClick={(e) => handleRemove(e, index)}
                          style={{
                            display: "block",
                            marginTop: "5px",
                            background: "red",
                            color: "white",
                            border: "none",
                            cursor: "pointer",
                            padding: "5px",
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
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
    addMaintenanceTenant, addJobModal, addJobModalFresh, JobsListFresh, addMaintenanceTenantFresh, propertyListForTenantById
  })(TenantMaintenanceModal)
);
