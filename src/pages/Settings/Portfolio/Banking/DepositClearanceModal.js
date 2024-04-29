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
import { connect, useDispatch, useSelector } from "react-redux";
import Select from "react-select";

import { addDepositClearanceDays, addDepositClearanceDaysFresh, getDepositClearanceData, getDepositClearanceDataFresh } from "store/actions";

import toastr from "toastr";
import { useHistory, useParams } from "react-router-dom";
import Loder from "components/Loder/Loder";
import Switch from "react-switch";

const DepositClearanceModal = props => {
  const dispatch = useDispatch();

  const { addDepositClearanceStatus, getDepositClearance, getDepositClearanceStatus } = useSelector(state => state.Portfolio);
  const [init, setInit] = useState(true)
  const [state, setState] = useState({
    dueDataYesBtn: false,
    dueDateNoBtn: true,
    eft: 0, card: 0, cash: 0, cheque: 0
  });

  const toggleDueDataYesBtn = () => {
    setState({
      ...state,
      dueDataYesBtn: true,
      dueDateNoBtn: false,
    });

  };

  const toggleDueDataNoBtn = () => {
    setState({
      ...state,
      dueDataYesBtn: false,
      dueDateNoBtn: true,
    });
  };

  const handleSave = () => {
    dispatch(addDepositClearanceDays(deposit))
  };

  const handleSelectStartSunday = () => { };
  const handleSelectEndSunday = () => { };
  const [deposit, setDeposit] = useState([
    { id: 1, deposit_type: 'EFT', inputName: 'EFT', notes: 'From receipt date', clearance_after_days: 0 },
    { id: 2, deposit_type: 'Card', inputName: 'Card', notes: 'From banking date', clearance_after_days: 0 },
    { id: 3, deposit_type: 'Cash', inputName: 'Cash', notes: 'From banking date', clearance_after_days: 0 },
    { id: 4, deposit_type: 'Cheque', inputName: 'Cheque', notes: 'From banking date', clearance_after_days: 0 },
    { id: 5, deposit_type: 'Update due date', inputName: 'Update due date', notes: 'Set fees triggered by receipts to be due on the date deposits are expected to clear', clearance_after_days: state.dueDataYesBtn == true ? 1 : 0 },
  ])
  // console.log(deposit);
  const stateHandler = (e, type) => {
    if (Number(e.target.value) > 7) {
      toastr.error('Clearance days should not longer than 7 days')
    } else {

      let data = []
      deposit.map((item) => {
        if (item.deposit_type == type) {


          data.push({ id: item.id, deposit_type: item.deposit_type, inputName: item.deposit_type, notes: item.notes, clearance_after_days: e.target.value })
        } else {


          data.push({ id: item.id, deposit_type: item.deposit_type, inputName: item.deposit_type, notes: item.notes, clearance_after_days: item.clearance_after_days })
        }
      }
      )

      setDeposit(data);


      // setState({...state,})
    }


  };



  useEffect(() => {
    if (init) {
      dispatch(getDepositClearanceData());
      setInit(false)
    }

    if (addDepositClearanceStatus == 'Success') {
      toastr.success('Deposit Clearance days saved');

      dispatch(addDepositClearanceDaysFresh());
      dispatch(getDepositClearanceDataFresh());

      props.toggle()
    }

    if (addDepositClearanceStatus == 'Failed') {
      toastr.error('Failed');
      dispatch(addDepositClearanceDaysFresh());
    }

    if (state) {

      let data = []
      deposit.map((item) => {
        if (item.deposit_type == 'Update due date') {


          data.push({ id: item.id, deposit_type: item.deposit_type, inputName: item.deposit_type, notes: item.notes, clearance_after_days: state.dueDataYesBtn == true ? 1 : 0 })
        } else {


          data.push({ id: item.id, deposit_type: item.deposit_type, inputName: item.deposit_type, notes: item.notes, clearance_after_days: item.clearance_after_days })
        }
      }
      )

      setDeposit(data)
    }

    if (getDepositClearanceStatus == 'Success') {
      console.log('in');
      dispatch(getDepositClearanceDataFresh());
      if (getDepositClearance?.data.length > 0) {
        console.log(getDepositClearance?.data);

        setDeposit(getDepositClearance?.data)

      }
      setState({
        ...state,
        dueDataYesBtn: getDepositClearance?.data[getDepositClearance?.data.length - 1]?.clearance_after_days == '1' ? true : false,
        dueDateNoBtn: getDepositClearance?.data[getDepositClearance?.data.length - 1]?.clearance_after_days == '1' ? false : true
      })
    }

  }, [state, addDepositClearanceStatus, getDepositClearanceStatus]);


  const data = [
    { id: 1, deposit_type: 'EFT', inputName: 'eft', notes: 'From receipt date', clearance_after_days: 0 },
    { id: 2, deposit_type: 'Card', inputName: 'card', notes: 'From banking date', clearance_after_days: 0 },
    { id: 3, deposit_type: 'Cash', inputName: 'cash', notes: 'From banking date', clearance_after_days: 0 },
    { id: 4, deposit_type: 'Cheque', inputName: 'cheque', notes: 'From banking date', clearance_after_days: 0 },
  ]

  return (
    <>
      <Modal
        isOpen={props.depositModal}
        toggle={props.toggle}
        scrollable={true}
      // size="lg"
      >
        <ModalHeader toggle={props.toggle}>Deposit Clearance Days</ModalHeader>

        <ModalBody>
          <div>
            <Card>
              <CardBody>
                <div className="table-responsive">
                  <Table className="table mb-0">
                    <thead>
                      <tr>
                        <th>Deposit Type</th>
                        <th>Weekdays to clear</th>
                        <th>Notes</th>
                      </tr>
                    </thead>
                    <tbody>


                      {
                        deposit.map((item, i) =>
                          <tr key={i}>

                            <td>{item.deposit_type}</td>
                            <td>
                              {item.deposit_type == 'Update due date' ?
                                <div className="btn-group btn-group-justified">
                                  <div className="btn-group">
                                    <Button
                                      color={
                                        state.dueDataYesBtn ? "secondary" : "light"
                                      }
                                      onClick={toggleDueDataYesBtn}
                                    >
                                      {state.dueDataYesBtn ? (
                                        <i className="bx bx-comment-check"></i>
                                      ) : null}
                                      <span> Yes</span>
                                    </Button>
                                  </div>
                                  <div className="btn-group">
                                    <Button
                                      color={
                                        state.dueDateNoBtn ? "secondary" : "light"
                                      }
                                      onClick={toggleDueDataNoBtn}
                                    >
                                      {state.dueDateNoBtn ? (
                                        <i className="bx bx-comment-check"></i>
                                      ) : null}
                                      <span> No</span>
                                    </Button>
                                  </div>
                                </div>
                                :
                                <div className="w-50">
                                  <input
                                    className="form-control"
                                    type="text"
                                    name={item.deposit_type}
                                    value={item.clearance_after_days}
                                    placeholder=""
                                    onChange={e => stateHandler(e, item.deposit_type)}
                                  />
                                </div>}

                            </td>
                            <td>{item.notes}</td>
                          </tr>
                        )
                      }


                    </tbody>
                  </Table>
                </div>

                <Row className="py-2">
                  <Col lg={12}>
                    <div>
                      <i className="fas fa-question-circle" />
                    </div>
                    <div>
                      Updating your clearance day settings will only apply to
                      new receipts. Only Monday to Friday are counted in the
                      clearance day calculation.
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button style={{
            backgroundColor: "#FF8170",
            border: "none",
          }} onClick={props.toggle}>
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

export default DepositClearanceModal
