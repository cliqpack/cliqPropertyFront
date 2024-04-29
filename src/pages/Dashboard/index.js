import React, { useEffect, useState, useTransition } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  CardBody,
  CardTitle,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
  Input,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  CardText,
  Tooltip
} from "reactstrap";
import { connect } from "react-redux";
import LineApexChart from "../AllCharts/apex/chartapex";

//import Charts
import StackedColumnChart from "./StackedColumnChart";

import modalimage1 from "../../assets/images/product/img-7.png";
import modalimage2 from "../../assets/images/product/img-4.png";
import classnames from "classnames";

//import action
import {
  getChartsData,
  getInsightsActiveProperties,
  getInsightsEntryInspection,
  getInsightsExitInspection,
  getGainProperties,
  getLostProperties,
  getInsightTenantArears,
  getJobAssigned,
  getTaskOverdue,
  getDeshboardInsightsPropertyData,
  getJobsOpen,
  getConversationOpen
} from "../../store/actions";

// Pages Components
import WelcomeComp from "./WelcomeComp";
import MonthlyEarning from "./MonthlyEarning";
import SocialSource from "./SocialSource";
import ActivityComp from "./ActivityComp";
import TopCities from "./TopCities";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

//i18n
import { withTranslation } from "react-i18next";
import classNames from "classnames";
import moment from "moment";
import bankingSVG from "../../assets/images/banking.svg";
import SplineArea2 from "./Chart.js/SplineArea2";
import Aos from "aos";
import "aos/dist/aos.css";
import SelectSearch from "common/Select-Search/SelectSearch";
import CenterLoader from "common/Loader/CenterLoader";
import { Link, useHistory } from "react-router-dom";
import ShowActivityData from "pages/Properties/Activity/ShowActivityData";
import Knob from "../AllCharts/knob/knob";
import CommonSplineArea from "./Chart.js/CommonSplineArea";
import ChartLoader from "./Chart.js/ChartLoader";
import InsightsChartsBelowData from "./InsightsChartsBelowData";
import CommonTooltip from "common/Tooltip/CommonTooltip";
import CommonSplineAreaUp from "./Chart.js/CommonSplineAreaUp";

document.title = "CliqProperty";

const Dashboard = props => {
  const [seen, setSeen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [isShown, setIsShown] = useState({ nav1: false, nav2: false });


  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const toggleLoading = () => setIsLoading(prev => !prev);
  const [state, setState] = useState({
    reports: [
      { title: "Orders", iconClass: "bx-copy-alt", description: "1,235" },
      {
        title: "Revenue",
        iconClass: "bx-archive-in",
        description: "$35, 723",
      },
      {
        title: "Average Price",
        iconClass: "bx-purchase-tag-alt",
        description: "$16.2",
      },
      {
        title: "Average Price",
        iconClass: "bx-purchase-tag-alt",
        description: "$16.2",
      },
      {
        title: "Average Price",
        iconClass: "bx-purchase-tag-alt",
        description: "$16.2",
      },
      {
        title: "Average Price",
        iconClass: "bx-purchase-tag-alt",
        description: "$16.2",
      },
      {
        title: "Average Price",
        iconClass: "bx-purchase-tag-alt",
        description: "$16.2",
      },
      {
        title: "Average Price",
        iconClass: "bx-purchase-tag-alt",
        description: "$16.2",
      },
      {
        title: "Average Price",
        iconClass: "bx-purchase-tag-alt",
        description: "$16.2",
      },
    ],
    email: [
      { title: "Week", linkto: "#", isActive: false },
      { title: "Month", linkto: "#", isActive: false },
      { title: "Year", linkto: "#", isActive: true },
    ],
    modal: false,
    subscribemodal: false,
    chartSeries: [],
    chartSeriesStatus: false,
    periodType: "yearly",
    manager: {
      x: JSON.parse(window.localStorage.getItem("authUser")),
    },
    totalPropArrears: [],
    totalPropDate: [],
    portfolio: true,
    insights: false,
    activeTab: "1",
    selectedUser: { label: "All", value: "All" },
    optionsUser: [
      { label: "All", value: "All" },
      { label: "Lisa Qi", value: "Lisa Qi" },
    ],
    angle: 0,
  });
  // console.log(state.selectedUser);

  const [modalState, setModalState] = useState(false);
  const toggleModalState = () => {
    setModalState(prevState => !prevState);
  };

  const handleSelected = e => {
    setState({ ...state, selectedUser: e });
  };

  const handlePortfolio = () => {
    setState(prev => ({ ...prev, portfolio: true, insights: false }));
  };
  const handleInsights = () => {
    setState(prev => ({ ...prev, insights: true, portfolio: false }));
  };
  const toggle = tab => {
    // startTransition(() => {
    if (state.activeTab !== tab) {
      setState(prev => ({
        ...prev,
        activeTab: tab,
      }));
    }
    // })
    if (tab == "2") {
      props.getInsightsActiveProperties();
      props.getInsightsEntryInspection();
      props.getInsightsExitInspection();
      props.getGainProperties();
      props.getLostProperties();
      // props.getInsightTenantArears(3);
      // props.getInsightTenantArears(7);
      props.getJobAssigned();
      props.getTaskOverdue();
      props.getDeshboardInsightsPropertyData();
      props.getJobsOpen();
      props.getConversationOpen();
    }
  };

  useEffect(() => {
    if (!seen) {
      props.getChartsData();
      // localStorage.setItem("Menu", "Dashboard");
    }
    if (props.chartsData && !state.chartSeriesStatus) {
      let tpA = props.chartsData?.totalArrears?.map(item => item.total);
      let tpD = props.chartsData?.totalArrears?.map(item => item.paid_to);
      setState(prev => ({
        ...prev,
        chartSeries: props.chartsData,
        chartSeriesStatus: true,
        totalPropArrears: tpA,
        totalPropDate: tpD,
        angle: props.chartsData?.vacancies,

      }));
    }
    setSeen(true);
    Aos.init({ duration: 2000 });
  }, [props.chartsData]);

  // console.log(props.chartsData);


  const upperAllData = [
    {
      id: 1,
      title: "OUTBOX",
      number: props.chartsData?.outbox ? props.chartsData?.outbox : 0,
      icon: "fas fa-paper-plane",
      path: "messages",
    },
    {
      id: 2,
      title: "DISBURSEMENTS",
      number: props.chartsData?.disbursement ? props.chartsData?.disbursement : 0,
      icon: "fas fa-home",
      path: "disbursement/list",
    },
    {
      id: 3,
      title: "BANKING",
      number: `${props.chartsData?.banking ? props.chartsData?.banking : 0}`,
      // number: 1001001,

      icon: "fas fas fa-dollar-sign",
      path: "banking-list",
    },
    {
      id: 4,
      title: "BILLS OVERDUE",
      number: props.chartsData?.billsOverdue ? props.chartsData?.billsOverdue : 0,
      icon: "fas fas fa-align-justify",
      path: "bills",
    },
    {
      id: 5,
      title: "WITHDRAWALS",
      number: props.chartsData?.withdrawal ? props.chartsData?.withdrawal : 0,
      icon: "fas fas fa-upload",
      path: `withdrawalsList/${moment().format("MM")}/${moment().format(
        "YYYY"
      )} `,
    },
  ];

  const upperData = [
    {
      id: 1,
      title: "OUTBOX",
      number: props.chartsData?.outbox ? props.chartsData?.outbox : 0,
      icon: "fas fa-paper-plane",
      path: "messages",
    },
    {
      id: 2,
      title: "DISBURSEMENTS",
      number: props.chartsData?.disbursement ? props.chartsData?.disbursement : 0,
      icon: "fas fa-home",
      path: "disbursement/list",
    },
  ];

  const upperMainData =
    state.selectedUser.label == "All" ? upperAllData : upperData;

  const belowData = [
    {
      id: 0,
      title: "RECONCILIATION",
      number: props.chartsData?.reconcile,
      company: "Moment Pty Ltd",
      date: "All up to date",
      reconcile: props.chartsData?.reconcile,
      icon: "fas fa-balance-scale-right",
      path: "reconciliationsList",
    },
    {
      id: 1,
      title: "INVOICE ARREARS",
      number: `${props.chartsData?.invoiceAreas
        ? Math.round(props.chartsData?.invoiceAreas.toFixed(2))
        : 0
        }%`,
      icon: "bx bx-health",
      path: "",
      details: "of properties have invoice arrears",
      path: "propertylist",
    },
    {
      id: 2,
      title: "RENEWALS",
      number: props.chartsData?.upcomingLeaseRenewals ? props.chartsData?.upcomingLeaseRenewals : 0,
      icon: "fas fa-retweet",
      path: "propertylist",
      details: "upcoming renewals",
    },

    {
      id: 3,
      title: "JOBS",
      number: props.chartsData?.job ? props.chartsData?.job : 0,
      icon: "bx bxs-wrench",
      path: "maintenance",
      details: "jobs in progress",
    },
    {
      id: 4,
      title: "INSPECTION TASKS",
      number: props.chartsData?.inspectionTask
        ? props.chartsData?.inspectionTask
        : 0,
      icon: "bx bx-wifi",
      path: "inspections",
      details: "current inspection tasks",
    },
    {
      id: 5,
      title: "INSPECTION PLANING",
      number: props.chartsData?.inspectionPlanning ? props.chartsData?.inspectionPlanning : 0,
      icon: "bx bx-wifi",
      path: "planinspections",
      details: "overdue and due in next 30 days",
    },
    {
      id: 6,
      title: "TASKS",
      number: props.chartsData?.task ? props.chartsData?.task : 0,
      icon: "bx bxs-calendar-check",
      path: "tasks",
      details: "tasks to do",
    },
    {
      id: 7,
      title: "RENT REVIEWS",
      number: props.chartsData?.rent_review ? props.chartsData?.rent_review : 0,
      icon: "fas fa-laptop-house",
      path: "",
      details: "rent review due this week",
    },
    {
      id: 8,
      title: "REMINDERS",
      number: props.chartsData?.reminder ? props.chartsData?.reminder : 0,
      icon: "fas fa-tag",
      path: "allReminders",
      details: "Reminders",
    },
    {
      id: 9,
      title: "KEY MANAGEMENT",
      number: props.chartsData?.checkout ? props.chartsData?.checkout : 0,
      icon: "fas fa-key",
      // path: "manageKeys",
      path: "",
      details: "checked out",
    },
  ];

  const handleColumn = item => {
    if (state.selectedUser.label == "All") {
      if (item.title == "RECONCILIATION") {
        return 6;

      } else {
        return 3;
      }
    } else {
      if (item.title == "RECONCILIATION") {
        return 12;
      } else {
        return 6;
      }
    }
  };

  // const linkHandler = data => {
  //   console.log(data);
  //   // return
  //   if (data.path == 'propertylist') {
  //     if (data.title == 'INVOICE ARREARS') {
  //       console.log(data.title);
  //       history.push({
  //         pathname: `/propertylist`,
  //         state: {
  //           tab: 5
  //         }
  //       });
  //     } else {

  //     }
  //   } else if (data.path == '') {

  //   }
  // }

  const activityData = [
    {
      id: 53,
      property_id: 1,
      contact_id: null,
      owner_contact_id: null,
      tenant_contact_id: null,
      task_id: null,
      inspection_id: null,
      maintenance_id: null,
      listing_id: 1,
      comment: null,
      completed: null,
      status: "New Listing Created",
      type: "Created",
      created_at: "2023-08-16T05:16:28.000000Z",
      updated_at: "2023-08-16T05:16:28.000000Z",
      seller_contact_id: null,
      buyer_contact_id: null,
      send_user_id: null,
      received_user_id: null,
      mail_id: null,
      sender_user_id: null,
      user_id: null,
      received_user: null,
      sender_user: null,
      task: null,
      inspection: null,
      maintenance: null,
      listing: {
        id: 1,
        property_id: 1,
        type: "Townhouse",
        company_id: 1,
        status: "Draft",
        created_at: "2023-08-16T05:16:27.000000Z",
        updated_at: "2023-08-16T05:16:27.000000Z",
        summary: "Rental",
        reference: "ABBO60.7",
        bedroom: "2",
        bathroom: "3",
        car_space: "2",
        owner_first_name: "Haitao",
        owner_mobile_phone: "8613467311028",
        tenant_first_name: "Desiree",
        agent_first_name: "Raymond",
        next_inspection: "2022-08-12",
        advert_from: "2022-08-17",
        tenant_email: "djbrudenell@hotmail.com",
        tenant_mobile_phone: "417117953",
        tenant_moved_in: "2023-03-29",
        owner_email: "springlau56@gmail.com",
      },
      property_activity_email: [],
    },
    {
      id: 52,
      property_id: 1,
      contact_id: null,
      owner_contact_id: null,
      tenant_contact_id: 1,
      task_id: null,
      inspection_id: null,
      maintenance_id: 1380,
      listing_id: null,
      comment: null,
      completed: null,
      status: "New Maintenance Created",
      type: "Created",
      created_at: "2023-08-10T05:01:45.000000Z",
      updated_at: "2023-08-10T05:01:45.000000Z",
      seller_contact_id: null,
      buyer_contact_id: null,
      send_user_id: null,
      received_user_id: null,
      mail_id: null,
      sender_user_id: null,
      user_id: null,
      received_user: null,
      sender_user: null,
      task: null,
      inspection: null,
      maintenance: {
        id: 1380,
        property_id: 1,
        reported_by: "Tenant",
        access: "Tenant",
        due_by: null,
        manager_id: 1,
        tenant_id: "1",
        summary: "Gas Certificate",
        description: "asasa",
        work_order_notes: "asasa",
        status: "Reported",
        completed: null,
        company_id: 1,
        created_at: "2023-08-10T05:01:45.000000Z",
        updated_at: "2023-08-10T05:01:45.000000Z",
        property_reference: "ABBO60.7",
        manager_first_name: "Raymond Tang",
        manager_last_name: "Raymond Tang",
        maintenance_by_supplier_id: {},
        supplier_name: null,
      },
      listing: null,
      property_activity_email: [],
    },
    {
      id: 51,
      property_id: 1,
      contact_id: null,
      owner_contact_id: null,
      tenant_contact_id: null,
      task_id: null,
      inspection_id: null,
      maintenance_id: 1379,
      listing_id: null,
      comment: null,
      completed: null,
      status: "New Maintenance Created",
      type: "Created",
      created_at: "2023-08-09T09:04:34.000000Z",
      updated_at: "2023-08-09T09:04:34.000000Z",
      seller_contact_id: null,
      buyer_contact_id: null,
      send_user_id: null,
      received_user_id: null,
      mail_id: null,
      sender_user_id: null,
      user_id: null,
      received_user: null,
      sender_user: null,
      task: null,
      inspection: null,
      maintenance: {
        id: 1379,
        property_id: 1,
        reported_by: "Tenant",
        access: "Tenant",
        due_by: "0000-00-00",
        manager_id: 1,
        tenant_id: "1",
        summary: "Smoke Alarm Compliance",
        description: "ss",
        work_order_notes: null,
        status: "Reported",
        completed: null,
        company_id: 1,
        created_at: "2023-08-09T09:04:34.000000Z",
        updated_at: "2023-08-09T09:04:34.000000Z",
        property_reference: "ABBO60.7",
        manager_first_name: "Raymond Tang",
        manager_last_name: "Raymond Tang",
        maintenance_by_supplier_id: {},
        supplier_name: null,
      },
      listing: null,
      property_activity_email: [],
    },
    {
      id: 50,
      property_id: 1,
      contact_id: null,
      owner_contact_id: null,
      tenant_contact_id: null,
      task_id: null,
      inspection_id: null,
      maintenance_id: null,
      listing_id: null,
      comment: "Jake Wang yo",
      completed: "2023-08-09",
      status: "Created",
      type: "mention",
      created_at: "2023-08-09T07:15:43.000000Z",
      updated_at: "2023-08-09T07:15:43.000000Z",
      seller_contact_id: null,
      buyer_contact_id: null,
      send_user_id: 2,
      received_user_id: 2,
      mail_id: null,
      sender_user_id: 2,
      user_id: 2,
      received_user: "Jake Wang",
      sender_user: "Jake Wang",
      task: null,
      inspection: null,
      maintenance: null,
      listing: null,
      property_activity_email: [],
    },
    {
      id: 46,
      property_id: 1,
      contact_id: null,
      owner_contact_id: null,
      tenant_contact_id: null,
      task_id: null,
      inspection_id: null,
      maintenance_id: null,
      listing_id: null,
      comment: "Raymond Tang okk12",
      completed: "2023-07-26",
      status: "Created",
      type: "mention",
      created_at: "2023-07-26T10:56:30.000000Z",
      updated_at: "2023-07-26T10:56:30.000000Z",
      seller_contact_id: null,
      buyer_contact_id: null,
      send_user_id: 5,
      received_user_id: 1,
      mail_id: null,
      sender_user_id: null,
      user_id: null,
      received_user: "Raymond Tang",
      sender_user: null,
      task: null,
      inspection: null,
      maintenance: null,
      listing: null,
      property_activity_email: [],
    },
    {
      id: 41,
      property_id: 1,
      contact_id: null,
      owner_contact_id: null,
      tenant_contact_id: null,
      task_id: null,
      inspection_id: null,
      maintenance_id: null,
      listing_id: null,
      comment: "Raymond Tang vvvvv",
      completed: "2023-07-26",
      status: "Created",
      type: "mention",
      created_at: "2023-07-26T10:23:10.000000Z",
      updated_at: "2023-07-26T10:23:10.000000Z",
      seller_contact_id: null,
      buyer_contact_id: null,
      send_user_id: 5,
      received_user_id: 1,
      mail_id: null,
      sender_user_id: null,
      user_id: null,
      received_user: "Raymond Tang",
      sender_user: null,
      task: null,
      inspection: null,
      maintenance: null,
      listing: null,
      property_activity_email: [],
    },
  ];

  const graphDate = data =>
    moment(data?.[data.length - 1]).format("DD MMM yyyy");

  const upperDataHistory = data => {
    console.log(data);
    if (data == 'messages') {
      history.push('/messages', { from: "dashboard" })
    } else {
      history.push(`/${data}`)
    }
  }

  const bankingDataShow = data => {
    if (data > 999) {
      const balance = parseInt(data / 1000);
      console.log(balance);
      const amount = `${balance}k`;
      console.log(amount);
      return amount;
    } else {
      return data

    }
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs title={props.t("Dashboards")} breadcrumbItem={""} />

          <Row className="d-flex">
            <Col md={6}>
              <div className="">
                <Nav className="nav-tabs-custom-dashboard nav-justified">
                  <NavItem>
                    <NavLink
                      style={{ cursor: "pointer" }}
                      className={classnames({
                        active: isShown.nav1 == true || state.activeTab === "1",
                      })}
                      onClick={() => {
                        toggle("1");
                      }}
                      onMouseEnter={() =>
                        setIsShown({ ...isShown, nav1: true, nav2: false })
                      }
                      onMouseLeave={() =>
                        setIsShown({ ...isShown, nav1: false })
                      }
                    >
                      <div className="card-title">Portfolio</div>
                    </NavLink>
                  </NavItem>

                  <NavItem>
                    <NavLink
                      style={{ cursor: "pointer" }}
                      className={classnames({
                        active: isShown.nav2 == true || state.activeTab === "2",
                      })}
                      onClick={() => {
                        toggle("2");
                      }}
                      onMouseEnter={() =>
                        setIsShown({ ...isShown, nav2: true, nav1: false })
                      }
                      onMouseLeave={() =>
                        setIsShown({ ...isShown, nav2: false })
                      }
                    >
                      <div className="card-title">Insights</div>
                    </NavLink>
                  </NavItem>
                </Nav>
              </div>
            </Col>
            <Col md={6}>
              <Row className="">
                <Col className="d-flex justify-content-end align-items-center">
                  {/* <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="defaultCheck1"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="defaultCheck1"
                  >
                    Show details
                  </label>
                </div> */}
                </Col>
                <Col>
                  {/* <SelectSearch
                    value={state.selectedUser}
                    handler={handleSelected}
                    options={state.optionsUser}
                  /> */}
                </Col>
              </Row>
            </Col>
          </Row>

          <TabContent activeTab={state.activeTab} className="p-1">
            <TabPane tabId="1">
              <>
                <Row>
                  <Col
                    md={state.selectedUser.label == "All" ? "12" : "8"}
                    className=""
                  >
                    <Row
                      className={`my-3 d-flex ${state.selectedUser.label == "All"
                        ? ""
                        : "justify-content-end"
                        }`}
                    >
                      {upperMainData.map(item => (
                        <Col
                          sm={`${state.selectedUser.label == "All" ? "" : "3"}`}
                          key={item.id}
                        >

                          <div
                            key={item.id}
                            onClick={() => upperDataHistory(item.path)}
                            style={{
                              background:
                                item.title == "WITHDRAWALS"
                                  ? "#fde3dd"
                                  : "#159b9c38",
                              height: "100px",
                              borderRadius: "8px"

                            }}
                            className="custom_dashboard_div_style"
                          >
                            <div className="d-flex justify-content-end align-items-top pt-1 pe-2 text-muted">
                              {item.title}
                            </div>
                            <div
                              className="d-flex justisy-content-between align-items-center px-1 w-100 "
                              style={{ height: "90px" }}
                            >
                              <div className="col-md-6 d-flex justify-content-center">
                                {item.title == "WITHDRAWALS" ? (
                                  <div
                                    data-aos="zoom-in-up"
                                    data-aos-once={true}
                                    className="rounded-circle p-1"
                                    style={{
                                      background:
                                        item.title == "WITHDRAWALS" &&
                                        "#d2300e",
                                    }}
                                  >
                                    <span
                                      className="rounded-circle p-2"
                                      style={{
                                        color: "white",
                                        fontSize: "20px",
                                      }}
                                    >
                                      <i className={item.icon} />
                                    </span>
                                  </div>
                                ) : (
                                  <div
                                    className="rounded-circle p-1"
                                    style={{
                                      background:
                                        item.title == "WITHDRAWALS"
                                          ? "#d2300e"
                                          : "#42bff5",
                                    }}
                                  >
                                    <span
                                      className="rounded-circle p-2"
                                      style={{
                                        color: "white",
                                        fontSize: "20px",
                                      }}
                                    >
                                      <i className={item.icon} />
                                    </span>
                                  </div>
                                )}
                              </div>
                              <div className="col-md-6 d-flex justify-content-center">
                                <span

                                  style={{
                                    color:
                                      item.title == "WITHDRAWALS" &&
                                      "#d2300e",
                                    fontSize: "26px",
                                  }}
                                >

                                  {
                                    item.title == 'BANKING' ?
                                      <span className="">{bankingDataShow(item.number)}</span> :
                                      item.number ? item.number : "0"
                                  }



                                </span>
                              </div>
                            </div>
                          </div>

                        </Col>
                      ))}
                    </Row>

                    <Row>
                      <Col lg={6}>
                        <Link
                          to={{
                            pathname: `/propertylist`,
                            state: {
                              tab: "5",
                            },
                          }}
                          style={{ color: "black", cursor: "pointer" }}
                        >
                          <Card>
                            <CardBody>
                              <CardTitle className="mb-4">
                                MONTHLY RENT ARREARS -{" "}
                                {props?.chartsData?.arrears
                                  ? Math.round(
                                    props?.chartsData?.arrears
                                  ).toFixed(2)
                                  : "0.00"}{" "}
                                %
                              </CardTitle>
                              <LineApexChart
                                data={state?.totalPropArrears}
                                category={state?.totalPropDate}
                                xtitle={""}
                                ytitle={""}
                                min={0}
                                max={props?.chartsData?.totalProperties}
                                title={""}
                                height="250"
                              />
                            </CardBody>
                          </Card>
                        </Link>
                      </Col>
                      <Col xl="6">
                        {/* <TopCities data={props?.chartsData} /> */}

                        <Card>
                          <CardBody>
                            <Link to={{
                              pathname: 'propertylist',
                              state: {
                                tab: '6'
                              }
                            }}>
                              <div className="text-center" dir="ltr" >
                                <div className="d-flex justify-content-between">
                                  <span></span>
                                  <span>VACANCIES</span>
                                </div>
                                <Knob
                                  value={state.angle}
                                  fgColor="#ea553d"
                                  lineCap="round"
                                  height={260}
                                  width={200}
                                  readOnly={true}
                                  onChange={e => {
                                    // setState({ ...state, angle: e });
                                  }}
                                />
                              </div>
                            </Link>
                          </CardBody>
                        </Card>
                      </Col>
                    </Row>

                    <Row>
                      {belowData.map(item => (
                        <Col md={handleColumn(item)} key={item.id}>
                          <Link
                            to={{
                              pathname: `/${item.path == 'reconciliationsList' ? '/dashboard' : item.path}`,
                              state: {
                                tab:
                                  item.title == "INVOICE ARREARS"
                                    ? "5"
                                    : item.title == "RENEWALS"
                                      ? "7"
                                      : "",
                              },
                            }}
                            style={{ color: "black", cursor: "pointer" }}
                          >
                            {item.title == "RECONCILIATION" ? (
                              <Card
                                body
                                style={{
                                  height: "190px",
                                  borderRadius: "30px",
                                }}
                              >
                                <div
                                  className="d-flex justify-content-between"
                                  style={{ height: "40px" }}
                                >
                                  <div className="col-md-3 d-flex justify-content-start align-items-top">
                                    <i
                                      className={`${item.icon} font-size-24 text-info`}
                                    />
                                  </div>
                                  <div className="col-md-9 d-flex justify-content-end align-items-top text-muted">
                                    <span>{item.title}</span>
                                  </div>
                                </div>

                                <Row className="" style={{ height: "140px" }}>
                                  <Col
                                    md={6}
                                    className="d-flex flex-column justify-content-center align-items-center"
                                  >
                                    <span className="text-muted">
                                      {item.company}
                                    </span>
                                    <span className="mt-2 fw-bold">
                                      {item.reconcile == 0 ?
                                        <Link to={`/reconciliationsList`}>
                                          <Button color='info'>
                                            Reconcile
                                          </Button>
                                        </Link>
                                        :
                                        item.date}
                                    </span>
                                  </Col>
                                  <Col
                                    md={6}
                                    className="d-flex flex-column justify-content-center align-items-center"
                                  >
                                    <span style={{ fontSize: "50px" }}>
                                      {item.reconcile == 1 ? (
                                        <i className="fas fa-check-circle text-info" />
                                      ) : (
                                        <i className="fas fa-balance-scale-right text-warning" />
                                      )}
                                    </span>
                                    <span className="mt-2 text-muted">
                                      {item.reconcile == 1
                                        ? "Reconciled"
                                        : "Unreconciled"}
                                    </span>
                                  </Col>
                                </Row>
                              </Card>
                            ) : (
                              <Card
                                body
                                style={{
                                  height: "190px",
                                  borderRadius: "30px",
                                }}
                              >
                                <div
                                  className="d-flex justify-content-between"
                                  style={{ height: "40px" }}
                                >
                                  <div className="col-md-3 d-flex justify-content-start align-items-top">
                                    <i
                                      className={`${item.icon} font-size-24 text-info`}
                                    />
                                  </div>
                                  <div className="col-md-9 d-flex justify-content-end align-items-top text-muted">
                                    <span>{item.title}</span>
                                  </div>
                                </div>
                                <div
                                  className="d-flex flex-column justify-content-center align-items-center"
                                  style={{ height: "140px" }}
                                >
                                  <span style={{ fontSize: "38px" }}>
                                    {item.number}
                                  </span>
                                  <span className="text-muted">
                                    {item.details}
                                  </span>
                                </div>
                              </Card>
                            )}
                          </Link>
                        </Col>
                      ))}
                    </Row>
                  </Col>
                  {state.selectedUser.label != "All" && (
                    <Col md={4} className="pt-3">
                      <Card body>
                        <p
                          className="fw-bold ps-2"
                          style={{
                            borderBottom: "1.2px dotted #c9c7c7",
                          }}
                        >
                          Active Tasks
                        </p>
                        <div
                          style={{
                            padding: "10px",
                            maxHeight: "600px",
                            overflowY: "auto",
                            overflowX: "hidden",
                          }}
                          className="pb-2"
                        >
                          {activityData?.map((data, i) => (
                            <ShowActivityData
                              key={data.id}
                              data={data}
                              modalState={modalState}
                              setModalState={setModalState}
                              tog_large={toggleModalState}
                              component="Dashboard"
                            />
                          ))}
                        </div>
                      </Card>
                    </Col>
                  )}
                </Row>
                <Row>

                </Row>
              </>
            </TabPane>
            <TabPane tabId="2">
              <>
                <Row className="pt-4">

                  <Col md={4}>
                    <Card body style={{ borderBottomRightRadius: "30px" }}>
                      <CommonSplineAreaUp left='Properties' right='Total active properties' id={1} />



                      {props.insightsActivePropertiesLoading == "Success" ? (
                        <CommonSplineArea
                          seriesOne={
                            props.insightsActiveProperties?.series[0]?.data
                          }
                          seriesTwo={
                            props.insightsActiveProperties?.series[1]?.data
                          }
                          date={
                            props.insightsActiveProperties?.xaxis?.categories
                          }
                          text="Properties"
                        />
                      ) : (
                        <ChartLoader />
                      )}

                      {props.insightsActivePropertiesLoading == "Success" && (
                        <div className="d-flex justify-content-between">
                          <InsightsChartsBelowData
                            data={
                              props.insightsActiveProperties?.series[0]?.data
                            }
                            date={
                              props.insightsActiveProperties?.xaxis?.categories
                            }
                          />
                          <InsightsChartsBelowData
                            data={
                              props.insightsActiveProperties?.series[1]?.data
                            }
                            date={props.insightsActiveProperties?.xaxis1}
                            color="text-info"
                          />
                        </div>
                      )}
                    </Card>
                  </Col>

                  <Col md={4}>
                    <Card body style={{ borderBottomRightRadius: "30px" }}>

                      <CommonSplineAreaUp left='Properties gained' right='Total rental properties gained' id={2} />






                      {props.insightsGainPropertiesLoading == "Success" ? (
                        <CommonSplineArea
                          seriesOne={
                            props.insightsGainProperties?.series[0]?.data
                          }
                          seriesTwo={
                            props.insightsGainProperties?.series[1]?.data
                          }
                          date={props.insightsGainProperties?.xaxis?.categories}
                          text="Properties gained"
                        />
                      ) : (
                        <ChartLoader />
                      )}

                      {props.insightsGainPropertiesLoading == "Success" && (
                        <div className="d-flex justify-content-between">
                          <InsightsChartsBelowData
                            data={props.insightsGainProperties?.series[0]?.data}
                            date={
                              props.insightsGainProperties?.xaxis?.categories
                            }
                          />
                          <InsightsChartsBelowData
                            data={props.insightsGainProperties?.series[1]?.data}
                            date={props.insightsGainProperties?.xaxis1}
                            color="text-info"
                          />
                        </div>
                      )}
                    </Card>
                  </Col>

                  <Col md={4}>
                    <Card body style={{ borderBottomRightRadius: "30px" }}>

                      <CommonSplineAreaUp left='Properties lost' right='Total rental properties lost' id={3} />

                      {props.insightsLostPropertiesLoading == "Success" ? (
                        <CommonSplineArea
                          seriesOne={
                            props.insightsLostProperties?.series[0]?.data
                          }
                          seriesTwo={
                            props.insightsLostProperties?.series[1]?.data
                          }
                          date={props.insightsLostProperties?.xaxis?.categories}
                          text="Properties lost"
                        />
                      ) : (
                        <ChartLoader />
                      )}

                      {props.insightsLostPropertiesLoading == "Success" && (
                        <div className="d-flex justify-content-between">
                          <InsightsChartsBelowData
                            data={props.insightsLostProperties?.series[0]?.data}
                            date={
                              props.insightsLostProperties?.xaxis?.categories
                            }
                          />
                          <InsightsChartsBelowData
                            data={props.insightsLostProperties?.series[1]?.data}
                            date={props.insightsLostProperties?.xaxis1}
                            color="text-info"
                          />
                        </div>
                      )}
                    </Card>
                  </Col>

                  <Col md={4}>
                    <Card body style={{ borderBottomRightRadius: "30px" }}>


                      <CommonSplineAreaUp left='Inspections completed - routine' right='Total routine inspections completed' id={4} />

                      {props.dashboardInsightsPropertyDataLoading == "Success" ? (
                        <CommonSplineArea
                          seriesOne={
                            props.dashboardInsightsPropertyData?.series[0]?.data
                          }
                          seriesTwo={
                            props.dashboardInsightsPropertyData?.series[1]?.data
                          }
                          date={
                            props.dashboardInsightsPropertyData?.xaxis
                              ?.categories
                          }
                          text="Routine"
                        />
                      ) : (
                        <ChartLoader />
                      )}

                      {props.dashboardInsightsPropertyDataLoading ==
                        "Success" && (
                          <div className="d-flex justify-content-between">
                            <InsightsChartsBelowData
                              data={
                                props.dashboardInsightsPropertyData?.series[0]
                                  ?.data
                              }
                              date={
                                props.dashboardInsightsPropertyData?.xaxis
                                  ?.categories
                              }
                            />
                            <InsightsChartsBelowData
                              data={
                                props.dashboardInsightsPropertyData?.series[1]
                                  ?.data
                              }
                              date={props.dashboardInsightsPropertyData?.xaxis1}
                              color="text-info"
                            />
                          </div>
                        )}
                    </Card>
                  </Col>

                  <Col md={4}>
                    <Card body style={{ borderBottomRightRadius: "30px" }}>

                      <CommonSplineAreaUp left='Inspections completed - entry' right='Total entry inspections completed' id={5} />

                      {props.insightsEntryInspectionLoading == "Success" ? (
                        <CommonSplineArea
                          seriesOne={
                            props.insightsEntryInspection?.series[0]?.data
                          }
                          seriesTwo={
                            props.insightsEntryInspection?.series[1]?.data
                          }
                          date={
                            props.insightsEntryInspection?.xaxis?.categories
                          }
                          text="Entry"
                        />
                      ) : (
                        <ChartLoader />
                      )}

                      {props.insightsEntryInspectionLoading == "Success" && (
                        <div className="d-flex justify-content-between">
                          <InsightsChartsBelowData
                            data={
                              props.insightsEntryInspection?.series[0]?.data
                            }
                            date={
                              props.insightsEntryInspection?.xaxis?.categories
                            }
                          />
                          <InsightsChartsBelowData
                            data={
                              props.insightsEntryInspection?.series[1]?.data
                            }
                            date={props.insightsEntryInspection?.xaxis1}
                            color="text-info"
                          />
                        </div>
                      )}
                    </Card>
                  </Col>

                  <Col md={4}>
                    <Card body style={{ borderBottomRightRadius: "30px" }}>

                      <CommonSplineAreaUp left='Inspections completed - exit' right='Total exit inspections completed' id={6} />

                      {props.insightsExitInspectionLoading == "Success" ? (
                        <CommonSplineArea
                          seriesOne={
                            props.insightsExitInspection?.series[0]?.data
                          }
                          seriesTwo={
                            props.insightsExitInspection?.series[1]?.data
                          }
                          date={props.insightsExitInspection?.xaxis?.categories}
                          text="Exit"
                        />
                      ) : (
                        <ChartLoader />
                      )}

                      {props.insightsExitInspectionLoading == "Success" && (
                        <div className="d-flex justify-content-between">
                          <InsightsChartsBelowData
                            data={props.insightsExitInspection?.series[0]?.data}
                            date={
                              props.insightsExitInspection?.xaxis?.categories
                            }
                          />
                          <InsightsChartsBelowData
                            data={props.insightsExitInspection?.series[1]?.data}
                            date={props.insightsExitInspection?.xaxis1}
                            color="text-info"
                          />
                        </div>
                      )}
                    </Card>
                  </Col>




                  <Col md={4}>
                    <Card body style={{ borderBottomRightRadius: "30px" }}>

                      <CommonSplineAreaUp left='Jobs assigned time (average)' right='Average days a current unassigned job has been open' id={9} />

                      {props.insightsJobAssignedLoading == "Success" ? (
                        <CommonSplineArea
                          seriesOne={props.insightsJobAssigned?.series[0]?.data}
                          seriesTwo={props.insightsJobAssigned?.series[1]?.data}
                          date={props.insightsJobAssigned?.xaxis?.categories}
                          text="Assigned"
                        />
                      ) : (
                        <ChartLoader />
                      )}
                      {props.insightsJobAssignedLoading == "Success" && (
                        <div className="d-flex justify-content-between">
                          <InsightsChartsBelowData
                            data={props.insightsJobAssigned?.series[0]?.data}
                            date={props.insightsJobAssigned?.xaxis?.categories}
                          />
                          <InsightsChartsBelowData
                            data={props.insightsJobAssigned?.series[1]?.data}
                            date={props.insightsJobAssigned?.xaxis1}
                            color="text-info"
                          />
                        </div>
                      )}
                    </Card>
                  </Col>

                  <Col md={4}>
                    <Card body style={{ borderBottomRightRadius: "30px" }}>

                      <CommonSplineAreaUp left='Tasks overdue' right='Total of active tasks due' id={10} />

                      {props.insightsTaskOverdueLoading == "Success" ? (
                        <CommonSplineArea
                          seriesOne={props.insightsTaskOverdue?.series[0]?.data}
                          seriesTwo={props.insightsTaskOverdue?.series[1]?.data}
                          date={props.insightsTaskOverdue?.xaxis?.categories}
                          text="Overdue"
                        />
                      ) : (
                        <ChartLoader />
                      )}
                      {props.insightsTaskOverdueLoading == "Success" && (
                        <div className="d-flex justify-content-between">
                          <InsightsChartsBelowData
                            data={props.insightsTaskOverdue?.series[1]?.data}
                            date={props.insightsTaskOverdue?.xaxis1}
                            color="text-info"
                          />

                          <InsightsChartsBelowData data={props.insightsTaskOverdue?.series[0]?.data}
                            date={props.insightsTaskOverdue?.xaxis?.categories} />

                          <InsightsChartsBelowData data={props.insightsTaskOverdue?.series[1]?.data}
                            date={props.insightsTaskOverdue?.xaxis1} color='text-info' />

                        </div>)}
                    </Card>
                  </Col>

                  <Col md={4}>
                    <Card body style={{ borderBottomRightRadius: "30px" }}>

                      <CommonSplineAreaUp left='Jobs open' right='Total active jobs' id={11} />

                      {props.insightsJobsOpenLoading == "Success" ? (
                        <CommonSplineArea
                          seriesOne={props.insightsJobsOpen?.series[0]?.data}
                          seriesTwo={props.insightsJobsOpen?.series[1]?.data}
                          date={props.insightsJobsOpen?.xaxis?.categories}
                          text="Overdue"
                        />
                      ) : (
                        <ChartLoader />
                      )}
                      {props.insightsJobsOpenLoading == "Success" && (
                        <div className="d-flex justify-content-between">
                          <InsightsChartsBelowData
                            data={props.insightsJobsOpen?.series[0]?.data}
                            date={props.insightsJobsOpen?.xaxis?.categories}
                          />
                          <InsightsChartsBelowData
                            data={props.insightsJobsOpen?.series[1]?.data}
                            date={props.insightsJobsOpen?.xaxis1}
                            color="text-info"
                          />
                        </div>
                      )}
                    </Card>
                  </Col>

                  <Col md={4}>
                    <Card body style={{ borderBottomRightRadius: "30px" }}>

                      <CommonSplineAreaUp left='Conversations open' right='Total open conversations in the inbox' id={12} />

                      {props.insightsConversationOpenLoading == "Success" ? (
                        <CommonSplineArea
                          seriesOne={
                            props.insightsConversationOpen?.series[0]?.data
                          }
                          seriesTwo={
                            props.insightsConversationOpen?.series[1]?.data
                          }
                          date={props.insightsConversationOpen?.xaxis?.categories}
                          text='Overdue'
                        />
                      ) : (
                        <ChartLoader />
                      )}
                      {props.insightsConversationOpenLoading == "Success" &&
                        <div className="d-flex justify-content-between">
                          <InsightsChartsBelowData data={props.insightsConversationOpen?.series[0]?.data}
                            date={props.insightsConversationOpen?.xaxis?.categories} />
                          <InsightsChartsBelowData data={props.insightsConversationOpen?.series[1]?.data}
                            date={props.insightsConversationOpen?.xaxis1} color='text-info' />

                        </div>}

                    </Card>
                  </Col>
                </Row>
              </>
            </TabPane>
          </TabContent>
        </Container>
      </div>

      {/* {isLoading && <CenterLoader status={isLoading} toggle={toggleLoading} />} */}
    </React.Fragment>
  );
};

const mapStateToProps = gstate => {
  const {
    chartsData,
    insightsActiveProperties,
    insightsEntryInspection,
    insightsEntryInspectionLoading,
    insightsExitInspection,
    insightsGainProperties,
    insightsGainPropertiesLoading,
    insightsActivePropertiesLoading,
    insightsExitInspectionLoading,
    insightsLostProperties,
    insightsLostPropertiesLoading,
    insightsTenantArrears3Days,
    insightsTenantArrears3DaysLoading,
    insightsTenantArrears7Days,
    insightsTenantArrears7DaysLoading,
    insightsJobAssigned,
    insightsJobAssignedLoading,
    insightsTaskOverdue,
    insightsTaskOverdueLoading,
    dashboardInsightsPropertyData,
    dashboardInsightsPropertyDataLoading,
    insightsJobsOpen,
    insightsJobsOpenLoading,
    insightsConversationOpen,
    insightsConversationOpenLoading
  } = gstate.Dashboard;
  return {
    chartsData,
    insightsActiveProperties,
    insightsEntryInspection,
    insightsEntryInspectionLoading,
    insightsExitInspection,
    insightsGainProperties,
    insightsGainPropertiesLoading,
    insightsActivePropertiesLoading,
    insightsExitInspectionLoading,
    insightsLostProperties,
    insightsLostPropertiesLoading,
    insightsTenantArrears3Days,
    insightsTenantArrears3DaysLoading,
    insightsTenantArrears7Days,
    insightsTenantArrears7DaysLoading,
    insightsJobAssigned,
    insightsJobAssignedLoading,
    insightsTaskOverdue,
    insightsTaskOverdueLoading,
    dashboardInsightsPropertyData,
    dashboardInsightsPropertyDataLoading,
    insightsJobsOpen,
    insightsJobsOpenLoading,
    insightsConversationOpen,
    insightsConversationOpenLoading
  };
};

export default connect(mapStateToProps, {
  getChartsData,
  getInsightsActiveProperties,
  getInsightsEntryInspection,
  getInsightsExitInspection,
  getGainProperties,
  getLostProperties,
  getInsightTenantArears,
  getJobAssigned,
  getTaskOverdue,
  getDeshboardInsightsPropertyData,
  getJobsOpen,
  getConversationOpen
})(withTranslation()(Dashboard));
