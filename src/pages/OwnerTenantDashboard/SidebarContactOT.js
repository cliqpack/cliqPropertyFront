import React, { useState } from "react";
import { connect } from "react-redux";

//Simple bar
import SimpleBar from "simplebar-react";

// MetisMenu
import MetisMenu from "metismenujs";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import { withTranslation, useTranslation } from "react-i18next";

//i18n
import axios from "axios";
import menu from "store/ACL/menu/reducer";

import { MenuListDataOTFresh, MenuListDataOT } from "store/Menu/action";
import { useEffect } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom";

const SidebarContentOT = props => {
  const refDiv = React.createRef();
  const { t } = useTranslation();

  const [state, setState] = useState({
    menu: false,
    jsx: undefined,
    selected: undefined,
    style: {},
    path: undefined
  });
  const [init, setInit] = useState(true);
  const [initSide, setInitSide] = useState(true);

  useEffect(() => {
    if (props.menu_loading_ot == 'Success') {
      initMenu();
      setInit(true);
      props.MenuListDataOTFresh();
    }
  }, [props.menu_loading_ot]);
  let authUser = JSON.parse(localStorage.getItem("authUser"));
  // let language = localStorage.getItem("i18nextLng");
  let language = props.get_select_language_data?.data?.data
 console.log(language);

  let prop_id = localStorage.getItem("owner_property_id");

  useEffect(() => {
    if (language) {
      props.MenuListDataOT(prop_id);
    }
  }, [language]);

  if (initSide) {
    document.body.setAttribute("data-sidebar", "winter");
    setInitSide(false);
  }

  if (props.menu_data_ot != null && init) {
    var jsxTool = undefined;
    console.log(props.menu_data_ot);
    jsxTool = props.menu_data_ot?.data?.map((item, key) => {

      if (item.addon_menu_check?.menu?.slug) {
        return (
          <li key={key}>
            <Link to={`/${item.addon_menu_check?.menu?.slug}`}>
              <i
                className={
                  item.addon_menu_check?.menu?.slug == "propertylist"
                    ? "bx bx-store"
                    : item.addon_menu_check?.menu?.slug == "listing"
                      ? "bx bx-caret-down-circle"
                      : item.addon_menu_check?.menu?.slug == "inspections"
                        ? "bx bx-wifi"
                        : item.addon_menu_check?.menu?.slug == "maintenance" ? "bx bx-wrench" : 'bx bx-user'
                }
                style={{
                  color:
                    "/" + item.addon_menu_check?.menu?.slug == props.match.path
                      ? "white"
                      : "white",
                }}
              />

              <span
                style={{
                  color:
                    "/" + item.addon_menu_check?.menu?.slug == props.match.path
                      ? "white"
                      : "white",
                }}
              >

                {t(item?.addon_menu_check?.menu?.menu_title)}
              </span>
            </Link>
          </li>
        );
      }
    });
    setState({ ...state, jsx: jsxTool });
    setInit(false);
  }



  const initMenu = () => {
    new MetisMenu("#side-menu");

    let matchingMenuItem = null;
    const ul = document.getElementById("side-menu");
    const items = ul.getElementsByTagName("a");
    for (let i = 0; i < items.length; ++i) {
      if (props.location.pathname === items[i].pathname) {
        matchingMenuItem = items[i];
        break;
      }
    }
    if (matchingMenuItem) {
      activateParentDropdown(matchingMenuItem);
    }
  };


  const scrollElement = item => {
    setTimeout(() => {
      if (refDiv.current !== null) {
        if (item) {
          const currentPosition = item.offsetTop;
          if (currentPosition > window.innerHeight) {
            if (refDiv.current)
              refDiv.current.getScrollElement().scrollTop =
                currentPosition - 300;
          }
        }
      }
    }, 300);
  };

  const activateParentDropdown = item => {
    item.classList.add("active");
    const parent = item.parentElement;

    const parent2El = parent.childNodes[1];
    if (parent2El && parent2El.id !== "side-menu") {
      parent2El.classList.add("mm-show");
    }

    if (parent) {
      parent.classList.add("mm-active");
      const parent2 = parent.parentElement;

      if (parent2) {
        parent2.classList.add("mm-show"); // ul tag

        const parent3 = parent2.parentElement; // li tag

        if (parent3) {
          parent3.classList.add("mm-active"); // li
          parent3.childNodes[0].classList.add("mm-active"); //a
          const parent4 = parent3.parentElement; // ul
          if (parent4) {
            parent4.classList.add("mm-show"); // ul
            const parent5 = parent4.parentElement;
            if (parent5) {
              parent5.classList.add("mm-show"); // li
              parent5.childNodes[0].classList.add("mm-active"); // a tag
            }
          }
        }
      }
      scrollElement(item);
      return false;
    }
    scrollElement(item);
    return false;
  };



  return (
    <React.Fragment>
      <div data-simplebar className="h-100" style={{ backgroundColor: "#153D58" }}>
        <SimpleBar className="h-100" ref={refDiv} >
          <div id="sidebar-menu" >
            <ul className="metismenu list-unstyled" id="side-menu">
              <li className="menu-title">{t('Menu')}</li>
              <li>
                <Link to="/#">
                  <i className="bx bx-home-circle" style={{ color: "white" }} />
                  <span style={{ color: "white" }}> {t("Dashboard")}</span>

                </Link>
              </li>



              {state.jsx}

              <li>
                <Link to="/messages">
                  <i
                    className="bx bx-wifi"
                    style={{
                      color: "white",
                    }}
                  />

                  <span
                    style={{
                      color: "white",
                    }}
                  >
                    {t('Communication')}
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </SimpleBar>
      </div>
      <div className="sidebar-background"></div>
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  const { menu_data_ot, menu_loading_ot, menu_error_ot } = state.MenuList;

  const {
    get_select_language_data,

  } = state.property;

  return {
    menu_data_ot,
    menu_loading_ot,
    menu_error_ot,
    get_select_language_data
  };
};

export default withRouter(
  connect(mapStateToProps, { MenuListDataOTFresh, MenuListDataOT })(SidebarContentOT)
);
