import React, { useState } from "react";
import Board, { moveCard, removeCard } from "@lourenci/react-kanban";
import { Col, Row, Container, Card, CardBody } from "reactstrap";
import "@lourenci/react-kanban/dist/styles.css";
// Use your own styles to override the default styles
// import "./styles.css";
import {
    getTaskInfoFresh,
    deleteTaskFresh,
    getAllTask,
    swapTask,
    swapTaskFresh,
} from "store/actions";

import { Link, withRouter, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { useEffect } from "react";
import toastr from "toastr";
import logo from '../../assets/images/Myday.png'

function KanbanBoard(props) {
    const history = useHistory();
    const [controlledBoard, setBoard] = useState();
    const [kanbanInit, setKanbanInit] = useState(true);

    // if (props.all_task != null && kanbanInit) {
    //     const task = props.all_task.data;
    //     setBoard(task);
    //     setKanbanInit(false);
    // }
    function handleCardMove(_card, source, destination) {
        const updatedBoard = moveCard(controlledBoard, source, destination);
        console.log(_card);
        props.swapTask(_card.id, source.fromColumnId, destination.toColumnId);
        props.getAllTask()
        setBoard(updatedBoard);
    }
    const [seen, setSeen] = useState(false);

    useEffect(() => {

        if (props.all_task_loading === 'Success') {
            const task = props.all_task.data;
            console.log(task);
            if (!seen) {
                setBoard(task);
                setSeen(true);

            }
            props.swapTaskFresh();


        }
    }, [props.all_task_loading, props.all_task]);

    const handleClick = (id) => {
        history.push('/task/show/' + id);
    }

    if (props.swap_task_loading === 'Success') {
        toastr.success('Task Updated.');
        props.swapTaskFresh();
    }

    return (
        <Container fluid={true}>
            <Row className="justify-content-center" style={{ marginTop: "60px" }}>
                <Col lg={12}>
                    <>
                        {controlledBoard ?
                            <Board
                                renderCard={({ id, reference, description, due_by, owner_first_name, owner_last_name, manager_first_name, manager_last_name }, { removeCard, dragging }) => (
                                    // <div className="react-kanban-card" onClick={() => handleClick(id)} style={{ backgroundColor: "", }} >
                                    //     <span>
                                    //         <div className="react-kanban-card__title">
                                    //             <span>{reference}</span>
                                    //         </div>
                                    //     </span>
                                    //     <div className="react-kanban-card__description"><span style={{ fontWeight: "bold" }}>Description: </span>{description}
                                    //     </div>

                                    //     <div className="react-kanban-card__description"><span style={{ fontWeight: "bold" }}>Manager Name: </span>{manager_first_name} {manager_last_name}
                                    //     </div>

                                    //     <div className="react-kanban-card__description"><span style={{ fontWeight: "bold" }}>Owner Name: </span>{owner_first_name} {owner_last_name}
                                    //     </div>

                                    //     <div className="react-kanban-card__description"><span className="badge rounded-pill bg-primary">
                                    //         Due Date: {due_by}
                                    //     </span></div>
                                    // </div>

                                    <Card >
                                        <CardBody onClick={() => handleClick(id)}>
                                            <div className="d-flex" style={{ width: "280px" }}>
                                                <div className="avatar-md me-4">
                                                    <span className=" text-danger font-size-16">
                                                        {/* <img src={logo} alt="" height="30" style={{ objectFit: "contain" }} /> */}
                                                        <p style={{ fontSize: "30px", textTransform: "uppercase", fontWeight: "bold" }}>{manager_first_name?.charAt(0)}{manager_last_name?.charAt(0)}</p>
                                                    </span>
                                                </div>

                                                <div className="flex-grow-1 overflow-hidden text-start">
                                                    <h5 className="text-truncate font-size-15 " style={{ fontWeight: "bold" }}>

                                                        {reference}

                                                    </h5>
                                                    <p className="text-muted mb-4">{description}</p>


                                                </div>

                                            </div>
                                            <hr />
                                            <div className="" style={{ width: "280px" }}>

                                                <div className="react-kanban-card__description"><span style={{ fontWeight: "bold" }}>Manager Name: </span>{manager_first_name} {manager_last_name}
                                                </div>

                                                <div className="react-kanban-card__description"><span style={{ fontWeight: "bold" }}>Owner Name: </span>{owner_first_name} {owner_last_name}
                                                </div>

                                                <div className="react-kanban-card__description"><span className="badge rounded-pill bg-success">
                                                    Due Date: {due_by}
                                                </span></div>
                                            </div>
                                        </CardBody>
                                    </Card>

                                )}
                                onCardDragEnd={handleCardMove}
                                disableColumnDrag
                            >
                                {controlledBoard}

                            </Board> : null
                        }


                    </>
                </Col>
            </Row>
        </Container>

    );
}

const mapStateToProps = gstate => {
    const {
        get_task_info_loading,

        task_delete_loading,

        all_task,
        all_task_error,
        all_task_loading,


        swap_task,
        swap_task_error,
        swap_task_loading,
    } = gstate.tasks;
    return {
        get_task_info_loading,

        task_delete_loading,

        all_task,
        all_task_error,
        all_task_loading,

        swap_task,
        swap_task_error,
        swap_task_loading,
    };
};

export default withRouter(
    connect(mapStateToProps, {
        getTaskInfoFresh,
        deleteTaskFresh,
        getAllTask,
        swapTask,
        swapTaskFresh,
    })(KanbanBoard)
);

