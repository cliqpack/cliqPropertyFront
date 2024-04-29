import React, { useState } from 'react'
import {

    Tooltip,
} from "reactstrap";

export default function CommonTooltip({ text, }) {
    const [state, setState] = useState({})
    console.log(state);

    console.log(text);
    return (
        <>

            <Tooltip
                placement="right"
                isOpen={state[`${text}`]}
                target="TooltipRight"
                toggle={() =>
                    setState({ ...state, [`${text}`]: !state[`${text}`] })
                }
            >
                {text}
            </Tooltip>



            <div
                className='p-1'
                id="TooltipRight"
            >
                <i className='fas fa-info-circle' />
            </div>{" "}

        </>
    )
}
