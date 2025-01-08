import React, { useEffect, useState, useRef } from "react";
import { Link, withRouter, useHistory, useParams } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import Parser from "html-react-parser";
import moment from "moment";
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
  Table,
  Carousel,
  CarouselControl,
  CarouselItem,
  CarouselIndicators,
} from "reactstrap";
import classnames from "classnames";
import toastr from "toastr";
import {
  ListingListInfo,
  ListingsInfoFresh,
  RentalListingData,
  rentalListingFresh,
  ListingListInspectionInfo,
  getPropertyEditInfo,
  ListingDescData,
  generalListFeatureImageAdd,
  generalListFeatureImageAddFresh,
  GetListingSliderImage,
  GetListingSliderImageFresh,
  listingLinksInfo,
  getGeneralFeature,
  generalListImageAdd,
  generalListImageAddFresh,
  listingLinksFresh, listAllActivity,
  storeInspectionTaskJobDocument,
  storeInspectionTaskJobDocumentFresh, getListingDoc,
  storePropertyDocument,
  storePropertyDocumentFresh,
} from "store/actions";
import InspectionModalForListingInfo from "./InspectionModalForListingInfo";
import EditPropertyListingInfoModal from "./EditPropertyListingInfoModal";

import EditPropertyDescriptionModal from "./EditPropertyDescriptionModal";
import EditRentalListingModal from "./EditRentalListingModal";
import GeneralFeatureModal from "./GeneralFeatureModal/GeneralFeatureModal";
import LinkModal from "./GeneralFeatureModal/LinkModal";
import axios from "axios";
import DummyImage from '../../assets/images/dummy-image-square.jpg';
import Aos from "aos";
import "aos/dist/aos.css";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
//import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Video from "yet-another-react-lightbox/plugins/video";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/plugins/captions.css";
import EditPropertyModal from "./EditPropertyModal";
import DragAndDrop from "common/DragAndDrop/DragAndDrop";
import Loder from "components/Loder/Loder";
import { isArray } from "lodash";

const DetailsAndAdvert = props => {
  //const [apiData, setApiData] = useState();

  const [loader, setLoader] = useState(false)


  const history = useHistory();
  const [videoData, setData] = useState();
  const [Imagefile, setImageFile] = useState(DummyImage);
  const [itemStatus, setItemStatus] = useState(true);
  const [animation, setAnimation] = useState(false);
  const [showDropZone, setShowDropZone] = useState(false);
  const [showPhotoDropZone, setShowPhotoDropZone] = useState(false);
  const [items, setItems] = useState([
    {
      id: 1,
      src: DummyImage,
      altText: "Slide 1",
      caption: "Slide 1",
    },
  ]);
  // const items = [];
  // items = props.get_list_feature_image;
  const [showSliderState, setShowSliderState] = useState({
    photoIndex: 0,
    isOpen: false,
  });

  const { id } = useParams();
  const userID = id;
  const inputFile = useRef(null);
  const inputFileUpload = useRef(null);
  const inputGeneralFile = useRef(null);

  const [file, setFile] = useState("");

  const [state, setState] = useState({
    activeTab: "1",
  });

  const [propertyEditState, setPropertyEditState] = useState(true);

  // State for Active index
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  // State for Animation
  const [animating, setAnimating] = useState(false);

  // Items array length
  const itemLength = items.length - 1;

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
  const pushInspection = (id) => {
    history.push(`/inspectionInfo/${id}`);
  }


  useEffect(() => {
    if (props.listing_list_info_loading == 'Success') {
      if (props.listing_list_info_data?.data?.length > 0) {

        setLoader(false)
      } else if (props.listing_list_info_data?.data?.length == 0) {
        setLoader(true)
      }
    }
  }, [props.listing_list_info_loading, props.listing_list_info_data?.data?.length])

  useEffect(() => {

    if (props.store_inspection_task_job_document_loading === "Success") {
      toastr.success("Uploaded successfully");
      props.storeInspectionTaskJobDocumentFresh();
      props.getListingDoc(id);
    }
    if (props.store_inspection_task_job_document_loading === "Failed") {
      toastr.error("Something went wrong");
      props.storeInspectionTaskJobDocumentFresh();
    }
    if (props.listing_list_info_loading === false) {
      props.ListingListInfo(id);
    } else if (props.rental_listing_loading === false) {
      props.RentalListingData(id);
    } else if (props.listing_list_info_data?.data[0].property_id) {
      props.ListingListInspectionInfo(
        props.listing_list_info_data?.data[0].property_id
      );
    } else if (props.list_desc_loading === false) {
      props.ListingDescData(id);
    } else if (props.listing_link_data_loading === false) {
      props.listingLinksInfo(id);
    }

    else if (props.property_edit_info_loading == false) {

      props.getPropertyEditInfo(propertyInfo.property_id);
    };
    if (props.general_list_feature_image_add_loading === 'Success') {
      toastr.success('Image added successfully');
      props.generalListFeatureImageAddFresh();
      props.ListingsInfoFresh()
      // setLoader(false)
      // setImgErr('')
    }

    if (props.general_list_feature_image_add_loading === 'Failed') {
      toastr.error('Failed')
      props.generalListFeatureImageAddFresh();
      // setImgErr('')

    }

    if (props.general_list_image_add_loading === 'Success') {
      toastr.success('Image added successfully');
      props.generalListImageAddFresh();
      props.ListingListInfo(id);
    }
    if (props.link_data_loading === "Success") {
      props.listingLinksFresh();
    }

    if (props.get_general_feature_data_loading === false) {
      props.getGeneralFeature(userID);
    }

    setTimeout(function () {
      if (props.get_list_feature_image_loading === false) {
        props.GetListingSliderImage({
          listing_id: id,
          property_id: propertyInfo?.property_id,
        });
        setItemStatus(true);
      }
    }, 4000);

    Aos.init({ duration: 2000 });

  }, [
    props.listing_list_info_loading,
    props.rental_listing_loading,
    props.listing_list_inspection_info_loading,
    props.list_desc_loading,
    props.listing_link_data_loading,
    props.get_list_feature_image_loading,
    props.get_general_feature_data_loading,
    props.property_edit_info_loading,
    props.general_list_feature_image_add_loading,
    props.general_list_image_add_loading,
    props.link_data_loading, props.listing_list_info_data?.data[0].property_id,
    props.store_inspection_task_job_document_loading
  ]);

  useEffect(() => {
    if (props.get_general_feature_data?.data?.id) {
      setLoader(false)
      // toastr.success('in--')
    }
  }, [props.get_general_feature_data])



  const ListingLinkData = props.listing_link_data?.data;

  const propertyEditData = props.property_edit_info_data?.data;

  const propertyAddressData = props.property_edit_info_data?.data?.addressData;

  const propertyInfo = props.listing_list_info_data?.data[0];

  const ListingDesc = props.list_desc_data?.data;


  let rentalListingData;
  if (props.rental_listing_data && props.rental_listing_data?.status !== false) {
    rentalListingData = props.rental_listing_data?.data;
  }

  const userId = rentalListingData ? rentalListingData?.id : null;

  // const [imgErr, setImgErr] = useState('')
  const handleChange = file => {

    const data = file._reactName == 'onDrop' ? file.dataTransfer.files : file.target.files;

    // console.log(data);
    // return

    let imgErr = '';

    Object.entries(data).forEach(([key, value]) => {
      const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
      console.log(value?.type);
      if (!allowedTypes.includes(value?.type)) {
        // setIsError(true);
        // setErrorMsg("Only JPEG, PNG, and GIF images are allowed.");
        console.log("Only JPEG, PNG, and GIF images are allowed.");
        toastr.warning("Only JPEG, PNG, and GIF images are allowed.")
        // imgErr = true;
        imgErr = true;
        return;
      }

    });

    console.log(imgErr);

    if (imgErr != true) {
      // toastr.success('in')
      // return
      const property_image = file;
      setFile(property_image);
      setLoader(true)

      props.generalListFeatureImageAdd({
        listing_id: propertyInfo.id,
        property_id: propertyInfo.property_id,
        file: file._reactName == 'onDrop' ? file.dataTransfer.files : file.target.files,
      });
      props.GetListingSliderImageFresh();
    }



  };

  const handleGeneralImage = async file => {
    console.log(file);
    const listing_image = await file;
    await setFile(listing_image);
    await props.generalListImageAdd({
      listing_id: propertyInfo.id,
      property_id: propertyInfo.property_id,
      // file: listing_image,
      file: file._reactName == 'onDrop' ? file.dataTransfer.files : file.target.files,
    });
    props.ListingListInfo(id);
  };

  const itemImageLength = propertyInfo?.listing_floor_plan_images.length > 0 ? propertyInfo?.listing_floor_plan_images.length - 1 : 0;
  const previousImageButton = () => {
    if (animating) return;
    const nextIndex = activeImageIndex === 0 ? itemImageLength : activeImageIndex - 1;
    setActiveImageIndex(nextIndex);
  };
  const nextImageButton = () => {
    if (animating) return;
    const nextIndex = activeImageIndex === itemImageLength ? 0 : activeImageIndex + 1;
    setActiveImageIndex(nextIndex);
  };

  let imageItems = [];
  let prevLength = 0;
  let preLength = 0;
  if (
    props.get_list_feature_image &&
    props.get_list_feature_image?.data?.data?.length > 0 &&
    itemStatus === true || prevLength != preLength
  ) {
    let i = 1;
    props.get_list_feature_image?.data?.data.forEach(element => {
      imageItems.push({
        id: i,
        src: element,
        altText: "Slide " + i,
        caption: "Slide " + i,
      });
      i++;
    });
    setItems(imageItems);
    setItemStatus(false);
    preLength = props.get_list_feature_image?.data?.data?.length;
  }


  const showSlider = () => {
    //setImageShowState(true);

    setShowSliderState({
      ...showSliderState,
      isOpen: true
    })
  }
  const slides = items.map(item => {
    return (
      <CarouselItem
        onExited={() => setAnimating(false)}
        onExiting={() => setAnimating(true)}
        key={item.id}
      >
        <div onClick={showSlider}>
          <img src={item.src} className="d-block img-fluid" alt={item.altText} style={{
            height: '400px', width: "100%",
            objectFit: 'fill'
          }} />
        </div>

      </CarouselItem>
    );
  });

  // ============for new image viewer===============
  const image_slides = items?.map((item, idx) => {
    return { src: item.src }

  })
  // ============for new image viewer ends===============

  const [showGeneralSliderState, setShowGeneralSliderState] = useState({
    photoIndex: 0,
    isOpen: false,
  });

  const showGeneralSlider = () => {
    //setImageShowState(true);
    setShowGeneralSliderState({
      ...showGeneralSliderState,
      isOpen: true
    })
  }

  const generalSlides = propertyInfo?.listing_floor_plan_images?.length > 0 ? propertyInfo?.listing_floor_plan_images?.map(item => {
    return (
      <CarouselItem
        onExited={() => setAnimating(false)}
        onExiting={() => setAnimating(true)}
        key={item.id}
      >
        <div onClick={showGeneralSlider}>
          <img src={process.env.REACT_APP_IMAGE + item.floor_image} className="d-block img-fluid" alt={item.floor_image} style={{ height: '350px', objectFit: 'cover' }} />
        </div>

      </CarouselItem>
    );

  }) : null;
  const general_slide_image_length = propertyInfo?.listing_floor_plan_images?.length > 0 ? propertyInfo?.listing_floor_plan_images?.length : "";


  // ============for new image viewer===============
  const general_image_slides = propertyInfo?.listing_floor_plan_images?.length > 0 ? propertyInfo?.listing_floor_plan_images?.map((item, idx) => {
    return { src: process.env.REACT_APP_IMAGE + item.floor_image }

  }) : []
  // ============for new image viewer ends===============
  const toggle = tab => {
    if (state.activeTab !== tab) {
      setState({
        ...state,
        activeTab: tab,
      });
      if (tab == '1') {
        props.ListingListInspectionInfo(
          props.listing_list_info_data?.data[0].property_id
        );
      }
      if (tab == '2') {
        // setLoader(true)
        // props.ListingDescData(id);
        // props.getGeneralFeature(id)
      }
    }
  };

  const dropFloorPlan = (e) => {
    e.preventDefault();
    setShowDropZone(false);
  }

  const dragFloorPlan = (e) => {
    e.preventDefault();
    setShowDropZone(true);
  }

  const dragendFloorPlan = (e) => {
    e.preventDefault();
    setShowDropZone(false);
  }

  const dropPhoto = (e) => {
    e.preventDefault();
    setShowPhotoDropZone(false);
  }

  const dragPhoto = (e) => {
    e.preventDefault();
    setShowPhotoDropZone(true);
  }

  const dragendPhoto = (e) => {
    e.preventDefault();
    setShowPhotoDropZone(false);
  }

  const tenantDrag = e => {
    e.preventDefault();
    setShowDropZone(true);
  };

  const tenantDragend = e => {
    e.preventDefault();

    setShowDropZone(false);
  };

  const tenantDropFile = e => {
    e.preventDefault();
    setShowDropZone(false);
  };

  const handlejobDoc = e => {
    e.preventDefault();
    props.storeInspectionTaskJobDocument(
      e.dataTransfer.files,
      propertyInfo.property_id,
      null,
      null,
      null,
      id
    );
  };

  const handleUploadFiles = (e) => {
    // setLoader(true)

    props.storeInspectionTaskJobDocument(
      e.target.files,
      propertyInfo.property_id,
      null,
      null,
      null,
      id
    );
  }

  return (
    <div style={{ marginTop: "-15px" }}>

      <div style={{ padding: "0px", backgroundColor: "#FFF", borderRadius: "20px" }}>
        <Nav className="icon-tab nav-justified my-3">

          <NavItem>
            <NavLink
              style={{ cursor: "pointer", width: "100%", padding: "15px" }}
              className={classnames({
                active: state.activeTab === "1",
              })}
              onClick={() => {
                toggle("1");
              }}
            >
              Detail
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              style={{ cursor: "pointer", width: "100%", padding: "15px" }}
              className={classnames({
                active: state.activeTab === "2",
              })}
              onClick={() => {
                toggle("2");
                setAnimation(true);
                Aos.init({ duration: 2000 });
              }}
            >
              Advert
            </NavLink>
          </NavItem>

        </Nav>
      </div>

      <div>
        <TabContent activeTab={state.activeTab}>
          <TabPane tabId="1">
            <Row>
              <Col sm="12">
                <Card data-aos="fade-right" className="custom_card_border_design me-2">
                  <CardBody>
                    <Row>
                      <Col md={12}>
                        <div className="d-flex justify-content-between align-items-center">
                          <h4 className="text-primary">Listing details</h4>
                          <div>
                            {/* <i className="fas fa-cloud-upload-alt fa-2x text-info" />
                            <input
                              type="file"
                              onChange={handleUploadFiles}
                              ref={inputFileUpload}
                              style={{ display: "none" }}
                              multiple
                            /> */}


                            <Button
                              className="me-1"
                              color="labelColor"
                              onChange={handleUploadFiles}
                              ref={inputFileUpload}
                            >
                              <i className="fas fa-cloud-upload-alt font-size-16 text-white"></i>
                            </Button>



                            <Button
                              className="btn ms-1"
                              color="info"
                              onClick={() => inputFileUpload.current.click()}
                            >
                              {" "}
                              <i className="bx bx-camera d-block font-size-20"></i>
                            </Button>
                            {/* <i className="fas fa-cloud-upload-alt fa-2x text-info" /> */}
                            <input
                              type="file"
                              onChange={handleUploadFiles}
                              ref={inputFileUpload}
                              style={{ display: "none" }}
                              multiple
                            />
                          </div>

                        </div>
                        <div
                          className="w-100 my-2"
                          style={{ borderBottom: "1.2px solid #153D56" }}
                        />
                      </Col>
                    </Row>

                    <div
                      onDragOver={tenantDrag}
                      onDragLeave={tenantDragend}
                      onDrop={tenantDropFile}
                    >
                      {showDropZone &&
                        <div
                          style={{
                            position: "relative",
                            height: "300px",
                            width: "100%",
                            border: "4px dashed grey",
                            borderRadius: "5px",
                          }}
                          onDrop={e => handlejobDoc(e)}
                          className="mt-2"
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
                            <h4>Add document to Listing</h4>
                          </div>
                        </div>
                      }

                      {!showDropZone &&
                        <div>
                          {props.listing_list_info_data?.data.map((item, i) => (
                            <div key={i}>
                              <Row>
                                <Col>
                                  <div className="d-flex">
                                    <Col className="text-textTitleColor">
                                      <p>Listing agent</p>
                                    </Col>
                                    <Col>
                                      <p style={{ color: "#003786" }}>
                                        {item.agent_first_name
                                          ? item.agent_first_name
                                          : ""}
                                      </p>
                                    </Col>
                                  </div>
                                  <div
                                    className="w-100 "
                                    style={{ borderBottom: "1.2px dotted #c9c7c7" }}
                                  />
                                </Col>
                                <Col>
                                  <div className="d-flex">
                                    <Col className="text-textTitleColor">
                                      <p>Available</p>
                                    </Col>
                                    <Col>
                                      <p className="badge rounded-pill bg-warning justify-content-center align-items-center p-2 m-1">
                                        {item.advertisement?.map(
                                          (item, i) => item.date_available
                                        )}
                                      </p>
                                    </Col>
                                  </div>
                                  <div
                                    className="w-100 "
                                    style={{ borderBottom: "1.2px dotted #c9c7c7" }}
                                  />
                                </Col>
                              </Row>
                              <Row>
                                <Col>
                                  <div className="d-flex">
                                    <Col className="text-textTitleColor">
                                      <p>Property</p>
                                    </Col>
                                    <Col>
                                      <p style={{ color: "#003786" }}>{item.reference}</p>
                                    </Col>
                                  </div>
                                  <div
                                    className="w-100 "
                                    style={{ borderBottom: "1.2px dotted #c9c7c7" }}
                                  />
                                </Col>
                                <Col>
                                  <div className="d-flex">
                                    <Col className="text-textTitleColor">
                                      <p>Days available</p>
                                    </Col>
                                    <Col>
                                      <p>30</p>
                                    </Col>
                                  </div>
                                  <div
                                    className="w-100 "
                                    style={{ borderBottom: "1.2px dotted #c9c7c7" }}
                                  />
                                </Col>
                              </Row>
                              <Row>
                                <Col className="d-flex flex-column">
                                  <div className="d-flex">
                                    <Col className="text-textTitleColor">
                                      <p>Tenant</p>
                                    </Col>
                                    <Col>
                                      <p>{item.tenant_first_name}</p>
                                    </Col>
                                  </div>
                                  <div className="d-flex">
                                    <Col className="text-textTitleColor">
                                      <p>Phone</p>
                                    </Col>
                                    <Col>
                                      <p>{item.tenant_mobile_phone}</p>
                                    </Col>
                                  </div>
                                  <div className="d-flex">
                                    <Col className="text-textTitleColor">
                                      <p>Email</p>
                                    </Col>
                                    <Col>
                                      <p>{item.tenant_email}</p>
                                    </Col>
                                  </div>
                                  <div className="d-flex">
                                    <Col className="text-textTitleColor">
                                      <p>Moved in</p>
                                    </Col>
                                    <Col>
                                      <p>{item.tenant_moved_in ? moment(item.tenant_moved_in).format("DD-MM-YYYY") : ''}</p>
                                    </Col>
                                  </div>
                                  <div
                                    className="w-100 "
                                    style={{ borderBottom: "1.2px dotted #c9c7c7" }}
                                  />
                                </Col>
                                <Col className="d-flex flex-column">
                                  <div className="d-flex">
                                    <Col className="text-textTitleColor">
                                      <p>Owner</p>
                                    </Col>
                                    <Col>
                                      <p>{item.owner_first_name}</p>
                                    </Col>
                                  </div>
                                  <div className="d-flex">
                                    <Col className="text-textTitleColor">
                                      <p>Phone</p>
                                    </Col>
                                    <Col>
                                      <p>{item.owner_mobile_phone}</p>
                                    </Col>
                                  </div>
                                  <div className="d-flex">
                                    <Col className="text-textTitleColor">
                                      <p>Email</p>
                                    </Col>
                                    <Col>
                                      <p>{item.owner_email}</p>
                                    </Col>
                                  </div>
                                  <div
                                    className="w-100 "
                                    style={{ borderBottom: "1.2px dotted #c9c7c7" }}
                                  />
                                </Col>
                              </Row>
                            </div>
                          ))}
                        </div>

                      }
                    </div>



                  </CardBody>
                </Card>

                <Card data-aos="fade-left" className="custom_card_border_design me-2">
                  <CardBody>
                    <div>
                      <div className="d-flex justify-content-between">
                        <h4 className="text-primary">Inspections</h4>
                        <InspectionModalForListingInfo
                          p_id={
                            props.listing_list_info_data?.data[0]?.property_id
                          }
                          reference={propertyInfo?.reference}
                          loader={() => setLoader(prev => !prev)}
                        />
                      </div>
                      <div
                        className="w-100 my-2"
                        style={{ borderBottom: "1.2px solid #153D56" }}
                      />
                      <div className="table-responsive">
                        <Table className="table table-borderless mb-0">
                          <thead >
                            <tr
                              style={{ borderBottom: "1.2px dotted #c9c7c7" }}
                            >
                              <th>Date</th>
                              <th>Summery</th>
                              <th>Time</th>
                              <th>Duration</th>
                              <th>Status</th>
                            </tr>
                          </thead>

                          {props.listing_list_inspection_info_data?.data?.map(
                            (item, i) => (
                              <tbody key={i} >
                                <tr style={{ marginTop: "20px" }}>
                                  <td className="badge rounded-pill bg-primary justify-content-center align-items-center p-2" style={{ marginTop: "10px" }}>{moment(item.inspection_date).format("MM-DD-yyyy")}</td>
                                  <td><span className="text-primary" onClick={() => pushInspection(item.id)}>{item.summery}</span></td>
                                  <td >{item.start_time}</td>
                                  <td>{item.duration}</td>
                                  <td className="badge rounded-pill bg-success justify-content-center align-items-center p-2">{item.status === 'init' ? 'Initialized' : item.status}</td>
                                </tr>
                              </tbody>
                            )
                          )}
                        </Table>
                      </div>
                      {/* <div className="d-flex justify-content-end">
                        <InspectionModalForListingInfo
                          p_id={
                            props.listing_list_info_data?.data[0]?.property_id
                          }
                          reference={propertyInfo?.reference}
                        />
                      </div> */}
                    </div>
                  </CardBody>
                </Card>


              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row>
              <Col sm="12">
                {animation ?
                  <Card data-aos="fade-left" className="custom_card_border_design me-2">
                    <CardBody>
                      <div className="d-flex justify-content-between ">
                        <h4 className="text-primary">Advert image</h4>
                        <div className="d-flex gap-2">
                          <Button
                            className="me-1"
                            color="labelColor"
                          // disabled={true}

                          >
                            <i className="fas fa-cloud-upload-alt font-size-14 text-white"></i>
                          </Button>
                          <Button
                            className="btn"
                            color="info"
                            onClick={() => inputFile.current.click()}
                          >
                            {" "}
                            <i className="bx bx-camera d-block font-size-20"></i>
                          </Button>



                          <input
                            type="file"
                            onChange={e => handleChange(e)}
                            ref={inputFile}
                            style={{ display: "none" }}
                            multiple
                          />
                          {/* <Button className="mb-1" color="light" outline disabled>
                            <i className="fas fa-cloud-upload-alt font-size-20 text-info"></i>
                          </Button> */}


                        </div>


                      </div>
                      <div
                        className="w-100 my-2"
                        style={{ borderBottom: "1.2px solid #153D56" }}
                      />
                      <div style={{ height: '420px' }}>
                        <Row>
                          <Col md={12}
                            onDragOver={dragPhoto}
                            onDragLeave={dragendPhoto}
                            onDrop={dropPhoto}
                          >
                            {showPhotoDropZone ?
                              <div
                                style={{ position: 'relative', height: '400px', width: '100%', border: '4px dashed grey', borderRadius: '5px', }}
                                onDrop={e => handleChange(e)}
                              >
                                <div
                                  className="dz-message needsclick"
                                  style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}
                                >
                                  <div className="mb-3">
                                    <i className="display-4 text-muted bx bxs-cloud-upload" />
                                  </div>
                                  <h4>Add photo for listing</h4>
                                </div>
                              </div> : ''
                            }
                            {!showPhotoDropZone &&
                              <Carousel
                                previous={previousButton}
                                next={nextButton}
                                activeIndex={activeIndex}
                              >
                                {slides}
                                <CarouselControl
                                  directionText="Prev"
                                  direction={itemLength > 0 ? "prev" : ''}
                                  onClickHandler={previousButton}
                                />
                                <CarouselControl
                                  directionText="Next"
                                  direction={itemLength > 0 ? "next" : ''}
                                  onClickHandler={nextButton}
                                />
                              </Carousel>
                            }

                            {/* =======================yet another react lightbox start from here==================== */}

                            {showSliderState.isOpen && <Lightbox
                              open={showSliderState.isOpen}
                              close={() => setShowSliderState({ isOpen: false })}
                              //slides={image_slides}
                              slides={image_slides}
                              plugins={[Zoom, Fullscreen, Video]}
                            />}


                            {/* =======================yet another react lightbox ends here=========================== */}

                          </Col>
                          {/* <Col md={1} className="px-1">
                            
                            <Button
                              className="btn mt-1"
                              color="info"
                              onClick={() => inputFile.current.click()}
                            >
                              {" "}
                              <i className="bx bx-camera d-block font-size-20"></i>
                            </Button>

                            <input
                              type="file"
                              onChange={e => handleChange(e)}
                              ref={inputFile}
                              style={{ display: "none" }}
                              multiple
                            />
                            <Button className="mb-1" color="light" outline disabled>
                              <i className="fas fa-cloud-upload-alt font-size-20 text-info"></i>
                            </Button>
                          </Col> */}
                        </Row>
                      </div>
                    </CardBody>
                  </Card>
                  : null
                }

                {props.get_list_feature_image?.data?.data?.length == 0 && <div className="w-100 d-flex justify-content-start ps-5 pb-2 text-warning">Property photo is required</div>}
                {animation ?
                  <Card data-aos="fade-left" className="custom_card_border_design me-2">
                    <CardBody>
                      <Row>
                        <Col
                          md={11}
                          style={{ borderRight: "1px dotted #c9c7c7" }}
                        >
                          <Row className="d-flex justify-content-between">
                            <Col>
                              <div className="fw-bold">
                                {propertyInfo?.properties?.reference}
                              </div>
                              <div>

                                {`${propertyAddressData?.suburb} ${propertyAddressData?.state} ${propertyAddressData?.postcode}`}
                              </div>

                            </Col>

                            <Col className="d-flex flex-column">
                              <div className="d-flex justify-content-end">
                                <span className="badge rounded-pill bg-primary justify-content-center align-items-center p-2 m-1">
                                  <i className="fas fa-bed font-size-14 me-2"></i>{" "}
                                  {propertyInfo?.bedroom || '0'}{" "}
                                </span>
                                <span className="badge rounded-pill bg-success justify-content-center align-items-center p-2 m-1">
                                  <i className="fas fa-bath font-size-14 me-2"></i>{" "}
                                  {propertyInfo?.bathroom || "0"}{" "}
                                </span>
                                <span className="badge rounded-pill bg-primary justify-content-center align-items-center p-2 m-1 mb-2">
                                  <i className="fas fa-car font-size-14 me-2"></i>{" "}
                                  {propertyInfo?.car_space || '0'}{" "}
                                </span>
                              </div>
                              {props.listing_list_info_data?.data[0]?.bedroom == 0 && <div className="text-warning d-flex justify-content-end">There must be atleast one bedrom</div>}
                            </Col>
                          </Row>
                        </Col>
                        <Col md={1}>
                          {/* <EditPropertyListingInfoModal
                            p_id={
                              props.listing_list_info_data?.data[0].property_id
                            }
                            propertyEditData={propertyEditData}
                          /> */}
                          {/* <EditPropertyModal p_id={
                            propertyInfo.property_id
                          } /> */}
                          <Link to={`/editPropertyListing/${propertyInfo?.property_id}/${id}`}>
                            <Button className="btn" color="info" >
                              <i className="fa fa-solid fa-pen" />
                            </Button>
                          </Link>
                        </Col>
                      </Row>

                      <Row>
                        <Col
                          md={11}
                          style={{ borderRight: "1px dotted #c9c7c7" }}
                        >

                          <Row className="d-flex justify-content-between">
                            <Col>
                              {props.property_edit_info_data?.data?.data
                                ?.floor_size && <div>
                                  Floor area:{" "}
                                  {
                                    ` ${props.property_edit_info_data?.data?.data
                                      ?.floor_size} ${props.property_edit_info_data?.data?.data?.floor_area}`
                                  }
                                </div>}
                              {props.property_edit_info_data?.data?.data
                                ?.land_size && <div>
                                  Land area:{" "}
                                  {
                                    `${props.property_edit_info_data?.data?.data
                                      ?.land_size} ${props.property_edit_info_data?.data?.data?.land_area}`
                                  }
                                </div>}
                            </Col>
                            <Col className="d-flex justify-content-end">

                              <p>
                                {props.property_edit_info_data?.data?.data?.property_type?.type}
                              </p>
                            </Col>
                          </Row>
                        </Col>
                        <Col md={1}></Col>
                      </Row>
                    </CardBody>
                  </Card>
                  : null}
                {animation ?
                  <Card data-aos="fade-right" className="custom_card_border_design me-2">
                    <CardBody>
                      <Row>
                        <Col
                          md={11}
                          style={{ borderRight: "1px dotted #c9c7c7" }}
                        >
                          {
                            <Row className="d-flex justify-content-between">
                              <Col>
                                <span className="card-title text-primary">
                                  {rentalListingData?.rent ? `$${rentalListingData?.rent}` : ""} per week
                                </span>{" "}
                                <br />{rentalListingData?.bond ? `$${rentalListingData?.bond}` : ''} Bond

                              </Col>
                              <Col className="d-flex justify-content-end">
                                <div>

                                  <p className="d-flex flex-column">
                                    <span>
                                      Available from{" "}
                                      {rentalListingData?.date_available && <b className="badge rounded-pill bg-primary justify-content-center align-items-center p-2 mb-2">{moment(rentalListingData?.date_available).format('DD/MM/yyyy')}</b>}
                                    </span>
                                    <span className="d-flex justify-content-end">
                                      Agent:{" "}
                                      {rentalListingData?.listing_agent_primary_first_name ?
                                        rentalListingData?.listing_agent_primary_first_name : '' +
                                          " " +
                                          rentalListingData?.listing_agent_primary_last_name ?
                                          rentalListingData?.listing_agent_primary_last_name : ''
                                      }
                                    </span>
                                    <span className="d-flex justify-content-end">
                                      {rentalListingData?.listing_agent_secondary_first_name ?
                                        rentalListingData?.listing_agent_secondary_first_name : '' +
                                          " " +
                                          rentalListingData?.listing_agent_secondary_last_name ?
                                          rentalListingData?.listing_agent_secondary_last_name : ''
                                      }
                                    </span>
                                  </p>
                                </div>
                              </Col>
                            </Row>
                          }
                        </Col>
                        <Col md={1}>
                          <EditRentalListingModal
                            rentalListingData={
                              rentalListingData ? rentalListingData : null
                            }
                            listing_id={id}
                          />
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                  : null}
                {animation ?
                  <Card data-aos="fade-left" className="custom_card_border_design me-2">
                    <CardBody>
                      <Row>
                        {/* {ListingDesc &&
                                        <Col md={11} style={{ borderRight: '1px dotted #c9c7c7' }}>
                                            <h4 className='card-title'>{ListingDesc.title} </h4>
                                            <p>
                                                {ListingDesc.description}
                                            </p>

                                        </Col>
                                    } */}

                        <Col
                          md={11}
                          style={{ borderRight: "1px dotted #c9c7c7" }}
                        >
                          {ListingDesc && (
                            <>
                              <h4 className="card-title text-primary">{ListingDesc.title} </h4>
                              <p className={`${ListingDesc.description == null ? 'text-warning' : ''}`}>{ListingDesc.description == null ? 'description required' : ListingDesc.description}</p>
                            </>
                          )}
                        </Col>
                        <Col md={1}>
                          <EditPropertyDescriptionModal data={ListingDesc} />
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                  : null}

                {animation ?
                  <Card data-aos="fade-right" className="custom_card_border_design me-2">
                    <CardBody>
                      <Row>
                        <Col
                          md={11}
                          style={{ borderRight: "1px dotted #c9c7c7" }}
                        >
                          <Row>
                            <Col md={6}>
                              <Row>
                                <Col md={10}>
                                  <h4 className="card-title text-primary">General Features</h4>
                                  <p className="d-flex flex-column mt-2">
                                    {props.get_general_feature_data ? (
                                      props.get_general_feature_data
                                        ?.new_or_established != null ||
                                        props.get_general_feature_data
                                          ?.new_or_established != "undefined" ? (
                                        <span style={{ marginBottom: "5px" }}>
                                          <i className="fas fas fa-star me-2"></i>
                                          Established property
                                        </span>
                                      ) : null
                                    ) : null}

                                    {props.get_general_feature_data ? (
                                      props.get_general_feature_data.data
                                        ?.ensuites != null ? (
                                        <span style={{ marginBottom: "5px" }}>
                                          <i className="fas fas fa-star me-2"></i>
                                          Ensuites -{" "}
                                          {
                                            props.get_general_feature_data.data
                                              ?.ensuites
                                          }
                                        </span>
                                      ) : null
                                    ) : null}

                                    {props.get_general_feature_data ? (
                                      props.get_general_feature_data.data?.toilets != null ? (
                                        <span style={{ marginBottom: "5px" }}>
                                          <i className="fas fas fa-star me-2"></i>
                                          Toilets -{" "}
                                          {
                                            props.get_general_feature_data.data?.toilets
                                          }
                                        </span>
                                      ) : null
                                    ) : null}

                                    {props.get_general_feature_data ? (
                                      props.get_general_feature_data?.data
                                        ?.furnished != null ? (
                                        <span style={{ marginBottom: "5px" }}>
                                          <i className="fas fas fa-star me-2"></i>
                                          Furnished
                                        </span>
                                      ) : null
                                    ) : null}

                                    {props.get_general_feature_data ? (
                                      props.get_general_feature_data?.data
                                        ?.pets_allowed != null ? (
                                        <span style={{ marginBottom: "5px" }}>
                                          <i className="fas fas fa-star me-2"></i>Pets
                                          Allowed
                                        </span>
                                      ) : null
                                    ) : null}

                                    {props.get_general_feature_data ? (
                                      props.get_general_feature_data?.data
                                        ?.smokers_permitted != null ? (
                                        <span style={{ marginBottom: "5px" }}>
                                          <i className="fas fas fa-star me-2"></i>
                                          Smokers Permitted
                                        </span>
                                      ) : null
                                    ) : null}

                                    {props.get_general_feature_data ? (
                                      props.get_general_feature_data?.data
                                        ?.balcony_or_deck != null ? (
                                        <span style={{ marginBottom: "5px" }}>
                                          <i className="fas fas fa-star me-2"></i>
                                          Balcony or Deck
                                        </span>
                                      ) : null
                                    ) : null}
                                    {props.get_general_feature_data ? (
                                      props.get_general_feature_data.data?.deck !=
                                        null ? (
                                        <span style={{ marginBottom: "5px" }}>
                                          <i className="fas fas fa-star me-2"></i>Deck
                                        </span>
                                      ) : null
                                    ) : null}

                                    {props.get_general_feature_data ? (
                                      props.get_general_feature_data?.data
                                        ?.fully_fenced != null ? (
                                        <span style={{ marginBottom: "5px" }}>
                                          <i className="fas fas fa-star me-2"></i>Fully
                                          Fenced
                                        </span>
                                      ) : null
                                    ) : null}

                                    {props.get_general_feature_data ? (
                                      props.get_general_feature_data?.data
                                        ?.garden_or_courtyard != null ? (
                                        <span style={{ marginBottom: "5px" }}>
                                          <i className="fas fas fa-star me-2"></i>
                                          Garden or Courtyard
                                        </span>
                                      ) : null
                                    ) : null}

                                    {props.get_general_feature_data ? (
                                      props.get_general_feature_data?.data
                                        ?.internal_laundry != null ? (
                                        <span style={{ marginBottom: "5px" }}>
                                          <i className="fas fas fa-star me-2"></i>
                                          Internal Laundry
                                        </span>
                                      ) : null
                                    ) : null}

                                    {props.get_general_feature_data ? (
                                      props.get_general_feature_data?.data
                                        ?.outdoor_entertaining_area != null ? (
                                        <span style={{ marginBottom: "5px" }} >
                                          <i className="fas fas fa-star me-2"></i>
                                          Outdoor Entertaining Area
                                        </span>
                                      ) : null
                                    ) : null}

                                    {props.get_general_feature_data ? (
                                      props.get_general_feature_data?.data
                                        ?.outside_spa != null ? (
                                        <span style={{ marginBottom: "5px" }}>
                                          <i className="fas fas fa-star me-2"></i>
                                          Outsid Spa
                                        </span>
                                      ) : null
                                    ) : null}

                                    {props.get_general_feature_data ? (
                                      props.get_general_feature_data?.data
                                        ?.secure_parking != null ? (
                                        <span style={{ marginBottom: "5px" }}>
                                          <i className="fas fas fa-star me-2"></i>
                                          Secure Parking
                                        </span>
                                      ) : null
                                    ) : null}

                                    {props.get_general_feature_data ? (
                                      props.get_general_feature_data.data?.shed !=
                                        null ? (
                                        <span style={{ marginBottom: "5px" }}>
                                          <i className="fas fas fa-star me-2"></i>Shed
                                        </span>
                                      ) : null
                                    ) : null}
                                    {props.get_general_feature_data ? (
                                      props.get_general_feature_data?.data
                                        ?.swimming_pool != null ? (
                                        <span style={{ marginBottom: "5px" }}>
                                          <i className="fas fas fa-star me-2"></i>
                                          Swimming Pool
                                        </span>
                                      ) : null
                                    ) : null}

                                    {props.get_general_feature_data ? (
                                      props.get_general_feature_data?.data
                                        ?.tennis_court != null ? (
                                        <span style={{ marginBottom: "5px" }}>
                                          <i className="fas fas fa-star me-2"></i>
                                          Tennis Court
                                        </span>
                                      ) : null
                                    ) : null}

                                    {props.get_general_feature_data ? (
                                      props.get_general_feature_data?.data
                                        ?.alarm_system != null ? (
                                        <span style={{ marginBottom: "5px" }}>
                                          <i className="fas fas fa-star me-2"></i>Alarm
                                          System
                                        </span>
                                      ) : null
                                    ) : null}

                                    {props.get_general_feature_data ? (
                                      props.get_general_feature_data?.data
                                        ?.broadband != null ? (
                                        <span style={{ marginBottom: "5px" }}>
                                          <i className="fas fas fa-star me-2"></i>
                                          Broadband
                                        </span>
                                      ) : null
                                    ) : null}

                                    {props.get_general_feature_data ? (
                                      props.get_general_feature_data?.data
                                        ?.Built_in_wardrobes != null ? (
                                        <span style={{ marginBottom: "5px" }}>
                                          <i className="fas fas fa-star me-2"></i>Buil
                                          in wardrobes
                                        </span>
                                      ) : null
                                    ) : null}

                                    {props.get_general_feature_data ? (
                                      props.get_general_feature_data?.data
                                        ?.dishwasher != null ? (
                                        <span style={{ marginBottom: "5px" }}>
                                          <i className="fas fas fa-star me-2"></i>
                                          Dishwasher
                                        </span>
                                      ) : null
                                    ) : null}

                                    {props.get_general_feature_data ? (
                                      props.get_general_feature_data?.data
                                        ?.floorboards != null ? (
                                        <span style={{ marginBottom: "5px" }}>
                                          <i className="fas fas fa-star me-2"></i>
                                          Floorboards
                                        </span>
                                      ) : null
                                    ) : null}

                                    {props.get_general_feature_data ? (
                                      props.get_general_feature_data?.data
                                        ?.gas_heating != null ? (
                                        <span style={{ marginBottom: "5px" }}>
                                          <i className="fas fas fa-star me-2"></i>Gas
                                          Heating
                                        </span>
                                      ) : null
                                    ) : null}

                                    {props.get_general_feature_data ? (
                                      props.get_general_feature_data?.data?.gym !=
                                        null ? (
                                        <span style={{ marginBottom: "5px" }}>
                                          <i className="fas fas fa-star me-2"></i>Gym
                                        </span>
                                      ) : null
                                    ) : null}

                                    {props.get_general_feature_data ? (
                                      props.get_general_feature_data?.data
                                        ?.hot_water_service != null ? (
                                        <span style={{ marginBottom: "5px" }}>
                                          <i className="fas fas fa-star me-2"></i>Hot
                                          Water Service
                                        </span>
                                      ) : null
                                    ) : null}

                                    {props.get_general_feature_data ? (
                                      props.get_general_feature_data?.data
                                        ?.inside_spa != null ? (
                                        <span style={{ marginBottom: "5px" }}>
                                          <i className="fas fas fa-star me-2"></i>
                                          Inside Spa
                                        </span>
                                      ) : null
                                    ) : null}

                                    {props.get_general_feature_data ? (
                                      props.get_general_feature_data?.data
                                        ?.intercom != null ? (
                                        <span style={{ marginBottom: "5px" }}>
                                          <i className="fas fas fa-star me-2"></i>
                                          Intercom
                                        </span>
                                      ) : null
                                    ) : null}

                                    {props.get_general_feature_data ? (
                                      props.get_general_feature_data?.data
                                        ?.pay_tv_access != null ? (
                                        <span style={{ marginBottom: "5px" }}>
                                          <i className="fas fas fa-star me-2"></i>Pay
                                          Tv Access
                                        </span>
                                      ) : null
                                    ) : null}

                                    {props.get_general_feature_data ? (
                                      props.get_general_feature_data?.data
                                        ?.rumpus_room != null ? (
                                        <span style={{ marginBottom: "5px" }}>
                                          <i className="fas fas fa-star me-2"></i>
                                          Rumpus Room
                                        </span>
                                      ) : null
                                    ) : null}
                                    {props.get_general_feature_data ? (
                                      props.get_general_feature_data?.data
                                        ?.study != null ? (
                                        <span style={{ marginBottom: "5px" }}>
                                          <i className="fas fas fa-star me-2"></i>Study
                                        </span>
                                      ) : null
                                    ) : null}

                                    {props.get_general_feature_data ? (
                                      props.get_general_feature_data?.data
                                        ?.air_conditioning != null ? (
                                        <span style={{ marginBottom: "5px" }}>
                                          <i className="fas fas fa-star me-2"></i>Air
                                          Conditioning
                                        </span>
                                      ) : null
                                    ) : null}

                                    {props.get_general_feature_data ? (
                                      props.get_general_feature_data?.data
                                        ?.solar_hot_water != null ? (
                                        <span style={{ marginBottom: "5px" }}>
                                          <i className="fas fas fa-star me-2"></i>Solar
                                          Hot Water
                                        </span>
                                      ) : null
                                    ) : null}

                                    {props.get_general_feature_data ? (
                                      props.get_general_feature_data?.data
                                        ?.solar_panels != null ? (
                                        <span style={{ marginBottom: "5px" }}>
                                          <i className="fas fas fa-star me-2"></i>Solar
                                          Panels
                                        </span>
                                      ) : null
                                    ) : null}

                                    {props.get_general_feature_data ? (
                                      props.get_general_feature_data?.data
                                        ?.water_tank != null ? (
                                        <span style={{ marginBottom: "5px" }}>
                                          <i className="fas fas fa-star me-2"></i>Water
                                          Tank
                                        </span>
                                      ) : null
                                    ) : null}
                                  </p>
                                </Col>
                                <Col md={2}>
                                  {/* <button type="button" className="ms-1 btn btn-secondary">
                                                            <i className="fa fa-solid fa-pen" />
                                                            
                                                        </button> */}
                                  {props.get_general_feature_data ? (
                                    <GeneralFeatureModal
                                      id={userID}
                                      data={props.get_general_feature_data}
                                      loaderOn={() => setLoader(true)}
                                    />
                                  ) : null}
                                </Col>
                              </Row>
                            </Col>
                            <Col md={6}
                              onDragOver={dragFloorPlan}
                              onDragLeave={dragendFloorPlan}
                              onDrop={dropFloorPlan}>
                              {showDropZone ?
                                <div
                                  style={{ position: 'relative', height: '350px', width: '100%', border: '4px dashed grey', borderRadius: '5px', }}
                                  onDrop={e => handleGeneralImage(e)}
                                >
                                  <div
                                    className="dz-message needsclick"
                                    style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}
                                  >
                                    <div className="mb-3">
                                      <i className="display-4 text-muted bx bxs-cloud-upload" />
                                    </div>
                                    <h4>Add floorplan for listing</h4>
                                  </div>
                                </div> : ''
                              }
                              {!showDropZone &&
                                <div>
                                  {generalSlides !== null ?
                                    <Carousel
                                      previous={previousImageButton}
                                      next={nextImageButton}
                                      activeIndex={activeImageIndex}
                                    >
                                      {generalSlides}
                                      <CarouselControl
                                        directionText="Prev"
                                        direction={itemImageLength > 0 ? "prev" : ''}
                                        onClickHandler={previousImageButton}
                                      />
                                      <CarouselControl
                                        directionText="Next"
                                        direction={itemImageLength > 0 ? "next" : ''}
                                        onClickHandler={nextImageButton}
                                      />
                                    </Carousel> :
                                    <img
                                      src={Imagefile}
                                      className="img-fluid mx-auto d-block"
                                      style={{ height: '350px', objectFit: 'cover' }}

                                    />
                                  }
                                </div>
                              }
                              <div style={{ marginTop: "-18px", zIndex: 100, height: "30px", width: "100%", textAlign: 'center', position: "absolute", justifyContent: "center", }}>
                                <div style={{ width: "60px", backgroundColor: "#c9c8c3", height: "35px", margin: "auto", padding: "5px", display: "flex", gap: 2, justifyContent: "center", alignItems: "center", borderRadius: "5px" }}><i className="bx bx-image-add" style={{ fontSize: "15px" }} /><span style={{ fontSize: "15px" }}>{general_slide_image_length}</span></div>
                              </div>
                              {/* ===========yet another react lightbox start from here========= */}

                              <Lightbox
                                open={showGeneralSliderState.isOpen}
                                close={() => setShowGeneralSliderState({ isOpen: false })}
                                //slides={image_slides}
                                slides={general_image_slides}
                                plugins={[Zoom, Fullscreen, Video]}
                              />


                              {/* =======================yet another react lightbox ends here================= */}
                            </Col>
                          </Row>
                        </Col>
                        <Col md={1} className="px-1">
                          <Button
                            className="btn mb-1"
                            color="info"
                            onClick={() => inputGeneralFile.current.click()}
                          >
                            {" "}
                            <i className="bx bx-camera d-block font-size-20"></i>
                          </Button>
                          <input
                            type="file"
                            onChange={e => handleGeneralImage(e)}
                            ref={inputGeneralFile}
                            style={{ display: "none" }}
                            multiple
                          />

                          <Button className="mb-1" color="light" outline disabled>
                            <i className="fas fa-cloud-upload-alt font-size-20 text-info"></i>
                          </Button>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                  : null}
                {animation ?
                  <Card data-aos="fade-left" className="custom_card_border_design me-2">
                    <CardBody>
                      <Row>
                        <Col
                          md={11}
                          style={{ borderRight: "1px dotted #c9c7c7" }}
                        >
                          <Row>
                            <Col>
                              <Row className="d-flex flex-row">
                                <Col
                                  md={10}
                                // style={{ borderRight: "1px dotted #c9c7c7" }}
                                >
                                  <h4 className="card-title text-primary">Links</h4>
                                  <p className="d-flex flex-column mt-2">
                                    Video: <a href={ListingLinkData?.video_url} target="_blank" rel="noopener noreferrer">
                                      {ListingLinkData?.video_url}
                                    </a>
                                    <span>
                                      Online tour: <a href={ListingLinkData?.online_tour} target="_blank" rel="noopener noreferrer">
                                        {ListingLinkData?.online_tour}
                                      </a>
                                    </span>
                                  </p>
                                </Col>
                                <Col md={2}>

                                </Col>
                              </Row>
                            </Col>

                          </Row>
                        </Col>
                        <Col md={1} className="px-1">
                          <LinkModal id={userID} data={ListingLinkData} />
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                  : null}
              </Col>
            </Row>
          </TabPane>
        </TabContent>
        {loader && <Loder status={loader} />}

      </div>
    </div>
  );
};

const mapStateToProps = gstate => {
  const {
    listing_list_loading,
    listing_list_info_loading,
    listing_list_info_data,

    rental_listing_data,
    rental_listing_data_error,
    rental_listing_loading,

    listing_list_inspection_info_data,
    listing_list_inspection_info_loading,

    rental_listing_update_desc_loading,
    rental_listing_update_desc_data,

    list_desc_data,

    list_desc_loading,
    general_list_feature_image_add,
    general_list_feature_image_add_error,
    general_list_feature_image_add_loading,

    listing_link_data,
    listing_link_data_loading,

    get_list_feature_image,
    get_list_feature_image_error,
    get_list_feature_image_loading,

    get_general_feature_data,
    get_general_feature_data_error,
    get_general_feature_data_loading,

    general_list_image_add,
    general_list_image_add_loading,

    link_data_loading,
  } = gstate.Listing;

  const {
    user_list_data,
    user_list_error,
    user_list_loading,

    property_edit_info_data,
    property_edit_info_loading,
    property_type_loading,

    property_type_data,
  } = gstate.property;

  const {
    all_job_document,
    all_job_document_error,
    all_job_document_loading,

    store_inspection_task_job_document_loading,
    all_listing_doc_data,
    all_listing_data_doc_loading, store_property_document_loading
  } = gstate.Document;

  return {
    listing_list_info_loading,
    listing_list_info_data,

    rental_listing_data,
    rental_listing_data_error,
    rental_listing_loading,

    listing_list_inspection_info_data,
    listing_list_inspection_info_loading,

    property_edit_info_data,
    property_edit_info_loading,

    rental_listing_update_desc_loading,
    rental_listing_update_desc_data,

    list_desc_loading,
    list_desc_data,

    general_list_feature_image_add,
    general_list_feature_image_add_error,
    general_list_feature_image_add_loading,

    listing_link_data,
    listing_link_data_loading,

    get_list_feature_image,
    get_list_feature_image_error,
    get_list_feature_image_loading,

    get_general_feature_data,
    get_general_feature_data_error,
    get_general_feature_data_loading,

    general_list_image_add,
    general_list_image_add_loading,

    link_data_loading,

    all_job_document,
    all_job_document_error,
    all_job_document_loading,

    store_inspection_task_job_document_loading,
    all_listing_doc_data,
    all_listing_data_doc_loading, store_property_document_loading
  };
};

export default withRouter(
  connect(mapStateToProps, {
    ListingListInfo,
    RentalListingData,
    rentalListingFresh,
    ListingListInspectionInfo,
    getPropertyEditInfo,
    ListingDescData,
    generalListFeatureImageAdd,
    listingLinksInfo,
    GetListingSliderImage,
    GetListingSliderImageFresh,
    getGeneralFeature,
    generalListImageAdd,
    ListingsInfoFresh,
    generalListFeatureImageAddFresh,
    generalListImageAddFresh,
    listingLinksFresh, listAllActivity,
    storeInspectionTaskJobDocument,
    storeInspectionTaskJobDocumentFresh, getListingDoc,
    storePropertyDocument,
    storePropertyDocumentFresh,
  })(DetailsAndAdvert)
);
