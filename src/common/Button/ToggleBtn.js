import React from 'react'
import {

    Button,

} from "reactstrap";

function ToggleBtn(props) {

    return (
        <>
            <div className="btn-group">
                <Button
                    color={props.btn ? "secondary" : "light"}
                    onClick={() => props.toggle(props.label)}
                >

                    <span> {props.label}</span>
                </Button>
            </div>
        </>
    )
}

export default ToggleBtn