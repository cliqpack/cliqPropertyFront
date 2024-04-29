import React, { useEffect, useState } from "react";
import { Link, withRouter, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import Parser from "html-react-parser";
import {
  Card,
  Alert,
  CardBody,
  CardTitle,
  Col,
  Container,
  Row,
  CardText,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Label,
  Input,
  Button,
  CardHeader,
} from "reactstrap";
import DatatableTables2 from "../Tables/DatatableTables2";
import classnames from "classnames";
import {
  ListingList,
  ListingsListFresh,
  rentalListingFresh,
  deleteListingFresh,
  ListingsInfoFresh,
  GetListingSliderImageFresh,
} from "../../store/Listings/actions";
import ListingModal1 from "./ListingModal1";
import GeneralFeatureModal from "./GeneralFeatureModal/GeneralFeatureModal";
import LinkModal from "./GeneralFeatureModal/LinkModal";
import Breadcrumbs from "components/Common/Breadcrumb";

const Listings = props => {
  const history = useHistory();

  const [state, setState] = useState({
    activeTab: "1",
  });

  const [init, setInit] = useState(true)

  const toggle = tab => {
    if (state.activeTab !== tab) {
      setState({
        ...state,
        activeTab: tab,
      });
    }
  };

  useEffect(() => {
    if (props.listing_list_info_loading === 'Success') {
      props.ListingsInfoFresh();
      props.GetListingSliderImageFresh();
    }
    if (props.delete_listing_loading === 'Success') {
      props.deleteListingFresh();
    }
    if (init) {
      props.ListingList();
      setInit(false)
    }

    if (props.rental_listing_loading === "Success") {
      props.rentalListingFresh();
    }
  }, [props.listing_list_loading, props.listing_list_data?.data, props.delete_listing_loading]);

  console.log(props.listing_list_data);


  const ref = (cell, row) => {
    return <span className="text-primary">{cell}</span>;
  };
  const statusRef = (cell, row) => {
    if (cell === 'Draft') {
      return <span className="badge rounded-pill bg-primary">{cell}</span>;
    } else {
      return <span className="badge rounded-pill bg-success">{cell}</span>;
    }
  };

  const dateRef = (cell, row) => {
    var date = new Date(cell);
    var year = date.toLocaleString("default", { year: "numeric" });
    var month = date.toLocaleString("default", { month: "2-digit" });
    var day = date.toLocaleString("default", { day: "2-digit" });
    var formattedDate = day + "-" + month + "-" + year;
    return <span className="badge rounded-pill bg-success">{formattedDate}</span>;
  };

  const dateRef2 = (cell, row) => {
    if (cell === 'Draft') {
      var date = new Date(cell);
      var year = date.toLocaleString("default", { year: "numeric" });
      var month = date.toLocaleString("default", { month: "2-digit" });
      var day = date.toLocaleString("default", { day: "2-digit" });
      var formattedDate = day + "-" + month + "-" + year;
      return <span className="badge rounded-pill bg-secondary">{formattedDate}</span>;
    } else {
      var date = new Date(cell);
      var year = date.toLocaleString("default", { year: "numeric" });
      var month = date.toLocaleString("default", { month: "2-digit" });
      var day = date.toLocaleString("default", { day: "2-digit" });
      var formattedDate = day + "-" + month + "-" + year;
      return <span className="badge rounded-pill bg-warning">{formattedDate}</span>;
    }

  };

  const statusRef2 = (cell, row) => {
    console.log(cell)
    if (cell === 'Draft') {
      return <span className="badge rounded-pill bg-secondary">{cell}</span>;
    } else {
      return <span className="badge rounded-pill bg-warning">{cell}</span>;
    }
  };

  const refDetail = (e, column, columnIndex, row, rowIndex) => {
    history.push(url + row.id);
  };

  const columnData = [
    {
      dataField: "reference",
      text: "Reference",
      formatter: ref,
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          refDetail(e, column, columnIndex, row, rowIndex);
        },
      },
      sort: true,
    },
    {
      dataField: "status",
      text: "Status",
      formatter: statusRef,
      sort: true,
    },
    {
      dataField: "type",
      text: "Type",
      formatter: statusRef2,
      sort: true,
    },

    {
      dataField: "advertisement[0].rent",
      text: "Rent /w",
      sort: true,
    },
    {
      dataField: "bedroom",
      text: "Bedroom",
      sort: true,
    },
    {
      dataField: "bathroom",
      text: "Bathroom",
      sort: true,
    },
    {
      dataField: "car_space",
      text: "Car spacing",
      sort: true,
    },
    {
      dataField: "advertisement[0].listing_agent_primary_first_name",
      text: "Listing Agent",
      sort: true,
    },
    {
      dataField: "next_inspection",
      text: "Next inspection",
      //formatter: statusRef,
      formatter: dateRef,
      sort: true,
    },
    {
      dataField: "advert_from",
      text: "Advert From",
      //formatter: statusRef2,
      formatter: dateRef2,
      sort: true,
    },
    {
      dataField: "advertisement[0].date_available",
      text: "Available",
      formatter: statusRef,
      sort: true,
    },
    // {
    //     dataField: "mobile_phone",
    //     text: "Phone",
    //     sort: true,
    // },
    // {
    //     dataField: "roles",
    //     text: "Roles",
    //     formatter: owner,
    //     sort: true,
    // },
    // {
    //     dataField: "mobile_phone",
    //     text: "Phone",
    //     sort: true,
    // }
  ];

  const url = "/listingInfo/";

  console.log(props.listing_list_data?.setting_listing_provider?.listing_provider?.is_enable
  );

  const inetgrationsHistory = () => history.push('/integrations')

  const listingApi = () => {
    props.ListingList();
    setState(prev => ({ ...prev, activeTab: '1' }))
  }

  return (
    <div className="page-content">
      <Container fluid={true}>
        <Breadcrumbs title="Listings" breadcrumbItem="Listings" />
        {props.listing_list_data?.setting_listing_provider?.listing_provider?.is_enable == 0 ?
          <Row>
            <Col md={12}>
              <div className="w-75">
                <Card>
                  <CardBody>
                    <div>

                      <div className="w-100 d-flex flex-column justify-content-center align-items-center">
                        <span className=""> <i className="fas fa-rocket text-info" /></span>
                        <p className="pt-1 lead ">Not yet enabled</p>
                        <p style={{ width: '40px' }} className="mb-1 border border-2 border-bottom border-info lead"></p>
                        <p className="lead">
                          Sync directly with domain.com.au, realestate.com.au and rent.com.au to easily market your properties, book open homes and communicate with enquiries from one central location.
                        </p>
                      </div>
                      <Row>
                        <Col md={7}>
                          <p className="lead text-info py-1">Supercharge your business with more PropertyMe features
                          </p>
                          <p>


                            {`To enable, go to`} <span onClick={inetgrationsHistory} style={{ cursor: 'pointer' }} className="text-decoration-underline text-info">{`Settings > Integrations`}</span> {`and set up at least one connection with an Advertiser. To find out more about Listings you can refer to our knowledge base articles.`}
                          </p>
                          <Button onClick={inetgrationsHistory} color="info">Setup now</Button>
                        </Col>
                        <Col md={5}></Col>
                      </Row>
                    </div>
                  </CardBody>
                </Card>

              </div>
            </Col>
          </Row>
          :
          <Row>
            <Col md={2} >
              <div>
                <Card style={{ borderRadius: "15px", paddingTop: "15px" }}>
                  <CardBody>
                    <Row>
                      <div className="button-items mt-0 p-0" >

                        <ListingModal1 listingApi={listingApi} />

                      </div>
                    </Row>
                  </CardBody>
                </Card>
              </div>
            </Col>
            <Col md={10} style={{ padding: "0px" }}>
              <div>
                <Card style={{ borderRadius: "15px" }}>
                  <CardBody>
                    <div>
                      <Nav className="icon-tab nav-justified">
                        <NavItem>
                          <NavLink
                            style={{ cursor: "pointer" }}
                            className={classnames({
                              active: state.activeTab === "1",
                            })}
                            onClick={() => {
                              toggle("1");
                            }}
                          >
                            Active
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            style={{ cursor: "pointer" }}
                            className={classnames({
                              active: state.activeTab === "2",
                            })}
                            onClick={() => {
                              toggle("2");
                            }}
                          >
                            Draft
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            style={{ cursor: "pointer" }}
                            className={classnames({
                              active: state.activeTab === "3",
                            })}
                            onClick={() => {
                              toggle("3");
                            }}
                          >
                            Published
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            style={{ cursor: "pointer" }}
                            className={classnames({
                              active: state.activeTab === "4",
                            })}
                            onClick={() => {
                              toggle("4");
                            }}
                          >
                            Leased
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            style={{ cursor: "pointer" }}
                            className={classnames({
                              active: state.activeTab === "5",
                            })}
                            onClick={() => {
                              toggle("5");
                            }}
                          >
                            Closed
                          </NavLink>
                        </NavItem>
                      </Nav>

                      <TabContent
                        activeTab={state.activeTab}
                        className="p-3 text-muted"
                      >
                        <TabPane tabId="1">
                          <Row>
                            <Col sm="12">
                              <CardText className="mb-0">
                                {props.listing_list_data ? (
                                  <DatatableTables2
                                    products={props.listing_list_data}
                                    columnData={columnData}
                                  // url={url}
                                  />
                                ) : null}
                              </CardText>
                            </Col>
                          </Row>
                        </TabPane>

                        <TabPane tabId="2">
                          <Row>
                            <Col sm="12">
                              <CardText className="mb-0">
                                {props.listing_list_data?.draft ? (
                                  <DatatableTables2
                                    products={props.listing_list_data?.draft}
                                    columnData={columnData}
                                  />
                                ) : null}
                              </CardText>
                            </Col>
                          </Row>
                        </TabPane>
                        <TabPane tabId="3">
                          <Row>
                            <Col sm="12">
                              <CardText className="mb-0">
                                {props.listing_list_data?.published ? (
                                  <DatatableTables2
                                    products={props.listing_list_data?.published}
                                    columnData={columnData}
                                  />
                                ) : null}
                              </CardText>
                            </Col>
                          </Row>
                        </TabPane>
                        <TabPane tabId="4">
                          <Row>
                            <Col sm="12">
                              <CardText className="mb-0">
                                {props.listing_list_data?.leased ? (
                                  <DatatableTables2
                                    products={props.listing_list_data?.leased}
                                    columnData={columnData}
                                  />
                                ) : null}
                              </CardText>
                            </Col>
                          </Row>
                        </TabPane>
                        <TabPane tabId="5">
                          <Row>
                            <Col sm="12">
                              <CardText className="mb-0"></CardText>
                            </Col>
                          </Row>
                        </TabPane>
                        <TabPane tabId="6">
                          <Row>
                            <Col sm="12">
                              <CardText className="mb-0"></CardText>
                            </Col>
                          </Row>
                        </TabPane>
                        <TabPane tabId="7">
                          <Row>
                            <Col sm="12">
                              <CardText className="mb-0"></CardText>
                            </Col>
                          </Row>
                        </TabPane>
                      </TabContent>
                    </div>
                  </CardBody>
                </Card>
              </div>
            </Col>
          </Row>}
      </Container>
    </div>
  );
};

const mapStateToProps = gstate => {
  const {
    listing_list_loading,
    listing_list_data,
    listing_list_error,

    rental_listing_loading,

    delete_listing_loading,
    listing_list_info_loading,
  } = gstate.Listing;
  return {
    listing_list_loading,
    listing_list_data,
    listing_list_error,

    rental_listing_loading,

    delete_listing_loading,
    listing_list_info_loading,
  };
};

export default withRouter(
  connect(mapStateToProps, {
    ListingList,
    ListingsInfoFresh,
    ListingsListFresh,
    rentalListingFresh,
    deleteListingFresh,
    GetListingSliderImageFresh,
  })(Listings)
);
