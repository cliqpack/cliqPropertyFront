import React, { Component } from "react"
import { Card, CardBody, CardTitle, Progress } from "reactstrap"

class TopCities extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <React.Fragment>
        <Card>
          <CardBody>
            <CardTitle className="mb-4 h4">Important Stats</CardTitle>
            <div className="text-center">
              <div className="mb-4">
                <i className="bx bx-map-pin text-primary display-4" style={{ lineHeight: '1' }} />
              </div>
              {/* <h3>1,456</h3>
              <p>San Francisco</p> */}
            </div>

            <div className="table-responsive mt-4">
              <table className="table align-middle table-nowrap">
                <tbody>
                  {/* <tr>
                    <td style={{ width: "30%" }}>
                      <p className="mb-0">Jobs</p>
                    </td>
                    <td style={{ width: "25%" }}>
                      <h5 className="mb-0">{this.props?.data?.job}</h5>
                    </td>
                    <td>
                      <Progress
                        value={(this.props?.data?.job)* 10}
                        color="info"
                        className="progress bg-transparent progress-sm"
                        size="sm"
                      />
                    </td>
                  </tr> */}

                  <tr>
                    <td>
                      <p className="mb-0">Owners</p>
                    </td>
                    <td>
                      <h5 className="mb-0">  {this.props?.data?.owners}</h5>

                    </td>
                    <td>
                      <Progress
                        value={(this.props?.data?.owners) * 10}
                        color="success"
                        className="progress bg-transparent progress-sm"
                        size="sm"
                      />
                    </td>
                  </tr>


                  <tr>
                    <td>
                      <p className="mb-0">Tenants</p>
                    </td>
                    <td>
                      <h5 className="mb-0">  {this.props?.data?.tenants}</h5>

                    </td>
                    <td>
                      <Progress
                        value={(this.props?.data?.tenants) * 10}
                        color="success"
                        className="progress bg-transparent progress-sm"
                        size="sm"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p className="mb-0">Suppliers</p>
                    </td>
                    <td>
                      <h5 className="mb-0">  {this.props?.data?.suppliers}</h5>

                    </td>
                    <td>
                      <Progress
                        value={(this.props?.data?.suppliers) * 10}
                        color="success"
                        className="progress bg-transparent progress-sm"
                        size="sm"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p className="mb-0">Sellers</p>
                    </td>
                    <td>
                      <h5 className="mb-0">  {this.props?.data?.sellers}</h5>

                    </td>
                    <td>
                      <Progress
                        value={(this.props?.data?.sellers) * 10}
                        color="success"
                        className="progress bg-transparent progress-sm"
                        size="sm"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p className="mb-0">Buyers</p>
                    </td>
                    <td>
                      <h5 className="mb-0">  {this.props?.data?.buyers}</h5>

                    </td>
                    <td>
                      <Progress
                        value={(this.props?.data?.buyers) * 10}
                        color="success"
                        className="progress bg-transparent progress-sm"
                        size="sm"
                      />
                    </td>
                  </tr>

                </tbody>
              </table>
            </div>
          </CardBody>
        </Card>
      </React.Fragment>
    )
  }
}

export default TopCities
