import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Row, Col } from "reactstrap";
import { TagsInput } from "react-tag-input-component";
import toastr from "toastr";
import { lebelContactSelect, updateLabelsForContacts, updateLabelsContactsFresh } from "../../store/Contacts2/actions";

const LabelModal = (props) => {
  const [labelMap, setLabelMap] = useState({}); 
  const [currentLabels, setCurrentLabels] = useState([]); 
  
  useEffect(() => {
    if (props.labelModal) {
      console.log("Fetching labels for selected contacts:", props.selectedContacts);
      props.lebelContactSelect(props.selectedContacts);
    }
  }, [props.labelModal]);

  
  useEffect(() => {
    if (props.contact_label_select && props.contact_label_select.data) {
      console.log("API Response received:", props.contact_label_select);

      const newLabelMap = {};
      props.contact_label_select.data.forEach(item => {
        if (item.labels) {
          newLabelMap[item.labels] = (newLabelMap[item.labels] || 0) + 1;
        }
      });

      setLabelMap(newLabelMap);
      
      const formattedLabels = Object.keys(newLabelMap).map(label => 
        newLabelMap[label] > 1 ? `${label}(${newLabelMap[label]})` : label
      );

      
      setCurrentLabels(formattedLabels);
    }
  }, [props.contact_label_select]);

 
  const handleTagChange = (updatedLabels) => {
    
    setCurrentLabels(updatedLabels);
  };
  const handleBlur = (event) => {
    const inputText = event.target.value.trim();
    if (inputText && !currentLabels.includes(inputText)) {
      setCurrentLabels([...currentLabels, inputText]);
    }
  };

  const handleSave = () => {
    const initialLabels = Object.keys(labelMap);
    const newLabels = currentLabels.map(label => label.split('(')[0]) 
                                    .filter(label => !initialLabels.includes(label));
    const removedLabels = initialLabels.filter(label => 
      !currentLabels.some(currentLabel => currentLabel.startsWith(label))
    );

    

    if (newLabels.length === 0 && removedLabels.length === 0) {
     
      return;
    }

    props.updateLabelsForContacts(props.selectedContacts, newLabels, removedLabels);
    props.updateLabelsContactsFresh(); 
  };

  return (
    <Modal isOpen={props.labelModal} toggle={props.toggle} scrollable={true} size="lg">
      <ModalHeader toggle={props.toggle} className="text-info">Manage Labels</ModalHeader>
      <ModalBody>
        <Row>
          <Col lg={12}>
            <Row className="py-2">
              <Col md={3} className="d-flex justify-content-center align-items-center ps-5">
                Name
              </Col>
              <Col md={8} className="">
                <div className="w-50">
                  <TagsInput
                    value={currentLabels}
                    name="label"
                    placeholder="Add or remove labels"
                    onChange={handleTagChange}
                    onBlur={handleBlur}        
                    separators={["Enter", " "]}
                  />
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </ModalBody>
      <ModalFooter>
        <Button color="info" onClick={props.toggle}>
          <i className="fas fa-times me-1"></i>Cancel
        </Button>
        <Button color="info" onClick={handleSave}>
          <i className="fas fa-file-alt me-1"></i> Save
        </Button>
      </ModalFooter>
    </Modal>
  );
};

const mapStateToProps = gstate => {
  const {
    contact_label_select,
    contact_label_select_error,
    contact_label_select_loading,
    contact_label_select_update
  } = gstate.Contacts2;

  return {
    contact_label_select,
    contact_label_select_error,
    contact_label_select_loading,
    contact_label_select_update
  };
};

export default withRouter(
  connect(mapStateToProps, {
    lebelContactSelect,
    updateLabelsForContacts,
    updateLabelsContactsFresh
  })(LabelModal)
);