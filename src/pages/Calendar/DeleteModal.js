import React, { Component } from "react";
import PropTypes from "prop-types";
import { Col, Modal, ModalBody, Row } from "reactstrap";
import { withTranslation } from "react-i18next";
import { withRouter, Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";


class DeleteModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <React.Fragment>
        <Modal isOpen={this.props.show} toggle={this.props.onCloseClick} centered={true}>
          <ModalBody className="py-3 px-5">
            <Row>
              <Col lg={12}>
                <div className="text-center">
                  <i
                    className="mdi mdi-alert-circle-outline"
                    style={{ fontSize: "9em", color: "orange" }}
                  />
                  <h2>{this.props.t('Are')} {this.props.t('you')} {this.props.t('sure')}?</h2>
                  <h4>{this.props.t('You')} {this.props.t('won')}&apos;t {this.props.t('be')} {this.props.t('able')} {this.props.t('to')} {this.props.t('revert')} {this.props.t('this')}!</h4>
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="text-center mt-3">
                  <button
                    type="button"
                    className="btn btn-success btn-lg me-2"
                    onClick={this.props.onDeleteClick}
                  >
                    {this.props.t('Yes')}, {this.props.t('delete')} {this.props.t('it')}!
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger btn-lg me-2"
                    onClick={this.props.onCloseClick}
                  >
                    {this.props.t('Cancel')}
                  </button>
                </div>
              </Col>
            </Row>
          </ModalBody>
        </Modal>
      </React.Fragment>
    );
  }
}

DeleteModal.propTypes = {
  t: PropTypes.any,

  onCloseClick: PropTypes.func,
  onDeleteClick: PropTypes.func,
  show: PropTypes.any,
};

const mapStateToProps = state => {

};
// export default DeleteModal;

export default withRouter(
  connect(mapStateToProps, {})(withTranslation()(DeleteModal))
);
