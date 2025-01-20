import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  Alert,
  Card,
  CardBody,
  Col,
  Container,
  CardTitle,
  Row,
  Label,
  Table,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";

import { Link, withRouter } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import toastr from "toastr";
import Select from "react-select";

//Import Breadcrumb
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import { propTypes } from "react-bootstrap-editable";

//actions
import { MenuListData } from "store/Menu/action";
import {
  prmList,
  storePrm,
  storePrmFresh,
  deletePrm,
} from "store/ACL/PrerequisiteMenu/action";
import { getActiveAddons, getActiveAddonsFresh } from "store/actions";

import makeAnimated from "react-select/animated";
import DeleteModal from "components/Common/DeleteModal";

const PrerequisiteMenu = props => {
  const [state, setState] = useState();
  const [seen, setSeen] = useState(false);
  const [selectedState, setSelectedState] = useState([]);
  const [optionGroup, setOptionGroup] = useState([]);
  const [selectedAddonState, setSelectedAddonState] = useState({});
  const [selectedPreAddonState, setSelectedPreAddonState] = useState([]);
  const [optionGroupAddon, setOptionGroupAddon] = useState([]);
  const [init, setInit] = useState(true);
  const [deleteState, setDeleteState] = useState(false);
  const [deleteId, setDeleteId] = useState('');

  const animatedComponents = makeAnimated();

  document.title = "CliqProperty";
  useEffect(() => {
    if (!seen) {
      props.getActiveAddons();
      props.prmList();
    }
    // if (props.prm_loading === false) {
    //   props.prmList();
    // }
    if (props.prm_add_loading == "Success") {
      toastr.success("Prerequisite Menu Successfully");
      props.prmList();
      props.storePrmFresh();
    }
    let optionAddon;
    if (props.get_active_addon_data) {
      optionAddon = props.get_active_addon_data?.data?.map(item => ({
        label: item?.display_name,
        value: item?.id,
      }));
      setOptionGroupAddon(optionAddon);
    }
    setSeen(true);
  }, [
    // props.prm_loading,
    props.prm_add_loading, props.get_active_addon_loading
  ]);

  const deleteMenu = id => {
    setDeleteState(false);
    props.deletePrm(id);
    toastr.success("Prerequisite Menu deleted Successfully");
  };

  var menuData = undefined;
  var menuPrice = undefined;
  // if (props.prm_data != null) {
  //   menuPrice = props.prm_data?.preRequisiteMenu?.map((item, key) => (
  //     <tr key={key}>
  //       <th scope="row">{item.id}</th>
  //       <td>{item.menu.menu_title}</td>
  //       <td>
  //         {item.pre_requisite_menu_detail?.map(
  //           (items, key) => items.pre_menu.menu_title + ", "
  //         )}
  //       </td>
  //       <td>
  //         <button
  //           type="submit"
  //           className="btn btn-danger w-md"
  //           onClick={() => { setDeleteId(item.id); setDeleteState(prev => !prev) }}
  //         >
  //           Delete
  //         </button>
  //       </td>
  //     </tr>
  //   ));
  // }
  if (props.prm_data != null) {
    menuPrice = props.prm_data?.preRequisiteMenu?.map((item, key) => (
      <tr key={key}>
        <th scope="row">{item?.id}</th>
        <td>{item?.addon?.display_name}</td>
        <td>
          {item?.pre_requisite_menu_detail?.map(
            (items, key) => items?.addon?.display_name + ", "
          )}
        </td>
        <td>
          <button
            type="submit"
            className="btn btn-sm btn-danger"
            onClick={() => { setDeleteId(item.id); setDeleteState(prev => !prev) }}
          >
            {/* Delete */}
            <i className="fas fa-trash-alt"></i>
          </button>
        </td>
      </tr>
    ));
  }

  if (props.menu_loading == "Success") {
    var option = [];
    menuData = props.menu_data?.data.map((item, key) => (
      <option key={key} value={item?.id}>
        {item?.menu_title}
      </option>
    ));

    if (init) {
      props.menu_data?.data?.map((item, key) => {
        var none = { label: item?.menu_title, value: item?.id };
        option.push(none);
      });
      setOptionGroup(option);
      setInit(false);
    }
  }

  const handleMulti3 = e => {
    setSelectedState(e);
  };
  const handleAddon = e => {
    setSelectedAddonState(e);
  };
  const handlePrerequisiteAddon = e => {
    setSelectedPreAddonState(e);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(selectedAddonState, selectedPreAddonState);
    props.storePrm(selectedAddonState, selectedPreAddonState);
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          {/* <Breadcrumbs title="Forms" breadcrumbItem="Prerequisite Menu" /> */}
          <h4 className="ms-2 text-primary">Forms</h4>
          <Row>
            <Col lg={6}>
              <Card className="custom_card_border_design me-2">
                <CardBody>
                  <CardTitle className="mb-4">
                    Create Prerequisite Addons
                  </CardTitle>

                  <div className="p-2" style={{}}>
                    <form className="form-horizontal" onSubmit={handleSubmit}>
                      <div className="form-group-new" style={{ marginBottom: "-15px", position: "relative", zIndex: "12" }}>

                        <Select
                          // value={selectedState}
                          value={selectedAddonState}
                          onChange={handleAddon}
                          // options={optionGroup}
                          options={optionGroupAddon}
                          classNamePrefix="select2-selection"
                        />
                        <label htmlFor="usr">Addons</label>
                      </div>

                      <div className="mb-3"></div>


                      <Label for="exampleSelect " className="form-group-new-desc-label" style={{ zIndex: "10", width: "200px", padding: "0px 3px 0px 3px", marginTop: "-15px", left: "45px" }}>
                        Select Prerequisite Addons
                      </Label>
                      <div className="form-group-new" style={{ marginBottom: "-15px" }}>

                        <Select
                          // value={selectedState}
                          value={selectedPreAddonState}
                          isMulti={true}
                          // onChange={handleMulti3}
                          onChange={handlePrerequisiteAddon}
                          // options={optionGroup}
                          options={optionGroupAddon}
                          classNamePrefix="select2-selection"
                          closeMenuOnSelect={false}
                          components={animatedComponents}
                        />
                        {/* <label htmlFor="usr"> Select Prerequisite Addons</label> */}
                      </div>

                      <div style={{ marginTop: "25px" }}>
                        <button className="btn btn-buttonColor w-md" type="submit">
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
                </CardBody>
              </Card>
            </Col>

            <Col lg={6}>
              <Card className="custom_card_border_design me-2">
                <CardBody>
                  <CardTitle className="mb-4">
                    Prerequisite Addons List
                  </CardTitle>

                  <div className="table-responsive">
                    <Table className="table mb-0">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Menu</th>
                          <th>Prerequisite Addon</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>{menuPrice}</tbody>
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
  const { menu_data, menu_loading, menu_error } = state.MenuList;
  const {
    prm_data,
    prm_loading,
    prm_error,

    prm_add_data,
    prm_add_loading,
    prm_add_error,
  } = state.Prm;
  const {
    get_active_addon_data,
    get_active_addon_error,
    get_active_addon_loading,
  } = state.Addon;
  return {
    menu_data,
    menu_loading,
    menu_error,

    prm_data,
    prm_loading,
    prm_error,

    prm_add_data,
    prm_add_loading,
    prm_add_error,

    get_active_addon_data,
    get_active_addon_error,
    get_active_addon_loading,
  };
};

export default withRouter(
  connect(mapStateToProps, {
    MenuListData,
    prmList,
    storePrm,
    storePrmFresh,
    deletePrm,
    getActiveAddons,
    getActiveAddonsFresh
  })(PrerequisiteMenu)
);
