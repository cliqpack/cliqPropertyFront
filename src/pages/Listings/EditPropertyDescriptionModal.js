import React, { useEffect, useState } from "react";
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
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  FormText,
} from "reactstrap";
import { connect } from "react-redux";

import {
  addInspectionInfo,
  InspectionListFresh,
  getUser,
  rentalListDescUpdate,
  rentalListDescUpdateFresh,
  ListingDescDataFresh, listAllActivity, ListingDescData, ListingsInfoFresh
} from "store/actions";
import { addListingsModal } from "../../store/Listings/actions";

import toastr from "toastr";
import { useHistory, useParams } from "react-router-dom";
import { data } from "autoprefixer";
import Loder from "components/Loder/Loder";


const DUMMY_DATA = {
  reference: "Cozy Brand New 3 Bedrooms Townhouse at Lilydale $530 per week",
  details: `Surprise yourself when you come to inspect this perfect house in Lilydale. This house is located in a peaceful area, and close to Lilydale Lake, shops and everything that you need. 
    
    The contemporary floor plan features a fully functional Butler’s Kitchen equipped with all necessities and appliances including stainless steel oven, dishwasher and plenty of storage space in the pantry. Formal dining and living areas connect flawlessly to the backyard adding testament as an entertainer’s delight. 
    
    The contemporary residence showcases a total of three spacious bedrooms with wardrobe space, adding more flexibility and versatility of towards a family home. Additional features include heating, cooling, Double-space garage and many more.`,
};

const EditPropertyDescriptionModal = props => {
  const history = useHistory();
  const { id } = useParams();
  const [inspectionModal, setInspectionModal] = useState(false);
  const [state, setState] = useState({});
  // console.log('EditPropertyDescriptionModal-----------');
  // console.log(state);
  const [showModal, setShowModal] = useState(false);

  const toggle = () => setInspectionModal(!inspectionModal);

  useEffect(() => {
    if (props.data !== undefined) {
      setState({
        ...state,
        reference: props.data.title,
        details: props.data.description,
      });
    }


    if (props.rental_listing_update_desc_loading === "Success") {
      toastr.success("Updated Successfully");
      setShowModal(false);
      props.listAllActivity(id);
      props.rentalListDescUpdateFresh();
      // props.ListingDescDataFresh();
      props.ListingDescData(id);
      props.ListingsInfoFresh()
      toggle();
    }
  }, [props.data, props.rental_listing_update_desc_loading]);

  // console.log('before----', props.list_desc_loading);
  const handleSubmit = e => {
    e.preventDefault();
    setShowModal(true);
    props.rentalListDescUpdate(state, id);
    // console.log('after----', props.list_desc_loading);
  };

  const handleFormValues = e => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <Button className="btn" color="info" onClick={toggle}>
        <i className="fas fa-pen font-size-12"></i>
      </Button>
      <Loder status={showModal} />
      {/* ===============Inspection modal start from here ================*/}

      <Modal size="lg" isOpen={inspectionModal} toggle={toggle}>
        <ModalHeader toggle={toggle}>
          <span className="text-info">Edit Property Description</span>
        </ModalHeader>

        <ModalBody>
          <Form className="form p-3">
            <FormGroup row>
              <Col sm={12}>
                <input
                  className="form-control"
                  type="text"
                  onChange={handleFormValues}
                  value={state.reference}
                  name="reference"
                  placeholder="Headline"
                />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col sm={12}>
                <Input
                  type="textarea"
                  id="textarea"
                  rows="15"
                  onChange={handleFormValues}
                  value={state.details}
                  name="details"
                />
              </Col>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            <i className="fas fa-times"></i> Cancel
          </Button>
          <Button
            color="info"
            disabled={state.reference ? false : true}
            onClick={e => {
              handleSubmit(e);

            }}
          >
            <i className="fas fa-file-alt me-1"></i>Save
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};
const mapStateToProps = gstate => {
  const { } = gstate.property;

  const { list_desc_loading, rental_listing_update_desc_loading } = gstate.Listing;

  return {
    list_desc_loading,
    rental_listing_update_desc_loading
  };
};
export default connect(mapStateToProps, {
  rentalListDescUpdate,
  rentalListDescUpdateFresh,
  ListingDescDataFresh, listAllActivity, ListingDescData, ListingsInfoFresh
})(EditPropertyDescriptionModal);
