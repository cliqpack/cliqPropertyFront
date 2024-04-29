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

import { addWorkingHours, addWorkingHoursFresh, getWorkingHours, getWorkingHoursFresh } from "store/actions";

import toastr from "toastr";
import { useHistory, useParams } from "react-router-dom";
import Loder from "components/Loder/Loder";
import Switch from "react-switch";
import WorkOption from "./WorkOption";
import WorkingHours from "./WorkingHours";
import { logDOM } from "@testing-library/react";

const WorkingHoursModal = props => {

  const [init, setInit] = useState(true)

  const [state, setState] = useState(
    [
      { id: 1, day: 'Sunday', work: 1, start_time: null, end_time: null },
      { id: 2, day: 'Monday', work: 0, start_time: null, end_time: null },
      { id: 3, day: 'Tuesday', work: 0, start_time: null, end_time: null },
      { id: 4, day: 'Wednesday', work: 0, start_time: null, end_time: null },
      { id: 5, day: 'Thursday', work: 0, start_time: null, end_time: null },
      { id: 6, day: 'Friday', work: 0, start_time: null, end_time: null },
      { id: 7, day: 'Saturday', work: 0, start_time: null, end_time: null },
    ]

  )
  console.log(state);

  const data = [
    { id: Math.random() * 10, day: 'Sunday' },
    { id: Math.random() * 10, day: 'Monday' },
    { id: Math.random() * 10, day: 'Tuesday' },
    { id: Math.random() * 10, day: 'Wednesday' },
    { id: Math.random() * 10, day: 'Thursday' },
    { id: Math.random() * 10, day: 'Friday' },
    { id: Math.random() * 10, day: 'Saturday' },
  ]

  const [startTime, setStartTime] = useState({
    selectedStart: [],
    optionStart: [

      { label: "12.00 am", value: "12.00 am" },
      { label: "12.30 am", value: "12.30 am" },
      { label: "1.00 am", value: "1.00 am" },
      { label: "1.30 am", value: "1.30 am" },
      { label: "2.00 am", value: "2.00 am" },
      { label: "2.30 am", value: "2.30 am" },
      { label: "3.00 am", value: "3.00 am" },
      { label: "3.30 am", value: "3.30 am" },
      { label: "4.00 am", value: "4.00 am" },
      { label: "4.30 am", value: "4.30 am" },
      { label: "5.00 am", value: "5.00 am" },
      { label: "5.30 am", value: "5.30 am" },
      { label: "6.00 am", value: "6.00 am" },
      { label: "6.30 am", value: "6.30 am" },
      { label: "7.00 am", value: "7.00 am" },
      { label: "7.30 am", value: "7.30 am" },
      { label: "8.00 am", value: "8.00 am" },
      { label: "8.30 am", value: "8.30 am" },
      { label: "9.00 am", value: "9.00 am" },
      { label: "9.30 am", value: "9.30 am" },
      { label: "10.00 am", value: "10.00 am" },
      { label: "10.30 am", value: "10.30 am" },
      { label: "11.00 am", value: "11.00 am" },
      { label: "11.30 am", value: "11.30 am" },

      { label: "12.00 pm", value: "12.00 pm" },
      { label: "12.30 pm", value: "12.30 pm" },
      { label: "1.00 pm", value: "1.00 pm" },
      { label: "1.30 pm", value: "1.30 pm" },
      { label: "2.00 pm", value: "2.00 pm" },
      { label: "2.30 pm", value: "2.30 pm" },
      { label: "3.00 pm", value: "3.00 pm" },
      { label: "3.30 pm", value: "3.30 pm" },
      { label: "4.00 pm", value: "4.00 pm" },
      { label: "4.30 pm", value: "4.30 pm" },
      { label: "5.00 pm", value: "5.00 pm" },
      { label: "5.30 pm", value: "5.30 pm" },
      { label: "6.00 pm", value: "6.00 pm" },
      { label: "6.30 pm", value: "6.30 pm" },
      { label: "7.00 pm", value: "7.00 pm" },
      { label: "7.30 pm", value: "7.30 pm" },
      { label: "8.00 pm", value: "8.00 pm" },
      { label: "8.30 pm", value: "8.30 pm" },
      { label: "9.00 pm", value: "9.00 pm" },
      { label: "9.30 pm", value: "9.30 pm" },
      { label: "10.00 pm", value: "10.00 pm" },
      { label: "10.30 pm", value: "10.30 pm" },
      { label: "11.00 pm", value: "11.00 pm" },
      { label: "11.30 pm", value: "11.30 pm" },



    ],
    selectedEnd: [],
    optionEnd: [

      { label: "12.00 am", value: "12.00 am" },
      { label: "12.30 am", value: "12.30 am" },
      { label: "1.00 am", value: "1.00 am" },
      { label: "1.30 am", value: "1.30 am" },
      { label: "2.00 am", value: "2.00 am" },
      { label: "2.30 am", value: "2.30 am" },
      { label: "3.00 am", value: "3.00 am" },
      { label: "3.30 am", value: "3.30 am" },
      { label: "4.00 am", value: "4.00 am" },
      { label: "4.30 am", value: "4.30 am" },
      { label: "5.00 am", value: "5.00 am" },
      { label: "5.30 am", value: "5.30 am" },
      { label: "6.00 am", value: "6.00 am" },
      { label: "6.30 am", value: "6.30 am" },
      { label: "7.00 am", value: "7.00 am" },
      { label: "7.30 am", value: "7.30 am" },
      { label: "8.00 am", value: "8.00 am" },
      { label: "8.30 am", value: "8.30 am" },
      { label: "9.00 am", value: "9.00 am" },
      { label: "9.30 am", value: "9.30 am" },
      { label: "10.00 am", value: "10.00 am" },
      { label: "10.30 am", value: "10.30 am" },
      { label: "11.00 am", value: "11.00 am" },
      { label: "11.30 am", value: "11.30 am" },

      { label: "12.00 pm", value: "12.00 pm" },
      { label: "12.30 pm", value: "12.30 pm" },
      { label: "1.00 pm", value: "1.00 pm" },
      { label: "1.30 pm", value: "1.30 pm" },
      { label: "2.00 pm", value: "2.00 pm" },
      { label: "2.30 pm", value: "2.30 pm" },
      { label: "3.00 pm", value: "3.00 pm" },
      { label: "3.30 pm", value: "3.30 pm" },
      { label: "4.00 pm", value: "4.00 pm" },
      { label: "4.30 pm", value: "4.30 pm" },
      { label: "5.00 pm", value: "5.00 pm" },
      { label: "5.30 pm", value: "5.30 pm" },
      { label: "6.00 pm", value: "6.00 pm" },
      { label: "6.30 pm", value: "6.30 pm" },
      { label: "7.00 pm", value: "7.00 pm" },
      { label: "7.30 pm", value: "7.30 pm" },
      { label: "8.00 pm", value: "8.00 pm" },
      { label: "8.30 pm", value: "8.30 pm" },
      { label: "9.00 pm", value: "9.00 pm" },
      { label: "9.30 pm", value: "9.30 pm" },
      { label: "10.00 pm", value: "10.00 pm" },
      { label: "10.30 pm", value: "10.30 pm" },
      { label: "11.00 pm", value: "11.00 pm" },
      { label: "11.30 pm", value: "11.30 pm" },

    ],
  });

  const handleSave = () => {
    props.addWorkingHours(props.id, state)
  };



  const handleSelectStart = (e, day) => {

    var data = [];
    state.map((item, key) => {
      if (item.day == day) {
        data.push({ id: item.id, day: item.day, work: item.work, start_time: e.value, end_time: item.end_time });
      } else {
        data.push({ id: item.id, day: item.day, work: item.work, start_time: item.start_time, end_time: item.end_time });
      }
    })

    setState(data);

  };

  const handleSelectEnd = (e, day) => {

    var data = [];
    state.map((item, key) => {
      if (item.day == day) {
        data.push({ id: item.id, day: item.day, work: item.work, start_time: item.start_time, end_time: e.value });
      } else {
        data.push({ id: item.id, day: item.day, work: item.work, start_time: item.start_time, end_time: item.end_time });
      }
    })

    setState(data);

  };
  const handleSelectEndSunday = () => { };

  useEffect(() => {
    if (init) {
      props.getWorkingHours()
      setInit(false);
    }

    if (props.add_working_hours_loading == 'Success') {
      toastr.success('Success')
      props.addWorkingHoursFresh();
      props.getWorkingHoursFresh();
      props.toggle()
    }

    if (props.add_working_hours_loading == 'Failed') {
      toastr.error('Failed')
      props.addWorkingHoursFresh();
    }

    if (props.working_hours_data?.data?.length > 0) {

      setState(props.working_hours_data?.data);
    }
  }, [props.add_working_hours_loading, props.working_hours_data?.data]);

  // console.log(props.working_hours_loading);

  // const workDataHandler = (e, day) => {
  //   console.log(e, day);
  //   setState({ ...state, [day]: e == true ? 'Yes' : 'No' });
  //   // setState(prev=>{})

  // }
  const workDataHandler = (e, day) => {

    var data = [];
    state.map((item, key) => {
      if (item.day == day) {
        data.push({ id: item.id, day: item.day, work: e == true ? 1 : 0, start_time: item.start_time, end_time: item.end_time });
      } else {
        data.push({ id: item.id, day: item.day, work: item.work, start_time: item.start_time, end_time: item.end_time });
      }
    })
    setState(data);
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
    <>
      <Modal
        isOpen={props.workModal}
        toggle={props.toggle}
        scrollable={true}
        size="lg"
      >
        <ModalHeader toggle={props.toggle}>Working hours</ModalHeader>

        <ModalBody>
          <div>
            <Card>
              <CardBody>
                <div className="table-responsive">
                  <Table className="table mb-0">
                    <thead>
                      <tr>
                        <th>Day</th>
                        <th>Work?</th>
                        <th>Start</th>
                        <th>End</th>
                      </tr>
                    </thead>
                    <tbody>
                      {state?.map((item) =>
                        <tr key={item.id}>
                          <th>{item.day}</th>
                          <td>
                            {/* <WorkOption state={state} setState={setState} day={item.day} workDataHandler={workDataHandler} /> */}

                            <div>
                              <Switch
                                uncheckedIcon={<Offsymbol />}
                                checkedIcon={<OnSymbol />}
                                className="me-1 mb-sm-8 mb-2"
                                onColor="#153D58"
                                onChange={e => { workDataHandler(e, item.day); }}
                                checked={item.work == 1 ? true : false}
                              />
                            </div>
                          </td>
                          <td>
                            <div className="">

                              <Select
                                value={[{ "label": item.start_time, "value": item.start_time }]}
                                onChange={e => handleSelectStart(e, item.day)}
                                options={startTime.optionStart}
                                classNamePrefix="select2-selection"
                              />
                            </div>
                          </td>
                          <td>
                            <Select
                              value={[{ "label": item.end_time, "value": item.end_time }]}
                              onChange={e => handleSelectEnd(e, item.day)}
                              options={startTime.optionStart}
                              classNamePrefix="select2-selection"
                            />

                          </td>
                        </tr>
                      )}

                    </tbody>
                  </Table>
                </div>
              </CardBody>
            </Card>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            style={{
              backgroundColor: "#FF8170",
              border: "none",
            }}
            onClick={props.toggle}>
            <i className="fas fa-times me-1"></i>Cancel
          </Button>
          <Button color="info" onClick={handleSave}>
            <i className="fas fa-file-alt me-1"></i> Save
          </Button>
        </ModalFooter>
      </Modal>


    </>
  );
};
const mapStateToProps = gstate => {
  const { working_hours_loading, working_hours_data, add_working_hours_data, add_working_hours_loading, } = gstate.Portfolio;


  return { working_hours_loading, working_hours_data, add_working_hours_data, add_working_hours_loading, };
};
export default connect(mapStateToProps, { addWorkingHours, addWorkingHoursFresh, getWorkingHours, getWorkingHoursFresh })(WorkingHoursModal);
