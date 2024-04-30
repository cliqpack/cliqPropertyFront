import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { } from "../../store/actions";

import { Link } from "react-router-dom";

//i18n
import { withTranslation } from "react-i18next";
import SidebarContent from "./SidebarContent";

import logo from "../../assets/images/Asset-light.png";
// import logoCliqProperty from "../../assets/images/white_long.png";
import logoCliqProperty from "../../assets/images/logo_cliq.png";
import logoLightPng from "../../assets/images/logo-light.png";
import logoLightSvg from "../../assets/images/Asset-light.png";
// import logoDark from "../../assets/images/Myday.png";
import logoDark from "../../assets/images/Myday.png";
import logoDarkNew from "../../assets/images/new_myday_image.svg";

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    document.body.setAttribute("data-sidebar", "winter");
  }

  render() {
    return (
      <React.Fragment>
        <div className="vertical-menu" style={{ backgroundColor: "#564BC6" }}>
          <div
            className="navbar-brand-box"
            style={{ backgroundColor: "#564BC6" }}
          >
            <Link to="/" className="logo logo-dark">
              <span className="logo-sm">
                <img src={logoCliqProperty} alt="" height="30" />
              </span>
              <span className="logo-lg">
                <img src={logoCliqProperty} alt="" height="30" />
              </span>
            </Link>

            <Link to="/" className="logo logo-light">
              <span className="logo-sm">
                <img src={logo} alt="" height="30" />
              </span>
              <span className="logo-lg">
                <img src={logoCliqProperty} alt="" height="30" />
              </span>
            </Link>
          </div>
          <div data-simplebar className="h-100">
            {this.props.type !== "condensed" ? (
              <SidebarContent />
            ) : (
              <SidebarContent />
            )}
          </div>
          <div className="sidebar-background"></div>
        </div>
      </React.Fragment>
    );
  }
}

Sidebar.propTypes = {
  type: PropTypes.string,
};

const mapStateToProps = state => {
  return {
    layout: state.Layout,
  };
};
export default connect(
  mapStateToProps,
  {}
)(withRouter(withTranslation()(Sidebar)));
