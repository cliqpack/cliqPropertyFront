import moment from "moment";
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
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { connect } from "react-redux";
import Select from "react-select";

import { } from "store/actions";

import toastr from "toastr";
import { useHistory, useParams } from "react-router-dom";
import Loder from "components/Loder/Loder";
import Switch from "react-switch";


export default function WorkOption(props) {
    const [form1state, setForm1State] = useState(false);

    // console.log(form1state);

    const workDataHandler = (e, day) => {
        var data = [];
        props.state.map((item, key) => {
            if (item.day == day) {
                data.push({ id: item.id, day: item.day, work: e });
            } else {
                data.push({ id: item.id, day: item.day, work: item.work });
            }
        })
        props.setState(data);
    }
    const dataHandler = e => {
        setForm1State(prev => !prev);
    }


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
    return (
        <div>
            <Switch
                uncheckedIcon={<Offsymbol />}
                checkedIcon={<OnSymbol />}
                className="me-1 mb-sm-8 mb-2"
                onColor="#153D58"
                onChange={e => { workDataHandler(e, props.day); dataHandler(e) }}
                checked={form1state}
            />
        </div>
    )
}
