import React, { useState } from "react";
import PropTypes from "prop-types";
import { useParams, withRouter, Link } from "react-router-dom";
//import logo from "../../assets/images/Asset-light.png";
import logo from "../../assets/images/logo.svg";
import logoLightPng from "../../assets/images/logo-light.png";
import logoLightSvg from "../../assets/images/Asset-light.png";
import logoDark from "../../assets/images/Myday.png";
import logoSamll from "../../assets/images/Asset-light.png";
import Header from "components/VerticalLayout/Header";
import SidebarContactOT from "./SidebarContactOT";

const OTHeader = props => {
  const [state, setState] = useState({
    isMobile: /iPhone|iPad|iPod|Android/i.test(navigator.userAgent),
    width: 0,
    height: 0,
  });
  // const toggleMenuCallback = toggleMenuCallback.bind();
  const toggleMenuCallback = () => {
    var body = document.body;
    if (window.screen.width <= 998) {
      body.classList.toggle("sidebar-enable");
    } else {
      body.classList.toggle("vertical-collpsed");
      body.classList.toggle("sidebar-enable");
    }
  };

  // console.log(props);
  return (
    <React.Fragment>
      {props.text == "1" ? (
        <div className="vertical-menu" >
          <div
            className="navbar-brand-box"
            style={{ backgroundColor: "#153D58" }}
          >
            <Link to="/owner-tenant-dashboard" className="logo logo-dark">
              <span className="logo-sm">
                <img src={logo} alt="" height="22" />
              </span>
              <span className="logo-lg">
                <img src={logoDark} alt="" height="30" />
              </span>
            </Link>

            <Link to="/owner-tenant-dashboard" className="logo logo-light">
              <span className="logo-sm">
                <img src={logo} alt="" height="22" />
              </span>
              <span className="logo-lg">
                <img src={logoDark} alt="" height="30" />
              </span>
            </Link>
          </div>
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              backgroundColor: "#153D58 !important",
              zIndex: 999,
            }}
            className="navbar-brand-box"
          >
            {/* <Link to="/" className="logo logo-dark">
              <span className="logo-sm">
                <img src={logo} alt="" height="22" />
              </span>
              <span className="logo-lg ">
                <img src={logoDark} alt="" height="30" />
              </span>
            </Link>

            <Link to="/" className="logo logo-light">
              <span className="logo-sm">
                <img src={logoLightSvg} alt="" height="22" />
              </span>
              <span className="logo-lg">
                <img src={logoDark} alt="" height="19" />
              </span>
            </Link> */}
          </div>
          <SidebarContactOT />
        </div>
      ) : (

        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            //backgroundColor: "#153D58 !important",
            backgroundColor: "#153D58",
            //color: "red",
            zIndex: 999,
            //border: "1px solid red"
          }}
          className="navbar-brand-box"
        >
          <Link to="/owner-tenant-dashboard" className="logo logo-dark">
            <span className="logo-sm">
              <img src={logo} alt="" height="30" />
            </span>
            <span className="logo-lg">
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
      )}

      {/* <Header toggleMenuCallback={toggleMenuCallback} /> */}
      <Header />
    </React.Fragment>
  );
};
OTHeader.propTypes = {
  type: PropTypes.string,
};
export default OTHeader;
