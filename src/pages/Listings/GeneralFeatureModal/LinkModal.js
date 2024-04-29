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
import {
  listingLinks,
  listingLinksFresh,
  listingLinksInfo
} from "../../../store/Listings/actions";
import { useParams } from "react-router-dom";
import Loder from "components/Loder/Loder";
import toastr from "toastr";

function LinkModal(props) {
  const { id } = useParams();

  const [featureModal, setFeatureModal] = useState(false);
  const [init, setInit] = useState(true);
  // const [videoURL, setURL] = useState();
  // const [online, setonline] = useState();
  // const [editItem, setEditItem] = useState({
  //     video: "",
  //     tour: ""

  // });
  const [state, setState] = useState({});
  // console.log(state);
  const toggle = () => setFeatureModal(!featureModal);
  // console.log(props.id);
  const handleModalClose = () => {
    setFeatureModal(false);
    //handleReset();
  };
  // const handleURL = (e) => {
  //     let link = e.target.value;
  //     let validate = link.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
  //     //return (validate !== null)
  //     console.log(validate);
  // }
  // console.log(props.data);
  const [showModal, setShowModal] = useState(false);
  const handleSubmit = e => {
    e.preventDefault();
    // console.log(videoURL, online);
    setShowModal(true);
    props.listingLinks(id, state);
    //props.listingLinksFresh();
  };

  const dataHandler = e => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  if (init) {
    props.listingLinksFresh();
    setInit(false);
  }
  useEffect(() => {
    if (props.data !== undefined) {
      setState({
        ...state,
        videoURL: props.data?.video_url,
        online: props.data?.online_tour,
      });
    }

    if (props.link_data_loading == "Success") {
      setShowModal(false);
      //toastr.success("Update Successfully");
      props.listingLinksInfo(id);
      props.listingLinksFresh();


    }
  }, [props.data, props.link_data_loading]);
  // const {
  //     video,
  //     tour,

  // } = editItem;
  // const obj = {
  //     video: editItem.video,
  //     tour: editItem.tour,
  // }
  // console.log(props.data)
  return (
    <>
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
        {/* ===============general features modal start from here ================*/}

        <Modal
          isOpen={featureModal}
          toggle={toggle}
          size="lg"
          style={{ maxWidth: "700px", width: "100%" }}
        >
          <ModalHeader toggle={handleModalClose}>
            <i className="bx bx-task me-1"></i>
            Links
          </ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup row>
                <Label for="exampleFile" sm={3}>
                  Video URL
                </Label>
                <Col sm={9}>
                  <Input
                    id="exampleFile"
                    name="videoURL"
                    value={state.videoURL}
                    onChange={dataHandler}
                    type="url"
                    required={true}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="exampleFile" sm={3}>
                  Online Tour
                </Label>
                <Col sm={9}>
                  <Input
                    id="exampleFile"
                    name="online"
                    value={state.online}
                    onChange={dataHandler}
                    type="url"
                    required={true}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="button" sm={3}></Label>
                <Col sm={9} className="gap-3" align="right">
                  {/* <Button color="secondary" onClick={toggle} > */}
                  <Button color="secondary" onClick={handleModalClose}>
                    <i className="fa-solid fa-xmark"></i>Cancel
                  </Button>{" "}
                  <Button
                    color="info"
                    type="submit"
                    onClick={e => {
                      handleSubmit(e);
                      handleModalClose();
                    }}
                  >
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
    </>
  );
}

//export default LinkModal;
const mapStateToProps = gstate => {
  const { link_data,
    link_data_error,
    link_data_loading, } = gstate.Listing;
  return {
    link_data,
    link_data_error,
    link_data_loading,
  };
};

export default connect(mapStateToProps, {
  listingLinks,
  listingLinksFresh,
  listingLinksInfo,
})(LinkModal);
