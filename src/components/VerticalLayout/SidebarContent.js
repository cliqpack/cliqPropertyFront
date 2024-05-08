import PropTypes from "prop-types";
import React, { useState } from "react";
import { connect } from "react-redux";

//Simple bar
import SimpleBar from "simplebar-react";

// MetisMenu
import MetisMenu from "metismenujs";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

//i18n
import { withTranslation, useTranslation } from "react-i18next";
import axios from "axios";
import menu from "store/ACL/menu/reducer";

import {
  MenuListData,
  MenuListDataOT,
  MenuListDataOTFresh,
} from "store/Menu/action";
import { useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom/cjs/react-router-dom";

const SidebarContent = props => {
  const { t } = useTranslation();
  const refDiv = React.createRef();
  const location = useLocation();
  const history = useHistory();
  console.log(location);
  let authUser = JSON.parse(localStorage.getItem("authUser"));
  // let language = localStorage.getItem("i18nextLng");
  let language = props.get_select_language_data?.data?.data
  const sideBarName = localStorage.getItem("Menu");

  const [state, setState] = useState({
    menu: false,
    jsx: undefined,
    selected: undefined,
    style: {},
    path: undefined,
  });
  const [init, setInit] = useState(true);
  const [expand, setExpand] = useState(false);
  const [expand2, setExpand2] = useState(false);
  const [settings, setSettings] = useState({
    portfolio: true,
    brand: false,
    messages: false,
    studio: false,
    activity: false,
  });

  const [menuSide, setMenuSide] = useState("Dashboard");
  let route = localStorage.getItem("Menu");

  const settingsToggleBrand = () => {
    setSettings(prev => ({ ...prev, brand: !prev.brand }));
  };
  const settingsToggleActivity = () => {
    setSettings(prev => ({ ...prev, activity: !prev.activity }));
  };
  const settingsToggleMessages = () => {
    setSettings(prev => ({ ...prev, messages: !prev.messages }));
  };
  const settingsToggleStudio = () => {
    setSettings(prev => ({ ...prev, studio: !prev.studio }));
  };

  const handleExpand = () => {
    setExpand(!expand);
    // localStorage.setItem("Menu", "Dashboard");
  };
  const handleExpand2 = () => {
    setExpand2(!expand2);
    // localStorage.setItem("Menu", "Dashboard");
  };

  const handleExpandPortfolio = () => {
    // setSettings(prev => ({ ...prev, portfolio: !prev.portfolio }));
    // history.push(location.pathname, {
    //   portfolio: true,
    //   brand: false,
    //   messages: false,
    //   studio: false,
    //   activity: false,
    // });
  };
  const dashboardHandler = () => {
    // localStorage.setItem("Menu", "Dashboard");
  };

  let prop_id = localStorage.getItem("owner_property_id");

  useEffect(() => {
    if (props.menu_loading === false) {
      props.MenuListData();
      if (prop_id != null) {
        props.MenuListDataOT(prop_id);
      }
      initMenu();
    }
    if (props.menu_loading_ot == "Success") {
      if (
        authUser?.user?.user_type == "Owner" ||
        authUser?.user?.user_type == "Tenant"
      ) {
        initMenu();
        setInit(true);
        // props.MenuListDataOTFresh();
      }
    }

    setInit(true);
    if (sideBarName) {
      setMenuSide(sideBarName);
    }
  }, [props.menu_loading, props.menu_loading_ot, sideBarName]);

  useEffect(() => {
    if (language) {
      props.MenuListData();
      if (prop_id != null) {
        props.MenuListDataOT(prop_id);
      }
      setInit(true);
    }
  }, [language]);

  const localizeItem = text => `${t(text)}`;

  // const colorMenu= async(slug) => {
  //   setState({ ...state, selected: slug });
  // }

  if (props.menu_data != null && init) {
    var jsxTool = undefined;
    jsxTool = props.menu_data?.data?.map((item, key) => {

      return (
        <li key={key}>
          <Link to={`/${item.slug}`}>
            <div onClick={dashboardHandler}>
              {/* <div style={{ border: "/" + item.slug == props.match.path ? "1px solid #A9F4E0" : "", borderRadius: "/" + item.slug == props.match.path ? "24.5px" : "", width: "/" + item.slug == props.match.path ? "100%" : "", padding: "/" + item.slug == props.match.path ? "8px" : "" }}> */}
              {/* <span onClick={handleLink(item.slug)}> */}
              <i
                className={
                  item.slug == "propertylist"
                    ? "bx bxs-home-circle"
                    : item.slug == "contactList"
                      ? "bx bxs-contact"
                      : item.slug == "listing"
                        ? "mdi mdi-format-list-bulleted-square"
                        : item.slug == "inspections"
                          ? "bx bx-wifi-1"
                          : item.slug == "maintenance"
                            ? "bx bxs-wrench"
                            : item.slug == "messages"
                              ? "bx bxs-message-dots"
                              : item.slug == "tasks"
                                ? "bx bxs-calendar-check"
                                : item.slug == "allReminders"
                                  ? "bx bxs-purchase-tag-alt"
                                  : item.slug == "reports"
                                    ? "bx bxs-file-blank"
                                    : null
                }
                style={{
                  color: "/" + item.slug == props.match.path ? "#FFC233" : "",
                  //'rgba(255, 254, 255, 0.6)',
                }}
              />

              <span
                style={{
                  color: "/" + item.slug == props.match.path ? "#FFC233" : "", //'rgba(255, 254, 255, 0.6)',
                }}
              >
                {t(item.menu_title)}
              </span>
            </div>
            {/* </div> */}
          </Link>
        </li>
      );
    });
    setState({ ...state, jsx: jsxTool });
    setInit(false);
  }
  if (
    authUser?.user?.user_type == "Owner" ||
    authUser?.user?.user_type == "Tenant"
  ) {
    // if (props.menu_data_ot != null && init) {
    if (props.menu_data_ot != null && init) {
      var jsxTool_ot = undefined;
      jsxTool_ot = props.menu_data_ot?.data?.map((item, key) => {
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
                          : item.addon_menu_check?.menu?.slug == "maintenance"
                            ? "bx bx-wrench"
                            : "bx bx-user"
                  }
                  style={{
                    color:
                      "/" + item.addon_menu_check?.menu?.slug ==
                        props.match.path
                        ? "white"
                        : "white", //'rgba(255, 254, 255, 0.6)',
                  }}
                />

                <span
                  style={{
                    color:
                      "/" + item.addon_menu_check?.menu?.slug ==
                        props.match.path
                        ? "white"
                        : "white", //'rgba(255, 254, 255, 0.6)',
                  }}
                >
                  {t(item?.addon_menu_check?.menu?.menu_title)}
                </span>
              </Link>
            </li>
          );
        }
      });
      setState({ ...state, jsx: jsxTool_ot });
      setInit(false);
    }
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

  const showActiveLink = data => location.pathname == data && "#FFC233";

  return (
    <React.Fragment>
      <SimpleBar className="h-100" ref={refDiv}>
        <div id="sidebar-menu">
          <ul className="metismenu list-unstyled" id="side-menu">
            {route == "Dashboard" && (
              <>
                <li className="menu-title">{t("Menu")}</li>
                <li>
                  <Link to="/#">
                    <i
                      className="bx bxs-dashboard"
                      style={{
                        color: location.pathname == "/dashboard" ? "#FFC233" : "",
                      }}
                    />
                    <span
                      style={{
                        color: location.pathname == "/dashboard" ? "#FFC233" : "",
                      }}
                      onClick={dashboardHandler}
                    >
                      {t("Dashboard")}
                    </span>
                    {/* <span>Dashboards</span> */}
                  </Link>
                </li>

                {/* <li className="menu-title">Apps</li> */}

                {state.jsx}

                {authUser?.user?.user_type == "Owner" ||
                  authUser?.user?.user_type == "Tenant" ? (
                  <li>
                    <Link to="/messages-owner">
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
                        {t("Communication")}
                      </span>
                    </Link>
                  </li>
                ) : null}

                {props.menu_data?.data?.length != 0 ? (
                  <>
                    {authUser?.user?.user_type != "Owner" ||
                      authUser?.user?.user_type != "Tenant" ? (
                      <>
                        <li>
                          <Link to="/users">
                            <i className="fas fa-users" style={{
                              color: location.pathname == "/users" ? "#FFC233" : "",
                            }} />
                            <span style={{
                              color: location.pathname == "/users" ? "#FFC233" : "",
                            }}>{t("Users")}</span>
                          </Link>
                        </li>
                        <li>
                          <Link
                            // to="#"
                            to={{
                              pathname: location.pathname,
                              state:
                              {
                                plan: true,
                              }
                            }}
                            className="has-arrow"
                            style={{ color: location.state?.plan ? "#FFC233" : "" }}
                            aria-expanded="false"
                          >
                            <i className="bx bxs-file" />
                            <span>{t("Plan")}</span>
                          </Link>
                          {location.state?.plan ? (
                            <ul className="sub-menu" aria-expanded="false">
                              <li>
                                <Link
                                  to={{
                                    pathname: "/addon-list",
                                    state:
                                    {
                                      plan: true,
                                    }
                                  }}
                                  style={{ color: showActiveLink("/addon-list") }}
                                >
                                  {t("Addons")}
                                </Link>
                              </li>
                              <li>
                                <Link
                                  to={{
                                    pathname: "/pre-menu-set",
                                    state:
                                    {
                                      plan: true,
                                    }
                                  }}
                                  style={{ color: showActiveLink("/pre-menu-set") }}
                                >
                                  {t("Prerequisite Addons")}
                                </Link>
                              </li>
                              {/* <li>
                            <Link to="/menu-price" style={{ color: "white" }}>
                              {t("Addons Price")}
                            </Link>
                          </li> */}
                              <li>
                                <Link
                                  to={{
                                    pathname: "/acl-plan",
                                    state:
                                    {
                                      plan: true,
                                    }
                                  }}
                                  style={{ color: showActiveLink("/acl-plan") }}
                                >
                                  {t("Plan")}
                                </Link>
                              </li>

                              <li>
                                <Link
                                  to={{
                                    pathname: "/user-plan",
                                    state:
                                    {
                                      plan: true,
                                    }
                                  }}
                                  style={{ color: showActiveLink("/user-plan") }}
                                >
                                  {t("User Plans")}
                                </Link>
                              </li>
                            </ul>
                          ) : (
                            ""
                          )}
                        </li>
                        <li>
                          <Link
                            to={{
                              pathname: location.pathname,
                              state:
                              {
                                accounts: true,
                              }
                            }}
                            className="has-arrow"
                            style={{ color: location.state?.accounts ? "#FFC233" : "" }}
                            aria-expanded="false"
                          >
                            <i className="fas fa-book" />
                            <span>{t("Accounts")}</span>
                          </Link>
                          {location.state?.accounts ? (
                            <ul className="sub-menu" aria-expanded="false">
                              <ul className="sub-menu" aria-expanded="false">
                                <li>
                                  <Link
                                    to={{
                                      pathname: "/transactions",
                                      state:
                                      {
                                        accounts: true,
                                      }
                                    }}
                                    style={{ color: showActiveLink("/transactions") }}
                                  >
                                    {t("Transactions")}
                                  </Link>
                                </li>

                                <li>
                                  <Link
                                    to={{
                                      pathname: "/bills",
                                      state:
                                      {
                                        accounts: true,
                                      }
                                    }}
                                    style={{ color: showActiveLink("/bills") }}
                                  >
                                    {t("Bills")}
                                  </Link>
                                </li>

                                <li>
                                  <Link
                                    to={{
                                      pathname: "/invoices",
                                      state:
                                      {
                                        accounts: true,
                                      }
                                    }}
                                    style={{ color: showActiveLink("/invoices") }}
                                  >
                                    {t("Invoices")}
                                  </Link>
                                </li>

                                <li>
                                  <Link
                                    to={{
                                      pathname: "/banking-list",
                                      state:
                                      {
                                        accounts: true,
                                      }
                                    }}
                                    style={{ color: showActiveLink("/banking-list") }}
                                  >
                                    {t("Banking")}
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    to={{
                                      pathname: "/reconciliationsList",
                                      state:
                                      {
                                        accounts: true,
                                      }
                                    }}
                                    style={{ color: showActiveLink("/reconciliationsList") }}
                                  >
                                    {t("Reconciliation")}
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    to={{
                                      pathname: "/disbursement/list",
                                      state:
                                      {
                                        accounts: true,
                                      }
                                    }}
                                    style={{ color: showActiveLink("/disbursement/list") }}
                                  >
                                    {t("Disbursement")}
                                  </Link>
                                </li>
                              </ul>
                            </ul>
                          ) : (
                            ""
                          )}
                        </li>
                      </>
                    ) : null}
                  </>
                ) : null}
              </>
            )}
          </ul>

          <ul className="metismenu list-unstyled" id="side-menu">
            {route == "Settings" && (
              <>
                <li className="menu-title">{t("Settings")}</li>
                <li>
                  <Link to="" onClick={dashboardHandler}>
                    <i
                      className="bx bx-home-circle"
                      style={{
                        color: location.pathname == "/dashboard" ? "white" : "",
                      }}
                    />
                    <span
                      style={{
                        color: location.pathname == "/dashboard" ? "white" : "",
                      }}
                      onClick={dashboardHandler}
                    >
                      {t("Dashboard")}
                    </span>
                    {/* <span>Dashboards</span> */}
                  </Link>
                </li>

                <>
                  <li>
                    <Link
                      to={{
                        pathname: location.pathname,
                        state:
                        {
                          portfolio: true,
                        }
                      }}
                      className="has-arrow"
                      style={{ color: location.state?.portfolio ? "#FFC233" : "" }}
                      aria-expanded="false"
                    // onClick={handleExpandPortfolio}
                    >
                      <i
                        className="bx bx-cog"
                        style={{ color: location.state?.portfolio ? "#FFC233" : "" }}
                      />
                      <span
                        style={{ color: location.state?.portfolio ? "#FFC233" : "" }}
                      >
                        {t("Portfolio")}
                      </span>
                    </Link>
                    {location.state?.portfolio ? (
                      <ul className="sub-menu" aria-expanded="false">
                        <li>
                          <Link
                            to={{
                              pathname: '/portfolioEditCompany',
                              state:
                              {
                                portfolio: true,
                                brand: false,
                                messages: false,
                                studio: false,
                                activity: false,
                              }
                            }}
                            style={{
                              color: showActiveLink("/portfolioEditCompany"),
                            }}
                          >
                            {t("Company")}
                          </Link>
                        </li>
                        <li>
                          <Link
                            to={{
                              pathname: '/portfolioBanking',
                              state:
                              {
                                portfolio: true,
                                brand: false,
                                messages: false,
                                studio: false,
                                activity: false,
                              }
                            }}
                            style={{
                              color: showActiveLink("/portfolioBanking"),
                            }}
                          >
                            {t("Banking")}
                          </Link>
                        </li>

                        <li>
                          <Link
                            to={{
                              pathname: '/portfolioLabels',
                              state:
                              {
                                portfolio: true,
                                brand: false,
                                messages: false,
                                studio: false,
                                activity: false,
                              }
                            }}
                            style={{
                              color: showActiveLink("/portfolioLabels"),
                            }}
                          >
                            {t("Labels")}
                          </Link>
                        </li>
                        <li>
                          <Link
                            to={{
                              pathname: '/portfolioAccounts',
                              state:
                              {
                                portfolio: true,
                                brand: false,
                                messages: false,
                                studio: false,
                                activity: false,
                              }
                            }}
                            style={{
                              color: showActiveLink("/portfolioAccounts"),
                            }}
                          >
                            {t("Chart of Accounts")}
                          </Link>
                        </li>
                        <li>
                          <Link
                            to={{
                              pathname: '/portfolioFees',
                              state:
                              {
                                portfolio: true,
                                brand: false,
                                messages: false,
                                studio: false,
                                activity: false,
                              }
                            }}
                            style={{ color: showActiveLink("/portfolioFees") }}
                          >
                            {t("Fees")}
                          </Link>
                        </li>
                        <li>
                          <Link
                            to={{
                              pathname: '/portfolioReasons',
                              state:
                              {
                                portfolio: true,
                                brand: false,
                                messages: false,
                                studio: false,
                                activity: false,
                              }
                            }}
                            style={{
                              color: showActiveLink("/portfolioReasons"),
                            }}
                          >
                            {t("Gain/Lost Reasons")}
                          </Link>
                        </li>
                        <li>
                          <Link
                            to={{
                              pathname: '/portfolioReminders',
                              state:
                              {
                                portfolio: true,
                                brand: false,
                                messages: false,
                                studio: false,
                                activity: false,
                              }
                            }}
                            style={{
                              color: showActiveLink("/portfolioReminders"),
                            }}
                          >
                            {t("Reminders")}
                          </Link>
                        </li>
                      </ul>
                    ) : (
                      ""
                    )}
                  </li>

                  <li>
                    <Link
                      to={{
                        pathname: location.pathname,
                        state:
                        {
                          brand: true,
                        }
                      }}
                      className="has-arrow"
                      style={{ color: location.state?.brand ? "#FFC233" : "" }}
                      aria-expanded="false"
                      onClick={settingsToggleBrand}
                    >
                      <i
                        className="bx bxs-edit-alt"
                      // style={{ color: location.state?.brand ? "white" : "" }}
                      />
                      <span>
                        {t("Brand")}
                      </span>
                    </Link>
                    {location.state?.brand == true ? (
                      <ul className="sub-menu" aria-expanded="false">
                        <li>
                          <Link
                            to={{
                              pathname: '/brandStatement',
                              state:
                              {
                                portfolio: false,
                                brand: true,
                                messages: false,
                                studio: false,
                                activity: false,
                              }
                            }}
                            style={{ color: showActiveLink("/brandStatement") }}
                          >
                            {t("Statements")}
                          </Link>
                        </li>

                        <li>
                          <Link
                            to={{
                              pathname: '/emailSettings',
                              state:
                              {
                                portfolio: false,
                                brand: true,
                                messages: false,
                                studio: false,
                                activity: false,
                              }
                            }}
                            style={{ color: showActiveLink("/emailSettings") }}
                          >
                            {t("Email")}
                          </Link>
                        </li>
                      </ul>
                    ) : (
                      ""
                    )}
                  </li>

                  <li>
                    <Link to="/admin-register"
                      style={{ color: showActiveLink("/admin-register") }}
                    >
                      <i className="fas fa-users" />
                      <span>{t("Teams")}</span>
                    </Link>
                  </li>

                  <li>
                    <Link
                      to={{
                        pathname: location.pathname,
                        state:
                        {
                          activity: true,
                        }
                      }}
                      className="has-arrow"
                      style={{ color: location.state?.activity ? "#FFC233" : "" }}
                      aria-expanded="false"
                      onClick={settingsToggleActivity}
                    >
                      <i className="bx bx-wifi" />
                      <span>{t("Activity")}</span>
                    </Link>
                    {location.state?.activity == true ? (
                      <ul className="sub-menu" aria-expanded="false">
                        <li>
                          <Link
                            to={{
                              pathname: '/activityLog',
                              state:
                              {
                                portfolio: false,
                                brand: false,
                                messages: false,
                                studio: false,
                                activity: true,
                              }
                            }}
                            style={{ color: showActiveLink("/activityLog") }}
                          >
                            {t("Log")}
                          </Link>
                        </li>
                        <li>
                          <Link
                            to={{
                              pathname: '/activityDocuments',
                              state:
                              {
                                portfolio: false,
                                brand: false,
                                messages: false,
                                studio: false,
                                activity: true,
                              }
                            }}
                            style={{
                              color: showActiveLink("/activityDocuments"),
                            }}
                          >
                            {t("Documents")}
                          </Link>
                        </li>
                      </ul>
                    ) : (
                      ""
                    )}
                  </li>

                  {/* <li>
                    <Link
                      to="#"
                      className="has-arrow"
                      style={{ color: settings.messages && "white" }}
                      aria-expanded="false"
                      onClick={settingsToggleMessages}
                    >
                      <i className="bx bxs-message-dots" />
                      <span>{t("Messages")}</span>
                    </Link>
                    {settings.messages == true ? (
                      <ul className="sub-menu" aria-expanded="false">
                        <li>
                          <Link to="/messageOptions" style={{ color: showActiveLink('/messageOptions') }}>
                            {t("Options")}
                          </Link>
                        </li>

                        <li>
                          <Link
                            to="/activityDocuments"
                            style={{ color: "white" }}
                          >
                            {t("Documents")}
                          </Link>
                        </li>
                      </ul>
                    ) : (
                      ""
                    )}
                  </li> */}

                  <li>
                    <Link
                      to={{
                        pathname: location.pathname,
                        state:
                        {
                          messages: true,
                        }
                      }}
                      className="has-arrow"
                      style={{ color: location.state?.messages ? "#FFC233" : "" }}
                      aria-expanded="false"
                      onClick={settingsToggleMessages}
                    >
                      <i className="bx bxs-message-dots" />
                      <span>{t("Messages")}</span>
                    </Link>
                    {location.state?.messages == true ? (
                      <ul className="sub-menu" aria-expanded="false">
                        <li>
                          <Link
                            to={{
                              pathname: '/messageOptions',
                              state:
                              {
                                portfolio: false,
                                brand: false,
                                messages: true,
                                studio: false,
                                activity: false,
                              }
                            }}
                            style={{
                              color: showActiveLink("/messageOptions"),
                            }}
                          >
                            {t("Options")}
                          </Link>
                        </li>

                        {/* <li>
                          <Link
                            to="/activityDocuments"
                            style={{ color: "white" }}
                          >
                            {t("Documents")}
                          </Link>
                        </li> */}
                      </ul>
                    ) : (
                      ""
                    )}
                  </li>

                  <li>
                    <Link
                      to="/integrations"
                      style={{ color: showActiveLink("/integrations") }}
                    >
                      <i className="fas fa-puzzle-piece" />
                      <span>{t("Integrations")}</span>
                    </Link>
                  </li>
                </>
              </>
            )}
          </ul>
        </div>
      </SimpleBar>
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  const {
    menu_data,
    menu_loading,
    menu_error,

    menu_data_ot,
    menu_loading_ot,
    menu_error_o,
  } = state.MenuList;

  const {
    select_language_data, select_language_loading, get_select_language_data, get_select_language_loading

  } = state.property;
  return {
    menu_data,
    menu_loading,
    menu_error,

    menu_data_ot,
    menu_loading_ot,
    menu_error_o,

    select_language_data, select_language_loading, get_select_language_data, get_select_language_loading

  };
};

export default withRouter(
  connect(mapStateToProps, {
    MenuListData,
    MenuListDataOT,
    MenuListDataOTFresh,
  })(SidebarContent)
);
