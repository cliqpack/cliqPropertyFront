import React, { useEffect, useState } from "react";
import {
  Col,
  Label,
  Input,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  FormText,
  ButtonGroup,
} from "reactstrap";
import { connect } from "react-redux";
//import { listingGeneralFeature } from '../../store/Listings/actions';
import {
  listingGeneralFeature,
  getGeneralFeatureFresh,
  listingGeneralFeatureFresh,
  listingLinksFresh, getGeneralFeature, ListingsInfoFresh
} from "../../../store/Listings/actions";
import axios from "axios";
import toastr from "toastr";
import Loder from "components/Loder/Loder";
import { Link, withRouter, useHistory, useParams } from "react-router-dom";


function GeneralFeatureModal(props) {
  const [featureModal, setFeatureModal] = useState(false);
  const { id } = useParams();

  const toggle = () => setFeatureModal(!featureModal);
  const [rSelected, setSelect] = useState(false);
  const [active, setActive] = useState(true);
  const [ensuites, setEnsuites] = useState(props.data.data?.ensuites);
  const [toilets, setTolets] = useState(props.data.data?.toilets);
  const [isChecked, setIsChecked] = useState(true);
  const [checkboxValue, setCheckboxValue] = useState([]);
  const [state, setState] = useState(false);
  const [showModal, setShowModal] = useState(false);
  //let val = undefined;
  const handleCheckbox = async (e) => {
    const { value, checked, name } = e.target;

    if (checked) {
      setCheckboxValue([
        ...checkboxValue,
        {
          [name]: value,
        },
      ]);
    } else {
      await findind(name);
      console.log("sdsssss");
      let x = { [name]: null };
      console.log(x);
      setCheckboxValue([
        ...checkboxValue,
        x
      ]);
    }
  };
  const findind = async (name) => {
    // var n="item."+name;
    var index = -1;
    console.log(name);

    checkboxValue.map((item, key) => {
      if (item.air_conditioning == name) { index = key; return index; }
      else if (item.alarm_system == name) { index = key; return index; }
      else if (item.balcony_or_deck == name) { index = key; return index; }
      else if (item.broadband == name) { index = key; return index; }
      else if (item.deck == name) { index = key; return index; }
      else if (item.dishwasher == name) { index = key; return index; }
      else if (item.floorboards == name) { index = key; return index; }
      else if (item.fully_fenced == name) { index = key; return index; }
      else if (item.furnished == name) { index = key; return index; }
      else if (item.garden_or_courtyard == name) { index = key; return index; }
      else if (item.gas_heating == name) { index = key; return index; }
      else if (item.gym == name) { index = key; return index; }
      else if (item.hot_water_service == name) { index = key; return index; }
      else if (item.inside_spa == name) { index = key; return index; }
      else if (item.intercom == name) { index = key; return index; }
      else if (item.internal_laundry == name) { index = key; return index; }
      else if (item.outdoor_entertaining_area == name) { index = key; return index; }
      else if (item.outside_spa == name) { index = key; return index; }
      else if (item.pay_tv_access == name) { index = key; return index; }
      else if (item.pets_allowed == name) { index = key; return index; }
      else if (item.rumpus_room == name) { index = key; return index; }
      else if (item.secure_parking == name) { index = key; return index; }
      else if (item.shed == name) { index = key; return index; }
      else if (item.smokers_permitted == name) { index = key; return index; }
      else if (item.solar_hot_water == name) { index = key; return index; }
      else if (item.solar_panels == name) { index = key; return index; }
      else if (item.study == name) { index = key; return index; }
      else if (item.swimming_pool == name) { index = key; return index; }
      else if (item.tennis_court == name) { index = key; return index; }
      else if (item.water_tank == name) { index = key; return index; }
    });


    console.log('====================================');

    if (index > -1) {
      checkboxValue.splice(index, 1);
    }
    console.log('====================================');
  }


  // const handleCheckbox = (e) => {
  //     const { value, checked } = e.target;
  //     if (checked) {
  //         setCheckboxValue([...checkboxValue, value])
  //     } else {
  //         setCheckboxValue(checkboxValue.filter((e) => e !== value))
  //     }
  // }

  // console.log(checkboxValue);
  // console.log(props.id);
  // console.log(props.data);
  const onRadioBtnClick = value => {
    if (value == "New Construction") {
      setActive(false)
    } else {
      setActive(true)
    }
    setSelect(value);
  };

  //console.log(rSelected);
  const handleSubmit = e => {
    e.preventDefault();
    setShowModal(true);
    setFeatureModal(false);
    console.log("submitted");
    console.log(checkboxValue);
    const data = new FormData();
    data.append("rSelected", rSelected);
    data.append("ensuites", ensuites);
    data.append("toilets", toilets);
    data.append("checkboxValue", checkboxValue);
    console.log(data.get("rSelected"));
    console.log(data.get("ensuites"));
    console.log(data.get("toilets"));
    console.log(data.get("checkboxValue"));
    //console.log(data.get());
    // return 0;
    props.listingGeneralFeature({
      id: props.id,
      new_or_established: rSelected,
      ensuites: ensuites,
      toilets: toilets,
      checkboxValue: checkboxValue,
    });

    // listingGeneralFeature([
    //     data = data
    // ])
    handleReset();
  };
  const handleEnsuites = e => {
    setEnsuites(e.target.value);
  };
  const handleToilets = e => {
    setTolets(e.target.value);
  };
  // const handleOnChange = async (e) => {
  //     await setIsChecked(!isChecked);
  //     console.log(isChecked);
  //     if (isChecked) {
  //         console.log(e.target.value);
  //     } else {
  //         setIsChecked(!isChecked);
  //     }

  // };
  //console.log(ensuites);
  const handleReset = () => {
    setSelect("");
    setEnsuites("");
    setTolets("");
    setCheckboxValue([]);
  };
  const handleModalClose = () => {
    setFeatureModal(false);
    handleReset();
  };
  // console.log(isChecked);
  console.log(props.link_data_loading);
  useEffect(() => {
    if (props.general_feature_data_loading === "Success") {
      toastr.success("Updated Successfully");

      // props.getGeneralFeature(id);
      props.getGeneralFeatureFresh();
      props.listingGeneralFeatureFresh();
      props.ListingsInfoFresh()

      setShowModal(false);
      props.loaderOn()
    }
    if (props.data.data != null) {

      console.log(props.data?.data, '---------------');
      setEnsuites(props.data?.data?.ensuites)
      setTolets(props.data?.data?.toilets)
      setCheckboxValue([
        ...checkboxValue,
        { ["air_conditioning"]: props.data.data?.air_conditioning ? "air_conditioning" : null },
        { ["alarm_system"]: props.data.data?.alarm_system ? "alarm_system" : null },
        { ["balcony_or_deck"]: props.data.data?.balcony_or_deck ? "balcony_or_deck" : null },
        { ["broadband"]: props.data.data?.broadband ? "broadband" : null },
        { ["deck"]: props.data.data?.deck ? "deck" : null },
        { ["dishwasher"]: props.data.data?.dishwasher ? "dishwasher" : null },
        { ["floorboards"]: props.data.data?.floorboards ? "floorboards" : null },
        { ["fully_fenced"]: props.data.data?.fully_fenced ? "fully_fenced" : null },
        { ["furnished"]: props.data.data?.furnished ? "Furnished" : null },
        { ["garden_or_courtyard"]: props.data.data?.garden_or_courtyard ? "garden_or_courtyard" : null },
        { ["gas_heating"]: props.data.data?.garden_or_courtyard ? "garden_or_courtyard" : null },
        { ["gym"]: props.data.data?.gym ? "gym" : null },
        { ["hot_water_service"]: props.data.data?.hot_water_service ? "hot_water_service" : null },
        { ["inside_spa"]: props.data.data?.inside_spa ? "inside_spa" : null },
        { ["intercom"]: props.data.data?.intercom ? "intercom" : null },
        { ["internal_laundry"]: props.data.data?.internal_laundry ? "internal_laundry" : null },
        { ["outdoor_entertaining_area"]: props.data.data?.outdoor_entertaining_area ? "outdoor_entertaining_area" : null },
        { ["outside_spa"]: props.data.data?.outside_spa ? "outside_spa" : null },
        { ["pay_tv_access"]: props.data.data?.pay_tv_access ? "pay_tv_access" : null },
        { ["pets_allowed"]: props.data.data?.pets_allowed ? "pets_allowed" : null },
        { ["rumpus_room"]: props.data.data?.rumpus_room ? "rumpus_room" : null },
        { ["secure_parking"]: props.data.data?.secure_parking ? "secure_parking" : null },
        { ["shed"]: props.data.data?.shed ? "shed" : null },
        { ["smokers_permitted"]: props.data.data?.smokers_permitted ? "smokers_permitted" : null },
        { ["solar_hot_water"]: props.data.data?.solar_hot_water ? "solar_hot_water" : null },
        { ["solar_panels"]: props.data.data?.solar_panels ? "solar_panels" : null },
        { ["study"]: props.data.data?.study ? "study" : null },
        { ["swimming_pool"]: props.data.data?.swimming_pool ? "swimming_pool" : null },
        { ["tennis_court"]: props.data.data?.tennis_court ? "tennis_court" : null },
        { ["water_tank"]: props.data.data?.water_tank ? "water_tank" : null },
      ]);
    }

    if (props.link_data_loading === "Success") {
      props.listingLinksFresh();
    }

  }, [props.general_feature_data_loading, props.data.data, props.link_data_loading]);

  const [propertyBtn, setPropertyBtn] = useState(true);
  const [constructionBtn, setConstructionBtn] = useState(false);

  const togglePropertyBtn = () => {

  }

  const toggleconstructionBtn = () => {

  }

  console.log(props.general_feature_data)
  return (
    <>
      <Button
        type="button"
        className="ms-1 btn"
        color="info"
        onClick={toggle}
      >
        <i className="fa fa-solid fa-pen" />
      </Button>
      <Loder status={showModal} />
      {/* <Button className="btn w-md m-1" color="info" onClick={toggle}>
                <i className="bx bx-task me-1"></i>
            </Button> */}
      {/* ===============general features modal start from here ================*/}

      <Modal
        isOpen={featureModal}
        toggle={toggle}
        size="lg"
        style={{ maxWidth: "700px", width: "100%" }}
      >
        <ModalHeader toggle={handleModalClose}>
          {/* <i className="fa fa-solid fa-pen" /> */}
          <div className="text-info">General Features</div>
        </ModalHeader>
        <ModalBody>
          <Form className="form p-3" onSubmit={handleSubmit}>
            <FormGroup row>
              <Label for="property" sm={3}>
                New or established
              </Label>
              <Col sm={9}>
                <div className="p-2">
                  <ButtonGroup>
                    <Button
                      color={active ? 'info' : 'light'}
                      style={{ width: "200px" }}
                      onClick={() => onRadioBtnClick("Established Property")}
                    // active={rSelected === "Established Property"}
                    // active={active}
                    >
                      Established Property
                    </Button>
                    <Button
                      color={active ? 'light' : 'info'}
                      style={{ width: "200px" }}
                      onClick={() => onRadioBtnClick("New Construction")}
                    // active={rSelected === "New Construction"}
                    // active={active}
                    >
                      New Construction
                    </Button>
                  </ButtonGroup>
                  {/* <div className="btn-group btn-group-justified">
                    <div className="btn-group">
                      <Button
                        color={
                          propertyBtn
                            ? "secondary"
                            : "light"
                        }
                        onClick={togglePropertyBtn}
                      >
                        {propertyBtn ? (
                          <i className="bx bx-comment-check"></i>
                        ) : null}
                        <span> Established Property</span>
                      </Button>
                    </div>
                    <div className="btn-group">
                      <Button
                        color={
                          constructionBtn
                            ? "secondary"
                            : "light"
                        }
                        onClick={toggleconstructionBtn}
                      >
                        {constructionBtn ? (
                          <i className="bx bx-comment-check"></i>
                        ) : null}
                        <span> New Construction</span>
                      </Button>
                    </div>
                  </div> */}
                </div>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="exampleSelect" sm={3}>
                Ensuites
              </Label>
              <Col sm={4}>
                <Input
                  id="exampleSelect"
                  name="ensuites"
                  value={ensuites ?? ""}
                  onChange={e => handleEnsuites(e)}
                  type="number"
                  width="50%"
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="exampleSelect" sm={3}>
                Toilets
              </Label>
              <Col sm={4}>
                <Input
                  id="exampleSelect"
                  name="toilets"
                  value={toilets ?? ""}
                  onChange={e => handleToilets(e)}
                  type="number"
                />
              </Col>
            </FormGroup>
            <hr />
            <p style={{ fontSize: "21px" }}>Allowances</p>
            <FormGroup row>
              <Col sm={4}>
                <Label>
                  <Input
                    id="exampleFile"
                    name="furnished"
                    //value={state ? "Furnished" : null}
                    value="Furnished"
                    //value={props.data ? props.data.data?.furnished == null ? null : "Furnished" : false}
                    defaultChecked={
                      props.data
                        ? props.data.data?.furnished == null
                          ? false
                          : true
                        : false
                    }
                    onChange={e => handleCheckbox(e)}
                    type="checkbox"
                  />
                  {"   "}
                  <strong>Furnished</strong>
                </Label>
              </Col>
              <Col sm={4}>
                <Label>
                  <Input
                    id="exampleFile"
                    name="pets_allowed"
                    value="Pets allowed"
                    defaultChecked={
                      props.data
                        ? props.data.data?.pets_allowed == null
                          ? false
                          : true
                        : false
                    }
                    // onChange={e => setDate(e.target.value)}
                    onChange={e => handleCheckbox(e)}
                    type="checkbox"
                  />
                  {"   "}
                  <strong>Pets allowed</strong>
                </Label>
              </Col>
              <Col sm={4}>
                <Label>
                  <Input
                    id="exampleFile"
                    name="smokers_permitted"
                    value="Smokers permitted"
                    defaultChecked={
                      props.data
                        ? props.data.data?.smokers_permitted == null
                          ? false
                          : true
                        : false
                    }
                    onChange={e => handleCheckbox(e)}
                    type="checkbox"
                  />
                  {"   "}
                  <strong>Smokers permitted</strong>
                </Label>
              </Col>
            </FormGroup>
            <hr />
            <p style={{ fontSize: "21px" }}>Outdoor features</p>
            <FormGroup row>
              <Col sm={4}>
                <Label>
                  <Input
                    id="exampleFile"
                    name="balcony_or_deck"
                    value="Balcony / Deck"
                    defaultChecked={
                      props.data
                        ? props.data.data?.balcony_or_deck == null
                          ? false
                          : true
                        : false
                    }
                    onChange={e => handleCheckbox(e)}
                    type="checkbox"
                  />
                  {"   "}
                  <strong>Balcony / Deck</strong>
                </Label>
              </Col>
              <Col sm={4}>
                <Label>
                  <Input
                    id="exampleFile"
                    name="deck"
                    value="Deck"
                    defaultChecked={
                      props.data
                        ? props.data.data?.deck == null
                          ? false
                          : true
                        : false
                    }
                    onChange={e => handleCheckbox(e)}
                    type="checkbox"
                  />
                  {"   "}
                  <strong>Deck</strong>
                </Label>
              </Col>
              <Col sm={4}>
                <Label>
                  <Input
                    id="exampleFile"
                    name="fully_fenced"
                    value="Fully fenced"
                    defaultChecked={
                      props.data
                        ? props.data.data?.fully_fenced == null
                          ? false
                          : true
                        : false
                    }
                    onChange={e => handleCheckbox(e)}
                    type="checkbox"
                  />
                  {"   "}
                  <strong>Fully fenced</strong>
                </Label>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col sm={4}>
                <Label>
                  <Input
                    id="exampleFile"
                    name="garden_or_courtyard"
                    value="Garden / courtyard"
                    defaultChecked={
                      props.data
                        ? props.data.data?.garden_or_courtyard == null
                          ? false
                          : true
                        : false
                    }
                    onChange={e => handleCheckbox(e)}
                    type="checkbox"
                  />
                  {"   "}
                  <strong>Garden / courtyard</strong>
                </Label>
              </Col>
              <Col sm={4}>
                <Label>
                  <Input
                    id="exampleFile"
                    name="internal_laundry"
                    value="Internal laundry"
                    defaultChecked={
                      props.data
                        ? props.data.data?.internal_laundry == null
                          ? false
                          : true
                        : false
                    }
                    onChange={e => handleCheckbox(e)}
                    type="checkbox"
                  />
                  {"   "}
                  <strong>Internal laundry</strong>
                </Label>
              </Col>
              <Col sm={4}>
                <Label>
                  <Input
                    id="exampleFile"
                    name="outdoor_entertaining_area"
                    value="Outdoor entertaining area"
                    defaultChecked={
                      props.data
                        ? props.data.data?.outdoor_entertaining_area == null
                          ? false
                          : true
                        : false
                    }
                    onChange={e => handleCheckbox(e)}
                    type="checkbox"
                  />
                  {"   "}
                  <strong>Outdoor entertaining area</strong>
                </Label>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col sm={4}>
                <Label>
                  <Input
                    id="exampleFile"
                    name="outside_spa"
                    value="Outside spa"
                    defaultChecked={
                      props.data
                        ? props.data.data?.outside_spa == null
                          ? false
                          : true
                        : false
                    }
                    onChange={e => handleCheckbox(e)}
                    type="checkbox"
                  />
                  {"   "}
                  <strong>Outside spa</strong>
                </Label>
              </Col>
              <Col sm={4}>
                <Label>
                  <Input
                    id="exampleFile"
                    name="secure_parking"
                    value="Secure parking"
                    defaultChecked={
                      props.data
                        ? props.data.data?.secure_parking == null
                          ? false
                          : true
                        : false
                    }
                    onChange={e => handleCheckbox(e)}
                    type="checkbox"
                  />
                  {"   "}
                  <strong>Secure parking</strong>
                </Label>
              </Col>
              <Col sm={4}>
                <Label>
                  <Input
                    id="exampleFile"
                    name="shed"
                    value="Shed"
                    defaultChecked={
                      props.data
                        ? props.data.data?.shed == null
                          ? false
                          : true
                        : false
                    }
                    onChange={e => handleCheckbox(e)}
                    type="checkbox"
                  />
                  {"   "}
                  <strong>Shed</strong>
                </Label>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col sm={4}>
                <Label>
                  <Input
                    id="exampleFile"
                    name="swimming_pool"
                    value="Swimming pool"
                    defaultChecked={
                      props.data
                        ? props.data.data?.swimming_pool == null
                          ? false
                          : true
                        : false
                    }
                    onChange={e => handleCheckbox(e)}
                    type="checkbox"
                  />
                  {"   "}
                  <strong>Swimming pool</strong>
                </Label>
              </Col>
              <Col sm={4}>
                <Label>
                  <Input
                    id="exampleFile"
                    name="tennis_court"
                    value="Tennis court"
                    defaultChecked={
                      props.data
                        ? props.data.data?.tennis_court == null
                          ? false
                          : true
                        : false
                    }
                    onChange={e => handleCheckbox(e)}
                    type="checkbox"
                  />
                  {"   "}
                  <strong>Tennis court</strong>
                </Label>
              </Col>
            </FormGroup>
            <hr />
            <p style={{ fontSize: "21px" }}>Indoor features</p>

            <FormGroup row>
              <Col sm={4}>
                <Label>
                  <Input
                    id="exampleFile"
                    name="alarm_system"
                    value="Alarm system"
                    defaultChecked={
                      props.data
                        ? props.data.data?.alarm_system == null
                          ? false
                          : true
                        : false
                    }
                    onChange={e => handleCheckbox(e)}
                    type="checkbox"
                  />
                  {"   "}
                  <strong>Alarm system</strong>
                </Label>
              </Col>
              <Col sm={4}>
                <Label>
                  <Input
                    id="exampleFile"
                    name="broadband"
                    value="Broadband"
                    defaultChecked={
                      props.data
                        ? props.data.data?.broadband == null
                          ? false
                          : true
                        : false
                    }
                    onChange={e => handleCheckbox(e)}
                    type="checkbox"
                  />
                  {"   "}
                  <strong>Broadband</strong>
                </Label>
              </Col>
              <Col sm={4}>
                <Label>
                  <Input
                    id="exampleFile"
                    name="Built_in_wardrobes"
                    value="Built-in wardrobes"
                    defaultChecked={
                      props.data
                        ? props.data.data?.Built_in_wardrobes == null
                          ? false
                          : true
                        : false
                    }
                    onChange={e => handleCheckbox(e)}
                    type="checkbox"
                  />
                  {"   "}
                  <strong>Built-in wardrobes</strong>
                </Label>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col sm={4}>
                <Label>
                  <Input
                    id="exampleFile"
                    name="dishwasher"
                    value="Dishwasher"
                    defaultChecked={
                      props.data
                        ? props.data.data?.dishwasher == null
                          ? false
                          : true
                        : false
                    }
                    onChange={e => handleCheckbox(e)}
                    type="checkbox"
                  />
                  {"   "}
                  <strong>Dishwasher</strong>
                </Label>
              </Col>
              <Col sm={4}>
                <Label>
                  <Input
                    id="exampleFile"
                    name="floorboards"
                    value="Floorboards"
                    defaultChecked={
                      props.data
                        ? props.data.data?.floorboards == null
                          ? false
                          : true
                        : false
                    }
                    onChange={e => handleCheckbox(e)}
                    type="checkbox"
                  />
                  {"   "}
                  <strong>Floorboards</strong>
                </Label>
              </Col>
              <Col sm={4}>
                <Label>
                  <Input
                    id="exampleFile"
                    name="gas_heating"
                    value="Gas Heating"
                    defaultChecked={
                      props.data
                        ? props.data.data?.gas_heating == null
                          ? false
                          : true
                        : false
                    }
                    onChange={e => handleCheckbox(e)}
                    type="checkbox"
                  />
                  {"   "}
                  <strong>Gas Heating</strong>
                </Label>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col sm={4}>
                <Label>
                  <Input
                    id="exampleFile"
                    name="gym"
                    value="Gym"
                    defaultChecked={
                      props.data
                        ? props.data.data?.gym == null
                          ? false
                          : true
                        : false
                    }
                    onChange={e => handleCheckbox(e)}
                    type="checkbox"
                  />
                  {"   "}
                  <strong>Gym</strong>
                </Label>
              </Col>
              <Col sm={4}>
                <Label>
                  <Input
                    id="exampleFile"
                    name="hot_water_service"
                    value="Hot Water Service"
                    defaultChecked={
                      props.data
                        ? props.data.data?.hot_water_service == null
                          ? false
                          : true
                        : false
                    }
                    onChange={e => handleCheckbox(e)}
                    type="checkbox"
                  />
                  {"   "}
                  <strong>Hot Water Service</strong>
                </Label>
              </Col>
              <Col sm={4}>
                <Label>
                  <Input
                    id="exampleFile"
                    name="inside_spa"
                    value="Inside spa"
                    defaultChecked={
                      props.data
                        ? props.data.data?.inside_spa == null
                          ? false
                          : true
                        : false
                    }
                    onChange={e => handleCheckbox(e)}
                    type="checkbox"
                  />
                  {"   "}
                  <strong>Inside spa</strong>
                </Label>
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col sm={4}>
                <Label>
                  <Input
                    id="exampleFile"
                    name="intercom"
                    value="Intercom"
                    defaultChecked={
                      props.data
                        ? props.data.data?.intercom == null
                          ? false
                          : true
                        : false
                    }
                    onChange={e => handleCheckbox(e)}
                    type="checkbox"
                  />
                  {"   "}
                  <strong>Intercom</strong>
                </Label>
              </Col>
              <Col sm={4}>
                <Label>
                  <Input
                    id="exampleFile"
                    name="pay_tv_access"
                    value="Pay TV access"
                    defaultChecked={
                      props.data
                        ? props.data.data?.pay_tv_access == null
                          ? false
                          : true
                        : false
                    }
                    onChange={e => handleCheckbox(e)}
                    type="checkbox"
                  />
                  {"   "}
                  <strong>Pay TV access</strong>
                </Label>
              </Col>
              <Col sm={4}>
                <Label>
                  <Input
                    id="exampleFile"
                    name="rumpus_room"
                    value="Rumpus room"
                    defaultChecked={
                      props.data
                        ? props.data.data?.rumpus_room == null
                          ? false
                          : true
                        : false
                    }
                    onChange={e => handleCheckbox(e)}
                    type="checkbox"
                  />
                  {"   "}
                  <strong>Rumpus room</strong>
                </Label>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col sm={4}>
                <Label>
                  <Input
                    id="exampleFile"
                    name="study"
                    value="Study"
                    defaultChecked={
                      props.data
                        ? props.data.data?.study == null
                          ? false
                          : true
                        : false
                    }
                    onChange={e => handleCheckbox(e)}
                    type="checkbox"
                  />
                  {"   "}
                  <strong>Study</strong>
                </Label>
              </Col>
            </FormGroup>

            <hr />
            <p style={{ fontSize: "21px" }}>Climate control and energy</p>
            <FormGroup row>
              <Col sm={4}>
                <Label>
                  <Input
                    id="exampleFile"
                    name="air_conditioning"
                    value="Air conditioning"
                    defaultChecked={
                      props.data
                        ? props.data.data?.air_conditioning == null
                          ? false
                          : true
                        : false
                    }
                    onChange={e => handleCheckbox(e)}
                    type="checkbox"
                  />
                  {"   "}
                  <strong>Air conditioning</strong>
                </Label>
              </Col>
              <Col sm={4}>
                <Label>
                  <Input
                    id="exampleFile"
                    name="solar_hot_water"
                    value="Solar hot water"
                    defaultChecked={
                      props.data
                        ? props.data.data?.solar_hot_water == null
                          ? false
                          : true
                        : false
                    }
                    onChange={e => handleCheckbox(e)}
                    type="checkbox"
                  />
                  {"   "}
                  <strong>Solar hot water</strong>
                </Label>
              </Col>
              <Col sm={4}>
                <Label>
                  <Input
                    id="exampleFile"
                    name="solar_panels"
                    value="Solar panels"
                    defaultChecked={
                      props.data
                        ? props.data.data?.solar_panels == null
                          ? false
                          : true
                        : false
                    }
                    onChange={e => handleCheckbox(e)}
                    type="checkbox"
                  />
                  {"   "}
                  <strong>Solar panels</strong>
                </Label>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col sm={4}>
                <Label>
                  <Input
                    id="exampleFile"
                    name="water_tank"
                    value="Water tank"
                    defaultChecked={
                      props.data
                        ? props.data.data?.water_tank == null
                          ? false
                          : true
                        : false
                    }
                    onChange={e => handleCheckbox(e)}
                    type="checkbox"
                  />
                  {"   "}
                  <strong>Water tank</strong>
                </Label>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="button" sm={3}></Label>
              <Col sm={9} className="gap-3" align="right">
                {/* <Button color="secondary" onClick={toggle} > */}
                <Button color="secondary" onClick={handleModalClose}>
                  <i className="fa-solid fa-xmark"></i>Cancel
                </Button>{" "}
                <Button color="info" type="submit">
                  Save
                </Button>{" "}
              </Col>
            </FormGroup>
          </Form>
        </ModalBody>

        <ModalFooter></ModalFooter>
      </Modal>

      {/* ===============general feature modal ends here ================*/}
    </>
  );
}

//export default GeneralFeatureModal;
const mapStateToProps = gstate => {
  const {
    general_feature_data,
    general_feature_data_error,
    general_feature_data_loading,
    link_data_loading,
  } = gstate.Listing;
  return {
    general_feature_data,
    general_feature_data_error,
    general_feature_data_loading,
    link_data_loading,
  };
};

export default connect(mapStateToProps, {
  listingGeneralFeature,
  getGeneralFeatureFresh,
  listingGeneralFeatureFresh,
  listingLinksFresh, getGeneralFeature, ListingsInfoFresh
})(GeneralFeatureModal);
