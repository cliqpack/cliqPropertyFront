import React from "react";
import TenantDInfo from "./TenantDInfo";
import { useParams, withRouter, Link } from "react-router-dom";
import Header from "components/VerticalLayout/Header";

import logo from "../../assets/images/Asset-light.png";
import logoLightPng from "../../assets/images/logo-light.png";
import logoLightSvg from "../../assets/images/Asset-light.png";
import logoDark from "../../assets/images/Myday.png";
import { Col, Row } from "reactstrap";

const TenantDDetails = () => {

  const toggleMenuCallback = () => {
    var body = document.body;
    if (window.screen.width <= 998) {
      body.classList.toggle("sidebar-enable");
    } else {
      body.classList.toggle("vertical-collpsed");
      body.classList.toggle("sidebar-enable");
    }
  };

  return (
    <React.Fragment>


      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          backgroundColor: "#153D58",
          zIndex: 999,
        }}
        className="navbar-brand-box"
      >
        <Link to="/owner-tenant-dashboard" className="logo logo-dark">
          <span className="logo-sm">
            <img src={logo} alt="" height="22" />
          </span>
          <span className="logo-lg ">
            <img src={logoDark} alt="" height="30" />
          </span>
        </Link>

        <Link to="/owner-tenant-dashboard" className="logo logo-light">
          <span className="logo-sm">
            <img src={logo} alt="" height="30" />
          </span>
          <span className="logo-lg">
            <img src={logoDark} alt="" height="30" />
          </span>
        </Link>
      </div>

      <Header toggleMenuCallback={toggleMenuCallback} />
      <TenantDInfo />

    </React.Fragment>
  );
};

export default TenantDDetails;
