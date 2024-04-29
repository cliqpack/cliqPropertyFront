import React, { Fragment, useState } from "react";
import "./propertyTenantBondDetails.css";
import { Modal, Row, Col, ErrorMessage, Label, Field, ModalFooter, Button, ModalHeader } from "reactstrap";

const TenantBondDetails = props => {
  const [state, setState] = useState(false);

  const toggle = () => {
    setState(prev => !prev);
  };

  // console.log(props.blurState.bond_required);

  return (
    <Fragment>
      <div onClick={toggle} className="text-primary hoverBondDetails">
        Edit bond details <i className="fas fa-pen"></i>
      </div>

      <Modal isOpen={state} toggle={toggle} centered>

        <ModalHeader style={{ backgroundColor: "#153D58" }} >
          <div style={{ display: "flex", justifyContent: "space-between", width: "460px", marginTop: "10px" }}>
            <div>
              <span className="text-white"> Bond Details</span>
            </div>
            <i className="mdi mdi-close-thick font-size-20 text-white" onClick={toggle} style={{ cursor: "pointer" }}></i>
          </div>
        </ModalHeader>

        <div className="modal-body" style={{ backgroundColor: "#F2F6FA" }}>
          <Row className="mt-2">
            <Col md={12}>
              <Row className="mb-3">
                <Col md={6} className="d-flex align-items-start">
                  <div className="form-group-new">
                    <input
                      placeholder="0.00"
                      name="bond_required"
                      id="bond_required"
                      type="text"
                      className="form-control"
                      style={{
                        borderTopRightRadius: 0,
                        borderBottomRightRadius: 0,
                      }}
                      value={props.state2.bond_required}
                      onChange={props.handlePropertyFormTwoValues}
                    />
                    <label htmlFor="usr">Bond required</label>
                  </div>
                  <span className="input-group-append">
                    <span
                      className="input-group-text"
                      style={{
                        borderTopLeftRadius: 0,
                        borderBottomLeftRadius: 0,
                      }}
                    >
                      ৳
                    </span>
                  </span>
                </Col>

                <Col md={6} className="d-flex align-items-start">
                  <div className="form-group-new">
                    <input
                      placeholder="0.00"
                      name="bond_paid"
                      id="bond_paid"
                      type="text"
                      className="form-control"
                      style={{
                        borderTopRightRadius: 0,
                        borderBottomRightRadius: 0,
                      }}
                      value={props.state2.bond_paid}
                      onChange={props.handlePropertyFormBond}
                    />
                    <label htmlFor="usr">Bond already paid</label>
                  </div>
                  <span className="input-group-append">
                    <span
                      className="input-group-text"
                      style={{
                        borderTopLeftRadius: 0,
                        borderBottomLeftRadius: 0,
                      }}
                    >
                      ৳
                    </span>
                  </span>
                </Col>
              </Row>

              <Row className="mb-3">
                {/* <Col md={3}>
                  <Label for="bond_receipted" className="form-label text-dark">
                    Bond receipted
                  </Label>
                </Col> */}
                <Col md={6} className="d-flex align-items-start">
                  <div className="form-group-new">
                    <input
                      placeholder="0.00"
                      name="bond_receipted"
                      id="bond_receipted"
                      type="text"
                      disabled={true}
                      className="form-control"
                      style={{
                        borderTopRightRadius: 0,
                        borderBottomRightRadius: 0,
                      }}
                      value={props.state2.bond_receipted}
                      onChange={props.handlePropertyFormTwoValues}
                    />
                    <label htmlFor="usr"> Bond receipted</label>
                  </div>
                  <span className="input-group-append">
                    <span
                      className="input-group-text"
                      style={{
                        borderTopLeftRadius: 0,
                        borderBottomLeftRadius: 0,
                      }}
                    >
                      ৳
                    </span>
                  </span>
                </Col>
                <Col md={6} className="d-flex align-items-start">
                  <div className="form-group-new">
                    <input
                      placeholder="0.00"
                      name="bond_held"
                      id="bond_held"
                      type="text"
                      disabled={true}
                      className="form-control"
                      style={{
                        borderTopRightRadius: 0,
                        borderBottomRightRadius: 0,
                      }}
                      value={props.state2.bond_held}
                      onChange={props.handlePropertyFormTwoValues}
                    />
                    <label htmlFor="usr">Bond held</label>
                  </div>
                  <span className="input-group-append">
                    <span
                      className="input-group-text"
                      style={{
                        borderTopLeftRadius: 0,
                        borderBottomLeftRadius: 0,
                      }}
                    >
                      ৳
                    </span>
                  </span>
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
                  <div className="form-group-new">
                    <input
                      placeholder="0.00"
                      name="bond_arrears"
                      id="bond_arrears"
                      type="text"
                      disabled={true}
                      className="form-control"
                      style={{
                        borderTopRightRadius: 0,
                        borderBottomRightRadius: 0,
                      }}
                      value={props.state2.bond_arrears}
                      onChange={props.handlePropertyFormTwoValues}
                    />

                    <label htmlFor="usr">  Bond arrears</label>
                  </div>
                  <span className="input-group-append">
                    <span
                      className="input-group-text"
                      style={{
                        borderTopLeftRadius: 0,
                        borderBottomLeftRadius: 0,
                      }}
                    >
                      ৳
                    </span>
                  </span>
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
          <Button onClick={toggle} color="primary">
            <i className="fas fa-file-alt me-1"></i> Save
          </Button>
        </ModalFooter>
      </Modal>
    </Fragment>
  );
};

export default TenantBondDetails;
