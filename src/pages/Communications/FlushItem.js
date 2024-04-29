import React, { useState } from "react";
import { Collapse, Row, Col } from "reactstrap";
import moment from "moment";
import parse from "html-react-parser";
import { floor } from "lodash";

const FlushItem = props => {
  const [state, setState] = useState(props.open);

  const toggle = () => {
    setState(prev => !prev);
  };

  return (
    <>
      <div className="accordion-item">
        <h2 className="accordion-header" id="headingFlushOne">
          <button
            className="accordion-button fw-medium"
            type="button"
            onClick={toggle}
            style={{ cursor: "pointer" }}
          >
            <Row style={{ width: "100%" }}>
              <Col md={1}>
                <div
                  className="d-flex justify-content-center p-2"
                  style={{
                    borderRadius: "18px",
                    backgroundColor: "rgba(52, 58, 64, 0.25)",
                    height: "35px",
                    fontSize: "15px",
                  }}
                >
                  <i className="fas fa-mail-bulk"></i>
                </div>
              </Col>
              <Col md={6}>
                <div style={{ display: "flex", gap: "10px" }}>
                  <b>{props.mailData?.data?.from}</b> sent
                </div>
                <div style={{ display: "flex", gap: "10px" }}>
                  to <b>{props.mailData?.data?.to}</b>
                </div>
                {props.mailData?.data?.cc && state == true ? (
                  <div
                    style={{ display: "flex", gap: "10px", marginTop: "8px" }}
                  >
                    <b>Cc:</b> {props.mailData?.data?.cc}
                  </div>
                ) : null}
                {props.mailData?.data?.bcc && state == true ? (
                  <div
                    style={{ display: "flex", gap: "10px", marginTop: "8px" }}
                  >
                    <b>Bcc: </b>
                    {props.mailData?.data?.bcc}
                  </div>
                ) : null}
              </Col>
              <Col md={5}>
                <div className="d-flex justify-content-end">
                  <div className="fw-bold">
                    <span>
                      {" "}
                      {moment(props.mailData?.data?.created_at).format(
                        "dddd,Do MMMM YYYY"
                      )}
                    </span>{" "}
                  </div>
                </div>
                <div className="d-flex justify-content-end">
                  <div className="fw-bold">
                    <span>
                      {" "}
                      {moment(props.mailData?.data?.created_at).format(
                        "h:mm a"
                      )}
                    </span>
                  </div>
                </div>
              </Col>
            </Row>
          </button>
        </h2>
        <Collapse isOpen={state} className="accordion-collapse">
          <div
            className="accordion-body"
            style={{ border: "2px solid rgba(52, 58, 64, 0.25)" }}
          >
            <div className="text-muted">
              {props.mailData?.data?.body
                ? parse(props.mailData?.data?.body)
                : null}
            </div>
            <div className="mt-4">
              <Row>
                {props.mailData?.data?.mail_attachment?.map((item, key) => (
                  <Col sm={12} key={key}>
                    <div className="border-top mb-2 p-1">
                      <a
                        className=""
                        href={
                          `${process.env.REACT_APP_DOCUMENT}` +
                          item.attachemnt?.doc_path
                        }
                        target="blank"
                      >
                        <i className="fas fa-clipboard"></i>
                        {`.`} {item.attachemnt?.name}
                        {` (`} {floor(Number(item.attachemnt?.file_size) / 1024)}
                        {` kb)`}
                      </a>
                    </div>
                  </Col>
                ))}
              </Row>
            </div>
          </div>
        </Collapse>
      </div>
    </>
  );
};

export default FlushItem;
