import React from 'react'
import {

    Button,

} from "reactstrap";

function SingleButton({ color, icon, handler, marginEndIcon, marginStart, text, marginEnd, disabled }) {
    console.log(disabled);
    return (
        <Button color={color} onClick={handler} className={`${marginEnd}`} disabled={disabled}>
            <i className={`${marginStart} ${icon} ${marginEndIcon}`}></i> {text}
        </Button>
    )
}

export default SingleButton
