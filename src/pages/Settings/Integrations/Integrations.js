import React, { useState, useEffect, useRef } from "react";
import moment from "moment";
import { connect, useSelector } from "react-redux";
import PropTypes, { number } from "prop-types";
import { useDispatch } from "react-redux";
import {
  Card,
  Alert,
  CardBody,
  CardText,
  CardTitle,
  Col,
  Container,
  Row,
  Label,
  Input,
  Button,
  CardHeader,
} from "reactstrap";
import Select from "react-select";
import { Link, useHistory, withRouter } from "react-router-dom";

import toastr from "toastr";

import { integrationsList } from 'store/actions'
import Img from '../../../assets/images/icon-realestate.svg'

document.title = "CliqProperty";

const Integrations = props => {

  const dispatch = useDispatch()
  const { integrationListData, integrationListLoading } = useSelector(state => state.Portfolio)
  // console.log(integrationListData, integrationListLoading);
  const history = useHistory();
  const [state, setState] = useState({});
  const [init, setInit] = useState(true)

  useEffect(() => {
    if (init) {
      dispatch(integrationsList());
      setInit(false)
    }
  }, [])


  useEffect(() => { }, []);

  const historyHandler = id => { history.push(`/providerSettingsForCompany/${id}`) }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <h4 className="ms-2 text-primary mb-4">Integrations</h4>
                  <div
                    className="w-100 mt-2 mb-4"
                    style={{
                      borderBottom: "1.2px dotted #c9c7c7",
                    }}
                  ></div>


                </CardBody>
              </Card>


              <div className="w-100 my-5 d-flex justify-content-start">
                <Link to='/addProvider'>
                  <Button className="info" >
                    Add
                  </Button>
                </Link>
              </div>
              <div className="py-1 w-100">
                {integrationListData?.data.map((item) =>
                  <Card key={item?.id} onClick={() => historyHandler(item?.id)}>
                    <CardBody>
                      <Row>
                        <Col md={6}>
                          <Row>
                            <Col md={12} className="d-flex justify-content-around align-items-center">
                              <img style={{ height: '60px' }} src={Img} />
                              <span>{item?.name}</span>
                            </Col>

                          </Row>
                        </Col>
                        <Col md={6} className={`d-flex justify-content-center align-items-center`}>
                          <span className={`${item?.is_enable == 1 ? '' : 'bg-success p-1 rounded-1'}`}>{item?.is_enable == 1 ? 'On' : 'Off'}</span>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                )
                }


                {/* <Card>
                  <CardBody>
                    <Row>
                      <Col md={6}>
                        <Row>
                          <Col md={12} className="d-flex justify-content-around align-items-center">
                            <img style={{ height: '60px' }} src={Img} />
                            <span>Realestate.com.au</span>
                          </Col>

                        </Row>
                      </Col>
                      <Col md={6} className="d-flex justify-content-center align-items-center">
                        <span className="bg-success p-1 rounded-1">Off</span>
                      </Col>
                    </Row>
                  </CardBody>
                </Card> */}
              </div>


            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = gstate => {
  const { } = gstate.Portfolio;

  return {};
};

export default withRouter(connect(mapStateToProps, {})(Integrations));
