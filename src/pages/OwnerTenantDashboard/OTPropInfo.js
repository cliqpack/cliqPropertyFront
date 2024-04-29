import Header from "components/VerticalLayout/Header";
import React, { useEffect, useState } from "react";
import { useParams, withRouter, Link } from "react-router-dom";
import OTPropertyInfo2 from "./OTPropertyInfo2";
import { MenuListDataOT } from "store/Menu/action";
import { connect } from "react-redux";
import OTHeader from "./OTHeader";

const OTPropInfo = props => {
  const id = useParams();
  const [init, setInit] = useState(true);
  localStorage.setItem('owner_property_id', id.id);

  if (init) {
    props.MenuListDataOT(id.id)
    setInit(false);
  }


  return (
    <React.Fragment>
      <div id="layout-wrapper">
        <OTHeader text="1" />
        <div className="main-content">
          <OTPropertyInfo2 />
        </div>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  const { menu_data_ot, menu_loading_ot, menu_error_ot } = state.MenuList;
  return {
    menu_data_ot,
    menu_loading_ot,
    menu_error_ot,
  };
};
export default connect(mapStateToProps, { MenuListDataOT })(OTPropInfo);
