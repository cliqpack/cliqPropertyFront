import React, { Component, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { logoutUser, logoutUserSuccess } from "../../store/actions";

const Logout = props => {
  /**
   * Redirect to login
   */
  useEffect(() => {
    console.log(props);
    localStorage.removeItem("authUser");
    props.logoutUserSuccess();
    window.location.href = "login";
    // props.history.push("/login");
    // props.logoutUser(props.history);
  }, [props]);

  return <React.Fragment></React.Fragment>;
};

Logout.propTypes = {
  // history: PropTypes.any,
  // logoutUser: PropTypes.func,
  logoutUserSuccess: PropTypes.func,
};

export default withRouter(connect(null, { logoutUserSuccess })(Logout));
