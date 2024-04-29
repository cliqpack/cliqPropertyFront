import Loder from "components/Loder/Loder";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  Col,
  Modal,
  Row,
  Button,
  Carousel,
  CarouselControl,
  CarouselItem,
} from "reactstrap";
import {} from "store/actions";
import toastr from "toastr";
import { saveAs } from "file-saver";

const ImageModal = props => {
  console.log(props.imageArray);
  const [modal, setModal] = useState(props.openState);
  const [animating, setAnimating] = useState(false);
  // const [activeIndex, setActiveIndex] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);
  console.log(selectedItem);
  const [loader, setloader] = useState(false);
  const [downloadPath, setDownloadPath] = useState("");
  const [downloadName, setDownloadName] = useState("");

  const itemLength = props.imageArray?.length - 1;

  const previousButton = () => {
    if (animating) return;
    const nextIndex =
      props.activeIndex === 0 ? itemLength : props.activeIndex - 1;
    props.setActiveIndex(nextIndex);
    props.imageArray.map((item, idx) => {
      if (nextIndex == idx) {
        setSelectedItem(item.id);
      }
    });
  };

  const nextButton = () => {
    if (animating) return;
    const nextIndex =
      props.activeIndex === itemLength ? 0 : props.activeIndex + 1;
    props.setActiveIndex(nextIndex);
    props.imageArray.map((item, idx) => {
      if (nextIndex == idx) {
        setSelectedItem(item.id);
      }
    });
  };

  const selectImage = (index, id) => {
    props.setActiveIndex(index);
    setSelectedItem(id);
    props.imageArray.map((item, idx) => {
      if (id == item.id) {
        let path = process.env.REACT_APP_IMAGE + item.property_image;
        setDownloadPath(path);
        setDownloadName(item.image_name);
      }
    });
  };

  const deleteImage = () => {
    // console.log(props.imageArray);
    console.log(selectedItem);
    if (selectedItem) {
      console.log("deleteImage");
      // setloader(true);
      // props.propertyImageDelete(selectedItem);
      props.apiCall(selectedItem);
    } else {
      toastr.warning("Please Select a Image");
    }
  };

  const download = (e) => {
    saveAs(downloadPath, "image.jpg");
  };

  return (
    <Modal isOpen={props.openState} toggle={props.toggle} size="xl">
      <div className="modal-header">
        <button
          type="button"
          onClick={props.toggle}
          className="close"
          data-dismiss="modal"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        <div style={{ position: "relative" }}>
          {loader && <Loder status={loader} />}
          <Row>
            <Col md={8}>
              <Carousel
                previous={previousButton}
                next={nextButton}
                activeIndex={props.activeIndex}
                interval={null}
              >
                {props.imageArray.map((item, idx) => {
                  return (
                    <CarouselItem
                      onExited={() => setAnimating(false)}
                      onExiting={() => setAnimating(true)}
                      key={idx}
                    >
                      <img
                        src={
                          props.component == "property"
                            ? process.env.REACT_APP_IMAGE + item.image_name
                            : item.image_name
                        }
                        alt="Dummy"
                        style={{ height: "600px", objectFit: "cover" }}
                        onClick={() => selectImage(idx, item.id)}
                      />
                    </CarouselItem>
                  );
                })}
                <CarouselControl
                  directionText="Prev"
                  direction={itemLength > 0 ? "prev" : ""}
                  onClickHandler={previousButton}
                  button="secondary"
                />
                <CarouselControl
                  directionText="Next"
                  direction={itemLength > 0 ? "next" : ""}
                  onClickHandler={nextButton}
                  button="secondary"
                />
              </Carousel>
            </Col>
            <Col md={4}>
              <div
                className="d-flex flex-wrap"
                style={{ padding: "60px 10px 5px 10px" }}
              >
                {props.imageArray.map((item, key) => {
                  let selectStyle =
                    item.id == selectedItem
                      ? { border: "2px solid #153D58" }
                      : null;
                  return (
                    <div
                      className="p-1"
                      key={key}
                      onClick={() => selectImage(key, item.id)}
                      style={selectStyle}
                    >
                      <img
                        src={
                          props.component == "property"
                            ? process.env.REACT_APP_IMAGE + item.image_name
                            : item.image_name
                        }
                        style={{
                          height: "70px",
                          width: "70px",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            </Col>
          </Row>
        </div>
      </div>
      <div className="modal-footer">
        {/* hello saiful vai */}
        <a
          className="btn btn-info me-1"
          // href={downloadPath}
          onClick={e => download(e)}
          // download
        >
          Download
        </a>
        <Button className="btn btn-danger me-1" onClick={deleteImage}>
          Delete
        </Button>
      </div>
    </Modal>
  );
};
const mapStateToProps = gstate => {
  const {} = gstate.property;
  return {};
};
export default withRouter(connect(mapStateToProps, {})(ImageModal));
