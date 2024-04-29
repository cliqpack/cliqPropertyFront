import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
} from "react";
import { Col, Row } from "reactstrap";
import moment from "moment";

export default function CommentData(props) {
  var authUserData = JSON.parse(localStorage.getItem("authUser"));
  return (
    <div style={{ width: "100%", padding: "10px" }}>
      {props.data?.map((data, i) => (
        <div key={i}>
          {data?.comment && (
            <div>
              {/* mail comment is slidely different i use same component for all type of comment  */}
              {data?.mail_id != null && (
                <Row style={{ width: "100%" }}>
                  <Col md={1}>
                    <div
                      className="d-flex justify-content-center p-2"
                      style={{
                        borderRadius: "22px",
                        backgroundColor: "rgba(52, 58, 64, 0.25)",
                        height: "35px",
                        fontSize: "15px",
                        // marginRight: "50px"
                        padding: "7px"
                      }}
                    >
                      <i className="fas fa-user"></i>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div style={{ display: "flex", gap: "5px" }}>
                      <b>{data?.sender_user}</b> Comment
                    </div>
                  </Col>
                  <Col md={5}>
                    <div className="d-flex justify-content-end">
                      <div className="fw-bold">
                        <span>
                          {" "}
                          {moment(data?.created_at).format("dddd,Do MMMM YYYY")}
                        </span>{" "}
                      </div>
                    </div>
                    <div className="d-flex justify-content-end">
                      <div className="fw-bold">
                        <span>
                          {" "}
                          {moment(data?.created_at).format("h:mm a")}
                        </span>
                      </div>
                    </div>
                  </Col>
                </Row>
              )}
              <div className="py-2 mt-1 d-flex">
                <div
                  className="w-100 pb-1"
                  style={{
                    borderBottom: "1.2px dotted #c9c7c7",
                  }}
                >
                  <div className="d-flex justify-content-between align-items-center">
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <div className="avatar-sm me-1" style={{ marginBottom: "2px" }}>
                        <span className="avatar-title square-circle bg-light text-primary font-size-18">
                          {authUserData.user?.first_name.slice(0, 1)}{authUserData.user?.last_name.slice(0, 1)}
                        </span>
                      </div>

                      <span className="font-size-13 ms-1 p-3">

                        {data?.comment?.split(data.received_user)[0]}
                        {data?.received_user && (
                          <span className="p-1 badge badge-soft-dark p-2">
                            {data?.received_user}
                          </span>
                        )}
                        {data?.comment?.split(data.received_user)[1]}
                      </span>
                      {/* } */}
                    </div>
                    {/* mail comment is slidely different i use same component for all type of comment  */}
                    {data?.mail_id == null && (
                      <span>
                        <i className="far fa-calendar me-1"></i>{" "}
                        {moment(data?.created_at).format("DD/MM/yyyy, h:mm a")}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
