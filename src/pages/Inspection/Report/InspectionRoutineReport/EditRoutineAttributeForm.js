import React, { useEffect, useRef, useState } from "react";
import {
  Card,
  CardBody,
  Col,
  Row,
  Button,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Label,
  Form,
  Input,
  InputGroup,
  Alert,
  Carousel,
  CarouselControl,
  CarouselItem,
  CarouselIndicators,
} from "reactstrap";
import {
  Link,
  useHistory,
  useLocation,
  useParams,
  withRouter,
} from "react-router-dom";
import Dropzone from "react-dropzone";
import toastr from "toastr";
import { connect } from "react-redux";
import {
  getPropertyRooms,
  InspectionDetailsInfoData,
  InspectionDetailsInfoDataFresh,
  updateRoutineInspectionInfo,
  updateRoutineInspectionInfoFresh,
  updateRoutineInspectionImage,
  updateRoutineInspectionImageFresh,
  GetRoutineInspectionImageFresh,
  GetRoutineInspectionImage,
  restorePropertyRoom,
} from "store/actions";
// import './RoomAttributeForm.css';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
//import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Video from "yet-another-react-lightbox/plugins/video";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/plugins/captions.css";
import DummyImg from "../../../../assets/images/dummy-image-square.jpg";

const EditRoutineAttributeForm = props => {
  const [form1state, setForm1State] = useState({
    switch1: true,
    switch2: false,
    selectedFiles: [],
  });
  const inputFile = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [itemStatus, setItemStatus] = useState(true);
  const [showSliderState, setShowSliderState] = useState({
    photoIndex: 0,
    isOpen: false,
  });
  const [showDropZone, setShowDropZone] = useState({
    propertyPhoto: false,
  });
  // console.log(form1state);

  const [infoState, setInfoState] = useState({ ...props.state });
  // console.log(image_data);
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

  // Carousoule -------------------------

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
                style={{ height: "405px", width: "100%", objectFit: "cover" }}
              />
            </div>
          </CarouselItem>
        );
      });
      itemLength = image_data.length - 1;
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

  // ----------------------------------------------

  const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };

  const handleChange = async e => {
    await props.updateRoutineInspectionImage(
      props.inspectionID,
      e.target.files,
      props.propertyId,
      props.roomId
    );
  };

  const showSlider = () => {
    setShowSliderState({
      ...showSliderState,
      isOpen: true,
    });
  };

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

    await props.updateRoutineInspectionImage(
      props.inspectionID,
      e.dataTransfer.files,
      props.propertyId,
      props.roomId
    );
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
          {/* <Col sm={1}>
                        <div className="text-size-12"><i className="fas fa-cloud-upload-alt font-size-24"></i></div>
                    </Col> */}
          <Col sm={1}>
            <Button
              className="btn"
              color="secondary"
              onClick={() => inputFile.current.click()}
              disabled={props.roomStatus === "true" ? true : false}
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
        <div style={{ height: "420px" }}>
          <Row className="mb-3">
            <Col sm={4}>
              <textarea
                disabled={props.roomStatus === "true" ? true : false}
                className="form-control"
                rows="20"
                placeholder="Text area"
                value={infoState.routine_description}
                onChange={e => {
                  setInfoState({
                    ...infoState,
                    routine_description: e.target.value,
                  });
                  props.handleFormState(e.target.value, props.index);
                }}
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
                <Form encType="multipart/form-data">
                  <Row className="mb-2">
                    <Col md={12}>
                      {console.log(itemLength)}
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
                          src={DummyImg}
                          style={{ height: "405px", objectFit: "cover" }}
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
                          <span style={{ fontSize: "15px" }}>{itemLength + 1}</span>
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
                  </Row>
                </Form>
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

// export default EditRoutineAttributeForm;

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
    getPropertyRooms,
    InspectionDetailsInfoData,
    InspectionDetailsInfoDataFresh,
    updateRoutineInspectionInfo,
    updateRoutineInspectionInfoFresh,
    updateRoutineInspectionImage,
    updateRoutineInspectionImageFresh,
    GetRoutineInspectionImage,
    GetRoutineInspectionImageFresh,
    restorePropertyRoom,
  })(EditRoutineAttributeForm)
);
