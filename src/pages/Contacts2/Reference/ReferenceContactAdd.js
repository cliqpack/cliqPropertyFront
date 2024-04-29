import React from "react";
import { connect } from "react-redux";
import ContactForm from "./ContactForm";
import {
    Card,
    Alert,
    CardBody,
    CardTitle,
    Col,
    Container,
    Row,
    Label,
    Modal,
    Input,
    Button,
    CardHeader,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
} from "reactstrap";
import { withRouter } from "react-router-dom";

const ReferenceContact = (props) => {
    return (
        <React.Fragment>
            <div className="mt-5 pt-5 bg-white">
                <Container fluid={true}>
                    <div className="d-flex flex-column justify-content-start">
                        <CardTitle className="mb-2">
                            <h3 className="text-primary">New Contact</h3>
                        </CardTitle>
                        <div className="py-2 ps-3">
                            <ContactForm />
                        </div>
                    </div>
                </Container>
            </div>
        </React.Fragment>
    );
}

const mapStateToProps = gstate => {
    const {

    } = gstate.Contacts2;
    return {

    };
};

export default withRouter(
    connect(mapStateToProps, {

    })(ReferenceContact)
);