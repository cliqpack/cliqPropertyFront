import React, { Fragment, useState } from "react";
import "./propertyTenantBondDetails.css";
import { Modal, Row, Col, ErrorMessage, Label, Field, ModalFooter, Button, ModalHeader } from "reactstrap";
import {
  editPropertyTanentBondDetails,
  
} from "../../store/actions";
const TenantBondDetails = props => {
  console.log(props);
  
  const [state, setState] = useState(false);
  const [bondDetails, setBondDetails] = useState({
    bond_required: props.state2.bond_required,
    bond_paid: props.state2.bond_paid,
    bond_receipted: props.state2.bond_receipted,
    bond_held: props.state2.bond_held,
    bond_arrears: props.state2.bond_arrears,
    bond_reference: props.state2.bond_reference,
  });

  const toggle = () => {
    setState(prev => !prev);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBondDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSave = () => {
    console.log("call api bond");
    
    props.handleBondDetails(); 
    props.toggleBondDetails();
  };

  return (
    <Fragment>
      {/* <div onClick={toggle} className="text-primary hoverBondDetails">
        Edit bond details <i className="fas fa-pen"></i>
      </div> */}

      <Modal  isOpen={props.toggleBondDetails} toggle={props.toggleBondDetails} centered size="lg"> 

        {/* <ModalHeader style={{ backgroundColor: "#153D58" }} > */}

        <ModalHeader >
          <div style={{ display: "flex", justifyContent: "space-between", width: "460px", marginTop: "10px" }}>
          <h5 className="modal-title mt-0" id="myModalLabel" >
            Bond Details
        
          </h5>
            <button
            type="button"
            onClick={props.toggleBondDetails}
            className="close"
            data-dismiss="modal"
            aria-label="Close"
            style={{ color: "#000" }}
            
          >
            <span   aria-hidden="true">&times;</span>
          </button>
          </div>
        </ModalHeader>

        <div className="modal-body" style={{ backgroundColor: "#F2F6FA" }}>
          <Row className="mt-2">
            <Col md={12}>
              <Row className="mb-3">
                <Col md={6} className="d-flex align-items-start">
                  <span className="input-group-append">
                    <span
                      className="input-group-text"
                      style={{
                        borderTopRightRadius: 0,
                        borderBottomRightRadius: 0,
                      }}
                    >
                      $
                    </span>
                  </span>
                  <div className="form-group-new">
                    <input
                      placeholder="0.00"
                      name="bond_required"
                      id="bond_required"
                      type="text"
                      className="form-control"
                      style={{
                        borderTopLeftRadius: 0,
                        borderBottomLeftRadius: 0,
                      }}
                      value={props.state2.bond_required}
                      onChange={props.handlePropertyFormTwoValues}
                    />
                    <label htmlFor="usr">Bond required</label>
                  </div>
                </Col>

                <Col md={6} className="d-flex align-items-start">
                  <span className="input-group-append">
                    <span
                      className="input-group-text"
                      style={{
                        borderTopRightRadius: 0,
                        borderBottomRightRadius: 0,
                      }}
                    >
                      $
                    </span>
                  </span>
                  <div className="form-group-new">
                    <input
                      placeholder="0.00"
                      name="bond_paid"
                      id="bond_paid"
                      type="text"
                      className="form-control"
                      style={{
                        borderTopLeftRadius: 0,
                        borderBottomLeftRadius: 0,
                      }}
                      value={props.state2.bond_paid}
                      onChange={props.handlePropertyFormBond}
                    />
                    <label htmlFor="usr">Bond already paid</label>
                  </div>

                </Col>
              </Row>

              <Row className="mb-3">
                {/* <Col md={3}>
                  <Label for="bond_receipted" className="form-label text-dark">
                    Bond receipted
                  </Label>
                </Col> */}
                <Col md={6} className="d-flex align-items-start">
                  <span className="input-group-append">
                    <span
                      className="input-group-text"
                      style={{
                        borderTopRightRadius: 0,
                        borderBottomRightRadius: 0,
                      }}
                    >
                      $
                    </span>
                  </span>
                  <div className="form-group-new">
                    <input
                      placeholder="0.00"
                      name="bond_receipted"
                      id="bond_receipted"
                      type="text"
                      disabled={true}
                      className="form-control"
                      style={{
                        borderTopLeftRadius: 0,
                        borderBottomLeftRadius: 0,
                      }}
                      value={props.state2.bond_receipted}
                      onChange={props.handlePropertyFormTwoValues}
                    />
                    <label htmlFor="usr"> Bond receipted</label>
                  </div>
                </Col>
                <Col md={6} className="d-flex align-items-start">
                  <span className="input-group-append">
                    <span
                      className="input-group-text"
                      style={{
                        borderTopRightRadius: 0,
                        borderBottomRightRadius: 0,
                      }}
                    >
                      $
                    </span>
                  </span>
                  <div className="form-group-new">
                    <input
                      placeholder="0.00"
                      name="bond_held"
                      id="bond_held"
                      type="text"
                      disabled={true}
                      className="form-control"
                      style={{
                        borderTopLeftRadius: 0,
                        borderBottomLeftRadius: 0,
                      }}
                      value={props.state2.bond_held}
                      onChange={props.handlePropertyFormTwoValues}
                    />
                    <label htmlFor="usr">Bond held</label>
                  </div>
                </Col>
              </Row>

              <Row
              >
                {/* <Col md={3}>
                  <Label for="bond_held" className="form-label text-dark">
                    Bond arrears
                  </Label>
                </Col> */}
                <Col md={6} className="d-flex align-items-start">
                  <span className="input-group-append">
                    <span
                      className="input-group-text"
                      style={{
                        borderTopRightRadius: 0,
                        borderBottomRightRadius: 0,
                      }}
                    >
                      $
                    </span>
                  </span>
                  <div className="form-group-new">
                    <input
                      placeholder="0.00"
                      name="bond_arrears"
                      id="bond_arrears"
                      type="text"
                      disabled={true}
                      className="form-control"
                      style={{
                        borderTopLeftRadius: 0,
                        borderBottomLeftRadius: 0,
                      }}
                      value={props.state2.bond_arrears}
                      onChange={props.handlePropertyFormTwoValues}
                    />

                    <label htmlFor="usr">  Bond arrears</label>
                  </div>

                </Col>
                <Col md={6}>
                  <div className="form-group-new">
                    <input
                      name="bond_reference"
                      id="bond_reference"
                      type="text"
                      className="form-control"
                      value={props.state2.bond_reference}
                      onChange={props.handlePropertyFormTwoValues}
                    />
                    <label htmlFor="usr"> Bond reference</label>
                  </div>
                </Col>
              </Row>

            </Col>
          </Row>
        </div>
        <ModalFooter style={{ backgroundColor: "#F2F6FA" }}>
        <Button style={{ backgroundColor: "#6e6e6e" }}  onClick={props.toggleBondDetails} color="primary">
                        <i className="fas fa-times me-1"></i> Close
                    </Button>
          <Button onClick={handleSave} color="primary">
            <i className="fas fa-file-alt me-1"></i> Save
          </Button>
        </ModalFooter>
      </Modal>
    </Fragment>
  );
};

export default TenantBondDetails;
