import React, { useState, Fragment, useEffect } from "react";
import { Alert, Card, Col, Input, Modal } from "reactstrap";
import {
  getPropertyRooms,
  addRoutineRoom,
  sortRoom,
  sortRoomFresh,
  getPropertyRoomFresh,
  addRoutineRoomFresh,
  deleteRoomFresh,
} from "store/actions";
import { connect } from "react-redux";
import { useParams, withRouter } from "react-router-dom";
import Board, { moveCard, removeCard } from "@lourenci/react-kanban";
import "@lourenci/react-kanban/dist/styles.css";
import toastr from "toastr";

const EditRoomModal = props => {
  const [modalState, setModalState] = useState(false);
  const [state, setState] = useState("");
  const [room, setRoom] = useState([]);
  const { insID } = useParams();

  const [controlledBoard, setBoard] = useState();

  const [kanbanInit, setKanbanInit] = useState(true);
  const [init, setInit] = useState(true);
  const [deleteMess, showDeleteMess] = useState(false);
  const [addMess, showAddMess] = useState(false);
  const initFunc = async () => {
    var card = [];
    await props.propsRoomValues.map((item, key) => {
      item.delete_status == "false" &&
        card.push({
          item: item,
          id: item.sequence_no,
          title: "title",
          description: "des",
        });
    });
    const data = {
      columns: [
        {
          id: 1,
          title: "",
          cards: card.sort((a, b) => {
            if (a.id > b.id) {
              return 1;
            }
            if (a.id < b.id) {
              return -1;
            }
            return 0;
          }),
        },
      ],
    };
    setBoard(data);
    setInit(false);

    setTimeout(() => {
      var x = document.getElementsByClassName("react-kanban-column");
      for (var i = 0; i < x.length; i++) {
        x[i].style.width = "430px";
      }
      var y = document.getElementsByClassName("drg");
      for (var j = 0; j < y.length; j++) {
        y[j].parentElement.style.width = "400px";
      }
    }, 1000);
  };
  if (init) {
    initFunc();
  }

  useEffect(() => {
    initFunc();
    if (props.sort_room_loading == "Success") {
      toastr.success("Room Sorted");
      getPropertyRoomFresh();
      props.sortRoomFresh();
      window.location.reload();

      setModalState(false);
    } else if (props.sort_room_loading == "Failed") {
      toastr.error("Room Sorted failed");
      props.sortRoomFresh();
      setModalState(false);
    }
    if (props.delete_property_room_loading == "Success") {

      showDeleteMess(true);
      setTimeout(() => {
        showDeleteMess(false);
      }, 3000);
      props.deleteRoomFresh();
    }

    if (props.add_routine_room_loading == "Success") {

      showAddMess(true);
      setTimeout(() => {
        showAddMess(false);
      }, 3000);
      props.addRoutineRoomFresh();
    }
  }, [
    props.propsRoomValues,
    modalState,
    props.sort_room_loading,
    props.delete_property_room_loading,
    props.add_routine_room_loading,
  ]);

  function handleCardMove(_card, source, destination) {
    const updatedBoard = moveCard(controlledBoard, source, destination);
    var card = [];
    updatedBoard.columns[0].cards.map((item, key) => {
      card.push({
        item: item.item,
        id: item.item.sequence_no,
        title: "title",
        description: "des",
      });
    });
    const data = {
      columns: [{ id: 1, title: "", cards: card }],
    };
    setBoard(data);
  }

  const tog_standard = () => {
    setModalState(prevState => !prevState);
    removeBodyCss();
  };

  const removeBodyCss = () => {
    document.body.classList.add("no_padding");
  };

  const deleteRoom = (id, propId) => {
    //return 0;
    props.deleteRoom(id, propId);
    props.deleteRoomFresh();
    props.getPropertyRooms(props.propID, props.insID);
    // props.propsCall();
  };

  const addRoom = () => {
    props.addRoutineRoom(props.propID, state);
    props.getPropertyRooms(props.propID, props.insID);
    //props.addRoutineRoomFresh();
  };

  const refreshPage = () => {
    props.sortRoom(insID, props.propID, controlledBoard);
    // window.location.reload();
  };

  return (
    <Fragment>
      <button
        type="button"
        className="btn btn-secondary w-md m-1"
        onClick={tog_standard}
        data-toggle="modal"
        data-target="#myModal"
      >
        <i className="fas fa-solid fa-location-arrow font-size-16 align-middle me-2"></i>
        <i className="fa fa-solid fa-user-helmet-safety" />
        Edit Template
      </button>
      <Modal isOpen={modalState} toggle={tog_standard}>
        <div className="modal-header">
          <h5 className="modal-title mt-0 text-primary" id="myModalLabel">
            Areas
          </h5>
          <button
            type="button"
            onClick={() => setModalState(false)}
            className="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div
          className="modal-body"
          style={{ height: "300px", overflowY: "scroll" }}
        >
          {controlledBoard ? (
            <Board
              renderCard={({ item, id }, { removeCard, dragging }) => (
                <>
                  <Card
                    outline
                    color="info"
                    className="border border-primary p-2 drg"
                  >
                    <div className="row">
                      <Col sm={11}>{item.room}</Col>
                      <Col sm={1}>
                        <span
                          style={{ cursor: "pointer" }}
                          className="text-danger"
                          onClick={() => deleteRoom(item.id, item.property_id)}
                        >
                          <i className="fas fa-times me-2"></i>
                        </span>
                      </Col>
                    </div>
                  </Card>
                </>
              )}
              onCardDragEnd={handleCardMove}
              disableColumnDrag
            >
              {controlledBoard}
            </Board>
          ) : null}
        </div>
        {props.routine && (
          <div className="p-2">
            <div style={{ fontWeight: "bold", fontSize: "16px" }}>
              Add a new area
            </div>
            <div className="row">
              <Col sm={10}>
                <Input
                  type="text"
                  className="form-control-sm"
                  placeholder="New Area"
                  onChange={e => setState(e.target.value)}
                />
              </Col>
              <Col sm={2}>
                <span
                  onClick={addRoom}
                  style={{ cursor: "pointer" }}
                  className="text-primary"
                >
                  <i className="fas fa-check me-2"></i>
                </span>
                <span style={{ cursor: "pointer" }} className="text-danger">
                  <i className="fas fa-times me-2"></i>
                </span>
                {/* fas fa-expand-arrows-alt */}
              </Col>
            </div>
          </div>
        )}
        {deleteMess ? (
          <Alert color="success">Deleted Successfully !!</Alert>
        ) : null}

        {addMess ? <Alert color="success">Added Successfully !!</Alert> : null}
        <div className="modal-footer">
          <button
            type="button"
            onClick={tog_standard}
            className="btn btn-secondary"
            data-dismiss="modal"
          >
            Close
          </button>
          <button type="button" className="btn btn-info" onClick={refreshPage}>
            Save changes
          </button>
        </div>
      </Modal>
    </Fragment>
  );
};

const mapStateToProps = gstate => {
  const {
    sort_room_loading,
    property_room_list,
    property_room_list_error,
    property_room_list_loading,
    delete_property_room,
    delete_property_room_loading,
    add_routine_room_loading,
  } = gstate.Inspections;

  return {
    sort_room_loading,
    property_room_list,
    property_room_list_error,
    property_room_list_loading,
    delete_property_room,
    delete_property_room_loading,
    add_routine_room_loading,
  };
};

export default withRouter(
  connect(mapStateToProps, {
    getPropertyRooms,
    addRoutineRoom,
    sortRoom,
    sortRoomFresh,
    getPropertyRoomFresh,
    addRoutineRoomFresh,
    deleteRoomFresh,
  })(EditRoomModal)
);
