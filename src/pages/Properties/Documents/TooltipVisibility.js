import React, { useEffect, useState } from 'react'
import { Card, CardBody, Col, Row, Tooltip } from 'reactstrap';

import { useDispatch } from 'react-redux';
import { documentVisibilty, documentVisibiltyFresh } from '../../../store/actions';

// Redux
import { connect, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";


const TooltipVisibility = ({ text, visibility, placement }) => {
    // const status = useSelector(state => state.Document.change_visibilty_loading);
    const dispatch = useDispatch();

    const { change_visibilty_loading } = useSelector(state => state.Document)
    // console.log(change_visibilty_loading);
    const [state, setState] = useState({})


    useEffect(() => {
        if (change_visibilty_loading == 'Success') {
            toastr.success('Success')
            dispatch(documentVisibiltyFresh())
        }

    }, [change_visibilty_loading]);

    const handler = () => dispatch(documentVisibilty())

    return (
        <div
            className='col-md-1 d-flex justify-content-start align-items-center'
            style={{ cursor: 'pointer' }}
            onClick={handler}
        >


            <Tooltip
                placement="right"
                isOpen={state.ttright}
                target={placement}
                toggle={() =>
                    setState({ ...state, ttright: !state.ttright })
                }
            >

                {`${visibility} ${text}`}
            </Tooltip>

            <div style={{ fontSize: '22px' }}
                id={placement}
            >
                <i className="fas fa-eye" />
                {/* <i className="fas fa-eye-slash" /> */}

            </div>
        </div>
    )
}

export default TooltipVisibility;

