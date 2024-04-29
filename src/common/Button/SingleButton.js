import React from 'react'
import {

    Button,

} from "reactstrap";

function SingleButton({ color, icon, handler, marginEndIcon, marginStart, text, marginEnd }) {
    console.log(marginEndIcon);
    return (
        <Button color={color} onClick={handler} className={`${marginEnd}`}>
            <i className={`${marginStart} ${icon} ${marginEndIcon}`}></i> {text}
        </Button>
    )
}

export default SingleButton
