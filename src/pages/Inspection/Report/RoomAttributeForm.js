import React, { useEffect, useRef, useState } from "react";
import {
  Card,
  CardBody,
  Col,
  Row,
  Button,
  Label,
  Alert,
  Form,
  Input,
  Carousel,
  CarouselControl,
  CarouselItem,
} from "reactstrap";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  updateRoutineInspectionImage,
  updateRoutineInspectionImageFresh,
  GetRoutineInspectionImageFresh,
  GetRoutineInspectionImage,
  restorePropertyRoom,
  getPropertyRooms,
} from "store/actions";
import "./RoomAttributeForm.css";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
//import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Video from "yet-another-react-lightbox/plugins/video";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/plugins/captions.css";

const RoomAttributeForm = props => {
  const [attrFormInputState, setAttrFormInputState] = useState({
    attrRoomName: {},
  });
  const [form1state, setForm1State] = useState({
    switch1: true,
    switch2: false,
    selectedFiles: [],
  });
  const [allBtnState, setAllBtnState] = useState([]);
  const [allBtnStateStatus, setAllBtnStateStatus] = useState(true);
  const inputFile = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [showSliderState, setShowSliderState] = useState({
    photoIndex: 0,
    isOpen: false,
  });

  const [showDropZone, setShowDropZone] = useState({
    propertyPhoto: false,
  });
  const [items, setItems] = useState([
    {
      id: 1,
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHX5VCiMhKgNl3G-0YFEKemnNKvmwzNSt44QPvicYx&s",
      altText: "Slide 1",
      caption: "Slide 1",
    },
  ]);

  
  const image_data = props.get_routine_inspection_image?.data?.data;

  useEffect(() => {
    if (props.get_routine_inspection_image_loading === "Success") {
      imageLoadHimel();
      props.GetRoutineInspectionImageFresh();
    }
    if (props.update_routine_inspection_image_loading === "Success") {
      props.GetRoutineInspectionImageFresh();

      if (props.update_routine_inspection_image.room_id == props.roomId) {
        props.GetRoutineInspectionImage(
          props.inspectionID,
          props.roomId,
          props.propertyId
        );
      }
      props.updateRoutineInspectionImageFresh();
    }
  }, [
    props.get_routine_inspection_image_loading,
    props.update_routine_inspection_image_loading,
  ]);


  const [slides, setslides] = useState([]);
  const [itemLength, setitemLength] = useState(0);
  const [image_slides, setimage_slides] = useState([]);
  // console.log(props.get_routine_inspection_image?.data?.data?.length);
  const imageLoadHimel = () => {
    let imageItems = [];
    let slides = [],
      itemLength = 0;
    let image_slides = [];
    if (image_data.length > 0) {
      let i = 1;
      image_data.forEach(element => {
        if (props.roomId == element.room_id) {
          imageItems.push({
            id: i,
            src: process.env.REACT_APP_IMAGE + element.image_path,
            altText: "Slide " + i,
            caption: "Slide " + i,
          });
        }
        i++;
      });
      setItems(imageItems);
    }

    if (typeof image_data === "object") {
      slides = image_data.map((item, idx) => {
        return (
          <CarouselItem
            onExited={() => setAnimating(false)}
            onExiting={() => setAnimating(true)}
            key={idx}
          >
            <div onClick={showSlider}>
              <img
                src={process.env.REACT_APP_IMAGE + item.image_path}
                className="d-block img-fluid"
                alt={item.image_path}
                style={{ height: "405px", width:"100%",objectFit: "cover" }}
              />
            </div>
          </CarouselItem>
        );
      });
      itemLength = image_data.length-1;
    }

    if (typeof image_data === "object") {
      image_slides = image_data.map((item, idx) => {
        return { src: process.env.REACT_APP_IMAGE + item.image_path };
      });
    }
    setslides(slides);
    setitemLength(itemLength);
    setimage_slides(image_slides);
  };

  const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };

  const handleAcceptedFiles = files => {
    files.map(file =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: formatBytes(file.size),
      })
    );
    props.handleFormState(
      null,
      null,
      props.roomIdx,
      null,
      props.attrRoomName,
      null,
      null,
      files
    );
    setForm1State({ ...form1state, selectedFiles: files });
  };

  const handleAllBtnState = (e, idx, val, stateName) => {
    let value = [...allBtnState];
    value[idx][stateName].state = val;
    setAllBtnState(value);
  };

  const mapBtnValues = (e, val, stateName) => {
    let value = [...allBtnState];
    if (stateName == "clean") {
      value = value.map((item, idx) => {
        props.handleFormState(
          e,
          idx,
          props.roomIdx,
          val,
          props.attrRoomName,
          props.attribute[idx].field,
          "clean"
        );
        item.clean.state = val;
        return item;
      });
    } else if (stateName == "undamaged") {
      value = value.map((item, idx) => {
        props.handleFormState(
          e,
          idx,
          props.roomIdx,
          val,
          props.attrRoomName,
          props.attribute[idx].field,
          "undamaged"
        );
        item.undamaged.state = val;
        return item;
      });
    } else if (stateName == "working") {
      value = value.map((item, idx) => {
        props.handleFormState(
          e,
          idx,
          props.roomIdx,
          val,
          props.attrRoomName,
          props.attribute[idx].field,
          "working"
        );
        item.working.state = val;
        return item;
      });
    }
    return value;
  };


  const toggleAllBtnHandler = (e, stateName) => {
    e.preventDefault();
    if (stateName == "clean") {
      if (allBtnState[0]["clean"].state === 1) {
        setAllBtnState(mapBtnValues(e, 0, "clean"));
      } else if (allBtnState[0]["clean"].state === 0) {
        setAllBtnState(mapBtnValues(e, null, "clean"));
      } else if (allBtnState[0]["clean"].state === null) {
        setAllBtnState(mapBtnValues(e, 1, "clean"));
      }
    } else if (stateName == "undamaged") {
      if (allBtnState[0]["undamaged"].state === 1) {
        setAllBtnState(mapBtnValues(e, 0, "undamaged"));
      } else if (allBtnState[0]["undamaged"].state === 0) {
        setAllBtnState(mapBtnValues(e, null, "undamaged"));
      } else if (allBtnState[0]["undamaged"].state === null) {
        setAllBtnState(mapBtnValues(e, 1, "undamaged"));
      }
    } else if (stateName == "working") {
      if (allBtnState[0]["working"].state === 1) {
        setAllBtnState(mapBtnValues(e, 0, "working"));
      } else if (allBtnState[0]["working"].state === 0) {
        setAllBtnState(mapBtnValues(e, null, "working"));
      } else if (allBtnState[0]["working"].state === null) {
        setAllBtnState(mapBtnValues(e, 1, "working"));
      }
    }
  };
  const showSlider = () => {
    //setImageShowState(true);
    setShowSliderState({
      ...showSliderState,
      isOpen: true,
    });
  };

  // let slides = [],
  //   itemLength = 0;
  // if (typeof props.dummyImage === "object") {
  //   slides = props.dummyImage.map((item, idx) => {
  //     return (
  //       <CarouselItem
  //         onExited={() => setAnimating(false)}
  //         onExiting={() => setAnimating(true)}
  //         key={idx}
  //       >
  //         <div onClick={showSlider}>
  //           <img
  //             src={process.env.REACT_APP_IMAGE + item.image_path}
  //             className="d-block img-fluid"
  //             alt={item.image_path}
  //             style={{ height: "405px", objectFit: "cover" }}
  //           />
  //         </div>
  //       </CarouselItem>
  //     );
  //   });
  //   itemLength = props.dummyImage.length - 1;
  // }
  // // console.log(props.dummyImage);
  // // ============for new image viewer===============
  // let image_slides = [];
  // if (typeof props.dummyImage === "object") {
  //   //console.log("===========he  lllloooo==============")
  //   image_slides = props.dummyImage.map((item, idx) => {
  //     return { src: process.env.REACT_APP_IMAGE + item.image_path };
  //   });
  // }
  // ============for new image viewer ends===============

  const previousButton = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? itemLength : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  // Next button for Carousel
  const nextButton = () => {
    if (animating) return;
    const nextIndex = activeIndex === itemLength ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const restorePropertyRoom = () => {
    props.restorePropertyRoom(props.roomId, props.propertyId);
    props.getPropertyRooms(props.propertyId, props.inspectionID);
  };

  let attributeFormInput,
    btnPushState = [];
  attributeFormInput = props.attribute.map((item, idx) => {
    btnPushState.push({
      clean: { state: null },
      undamaged: { state: null },
      working: { state: null },
    });

    return (
      // #FFFFF2 off white color
      <Card
        key={idx}
        style={{
          backgroundColor: props.roomStatus === "true" ? "#fcf0db" : "",
          color: props.roomStatus === "true" ? "#916c2e" : "",
        }}
      >
        <CardBody>
          <div className="row mb-4">
            <Label
              htmlFor="horizontal-firstname-Input"
              className="col-form-label"
            >
              <b>{item.field}</b>
            </Label>
            <Col sm={6}>
              <Row>
                <Col>
                  Clean <br />
                  {allBtnState.length > 0 &&
                    allBtnState[idx]["clean"].state == 1 && (
                      <button
                        disabled={props.roomStatus === "true" ? true : false}
                        type="button"
                        className="btn btn-success btn-group-sm"
                        onClick={e => {
                          props.handleFormState(
                            e,
                            idx,
                            props.roomIdx,
                            0,
                            props.attrRoomName,
                            item.field,
                            "clean"
                          );
                          handleAllBtnState(e, idx, 0, "clean");
                        }}
                      >
                        {/* <i className="mdi mdi-thumb-up"></i> */}Y
                      </button>
                    )}
                  {allBtnState.length > 0 &&
                    allBtnState[idx]["clean"]?.state == 0 && (
                      <button
                        disabled={props.roomStatus === "true" ? true : false}
                        type="button"
                        className="btn btn-danger btn-group-sm"
                        onClick={e => {
                          props.handleFormState(
                            e,
                            idx,
                            props.roomIdx,
                            null,
                            props.attrRoomName,
                            item.field,
                            "clean"
                          );
                          handleAllBtnState(e, idx, null, "clean");
                        }}
                      >
                        {/* <i className="mdi mdi-thumb-down"></i> */}N
                      </button>
                    )}
                  {allBtnState.length > 0 &&
                    allBtnState[idx]["clean"]?.state == null && (
                      <button
                        disabled={props.roomStatus === "true" ? true : false}
                        type="button"
                        className="btn btn-light btn-group-sm"
                        onClick={e => {
                          props.handleFormState(
                            e,
                            idx,
                            props.roomIdx,
                            1,
                            props.attrRoomName,
                            item.field,
                            "clean"
                          );
                          handleAllBtnState(e, idx, 1, "clean");
                        }}
                      >
                        <i className="far fa-window-close"></i>
                      </button>
                    )}
                </Col>
                <Col>
                  Undamaged <br />
                  {allBtnState.length > 0 &&
                    allBtnState[idx]["undamaged"]?.state == 1 && (
                      <button
                        disabled={props.roomStatus === "true" ? true : false}
                        type="button"
                        className="btn btn-success btn-group-sm"
                        onClick={e => {
                          props.handleFormState(
                            e,
                            idx,
                            props.roomIdx,
                            0,
                            props.attrRoomName,
                            item.field,
                            "undamaged"
                          );
                          handleAllBtnState(e, idx, 0, "undamaged");
                        }}
                      >
                        {/* <i className="mdi mdi-thumb-up"></i> */}Y
                      </button>
                    )}
                  {allBtnState.length > 0 &&
                    allBtnState[idx]["undamaged"]?.state == 0 && (
                      <button
                        disabled={props.roomStatus === "true" ? true : false}
                        type="button"
                        className="btn btn-danger btn-group-sm"
                        onClick={e => {
                          props.handleFormState(
                            e,
                            idx,
                            props.roomIdx,
                            null,
                            props.attrRoomName,
                            item.field,
                            "undamaged"
                          );
                          handleAllBtnState(e, idx, null, "undamaged");
                        }}
                      >
                        {/* <i className="mdi mdi-thumb-down"></i> */}N
                      </button>
                    )}
                  {allBtnState.length > 0 &&
                    allBtnState[idx]["undamaged"]?.state == null && (
                      <button
                        disabled={props.roomStatus === "true" ? true : false}
                        type="button"
                        className="btn btn-light btn-group-sm"
                        onClick={e => {
                          props.handleFormState(
                            e,
                            idx,
                            props.roomIdx,
                            1,
                            props.attrRoomName,
                            item.field,
                            "undamaged"
                          );
                          handleAllBtnState(e, idx, 1, "undamaged");
                        }}
                      >
                        <i className="far fa-window-close"></i>
                      </button>
                    )}
                </Col>
                <Col>
                  Working <br />
                  {allBtnState.length > 0 &&
                    allBtnState[idx]["working"]?.state == 1 && (
                      <button
                        disabled={props.roomStatus === "true" ? true : false}
                        type="button"
                        className="btn btn-success btn-group-sm"
                        onClick={e => {
                          props.handleFormState(
                            e,
                            idx,
                            props.roomIdx,
                            0,
                            props.attrRoomName,
                            item.field,
                            "working"
                          );
                          handleAllBtnState(e, idx, 0, "working");
                        }}
                      >
                        {/* <i className="mdi mdi-thumb-up"></i> */}Y
                      </button>
                    )}
                  {allBtnState.length > 0 &&
                    allBtnState[idx]["working"]?.state == 0 && (
                      <button
                        disabled={props.roomStatus === "true" ? true : false}
                        type="button"
                        className="btn btn-danger btn-group-sm"
                        onClick={e => {
                          props.handleFormState(
                            e,
                            idx,
                            props.roomIdx,
                            null,
                            props.attrRoomName,
                            item.field,
                            "working"
                          );
                          handleAllBtnState(e, idx, null, "working");
                        }}
                      >
                        {/* <i className="mdi mdi-thumb-down"></i> */}N
                      </button>
                    )}
                  {allBtnState.length > 0 &&
                    allBtnState[idx]["working"]?.state == null && (
                      <button
                        disabled={props.roomStatus === "true" ? true : false}
                        type="button"
                        className="btn btn-light btn-group-sm"
                        onClick={e => {
                          props.handleFormState(
                            e,
                            idx,
                            props.roomIdx,
                            1,
                            props.attrRoomName,
                            item.field,
                            "working"
                          );
                          handleAllBtnState(e, idx, 1, "working");
                        }}
                      >
                        <i className="far fa-window-close"></i>
                      </button>
                    )}
                </Col>
              </Row>
            </Col>
            <Col sm={6}>
              <Input
                type="textarea"
                className="form-control"
                id="horizontal-password-Input"
                placeholder="Agent comment"
                onChange={e => {
                  props.handleFormState(
                    e,
                    idx,
                    props.roomIdx,
                    e.target.value,
                    props.attrRoomName,
                    item.field,
                    "comment"
                  );
                }}
              />
            </Col>
          </div>
        </CardBody>
      </Card>
    );
  });

  if (allBtnStateStatus) {
    setAllBtnState(btnPushState);
    setAllBtnStateStatus(false);
  }

  const handleChange = async e => {
    await props.updateRoutineInspectionImage(
      props.inspectionID,
      e.target.files,
      props.propertyId,
      props.roomId
    );
    // await props.GetRoutineInspectionImageFresh();
    // await props.GetRoutineInspectionImage(
    //   props.inspectionID,
    //   props.roomId,
    //   props.propertyId
    // );
  };

  const propertyPhotoDragend = e => {
    e.preventDefault();
    console.log(e);
    setShowDropZone(prev => {
      return {
        ...prev,
        propertyPhoto: false,
      };
    });
  };

  const propertyPhotoDropFile = e => {
    e.preventDefault();
    console.log(e);
    setShowDropZone(prev => {
      return {
        ...prev,
        propertyPhoto: false,
      };
    });
  };

  const propertyPhotoDrag = e => {
    e.preventDefault();
    console.log(e);
    setShowDropZone(prev => {
      return {
        ...prev,
        propertyPhoto: true,
      };
    });
  };

  const handleUploadImageDropzone = async e => {
    console.log(e.dataTransfer.files);
    props.updateRoutineInspectionImage(
      props.inspectionID,
      e.dataTransfer.files,
      props.propertyId,
      props.roomId
    );
    // props.GetRoutineInspectionImageFresh();
    // await props.GetRoutineInspectionImage(
    //   props.inspectionID,
    //   props.roomId,
    //   props.propertyId
    // );
  };
  return (
    <React.Fragment>
      {props.roomStatus === "true" && (
        <Alert color="warning" role="alert">
          This area has been deleted.
          <Button
            color="primary"
            className="mx-3"
            onClick={restorePropertyRoom}
          >
            <i className="fas fa-undo-alt"></i>&nbsp; Restore
          </Button>
        </Alert>
      )}
      <Form>
        <Row className="mb-3">
          <Col sm={11}>
            <input
              type="text"
              className="form-control"
              value={props.attrRoomName}
            />
          </Col>
          <Col sm={1}>
            <Button
              disabled={props.roomStatus === "true" ? true : false}
              className="btn"
              color="secondary"
              onClick={() => inputFile.current.click()}
            >
              <i className="fas fa-camera font-size-18"></i>
            </Button>
            <input
              type="file"
              onChange={handleChange}
              ref={inputFile}
              style={{ display: "none" }}
              accept="image/*"
              multiple
            />
          </Col>
        </Row>
        <div
          style={{
            borderBottom: "1.2px dotted #c9c7c7",
          }}
          className="mb-3"
        ></div>
        <Card
          style={{
            backgroundColor: props.roomStatus === "true" ? "#fcf0db" : "",
            color: props.roomStatus === "true" ? "#916c2e" : "",
          }}
        >
          <CardBody>
            <div className="mb-2 btnHeading">
              <i className="fas fa-magic"></i> Toggle Everything
            </div>
            <Row>
              <Col sm={6}>
                <Row>
                  <Col>
                    Clean <br />
                    <button
                      disabled={props.roomStatus === "true" ? true : false}
                      className="btn btn-light btn-sm"
                      onClick={e => {
                        toggleAllBtnHandler(e, "clean");
                      }}
                    >
                      Clean
                    </button>
                  </Col>
                  <Col>
                    Undamaged <br />
                    <button
                      disabled={props.roomStatus === "true" ? true : false}
                      className="btn btn-light btn-sm"
                      onClick={e => {
                        toggleAllBtnHandler(e, "undamaged");
                      }}
                    >
                      Undamaged
                    </button>
                  </Col>
                  <Col>
                    Working <br />
                    <button
                      disabled={props.roomStatus === "true" ? true : false}
                      className="btn btn-light btn-sm"
                      onClick={e => {
                        toggleAllBtnHandler(e, "working");
                      }}
                    >
                      Working
                    </button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </CardBody>
        </Card>
        {attributeFormInput}
        <div style={{ height: "420px" }}>
          <Row className="mb-3">
            <Col sm={4}>
              <textarea
                disabled={props.roomStatus === "true" ? true : false}
                className="form-control"
                rows="20"
                placeholder="Text area"
                // value={infoState.routine_description}
                onChange={e => props.handleDescription(e, props.roomIdx)}
              ></textarea>
            </Col>
            <Col
              sm={8}
              style={{ border: "1px dashed #c9c8c3", borderRadius: "2px" }}
              onDragOver={propertyPhotoDrag}
              onDragLeave={propertyPhotoDragend}
              onDrop={propertyPhotoDropFile}
            >
              {!showDropZone.propertyPhoto ? (
                <Row className="mb-2">
                  <Col md={12}>
                    <Col md={12}>
                      {slides.length > 0 ? (
                        <Carousel
                          previous={previousButton}
                          next={nextButton}
                          activeIndex={activeIndex}
                        >
                          {slides}
                          <CarouselControl
                            directionText="Prev"
                            direction={itemLength > 0 ? "prev" : ""}
                            onClickHandler={previousButton}
                          />
                          <CarouselControl
                            directionText="Next"
                            direction={itemLength > 0 ? "next" : ""}
                            onClickHandler={nextButton}
                          />
                        </Carousel>
                      ) : (
                        <img
                          src={props.dummyImage}
                          style={{ height: "405px", width:"100%",objectFit: "cover" }}
                        />
                      )}
                      <div
                        style={{
                          marginTop: "-10px",
                          zIndex: 100,
                          height: "30px",
                          width: "100%",
                          textAlign: "center",
                          position: "absolute",
                          justifyContent: "center",
                        }}
                      >
                        <div
                          style={{
                            width: "60px",
                            backgroundColor: "#c9c8c3",
                            height: "35px",
                            margin: "auto",
                            padding: "5px",
                            display: "flex",
                            gap: 2,
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: "5px",
                          }}
                        >
                          <i
                            className="bx bx-image-add"
                            style={{ fontSize: "15px" }}
                          />
                          <span style={{ fontSize: "15px" }}>
                            {itemLength + 1}
                          </span>
                        </div>
                      </div>

                      {/* =============yet another react lightbox start from here========== */}

                      <Lightbox
                        open={showSliderState.isOpen}
                        close={() => setShowSliderState({ isOpen: false })}
                        //slides={image_slides}
                        slides={image_slides}
                        plugins={[Zoom, Fullscreen, Video]}
                      />

                      {/* ===========yet another react lightbox ends here============= */}
                    </Col>
                  </Col>
                </Row>
              ) : (
                ""
              )}
              <div className="">
                {showDropZone.propertyPhoto ? (
                  <div
                    style={{
                      position: "relative",
                      height: "400px",
                      width: "100%",
                      border: "4px dashed grey",
                      borderRadius: "5px",
                    }}
                    onDrop={e => handleUploadImageDropzone(e)}
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
                      <h4>Add inpection property photo</h4>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </Col>
          </Row>
        </div>
      </Form>
    </React.Fragment>
  );
};

const mapStateToProps = gstate => {
  const {
    property_room_list,
    property_room_list_error,
    property_room_list_loading,

    inspection_info_details,
    inspection_info_details_error,
    inspection_info_details_loading,

    update_routine_inspection_add_data,
    update_routine_inspection_add_error,
    update_routine_inspection_add_loading,

    update_routine_inspection_image,
    update_routine_inspection_image_error,
    update_routine_inspection_image_loading,

    get_routine_inspection_image,
    get_routine_inspection_image_error,
    get_routine_inspection_image_loading,
  } = gstate.Inspections;

  return {
    property_room_list,
    property_room_list_error,
    property_room_list_loading,

    inspection_info_details,
    inspection_info_details_error,
    inspection_info_details_loading,

    update_routine_inspection_add_data,
    update_routine_inspection_add_error,
    update_routine_inspection_add_loading,

    update_routine_inspection_image,
    update_routine_inspection_image_error,
    update_routine_inspection_image_loading,

    get_routine_inspection_image,
    get_routine_inspection_image_error,
    get_routine_inspection_image_loading,
  };
};

export default withRouter(
  connect(mapStateToProps, {
    updateRoutineInspectionImage,
    updateRoutineInspectionImageFresh,
    GetRoutineInspectionImage,
    GetRoutineInspectionImageFresh,
    restorePropertyRoom,
    getPropertyRooms,
  })(RoomAttributeForm)
);
