import React, { useState, useEffect, useRef } from "react";
import moment from "moment";
import { connect } from "react-redux";
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
  CardHeader, CardImg,

} from "reactstrap";
import Select from "react-select";
import {
  addBrandSettings, addBrandSettingsFresh, addBrandImage, addBrandImageFresh, getBrandSettings,
  getBrandSettingsFresh, removeBrandImage, removeBrandImageFresh,
} from "store/actions";
import { Link, useHistory, withRouter } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";
import toastr from "toastr";
import ToolkitProvider, {
  Search,
} from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
  PaginationListStandalone,
  SizePerPageDropdownStandalone,
} from "react-bootstrap-table2-paginator";
import Switch from "react-switch";
import ColorPicker from '@vtaits/react-color-picker';
import '@vtaits/react-color-picker/dist/index.css';
import img from '../../../assets/images/Logo realtyme.png'
import RemoveBrandPhoto from "./RemoveBrandPhoto";
import ColorBtn from "common/Button/ColorBtn";

document.title = "CliqProperty";

const Statements = props => {
  const [isLoading, setIsLoading] = useState(false)
  const inputFile = useRef(null);
  const [showDropZone, setShowDropZone] = useState(false);
  const [init, setInit] = useState(true)
  const [show, setShow] = useState(false);
  const toggle = () => setShow(prev => !prev)

  const [state, setState] = useState({
    leftBtn: false, rightBtn: true, activeBtn: true, agencyBtn: true, addressBtn: true, headerBtn: true,
    colorRgb: "#74788d", colorRgb1: "#34c38f", colorRgb2: "#74788d", height: '22', img: ''

  });

  console.log(state);

  useEffect(() => {
    if (props.rmv_brand_img_loading == 'Success') {
      toastr.error('Deleted');
      props.removeBrandImageFresh();
      toggle();
      props.getBrandSettings();

    }
    if (props.rmv_brand_img_loading == 'Failed') {
      toastr.error('Failed');
      props.removeBrandImageFresh()
    }
    if (props.add_brand_img_loading == 'Success') {
      toastr.success('Success');
      props.addBrandImageFresh();
      props.getBrandSettings();
    }
    if (props.add_brand_img_loading == 'Failed') {
      toastr.error('Failed');
      props.addBrandImageFresh()
    }

    if (props.brands_loading == false) {
      props.getBrandSettings();

    }
    if (props.add_brand_loading == 'Success') {
      toastr.success('Success')
      props.addBrandSettingsFresh()
      props.getBrandSettingsFresh();
      setIsLoading(false)

    }
    if (props.add_brand_loading == 'Failed') {
      toastr.error('Failed')
      props.addBrandSettingsFresh()
      // props.getBrandSettings();
      setIsLoading(false)

    }
  }, [props.add_brand_loading, props.brands_loading, props.add_brand_img_loading,
  props.rmv_brand_img_loading,]);

  useEffect(() => {
    if (props.brands_data?.data || props.brands_data?.brand_logo) {
      console.log('in-------');
      // props.getBrandSettingsFresh();

      const { header_height_by_millimeter, primary_colour, secondary_colour, third_colour, logo_position, print_name_next_to_logo, print_address_next_to_logo, show_report_header } = props.brands_data?.data;



      setState({
        ...state,
        height: header_height_by_millimeter,
        colorRgb: primary_colour,
        colorRgb1: secondary_colour,
        colorRgb2: third_colour,
        leftBtn: logo_position == 'Right' ? false : true,
        rightBtn: logo_position == 'Right' ? true : false,
        agencyBtn: print_name_next_to_logo == 1 ? true : false,
        addressBtn: print_address_next_to_logo == 1 ? true : false,
        headerBtn: show_report_header == 1 ? true : false,
        img: props.brands_data?.brand_logo?.brand_image ? `${process.env.REACT_APP_IMAGE}${props.brands_data?.brand_logo?.brand_image}` : ''
      })
    }
  },
    [
      props.brands_data?.data, props.brands_data?.brand_logo
    ])

  // console.log(props.add_brand_img_loading);


  const togglePositionBtn = () => setState(prev => ({ ...prev, leftBtn: !prev.leftBtn, rightBtn: !prev.rightBtn }));

  const Offsymbol = () => {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          fontSize: 12,
          color: "#fff",
          paddingRight: 2,
        }}
      >
        {" "}
        No
      </div>
    );
  };
  const OnSymbol = props => {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          fontSize: 12,
          color: "#fff",
          paddingRight: 2,
        }}
      >
        {" "}
        Yes
      </div>
    );
  };

  const onDragRgb = (c1) => {
    setState({ ...state, colorRgb: c1 })
  }
  const onDragRgb1 = (c1) => {
    setState({ ...state, colorRgb1: c1 })
  }
  const onDragRgb2 = (c1) => {
    setState({ ...state, colorRgb2: c1 })
  }

  const stateHandler = e => {
    console.log(e.target.name, e.target.value);
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleUploadImage = e => {
    setState({ ...state, img: URL.createObjectURL(e.target.files[0]), brand_image: e.target.files[0] })
    props.addBrandImage(e.target.files)
  }

  const dropFile = e => {
    e.preventDefault();
    setShowDropZone(false);
  };

  const drag = e => {
    e.preventDefault();
    setShowDropZone(true);
  };

  const dragend = e => {
    e.preventDefault();
    setShowDropZone(false);
  };

  const handleImage = e => {

    setState({ ...state, img: URL.createObjectURL(e.dataTransfer.files[0]), brand_image: e.dataTransfer.files[0] })
    props.addBrandImage(e.dataTransfer.files)

  }

  const saveHandler = () => {
    setIsLoading(true)
    props.addBrandSettings(state)
  }

  const colorHandler = e => setState({ ...state, colorRgb: e.target.value })

  const deleteHandler = () => props.removeBrandImage()


  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <h4 className="ms-2 text-primary mb-4">Statement Branding</h4>
                  <div
                    className="w-100 mt-2 mb-4"
                    style={{
                      borderBottom: "1.2px dotted #c9c7c7",
                    }}
                  ></div>


                </CardBody>
              </Card>

              <Card>
                <CardBody>



                  <Row>
                    <Col md={9}>
                      <div>
                        <p>Statements generated from PropertyMe can include a custom header with your company logo and details.

                        </p>
                        <p>
                          The header is always included on <b>emailed</b> documents, but can be hidden from <b>printed</b> documents if you prefer to print on company letterhead.
                        </p>
                      </div>

                      <div>
                        <Row>
                          <Col md={3}>Logo image</Col>
                          <Col md={9} className="d-flex flex-column justify-content-start">
                            <Row>
                              <Col md={7} className="d-flex justify-content-start">
                                {state.img &&
                                  <div className="d-flex justify-content-center align-items-center">
                                    <span>Height on page</span>
                                    {state.height ? <input
                                      className="form-control w-25 mx-1"
                                      type="text"
                                      name="height"
                                      value={state.height}
                                      placeholder=""
                                      onChange={stateHandler}
                                    /> :
                                      <input
                                        className="form-control w-25 mx-1"
                                        type="text"
                                        name="height"
                                        value={state.height}
                                        placeholder=""
                                        onChange={stateHandler}
                                      />
                                    }
                                    <span>mm</span>
                                  </div>}
                                {state.img &&
                                  <Button color="secondary" onClick={toggle}>
                                    Delete
                                  </Button>}
                              </Col>
                              <Col md={5} className="d-flex justify-content-end align-items-center">
                                <div>
                                  <i className="fas fa-cloud-upload-alt text-info font-size-24"></i>
                                </div>
                                <div >
                                  <Button
                                    className="btn ms-1"
                                    color="info"
                                    onClick={() => inputFile.current.click()}


                                  // style={{ height: "28px" }}
                                  >
                                    {" "}
                                    <i className="fas fa-paperclip font-size-16"></i>
                                  </Button>
                                  <input
                                    type="file"
                                    onChange={handleUploadImage}
                                    ref={inputFile}
                                    style={{ display: "none" }}
                                    accept="image/*"
                                    multiple
                                  />
                                </div>
                              </Col>
                            </Row>

                            <div className="w-100 my-3"
                              onDragOver={drag}
                              onDragLeave={dragend}
                              onDrop={dropFile}>
                              {showDropZone ? (
                                <div
                                  style={{
                                    position: "relative",
                                    height: "100px",
                                    width: "100%",
                                    border: "1px dashed grey",
                                    borderRadius: "5px",
                                  }}
                                  onDrop={e => handleImage(e)}
                                >
                                  <div
                                    className="dz-message needsclick"
                                    style={{
                                      position: "absolute",
                                      left: "50%",
                                      top: "50%",
                                      transform: "translate(-50%, -50%)",
                                    }}
                                  >
                                    <div className="mb-3">
                                      <i className="display-4 text-muted bx bxs-cloud-upload" />
                                    </div>
                                    <h4>Drag a photo here</h4>
                                  </div>
                                </div>
                              ) : (
                                ""
                              )}


                              {!showDropZone ?
                                <div>

                                  {state.img ?
                                    <div
                                      className="p-1"
                                      style={{
                                        height: '100px', width: 'auto',
                                        border: "0.5px solid #B2BEB5",
                                      }}>
                                      <img
                                        src={state.img}
                                        // alt="Responsive image"
                                        style={{
                                          height: `${state.height}mm`,
                                          width: 'auto',
                                          maxHeight: '50mm',
                                          minHeight: '5mm'
                                        }}
                                      />
                                    </div>
                                    :
                                    <div className="d-flex justify-content-center align-items-center"
                                      style={{
                                        height: '100px', width: 'auto',

                                        border: "1px dashed grey",

                                      }}>
                                      Drag your image here
                                    </div>
                                  }

                                </div>
                                : ''}

                            </div>


                          </Col>

                        </Row>


                      </div>

                      <Row className="py-3">
                        <Col md={3}>
                          Customised colours

                        </Col>
                        <Col md={9} className="d-flex align-items-top">

                          <ColorBtn onDrag={onDragRgb} text='Primary' name='colorRgb' rgb={state.colorRgb} colorHandler={colorHandler} handler={stateHandler} />

                          <ColorBtn onDrag={onDragRgb1} text='Secondary' name='colorRgb1' rgb={state.colorRgb1} colorHandler={colorHandler} handler={stateHandler} />
                          <ColorBtn onDrag={onDragRgb2} text='Tertiary' name='colorRgb2' rgb={state.colorRgb2} colorHandler={colorHandler} handler={stateHandler} />

                        </Col>
                      </Row>

                      <Row className="py-3">
                        <Col md={3}>
                          Position on page
                        </Col>
                        <Col md={9} className="d-flex">
                          <div className="btn-group btn-group-justified">
                            <div className="btn-group">
                              <Button
                                color={state.leftBtn ? "secondary" : "light"}
                                onClick={togglePositionBtn}
                              >
                                {state.leftBtn ? (
                                  <i className="bx bx-comment-check"></i>
                                ) : null}
                                <span> Left</span>
                              </Button>
                            </div>
                            <div className="btn-group">
                              <Button
                                color={state.rightBtn ? "secondary" : "light"}
                                onClick={togglePositionBtn}
                              >
                                {state.rightBtn ? (
                                  <i className="bx bx-comment-check"></i>
                                ) : null}
                                <span> Right</span>
                              </Button>
                            </div>
                          </div>
                        </Col>
                      </Row>

                      <Row className="py-3">
                        <Col md={3}>
                          Show agency name

                        </Col>
                        <Col md={9} className="d-flex">
                          <Switch
                            uncheckedIcon={<Offsymbol />}
                            checkedIcon={<OnSymbol />}
                            className="me-1 mb-sm-8 mb-2"
                            onColor="#153D58"
                            onChange={() => {
                              setState({
                                ...state,
                                agencyBtn: !state.agencyBtn,
                              });
                            }}
                            checked={state.agencyBtn}
                          />
                          <p className="text-muted">Show your company name on all stationery </p>

                        </Col>
                      </Row>

                      <Row className="py-3">
                        <Col md={3}>
                          Show agency address

                        </Col>
                        <Col md={9} className="d-flex">
                          <Switch
                            uncheckedIcon={<Offsymbol />}
                            checkedIcon={<OnSymbol />}
                            className="me-1 mb-sm-8 mb-2"
                            onColor="#153D58"
                            onChange={() => {
                              setState({
                                ...state,
                                addressBtn: !state.addressBtn,
                              });
                            }}
                            checked={state.addressBtn}
                          />
                          <p className="text-muted">{` Show your company address and details on all stationery`}</p>
                        </Col>
                      </Row>

                      <Row className="py-3">
                        <Col md={3}>
                          Include header with logo on printed financial documents

                        </Col>
                        <Col md={9} className="d-flex">
                          <Switch
                            uncheckedIcon={<Offsymbol />}
                            checkedIcon={<OnSymbol />}
                            className="me-1 mb-sm-8 mb-2"
                            onColor="#153D58"
                            onChange={() => {
                              setState({
                                ...state,
                                headerBtn: !state.headerBtn,
                              });
                            }}
                            checked={state.headerBtn}
                          />
                          <p className="text-muted">{` If you use agency letterhead for printed stationery, choose 'No'`} </p>
                        </Col>
                      </Row>

                      <div className="d-flex justify-content-end">
                        <Button color="info" disabled={isLoading} onClick={saveHandler}>Save</Button>
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
        <RemoveBrandPhoto status={show} toggle={toggle} handler={deleteHandler} />
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = gstate => {
  const { add_brand_loading, brands_data, brands_loading, add_brand_img_loading, rmv_brand_img_loading, } = gstate.Portfolio;

  return { add_brand_loading, brands_data, brands_loading, add_brand_img_loading, rmv_brand_img_loading, };
};

export default withRouter(connect(mapStateToProps, { addBrandSettings, addBrandSettingsFresh, addBrandImage, addBrandImageFresh, getBrandSettings, getBrandSettingsFresh, removeBrandImage, removeBrandImageFresh })(Statements));
