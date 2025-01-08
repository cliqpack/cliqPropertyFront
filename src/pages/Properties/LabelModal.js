import React, { useEffect, useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Row, Col } from "reactstrap";
import { TagsInput } from "react-tag-input-component";
import toastr from "toastr";
import axios from "axios";

const LabelModal = (props) => {
    const [labelMap, setLabelMap] = useState({});
    const [currentLabels, setCurrentLabels] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (props.labelModal && props.selectedContacts && props.selectedContacts.length > 0) {
            fetchPropertyLabels(props.selectedContacts);
        }
    }, [props.labelModal, props.selectedContacts]);

    const fetchPropertyLabels = async (propertyIds) => {
        const authUser = JSON.parse(localStorage.getItem("authUser"));
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authUser.token}`
        };

        const Url = `${process.env.REACT_APP_LOCALHOST}/properties/labels`;
        const data = { property_ids: propertyIds };

        setLoading(true);

        try {
            const response = await axios.post(Url, data, { headers: headers });

            const labelsData = response.data.labels;
            const newLabelMap = {};

            Object.keys(labelsData).forEach(propertyId => {
                labelsData[propertyId].forEach(labelEntry => {
                    if (labelEntry.labels) {
                        newLabelMap[labelEntry.labels] = (newLabelMap[labelEntry.labels] || 0) + 1;
                    }
                });
            });

            setLabelMap(newLabelMap);

            const formattedLabels = Object.keys(newLabelMap).map(label =>
                newLabelMap[label] > 1 ? `${label}(${newLabelMap[label]})` : label
            );

            setCurrentLabels(formattedLabels);
        } catch (error) {
            toastr.warning('Error fetching labels.');
        } finally {
            setLoading(false);
        }
    };

    const cleanLabels = (labels) => {
        return labels.map(label => {
            return label.replace(/\(\d+\)$/, '').trim();
        });
    };

    const handleTagChange = (updatedLabels) => {
        setCurrentLabels(updatedLabels);
    };

    const handleSave = async () => {
        const authUser = JSON.parse(localStorage.getItem("authUser"));
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authUser.token}`
        };

        const Url = `${process.env.REACT_APP_LOCALHOST}/properties/update-labels`;
        const cleanedLabels = cleanLabels(currentLabels);

        const data = {
            property_ids: props.selectedContacts,
            labels: cleanedLabels
        };

        try {
            const response = await axios.post(Url, data, { headers: headers });
            toastr.success("Labels updated successfully!");
            props.toggle();
            if (props.onLabelsUpdated) {
                props.onLabelsUpdated();
            }
        } catch (error) {
            toastr.error("Error saving labels.");
        }
    };

    return (
        <Modal isOpen={props.labelModal} toggle={props.toggle} scrollable={true} size="lg">
            <ModalHeader toggle={props.toggle} className="text-info">Manage Labels</ModalHeader>
            <ModalBody>
                {loading ? (
                    <div>Loading labels...</div>
                ) : (
                    <Row>
                        <Col lg={12}>
                            <Row className="py-2">
                                <Col md={3} className="d-flex justify-content-center align-items-center ps-5">
                                    Name
                                </Col>
                                <Col md={8}>
                                    <div className="w-50">
                                        <TagsInput
                                            value={currentLabels}
                                            name="label"
                                            placeholder="Add or remove labels"
                                            onChange={handleTagChange}
                                        />
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                )}
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

export default LabelModal;
