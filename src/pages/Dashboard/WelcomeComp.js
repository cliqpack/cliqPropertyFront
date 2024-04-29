import React, { Component } from "react";
import { Row, Col, Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";

import avatar1 from "../../assets/images/users/avatar-1.jpg";
import profileImg from "../../assets/images/profile-img.png";

class WelcomeComp extends Component {
  constructor(props) {
    let x = JSON.parse(window.localStorage.getItem('authUser'))
    console.log(x.user.first_name);
    super(props)
    this.state = {
      name: "Messi",
      x: JSON.parse(window.localStorage.getItem('authUser'))
    }
  }

  render() {
    return (
      <React.Fragment>
        <Card className="overflow-hidden">
          <div className="bg-primary bg-soft">
            <Row>
              <Col xs="7">
                <div className="text-primary p-3">
                  <h5 className="text-primary">Welcome Back !</h5>
                  <p>CliqProperty Dashboard</p>
                </div>
              </Col>
              <Col xs="5" className="align-self-end">
                {/* <img src={profileImg} alt="" className="img-fluid" /> */}

              </Col>
            </Row>
          </div>
          <CardBody className="pt-0">
            <Row>
              <Col sm="6">
                <div className="avatar-md profile-user-wid mb-4">
                  {/* <img

                    src={this.state.x.user ? "http://backend-myday.cliqpack.com/public/Image/" + this.state.x.user.profile : avatar1}
                    alt=""
                    className="img-thumbnail rounded-circle"
                  /> */}
                </div>

                <h5 className="font-size-15 text-truncate">{this.state.x.user.first_name + " " + this.state.x.user.last_name}</h5>
                <p className="text-muted mb-0 text-truncate">Property Manager</p>
              </Col>

              <Col sm="6">
                <div className="pt-4">
                  {/* <Row>
                    <Col xs="6">
                      <h5 className="font-size-15">125</h5>
                      <p className="text-muted mb-0">Projects</p>
                    </Col>
                    <Col xs="6">
                      <h5 className="font-size-15">$1245</h5>
                      <p className="text-muted mb-0">Revenue</p>
                    </Col>
                  </Row> */}
                  <div className="mt-4">
                    {/* <Link
                      to=""
                      className="btn btn-info btn-sm"
                    >
                      View Profile {" "}<i className="mdi mdi-arrow-right ms-1" />
                    </Link> */}
                    {/* <Col xs="6" style={{ marginTop: "40px" }}>
                      <h5 className="font-size-15">$1245</h5>
                      <p className="text-muted mb-0">Revenue</p>
                    </Col> */}
                  </div>
                </div>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </React.Fragment>
    )
  }
}

export default WelcomeComp