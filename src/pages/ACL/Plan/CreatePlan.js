import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Select from "react-select";
import {
  Card,
  CardBody,
  Col,
  Container,
  CardTitle,
  Row,
  Table,
  UncontrolledAlert,
} from "reactstrap";

import { withRouter } from "react-router-dom";
import toastr from "toastr";

import DeleteModal from "components/Common/DeleteModal";

//actions
import { prmList, prmListFresh } from "store/ACL/PrerequisiteMenu/action";
import {
  planList,
  storePlan,
  storePlanFresh,
  deletePlan,
  deletePlanFresh,
} from "../../../store/ACL/Plan/actions";

/**
 * THIS FUNCTION IS USED TO STORE PLAN, SHOW PLAN LIST, DELETE A PLAN
 * PLAN CAN BE STORED WITH ADDON OR WITHOUT ADDON
 * ADDON INSTALLATION ALSO DONE IN THIS FUNCTION
 * @param {*} props 
 * 
 * @returns
 *  
 */
const CreatePlan = props => {
  const [state, setState] = useState({
    name: "", details: "", price: '', frequency_type: '', selectedFrequencyType: {},
    optionFrequencyType: [
      {
        options: [
          { label: "Yearly", value: "Yearly" },
          { label: "Monthly", value: "Monthly" },
          { label: "FortNightly", value: "FortNightly" },
          { label: "Weekly", value: "Weekly" },
        ],
      },
    ],
  });
  const [selected, setSelected] = useState([]);
  const [prmFrm, setPrmFrm] = useState([]);
  const [selectedName, setSelectedName] = useState();
  const [deleteState, setDeleteState] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  document.title = "CliqProperty";
  useEffect(() => {
    props.prmList();
    props.planList();
  }, [])
  useEffect(() => {
    if (props.acl_plan_add_loading == "Success") {
      toastr.success("Plan Added Successfully");
      setState({
        name: "", details: "", price: '', frequency_type: '', selectedFrequencyType: '',
        optionFrequencyType: [
          {
            options: [
              { label: "Yearly", value: "Yearly" },
              { label: "Monthly", value: "Monthly" },
              { label: "FortNightly", value: "FortNightly" },
              { label: "Weekly", value: "Weekly" },
            ],
          },
        ]
      });
      setSelected([]);
      setSelectedName('');
      props.prmListFresh();
      props.prmList();
      props.planList();
      props.storePlanFresh();
    }
  }, [props.acl_plan_add_loading])
  useEffect(() => {
    if (props.acl_plan_delete_loading == "Success") {
      toastr.success("Plan deleted Successfully");
      props.deletePlanFresh();
      props.planList();
    }
    if (props.acl_plan_delete_loading == "Failed") {
      toastr.error("Some User Already Use This Plan");
      props.deletePlanFresh();
    }
  }, [
    props.acl_plan_delete_loading,
  ]);

  const deleteMenu = id => {
    props.deletePlan(id);
    setDeleteState(false);
  };

  const getOrdinal = n => {
    let ord = "th";
    if (n % 10 == 1 && n % 100 != 11) {
      ord = "st";
    } else if (n % 10 == 2 && n % 100 != 12) {
      ord = "nd";
    } else if (n % 10 == 3 && n % 100 != 13) {
      ord = "rd";
    }
    return ord;
  };

  var menuData = undefined;
  if (props.acl_plan_data != null) {
    menuData = props.acl_plan_data?.menu_plan?.map((item, key) => (
      <tr key={key}>
        <th scope="row">{key + 1}</th>
        <td>{item?.name} ({item?.frequency_type})</td>
        <td>
          {item?.details?.map((items, keys) => (
            // <tr key={items.id}></tr>
            <tr key={items?.id}>
              <td className="pb-3" style={{ width: '300px' }}>{items?.addon?.display_name}</td>
              {/* <td style={{ width: '300px' }}>
                {items?.addon?.value === '$' && items?.addon?.value}
                {items?.addon?.price}
                {items?.addon?.value === '%' && items?.addon?.value}
              </td> */}
            </tr>
          ))}
        </td>
        <td>{item?.price}৳</td>
        <td>
          <button
            type="submit"
            className="btn btn-sm btn-danger"
            onClick={() => {
              setDeleteId(item?.id);
              setDeleteState(prev => !prev);
            }}
          >
            <i className="fas fa-trash-alt"></i>
          </button>
        </td>
      </tr>
    ));
  }
  const checkMenu = (id, pre_details) => {
    var selected_id = selected;

    if (pre_details.length > 0) {
      var statet = false;
      var pre_state = true;
      var idx = -2;
      var status = false;
      pre_details.map((item, key) => {
        status = selected_id.includes(item.addon_id);
        idx = selected_id.indexOf(id);
        if (status != true) {
          var prm_t = prmFrm;
          var state_prm = prm_t?.prm_t?.includes(item.addon.display_name);
          if (state_prm != true) {
            prm_t.push(item.addon.display_name);
            prm_set(prm_t);
          }

          statet = false;
          pre_state = false;
        } else if (idx == -1) {
          statet = true;
          pre_state = true;
        }
      });
      if (statet && pre_state) {
        selected_id.push(id);
        setSelected(selected_id);
        document.getElementById(id).style.border = "2px solid #159B9C";
        document.getElementById("btn" + id).style.display = "none";
        document.getElementById("loader" + id).style.display = "block";
        setTimeout(() => {
          document.getElementById("btn" + id).innerHTML = "Uninstall";
          document.getElementById("btn" + id).style.display = "block";
          document.getElementById("loader" + id).style.display = "none";
        }, 2000);
      } else if (statet == false && pre_state != false) {
        selected_id.splice(idx, 1);
        setSelected(selected_id);
        document.getElementById(id).style.border = "1px solid #ced4da";
        document.getElementById("btn" + id).style.display = "none";
        document.getElementById("loader" + id).style.display = "block";
        setTimeout(() => {
          document.getElementById("btn" + id).innerHTML = "Install";
          document.getElementById("btn" + id).style.display = "block";
          document.getElementById("loader" + id).style.display = "none";
        }, 2000);
      }
    } else {
      var idx = selected_id.indexOf(id);
      if (idx == -1) {
        selected_id.push(id);
        setSelected(selected_id);
        document.getElementById(id).style.border = "2px solid #159B9C";
        document.getElementById("btn" + id).style.display = "none";
        document.getElementById("loader" + id).style.display = "block";
        setTimeout(() => {
          document.getElementById("btn" + id).innerHTML = "Uninstall";
          document.getElementById("btn" + id).style.display = "block";
          document.getElementById("loader" + id).style.display = "none";
        }, 2000);
      } else {
        selected_id.splice(idx, 1);
        setSelected(selected_id);
        document.getElementById(id).style.border = "1px solid #ced4da";
        document.getElementById("btn" + id).style.display = "none";
        document.getElementById("loader" + id).style.display = "block";
        setTimeout(() => {
          document.getElementById("btn" + id).innerHTML = "Install";
          document.getElementById("btn" + id).style.display = "block";
          document.getElementById("loader" + id).style.display = "none";
        }, 2000);
      }
    }
  };

  const prm_set = prm_t => {
    setPrmFrm({ ...prmFrm, prm_t });
    setTimeout(() => {
      clr_prm_set();
    }, 4000);
  };

  const clr_prm_set = () => {
    setPrmFrm([]);
  };

  var style = {
    borderRadius: "10px",
    minHeight: "100px",
    border: "1px solid #ced4da",
  };

  const handlePlanState = (e) => {
    setState(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (state.name === '') {
      toastr.warning('Plan name required');
    } else if (state.details === '') {
      toastr.warning('Details field is requied');
    } else if (state.price === '') {
      toastr.warning('Price cannot be null');
    } else if (state.price < 0) {
      toastr.warning('Price cannot be less then 0');
    } else if (!Number(state.price)) {
      toastr.warning('Price must be greater than 0');
      setState(prev => ({ ...prev, price: '' }));
    } else if (JSON.stringify(state.selectedFrequencyType) === '{}') {
      toastr.warning('Please select a frequency type');
    } else {
      props.storePlan(state, selected, state.price);
    }
  }

  const handleSelectFrequencyType = (e) => {
    setState(prev => ({ ...prev, selectedFrequencyType: e }));
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          {/* <Breadcrumbs title="Forms" breadcrumbItem="Create Plan" /> */}
          <h4 className="ms-2 text-primary">Forms</h4>
          <Row>
            <Col lg={6}>
              <Card className="custom_card_border_design me-2">
                <CardBody>
                  <CardTitle className="mb-4">Create Plan</CardTitle>
                  <div className="p-2">
                    <div className="form-group-new">
                      {/* <label htmlFor="name" className="form-label">Name</label> */}
                      <input
                        className="form-control"
                        name="name"
                        type="text"
                        value={state.name}
                        onChange={handlePlanState}
                      />
                      <label htmlFor="usr">Name</label>
                    </div>
                    <div className="form-group-new">
                      <input
                        className="form-control"
                        name="details"
                        type="text"
                        value={state.details}
                        onChange={handlePlanState}
                      />
                      <label htmlFor="usr">Details</label>
                    </div>
                    <div className="form-group-new">
                      <input
                        name="price"
                        type="text"
                        className="form-control"
                        value={state.price}
                        onChange={handlePlanState}
                      />

                      <label htmlFor="usr">Price</label>
                    </div>
                    <div className="mb-3">
                      <Row className="py-1 mb-2">

                        <Col md={12} className="">
                          <div className="form-group-new">
                            <Select
                              value={state.selectedFrequencyType}
                              onChange={handleSelectFrequencyType}
                              options={state.optionFrequencyType}
                              classNamePrefix="select2-selection"
                              placeholder="Select a frequency type"
                            />
                            <label htmlFor="usr"> Frequency type</label>
                          </div>
                        </Col>
                      </Row>
                    </div>
                    <div className="mt-1">
                      <Row>
                        <Col xl="6"
                        // sm="6" md="6" lg="6"
                        >
                          {prmFrm?.prm_t?.map((item, key) => (
                            <UncontrolledAlert
                              color="danger"
                              className="alert-dismissible fade show"
                              role="alert"
                              key={key}
                              toggle={() => {
                                setPrmFrm([]);
                              }}
                            >
                              <i className="mdi mdi-block-helper me-2"></i>
                              Please add <b>{item}</b> at{" "}
                              <b>
                                {key + 1}
                                {getOrdinal(key + 1)}
                              </b>{" "}
                              position before select <b>{selectedName}</b>
                            </UncontrolledAlert>
                          ))}
                        </Col>
                        {props.prm_data?.preRequisiteMenu.map(
                          (item, key) => (
                            <Col
                              // xl="6"
                              xl="6"
                              // sm="6"
                              // md="6"
                              // lg="6"
                              key={"_col_" + key}
                            >
                              <Card
                                className="mini-stats-wid"
                                id={item?.addon?.id}
                                style={style}
                              >
                                <CardBody>
                                  <div className="d-flex">
                                    <div className="flex-grow-1" style={{ width: '80%' }}>
                                      <p className="text-muted fw-medium" title={item?.addon?.display_name}>
                                        {/* {item?.addon?.display_name?.length > 10 ? item?.addon?.display_name?.slice(0, 10) + '...' : item?.addon?.display_name} */}
                                        {`${item?.addon?.display_name} (${item?.addon?.price}${item?.addon?.value === '%' ? '%' : '৳'})`}
                                      </p>
                                      <p className="text-muted fw-medium">{item?.addon?.fee_type}</p>
                                      <div style={{ textAlign: "center" }}>
                                        <button
                                          id={"btn" + item?.addon?.id}
                                          className="btn btn-primary w-50"
                                          type="button"
                                          onClick={() => {
                                            checkMenu(
                                              item?.addon?.id,
                                              item?.pre_requisite_menu_detail
                                            );
                                            setSelectedName(
                                              item?.addon?.display_name
                                            );
                                          }}
                                          style={{ borderRadius: "20px" }}
                                        >
                                          Install
                                        </button>
                                      </div>
                                      <div
                                        className="spinner-border text-primary m-1"
                                        role="status"
                                        id={"loader" + item?.addon?.id}
                                        style={{ display: "none" }}
                                      >
                                        <span className="sr-only">
                                          Loading...
                                        </span>
                                      </div>
                                    </div>
                                    <div className="mini-stat-icon avatar-sm rounded-circle bg-primary align-self-center">
                                      <span className="avatar-title">
                                        <i className="bx bx-building-house font-size-24" />

                                      </span>
                                    </div>
                                  </div>
                                </CardBody>
                              </Card>
                            </Col>
                          )
                        )}
                      </Row>
                    </div>
                    <div className="mt-3">
                      <button className="btn btn-buttonColor w-100 " onClick={handleSubmit}>
                        Submit
                      </button>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>

            <Col lg={6}>
              <Card className="custom_card_border_design me-2">
                <CardBody>
                  <CardTitle className="mb-4">Plan List</CardTitle>

                  <div className="table-responsive">
                    <Table className="table mb-0">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Plan</th>
                          <th>Addons</th>
                          <th>Price</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>{menuData}</tbody>
                    </Table>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <DeleteModal
            show={deleteState}
            onDeleteClick={() => deleteMenu(deleteId)}
            onCloseClick={() => setDeleteState(false)}
          />
        </Container>
        {/* container-fluid */}
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  const {
    acl_plan_data,
    acl_plan_loading,
    acl_plan_error,

    acl_plan_add_data,
    acl_plan_add_loading,
    acl_plan_add_error,

    acl_plan_delete_data,
    acl_plan_delete_loading,
    acl_plan_delete_error,
  } = state.Plan;
  const { prm_data, prm_loading, prm_error } = state.Prm;
  return {
    prm_data,
    prm_loading,
    prm_error,

    acl_plan_data,
    acl_plan_loading,
    acl_plan_error,

    acl_plan_add_data,
    acl_plan_add_loading,
    acl_plan_add_error,

    acl_plan_delete_data,
    acl_plan_delete_loading,
    acl_plan_delete_error,
  };
};

export default withRouter(
  connect(mapStateToProps, {
    prmList,
    planList,
    prmListFresh,
    storePlan,
    storePlanFresh,
    deletePlan,
    deletePlanFresh,
  })(CreatePlan)
);
