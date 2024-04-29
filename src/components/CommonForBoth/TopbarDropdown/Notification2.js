import PropTypes from "prop-types";
import React, { Component, useEffect, useState } from "react";
import { Dropdown, DropdownToggle, DropdownMenu, Row, Col } from "reactstrap";
import SimpleBar from "simplebar-react";
import { connect } from "react-redux";
import { Link, withRouter, useHistory } from "react-router-dom";
import {
  getNotification,
  notificationRead,
  notificationReadFresh,
  getNotificationFresh,
  readAllNotificationFresh,
  notificationUnRead,
  notificationUnReadFresh,
  readAllNotification,
  getAllNotification,
} from "../../../store/auth/login/actions";
//Import images
import avatar3 from "../../../assets/images/users/avatar-3.jpg";
import avatar4 from "../../../assets/images/users/avatar-4.jpg";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
//i18n
import { withTranslation } from "react-i18next";
const Notification2 = props => {
  const history = useHistory()

  const [state, setState] = useState({ menu: false, init: true });
  const [menu, setMenu] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (props.unread_notification_loading == "Success") {
      props.notificationUnReadFresh();
      props.getNotification();
      props.getAllNotification();
    }

    if (props.read_all_notification_loading == "Success") {
      props.readAllNotificationFresh();
      props.getNotification();
      props.getAllNotification();
    }
    if (props.read_notification_loading == "Success") {
      props.notificationReadFresh();
      props.getNotification();
      props.getAllNotification();
    }



    // should uncomment the below api call

    let interval = setInterval(() => {
      props.getNotification();
    }, 10000);

    return () => clearInterval(interval);
  }, [
    props.read_notification_loading,
    props.read_all_notification_loading,
    props.unread_notification_loading,
    state.menu,
  ]);

  let manager;

  // (props.notification_list_details?.data?.data.map(item => {
  //     {
  //         var name = item?.data?.send_user_name,
  //             data = name.split(' '),
  //             output = '';

  //         for (var i = 0; i < data.length; i++) {
  //             output += data[i].substring(0, 1);
  //         }

  //         return output;
  //     }
  // }));

  const notificationHistoryPush = (data) => {



    if (data?.data?.property_id) {

      history.push('/propertyInfo/' + data?.data?.property_id)

    } else if (data?.data?.inspection_id) {

      // history.push(`/inspectionInfo/${data?.data?.inspection_id} `)
      history.push('/inspectionInfo/' + data?.data?.inspection_id)
    } else if (data?.data?.listing_id) {

      // history.push(`/ listingInfo / ${data?.data?.inspection_id} `)
      history.push('/listingInfo/' + data?.data?.listing_id)
    } else if (data?.data?.maintenance_id) {

      // history.push(`/ maintenanceInfo / ${data?.data?.maintenance_id} `)
      history.push('/maintenanceInfo/' + data?.data?.maintenance_id)
    } else if (data?.data?.type == 'Mail') {
      // console.log(data?.data);
      // console.log(data?.data?.type);
      // console.log(data?.data?.mail_id);
      // return
      history.push(`/messages-details/${data?.data?.mail_id}`)

    } else if (data?.data?.task_id) {
      history.push(`/task/show/${data?.data?.task_id}`)

    }
  }

  const readHandler = (data, msg) => {
    console.log(data);
    // console.log(data.data.property_id);
    // return




    if (msg == "read") {
      props.notificationRead(data.id);
      notificationHistoryPush(data)
    } else {
      props.notificationUnRead(data.id);
      notificationHistoryPush(data)
    }
  };

  const data = props.notification_list_details?.data?.data?.unread?.map(item =>
    item?.data?.send_user_name
      .split(" ")
      .map(word => word.charAt(0))
      .join("")
  );

  const readAllNotificationHandler = () => {
    props.readAllNotification();
  };

  const toggle = () => {
    if (menu == false) {
      props.getNotification();
    }
    setMenu(prev => !prev);
  };

  // console.log(props.notification_list_details?.data?.data);

  // const readData = props.notification_list_details?.data?.data.filter(item => item.read_at);
  // const notReadData = props.notification_list_details?.data?.data.filter(item => item.read_at === null);
  const moduleName = text => {
    // console.log(text.type, '-----');
    let name = "";
    if (text.property_id) {
      name = "Property";
    } else if (text.contact_id) {
      name = "Contact";
    } else if (text.inspection_id) {
      name = "Inspection";
    } else if (text.listing_id) {
      name = "Listing";
    } else if (text.maintenance_id) {
      name = "Maintenance";
    } else if (text.type == 'Mail') {
      name = 'Message'
    }
    // console.log(name);
    return name;
  };
  return (
    <React.Fragment>
      <Dropdown
        isOpen={menu}
        toggle={toggle}
        className="dropdown d-inline-block"
        tag="li"
      >
        <DropdownToggle
          className="btn header-item noti-icon"
          tag="button"
          id="page-header-notifications-dropdown"

        >
          <i className="bx bx-bell bx-tada" style={{ color: "gray", fontSize: "25px" }} />
          <span className="badge bg-danger rounded-pill">
            {props.notification_list_details?.data?.data?.unread?.length}
          </span>
        </DropdownToggle>

        <DropdownMenu className="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0" style={{ width: '400px' }}>
          <div className="p-3">
            <Row className="align-items-center">
              <Col>
                <h6 className="m-0 text-primary fw-bold"> {"Notifications"} </h6>
              </Col>
              <div className="col-auto">
                <a href="#" className="small">
                  {" "}
                  {/* View All */}
                </a>
              </div>
            </Row>
          </div>

          <SimpleBar style={{ height: "230px" }}>
            <div className="d-flex justify-content-between w-100 text-muted font-size-12 px-3">
              <div className="text-dark fw-bold">Unread</div>{" "}
              {props.notification_list_details?.data?.data?.unread?.length ==
                0 ? (
                ""
              ) : (
                <div
                  style={{ cursor: "pointer" }}
                  onClick={readAllNotificationHandler}
                >
                  Mark All as Read
                </div>
              )}
            </div>

            <div
              className="mt-1"
              style={{
                borderBottom: "1.2px dotted #c9c7c7",
              }}
            ></div>

            {props.notification_list_details?.data?.data?.unread?.length ==
              0 && (
                <div className="p-3 text-dark fw-bold">
                  No unread notifications right now
                </div>
              )}

            {props.notification_list_details?.data?.data?.unread?.map(item => (
              <div
                style={{ cursor: "pointer" }}
                key={item.id}
                className="text-reset notification-item"
                onClick={e => readHandler(item, "read")}
              >


                <div className="d-flex align-items-start">
                  <div className="avatar-xs me-2">
                    <span className="avatar-title bg-primary rounded p-1 font-size-14">
                      {item.data.send_user_name.split(' ')[0].slice(0, 1)}{item.data.send_user_name.split(' ')[1].slice(0, 1)}
                    </span>
                  </div>
                  <div className="flex-grow-1">
                    <div
                      className={
                        item.read_at
                          ? `font - size - 12 text - muted`
                          : `fw - bold font - size - 12`
                      }
                    >


                      {
                        item?.data?.type == 'Mail' ? <p className="mb-1">{item?.data?.comment}</p> :
                          item?.data?.type == "New Maintenance request from tenant" ? <p>{item?.data?.comment}</p> :
                            `${item?.data?.send_user_name} mentioned you ${item?.data?.comment} `
                      }
                      <p className="mb-0">
                        <span>
                          <i className="mdi mdi-clock-outline" />{" "}
                          {moment(item?.data?.date).format("Do MMMM, h:mm a")}
                        </span>
                        <span className="ms-4 ps-2 text-primary">
                          {`View ${moduleName(item?.data)} `}
                        </span>
                      </p>
                    </div>
                  </div>

                  <i className="fas fa-circle" />
                </div>
              </div>
            ))}

            {props.notification_list_details?.data?.data?.unread?.length ==
              0 ? (
              ""
            ) : (
              <>
                <div className="d-flex justify-content-start w-100 text-muted font-size-12 px-3 mt-2">
                  <div className="text-dark fw-bold">Read</div>
                </div>
                <div
                  className="mt-1"
                  style={{
                    borderBottom: "1.2px dotted #c9c7c7",
                  }}
                ></div>
              </>
            )}
            {props.notification_list_details?.data?.data?.unread?.length == 0
              ? ""
              : props.notification_list_details?.data?.data?.read?.map(item => (
                <div
                  style={{ cursor: "pointer", backgroundColor: '#E5E4E2' }}
                  key={item.id}
                  className="text-reset notification-item"
                  onClick={e => readHandler(item, "unread")}
                >
                  <div className="d-flex align-items-start">
                    <div className="avatar-xs me-2">

                      <span className="avatar-title bg-primary rounded p-1 font-size-14">
                        {item.data.send_user_name.split(' ')[0].slice(0, 1)}{item.data.send_user_name.split(' ')[1].slice(0, 1)}
                      </span>
                    </div>
                    <div className="flex-grow-1">
                      <div
                        className={
                          item.read_at
                            ? `font - size - 12 text - muted`
                            : `fw - bold font - size - 12`
                        }
                      >


                        {
                          item?.data?.type == 'Mail' ? <p className="mb-1">{item?.data?.comment}</p> :
                            item?.data?.type == "New Maintenance request from tenant" ? <p>{item?.data?.comment}</p> :
                              `${item?.data?.send_user_name} mentioned you ${item?.data?.comment} `
                        }
                        <p className="mb-0">
                          <span>
                            <i className="mdi mdi-clock-outline" />{" "}
                            {moment(item?.data?.date).format("Do MMMM, h:mm a")}
                          </span>
                          <span className="ms-4 ps-2 text-info">
                            {`View ${moduleName(item?.data)} `}
                          </span>
                        </p>
                      </div>
                    </div>
                    <i className="far fa-circle" />
                  </div>
                </div>
              ))}
          </SimpleBar>

          <div className="p-2 border-top d-grid">
            <Link
              to={`/allNotifications`}
              className="btn btn-sm btn-link font-size-14 text-center"
            >
              <i className="mdi mdi-arrow-right-circle me-1"></i>{" "}
              <span key="t-view-more">{"View All Notification"}</span>
            </Link>
          </div>
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  const {
    notification_list_details,
    read_notification_loading,
    notification_list_loading,
    read_all_notification_loading,
    unread_notification_loading,
  } = state.Login;
  return {
    notification_list_details,
    read_notification_loading,
    notification_list_loading,
    read_all_notification_loading,
    unread_notification_loading,
  };
};

export default connect(mapStateToProps, {
  getNotification,
  notificationRead,
  notificationReadFresh,
  getNotificationFresh,
  readAllNotificationFresh,
  notificationUnRead,
  notificationUnReadFresh,
  readAllNotification,
  getAllNotification,
})(Notification2);
