import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { withRouter, Link, useHistory } from "react-router-dom";

//i18n
import { withTranslation } from "react-i18next";

// users
import user1 from "../../../assets/images/users/avatar-1.jpg";

import { connect } from "react-redux";

import { profileDetails } from "store/actions";

const getUserName = () => {
  if (localStorage.getItem("authUser")) {
    const obj = JSON.parse(localStorage.getItem("authUser"));

    return obj;
  }
};

class ProfileMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: false,
      name: "Admin",
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      menu: !prevState.menu,
    }));
  }

  componentDidMount() {
    const userData = getUserName();
    if (userData) {
      this.setState({ name: userData.username });
    }
    if (this.props.profile_details === undefined) {
      this.props.profileDetails();
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.success !== this.props.success) {
      const userData = getUserName();
      if (userData) {
        this.setState({ name: userData.username });
      }
    }

    // console.log(this.props)
  }


  settingsHandler = () => {
    // localStorage.setItem("Menu", "Settings");
    this.props.history.push("/portfolioEditCompany");
  };

  homeHandler = () => {
    // localStorage.setItem("Menu", "Dashboard");
    this.props.history.push("/dashboard");

  }



  render() {
    let route = localStorage.getItem('Menu');
    let checkAccess = JSON.parse(localStorage.getItem("authUser"));

    return (
      <React.Fragment>
        <Dropdown
          isOpen={this.state.menu}
          toggle={this.toggle}
          className="d-inline-block"
          style={{ borderRadius: "30px", height: "40px", margin: "auto", color: "#FFF !important", border: "1px solid gray" }}
        >
          <DropdownToggle
            className="btn header-item"
            id="page-header-user-dropdown"
            tag="button"
            toggle={this.toggle}
            style={{ textAlign: "center", alignItems: "center", justifyContent: "center", display: "flex" }}

          >
            <img
              className="rounded-circle header-profile-user " style={{ width: "28px", height: "28px", marginTop: "-30px" }}
              src={
                this.props.profile_details
                  ? this.props.profile_details.profile
                    ? process.env.REACT_APP_IMAGE +
                    this.props.profile_details.profile
                    : user1
                  : user1
              }
              alt="Header Avatar"
            />{" "}
            <div style={{ marginTop: "-30px", color: "gray" }}>
              <span className="d-none d-xl-inline-block ms-1" >
                {/* {this.state.name} */}
                {/* {checkAccess?.user?.user_type} */}
                {this.props.t(checkAccess?.user?.user_type)}

              </span>{" "}
              <i className="mdi mdi-chevron-down d-none d-xl-inline-block" />
            </div>

          </DropdownToggle>
          <DropdownMenu className="dropdown-menu-end" toggle={this.toggle}
          >
            <DropdownItem tag="a">
              <Link to="/profile">
                <i className="bx bx-user font-size-16 align-middle me-1" />
                {this.props.t("Profile")}
              </Link>
            </DropdownItem>
            {/* <DropdownItem tag="a" href="/crypto-wallet">
                            <i className="bx bx-wallet font-size-16 align-middle me-1" />
                            {this.props.t("My Wallet")}
                        </DropdownItem> */}
            {checkAccess?.user?.user_type == 'Property Manager' &&
              <div>
                {route == 'Settings' ?


                  <DropdownItem tag="a">
                    {/* <span className="badge bg-success float-end">11</span> */}
                    {/* <Link to='/dashboard'> */}
                    <div onClick={this.homeHandler}>
                      <i className="bx bx-home-circle font-size-16 align-middle me-1" />
                      {this.props.t("Home")}
                    </div>
                    {/* </Link> */}
                  </DropdownItem>

                  :

                  <DropdownItem tag="a" >
                    {/* <span className="badge bg-success float-end">11</span> */}
                    <div onClick={this.settingsHandler}>
                      <i className="bx bx-wrench font-size-16 align-middle me-1" />
                      {this.props.t("Settings")}
                    </div>
                  </DropdownItem>
                }
              </div>}

            {/* <DropdownItem tag="a" href="auth-lock-screen">
                            <i className="bx bx-lock-open font-size-16 align-middle me-1" />
                            {this.props.t("Lock screen")}
                        </DropdownItem> */}
            <div className="dropdown-divider" />
            <Link to="/logout" className="dropdown-item">
              <i className="bx bx-power-off font-size-16 align-middle me-1 text-danger" />
              <span>{this.props.t("Logout")}</span>
            </Link>
          </DropdownMenu>
        </Dropdown>
      </React.Fragment>
    );
  }
}

ProfileMenu.propTypes = {
  t: PropTypes.any,
  success: PropTypes.string,
};

const mapStateToProps = state => {
  const { success, profile_details } = state.Profile;
  const pro_pic = state.Profile.pro_pic;
  return { success, pro_pic, profile_details };
};

export default withRouter(
  connect(mapStateToProps, { profileDetails })(withTranslation()(ProfileMenu))
);
